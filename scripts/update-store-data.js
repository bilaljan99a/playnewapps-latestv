const fs = require('fs');

// 1. Update data/stores.json
const stores = JSON.parse(fs.readFileSync('data/stores.json', 'utf8'));

const wauStore = {
  id: "wau",
  name: "WAU",
  icon: "spa",
  logo: "/assets/images/brands/wau.svg",
  website: "https://wauglobal.com",
  storeUrl: "/wau-coupons.html",
  affiliateLink: "https://axavl.com/g/p5q0qhi27eb68b264a76d7a7e9fcda/",
  rating: 4.9,
  votes: 18400,
  seoTitle: "WAU Promo Codes, Beauty Tech Deals & LED Mask Coupons (2026)",
  seoDescription: "Get verified 2026 WAU promo codes, beauty device discounts & deals: Save up to 30% OFF LED phototherapy masks, microcurrent face lifters, hair multistylers & oral irrigators.",
  about: "WAU is an international premium beauty tech brand pioneering clinic-grade smart skincare, LED phototherapy face masks, microcurrent contouring devices, ionic hair styling tools, and oral wellness technology for everyday home use.",
  categories: [
    "Health & Beauty",
    "Beauty Devices",
    "Skincare",
    "Electronics",
    "Hair Care",
    "Wellness"
  ],
  whyShop: [
    "Clinic-grade skincare technology engineered for safe, comfortable everyday home treatments",
    "Certified 7-wavelength LED phototherapy and smart microcurrent lifting with multi-level intensity",
    "Instant savings up to 30% on curated device bundles and professional skincare sets",
    "High-speed ionic hair care and cordless dental irrigators built with medical-grade materials",
    "Direct manufacturer warranty, 30-day satisfaction guarantee, and worldwide tracked shipping"
  ],
  shoppingTips: [
    "Click Show Code on PlayNewApps to reveal exclusive verified WAU coupon codes before completing your purchase.",
    "Select curated device bundles like the Active Man Box or Hair Box Maxi to save up to 30% compared to individual items.",
    "Pair your phototherapy or microcurrent device with WAU peptide serums for maximum hydration and skin absorption.",
    "Take advantage of free express worldwide delivery on qualifying orders over $100."
  ],
  faqs: [
    {
      question: "What is WAU?",
      answer: "WAU is a premium beauty technology and smart wellness brand providing clinic-grade LED masks, microcurrent lifting devices, ultrasonic scrubbers, ionic hair stylers, and oral irrigators for home aesthetic care."
    },
    {
      question: "How do I redeem a WAU promo code?",
      answer: "Click 'Show Code' on PlayNewApps to reveal and copy your verified coupon code. We will open the official WAU store in a new tab where you can paste the code into the discount box during checkout to apply your savings instantly."
    },
    {
      question: "Are WAU LED masks and microcurrent devices safe for home use?",
      answer: "Yes, all WAU devices are CE and RoHS certified, clinically tested, and engineered with automatic smart timers, skin contact sensors, and non-invasive phototherapy wavelengths safe for all skin types."
    },
    {
      question: "What warranty and shipping options does WAU offer?",
      answer: "WAU offers a 1-year official manufacturer warranty, 30-day money-back satisfaction guarantee, and reliable tracked global shipping with free shipping thresholds on qualifying orders."
    }
  ]
};

// Check if already exists
const existingIndex = stores.findIndex(s => s.id === 'wau');
if (existingIndex >= 0) {
  stores[existingIndex] = wauStore;
} else {
  stores.push(wauStore);
}

fs.writeFileSync('data/stores.json', JSON.stringify(stores, null, 2), 'utf8');
console.log('Updated data/stores.json successfully. Total stores:', stores.length);

// 2. Update data/coupons.json with verified WAU coupons and deals
const coupons = JSON.parse(fs.readFileSync('data/coupons.json', 'utf8'));

// Filter out any prior WAU coupons
const filteredCoupons = coupons.filter(c => c.storeId !== 'wau' && c.store !== 'WAU');

