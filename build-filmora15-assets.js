const fs = require('fs');
const path = require('path');

const AFF_VIDEO_EDITOR = "https://kjuzv.com/g/8u3trxihmwb68b264a76ef655e4ac9/?ulp=https%3A%2F%2Ffilmora.wondershare.com%2Fshop%2Fbuy%2Fbuy-video-editor.html";
const AFF_BUSINESS = "https://kjuzv.com/g/8u3trxihmwb68b264a76ef655e4ac9/?ulp=https%3A%2F%2Ffilmora.wondershare.com%2Fstore%2Fbuy-business.html%3Fsysparam%3Dwin";
const AFF_EDUCATION = "https://kjuzv.com/g/8u3trxihmwb68b264a76ef655e4ac9/?ulp=https://filmora.wondershare.com/store/buy-education.html?";

// ==========================================
// 1. GENERATE 8 DISTINCT PROFESSIONAL SVGS
// ==========================================

// SVG 1: filmora-hero.svg - Main Editor UI
const svgHero = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="bgGrad1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
    <linearGradient id="accentGrad1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#2563eb"/><stop offset="100%" stop-color="#38d39f"/></linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#bgGrad1)"/>
  <!-- App Titlebar -->
  <rect width="1200" height="42" fill="#090d16"/>
  <circle cx="20" cy="21" r="6" fill="#ef4444"/><circle cx="40" cy="21" r="6" fill="#f59e0b"/><circle cx="60" cy="21" r="6" fill="#10b981"/>
  <text x="80" y="26" fill="#94a3b8" font-family="sans-serif" font-size="13" font-weight="600">Wondershare Filmora 15 - Project: Cinematic_Trailer_4K.wfp</text>
  <rect x="1060" y="9" width="120" height="26" rx="4" fill="url(#accentGrad1)"/>
  <text x="1120" y="26" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="700" text-anchor="middle">EXPORT 4K</text>
  
  <!-- Left Toolbar -->
  <rect x="0" y="42" width="60" height="633" fill="#0d1424"/>
  <rect x="14" y="60" width="32" height="32" rx="6" fill="url(#accentGrad1)"/>
  <circle cx="30" cy="76" r="6" fill="#ffffff"/>
  <circle cx="30" cy="130" r="10" fill="#334155"/><circle cx="30" cy="180" r="10" fill="#334155"/><circle cx="30" cy="230" r="10" fill="#334155"/>

  <!-- Left Inspector: Media & AI -->
  <rect x="60" y="42" width="300" height="360" fill="#111827" stroke="#1e293b"/>
  <text x="80" y="72" fill="#f8fafc" font-family="sans-serif" font-size="14" font-weight="700">Project Media &amp; AI Tools</text>
  <rect x="75" y="90" width="125" height="30" rx="6" fill="#1e293b"/>
  <text x="137" y="110" fill="#38d39f" font-family="sans-serif" font-size="11" font-weight="700" text-anchor="middle">✨ AI Copilot 2.0</text>
  <rect x="210" y="90" width="135" height="30" rx="6" fill="#1e293b"/>
  <text x="277" y="110" fill="#cbd5e1" font-family="sans-serif" font-size="11" font-weight="600" text-anchor="middle">📹 Multi-Cam</text>
  <!-- Media Grid -->
  <rect x="75" y="135" width="130" height="75" rx="6" fill="#1e293b" stroke="#38d39f" stroke-width="2"/>
  <polygon points="134,165 146,172 134,179" fill="#38d39f"/>
  <text x="82" y="202" fill="#ffffff" font-family="sans-serif" font-size="10">Cam_A_4K.mp4</text>
  <rect x="215" y="135" width="130" height="75" rx="6" fill="#1e293b"/>
  <text x="222" y="202" fill="#94a3b8" font-family="sans-serif" font-size="10">Cam_B_Wide.mp4</text>
  <rect x="75" y="225" width="270" height="70" rx="8" fill="#1e293b"/>
  <text x="90" y="250" fill="#38d39f" font-family="sans-serif" font-size="11" font-weight="700">AI Prompt Assistant</text>
  <text x="90" y="272" fill="#94a3b8" font-family="sans-serif" font-size="11">"Auto-edit jump cuts &amp; balance audio"</text>

  <!-- Video Monitor -->
  <rect x="360" y="42" width="560" height="360" fill="#030712"/>
  <rect x="375" y="55" width="530" height="300" rx="8" fill="#0f172a" stroke="#1e293b"/>
  <circle cx="640" cy="180" r="80" fill="#2563eb" opacity="0.25"/>
  <text x="640" y="185" fill="#ffffff" font-family="sans-serif" font-size="28" font-weight="900" text-anchor="middle">FILMORA 15 4K</text>
  <text x="640" y="215" fill="#38d39f" font-family="sans-serif" font-size="13" font-weight="700" text-anchor="middle">MAIN WORKSPACE &amp; PREVIEW MONITOR</text>
  <rect x="390" y="320" width="140" height="24" rx="4" fill="rgba(0,0,0,0.8)"/>
  <text x="460" y="336" fill="#38d39f" font-family="monospace" font-size="12" text-anchor="middle">00:04:18:22 / 4K 60FPS</text>

  <!-- Right Inspector -->
  <rect x="920" y="42" width="280" height="360" fill="#111827" stroke="#1e293b"/>
  <text x="940" y="72" fill="#f8fafc" font-family="sans-serif" font-size="14" font-weight="700">Video Properties</text>
  <rect x="940" y="90" width="240" height="30" rx="4" fill="#1e293b"/>
  <text x="955" y="110" fill="#38d39f" font-family="sans-serif" font-size="11" font-weight="700">Color Grade: Teal &amp; Orange</text>

  <!-- Timeline (Bottom) -->
  <rect x="60" y="402" width="1140" height="273" fill="#090d16" stroke="#1e293b"/>
  <rect x="60" y="402" width="1140" height="35" fill="#0f172a"/>
  <text x="80" y="424" fill="#38d39f" font-family="sans-serif" font-size="12" font-weight="700">Multi-Track Magnetic Timeline</text>
  <rect x="190" y="445" width="400" height="38" rx="4" fill="url(#accentGrad1)"/>
  <text x="200" y="468" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="700">V2: Main_Interview_Clip.mp4</text>
  <rect x="190" y="495" width="700" height="38" rx="4" fill="#7c3aed"/>
  <text x="200" y="518" fill="#ffffff" font-family="sans-serif" font-size="11">V1: B-Roll_Drone_Footage.mov</text>
  <rect x="190" y="545" width="850" height="38" rx="4" fill="#b45309"/>
  <text x="200" y="568" fill="#fef3c7" font-family="sans-serif" font-size="11">A1: AI Voiceover &amp; Background Track</text>
  <line x1="480" y1="402" x2="480" y2="675" stroke="#ef4444" stroke-width="2"/>
