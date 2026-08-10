const fs = require('fs');

// 1. Review Hero Banner: ApplicantAlly AI Copilot In-Depth Review 2026
const reviewHeroSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 450" width="900" height="450">
  <defs>
    <linearGradient id="heroBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A"/>
      <stop offset="50%" stop-color="#1E293B"/>
      <stop offset="100%" stop-color="#0284C7"/>
    </linearGradient>
    <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#2563EB"/>
      <stop offset="100%" stop-color="#38BDF8"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="900" height="450" rx="20" fill="url(#heroBg)"/>
  
  <!-- Subtle Grid Pattern -->
  <path d="M0 90 H900 M0 180 H900 M0 270 H900 M0 360 H900" stroke="#334155" stroke-width="1" stroke-dasharray="4 4" opacity="0.3"/>
  <path d="M180 0 V450 M360 0 V450 M540 0 V450 M720 0 V450" stroke="#334155" stroke-width="1" stroke-dasharray="4 4" opacity="0.3"/>

  <!-- Left Side: Review Meta & Rating -->
  <g transform="translate(50, 45)">
    <!-- Category Badge -->
    <rect width="260" height="32" rx="16" fill="url(#badgeGrad)"/>
    <text x="130" y="21" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="11" fill="#FFFFFF" letter-spacing="1">SOFTWARE REVIEW &amp; TEST BENCH</text>

    <!-- Headline -->
    <text x="0" y="85" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="34" fill="#FFFFFF">ApplicantAlly Review</text>
    <text x="0" y="125" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="30" fill="#38BDF8">Real-Time AI Interview Copilot</text>

    <!-- Score Pill -->
    <g transform="translate(0, 150)">
      <rect width="180" height="46" rx="12" fill="#0F172A" stroke="#F59E0B" stroke-width="1.5"/>
      <text x="16" y="29" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="20" fill="#F59E0B">4.9 / 5.0</text>
      <text x="105" y="29" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="14" fill="#E2E8F0">★★★★★</text>
    </g>

    <!-- Key Spec Bullets -->
    <g transform="translate(0, 220)">
      <text x="0" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#E2E8F0" font-weight="600">⚡ Response Time: <tspan font-weight="800" fill="#38BDF8">~1.0 Second</tspan></text>
      <text x="0" y="48" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#E2E8F0" font-weight="600">🔒 Stealth Level: <tspan font-weight="800" fill="#10B981">100% Screen Invisible</tspan></text>
      <text x="0" y="76" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#E2E8F0" font-weight="600">🎙️ Audio Integration: <tspan font-weight="800" fill="#F59E0B">Native System Loopback (No Bot)</tspan></text>
      <text x="0" y="104" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#E2E8F0" font-weight="600">📄 Context Matching: <tspan font-weight="800" fill="#A5B4FC">Resume RAG &amp; STAR Framing</tspan></text>
    </g>
  </g>

  <!-- Right Side Visual: Interview Screen Mockup + Live Copilot -->
  <g transform="translate(480, 45)">
    <rect width="370" height="360" rx="16" fill="#020617" stroke="#334155" stroke-width="2"/>
    
    <!-- Titlebar -->
    <rect width="370" height="36" rx="16" fill="#0F172A"/>
    <circle cx="20" cy="18" r="5" fill="#EF4444"/>
    <circle cx="36" cy="18" r="5" fill="#F59E0B"/>
    <circle cx="52" cy="18" r="5" fill="#10B981"/>
    <text x="185" y="22" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#94A3B8">Live Review Test: System Architecture Interview</text>

    <!-- Interview Video Frame -->
    <rect x="16" y="48" width="338" height="180" rx="10" fill="#1E293B"/>
    <circle cx="185" cy="118" r="32" fill="#334155"/>
    <path d="M 150 158 C 150 140 168 134 185 134 C 202 134 220 140 220 158 Z" fill="#334155"/>
    <rect x="26" y="58" width="135" height="22" rx="6" fill="#0F172A" opacity="0.85"/>
    <text x="32" y="73" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="700" fill="#10B981">● Interviewer (Asking Q)</text>

    <!-- ApplicantAlly Stealth Glass Overlay -->
    <rect x="24" y="240" width="322" height="108" rx="12" fill="#0F172A" fill-opacity="0.95" stroke="#2563EB" stroke-width="2"/>
    
    <!-- Overlay Header -->
    <rect x="24" y="240" width="322" height="28" rx="12" fill="#1D4ED8"/>
    <text x="36" y="258" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="12" fill="#FFFFFF">ApplicantAlly Copilot • STAR Answer</text>
    <rect x="260" y="245" width="75" height="18" rx="9" fill="#10B981"/>
    <text x="297" y="258" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="9" fill="#0F172A">STEALTH ON</text>

    <!-- Bullets -->
    <text x="36" y="284" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#F8FAFC" font-weight="600">• S/T: Redesigned high-throughput Redis cluster for 10M DAU.</text>
    <text x="36" y="303" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#F8FAFC" font-weight="600">• Action: Implemented read-replicas &amp; automatic failovers.</text>
    <text x="36" y="322" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#38BDF8" font-weight="700">• Result: Zero downtime during peak traffic event (+40% speed).</text>
  </g>
