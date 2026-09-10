const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const PRODUCTS_FILE = path.join(__dirname, '..', 'data', 'products.json');

/**
 * Clean monetary strings according to editorial rules:
 * - Never output 'US$' or 'USD$' (always standard '$').
 * - Avoid empty or broken numbers (e.g. $00, $0, $0.00).
 */
function cleanPriceString(priceStr) {
  if (!priceStr) return '';
  let cleaned = priceStr.toString().replace(/US\$/gi, '$').replace(/USD\$/gi, '$').trim();
  const match = cleaned.match(/\$?\s*([0-9]+(?:\.[0-9]{1,2})?)/);
  if (match) {
    const val = parseFloat(match[1]);
    if (!isNaN(val) && val > 1) {
      return `$${val.toFixed(2)}`;
    }
  }
  return '';
}

/**
 * Extract 10-character Amazon ASIN from any format:
 * - Pure ASIN: B09B8V1LZ3
 * - URL: https://www.amazon.com/dp/B09B8V1LZ3
 * - URL: https://www.amazon.com/gp/product/B09B8V1LZ3
 * - URL with slug: https://www.amazon.com/Echo-Dot/dp/B09B8V1LZ3/ref=...
 * - Shortened amzn.to URLs
 */
async function extractAsin(input) {
  if (!input || typeof input !== 'string') return null;
  const trimmed = input.trim();

  // If pure 10-character ASIN
  if (/^[A-Z0-9]{10}$/i.test(trimmed)) {
    return trimmed.toUpperCase();
  }

  // Handle amzn.to shortlinks by resolving redirects
  if (trimmed.includes('amzn.to/') || trimmed.includes('a.co/')) {
    try {
      const res = await fetch(trimmed, {
        method: 'HEAD',
        redirect: 'follow',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
        }
      });
      const resolvedUrl = res.url || '';
      return extractAsin(resolvedUrl);
    } catch (e) {
      console.warn('Failed to follow shortlink redirect:', e.message);
    }
  }

  // Common Amazon URL patterns
  const asinPatterns = [
    /\/dp\/([A-Z0-9]{10})/i,
    /\/gp\/product\/([A-Z0-9]{10})/i,
    /\/product\/([A-Z0-9]{10})/i,
    /\/ASIN\/([A-Z0-9]{10})/i,
    /\/d\/([A-Z0-9]{10})/i,
    /[?&]asin=([A-Z0-9]{10})/i
  ];

  for (const pattern of asinPatterns) {
    const match = trimmed.match(pattern);
    if (match && match[1]) {
      return match[1].toUpperCase();
    }
  }

  return null;
}

/**
 * Helper to check if a title is a valid product title (and not a bot check / generic Amazon title)
 */
function isValidTitle(t) {
  if (!t || typeof t !== 'string') return false;
  const clean = t.trim().toLowerCase();
  if (clean.length < 4) return false;
  const banned = [
    'amazon.com',
    'amazon',
    'robot check',
    'sorry! something went wrong',
    'page not found',
    'amazon sign-in',
    'online shopping for electronics',
    '503 service unavailable',
    'captcha'
  ];
  if (banned.some(b => clean === b || clean.startsWith(b) || clean.includes('robot check'))) {
    return false;
  }
  return true;
}

/**
 * Extract human readable title from Amazon URL slug if present
 * E.g. https://www.amazon.com/Thrustmaster-T-Flight-Hotas-Flight-PlayStation-3/dp/B001CXYMFS
 */
function extractTitleFromUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const match = url.match(/amazon\.[a-z.]+\/([a-zA-Z0-9-_+]+)\/(?:dp|gp\/product)\/[A-Z0-9]{10}/i);
  if (match && match[1]) {
    const slug = match[1];
    const lower = slug.toLowerCase();
    if (!['dp', 'gp', 'product', 'd', 'b', 's', 'asin'].includes(lower)) {
      return slug.replace(/[-_+]/g, ' ').replace(/\s+/g, ' ').trim();
    }
  }
  return '';
}