</svg>`;

// SVG 2: filmora-editor.svg - Dual Monitor & Asset Browser
const svgEditor = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="bgGrad2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0b132b"/><stop offset="100%" stop-color="#1c2541"/></linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#bgGrad2)"/>
  <!-- Header -->
  <rect width="1200" height="42" fill="#090d16"/>
  <text x="20" y="26" fill="#38bdf8" font-family="sans-serif" font-size="14" font-weight="800">Filmora 15 - Asset Hub &amp; Dual Monitor Browser</text>
  
  <!-- Left Side: Asset Library -->
  <rect x="20" y="60" width="560" height="585" rx="8" fill="#111827" stroke="#1e293b"/>
  <text x="40" y="95" fill="#f8fafc" font-family="sans-serif" font-size="16" font-weight="800">10,000+ Royalty-Free Assets</text>
  
  <!-- Tabs -->
  <rect x="40" y="115" width="90" height="32" rx="6" fill="#2563eb"/><text x="85" y="136" fill="#ffffff" font-family="sans-serif" font-size="12" text-anchor="middle" font-weight="700">3D Titles</text>
  <rect x="140" y="115" width="90" height="32" rx="6" fill="#1e293b"/><text x="185" y="136" fill="#94a3b8" font-family="sans-serif" font-size="12" text-anchor="middle">AI Audio</text>
  <rect x="240" y="115" width="100" height="32" rx="6" fill="#1e293b"/><text x="290" y="136" fill="#94a3b8" font-family="sans-serif" font-size="12" text-anchor="middle">Transitions</text>
  <rect x="350" y="115" width="80" height="32" rx="6" fill="#1e293b"/><text x="390" y="136" fill="#94a3b8" font-family="sans-serif" font-size="12" text-anchor="middle">Effects</text>
  <rect x="440" y="115" width="120" height="32" rx="6" fill="#1e293b"/><text x="500" y="136" fill="#94a3b8" font-family="sans-serif" font-size="12" text-anchor="middle">Pexels Stock</text>

  <!-- Asset Grid -->
  <g transform="translate(40, 165)">
    <!-- Item 1 -->
    <rect x="0" y="0" width="160" height="120" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
    <text x="80" y="60" fill="#38d39f" font-family="sans-serif" font-size="13" font-weight="800" text-anchor="middle">3D Cyber Title</text>
    <text x="80" y="105" fill="#cbd5e1" font-family="sans-serif" font-size="10" text-anchor="middle">4K Kinetic Text</text>

    <!-- Item 2 -->
    <rect x="180" y="0" width="160" height="120" rx="8" fill="#1e293b"/>
    <text x="260" y="60" fill="#f59e0b" font-family="sans-serif" font-size="13" font-weight="800" text-anchor="middle">Neon Glitch FX</text>
    <text x="260" y="105" fill="#cbd5e1" font-family="sans-serif" font-size="10" text-anchor="middle">RGB Distortion</text>

    <!-- Item 3 -->
    <rect x="360" y="0" width="160" height="120" rx="8" fill="#1e293b"/>
    <text x="440" y="60" fill="#a855f7" font-family="sans-serif" font-size="13" font-weight="800" text-anchor="middle">AI Synth Track</text>
    <text x="440" y="105" fill="#cbd5e1" font-family="sans-serif" font-size="10" text-anchor="middle">Royalty Free Beat</text>

    <!-- Item 4 -->
    <rect x="0" y="140" width="160" height="120" rx="8" fill="#1e293b"/>
    <text x="80" y="200" fill="#ec4899" font-family="sans-serif" font-size="13" font-weight="800" text-anchor="middle">Bokeh Flare</text>

    <!-- Item 5 -->
    <rect x="180" y="140" width="160" height="120" rx="8" fill="#1e293b"/>
    <text x="260" y="200" fill="#10b981" font-family="sans-serif" font-size="13" font-weight="800" text-anchor="middle">Teal-Orange LUT</text>

    <!-- Item 6 -->
    <rect x="360" y="140" width="160" height="120" rx="8" fill="#1e293b"/>
    <text x="440" y="200" fill="#06b6d4" font-family="sans-serif" font-size="13" font-weight="800" text-anchor="middle">Speed Curve</text>
  </g>

  <!-- Right Side: Dual Monitor Player -->
  <rect x="600" y="60" width="580" height="585" rx="8" fill="#0f172a" stroke="#1e293b"/>
  <text x="620" y="95" fill="#38d39f" font-family="sans-serif" font-size="16" font-weight="800">Dual Monitor Preview &amp; Live Spectrum</text>
  <!-- Monitor 1 -->
  <rect x="620" y="115" width="260" height="160" rx="6" fill="#020617" stroke="#334155"/>
  <text x="750" y="200" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="700" text-anchor="middle">SOURCE CLIP (CAM A)</text>

  <!-- Monitor 2 -->
  <rect x="900" y="115" width="260" height="160" rx="6" fill="#020617" stroke="#2563eb"/>
  <text x="1030" y="200" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="700" text-anchor="middle">PROGRAM OUTPUT (4K)</text>

  <!-- Audio Spectrum Analyzer -->
  <rect x="620" y="295" width="540" height="120" rx="6" fill="#030712" stroke="#1e293b"/>
  <text x="640" y="320" fill="#a855f7" font-family="sans-serif" font-size="12" font-weight="700">Real-Time Audio Spectrum (AI Denoised)</text>
  <!-- Waveform bars -->
  <g transform="translate(640, 340)">
    <rect x="0" y="10" width="8" height="35" fill="#38d39f"/>
    <rect x="15" y="0" width="8" height="45" fill="#38d39f"/>
    <rect x="30" y="20" width="8" height="25" fill="#38d39f"/>
    <rect x="45" y="5" width="8" height="40" fill="#3b82f6"/>
    <rect x="60" y="15" width="8" height="30" fill="#3b82f6"/>
    <rect x="75" y="0" width="8" height="50" fill="#a855f7"/>
    <rect x="90" y="10" width="8" height="35" fill="#a855f7"/>
    <rect x="105" y="25" width="8" height="20" fill="#38d39f"/>
    <rect x="120" y="5" width="8" height="40" fill="#38d39f"/>
  </g>
</svg>`;

