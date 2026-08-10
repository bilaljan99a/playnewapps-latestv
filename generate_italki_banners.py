import os

# Create banners directory if not exists
os.makedirs('assets/images/banners', exist_ok=True)

# 1. italki Review Hero Banner SVG
hero_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A"/>
      <stop offset="50%" stop-color="#1E293B"/>
      <stop offset="100%" stop-color="#881337"/>
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.9"/>
    </linearGradient>
    <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#E11D48"/>
      <stop offset="100%" stop-color="#F43F5E"/>
    </linearGradient>
    <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F43F5E" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#FB7185" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  
  <!-- Subtle Grid Pattern -->
  <g opacity="0.08">
    <path d="M0,70 H1200 M0,140 H1200 M0,210 H1200 M0,280 H1200 M0,350 H1200 M0,420 H1200 M0,490 H1200 M0,560 H1200" stroke="#FFFFFF" stroke-width="1"/>
    <path d="M100,0 V630 M200,0 V630 M300,0 V630 M400,0 V630 M500,0 V630 M600,0 V630 M700,0 V630 M800,0 V630 M900,0 V630 M1000,0 V630 M1100,0 V630" stroke="#FFFFFF" stroke-width="1"/>
  </g>

  <!-- Glowing background elements -->
  <circle cx="200" cy="150" r="250" fill="url(#glow)"/>
  <circle cx="1000" cy="480" r="300" fill="url(#glow)"/>

  <!-- Left Content Area -->
  <g transform="translate(80, 80)">
    <!-- Category Badge -->
    <rect x="0" y="0" width="230" height="36" rx="18" fill="url(#badgeGrad)"/>
    <text x="115" y="23" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="800" text-anchor="middle" letter-spacing="1">1-ON-1 LESSON BENCHMARK</text>

    <!-- Main Title -->
    <text x="0" y="90" fill="#FFFFFF" font-family="'Playfair Display', serif" font-size="44" font-weight="800">italki Review (2026)</text>
    <text x="0" y="135" fill="#FDA4AF" font-family="'Plus Jakarta Sans', sans-serif" font-size="28" font-weight="700">Master 150+ Languages with Native Tutors</text>

    <!-- Rating Block -->
    <g transform="translate(0, 165)">
      <rect x="0" y="0" width="160" height="42" rx="10" fill="#0F172A" stroke="#334155" stroke-width="1.5"/>
      <text x="18" y="27" fill="#F59E0B" font-family="'Plus Jakarta Sans', sans-serif" font-size="18" font-weight="800">4.8 / 5.0</text>
      <text x="92" y="26" fill="#FBBF24" font-family="'Plus Jakarta Sans', sans-serif" font-size="15">★★★★★</text>
    </g>

    <!-- Feature Highlights -->
    <g transform="translate(0, 240)">
      <circle cx="12" cy="12" r="10" fill="#F43F5E"/>
      <path d="M8 12 L11 15 L16 9" stroke="#FFFFFF" stroke-width="2" fill="none"/>
      <text x="32" y="16" fill="#F1F5F9" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="600">30,000+ Native Tutors & Certified Teachers</text>

      <circle cx="12" cy="52" r="10" fill="#F43F5E"/>
      <path d="M8 52 L11 55 L16 49" stroke="#FFFFFF" stroke-width="2" fill="none"/>
      <text x="32" y="56" fill="#F1F5F9" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="600">Strict Pay-As-You-Go (Zero Subscriptions)</text>

      <circle cx="12" cy="92" r="10" fill="#F43F5E"/>
      <path d="M8 92 L11 95 L16 89" stroke="#FFFFFF" stroke-width="2" fill="none"/>
      <text x="32" y="96" fill="#F1F5F9" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="600">50% OFF First 3 Trial Lessons</text>

      <circle cx="12" cy="132" r="10" fill="#F43F5E"/>
      <path d="M8 132 L11 135 L16 129" stroke="#FFFFFF" stroke-width="2" fill="none"/>
      <text x="32" y="136" fill="#F1F5F9" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="600">Integrated Video Classroom & Whiteboard</text>
    </g>
  </g>

  <!-- Right Visual Mockup (Video Call Representation) -->
  <g transform="translate(620, 75)">
    <!-- Outer Window Frame -->
    <rect x="0" y="0" width="500" height="470" rx="20" fill="url(#cardGrad)" stroke="#334155" stroke-width="2"/>
    
    <!-- Window Controls -->
    <circle cx="25" cy="25" r="6" fill="#EF4444"/>
    <circle cx="45" cy="25" r="6" fill="#F59E0B"/>
    <circle cx="65" cy="25" r="6" fill="#10B981"/>
    <text x="250" y="29" fill="#94A3B8" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600" text-anchor="middle">italki Live Classroom — 1-on-1 Lesson</text>
    
    <line x1="0" y1="45" x2="500" y2="45" stroke="#334155" stroke-width="1"/>

    <!-- Video Main Area -->
    <rect x="20" y="65" width="460" height="280" rx="14" fill="#090D16" stroke="#1E293B" stroke-width="1"/>

    <!-- Tutor Avatar Placeholder & Visual -->
    <circle cx="250" cy="170" r="50" fill="#334155"/>
    <path d="M210 240 C210 200 290 200 290 240" stroke="#475569" stroke-width="4" fill="none"/>
    
    <!-- Live Badge -->
    <rect x="35" y="80" width="85" height="26" rx="13" fill="#E11D48"/>
    <circle cx="48" cy="93" r="4" fill="#FFFFFF"/>
    <text x="60" y="97" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="800">LIVE 1-ON-1</text>

    <!-- Subtitles / Live Chat Banner -->
    <rect x="35" y="280" width="430" height="50" rx="10" fill="#1E293B" opacity="0.9" stroke="#334155" stroke-width="1"/>
    <text x="50" y="302" fill="#F8FAFC" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600">Tutor (Spanish): "¡Excelente pronunciación! Recuerda usar el subjuntivo."</text>
    <text x="50" y="320" fill="#FDA4AF" font-family="'Plus Jakarta Sans', sans-serif" font-size="11">Student: "Muchas gracias, ¿podemos practicar la conjugación de nuevo?"</text>

    <!-- Bottom Controls -->
    <g transform="translate(20, 365)">
      <rect x="0" y="0" width="460" height="80" rx="12" fill="#0F172A" stroke="#1E293B" stroke-width="1"/>
      <text x="20" y="30" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="700">italki Interactive Whiteboard & Notes</text>
      <text x="20" y="52" fill="#94A3B8" font-family="'Plus Jakarta Sans', sans-serif" font-size="12">Vocabulary: el desarrollo (development) • la fluidez (fluency)</text>
      
      <rect x="350" y="20" width="90" height="38" rx="8" fill="#E11D48"/>
      <text x="395" y="44" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="800" text-anchor="middle">End Call</text>
    </g>
  </g>
