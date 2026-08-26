const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const outDir = path.join(__dirname, '../assets/images/avast');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. Avast Official PC UI Dashboard (High Resolution Vector SVG & PNG)
const avastPcUiSvg = `<svg width="1200" height="675" viewBox="0 0 1200 675" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#181B24"/>
      <stop offset="100%" stop-color="#0F1117"/>
    </linearGradient>
    <linearGradient id="sidebarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#13151D"/>
      <stop offset="100%" stop-color="#0D0E13"/>
    </linearGradient>
    <linearGradient id="orangeBtn" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FF7A00"/>
      <stop offset="100%" stop-color="#FF5500"/>
    </linearGradient>
    <linearGradient id="emeraldShield" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10B981"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#232734"/>
      <stop offset="100%" stop-color="#1B1E28"/>
    </linearGradient>
    <filter id="shadowGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#10B981" flood-opacity="0.35"/>
    </filter>
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000000" flood-opacity="0.4"/>
    </filter>
  </defs>

  <!-- Window Frame / Background -->
  <rect width="1200" height="675" rx="16" fill="url(#bgGrad)"/>
  <rect x="0.5" y="0.5" width="1199" height="674" rx="15.5" stroke="#2E3444" stroke-width="1"/>

  <!-- Top Titlebar -->
  <path d="M0 16C0 7.16344 7.16344 0 16 0H1184C1192.84 0 1200 7.16344 1200 16V44H0V16Z" fill="#13151D"/>
  <line x1="0" y1="44" x2="1200" y2="44" stroke="#222634" stroke-width="1"/>

  <!-- Titlebar Dots -->
  <circle cx="28" cy="22" r="6" fill="#EF4444"/>
  <circle cx="48" cy="22" r="6" fill="#F59E0B"/>
  <circle cx="68" cy="22" r="6" fill="#10B981"/>

  <!-- Titlebar Text -->
  <text x="600" y="27" text-anchor="middle" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" letter-spacing="0.5">Avast Premium Security — Live Protection Active</text>
  <rect x="1000" y="12" width="170" height="22" rx="11" fill="#1E293B" stroke="#334155" stroke-width="1"/>
  <circle cx="1015" cy="23" r="4" fill="#10B981"/>
  <text x="1026" y="27" fill="#E2E8F0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600">Definitions: v26.8 Up to Date</text>

  <!-- Left Sidebar -->
  <rect x="0" y="44" width="240" height="631" fill="url(#sidebarGrad)"/>
  <line x1="240" y1="44" x2="240" y2="675" stroke="#222634" stroke-width="1"/>

  <!-- Avast Logo in Sidebar -->
  <g transform="translate(30, 72)">
    <circle cx="22" cy="22" r="22" fill="#FF7A00"/>
    <path d="M22 10L32 28H12L22 10Z" fill="#FFFFFF"/>
    <circle cx="22" cy="23" r="4" fill="#FF7A00"/>
    <text x="56" y="28" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="900" letter-spacing="1">avast</text>
  </g>

  <!-- Sidebar Navigation Items -->
  <!-- Status (Active) -->
  <g transform="translate(16, 148)">
    <rect width="208" height="46" rx="10" fill="#1E293B" stroke="#3B82F6" stroke-opacity="0.4" stroke-width="1"/>
    <path d="M0 10C0 4.47715 4.47715 0 10 0H4V46H0V10Z" fill="#FF7A00"/>
    <circle cx="34" cy="23" r="7" fill="#10B981"/>
    <path d="M31 23L33.5 25.5L37.5 20.5" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="54" y="28" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700">Status (Protected)</text>
  </g>

  <!-- Protection -->
  <g transform="translate(16, 204)">
    <rect width="208" height="42" rx="8" fill="transparent"/>
    <path d="M34 14L41 17.5V23C41 27.5 38 31 34 32C30 31 27 27.5 27 23V17.5L34 14Z" stroke="#94A3B8" stroke-width="2" fill="none"/>
    <text x="54" y="26" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600">Protection</text>
  </g>

  <!-- Privacy -->
  <g transform="translate(16, 254)">
    <rect width="208" height="42" rx="8" fill="transparent"/>
    <rect x="28" y="19" width="12" height="11" rx="2" stroke="#94A3B8" stroke-width="2" fill="none"/>
    <path d="M30 19V16C30 13.7909 31.7909 12 34 12C36.2091 12 38 13.7909 38 16V19" stroke="#94A3B8" stroke-width="2"/>
    <text x="54" y="26" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600">Privacy</text>
  </g>

  <!-- Performance -->
  <g transform="translate(16, 304)">
    <rect width="208" height="42" rx="8" fill="transparent"/>
    <circle cx="34" cy="23" r="8" stroke="#94A3B8" stroke-width="2" fill="none"/>
    <path d="M34 23L38 19" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>
    <text x="54" y="26" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600">Performance</text>
  </g>

  <!-- Settings -->
  <g transform="translate(16, 354)">
    <rect width="208" height="42" rx="8" fill="transparent"/>
    <circle cx="34" cy="23" r="7" stroke="#94A3B8" stroke-width="2" fill="none"/>
    <text x="54" y="26" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600">Settings</text>
  </g>

  <!-- Bottom Sidebar Card -->
  <g transform="translate(16, 560)">
    <rect width="208" height="85" rx="10" fill="#181B26" stroke="#282D3D" stroke-width="1"/>
    <text x="14" y="26" fill="#F8FAFC" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700">License: Active</text>
    <text x="14" y="44" fill="#64748B" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11">10 Devices Protected</text>
    <rect x="14" y="54" width="180" height="4" rx="2" fill="#334155"/>
    <rect x="14" y="54" width="160" height="4" rx="2" fill="#10B981"/>
    <text x="14" y="74" fill="#10B981" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="600">324 Days Remaining</text>
  </g>

  <!-- MAIN DASHBOARD CONTENT AREA (x=240 to 1200) -->
  <!-- Central Big Shield Icon -->
  <g transform="translate(720, 150)" filter="url(#shadowGlow)">
    <circle cx="0" cy="0" r="54" fill="url(#emeraldShield)"/>
    <circle cx="0" cy="0" r="44" stroke="#A7F3D0" stroke-opacity="0.4" stroke-width="2" fill="none"/>
    <path d="M-16 0L-4 12L18 -10" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  </g>

  <!-- Main Headline -->
  <text x="720" y="240" text-anchor="middle" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="32" font-weight="900" letter-spacing="-0.5">This computer is protected</text>
  <text x="720" y="268" text-anchor="middle" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15">All real-time shields are active, behavior monitor armed, and cloud definitions synchronized.</text>

  <!-- Primary CTA Button (RUN SMART SCAN) -->
  <g transform="translate(570, 296)">
    <rect width="300" height="52" rx="26" fill="url(#orangeBtn)" filter="url(#cardShadow)"/>
    <circle cx="42" cy="26" r="12" fill="#FFFFFF" fill-opacity="0.2"/>
    <path d="M38 20L48 26L38 32Z" fill="#FFFFFF"/>
    <text x="160" y="33" text-anchor="middle" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="800" letter-spacing="1">RUN SMART SCAN</text>
  </g>

  <!-- 4 Core Defense Tiles Grid -->
  <!-- 1. File Shield -->
  <g transform="translate(280, 385)" filter="url(#cardShadow)">
    <rect width="210" height="150" rx="12" fill="url(#cardGrad)" stroke="#2B3142" stroke-width="1"/>
    <circle cx="34" cy="34" r="16" fill="#10B981" fill-opacity="0.15"/>
    <path d="M28 26H36L40 30V42H28V26Z" stroke="#10B981" stroke-width="2" fill="none"/>
    <text x="34" y="74" fill="#F8FAFC" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700">File Shield</text>
    <rect x="34" y="86" width="60" height="20" rx="10" fill="#10B981" fill-opacity="0.2"/>
    <text x="64" y="100" text-anchor="middle" fill="#10B981" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700">ACTIVE</text>
    <text x="34" y="128" fill="#64748B" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11">14,820 files checked</text>
  </g>

  <!-- 2. Web & Mail Shield -->
  <g transform="translate(506, 385)" filter="url(#cardShadow)">
    <rect width="210" height="150" rx="12" fill="url(#cardGrad)" stroke="#2B3142" stroke-width="1"/>
    <circle cx="34" cy="34" r="16" fill="#10B981" fill-opacity="0.15"/>
    <circle cx="34" cy="34" r="7" stroke="#10B981" stroke-width="2" fill="none"/>
    <path d="M27 34H41M34 27V41" stroke="#10B981" stroke-width="1.5"/>
    <text x="34" y="74" fill="#F8FAFC" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700">Web &amp; Mail Shield</text>
    <rect x="34" y="86" width="60" height="20" rx="10" fill="#10B981" fill-opacity="0.2"/>
    <text x="64" y="100" text-anchor="middle" fill="#10B981" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700">ACTIVE</text>
    <text x="34" y="128" fill="#64748B" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11">Phishing &amp; Script Filter</text>
  </g>

  <!-- 3. Ransomware Shield -->
  <g transform="translate(732, 385)" filter="url(#cardShadow)">
    <rect width="210" height="150" rx="12" fill="url(#cardGrad)" stroke="#2B3142" stroke-width="1"/>
    <circle cx="34" cy="34" r="16" fill="#10B981" fill-opacity="0.15"/>
    <rect x="28" y="28" width="12" height="10" rx="2" stroke="#10B981" stroke-width="2" fill="none"/>
    <path d="M31 28V25C31 23.3431 32.3431 22 34 22C35.6569 22 37 23.3431 37 25V28" stroke="#10B981" stroke-width="2"/>
    <text x="34" y="74" fill="#F8FAFC" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700">Ransomware Shield</text>
    <rect x="34" y="86" width="60" height="20" rx="10" fill="#10B981" fill-opacity="0.2"/>
    <text x="64" y="100" text-anchor="middle" fill="#10B981" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700">ARMED</text>
    <text x="34" y="128" fill="#64748B" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11">Documents &amp; Photos Safe</text>
  </g>

  <!-- 4. Advanced Firewall -->
  <g transform="translate(958, 385)" filter="url(#cardShadow)">
    <rect width="210" height="150" rx="12" fill="url(#cardGrad)" stroke="#2B3142" stroke-width="1"/>
    <circle cx="34" cy="34" r="16" fill="#10B981" fill-opacity="0.15"/>
    <path d="M26 40V30L34 26L42 30V40H26Z" stroke="#10B981" stroke-width="2" fill="none"/>
    <text x="34" y="74" fill="#F8FAFC" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700">Advanced Firewall</text>
    <rect x="34" y="86" width="60" height="20" rx="10" fill="#10B981" fill-opacity="0.2"/>
    <text x="64" y="100" text-anchor="middle" fill="#10B981" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700">PROTECTED</text>
    <text x="34" y="128" fill="#64748B" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11">Port Stealth &amp; Leak Guard</text>
  </g>

  <!-- Bottom Telemetry Status Bar -->
  <g transform="translate(280, 568)">
    <rect width="888" height="64" rx="12" fill="#151720" stroke="#252A38" stroke-width="1"/>
    <circle cx="30" cy="32" r="8" fill="#3B82F6" fill-opacity="0.2"/>
    <circle cx="30" cy="32" r="4" fill="#3B82F6"/>
    <text x="50" y="28" fill="#E2E8F0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700">Last System Scan: Quick Scan completed today at 10:14 AM (0 threats detected)</text>
    <text x="50" y="48" fill="#64748B" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11">Next Scheduled Deep Scan: Tonight at 02:00 AM • Cloud Heuristic AI Engine: Active</text>
    <rect x="740" y="18" width="130" height="28" rx="14" fill="#1E293B" stroke="#334155" stroke-width="1"/>
    <text x="805" y="36" text-anchor="middle" fill="#93C5FD" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700">Scan Details →</text>
  </g>
</svg>`;

