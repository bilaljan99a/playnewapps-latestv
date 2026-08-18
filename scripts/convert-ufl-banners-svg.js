const fs = require('fs');

// 1. ufl-hero-official.svg
const heroSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 520" width="1200" height="520" fill="none">
  <defs>
    <linearGradient id="ufl-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050B14"/>
      <stop offset="40%" stop-color="#0B1528"/>
      <stop offset="80%" stop-color="#081A3A"/>
      <stop offset="100%" stop-color="#020712"/>
    </linearGradient>
    <linearGradient id="cyan-glow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#06B6D4"/>
      <stop offset="50%" stop-color="#00F0FF"/>
      <stop offset="100%" stop-color="#3B82F6"/>
    </linearGradient>
    <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#FCD34D"/>
    </linearGradient>
    <pattern id="pitch-grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(0, 240, 255, 0.04)" stroke-width="1"/>
    </pattern>
    <radialGradient id="stadium-light" cx="85%" cy="30%" r="50%">
      <stop offset="0%" stop-color="#00F0FF" stop-opacity="0.35"/>
      <stop offset="50%" stop-color="#2563EB" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="left-glow" cx="15%" cy="80%" r="40%">
      <stop offset="0%" stop-color="#06B6D4" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background Canvas -->
  <rect width="1200" height="520" fill="url(#ufl-bg)"/>
  <rect width="1200" height="520" fill="url(#pitch-grid)"/>
  <rect width="1200" height="520" fill="url(#stadium-light)"/>
  <rect width="1200" height="520" fill="url(#left-glow)"/>

  <!-- Tactical Pitch Lines Graphic -->
  <g opacity="0.18" stroke="#00F0FF" stroke-width="2">
    <!-- Pitch Outlines -->
    <rect x="580" y="60" width="560" height="400" rx="6" fill="none"/>
    <line x1="860" y1="60" x2="860" y2="460"/>
    <circle cx="860" cy="260" r="75" fill="none"/>
    <circle cx="860" cy="260" r="4" fill="#00F0FF"/>
    <!-- Goal Penalty Boxes -->
    <rect x="580" y="150" width="110" height="220" fill="none"/>
    <rect x="1030" y="150" width="110" height="220" fill="none"/>
    <!-- Center field angle markings -->
    <path d="M 680 90 L 860 260 L 1040 90" stroke-dasharray="4,6"/>
    <path d="M 680 430 L 860 260 L 1040 430" stroke-dasharray="4,6"/>
  </g>

  <!-- Right Hero Visual Emblem -->
  <g transform="translate(860, 260)">
    <!-- Outer energy rings -->
    <circle cx="0" cy="0" r="160" stroke="url(#cyan-glow)" stroke-width="1.5" opacity="0.4" stroke-dasharray="8,12"/>
    <circle cx="0" cy="0" r="130" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
    
    <!-- Soccer Ball Icon Graphic Geometry -->
    <g transform="scale(1.4) translate(-36, -36)">
      <polygon points="36,10 58,26 50,52 22,52 14,26" fill="#00F0FF" opacity="0.85"/>
      <line x1="36" y1="10" x2="36" y2="0" stroke="#00F0FF" stroke-width="3"/>
      <line x1="58" y1="26" x2="70" y2="20" stroke="#00F0FF" stroke-width="3"/>
      <line x1="50" y1="52" x2="60" y2="66" stroke="#00F0FF" stroke-width="3"/>
      <line x1="22" y1="52" x2="12" y2="66" stroke="#00F0FF" stroke-width="3"/>
      <line x1="14" y1="26" x2="2" y2="20" stroke="#00F0FF" stroke-width="3"/>
      <circle cx="36" cy="36" r="34" stroke="#FFFFFF" stroke-width="3.5" fill="none"/>
    </g>

    <!-- Floating Feature Badges -->
    <g transform="translate(-160, 110)">
      <rect width="135" height="34" rx="17" fill="rgba(11, 21, 40, 0.9)" stroke="#00F0FF" stroke-width="1.5"/>
      <text x="67" y="22" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="800" fill="#00F0FF" text-anchor="middle">UNREAL ENGINE 5</text>
    </g>
    <g transform="translate(45, 110)">
      <rect width="130" height="34" rx="17" fill="rgba(11, 21, 40, 0.9)" stroke="#F59E0B" stroke-width="1.5"/>
      <text x="65" y="22" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="800" fill="#FCD34D" text-anchor="middle">FAIR TO PLAY</text>
    </g>
    <g transform="translate(-65, -135)">
      <rect width="140" height="34" rx="17" fill="rgba(11, 21, 40, 0.9)" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
      <text x="70" y="22" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="800" fill="#FFFFFF" text-anchor="middle">FIFPRO LICENSED</text>
    </g>
  </g>

  <!-- Left Content Column -->
  <g transform="translate(80, 80)">
    <!-- Top Pill Badge -->
    <g>
      <rect width="320" height="36" rx="18" fill="rgba(0, 240, 255, 0.12)" stroke="#00F0FF" stroke-width="1.5"/>
      <circle cx="20" cy="18" r="6" fill="#10B981"/>
      <text x="36" y="23" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="800" fill="#E0F2FE" letter-spacing="0.5px">OFFICIAL PARTNER • 100% FREE</text>
    </g>

    <!-- Main Title -->
    <text x="0" y="110" font-family="'Plus Jakarta Sans', sans-serif" font-size="64" font-weight="900" fill="#FFFFFF" letter-spacing="-2px">
      UFL™ FOOTBALL
    </text>

    <!-- Tagline -->
    <text x="0" y="165" font-family="'Plus Jakarta Sans', sans-serif" font-size="30" font-weight="800" fill="url(#cyan-glow)" letter-spacing="-0.5px">
      Next-Gen Fair to Play Soccer Experience
    </text>

    <!-- Description -->
    <text x="0" y="215" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="500" fill="#94A3B8" width="600">
      Built from the ground up by Strikerz Inc. Powered by Unreal Engine 5.
    </text>
    <text x="0" y="240" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="500" fill="#94A3B8">
      Zero pay-to-win momentum scripting. Pure skill, tactical mastery, and real clubs.
    </text>

    <!-- Key Feature Pills -->
    <g transform="translate(0, 280)">
      <g transform="translate(0, 0)">
        <rect width="150" height="34" rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
        <text x="75" y="22" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="700" fill="#FFFFFF" text-anchor="middle">PC / Steam</text>
      </g>
      <g transform="translate(160, 0)">
        <rect width="150" height="34" rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
        <text x="75" y="22" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="700" fill="#FFFFFF" text-anchor="middle">PlayStation 5</text>
      </g>
      <g transform="translate(320, 0)">
        <rect width="160" height="34" rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
        <text x="80" y="22" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="700" fill="#FFFFFF" text-anchor="middle">Xbox Series X|S</text>
      </g>
      <g transform="translate(490, 0)">
        <rect width="120" height="34" rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
        <text x="60" y="22" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="700" fill="#FFFFFF" text-anchor="middle">Mobile</text>
      </g>
    </g>

    <!-- Ambassador Callout -->
    <g transform="translate(0, 335)">
      <text x="0" y="18" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="700" fill="#FCD34D">
        ★ Cristiano Ronaldo Official Partner &amp; Ambassador • Strikerz Inc.
      </text>
    </g>
  </g>
