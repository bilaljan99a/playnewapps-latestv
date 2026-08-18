const fs = require('fs');
const path = require('path');

// 1. Create Brand Logo assets/images/brands/ufl.svg
const uflLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120" width="320" height="120" fill="none">
  <defs>
    <linearGradient id="uflGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#55FFFF" />
      <stop offset="100%" stop-color="#00E5FF" />
    </linearGradient>
    <filter id="glow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#00E5FF" flood-opacity="0.25"/>
    </filter>
  </defs>

  <!-- U Glyph -->
  <path d="M 24 20 H 46 V 78 L 62 94 H 74 L 90 78 V 20 H 112 V 84 L 80 116 H 56 L 24 84 Z" fill="url(#uflGrad)" filter="url(#glow)" />

  <!-- F Glyph -->
  <path d="M 126 20 H 202 V 42 H 148 V 56 H 188 V 78 H 148 V 116 H 126 Z M 148 20 L 126 42 V 20 Z" fill="url(#uflGrad)" filter="url(#glow)" />

  <!-- L Glyph -->
  <path d="M 216 20 H 238 V 94 H 294 V 116 H 216 Z" fill="url(#uflGrad)" filter="url(#glow)" />

  <!-- TM Trademark -->
  <text x="298" y="32" fill="#00E5FF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="14" letter-spacing="0.5">TM</text>