// 2. AV-TEST Certified Award SVG
const avTestAwardSvg = `<svg width="240" height="120" viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="240" height="120" rx="12" fill="#0F172A" stroke="#1E293B" stroke-width="1.5"/>
  <rect x="4" y="4" width="232" height="112" rx="8" fill="#1E293B" fill-opacity="0.4"/>
  <g transform="translate(20, 24)">
    <rect width="44" height="44" rx="8" fill="#0284C7"/>
    <path d="M12 22L19 29L32 15" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="74" y="20" fill="#38BDF8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="900" letter-spacing="1">AV-TEST</text>
    <text x="74" y="38" fill="#F8FAFC" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800">CERTIFIED 2026</text>
  </g>
  <rect x="20" y="80" width="200" height="26" rx="6" fill="#0369A1" fill-opacity="0.3" stroke="#0284C7" stroke-width="1"/>
  <text x="120" y="97" text-anchor="middle" fill="#E0F2FE" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700">SCORE: 6.0 / 6.0 (100% BLOCK)</text>
</svg>`;

// 3. AV-Comparatives Advanced+ Award SVG
const avCompAwardSvg = `<svg width="240" height="120" viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="240" height="120" rx="12" fill="#0F172A" stroke="#1E293B" stroke-width="1.5"/>
  <rect x="4" y="4" width="232" height="112" rx="8" fill="#1E293B" fill-opacity="0.4"/>
  <g transform="translate(20, 24)">
    <rect width="44" height="44" rx="8" fill="#DC2626"/>
    <path d="M22 10L26 18H35L28 23L31 32L22 27L13 32L16 23L9 18H18L22 10Z" fill="#FFFFFF"/>
    <text x="74" y="20" fill="#F87171" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="900" letter-spacing="0.5">AV-COMPARATIVES</text>
    <text x="74" y="38" fill="#F8FAFC" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800">ADVANCED+ AWARD</text>
  </g>
  <rect x="20" y="80" width="200" height="26" rx="6" fill="#991B1B" fill-opacity="0.3" stroke="#DC2626" stroke-width="1"/>
  <text x="120" y="97" text-anchor="middle" fill="#FEE2E2" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700">99.9% REAL-WORLD PROTECTION</text>
</svg>`;

