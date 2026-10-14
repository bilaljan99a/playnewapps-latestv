const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'assets', 'images', 'products', 'amazon');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 50 product definitions with custom SVG visual themes
const productsMeta = [
  {
    id: 'amazon-b0chwrxh8b',
    brand: 'APPLE',
    name: 'AirPods Pro 2',
    sub: 'Active Noise Cancellation • USB-C',
    type: 'earbuds',
    accent: '#0284c7',
    icon: 'headphones'
  },
  {
    id: 'amazon-b0chx545tc',
    brand: 'APPLE',
    name: 'Apple Watch Series 9',
    sub: 'GPS 41mm • Always-On Retina',
    type: 'watch',
    accent: '#ef4444',
    icon: 'watch'
  },
  {
    id: 'amazon-b0bjlxmvmv',
    brand: 'APPLE',
    name: 'iPad 10th Generation',
    sub: '10.9" Liquid Retina • A14 Bionic',
    type: 'tablet',
    accent: '#3b82f6',
    icon: 'tablet'
  },
  {
    id: 'amazon-b09xs7jwhh',
    brand: 'SONY',
    name: 'Sony WH-1000XM5',
    sub: 'Industry Leading Noise Canceling',
    type: 'headphones',
    accent: '#1e293b',
    icon: 'headphones'
  },
  {
    id: 'amazon-b0ccz26b5v',
    brand: 'BOSE',
    name: 'QuietComfort Ultra',
    sub: 'Immersive Spatial Audio • ANC',
    type: 'headphones',
    accent: '#475569',
    icon: 'headphones'
  },
  {
    id: 'amazon-b0c33xxs56',
    brand: 'SONY',
    name: 'Sony WF-1000XM5',
    sub: 'Truly Wireless Earbuds • Hi-Res',
    type: 'earbuds',
    accent: '#0f172a',
    icon: 'earbuds'
  },
  {
    id: 'amazon-b09tmn58kl',
    brand: 'AMAZON',
    name: 'Kindle Paperwhite',
    sub: '6.8" 300 PPI Warm Light E-Reader',
    type: 'ereader',
    accent: '#0284c7',
    icon: 'book'
  },
  {
    id: 'amazon-b0bshf7whw',
    brand: 'AMAZON',
    name: 'Echo Show 8 (3rd Gen)',
    sub: 'HD Smart Display • Spatial Audio',
    type: 'display',
    accent: '#0ea5e9',
    icon: 'tv'
  },
  {
    id: 'amazon-b0bp9mdcqz',
    brand: 'AMAZON',
    name: 'Fire TV Stick 4K Max',
    sub: 'Wi-Fi 6E • Dolby Vision HDR',
    type: 'streaming',
    accent: '#f97316',
    icon: 'tv'
  },
  {
    id: 'amazon-b09hm94vds',
    brand: 'LOGITECH',
    name: 'MX Master 3S',
    sub: '8K DPI Track-on-Glass Quiet Mouse',
    type: 'mouse',
    accent: '#64748b',
    icon: 'mouse'
  },
  {
    id: 'amazon-b09lk2qvg2',
    brand: 'LOGITECH',
    name: 'MX Mechanical Keyboard',
    sub: 'Low-Profile Tactile Quiet Switches',
    type: 'keyboard',
    accent: '#475569',
    icon: 'keyboard'
  },
  {
    id: 'amazon-b0b8qf9b4f',
    brand: 'STEELSERIES',
    name: 'Arctis Nova 7 Wireless',
    sub: 'Almighty Audio 360° Spatial Sound',
    type: 'gaming_headset',
    accent: '#f97316',
    icon: 'headphones'
  },
  {
    id: 'amazon-b0b6y7l81g',
    brand: 'RAZER',
    name: 'DeathAdder V3 Pro',
    sub: '63g Ultra-Lightweight 30K Sensor',
    type: 'mouse',
    accent: '#22c55e',
    icon: 'mouse'
  },
  {
    id: 'amazon-b0c77k1z4z',
    brand: 'ASUS ROG',
    name: 'ROG Ally Handheld',
    sub: 'AMD Z1 Extreme • 120Hz 1080p',
    type: 'console',
    accent: '#e11d48',
    icon: 'sports_esports'
  },
  {
    id: 'amazon-b09vlk9w3s',
    brand: 'SAMSUNG',
    name: 'T7 Shield 2TB SSD',
    sub: '1,050 MB/s • Rugged IP65 NVMe',
    type: 'storage',
    accent: '#2563eb',
    icon: 'storage'
  },
  {
    id: 'amazon-b08gtyfc37',
    brand: 'SANDISK',
    name: '1TB Extreme Portable SSD',
    sub: '1,050 MB/s • IP55 Drop Resistant',
    type: 'storage',
    accent: '#dc2626',
    icon: 'storage'
  },
  {
    id: 'amazon-b09vphvt2z',
    brand: 'ANKER',
    name: 'Anker 737 Power Bank',
    sub: '24,000mAh • 140W Smart Display',
    type: 'power',
    accent: '#0284c7',
    icon: 'battery_charging_full'
  },
  {
    id: 'amazon-b0c7gh6fvd',
    brand: 'ANKER',
    name: 'Prime 6-in-1 Charging Station',
    sub: '140W USB-C GaN Desktop Power',
    type: 'power',
    accent: '#0369a1',
    icon: 'power'
  },
  {
    id: 'amazon-b0cdx1gqg3',
    brand: 'DJI',
    name: 'DJI Mini 4 Pro Drone',
    sub: '4K HDR • Omnidirectional Sensing',
    type: 'drone',
    accent: '#475569',
    icon: 'flight'
  },
  {
    id: 'amazon-b0cgn9374c',
    brand: 'GOPRO',
    name: 'HERO12 Black Action Cam',
    sub: '5.3K60 Ultra HD • HyperSmooth 6.0',
    type: 'camera',
    accent: '#0284c7',
    icon: 'videocam'
  },
  {
    id: 'amazon-b0b8xhq9v1',
    brand: 'INSTA360',
    name: 'Insta360 X3 Camera',
    sub: '5.7K 360° Video • 48MP Sensors',
    type: 'camera',
    accent: '#f59e0b',
    icon: 'videocam'
  },
  {
    id: 'amazon-b09738cv2g',
    brand: 'ELGATO',
    name: 'Stream Deck MK.2',
    sub: '15 Customizable LCD Macro Keys',
    type: 'streaming',
    accent: '#2563eb',
    icon: 'grid_view'
  },
  {
    id: 'amazon-b08g7rg9ml',
    brand: 'SHURE',
    name: 'Shure MV7 USB Microphone',
    sub: 'Dynamic Podcast & Studio Recording',
    type: 'microphone',
    accent: '#0f172a',
    icon: 'mic'
  },
  {
    id: 'amazon-b00hvlur86',
    brand: 'AUDIO-TECHNICA',
    name: 'ATH-M50x Studio Monitors',
    sub: '45mm Drivers • Pro Sound Isolation',
    type: 'headphones',
    accent: '#1e293b',
    icon: 'headphones'
  },
  {
    id: 'amazon-b09xxwkvj1',
    brand: 'MARSHALL',
    name: 'Emberton II Speaker',
    sub: 'True Stereophonic 360° • 30h Playtime',
    type: 'speaker',
    accent: '#b45309',
    icon: 'volume_up'
  },
  {
    id: 'amazon-b09g3c799c',
    brand: 'JBL',
    name: 'JBL Flip 6 Waterproof',
    sub: 'Portable Bluetooth Speaker • Deep Bass',
    type: 'speaker',
    accent: '#ea580c',
    icon: 'volume_up'
  },
  {
    id: 'amazon-b09nbk2gfw',
    brand: 'BELKIN',
    name: 'MagSafe 3-in-1 Fast Charger',
    sub: '15W Official Wireless Stand for Apple',
    type: 'power',
    accent: '#64748b',
    icon: 'bolt'
  },
  {
    id: 'amazon-b09wzql3f6',
    brand: 'RING',
    name: 'Battery Doorbell Plus',
    sub: 'Head-to-Toe HD+ Video & Motion Alerts',
    type: 'smart_home',
    accent: '#0284c7',
    icon: 'videocam'
  },
  {
    id: 'amazon-b0b1n5kks2',
    brand: 'BLINK',
    name: 'Blink Outdoor 4',
    sub: 'Wire-Free Weatherproof Security Camera',
    type: 'smart_home',
    accent: '#0369a1',
    icon: 'security'
  },
  {
    id: 'amazon-b09vw5kg2b',
    brand: 'TP-LINK',
    name: 'Deco XE75 Mesh System',
    sub: 'Tri-Band WiFi 6E • Up to 7200 Sq.Ft',
    type: 'networking',
    accent: '#0284c7',
    icon: 'wifi'
  },
  {
    id: 'amazon-b07g115x4h',
    brand: 'PHILIPS HUE',
    name: 'Smart Color LED Bulbs',
    sub: 'Starter Kit • 16 Million Colors + Bridge',
    type: 'lighting',
    accent: '#8b5cf6',
    icon: 'lightbulb'
  },
  {
    id: 'amazon-b0c28x5y3l',
    brand: 'DYSON',
    name: 'Dyson V8 Cordless Vacuum',
    sub: 'De-tangling Motorbar • Fade-Free Power',
    type: 'home',
    accent: '#e11d48',
    icon: 'cleaning_services'
  },
  {
    id: 'amazon-b0by9l4p4r',
    brand: 'ROBOROCK',
    name: 'Q Revo Robot Vacuum & Mop',
    sub: 'Auto-Drying Dock • 5,500Pa Extreme',
    type: 'home',
    accent: '#2563eb',
    icon: 'smart_toy'
  },
  {
    id: 'amazon-b07fdjmc9q',
    brand: 'NINJA',
    name: 'Ninja AF101 Air Fryer',
    sub: '4-Quart Capacity • 75% Less Fat Crisping',
    type: 'kitchen',
    accent: '#475569',
    icon: 'restaurant'
  },
  {
    id: 'amazon-b08wclj7jg',
    brand: 'INSTANT POT',
    name: 'Duo Plus 9-in-1 Cooker',
    sub: '6 Quart Multi-Cooker & Pressure Cooker',
    type: 'kitchen',
    accent: '#dc2626',
    icon: 'microwave'
  },
  {
    id: 'amazon-b00xboxvia',
    brand: 'BREVILLE',
    name: 'Smart Oven Pro Convection',
    sub: 'Element iQ Quartz System • 10 Functions',
    type: 'kitchen',
    accent: '#64748b',
    icon: 'kitchen'
  },
  {
    id: 'amazon-b01n6tvx1q',
    brand: 'NESPRESSO',
    name: 'VertuoPlus Coffee Maker',
    sub: 'Centrifusion 7,000 RPM Rich Crema',
    type: 'kitchen',
    accent: '#78350f',
    icon: 'coffee'
  },
  {
    id: 'amazon-b07x5bc21w',
    brand: 'EMBER',
    name: 'Temperature Smart Mug 2',
    sub: '14 oz App-Controlled Heated Mug',
    type: 'kitchen',
    accent: '#1e293b',
    icon: 'coffee'
  },
  {
    id: 'amazon-b0cfw5c68q',
    brand: 'OURA',
    name: 'Oura Ring Gen3 Horizon',
    sub: 'Titanium Biometric Sleep & Heart Ring',
    type: 'wearable',
    accent: '#0f172a',
    icon: 'fingerprint'
  },
  {
    id: 'amazon-b0cdp3c6nl',
    brand: 'FITBIT',
    name: 'Fitbit Charge 6 Tracker',
    sub: 'Built-in GPS • 40+ Exercise Modes',
    type: 'wearable',
    accent: '#0d9488',
    icon: 'watch'
  },
  {
    id: 'amazon-b083l4694n',
    brand: 'THERABODY',
    name: 'Theragun Prime Massager',
    sub: 'Deep Tissue Percussive Therapy Gun',
    type: 'wellness',
    accent: '#0f172a',
    icon: 'fitness_center'
  },
  {
    id: 'amazon-b0bt5f9n8y',
    brand: 'GARMIN',
    name: 'Forerunner 265 AMOLED',
    sub: 'GPS Running Smartwatch • SatIQ Tech',
    type: 'watch',
    accent: '#2563eb',
    icon: 'watch'
  },
  {
    id: 'amazon-b0cx246b5j',
    brand: 'STANLEY',
    name: 'Quencher H2.0 FlowState',
    sub: '40 oz Insulated Stainless Tumbler',
    type: 'drinkware',
    accent: '#059669',
    icon: 'local_drink'
  },
  {
    id: 'amazon-b083g7b74v',
    brand: 'HYDRO FLASK',
    name: 'Wide Mouth Straw Lid 32 oz',
    sub: 'TempShield Double-Wall Vacuum Bottle',
    type: 'drinkware',
    accent: '#0284c7',
    icon: 'local_drink'
  },
  {
    id: 'amazon-b003w3w94c',
    brand: 'YETI',
    name: 'YETI Tundra 45 Hard Cooler',
    sub: 'Rotomolded Heavy-Duty Outdoor Ice Chest',
    type: 'outdoor',
    accent: '#0369a1',
    icon: 'ac_unit'
  },
  {
    id: 'amazon-b07ztq7n2n',
    brand: 'PEAK DESIGN',
    name: 'Everyday Backpack 20L V2',
    sub: 'Weatherproof Camera & Laptop Commute Bag',
    type: 'gear',
    accent: '#1e293b',
    icon: 'backpack'
  },
  {
    id: 'amazon-b09995fxw7',
    brand: 'TILE',
    name: 'Tile Pro (2022) 4-Pack',
    sub: '400 ft Bluetooth Key & Luggage Finder',
    type: 'tech',
    accent: '#2563eb',
    icon: 'gps_fixed'
  },
  {
    id: 'amazon-b09ncsx8nl',
    brand: 'CORSAIR',
    name: 'K70 RGB PRO Mechanical',
    sub: 'CHERRY MX Red • 8,000Hz Hyper-Polling',
    type: 'keyboard',
    accent: '#eab308',
    icon: 'keyboard'
  },
  {
    id: 'amazon-b0cbqvhqj8',
    brand: 'HYPERX',
    name: 'Cloud III Wireless Headset',
    sub: '120-Hour Battery • 53mm Angled Drivers',
    type: 'gaming_headset',
    accent: '#dc2626',
    icon: 'headphones'
  },
  {
    id: 'amazon-b08wt889v3',
    brand: 'BENQ',
    name: 'ScreenBar Halo Light Bar',
    sub: 'Wireless Controller • Zero Screen Glare',
    type: 'desk',
    accent: '#f59e0b',
    icon: 'wb_incandescent'
  }
];