</svg>`;

fs.writeFileSync(path.join(__dirname, '../assets/images/brands/ufl.svg'), uflLogoSvg.trim());
console.log('Saved assets/images/brands/ufl.svg');

// 2. Generate Hero Banner
const uflHeroBannerSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 480" width="1200" height="480">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#070c18"/>
      <stop offset="40%" stop-color="#0b1528"/>
      <stop offset="100%" stop-color="#04070f"/>
    </linearGradient>
    <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#50F6FF"/>
      <stop offset="100%" stop-color="#00B4D8"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFDF00"/>
      <stop offset="100%" stop-color="#FFA500"/>
    </linearGradient>
    <linearGradient id="btnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00F0FF"/>
      <stop offset="100%" stop-color="#0096C7"/>
    </linearGradient>
    <radialGradient id="spotlight1" cx="25%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#00F0FF" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#00F0FF" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="spotlight2" cx="80%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#0077B6" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#0077B6" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="480" fill="url(#bgGrad)"/>
  <rect width="1200" height="480" fill="url(#spotlight1)"/>
  <rect width="1200" height="480" fill="url(#spotlight2)"/>

  <!-- Stadium Pitch Grid Lines (Isometric/Perspective) -->
  <g stroke="#00F0FF" stroke-width="1.2" opacity="0.15">
    <line x1="0" y1="480" x2="600" y2="280"/>
    <line x1="1200" y1="480" x2="600" y2="280"/>
    <line x1="200" y1="480" x2="600" y2="280"/>
    <line x1="400" y1="480" x2="600" y2="280"/>
    <line x1="800" y1="480" x2="600" y2="280"/>
    <line x1="1000" y1="480" x2="600" y2="280"/>
    <ellipse cx="600" cy="380" rx="360" ry="80" fill="none"/>
    <ellipse cx="600" cy="380" rx="140" ry="30" fill="none"/>
    <line x1="0" y1="380" x2="1200" y2="380"/>
  </g>

  <!-- Stadium Floodlights Glow -->
  <circle cx="100" cy="40" r="140" fill="#00F0FF" opacity="0.08" filter="blur(30px)"/>
  <circle cx="1100" cy="40" r="140" fill="#00F0FF" opacity="0.08" filter="blur(30px)"/>

  <!-- Left Side: Branding and Headlines -->
  <g transform="translate(60, 50)">
    <!-- Top Pill Badge -->
    <rect x="0" y="0" width="230" height="34" rx="17" fill="#00F0FF" fill-opacity="0.12" stroke="#00F0FF" stroke-width="1.5"/>
    <circle cx="18" cy="17" r="5" fill="#00F0FF"/>
    <text x="32" y="22" fill="#50F6FF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" letter-spacing="1.2">FAIR TO PLAY FOOTBALL</text>

    <!-- UFL Brand Logo (Vector) -->
    <g transform="translate(0, 50) scale(1.1)">
      <path d="M 0 0 H 24 V 58 L 40 74 H 52 L 68 58 V 0 H 92 V 64 L 60 96 H 36 L 0 64 Z" fill="url(#cyanGrad)"/>
      <path d="M 106 0 H 182 V 22 H 128 V 36 H 168 V 58 H 128 V 96 H 106 Z M 128 0 L 106 22 V 0 Z" fill="url(#cyanGrad)"/>
      <path d="M 196 0 H 218 V 74 H 274 V 96 H 196 Z" fill="url(#cyanGrad)"/>
      <text x="278" y="14" fill="#50F6FF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="14">TM</text>
    </g>

    <!-- Subtitle / Main Pitch -->
    <text x="0" y="188" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="900" letter-spacing="-0.5">THE NEXT-GEN REVOLUTION</text>
    <text x="0" y="218" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="500">100% Free to Play • Unreal Engine 5 • Skill-First Online Matchmaking</text>

    <!-- Bullet Highlights -->
    <g transform="translate(0, 245)">
      <g transform="translate(0, 0)">
        <circle cx="10" cy="10" r="10" fill="#00F0FF" fill-opacity="0.2"/>
        <path d="M6 10 L9 13 L14 7" stroke="#00F0FF" stroke-width="2" fill="none"/>
        <text x="28" y="14" fill="#E2E8F0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700">Official FIFPRO Licensed Players</text>
      </g>
      <g transform="translate(240, 0)">
        <circle cx="10" cy="10" r="10" fill="#00F0FF" fill-opacity="0.2"/>
        <path d="M6 10 L9 13 L14 7" stroke="#00F0FF" stroke-width="2" fill="none"/>
        <text x="28" y="14" fill="#E2E8F0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700">Cristiano Ronaldo Ambassador</text>
      </g>
      <g transform="translate(0, 32)">
        <circle cx="10" cy="10" r="10" fill="#00F0FF" fill-opacity="0.2"/>
        <path d="M6 10 L9 13 L14 7" stroke="#00F0FF" stroke-width="2" fill="none"/>
        <text x="28" y="14" fill="#E2E8F0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700">No Pay-to-Win Mechanics</text>
      </g>
      <g transform="translate(240, 32)">
        <circle cx="10" cy="10" r="10" fill="#00F0FF" fill-opacity="0.2"/>
        <path d="M6 10 L9 13 L14 7" stroke="#00F0FF" stroke-width="2" fill="none"/>
        <text x="28" y="14" fill="#E2E8F0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700">Web Shop Bundles &amp; Team Passes</text>
      </g>
    </g>

    <!-- CTA Button -->
    <g transform="translate(0, 330)">
      <rect width="250" height="52" rx="14" fill="url(#btnGrad)"/>
      <text x="125" y="32" fill="#070C18" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="900" text-anchor="middle" letter-spacing="0.5">PLAY FOR FREE NOW ➔</text>
    </g>

    <!-- Platforms Supported -->
    <g transform="translate(270, 345)">
      <text x="0" y="12" fill="#64748B" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" letter-spacing="1">AVAILABLE ON</text>
      <text x="0" y="30" fill="#CBD5E1" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800">PC • PlayStation 5 • Xbox Series X|S • Mobile</text>
    </g>
  </g>

  <!-- Right Side: Visual Artwork Showcase Box -->
  <g transform="translate(680, 50)">
    <!-- Main Card Frame -->
    <rect width="460" height="380" rx="20" fill="#0B132B" stroke="#1E293B" stroke-width="2"/>
    <rect width="460" height="380" rx="20" fill="none" stroke="#00F0FF" stroke-width="1.5" stroke-opacity="0.3"/>

    <!-- Inner Football Field Visual Graphic -->
    <rect x="15" y="15" width="430" height="230" rx="14" fill="#071224"/>
    <g stroke="#00F0FF" stroke-width="1" opacity="0.3">
      <rect x="30" y="30" width="400" height="200" fill="none"/>
      <line x1="230" y1="30" x2="230" y2="230"/>
      <circle cx="230" cy="130" r="45" fill="none"/>
      <circle cx="230" cy="130" r="3" fill="#00F0FF"/>
      <!-- Penalty boxes -->
      <rect x="30" y="70" width="60" height="120" fill="none"/>
      <rect x="370" y="70" width="60" height="120" fill="none"/>
    </g>

    <!-- Player Card Holographic Mockup -->
    <g transform="translate(155, 35)">
      <rect width="150" height="200" rx="12" fill="#0D1F3D" stroke="#00F0FF" stroke-width="2"/>
      <rect x="6" y="6" width="138" height="188" rx="8" fill="#0A162C"/>
      <!-- Card Rating & Pos -->
      <text x="20" y="32" fill="#FFDF00" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="900">92</text>
      <text x="20" y="48" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800">ST</text>
      <!-- Silhouette / Figure vector -->
      <circle cx="75" cy="90" r="28" fill="#00F0FF" fill-opacity="0.2"/>
      <path d="M 45 150 C 45 120, 105 120, 105 150 Z" fill="#00F0FF" fill-opacity="0.3"/>
      <!-- Player Name -->
      <text x="75" y="166" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="900" text-anchor="middle">CRISTIANO</text>
      <text x="75" y="182" fill="#50F6FF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="800" text-anchor="middle">OFFICIAL AMBASSADOR</text>
    </g>

    <!-- Stats & Features Bar Below -->
    <g transform="translate(25, 265)">
      <rect width="125" height="90" rx="10" fill="#060D1E" stroke="#1E293B"/>
      <text x="62" y="35" fill="#50F6FF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="900" text-anchor="middle">FREE</text>
      <text x="62" y="55" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" text-anchor="middle">Base Game</text>
      <text x="62" y="72" fill="#10B981" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="700" text-anchor="middle">✓ Instant Access</text>

      <rect x="140" y="0" width="125" height="90" rx="10" fill="#060D1E" stroke="#1E293B"/>
      <text x="202" y="35" fill="#FFDF00" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="900" text-anchor="middle">FIFPRO™</text>
      <text x="202" y="55" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" text-anchor="middle">Licensed Pro</text>
      <text x="202" y="72" fill="#38BDF8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="700" text-anchor="middle">Real Squads</text>

      <rect x="280" y="0" width="125" height="90" rx="10" fill="#060D1E" stroke="#1E293B"/>
      <text x="342" y="35" fill="#A855F7" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="900" text-anchor="middle">UNREAL 5</text>
      <text x="342" y="55" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" text-anchor="middle">Physics &amp; Lumen</text>
      <text x="342" y="72" fill="#A855F7" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="700" text-anchor="middle">60+ FPS Realism</text>
    </g>
  </g>
</svg>`;

