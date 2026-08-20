const fs = require('fs');
const path = require('path');

// 1. DiscoverCars Hero SVG
const discoverCarsHeroSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="100%" height="100%">
  <defs>
    <linearGradient id="dcBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="60%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#dcBg)"/>
  <circle cx="1050" cy="150" r="300" fill="#0284c7" opacity="0.15"/>
  <circle cx="200" cy="500" r="250" fill="#38bdf8" opacity="0.1"/>
  <g transform="translate(80, 140)">
    <rect x="0" y="0" width="160" height="34" rx="17" fill="#0284c7"/>
    <text x="80" y="22" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="800" text-anchor="middle" letter-spacing="1.5">OFFICIAL PARTNER</text>
    <text x="0" y="90" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="48" font-weight="900" letter-spacing="-0.5">DiscoverCars Global Car Rental</text>
    <text x="0" y="145" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="500">Compare 500+ Top Rental Suppliers Across 145+ Countries</text>
    <g transform="translate(0, 200)">
      <rect width="220" height="60" rx="12" fill="#0284c7"/>
      <text x="110" y="36" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="800" text-anchor="middle">Up to 70% OFF</text>
    </g>
    <g transform="translate(240, 200)">
      <rect width="240" height="60" rx="12" fill="#334155" stroke="#475569" stroke-width="1.5"/>
      <text x="120" y="36" fill="#f8fafc" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" text-anchor="middle">Free Cancellation</text>
    </g>
    <g transform="translate(500, 200)">
      <rect width="260" height="60" rx="12" fill="#334155" stroke="#475569" stroke-width="1.5"/>
      <text x="130" y="36" fill="#f8fafc" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" text-anchor="middle">24/7 Support Included</text>
    </g>
  </g>
</svg>`;
fs.writeFileSync('assets/images/banners/discovercars-hero.svg', discoverCarsHeroSvg, 'utf8');

// 2. DiscoverCars Awards SVGs
const dcAward1Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 160" width="100%" height="100%">
  <rect width="400" height="160" rx="16" fill="#0f172a" stroke="#334155" stroke-width="2"/>
  <circle cx="60" cy="80" r="36" fill="#f59e0b" opacity="0.2"/>
  <text x="60" y="90" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="32" text-anchor="middle">★</text>
  <text x="120" y="65" fill="#ffffff" font-family="system-ui, sans-serif" font-size="18" font-weight="800">World Travel Tech Awards</text>
  <text x="120" y="92" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="14" font-weight="600">Leading Car Rental App</text>
  <text x="120" y="115" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="12" font-weight="700">Winner 2020 – 2026</text>
</svg>`;
fs.writeFileSync('assets/images/brands/discovercars-award-1.svg', dcAward1Svg, 'utf8');
fs.writeFileSync('assets/images/brands/discovercars-award-2.svg', dcAward1Svg, 'utf8');

// 3. Enlisted Key Art SVG
const enlistedKeyArtSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="100%" height="100%">
  <defs>
    <linearGradient id="enlBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#18181b"/>
      <stop offset="50%" stop-color="#27272a"/>
      <stop offset="100%" stop-color="#713f12"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#enlBg)"/>
  <circle cx="1000" cy="200" r="280" fill="#ea580c" opacity="0.15"/>
  <g transform="translate(80, 160)">
    <rect x="0" y="0" width="180" height="34" rx="17" fill="#ea580c"/>
    <text x="90" y="22" fill="#ffffff" font-family="system-ui, sans-serif" font-size="13" font-weight="800" text-anchor="middle" letter-spacing="1.5">OFFICIAL MMO ACTION</text>
    <text x="0" y="90" fill="#ffffff" font-family="system-ui, sans-serif" font-size="52" font-weight="900" letter-spacing="-0.5">Enlisted: Reinforced Squad Warfare</text>
    <text x="0" y="145" fill="#d4d4d8" font-family="system-ui, sans-serif" font-size="22" font-weight="500">Command Infantry Squads, Armored Tanks, and Aircraft in WWII Battles</text>
    <g transform="translate(0, 190)">
      <rect width="220" height="60" rx="12" fill="#ea580c"/>
      <text x="110" y="36" fill="#ffffff" font-family="system-ui, sans-serif" font-size="18" font-weight="800" text-anchor="middle">Play Free on PC</text>
    </g>
    <g transform="translate(240, 190)">
      <rect width="260" height="60" rx="12" fill="#3f3f46" stroke="#52525b" stroke-width="1.5"/>
      <text x="130" y="36" fill="#f4f4f5" font-family="system-ui, sans-serif" font-size="16" font-weight="700" text-anchor="middle">Full Cross-Play Support</text>
    </g>
  </g>
</svg>`;
fs.writeFileSync('assets/images/enlisted-key-art.svg', enlistedKeyArtSvg, 'utf8');

// 4. Eurowings Fleet SVGs
function makeEurowingsBanner(title, subtitle, badge) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="100%" height="100%">
  <defs>
    <linearGradient id="ewBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="60%" stop-color="#1e1b4b"/>
      <stop offset="100%" stop-color="#be185d"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#ewBg)"/>
  <circle cx="1000" cy="200" r="320" fill="#be185d" opacity="0.2"/>
  <g transform="translate(80, 160)">
    <rect x="0" y="0" width="180" height="34" rx="17" fill="#be185d"/>
    <text x="90" y="22" fill="#ffffff" font-family="system-ui, sans-serif" font-size="13" font-weight="800" text-anchor="middle" letter-spacing="1.5">${badge}</text>
    <text x="0" y="90" fill="#ffffff" font-family="system-ui, sans-serif" font-size="48" font-weight="900" letter-spacing="-0.5">${title}</text>
    <text x="0" y="145" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="22" font-weight="500">${subtitle}</text>
    <g transform="translate(0, 190)">
      <rect width="240" height="60" rx="12" fill="#be185d"/>
      <text x="120" y="36" fill="#ffffff" font-family="system-ui, sans-serif" font-size="18" font-weight="800" text-anchor="middle">Book from €29.99</text>
    </g>
    <g transform="translate(260, 190)">
      <rect width="260" height="60" rx="12" fill="#1e1b4b" stroke="#4338ca" stroke-width="1.5"/>
      <text x="130" y="36" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="16" font-weight="700" text-anchor="middle">Lufthansa Group Airline</text>
    </g>
  </g>
</svg>`;
}