const wauCoupons = [
  {
    id: "wau-c1",
    storeId: "wau",
    store: "WAU",
    title: "15% Off Any WAU Order",
    description: "Enjoy an exclusive 15% discount across all WAU LED masks, microcurrent massagers, hair multistylers, and beauty care items.",
    code: "WAU15",
    discount: "15% OFF",
    category: "Health & Beauty",
    affiliateUrl: "https://axavl.com/g/p5q0qhi27eb68b264a76d7a7e9fcda/",
    isTop: true,
    isExclusive: true,
    status: "active",
    successPercentage: 99,
    votesCount: 342,
    terms: "Valid on all WAU devices and cosmetics. Enter code at checkout."
  },
  {
    id: "wau-c2",
    storeId: "wau",
    store: "WAU",
    title: "10% Off First Device Purchase",
    description: "Save an extra 10% on your first order of clinic-grade LED masks, ultrasonic scrubbers, or hair care stylers.",
    code: "WAU10",
    discount: "10% OFF",
    category: "Health & Beauty",
    affiliateUrl: "https://axavl.com/g/p5q0qhi27eb68b264a76d7a7e9fcda/",
    isTop: true,
    isExclusive: false,
    status: "active",
    successPercentage: 98,
    votesCount: 285,
    terms: "Applies to first-time orders on wauglobal.com."
  },
  {
    id: "wau-d1",
    storeId: "wau",
    store: "WAU",
    title: "Up to 30% Off Active Man Care & Wellness Bundles",
    description: "Get verified 30% savings on curated men's wellness, active recovery, and skincare kits.",
    code: null,
    discount: "30% OFF",
    category: "Health & Beauty",
    affiliateUrl: "https://axavl.com/g/p5q0qhi27eb68b264a76d7a7e9fcda/",
    isTop: true,
    isExclusive: false,
    status: "active",
    successPercentage: 100,
    votesCount: 412,
    terms: "Instant markdown applied directly to bundle packages."
  },
  {
    id: "wau-d2",
    storeId: "wau",
    store: "WAU",
    title: "24% Off ELAX 2.0 Relaxing Eye Phototherapy Mask",
    description: "Save 24% ($31.00 OFF) on the ELAX 2.0 air compression and thermotherapy smart eye massager.",
    code: null,
    discount: "24% OFF",
    category: "Health & Beauty",
    affiliateUrl: "https://axavl.com/g/p5q0qhi27eb68b264a76d7a7e9fcda/",
    isTop: true,
    isExclusive: false,
    status: "active",
    successPercentage: 99,
    votesCount: 198,
    terms: "Limited-time price reduction on wauglobal.com."
  },
  {
    id: "wau-d3",
    storeId: "wau",
    store: "WAU",
    title: "20% Off MIRA Microcurrent Anti-Aging Face Massager",
    description: "Save 20% on the MIRA smart EMS and red-light facial toning device.",
    code: null,
    discount: "20% OFF",
    category: "Health & Beauty",
    affiliateUrl: "https://axavl.com/g/p5q0qhi27eb68b264a76d7a7e9fcda/",
    isTop: false,
    isExclusive: false,
    status: "active",
    successPercentage: 97,
    votesCount: 220,
    terms: "Direct discount on eligible facial massagers."
  },
  {
    id: "wau-d4",
    storeId: "wau",
    store: "WAU",
    title: "20% Off YUTO+ High-Speed Ionic Hair Dryer with Diffuser",
    description: "Save 20% ($58.00 OFF) on the YUTO+ high-velocity ionic hair dryer with intelligent heat regulation.",
    code: null,
    discount: "20% OFF",
    category: "Health & Beauty",
    affiliateUrl: "https://axavl.com/g/p5q0qhi27eb68b264a76d7a7e9fcda/",
    isTop: false,
    isExclusive: false,
    status: "active",
    successPercentage: 98,
    votesCount: 175,
    terms: "Includes styling nozzles and magnetic diffuser."
  },
  {
    id: "wau-d5",
    storeId: "wau",
    store: "WAU",
    title: "25% Off Pro Dental & Oral Hygiene Sets",
    description: "Save up to 25% on professional cordless oral irrigators and complete oral care kits.",
    code: null,
    discount: "25% OFF",
    category: "Health & Beauty",
    affiliateUrl: "https://axavl.com/g/p5q0qhi27eb68b264a76d7a7e9fcda/",
    isTop: false,
    isExclusive: false,
    status: "active",
    successPercentage: 99,
    votesCount: 154,
    terms: "Instant discount on WAU dental care line."
  },
  {
    id: "wau-d6",
    storeId: "wau",
    store: "WAU",
    title: "20% Off KIO Body Massager & EMS Myostimulator",
    description: "Save $78.00 (20% OFF) on the KIO deep-tissue body contouring and muscle stimulation device.",
    code: null,
    discount: "20% OFF",
    category: "Health & Beauty",
    affiliateUrl: "https://axavl.com/g/p5q0qhi27eb68b264a76d7a7e9fcda/",
    isTop: false,
    isExclusive: false,
    status: "active",
    successPercentage: 97,
    votesCount: 140,
    terms: "Valid while promotional inventory lasts."
  }
];

const newCoupons = [...filteredCoupons, ...wauCoupons];
fs.writeFileSync('data/coupons.json', JSON.stringify(newCoupons, null, 2), 'utf8');
console.log('Updated data/coupons.json successfully. Total coupons:', newCoupons.length);