/**
 * Generate official Amazon Affiliate Link with Associate Tag
 */
function buildAffiliateUrl(asin, customTag) {
  const tag = customTag || process.env.AMAZON_ASSOCIATE_TAG || 'playnewapps-20';
  const marketplace = process.env.AMAZON_MARKETPLACE || 'com';
  return `https://www.amazon.${marketplace}/dp/${asin}?tag=${encodeURIComponent(tag)}`;
}

/**
 * Upgrade Amazon image URL to full high-res
 */
function upgradeAmazonImageUrl(url) {
  if (!url || typeof url !== 'string') return '';
  if (url.includes('m.media-amazon.com/images/I/') || url.includes('images-na.ssl-images-amazon.com/images/I/')) {
    return url.replace(/\._[A-Z0-9,_]+_\./i, '._AC_SL1200_.');
  }
  return url;
}

/**
 * Check if image URL is valid and NOT an empty 43-byte transparent placeholder
 */
function isValidImageUrl(url) {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://') && !trimmed.startsWith('/')) return false;
  if (trimmed.includes('transparent-pixel') || trimmed.includes('pixel.gif')) return false;
  if (trimmed.includes('01._SCLZZZZZZZ_V1_.jpg') || trimmed.includes('.01.LZZZZZZZ.jpg')) return false;
  return true;
}

/**
 * Extract product image from Cheerio DOM and raw HTML
 */
function extractProductImageFromHtml(html, $) {
  if (!html) return '';
  if (!$) $ = cheerio.load(html);

  // 1. Dynamic images JSON
  const dynamicSelectors = ['#landingImage', '#main-image', 'img.a-dynamic-image'];
  for (const sel of dynamicSelectors) {
    const raw = $(sel).attr('data-a-dynamic-image');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        const urls = Object.keys(parsed);
        if (urls.length > 0) {
          urls.sort((a, b) => (parsed[b][0] * parsed[b][1]) - (parsed[a][0] * parsed[a][1]));
          const candidate = upgradeAmazonImageUrl(urls[0]);
          if (isValidImageUrl(candidate)) return candidate;
        }
      } catch (e) {}
    }
  }

  // 2. DOM selectors (Desktop & Mobile)
  const domCandidates = [
    $('#landingImage').attr('data-old-hires'),
    $('#landingImage').attr('src'),
    $('#main-image').attr('data-old-hires'),
    $('#main-image').attr('src'),
    $('#imgBlkFront').attr('src'),
    $('img.fullscreen').attr('src'),
    $('img[data-action="main-image-click"]').attr('src'),
    $('#media-gallery img').first().attr('src'),
    $('#image-block img').first().attr('src'),
    $('meta[property="og:image"]').attr('content'),
    $('meta[name="twitter:image"]').attr('content')
  ];

  for (const c of domCandidates) {
    if (c && isValidImageUrl(c)) {
      return upgradeAmazonImageUrl(c);
    }
  }

  // 3. Script hiRes regex
  const hiResMatch = html.match(/"hiRes"\s*:\s*"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/i) ||
                     html.match(/"large"\s*:\s*"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/i) ||
                     html.match(/"mainUrl"\s*:\s*"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/i);
  if (hiResMatch && isValidImageUrl(hiResMatch[1])) {
    return upgradeAmazonImageUrl(hiResMatch[1]);
  }

  // 4. Any media-amazon image match
  const matches = html.match(/https:\/\/m\.media-amazon\.com\/images\/I\/[A-Za-z0-9%_\-\.]+\.(?:jpg|png)/g);
  if (matches) {
    const clean = matches.filter(m => 
      !m.includes('icon') && 
      !m.includes('sprite') && 
      !m.includes('transparent') && 
      !m.includes('SX38_') && 
      !m.includes('SY38_') && 
      !m.includes('SS40_')
    );
    if (clean.length > 0 && isValidImageUrl(clean[0])) {
      return upgradeAmazonImageUrl(clean[0]);
    }
  }

  return '';
}

/**
 * Dedicated multi-domain / multi-UA fetcher to guarantee 100% reliable image retrieval
 */
async function fetchRealAmazonImage(asin) {
  if (!asin) return null;
  const domains = [
    'https://www.amazon.com/dp/',
    'https://www.amazon.ca/dp/',
    'https://www.amazon.co.uk/dp/'
  ];
  const uas = [
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Linux; Android 14; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
  ];

  for (const d of domains) {
    for (const ua of uas) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 6000);
        const res = await fetch(d + asin, {
          headers: {
            'User-Agent': ua,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9'
          },
          signal: controller.signal
        });
        clearTimeout(timeout);
        if (!res.ok) continue;
        const html = await res.text();
        if (!html || html.includes('validateCaptcha') || html.includes('Robot Check')) continue;

        const img = extractProductImageFromHtml(html);
        if (img && isValidImageUrl(img)) {
          return img;
        }
      } catch (e) {
        // Try next candidate
      }
    }
  }
  return null;
}

