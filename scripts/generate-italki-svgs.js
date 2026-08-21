const fs = require('fs');
const path = require('path');

const dirs = [
  path.join(process.cwd(), 'assets/images/italki'),
  path.join(process.cwd(), 'assets/images/banners')
];

dirs.forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

function writeSvg(filename, svgContent) {
  dirs.forEach(d => {
    const filePath = path.join(d, filename);
    fs.writeFileSync(filePath, svgContent.trim(), 'utf8');
    console.log(`Saved ${filePath} (${fs.statSync(filePath).size} bytes)`);
  });
}

// 1. italki Hero Overview SVG (1280x720)
const italkiHeroSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720" style="background:#0b1120;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <defs>
    <linearGradient id="italkiRed" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF334B"/>
      <stop offset="100%" stop-color="#E11D48"/>
    </linearGradient>
    <linearGradient id="bgGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E293B"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
    <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="100%" stop-color="#818CF8"/>
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Navigation Bar -->
  <rect x="0" y="0" width="1280" height="70" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
  
  <!-- Logo -->
  <g transform="translate(32, 18)">
    <rect width="96" height="34" rx="8" fill="url(#italkiRed)"/>
    <text x="48" y="23" fill="#ffffff" font-size="18" font-weight="900" text-anchor="middle" letter-spacing="-0.5">italki</text>
  </g>

  <!-- Nav Links -->
  <g transform="translate(150, 26)" font-size="14" font-weight="600" fill="#94a3b8">
    <text x="0" y="16" fill="#ffffff">Find a Teacher</text>
    <text x="130" y="16">Group Classes</text>
    <text x="250" y="16">Community</text>
    <text x="360" y="16">Language Test</text>
  </g>

  <!-- User / CTA in Nav -->
  <g transform="translate(1060, 16)">
    <rect width="180" height="38" rx="8" fill="url(#italkiRed)"/>
    <text x="90" y="24" fill="#ffffff" font-size="13" font-weight="800" text-anchor="middle">Book Trial (50% OFF)</text>
  </g>

  <!-- Hero Header Content -->
  <g transform="translate(60, 105)">
    <rect width="210" height="28" rx="14" fill="#1e293b" stroke="#334155" stroke-width="1"/>
    <text x="105" y="18" fill="#fda4af" font-size="11" font-weight="800" text-anchor="middle" letter-spacing="1">1-ON-1 LANGUAGE BENCHMARK</text>
    
    <text x="0" y="68" fill="#ffffff" font-size="34" font-weight="800">Become Fluent with 30,000+ Native Language Tutors</text>
    <text x="0" y="100" fill="#94a3b8" font-size="16" font-weight="400">Personalized lessons in 150+ languages • Zero subscription lock-ins • Pay per lesson</text>
  </g>

  <!-- Search & Filter Bar -->
  <g transform="translate(60, 230)">
    <rect width="1160" height="74" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1.5" filter="url(#shadow)"/>
    
    <!-- Language Select -->
    <g transform="translate(24, 14)">
      <text x="0" y="14" fill="#64748b" font-size="11" font-weight="700" text-transform="uppercase">I want to learn</text>
      <text x="0" y="38" fill="#ffffff" font-size="16" font-weight="700">Spanish (Español)</text>
    </g>
    <line x1="240" y1="18" x2="240" y2="56" stroke="#334155" stroke-width="1"/>

    <!-- Teacher Type -->
    <g transform="translate(265, 14)">
      <text x="0" y="14" fill="#64748b" font-size="11" font-weight="700" text-transform="uppercase">Teacher Type</text>
      <text x="0" y="38" fill="#ffffff" font-size="16" font-weight="700">Professional Teachers</text>
    </g>
    <line x1="480" y1="18" x2="480" y2="56" stroke="#334155" stroke-width="1"/>

    <!-- Price Range -->
    <g transform="translate(505, 14)">
      <text x="0" y="14" fill="#64748b" font-size="11" font-weight="700" text-transform="uppercase">Hourly Rate</text>
      <text x="0" y="38" fill="#ffffff" font-size="16" font-weight="700">$5 – $18 / hr</text>
    </g>
    <line x1="680" y1="18" x2="680" y2="56" stroke="#334155" stroke-width="1"/>

    <!-- Availability -->
    <g transform="translate(705, 14)">
      <text x="0" y="14" fill="#64748b" font-size="11" font-weight="700" text-transform="uppercase">Availability</text>
      <text x="0" y="38" fill="#ffffff" font-size="16" font-weight="700">Weekends &amp; Evenings</text>
    </g>

    <!-- Search Button -->
    <g transform="translate(970, 14)">
      <rect width="165" height="46" rx="10" fill="url(#italkiRed)"/>
      <text x="82" y="28" fill="#ffffff" font-size="14" font-weight="800" text-anchor="middle">Find Teachers</text>
    </g>
  </g>

  <!-- Live Teacher Cards Display Grid -->
  <g transform="translate(60, 335)">
    <!-- Card 1 -->
    <g transform="translate(0, 0)">
      <rect width="365" height="340" rx="16" fill="#131d31" stroke="#2a3854" stroke-width="1.5" filter="url(#shadow)"/>
      
      <!-- Avatar & Flag -->
      <circle cx="55" cy="55" r="32" fill="#e11d48"/>
      <text x="55" y="62" fill="#ffffff" font-size="20" font-weight="800" text-anchor="middle">MC</text>
      <circle cx="75" cy="75" r="10" fill="#f59e0b" stroke="#131d31" stroke-width="2"/>
      
      <!-- Info -->
      <text x="105" y="45" fill="#ffffff" font-size="17" font-weight="800">Maria Camila</text>
      <rect x="105" y="55" width="135" height="20" rx="4" fill="#0369a1"/>
      <text x="172" y="69" fill="#e0f2fe" font-size="10" font-weight="800" text-anchor="middle">PROFESSIONAL TEACHER</text>

      <g transform="translate(25, 105)">
        <text x="0" y="16" fill="#fbbf24" font-size="13" font-weight="700">★ 5.0 <tspan fill="#94a3b8" font-weight="500">(1,840 lessons)</tspan></text>
        <text x="0" y="42" fill="#e2e8f0" font-size="13" font-weight="600">Speaks: <tspan fill="#38bdf8">Spanish (Native)</tspan>, English (C1)</text>
        <text x="0" y="68" fill="#cbd5e1" font-size="12" font-style="italic">"Certified DELE examiner. Specialized in conversational fluency &amp; medical Spanish."</text>
      </g>

      <rect x="25" y="215" width="315" height="42" rx="8" fill="#1e293b"/>
      <text x="40" y="241" fill="#ffffff" font-size="15" font-weight="800">$14 <tspan font-size="11" fill="#94a3b8" font-weight="500">/ 60 min</tspan></text>
      <text x="230" y="241" fill="#4ade80" font-size="12" font-weight="700">Trial: $7.00</text>

      <rect x="25" y="270" width="315" height="46" rx="8" fill="url(#italkiRed)"/>
      <text x="182" y="298" fill="#ffffff" font-size="13" font-weight="800" text-anchor="middle">Book 1-on-1 Lesson</text>
    </g>

    <!-- Card 2 -->
    <g transform="translate(395, 0)">
      <rect width="365" height="340" rx="16" fill="#131d31" stroke="#2a3854" stroke-width="1.5" filter="url(#shadow)"/>
      
      <!-- Avatar & Flag -->
      <circle cx="55" cy="55" r="32" fill="#0284c7"/>
      <text x="55" y="62" fill="#ffffff" font-size="20" font-weight="800" text-anchor="middle">KT</text>
      <circle cx="75" cy="75" r="10" fill="#ef4444" stroke="#131d31" stroke-width="2"/>

      <!-- Info -->
      <text x="105" y="45" fill="#ffffff" font-size="17" font-weight="800">Kenji Takahashi</text>
      <rect x="105" y="55" width="125" height="20" rx="4" fill="#047857"/>
      <text x="167" y="69" fill="#d1fae5" font-size="10" font-weight="800" text-anchor="middle">COMMUNITY TUTOR</text>

      <g transform="translate(25, 105)">
        <text x="0" y="16" fill="#fbbf24" font-size="13" font-weight="700">★ 4.9 <tspan fill="#94a3b8" font-weight="500">(920 lessons)</tspan></text>
        <text x="0" y="42" fill="#e2e8f0" font-size="13" font-weight="600">Speaks: <tspan fill="#38bdf8">Japanese (Native)</tspan>, English (B2)</text>
        <text x="0" y="68" fill="#cbd5e1" font-size="12" font-style="italic">"Tokyo native. Practice everyday Japanese, anime slang, and pitch accent."</text>
      </g>

      <rect x="25" y="215" width="315" height="42" rx="8" fill="#1e293b"/>
      <text x="40" y="241" fill="#ffffff" font-size="15" font-weight="800">$10 <tspan font-size="11" fill="#94a3b8" font-weight="500">/ 60 min</tspan></text>
      <text x="230" y="241" fill="#4ade80" font-size="12" font-weight="700">Trial: $5.00</text>

      <rect x="25" y="270" width="315" height="46" rx="8" fill="url(#italkiRed)"/>
      <text x="182" y="298" fill="#ffffff" font-size="13" font-weight="800" text-anchor="middle">Book 1-on-1 Lesson</text>
    </g>

    <!-- Card 3 -->
    <g transform="translate(790, 0)">
      <rect width="370" height="340" rx="16" fill="#131d31" stroke="#2a3854" stroke-width="1.5" filter="url(#shadow)"/>
      
      <!-- Avatar & Flag -->
      <circle cx="55" cy="55" r="32" fill="#7c3aed"/>
      <text x="55" y="62" fill="#ffffff" font-size="20" font-weight="800" text-anchor="middle">AL</text>
      <circle cx="75" cy="75" r="10" fill="#3b82f6" stroke="#131d31" stroke-width="2"/>

      <!-- Info -->
      <text x="105" y="45" fill="#ffffff" font-size="17" font-weight="800">Amélie Laurent</text>
      <rect x="105" y="55" width="135" height="20" rx="4" fill="#0369a1"/>
      <text x="172" y="69" fill="#e0f2fe" font-size="10" font-weight="800" text-anchor="middle">PROFESSIONAL TEACHER</text>

      <g transform="translate(25, 105)">
        <text x="0" y="16" fill="#fbbf24" font-size="13" font-weight="700">★ 5.0 <tspan fill="#94a3b8" font-weight="500">(2,450 lessons)</tspan></text>
        <text x="0" y="42" fill="#e2e8f0" font-size="13" font-weight="600">Speaks: <tspan fill="#38bdf8">French (Native)</tspan>, Spanish (B2)</text>
        <text x="0" y="68" fill="#cbd5e1" font-size="12" font-style="italic">"Master in FLE (French as Foreign Language). Exam preparation &amp; business French."</text>
      </g>

      <rect x="25" y="215" width="320" height="42" rx="8" fill="#1e293b"/>
      <text x="40" y="241" fill="#ffffff" font-size="15" font-weight="800">$19 <tspan font-size="11" fill="#94a3b8" font-weight="500">/ 60 min</tspan></text>
      <text x="235" y="241" fill="#4ade80" font-size="12" font-weight="700">Trial: $9.50</text>

      <rect x="25" y="270" width="320" height="46" rx="8" fill="url(#italkiRed)"/>
      <text x="185" y="298" fill="#ffffff" font-size="13" font-weight="800" text-anchor="middle">Book 1-on-1 Lesson</text>
    </g>
  </g>
</svg>`;

// 2. italki Tutor Selection & Profile Vetting SVG
const italkiTutorSelectionSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720" style="background:#0f172a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <defs>
    <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF334B"/>
      <stop offset="100%" stop-color="#E11D48"/>
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E293B"/>
      <stop offset="100%" stop-color="#111827"/>
    </linearGradient>
    <filter id="profileShadow">
      <feDropShadow dx="0" dy="10" stdDeviation="16" flood-color="#000000" flood-opacity="0.45"/>
    </filter>
  </defs>

  <!-- Top Banner -->
  <rect width="1280" height="56" fill="#182234" stroke="#253248" stroke-width="1"/>
  <text x="32" y="34" fill="#ffffff" font-size="16" font-weight="800">italki Teacher Profile &amp; Vetting Verification Engine</text>
  <rect x="1080" y="12" width="160" height="32" rx="6" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="1160" y="32" fill="#38bdf8" font-size="12" font-weight="700" text-anchor="middle">VERIFIED BADGE: PASS</text>

  <!-- Main Profile Container -->
  <g transform="translate(60, 80)">
    <!-- Left Column: Video Intro & Badges -->
    <g transform="translate(0, 0)">
      <!-- Video Player Mockup -->
      <rect width="480" height="310" rx="16" fill="#0b1120" stroke="#334155" stroke-width="1.5" filter="url(#profileShadow)"/>
      <circle cx="240" cy="140" r="36" fill="url(#redGrad)"/>
      <polygon points="234,128 254,140 234,152" fill="#ffffff"/>
      <text x="240" y="210" fill="#e2e8f0" font-size="14" font-weight="700" text-anchor="middle">Introduction Video (1:45 min)</text>
      <text x="240" y="235" fill="#94a3b8" font-size="12" text-anchor="middle">Clear native accent preview &amp; teaching methodology</text>
      
      <!-- Video bottom controls -->
      <rect x="0" y="270" width="480" height="40" rx="0" fill="#111827"/>
      <text x="20" y="294" fill="#cbd5e1" font-size="11" font-weight="600">HD 1080p • Spanish &amp; English audio</text>
      <text x="400" y="294" fill="#38bdf8" font-size="11" font-weight="700">Subtitles ON</text>

      <!-- Badges & Verification Box -->
      <g transform="translate(0, 335)">
        <rect width="480" height="230" rx="16" fill="url(#cardGrad)" stroke="#253248" stroke-width="1.5" filter="url(#profileShadow)"/>
        <text x="24" y="36" fill="#ffffff" font-size="16" font-weight="800">Verified Teaching Qualifications</text>
        
        <g transform="translate(24, 55)">
          <circle cx="12" cy="14" r="10" fill="#059669"/>
          <text x="32" y="18" fill="#e2e8f0" font-size="13" font-weight="600">Government ID &amp; Background Verified</text>
          
          <circle cx="12" cy="50" r="10" fill="#059669"/>
          <text x="32" y="54" fill="#e2e8f0" font-size="13" font-weight="600">DELE Certified Spanish Instructor Diploma</text>
          
          <circle cx="12" cy="86" r="10" fill="#059669"/>
          <text x="32" y="90" fill="#e2e8f0" font-size="13" font-weight="600">100% Lesson Completion Rate (1,840+ Completed)</text>
          
          <circle cx="12" cy="122" r="10" fill="#059669"/>
          <text x="32" y="126" fill="#e2e8f0" font-size="13" font-weight="600">Average Response Time: Under 2 Hours</text>
        </g>
      </g>
    </g>

    <!-- Right Column: Profile Specs & Pricing -->
    <g transform="translate(520, 0)">
      <rect width="640" height="565" rx="16" fill="url(#cardGrad)" stroke="#253248" stroke-width="1.5" filter="url(#profileShadow)"/>
      
      <!-- Teacher Header -->
      <g transform="translate(32, 32)">
        <circle cx="40" cy="40" r="38" fill="#e11d48"/>
        <text x="40" y="48" fill="#ffffff" font-size="24" font-weight="800" text-anchor="middle">MC</text>
        
        <text x="96" y="32" fill="#ffffff" font-size="22" font-weight="800">Maria Camila Gomez</text>
        <text x="96" y="56" fill="#38bdf8" font-size="14" font-weight="700">Professional Spanish Teacher • Medellin, Colombia</text>
        <text x="96" y="78" fill="#fbbf24" font-size="13" font-weight="700">★★★★★ 5.0 <tspan fill="#94a3b8">(480 student reviews)</tspan></text>
      </g>

      <line x1="32" y1="130" x2="608" y2="130" stroke="#334155" stroke-width="1"/>

      <!-- Statistics Stats Bar -->
      <g transform="translate(32, 150)">
        <rect width="180" height="70" rx="10" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
        <text x="90" y="30" fill="#94a3b8" font-size="11" font-weight="700" text-anchor="middle">STUDENTS</text>
        <text x="90" y="54" fill="#ffffff" font-size="18" font-weight="800" text-anchor="middle">412 Active</text>

        <g transform="translate(195, 0)">
          <rect width="180" height="70" rx="10" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
          <text x="90" y="30" fill="#94a3b8" font-size="11" font-weight="700" text-anchor="middle">LESSONS TAUGHT</text>
          <text x="90" y="54" fill="#38bdf8" font-size="18" font-weight="800" text-anchor="middle">1,842 Total</text>
        </g>

        <g transform="translate(390, 0)">
          <rect width="185" height="70" rx="10" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
          <text x="92" y="30" fill="#94a3b8" font-size="11" font-weight="700" text-anchor="middle">ATTENDANCE</text>
          <text x="92" y="54" fill="#4ade80" font-size="18" font-weight="800" text-anchor="middle">100% On-Time</text>
        </g>
      </g>

      <!-- Lesson Offerings & Rates -->
      <g transform="translate(32, 245)">
        <text x="0" y="20" fill="#ffffff" font-size="16" font-weight="800">Available Lesson Packages</text>
        
        <!-- Option 1: Trial -->
        <g transform="translate(0, 35)">
          <rect width="575" height="60" rx="10" fill="#131d31" stroke="#334155" stroke-width="1"/>
          <text x="20" y="36" fill="#ffffff" font-size="14" font-weight="700">30-Minute Trial Lesson (New Students)</text>
          <text x="470" y="36" fill="#4ade80" font-size="16" font-weight="800">$7.00</text>
        </g>

        <!-- Option 2: General Conversation -->
        <g transform="translate(0, 105)">
          <rect width="575" height="60" rx="10" fill="#131d31" stroke="#334155" stroke-width="1"/>
          <text x="20" y="36" fill="#ffffff" font-size="14" font-weight="700">60-Min Conversational Fluency &amp; Pronunciation</text>
          <text x="470" y="36" fill="#ffffff" font-size="16" font-weight="800">$14.00</text>
        </g>

        <!-- Option 3: DELE Prep -->
        <g transform="translate(0, 175)">
          <rect width="575" height="60" rx="10" fill="#131d31" stroke="#334155" stroke-width="1"/>
          <text x="20" y="36" fill="#ffffff" font-size="14" font-weight="700">60-Min Intensive DELE / SIELE Exam Preparation</text>
          <text x="470" y="36" fill="#ffffff" font-size="16" font-weight="800">$18.00</text>
        </g>
      </g>

      <!-- Instant Booking Button -->
      <g transform="translate(32, 495)">
        <rect width="575" height="48" rx="10" fill="url(#redGrad)"/>
        <text x="287" y="30" fill="#ffffff" font-size="15" font-weight="800" text-anchor="middle">Check Live Availability &amp; Book Lesson</text>
      </g>
    </g>
  </g>
</svg>`;

// 3. italki Community & Practice Hub SVG
const italkiCommunitySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720" style="background:#0b1120;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <defs>
    <linearGradient id="comRed" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF334B"/>
      <stop offset="100%" stop-color="#E11D48"/>
    </linearGradient>
    <linearGradient id="comCard" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E293B"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
    <filter id="cShadow">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.4"/>
    </filter>
  </defs>

  <!-- Top App Bar -->
  <rect width="1280" height="60" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
  <text x="32" y="36" fill="#ffffff" font-size="16" font-weight="800">italki Community: Native Speaker Corrections &amp; Interactive Prompts</text>
  <rect x="1100" y="14" width="140" height="32" rx="6" fill="url(#comRed)"/>
  <text x="1170" y="34" fill="#ffffff" font-size="12" font-weight="800" text-anchor="middle">+ New Exercise</text>

  <!-- Left Column: Daily Prompt & Correction Thread -->
  <g transform="translate(60, 90)">
    <rect width="720" height="580" rx="16" fill="url(#comCard)" stroke="#253248" stroke-width="1.5" filter="url(#cShadow)"/>
    
    <!-- Exercise Header -->
    <g transform="translate(32, 32)">
      <rect width="120" height="24" rx="4" fill="#0369a1"/>
      <text x="60" y="16" fill="#e0f2fe" font-size="11" font-weight="800" text-anchor="middle">SPANISH ESSAY</text>
      <text x="135" y="17" fill="#94a3b8" font-size="13">Posted by Alex (USA) • 2 hours ago</text>

      <text x="0" y="55" fill="#ffffff" font-size="18" font-weight="800">"Mi viaje a Oaxaca y la comida típica mexicana"</text>
      
      <!-- Student's Original Paragraph -->
      <rect x="0" y="75" width="655" height="110" rx="10" fill="#0b1120" stroke="#334155" stroke-width="1"/>
      <text x="20" y="105" fill="#cbd5e1" font-size="14" line-height="1.6">El año pasado, <tspan fill="#f87171" text-decoration="line-through">yo fui</tspan> a Oaxaca para <tspan fill="#f87171" text-decoration="line-through">conocer</tspan> la cultura. Me gustó mucho el mole</text>
      <text x="20" y="130" fill="#cbd5e1" font-size="14">negro porque <tspan fill="#f87171" text-decoration="line-through">es</tspan> muy sabroso. La gente <tspan fill="#f87171" text-decoration="line-through">eran</tspan> muy amable conmigo.</text>
      <text x="20" y="160" fill="#64748b" font-size="12">Feedback requested: Preterite vs Imperfect usage and natural phrasing.</text>
    </g>

    <!-- Native Speaker Correction Section -->
    <g transform="translate(32, 255)">
      <text x="0" y="20" fill="#4ade80" font-size="15" font-weight="800">✓ Native Speaker Correction by Carlos (Mexico City)</text>
      
      <rect x="0" y="35" width="655" height="150" rx="10" fill="#132338" stroke="#0284c7" stroke-width="1.5"/>
      <text x="20" y="65" fill="#e2e8f0" font-size="14">El año pasado, <tspan fill="#4ade80" font-weight="700">viajé</tspan> a Oaxaca para <tspan fill="#4ade80" font-weight="700">aprender sobre</tspan> su cultura. Me encantó</text>
      <text x="20" y="90" fill="#e2e8f0" font-size="14">el mole negro porque <tspan fill="#4ade80" font-weight="700">estaba</tspan> delicioso. La gente <tspan fill="#4ade80" font-weight="700">fue</tspan> sumamente amable.</text>
      
      <line x1="20" y1="115" x2="635" y2="115" stroke="#1e293b" stroke-width="1"/>
      <text x="20" y="140" fill="#38bdf8" font-size="12" font-weight="600">Teacher's Note: Use "viajé" to sound more natural, and "estaba" when describing specific food experience!</text>
    </g>

    <!-- Community Upvotes & Reply Bar -->
    <g transform="translate(32, 490)">
      <rect width="655" height="50" rx="10" fill="#0b1120" stroke="#334155" stroke-width="1"/>
      <text x="24" y="30" fill="#fbbf24" font-size="13" font-weight="700">★ 18 Native Speakers Found This Helpful</text>
      <text x="480" y="30" fill="#94a3b8" font-size="13" font-weight="600">💬 6 Comments</text>
    </g>
  </g>

  <!-- Right Column: Language Prompts & Vocabulary Tools -->
  <g transform="translate(810, 90)">
    <!-- Daily Topic -->
    <rect width="410" height="275" rx="16" fill="url(#comCard)" stroke="#253248" stroke-width="1.5" filter="url(#cShadow)"/>
    <g transform="translate(24, 24)">
      <text x="0" y="20" fill="#ffffff" font-size="16" font-weight="800">Daily Speaking Prompt</text>
      <text x="0" y="42" fill="#94a3b8" font-size="12">Record a 60-second voice note for feedback</text>

      <rect x="0" y="60" width="360" height="90" rx="10" fill="#0b1120" stroke="#334155" stroke-width="1"/>
      <text x="16" y="90" fill="#e2e8f0" font-size="13" font-weight="600">"What is the most memorable city you</text>
      <text x="16" y="112" fill="#e2e8f0" font-size="13" font-weight="600">have ever visited and why?"</text>
      <text x="16" y="135" fill="#fda4af" font-size="11" font-weight="700">#Travel #SpeakingChallenge</text>

      <rect x="0" y="170" width="360" height="42" rx="8" fill="url(#comRed)"/>
      <text x="180" y="196" fill="#ffffff" font-size="13" font-weight="800" text-anchor="middle">🎙️ Record Audio Response</text>
    </g>

    <!-- Language Exchange Partners -->
    <g transform="translate(0, 295)">
      <rect width="410" height="285" rx="16" fill="url(#comCard)" stroke="#253248" stroke-width="1.5" filter="url(#cShadow)"/>
      <g transform="translate(24, 24)">
        <text x="0" y="20" fill="#ffffff" font-size="16" font-weight="800">Active Language Exchange</text>
        <text x="0" y="42" fill="#94a3b8" font-size="12">Free 1-on-1 language tandem practice</text>

        <!-- Partner 1 -->
        <g transform="translate(0, 60)">
          <rect width="360" height="60" rx="8" fill="#0b1120" stroke="#334155" stroke-width="1"/>
          <circle cx="30" cy="30" r="18" fill="#0284c7"/>
          <text x="30" y="36" fill="#ffffff" font-size="12" font-weight="800" text-anchor="middle">ES</text>
          <text x="60" y="26" fill="#ffffff" font-size="13" font-weight="700">Eduardo (Madrid)</text>
          <text x="60" y="44" fill="#94a3b8" font-size="11">Teaches: Spanish • Learns: English</text>
        </g>

        <!-- Partner 2 -->
        <g transform="translate(0, 130)">
          <rect width="360" height="60" rx="8" fill="#0b1120" stroke="#334155" stroke-width="1"/>
          <circle cx="30" cy="30" r="18" fill="#7c3aed"/>
          <text x="30" y="36" fill="#ffffff" font-size="12" font-weight="800" text-anchor="middle">YL</text>
          <text x="60" y="26" fill="#ffffff" font-size="13" font-weight="700">Yuki (Osaka)</text>
          <text x="60" y="44" fill="#94a3b8" font-size="11">Teaches: Japanese • Learns: Spanish</text>
        </g>

        <rect x="0" y="205" width="360" height="38" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
        <text x="180" y="229" fill="#38bdf8" font-size="12" font-weight="800" text-anchor="middle">Find Tandem Partners</text>
      </g>
    </g>
  </g>
</svg>`;

// 4. italki WebRTC Virtual Classroom SVG
const italkiClassroomSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720" style="background:#090d16;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <defs>
    <linearGradient id="classRed" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF334B"/>
      <stop offset="100%" stop-color="#E11D48"/>
    </linearGradient>
    <filter id="vidShadow">
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- Classroom Top Bar -->
  <rect width="1280" height="54" fill="#111827" stroke="#1f2937" stroke-width="1"/>
  
  <g transform="translate(24, 14)">
    <circle cx="10" cy="12" r="6" fill="#22c55e"/>
    <text x="24" y="16" fill="#ffffff" font-size="14" font-weight="800">italki Classroom (Live 1-on-1 Lesson)</text>
    <text x="320" y="16" fill="#94a3b8" font-size="13">Teacher: Maria Camila • Lesson Time: <tspan fill="#f59e0b" font-weight="700">34:12 / 60:00</tspan></text>
  </g>

  <!-- Top Right Settings -->
  <g transform="translate(1080, 12)">
    <rect width="170" height="30" rx="6" fill="#1f2937"/>
    <text x="85" y="20" fill="#38bdf8" font-size="11" font-weight="700" text-anchor="middle">⚡ WebRTC Latency: 28ms</text>
  </g>

  <!-- Main Split Layout -->
  <g transform="translate(24, 70)">
    <!-- Video Stream 1 (Teacher Full Frame) -->
    <g transform="translate(0, 0)">
      <rect width="840" height="490" rx="16" fill="#111827" stroke="#374151" stroke-width="1.5" filter="url(#vidShadow)"/>
      
      <!-- Video Placeholder Visual -->
      <rect x="20" y="20" width="800" height="450" rx="12" fill="#1e293b"/>
      
      <!-- Teacher Avatar & Live Indicator -->
      <circle cx="420" cy="220" r="70" fill="#e11d48"/>
      <text x="420" y="235" fill="#ffffff" font-size="44" font-weight="800" text-anchor="middle">MC</text>
      
      <rect x="40" y="40" width="130" height="28" rx="6" fill="#000000" opacity="0.75"/>
      <circle cx="55" cy="54" r="5" fill="#ef4444"/>
      <text x="70" y="58" fill="#ffffff" font-size="12" font-weight="700">Maria (Teacher)</text>

      <!-- Student PiP Video (Picture-in-Picture) -->
      <g transform="translate(620, 310)">
        <rect width="180" height="140" rx="10" fill="#0f172a" stroke="#ffffff" stroke-width="2" filter="url(#vidShadow)"/>
        <circle cx="90" cy="65" r="30" fill="#0284c7"/>
        <text x="90" y="73" fill="#ffffff" font-size="18" font-weight="800" text-anchor="middle">YOU</text>
        <rect x="10" y="105" width="80" height="20" rx="4" fill="#000000" opacity="0.8"/>
        <text x="50" y="119" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle">You (Student)</text>
      </g>
    </g>

    <!-- Right Side: Interactive Whiteboard & Chat Stream -->
    <g transform="translate(860, 0)">
      <rect width="370" height="575" rx="16" fill="#111827" stroke="#374151" stroke-width="1.5" filter="url(#vidShadow)"/>
      
      <!-- Tabs -->
      <g transform="translate(16, 16)">
        <rect width="165" height="34" rx="6" fill="#1f2937"/>
        <text x="82" y="22" fill="#ffffff" font-size="12" font-weight="800" text-anchor="middle">Live Shared Notes</text>

        <rect x="175" width="160" height="34" rx="6" fill="#0f172a"/>
        <text x="255" y="22" fill="#94a3b8" font-size="12" font-weight="600" text-anchor="middle">Chat (8)</text>
      </g>

      <!-- Shared Whiteboard Document Content -->
      <g transform="translate(16, 65)">
        <rect width="338" height="410" rx="10" fill="#0b1120" stroke="#1f2937" stroke-width="1"/>
        
        <g transform="translate(16, 20)">
          <text x="0" y="16" fill="#38bdf8" font-size="13" font-weight="800">TODAY'S VOCABULARY &amp; IDIOMS:</text>
          
          <text x="0" y="45" fill="#ffffff" font-size="12" font-weight="700">1. Echar una mano</text>
          <text x="16" y="65" fill="#94a3b8" font-size="11">To lend a helping hand / assist someone</text>
          
          <text x="0" y="95" fill="#ffffff" font-size="12" font-weight="700">2. Tomar el pelo</text>
          <text x="16" y="115" fill="#94a3b8" font-size="11">To pull someone's leg / tease</text>

          <line x1="0" y1="135" x2="305" y2="135" stroke="#1e293b" stroke-width="1"/>

          <text x="0" y="160" fill="#4ade80" font-size="13" font-weight="800">LIVE CORRECTIONS (Real-Time):</text>
          <text x="0" y="185" fill="#f87171" font-size="11">✖ "Si yo tendría más tiempo..."</text>
          <text x="0" y="205" fill="#4ade80" font-size="11" font-weight="700">✔ "Si yo tuviera más tiempo..."</text>
          <text x="16" y="225" fill="#94a3b8" font-size="10">Rule: Imperfect Subjunctive with 'Si' conditional</text>

          <line x1="0" y1="245" x2="305" y2="245" stroke="#1e293b" stroke-width="1"/>
          
          <text x="0" y="270" fill="#f59e0b" font-size="12" font-weight="700">Homework for Next Lesson:</text>
          <text x="0" y="290" fill="#cbd5e1" font-size="11">• Write 5 sentences using Subjunctive</text>
          <text x="0" y="310" fill="#cbd5e1" font-size="11">• Review podcast episode #14</text>
        </g>
      </g>

      <!-- Note Input / Export -->
      <g transform="translate(16, 490)">
        <rect width="338" height="38" rx="8" fill="#1e293b" stroke="#374151" stroke-width="1"/>
        <text x="16" y="24" fill="#64748b" font-size="12">Type lesson note or translation...</text>
        
        <rect x="250" y="4" width="80" height="30" rx="6" fill="#0284c7"/>
        <text x="290" y="23" fill="#ffffff" font-size="11" font-weight="800" text-anchor="middle">Save PDF</text>
      </g>
    </g>
  </g>

  <!-- Classroom Bottom Controls Bar -->
  <g transform="translate(24, 580)">
    <rect width="840" height="65" rx="14" fill="#111827" stroke="#374151" stroke-width="1"/>
    
    <!-- Control Buttons -->
    <g transform="translate(180, 14)">
      <!-- Mic -->
      <circle cx="20" cy="18" r="20" fill="#1f2937"/>
      <text x="20" y="23" fill="#ffffff" font-size="13" text-anchor="middle">🎤</text>

      <!-- Cam -->
      <circle cx="75" cy="18" r="20" fill="#1f2937"/>
      <text x="75" y="23" fill="#ffffff" font-size="13" text-anchor="middle">📹</text>

      <!-- Share Screen -->
      <circle cx="130" cy="18" r="20" fill="#1f2937"/>
      <text x="130" y="23" fill="#ffffff" font-size="13" text-anchor="middle">🖥️</text>

      <!-- Whiteboard Toggle -->
      <rect x="175" y="-2" width="130" height="40" rx="8" fill="#0284c7"/>
      <text x="240" y="23" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Shared Board: ON</text>

      <!-- End Lesson -->
      <rect x="330" y="-2" width="130" height="40" rx="8" fill="#dc2626"/>
      <text x="395" y="23" fill="#ffffff" font-size="12" font-weight="800" text-anchor="middle">End Lesson</text>
    </g>
  </g>
</svg>`;

// 5. italki Pricing Models & Transparency Breakdown SVG
const italkiPricingSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720" style="background:#0b1120;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <defs>
    <linearGradient id="pRed" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF334B"/>
      <stop offset="100%" stop-color="#E11D48"/>
    </linearGradient>
    <linearGradient id="pCard" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E293B"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
    <filter id="pShadow">
      <feDropShadow dx="0" dy="10" stdDeviation="16" flood-color="#000000" flood-opacity="0.45"/>
    </filter>
  </defs>

  <!-- Title Header -->
  <g transform="translate(60, 45)">
    <rect width="240" height="28" rx="14" fill="#1e293b" stroke="#334155" stroke-width="1"/>
    <text x="120" y="18" fill="#fda4af" font-size="11" font-weight="800" text-anchor="middle" letter-spacing="1">FINANCIAL TRANSPARENCY</text>
    
    <text x="0" y="68" fill="#ffffff" font-size="30" font-weight="800">italki Pay-As-You-Go vs Competitor Subscriptions</text>
    <text x="0" y="96" fill="#94a3b8" font-size="15">Complete breakdown of hourly teacher tiers, trial discounts, and zero forced auto-renewals</text>
  </g>

  <!-- 3-Column Comparative Pricing Architecture -->
  <g transform="translate(60, 185)">
    
    <!-- Tier 1: Community Tutors -->
    <g transform="translate(0, 0)">
      <rect width="365" height="480" rx="16" fill="url(#pCard)" stroke="#334155" stroke-width="1.5" filter="url(#pShadow)"/>
      <g transform="translate(28, 30)">
        <rect width="140" height="24" rx="4" fill="#047857"/>
        <text x="70" y="16" fill="#d1fae5" font-size="10" font-weight="800" text-anchor="middle">CASUAL CONVERSATION</text>
        
        <text x="0" y="58" fill="#ffffff" font-size="22" font-weight="800">Community Tutors</text>
        <text x="0" y="80" fill="#94a3b8" font-size="12">Native speakers for natural dialogue</text>

        <text x="0" y="125" fill="#4ade80" font-size="34" font-weight="900">$5 – $12 <tspan font-size="15" fill="#94a3b8" font-weight="500">/ hour</tspan></text>
        <text x="0" y="148" fill="#38bdf8" font-size="12" font-weight="700">Trial Lesson: $3.00 – $6.00</text>

        <line x1="0" y1="170" x2="310" y2="170" stroke="#334155" stroke-width="1"/>

        <g transform="translate(0, 195)">
          <text x="0" y="16" fill="#e2e8f0" font-size="13">✓ 100% Native Speakers</text>
          <text x="0" y="44" fill="#e2e8f0" font-size="13">✓ Real everyday colloquial slang</text>
          <text x="0" y="72" fill="#e2e8f0" font-size="13">✓ Flexible casual schedules</text>
          <text x="0" y="100" fill="#e2e8f0" font-size="13">✓ Best for maintaining fluency</text>
          <text x="0" y="128" fill="#94a3b8" font-size="12">✖ No formal exam certification</text>
        </g>

        <rect x="0" y="365" width="310" height="46" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
        <text x="155" y="393" fill="#ffffff" font-size="13" font-weight="800" text-anchor="middle">Browse Community Tutors</text>
      </g>
    </g>

    <!-- Tier 2: Professional Teachers (Featured Highlight) -->
    <g transform="translate(395, -15)">
      <rect width="370" height="510" rx="16" fill="#141f36" stroke="#e11d48" stroke-width="2.5" filter="url(#pShadow)"/>
      <rect x="110" y="-12" width="150" height="24" rx="6" fill="url(#pRed)"/>
      <text x="185" y="4" fill="#ffffff" font-size="11" font-weight="800" text-anchor="middle">MOST POPULAR</text>

      <g transform="translate(30, 42)">
        <rect width="160" height="24" rx="4" fill="#0369a1"/>
        <text x="80" y="16" fill="#e0f2fe" font-size="10" font-weight="800" text-anchor="middle">STRUCTURED CURRICULUM</text>
        
        <text x="0" y="58" fill="#ffffff" font-size="22" font-weight="800">Professional Teachers</text>
        <text x="0" y="80" fill="#94a3b8" font-size="12">Certified educators &amp; examiners</text>

        <text x="0" y="125" fill="#ffffff" font-size="34" font-weight="900">$12 – $28 <tspan font-size="15" fill="#94a3b8" font-weight="500">/ hour</tspan></text>
        <text x="0" y="148" fill="#4ade80" font-size="12" font-weight="700">Trial Lesson: 50% OFF ($6 – $14)</text>

        <line x1="0" y1="170" x2="310" y2="170" stroke="#334155" stroke-width="1"/>

        <g transform="translate(0, 195)">
          <text x="0" y="16" fill="#ffffff" font-size="13" font-weight="700">✓ University Degree / DELE / CELTA</text>
          <text x="0" y="44" fill="#ffffff" font-size="13" font-weight="700">✓ Structured textbooks &amp; homework</text>
          <text x="0" y="72" fill="#ffffff" font-size="13" font-weight="700">✓ Exam Prep (IELTS, DELE, JLPT, HSK)</text>
          <text x="0" y="100" fill="#ffffff" font-size="13" font-weight="700">✓ Specialized Business / Medical modules</text>
          <text x="0" y="128" fill="#ffffff" font-size="13" font-weight="700">✓ In-depth grammar diagnostics</text>
        </g>

        <rect x="0" y="380" width="310" height="48" rx="8" fill="url(#pRed)"/>
        <text x="155" y="409" fill="#ffffff" font-size="14" font-weight="800" text-anchor="middle">Find Professional Teachers</text>
      </g>
    </g>

    <!-- Tier 3: Competitor Subscription Lock-in (Comparison) -->
    <g transform="translate(795, 0)">
      <rect width="365" height="480" rx="16" fill="url(#pCard)" stroke="#334155" stroke-width="1.5" filter="url(#pShadow)"/>
      <g transform="translate(28, 30)">
        <rect width="160" height="24" rx="4" fill="#7f1d1d"/>
        <text x="80" y="16" fill="#fecaca" font-size="10" font-weight="800" text-anchor="middle">COMPETITOR LOCK-INS</text>
        
        <text x="0" y="58" fill="#ffffff" font-size="22" font-weight="800">Preply / Babbel Live</text>
        <text x="0" y="80" fill="#94a3b8" font-size="12">Forced monthly subscriptions</text>

        <text x="0" y="125" fill="#f87171" font-size="34" font-weight="900">$80 – $240 <tspan font-size="15" fill="#94a3b8" font-weight="500">/ mo</tspan></text>
        <text x="0" y="148" fill="#ef4444" font-size="12" font-weight="700">Unused credits expire every 28 days</text>

        <line x1="0" y1="170" x2="310" y2="170" stroke="#334155" stroke-width="1"/>

        <g transform="translate(0, 195)">
          <text x="0" y="16" fill="#94a3b8" font-size="13">✖ Recurring monthly credit card bill</text>
          <text x="0" y="44" fill="#94a3b8" font-size="13">✖ Forfeited lessons if you travel</text>
          <text x="0" y="72" fill="#94a3b8" font-size="13">✖ High commission fees deducted</text>
          <text x="0" y="100" fill="#94a3b8" font-size="13">✖ Difficult subscription cancellation</text>
          <text x="0" y="128" fill="#4ade80" font-size="13" font-weight="700">✓ italki has ZERO credit expiration</text>
        </g>

        <rect x="0" y="365" width="310" height="46" rx="8" fill="#0f172a" stroke="#334155" stroke-width="1"/>
        <text x="155" y="393" fill="#fda4af" font-size="13" font-weight="700" text-anchor="middle">italki: Zero Lock-In Guarantee</text>
      </g>
    </g>

  </g>
</svg>`;

writeSvg('italki-review-hero.svg', italkiHeroSvg);
writeSvg('italki-tutor-selection.svg', italkiTutorSelectionSvg);
writeSvg('italki-community-practice.svg', italkiCommunitySvg);
writeSvg('italki-classroom.svg', italkiClassroomSvg);
writeSvg('italki-pricing-breakdown.svg', italkiPricingSvg);

console.log('All 5 official italki vector SVGs successfully generated and saved!');
