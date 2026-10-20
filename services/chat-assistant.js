const fs = require('fs');
const path = require('path');
const { GoogleGenAI } = require('@google/genai');

const ASSOCIATE_TAG = process.env.AMAZON_ASSOCIATE_TAG || 'playnewapps-20';

let productsCache = null;
let storesCache = null;

function loadData() {
  try {
    if (!productsCache) {
      const pPath = path.join(__dirname, '..', 'data', 'products.json');
      if (fs.existsSync(pPath)) {
        productsCache = JSON.parse(fs.readFileSync(pPath, 'utf-8'));
      } else {
        productsCache = [];
      }
    }
    if (!storesCache) {
      const sPath = path.join(__dirname, '..', 'data', 'stores.json');
      if (fs.existsSync(sPath)) {
        storesCache = JSON.parse(fs.readFileSync(sPath, 'utf-8'));
      } else {
        storesCache = [];
      }
    }
  } catch (err) {
    console.error('[CHAT] Error loading catalog data:', err);
    productsCache = productsCache || [];
    storesCache = storesCache || [];
  }
}

// Ensure Amazon URL has affiliate tag
function formatAmazonAffiliateUrl(url, tag = ASSOCIATE_TAG) {
  if (!url || typeof url !== 'string') return '';
  const clean = url.trim();
  try {
    const parsed = new URL(clean.startsWith('http') ? clean : `https://${clean}`);
    if (parsed.hostname.includes('amazon.')) {
      parsed.searchParams.set('tag', tag);
      return parsed.toString();
    }
  } catch (e) {
    if (clean.includes('amazon.')) {
      const sep = clean.includes('?') ? '&' : '?';
      return `${clean}${sep}tag=${encodeURIComponent(tag)}`;
    }
  }
  return clean;
}

// Generate guaranteed Amazon Search URL with affiliate tag
function getAmazonSearchUrl(query, tag = ASSOCIATE_TAG) {
  const cleanQ = encodeURIComponent(query.trim());
  return `https://www.amazon.com/s?k=${cleanQ}&tag=${tag}`;
}

// Search catalog for relevant products & stores based on query keywords
function searchCatalog(query, limit = 5) {
  loadData();
  if (!query || typeof query !== 'string') return { products: [], stores: [] };
  
  const tokens = query.toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 2 && !['the', 'and', 'for', 'with', 'best', 'buy', 'get', 'looking', 'what', 'which', 'give'].includes(t));

  if (tokens.length === 0) return { products: [], stores: [] };

  // Score products
  const matchedProducts = productsCache.map(p => {
    let score = 0;
    const title = (p.title || '').toLowerCase();
    const cat = (p.category || p.categorySlug || '').toLowerCase();
    const desc = (p.description || '').toLowerCase();
    const brand = (p.brand || p.merchantName || '').toLowerCase();

    tokens.forEach(tok => {
      if (title.includes(tok)) score += 5;
      if (brand.includes(tok)) score += 4;
      if (cat.includes(tok)) score += 3;
      if (desc.includes(tok)) score += 1;
    });

    return { product: p, score };
  })
  .filter(item => item.score > 0)
  .sort((a, b) => b.score - a.score)
  .slice(0, limit)
  .map(item => {
    const p = { ...item.product };
    if (p.affiliateUrl) {
      p.affiliateUrl = formatAmazonAffiliateUrl(p.affiliateUrl);
    } else if (p.asin) {
      p.affiliateUrl = `https://www.amazon.com/dp/${p.asin}?tag=${ASSOCIATE_TAG}`;
    } else {
      p.affiliateUrl = getAmazonSearchUrl(p.title);
    }
    return p;
  });

  // Score stores
  const matchedStores = storesCache.map(s => {
    let score = 0;
    const name = (s.name || '').toLowerCase();
    const cat = (s.category || '').toLowerCase();
    const desc = (s.description || '').toLowerCase();

    tokens.forEach(tok => {
      if (name.includes(tok)) score += 5;
      if (cat.includes(tok)) score += 3;
      if (desc.includes(tok)) score += 1;
    });

    return { store: s, score };
  })
  .filter(item => item.score > 0)
  .sort((a, b) => b.score - a.score)
  .slice(0, 3)
  .map(item => item.store);

  return { products: matchedProducts, stores: matchedStores };
}

// Initialize Gemini Client
let geminiClient = null;
function getGeminiClient() {
  if (!geminiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('[CHAT] GEMINI_API_KEY not found in environment.');
      return null;
    }
    geminiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return geminiClient;
}

const SYSTEM_INSTRUCTION = `You are the official PlayNewApps Smart Shopping & Customer Support AI Assistant.
PlayNewApps (playnewapps.com) is a premier platform offering verified discount promo codes, software deals, and tech gear recommendations.

CRITICAL INSTRUCTIONS:
- BE FAST, CONCISE, AND HELPFUL. Keep your response under 180 words.
- When recommending any product, ALWAYS provide direct Amazon links with affiliate tag "${ASSOCIATE_TAG}":
  [Check Price & Deals on Amazon ↗](https://www.amazon.com/s?k=[URL_ENCODED_PRODUCT]&tag=${ASSOCIATE_TAG})
- Highlight 2-3 top recommended choices with key benefits and approximate prices.
- When answering customer support questions (coupons, stores, codes), provide short, clear, bulleted instructions.
- Never output raw unformatted URLs; use clean markdown links.`;

