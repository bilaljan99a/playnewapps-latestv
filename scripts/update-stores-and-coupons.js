const fs = require('fs');

// 1. Update stores.json
const stores = JSON.parse(fs.readFileSync('data/stores.json', 'utf8'));

const discoverCarsStore = {
  id: "discovercars",
  name: "DiscoverCars",
  icon: "directions_car",
  logo: "/assets/images/brands/discovercars.svg",
  website: "https://www.discovercars.com/",
  storeUrl: "/discovercars-coupons.html",
  affiliateLink: "https://naiawork.com/g/wqjhitsyjqb68b264a765ea594bb46/",
  rating: 4.6,
  votes: 165400,
  seoTitle: "DiscoverCars Promo Codes, Car Rental Deals & Discounts (2026)",
  seoDescription: "Save up to 70% on worldwide car rentals with verified DiscoverCars deals. Compare 500+ suppliers across 145+ countries with full coverage and free cancellation.",
  about: "DiscoverCars is an award-winning international car rental comparison platform comparing 500+ local and multinational suppliers across 10,000+ destinations in 145+ countries, offering price match guarantees and full coverage protection.",
  categories: [
    "Travel",
    "Car Rentals",
    "Road Trips",
    "Vacation Deals",
    "Airport Transportation"
  ],
  whyShop: [
    "Compare 500+ international & local car rental suppliers in 10,000+ locations",
    "Save up to 70% compared to airport walk-up counter rates",
    "DiscoverCars Full Coverage excess protection from just $6.50/day",
    "100% Free cancellation up to 48 hours before scheduled vehicle pickup",
    "All-inclusive transparent pricing with mandatory taxes and airport fees included",
    "Winner of World Travel Tech Awards & Magellan Gold Award with 4.6/5 Trustpilot score"
  ],
  shoppingTips: [
    "Reserve 2 to 8 weeks in advance for popular summer destinations (Spain, Italy, Greece, Portugal) to secure low early-bird fleet rates.",
    "Filter search results by 'Full-to-Full' fuel policy to avoid costly counter refueling surcharges.",
    "Add DiscoverCars Full Coverage online to save up to 60% compared to airport desk 'Super CDW' packages.",
    "Check weekly rental rates; renting for 7 days can sometimes cost equal to or less than a 5-day rental.",
    "Re-check rates 3 to 4 days prior to departure; if prices drop, rebook and cancel the original reservation for free."
  ],
  faqs: [
    {
      question: "How does DiscoverCars compare car rental rates?",
      answer: "DiscoverCars searches real-time fleet availability across 500+ multinational and local car rental providers simultaneously, negotiating wholesale volume rates that save travelers up to 70%."
    },
    {
      question: "How does DiscoverCars Full Coverage protection work?",
      answer: "DiscoverCars Full Coverage is an excess reimbursement policy that protects your rental vehicle deductible up to approximately $3,300 (€3,000). It covers bodywork, windshield, tires, wheels, mirrors, roof, undercarriage, towing, lockout fees, key replacement, and administrative charges."
    },
    {
      question: "Can I cancel my DiscoverCars booking for free?",
      answer: "Yes. DiscoverCars offers 100% free cancellation on all eligible bookings cancelled up to 48 hours prior to your scheduled vehicle pickup time."
    },
    {
      question: "Do I need a credit card for the security deposit?",
      answer: "While online reservations can be paid with debit or credit cards, most local suppliers require a physical credit card in the primary driver's name for the counter security deposit. DiscoverCars also has a filter for suppliers accepting debit cards for deposits."
    }
  ]
};

// Check if already exists, else insert
const existingIndex = stores.findIndex(s => s.id === "discovercars");
if (existingIndex >= 0) {
  stores[existingIndex] = discoverCarsStore;
} else {
  stores.unshift(discoverCarsStore);
}

fs.writeFileSync('data/stores.json', JSON.stringify(stores, null, 2));
console.log('Successfully updated data/stores.json with DiscoverCars');

// 2. Update coupons.json
const coupons = JSON.parse(fs.readFileSync('data/coupons.json', 'utf8'));