</svg>`;

// 2. ufl-gameplay-official.svg
const gameplaySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 480" width="1200" height="480" fill="none">
  <defs>
    <linearGradient id="gameplay-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#030814"/>
      <stop offset="60%" stop-color="#0A162B"/>
      <stop offset="100%" stop-color="#051020"/>
    </linearGradient>
    <linearGradient id="blue-beam" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#2563EB"/>
      <stop offset="50%" stop-color="#00F0FF"/>
      <stop offset="100%" stop-color="#10B981"/>
    </linearGradient>
    <pattern id="ue5-grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 240, 255, 0.05)" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="1200" height="480" fill="url(#gameplay-bg)"/>
  <rect width="1200" height="480" fill="url(#ue5-grid)"/>

  <!-- Dynamic Pitch Physics HUD -->
  <g transform="translate(720, 70)">
    <!-- Pitch Wireframe Screen -->
    <rect width="420" height="340" rx="16" fill="rgba(11, 21, 40, 0.85)" stroke="#00F0FF" stroke-width="2"/>
    
    <!-- Top HUD Bar -->
    <rect width="420" height="40" rx="16" fill="rgba(0, 240, 255, 0.15)"/>
    <circle cx="25" cy="20" r="5" fill="#10B981"/>
    <text x="40" y="25" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="800" fill="#E0F2FE">TACTICAL MATCH ENGINE • UNREAL 5</text>
    
    <!-- Match Stats Graphic -->
    <g transform="translate(30, 70)">
      <!-- Ball trajectory vectors -->
      <path d="M 30 200 Q 180 30 330 140" fill="none" stroke="url(#blue-beam)" stroke-width="3" stroke-dasharray="6,6"/>
      <circle cx="330" cy="140" r="8" fill="#00F0FF"/>
      <circle cx="330" cy="140" r="16" stroke="#00F0FF" stroke-width="1.5" opacity="0.6"/>

      <!-- Formation Nodes -->
      <g fill="#00F0FF">
        <circle cx="50" cy="80" r="8"/><circle cx="120" cy="50" r="8"/><circle cx="120" cy="120" r="8"/>
        <circle cx="210" cy="70" r="8"/><circle cx="210" cy="150" r="8"/><circle cx="290" cy="100" r="10" fill="#F59E0B"/>
      </g>

      <!-- Tactical Connection Lines -->
      <path d="M 50 80 L 120 50 L 210 70 L 290 100 M 120 120 L 210 150 L 290 100" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
    </g>

    <!-- Bottom Stat Badges -->
    <g transform="translate(30, 290)">
      <text x="0" y="0" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="#94A3B8">PASSING ACCURACY</text>
      <text x="0" y="20" font-family="'Plus Jakarta Sans', sans-serif" font-size="15" font-weight="900" fill="#00F0FF">94.8%</text>

      <text x="180" y="0" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="#94A3B8">TACTICAL SYNERGY</text>
      <text x="180" y="20" font-family="'Plus Jakarta Sans', sans-serif" font-size="15" font-weight="900" fill="#10B981">MAX RATING</text>
    </g>
  </g>

  <!-- Left Text -->
  <g transform="translate(80, 80)">
    <rect width="250" height="34" rx="17" fill="rgba(37, 99, 235, 0.2)" stroke="#2563EB" stroke-width="1.5"/>
    <text x="25" y="22" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="800" fill="#93C5FD">DYNAMIC MATCHDAY ACTION</text>

    <text x="0" y="100" font-family="'Plus Jakarta Sans', sans-serif" font-size="46" font-weight="900" fill="#FFFFFF" letter-spacing="-1px">
      Unreal Engine 5 Physics
    </text>
    <text x="0" y="145" font-family="'Plus Jakarta Sans', sans-serif" font-size="24" font-weight="800" fill="url(#blue-beam)">
      Zero Momentum Scripting • Fair Matchmaking
    </text>

    <text x="0" y="195" font-family="'Plus Jakarta Sans', sans-serif" font-size="15" font-weight="500" fill="#94A3B8">
      Experience authentic turf interaction, true-to-life player collisions, and skill-based
    </text>
    <text x="0" y="220" font-family="'Plus Jakarta Sans', sans-serif" font-size="15" font-weight="500" fill="#94A3B8">
      shooting mechanics designed strictly for competitive esports balance.
    </text>

    <g transform="translate(0, 260)">
      <rect width="180" height="42" rx="8" fill="rgba(0, 240, 255, 0.15)" stroke="#00F0FF" stroke-width="1"/>
      <text x="90" y="26" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="800" fill="#00F0FF" text-anchor="middle">REAL-TIME COLLISION</text>
    </g>
  </g>
</svg>`;

