import os

os.makedirs('assets/images/banners', exist_ok=True)

# 1. Doctronic Hero Banner
hero_banner = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bgG" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A"/>
      <stop offset="50%" stop-color="#1E293B"/>
      <stop offset="100%" stop-color="#0284C7"/>
    </linearGradient>
    <linearGradient id="cardG" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.02"/>
    </linearGradient>
    <linearGradient id="starG" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="100%" stop-color="#0284C7"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgG)"/>
  <circle cx="1000" cy="150" r="300" fill="#38BDF8" opacity="0.08"/>
  <circle cx="150" cy="500" r="250" fill="#0284C7" opacity="0.1"/>

  <!-- Grid overlay lines -->
  <path d="M0,100 L1200,100 M0,200 L1200,200 M0,300 L1200,300 M0,400 L1200,400 M0,500 L1200,500" stroke="#FFFFFF" stroke-opacity="0.04" stroke-width="1"/>
  <path d="M200,0 L200,630 M400,0 L400,630 M600,0 L600,630 M800,0 L800,630 M1000,0 L1000,630" stroke="#FFFFFF" stroke-opacity="0.04" stroke-width="1"/>

  <!-- Doctronic Brand Icon Large -->
  <g transform="translate(140, 140) scale(1.2)">
    <ellipse cx="0" cy="0" rx="12" ry="45" fill="url(#starG)"/>
    <ellipse cx="0" cy="0" rx="45" ry="12" fill="url(#starG)"/>
    <g transform="rotate(45)">
      <ellipse cx="0" cy="0" rx="12" ry="45" fill="url(#starG)"/>
      <ellipse cx="0" cy="0" rx="45" ry="12" fill="url(#starG)"/>
    </g>
    <path d="M 0,-18 Q 0,0 -18,0 Q 0,0 0,18 Q 0,0 18,0 Q 0,0 0,-18 Z" fill="#FFFFFF"/>
  </g>

  <!-- Title Text -->
  <text x="240" y="130" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="800" font-size="44" fill="#FFFFFF">doctronic</text>
  <text x="240" y="165" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="600" font-size="20" fill="#38BDF8">24/7 AI Health Consultations &amp; U.S. Licensed Telehealth</text>

  <!-- Big Hero Text -->
  <text x="80" y="270" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="800" font-size="42" fill="#FFFFFF">Human-Centered, Multi-Agent AI Healthcare</text>
  <text x="80" y="320" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="500" font-size="22" fill="#94A3B8">Free instant health consults 24/7 with seamless transition to U.S. board-certified physicians.</text>

  <!-- Key Value Cards Row -->
  <g transform="translate(80, 370)">
    <!-- Card 1 -->
    <rect x="0" y="0" width="320" height="180" rx="20" fill="url(#cardG)" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1"/>
    <circle cx="50" cy="50" r="22" fill="#0EA5E9" fill-opacity="0.2"/>
    <text x="50" y="56" text-anchor="middle" font-family="system-ui" font-size="20" fill="#38BDF8">✦</text>
    <text x="90" y="48" font-family="system-ui" font-weight="800" font-size="18" fill="#FFFFFF">Free AI Consult 24/7</text>
    <text x="90" y="70" font-family="system-ui" font-size="13" fill="#38BDF8">Zero Cost • Instant Guidance</text>
    <text x="20" y="110" font-family="system-ui" font-size="13" fill="#CBD5E1">Multi-agent clinical reasoning</text>
    <text x="20" y="132" font-family="system-ui" font-size="13" fill="#CBD5E1">structured debate for higher accuracy.</text>

    <!-- Card 2 -->
    <rect x="360" y="0" width="320" height="180" rx="20" fill="url(#cardG)" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1"/>
    <circle cx="410" cy="50" r="22" fill="#10B981" fill-opacity="0.2"/>
    <text x="410" y="56" text-anchor="middle" font-family="system-ui" font-size="20" fill="#34D399">🩺</text>
    <text x="450" y="48" font-family="system-ui" font-weight="800" font-size="18" fill="#FFFFFF">Telehealth Visits $39</text>
    <text x="450" y="70" font-family="system-ui" font-size="13" fill="#34D399">Licensed Doctors in All 50 States</text>
    <text x="380" y="110" font-family="system-ui" font-size="13" fill="#CBD5E1">Connect with licensed U.S. doctors</text>
    <text x="380" y="132" font-family="system-ui" font-size="13" fill="#CBD5E1">for prescriptions, notes &amp; care.</text>

    <!-- Card 3 -->
    <rect x="720" y="0" width="320" height="180" rx="20" fill="url(#cardG)" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1"/>
    <circle cx="770" cy="50" r="22" fill="#8B5CF6" fill-opacity="0.2"/>
    <text x="770" y="56" text-anchor="middle" font-family="system-ui" font-size="20" fill="#A78BFA">🛡️</text>
    <text x="810" y="48" font-family="system-ui" font-weight="800" font-size="18" fill="#FFFFFF">Insurance &amp; Privacy</text>
    <text x="810" y="70" font-family="system-ui" font-size="13" fill="#A78BFA">HIPAA Aligned &amp; Encrypted</text>
    <text x="740" y="110" font-family="system-ui" font-size="13" fill="#CBD5E1">Major insurance accepted for doctor</text>
    <text x="740" y="132" font-family="system-ui" font-size="13" fill="#CBD5E1">visits. Private &amp; secure by default.</text>
  </g>
