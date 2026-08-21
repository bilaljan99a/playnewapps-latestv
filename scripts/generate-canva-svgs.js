const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'assets/images/canva');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// Helper to write SVG file
function writeSvg(filename, svgContent) {
  const filePath = path.join(dir, filename);
  fs.writeFileSync(filePath, svgContent.trim(), 'utf8');
  console.log(`Created ${filePath} (${fs.statSync(filePath).size} bytes)`);
}

// 1. Canva Hero Overview SVG
const heroSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720" style="background:#0e131f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <defs>
    <linearGradient id="canvaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00C4CC"/>
      <stop offset="50%" stop-color="#5E30EB"/>
      <stop offset="100%" stop-color="#7D2AE8"/>
    </linearGradient>
    <linearGradient id="magicGlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#8B5CF6"/>
      <stop offset="50%" stop-color="#EC4899"/>
      <stop offset="100%" stop-color="#3B82F6"/>
    </linearGradient>
    <linearGradient id="accentOrange" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF6B6B"/>
      <stop offset="100%" stop-color="#FF8E53"/>
    </linearGradient>
    <filter id="dropShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.4"/>
    </filter>
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Top App Navigation Bar -->
  <rect x="0" y="0" width="1280" height="56" fill="#181d2c" stroke="#2a3249" stroke-width="1"/>
  
  <!-- Canva Logo Wordmark / Badge -->
  <g transform="translate(20, 10)">
    <rect width="90" height="36" rx="8" fill="url(#canvaGradient)"/>
    <text x="45" y="24" font-size="18" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="-0.5">Canva</text>
  </g>

  <!-- Top Nav Menu Items -->
  <g transform="translate(130, 20)" font-size="13" font-weight="600" fill="#a0aec0">
    <text x="0" y="14" fill="#ffffff">File</text>
    <text x="45" y="14">Resize &amp; Magic Switch</text>
    <text x="210" y="14">View settings</text>
  </g>

  <!-- Design Title in Header -->
  <g transform="translate(420, 12)">
    <rect width="360" height="32" rx="6" fill="#101522" stroke="#2d3748" stroke-width="1"/>
    <text x="16" y="21" font-size="13" fill="#e2e8f0" font-weight="500">✨ Q3 Marketing Campaign - Master Deck &amp; Social Kit</text>
    <text x="320" y="20" font-size="11" fill="#48bb78" font-weight="700">SAVED</text>
  </g>

  <!-- Top Right Actions & User Avatar -->
  <g transform="translate(1010, 10)">
    <rect x="0" y="0" width="120" height="36" rx="18" fill="url(#canvaGradient)" filter="url(#softGlow)"/>
    <text x="60" y="23" font-size="13" font-weight="700" fill="#ffffff" text-anchor="middle">👑 Try Canva Pro</text>
    
    <rect x="135" y="0" width="115" height="36" rx="18" fill="#ffffff"/>
    <text x="192" y="23" font-size="13" font-weight="700" fill="#181d2c" text-anchor="middle">↗ Share</text>
  </g>

  <!-- Left Sidebar Tool Dock (Canva Icon Navigation) -->
  <rect x="0" y="56" width="76" height="664" fill="#131826" stroke="#252d42" stroke-width="1"/>
  
  <g transform="translate(0, 66)" text-anchor="middle" font-size="10" font-weight="600">
    <!-- Active Tool: Design -->
    <g transform="translate(38, 10)">
      <rect x="-30" y="-6" width="60" height="52" rx="8" fill="#252f48"/>
      <circle cx="0" cy="12" r="10" fill="url(#canvaGradient)"/>
      <text x="0" y="38" fill="#ffffff">Design</text>
    </g>
    
    <!-- Elements -->
    <g transform="translate(38, 75)">
      <circle cx="0" cy="10" r="10" fill="#2d3748"/>
      <rect x="-4" y="6" width="8" height="8" fill="#00C4CC"/>
      <text x="0" y="36" fill="#a0aec0">Elements</text>
    </g>

    <!-- Text -->
    <g transform="translate(38, 135)">
      <circle cx="0" cy="10" r="10" fill="#2d3748"/>
      <text x="0" y="14" font-size="13" font-weight="900" fill="#e2e8f0">T</text>
      <text x="0" y="36" fill="#a0aec0">Text</text>
    </g>

    <!-- Brand -->
    <g transform="translate(38, 195)">
      <circle cx="0" cy="10" r="10" fill="#2d3748"/>
      <polygon points="0,3 7,16 -7,16" fill="#9f7aea"/>
      <text x="0" y="36" fill="#a0aec0">Brand</text>
    </g>

    <!-- Uploads -->
    <g transform="translate(38, 255)">
      <circle cx="0" cy="10" r="10" fill="#2d3748"/>
      <path d="M0,5 L-4,11 L-1,11 L-1,16 L1,16 L1,11 L4,11 Z" fill="#48bb78"/>
      <text x="0" y="36" fill="#a0aec0">Uploads</text>
    </g>

    <!-- Magic Studio -->
    <g transform="translate(38, 315)">
      <rect x="-28" y="-4" width="56" height="48" rx="8" fill="rgba(147, 51, 234, 0.25)" stroke="#7D2AE8" stroke-width="1"/>
      <circle cx="0" cy="10" r="9" fill="url(#magicGlow)"/>
      <text x="0" y="34" fill="#d8b4fe">Magic</text>
    </g>

    <!-- Projects -->
    <g transform="translate(38, 375)">
      <circle cx="0" cy="10" r="10" fill="#2d3748"/>
      <rect x="-5" y="6" width="10" height="8" rx="1" fill="#e2e8f0"/>
      <text x="0" y="36" fill="#a0aec0">Projects</text>
    </g>

    <!-- Apps -->
    <g transform="translate(38, 435)">
      <circle cx="0" cy="10" r="10" fill="#2d3748"/>
      <circle cx="-3" cy="7" r="2" fill="#cbd5e0"/>
      <circle cx="3" cy="7" r="2" fill="#cbd5e0"/>
      <circle cx="-3" cy="13" r="2" fill="#cbd5e0"/>
      <circle cx="3" cy="13" r="2" fill="#cbd5e0"/>
      <text x="0" y="36" fill="#a0aec0">Apps</text>
    </g>
  </g>

  <!-- Left Side Secondary Panel (Templates & Layouts) -->
  <rect x="76" y="56" width="280" height="664" fill="#181d2c" stroke="#252d42" stroke-width="1"/>
  
  <g transform="translate(92, 72)">
    <text x="0" y="16" font-size="16" font-weight="700" fill="#ffffff">Design &amp; Templates</text>
    
    <!-- Search Box -->
    <rect x="0" y="28" width="248" height="36" rx="6" fill="#101522" stroke="#2d3748" stroke-width="1"/>
    <text x="12" y="51" font-size="12" fill="#718096">🔍 Search 100M+ templates...</text>

    <!-- Category Pills -->
    <g transform="translate(0, 74)" font-size="11" font-weight="600">
      <rect x="0" y="0" width="60" height="24" rx="12" fill="#2d3748"/>
      <text x="30" y="16" fill="#ffffff" text-anchor="middle">All</text>
      <rect x="68" y="0" width="80" height="24" rx="12" fill="#252d42"/>
      <text x="108" y="16" fill="#a0aec0" text-anchor="middle">Marketing</text>
      <rect x="156" y="0" width="90" height="24" rx="12" fill="#252d42"/>
      <text x="201" y="16" fill="#a0aec0" text-anchor="middle">Presentations</text>
    </g>

    <!-- Template Previews (Cards) -->
    <g transform="translate(0, 110)">
      <!-- Card 1 -->
      <rect x="0" y="0" width="118" height="150" rx="8" fill="#232a3d" stroke="#374151" stroke-width="1"/>
      <rect x="8" y="8" width="102" height="70" rx="4" fill="url(#canvaGradient)"/>
      <text x="12" y="96" font-size="10" font-weight="700" fill="#ffffff">Tech Pitch Deck</text>
      <text x="12" y="112" font-size="9" fill="#94a3b8">16:9 • 15 Slides</text>
      <rect x="12" y="124" width="40" height="16" rx="4" fill="#00C4CC"/>
      <text x="32" y="136" font-size="8" font-weight="800" fill="#0f172a" text-anchor="middle">PRO</text>

      <!-- Card 2 -->
      <rect x="130" y="0" width="118" height="150" rx="8" fill="#232a3d" stroke="#374151" stroke-width="1"/>
      <rect x="138" y="8" width="102" height="70" rx="4" fill="url(#accentOrange)"/>
      <text x="142" y="96" font-size="10" font-weight="700" fill="#ffffff">Social Promo</text>
      <text x="142" y="112" font-size="9" fill="#94a3b8">1080x1080 Square</text>
      <rect x="142" y="124" width="40" height="16" rx="4" fill="#48bb78"/>
      <text x="162" y="136" font-size="8" font-weight="800" fill="#ffffff" text-anchor="middle">FREE</text>

      <!-- Card 3 -->
      <rect x="0" y="165" width="118" height="150" rx="8" fill="#232a3d" stroke="#374151" stroke-width="1"/>
      <rect x="8" y="173" width="102" height="70" rx="4" fill="#1e293b"/>
      <circle cx="59" cy="208" r="20" fill="url(#magicGlow)"/>
      <text x="12" y="261" font-size="10" font-weight="700" fill="#ffffff">AI Video Reel</text>
      <text x="12" y="277" font-size="9" fill="#94a3b8">9:16 Reel • 30s</text>
      <rect x="12" y="289" width="40" height="16" rx="4" fill="#00C4CC"/>
      <text x="32" y="301" font-size="8" font-weight="800" fill="#0f172a" text-anchor="middle">PRO</text>

      <!-- Card 4 -->
      <rect x="130" y="165" width="118" height="150" rx="8" fill="#232a3d" stroke="#374151" stroke-width="1"/>
      <rect x="138" y="173" width="102" height="70" rx="4" fill="#312e81"/>
      <text x="142" y="261" font-size="10" font-weight="700" fill="#ffffff">Infographic PDF</text>
      <text x="142" y="277" font-size="9" fill="#94a3b8">A4 Document</text>
      <rect x="142" y="289" width="40" height="16" rx="4" fill="#48bb78"/>
      <text x="162" y="301" font-size="8" font-weight="800" fill="#ffffff" text-anchor="middle">FREE</text>
    </g>
  </g>

  <!-- Top Contextual Canvas Toolbar -->
  <rect x="356" y="56" width="924" height="42" fill="#1c2333" stroke="#252d42" stroke-width="1"/>
  
  <g transform="translate(372, 65)" font-size="12" font-weight="600" fill="#cbd5e0">
    <!-- Font Selector -->
    <rect x="0" y="0" width="140" height="24" rx="4" fill="#101522" stroke="#374151" stroke-width="1"/>
    <text x="10" y="16" fill="#ffffff">Canva Sans</text>
    <text x="122" y="16" fill="#718096">▾</text>

    <!-- Font Size -->
    <rect x="148" y="0" width="50" height="24" rx="4" fill="#101522" stroke="#374151" stroke-width="1"/>
    <text x="173" y="16" fill="#ffffff" text-anchor="middle">36 pt</text>

    <!-- Color, Bold, Italic, Alignment -->
    <rect x="206" y="0" width="24" height="24" rx="4" fill="url(#canvaGradient)"/>
    <text x="238" y="16" font-weight="900" fill="#ffffff">B</text>
    <text x="254" y="16" font-style="italic" fill="#ffffff">I</text>
    <text x="270" y="16" fill="#a0aec0">U</text>
    
    <!-- Position & Transparency -->
    <rect x="300" y="0" width="80" height="24" rx="4" fill="#2d3748"/>
    <text x="340" y="16" fill="#ffffff" text-anchor="middle">Position</text>

    <rect x="388" y="0" width="96" height="24" rx="4" fill="#2d3748"/>
    <text x="436" y="16" fill="#ffffff" text-anchor="middle">Animate ✨</text>

    <rect x="492" y="0" width="120" height="24" rx="4" fill="url(#magicGlow)"/>
    <text x="552" y="16" fill="#ffffff" font-weight="700" text-anchor="middle">✨ Magic Edit</text>
  </g>

  <!-- Center Active Canvas Area (Gray Workbench Background) -->
  <rect x="356" y="98" width="924" height="622" fill="#0b0e17"/>

  <!-- Canvas Artboard (Centered White Slide Canvas) -->
  <g transform="translate(460, 130)" filter="url(#dropShadow)">
    <rect width="720" height="405" rx="8" fill="#ffffff"/>
    
    <!-- Background Design Graphic inside Canvas -->
    <rect x="0" y="0" width="720" height="405" rx="8" fill="#0f172a"/>
    <circle cx="600" cy="100" r="180" fill="url(#canvaGradient)" opacity="0.4"/>
    <circle cx="100" cy="350" r="140" fill="#3b82f6" opacity="0.25"/>

    <!-- Canvas Inner Elements -->
    <g transform="translate(50, 60)">
      <!-- Badge -->
      <rect width="140" height="28" rx="14" fill="rgba(0, 196, 204, 0.2)" stroke="#00C4CC" stroke-width="1"/>
      <text x="70" y="18" font-size="11" font-weight="700" fill="#00C4CC" text-anchor="middle">GROWTH STRATEGY</text>

      <!-- Headline -->
      <text x="0" y="70" font-size="34" font-weight="900" fill="#ffffff">Scale Your Brand In 2026</text>
      <text x="0" y="110" font-size="16" fill="#94a3b8">Autonomous AI design workflows, real-time collaboration, and multi-channel publishing.</text>

      <!-- Metric Grid Cards -->
      <g transform="translate(0, 140)">
        <rect x="0" y="0" width="180" height="85" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
        <text x="20" y="35" font-size="24" font-weight="900" fill="#00C4CC">+340%</text>
        <text x="20" y="60" font-size="12" fill="#94a3b8">Creative Output Speed</text>

        <rect x="200" y="0" width="180" height="85" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
        <text x="220" y="35" font-size="24" font-weight="900" fill="#a855f7">100M+</text>
        <text x="220" y="60" font-size="12" fill="#94a3b8">Royalty-Free Assets</text>

        <rect x="400" y="0" width="180" height="85" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
        <text x="420" y="35" font-size="24" font-weight="900" fill="#22c55e">0.0s</text>
        <text x="420" y="60" font-size="12" fill="#94a3b8">Zero Installation Latency</text>
      </g>
    </g>

    <!-- Canvas Selection Handles (Bounding Box) -->
    <rect x="42" y="110" width="480" height="60" fill="none" stroke="#00C4CC" stroke-width="1.5" stroke-dasharray="4,4"/>
    <circle cx="42" cy="110" r="4" fill="#ffffff" stroke="#00C4CC" stroke-width="1.5"/>
    <circle cx="522" cy="110" r="4" fill="#ffffff" stroke="#00C4CC" stroke-width="1.5"/>
    <circle cx="42" cy="170" r="4" fill="#ffffff" stroke="#00C4CC" stroke-width="1.5"/>
    <circle cx="522" cy="170" r="4" fill="#ffffff" stroke="#00C4CC" stroke-width="1.5"/>
  </g>

  <!-- Bottom Canvas Status & Zoom Bar -->
  <rect x="356" y="678" width="924" height="42" fill="#181d2c" stroke="#252d42" stroke-width="1"/>
  
  <g transform="translate(380, 692)" font-size="12" font-weight="600" fill="#a0aec0">
    <text x="0" y="14">Page 1 of 12</text>
    <text x="100" y="14">Notes (2)</text>
    <text x="180" y="14">Duration: 5.0s</text>
  </g>

  <g transform="translate(1080, 690)" font-size="12" font-weight="600" fill="#a0aec0">
    <text x="0" y="16">−  100%  +</text>
    <rect x="80" y="0" width="80" height="24" rx="4" fill="#2d3748"/>
    <text x="120" y="16" fill="#ffffff" text-anchor="middle">Grid View</text>
  </g>
