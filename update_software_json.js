const fs = require('fs');
let data = fs.readFileSync('data/software.json', 'utf8');
let json = JSON.parse(data);

const retouch4me = {
  "id": "retouch4me",
  "name": "Retouch4me",
  "developer": "Retouch4me",
  "category": "AI Photo Editor",
  "rating": 4.9,
  "reviewCount": 8450,
  "summary": "Professional AI-powered portrait retouching plugins for Photoshop and Lightroom, featuring Dodge & Burn, Skin Healing, and automated background cleanup.",
  "logo": "/assets/images/brands/retouch4me-logo.svg",
  "heroImage": "/assets/images/banners/retouch4me-banner-deal-1.svg",
  "reviewUrl": "retouch4me-review.html",
  "affiliateUrl": "https://plrvq.com/g/gp8po8i1u7b68b264a7645d8e108c6/",
  "downloadUrl": "https://plrvq.com/g/gp8po8i1u7b68b264a7645d8e108c6/",
  "pricing": {
    "perpetual": "$124.00 (One-Time Purchase)",
    "subscription": "From $14.99/mo"
  },
  "pros": [
    "Retains natural skin texture perfectly",
    "Non-destructive layer output in Photoshop",
    "Massive time savings with batch processing",
    "Modular pricing - buy only what you need"
  ],
  "cons": [
    "Individual plugins can be expensive upfront",
    "Requires a good GPU for fast processing"
  ],
  "title": "Retouch4me Review 2026",
  "icon": "/assets/images/brands/retouch4me-logo.svg",
  "image": "/assets/images/banners/retouch4me-banner-deal-1.svg",
  "description": "Retouch4me is a professional suite of AI-powered post-processing plugins for Photoshop and Lightroom.",
  "url": "retouch4me-review.html",
  "categoryId": "pc",
  "platforms": [
    "PC",
    "macOS",
    "Windows"
  ]
};

json.unshift(retouch4me);

fs.writeFileSync('data/software.json', JSON.stringify(json, null, 2));
console.log('Successfully added Retouch4me to software.json');
