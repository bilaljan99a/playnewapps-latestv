const fs = require('fs');

const stores = JSON.parse(fs.readFileSync('data/stores.json', 'utf8'));
const coupons = JSON.parse(fs.readFileSync('data/coupons.json', 'utf8'));

const affiliateLink = "https://codeaven.com/g/zrwntqeht4b68b264a763cffcf918a/";

const eurowingsStore = {
  id: "eurowings",
  name: "Eurowings",
  icon: "flight",
  logo: "/assets/images/brands/eurowings.svg",
  website: "https://www.eurowings.com/",
  storeUrl: "/eurowings-coupons.html",
  affiliateLink: affiliateLink,
  rating: 4.5,
  votes: 94200,
  seoTitle: "Eurowings Promo Codes, Flight Deals & Discounts (2026)",
  seoDescription: "Save on European flights below €35 with verified Eurowings deals. Explore 140+ destinations across Germany, Spain, Italy, and Scandinavia with Miles & More loyalty perks.",
  about: "Eurowings is the value carrier of the Lufthansa Group, offering nonstop point-to-point flights connecting more than 140 destinations across Europe, North Africa, and the Mediterranean with modern Airbus aircraft.",
  categories: [
    "Travel",
    "Airlines",
    "Flight Deals",
    "European Travel",
    "Vacation Packages"
  ],
  whyShop: [
    "Point-to-point direct flights to 140+ European destinations without transit stops",
    "Verified promotional European flights below €35 across popular leisure routes",
    "Part of Lufthansa Group with high German safety and maintenance standards",
    "Earn Miles & More award miles and status points on all fare types",
    "Free mobile and web check-in available 72 hours before flight departure",
    "Dedicated BIZclass cabin with guaranteed empty middle seats and airport lounge access"
  ],
  shoppingTips: [
    "Use the monthly Savings Calendar to locate sub-€35 ticket prices on mid-week departures (Tuesdays and Wednesdays).",
    "Select the SMART fare bundle if traveling with luggage to save up to 50% vs adding baggage a la carte.",
    "Always check in on the Eurowings mobile app between 72h and 3h before takeoff to avoid the €15 airport desk check-in fee on BASIC fares.",
    "Try Eurowings Blind Booking from German hubs (DUS, CGN, HAM, STR, BER) for surprise return flights from €33 per leg.",
    "Add Flex Light for €7 to secure 1 free flight date change up to 40 minutes before scheduled departure."
  ],
  faqs: [
    {
      question: "How do I find Eurowings flights below €35?",
      answer: "Use the Savings Calendar on the official Eurowings booking portal to compare daily prices across the entire month. Mid-week departures (Tuesdays and Wednesdays) consistently have the highest availability of flights priced between €29.99 and €34.99."
    },
    {
      question: "What is included in the Eurowings SMART fare?",
      answer: "The SMART fare includes 1 small personal under-seat item (40x30x25cm), 1 large overhead cabin trolley (55x40x23cm, max 8kg), 1 piece of checked luggage up to 23kg, free standard seat selection, and free check-in at the airport counter."
    },
    {
      question: "Is airport check-in free on Eurowings?",
      answer: "Mobile and online check-in is 100% free for all passengers. On BASIC tickets, checking in at the physical airport desk incurs a €15 fee unless pre-booked online for €2.50. Airport check-in is completely free on SMART and BIZclass fares."
    },
    {
      question: "Can I earn Miles & More points on Eurowings?",
      answer: "Yes. Passengers earn Miles & More award miles and Points/Qualifying Points toward Frequent Traveller and Senator status on all published Eurowings fares."
    }
  ],
  isPopular: true,
  featured: true
};

// Remove existing if any
const existingIndex = stores.findIndex(s => s.id === "eurowings");
if (existingIndex >= 0) {
  stores[existingIndex] = eurowingsStore;
  console.log("Updated existing eurowings in stores.json");
} else {
  stores.unshift(eurowingsStore);
  console.log("Added eurowings to beginning of stores.json");
}

fs.writeFileSync('data/stores.json', JSON.stringify(stores, null, 2));