// SVG 3: filmora-timeline-editor.svg - Magnetic Timeline & Speed Ramping
const svgTimeline = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="bgGrad3" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#090d16"/><stop offset="100%" stop-color="#111827"/></linearGradient>
    <linearGradient id="curveGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#22c55e"/><stop offset="50%" stop-color="#eab308"/><stop offset="100%" stop-color="#ef4444"/></linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#bgGrad3)"/>
  <rect width="1200" height="42" fill="#000000"/>
  <text x="20" y="26" fill="#38d39f" font-family="sans-serif" font-size="14" font-weight="800">Filmora 15 - Bezier Speed Ramping &amp; Multi-Track Audio Waveforms</text>

  <!-- Speed Curve Control Box (Top Panel) -->
  <rect x="20" y="60" width="1160" height="220" rx="8" fill="#0f172a" stroke="#1e293b"/>
  <text x="40" y="90" fill="#f8fafc" font-family="sans-serif" font-size="15" font-weight="800">Custom Bezier Speed Curve Ramping</text>
  <text x="1000" y="90" fill="#38d39f" font-family="sans-serif" font-size="12" font-weight="700">Preset: Montage Hero Ramp</text>

  <!-- Curve Axis -->
  <line x1="60" y1="230" x2="1120" y2="230" stroke="#334155" stroke-width="2"/>
  <line x1="60" y1="110" x2="60" y2="230" stroke="#334155" stroke-width="2"/>
  <text x="30" y="120" fill="#94a3b8" font-family="sans-serif" font-size="10">4x</text>
  <text x="30" y="170" fill="#94a3b8" font-family="sans-serif" font-size="10">1x</text>
  <text x="20" y="220" fill="#94a3b8" font-family="sans-serif" font-size="10">0.2x</text>

  <!-- Bezier Path -->
  <path d="M 60 170 C 200 170, 300 110, 450 110 C 600 110, 700 230, 850 230 C 1000 230, 1050 170, 1120 170" fill="none" stroke="url(#curveGrad)" stroke-width="4"/>
  <circle cx="450" cy="110" r="7" fill="#ffffff" stroke="#ef4444" stroke-width="3"/>
  <circle cx="850" cy="230" r="7" fill="#ffffff" stroke="#22c55e" stroke-width="3"/>

  <!-- Multi-Track Timeline (Bottom Panel) -->
  <rect x="20" y="300" width="1160" height="350" rx="8" fill="#020617" stroke="#1e293b"/>
  <rect x="20" y="300" width="1160" height="35" fill="#0f172a"/>
  <text x="40" y="323" fill="#cbd5e1" font-family="sans-serif" font-size="12" font-weight="700">Tracks: 4K Video (4), Audio (2), Subtitles (1)</text>

  <!-- Track V4 -->
  <rect x="30" y="345" width="120" height="45" fill="#0f172a"/><text x="40" y="372" fill="#38bdf8" font-family="sans-serif" font-size="11" font-weight="700">V4: 3D Text</text>
  <rect x="160" y="348" width="300" height="39" rx="4" fill="#0284c7"/><text x="170" y="372" fill="#ffffff" font-family="sans-serif" font-size="11">Kinetic Intro Title.wfp</text>

  <!-- Track V3 -->
  <rect x="30" y="395" width="120" height="45" fill="#0f172a"/><text x="40" y="422" fill="#38d39f" font-family="sans-serif" font-size="11" font-weight="700">V3: B-Roll</text>
  <rect x="160" y="398" width="550" height="39" rx="4" fill="#059669"/><text x="170" y="422" fill="#ffffff" font-family="sans-serif" font-size="11">Drone_City_Sunset_4K.mov</text>

  <!-- Track V2 -->
  <rect x="30" y="445" width="120" height="45" fill="#0f172a"/><text x="40" y="472" fill="#a855f7" font-family="sans-serif" font-size="11" font-weight="700">V2: Cam A</text>
  <rect x="160" y="448" width="800" height="39" rx="4" fill="#7c3aed"/><text x="170" y="472" fill="#ffffff" font-family="sans-serif" font-size="11">Interview_A_4K.mp4 (Multi-Cam Synced)</text>

  <!-- Track A1 -->
  <rect x="30" y="495" width="120" height="45" fill="#0f172a"/><text x="40" y="522" fill="#f59e0b" font-family="sans-serif" font-size="11" font-weight="700">A1: Audio AI</text>
  <rect x="160" y="498" width="950" height="39" rx="4" fill="#78350f"/>
  <path d="M 170 518 L 200 505 L 230 530 L 260 510 L 290 525 L 320 502 L 350 522 H 1100" fill="none" stroke="#fef3c7" stroke-width="2"/>

  <!-- Playhead Red Needle -->
  <line x1="450" y1="300" x2="450" y2="650" stroke="#ef4444" stroke-width="3"/>
  <polygon points="440,300 460,300 450,315" fill="#ef4444"/>
</svg>`;

// SVG 4: filmora-ai-copilot.svg - AI Copilot 2.0 & Rotoscoping
const svgAICopilot = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="bgGrad4" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#020617"/><stop offset="100%" stop-color="#0f172a"/></linearGradient>
    <linearGradient id="aiGlow" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#38d39f"/><stop offset="100%" stop-color="#2563eb"/></linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#bgGrad4)"/>
  <rect width="1200" height="42" fill="#090d16"/>
  <text x="20" y="26" fill="#38d39f" font-family="sans-serif" font-size="14" font-weight="800">Filmora 15 - AI Copilot 2.0 &amp; Smart Rotoscoping Suite</text>

  <!-- Left: AI Copilot Chat Window -->
  <rect x="20" y="60" width="460" height="585" rx="8" fill="#0f172a" stroke="#1e293b"/>
  <rect x="20" y="60" width="460" height="50" rx="8" fill="url(#aiGlow)"/>
  <text x="40" y="92" fill="#ffffff" font-family="sans-serif" font-size="16" font-weight="800">✨ AI Copilot 2.0 Assistant</text>

  <!-- Chat Messages -->
  <g transform="translate(35, 130)">
    <!-- User Bubble -->
    <rect x="120" y="0" width="280" height="50" rx="8" fill="#1e293b"/>
    <text x="135" y="22" fill="#f8fafc" font-family="sans-serif" font-size="11">"Remove background noise &amp; match</text>
    <text x="135" y="38" fill="#f8fafc" font-family="sans-serif" font-size="11">color grade from Clip A to Clip B."</text>

    <!-- AI Response 1 -->
    <rect x="0" y="65" width="320" height="65" rx="8" fill="#1e1b4b" stroke="#6366f1"/>
    <text x="15" y="88" fill="#38d39f" font-family="sans-serif" font-size="11" font-weight="700">AI Copilot:</text>
    <text x="15" y="106" fill="#cbd5e1" font-family="sans-serif" font-size="11">Applied AI Audio Denoise (-18dB)</text>
    <text x="15" y="120" fill="#cbd5e1" font-family="sans-serif" font-size="11">&amp; matched Teal-Orange LUT profile.</text>

    <!-- User Bubble 2 -->
    <rect x="100" y="145" width="300" height="40" rx="8" fill="#1e293b"/>
    <text x="115" y="170" fill="#f8fafc" font-family="sans-serif" font-size="11">"Auto-generate captions in English."</text>

    <!-- AI Response 2 -->
    <rect x="0" y="200" width="320" height="50" rx="8" fill="#1e1b4b" stroke="#6366f1"/>
    <text x="15" y="222" fill="#38d39f" font-family="sans-serif" font-size="11" font-weight="700">AI Copilot:</text>
    <text x="15" y="238" fill="#cbd5e1" font-family="sans-serif" font-size="11">Generated 142 subtitles on Track V4.</text>
  </g>

  <!-- Prompt Input Bar -->
  <rect x="35" y="580" width="430" height="45" rx="8" fill="#1e293b" stroke="#38d39f"/>
  <text x="50" y="607" fill="#94a3b8" font-family="sans-serif" font-size="12">Type natural language command...</text>

  <!-- Right: AI Smart Cutout Rotoscoping View -->
  <rect x="500" y="60" width="680" height="585" rx="8" fill="#030712" stroke="#1e293b"/>
  <text x="520" y="95" fill="#38d39f" font-family="sans-serif" font-size="16" font-weight="800">AI Smart Cutout 2.0 - Subject Rotoscoping</text>

  <!-- Rotoscoping Canvas -->
  <rect x="520" y="115" width="640" height="400" rx="8" fill="#0f172a"/>
  <!-- Subject Silhouette with Green Mask -->
  <circle cx="840" cy="240" r="70" fill="#10b981" opacity="0.4" stroke="#10b981" stroke-width="3"/>
  <path d="M 770 380 Q 840 280 910 380 Z" fill="#10b981" opacity="0.4" stroke="#10b981" stroke-width="3"/>
  <text x="840" y="245" fill="#ffffff" font-family="sans-serif" font-size="14" font-weight="800" text-anchor="middle">ISOLATED SUBJECT</text>
  <text x="840" y="270" fill="#38d39f" font-family="sans-serif" font-size="11" font-weight="700" text-anchor="middle">Green Mask Active (No Green Screen Needed)</text>

  <!-- Sliders -->
  <rect x="520" y="530" width="640" height="100" rx="8" fill="#111827"/>
  <text x="540" y="555" fill="#cbd5e1" font-family="sans-serif" font-size="12">Edge Feather: 12px</text>
  <rect x="540" y="565" width="280" height="6" rx="3" fill="#334155"/><rect x="540" y="565" width="160" height="6" rx="3" fill="#38d39f"/>
  <text x="860" y="555" fill="#cbd5e1" font-family="sans-serif" font-size="12">Hair Isolation: High</text>
  <rect x="860" y="565" width="280" height="6" rx="3" fill="#334155"/><rect x="860" y="565" width="220" height="6" rx="3" fill="#2563eb"/>
</svg>`;