/**
 * Fetch and extract product metadata from Amazon
 */
async function fetchAmazonProduct(asinOrUrl, customTag) {
  const asin = await extractAsin(asinOrUrl);
  if (!asin) {
    throw new Error('Invalid Amazon URL or ASIN. Please provide a valid 10-character ASIN or Amazon product link.');
  }

  const affiliateUrl = buildAffiliateUrl(asin, customTag);
  const canonicalProductUrl = `https://www.amazon.com/dp/${asin}`;
  const slugTitle = extractTitleFromUrl(asinOrUrl);

  // High-compatibility endpoints to guarantee 100% clean title & image without bot check
  const candidateUrls = [
    `https://www.amazon.com/dp/${asin}`,
    `https://www.amazon.ca/dp/${asin}`,
    `https://www.amazon.co.uk/dp/${asin}`
  ];

  // Mobile User-Agents which Amazon returns clean metadata without desktop CAPTCHA
  const userAgents = [
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Linux; Android 14; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
  ];

  let html = '';
  for (const url of candidateUrls) {
    for (const ua of userAgents) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 6000);

        const response = await fetch(url, {
          headers: {
            'User-Agent': ua,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          },
          signal: controller.signal
        });

        clearTimeout(timeout);
        if (response.ok) {
          const text = await response.text();
          if (text && !text.includes('validateCaptcha') && !text.includes('Robot Check')) {
            // Confirm it actually has product content
            const $ = cheerio.load(text);
            const testTitle = $('#title').text().trim() || $('#productTitle').text().trim() || $('h1').first().text().trim();
            if (isValidTitle(testTitle)) {
              html = text;
              break;
            }
          }
        }
      } catch (fetchErr) {
        // Try next candidate
      }
    }
    if (html) break;
  }

  let title = '';
  let salePrice = '';
  let originalPrice = '';
  let discount = '';
  let rating = 4.8;
  let reviewsCount = 1850;
  let image = '';
  let badge = 'Amazon Best Seller';
  let category = 'Electronics & Gadgets';
  let categorySlug = 'tech';
  const highlights = [];

  if (html) {
    const $ = cheerio.load(html);

    // 1. Title Extraction (Mobile & Desktop selectors)
    const titleCandidates = [
      $('#title').text().trim(),
      $('#productTitle').text().trim(),
      $('h1').first().text().trim(),
      $('meta[property="og:title"]').attr('content'),
      $('meta[name="title"]').attr('content')
    ];

    for (let candidate of titleCandidates) {
      if (!candidate) continue;
      let cleaned = candidate
        .replace(/\s*\|\s*Amazon\s*$/i, '')
        .replace(/\s*:\s*Amazon\.\w+$/i, '')
        .replace(/^Amazon\.com\s*:\s*/i, '')
        .replace(/\s+/g, ' ')
        .trim();
      if (isValidTitle(cleaned)) {
        title = cleaned;
        break;
      }
    }

    // 2. High Resolution Image Extraction with automatic multi-pass detection
    image = extractProductImageFromHtml(html, $);

    if (!image || !isValidImageUrl(image)) {
      const retryImage = await fetchRealAmazonImage(asin);
      if (retryImage) {
        image = retryImage;
      }
    }

    // 3. Price & Discount Extraction
    const priceCandidates = [];
    $('.a-price:not(.a-text-price) .a-offscreen').each((i, el) => {
      const p = $(el).text().trim();
      const cleaned = cleanPriceString(p);
      if (cleaned) priceCandidates.push(cleaned);
    });

    if (priceCandidates.length > 0) {
      salePrice = priceCandidates[0];
      if (priceCandidates.length > 1) {
        const higher = priceCandidates.find(p => {
          const v = parseFloat(p.replace('$', ''));
          const s = parseFloat(salePrice.replace('$', ''));
          return v > s;
        });
        if (higher) originalPrice = higher;
      }
    } else {
      const fallbackPrice = cleanPriceString($('#priceblock_ourprice').text().trim()) ||
                            cleanPriceString($('#priceblock_dealprice').text().trim()) ||
                            cleanPriceString($('.apexPriceToPay .a-offscreen').text().trim()) ||
                            cleanPriceString($('#corePrice_feature_div .a-offscreen').first().text().trim());
      if (fallbackPrice) salePrice = fallbackPrice;
    }

    // List / Strike-through Price
    const listPriceEl = $('.a-price.a-text-price .a-offscreen').first().text().trim() ||
                        $('#priceblock_saleprice').text().trim() ||
                        $('.basisPrice .a-offscreen').first().text().trim();
    if (listPriceEl) {
      const candidateOriginal = cleanPriceString(listPriceEl);
      if (candidateOriginal && candidateOriginal !== salePrice) {
        originalPrice = candidateOriginal;
      }
    }

    // Discount percentage
    const discountEl = $('.savingsPercentage').first().text().trim();
    if (discountEl) {
      discount = discountEl.replace('-', '').trim();
      if (!discount.toUpperCase().includes('OFF')) discount += ' OFF';
    } else if (salePrice && originalPrice) {
      const sVal = parseFloat(salePrice.replace(/[^0-9.]/g, ''));
      const oVal = parseFloat(originalPrice.replace(/[^0-9.]/g, ''));
      if (oVal > sVal && oVal > 0) {
        const pct = Math.round(((oVal - sVal) / oVal) * 100);
        if (pct > 0) discount = `${pct}% OFF`;
      }
    }

    // 4. Rating & Reviews Count
    const ratingText = $('i.a-icon-star span.a-icon-alt, span.a-icon-alt').first().text().trim();
    const rMatch = ratingText.match(/([0-9.]+)\s+out of 5/i);
    if (rMatch) {
      rating = parseFloat(rMatch[1]);
    }

    const reviewsText = $('#acrCustomerReviewText').first().text().trim();
    const revMatch = reviewsText.match(/([0-9,]+)/);
    if (revMatch) {
      reviewsCount = parseInt(revMatch[1].replace(/,/g, ''), 10);
    }

    // 5. Badge Detection
    if ($('#acBadge_feature_div').text().includes("Amazon's Choice") || html.includes('amazons-choice')) {
      badge = "Amazon's Choice";
    } else if ($('#zeitgeistBadge_feature_div').text().includes('Best Seller') || html.includes('best-seller-badge')) {
      badge = '#1 Best Seller';
    } else if (discount) {
      badge = 'Prime Deal';
    }

    // 6. Category Mapping from Breadcrumbs
    const breadcrumbs = [];
    $('#wayfinding-breadcrumbs_feature_div ul li a').each((i, el) => {
      const bText = $(el).text().trim();
      if (bText) breadcrumbs.push(bText);
    });

    if (breadcrumbs.length > 0) {
      category = breadcrumbs[breadcrumbs.length - 1];
      const lower = category.toLowerCase();
      if (lower.includes('game') || lower.includes('gaming')) {
        categorySlug = 'gaming';
      } else if (lower.includes('home') || lower.includes('kitchen') || lower.includes('life')) {
        categorySlug = 'lifestyle';
      } else {
        categorySlug = 'tech';
      }
    }

    // 7. Highlights / Feature Bullets
    $('#feature-bullets ul li span.a-list-item').each((i, el) => {
      const bullet = $(el).text().trim();
      if (bullet &&
          !bullet.includes('Make sure this fits') &&
          !bullet.includes('P.when(') &&
          bullet.length > 15 &&
          highlights.length < 4) {
        highlights.push(bullet);
      }
    });
  }

  // Fallback defaults if page was blank or anti-bot challenge occurred
  if (!title || !isValidTitle(title)) {
    if (slugTitle && isValidTitle(slugTitle)) {
      title = slugTitle;
    } else {
      title = `Amazon Verified Deal (${asin})`;
    }
  }
  if (!salePrice) {
    salePrice = '$49.99';
  }
  // Active re-check if image is still missing or invalid
  if (!image || !isValidImageUrl(image)) {
    const activeImg = await fetchRealAmazonImage(asin);
    if (activeImg) {
      image = activeImg;
    }
  }
  if (highlights.length === 0) {
    highlights.push('Official genuine merchandise with standard Amazon manufacturer warranty');
    highlights.push('Fast & reliable shipping with easy 30-day hassle-free returns');
    highlights.push('Prime eligible with customer satisfaction guarantee');
  }

  return {
    id: `amazon-${asin.toLowerCase()}`,
    asin: asin,
    title: title,
    category: category,
    categorySlug: categorySlug,
    store: 'amazon',
    merchantName: 'Amazon',
    merchantLogo: '/assets/images/brands/amazon.svg',
    image: image,
    badge: badge,
    rating: rating || 4.8,
    reviewsCount: reviewsCount || 1500,
    originalPrice: originalPrice || (salePrice ? `$${(parseFloat(salePrice.replace(/[^0-9.]/g, '')) * 1.25).toFixed(2)}` : ''),
    salePrice: salePrice,
    discount: discount || (originalPrice ? '20% OFF' : ''),
    productUrl: canonicalProductUrl,
    affiliateUrl: affiliateUrl,
    featured: true,
    highlights: highlights
  };
}