</svg>`;

writeSvg('canva-hero-overview.svg', heroSvg);

// 2. Canva Magic Studio AI SVG
const magicStudioSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720" style="background:#090d16;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <defs>
    <linearGradient id="magicBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e1b4b"/>
      <stop offset="50%" stop-color="#3b0764"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="purplePink" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#8b5cf6"/>
      <stop offset="50%" stop-color="#d946ef"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
    <linearGradient id="glowG" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00C4CC"/>
      <stop offset="100%" stop-color="#7D2AE8"/>
    </linearGradient>
  </defs>

  <!-- Background Layer with Deep AI Aesthetic -->
  <rect width="1280" height="720" fill="url(#magicBg)"/>
  
  <!-- Header Bar -->
  <rect x="0" y="0" width="1280" height="70" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
  <g transform="translate(30, 20)">
    <rect width="40" height="32" rx="8" fill="url(#purplePink)"/>
    <text x="20" y="22" font-size="18" font-weight="900" fill="#ffffff" text-anchor="middle">✨</text>
    <text x="52" y="22" font-size="20" font-weight="800" fill="#ffffff">Canva Magic Studio™</text>
    <text x="280" y="22" font-size="14" fill="#94a3b8">| Autonomous Generative AI Suite for High-Velocity Teams</text>
  </g>
  
  <g transform="translate(1080, 18)">
    <rect width="170" height="34" rx="17" fill="url(#purplePink)"/>
    <text x="85" y="22" font-size="13" font-weight="800" fill="#ffffff" text-anchor="middle">500 Monthly AI Credits</text>
  </g>

  <!-- Prompt Input Command Center Bar (Top Center) -->
  <g transform="translate(160, 95)">
    <rect width="960" height="60" rx="30" fill="#1e293b" stroke="url(#purplePink)" stroke-width="2"/>
    <text x="30" y="36" font-size="16" fill="#e2e8f0">✨ Prompt: "Create a modern 3D product launch poster with glowing neon elements and studio lighting"</text>
    <rect x="830" y="10" width="115" height="40" rx="20" fill="url(#glowG)"/>
    <text x="887" y="35" font-size="14" font-weight="800" fill="#ffffff" text-anchor="middle">Generate ✨</text>
  </g>

  <!-- 4 Core AI Pillars Grid -->
  <g transform="translate(50, 180)">
    
    <!-- Pillar 1: Magic Media -->
    <g transform="translate(0, 0)">
      <rect width="275" height="490" rx="14" fill="#131b2e" stroke="#334155" stroke-width="1.5"/>
      <rect x="0" y="0" width="275" height="6" rx="3" fill="#8b5cf6"/>
      <g transform="translate(20, 25)">
        <circle cx="18" cy="18" r="18" fill="rgba(139, 92, 246, 0.2)"/>
        <text x="18" y="24" font-size="16" text-anchor="middle">🎨</text>
        <text x="46" y="22" font-size="16" font-weight="800" fill="#ffffff">Magic Media</text>
        <text x="0" y="55" font-size="12" fill="#94a3b8">Text-to-Image &amp; 4K Text-to-Video</text>
        
        <!-- Preview Box -->
        <rect x="0" y="70" width="235" height="230" rx="10" fill="#0b0f19" stroke="#1e293b" stroke-width="1"/>
        <circle cx="117" cy="170" r="70" fill="url(#glowG)" opacity="0.6"/>
        <rect x="25" y="130" width="185" height="120" rx="8" fill="#1e293b" opacity="0.9"/>
        <text x="117" y="195" font-size="12" font-weight="700" fill="#38bdf8" text-anchor="middle">Generated in 2.8s</text>
        
        <!-- Features List -->
        <g transform="translate(0, 320)" font-size="11" fill="#cbd5e1">
          <text x="0" y="16">✓ Photorealistic 3D Renders</text>
          <text x="0" y="36">✓ Anime, Watercolor, Cyberpunk</text>
          <text x="0" y="56">✓ Runway Gen-2 Video Engine</text>
          <text x="0" y="76">✓ Aspect Ratio Conversion</text>
        </g>
      </g>
    </g>

    <!-- Pillar 2: Magic Switch -->
    <g transform="translate(300, 0)">
      <rect width="275" height="490" rx="14" fill="#131b2e" stroke="#334155" stroke-width="1.5"/>
      <rect x="0" y="0" width="275" height="6" rx="3" fill="#06b6d4"/>
      <g transform="translate(20, 25)">
        <circle cx="18" cy="18" r="18" fill="rgba(6, 182, 212, 0.2)"/>
        <text x="18" y="24" font-size="16" text-anchor="middle">🔄</text>
        <text x="46" y="22" font-size="16" font-weight="800" fill="#ffffff">Magic Switch</text>
        <text x="0" y="55" font-size="12" fill="#94a3b8">Instant Document &amp; Language Morph</text>
        
        <!-- Preview Box -->
        <rect x="0" y="70" width="235" height="230" rx="10" fill="#0b0f19" stroke="#1e293b" stroke-width="1"/>
        <g transform="translate(20, 95)" font-size="11" font-weight="700">
          <rect x="0" y="0" width="195" height="34" rx="6" fill="#1e293b"/>
          <text x="12" y="22" fill="#38bdf8">📊 15-Slide Presentation</text>
          <text x="97" y="52" font-size="16" fill="#94a3b8" text-anchor="middle">↓ (1-Click Convert)</text>
          <rect x="0" y="65" width="195" height="34" rx="6" fill="#1e293b"/>
          <text x="12" y="87" fill="#4ade80">📄 Executive Summary Doc</text>
          <rect x="0" y="110" width="195" height="34" rx="6" fill="#1e293b"/>
          <text x="12" y="132" fill="#f472b6">🌐 100+ Global Languages</text>
        </g>

        <!-- Features List -->
        <g transform="translate(0, 320)" font-size="11" fill="#cbd5e1">
          <text x="0" y="16">✓ Deck to Blog / Email Outline</text>
          <text x="0" y="36">✓ Multi-Channel Auto Reformat</text>
          <text x="0" y="56">✓ Layout-Preserving Translation</text>
          <text x="0" y="76">✓ Smart Content Summarizer</text>
        </g>
      </g>
    </g>

    <!-- Pillar 3: Magic Grab & Edit -->
    <g transform="translate(600, 0)">
      <rect width="275" height="490" rx="14" fill="#131b2e" stroke="#334155" stroke-width="1.5"/>
      <rect x="0" y="0" width="275" height="6" rx="3" fill="#ec4899"/>
      <g transform="translate(20, 25)">
        <circle cx="18" cy="18" r="18" fill="rgba(236, 72, 153, 0.2)"/>
        <text x="18" y="24" font-size="16" text-anchor="middle">✂️</text>
        <text x="46" y="22" font-size="16" font-weight="800" fill="#ffffff">Magic Grab &amp; Edit</text>
        <text x="0" y="55" font-size="12" fill="#94a3b8">Layer Separation &amp; Generative Fill</text>
        
        <!-- Preview Box -->
        <rect x="0" y="70" width="235" height="230" rx="10" fill="#0b0f19" stroke="#1e293b" stroke-width="1"/>
        <g transform="translate(15, 85)">
          <rect x="0" y="0" width="95" height="105" rx="6" fill="#1e293b"/>
          <text x="47" y="55" font-size="10" fill="#94a3b8" text-anchor="middle">Original Photo</text>
          <text x="105" y="55" font-size="14" fill="#ec4899">→</text>
          <rect x="115" y="0" width="95" height="105" rx="6" fill="#1e293b" stroke="#ec4899" stroke-width="1"/>
          <text x="162" y="50" font-size="10" font-weight="700" fill="#ec4899" text-anchor="middle">Object Extracted</text>
          <text x="162" y="70" font-size="9" fill="#94a3b8" text-anchor="middle">As Movable Layer</text>
        </g>
        <rect x="15" y="210" width="205" height="30" rx="6" fill="rgba(236, 72, 153, 0.15)"/>
        <text x="117" y="230" font-size="10" font-weight="700" fill="#f472b6" text-anchor="middle">Magic Expand Outpainting Active</text>

        <!-- Features List -->
        <g transform="translate(0, 320)" font-size="11" fill="#cbd5e1">
          <text x="0" y="16">✓ Extract Subjects from Flat JPGs</text>
          <text x="0" y="36">✓ Brush to Replace Objects</text>
          <text x="0" y="56">✓ Magic Expand Canvas Edges</text>
          <text x="0" y="76">✓ 1-Click Background Removal</text>
        </g>
      </g>
    </g>

    <!-- Pillar 4: Magic Write -->
    <g transform="translate(900, 0)">
      <rect width="275" height="490" rx="14" fill="#131b2e" stroke="#334155" stroke-width="1.5"/>
      <rect x="0" y="0" width="275" height="6" rx="3" fill="#22c55e"/>
      <g transform="translate(20, 25)">
        <circle cx="18" cy="18" r="18" fill="rgba(34, 197, 94, 0.2)"/>
        <text x="18" y="24" font-size="16" text-anchor="middle">✍️</text>
        <text x="46" y="22" font-size="16" font-weight="800" fill="#ffffff">Magic Write</text>
        <text x="0" y="55" font-size="12" fill="#94a3b8">On-Canvas Copilot &amp; Brand Voice</text>
        
        <!-- Preview Box -->
        <rect x="0" y="70" width="235" height="230" rx="10" fill="#0b0f19" stroke="#1e293b" stroke-width="1"/>
        <g transform="translate(15, 85)" font-size="11">
          <rect x="0" y="0" width="205" height="42" rx="6" fill="#1e293b"/>
          <text x="10" y="18" fill="#a0aec0">Prompt:</text>
          <text x="10" y="32" font-weight="700" fill="#4ade80">"Make headline punchier"</text>
          <rect x="0" y="52" width="205" height="80" rx="6" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" stroke-width="1"/>
          <text x="10" y="72" font-size="10" font-weight="700" fill="#ffffff">Result (Aligned to Brand):</text>
          <text x="10" y="90" font-size="12" font-weight="800" fill="#4ade80">"Design Faster. Scale Higher."</text>
          <text x="10" y="112" font-size="9" fill="#94a3b8">Confidence: 99.4% • Tone: Bold</text>
        </g>

        <!-- Features List -->
        <g transform="translate(0, 320)" font-size="11" fill="#cbd5e1">
          <text x="0" y="16">✓ Copywriting Across All Formats</text>
          <text x="0" y="36">✓ Tone Adjustment &amp; Summaries</text>
          <text x="0" y="56">✓ Brand Voice Consistency</text>
          <text x="0" y="76">✓ Real-Time Grammar Polishing</text>
        </g>
      </g>
    </g>

  </g>
</svg>`;