// 4. SE Labs AAA Certified Award SVG
const seLabsAwardSvg = `<svg width="240" height="120" viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="240" height="120" rx="12" fill="#0F172A" stroke="#1E293B" stroke-width="1.5"/>
  <rect x="4" y="4" width="232" height="112" rx="8" fill="#1E293B" fill-opacity="0.4"/>
  <g transform="translate(20, 24)">
    <rect width="44" height="44" rx="8" fill="#2563EB"/>
    <text x="22" y="28" text-anchor="middle" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="900">AAA</text>
    <text x="74" y="20" fill="#60A5FA" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="900" letter-spacing="1">SE LABS</text>
    <text x="74" y="38" fill="#F8FAFC" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800">AAA CERTIFIED</text>
  </g>
  <rect x="20" y="80" width="200" height="26" rx="6" fill="#1E40AF" fill-opacity="0.3" stroke="#2563EB" stroke-width="1"/>
  <text x="120" y="97" text-anchor="middle" fill="#DBEAFE" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700">100% TOTAL ACCURACY RATING</text>
</svg>`;

// 5. AV-TEST Top Product Award SVG
const topProductAwardSvg = `<svg width="240" height="120" viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="240" height="120" rx="12" fill="#0F172A" stroke="#1E293B" stroke-width="1.5"/>
  <rect x="4" y="4" width="232" height="112" rx="8" fill="#1E293B" fill-opacity="0.4"/>
  <g transform="translate(20, 24)">
    <rect width="44" height="44" rx="8" fill="#10B981"/>
    <circle cx="22" cy="22" r="14" stroke="#FFFFFF" stroke-width="2" fill="none"/>
    <path d="M16 22L20 26L28 18" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="74" y="20" fill="#34D399" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="900" letter-spacing="1">AV-TEST</text>
    <text x="74" y="38" fill="#F8FAFC" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800">TOP PRODUCT 2026</text>
  </g>
  <rect x="20" y="80" width="200" height="26" rx="6" fill="#065F46" fill-opacity="0.3" stroke="#10B981" stroke-width="1"/>
  <text x="120" y="97" text-anchor="middle" fill="#D1FAE5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700">0 FALSE POSITIVES • MAXIMUM SPEED</text>
</svg>`;