</svg>'''

with open('assets/images/banners/doctronic-hero.svg', 'w', encoding='utf-8') as f:
    f.write(hero_banner)

# 2. Doctronic Consultation Workflow Banner
workflow_banner = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 500" width="1200" height="500">
  <defs>
    <linearGradient id="bgG2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F8FAFC"/>
      <stop offset="100%" stop-color="#E2E8F0"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="500" rx="24" fill="url(#bgG2)" stroke="#CBD5E1" stroke-width="1"/>
  
  <text x="600" y="60" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui" font-weight="800" font-size="28" fill="#0F172A">Doctronic Care Journey: From AI Consultation to Physician Care</text>
  <text x="600" y="90" text-anchor="middle" font-family="system-ui" font-size="16" fill="#64748B">Structured 4-Step Patient Experience for Fast, Reliable Healthcare Access</text>

  <!-- Step 1 -->
  <g transform="translate(60, 140)">
    <rect width="240" height="280" rx="20" fill="#FFFFFF" stroke="#0EA5E9" stroke-width="2"/>
    <circle cx="120" cy="50" r="28" fill="#E0F2FE"/>
    <text x="120" y="58" text-anchor="middle" font-family="system-ui" font-weight="800" font-size="20" fill="#0284C7">1</text>
    <text x="120" y="110" text-anchor="middle" font-family="system-ui" font-weight="800" font-size="18" fill="#0F172A">Free AI Consult</text>
    <text x="120" y="135" text-anchor="middle" font-family="system-ui" font-size="13" fill="#0284C7">Available 24/7</text>
    <text x="20" y="175" font-family="system-ui" font-size="13" fill="#475569">Describe symptoms to AI.</text>
    <text x="20" y="195" font-family="system-ui" font-size="13" fill="#475569">Multi-agent system conducts</text>
    <text x="20" y="215" font-family="system-ui" font-size="13" fill="#475569">internal clinical debate.</text>
    <text x="20" y="245" font-family="system-ui" font-weight="700" font-size="12" fill="#10B981">✓ 100% Free &amp; Private</text>
  </g>

  <!-- Arrow 1 -->
  <path d="M 315, 280 L 345, 280" stroke="#0284C7" stroke-width="3" stroke-linecap="round" marker-end="url(#arrow)"/>

  <!-- Step 2 -->
  <g transform="translate(360, 140)">
    <rect width="240" height="280" rx="20" fill="#FFFFFF" stroke="#3B82F6" stroke-width="2"/>
    <circle cx="120" cy="50" r="28" fill="#DBEAFE"/>
    <text x="120" y="58" text-anchor="middle" font-family="system-ui" font-weight="800" font-size="20" fill="#1D4ED8">2</text>
    <text x="120" y="110" text-anchor="middle" font-family="system-ui" font-weight="800" font-size="18" fill="#0F172A">Summary &amp; Guidance</text>
    <text x="120" y="135" text-anchor="middle" font-family="system-ui" font-size="13" fill="#1D4ED8">Personalized Insights</text>
    <text x="20" y="175" font-family="system-ui" font-size="13" fill="#475569">Receive a clear clinical</text>
    <text x="20" y="195" font-family="system-ui" font-size="13" fill="#475569">summary of possible causes</text>
    <text x="20" y="215" font-family="system-ui" font-size="13" fill="#475569">and care recommendations.</text>
    <text x="20" y="245" font-family="system-ui" font-weight="700" font-size="12" fill="#10B981">✓ Physician-Trained AI</text>
  </g>

  <!-- Step 3 -->
  <g transform="translate(660, 140)">
    <rect width="240" height="280" rx="20" fill="#FFFFFF" stroke="#10B981" stroke-width="2"/>
    <circle cx="120" cy="50" r="28" fill="#D1FAE5"/>
    <text x="120" y="58" text-anchor="middle" font-family="system-ui" font-weight="800" font-size="20" fill="#047857">3</text>
    <text x="120" y="110" text-anchor="middle" font-family="system-ui" font-weight="800" font-size="18" fill="#0F172A">Connect with Doctor</text>
    <text x="120" y="135" text-anchor="middle" font-family="system-ui" font-size="13" fill="#047857">$39 or Insurance</text>
    <text x="20" y="175" font-family="system-ui" font-size="13" fill="#475569">Schedule or start video</text>
    <text x="20" y="195" font-family="system-ui" font-size="13" fill="#475569">telehealth visit with licensed</text>
    <text x="20" y="215" font-family="system-ui" font-size="13" fill="#475569">U.S. doctor in all 50 states.</text>
    <text x="20" y="245" font-family="system-ui" font-weight="700" font-size="12" fill="#10B981">✓ Licensed U.S. Physicians</text>
  </g>

  <!-- Step 4 -->
  <g transform="translate(960, 140)">
    <rect width="180" height="280" rx="20" fill="#FFFFFF" stroke="#8B5CF6" stroke-width="2"/>
    <circle cx="90" cy="50" r="28" fill="#EDE9FE"/>
    <text x="90" y="58" text-anchor="middle" font-family="system-ui" font-weight="800" font-size="20" fill="#6D28D9">4</text>
    <text x="90" y="110" text-anchor="middle" font-family="system-ui" font-weight="800" font-size="16" fill="#0F172A">Prescription/Plan</text>
    <text x="90" y="135" text-anchor="middle" font-family="system-ui" font-size="12" fill="#6D28D9">Care Plan &amp; Rx</text>
    <text x="15" y="175" font-family="system-ui" font-size="12" fill="#475569">Get Rx sent to local</text>
    <text x="15" y="195" font-family="system-ui" font-size="12" fill="#475569">pharmacy, doctor's notes</text>
    <text x="15" y="215" font-family="system-ui" font-size="12" fill="#475569">&amp; treatment plans.</text>
    <text x="15" y="245" font-family="system-ui" font-weight="700" font-size="11" fill="#10B981">✓ Sent to Local Pharmacy</text>
  </g>
</svg>'''

with open('assets/images/banners/doctronic-telehealth.svg', 'w', encoding='utf-8') as f:
    f.write(workflow_banner)

print("Created Doctronic SVG banners in assets/images/banners/")
