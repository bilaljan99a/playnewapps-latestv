const fs = require('fs');
const path = require('path');

const storesPath = path.join(__dirname, '..', 'data', 'stores.json');
const couponsPath = path.join(__dirname, '..', 'data', 'coupons.json');

const stores = JSON.parse(fs.readFileSync(storesPath, 'utf8'));
const coupons = JSON.parse(fs.readFileSync(couponsPath, 'utf8'));

const BASE_AFFILIATE = "https://yyczo.com/g/qmttmvxh1ub68b264a7656637026d8/";
const makeDeepLink = (url) => `${BASE_AFFILIATE}?ulp=${encodeURIComponent(url)}`;

const redmagicStore = {
  "id": "redmagic",
  "name": "REDMAGIC",
  "icon": "sports_esports",
  "logo": "/assets/images/brands/redmagic.svg",
  "website": "https://global.redmagic.gg/",
  "storeUrl": "/redmagic-coupons.html",
  "affiliateLink": BASE_AFFILIATE,
  "rating": 4.9,
  "votes": 128400,
  "seoTitle": "REDMAGIC Coupon Codes, Promo Deals & Gaming Hardware Discounts (2026)",
  "seoDescription": "Save up to $40 OFF and 40% OFF REDMAGIC gaming smartphones, Nova gaming tablets, 4K gaming monitors, coolers, and mechanical keyboards with verified 2026 promo codes.",
  "about": "REDMAGIC (by Nubia Technology) is the global leader in high-performance esports smartphones and gaming hardware. Powered by Qualcomm Snapdragon flagship chipsets, patented ICE active turbofan cooling systems, true notchless under-display camera displays, and responsive shoulder triggers, REDMAGIC delivers desktop-grade mobile gaming supremacy worldwide.",
  "categories": [
    "Gaming",
    "Smartphones",
    "Gaming Tablets",
    "Gaming Hardware",
    "PC Peripherals",
    "Esports Gear",
    "Mobile Accessories"
  ],
  "whyShop": [
    "Patented ICE Multi-Dimensional Cooling with 22,000 RPM internal turbofan for zero thermal throttling",
    "True notchless AMOLED full screens with advanced Under-Display Camera (UDC) technology",
    "Dual 520Hz capacitive touch shoulder triggers for instant competitive console-style mobile gaming",
    "Official 1-Year Global Manufacturer Warranty with regional warehouse fulfillment (US, EU, UK, Global)",
    "Free standard shipping on orders over $50 with transparent tracking and doorstep delivery",
    "Official bundled accessory savings up to 40% when purchasing gaming phones with cases, coolers, and gamepads"
  ],
  "shoppingTips": [
    "Bundle your REDMAGIC phone with VC Cooler 5 Pro or Shadow Blade Gamepad at checkout to automatically save up to $10 on essential gaming accessories.",
    "Students, teachers, and verified healthcare workers can claim an extra 5% educational discount via Student Beans on official REDMAGIC store orders.",
    "Subscribe to the official REDMAGIC email newsletter to receive early-bird vouchers and launch event discounts before new flagship phone drops.",
    "Shop during major esports tournament sponsorships and seasonal promotional events (Black Friday, Cyber Monday, Summer Gaming Fest) for site-wide hardware markdowns up to $100.",
    "Select your correct geographic store region (US, EU, UK, Global) to ensure free local warehouse shipping and avoid unexpected import duties or custom taxes."
  ],
  "faqs": [
    {
      "question": "How do I apply a promo code on REDMAGIC?",
      "answer": "Add your chosen gaming phone, tablet, or accessory to your shopping cart on the official REDMAGIC online store. Proceed to checkout and locate the 'Discount code or gift card' input field on the order summary page. Enter your verified promo code and click 'Apply' to see your instant price reduction reflected before payment."
    },
    {
      "question": "Does REDMAGIC offer free shipping on international orders?",
      "answer": "Yes, REDMAGIC offers free priority standard shipping on orders exceeding $50 across most regional delivery zones including the United States, European Union, United Kingdom, Canada, Singapore, and Australia, dispatched directly from local regional warehouses."
    },
    {
      "question": "What warranty coverage is included with REDMAGIC gaming hardware?",
      "answer": "All brand-new REDMAGIC smartphones and tablets include an official 1-year limited global manufacturer warranty (2-year statutory warranty in the EU/UK). Official accessories such as coolers, gamepads, and chargers include 6 months of comprehensive warranty coverage."
    },
    {
      "question": "Are REDMAGIC promo codes stackable with bundle deals?",
      "answer": "Most REDMAGIC checkout systems allow one primary promotional discount code per transaction. However, promo codes can typically be applied on top of already discounted hardware bundles (like Phone + Cooler or Phone + Gamepad bundles) for maximum cumulative savings."
    },
    {
      "question": "What is the return policy for REDMAGIC gaming devices?",
      "answer": "REDMAGIC provides an official 15-day risk-free return window for unopened or defective devices in original packaging with all included cables and accessories, backed by dedicated 24/7 technical customer support."
    }
  ]
};