writeSvg('canva-magic-studio.svg', magicStudioSvg);

// 3. Canva Templates & Asset Ecosystem SVG
const templatesSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720" style="background:#0f172a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <defs>
    <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00C4CC"/>
      <stop offset="100%" stop-color="#7D2AE8"/>
    </linearGradient>
    <linearGradient id="cardG1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ec4899"/>
      <stop offset="100%" stop-color="#8b5cf6"/>
    </linearGradient>
    <linearGradient id="cardG2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
    <linearGradient id="cardG3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#ea580c"/>
    </linearGradient>
    <linearGradient id="cardG4" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
  </defs>

  <!-- Top Title Header -->
  <rect width="1280" height="80" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <g transform="translate(40, 24)">
    <rect width="36" height="36" rx="8" fill="url(#headerGrad)"/>
    <text x="18" y="24" font-size="18" font-weight="900" fill="#ffffff" text-anchor="middle">📑</text>
    <text x="50" y="25" font-size="22" font-weight="800" fill="#ffffff">Canva 100M+ Asset &amp; Template Hub</text>
    <text x="440" y="25" font-size="14" fill="#94a3b8">| Curated Commercial Graphic Architecture</text>
  </g>

  <!-- Category Selection Ribbon -->
  <g transform="translate(40, 100)" font-size="13" font-weight="700">
    <rect x="0" y="0" width="130" height="38" rx="19" fill="url(#headerGrad)"/>
    <text x="65" y="24" fill="#ffffff" text-anchor="middle">🔥 All Formats</text>

    <rect x="145" y="0" width="150" height="38" rx="19" fill="#1e293b" stroke="#334155" stroke-width="1"/>
    <text x="220" y="24" fill="#cbd5e1" text-anchor="middle">📱 Social Media (9:16)</text>

    <rect x="310" y="0" width="160" height="38" rx="19" fill="#1e293b" stroke="#334155" stroke-width="1"/>
    <text x="390" y="24" fill="#cbd5e1" text-anchor="middle">📊 Pitch Decks (16:9)</text>

    <rect x="485" y="0" width="150" height="38" rx="19" fill="#1e293b" stroke="#334155" stroke-width="1"/>
    <text x="560" y="24" fill="#cbd5e1" text-anchor="middle">🎬 Video Reels &amp; TikTok</text>

    <rect x="650" y="0" width="150" height="38" rx="19" fill="#1e293b" stroke="#334155" stroke-width="1"/>
    <text x="725" y="24" fill="#cbd5e1" text-anchor="middle">📄 Print &amp; Merch Kit</text>

    <rect x="815" y="0" width="140" height="38" rx="19" fill="#1e293b" stroke="#334155" stroke-width="1"/>
    <text x="885" y="24" fill="#cbd5e1" text-anchor="middle">🌐 Web &amp; Banners</text>
  </g>

  <!-- 4 Main Template Category Showcases -->
  <g transform="translate(40, 160)">
    
    <!-- Category Card 1: Social Media -->
    <g transform="translate(0, 0)">
      <rect width="280" height="520" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1"/>
      <rect width="280" height="180" rx="12" fill="url(#cardG1)"/>
      <g transform="translate(20, 205)">
        <text x="0" y="0" font-size="17" font-weight="800" fill="#ffffff">Social Media Suite</text>
        <text x="0" y="20" font-size="12" fill="#94a3b8">Instagram Reels, TikTok, YouTube Shorts</text>
        
        <!-- Badges & Features -->
        <g transform="translate(0, 45)" font-size="11" fill="#e2e8f0">
          <rect x="0" y="0" width="100" height="24" rx="4" fill="#334155"/>
          <text x="10" y="16" fill="#38bdf8">1080 × 1920 px</text>
          
          <rect x="110" y="0" width="120" height="24" rx="4" fill="#334155"/>
          <text x="120" y="16" fill="#f472b6">Safe-Zone Guides</text>

          <text x="0" y="55" font-size="12" fill="#cbd5e1">• 2,500,000+ Verified Presets</text>
          <text x="0" y="80" font-size="12" fill="#cbd5e1">• Automatic Audio Beat-Sync</text>
          <text x="0" y="105" font-size="12" fill="#cbd5e1">• Kinetic Subtitles Engine</text>
          <text x="0" y="130" font-size="12" fill="#cbd5e1">• Multi-Channel Direct Publishing</text>
        </g>
      </g>
    </g>

    <!-- Category Card 2: Presentations -->
    <g transform="translate(305, 0)">
      <rect width="280" height="520" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1"/>
      <rect width="280" height="180" rx="12" fill="url(#cardG2)"/>
      <g transform="translate(20, 205)">
        <text x="0" y="0" font-size="17" font-weight="800" fill="#ffffff">Business Presentations</text>
        <text x="0" y="20" font-size="12" fill="#94a3b8">Pitch Decks, Keynotes, Reports</text>
        
        <g transform="translate(0, 45)" font-size="11" fill="#e2e8f0">
          <rect x="0" y="0" width="100" height="24" rx="4" fill="#334155"/>
          <text x="10" y="16" fill="#38bdf8">1920 × 1080 px</text>
          
          <rect x="110" y="0" width="120" height="24" rx="4" fill="#334155"/>
          <text x="120" y="16" fill="#4ade80">Interactive Data</text>

          <text x="0" y="55" font-size="12" fill="#cbd5e1">• 850,000+ Complete Decks</text>
          <text x="0" y="80" font-size="12" fill="#cbd5e1">• Google Sheets Live Link</text>
          <text x="0" y="105" font-size="12" fill="#cbd5e1">• Presenter View &amp; Remote Sync</text>
          <text x="0" y="130" font-size="12" fill="#cbd5e1">• Magic Morph Slide Transitions</text>
        </g>
      </g>
    </g>

    <!-- Category Card 3: Marketing & Ads -->
    <g transform="translate(610, 0)">
      <rect width="280" height="520" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1"/>
      <rect width="280" height="180" rx="12" fill="url(#cardG3)"/>
      <g transform="translate(20, 205)">
        <text x="0" y="0" font-size="17" font-weight="800" fill="#ffffff">Marketing &amp; Display Ads</text>
        <text x="0" y="20" font-size="12" fill="#94a3b8">Google Ads, Meta Ads, Banners</text>
        
        <g transform="translate(0, 45)" font-size="11" fill="#e2e8f0">
          <rect x="0" y="0" width="100" height="24" rx="4" fill="#334155"/>
          <text x="10" y="16" fill="#38bdf8">IAB Standards</text>
          
          <rect x="110" y="0" width="120" height="24" rx="4" fill="#334155"/>
          <text x="120" y="16" fill="#f59e0b">Batch Export</text>

          <text x="0" y="55" font-size="12" fill="#cbd5e1">• 1,200,000+ Ad Creative Presets</text>
          <text x="0" y="80" font-size="12" fill="#cbd5e1">• One-Click Multi-Size Resize</text>
          <text x="0" y="105" font-size="12" fill="#cbd5e1">• High-CTR Copy Variations</text>
          <text x="0" y="130" font-size="12" fill="#cbd5e1">• Animated HTML5 / MP4 Output</text>
        </g>
      </g>
    </g>

    <!-- Category Card 4: Print & Merchandise -->
    <g transform="translate(915, 0)">
      <rect width="280" height="520" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1"/>
      <rect width="280" height="180" rx="12" fill="url(#cardG4)"/>
      <g transform="translate(20, 205)">
        <text x="0" y="0" font-size="17" font-weight="800" fill="#ffffff">Print &amp; Merchandise</text>
        <text x="0" y="20" font-size="12" fill="#94a3b8">Business Cards, Apparel, Menus</text>
        
        <g transform="translate(0, 45)" font-size="11" fill="#e2e8f0">
          <rect x="0" y="0" width="100" height="24" rx="4" fill="#334155"/>
          <text x="10" y="16" fill="#38bdf8">300 DPI CMYK</text>
          
          <rect x="110" y="0" width="120" height="24" rx="4" fill="#334155"/>
          <text x="120" y="16" fill="#10b981">Bleed Marks</text>

          <text x="0" y="55" font-size="12" fill="#cbd5e1">• 500,000+ Vector Print Templates</text>
          <text x="0" y="80" font-size="12" fill="#cbd5e1">• PDF Print with Crop Marks</text>
          <text x="0" y="105" font-size="12" fill="#cbd5e1">• Global Delivery to Your Door</text>
          <text x="0" y="130" font-size="12" fill="#cbd5e1">• Sustainable Paper Certified</text>
        </g>
      </g>
    </g>

  </g>