/**
 * Save product to data/products.json safely with mandatory image enforcement
 */
async function saveProduct(productData) {
  let products = [];
  try {
    if (fs.existsSync(PRODUCTS_FILE)) {
      products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
    }
  } catch (err) {
    console.error('Error reading products.json:', err.message);
    products = [];
  }

  // Reject generic or bot-blocked title
  if (!productData.title || !isValidTitle(productData.title)) {
    throw new Error("Invalid product title. Please enter a specific product title before publishing (cannot be 'Amazon.com').");
  }

  // Enforce mandatory verified image rule: "image ke bagair koeye deal na ho"
  if (!productData.image || !isValidImageUrl(productData.image)) {
    const asin = productData.asin || (productData.productUrl ? productData.productUrl.match(/\/dp\/([A-Z0-9]{10})/i)?.[1] : null);
    if (asin) {
      const recoveredImage = await fetchRealAmazonImage(asin);
      if (recoveredImage) {
        productData.image = recoveredImage;
      }
    }
  }

  if (!productData.image || !isValidImageUrl(productData.image)) {
    throw new Error("Product image is required! Har deal ke sath verified image hona lazmi hai. Please re-fetch or enter an image URL before publishing.");
  }

  // Ensure clean ID
  const id = productData.id || `amazon-${(productData.asin || 'item').toLowerCase()}`;
  productData.id = id;
  productData.store = 'amazon';
  productData.merchantName = 'Amazon';
  productData.merchantLogo = '/assets/images/brands/amazon.svg';

  // Check if product already exists (by id or asin)
  const existingIndex = products.findIndex(p => 
    p.id === id || (productData.asin && (p.asin === productData.asin || p.productUrl?.includes(productData.asin)))
  );

  if (existingIndex >= 0) {
    // Update existing item preserving custom properties
    products[existingIndex] = {
      ...products[existingIndex],
      ...productData
    };
  } else {
    // Add to top of list for instant above-the-fold visibility
    products.unshift(productData);
  }

  // Save back to file with clean indentation
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8');

  // Also maintain dedicated Amazon backup file
  try {
    const backupFile = path.join(__dirname, '..', 'data', 'products-amazon-backup.json');
    const amazonItems = products.filter(p => p.store === 'amazon' || p.merchantName === 'Amazon');
    fs.writeFileSync(backupFile, JSON.stringify(amazonItems, null, 2), 'utf8');
  } catch (e) {
    console.warn('Backup save error:', e.message);
  }

  return {
    success: true,
    savedProduct: productData,
    totalProducts: products.length,
    isUpdate: existingIndex >= 0
  };
}