// 3. ufl-squad-webshop-official.svg
const squadSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 480" width="1200" height="480" fill="none">
  <defs>
    <linearGradient id="squad-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#040D1A"/>
      <stop offset="50%" stop-color="#081E38"/>
      <stop offset="100%" stop-color="#030A14"/>
    </linearGradient>
    <linearGradient id="gold-amber" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#FCD34D"/>
    </linearGradient>
    <linearGradient id="card-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E293B"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="480" fill="url(#squad-bg)"/>

  <!-- Squad Card Showcase (Right) -->
  <g transform="translate(700, 60)">
    <!-- Card 1 -->
    <g transform="translate(0, 30) rotate(-6)">
      <rect width="180" height="270" rx="14" fill="url(#card-grad)" stroke="#38BDF8" stroke-width="2"/>
      <rect width="180" height="40" rx="14" fill="rgba(56, 189, 248, 0.2)"/>
      <text x="90" y="26" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="900" fill="#38BDF8" text-anchor="middle">TACTICAL CP PACK</text>
      <circle cx="90" cy="110" r="40" fill="rgba(255,255,255,0.05)" stroke="#38BDF8" stroke-width="1.5"/>
      <text x="90" y="118" font-family="'Plus Jakarta Sans', sans-serif" font-size="28" font-weight="900" fill="#FFFFFF" text-anchor="middle">CP</text>
      <text x="90" y="185" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="900" fill="#38BDF8" text-anchor="middle">+2,500 CP</text>
      <text x="90" y="210" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="#94A3B8" text-anchor="middle">Club Signings</text>
      <rect x="25" y="225" width="130" height="28" rx="6" fill="#38BDF8"/>
      <text x="90" y="244" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="900" fill="#0F172A" text-anchor="middle">WEB SHOP DEAL</text>
    </g>

    <!-- Card 2 (Hero Central) -->
    <g transform="translate(140, 10)">
      <rect width="200" height="300" rx="16" fill="url(#card-grad)" stroke="#F59E0B" stroke-width="2.5"/>
      <rect width="200" height="45" rx="16" fill="rgba(245, 158, 11, 0.25)"/>
      <text x="100" y="28" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="900" fill="#FCD34D" text-anchor="middle">PRO SQUAD BUNDLE</text>
      <circle cx="100" cy="125" r="46" fill="rgba(245, 158, 11, 0.1)" stroke="#F59E0B" stroke-width="2"/>
      <text x="100" y="135" font-family="'Plus Jakarta Sans', sans-serif" font-size="34" font-weight="900" fill="#FCD34D" text-anchor="middle">LP</text>
      <text x="100" y="205" font-family="'Plus Jakarta Sans', sans-serif" font-size="18" font-weight="900" fill="#FFFFFF" text-anchor="middle">CR7 SQUAD PASS</text>
      <text x="100" y="230" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700" fill="#FCD34D" text-anchor="middle">+ Bonus League Points</text>
      <rect x="25" y="250" width="150" height="32" rx="8" fill="#F59E0B"/>
      <text x="100" y="271" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="900" fill="#000000" text-anchor="middle">OFFICIAL PC BUNDLE</text>
    </g>
  </g>

  <!-- Left Content -->
  <g transform="translate(80, 80)">
    <rect width="260" height="34" rx="17" fill="rgba(245, 158, 11, 0.15)" stroke="#F59E0B" stroke-width="1.5"/>
    <text x="25" y="22" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="800" fill="#FCD34D">OFFICIAL UFL WEB SHOP</text>

    <text x="0" y="100" font-family="'Plus Jakarta Sans', sans-serif" font-size="46" font-weight="900" fill="#FFFFFF" letter-spacing="-1px">
      Digital Bundles &amp; CP Packs
    </text>
    <text x="0" y="145" font-family="'Plus Jakarta Sans', sans-serif" font-size="24" font-weight="800" fill="url(#gold-amber)">
      Verified PC Roster Packs &amp; Stadium Cosmetics
    </text>

    <text x="0" y="195" font-family="'Plus Jakarta Sans', sans-serif" font-size="15" font-weight="500" fill="#94A3B8">
      Acquire officially licensed FIFPRO stars, customize your home arena banners, and
    </text>
    <text x="0" y="220" font-family="'Plus Jakarta Sans', sans-serif" font-size="15" font-weight="500" fill="#94A3B8">
      accelerate club development through official Strikerz Inc. web currency bundles.
    </text>

    <g transform="translate(0, 265)">
      <rect width="240" height="44" rx="8" fill="#F59E0B"/>
      <text x="120" y="27" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="900" fill="#000000" text-anchor="middle">BROWSE WEB SHOP DEALS →</text>
    </g>
  </g>