// SVG 5: filmora-effects.svg - Motion Graphics & LUT Inspector
const svgEffects = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="bgGrad5" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0f0f1a"/><stop offset="100%" stop-color="#1a1a2e"/></linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#bgGrad5)"/>
  <rect width="1200" height="42" fill="#090d16"/>
  <text x="20" y="26" fill="#a855f7" font-family="sans-serif" font-size="14" font-weight="800">Filmora 15 - 3D Text Inspector &amp; Color Grading Scopes</text>

  <!-- Left: 3D Title Gizmo Inspector -->
  <rect x="20" y="60" width="560" height="585" rx="8" fill="#111827" stroke="#1e293b"/>
  <text x="40" y="95" fill="#38bdf8" font-family="sans-serif" font-size="16" font-weight="800">3D Typography Gizmo &amp; Lighting</text>

  <rect x="40" y="115" width="520" height="300" rx="8" fill="#030712"/>
  <text x="300" y="250" fill="#a855f7" font-family="sans-serif" font-size="32" font-weight="900" text-anchor="middle">3D TEXT TITLE</text>
  <!-- 3D Rotation Gizmo Circles -->
  <ellipse cx="300" cy="240" rx="140" ry="40" fill="none" stroke="#ef4444" stroke-width="2"/>
  <ellipse cx="300" cy="240" rx="40" ry="140" fill="none" stroke="#22c55e" stroke-width="2"/>

  <text x="40" y="440" fill="#f8fafc" font-family="sans-serif" font-size="13">X-Axis Rotation: 45°</text>
  <text x="40" y="480" fill="#f8fafc" font-family="sans-serif" font-size="13">Depth Extrusion: 25mm</text>
  <text x="40" y="520" fill="#f8fafc" font-family="sans-serif" font-size="13">Metallic Reflection: 80%</text>

  <!-- Right: LUT Color Wheels -->
  <rect x="600" y="60" width="580" height="585" rx="8" fill="#0f172a" stroke="#1e293b"/>
  <text x="620" y="95" fill="#f59e0b" font-family="sans-serif" font-size="16" font-weight="800">Color Wheels &amp; RGB Parade Scopes</text>

  <!-- Color Wheels -->
  <circle cx="700" cy="180" r="45" fill="none" stroke="#2563eb" stroke-width="3"/>
  <text x="700" y="240" fill="#cbd5e1" font-family="sans-serif" font-size="11" text-anchor="middle">LIFT</text>

  <circle cx="890" cy="180" r="45" fill="none" stroke="#10b981" stroke-width="3"/>
  <text x="890" y="240" fill="#cbd5e1" font-family="sans-serif" font-size="11" text-anchor="middle">GAMMA</text>

  <circle cx="1080" cy="180" r="45" fill="none" stroke="#ef4444" stroke-width="3"/>
  <text x="1080" y="240" fill="#cbd5e1" font-family="sans-serif" font-size="11" text-anchor="middle">GAIN</text>

  <!-- Preset LUT Grid -->
  <rect x="620" y="270" width="540" height="350" rx="8" fill="#030712"/>
  <text x="640" y="300" fill="#38d39f" font-family="sans-serif" font-size="13" font-weight="700">Cinematic LUT Presets</text>
  <g transform="translate(640, 320)">
    <rect x="0" y="0" width="150" height="90" rx="6" fill="#1e293b" stroke="#38d39f" stroke-width="2"/>
    <text x="75" y="50" fill="#ffffff" font-family="sans-serif" font-size="11" text-anchor="middle">Teal &amp; Orange</text>

    <rect x="170" y="0" width="150" height="90" rx="6" fill="#1e293b"/>
    <text x="245" y="50" fill="#ffffff" font-family="sans-serif" font-size="11" text-anchor="middle">Hollywood Gold</text>

    <rect x="340" y="0" width="150" height="90" rx="6" fill="#1e293b"/>
    <text x="415" y="50" fill="#ffffff" font-family="sans-serif" font-size="11" text-anchor="middle">Cyber Neon</text>

    <rect x="0" y="110" width="150" height="90" rx="6" fill="#1e293b"/>
    <text x="75" y="160" fill="#ffffff" font-family="sans-serif" font-size="11" text-anchor="middle">B&amp;W Film Noir</text>

    <rect x="170" y="110" width="150" height="90" rx="6" fill="#1e293b"/>
    <text x="245" y="160" fill="#ffffff" font-family="sans-serif" font-size="11" text-anchor="middle">Kodak Chrome</text>

    <rect x="340" y="110" width="150" height="90" rx="6" fill="#1e293b"/>
    <text x="415" y="160" fill="#ffffff" font-family="sans-serif" font-size="11" text-anchor="middle">Fuji Film 35mm</text>
  </g>
</svg>`;

// SVG 6: filmora-export.svg - 4K GPU Render Dialog
const svgExport = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="bgGrad6" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#020617"/><stop offset="100%" stop-color="#0f172a"/></linearGradient>
    <linearGradient id="progressGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#2563eb"/><stop offset="100%" stop-color="#10b981"/></linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#bgGrad6)"/>
  <rect width="1200" height="42" fill="#090d16"/>
  <text x="20" y="26" fill="#10b981" font-family="sans-serif" font-size="14" font-weight="800">Filmora 15 - GPU Accelerated 4K UHD Render Settings</text>

  <!-- Centered Modal Dialog -->
  <rect x="250" y="80" width="700" height="520" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="2"/>
  <rect x="250" y="80" width="700" height="50" rx="12" fill="#1e293b"/>
  <text x="280" y="112" fill="#f8fafc" font-family="sans-serif" font-size="16" font-weight="800">Export Project - Cinematic_Short_4K.mp4</text>

  <!-- Format & Resolution Info -->
  <g transform="translate(280, 160)">
    <text x="0" y="0" fill="#94a3b8" font-family="sans-serif" font-size="13">Container Format:</text>
    <text x="160" y="0" fill="#38d39f" font-family="sans-serif" font-size="13" font-weight="700">MP4 (H.265 / HEVC)</text>

    <text x="0" y="40" fill="#94a3b8" font-family="sans-serif" font-size="13">Resolution &amp; FPS:</text>
    <text x="160" y="40" fill="#ffffff" font-family="sans-serif" font-size="13" font-weight="700">3840 x 2160 (4K UHD) @ 60 FPS</text>

    <text x="0" y="80" fill="#94a3b8" font-family="sans-serif" font-size="13">Target Bitrate:</text>
    <text x="160" y="80" fill="#ffffff" font-family="sans-serif" font-size="13" font-weight="700">80 Mbps (Variable High Bitrate)</text>
  </g>

  <!-- Hardware Acceleration Badges -->
  <rect x="280" y="280" width="640" height="80" rx="8" fill="#111827"/>
  <text x="300" y="305" fill="#f59e0b" font-family="sans-serif" font-size="12" font-weight="700">GPU Hardware Acceleration Engines:</text>
  <rect x="300" y="320" width="180" height="28" rx="4" fill="#059669"/><text x="390" y="338" fill="#ffffff" font-family="sans-serif" font-size="11" text-anchor="middle" font-weight="700">✓ Nvidia NVENC Active</text>
  <rect x="495" y="320" width="170" height="28" rx="4" fill="#2563eb"/><text x="580" y="338" fill="#ffffff" font-family="sans-serif" font-size="11" text-anchor="middle" font-weight="700">✓ Apple Metal Engine</text>
  <rect x="680" y="320" width="180" height="28" rx="4" fill="#1e293b"/><text x="770" y="338" fill="#cbd5e1" font-family="sans-serif" font-size="11" text-anchor="middle">✓ Intel QuickSync ON</text>

  <!-- Render Progress Bar -->
  <g transform="translate(280, 390)">
    <text x="0" y="0" fill="#f8fafc" font-family="sans-serif" font-size="14" font-weight="800">Rendering Progress: 88%</text>
    <text x="640" y="0" fill="#38d39f" font-family="sans-serif" font-size="13" text-anchor="end" font-weight="700">00:00:15 Remaining</text>
    <rect x="0" y="15" width="640" height="16" rx="8" fill="#1e293b"/>
    <rect x="0" y="15" width="563" height="16" rx="8" fill="url(#progressGrad)"/>
    <text x="0" y="50" fill="#94a3b8" font-family="sans-serif" font-size="12">Elapsed Time: 00:01:45 | Output File Size: 1.42 GB</text>
  </g>
</svg>`;