function getVisualArtwork(type, accent) {
  switch (type) {
    case 'headphones':
    case 'gaming_headset':
      return `
        <!-- Headphones Vector Art -->
        <g transform="translate(130, 45)">
          <defs>
            <linearGradient id="headband-${accent.replace('#','')}" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#334155" />
              <stop offset="50%" stop-color="#64748b" />
              <stop offset="100%" stop-color="#334155" />
            </linearGradient>
            <linearGradient id="cup-${accent.replace('#','')}" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#1e293b" />
              <stop offset="100%" stop-color="#0f172a" />
            </linearGradient>
          </defs>
          <!-- Headband Arc -->
          <path d="M 15 90 C 15 15, 125 15, 125 90" fill="none" stroke="url(#headband-${accent.replace('#','')})" stroke-width="12" stroke-linecap="round"/>
          <path d="M 25 80 C 25 30, 115 30, 115 80" fill="none" stroke="#1e293b" stroke-width="6" stroke-linecap="round"/>
          <!-- Left Ear Cup -->
          <g transform="translate(0, 75)">
            <rect x="0" y="0" width="30" height="55" rx="15" fill="url(#cup-${accent.replace('#','')})" stroke="${accent}" stroke-width="2"/>
            <rect x="5" y="8" width="10" height="39" rx="5" fill="#334155"/>
            <circle cx="15" cy="27" r="4" fill="${accent}"/>
          </g>
          <!-- Right Ear Cup -->
          <g transform="translate(110, 75)">
            <rect x="0" y="0" width="30" height="55" rx="15" fill="url(#cup-${accent.replace('#','')})" stroke="${accent}" stroke-width="2"/>
            <rect x="15" y="8" width="10" height="39" rx="5" fill="#334155"/>
            <circle cx="15" cy="27" r="4" fill="${accent}"/>
          </g>
        </g>
      `;

    case 'earbuds':
      return `
        <!-- Wireless Earbuds Case & Buds Vector Art -->
        <g transform="translate(130, 45)">
          <!-- Charging Case -->
          <rect x="25" y="50" width="90" height="70" rx="28" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.06))"/>
          <line x1="25" y1="75" x2="115" y2="75" stroke="#e2e8f0" stroke-width="1.5"/>
          <circle cx="70" cy="90" r="3" fill="#10b981"/>
          <!-- Left Earbud -->
          <g transform="translate(10, 15)">
            <ellipse cx="25" cy="30" rx="14" ry="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
            <rect x="21" y="32" width="7" height="32" rx="3.5" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
            <circle cx="25" cy="28" r="4" fill="#64748b"/>
          </g>
          <!-- Right Earbud -->
          <g transform="translate(85, 15)">
            <ellipse cx="25" cy="30" rx="14" ry="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
            <rect x="21" y="32" width="7" height="32" rx="3.5" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
            <circle cx="25" cy="28" r="4" fill="#64748b"/>
          </g>
        </g>
      `;

    case 'watch':
      return `
        <!-- Smartwatch Vector Art -->
        <g transform="translate(145, 35)">
          <!-- Strap Top & Bottom -->
          <rect x="35" y="0" width="40" height="40" rx="6" fill="#334155"/>
          <rect x="35" y="115" width="40" height="40" rx="6" fill="#334155"/>
          <!-- Watch Case -->
          <rect x="15" y="25" width="80" height="105" rx="22" fill="#0f172a" stroke="#475569" stroke-width="3" filter="drop-shadow(0 6px 12px rgba(0,0,0,0.15))"/>
          <!-- Watch Screen OLED -->
          <rect x="23" y="33" width="64" height="89" rx="15" fill="#020617"/>
          <!-- Digital Crown -->
          <rect x="96" y="48" width="6" height="18" rx="3" fill="#94a3b8"/>
          <!-- Side Button -->
          <rect x="96" y="74" width="4" height="24" rx="2" fill="#64748b"/>
          <!-- Display UI -->
          <text x="55" y="65" font-family="-apple-system, system-ui, sans-serif" font-size="16" font-weight="700" fill="#ffffff" text-anchor="middle">10:09</text>
          <circle cx="55" cy="88" r="16" fill="none" stroke="#10b981" stroke-width="3" stroke-dasharray="75 25"/>
          <circle cx="55" cy="88" r="11" fill="none" stroke="#f43f5e" stroke-width="3" stroke-dasharray="50 50"/>
        </g>
      `;

    case 'tablet':
    case 'ereader':
      return `
        <!-- Tablet / E-Reader Vector Art -->
        <g transform="translate(125, 30)">
          <!-- Device Chassis -->
          <rect x="0" y="0" width="150" height="170" rx="14" fill="#f8fafc" stroke="#94a3b8" stroke-width="2.5" filter="drop-shadow(0 6px 10px rgba(0,0,0,0.08))"/>
          <!-- Display Screen -->
          <rect x="10" y="10" width="130" height="150" rx="6" fill="#0f172a"/>
          <!-- Screen Content / Glow -->
          <rect x="18" y="18" width="114" height="134" rx="4" fill="none" stroke="${accent}" stroke-width="1.5" stroke-opacity="0.4"/>
          <!-- Home Indicator -->
          <line x1="55" y1="152" x2="95" y2="152" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
          <!-- Content Mockup lines -->
          <line x1="28" y1="40" x2="85" y2="40" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
          <line x1="28" y1="55" x2="115" y2="55" stroke="#64748b" stroke-width="2" stroke-linecap="round"/>
          <line x1="28" y1="65" x2="105" y2="65" stroke="#64748b" stroke-width="2" stroke-linecap="round"/>
          <line x1="28" y1="75" x2="90" y2="75" stroke="#64748b" stroke-width="2" stroke-linecap="round"/>
        </g>
      `;

    case 'keyboard':
      return `
        <!-- Mechanical Keyboard Vector Art -->
        <g transform="translate(80, 50)">
          <!-- Base Plate -->
          <rect x="0" y="0" width="240" height="110" rx="12" fill="#1e293b" stroke="#475569" stroke-width="2" filter="drop-shadow(0 6px 12px rgba(0,0,0,0.12))"/>
          <!-- Key Rows -->
          ${Array.from({length: 4}).map((_, r) => `
            <g transform="translate(12, ${14 + r * 22})">
              ${Array.from({length: 10}).map((_, c) => `
                <rect x="${c * 21.5}" y="0" width="18" height="16" rx="3.5" fill="#0f172a" stroke="${c === 3 && r === 2 ? accent : '#334155'}" stroke-width="1.5"/>
              `).join('')}
            </g>
          `).join('')}
        </g>
      `;

    case 'mouse':
      return `
        <!-- Ergonomic Mouse Vector Art -->
        <g transform="translate(145, 35)">
          <!-- Mouse Silhouette -->
          <path d="M 55 5 C 25 5, 10 35, 10 95 C 10 135, 30 155, 55 155 C 80 155, 100 135, 100 95 C 100 35, 85 5, 55 5 Z" fill="#1e293b" stroke="#475569" stroke-width="2" filter="drop-shadow(0 6px 12px rgba(0,0,0,0.15))"/>
          <!-- Left/Right Click Division -->
          <line x1="55" y1="5" x2="55" y2="55" stroke="#475569" stroke-width="1.5"/>
          <!-- Scroll Wheel -->
          <rect x="50" y="25" width="10" height="24" rx="4" fill="#0f172a" stroke="${accent}" stroke-width="2"/>
          <!-- Ergonomic Thumb Rest -->
          <path d="M 12 75 C 0 90, 0 120, 15 130" fill="none" stroke="#475569" stroke-width="3" stroke-linecap="round"/>
        </g>
      `;

    case 'console':
      return `
        <!-- Handheld Console Vector Art -->
        <g transform="translate(85, 50)">
          <!-- Handheld Body -->
          <rect x="0" y="0" width="230" height="110" rx="18" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.1))"/>
          <!-- Display Screen -->
          <rect x="45" y="12" width="140" height="86" rx="6" fill="#0f172a" stroke="#1e293b" stroke-width="2"/>
          <rect x="52" y="18" width="126" height="74" rx="4" fill="#020617"/>
          <circle cx="115" cy="55" r="14" fill="none" stroke="${accent}" stroke-width="3"/>
          <!-- D-Pad Left -->
          <rect x="18" y="32" width="16" height="6" rx="2" fill="#475569"/>
          <rect x="23" y="27" width="6" height="16" rx="2" fill="#475569"/>
          <circle cx="26" cy="68" r="9" fill="#0f172a" stroke="#cbd5e1" stroke-width="2"/>
          <!-- Buttons Right -->
          <circle cx="205" cy="38" r="9" fill="#0f172a" stroke="#cbd5e1" stroke-width="2"/>
          <circle cx="198" cy="65" r="3.5" fill="#ef4444"/>
          <circle cx="212" cy="65" r="3.5" fill="#3b82f6"/>
        </g>
      `;

    case 'storage':
      return `
        <!-- Rugged Portable SSD Vector Art -->
        <g transform="translate(130, 45)">
          <rect x="0" y="0" width="140" height="100" rx="14" fill="#1e293b" stroke="#334155" stroke-width="2" filter="drop-shadow(0 8px 14px rgba(0,0,0,0.15))"/>
          <!-- Rubber Bumper Ribs -->
          <rect x="12" y="0" width="116" height="100" rx="8" fill="#0f172a"/>
          ${[20, 36, 52, 68, 84].map(x => `<rect x="${x}" y="8" width="6" height="84" rx="3" fill="#1e293b"/>`).join('')}
          <!-- Carabiner Loop -->
          <circle cx="118" cy="22" r="7" fill="none" stroke="${accent}" stroke-width="3"/>
          <!-- Brand Badge -->
          <rect x="25" y="42" width="65" height="16" rx="3" fill="#0284c7" fill-opacity="0.2"/>
          <text x="57" y="54" font-family="system-ui, sans-serif" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">USB 3.2 NVMe</text>
        </g>
      `;

    case 'power':
      return `
        <!-- Power Bank / GaN Charger Vector Art -->
        <g transform="translate(135, 35)">
          <!-- Charger Body -->
          <rect x="0" y="0" width="130" height="130" rx="16" fill="#0f172a" stroke="#334155" stroke-width="2" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.15))"/>
          <!-- Digital Display Screen -->
          <rect x="18" y="18" width="94" height="42" rx="8" fill="#020617" stroke="#1e293b" stroke-width="1.5"/>
          <text x="65" y="44" font-family="monospace" font-size="20" font-weight="800" fill="${accent}" text-anchor="middle">140W</text>
          <!-- USB-C Ports -->
          <rect x="25" y="76" width="22" height="7" rx="3.5" fill="#334155" stroke="#64748b"/>
          <rect x="54" y="76" width="22" height="7" rx="3.5" fill="#334155" stroke="#64748b"/>
          <rect x="83" y="76" width="22" height="7" rx="3.5" fill="#334155" stroke="#64748b"/>
          <!-- USB-A Port -->
          <rect x="38" y="98" width="54" height="12" rx="3" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
        </g>
      `;

    case 'camera':
      return `
        <!-- Action Camera Vector Art -->
        <g transform="translate(125, 45)">
          <rect x="0" y="0" width="150" height="105" rx="16" fill="#1e293b" stroke="#334155" stroke-width="2.5" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.15))"/>
          <!-- Front Lens Element -->
          <circle cx="48" cy="52" r="32" fill="#0f172a" stroke="#475569" stroke-width="3"/>
          <circle cx="48" cy="52" r="22" fill="#020617"/>
          <circle cx="48" cy="52" r="14" fill="none" stroke="${accent}" stroke-width="2.5"/>
          <circle cx="44" cy="46" r="4" fill="#ffffff" fill-opacity="0.8"/>
          <!-- Front Color Status Screen -->
          <rect x="92" y="28" width="45" height="48" rx="6" fill="#020617" stroke="#334155"/>
          <text x="114" y="56" font-family="sans-serif" font-size="12" font-weight="800" fill="${accent}" text-anchor="middle">5.3K</text>
        </g>
      `;

    case 'microphone':
      return `
        <!-- Studio Podcast Microphone Vector Art -->
        <g transform="translate(150, 25)">
          <!-- Mic Capsule -->
          <rect x="15" y="10" width="70" height="110" rx="35" fill="#0f172a" stroke="#334155" stroke-width="2.5" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.15))"/>
          <!-- Mesh Grille Pattern -->
          <path d="M 15 45 L 85 45 M 15 55 L 85 55 M 15 65 L 85 65" stroke="#334155" stroke-width="1.5"/>
          <!-- Desktop Mount Yoke -->
          <path d="M 0 50 C 0 115, 100 115, 100 50" fill="none" stroke="#64748b" stroke-width="4" stroke-linecap="round"/>
          <line x1="50" y1="108" x2="50" y2="150" stroke="#475569" stroke-width="6"/>
          <ellipse cx="50" cy="150" rx="35" ry="8" fill="#1e293b"/>
        </g>
      `;

    case 'speaker':
      return `
        <!-- Portable Wireless Speaker Vector Art -->
        <g transform="translate(110, 45)">
          <!-- Speaker Enclosure -->
          <rect x="0" y="0" width="180" height="100" rx="18" fill="#1e293b" stroke="#334155" stroke-width="2.5" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.15))"/>
          <!-- Mesh Grille -->
          <rect x="10" y="10" width="160" height="80" rx="10" fill="#0f172a" stroke="${accent}" stroke-width="1.5" stroke-dasharray="4 3"/>
          <text x="90" y="56" font-family="serif" font-size="18" font-weight="900" font-style="italic" fill="#cbd5e1" text-anchor="middle" letter-spacing="2">SOUND</text>
        </g>
      `;

    case 'drone':
      return `
        <!-- Quadcopter Drone Vector Art -->
        <g transform="translate(110, 30)">
          <!-- Arms -->
          <line x1="20" y1="20" x2="160" y2="120" stroke="#475569" stroke-width="6" stroke-linecap="round"/>
          <line x1="160" y1="20" x2="20" y2="120" stroke="#475569" stroke-width="6" stroke-linecap="round"/>
          <!-- Rotors -->
          <circle cx="20" cy="20" r="16" fill="none" stroke="${accent}" stroke-width="2.5" stroke-dasharray="6 3"/>
          <circle cx="160" cy="20" r="16" fill="none" stroke="${accent}" stroke-width="2.5" stroke-dasharray="6 3"/>
          <circle cx="20" cy="120" r="16" fill="none" stroke="${accent}" stroke-width="2.5" stroke-dasharray="6 3"/>
          <circle cx="160" cy="120" r="16" fill="none" stroke="${accent}" stroke-width="2.5" stroke-dasharray="6 3"/>
          <!-- Drone Fuselage -->
          <ellipse cx="90" cy="70" rx="35" ry="24" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" filter="drop-shadow(0 6px 12px rgba(0,0,0,0.1))"/>
          <!-- 4K Camera Gimbal -->
          <circle cx="90" cy="70" r="10" fill="#0f172a"/>
          <circle cx="90" cy="70" r="5" fill="${accent}"/>
        </g>
      `;

    case 'kitchen':
      return `
        <!-- Kitchen Appliance / Smart Cooker Vector Art -->
        <g transform="translate(130, 35)">
          <rect x="0" y="10" width="140" height="130" rx="20" fill="#1e293b" stroke="#475569" stroke-width="2.5" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.15))"/>
          <!-- Handle & Lid -->
          <path d="M 20 10 C 20 0, 120 0, 120 10 Z" fill="#475569"/>
          <!-- Digital LED Display Panel -->
          <rect x="30" y="35" width="80" height="35" rx="8" fill="#020617" stroke="#334155" stroke-width="1.5"/>
          <text x="70" y="58" font-family="monospace" font-size="16" font-weight="700" fill="#22c55e" text-anchor="middle">385°F</text>
          <!-- Rotary Dial / Buttons -->
          <circle cx="70" cy="100" r="18" fill="#0f172a" stroke="${accent}" stroke-width="3"/>
          <line x1="70" y1="85" x2="70" y2="92" stroke="#ffffff" stroke-width="2"/>
        </g>
      `;

    case 'drinkware':
      return `
        <!-- Insulated Tumbler / Water Bottle Vector Art -->
        <g transform="translate(145, 25)">
          <!-- Straw -->
          <line x1="70" y1="0" x2="65" y2="40" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
          <!-- Tumbler Lid -->
          <rect x="18" y="32" width="74" height="14" rx="4" fill="#334155"/>
          <!-- Tumbler Body -->
          <path d="M 20 46 L 26 145 C 26 155, 84 155, 84 145 L 90 46 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" filter="drop-shadow(0 8px 14px rgba(0,0,0,0.1))"/>
          <!-- Handle -->
          <path d="M 88 55 C 110 55, 110 115, 86 115" fill="none" stroke="${accent}" stroke-width="6" stroke-linecap="round"/>
          <!-- Accent Band -->
          <path d="M 23 85 L 87 85" stroke="${accent}" stroke-width="3"/>
          <text x="55" y="110" font-family="sans-serif" font-size="10" font-weight="800" fill="#64748b" text-anchor="middle">40 oz</text>
        </g>
      `;

    default:
      return `
        <!-- Universal Premium Tech Product Vector Art -->
        <g transform="translate(130, 40)">
          <rect x="0" y="0" width="140" height="110" rx="16" fill="#1e293b" stroke="#475569" stroke-width="2" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.12))"/>
          <circle cx="70" cy="55" r="28" fill="none" stroke="${accent}" stroke-width="3" stroke-dasharray="8 4"/>
          <circle cx="70" cy="55" r="16" fill="${accent}" fill-opacity="0.2"/>
          <circle cx="70" cy="55" r="8" fill="${accent}"/>
        </g>
      `;
  }
}