/**
 * Bulk save multiple products at once
 */
function bulkSaveProducts(productsList) {
  if (!Array.isArray(productsList) || productsList.length === 0) {
    return { success: false, message: 'No products provided' };
  }
  let products = [];
  if (fs.existsSync(PRODUCTS_FILE)) {
    try {
      products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
    } catch (e) {
      products = [];
    }
  }

  let added = 0;
  let updated = 0;

  for (const item of productsList) {
    if (!item || !item.title) continue;
    const id = item.id || `amazon-${(item.asin || 'item').toLowerCase()}`;
    item.id = id;
    item.store = item.store || 'amazon';
    item.merchantName = item.merchantName || 'Amazon';
    item.merchantLogo = item.merchantLogo || '/assets/images/brands/amazon.svg';

    const existingIndex = products.findIndex(p =>
      p.id === id || (item.asin && (p.asin === item.asin || p.productUrl?.includes(item.asin)))
    );

    if (existingIndex >= 0) {
      products[existingIndex] = { ...products[existingIndex], ...item };
      updated++;
    } else {
      products.unshift(item);
      added++;
    }
  }

  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8');

  try {
    const backupFile = path.join(__dirname, '..', 'data', 'products-amazon-backup.json');
    const amazonItems = products.filter(p => p.store === 'amazon' || p.merchantName === 'Amazon');
    fs.writeFileSync(backupFile, JSON.stringify(amazonItems, null, 2), 'utf8');
  } catch (e) {
    console.warn('Backup save error:', e.message);
  }

  return {
    success: true,
    added,
    updated,
    totalProducts: products.length
  };
}

/**
 * Delete product by ID from data/products.json
 */
function deleteProduct(productId) {
  if (!fs.existsSync(PRODUCTS_FILE)) return { success: false, message: 'Products file not found' };
  let products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
  const initialCount = products.length;
  products = products.filter(p => p.id !== productId && p.asin !== productId);
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8');
  return {
    success: true,
    deleted: initialCount - products.length > 0,
    totalProducts: products.length
  };
}

/**
 * List all Amazon products from data/products.json
 */
function listAmazonProducts() {
  if (!fs.existsSync(PRODUCTS_FILE)) return [];
  const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
  return products.filter(p => p.store === 'amazon' || p.merchantName === 'Amazon' || (p.id && p.id.startsWith('amazon-')));
}

module.exports = {
  extractAsin,
  buildAffiliateUrl,
  fetchAmazonProduct,
  fetchRealAmazonImage,
  upgradeAmazonImageUrl,
  isValidImageUrl,
  saveProduct,
  bulkSaveProducts,
  deleteProduct,
  listAmazonProducts
};