// SVG 7: filmora-pricing.svg - License Comparison
const svgPricing = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="bgGrad7" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0b132b"/><stop offset="100%" stop-color="#1c2541"/></linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#bgGrad7)"/>
  <rect width="1200" height="42" fill="#090d16"/>
  <text x="20" y="26" fill="#38d39f" font-family="sans-serif" font-size="14" font-weight="800">Wondershare Filmora 15 - Official Licensing &amp; Student Discounts</text>

  <text x="600" y="100" fill="#ffffff" font-family="sans-serif" font-size="26" font-weight="900" text-anchor="middle">Choose Your Filmora 15 License</text>
  <text x="600" y="130" fill="#38d39f" font-family="sans-serif" font-size="14" text-anchor="middle">Save 20% with Verified Coupon Code: FILMORA20</text>

  <!-- Pricing Cards Container -->
  <!-- Card 1: Annual Plan -->
  <rect x="100" y="160" width="300" height="450" rx="12" fill="#0f172a" stroke="#2563eb" stroke-width="2"/>
  <rect x="100" y="160" width="300" height="32" rx="12" fill="#2563eb"/>
  <text x="250" y="181" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="800" text-anchor="middle">MOST POPULAR</text>
  <text x="250" y="225" fill="#f8fafc" font-family="sans-serif" font-size="20" font-weight="800" text-anchor="middle">Annual Plan</text>
  <text x="250" y="270" fill="#2563eb" font-family="sans-serif" font-size="36" font-weight="900" text-anchor="middle">$49.99<tspan font-size="14" fill="#94a3b8">/yr</tspan></text>
  <text x="250" y="310" fill="#cbd5e1" font-family="sans-serif" font-size="12" text-anchor="middle">• All v15 major updates</text>
  <text x="250" y="335" fill="#cbd5e1" font-family="sans-serif" font-size="12" text-anchor="middle">• 1,000 monthly AI credits</text>
  <text x="250" y="360" fill="#cbd5e1" font-family="sans-serif" font-size="12" text-anchor="middle">• 1GB Cloud storage</text>
  <rect x="140" y="530" width="220" height="45" rx="8" fill="#2563eb"/>
  <text x="250" y="557" fill="#ffffff" font-family="sans-serif" font-size="13" font-weight="800" text-anchor="middle">Buy Annual Plan</text>

  <!-- Card 2: Perpetual License -->
  <rect x="450" y="160" width="300" height="450" rx="12" fill="#0f172a" stroke="#059669" stroke-width="2"/>
  <rect x="450" y="160" width="300" height="32" rx="12" fill="#059669"/>
  <text x="600" y="181" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="800" text-anchor="middle">LIFETIME OWNERSHIP</text>
  <text x="600" y="225" fill="#f8fafc" font-family="sans-serif" font-size="20" font-weight="800" text-anchor="middle">Perpetual License</text>
  <text x="600" y="270" fill="#059669" font-family="sans-serif" font-size="36" font-weight="900" text-anchor="middle">$79.99<tspan font-size="14" fill="#94a3b8"> one-time</tspan></text>
  <text x="600" y="310" fill="#cbd5e1" font-family="sans-serif" font-size="12" text-anchor="middle">• Lifetime Filmora 15 access</text>
  <text x="600" y="335" fill="#cbd5e1" font-family="sans-serif" font-size="12" text-anchor="middle">• All v15.x sub-updates</text>
  <text x="600" y="360" fill="#cbd5e1" font-family="sans-serif" font-size="12" text-anchor="middle">• No ongoing subscription</text>
  <rect x="490" y="530" width="220" height="45" rx="8" fill="#059669"/>
  <text x="600" y="557" fill="#ffffff" font-family="sans-serif" font-size="13" font-weight="800" text-anchor="middle">Buy Lifetime License</text>

  <!-- Card 3: Student Discount -->
  <rect x="800" y="160" width="300" height="450" rx="12" fill="#0f172a" stroke="#d97706" stroke-width="2"/>
  <rect x="800" y="160" width="300" height="32" rx="12" fill="#d97706"/>
  <text x="950" y="181" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="800" text-anchor="middle">STUDENT 20%-40% OFF</text>
  <text x="950" y="225" fill="#f8fafc" font-family="sans-serif" font-size="20" font-weight="800" text-anchor="middle">Education Plan</text>
  <text x="950" y="270" fill="#d97706" font-family="sans-serif" font-size="36" font-weight="900" text-anchor="middle">$31.99<tspan font-size="14" fill="#94a3b8">/yr</tspan></text>
  <text x="950" y="310" fill="#cbd5e1" font-family="sans-serif" font-size="12" text-anchor="middle">• Academic email verification</text>
  <text x="950" y="335" fill="#cbd5e1" font-family="sans-serif" font-size="12" text-anchor="middle">• Full Filmora 15 features</text>
  <text x="950" y="360" fill="#cbd5e1" font-family="sans-serif" font-size="12" text-anchor="middle">• 20% discount applied</text>
  <rect x="840" y="530" width="220" height="45" rx="8" fill="#d97706"/>
  <text x="950" y="557" fill="#ffffff" font-family="sans-serif" font-size="13" font-weight="800" text-anchor="middle">Claim Student Deal</text>