</svg>
"""

with open('assets/images/banners/italki-review-hero.svg', 'w') as f:
    f.write(hero_svg)

# 2. italki Tutor Selection SVG
tutor_selection_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500" width="1000" height="500">
  <defs>
    <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E293B"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
  </defs>

  <rect width="1000" height="500" rx="20" fill="url(#bg2)"/>
  
  <!-- Header Bar -->
  <rect x="0" y="0" width="1000" height="60" fill="#0F172A" rx="20"/>
  <text x="30" y="36" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="18" font-weight="800">italki Tutor Search Engine & Smart Filter Benchmarking</text>

  <!-- Filter Bar Mockup -->
  <g transform="translate(30, 80)">
    <rect x="0" y="0" width="940" height="50" rx="10" fill="#334155"/>
    <text x="20" y="30" fill="#94A3B8" font-family="'Plus Jakarta Sans', sans-serif" font-size="12">I want to learn:</text>
    <rect x="110" y="10" width="120" height="30" rx="6" fill="#0F172A"/>
    <text x="125" y="30" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="700">Spanish ▼</text>

    <text x="250" y="30" fill="#94A3B8" font-family="'Plus Jakarta Sans', sans-serif" font-size="12">Teacher Type:</text>
    <rect x="340" y="10" width="160" height="30" rx="6" fill="#0F172A"/>
    <text x="355" y="30" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="700">All (30k+ Tutors) ▼</text>

    <text x="520" y="30" fill="#94A3B8" font-family="'Plus Jakarta Sans', sans-serif" font-size="12">Price / Hr:</text>
    <rect x="590" y="10" width="120" height="30" rx="6" fill="#0F172A"/>
    <text x="605" y="30" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="700">$5 – $15 ▼</text>

    <rect x="730" y="10" width="190" height="30" rx="6" fill="#E11D48"/>
    <text x="825" y="30" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="800" text-anchor="middle">Find My Tutor</text>
  </g>

  <!-- Tutor Cards Row -->
  <g transform="translate(30, 150)">
    <!-- Tutor 1 -->
    <rect x="0" y="0" width="290" height="310" rx="14" fill="#0F172A" stroke="#334155" stroke-width="1.5"/>
    <circle cx="60" cy="50" r="30" fill="#E11D48"/>
    <text x="60" y="56" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="800" text-anchor="middle">MA</text>
    <text x="105" y="42" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="700">Maria A.</text>
    <text x="105" y="60" fill="#38BDF8" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600">Professional Teacher</text>
    <text x="20" y="105" fill="#F59E0B" font-family="'Plus Jakarta Sans', sans-serif" font-size="12">★ 4.9 (420 lessons)</text>
    <text x="20" y="130" fill="#94A3B8" font-family="'Plus Jakarta Sans', sans-serif" font-size="12">Speaks: Spanish (Native), English (C2)</text>
    <text x="20" y="150" fill="#CBD5E1" font-family="'Plus Jakarta Sans', sans-serif" font-size="12">"DELE Certified & Conversational Specialist"</text>
    <rect x="20" y="180" width="250" height="35" rx="8" fill="#1E293B"/>
    <text x="35" y="202" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="800">$12 / hr</text>
    <text x="180" y="202" fill="#10B981" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700">Trial: $6</text>
    <rect x="20" y="235" width="250" height="45" rx="8" fill="#E11D48"/>
    <text x="145" y="262" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="800" text-anchor="middle">Book 30-Min Trial</text>

    <!-- Tutor 2 -->
    <g transform="translate(325, 0)">
      <rect x="0" y="0" width="290" height="310" rx="14" fill="#0F172A" stroke="#334155" stroke-width="1.5"/>
      <circle cx="60" cy="50" r="30" fill="#0284C7"/>
      <text x="60" y="56" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="800" text-anchor="middle">KS</text>
      <text x="105" y="42" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="700">Kenji S.</text>
      <text x="105" y="60" fill="#10B981" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600">Community Tutor</text>
      <text x="20" y="105" fill="#F59E0B" font-family="'Plus Jakarta Sans', sans-serif" font-size="12">★ 5.0 (850 lessons)</text>
      <text x="20" y="130" fill="#94A3B8" font-family="'Plus Jakarta Sans', sans-serif" font-size="12">Speaks: Japanese (Native), English (B2)</text>
      <text x="20" y="150" fill="#CBD5E1" font-family="'Plus Jakarta Sans', sans-serif" font-size="12">"Casual Tokyo Japanese & Business Manners"</text>
      <rect x="20" y="180" width="250" height="35" rx="8" fill="#1E293B"/>
      <text x="35" y="202" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="800">$9 / hr</text>
      <text x="180" y="202" fill="#10B981" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700">Trial: $4.50</text>
      <rect x="20" y="235" width="250" height="45" rx="8" fill="#E11D48"/>
      <text x="145" y="262" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="800" text-anchor="middle">Book 30-Min Trial</text>
    </g>

    <!-- Tutor 3 -->
    <g transform="translate(650, 0)">
      <rect x="0" y="0" width="290" height="310" rx="14" fill="#0F172A" stroke="#334155" stroke-width="1.5"/>
      <circle cx="60" cy="50" r="30" fill="#7C3AED"/>
      <text x="60" y="56" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="800" text-anchor="middle">CL</text>
      <text x="105" y="42" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="700">Claire L.</text>
      <text x="105" y="60" fill="#38BDF8" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600">Professional Teacher</text>
      <text x="20" y="105" fill="#F59E0B" font-family="'Plus Jakarta Sans', sans-serif" font-size="12">★ 4.9 (1,120 lessons)</text>
      <text x="20" y="130" fill="#94A3B8" font-family="'Plus Jakarta Sans', sans-serif" font-size="12">Speaks: French (Native), Spanish (C1)</text>
      <text x="20" y="150" fill="#CBD5E1" font-family="'Plus Jakarta Sans', sans-serif" font-size="12">"DELF Preparation & Parisian Pronunciation"</text>
      <rect x="20" y="180" width="250" height="35" rx="8" fill="#1E293B"/>
      <text x="35" y="202" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="800">$16 / hr</text>
      <text x="180" y="202" fill="#10B981" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700">Trial: $8</text>
      <rect x="20" y="235" width="250" height="45" rx="8" fill="#E11D48"/>
      <text x="145" y="262" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="800" text-anchor="middle">Book 30-Min Trial</text>
    </g>
  </g>
</svg>
"""

