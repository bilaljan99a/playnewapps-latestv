const express = require('express');
const compression = require('compression');
const path = require('path');
const { generateSitemapXML, writeSitemapFile } = require('./generate-sitemap');
const app = express();
const PORT = 3000;

// Enable gzip/deflate compression for fast asset delivery and high Google PageSpeed score
app.use(compression());

// Parse JSON and URL-encoded request bodies for API endpoints
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {
  fetchAmazonProduct,
  fetchRealAmazonImage,
  upgradeAmazonImageUrl,
  isValidImageUrl,
  saveProduct,
  bulkSaveProducts,
  deleteProduct,
  listAmazonProducts,
  extractAsin
} = require('./services/amazon-scraper');

// Amazon Auto-Listing API Endpoints
app.get('/api/amazon/config', (req, res) => {
  res.json({
    associateTag: process.env.AMAZON_ASSOCIATE_TAG || 'playnewapps-20',
    marketplace: process.env.AMAZON_MARKETPLACE || 'com'
  });
});

app.post('/api/amazon/fetch', async (req, res) => {
  try {
    const { input, tag } = req.body || {};
    if (!input) {
      return res.status(400).json({ success: false, error: 'Product URL or ASIN is required.' });
    }
    const product = await fetchAmazonProduct(input, tag);
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message || 'Failed to fetch Amazon product.' });
  }
});

app.post('/api/amazon/refetch-image', async (req, res) => {
  try {
    const { input, asin } = req.body || {};
    let targetAsin = asin;
    if (!targetAsin && input) {
      targetAsin = await extractAsin(input);
    }
    if (!targetAsin) {
      return res.status(400).json({ success: false, error: 'Product ASIN or URL is required.' });
    }
    const imageUrl = await fetchRealAmazonImage(targetAsin);
    if (!imageUrl) {
      return res.status(404).json({ success: false, error: 'Could not fetch image from Amazon endpoints.' });
    }
    res.json({ success: true, asin: targetAsin, image: imageUrl });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message || 'Failed to re-fetch image.' });
  }
});

app.post('/api/amazon/save', async (req, res) => {
  try {
    const { product } = req.body || {};
    if (!product || !product.title) {
      return res.status(400).json({ success: false, error: 'Valid product data is required.' });
    }
    const result = await saveProduct(product);
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message || 'Failed to save product.' });
  }
});

app.post('/api/amazon/bulk-save', async (req, res) => {
  try {
    const { products } = req.body || {};
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ success: false, error: 'Array of products is required.' });
    }
    const result = bulkSaveProducts(products);
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message || 'Failed to bulk save products.' });
  }
});

