const fs = require('fs');
const { Resvg } = require('@resvg/resvg-js');

// High precision SVG matching ApplicantAlly official blue 'A' with orange swoosh
const realIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="300" height="300">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#F8FAFC"/>
    </linearGradient>
    <linearGradient id="blueA" x1="15%" y1="0%" x2="85%" y2="100%">
      <stop offset="0%" stop-color="#1D72F3"/>
      <stop offset="45%" stop-color="#0256D8"/>
      <stop offset="100%" stop-color="#00359B"/>
    </linearGradient>
    <linearGradient id="orangeSwoosh" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FF3B00"/>
      <stop offset="50%" stop-color="#FF8800"/>
      <stop offset="100%" stop-color="#FFC107"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0F172A" flood-opacity="0.12"/>
    </filter>
  </defs>

  <rect width="300" height="300" rx="60" fill="url(#bgGrad)"/>

  <g transform="translate(10, 10)">
    <!-- Main A Shape -->
    <path d="M 140 38 C 158 38 168 50 182 88 L 222 198 C 228 214 218 228 200 228 L 175 228 C 166 228 159 221 155 210 L 142 170 L 98 170 L 85 210 C 81 221 74 228 65 228 L 40 228 C 22 228 12 214 18 198 L 58 88 C 72 50 82 38 100 38 Z M 120 85 C 117 85 114 90 112 98 L 105 132 L 135 132 L 128 98 C 126 90 123 85 120 85 Z" fill="url(#blueA)" filter="url(#shadow)"/>

    <!-- Dynamic Orange Swoosh -->
    <path d="M 28 196 C 52 170 92 135 148 126 C 196 118 238 125 262 128 C 238 139 198 148 148 148 C 95 148 55 172 28 196 Z" fill="url(#orangeSwoosh)"/>
  </g>
</svg>`;

const resvg = new Resvg(realIconSvg);
const pngBuffer = resvg.render().asPng();
fs.writeFileSync('assets/images/brands/applicantally-icon.png', pngBuffer);
console.log('Generated new applicantally-icon.png successfully!');

// Full Horizontal Brand Logo SVG
const brandSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 120" width="520" height="120">
  <defs>
    <linearGradient id="blueA_brand" x1="15%" y1="0%" x2="85%" y2="100%">
      <stop offset="0%" stop-color="#1D72F3"/>
      <stop offset="50%" stop-color="#0256D8"/>
      <stop offset="100%" stop-color="#00359B"/>
    </linearGradient>
    <linearGradient id="orangeSwoosh_brand" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FF3B00"/>
      <stop offset="50%" stop-color="#FF8800"/>
      <stop offset="100%" stop-color="#FFC107"/>
    </linearGradient>
  </defs>

  <!-- Logo Mark Icon on Left -->
  <g transform="translate(10, 10) scale(0.42)">
    <path d="M 140 38 C 158 38 168 50 182 88 L 222 198 C 228 214 218 228 200 228 L 175 228 C 166 228 159 221 155 210 L 142 170 L 98 170 L 85 210 C 81 221 74 228 65 228 L 40 228 C 22 228 12 214 18 198 L 58 88 C 72 50 82 38 100 38 Z M 120 85 C 117 85 114 90 112 98 L 105 132 L 135 132 L 128 98 C 126 90 123 85 120 85 Z" fill="url(#blueA_brand)"/>
    <path d="M 28 196 C 52 170 92 135 148 126 C 196 118 238 125 262 128 C 238 139 198 148 148 148 C 95 148 55 172 28 196 Z" fill="url(#orangeSwoosh_brand)"/>
  </g>

  <!-- Typography -->
  <text x="135" y="78" font-family="'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="46" fill="#0F172A" letter-spacing="-1.5">Applicant<tspan fill="#1D72F3">Ally</tspan></text>
</svg>`;

fs.writeFileSync('assets/images/brands/applicantally.svg', brandSvg);
console.log('Generated new applicantally.svg successfully!');