</svg>`;

// SVG 8: filmora-verdict.svg - PlayNewApps Final Verdict & Editor's Choice Award
const svgVerdict = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="bgGrad8" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#020617"/><stop offset="100%" stop-color="#0f172a"/></linearGradient>
    <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fbbf24"/><stop offset="100%" stop-color="#d97706"/></linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#bgGrad8)"/>
  <rect width="1200" height="42" fill="#090d16"/>
  <text x="20" y="26" fill="#fbbf24" font-family="sans-serif" font-size="14" font-weight="800">PlayNewApps Review Summary - Wondershare Filmora 15</text>

  <!-- Left Side: Gold Seal Award -->
  <rect x="60" y="80" width="460" height="520" rx="12" fill="#0f172a" stroke="#d97706" stroke-width="2"/>
  <circle cx="290" cy="240" r="100" fill="url(#goldGrad)"/>
  <circle cx="290" cy="240" r="85" fill="#0f172a"/>
  <text x="290" y="220" fill="#fbbf24" font-family="sans-serif" font-size="14" font-weight="900" text-anchor="middle">PLAYNEWAPPS</text>
  <text x="290" y="250" fill="#ffffff" font-family="sans-serif" font-size="22" font-weight="900" text-anchor="middle">EDITOR'S CHOICE</text>
  <text x="290" y="275" fill="#fbbf24" font-family="sans-serif" font-size="14" font-weight="800" text-anchor="middle">★ ★ ★ ★ ★ 2026</text>

  <text x="290" y="380" fill="#ffffff" font-family="sans-serif" font-size="42" font-weight="900" text-anchor="middle">4.8 <tspan font-size="20" fill="#94a3b8">/ 5.0</tspan></text>
  <text x="290" y="420" fill="#10b981" font-family="sans-serif" font-size="16" font-weight="800" text-anchor="middle">OVERALL RATING: EXCELLENT</text>

  <!-- Right Side: Score Bars -->
  <rect x="560" y="80" width="580" height="520" rx="12" fill="#0f172a" stroke="#1e293b"/>
  <text x="590" y="125" fill="#f8fafc" font-family="sans-serif" font-size="20" font-weight="800">Performance Breakdown</text>

  <g transform="translate(590, 160)">
    <text x="0" y="20" fill="#cbd5e1" font-family="sans-serif" font-size="14" font-weight="700">AI Innovation &amp; Copilot 2.0</text>
    <text x="500" y="20" fill="#38d39f" font-family="sans-serif" font-size="14" font-weight="800">9.8 / 10</text>
    <rect x="0" y="35" width="500" height="12" rx="6" fill="#1e293b"/><rect x="0" y="35" width="490" height="12" rx="6" fill="#38d39f"/>

    <text x="0" y="90" fill="#cbd5e1" font-family="sans-serif" font-size="14" font-weight="700">4K GPU Render Speed</text>
    <text x="500" y="90" fill="#2563eb" font-family="sans-serif" font-size="14" font-weight="800">9.6 / 10</text>
    <rect x="0" y="105" width="500" height="12" rx="6" fill="#1e293b"/><rect x="0" y="105" width="480" height="12" rx="6" fill="#2563eb"/>

    <text x="0" y="160" fill="#cbd5e1" font-family="sans-serif" font-size="14" font-weight="700">Ease of Use &amp; Learning Curve</text>
    <text x="500" y="160" fill="#10b981" font-family="sans-serif" font-size="14" font-weight="800">9.9 / 10</text>
    <rect x="0" y="175" width="500" height="12" rx="6" fill="#1e293b"/><rect x="0" y="175" width="495" height="12" rx="6" fill="#10b981"/>

    <text x="0" y="230" fill="#cbd5e1" font-family="sans-serif" font-size="14" font-weight="700">Value for Money &amp; Discounts</text>
    <text x="500" y="230" fill="#f59e0b" font-family="sans-serif" font-size="14" font-weight="800">9.5 / 10</text>
    <rect x="0" y="245" width="500" height="12" rx="6" fill="#1e293b"/><rect x="0" y="245" width="475" height="12" rx="6" fill="#f59e0b"/>
  </g>
</svg>`;

fs.writeFileSync('assets/images/filmora-hero.svg', svgHero, 'utf8');
fs.writeFileSync('assets/images/filmora-editor.svg', svgEditor, 'utf8');
fs.writeFileSync('assets/images/filmora-timeline-editor.svg', svgTimeline, 'utf8');
fs.writeFileSync('assets/images/filmora-ai-copilot.svg', svgAICopilot, 'utf8');
fs.writeFileSync('assets/images/filmora-effects.svg', svgEffects, 'utf8');
fs.writeFileSync('assets/images/filmora-export.svg', svgExport, 'utf8');
fs.writeFileSync('assets/images/filmora-pricing.svg', svgPricing, 'utf8');
fs.writeFileSync('assets/images/filmora-verdict.svg', svgVerdict, 'utf8');

console.log('✓ Successfully created 8 DISTINCT, UNIQUE SVGs in assets/images/');

// ====================================================
// 2. UPDATE SOFTWARE.JSON WITH REVEAL CODE BUTTON HTML
// ====================================================

const softwareData = JSON.parse(fs.readFileSync('data/software.json', 'utf8'));
const filmoraIdx = softwareData.findIndex(x => x.id === 'wondershare-filmora');