const discoverCarsCoupons = [
  {
    id: "discovercars-worldwide-sale",
    storeId: "discovercars",
    store: "DiscoverCars",
    title: "Up to 70% Off Worldwide Car Rentals",
    description: "Compare 500+ international and local car rental companies across 10,000+ destinations in 145+ countries. Save up to 70% with automatic volume discounts.",
    type: "deal",
    discount: "UP TO 70% OFF",
    verified: true,
    affiliateUrl: "https://naiawork.com/g/wqjhitsyjqb68b264a765ea594bb46/",
    affiliateLink: "https://naiawork.com/g/wqjhitsyjqb68b264a765ea594bb46/",
    badge: "FEATURED DEAL",
    expiry: "2026-12-31"
  },
  {
    id: "discovercars-full-coverage",
    storeId: "discovercars",
    store: "DiscoverCars",
    title: "DiscoverCars Full Coverage Protection (From $6.50/Day)",
    description: "Comprehensive excess reimbursement covering bodywork, windshield, tires, mirrors, locks, towing, and administrative fees up to $3,300.",
    type: "deal",
    discount: "FROM $6.50/DAY",
    verified: true,
    affiliateUrl: "https://naiawork.com/g/wqjhitsyjqb68b264a765ea594bb46/",
    affiliateLink: "https://naiawork.com/g/wqjhitsyjqb68b264a765ea594bb46/",
    badge: "FULL COVERAGE",
    expiry: "2026-12-31"
  },
  {
    id: "discovercars-free-cancellation",
    storeId: "discovercars",
    store: "DiscoverCars",
    title: "100% Free Cancellation Up to 48 Hours Before Pickup",
    description: "Lock in early bird discounted rental rates with full flexibility. Cancel online up to 48 hours before vehicle collection for a 100% full refund.",
    type: "deal",
    discount: "FREE CANCELLATION",
    verified: true,
    affiliateUrl: "https://naiawork.com/g/wqjhitsyjqb68b264a765ea594bb46/",
    affiliateLink: "https://naiawork.com/g/wqjhitsyjqb68b264a765ea594bb46/",
    badge: "FLEXIBLE BOOKING",
    expiry: "2026-12-31"
  },
  {
    id: "discovercars-all-inclusive-rates",
    storeId: "discovercars",
    store: "DiscoverCars",
    title: "All-Inclusive Pricing with Zero Hidden Surcharges",
    description: "Upfront total pricing includes compulsory airport charges, road licensing fees, and mandatory local taxes.",
    type: "deal",
    discount: "0% HIDDEN FEES",
    verified: true,
    affiliateUrl: "https://naiawork.com/g/wqjhitsyjqb68b264a765ea594bb46/",
    affiliateLink: "https://naiawork.com/g/wqjhitsyjqb68b264a765ea594bb46/",
    badge: "ALL TAXES INCLUDED",
    expiry: "2026-12-31"
  },
  {
    id: "discovercars-unlimited-mileage",
    storeId: "discovercars",
    store: "DiscoverCars",
    title: "Unlimited Mileage Car Rental Deals in Major Travel Destinations",
    description: "Drive freely without distance restrictions or expensive per-kilometer penalty fees across Europe, North America, Australia, and New Zealand.",
    type: "deal",
    discount: "UNLIMITED MILES",
    verified: true,
    affiliateUrl: "https://naiawork.com/g/wqjhitsyjqb68b264a765ea594bb46/",
    affiliateLink: "https://naiawork.com/g/wqjhitsyjqb68b264a765ea594bb46/",
    badge: "ROAD TRIP READY",
    expiry: "2026-12-31"
  },
  {
    id: "discovercars-free-additional-driver",
    storeId: "discovercars",
    store: "DiscoverCars",
    title: "Free Additional Driver Deals on Selected Rental Partners",
    description: "Add a spouse or travel companion as an authorized driver at zero extra daily charge with select car rental suppliers.",
    type: "deal",
    discount: "FREE DRIVER",
    verified: true,
    affiliateUrl: "https://naiawork.com/g/wqjhitsyjqb68b264a765ea594bb46/",
    affiliateLink: "https://naiawork.com/g/wqjhitsyjqb68b264a765ea594bb46/",
    badge: "SPECIAL OFFER",
    expiry: "2026-12-31"
  }
];

// Remove existing DiscoverCars coupons if any, then prepend
const filteredCoupons = coupons.filter(c => c.storeId !== "discovercars");
filteredCoupons.unshift(...discoverCarsCoupons);

fs.writeFileSync('data/coupons.json', JSON.stringify(filteredCoupons, null, 2));
console.log('Successfully updated data/coupons.json with DiscoverCars deals');