fs.writeFileSync(path.join(__dirname, '../assets/images/banners/ufl-hero-banner.svg'), uflHeroBannerSvg.trim());
console.log('Saved assets/images/banners/ufl-hero-banner.svg');

// 3. Generate Web Shop Bundles Banner
const uflWebShopSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <defs>
    <linearGradient id="wsBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#08101E"/>
      <stop offset="100%" stop-color="#02050A"/>
    </linearGradient>
    <linearGradient id="cyanB" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="100%" stop-color="#0284C7"/>
    </linearGradient>
    <linearGradient id="goldB" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FACC15"/>
      <stop offset="100%" stop-color="#CA8A04"/>
    </linearGradient>
  </defs>

  <rect width="800" height="450" fill="url(#wsBg)"/>
  
  <!-- Subtle Grid -->
  <g stroke="#0284C7" stroke-width="1" opacity="0.12">
    <line x1="0" y1="75" x2="800" y2="75"/>
    <line x1="0" y1="150" x2="800" y2="150"/>
    <line x1="0" y1="225" x2="800" y2="225"/>
    <line x1="0" y1="300" x2="800" y2="300"/>
    <line x1="0" y1="375" x2="800" y2="375"/>
    <line x1="200" y1="0" x2="200" y2="450"/>
    <line x1="400" y1="0" x2="400" y2="450"/>
    <line x1="600" y1="0" x2="600" y2="450"/>
  </g>

  <!-- Top Badge -->
  <rect x="40" y="30" width="180" height="28" rx="14" fill="#0284C7" fill-opacity="0.2" stroke="#38BDF8" stroke-width="1"/>
  <text x="130" y="49" fill="#38BDF8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800" text-anchor="middle" letter-spacing="1">OFFICIAL UFL WEB SHOP</text>

  <text x="40" y="95" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="900">DIGITAL BUNDLES &amp; CP / LP PACKS</text>
  <text x="40" y="122" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500">Official Web Portal for PC Squad Building, Club Passes &amp; Team Customization</text>

  <!-- Card 1: CP / LP Currency Pack -->
  <g transform="translate(40, 150)">
    <rect width="220" height="250" rx="14" fill="#0D1B2A" stroke="#1E293B" stroke-width="1.5"/>
    <rect x="12" y="12" width="196" height="100" rx="8" fill="#132438"/>
    <!-- Currency Icon -->
    <circle cx="110" cy="62" r="30" fill="url(#cyanB)"/>
    <text x="110" y="70" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="900" text-anchor="middle">CP</text>
    <text x="110" y="140" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="800" text-anchor="middle">Credit Points (CP)</text>
    <text x="110" y="162" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="500" text-anchor="middle">Player transfers &amp; squad builds</text>
    <rect x="25" y="195" width="170" height="34" rx="8" fill="#0284C7"/>
    <text x="110" y="217" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" text-anchor="middle">Official Web Shop ➔</text>
  </g>

  <!-- Card 2: Starter Bundle -->
  <g transform="translate(290, 150)">
    <rect width="220" height="250" rx="14" fill="#0D1B2A" stroke="#00F0FF" stroke-width="1.5"/>
    <rect x="12" y="12" width="196" height="100" rx="8" fill="#152842"/>
    <!-- Star icon -->
    <circle cx="110" cy="62" r="30" fill="url(#goldB)"/>
    <text x="110" y="70" fill="#000000" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="900" text-anchor="middle">★</text>
    <text x="110" y="140" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="800" text-anchor="middle">Starter Bundles</text>
    <text x="110" y="162" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="500" text-anchor="middle">Bonus CP + Customization</text>
    <rect x="25" y="195" width="170" height="34" rx="8" fill="#FACC15"/>
    <text x="110" y="217" fill="#000000" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="900" text-anchor="middle">Best Starter Value</text>
  </g>

  <!-- Card 3: Team Pass -->
  <g transform="translate(540, 150)">
    <rect width="220" height="250" rx="14" fill="#0D1B2A" stroke="#1E293B" stroke-width="1.5"/>
    <rect x="12" y="12" width="196" height="100" rx="8" fill="#132438"/>
    <!-- Trophy Icon -->
    <circle cx="110" cy="62" r="30" fill="#8B5CF6"/>
    <text x="110" y="70" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="900" text-anchor="middle">🏆</text>
    <text x="110" y="140" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="800" text-anchor="middle">Team Passes</text>
    <text x="110" y="162" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="500" text-anchor="middle">Seasonal quests &amp; tier rewards</text>
    <rect x="25" y="195" width="170" height="34" rx="8" fill="#8B5CF6"/>
    <text x="110" y="217" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" text-anchor="middle">Unlock Tiers ➔</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(__dirname, '../assets/images/banners/ufl-webshop-bundles.svg'), uflWebShopSvg.trim());