</svg>`;

// 2. Stealth Interface & Hotkeys Diagram
const stealthInterfaceSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 450" width="900" height="450">
  <defs>
    <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284C7"/>
      <stop offset="50%" stop-color="#0369A1"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
  </defs>

  <rect width="900" height="450" rx="20" fill="url(#bg2)"/>

  <!-- Left Text -->
  <g transform="translate(50, 45)">
    <rect width="240" height="32" rx="16" fill="#FFFFFF" opacity="0.2"/>
    <text x="120" y="21" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="11" fill="#FFFFFF" letter-spacing="1">INTERFACE &amp; STEALTH ANALYSIS</text>

    <text x="0" y="85" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="32" fill="#FFFFFF">Desktop Stealth Overlay &amp;</text>
    <text x="0" y="125" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="32" fill="#7DD3FC">Global Hotkey Architecture</text>

    <text x="0" y="165" font-family="system-ui, -apple-system, sans-serif" font-size="15" fill="#E0F2FE">Evaluated in actual Zoom, Microsoft Teams &amp; Google Meet sessions.</text>

    <!-- Stealth Key Features -->
    <g transform="translate(0, 195)">
      <rect width="360" height="42" rx="10" fill="#0F172A" opacity="0.75"/>
      <text x="16" y="26" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#38BDF8" font-weight="700">✓ Inaudible Native Audio (Direct Loopback Hook)</text>

      <rect y="52" width="360" height="42" rx="10" fill="#0F172A" opacity="0.75"/>
      <text x="16" y="78" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#38BDF8" font-weight="700">✓ Screen Share Invisibility (Bypasses Window Capture)</text>

      <rect y="104" width="360" height="42" rx="10" fill="#0F172A" opacity="0.75"/>
      <text x="16" y="130" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#38BDF8" font-weight="700">✓ Instant Hotkey Triggering (Sub-Second Response)</text>
    </g>
  </g>

  <!-- Right Visual: Hotkey Reference Table -->
  <g transform="translate(470, 45)">
    <rect width="380" height="360" rx="18" fill="#0F172A" stroke="#0284C7" stroke-width="2"/>
    <text x="24" y="38" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="16" fill="#38BDF8">ApplicantAlly Global Hotkeys Test</text>
    
    <g transform="translate(24, 60)">
      <!-- Hotkey 1 -->
      <g transform="translate(0, 0)">
        <rect width="332" height="58" rx="10" fill="#1E293B"/>
        <rect x="12" y="12" width="90" height="34" rx="8" fill="#0284C7"/>
        <text x="57" y="33" text-anchor="middle" font-family="monospace" font-weight="900" font-size="13" fill="#FFFFFF">Alt + Q</text>
        <text x="118" y="28" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="13" fill="#FFFFFF">Quick Answer (~1s)</text>
        <text x="118" y="44" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#94A3B8">Sub-second bullet points for instant glance</text>
      </g>

      <!-- Hotkey 2 -->
      <g transform="translate(0, 68)">
        <rect width="332" height="58" rx="10" fill="#1E293B"/>
        <rect x="12" y="12" width="90" height="34" rx="8" fill="#0284C7"/>
        <text x="57" y="33" text-anchor="middle" font-family="monospace" font-weight="900" font-size="13" fill="#FFFFFF">Alt + F</text>
        <text x="118" y="28" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="13" fill="#FFFFFF">Full Answer (STAR)</text>
        <text x="118" y="44" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#94A3B8">Structured Situation, Task, Action, Result</text>
      </g>

      <!-- Hotkey 3 -->
      <g transform="translate(0, 136)">
        <rect width="332" height="58" rx="10" fill="#1E293B"/>
        <rect x="12" y="12" width="90" height="34" rx="8" fill="#0284C7"/>
        <text x="57" y="33" text-anchor="middle" font-family="monospace" font-weight="900" font-size="13" fill="#FFFFFF">Alt + S</text>
        <text x="118" y="28" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="13" fill="#FFFFFF">Screen OCR Analysis</text>
        <text x="118" y="44" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#94A3B8">Analyzes live coding questions &amp; diagrams</text>
      </g>

      <!-- Hotkey 4 -->
      <g transform="translate(0, 204)">
        <rect width="332" height="58" rx="10" fill="#1E293B"/>
        <rect x="12" y="12" width="90" height="34" rx="8" fill="#0284C7"/>
        <text x="57" y="33" text-anchor="middle" font-family="monospace" font-weight="900" font-size="13" fill="#FFFFFF">Alt + H</text>
        <text x="118" y="28" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="13" fill="#FFFFFF">Toggle Overlay Window</text>
        <text x="118" y="44" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#94A3B8">Instantly hide/unhide overlay control</text>
      </g>
    </g>
  </g>
</svg>`;