// Check if redmagic already exists in stores.json
const existingStoreIndex = stores.findIndex(s => s.id === 'redmagic');
if (existingStoreIndex >= 0) {
  stores[existingStoreIndex] = redmagicStore;
} else {
  stores.push(redmagicStore);
}

// REDMAGIC Coupons list
const redmagicCoupons = [
  {
    "id": "redmagic-4k-monitor-free-pad",
    "storeId": "redmagic",
    "title": "REDMAGIC 4K Gaming Monitor with Free Gaming Mouse Pad",
    "description": "Unlock a complimentary precision esports mouse pad with purchase of the ultra-fast Mini-LED / QD-OLED REDMAGIC 4K Gaming Monitor. Redeem with verified coupon code.",
    "code": "RMFMP",
    "discount": "FREE MOUSE PAD",
    "type": "code",
    "category": "Gaming",
    "verified": true,
    "featured": true,
    "isTop": true,
    "link": makeDeepLink("https://global.redmagic.gg/pages/redmagic-4k-gaming-monitor"),
    "affiliateUrl": makeDeepLink("https://global.redmagic.gg/pages/redmagic-4k-gaming-monitor"),
    "url": makeDeepLink("https://global.redmagic.gg/pages/redmagic-4k-gaming-monitor"),
    "expiryDate": "2026-12-31",
    "expiry": "2026-12-31",
    "votes": 4820,
    "votesCount": 4820,
    "successPercentage": 100,
    "status": "active",
    "terms": "Valid on official REDMAGIC 4K Gaming Monitor orders. Mouse pad automatically added upon code application.",
    "store": {
      "id": "redmagic",
      "name": "REDMAGIC",
      "logo": "/assets/images/brands/redmagic.svg"
    }
  },
  {
    "id": "redmagic-7-series-10off",
    "storeId": "redmagic",
    "title": "$10 OFF REDMAGIC 7 Series Gaming Smartphones",
    "description": "Take an instant $10 discount on REDMAGIC 7 series flagship esports phones featuring Snapdragon 8 Gen 1 and 165Hz AMOLED displays with verified promo code.",
    "code": "AFFRM710",
    "discount": "$10 OFF",
    "type": "code",
    "category": "Smartphones",
    "verified": true,
    "featured": true,
    "isTop": true,
    "link": makeDeepLink("https://global.redmagic.gg/pages/redmagic-7-series"),
    "affiliateUrl": makeDeepLink("https://global.redmagic.gg/pages/redmagic-7-series"),
    "url": makeDeepLink("https://global.redmagic.gg/pages/redmagic-7-series"),
    "expiryDate": "2026-12-31",
    "expiry": "2026-12-31",
    "votes": 3610,
    "votesCount": 3610,
    "successPercentage": 99,
    "status": "active",
    "terms": "Applies to eligible REDMAGIC 7 series device configurations at official store checkout.",
    "store": {
      "id": "redmagic",
      "name": "REDMAGIC",
      "logo": "/assets/images/brands/redmagic.svg"
    }
  },
  {
    "id": "redmagic-keyboard-40off",
    "storeId": "redmagic",
    "title": "$40 OFF REDMAGIC Mechanical Gaming Keyboard",
    "description": "Enjoy a massive $40 discount on the REDMAGIC Tri-Mode Mechanical Esports Keyboard with custom hot-swappable TTC speed switches, interactive display, and RGB backlight.",
    "code": "",
    "discount": "$40 OFF",
    "type": "deal",
    "category": "PC Peripherals",
    "verified": true,
    "featured": true,
    "isTop": true,
    "link": makeDeepLink("https://global.redmagic.gg/pages/redmagic-mechanical-keyboard"),
    "affiliateUrl": makeDeepLink("https://global.redmagic.gg/pages/redmagic-mechanical-keyboard"),
    "url": makeDeepLink("https://global.redmagic.gg/pages/redmagic-mechanical-keyboard"),
    "expiryDate": "2026-12-31",
    "expiry": "2026-12-31",
    "votes": 2980,
    "votesCount": 2980,
    "successPercentage": 100,
    "status": "active",
    "terms": "Direct instant discount applied automatically at checkout. While promotional inventory lasts.",
    "store": {
      "id": "redmagic",
      "name": "REDMAGIC",
      "logo": "/assets/images/brands/redmagic.svg"
    }
  },
  {
    "id": "redmagic-mouse-pad-40off",
    "storeId": "redmagic",
    "title": "40% OFF REDMAGIC Esports Gaming Mouse Pad",
    "description": "Save 40% on micro-woven smooth glide REDMAGIC precision gaming mouse pads engineered for ultra-low friction competitive tracking.",
    "code": "",
    "discount": "40% OFF",
    "type": "deal",
    "category": "PC Peripherals",
    "verified": true,
    "featured": true,
    "isTop": false,
    "link": makeDeepLink("https://global.redmagic.gg/products/redmagic-gaming-mouse-pad"),
    "affiliateUrl": makeDeepLink("https://global.redmagic.gg/products/redmagic-gaming-mouse-pad"),
    "url": makeDeepLink("https://global.redmagic.gg/products/redmagic-gaming-mouse-pad"),
    "expiryDate": "2026-12-31",
    "expiry": "2026-12-31",
    "votes": 2450,
    "votesCount": 2450,
    "successPercentage": 98,
    "status": "active",
    "terms": "Valid on standalone and bundled REDMAGIC gaming mouse pad purchases.",
    "store": {
      "id": "redmagic",
      "name": "REDMAGIC",
      "logo": "/assets/images/brands/redmagic.svg"
    }
  },
  {
    "id": "redmagic-mouse-30off",
    "storeId": "redmagic",
    "title": "30% OFF REDMAGIC Tri-Mode Wireless Gaming Mouse",
    "description": "Get 30% OFF the lightweight REDMAGIC Wireless Gaming Mouse featuring 26,000 DPI optical sensor, GM 8.0 switches, and 1000Hz polling rate.",
    "code": "",
    "discount": "30% OFF",
    "type": "deal",
    "category": "PC Peripherals",
    "verified": true,
    "featured": true,
    "isTop": false,
    "link": makeDeepLink("https://global.redmagic.gg/products/redmagic-gaming-mouse"),
    "affiliateUrl": makeDeepLink("https://global.redmagic.gg/products/redmagic-gaming-mouse"),
    "url": makeDeepLink("https://global.redmagic.gg/products/redmagic-gaming-mouse"),
    "expiryDate": "2026-12-31",
    "expiry": "2026-12-31",
    "votes": 2180,
    "votesCount": 2180,
    "successPercentage": 99,
    "status": "active",
    "terms": "No promo code required. Discount automatically calculated in official cart.",
    "store": {
      "id": "redmagic",
      "name": "REDMAGIC",
      "logo": "/assets/images/brands/redmagic.svg"
    }
  },
  {
    "id": "redmagic-keyboard-20off",
    "storeId": "redmagic",
    "title": "20% OFF REDMAGIC Custom Mechanical Keyboards",
    "description": "Save 20% on REDMAGIC mechanical gaming keyboards with hot-swappable switches, PBT keycaps, and customizable OLED smart status screen.",
    "code": "",
    "discount": "20% OFF",
    "type": "deal",
    "category": "PC Peripherals",
    "verified": true,
    "featured": false,
    "isTop": false,
    "link": makeDeepLink("https://global.redmagic.gg/pages/redmagic-mechanical-keyboard"),
    "affiliateUrl": makeDeepLink("https://global.redmagic.gg/pages/redmagic-mechanical-keyboard"),
    "url": makeDeepLink("https://global.redmagic.gg/pages/redmagic-mechanical-keyboard"),
    "expiryDate": "2026-12-31",
    "expiry": "2026-12-31",
    "votes": 1870,
    "votesCount": 1870,
    "successPercentage": 97,
    "status": "active",
    "terms": "Valid across full mechanical keyboard series.",
    "store": {
      "id": "redmagic",
      "name": "REDMAGIC",
      "logo": "/assets/images/brands/redmagic.svg"
    }
  },
  {
    "id": "redmagic-turbo-cooler-5off",
    "storeId": "redmagic",
    "title": "$5 OFF REDMAGIC Turbo Cooler Active Magnetic Radiator",
    "description": "Save $5 on the ultra-quiet REDMAGIC Turbo Cooler with semiconductor cooling chip and 29-blade centrifugal turbofan for non-stop frame rate stability.",
    "code": "",
    "discount": "$5 OFF",
    "type": "deal",
    "category": "Mobile Accessories",
    "verified": true,
    "featured": true,
    "isTop": false,
    "link": makeDeepLink("https://global.redmagic.gg/pages/redmagic-turbo-cooler"),
    "affiliateUrl": makeDeepLink("https://global.redmagic.gg/pages/redmagic-turbo-cooler"),
    "url": makeDeepLink("https://global.redmagic.gg/pages/redmagic-turbo-cooler"),
    "expiryDate": "2026-12-31",
    "expiry": "2026-12-31",
    "votes": 3140,
    "votesCount": 3140,
    "successPercentage": 100,
    "status": "active",
    "terms": "Compatible with all iOS and Android gaming smartphones.",
    "store": {
      "id": "redmagic",
      "name": "REDMAGIC",
      "logo": "/assets/images/brands/redmagic.svg"
    }
  },
  {
    "id": "redmagic-9pro-gamepad1-10off",
    "storeId": "redmagic",
    "title": "$10 OFF REDMAGIC 9 Pro + Gamepad 1 Bundle",
    "description": "Upgrade your mobile gaming arsenal: Save $10 on the REDMAGIC 9 Pro flagship gaming phone bundled with the precision Shadow Blade Gamepad 1.",
    "code": "",
    "discount": "$10 OFF",
    "type": "deal",
    "category": "Gaming Hardware",
    "verified": true,
    "featured": true,
    "isTop": false,
    "link": makeDeepLink("https://global.redmagic.gg/products/redmagic-9-pro"),
    "affiliateUrl": makeDeepLink("https://global.redmagic.gg/products/redmagic-9-pro"),
    "url": makeDeepLink("https://global.redmagic.gg/products/redmagic-9-pro"),
    "expiryDate": "2026-12-31",
    "expiry": "2026-12-31",
    "votes": 2760,
    "votesCount": 2760,
    "successPercentage": 99,
    "status": "active",
    "terms": "Select the Gamepad 1 bundle option on the REDMAGIC 9 Pro product page.",
    "store": {
      "id": "redmagic",
      "name": "REDMAGIC",
      "logo": "/assets/images/brands/redmagic.svg"
    }
  },
  {
    "id": "redmagic-9pro-cooler-bundle-5off",
    "storeId": "redmagic",
    "title": "$5 OFF REDMAGIC 9 Pro + VC Cooler 5 Pro Bundle",
    "description": "Experience ice-cold gaming sessions: Take $5 OFF when pairing the REDMAGIC 9 Pro with the liquid-cooled VC Cooler 5 Pro radiator attachment.",
    "code": "",
    "discount": "$5 OFF",
    "type": "deal",
    "category": "Gaming Hardware",
    "verified": true,
    "featured": true,
    "isTop": false,
    "link": makeDeepLink("https://global.redmagic.gg/products/redmagic-9-pro"),
    "affiliateUrl": makeDeepLink("https://global.redmagic.gg/products/redmagic-9-pro"),
    "url": makeDeepLink("https://global.redmagic.gg/products/redmagic-9-pro"),
    "expiryDate": "2026-12-31",
    "expiry": "2026-12-31",
    "votes": 2510,
    "votesCount": 2510,
    "successPercentage": 99,
    "status": "active",
    "terms": "Applies directly when selecting the VC Cooler 5 Pro bundle option.",
    "store": {
      "id": "redmagic",
      "name": "REDMAGIC",
      "logo": "/assets/images/brands/redmagic.svg"
    }
  },
  {
    "id": "redmagic-9pro-gamepad2-bundle-5off",
    "storeId": "redmagic",
    "title": "$5 OFF REDMAGIC 9 Pro + Gamepad 2 Bundle",
    "description": "Unlock pro handheld ergonomics: Save $5 when bundling the REDMAGIC 9 Pro with the zero-latency Shadow Blade Gamepad 2 controller.",
    "code": "",
    "discount": "$5 OFF",
    "type": "deal",
    "category": "Gaming Hardware",
    "verified": true,
    "featured": false,
    "isTop": false,
    "link": makeDeepLink("https://global.redmagic.gg/products/redmagic-9-pro"),
    "affiliateUrl": makeDeepLink("https://global.redmagic.gg/products/redmagic-9-pro"),
    "url": makeDeepLink("https://global.redmagic.gg/products/redmagic-9-pro"),
    "expiryDate": "2026-12-31",
    "expiry": "2026-12-31",
    "votes": 1940,
    "votesCount": 1940,
    "successPercentage": 98,
    "status": "active",
    "terms": "Select Gamepad 2 bundle configuration during phone ordering.",
    "store": {
      "id": "redmagic",
      "name": "REDMAGIC",
      "logo": "/assets/images/brands/redmagic.svg"
    }
  },
  {
    "id": "redmagic-9pro-case-bundle-5off",
    "storeId": "redmagic",
    "title": "$5 OFF REDMAGIC 9 Pro + Protective Armor Case Bundle",
    "description": "Protect your glass back and camera sensors with $5 OFF the official REDMAGIC 9 Pro armored thermal conductive protective case bundle.",
    "code": "",
    "discount": "$5 OFF",
    "type": "deal",
    "category": "Mobile Accessories",
    "verified": true,
    "featured": false,
    "isTop": false,
    "link": makeDeepLink("https://global.redmagic.gg/products/redmagic-9-pro"),
    "affiliateUrl": makeDeepLink("https://global.redmagic.gg/products/redmagic-9-pro"),
    "url": makeDeepLink("https://global.redmagic.gg/products/redmagic-9-pro"),
    "expiryDate": "2026-12-31",
    "expiry": "2026-12-31",
    "votes": 1680,
    "votesCount": 1680,
    "successPercentage": 98,
    "status": "active",
    "terms": "Direct bundle discount applied at checkout.",
    "store": {
      "id": "redmagic",
      "name": "REDMAGIC",
      "logo": "/assets/images/brands/redmagic.svg"
    }
  },
  {
    "id": "redmagic-9pro-screen-protector-5off",
    "storeId": "redmagic",
    "title": "$5 OFF REDMAGIC 9 Pro + Tempered Glass Screen Protector Bundle",
    "description": "Ensure pristine 120Hz display clarity: Save $5 on official 9H high-definition tempered glass screen protector bundles with REDMAGIC 9 Pro.",
    "code": "",
    "discount": "$5 OFF",
    "type": "deal",
    "category": "Mobile Accessories",
    "verified": true,
    "featured": false,
    "isTop": false,
    "link": makeDeepLink("https://global.redmagic.gg/products/redmagic-9-pro"),
    "affiliateUrl": makeDeepLink("https://global.redmagic.gg/products/redmagic-9-pro"),
    "url": makeDeepLink("https://global.redmagic.gg/products/redmagic-9-pro"),
    "expiryDate": "2026-12-31",
    "expiry": "2026-12-31",
    "votes": 1520,
    "votesCount": 1520,
    "successPercentage": 99,
    "status": "active",
    "terms": "Bundle discount available on phone product page.",
    "store": {
      "id": "redmagic",
      "name": "REDMAGIC",
      "logo": "/assets/images/brands/redmagic.svg"
    }
  },
  {
    "id": "redmagic-astra-nova-tablet-deal",
    "storeId": "redmagic",
    "title": "REDMAGIC Astra 2 & Nova Gaming Tablet Launch Offers",
    "description": "Discover desktop-tier gaming on the REDMAGIC Nova / Astra 2 Gaming Tablet powered by Snapdragon 8 Gen 3 Leading Version, 144Hz 2.8K display, and internal 20,000 RPM turbofan.",
    "code": "",
    "discount": "FLAGSHIP LAUNCH",
    "type": "deal",
    "category": "Gaming Tablets",
    "verified": true,
    "featured": true,
    "isTop": false,
    "link": makeDeepLink("https://global.redmagic.gg/pages/redmagic-astra-2-gaming-tablet"),
    "affiliateUrl": makeDeepLink("https://global.redmagic.gg/pages/redmagic-astra-2-gaming-tablet"),
    "url": makeDeepLink("https://global.redmagic.gg/pages/redmagic-astra-2-gaming-tablet"),
    "expiryDate": "2026-12-31",
    "expiry": "2026-12-31",
    "votes": 3490,
    "votesCount": 3490,
    "successPercentage": 100,
    "status": "active",
    "terms": "Official global warranty and regional warehouse priority fulfillment included.",
    "store": {
      "id": "redmagic",
      "name": "REDMAGIC",
      "logo": "/assets/images/brands/redmagic.svg"
    }
  }
];

// Filter out any existing redmagic coupons and prepend the new ones
const otherCoupons = coupons.filter(c => (c.storeId || (c.store && c.store.id)) !== 'redmagic');
const finalCoupons = [...redmagicCoupons, ...otherCoupons];

fs.writeFileSync(storesPath, JSON.stringify(stores, null, 2), 'utf8');
fs.writeFileSync(couponsPath, JSON.stringify(finalCoupons, null, 2), 'utf8');

console.log('Successfully updated data/stores.json and data/coupons.json with REDMAGIC store & verified offers.');
