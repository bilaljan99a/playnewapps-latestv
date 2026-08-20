const fs = require('fs');
const path = require('path');

const couponsPath = path.join(__dirname, '..', 'data', 'coupons.json');
const rawData = fs.readFileSync(couponsPath, 'utf8');
const coupons = JSON.parse(rawData);

function sanitizeCurrency(str) {
    if (!str) return str;
    return str
        .replace(/US\s*\$/gi, '$')
        .replace(/USD\s*\$/gi, '$')
        .replace(/US\s*(\$\d+)/gi, '$1')
        .replace(/\bUSD\s+(\d+)/gi, '$$$1')
        .replace(/(\$\d+)\s*USD\b/gi, '$1');
}

function sanitizeCodeInText(text, code) {
    if (!text) return text;
    let res = sanitizeCurrency(text);
    if (!code || typeof code !== 'string' || code.trim().length === 0) return res;
    
    const trimmedCode = code.trim();
    if (trimmedCode.length < 2) return res;

    const escaped = trimmedCode.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Matches patterns like "Use promo code XXX at checkout", "with code XXX", "code XXX", "coupon XXX"
    const pattern1 = new RegExp(`(?:use\\s+)?(?:promo\\s+|coupon\\s+)?code\\s*[:=-]?\\s*${escaped}\\s*(?:at\\s+checkout)?`, 'gi');
    const pattern2 = new RegExp(`with\\s+(?:promo\\s+|coupon\\s+)?code\\s*[:=-]?\\s*${escaped}`, 'gi');
    const pattern3 = new RegExp(`\\b${escaped}\\b`, 'g');

    res = res.replace(pattern1, 'with verified promo code');
    res = res.replace(pattern2, 'with verified promo code');
    res = res.replace(pattern3, 'promo code');
    
    // Clean up any double spaces
    res = res.replace(/\s{2,}/g, ' ').trim();
    return res;
}

let modifiedCount = 0;

for (const c of coupons) {
    let changed = false;
    const oldTitle = c.title;
    const oldDesc = c.description;
    const oldDisc = c.discount;

    c.title = sanitizeCodeInText(c.title, c.code);
    c.description = sanitizeCodeInText(c.description, c.code);
    if (c.discount) {
        c.discount = sanitizeCurrency(c.discount);
    }
    if (c.terms) {
        c.terms = sanitizeCodeInText(c.terms, c.code);
    }
    if (Array.isArray(c.badges)) {
        c.badges = c.badges.map(b => sanitizeCurrency(sanitizeCodeInText(b, c.code)));
    }

    if (c.title !== oldTitle || c.description !== oldDesc || c.discount !== oldDisc) {
        modifiedCount++;
    }
}

fs.writeFileSync(couponsPath, JSON.stringify(coupons, null, 2), 'utf8');
console.log(`Sanitized ${modifiedCount} coupons in data/coupons.json successfully.`);