console.log('Saved assets/images/banners/ufl-webshop-bundles.svg');

// 4. Generate Stadium & Gameplay Banner
const uflGameplaySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <defs>
    <linearGradient id="stadiumBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#040D1A"/>
      <stop offset="50%" stop-color="#08182E"/>
      <stop offset="100%" stop-color="#020810"/>
    </linearGradient>
    <radialGradient id="pitchLight" cx="50%" cy="60%" r="60%">
      <stop offset="0%" stop-color="#10B981" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#040D1A" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="800" height="450" fill="url(#stadiumBg)"/>
  <rect width="800" height="450" fill="url(#pitchLight)"/>

  <!-- Stadium Outline -->
  <ellipse cx="400" cy="300" rx="340" ry="120" fill="none" stroke="#10B981" stroke-width="1.5" stroke-opacity="0.4"/>
  <ellipse cx="400" cy="300" rx="140" ry="50" fill="none" stroke="#10B981" stroke-width="1.5" stroke-opacity="0.4"/>
  <line x1="60" y1="300" x2="740" y2="300" stroke="#10B981" stroke-width="1.5" stroke-opacity="0.4"/>
  <line x1="400" y1="180" x2="400" y2="420" stroke="#10B981" stroke-width="1.5" stroke-opacity="0.4"/>

  <!-- Text Overlay -->
  <g transform="translate(50, 50)">
    <rect width="190" height="28" rx="14" fill="#10B981" fill-opacity="0.15" stroke="#10B981" stroke-width="1"/>
    <text x="95" y="19" fill="#10B981" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800" text-anchor="middle" letter-spacing="1">UNREAL ENGINE 5</text>
    
    <text x="0" y="65" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="900">NEXT-GEN MATCHDAY EXPERIENCE</text>
    <text x="0" y="90" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500">Lumen Global Illumination • Realistic Turf Physics • Dynamic Crowd Atmosphere</text>
  </g>

  <!-- Feature Tags at bottom -->
  <g transform="translate(50, 360)">
    <rect width="210" height="48" rx="10" fill="#0B1626" stroke="#1E293B"/>
    <text x="105" y="22" fill="#38BDF8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" text-anchor="middle">Fair to Play</text>
    <text x="105" y="38" fill="#64748B" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="600" text-anchor="middle">Zero Momentum Scripting</text>

    <rect x="235" y="0" width="210" height="48" rx="10" fill="#0B1626" stroke="#1E293B"/>
    <text x="340" y="22" fill="#FACC15" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" text-anchor="middle">Pro Ball Physics</text>
    <text x="340" y="38" fill="#64748B" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="600" text-anchor="middle">True Trajectory &amp; Spin</text>

    <rect x="470" y="0" width="230" height="48" rx="10" fill="#0B1626" stroke="#1E293B"/>
    <text x="585" y="22" fill="#A855F7" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" text-anchor="middle">Cross-Platform</text>
    <text x="585" y="38" fill="#64748B" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="600" text-anchor="middle">PC, PlayStation, Xbox, Mobile</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(__dirname, '../assets/images/banners/ufl-gameplay-stadium.svg'), uflGameplaySvg.trim());