// Fallback generator when AI API is unavailable or times out
function generateSmartFallback(message, searchResults) {
  const cleanQ = (message || '').trim().replace(/^(find|show|give|search|recommend|get)\s+(me\s+)?(a\s+|an\s+|the\s+)?/i, '').trim();
  const amazonSearchUrl = getAmazonSearchUrl(cleanQ || message);

  if (searchResults.products.length > 0) {
    const p1 = searchResults.products[0];
    return {
      reply: `Here are verified deals and top-rated options for **${cleanQ || message}**:\n\n* **Top Pick:** [${p1.title}](${p1.affiliateUrl}) — **${p1.salePrice || p1.price || 'Verified Deal'}** on ${p1.merchantName || 'Amazon'}.\n* **Explore More:** Browse all live discounts, customer reviews, and Prime shipping deals:\n\n[Check Live Deals for "${cleanQ || message}" on Amazon ↗](${amazonSearchUrl})\n\n*(All prices and availability are verified daily on PlayNewApps.)*`,
      recommendedProducts: searchResults.products.slice(0, 3)
    };
  }

  // Customer support check
  const lower = (message || '').toLowerCase();
  if (lower.includes('coupon') || lower.includes('code') || lower.includes('promo') || lower.includes('discount') || lower.includes('how to use')) {
    return {
      reply: `### How to Use Coupons & Deals on PlayNewApps:
1. **Find Your Store:** Browse our [Partner Stores](/stores) or search for your favorite merchant (e.g., Lenovo, AliExpress, Hostinger, PureVPN).
2. **Click "Show Code":** This automatically **copies the promo code** to your clipboard and opens the merchant checkout in a new tab.
3. **Paste at Checkout:** Paste the code into the merchant's "Promo Code" or "Voucher" box and click Apply.
4. **"Get Deal" Offers:** No code required! The discount is applied automatically when you click the deal link.`,
      recommendedProducts: []
    };
  }

  return {
    reply: `Here are the highest-rated options and live deals for **${cleanQ || message}** available on Amazon:\n\n* **Top Recommendations:** Explore best-sellers featuring verified customer ratings, multi-year warranties, and Prime delivery.\n* **Live Price Check:** [View All Top-Rated "${cleanQ || message}" on Amazon ↗](${amazonSearchUrl})\n\nNeed help with coupons or a specific brand? Let me know!`,
    recommendedProducts: []
  };
}

async function handleChat(message, history = []) {
  if (!message || typeof message !== 'string' || !message.trim()) {
    throw new Error('Message is required.');
  }

  // Find matching catalog items for grounded context
  const searchResults = searchCatalog(message, 4);

  try {
    const client = getGeminiClient();
    if (!client) {
      console.warn('[CHAT] Gemini API client not available, using smart fallback.');
      return generateSmartFallback(message, searchResults);
    }

    let contextSnippet = '';
    if (searchResults.products.length > 0) {
      contextSnippet += '\n\n[PlayNewApps Verified Deals Matching Query]:\n';
      searchResults.products.slice(0, 3).forEach((p, idx) => {
        contextSnippet += `${idx + 1}. ${p.title} | Price: ${p.salePrice || p.price || 'N/A'} | Link: ${p.affiliateUrl}\n`;
      });
    }

    // Format multi-turn contents
    const contents = [];
    if (Array.isArray(history)) {
      for (const h of history.slice(-4)) { // Keep last 4 turns for low latency
        if (h && (h.role === 'user' || h.role === 'model') && Array.isArray(h.parts) && h.parts.length > 0) {
          contents.push({
            role: h.role,
            parts: h.parts.map(pt => ({ text: String(pt.text || '') }))
          });
        }
      }
    }

    const currentPrompt = contextSnippet
      ? `${message.trim()}\n\n---\n*Catalog Items*:${contextSnippet}`
      : message.trim();

    contents.push({
      role: 'user',
      parts: [{ text: currentPrompt }]
    });

    // Call Gemini 3.1 Flash Lite with timeout protection
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('AI response timed out')), 9000)
    );

    const apiPromise = client.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.5,
        maxOutputTokens: 600
      }
    });

    const response = await Promise.race([apiPromise, timeoutPromise]);
    const reply = response.text || generateSmartFallback(message, searchResults).reply;

    return {
      reply,
      recommendedProducts: searchResults.products.slice(0, 3)
    };
  } catch (err) {
    console.warn('[CHAT] Gemini API call failed or timed out:', err.message);
    return generateSmartFallback(message, searchResults);
  }
}

module.exports = {
  handleChat,
  searchCatalog,
  getAmazonSearchUrl,
  formatAmazonAffiliateUrl
};