</svg>`;

// 4. ufl-teampass-official.svg
const teampassSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 480" width="1200" height="480" fill="none">
  <defs>
    <linearGradient id="tp-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A0614"/>
      <stop offset="50%" stop-color="#150E28"/>
      <stop offset="100%" stop-color="#05030A"/>
    </linearGradient>
    <linearGradient id="purple-neon" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#A855F7"/>
      <stop offset="50%" stop-color="#EC4899"/>
      <stop offset="100%" stop-color="#06B6D4"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="480" fill="url(#tp-bg)"/>

  <!-- Right Visual: Tier Track Progression Graphics -->
  <g transform="translate(680, 80)">
    <rect width="440" height="320" rx="16" fill="rgba(21, 14, 40, 0.9)" stroke="#A855F7" stroke-width="2"/>
    <rect width="440" height="40" rx="16" fill="rgba(168, 85, 247, 0.2)"/>
    <text x="30" y="25" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="800" fill="#E9D5FF">SEASON PROGRESSION • TIER REWARDS</text>

    <!-- Track Tiers -->
    <g transform="translate(30, 70)">
      <!-- Tier 1 -->
      <rect x="0" y="0" width="115" height="130" rx="10" fill="#1F1538" stroke="#A855F7" stroke-width="1.5"/>
      <text x="57" y="25" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="800" fill="#A855F7" text-anchor="middle">TIER 10</text>
      <circle cx="57" cy="65" r="22" fill="#A855F7" opacity="0.2"/>
      <text x="57" y="70" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="900" fill="#FFFFFF" text-anchor="middle">KIT</text>
      <text x="57" y="110" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="700" fill="#94A3B8" text-anchor="middle">Exclusive Jersey</text>

      <!-- Tier 2 -->
      <rect x="130" y="0" width="115" height="130" rx="10" fill="#1F1538" stroke="#EC4899" stroke-width="1.5"/>
      <text x="187" y="25" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="800" fill="#EC4899" text-anchor="middle">TIER 25</text>
      <circle cx="187" cy="65" r="22" fill="#EC4899" opacity="0.2"/>
      <text x="187" y="70" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="900" fill="#FFFFFF" text-anchor="middle">CP</text>
      <text x="187" y="110" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="700" fill="#94A3B8" text-anchor="middle">+1,000 Points</text>

      <!-- Tier 3 (Master CR7 Tier) -->
      <rect x="260" y="0" width="120" height="130" rx="10" fill="#2A174A" stroke="#F59E0B" stroke-width="2"/>
      <text x="320" y="25" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="900" fill="#FCD34D" text-anchor="middle">MAX TIER 50</text>
      <circle cx="320" cy="65" r="24" fill="#F59E0B" opacity="0.2"/>
      <text x="320" y="72" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="900" fill="#FCD34D" text-anchor="middle">CR7</text>
      <text x="320" y="110" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="900" fill="#FCD34D" text-anchor="middle">Master Ambassador</text>
    </g>

    <!-- Progress Bar -->
    <g transform="translate(30, 240)">
      <rect width="380" height="12" rx="6" fill="#1F1538"/>
      <rect width="280" height="12" rx="6" fill="url(#purple-neon)"/>
      <text x="0" y="35" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700" fill="#94A3B8">Season 1 Active • Level 38 / 50</text>
      <text x="380" y="35" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="800" fill="#06B6D4" text-anchor="end">76% COMPLETED</text>
    </g>
  </g>

  <!-- Left Content -->
  <g transform="translate(80, 80)">
    <rect width="240" height="34" rx="17" fill="rgba(168, 85, 247, 0.15)" stroke="#A855F7" stroke-width="1.5"/>
    <text x="25" y="22" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="800" fill="#E9D5FF">SEASONAL TOURNAMENTS</text>

    <text x="0" y="100" font-family="'Plus Jakarta Sans', sans-serif" font-size="46" font-weight="900" fill="#FFFFFF" letter-spacing="-1px">
      UFL Team Pass
    </text>
    <text x="0" y="145" font-family="'Plus Jakarta Sans', sans-serif" font-size="24" font-weight="800" fill="url(#purple-neon)">
      Earn Daily XP, Boots, Kits &amp; CR7 Rewards
    </text>

    <text x="0" y="195" font-family="'Plus Jakarta Sans', sans-serif" font-size="15" font-weight="500" fill="#94A3B8">
      Level up your club through competitive matchmaking matches, weekend division leagues,
    </text>
    <text x="0" y="220" font-family="'Plus Jakarta Sans', sans-serif" font-size="15" font-weight="500" fill="#94A3B8">
      and seasonal quests with premium items unlocked strictly through gameplay.
    </text>

    <g transform="translate(0, 265)">
      <rect width="220" height="44" rx="8" fill="#A855F7"/>
      <text x="110" y="27" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="900" fill="#FFFFFF" text-anchor="middle">UNLOCK TEAM PASS →</text>
    </g>
  </g>
</svg>`;