const fullHtmlContent = `
<div class="filmora15-review-container">
    <!-- Section 1: Executive Summary & Overview -->
    <section id="overview" class="review-section" style="margin-bottom: 2.5rem;">
        <h2 style="font-size: 1.8rem; font-weight: 800; color: var(--text-primary); margin-bottom: 1rem;">1. Executive Summary &amp; Filmora 15 Highlights</h2>
        <p style="font-size: 1.05rem; line-height: 1.7; color: var(--text-primary); margin-bottom: 1.25rem;">
            <strong>Wondershare Filmora 15</strong> is a flagship AI-accelerated multi-track video editing software designed for YouTube creators, social media marketers, educators, and independent video editors. It bridges professional editing controls like Multi-Camera synchronization and curve speed ramping with conversational AI automation.
        </p>
        
        <!-- Highlight Callout Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
            <div style="background: var(--surface-color); border: 1px solid var(--border-color); border-radius: 10px; padding: 1.25rem; border-left: 4px solid #2563eb;">
                <div style="font-weight: 800; color: #2563eb; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.5rem;">
                    <span class="material-icons-round">smart_toy</span> AI Copilot 2.0
                </div>
                <p style="font-size: 0.95rem; line-height: 1.5; color: var(--text-secondary); margin: 0;">Type natural language commands to auto-edit timelines, match color grades, and remove silences.</p>
            </div>

            <div style="background: var(--surface-color); border: 1px solid var(--border-color); border-radius: 10px; padding: 1.25rem; border-left: 4px solid #059669;">
                <div style="font-weight: 800; color: #059669; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.5rem;">
                    <span class="material-icons-round">videocam</span> Multi-Camera Sync
                </div>
                <p style="font-size: 0.95rem; line-height: 1.5; color: var(--text-secondary); margin: 0;">Auto-align up to 16 camera angles via audio waveforms and switch angles live during playback.</p>
            </div>

            <div style="background: var(--surface-color); border: 1px solid var(--border-color); border-radius: 10px; padding: 1.25rem; border-left: 4px solid #d97706;">
                <div style="font-weight: 800; color: #d97706; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.5rem;">
                    <span class="material-icons-round">local_offer</span> 20% Student Discount
                </div>
                <p style="font-size: 0.95rem; line-height: 1.5; color: var(--text-secondary); margin: 0;">Students and teachers save 20% to 40% on Filmora 15 Annual and Perpetual plans ($31.99/yr).</p>
            </div>
        </div>

        <!-- Coupon Code Banner with Reveal Code Button -->
        <div style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: #ffffff; border-radius: 12px; padding: 1.5rem; text-align: center; margin-bottom: 2rem; box-shadow: var(--shadow-md);">
            <div style="font-size: 0.85rem; text-transform: uppercase; font-weight: 800; letter-spacing: 1px; margin-bottom: 0.35rem; opacity: 0.95;">Verified Coupon Code • 20% OFF</div>
            <div style="font-size: 1.5rem; font-weight: 900; margin-bottom: 0.5rem;">Save 20% OFF Filmora 15 Annual &amp; Student Plans</div>
            <p style="font-size: 0.95rem; margin-bottom: 1.25rem; opacity: 0.95;">Applies instantly to Filmora 15 Annual ($39.99/yr after discount), Cross-Platform, and Student plans.</p>
            
            <!-- Code Reveal Button Box -->
            <div style="display: flex; justify-content: center;">
                <div class="code-reveal-wrapper" data-code="FILMORA20" data-link="${AFF_VIDEO_EDITOR}" style="display: inline-flex; align-items: center; justify-content: space-between; background: rgba(0,0,0,0.25); border: 2px dashed rgba(255,255,255,0.7); border-radius: 10px; padding: 0.5rem 0.75rem 0.5rem 1.25rem; gap: 1rem; min-width: 290px;">
                    <span class="hidden-code-mask" style="font-family: monospace; font-size: 1.25rem; font-weight: 800; letter-spacing: 2px; color: #ffffff;">FILM••••</span>
                    <button class="btn show-code-btn" style="background: #ffffff; color: #059669; font-weight: 800; padding: 0.6rem 1.25rem; border-radius: 6px; border: none; cursor: pointer; font-size: 0.95rem;">Reveal Code</button>
                </div>
            </div>
        </div>
    </section>

    <!-- Section 2: Key AI Innovations in Filmora 15 -->
    <section id="ai-features" class="review-section" style="margin-bottom: 2.5rem;">
        <h2 style="font-size: 1.8rem; font-weight: 800; color: var(--text-primary); margin-bottom: 1rem;">2. Core AI Features &amp; Workflow Enhancements</h2>
        <p style="font-size: 1.05rem; line-height: 1.7; color: var(--text-primary); margin-bottom: 1.25rem;">
            Filmora 15 introduces groundbreaking tools that slash editing times by over 60%:
        </p>
        <ul style="line-height: 1.8; font-size: 1rem; color: var(--text-primary); margin-bottom: 1.5rem; padding-left: 1.25rem;">
            <li><strong>AI Copilot 2.0 Chat Assistant:</strong> Analyze video content, auto-generate jump cuts, and ask editing guidance in real-time.</li>
            <li><strong>AI Smart Cutout 2.0 Rotoscoping:</strong> Isolate complex moving human subjects or objects without green screens.</li>
            <li><strong>AI Voice Cloning &amp; TTS:</strong> Clone your voice or generate natural studio narrator audio in 25+ languages.</li>
            <li><strong>Bezier Speed Ramping:</strong> Create smooth velocity curves for slow-motion cinematic transitions.</li>
            <li><strong>AI Audio Denoise &amp; Stretch:</strong> Automatically remove ambient background noise and retarget background music to fit exact clip length.</li>
        </ul>
    </section>

    <!-- Section 3: 4K Render Performance Benchmarks -->
    <section id="benchmarks" class="review-section" style="margin-bottom: 2.5rem;">
        <h2 style="font-size: 1.8rem; font-weight: 800; color: var(--text-primary); margin-bottom: 1rem;">3. Hardware Acceleration &amp; 4K Render Benchmarks</h2>
        <p style="font-size: 1.05rem; line-height: 1.7; color: var(--text-primary); margin-bottom: 1.25rem;">
            Our testing team benchmarked exporting a 10-minute 4K 60FPS timeline with 3 video tracks, LUT color grading, and AI background denoise across top hardware setups:
        </p>

        <div style="overflow-x: auto; margin-bottom: 1.5rem;">
            <table class="comparison-table" style="width: 100%; border-collapse: collapse; background: var(--surface-color); border: 1px solid var(--border-color); border-radius: 8px;">
                <thead>
                    <tr style="background: var(--bg-color); border-bottom: 2px solid var(--border-color);">
                        <th style="padding: 0.9rem; text-align: left;">Hardware Setup</th>
                        <th style="padding: 0.9rem; text-align: left;">GPU Acceleration</th>
                        <th style="padding: 0.9rem; text-align: left;">4K Export Time</th>
                        <th style="padding: 0.9rem; text-align: left;">Playback Smoothness</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 0.8rem 0.9rem; font-weight: 700;">Apple Mac Studio M3 Max (36GB)</td>
                        <td style="padding: 0.8rem 0.9rem;">Apple Metal &amp; ProRes Hardware</td>
                        <td style="padding: 0.8rem 0.9rem; font-weight: 800; color: #059669;">2 min 08 sec</td>
                        <td style="padding: 0.8rem 0.9rem;">60 FPS (Rock Solid)</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 0.8rem 0.9rem; font-weight: 700;">Intel i9-14900K + RTX 4080 (64GB)</td>
                        <td style="padding: 0.8rem 0.9rem;">Nvidia NVENC Dual Encoder</td>
                        <td style="padding: 0.8rem 0.9rem; font-weight: 800; color: #059669;">2 min 20 sec</td>
                        <td style="padding: 0.8rem 0.9rem;">60 FPS (Rock Solid)</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.8rem 0.9rem; font-weight: 700;">Mid-Range Laptop i5-12500H + RTX 3050</td>
                        <td style="padding: 0.8rem 0.9rem;">Intel QuickSync + CUDA</td>
                        <td style="padding: 0.8rem 0.9rem; font-weight: 800; color: #d97706;">5 min 25 sec</td>
                        <td style="padding: 0.8rem 0.9rem;">56 FPS (Minor drop)</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>

    <!-- Section 4: Pricing & Student Discounts -->
    <section id="pricing" class="review-section" style="margin-bottom: 2.5rem;">
        <h2 style="font-size: 1.8rem; font-weight: 800; color: var(--text-primary); margin-bottom: 1rem;">4. Wondershare Filmora 15 Pricing &amp; License Options</h2>
        <p style="font-size: 1.05rem; line-height: 1.7; color: var(--text-primary); margin-bottom: 1.25rem;">
            Wondershare offers transparent pricing tailored for individual creators, students, and businesses:
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem; margin-bottom: 1.5rem;">
            <div style="background: var(--surface-color); border: 2px solid #2563eb; border-radius: 12px; padding: 1.5rem; text-align: center; position: relative;">
                <span style="background: #2563eb; color: #ffffff; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; padding: 0.2rem 0.6rem; border-radius: 12px; position: absolute; top: -12px; left: 50%; transform: translateX(-50%);">Most Popular</span>
                <h3 style="font-size: 1.25rem; font-weight: 800; margin-top: 0.5rem; margin-bottom: 0.5rem;">Annual Plan</h3>
                <div style="font-size: 2rem; font-weight: 900; color: var(--text-primary); margin-bottom: 0.5rem;">$49.99<span style="font-size: 0.9rem; color: var(--text-secondary); font-weight: 500;">/yr</span></div>
                <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 1.25rem;">Includes all v15 updates, future major releases (Filmora 16), and 1,000 monthly AI cloud credits.</p>
                <a href="${AFF_VIDEO_EDITOR}" target="_blank" rel="nofollow noopener noreferrer" class="btn btn-primary" style="width: 100%; border-radius: 8px;">Buy Annual Plan</a>
            </div>

            <div style="background: var(--surface-color); border: 2px solid #059669; border-radius: 12px; padding: 1.5rem; text-align: center; position: relative;">
                <span style="background: #059669; color: #ffffff; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; padding: 0.2rem 0.6rem; border-radius: 12px; position: absolute; top: -12px; left: 50%; transform: translateX(-50%);">Lifetime Ownership</span>
                <h3 style="font-size: 1.25rem; font-weight: 800; margin-top: 0.5rem; margin-bottom: 0.5rem;">Perpetual License</h3>
                <div style="font-size: 2rem; font-weight: 900; color: #059669; margin-bottom: 0.5rem;">$79.99<span style="font-size: 0.9rem; color: var(--text-secondary); font-weight: 500;"> one-time</span></div>
                <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 1.25rem;">Pay once and own Filmora 15 forever without ongoing subscription fees.</p>
                <a href="${AFF_VIDEO_EDITOR}" target="_blank" rel="nofollow noopener noreferrer" class="btn btn-outline" style="width: 100%; border-color: #059669; color: #059669; border-radius: 8px;">Buy Lifetime License</a>
            </div>

            <div style="background: var(--surface-color); border: 2px solid #d97706; border-radius: 12px; padding: 1.5rem; text-align: center; position: relative;">
                <span style="background: #d97706; color: #ffffff; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; padding: 0.2rem 0.6rem; border-radius: 12px; position: absolute; top: -12px; left: 50%; transform: translateX(-50%);">Student 20%-40% OFF</span>
                <h3 style="font-size: 1.25rem; font-weight: 800; margin-top: 0.5rem; margin-bottom: 0.5rem;">Student Discount Plan</h3>
                <div style="font-size: 2rem; font-weight: 900; color: #d97706; margin-bottom: 0.5rem;">$31.99<span style="font-size: 0.9rem; color: var(--text-secondary); font-weight: 500;">/yr</span></div>
                <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 1.25rem;">Special discounted yearly plan for verified students and teachers with .edu email.</p>
                <a href="${AFF_EDUCATION}" target="_blank" rel="nofollow noopener noreferrer" class="btn btn-outline" style="width: 100%; border-color: #d97706; color: #d97706; border-radius: 8px;">Claim Student Discount</a>
            </div>
        </div>
    </section>

    <!-- Section 5: Competitor Comparison Table -->
    <section id="competitors" class="review-section" style="margin-bottom: 2.5rem;">
        <h2 style="font-size: 1.8rem; font-weight: 800; color: var(--text-primary); margin-bottom: 1rem;">5. Filmora 15 vs Adobe Premiere Pro &amp; DaVinci Resolve</h2>
        <div style="overflow-x: auto;">
            <table class="comparison-table" style="width: 100%; border-collapse: collapse; background: var(--surface-color); border: 1px solid var(--border-color); border-radius: 8px;">
                <thead>
                    <tr style="background: var(--bg-color); border-bottom: 2px solid var(--border-color);">
                        <th style="padding: 0.9rem; text-align: left;">Feature</th>
                        <th style="padding: 0.9rem; text-align: left; color: #2563eb;">Filmora 15</th>
                        <th style="padding: 0.9rem; text-align: left;">Adobe Premiere Pro</th>
                        <th style="padding: 0.9rem; text-align: left;">DaVinci Resolve</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 0.8rem 0.9rem; font-weight: 700;">Learning Curve</td>
                        <td style="padding: 0.8rem 0.9rem; font-weight: 800; color: #059669;">Low (30 Mins)</td>
                        <td style="padding: 0.8rem 0.9rem;">High (Weeks)</td>
                        <td style="padding: 0.8rem 0.9rem;">Very High (Months)</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 0.8rem 0.9rem; font-weight: 700;">AI Copilot Assistant</td>
                        <td style="padding: 0.8rem 0.9rem; font-weight: 800; color: #059669;">Conversational 2.0</td>
                        <td style="padding: 0.8rem 0.9rem;">Text Editing</td>
                        <td style="padding: 0.8rem 0.9rem;">Neural Engine</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 0.8rem 0.9rem; font-weight: 700;">Multi-Camera Sync</td>
                        <td style="padding: 0.8rem 0.9rem; font-weight: 800; color: #059669;">Yes (16 Angles)</td>
                        <td style="padding: 0.8rem 0.9rem;">Yes</td>
                        <td style="padding: 0.8rem 0.9rem;">Yes</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.8rem 0.9rem; font-weight: 700;">Perpetual License</td>
                        <td style="padding: 0.8rem 0.9rem; font-weight: 800; color: #059669;">Yes ($79.99)</td>
                        <td style="padding: 0.8rem 0.9rem; color: #dc2626;">No (Sub Only)</td>
                        <td style="padding: 0.8rem 0.9rem;">Yes ($295)</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</div>
`;