// Add Coupons
const eurowingsCoupons = [
  {
    id: "ew-flights-35",
    storeId: "eurowings",
    title: "European Flights Below €35",
    description: "Book one-way and return flights starting from €29.99 / €34.99 across major German and European holiday routes.",
    code: "",
    discount: "< €35",
    type: "deal",
    category: "Travel",
    verified: true,
    featured: true,
    link: affiliateLink,
    expiryDate: "2026-12-31",
    votes: 4280,
    terms: "Valid on select European routes. Fares apply to BASIC ticket tier. Taxes and fees included."
  },
  {
    id: "ew-savings-calendar",
    storeId: "eurowings",
    title: "Eurowings Savings Calendar (Lowest Monthly Fares)",
    description: "Scan the entire month to locate the cheapest flight days across 140+ European destinations.",
    code: "",
    discount: "Lowest Rates",
    type: "deal",
    category: "Travel",
    verified: true,
    featured: true,
    link: affiliateLink,
    expiryDate: "2026-12-31",
    votes: 3120,
    terms: "Filter by departure airport to find mid-week flight deals."
  },
  {
    id: "ew-smart-fare",
    storeId: "eurowings",
    title: "SMART Fare Bundle: 23kg Luggage + Cabin Bag + Seat",
    description: "Get 1x 23kg checked bag, 1x 8kg overhead trolley bag, free standard seat selection, and free airport check-in.",
    code: "",
    discount: "Save 50%",
    type: "deal",
    category: "Travel",
    verified: true,
    featured: true,
    link: affiliateLink,
    expiryDate: "2026-12-31",
    votes: 2890,
    terms: "Includes 23kg checked luggage + 8kg cabin trolley + standard seat choice."
  },
  {
    id: "ew-bizclass",
    storeId: "eurowings",
    title: "BIZclass: Free Middle Seat + Lounge + 2x 32kg Bags",
    description: "Enjoy premium European business comfort with empty adjacent seats, priority boarding, catering, and fast lane security.",
    code: "",
    discount: "Premium",
    type: "deal",
    category: "Travel",
    verified: true,
    featured: true,
    link: affiliateLink,
    expiryDate: "2026-12-31",
    votes: 1980,
    terms: "Includes lounge access, 2x 32kg bags, empty middle seat in rows 1-3."
  },
  {
    id: "ew-miles-and-more",
    storeId: "eurowings",
    title: "Earn Miles & More Award Miles & Status Points",
    description: "Collect valuable Miles & More miles and Points on every Eurowings flight toward Frequent Traveller or Senator status.",
    code: "",
    discount: "Miles",
    type: "deal",
    category: "Travel",
    verified: true,
    featured: false,
    link: affiliateLink,
    expiryDate: "2026-12-31",
    votes: 1750,
    terms: "Enter your 15-digit Miles & More card number during flight checkout."
  },
  {
    id: "ew-blind-booking",
    storeId: "eurowings",
    title: "Eurowings Blind Booking: Mystery Getaways from €33",
    description: "Select your preferred travel theme (Culture, Beach, Shopping, Party) and unlock surprise flights from just €33 per leg.",
    code: "",
    discount: "From €33",
    type: "deal",
    category: "Travel",
    verified: true,
    featured: true,
    link: affiliateLink,
    expiryDate: "2026-12-31",
    votes: 3640,
    terms: "Departures from DUS, CGN, HAM, STR, BER. Destination revealed upon payment."
  },
  {
    id: "ew-mobile-checkin",
    storeId: "eurowings",
    title: "Free Mobile & Web Check-In (72h to 3h Before Flight)",
    description: "Get your digital boarding pass on iOS & Android to skip airport check-in lines and avoid the €15 desk check-in fee.",
    code: "",
    discount: "Free Check-In",
    type: "deal",
    category: "Travel",
    verified: true,
    featured: false,
    link: affiliateLink,
    expiryDate: "2026-12-31",
    votes: 2110,
    terms: "Opens 72h prior to flight departure. Apple Wallet and Google Wallet supported."
  },
  {
    id: "ew-flex-light",
    storeId: "eurowings",
    title: "Eurowings Flex Light: 0€ Rebooking Fee Add-on",
    description: "Enjoy maximum travel flexibility to change your flight date or time up to 40 minutes before flight departure.",
    code: "",
    discount: "Free Rebook",
    type: "deal",
    category: "Travel",
    verified: true,
    featured: false,
    link: affiliateLink,
    expiryDate: "2026-12-31",
    votes: 1540,
    terms: "Allows 1 free date change up to 40 min before departure. Fare difference may apply."
  }
];

// Filter out old eurowings coupons
const filteredCoupons = coupons.filter(c => c.storeId !== "eurowings");
const updatedCoupons = [...eurowingsCoupons, ...filteredCoupons];

fs.writeFileSync('data/coupons.json', JSON.stringify(updatedCoupons, null, 2));
console.log(`Updated data/coupons.json with ${eurowingsCoupons.length} Eurowings coupons (Total coupons: ${updatedCoupons.length})`);