console.log('Saved assets/images/banners/ufl-gameplay-stadium.svg');

// 5. Generate Team Pass & Squad Building Banner
const uflTeamPassSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <defs>
    <linearGradient id="tpBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E1B4B"/>
      <stop offset="50%" stop-color="#0F172A"/>
      <stop offset="100%" stop-color="#030712"/>
    </linearGradient>
  </defs>

  <rect width="800" height="450" fill="url(#tpBg)"/>
  
  <g transform="translate(50, 40)">
    <rect width="210" height="28" rx="14" fill="#818CF8" fill-opacity="0.2" stroke="#818CF8" stroke-width="1"/>
    <text x="105" y="19" fill="#818CF8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800" text-anchor="middle" letter-spacing="1">SEASON PASS &amp; SQUADS</text>
    
    <text x="0" y="65" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="900">UFL TEAM PASS &amp; CLUB PROGRESSION</text>
    <text x="0" y="90" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500">Tiered Season Passes • Custom Club Kits &amp; Boots • Exclusive Player Rewards</text>
  </g>

  <!-- Pass Tier Cards -->
  <g transform="translate(50, 150)">
    <rect width="330" height="240" rx="14" fill="#0F172A" stroke="#334155" stroke-width="1.5"/>
    <text x="30" y="40" fill="#38BDF8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="800">Free Tier Pass</text>
    <text x="30" y="65" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12">Included with every free game download</text>
    <g transform="translate(30, 90)">
      <text x="0" y="20" fill="#E2E8F0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12">✓ Basic Credit Points (CP) rewards</text>
      <text x="0" y="45" fill="#E2E8F0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12">✓ Standard seasonal challenges</text>
      <text x="0" y="70" fill="#E2E8F0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12">✓ Squad building progression items</text>
      <text x="0" y="95" fill="#E2E8F0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12">✓ Free starter cosmetic customization</text>
    </g>
  </g>

  <g transform="translate(420, 150)">
    <rect width="330" height="240" rx="14" fill="#1E1B4B" stroke="#818CF8" stroke-width="2"/>
    <text x="30" y="40" fill="#FACC15" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="800">Team Pass Premium (LP)</text>
    <text x="30" y="65" fill="#C7D2FE" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12">Unlocked via League Points (LP) in Web Shop</text>
    <g transform="translate(30, 90)">
      <text x="0" y="20" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12">★ Exclusive Ambassador Kits &amp; Boots</text>
      <text x="0" y="45" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12">★ Accelerated CP &amp; LP reward multipliers</text>
      <text x="0" y="70" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12">★ Special Edition Player Cards &amp; Badges</text>
      <text x="0" y="95" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12">★ Stadium customization &amp; choreo displays</text>
    </g>
  </g>
</svg>`;

fs.writeFileSync(path.join(__dirname, '../assets/images/banners/ufl-team-pass.svg'), uflTeamPassSvg.trim());
console.log('Saved assets/images/banners/ufl-team-pass.svg');
