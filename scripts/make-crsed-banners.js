const fs = require('fs');
const path = require('path');

function getBase64(file) {
  try {
    const full = path.join(__dirname, '..', file);
    if (fs.existsSync(full)) {
      const data = fs.readFileSync(full);
      const ext = path.extname(file).replace('.', '').toLowerCase();
      const mime = ext === 'png' ? 'image/png' : 'image/jpeg';
      return `data:${mime};base64,${data.toString('base64')}`;
    }
  } catch (e) {
    console.error('Base64 error for', file, e.message);
  }
  return '';
}

const bannerB64 = getBase64('assets/images/crsed/banner.jpg');
const screen1B64 = getBase64('assets/images/crsed/screen1.jpg');
const ritualB64 = getBase64('assets/images/crsed/mystic-ritual.jpg');
const weaponsB64 = getBase64('assets/images/crsed/weapons-armor.jpg');
const screen2B64 = getBase64('assets/images/crsed/screen2.jpg');
const screen3B64 = getBase64('assets/images/crsed/screen3.jpg');
const screen4B64 = getBase64('assets/images/crsed/screen4.jpg');
const screen5B64 = getBase64('assets/images/crsed/screen5.jpg');

const targetDir = path.join(__dirname, '..', 'assets', 'images', 'banners');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 1. crsed-hero-banner.svg
const heroSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="50%" stop-color="#1e1b4b"/>
      <stop offset="100%" stop-color="#31101e"/>
    </linearGradient>
    <linearGradient id="overlay" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#090d16" stop-opacity="0.95"/>
      <stop offset="40%" stop-color="#090d16" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#090d16" stop-opacity="0.2"/>
    </linearGradient>
    <linearGradient id="btnGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#dc2626"/>
      <stop offset="100%" stop-color="#ea580c"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000" flood-opacity="0.6"/>
    </filter>
  </defs>
  
  <rect width="1200" height="630" fill="url(#bgGrad)"/>
  ${bannerB64 ? `<image href="${bannerB64}" x="0" y="0" width="1200" height="630" preserveAspectRatio="xMidYMid slice"/>` : ''}
  <rect width="1200" height="630" fill="url(#overlay)"/>
  
  <!-- Top Badge -->
  <g transform="translate(60, 50)">
    <rect width="260" height="42" rx="21" fill="#dc2626" filter="url(#shadow)"/>
    <text x="130" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="800" fill="#ffffff" text-anchor="middle" letter-spacing="1.5">OFFICIAL PROMO 2026</text>
  </g>
  
  <g transform="translate(340, 50)">
    <rect width="210" height="42" rx="21" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
    <text x="105" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#f8fafc" text-anchor="middle">100% FREE TO PLAY</text>
  </g>

  <!-- Main Titles -->
  <text x="60" y="440" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="56" font-weight="900" fill="#ffffff" filter="url(#shadow)" letter-spacing="-0.5">CRSED: F.O.A.D.</text>
  <text x="60" y="490" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="600" fill="#fca5a5">CUISINE ROYALE SECOND EDITION • BRUTAL TACTICAL BATTLE ROYALE</text>
  
  <!-- Subtitle -->
  <text x="60" y="535" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="400" fill="#cbd5e1">PC • PlayStation 5 • Xbox Series X/S • Switch • Realistic Ballistics &amp; Mystic Powers</text>
  
  <!-- CTA Button -->
  <g transform="translate(860, 480)" filter="url(#shadow)">
    <rect width="280" height="68" rx="16" fill="url(#btnGrad)"/>
    <text x="140" y="42" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="800" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">PLAY FOR FREE &gt;</text>
  </g>
</svg>`;
fs.writeFileSync(path.join(targetDir, 'crsed-hero-banner.svg'), heroSvg, 'utf8');

// 2. crsed-ballistics-showcase.svg
const ballisticsSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#020617" stop-opacity="0.95"/>
      <stop offset="50%" stop-color="#020617" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#020617" stop-opacity="0.1"/>
    </linearGradient>
  </defs>
  <rect width="800" height="450" fill="#0f172a"/>
  ${screen1B64 ? `<image href="${screen1B64}" x="0" y="0" width="800" height="450" preserveAspectRatio="xMidYMid slice"/>` : ''}
  <rect width="800" height="450" fill="url(#grad1)"/>
  <rect x="24" y="24" width="170" height="32" rx="16" fill="#dc2626"/>
  <text x="109" y="45" font-family="-apple-system, sans-serif" font-size="13" font-weight="800" fill="#fff" text-anchor="middle" letter-spacing="1">DAGOR ENGINE</text>
  <text x="24" y="390" font-family="-apple-system, sans-serif" font-size="26" font-weight="800" fill="#fff">Realistic Ballistic Physics</text>
  <text x="24" y="420" font-family="-apple-system, sans-serif" font-size="14" font-weight="500" fill="#cbd5e1">True bullet drop, muzzle velocities, and material penetration</text>
</svg>`;
fs.writeFileSync(path.join(targetDir, 'crsed-ballistics-showcase.svg'), ballisticsSvg, 'utf8');