</svg>`;

writeSvg('canva-templates-ecosystem.svg', templatesSvg);

// 4. Canva Video & Photo Editor SVG
const videoEditorSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720" style="background:#090d16;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <defs>
    <linearGradient id="timelineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00C4CC"/>
      <stop offset="50%" stop-color="#3B82F6"/>
      <stop offset="100%" stop-color="#8B5CF6"/>
    </linearGradient>
    <linearGradient id="audioGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10B981"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
  </defs>

  <!-- Header Bar -->
  <rect width="1280" height="60" fill="#131b2e" stroke="#1e293b" stroke-width="1"/>
  <g transform="translate(30, 16)">
    <rect width="36" height="28" rx="6" fill="#00C4CC"/>
    <text x="18" y="20" font-size="16" font-weight="900" fill="#0f172a" text-anchor="middle">🎬</text>
    <text x="48" y="20" font-size="18" font-weight="800" fill="#ffffff">Canva Video &amp; Photo Studio</text>
    <text x="310" y="20" font-size="13" fill="#94a3b8">| Multi-Track Timeline &amp; 4K UHD Export Engine</text>
  </g>

  <!-- Top Action Controls -->
  <g transform="translate(980, 14)">
    <rect x="0" y="0" width="120" height="32" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1"/>
    <text x="60" y="21" font-size="12" font-weight="700" fill="#38bdf8" text-anchor="middle">🎵 Beat Sync: ON</text>
    
    <rect x="130" y="0" width="140" height="32" rx="16" fill="#00C4CC"/>
    <text x="200" y="21" font-size="12" font-weight="800" fill="#0f172a" text-anchor="middle">⬇ Export MP4 (4K)</text>
  </g>

  <!-- Workspace: Left Preview Stage (Video Canvas) & Right Photo Effects Panel -->
  <g transform="translate(30, 80)">
    
    <!-- Video Canvas Preview -->
    <rect width="780" height="380" rx="10" fill="#131b2e" stroke="#334155" stroke-width="1.5"/>
    <g transform="translate(20, 20)">
      <rect width="740" height="340" rx="6" fill="#0b0f19"/>
      <circle cx="370" cy="170" r="90" fill="url(#timelineGrad)" opacity="0.4"/>
      <text x="370" y="150" font-size="28" font-weight="900" fill="#ffffff" text-anchor="middle">Summer Product Commercial</text>
      <text x="370" y="180" font-size="14" fill="#38bdf8" text-anchor="middle">00:14.2 / 00:30.0 • 60 FPS UHD</text>
      
      <!-- Video Playback Overlay Controls -->
      <g transform="translate(320, 260)">
        <circle cx="50" cy="20" r="24" fill="#00C4CC"/>
        <polygon points="46,12 58,20 46,28" fill="#0f172a"/>
      </g>
    </g>

    <!-- Right Column: Photo & Video Intelligence Tools -->
    <g transform="translate(805, 0)">
      <rect width="415" height="380" rx="10" fill="#131b2e" stroke="#334155" stroke-width="1.5"/>
      <g transform="translate(20, 20)">
        <text x="0" y="16" font-size="16" font-weight="800" fill="#ffffff">One-Click Neural Editing Tools</text>
        
        <!-- Tool 1 -->
        <g transform="translate(0, 35)">
          <rect width="375" height="50" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
          <text x="16" y="30" font-size="13" font-weight="700" fill="#ffffff">✨ Background Remover (Video &amp; Photo)</text>
          <rect x="300" y="13" width="60" height="24" rx="12" fill="#00C4CC"/>
          <text x="330" y="29" font-size="10" font-weight="800" fill="#0f172a" text-anchor="middle">ACTIVE</text>
        </g>

        <!-- Tool 2 -->
        <g transform="translate(0, 95)">
          <rect width="375" height="50" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
          <text x="16" y="30" font-size="13" font-weight="700" fill="#ffffff">🔊 AI Voice Clean &amp; Noise Cancellation</text>
          <rect x="300" y="13" width="60" height="24" rx="12" fill="#22c55e"/>
          <text x="330" y="29" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">ENABLED</text>
        </g>

        <!-- Tool 3 -->
        <g transform="translate(0, 155)">
          <rect width="375" height="50" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
          <text x="16" y="30" font-size="13" font-weight="700" fill="#ffffff">🎭 Auto Subtitles &amp; Closed Captions</text>
          <rect x="300" y="13" width="60" height="24" rx="12" fill="#a855f7"/>
          <text x="330" y="29" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">98.9% ACC</text>
        </g>

        <!-- Tool 4 -->
        <g transform="translate(0, 215)">
          <rect width="375" height="50" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
          <text x="16" y="30" font-size="13" font-weight="700" fill="#ffffff">🎨 Cinematic LUTs &amp; Color Grading</text>
          <rect x="300" y="13" width="60" height="24" rx="12" fill="#38bdf8"/>
          <text x="330" y="29" font-size="10" font-weight="800" fill="#0f172a" text-anchor="middle">24 PRESETS</text>
        </g>

        <!-- Tool 5 -->
        <g transform="translate(0, 275)">
          <rect width="375" height="50" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
          <text x="16" y="30" font-size="13" font-weight="700" fill="#ffffff">📱 Smart Mockup 3D Generator</text>
          <rect x="300" y="13" width="60" height="24" rx="12" fill="#e2e8f0"/>
          <text x="330" y="29" font-size="10" font-weight="800" fill="#0f172a" text-anchor="middle">1-CLICK</text>
        </g>
      </g>
    </g>

  </g>

  <!-- Bottom: Multi-Track Timeline -->
  <g transform="translate(30, 480)">
    <rect width="1220" height="215" rx="10" fill="#131b2e" stroke="#334155" stroke-width="1.5"/>
    
    <!-- Timeline Ruler -->
    <g transform="translate(20, 15)" font-size="11" fill="#64748b">
      <text x="0" y="12">00:00</text>
      <text x="150" y="12">00:05</text>
      <text x="300" y="12">00:10</text>
      <text x="450" y="12">00:15 (Playhead)</text>
      <text x="600" y="12">00:20</text>
      <text x="750" y="12">00:25</text>
      <text x="900" y="12">00:30</text>
      <line x1="0" y1="20" x2="1180" y2="20" stroke="#334155" stroke-width="1"/>
    </g>

    <!-- Playhead Needle -->
    <line x1="470" y1="20" x2="470" y2="195" stroke="#ef4444" stroke-width="2"/>
    <polygon points="464,15 476,15 470,25" fill="#ef4444"/>

    <!-- Track 1: Video & Visuals -->
    <g transform="translate(20, 50)">
      <text x="0" y="28" font-size="11" font-weight="700" fill="#cbd5e1">Video 1</text>
      
      <!-- Clip 1 -->
      <rect x="70" y="5" width="220" height="40" rx="6" fill="url(#timelineGrad)"/>
      <text x="85" y="30" font-size="12" font-weight="700" fill="#ffffff">Intro Hook Clip (0-5s)</text>
      
      <!-- Clip 2 -->
      <rect x="300" y="5" width="350" height="40" rx="6" fill="url(#timelineGrad)"/>
      <text x="315" y="30" font-size="12" font-weight="700" fill="#ffffff">Feature Demonstration (5-15s)</text>

      <!-- Clip 3 -->
      <rect x="660" y="5" width="450" height="40" rx="6" fill="url(#timelineGrad)"/>
      <text x="675" y="30" font-size="12" font-weight="700" fill="#ffffff">Call to Action &amp; Outro (15-30s)</text>
    </g>

    <!-- Track 2: Animated Text Overlay -->
    <g transform="translate(20, 100)">
      <text x="0" y="24" font-size="11" font-weight="700" fill="#cbd5e1">Overlay</text>
      <rect x="70" y="5" width="180" height="30" rx="4" fill="#a855f7"/>
      <text x="85" y="24" font-size="11" font-weight="700" fill="#ffffff">Kinetic Headline #1</text>
      
      <rect x="350" y="5" width="240" height="30" rx="4" fill="#a855f7"/>
      <text x="365" y="24" font-size="11" font-weight="700" fill="#ffffff">Subtitles (Auto-Synced)</text>
    </g>

    <!-- Track 3: Audio Soundtrack & Beat Markers -->
    <g transform="translate(20, 145)">
      <text x="0" y="24" font-size="11" font-weight="700" fill="#cbd5e1">Audio</text>
      <rect x="70" y="5" width="1040" height="32" rx="6" fill="url(#audioGrad)"/>
      <text x="85" y="25" font-size="11" font-weight="700" fill="#ffffff">♫ Upbeat Tech Corporate Synth (Beat Sync Markers Active ••••••••••)</text>
    </g>

  </g>
</svg>`;