app.get('/api/amazon/list', (req, res) => {
  try {
    const products = listAmazonProducts();
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/amazon/delete', (req, res) => {
  try {
    const { id } = req.body || {};
    if (!id) return res.status(400).json({ success: false, error: 'Product ID is required.' });
    const result = deleteProduct(id);
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Disable all HTTP caching in development so preview always gets latest files
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  next();
});

// Automatically write/update sitemap.xml file on server startup
writeSitemapFile();

// Dynamic route to serve live sitemap.xml
app.get('/sitemap.xml', (req, res) => {
  const { xml } = generateSitemapXML();
  res.header('Content-Type', 'application/xml; charset=utf-8');
  res.send(xml);
});

// CRITICAL MIDDLEWARE 1: Legacy Blogger & Old APK Route Removal Detection
// MUST execute BEFORE any static file serving or homepage fallback!
app.use((req, res, next) => {
  const rawUrl = req.url || '';
  const pathname = rawUrl.split('?')[0];
  const lowerPath = pathname.toLowerCase();

  // 1. Match old Blogger date-based archive structures: /2018/..., /2021/..., /1999/..., etc.
  const isBloggerDatePath = /^\/(19|20)\d{2}(\/|$)/.test(pathname) || /^\/(19|20)\d{2}\/\d{2}/.test(pathname);

  // 2. Match standard Blogger system directories
  const isBloggerSystemPath = /^\/(search|feeds|label|b|p|archive)(\/|\?|$)/i.test(pathname);

  // 3. Match legacy APK article paths from old site
  const isOldApkPath = lowerPath.includes('-apk') ||
                       lowerPath.includes('hotspot-shield') ||
                       lowerPath.includes('netflix') ||
                       lowerPath.includes('ludo-star') ||
                       lowerPath.includes('usa-network') ||
                       lowerPath.includes('runes-of-magic') ||
                       lowerPath.includes('bloons') ||
                       (lowerPath.endsWith('.apk') && !lowerPath.startsWith('/assets/'));

  if (isBloggerDatePath || isBloggerSystemPath || isOldApkPath) {
    res.status(410);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    return res.sendFile(path.join(__dirname, '410.html'));
  }

  next();
});

// Middleware 2: Handle legacy Blogger mobile parameter (?m=0, ?m=1) on clean pages
app.use((req, res, next) => {
  const urlObj = new URL(req.url, 'http://localhost');
  if (urlObj.searchParams.has('m')) {
    urlObj.searchParams.delete('m');
    const remainingQuery = urlObj.searchParams.toString();
    const cleanUrl = urlObj.pathname + (remainingQuery ? '?' + remainingQuery : '');
    return res.redirect(301, cleanUrl);
  }
  next();
});

// Explicit 301 Permanent Redirects for Legacy, Alternative & Crawler URLs
const legacyRedirects = {
  '/categories.html': '/category',
  '/categories': '/category',
  '/coupons.html': '/stores',
  '/coupons': '/stores',
  '/blog.html': '/blog',
  '/trending.html': '/deal',
  '/trending': '/deal',
  '/deals': '/deal',
  '/privacy-policy': '/privacy',
  '/terms-of-service': '/terms',
  '/disclosure': '/affiliate',
  '/movavi-video-suite-coupons.html': '/movavi-coupons',
  '/movavi-video-suite-coupons': '/movavi-coupons',
  '/filmora-14-coupons.html': '/wondershare-filmora-coupons',
  '/filmora-14': '/wondershare-filmora-coupons',
  '/drfone-coupons.html': '/wondershare-drfone-review',
  '/drfone-coupons': '/wondershare-drfone-review',
  '/drfone': '/wondershare-drfone-review',
  '/aliexpress-coupons.html': '/store?id=aliexpress',
  '/aliexpress-coupons': '/store?id=aliexpress',
  '/aliexpress': '/store?id=aliexpress',
  '/nordvpn-coupons.html': '/store?id=nordvpn',
  '/nordvpn-coupons': '/store?id=nordvpn',
  '/nordvpn': '/store?id=nordvpn',
  '/canva-coupons.html': '/canva-review',
  '/canva-coupons': '/canva-review',
  '/wps-office-coupons.html': '/wps-office',
  '/wps-office-coupons': '/wps-office',
  '/hostinger-coupons.html': '/store?id=hostinger',
  '/hostinger-coupons': '/store?id=hostinger',
  '/hostinger': '/store?id=hostinger',
  '/war-thunder.html': '/store?id=war-thunder',
  '/war-thunder': '/store?id=war-thunder',
  '/notta-ai-coupons.html': '/store?id=notta-ai',
  '/notta-ai-coupons': '/store?id=notta-ai',
  '/notta-ai': '/store?id=notta-ai',
  '/cdn-cgi/l/email-protection': '/contact'
};

app.use((req, res, next) => {
  const cleanPath = (req.path || '').replace(/\/+$/, '') || '/';
  if (legacyRedirects[cleanPath]) {
    return res.redirect(301, legacyRedirects[cleanPath]);
  }
  if (cleanPath.startsWith('/category/')) {
    return res.sendFile(path.join(__dirname, 'category.html'));
  }
  next();
});

// Explicit Extensionless Page Routes for New Website Architecture
const cleanRoutes = [
  { route: '/contact', file: 'contact.html' },
  { route: '/about', file: 'about.html' },
  { route: '/coupon', file: 'coupon.html' },
  { route: '/stores', file: 'stores.html' },
  { route: '/reviews', file: 'reviews.html' },
  { route: '/privacy', file: 'privacy.html' },
  { route: '/terms', file: 'terms.html' },
  { route: '/affiliate', file: 'affiliate.html' },
  { route: '/category', file: 'category.html' },
  { route: '/categories', file: 'category.html' },
  { route: '/blog', file: 'blog.html' },
  { route: '/blog/', file: 'blog.html' },
  { route: '/blog/apk-files-coupons', file: 'apk-files-coupons.html' },
  { route: '/apk-files-coupons', file: 'apk-files-coupons.html' },
  { route: '/deals', file: 'deal.html' },
  { route: '/store', file: 'store.html' },
  { route: '/review', file: 'review.html' },
  { route: '/author', file: 'author.html' },
  { route: '/deal', file: 'deal.html' },
  { route: '/manifest.json', file: 'manifest.json' },
  { route: '/favicon.ico', file: 'favicon.ico' },
  { route: '/hide-expert-vpn', file: 'hide-expert-vpn-coupons.html' },
  { route: '/hide-expert-vpn-coupons', file: 'hide-expert-vpn-coupons.html' },
  { route: '/lennuabi-coupons', file: 'lennuabi-coupons.html' },
  { route: '/lennuabi-review', file: 'lennuabi-review.html' },
  { route: '/alibaba', file: 'alibaba.html' },
  { route: '/alibaba-review', file: 'alibaba.html' },
  { route: '/3dlabprint', file: '3dlabprint-coupons.html' },
  { route: '/3dlabprint-coupons', file: '3dlabprint-coupons.html' },
  { route: '/crossout', file: 'crossout-coupons.html' },
  { route: '/crossout-coupons', file: 'crossout-coupons.html' },
  { route: '/crossout-review', file: 'crossout-review.html' },
  { route: '/vectorstock', file: 'vectorstock-coupons.html' },
  { route: '/vectorstock-coupons', file: 'vectorstock-coupons.html' },
  { route: '/purevpn', file: 'purevpn-coupons.html' },
  { route: '/purevpn-coupons', file: 'purevpn-coupons.html' },
  { route: '/purevpn-review', file: 'purevpn-coupons.html' },
  { route: '/canva', file: 'canva-review.html' },
  { route: '/canva-review', file: 'canva-review.html' },
  { route: '/enlisted', file: 'enlisted-coupons.html' },
  { route: '/enlisted-coupons', file: 'enlisted-coupons.html' },
  { route: '/store/enlisted', file: 'enlisted-coupons.html' },
  { route: '/star-conflict', file: 'star-conflict-coupons.html' },
  { route: '/star-conflict-coupons', file: 'star-conflict-coupons.html' },
  { route: '/store/star-conflict', file: 'star-conflict-coupons.html' },
  { route: '/metrobrazil', file: 'metrobrazil-coupons.html' },
  { route: '/metrobrazil-coupons', file: 'metrobrazil-coupons.html' },
  { route: '/store/metrobrazil', file: 'metrobrazil-coupons.html' },
  { route: '/corsair', file: 'corsair-coupons.html' },
  { route: '/corsair-coupons', file: 'corsair-coupons.html' },
  { route: '/store/corsair', file: 'corsair-coupons.html' },
  { route: '/aovica', file: 'aovica-coupons.html' },
  { route: '/aovica-coupons', file: 'aovica-coupons.html' },
  { route: '/store/aovica', file: 'aovica-coupons.html' },
  { route: '/woodestic', file: 'woodestic-coupons.html' },
  { route: '/woodestic-coupons', file: 'woodestic-coupons.html' },
  { route: '/store/woodestic', file: 'woodestic-coupons.html' },
  { route: '/forcedrop', file: 'forcedrop-coupons.html' },
  { route: '/forcedrop-coupons', file: 'forcedrop-coupons.html' },
  { route: '/store/forcedrop', file: 'forcedrop-coupons.html' },
  { route: '/lenovo', file: 'lenovo-coupons.html' },
  { route: '/lenovo-coupons', file: 'lenovo-coupons.html' },
  { route: '/store/lenovo', file: 'lenovo-coupons.html' },
  { route: '/vevor', file: 'vevor-coupons.html' },
  { route: '/vevor-coupons', file: 'vevor-coupons.html' },
  { route: '/store/vevor', file: 'vevor-coupons.html' },
  { route: '/xp-pen', file: 'xp-pen-coupons.html' },
  { route: '/xp-pen-coupons', file: 'xp-pen-coupons.html' },
  { route: '/store/xp-pen', file: 'xp-pen-coupons.html' },
  { route: '/xppen', file: 'xp-pen-coupons.html' },
  { route: '/xppen-coupons', file: 'xp-pen-coupons.html' },
  { route: '/applicantally', file: 'applicantally-coupons.html' },
  { route: '/applicantally-coupons', file: 'applicantally-coupons.html' },
  { route: '/applicantally-review', file: 'applicantally-review.html' },
  { route: '/store/applicantally', file: 'applicantally-coupons.html' },
  { route: '/italki', file: 'italki-coupons.html' },
  { route: '/italki-coupons', file: 'italki-coupons.html' },
  { route: '/italki-review', file: 'italki-review.html' },
  { route: '/store/italki', file: 'italki-coupons.html' },
  { route: '/uniconverter', file: 'wondershare-uniconverter-review.html' },
  { route: '/uniconverter-review', file: 'wondershare-uniconverter-review.html' },
  { route: '/wondershare-uniconverter-review', file: 'wondershare-uniconverter-review.html' },
  { route: '/avast', file: 'avast-antivirus-review.html' },
  { route: '/avast-antivirus', file: 'avast-antivirus-review.html' },
  { route: '/avast-review', file: 'avast-antivirus-review.html' },
  { route: '/avast-antivirus-review', file: 'avast-antivirus-review.html' },
  { route: '/walmart', file: 'walmart-coupons.html' },
  { route: '/walmart-coupons', file: 'walmart-coupons.html' },
  { route: '/store/walmart', file: 'walmart-coupons.html' },
  { route: '/keeper-security', file: 'keeper-security-coupons.html' },
  { route: '/keeper-security-coupons', file: 'keeper-security-coupons.html' },
  { route: '/store/keeper-security', file: 'keeper-security-coupons.html' },
  { route: '/gomlab', file: 'gomlab-coupons.html' },
  { route: '/gomlab-coupons', file: 'gomlab-coupons.html' },
  { route: '/store/gomlab', file: 'gomlab-coupons.html' },
  { route: '/kissandfly', file: 'kissandfly-coupons.html' },
  { route: '/kissandfly-coupons', file: 'kissandfly-coupons.html' },
  { route: '/store/kissandfly', file: 'kissandfly-coupons.html' },
  { route: '/asaptickets', file: 'asaptickets-coupons.html' },
  { route: '/asaptickets-coupons', file: 'asaptickets-coupons.html' },
  { route: '/store/asaptickets', file: 'asaptickets-coupons.html' },
  { route: '/1password', file: '1password-coupons.html' },
  { route: '/1password-coupons', file: '1password-coupons.html' },
  { route: '/store/1password', file: '1password-coupons.html' },
  { route: '/planner5d', file: 'planner5d-coupons.html' },
  { route: '/planner5d-coupons', file: 'planner5d-coupons.html' },
  { route: '/store/planner5d', file: 'planner5d-coupons.html' },
  { route: '/elevenlabs', file: 'elevenlabs-coupons.html' },
  { route: '/elevenlabs-coupons', file: 'elevenlabs-coupons.html' },
  { route: '/store/elevenlabs', file: 'elevenlabs-coupons.html' },
  { route: '/myheritage', file: 'myheritage-coupons.html' },
  { route: '/myheritage-coupons', file: 'myheritage-coupons.html' },
  { route: '/myheritage-dna', file: 'myheritage-coupons.html' },
  { route: '/myheritage-dna-coupons', file: 'myheritage-coupons.html' },
  { route: '/store/myheritage', file: 'myheritage-coupons.html' },
  { route: '/store/myheritage-dna', file: 'myheritage-coupons.html' },
  { route: '/mytriv', file: 'mytriv-coupons.html' },
  { route: '/mytriv-coupons', file: 'mytriv-coupons.html' },
  { route: '/store/mytriv', file: 'mytriv-coupons.html' },
  { route: '/casetify', file: 'casetify-coupons.html' },
  { route: '/casetify-coupons', file: 'casetify-coupons.html' },
  { route: '/store/casetify', file: 'casetify-coupons.html' },
  { route: '/gamivo', file: 'gamivo-coupons.html' },
  { route: '/gamivo-coupons', file: 'gamivo-coupons.html' },
  { route: '/store/gamivo', file: 'gamivo-coupons.html' },
  { route: '/steam-deck-review', file: 'steam-deck-review.html' },
  { route: '/xbox-series-x-review', file: 'xbox-series-x-review.html' },
  { route: '/windows-11-review', file: 'windows-11-review.html' },
  { route: '/ps5-review', file: 'ps5-review.html' },
  { route: '/oculus-quest-2-review', file: 'oculus-quest-2-review.html' },
  { route: '/asphalt-8-airborne-review', file: 'asphalt-8-airborne-review.html' },
  { route: '/asphalt-8-review', file: 'asphalt-8-airborne-review.html' },
  { route: '/amazon-prime-video', file: 'amazon-prime-video-coupons.html' },
  { route: '/amazon-prime-video-coupons', file: 'amazon-prime-video-coupons.html' },
  { route: '/store/amazon-prime-video', file: 'amazon-prime-video-coupons.html' },
  { route: '/kkday', file: 'kkday-coupons.html' },
  { route: '/kkday-coupons', file: 'kkday-coupons.html' },
  { route: '/store/kkday', file: 'kkday-coupons.html' },
  { route: '/amazon-auto-list', file: 'amazon-auto-list.html' },
  { route: '/amazon-auto-list.html', file: 'amazon-auto-list.html' },
  { route: '/admin/amazon', file: 'amazon-auto-list.html' },
  { route: '/admin/tools', file: 'tools.html' },
  { route: '/tools', file: 'tools.html' },
  { route: '/tool', file: 'tools.html' },
  { route: '/tools.html', file: 'tools.html' },
  { route: '/tools/amazon', file: 'amazon-auto-list.html' },
  { route: '/tools/amazon-auto-list', file: 'amazon-auto-list.html' },
  { route: '/tools/amazon-auto-list.html', file: 'amazon-auto-list.html' },
  { route: '/tools/amazon-lister', file: 'amazon-auto-list.html' },
  { route: '/tools/lister', file: 'amazon-auto-list.html' },
  { route: '/tool/amazon', file: 'amazon-auto-list.html' },
  { route: '/the-luxury-closet', file: 'the-luxury-closet-coupons.html' },
  { route: '/the-luxury-closet-coupons', file: 'the-luxury-closet-coupons.html' },
  { route: '/store/the-luxury-closet', file: 'the-luxury-closet-coupons.html' }
];

cleanRoutes.forEach(({ route, file }) => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, file));
  });
});