// Write all SVGs to assets/images/banners/
fs.writeFileSync('assets/images/banners/ufl-hero-official.svg', heroSvg, 'utf8');
fs.writeFileSync('assets/images/banners/ufl-gameplay-official.svg', gameplaySvg, 'utf8');
fs.writeFileSync('assets/images/banners/ufl-squad-webshop-official.svg', squadSvg, 'utf8');
fs.writeFileSync('assets/images/banners/ufl-teampass-official.svg', teampassSvg, 'utf8');

console.log('Successfully written all 4 UFL SVG banner files!');

// Update ufl-coupons.html to use the SVG banners
let uflHtml = fs.readFileSync('ufl-coupons.html', 'utf8');
uflHtml = uflHtml.replace(/ufl-hero-official\.webp/g, 'ufl-hero-official.svg');
uflHtml = uflHtml.replace(/ufl-gameplay-official\.webp/g, 'ufl-gameplay-official.svg');
uflHtml = uflHtml.replace(/ufl-squad-webshop-official\.webp/g, 'ufl-squad-webshop-official.svg');
uflHtml = uflHtml.replace(/ufl-teampass-official\.webp/g, 'ufl-teampass-official.svg');
fs.writeFileSync('ufl-coupons.html', uflHtml, 'utf8');

console.log('Successfully updated ufl-coupons.html with SVG banners!');
