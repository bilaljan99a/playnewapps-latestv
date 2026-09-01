const fs = require('fs');
const path = require('path');

const diagramAssets = {
  // 1. Steam Deck
  'assets/images/steam-deck/steam-deck-hero-overview.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 580" width="1000" height="580" fill="none">
    <rect width="1000" height="580" fill="#0B132B"/>
    <defs>
      <linearGradient id="sdHeroGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#1A9FFF" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#0066CC" stop-opacity="0.05"/>
      </linearGradient>
      <linearGradient id="screenGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#1E293B"/>
        <stop offset="100%" stop-color="#0F172A"/>
      </linearGradient>
    </defs>
    <!-- Background Grid -->
    <path d="M50 0 V580 M150 0 V580 M250 0 V580 M350 0 V580 M450 0 V580 M550 0 V580 M650 0 V580 M750 0 V580 M850 0 V580 M950 0 V580" stroke="#1E293B" stroke-width="1" stroke-opacity="0.4"/>
    <path d="M0 60 H1000 M0 140 H1000 M0 220 H1000 M0 300 H1000 M0 380 H1000 M0 460 H1000 M0 540 H1000" stroke="#1E293B" stroke-width="1" stroke-opacity="0.4"/>
    
    <!-- Title Tag -->
    <rect x="50" y="35" width="220" height="30" rx="15" fill="#1A9FFF" fill-opacity="0.15" stroke="#1A9FFF" stroke-width="1"/>
    <text x="70" y="55" font-family="-apple-system, BlinkMacSystemFont, Roboto, sans-serif" font-size="12" font-weight="700" fill="#1A9FFF" letter-spacing="1">VALVE STEAM DECK LAB REVIEW</text>
    <text x="50" y="105" font-family="-apple-system, BlinkMacSystemFont, Roboto, sans-serif" font-size="28" font-weight="900" fill="#FFFFFF">Hardware Architecture &amp; Control Layout</text>
    <text x="50" y="130" font-family="-apple-system, BlinkMacSystemFont, Roboto, sans-serif" font-size="14" fill="#94A3B8">AMD Custom Zen 2 (4C/8T) + RDNA 2 GPU (8 CUs) • 16GB LPDDR5 • SteamOS 3.5</text>

    <!-- Handheld Body Illustration -->
    <g transform="translate(100, 160)">
      <!-- Main Chassis -->
      <rect x="0" y="20" width="800" height="340" rx="48" fill="#151E2E" stroke="#334155" stroke-width="2"/>
      <path d="M0 120 C-30 180 -30 260 30 340 L100 360 L700 360 L770 340 C830 260 830 180 800 120 Z" fill="#111827" stroke="#1E293B" stroke-width="1.5"/>

      <!-- 7.4" / 7.0" Center Screen -->
      <rect x="180" y="50" width="440" height="275" rx="12" fill="#000000" stroke="#475569" stroke-width="2"/>
      <rect x="195" y="65" width="410" height="245" rx="6" fill="url(#screenGrad)"/>
      
      <!-- Screen UI Graphic -->
      <rect x="215" y="85" width="160" height="20" rx="4" fill="#1A9FFF" fill-opacity="0.2"/>
      <text x="225" y="99" font-family="Roboto, sans-serif" font-size="11" font-weight="700" fill="#38BDF8">STEAM LIBRARY • 60 FPS</text>
      
      <g transform="translate(215, 120)">
        <rect x="0" y="0" width="115" height="150" rx="8" fill="#1E293B" stroke="#334155"/>
        <rect x="10" y="10" width="95" height="80" rx="4" fill="#0284C7" fill-opacity="0.3"/>
        <text x="15" y="110" font-family="Roboto, sans-serif" font-size="10" font-weight="700" fill="#FFFFFF">Cyberpunk 2077</text>
        <text x="15" y="125" font-family="Roboto, sans-serif" font-size="9" fill="#10B981">● Verified 42 FPS</text>
      </g>
      <g transform="translate(345, 120)">
        <rect x="0" y="0" width="115" height="150" rx="8" fill="#1E293B" stroke="#334155"/>
        <rect x="10" y="10" width="95" height="80" rx="4" fill="#8B5CF6" fill-opacity="0.3"/>
        <text x="15" y="110" font-family="Roboto, sans-serif" font-size="10" font-weight="700" fill="#FFFFFF">Elden Ring</text>
        <text x="15" y="125" font-family="Roboto, sans-serif" font-size="9" fill="#10B981">● Verified 45 FPS</text>
      </g>
      <g transform="translate(475, 120)">
        <rect x="0" y="0" width="115" height="150" rx="8" fill="#1E293B" stroke="#334155"/>
        <rect x="10" y="10" width="95" height="80" rx="4" fill="#EC4899" fill-opacity="0.3"/>
        <text x="15" y="110" font-family="Roboto, sans-serif" font-size="10" font-weight="700" fill="#FFFFFF">Hades II</text>
        <text x="15" y="125" font-family="Roboto, sans-serif" font-size="9" fill="#10B981">● Verified 90 FPS</text>
      </g>

      <!-- Left Controls -->
      <g transform="translate(45, 70)">
        <!-- Left Thumbstick -->
        <circle cx="50" cy="40" r="26" fill="#1E293B" stroke="#475569" stroke-width="2"/>
        <circle cx="50" cy="40" r="16" fill="#0F172A"/>
        <text x="50" y="44" font-family="Roboto, sans-serif" font-size="9" font-weight="700" fill="#94A3B8" text-anchor="middle">L-STICK</text>
        <!-- D-Pad -->
        <g transform="translate(25, 100)">
          <path d="M20 0 H30 V20 H50 V30 H30 V50 H20 V30 H0 V20 H20 Z" fill="#1E293B" stroke="#475569" stroke-width="1.5"/>
        </g>
        <!-- Left Trackpad -->
        <rect x="15" y="175" width="70" height="70" rx="10" fill="#0F172A" stroke="#1A9FFF" stroke-width="1.5" stroke-dasharray="3 3"/>
        <text x="50" y="215" font-family="Roboto, sans-serif" font-size="9" font-weight="600" fill="#38BDF8" text-anchor="middle">Haptic Trackpad</text>
      </g>

      <!-- Right Controls -->
      <g transform="translate(655, 70)">
        <!-- ABXY Buttons -->
        <g transform="translate(30, 20)">
          <circle cx="20" cy="0" r="10" fill="#1E293B" stroke="#475569"/><text x="20" y="4" font-size="10" font-weight="900" fill="#FFFFFF" text-anchor="middle">Y</text>
          <circle cx="0" cy="20" r="10" fill="#1E293B" stroke="#475569"/><text x="0" y="24" font-size="10" font-weight="900" fill="#FFFFFF" text-anchor="middle">X</text>
          <circle cx="40" cy="20" r="10" fill="#1E293B" stroke="#475569"/><text x="40" y="24" font-size="10" font-weight="900" fill="#FFFFFF" text-anchor="middle">B</text>
          <circle cx="20" cy="40" r="10" fill="#1E293B" stroke="#475569"/><text x="20" y="44" font-size="10" font-weight="900" fill="#FFFFFF" text-anchor="middle">A</text>
        </g>
        <!-- Right Thumbstick -->
        <circle cx="50" cy="115" r="26" fill="#1E293B" stroke="#475569" stroke-width="2"/>
        <circle cx="50" cy="115" r="16" fill="#0F172A"/>
        <text x="50" y="119" font-family="Roboto, sans-serif" font-size="9" font-weight="700" fill="#94A3B8" text-anchor="middle">R-STICK</text>
        <!-- Right Trackpad -->
        <rect x="15" y="175" width="70" height="70" rx="10" fill="#0F172A" stroke="#1A9FFF" stroke-width="1.5" stroke-dasharray="3 3"/>
        <text x="50" y="215" font-family="Roboto, sans-serif" font-size="9" font-weight="600" fill="#38BDF8" text-anchor="middle">Haptic Trackpad</text>
      </g>
    </g>

    <!-- Bottom Highlights -->
    <g transform="translate(100, 540)">
      <text x="0" y="0" font-family="Roboto, sans-serif" font-size="12" font-weight="700" fill="#38BDF8">✓ Dual Capacitive Gyro</text>
      <text x="200" y="0" font-family="Roboto, sans-serif" font-size="12" font-weight="700" fill="#38BDF8">✓ 4 Rear Grip Buttons (L4/L5/R4/R5)</text>
      <text x="490" y="0" font-family="Roboto, sans-serif" font-size="12" font-weight="700" fill="#38BDF8">✓ 50Wh / 40Wh Battery</text>
      <text x="680" y="0" font-family="Roboto, sans-serif" font-size="12" font-weight="700" fill="#38BDF8">✓ MicroSD Slot (UHS-I)</text>
    </g>
  </svg>`,

  // 2. Xbox Series X
  'assets/images/xbox/xbox-series-x-hero-overview.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 580" width="1000" height="580" fill="none">
    <rect width="1000" height="580" fill="#0A0E17"/>
    <!-- Background Accents -->
    <circle cx="850" cy="120" r="300" fill="#107C10" fill-opacity="0.08"/>
    <rect x="50" y="35" width="220" height="30" rx="15" fill="#107C10" fill-opacity="0.15" stroke="#107C10" stroke-width="1"/>
    <text x="70" y="55" font-family="-apple-system, BlinkMacSystemFont, Roboto, sans-serif" font-size="12" font-weight="700" fill="#107C10" letter-spacing="1">MICROSOFT XBOX TESTING LAB</text>
    <text x="50" y="105" font-family="-apple-system, BlinkMacSystemFont, Roboto, sans-serif" font-size="28" font-weight="900" fill="#FFFFFF">Xbox Series X Architecture &amp; Cooling</text>
    <text x="50" y="130" font-family="-apple-system, BlinkMacSystemFont, Roboto, sans-serif" font-size="14" fill="#94A3B8">12.15 TFLOPS AMD RDNA 2 GPU • 16GB GDDR6 • Xbox Velocity 1TB NVMe SSD</text>

    <!-- Isometric Monolith Tower -->
    <g transform="translate(150, 160)">
      <!-- Main Monolith Box -->
      <rect x="0" y="0" width="200" height="340" rx="8" fill="#121824" stroke="#1E293B" stroke-width="2"/>
      
      <!-- Top Convex Mesh & Green Glow -->
      <rect x="10" y="10" width="180" height="40" rx="6" fill="#0B131E" stroke="#107C10" stroke-width="1.5"/>
      <circle cx="30" cy="30" r="4" fill="#107C10"/>
      <circle cx="50" cy="30" r="4" fill="#107C10"/>
      <circle cx="70" cy="30" r="5" fill="#22C55E"/>
      <circle cx="90" cy="30" r="6" fill="#4ADE80"/>
      <circle cx="110" cy="30" r="6" fill="#4ADE80"/>
      <circle cx="130" cy="30" r="5" fill="#22C55E"/>
      <circle cx="150" cy="30" r="4" fill="#107C10"/>
      <circle cx="170" cy="30" r="4" fill="#107C10"/>

      <!-- Power Button -->
      <circle cx="35" cy="80" r="10" fill="#0B131E" stroke="#107C10" stroke-width="1.5"/>
      <path d="M30 76 L40 84 M40 76 L30 84" stroke="#22C55E" stroke-width="1.5"/>

      <!-- 4K UHD Blu-ray Slot -->
      <rect x="25" y="120" width="6" height="140" rx="3" fill="#020617" stroke="#334155" stroke-width="1"/>
      <circle cx="28" cy="275" r="4" fill="#334155"/>

      <!-- USB Port -->
      <rect x="155" y="280" width="16" height="8" rx="2" fill="#020617" stroke="#334155"/>
      <circle cx="163" cy="260" r="4" fill="#107C10"/>
    </g>

    <!-- Technical Specs & Performance Panel -->
    <g transform="translate(420, 160)">
      <rect x="0" y="0" width="480" height="340" rx="16" fill="#111827" stroke="#1E293B" stroke-width="1.5"/>
      
      <text x="30" y="40" font-family="Roboto, sans-serif" font-size="16" font-weight="900" fill="#FFFFFF">Velocity Architecture &amp; Next-Gen Metrics</text>
      
      <!-- Metric 1 -->
      <g transform="translate(30, 65)">
        <rect x="0" y="0" width="420" height="50" rx="8" fill="#1E293B" stroke="#334155"/>
        <text x="15" y="22" font-size="12" font-weight="700" fill="#22C55E">GPU COMPUTE POWER</text>
        <text x="15" y="40" font-size="14" font-weight="900" fill="#FFFFFF">12.15 TFLOPS, 52 CUs @ 1.825 GHz RDNA 2</text>
        <text x="360" y="32" font-size="16" font-weight="900" fill="#22C55E">4K 120Hz</text>
      </g>
      
      <!-- Metric 2 -->
      <g transform="translate(30, 125)">
        <rect x="0" y="0" width="420" height="50" rx="8" fill="#1E293B" stroke="#334155"/>
        <text x="15" y="22" font-size="12" font-weight="700" fill="#38BDF8">QUICK RESUME ARCHITECTURE</text>
        <text x="15" y="40" font-size="14" font-weight="900" fill="#FFFFFF">Instant Suspend/Resume 5-8 Games in 4-6s</text>
        <text x="360" y="32" font-size="16" font-weight="900" fill="#38BDF8">&lt; 5 sec</text>
      </g>

      <!-- Metric 3 -->
      <g transform="translate(30, 185)">
        <rect x="0" y="0" width="420" height="50" rx="8" fill="#1E293B" stroke="#334155"/>
        <text x="15" y="22" font-size="12" font-weight="700" fill="#F59E0B">MEMORY BANDWIDTH</text>
        <text x="15" y="40" font-size="14" font-weight="900" fill="#FFFFFF">10GB @ 560 GB/s + 6GB @ 336 GB/s GDDR6</text>
        <text x="340" y="32" font-size="16" font-weight="900" fill="#F59E0B">560 GB/s</text>
      </g>

      <!-- Metric 4 -->
      <g transform="translate(30, 245)">
        <rect x="0" y="0" width="420" height="50" rx="8" fill="#1E293B" stroke="#334155"/>
        <text x="15" y="22" font-size="12" font-weight="700" fill="#EC4899">ACOUSTIC &amp; THERMAL PROFILE</text>
        <text x="15" y="40" font-size="14" font-weight="900" fill="#FFFFFF">Vapor Chamber + 130mm Axial Fan Under Full Load</text>
        <text x="355" y="32" font-size="16" font-weight="900" fill="#EC4899">24.2 dB</text>
      </g>
    </g>
    
    <!-- Footer Note -->
    <text x="500" y="540" font-family="Roboto, sans-serif" font-size="13" font-weight="600" fill="#94A3B8" text-anchor="middle">Tested with Xbox Game Pass Ultimate, Dolby Vision HDR &amp; Dolby Atmos 3D Spatial Audio</text>
  </svg>`,

  // 3. Windows 11
  'assets/images/windows11/windows-11-hero-overview.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 580" width="1000" height="580" fill="none">
    <rect width="1000" height="580" fill="#061224"/>
    <rect x="50" y="35" width="220" height="30" rx="15" fill="#0078D4" fill-opacity="0.15" stroke="#0078D4" stroke-width="1"/>
    <text x="70" y="55" font-family="-apple-system, BlinkMacSystemFont, Roboto, sans-serif" font-size="12" font-weight="700" fill="#38BDF8" letter-spacing="1">MICROSOFT OS EVALUATION LAB</text>
    <text x="50" y="105" font-family="-apple-system, BlinkMacSystemFont, Roboto, sans-serif" font-size="28" font-weight="900" fill="#FFFFFF">Windows 11 (24H2) Desktop &amp; AI Ecosystem</text>
    <text x="50" y="130" font-family="-apple-system, BlinkMacSystemFont, Roboto, sans-serif" font-size="14" fill="#94A3B8">Fluent Design 2.0 • DirectX 12 Ultimate • Microsoft Copilot • DirectStorage API</text>

    <!-- Desktop Screen Simulation -->
    <g transform="translate(100, 160)">
      <rect x="0" y="0" width="800" height="350" rx="14" fill="#0B1729" stroke="#1E293B" stroke-width="2"/>
      
      <!-- Top Window Header -->
      <rect x="0" y="0" width="800" height="36" rx="14" fill="#101F38"/>
      <circle cx="20" cy="18" r="5" fill="#EF4444"/>
      <circle cx="36" cy="18" r="5" fill="#F59E0B"/>
      <circle cx="52" cy="18" r="5" fill="#10B981"/>
      <text x="400" y="23" font-family="Roboto, sans-serif" font-size="12" font-weight="700" fill="#94A3B8" text-anchor="middle">Windows 11 Pro — Version 24H2 Build 26100</text>

      <!-- Center Snap Layout Visual -->
      <g transform="translate(30, 55)">
        <!-- Window 1: File Explorer with Tabs -->
        <rect x="0" y="0" width="350" height="230" rx="10" fill="#0F172A" stroke="#0284C7" stroke-width="1.5"/>
        <rect x="0" y="0" width="350" height="28" rx="10" fill="#1E293B"/>
        <rect x="10" y="6" width="100" height="18" rx="4" fill="#0284C7"/>
        <text x="20" y="19" font-size="10" font-weight="700" fill="#FFFFFF">📁 File Explorer</text>
        <rect x="120" y="6" width="80" height="18" rx="4" fill="#334155"/>
        <text x="130" y="19" font-size="10" font-weight="600" fill="#94A3B8">Games NVMe</text>

        <!-- Quick Access items -->
        <rect x="15" y="45" width="140" height="25" rx="4" fill="#1E293B"/>
        <text x="25" y="62" font-size="11" fill="#E2E8F0">🖥️ Desktop</text>
        <rect x="15" y="78" width="140" height="25" rx="4" fill="#1E293B"/>
        <text x="25" y="95" font-size="11" fill="#E2E8F0">⚡ DirectStorage Drive</text>
        <rect x="15" y="111" width="140" height="25" rx="4" fill="#1E293B"/>
        <text x="25" y="128" font-size="11" fill="#E2E8F0">☁️ OneDrive 1TB</text>

        <rect x="170" y="45" width="165" height="165" rx="8" fill="#13233D" stroke="#1E293B"/>
        <text x="180" y="70" font-size="12" font-weight="800" fill="#38BDF8">DirectStorage 1.2</text>
        <text x="180" y="90" font-size="10" fill="#94A3B8">GPU Asset Decompression</text>
        <text x="180" y="120" font-size="20" font-weight="900" fill="#10B981">14.2 GB/s</text>
        <text x="180" y="140" font-size="10" fill="#64748B">Load time: 0.8s (vs 6.2s)</text>
      </g>

      <!-- Window 2: Copilot AI Sidebar -->
      <g transform="translate(410, 55)">
        <rect x="0" y="0" width="350" height="230" rx="10" fill="#0F172A" stroke="#8B5CF6" stroke-width="1.5"/>
        <rect x="0" y="0" width="350" height="28" rx="10" fill="#1E293B"/>
        <text x="20" y="19" font-size="11" font-weight="800" fill="#C084FC">✨ Windows Copilot AI</text>
        
        <rect x="15" y="45" width="320" height="60" rx="8" fill="#1E1B4B" stroke="#4C1D95"/>
        <text x="25" y="68" font-size="11" font-weight="700" fill="#E9D5FF">System Optimization Prompt:</text>
        <text x="25" y="88" font-size="10" fill="#A78BFA">"Turn on Game Mode, HDR 1000 &amp; clean temporary cache"</text>

        <rect x="15" y="120" width="320" height="90" rx="8" fill="#1E293B"/>
        <text x="25" y="145" font-size="11" font-weight="700" fill="#38BDF8">Auto HDR &amp; Variable Refresh Rate</text>
        <text x="25" y="165" font-size="10" fill="#94A3B8">Upgrades SDR games automatically to high-dynamic range</text>
        <text x="25" y="190" font-size="11" font-weight="800" fill="#10B981">✓ Active on 240Hz OLED Display</text>
      </g>

      <!-- Centered Taskbar -->
      <g transform="translate(0, 305)">
        <rect x="0" y="0" width="800" height="45" rx="0" fill="#08101E" stroke="#1E293B" stroke-width="1"/>
        <!-- Centered Icons -->
        <g transform="translate(340, 8)">
          <!-- Start Button -->
          <rect x="0" y="0" width="28" height="28" rx="6" fill="#0078D4"/>
          <path d="M6 6 H12 V12 H6 Z M16 6 H22 V12 H16 Z M6 16 H12 V22 H6 Z M16 16 H22 V22 H16 Z" fill="#FFFFFF"/>
          <!-- Search -->
          <rect x="36" y="0" width="28" height="28" rx="6" fill="#1E293B"/>
          <text x="44" y="19" font-size="13" fill="#94A3B8">🔍</text>
          <!-- Task View -->
          <rect x="72" y="0" width="28" height="28" rx="6" fill="#1E293B"/>
          <text x="80" y="19" font-size="13" fill="#94A3B8">🗂️</text>
          <!-- Explorer -->
          <rect x="108" y="0" width="28" height="28" rx="6" fill="#F59E0B" fill-opacity="0.2"/>
          <text x="116" y="19" font-size="13" fill="#FBBF24">📁</text>
        </g>
      </g>
    </g>
  </svg>`,

  // 4. PS5
  'assets/images/ps5/ps5-hero-overview.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 580" width="1000" height="580" fill="none">
    <rect width="1000" height="580" fill="#020817"/>
    <circle cx="850" cy="120" r="300" fill="#0070D1" fill-opacity="0.1"/>
    <rect x="50" y="35" width="220" height="30" rx="15" fill="#0070D1" fill-opacity="0.15" stroke="#0070D1" stroke-width="1"/>
    <text x="70" y="55" font-family="-apple-system, BlinkMacSystemFont, Roboto, sans-serif" font-size="12" font-weight="700" fill="#0070D1" letter-spacing="1">SONY PLAYSTATION LAB REVIEW</text>
    <text x="50" y="105" font-family="-apple-system, BlinkMacSystemFont, Roboto, sans-serif" font-size="28" font-weight="900" fill="#FFFFFF">PS5 Slim Architecture &amp; DualSense Haptics</text>
    <text x="50" y="130" font-family="-apple-system, BlinkMacSystemFont, Roboto, sans-serif" font-size="14" fill="#94A3B8">Custom 5.5 GB/s PCIe 4.0 SSD • Tempest 3D AudioTech • DualSense Adaptive Triggers</text>

    <!-- PS5 Slim & DualSense Illustration -->
    <g transform="translate(100, 160)">
      <!-- PS5 Slim Chassis -->
      <g transform="translate(40, 10)">
        <!-- Outer White Curved Plates -->
        <path d="M30 0 C60 0 100 20 120 40 L120 310 C100 330 60 340 30 340 L10 320 L10 20 Z" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="2"/>
        <path d="M0 20 L0 320 L20 340 C-10 340 -30 330 -40 310 L-40 40 C-30 20 -10 0 0 0 Z" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="2"/>
        <!-- Inner Black Core -->
        <rect x="5" y="15" width="105" height="310" rx="6" fill="#090D16" stroke="#0070D1" stroke-width="1.5"/>
        <!-- Blue LED Accent strip -->
        <path d="M15 25 L15 315" stroke="#0070D1" stroke-width="3" stroke-linecap="round"/>
        <!-- Disc Drive Bump -->
        <path d="M110 180 C135 180 145 200 145 250 C145 290 135 310 110 310 Z" fill="#F8FAFC" stroke="#E2E8F0"/>
        <rect x="125" y="210" width="4" height="70" rx="2" fill="#090D16"/>
      </g>

      <!-- DualSense Controller Illustration -->
      <g transform="translate(260, 40)">
        <rect x="0" y="0" width="500" height="280" rx="20" fill="#0F172A" stroke="#1E293B" stroke-width="2"/>
        <text x="30" y="40" font-family="Roboto, sans-serif" font-size="16" font-weight="900" fill="#FFFFFF">DualSense Wireless Controller Anatomy</text>
        
        <!-- Feature 1: Adaptive Triggers -->
        <g transform="translate(30, 65)">
          <rect x="0" y="0" width="205" height="90" rx="8" fill="#1E293B" stroke="#0070D1"/>
          <text x="15" y="25" font-size="12" font-weight="800" fill="#38BDF8">ADAPTIVE TRIGGERS (L2/R2)</text>
          <text x="15" y="45" font-size="11" fill="#94A3B8">Dynamic gear motor feedback</text>
          <text x="15" y="65" font-size="11" font-weight="700" fill="#10B981">Simulates bow tension &amp; gun kick</text>
        </g>

        <!-- Feature 2: Haptic Actuators -->
        <g transform="translate(260, 65)">
          <rect x="0" y="0" width="205" height="90" rx="8" fill="#1E293B" stroke="#8B5CF6"/>
          <text x="15" y="25" font-size="12" font-weight="800" fill="#C084FC">DUAL HAPTIC ACTUATORS</text>
          <text x="15" y="45" font-size="11" fill="#94A3B8">Voice-coil precision vibration</text>
          <text x="15" y="65" font-size="11" font-weight="700" fill="#10B981">Rumble mirrors rain &amp; gravel</text>
        </g>

        <!-- Feature 3: Custom SSD Throughput -->
        <g transform="translate(30, 170)">
          <rect x="0" y="0" width="435" height="85" rx="8" fill="#1E293B" stroke="#334155"/>
          <text x="15" y="25" font-size="12" font-weight="800" fill="#F59E0B">CUSTOM 5.5 GB/s RAW (8-9 GB/s COMPRESSED) SSD</text>
          <text x="15" y="48" font-size="12" fill="#E2E8F0">Fast-travel loads in Spider-Man 2: <tspan font-weight="900" fill="#10B981">1.2 Seconds</tspan> (Zero loading screens)</text>
          <text x="15" y="70" font-size="11" fill="#94A3B8">M.2 NVMe SSD Expansion Slot supports up to 8TB PCIe 4.0 drives</text>
        </g>
      </g>
    </g>
  </svg>`,

  // 5. Oculus Quest 2
  'assets/images/quest2/quest-2-hero-overview.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 580" width="1000" height="580" fill="none">
    <rect width="1000" height="580" fill="#0A0E1A"/>
    <circle cx="850" cy="120" r="300" fill="#1877F2" fill-opacity="0.08"/>
    <rect x="50" y="35" width="240" height="30" rx="15" fill="#1877F2" fill-opacity="0.15" stroke="#1877F2" stroke-width="1"/>
    <text x="70" y="55" font-family="-apple-system, BlinkMacSystemFont, Roboto, sans-serif" font-size="12" font-weight="700" fill="#38BDF8" letter-spacing="1">VR HARDWARE TESTING LAB</text>
    <text x="50" y="105" font-family="-apple-system, BlinkMacSystemFont, Roboto, sans-serif" font-size="28" font-weight="900" fill="#FFFFFF">Oculus / Meta Quest 2 Standalone VR Review</text>
    <text x="50" y="130" font-family="-apple-system, BlinkMacSystemFont, Roboto, sans-serif" font-size="14" fill="#94A3B8">Qualcomm Snapdragon XR2 • 1832x1920 Per Eye @ 120Hz • Inside-Out 6DOF Tracking</text>

    <!-- Headset & Touch Controller Diagram -->
    <g transform="translate(100, 160)">
      <!-- Headset Illustration -->
      <g transform="translate(30, 20)">
        <rect x="0" y="0" width="300" height="180" rx="40" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/>
        <!-- Visor Front Curve -->
        <path d="M30 30 C100 20 200 20 270 30 C285 60 285 120 270 150 C200 160 100 160 30 150 C15 120 15 60 30 30 Z" fill="#E2E8F0"/>
        
        <!-- 4 Wide-Angle Tracking Cameras -->
        <circle cx="45" cy="45" r="8" fill="#0F172A" stroke="#64748B"/>
        <circle cx="255" cy="45" r="8" fill="#0F172A" stroke="#64748B"/>
        <circle cx="45" cy="135" r="8" fill="#0F172A" stroke="#64748B"/>
        <circle cx="255" cy="135" r="8" fill="#0F172A" stroke="#64748B"/>

        <!-- Soft Fabric Headstrap -->
        <path d="M0 80 C-40 80 -60 70 -80 60" stroke="#94A3B8" stroke-width="20" stroke-linecap="round"/>
        <path d="M300 80 C340 80 360 70 380 60" stroke="#94A3B8" stroke-width="20" stroke-linecap="round"/>
        
        <text x="150" y="100" font-family="Roboto, sans-serif" font-size="14" font-weight="900" fill="#0F172A" text-anchor="middle">Oculus Quest 2</text>
        <text x="150" y="118" font-family="Roboto, sans-serif" font-size="10" font-weight="600" fill="#64748B" text-anchor="middle">503g Ultra-Lightweight VR</text>
      </g>

      <!-- Key Specs Panel -->
      <g transform="translate(420, 10)">
        <rect x="0" y="0" width="440" height="310" rx="16" fill="#111827" stroke="#1E293B" stroke-width="1.5"/>
        <text x="25" y="35" font-family="Roboto, sans-serif" font-size="16" font-weight="900" fill="#FFFFFF">Optical &amp; Tracking Performance</text>

        <!-- Spec 1 -->
        <g transform="translate(25, 55)">
          <rect x="0" y="0" width="390" height="50" rx="8" fill="#1E293B" stroke="#334155"/>
          <text x="15" y="22" font-size="11" font-weight="700" fill="#38BDF8">FAST-SWITCH LCD DISPLAY</text>
          <text x="15" y="40" font-size="13" font-weight="900" fill="#FFFFFF">1832 x 1920 pixels per eye @ up to 120Hz</text>
        </g>

        <!-- Spec 2 -->
        <g transform="translate(25, 115)">
          <rect x="0" y="0" width="390" height="50" rx="8" fill="#1E293B" stroke="#334155"/>
          <text x="15" y="22" font-size="11" font-weight="700" fill="#10B981">6DOF INSIDE-OUT TRACKING</text>
          <text x="15" y="40" font-size="13" font-weight="900" fill="#FFFFFF">Oculus Insight • Zero external sensor base stations</text>
        </g>

        <!-- Spec 3 -->
        <g transform="translate(25, 175)">
          <rect x="0" y="0" width="390" height="50" rx="8" fill="#1E293B" stroke="#334155"/>
          <text x="15" y="22" font-size="11" font-weight="700" fill="#8B5CF6">PC VR CONNECTIVITY</text>
          <text x="15" y="40" font-size="13" font-weight="900" fill="#FFFFFF">Oculus Link (USB 3.0 Type-C) &amp; Air Link (Wi-Fi 6)</text>
        </g>

        <!-- Spec 4 -->
        <g transform="translate(25, 235)">
          <rect x="0" y="0" width="390" height="55" rx="8" fill="#1E293B" stroke="#334155"/>
          <text x="15" y="20" font-size="11" font-weight="700" fill="#F59E0B">BATTERY LIFE &amp; CHARGING</text>
          <text x="15" y="38" font-size="13" font-weight="900" fill="#FFFFFF">2.0 – 2.5 hours gameplay • 10W USB-C fast charge</text>
        </g>
      </g>
    </g>
  </svg>`
};

for (const [filePath, content] of Object.entries(diagramAssets)) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Created ${filePath}`);
}

console.log('All 5 review technical diagram assets generated.');