const fs = require('fs');

// Automatic Dynamic Route Resolver for all existing & future stores/pages
app.use((req, res, next) => {
  const reqPath = req.path.replace(/^\/+|\/+$/g, '');
  if (!reqPath) return next();

  // If path is tools or tool subpath
  if (reqPath === 'tools' || reqPath === 'tool' || reqPath.startsWith('tools/') || reqPath.startsWith('tool/')) {
    if (reqPath.includes('amazon') || reqPath.includes('lister')) {
      return res.sendFile(path.join(__dirname, 'amazon-auto-list.html'));
    }
    const toolsFile = path.join(__dirname, 'tools.html');
    if (fs.existsSync(toolsFile)) {
      return res.sendFile(toolsFile);
    }
  }

  // If path starts with blog/
  if (reqPath.startsWith('blog/')) {
    const blogSlug = reqPath.replace(/^blog\//, '');
    const possibleFiles = [
      `blog/${blogSlug}.html`,
      `blog/${blogSlug}`,
      `${blogSlug}.html`,
      `${blogSlug}`
    ];
    for (const f of possibleFiles) {
      const fullPath = path.join(__dirname, f);
      if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
        return res.sendFile(fullPath);
      }
    }
  }

  // If path starts with store/
  if (reqPath.startsWith('store/')) {
    const storeSlug = reqPath.replace(/^store\//, '');
    const possibleFiles = [
      `${storeSlug}-coupons.html`,
      `${storeSlug}.html`,
      `${storeSlug}-review.html`
    ];
    for (const f of possibleFiles) {
      const fullPath = path.join(__dirname, f);
      if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
        return res.sendFile(fullPath);
      }
    }
    const storeFallback = path.join(__dirname, 'store.html');
    if (fs.existsSync(storeFallback)) {
      return res.sendFile(storeFallback);
    }
  }

  // If path is an extensionless page or store slug
  const possibleFiles = [
    `${reqPath}.html`,
    `${reqPath}-coupons.html`,
    `${reqPath}-review.html`
  ];
  for (const f of possibleFiles) {
    const fullPath = path.join(__dirname, f);
    if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
      return res.sendFile(fullPath);
    }
  }
  next();
});

// Serve static assets without stale caching in development
app.use('/assets', express.static(path.join(__dirname, 'assets'), {
  setHeaders: (res, path) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  }
}));

// Serve static files with html extension fallback and fresh headers
app.use(express.static(__dirname, { 
  extensions: ['html'],
  setHeaders: (res, path) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
}));

// Custom 404 for any other missing routes (Return 404 Not Found, NEVER homepage!)
app.use((req, res) => {
  res.status(404);
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.sendFile(path.join(__dirname, '404.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});