writeSvg('canva-video-photo-editor.svg', videoEditorSvg);

// 5. Canva Presentations & Docs-to-Decks SVG
const presentationsSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720" style="background:#0f172a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <defs>
    <linearGradient id="presGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4F46E5"/>
      <stop offset="100%" stop-color="#7C3AED"/>
    </linearGradient>
    <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#00C4CC"/>
      <stop offset="100%" stop-color="#3B82F6"/>
    </linearGradient>
  </defs>

  <!-- Top App Navigation -->
  <rect width="1280" height="64" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <g transform="translate(30, 16)">
    <rect width="36" height="32" rx="8" fill="url(#presGrad)"/>
    <text x="18" y="22" font-size="18" font-weight="900" fill="#ffffff" text-anchor="middle">📊</text>
    <text x="48" y="23" font-size="20" font-weight="800" fill="#ffffff">Canva Presentations &amp; Docs-to-Decks</text>
    <text x="440" y="23" font-size="13" fill="#94a3b8">| Interactive Live Polling, Smooth Morphs &amp; Presenter View</text>
  </g>

  <!-- Action Buttons -->
  <g transform="translate(970, 14)">
    <rect x="0" y="0" width="140" height="36" rx="18" fill="#334155"/>
    <text x="70" y="23" font-size="13" font-weight="700" fill="#ffffff" text-anchor="middle">👁 Presenter View</text>

    <rect x="150" y="0" width="130" height="36" rx="18" fill="#4F46E5"/>
    <text x="215" y="23" font-size="13" font-weight="700" fill="#ffffff" text-anchor="middle">▶ Present Live</text>
  </g>

  <!-- Left: Slide Deck Canvas Stage (Large Interactive Slide) -->
  <g transform="translate(40, 90)">
    <rect width="840" height="470" rx="12" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    
    <!-- Slide Inner Content -->
    <g transform="translate(50, 45)">
      <!-- Slide Category -->
      <rect width="130" height="26" rx="13" fill="#EEF2FF"/>
      <text x="65" y="17" font-size="11" font-weight="700" fill="#4F46E5" text-anchor="middle">QUARTERLY REPORT</text>

      <text x="0" y="70" font-size="32" font-weight="900" fill="#0f172a">Global Revenue &amp; User Retention</text>
      <text x="0" y="100" font-size="15" fill="#64748b">Live data dynamically synced from Google Sheets database</text>

      <!-- Live Synced Interactive Bar Chart Component -->
      <g transform="translate(0, 130)">
        <rect width="460" height="220" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
        
        <!-- Bars -->
        <g transform="translate(40, 30)">
          <!-- Bar 1 -->
          <rect x="0" y="90" width="50" height="80" rx="4" fill="url(#chartGrad)"/>
          <text x="25" y="80" font-size="12" font-weight="700" fill="#0f172a" text-anchor="middle">$1.2M</text>
          <text x="25" y="190" font-size="11" fill="#64748b" text-anchor="middle">Q1</text>

          <!-- Bar 2 -->
          <rect x="80" y="60" width="50" height="110" rx="4" fill="url(#chartGrad)"/>
          <text x="105" y="50" font-size="12" font-weight="700" fill="#0f172a" text-anchor="middle">$2.4M</text>
          <text x="105" y="190" font-size="11" fill="#64748b" text-anchor="middle">Q2</text>

          <!-- Bar 3 -->
          <rect x="160" y="30" width="50" height="140" rx="4" fill="url(#chartGrad)"/>
          <text x="185" y="20" font-size="12" font-weight="700" fill="#0f172a" text-anchor="middle">$3.9M</text>
          <text x="185" y="190" font-size="11" fill="#64748b" text-anchor="middle">Q3</text>

          <!-- Bar 4 (Projected) -->
          <rect x="240" y="0" width="50" height="170" rx="4" fill="#7C3AED"/>
          <text x="265" y="-10" font-size="12" font-weight="800" fill="#7C3AED" text-anchor="middle">$5.8M ✨</text>
          <text x="265" y="190" font-size="11" font-weight="700" fill="#7C3AED" text-anchor="middle">Q4 (EST)</text>
        </g>
      </g>

      <!-- Key Insights Box (Right of Chart inside Slide) -->
      <g transform="translate(480, 130)">
        <rect width="250" height="220" rx="8" fill="#F1F5F9" stroke="#E2E8F0" stroke-width="1"/>
        <g transform="translate(20, 20)">
          <text x="0" y="16" font-size="14" font-weight="800" fill="#0f172a">Executive Summary:</text>
          <text x="0" y="45" font-size="12" fill="#334155">• +148% YoY Expansion</text>
          <text x="0" y="70" font-size="12" fill="#334155">• 94.2% Net Retention</text>
          <text x="0" y="95" font-size="12" fill="#334155">• 12 New Enterprise Hubs</text>
          
          <rect x="0" y="125" width="210" height="36" rx="6" fill="#4F46E5"/>
          <text x="105" y="148" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle">Live Q&amp;A Code: #CANVA26</text>
        </g>
      </g>
    </g>
  </g>

  <!-- Right: Presenter Notes & Docs-to-Decks Panel -->
  <g transform="translate(900, 90)">
    <rect width="340" height="470" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
    <g transform="translate(20, 25)">
      <text x="0" y="16" font-size="16" font-weight="800" fill="#ffffff">Presenter Notes (Private)</text>
      
      <rect x="0" y="32" width="300" height="150" rx="8" fill="#0f172a" stroke="#334155" stroke-width="1"/>
      <g transform="translate(15, 52)" font-size="12" fill="#cbd5e1">
        <text x="0" y="0" font-weight="700" fill="#38bdf8">Talking Points for Slide 4:</text>
        <text x="0" y="24">1. Emphasize Q3 acceleration driven</text>
        <text x="0" y="42">   by Canva Magic Studio rollout.</text>
        <text x="0" y="66">2. Prompt audience to submit questions</text>
        <text x="0" y="84">   using the interactive poll link.</text>
      </g>

      <!-- Docs-to-Decks AI Feature Callout -->
      <g transform="translate(0, 200)">
        <rect width="300" height="180" rx="8" fill="rgba(79, 70, 229, 0.15)" stroke="#6366f1" stroke-width="1"/>
        <g transform="translate(15, 25)">
          <text x="0" y="14" font-size="14" font-weight="800" fill="#a5b4fc">📄 Docs to Decks Engine</text>
          <text x="0" y="40" font-size="11" fill="#cbd5e1">Write any markdown plan or document in Canva Docs and transform it into 12 formatted slides in 1 click.</text>
          
          <rect x="0" y="85" width="270" height="34" rx="6" fill="#4F46E5"/>
          <text x="135" y="107" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle">Generate Matching Deck ✨</text>
        </g>
      </g>
    </g>
  </g>

  <!-- Bottom: Slide Deck Timeline (Slide Thumbnails) -->
  <g transform="translate(40, 580)">
    <rect width="1200" height="110" rx="10" fill="#1e293b" stroke="#334155" stroke-width="1"/>
    
    <!-- Thumbnail 1 -->
    <g transform="translate(20, 15)">
      <rect width="120" height="68" rx="6" fill="#334155"/>
      <text x="60" y="40" font-size="11" font-weight="700" fill="#94a3b8" text-anchor="middle">1. Title Deck</text>
      <text x="60" y="90" font-size="10" fill="#64748b" text-anchor="middle">Slide 1</text>
    </g>

    <!-- Thumbnail 2 -->
    <g transform="translate(160, 15)">
      <rect width="120" height="68" rx="6" fill="#334155"/>
      <text x="60" y="40" font-size="11" font-weight="700" fill="#94a3b8" text-anchor="middle">2. Executive Team</text>
      <text x="60" y="90" font-size="10" fill="#64748b" text-anchor="middle">Slide 2</text>
    </g>

    <!-- Thumbnail 3 -->
    <g transform="translate(300, 15)">
      <rect width="120" height="68" rx="6" fill="#334155"/>
      <text x="60" y="40" font-size="11" font-weight="700" fill="#94a3b8" text-anchor="middle">3. Product Metrics</text>
      <text x="60" y="90" font-size="10" fill="#64748b" text-anchor="middle">Slide 3</text>
    </g>

    <!-- Thumbnail 4 (Active Slide) -->
    <g transform="translate(440, 15)">
      <rect width="120" height="68" rx="6" fill="#4F46E5" stroke="#00C4CC" stroke-width="2"/>
      <text x="60" y="40" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">4. Revenue Chart</text>
      <text x="60" y="90" font-size="10" font-weight="700" fill="#00C4CC" text-anchor="middle">Active (Slide 4)</text>
    </g>

    <!-- Thumbnail 5 -->
    <g transform="translate(580, 15)">
      <rect width="120" height="68" rx="6" fill="#334155"/>
      <text x="60" y="40" font-size="11" font-weight="700" fill="#94a3b8" text-anchor="middle">5. Global Growth</text>
      <text x="60" y="90" font-size="10" fill="#64748b" text-anchor="middle">Slide 5</text>
    </g>

    <!-- Add Slide Button -->
    <g transform="translate(720, 15)">
      <rect width="80" height="68" rx="6" fill="#0f172a" stroke="#475569" stroke-width="1" stroke-dasharray="4,4"/>
      <text x="40" y="42" font-size="20" fill="#94a3b8" text-anchor="middle">+</text>
      <text x="40" y="90" font-size="10" fill="#64748b" text-anchor="middle">Add Slide</text>
    </g>
  </g>