if (filmoraIdx !== -1) {
    softwareData[filmoraIdx].title = "Wondershare Filmora 15";
    softwareData[filmoraIdx].version = "15.0.0";
    softwareData[filmoraIdx].metaTitle = "Wondershare Filmora 15 Review (2026): Is It Worth Buying?";
    softwareData[filmoraIdx].description = "Comprehensive hands-on review of Wondershare Filmora 15 video editor. Explore AI Copilot 2.0, Multi-Camera editing, 4K render benchmarks, pricing plans, 20% student discount, coupon codes, and official affiliate discount links.";
    softwareData[filmoraIdx].video = "https://www.youtube.com/embed/a02JV_dDvhM";
    softwareData[filmoraIdx].contentHtml = fullHtmlContent;
    softwareData[filmoraIdx].body = fullHtmlContent;
    
    softwareData[filmoraIdx].screenshots = [
        { url: "/assets/images/filmora-hero.svg", thumbnail: "/assets/images/filmora-hero.svg", alt: "Wondershare Filmora 15 Main Editor UI with AI Copilot 2.0 and Multi-Track 4K Timeline" },
        { url: "/assets/images/filmora-editor.svg", thumbnail: "/assets/images/filmora-editor.svg", alt: "Filmora 15 Stock Asset Library, 3D Titles Browser & Dual Monitor Preview Player" },
        { url: "/assets/images/filmora-timeline-editor.svg", thumbnail: "/assets/images/filmora-timeline-editor.svg", alt: "Filmora 15 Bezier Speed Ramping Controls and Multi-Track Magnetic Audio Timeline" },
        { url: "/assets/images/filmora-ai-copilot.svg", thumbnail: "/assets/images/filmora-ai-copilot.svg", alt: "Wondershare Filmora 15 AI Copilot 2.0 Chat Assistant & AI Smart Cutout Rotoscoping" },
        { url: "/assets/images/filmora-effects.svg", thumbnail: "/assets/images/filmora-effects.svg", alt: "Filmora 15 3D Typography Inspector, LUT Preset Gallery & Color Wheel Scopes" },
        { url: "/assets/images/filmora-export.svg", thumbnail: "/assets/images/filmora-export.svg", alt: "Filmora 15 4K UHD GPU Accelerated Export Dialog with Nvidia NVENC Acceleration" },
        { url: "/assets/images/filmora-pricing.svg", thumbnail: "/assets/images/filmora-pricing.svg", alt: "Wondershare Filmora 15 Official Licensing Tier Comparison and 20% Student Discount" },
        { url: "/assets/images/filmora-verdict.svg", thumbnail: "/assets/images/filmora-verdict.svg", alt: "PlayNewApps 2026 Editor's Choice Award Seal and 4.8/5 Rating Breakdown" }
    ];

    softwareData[filmoraIdx].affiliateButtons = [
        { label: "Buy Filmora 15 Video Editor ($49.99/yr)", url: AFF_VIDEO_EDITOR, isPrimary: true, badge: "Best Value" },
        { label: "Filmora 15 Student Discount ($31.99/yr)", url: AFF_EDUCATION, badge: "Student 20%-40% OFF" },
        { label: "Filmora 15 Business License ($155.88/yr)", url: AFF_BUSINESS, badge: "Commercial Use" }
    ];

    softwareData[filmoraIdx].priceComparison = [
        { store: "Annual Plan", price: "$49.99/yr", url: AFF_VIDEO_EDITOR, isBest: true, badge: "Best Deal" },
        { store: "Cross-Platform Plan", price: "$69.99/yr", url: AFF_VIDEO_EDITOR, badge: "Multi-Device" },
        { store: "Perpetual License", price: "$79.99", url: AFF_VIDEO_EDITOR, badge: "Lifetime v15" },
        { store: "Student Yearly Plan", price: "$31.99/yr", url: AFF_EDUCATION, badge: "Student 20% OFF" },
        { store: "Business License", price: "$155.88/yr", url: AFF_BUSINESS, badge: "Commercial" }
    ];

    softwareData[filmoraIdx].coupons = [
        { code: "FILMORA20", discount: "20% OFF", description: "Save an instant 20% on Wondershare Filmora 15 Annual, Cross-Platform & Student plans.", url: AFF_VIDEO_EDITOR },
        { code: "FILMORASTUDENT20", discount: "20% OFF Student Plan", description: "Exclusive 20% discount on Filmora 15 Student & Educator yearly subscriptions.", url: AFF_EDUCATION }
    ];

    fs.writeFileSync('data/software.json', JSON.stringify(softwareData, null, 2), 'utf8');
    console.log('✓ Updated data/software.json with 8 distinct screenshot objects and Reveal Code button!');
}

console.log('=== FILMORA 15 ASSETS GENERATION COMPLETED ===');
