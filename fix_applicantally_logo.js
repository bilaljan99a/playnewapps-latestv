const fs = require('fs');
const { Resvg } = require('@resvg/resvg-js');

// 1. Icon SVG
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
  <rect width="120" height="120" rx="28" fill="url(#g)"/>
  <path d="M35 40 h50 a10 10 0 0 1 10 10 v20 a10 10 0 0 1 -10 10 h-25 l-15 12 v-12 h-10 a10 10 0 0 1 -10 -10 v-20 a10 10 0 0 1 10 -10 z" fill="white"/>
  <path d="M48 58 l8 8 l16 -16" stroke="#2563EB" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#3B82F6"/>
      <stop offset="100%" stop-color="#1D4ED8"/>
    </linearGradient>
  </defs>
</svg>`;

const resvg = new Resvg(iconSvg);
const pngBuffer = resvg.render().asPng();
fs.writeFileSync('assets/images/brands/applicantally-icon.png', pngBuffer);
console.log('Saved applicantally-icon.png successfully, length:', pngBuffer.length);

// 2. Full Brand Logo SVG
const brandSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 100" width="450" height="100">
  <rect x="0" y="0" width="100" height="100" rx="24" fill="url(#g)"/>
  <path d="M28 32 h44 a8 8 0 0 1 8 8 v18 a8 8 0 0 1 -8 8 h-22 l-12 10 v-10 h-10 a8 8 0 0 1 -8 -8 v-18 a8 8 0 0 1 8 -8 z" fill="white"/>
  <path d="M40 48 l6 6 l14 -14" stroke="#2563EB" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <text x="120" y="66" font-family="'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="44" fill="#111827" letter-spacing="-1.5">ApplicantAlly</text>
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#3B82F6"/>
      <stop offset="100%" stop-color="#1D4ED8"/>
    </linearGradient>
  </defs>
</svg>`;

fs.writeFileSync('assets/images/brands/applicantally.svg', brandSvg);
console.log('Saved applicantally.svg successfully.');
