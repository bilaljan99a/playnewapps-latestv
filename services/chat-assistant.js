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

YOUR PRIMARY ROLES:
1. PRODUCT FINDER & SHOPPING ASSISTANT:
   - When a user asks to find, recommend, or compare products (such as laptops, headphones, monitors, mice, keyboards, smart home devices, smartphones, vacuums, coffee machines, gaming accessories, or software):
     - Give authoritative, helpful product suggestions with key benefits, specs, and estimated prices.
     - ALWAYS provide direct Amazon affiliate links formatted with the affiliate tag "${ASSOCIATE_TAG}".
     - When recommending an Amazon product, use a clean clickable link:
       [Check Price & Availability on Amazon ↗](https://www.amazon.com/s?k=[URL_ENCODED_PRODUCT_NAME]&tag=${ASSOCIATE_TAG})
     - If catalog context provides specific products, prioritize those verified deals and their provided links!
     - Explain why each product is a great choice and highlight potential savings.

2. CUSTOMER SUPPORT & PLATFORM ASSISTANCE:
   - Assist users with shopping questions, coupons, and using the PlayNewApps website:
     - How to use coupon codes: Explain that clicking "Show Code" copies the promo code to their clipboard and opens the official merchant checkout page in a new tab.
     - How to use deals: Explain that "Get Deal" links activate instant discounts automatically without needing a coupon code.
     - Store queries: Answer questions about popular partner stores (AliExpress, Lenovo, Hostinger, PureVPN, Wondershare, AdGuard, Klook, Temu, Walmart, etc.).
     - Categories: Help users navigate categories like Software, Gaming, PC Tools, AI Tools, VPN & Security, Audio, Home, and Tech Gear.
     - Guarantee & Trust: Explain that PlayNewApps team manually verifies discount codes daily to eliminate expired offers.
     - Shopping tips: Offer advice on stacking coupons, student discounts, seasonal sales (Black Friday, Cyber Monday, Choice Day), and free trials.

FORMATTING RULES:
- Use clean Markdown: bold for product names and key specs, bulleted lists for readability.
- Keep responses friendly, concise, and structured.
- Always include the official Amazon affiliate link with tag "${ASSOCIATE_TAG}" when recommending products.
- Never output raw unformatted URLs; always use descriptive markdown anchor text like [View on Amazon ↗](URL) or [Browse Lenovo Deals ↗](URL).`;

async function handleChat(message, history = []) {
  if (!message || typeof message !== 'string' || !message.trim()) {
    throw new Error('Message is required.');
  }

  const client = getGeminiClient();
  if (!client) {
    throw new Error('Gemini API is not configured. Please ensure GEMINI_API_KEY is available.');
  }

  // Find matching catalog items for grounded context
  const searchResults = searchCatalog(message, 4);
  let contextSnippet = '';

  if (searchResults.products.length > 0) {
    contextSnippet += '\n\n[PlayNewApps Verified Catalog Deals Matching Query]:\n';
    searchResults.products.forEach((p, idx) => {
      contextSnippet += `${idx + 1}. ${p.title} | Store: ${p.merchantName || p.store || 'Amazon'} | Price: ${p.salePrice || p.price || 'N/A'} | Link: ${p.affiliateUrl}\n`;
    });
  }

  if (searchResults.stores.length > 0) {
    contextSnippet += '\n[PlayNewApps Featured Stores Matching Query]:\n';
    searchResults.stores.forEach(s => {
      contextSnippet += `- ${s.name} (${s.category || 'General'}): ${s.discountValue || 'Up to 70% OFF'} | Store Page: /${s.slug || s.id}-coupons\n`;
    });
  }

  // Format multi-turn contents
  const contents = [];

  // Add history
  if (Array.isArray(history)) {
    for (const h of history) {
      if (h && (h.role === 'user' || h.role === 'model') && Array.isArray(h.parts) && h.parts.length > 0) {
        contents.push({
          role: h.role,
          parts: h.parts.map(pt => ({ text: String(pt.text || '') }))
        });
      }
    }
  }

  // Append current user message with context grounding
  const currentPrompt = contextSnippet
    ? `${message.trim()}\n\n---\n*Catalog Data Available on PlayNewApps*:${contextSnippet}`
    : message.trim();

  contents.push({
    role: 'user',
    parts: [{ text: currentPrompt }]
  });

  const response = await client.models.generateContent({
    model: 'gemini-3.8-flash',
    contents,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
      topP: 0.95
    }
  });

  const reply = response.text || "I'm here to help you find the best tech products, Amazon deals, and verified discount coupons. What are you shopping for?";

  return {
    reply,
    recommendedProducts: searchResults.products.slice(0, 3)
  };
}

module.exports = {
  handleChat,
  searchCatalog,
  getAmazonSearchUrl,
  formatAmazonAffiliateUrl
};