with open('assets/images/banners/italki-tutor-selection.svg', 'w') as f:
    f.write(tutor_selection_svg)

# 3. Pricing comparison graphic
pricing_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 450" width="1000" height="450">
  <defs>
    <linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A"/>
      <stop offset="100%" stop-color="#1E293B"/>
    </linearGradient>
  </defs>

  <rect width="1000" height="450" rx="20" fill="url(#bg3)"/>

  <text x="500" y="50" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="22" font-weight="800" text-anchor="middle">italki Financial Model vs. Competitor Monthly Lock-Ins</text>

  <g transform="translate(60, 90)">
    <!-- italki Box -->
    <rect x="0" y="0" width="410" height="310" rx="16" fill="#1E293B" stroke="#E11D48" stroke-width="2.5"/>
    <rect x="0" y="0" width="410" height="50" rx="16" fill="#E11D48"/>
    <text x="205" y="32" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="800" text-anchor="middle">italki Pay-As-You-Go (Recommended)</text>
    
    <text x="30" y="90" fill="#10B981" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="700">✓ Pay only for booked lessons</text>
    <text x="30" y="125" fill="#10B981" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="700">✓ 30,000+ native tutors across 150+ languages</text>
    <text x="30" y="160" fill="#10B981" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="700">✓ $5 - $15 average community tutor rates</text>
    <text x="30" y="195" fill="#10B981" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="700">✓ 50% discount on 3 initial trial lessons</text>
    <text x="30" y="230" fill="#10B981" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="700">✓ Unused credits never expire</text>

    <rect x="30" y="255" width="350" height="40" rx="10" fill="#0F172A"/>
    <text x="205" y="280" fill="#F43F5E" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="800" text-anchor="middle">Zero Recurring Subscription Traps</text>

    <!-- Competitor Box -->
    <g transform="translate(470, 0)">
      <rect x="0" y="0" width="410" height="310" rx="16" fill="#0F172A" stroke="#334155" stroke-width="1.5"/>
      <rect x="0" y="0" width="410" height="50" rx="16" fill="#334155"/>
      <text x="205" y="32" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="700" text-anchor="middle">Traditional Apps / Preply Subscriptions</text>

      <text x="30" y="90" fill="#EF4444" font-family="'Plus Jakarta Sans', sans-serif" font-size="14">✗ Forced monthly recurring payments ($60-$200/mo)</text>
      <text x="30" y="125" fill="#EF4444" font-family="'Plus Jakarta Sans', sans-serif" font-size="14">✗ Unused lesson hours expire at end of month</text>
      <text x="30" y="160" fill="#EF4444" font-family="'Plus Jakarta Sans', sans-serif" font-size="14">✗ Rigid weekly schedules with single tutor</text>
      <text x="30" y="195" fill="#EF4444" font-family="'Plus Jakarta Sans', sans-serif" font-size="14">✗ Limited trial discounts</text>
      <text x="30" y="230" fill="#EF4444" font-family="'Plus Jakarta Sans', sans-serif" font-size="14">✗ Cancellation penalties & auto-renewals</text>

      <rect x="30" y="255" width="350" height="40" rx="10" fill="#1E293B"/>
      <text x="205" y="280" fill="#94A3B8" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="600" text-anchor="middle">High Financial Waste for Busy Learners</text>
    </g>
  </g>
</svg>
"""

with open('assets/images/banners/italki-pricing-breakdown.svg', 'w') as f:
    f.write(pricing_svg)

print("Generated italki banner SVGs successfully!")