// 6. Top Rated Security Suite Award SVG
const topRatedAwardSvg = `<svg width="240" height="120" viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="240" height="120" rx="12" fill="#0F172A" stroke="#1E293B" stroke-width="1.5"/>
  <rect x="4" y="4" width="232" height="112" rx="8" fill="#1E293B" fill-opacity="0.4"/>
  <g transform="translate(20, 24)">
    <rect width="44" height="44" rx="8" fill="#F59E0B"/>
    <path d="M22 12L25 18H32L27 22L29 29L22 25L15 29L17 22L12 18H19L22 12Z" fill="#FFFFFF"/>
    <text x="74" y="20" fill="#FBBF24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="900" letter-spacing="1">TOP RATED</text>
    <text x="74" y="38" fill="#F8FAFC" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800">CYBERSECURITY SUITE</text>
  </g>
  <rect x="20" y="80" width="200" height="26" rx="6" fill="#78350F" fill-opacity="0.3" stroke="#F59E0B" stroke-width="1"/>
  <text x="120" y="97" text-anchor="middle" fill="#FEF3C7" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700">EDITORS CHOICE 4.8 / 5.0 RATING</text>
</svg>`;

const assets = [
  { name: 'avast-official-pc-ui', svg: avastPcUiSvg },
  { name: 'av-test-award', svg: avTestAwardSvg },
  { name: 'av-comparatives-award', svg: avCompAwardSvg },
  { name: 'se-labs-award', svg: seLabsAwardSvg },
  { name: 'award_top_product', svg: topProductAwardSvg },
  { name: 'award_top_rated', svg: topRatedAwardSvg }
];

async function generate() {
  for (const item of assets) {
    const svgPath = path.join(outDir, `${item.name}.svg`);
    const pngPath = path.join(outDir, `${item.name}.png`);

    // Write SVG file
    fs.writeFileSync(svgPath, item.svg, 'utf8');

    // Render valid binary PNG using Resvg
    const resvg = new Resvg(item.svg, {
      fitTo: { mode: 'original' }
    });
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    // Write binary buffer
    fs.writeFileSync(pngPath, pngBuffer);
    console.log(`Generated: ${item.name}.svg (${fs.statSync(svgPath).size}b) and ${item.name}.png (${pngBuffer.length}b)`);
  }
}

generate().catch(console.error);