// 3. Workflow Architecture Diagram
const reviewWorkflowSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 450" width="900" height="450">
  <defs>
    <linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A"/>
      <stop offset="100%" stop-color="#1E293B"/>
    </linearGradient>
  </defs>

  <rect width="900" height="450" rx="20" fill="url(#bg3)"/>

  <!-- Header -->
  <g transform="translate(50, 40)">
    <text x="0" y="30" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="28" fill="#FFFFFF">ApplicantAlly Live Technical Architecture</text>
    <text x="0" y="55" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#94A3B8">3-Stage real-time speech processing pipeline and contextual resume matching engine.</text>
  </g>

  <!-- Flowchart Steps -->
  <g transform="translate(50, 110)">
    <!-- Stage 1 -->
    <rect width="240" height="280" rx="14" fill="#1E293B" stroke="#3B82F6" stroke-width="1.5"/>
    <rect width="240" height="36" rx="14" fill="#2563EB"/>
    <text x="20" y="23" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="13" fill="#FFFFFF">STAGE 1: NATIVE AUDIO</text>
    <text x="20" y="70" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#E2E8F0" font-weight="600">● Loopback Speaker Stream</text>
    <text x="20" y="95" font-family="system-ui, -apple-system, sans-serif" font-size="12" fill="#94A3B8">Hooks into system sound output directly.</text>
    <text x="20" y="130" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#10B981" font-weight="700">✓ No bot joins meeting room</text>
    <text x="20" y="155" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#10B981" font-weight="700">✓ Zero audio lag or echo</text>
    <rect x="20" y="190" width="200" height="60" rx="8" fill="#0F172A"/>
    <text x="30" y="215" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#38BDF8">Latency: &lt; 150ms</text>
    <text x="30" y="235" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#10B981">Audio Quality: 48kHz HD</text>

    <!-- Arrow 1 -->
    <text x="252" y="150" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="24" fill="#3B82F6">→</text>

    <!-- Stage 2 -->
    <g transform="translate(280, 0)">
      <rect width="240" height="280" rx="14" fill="#1E293B" stroke="#3B82F6" stroke-width="1.5"/>
      <rect width="240" height="36" rx="14" fill="#2563EB"/>
      <text x="20" y="23" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="13" fill="#FFFFFF">STAGE 2: RESUME RAG</text>
      <text x="20" y="70" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#E2E8F0" font-weight="600">● Contextual AI Engine</text>
      <text x="20" y="95" font-family="system-ui, -apple-system, sans-serif" font-size="12" fill="#94A3B8">Cross-references question against CV &amp; job specs.</text>
      <text x="20" y="130" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#F59E0B" font-weight="700">★ Personal Metric Matching</text>
      <text x="20" y="155" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#F59E0B" font-weight="700">★ STAR Behavioral Framing</text>
      <rect x="20" y="190" width="200" height="60" rx="8" fill="#0F172A"/>
      <text x="30" y="215" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#F59E0B">Resume Alignment: 98%</text>
      <text x="30" y="235" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#E2E8F0">Target Job Specs Injected</text>
    </g>

    <!-- Arrow 2 -->
    <text x="532" y="150" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="24" fill="#3B82F6">→</text>

    <!-- Stage 3 -->
    <g transform="translate(560, 0)">
      <rect width="240" height="280" rx="14" fill="#1E293B" stroke="#10B981" stroke-width="2"/>
      <rect width="240" height="36" rx="14" fill="#10B981"/>
      <text x="20" y="23" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="13" fill="#0F172A">STAGE 3: STEALTH DISPLAY</text>
      <text x="20" y="70" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#E2E8F0" font-weight="600">● Glanceable Answers (~1s)</text>
      <text x="20" y="95" font-family="system-ui, -apple-system, sans-serif" font-size="12" fill="#94A3B8">Rendered in floating window below webcam.</text>
      <text x="20" y="130" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#10B981" font-weight="700">✓ Invisible on Screen Share</text>
      <text x="20" y="155" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#10B981" font-weight="700">✓ Hotkey Navigation</text>
      <rect x="20" y="190" width="200" height="60" rx="8" fill="#0F172A"/>
      <text x="30" y="215" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#10B981">Total Latency: ~1.0 Sec</text>
      <text x="30" y="235" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#38BDF8">Stealth Status: Verified</text>
    </g>
  </g>