// 3. crsed-mystic-rituals.svg
const ritualSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <defs>
    <linearGradient id="grad2" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#1e1b4b" stop-opacity="0.95"/>
      <stop offset="50%" stop-color="#1e1b4b" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#1e1b4b" stop-opacity="0.1"/>
    </linearGradient>
  </defs>
  <rect width="800" height="450" fill="#1e1b4b"/>
  ${ritualB64 ? `<image href="${ritualB64}" x="0" y="0" width="800" height="450" preserveAspectRatio="xMidYMid slice"/>` : ''}
  <rect width="800" height="450" fill="url(#grad2)"/>
  <rect x="24" y="24" width="160" height="32" rx="16" fill="#7c3aed"/>
  <text x="104" y="45" font-family="-apple-system, sans-serif" font-size="13" font-weight="800" fill="#fff" text-anchor="middle" letter-spacing="1">BLOOD RITUALS</text>
  <text x="24" y="390" font-family="-apple-system, sans-serif" font-size="26" font-weight="800" fill="#fff">Supernatural Powers &amp; Traps</text>
  <text x="24" y="420" font-family="-apple-system, sans-serif" font-size="14" font-weight="500" fill="#e2e8f0">Summon dark eclipses, zombie hordes, and gravity portals</text>
</svg>`;
fs.writeFileSync(path.join(targetDir, 'crsed-mystic-rituals.svg'), ritualSvg, 'utf8');

// 4. crsed-arsenal-armor.svg
const weaponsSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500" width="100%" height="100%">
  <defs>
    <linearGradient id="grad3" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#0f172a" stop-opacity="0.95"/>
      <stop offset="50%" stop-color="#0f172a" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0.1"/>
    </linearGradient>
  </defs>
  <rect width="1000" height="500" fill="#0f172a"/>
  ${weaponsB64 ? `<image href="${weaponsB64}" x="0" y="0" width="1000" height="500" preserveAspectRatio="xMidYMid slice"/>` : ''}
  <rect width="1000" height="500" fill="url(#grad3)"/>
  <rect x="30" y="30" width="220" height="36" rx="18" fill="#ea580c"/>
  <text x="140" y="54" font-family="-apple-system, sans-serif" font-size="14" font-weight="800" fill="#fff" text-anchor="middle" letter-spacing="1">KITCHENWARE &amp; ARMS</text>
  <text x="30" y="420" font-family="-apple-system, sans-serif" font-size="30" font-weight="800" fill="#fff">Culinary Armor &amp; WWII Weaponry</text>
  <text x="30" y="458" font-family="-apple-system, sans-serif" font-size="16" font-weight="500" fill="#cbd5e1">Waffle irons, colanders, and heavy pans combined with authentic rifles and machine guns</text>
</svg>`;
fs.writeFileSync(path.join(targetDir, 'crsed-arsenal-armor.svg'), weaponsSvg, 'utf8');

// 5. crsed-normandy-map.svg
const normandySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <defs>
    <linearGradient id="grad4" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#064e3b" stop-opacity="0.95"/>
      <stop offset="50%" stop-color="#064e3b" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#064e3b" stop-opacity="0.1"/>
    </linearGradient>
  </defs>
  <rect width="800" height="450" fill="#064e3b"/>
  ${screen2B64 ? `<image href="${screen2B64}" x="0" y="0" width="800" height="450" preserveAspectRatio="xMidYMid slice"/>` : ''}
  <rect width="800" height="450" fill="url(#grad4)"/>
  <rect x="24" y="24" width="150" height="32" rx="16" fill="#059669"/>
  <text x="99" y="45" font-family="-apple-system, sans-serif" font-size="13" font-weight="800" fill="#fff" text-anchor="middle" letter-spacing="1">MAP: NORMANDY</text>
  <text x="24" y="390" font-family="-apple-system, sans-serif" font-size="26" font-weight="800" fill="#fff">European Coastal Warzones</text>
  <text x="24" y="420" font-family="-apple-system, sans-serif" font-size="14" font-weight="500" fill="#d1fae5">Medieval stone hamlets, coastal bunkers, and rolling trenches</text>