function generateSvg(p) {
  const artwork = getVisualArtwork(p.type, p.accent);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#f1f5f9"/>
    </linearGradient>
    <radialGradient id="spotlight" cx="50%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#f1f5f9" stop-opacity="0"/>
    </radialGradient>
    <filter id="card-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.06"/>
    </filter>
  </defs>

  <!-- Canvas Surface -->
  <rect width="400" height="300" rx="16" fill="url(#bg-grad)"/>
  <rect width="400" height="300" rx="16" fill="url(#spotlight)"/>
  <rect x="1" y="1" width="398" height="298" rx="15" fill="none" stroke="#e2e8f0" stroke-width="1"/>

  <!-- Top Metadata Header -->
  <g transform="translate(24, 28)">
    <!-- Brand Pill -->
    <rect x="0" y="0" width="85" height="22" rx="11" fill="#0f172a"/>
    <text x="42.5" y="15" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle" letter-spacing="1">${p.brand}</text>
  </g>

  <!-- Amazon Verified Badge Top Right -->
  <g transform="translate(315, 24)">
    <circle cx="16" cy="16" r="14" fill="#ff9900" fill-opacity="0.15"/>
    <circle cx="16" cy="16" r="10" fill="#ff9900"/>
    <path d="M 12 16 L 15 19 L 21 13" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </g>

  <!-- Center Artwork -->
  ${artwork}

  <!-- Bottom Details Bar -->
  <g transform="translate(24, 238)">
    <rect x="0" y="0" width="352" height="42" rx="10" fill="#ffffff" stroke="#e2e8f0" stroke-width="1" filter="url(#card-shadow)"/>
    <!-- Title -->
    <text x="14" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800" fill="#0f172a">${p.name}</text>
    <!-- Subtitle -->
    <text x="14" y="34" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="500" fill="#64748b">${p.sub}</text>
    <!-- Accent Dot -->
    <circle cx="334" cy="21" r="5" fill="${p.accent}"/>
  </g>
</svg>`;
}

console.log('Generating 50 high-definition Amazon product SVG assets...');
let count = 0;
for (const p of productsMeta) {
  const filePath = path.join(OUTPUT_DIR, `${p.id}.svg`);
  const svgContent = generateSvg(p);
  fs.writeFileSync(filePath, svgContent, 'utf-8');
  count++;
}

console.log(`Successfully generated ${count} SVG product assets in assets/images/products/amazon/!`);