</svg>`;

// 4. Screen Analysis & Vision OCR Engine Diagram
const screenAnalysisSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 450" width="900" height="450">
  <defs>
    <linearGradient id="bg4" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E1B4B"/>
      <stop offset="50%" stop-color="#312E81"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
  </defs>

  <rect width="900" height="450" rx="20" fill="url(#bg4)"/>

  <!-- Left Content -->
  <g transform="translate(50, 45)">
    <rect width="240" height="32" rx="16" fill="#818CF8" opacity="0.25"/>
    <text x="120" y="21" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="11" fill="#C7D2FE" letter-spacing="1">VISION &amp; OCR CAPABILITIES</text>

    <text x="0" y="85" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="32" fill="#FFFFFF">Screen OCR &amp; Technical</text>
    <text x="0" y="125" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="32" fill="#818CF8">Code Analysis Review</text>

    <text x="0" y="165" font-family="system-ui, -apple-system, sans-serif" font-size="15" fill="#C7D2FE">Tested against LeetCode problems, SQL schemas, and architecture diagrams.</text>

    <g transform="translate(0, 195)">
      <text x="0" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#FFFFFF" font-weight="600">• Alt + S screen capture parses text &amp; images in &lt; 1.5s</text>
      <text x="0" y="52" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#FFFFFF" font-weight="600">• Identifies optimal time complexity O(N) solution &amp; edge cases</text>
      <text x="0" y="82" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#FFFFFF" font-weight="600">• Provides step-by-step code walkthrough for technical rounds</text>
    </g>
  </g>

  <!-- Right Visual: Simulated Screen Capture Window -->
  <g transform="translate(470, 45)">
    <rect width="380" height="360" rx="16" fill="#0F172A" stroke="#6366F1" stroke-width="2"/>
    
    <rect width="380" height="36" rx="16" fill="#1E1B4B"/>
    <text x="20" y="23" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="13" fill="#A5B4FC">Screen Capture Test: LeetCode #217 (Contains Duplicate)</text>

    <!-- Code Input Box -->
    <g transform="translate(20, 52)">
      <rect width="340" height="120" rx="10" fill="#1E293B"/>
      <text x="15" y="25" font-family="monospace" font-size="11" fill="#94A3B8">// Screen OCR Input Detected:</text>
      <text x="15" y="45" font-family="monospace" font-size="11" fill="#F8FAFC">def containsDuplicate(nums: List[int]) -&gt; bool:</text>
      <text x="15" y="65" font-family="monospace" font-size="11" fill="#F8FAFC">    return len(nums) != len(set(nums))</text>
      <text x="15" y="95" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" fill="#10B981">✓ OCR Recognition Accuracy: 100%</text>
    </g>

    <!-- Copilot Analysis Output Box -->
    <g transform="translate(20, 185)">
      <rect width="340" height="150" rx="10" fill="#312E81" stroke="#818CF8" stroke-width="1.5"/>
      <text x="15" y="25" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="12" fill="#FFFFFF">ApplicantAlly Copilot Explanation</text>
      <text x="15" y="50" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#C7D2FE">• Approach: Convert array to HashSet to track unique elements.</text>
      <text x="15" y="72" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#C7D2FE">• Time Complexity: O(N) single pass time complexity.</text>
      <text x="15" y="94" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#C7D2FE">• Space Complexity: O(N) worst-case space for HashSet.</text>
      <text x="15" y="125" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" fill="#38BDF8">Hotkey: [Alt + F] For Full Verbal Explanation Script</text>
    </g>
  </g>
</svg>`;