</svg>`;
fs.writeFileSync(path.join(targetDir, 'crsed-normandy-map.svg'), normandySvg, 'utf8');

// 6. crsed-siberia-map.svg
const siberiaSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <defs>
    <linearGradient id="grad5" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#0c4a6e" stop-opacity="0.95"/>
      <stop offset="50%" stop-color="#0c4a6e" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#0c4a6e" stop-opacity="0.1"/>
    </linearGradient>
  </defs>
  <rect width="800" height="450" fill="#0c4a6e"/>
  ${screen3B64 ? `<image href="${screen3B64}" x="0" y="0" width="800" height="450" preserveAspectRatio="xMidYMid slice"/>` : ''}
  <rect width="800" height="450" fill="url(#grad5)"/>
  <rect x="24" y="24" width="150" height="32" rx="16" fill="#0284c7"/>
  <text x="99" y="45" font-family="-apple-system, sans-serif" font-size="13" font-weight="800" fill="#fff" text-anchor="middle" letter-spacing="1">MAP: SIBERIA</text>
  <text x="24" y="390" font-family="-apple-system, sans-serif" font-size="26" font-weight="800" fill="#fff">Sub-Zero Industrial Complexes</text>
  <text x="24" y="420" font-family="-apple-system, sans-serif" font-size="14" font-weight="500" fill="#e0f2fe">Frozen rivers, train depots, and abandoned Soviet missile silos</text>
</svg>`;
fs.writeFileSync(path.join(targetDir, 'crsed-siberia-map.svg'), siberiaSvg, 'utf8');

// 7. crsed-vehicles.svg
const vehiclesSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <defs>
    <linearGradient id="grad6" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#3b0764" stop-opacity="0.95"/>
      <stop offset="50%" stop-color="#3b0764" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#3b0764" stop-opacity="0.1"/>
    </linearGradient>
  </defs>
  <rect width="800" height="450" fill="#3b0764"/>
  ${screen4B64 ? `<image href="${screen4B64}" x="0" y="0" width="800" height="450" preserveAspectRatio="xMidYMid slice"/>` : ''}
  <rect width="800" height="450" fill="url(#grad6)"/>
  <rect x="24" y="24" width="160" height="32" rx="16" fill="#9333ea"/>
  <text x="104" y="45" font-family="-apple-system, sans-serif" font-size="13" font-weight="800" fill="#fff" text-anchor="middle" letter-spacing="1">VEHICLES</text>
  <text x="24" y="390" font-family="-apple-system, sans-serif" font-size="26" font-weight="800" fill="#fff">Vehicular Warfare &amp; Mobility</text>
  <text x="24" y="420" font-family="-apple-system, sans-serif" font-size="14" font-weight="500" fill="#f3e8ff">Fast civilian transports, heavy jeeps, and amphibious motorboats</text>
</svg>`;
fs.writeFileSync(path.join(targetDir, 'crsed-vehicles.svg'), vehiclesSvg, 'utf8');

// 8. crsed-tactics.svg
const tacticsSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <defs>
    <linearGradient id="grad7" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#451a03" stop-opacity="0.95"/>
      <stop offset="50%" stop-color="#451a03" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#451a03" stop-opacity="0.1"/>
    </linearGradient>
  </defs>
  <rect width="800" height="450" fill="#451a03"/>
  ${screen5B64 ? `<image href="${screen5B64}" x="0" y="0" width="800" height="450" preserveAspectRatio="xMidYMid slice"/>` : ''}
  <rect width="800" height="450" fill="url(#grad7)"/>
  <rect x="24" y="24" width="160" height="32" rx="16" fill="#d97706"/>
  <text x="104" y="45" font-family="-apple-system, sans-serif" font-size="13" font-weight="800" fill="#fff" text-anchor="middle" letter-spacing="1">SURVIVAL</text>
  <text x="24" y="390" font-family="-apple-system, sans-serif" font-size="26" font-weight="800" fill="#fff">Tactical Meals &amp; Looting</text>
  <text x="24" y="420" font-family="-apple-system, sans-serif" font-size="14" font-weight="500" fill="#fef3c7">Cook meals in battle and eat food to restore health instantly</text>
</svg>`;
fs.writeFileSync(path.join(targetDir, 'crsed-tactics.svg'), tacticsSvg, 'utf8');

console.log('ALL CRSED SVG BANNERS CREATED SUCCESSFULLY!');