</svg>`;

writeSvg('canva-brand-kit-collaboration.svg', presentationsSvg); // We will also create a dedicated brand-kit SVG
writeSvg('canva-presentations.svg', presentationsSvg);

// 6. Canva Brand Kit & Team Governance SVG
const brandKitSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720" style="background:#0b0f19;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <defs>
    <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10B981"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
    <linearGradient id="canvaLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00C4CC"/>
      <stop offset="100%" stop-color="#7D2AE8"/>
    </linearGradient>
  </defs>

  <!-- Top App Navigation -->
  <rect width="1280" height="70" fill="#131b2e" stroke="#1e293b" stroke-width="1"/>
  <g transform="translate(30, 18)">
    <rect width="36" height="34" rx="8" fill="url(#brandGrad)"/>
    <text x="18" y="24" font-size="18" font-weight="900" fill="#ffffff" text-anchor="middle">🛡️</text>
    <text x="48" y="24" font-size="20" font-weight="800" fill="#ffffff">Canva Brand Hub™ &amp; Team Governance</text>
    <text x="470" y="24" font-size="13" fill="#94a3b8">| Centralized Asset Management &amp; Strict Brand Locking Controls</text>
  </g>

  <g transform="translate(1030, 18)">
    <rect width="220" height="36" rx="18" fill="url(#brandGrad)"/>
    <text x="110" y="23" font-size="13" font-weight="800" fill="#ffffff" text-anchor="middle">👑 Enterprise Brand Kit (Active)</text>
  </g>

  <!-- 3 Major Governance Columns -->
  <g transform="translate(40, 95)">
    
    <!-- Column 1: Brand Assets & Colors -->
    <g transform="translate(0, 0)">
      <rect width="380" height="580" rx="12" fill="#131b2e" stroke="#334155" stroke-width="1.5"/>
      <g transform="translate(25, 25)">
        <text x="0" y="16" font-size="17" font-weight="800" fill="#ffffff">1. Brand Identity &amp; Colors</text>
        <text x="0" y="38" font-size="12" fill="#94a3b8">Locked vector logos and official HEX swatches</text>

        <!-- Official Logos -->
        <text x="0" y="70" font-size="13" font-weight="700" fill="#cbd5e1">Approved Brand Logos:</text>
        <g transform="translate(0, 85)">
          <rect x="0" y="0" width="160" height="60" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
          <rect x="15" y="15" width="130" height="30" rx="4" fill="url(#canvaLogoGrad)"/>
          <text x="80" y="35" font-size="14" font-weight="900" fill="#ffffff" text-anchor="middle">Primary Logo</text>

          <rect x="170" y="0" width="160" height="60" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
          <text x="250" y="35" font-size="14" font-weight="800" fill="#ffffff" text-anchor="middle">Dark Monochrome</text>
        </g>

        <!-- Color Palette -->
        <text x="0" y="180" font-size="13" font-weight="700" fill="#cbd5e1">Official Corporate Palette (Locked):</text>
        <g transform="translate(0, 195)">
          <!-- Swatch 1 -->
          <rect x="0" y="0" width="75" height="75" rx="8" fill="#00C4CC"/>
          <text x="37" y="95" font-size="10" font-weight="700" fill="#cbd5e1" text-anchor="middle">#00C4CC</text>
          
          <!-- Swatch 2 -->
          <rect x="85" y="0" width="75" height="75" rx="8" fill="#7D2AE8"/>
          <text x="122" y="95" font-size="10" font-weight="700" fill="#cbd5e1" text-anchor="middle">#7D2AE8</text>

          <!-- Swatch 3 -->
          <rect x="170" y="0" width="75" height="75" rx="8" fill="#0F172A"/>
          <text x="207" y="95" font-size="10" font-weight="700" fill="#cbd5e1" text-anchor="middle">#0F172A</text>

          <!-- Swatch 4 -->
          <rect x="255" y="0" width="75" height="75" rx="8" fill="#10B981"/>
          <text x="292" y="95" font-size="10" font-weight="700" fill="#cbd5e1" text-anchor="middle">#10B981</text>
        </g>

        <!-- Typography Standards -->
        <text x="0" y="325" font-size="13" font-weight="700" fill="#cbd5e1">Approved Brand Typography Hierarchy:</text>
        <g transform="translate(0, 345)" font-size="12">
          <rect width="330" height="42" rx="6" fill="#1e293b"/>
          <text x="15" y="26" font-weight="900" fill="#ffffff">Title Font: Canva Sans ExtraBold (42pt)</text>
          
          <rect y="50" width="330" height="42" rx="6" fill="#1e293b"/>
          <text x="15" y="76" font-weight="700" fill="#cbd5e1">Subtitle Font: Canva Sans SemiBold (20pt)</text>

          <rect y="100" width="330" height="42" rx="6" fill="#1e293b"/>
          <text x="15" y="126" font-weight="400" fill="#94a3b8">Body Copy: Inter Regular (15pt / 1.6 Line Height)</text>
        </g>
      </g>
    </g>

    <!-- Column 2: Template Controls & Locking -->
    <g transform="translate(410, 0)">
      <rect width="380" height="580" rx="12" fill="#131b2e" stroke="#334155" stroke-width="1.5"/>
      <g transform="translate(25, 25)">
        <text x="0" y="16" font-size="17" font-weight="800" fill="#ffffff">2. Brand Controls &amp; Template Locking</text>
        <text x="0" y="38" font-size="12" fill="#94a3b8">Prevent non-designers from breaking layouts</text>

        <g transform="translate(0, 60)" font-size="12">
          <!-- Control 1 -->
          <rect width="330" height="75" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
          <g transform="translate(15, 22)">
            <text x="0" y="0" font-weight="800" fill="#38bdf8">🔒 Color &amp; Font Enforce Lock</text>
            <text x="0" y="20" font-size="11" fill="#94a3b8">Team members are restricted strictly to</text>
            <text x="0" y="36" font-size="11" fill="#94a3b8">approved Brand Kit swatches and fonts.</text>
          </g>

          <!-- Control 2 -->
          <rect y="90" width="330" height="75" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
          <g transform="translate(15, 112)">
            <text x="0" y="0" font-weight="800" fill="#4ade80">📐 Header &amp; Legal Footer Position Lock</text>
            <text x="0" y="20" font-size="11" fill="#94a3b8">Disclaimers, logos, and headers cannot</text>
            <text x="0" y="36" font-size="11" fill="#94a3b8">be moved or resized by contributors.</text>
          </g>

          <!-- Control 3 -->
          <rect y="180" width="330" height="75" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
          <g transform="translate(15, 202)">
            <text x="0" y="0" font-weight="800" fill="#f472b6">🖼 Image Frame Restrictions</text>
            <text x="0" y="20" font-size="11" fill="#94a3b8">Allows drag-and-drop photo swaps inside</text>
            <text x="0" y="36" font-size="11" fill="#94a3b8">calibrated aspect ratio windows only.</text>
          </g>

          <!-- Control 4 -->
          <rect y="270" width="330" height="75" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
          <g transform="translate(15, 292)">
            <text x="0" y="0" font-weight="800" fill="#fbbf24">🎯 Brand Voice AI Guidance</text>
            <text x="0" y="20" font-size="11" fill="#94a3b8">Magic Write automatically detects and</text>
            <text x="0" y="36" font-size="11" fill="#94a3b8">flags copy that violates brand personality.</text>
          </g>
        </g>
      </g>
    </g>

    <!-- Column 3: Team Approvals & Roles -->
    <g transform="translate(820, 0)">
      <rect width="380" height="580" rx="12" fill="#131b2e" stroke="#334155" stroke-width="1.5"/>
      <g transform="translate(25, 25)">
        <text x="0" y="16" font-size="17" font-weight="800" fill="#ffffff">3. Workflow Approvals &amp; Roles</text>
        <text x="0" y="38" font-size="12" fill="#94a3b8">Multi-tiered signoff and publishing rules</text>

        <!-- Active Approval Flow -->
        <g transform="translate(0, 60)">
          <rect width="330" height="200" rx="8" fill="#0f172a" stroke="#334155" stroke-width="1"/>
          <g transform="translate(15, 22)">
            <text x="0" y="0" font-size="13" font-weight="800" fill="#ffffff">Active Signoff Pipeline:</text>
            
            <!-- Step 1 -->
            <g transform="translate(0, 20)">
              <circle cx="12" cy="12" r="12" fill="#10B981"/>
              <text x="12" y="16" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">✓</text>
              <text x="35" y="16" font-size="12" font-weight="700" fill="#ffffff">1. Designer Draft Created</text>
            </g>

            <!-- Step 2 -->
            <g transform="translate(0, 60)">
              <circle cx="12" cy="12" r="12" fill="#3B82F6"/>
              <text x="12" y="16" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">2</text>
              <text x="35" y="16" font-size="12" font-weight="700" fill="#ffffff">2. Brand Manager Review</text>
              <text x="35" y="32" font-size="10" fill="#94a3b8">Pending signoff by Sarah M.</text>
            </g>

            <!-- Step 3 -->
            <g transform="translate(0, 105)">
              <circle cx="12" cy="12" r="12" fill="#334155"/>
              <text x="12" y="16" font-size="11" font-weight="800" fill="#94a3b8" text-anchor="middle">3</text>
              <text x="35" y="16" font-size="12" font-weight="700" fill="#94a3b8">3. Export &amp; Live Publishing</text>
            </g>
          </g>
        </g>

        <!-- Role Badges -->
        <text x="0" y="290" font-size="13" font-weight="700" fill="#cbd5e1">Role Permissions Breakdown:</text>
        <g transform="translate(0, 310)" font-size="11" fill="#cbd5e1">
          <rect width="330" height="36" rx="6" fill="#1e293b"/>
          <text x="15" y="22"><tspan font-weight="700" fill="#ef4444">👑 Brand Admin:</tspan> Full kit edit &amp; global locks</text>

          <rect y="44" width="330" height="36" rx="6" fill="#1e293b"/>
          <text x="15" y="66"><tspan font-weight="700" fill="#38bdf8">🎨 Template Designer:</tspan> Create &amp; publish templates</text>

          <rect y="88" width="330" height="36" rx="6" fill="#1e293b"/>
          <text x="15" y="110"><tspan font-weight="700" fill="#10b981">✍️ Contributor Member:</tspan> Edit locked templates only</text>
        </g>
      </g>
    </g>

  </g>
</svg>`;

writeSvg('canva-brand-kit-collaboration.svg', brandKitSvg);

console.log('All 6 official Canva SVGs successfully generated and saved.');