// 5. Pricing Breakdown Graphic
const pricingBreakdownSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 450" width="900" height="450">
  <defs>
    <linearGradient id="bg5" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284C7"/>
      <stop offset="50%" stop-color="#0F172A"/>
      <stop offset="100%" stop-color="#1E1B4B"/>
    </linearGradient>
  </defs>

  <rect width="900" height="450" rx="20" fill="url(#bg5)"/>

  <!-- Header -->
  <g transform="translate(50, 40)">
    <text x="0" y="30" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="28" fill="#FFFFFF">ApplicantAlly Pricing &amp; Time Pack Analysis</text>
    <text x="0" y="55" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#93C5FD">Pay-as-you-go time packs with non-expiring minutes and no recurring monthly subscriptions.</text>
  </g>

  <!-- Pricing Cards Grid -->
  <g transform="translate(50, 110)">
    <!-- Card 1: Free Trial -->
    <rect width="180" height="280" rx="14" fill="#1E293B" stroke="#334155" stroke-width="1.5"/>
    <rect width="180" height="32" rx="14" fill="#334155"/>
    <text x="90" y="21" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="12" fill="#FFFFFF">FREE TRIAL</text>
    <text x="90" y="75" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="28" fill="#FFFFFF">$0</text>
    <text x="90" y="98" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="12" fill="#10B981" font-weight="700">15 Minutes Included</text>
    <path d="M 20 120 H 160" stroke="#334155" stroke-width="1"/>
    <text x="20" y="145" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#CBD5E1">• System Audio Check</text>
    <text x="20" y="170" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#CBD5E1">• Resume Upload Test</text>
    <text x="20" y="195" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#CBD5E1">• Quick Answer Tryout</text>
    <rect x="20" y="225" width="140" height="36" rx="8" fill="#334155"/>
    <text x="90" y="248" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="12" fill="#FFFFFF">15 Mins Free</text>

    <!-- Card 2: 1-Hour Starter -->
    <g transform="translate(200, 0)">
      <rect width="180" height="280" rx="14" fill="#1E293B" stroke="#3B82F6" stroke-width="1.5"/>
      <rect width="180" height="32" rx="14" fill="#2563EB"/>
      <text x="90" y="21" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="12" fill="#FFFFFF">STARTER 1-HR</text>
      <text x="90" y="75" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="28" fill="#FFFFFF">$7.50</text>
      <text x="90" y="98" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#38BDF8" font-weight="700">$7.50 / hour</text>
      <path d="M 20 120 H 160" stroke="#334155" stroke-width="1"/>
      <text x="20" y="145" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#CBD5E1">• 60 Active Minutes</text>
      <text x="20" y="170" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#CBD5E1">• 1 Screener Call</text>
      <text x="20" y="195" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#CBD5E1">• Full STAR Mode</text>
      <rect x="20" y="225" width="140" height="36" rx="8" fill="#2563EB"/>
      <text x="90" y="248" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="12" fill="#FFFFFF">1-Hour Pack</text>
    </g>

    <!-- Card 3: 3-Hour Pack -->
    <g transform="translate(400, -10)">
      <rect width="190" height="300" rx="14" fill="#0F172A" stroke="#F59E0B" stroke-width="2.5"/>
      <rect width="190" height="36" rx="14" fill="#F59E0B"/>
      <text x="95" y="23" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="12" fill="#0F172A">MOST POPULAR • 3-HR</text>
      <text x="95" y="80" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="32" fill="#FFFFFF">$29.00</text>
      <text x="95" y="105" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#F59E0B" font-weight="800">180 Active Minutes</text>
      <path d="M 20 125 H 170" stroke="#334155" stroke-width="1"/>
      <text x="20" y="150" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#FFFFFF" font-weight="600">• 3 Hours Interview Time</text>
      <text x="20" y="175" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#FFFFFF" font-weight="600">• Screen Analysis Included</text>
      <text x="20" y="200" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#FFFFFF" font-weight="600">• Unused Mins Never Expire</text>
      <rect x="20" y="238" width="150" height="40" rx="8" fill="#F59E0B"/>
      <text x="95" y="263" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="13" fill="#0F172A">3-Hour Pack</text>
    </g>

    <!-- Card 4: 9-Hour Value Pack -->
    <g transform="translate(610, 0)">
      <rect width="180" height="280" rx="14" fill="#1E293B" stroke="#334155" stroke-width="1.5"/>
      <rect width="180" height="32" rx="14" fill="#4F46E5"/>
      <text x="90" y="21" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="12" fill="#FFFFFF">BEST VALUE • 9-HR</text>
      <text x="90" y="75" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="28" fill="#FFFFFF">$58.00</text>
      <text x="90" y="98" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#A5B4FC" font-weight="700">$6.44 / hour</text>
      <path d="M 20 120 H 160" stroke="#334155" stroke-width="1"/>
      <text x="20" y="145" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#CBD5E1">• 540 Active Minutes</text>
      <text x="20" y="170" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#CBD5E1">• Multi-Stage Rounds</text>
      <text x="20" y="195" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#CBD5E1">• Priority AI Processing</text>
      <rect x="20" y="225" width="140" height="36" rx="8" fill="#4F46E5"/>
      <text x="90" y="248" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="12" fill="#FFFFFF">9-Hour Pack</text>
    </g>
  </g>
</svg>`;

fs.writeFileSync('assets/images/banners/applicantally-review-hero.svg', reviewHeroSvg);
fs.writeFileSync('assets/images/banners/applicantally-stealth-interface.svg', stealthInterfaceSvg);
fs.writeFileSync('assets/images/banners/applicantally-review-workflow.svg', reviewWorkflowSvg);
fs.writeFileSync('assets/images/banners/applicantally-screen-analysis.svg', screenAnalysisSvg);
fs.writeFileSync('assets/images/banners/applicantally-pricing-breakdown.svg', pricingBreakdownSvg);

console.log('Generated 5 review-focused ApplicantAlly SVG illustrations successfully.');
