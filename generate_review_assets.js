const fs = require('fs');
const path = require('path');

// 1. Brand Logos
const brandLogos = {
  'assets/images/brands/steam-deck.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 60" width="240" height="60" fill="none">
    <rect width="240" height="60" rx="10" fill="#0B132B"/>
    <circle cx="36" cy="30" r="18" fill="#1A9FFF"/>
    <circle cx="36" cy="30" r="14" fill="#0B132B"/>
    <circle cx="31" cy="35" r="5" fill="#1A9FFF"/>
    <circle cx="43" cy="23" r="3.5" fill="#FFFFFF"/>
    <path d="M31 35 L43 23" stroke="#1A9FFF" stroke-width="2.5"/>
    <text x="68" y="37" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="900" fill="#FFFFFF" letter-spacing="-0.5">STEAM <tspan fill="#1A9FFF">DECK</tspan></text>
  </svg>`,

  'assets/images/brands/xbox-series-x.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 60" width="240" height="60" fill="none">
    <rect width="240" height="60" rx="10" fill="#0F141C"/>
    <circle cx="36" cy="30" r="18" fill="#107C10"/>
    <path d="M26 21 C29 27 34 35 36 39 C38 35 43 27 46 21 C41 18 31 18 26 21 Z" fill="#0F141C"/>
    <path d="M22 25 C20 31 22 38 27 42 C29 39 33 33 34 31 C29 28 25 26 22 25 Z" fill="#0F141C"/>
    <path d="M50 25 C52 31 50 38 45 42 C43 39 39 33 38 31 C43 28 47 26 50 25 Z" fill="#0F141C"/>
    <text x="68" y="37" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="900" fill="#FFFFFF" letter-spacing="-0.5">XBOX <tspan fill="#107C10">SERIES X</tspan></text>
  </svg>`,

  'assets/images/brands/windows-11.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 60" width="240" height="60" fill="none">
    <rect width="240" height="60" rx="10" fill="#0B1E38"/>
    <g transform="translate(20, 15)">
      <rect x="0" y="0" width="14" height="14" fill="#0078D4"/>
      <rect x="16" y="0" width="14" height="14" fill="#0078D4"/>
      <rect x="0" y="16" width="14" height="14" fill="#0078D4"/>
      <rect x="16" y="16" width="14" height="14" fill="#0078D4"/>
    </g>
    <text x="64" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="21" font-weight="800" fill="#FFFFFF" letter-spacing="-0.3">Windows <tspan fill="#0078D4">11</tspan></text>
  </svg>`,

  'assets/images/brands/ps5.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 60" width="240" height="60" fill="none">
    <rect width="240" height="60" rx="10" fill="#001B3A"/>
    <g transform="translate(18, 12)">
      <path d="M12 2 C16 4 19 8 18 14 C17 21 12 26 6 28 L6 36 L12 36 L12 29 C18 27 25 21 26 13 C27 4 21 0 12 2 Z" fill="#0070D1"/>
      <path d="M0 16 L0 36 L6 36 L6 20 C10 18 15 20 15 24 L15 36 L21 36 L21 23 C20 16 12 14 0 16 Z" fill="#FFFFFF"/>
    </g>
    <text x="64" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="900" fill="#FFFFFF" letter-spacing="-0.5">PlayStation <tspan fill="#0070D1">5</tspan></text>
  </svg>`,

  'assets/images/brands/oculus-quest-2.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 60" width="240" height="60" fill="none">
    <rect width="240" height="60" rx="10" fill="#0A0E1A"/>
    <g transform="translate(18, 16)">
      <rect x="0" y="0" width="28" height="28" rx="8" fill="#1877F2"/>
      <ellipse cx="14" cy="14" rx="9" ry="6" fill="#0A0E1A"/>
    </g>
    <text x="58" y="37" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="800" fill="#FFFFFF" letter-spacing="-0.5">Quest 2 <tspan fill="#1877F2">VR</tspan></text>
  </svg>`
};

for (const [filePath, content] of Object.entries(brandLogos)) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Wrote ${filePath}`);
}

console.log('Brand logos generated successfully.');