fs.writeFileSync('assets/images/banners/eurowings-a320neo-official.svg', makeEurowingsBanner('Eurowings Airbus A320neo Fleet', 'Next-Generation Eco-Efficient European Aviation', 'OFFICIAL FLEET'), 'utf8');
fs.writeFileSync('assets/images/banners/eurowings-flight-takeoff.svg', makeEurowingsBanner('Eurowings Direct Flights & Routes', 'Connecting 150+ European Cities & Holiday Destinations', 'FLIGHT NETWORK'), 'utf8');
fs.writeFileSync('assets/images/banners/eurowings-europe-fleet.svg', makeEurowingsBanner('Eurowings Modern Aircraft Fleet', 'Premium Comfort, Free Carry-on Options, and Miles & More Perks', 'COMFORT & SAVINGS'), 'utf8');

// 5. Godlike Hero Banner SVG
const godlikeBannerSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="100%" height="100%">
  <defs>
    <linearGradient id="glBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#09090b"/>
      <stop offset="50%" stop-color="#18181b"/>
      <stop offset="100%" stop-color="#4f46e5"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#glBg)"/>
  <circle cx="1020" cy="180" r="300" fill="#6366f1" opacity="0.2"/>
  <g transform="translate(80, 160)">
    <rect x="0" y="0" width="200" height="34" rx="17" fill="#4f46e5"/>
    <text x="100" y="22" fill="#ffffff" font-family="system-ui, sans-serif" font-size="13" font-weight="800" text-anchor="middle" letter-spacing="1.5">PREMIUM GAME HOSTING</text>
    <text x="0" y="90" fill="#ffffff" font-family="system-ui, sans-serif" font-size="52" font-weight="900" letter-spacing="-0.5">GODLIKE.Host High-Performance Servers</text>
    <text x="0" y="145" fill="#a1a1aa" font-family="system-ui, sans-serif" font-size="22" font-weight="500">Minecraft, Palworld, Rust, GTA V with Instant Setup and DDoS Protection</text>
    <g transform="translate(0, 190)">
      <rect width="220" height="60" rx="12" fill="#4f46e5"/>
      <text x="110" y="36" fill="#ffffff" font-family="system-ui, sans-serif" font-size="18" font-weight="800" text-anchor="middle">Up to 30% OFF</text>
    </g>
    <g transform="translate(240, 190)">
      <rect width="240" height="60" rx="12" fill="#27272a" stroke="#3f3f46" stroke-width="1.5"/>
      <text x="120" y="36" fill="#f4f4f5" font-family="system-ui, sans-serif" font-size="16" font-weight="700" text-anchor="middle">Ryzen 9 & NVMe SSDs</text>
    </g>
  </g>
</svg>`;
if (!fs.existsSync('assets/images/brands/godlike')) fs.mkdirSync('assets/images/brands/godlike', { recursive: true });
fs.writeFileSync('assets/images/brands/godlike/godlike-hero-banner.svg', godlikeBannerSvg, 'utf8');

// Update remaining HTML files:
let dcHtml = fs.readFileSync('discovercars-coupons.html', 'utf8');
dcHtml = dcHtml.replace(/discovercars-hero\.jpg/g, 'discovercars-hero.svg');
dcHtml = dcHtml.replace(/discovercars-award-1\.png/g, 'discovercars-award-1.svg');
dcHtml = dcHtml.replace(/discovercars-award-2\.webp/g, 'discovercars-award-2.svg');
fs.writeFileSync('discovercars-coupons.html', dcHtml, 'utf8');

let enlHtml = fs.readFileSync('enlisted-coupons.html', 'utf8');
enlHtml = enlHtml.replace(/enlisted\.png/g, 'enlisted.svg');
enlHtml = enlHtml.replace(/enlisted-key-art\.jpg/g, 'enlisted-key-art.svg');
fs.writeFileSync('enlisted-coupons.html', enlHtml, 'utf8');

let ewHtml = fs.readFileSync('eurowings-coupons.html', 'utf8');
ewHtml = ewHtml.replace(/eurowings-a320neo-official-1200\.jpg/g, 'eurowings-a320neo-official.svg');
ewHtml = ewHtml.replace(/eurowings-flight-takeoff-1000\.jpg/g, 'eurowings-flight-takeoff.svg');
ewHtml = ewHtml.replace(/eurowings-europe-fleet-1000\.jpg/g, 'eurowings-europe-fleet.svg');
fs.writeFileSync('eurowings-coupons.html', ewHtml, 'utf8');

let glHtml = fs.readFileSync('godlike-host-coupons.html', 'utf8');
glHtml = glHtml.replace(/godlike-hero-banner\.webp/g, 'godlike-hero-banner.svg');
glHtml = glHtml.replace(/enlisted\.png/g, 'enlisted.svg');
fs.writeFileSync('godlike-host-coupons.html', glHtml, 'utf8');

console.log('Successfully generated vector SVGs and updated all remaining pages!');
