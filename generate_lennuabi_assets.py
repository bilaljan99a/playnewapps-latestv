import os

os.makedirs('assets/images/banners', exist_ok=True)
os.makedirs('assets/images/brands', exist_ok=True)
os.makedirs('assets/images/lennuabi', exist_ok=True)

# 1. Hero Banner
hero_banner = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#061838" />
      <stop offset="50%" stop-color="#0B2545" />
      <stop offset="100%" stop-color="#134074" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFC800" />
      <stop offset="100%" stop-color="#FF9900" />
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.12" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.04" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000" flood-opacity="0.3" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#skyGrad)" />
  
  <!-- Subtle Flight Path Lines -->
  <path d="M -100 500 Q 400 200 1300 100" stroke="#FFC800" stroke-opacity="0.15" stroke-width="3" fill="none" stroke-dasharray="12,12" />
  <path d="M -100 550 Q 500 250 1300 150" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="2" fill="none" />

  <!-- Left Side: Text & Value Proposition -->
  <g transform="translate(80, 100)">
    <!-- Badge -->
    <rect x="0" y="0" width="280" height="38" rx="19" fill="#FFC800" fill-opacity="0.2" stroke="#FFC800" stroke-width="1.5" />
    <text x="20" y="24" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="14" fill="#FFC800" letter-spacing="1">EU REGULATION EC 261/2004</text>

    <!-- Main Heading -->
    <text x="0" y="90" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="46" fill="#FFFFFF">Get Up To <tspan fill="#FFC800">€600</tspan> Flight</text>
    <text x="0" y="145" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="46" fill="#FFFFFF">Compensation With Lennuabi</text>

    <!-- Subtitle -->
    <text x="0" y="200" font-family="'Plus Jakarta Sans', sans-serif" font-weight="400" font-size="20" fill="#94A3B8">Delayed, Canceled, or Overbooked Flight? Claim Your</text>
    <text x="0" y="230" font-family="'Plus Jakarta Sans', sans-serif" font-weight="400" font-size="20" fill="#94A3B8">Legal Passenger Rights Money with Zero Upfront Risk.</text>

    <!-- Features Pill List -->
    <g transform="translate(0, 270)">
      <!-- Item 1 -->
      <circle cx="12" cy="12" r="10" fill="#10B981" />
      <path d="M8 12 L11 15 L16 9" stroke="#FFFFFF" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
      <text x="32" y="17" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="16" fill="#F8FAFC">100% No Win, No Fee Guarantee</text>

      <!-- Item 2 -->
      <circle cx="12" cy="48" r="10" fill="#10B981" />
      <path d="M8 48 L11 51 L16 45" stroke="#FFFFFF" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
      <text x="32" y="53" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="16" fill="#F8FAFC">Free Instant Eligibility Flight Checker</text>

      <!-- Item 3 -->
      <circle cx="12" cy="84" r="10" fill="#10B981" />
      <path d="M8 84 L11 87 L16 81" stroke="#FFFFFF" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
      <text x="32" y="89" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="16" fill="#F8FAFC">Earn Up To €75 Referral Rewards</text>
    </g>

    <!-- CTA Button Graphic -->
    <g transform="translate(0, 395)" filter="url(#shadow)">
      <rect x="0" y="0" width="310" height="58" rx="14" fill="url(#goldGrad)" />
      <text x="35" y="35" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="18" fill="#061838">CHECK FLIGHT COMPENSATION</text>
      <path d="M 265 29 L 275 29 M 271 24 L 276 29 L 271 34" stroke="#061838" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
    </g>
  </g>

  <!-- Right Side: Flight Board & Compensation Calculator Graphic -->
  <g transform="translate(680, 90)" filter="url(#shadow)">
    <!-- Main Card Container -->
    <rect x="0" y="0" width="440" height="450" rx="24" fill="url(#cardGrad)" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1.5" />

    <!-- Flight Board Header -->
    <rect x="0" y="0" width="440" height="70" rx="24" fill="#0F284D" />
    <text x="30" y="42" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="18" fill="#FFFFFF">Flight Disruption Status Board</text>
    <rect x="330" y="22" width="80" height="26" rx="13" fill="#EF4444" fill-opacity="0.2" stroke="#EF4444" stroke-width="1" />
    <text x="345" y="39" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="12" fill="#F87171">DELAYED</text>

    <!-- Flight Details Row 1 -->
    <g transform="translate(30, 95)">
      <text x="0" y="20" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="16" fill="#F8FAFC">Flight LH 1422 (Frankfurt → Tallinn)</text>
      <text x="0" y="42" font-family="'Plus Jakarta Sans', sans-serif" font-weight="500" font-size="14" fill="#94A3B8">Delay Duration: 4 Hours 15 Mins</text>
      <rect x="270" y="5" width="110" height="36" rx="8" fill="#10B981" fill-opacity="0.15" stroke="#10B981" stroke-width="1" />
      <text x="282" y="28" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="15" fill="#34D399">Eligible: €400</text>
    </g>

    <line x1="30" y1="165" x2="410" y2="165" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1" />

    <!-- Flight Details Row 2 -->
    <g transform="translate(30, 185)">
      <text x="0" y="20" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="16" fill="#F8FAFC">Flight AY 1008 (Helsinki → London)</text>
      <text x="0" y="42" font-family="'Plus Jakarta Sans', sans-serif" font-weight="500" font-size="14" fill="#94A3B8">Cancelled (Notified 2 days prior)</text>
      <rect x="270" y="5" width="110" height="36" rx="8" fill="#10B981" fill-opacity="0.15" stroke="#10B981" stroke-width="1" />
      <text x="282" y="28" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="15" fill="#34D399">Eligible: €600</text>
    </g>

    <line x1="30" y1="255" x2="410" y2="255" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1" />

    <!-- Summary Box inside Card -->
    <g transform="translate(30, 280)">
      <rect x="0" y="0" width="380" height="135" rx="16" fill="#061838" stroke="#FFC800" stroke-opacity="0.3" stroke-width="1.5" />
      <text x="20" y="32" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="15" fill="#FFC800">Lennuabi Claim Guarantee</text>
      <text x="20" y="60" font-family="'Plus Jakarta Sans', sans-serif" font-weight="500" font-size="13" fill="#CBD5E1">• EC261/2004 Legal Enforcement</text>
      <text x="20" y="82" font-family="'Plus Jakarta Sans', sans-serif" font-weight="500" font-size="13" fill="#CBD5E1">• No Legal Risk / Zero Out-of-Pocket Cost</text>
      <text x="20" y="104" font-family="'Plus Jakarta Sans', sans-serif" font-weight="500" font-size="13" fill="#CBD5E1">• Fast Direct Payout to Bank Account</text>
    </g>
  </g>
</svg>'''

with open('assets/images/banners/lennuabi-hero-banner.svg', 'w') as f:
    f.write(hero_banner)

# 2. Compensation Tiers Graphic
tiers_banner = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 450" width="900" height="450">
  <defs>
    <linearGradient id="bgG" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F8FAFC" />
      <stop offset="100%" stop-color="#E2E8F0" />
    </linearGradient>
  </defs>

  <rect width="900" height="450" rx="20" fill="url(#bgG)" stroke="#CBD5E1" stroke-width="1.5" />

  <!-- Header -->
  <text x="450" y="50" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="28" fill="#061838" text-anchor="middle">EU 261/2004 Flight Compensation Tiers</text>
  <text x="450" y="80" font-family="'Plus Jakarta Sans', sans-serif" font-weight="500" font-size="16" fill="#64748B" text-anchor="middle">Legally mandated compensation payouts based on flight distance and delay length</text>

  <!-- 3 Columns -->
  <!-- Tier 1 -->
  <g transform="translate(40, 110)">
    <rect width="250" height="290" rx="16" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" />
    <rect x="0" y="0" width="250" height="70" rx="16" fill="#3B82F6" />
    <text x="125" y="42" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="32" fill="#FFFFFF" text-anchor="middle">€250</text>
    
    <text x="125" y="105" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="16" fill="#0F172A" text-anchor="middle">Short-Haul Flights</text>
    <text x="125" y="130" font-family="'Plus Jakarta Sans', sans-serif" font-weight="500" font-size="14" fill="#64748B" text-anchor="middle">Up to 1,500 km</text>

    <line x1="20" y1="150" x2="230" y2="150" stroke="#F1F5F9" stroke-width="2" />

    <text x="25" y="180" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="13" fill="#334155">• Delay: 3+ hours</text>
    <text x="25" y="205" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="13" fill="#334155">• Cancellation < 14 days</text>
    <text x="25" y="230" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="13" fill="#334155">• Denied boarding</text>

    <rect x="20" y="250" width="210" height="28" rx="6" fill="#EFF6FF" />
    <text x="125" y="269" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="12" fill="#1D4ED8" text-anchor="middle">e.g. London → Paris</text>
  </g>

  <!-- Tier 2 -->
  <g transform="translate(325, 110)">
    <rect width="250" height="290" rx="16" fill="#FFFFFF" stroke="#3B82F6" stroke-width="2" />
    <rect x="0" y="0" width="250" height="70" rx="16" fill="#2563EB" />
    <text x="125" y="42" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="32" fill="#FFFFFF" text-anchor="middle">€400</text>
    
    <text x="125" y="105" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="16" fill="#0F172A" text-anchor="middle">Medium-Haul Flights</text>
    <text x="125" y="130" font-family="'Plus Jakarta Sans', sans-serif" font-weight="500" font-size="14" fill="#64748B" text-anchor="middle">1,500 km – 3,500 km</text>

    <line x1="20" y1="150" x2="230" y2="150" stroke="#F1F5F9" stroke-width="2" />

    <text x="25" y="180" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="13" fill="#334155">• Delay: 3+ hours</text>
    <text x="25" y="205" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="13" fill="#334155">• All intra-EU > 1500km</text>
    <text x="25" y="230" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="13" fill="#334155">• Missed connections</text>

    <rect x="20" y="250" width="210" height="28" rx="6" fill="#EFF6FF" />
    <text x="125" y="269" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="12" fill="#1D4ED8" text-anchor="middle">e.g. Berlin → Canary Islands</text>
  </g>

  <!-- Tier 3 -->
  <g transform="translate(610, 110)">
    <rect width="250" height="290" rx="16" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" />
    <rect x="0" y="0" width="250" height="70" rx="16" fill="#061838" />
    <text x="125" y="42" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="32" fill="#FFC800" text-anchor="middle">€600</text>
    
    <text x="125" y="105" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="16" fill="#0F172A" text-anchor="middle">Long-Haul Flights</text>
    <text x="125" y="130" font-family="'Plus Jakarta Sans', sans-serif" font-weight="500" font-size="14" fill="#64748B" text-anchor="middle">Over 3,500 km</text>

    <line x1="20" y1="150" x2="230" y2="150" stroke="#F1F5F9" stroke-width="2" />

    <text x="25" y="180" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="13" fill="#334155">• Delay: 4+ hours</text>
    <text x="25" y="205" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="13" fill="#334155">• Extra-EU flights</text>
    <text x="25" y="230" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="13" fill="#334155">• Major cancellations</text>

    <rect x="20" y="250" width="210" height="28" rx="6" fill="#FEF3C7" />
    <text x="125" y="269" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="12" fill="#D97706" text-anchor="middle">e.g. Frankfurt → New York</text>
  </g>
</svg>'''

with open('assets/images/banners/lennuabi-compensation-tiers.svg', 'w') as f:
    f.write(tiers_banner)

# 3. Step Process Flow Graphic
process_banner = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 320" width="1000" height="320">
  <rect width="1000" height="320" rx="18" fill="#061838" />

  <text x="500" y="45" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="24" fill="#FFFFFF" text-anchor="middle">How Lennuabi Handles Your Flight Claim</text>
  <text x="500" y="70" font-family="'Plus Jakarta Sans', sans-serif" font-weight="500" font-size="14" fill="#94A3B8" text-anchor="middle">5 Simple Steps from Flight Delay to Bank Payout</text>

  <!-- 5 Connected Nodes -->
  <!-- Step 1 -->
  <g transform="translate(50, 110)">
    <rect width="150" height="160" rx="14" fill="#0B2545" stroke="#FFC800" stroke-width="1.5" />
    <circle cx="75" cy="35" r="20" fill="#FFC800" />
    <text x="75" y="42" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="18" fill="#061838" text-anchor="middle">1</text>
    <text x="75" y="80" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="14" fill="#FFFFFF" text-anchor="middle">Check Flight</text>
    <text x="75" y="105" font-family="'Plus Jakarta Sans', sans-serif" font-weight="400" font-size="12" fill="#94A3B8" text-anchor="middle">Enter flight no. &amp; date</text>
    <text x="75" y="122" font-family="'Plus Jakarta Sans', sans-serif" font-weight="400" font-size="12" fill="#94A3B8" text-anchor="middle">Instant estimate</text>
  </g>

  <!-- Step 2 -->
  <g transform="translate(235, 110)">
    <rect width="150" height="160" rx="14" fill="#0B2545" stroke="#38BDF8" stroke-width="1.5" />
    <circle cx="75" cy="35" r="20" fill="#38BDF8" />
    <text x="75" y="42" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="18" fill="#061838" text-anchor="middle">2</text>
    <text x="75" y="80" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="14" fill="#FFFFFF" text-anchor="middle">Submit Docs</text>
    <text x="75" y="105" font-family="'Plus Jakarta Sans', sans-serif" font-weight="400" font-size="12" fill="#94A3B8" text-anchor="middle">Upload boarding pass</text>
    <text x="75" y="122" font-family="'Plus Jakarta Sans', sans-serif" font-weight="400" font-size="12" fill="#94A3B8" text-anchor="middle">&amp; ID details</text>
  </g>

  <!-- Step 3 -->
  <g transform="translate(420, 110)">
    <rect width="150" height="160" rx="14" fill="#0B2545" stroke="#38BDF8" stroke-width="1.5" />
    <circle cx="75" cy="35" r="20" fill="#38BDF8" />
    <text x="75" y="42" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="18" fill="#061838" text-anchor="middle">3</text>
    <text x="75" y="80" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="14" fill="#FFFFFF" text-anchor="middle">Legal Review</text>
    <text x="75" y="105" font-family="'Plus Jakarta Sans', sans-serif" font-weight="400" font-size="12" fill="#94A3B8" text-anchor="middle">Lennuabi verifies</text>
    <text x="75" y="122" font-family="'Plus Jakarta Sans', sans-serif" font-weight="400" font-size="12" fill="#94A3B8" text-anchor="middle">weather &amp; radar</text>
  </g>

  <!-- Step 4 -->
  <g transform="translate(605, 110)">
    <rect width="150" height="160" rx="14" fill="#0B2545" stroke="#38BDF8" stroke-width="1.5" />
    <circle cx="75" cy="35" r="20" fill="#38BDF8" />
    <text x="75" y="42" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="18" fill="#061838" text-anchor="middle">4</text>
    <text x="75" y="80" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="14" fill="#FFFFFF" text-anchor="middle">Negotiation</text>
    <text x="75" y="105" font-family="'Plus Jakarta Sans', sans-serif" font-weight="400" font-size="12" fill="#94A3B8" text-anchor="middle">Lennuabi enforces</text>
    <text x="75" y="122" font-family="'Plus Jakarta Sans', sans-serif" font-weight="400" font-size="12" fill="#94A3B8" text-anchor="middle">airline payout</text>
  </g>

  <!-- Step 5 -->
  <g transform="translate(790, 110)">
    <rect width="150" height="160" rx="14" fill="#0B2545" stroke="#10B981" stroke-width="2" />
    <circle cx="75" cy="35" r="20" fill="#10B981" />
    <text x="75" y="42" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="18" fill="#FFFFFF" text-anchor="middle">5</text>
    <text x="75" y="80" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="14" fill="#34D399" text-anchor="middle">Receive Cash</text>
    <text x="75" y="105" font-family="'Plus Jakarta Sans', sans-serif" font-weight="400" font-size="12" fill="#94A3B8" text-anchor="middle">Money transferred</text>
    <text x="75" y="122" font-family="'Plus Jakarta Sans', sans-serif" font-weight="400" font-size="12" fill="#94A3B8" text-anchor="middle">direct to bank</text>
  </g>
</svg>'''

with open('assets/images/banners/lennuabi-claim-process.svg', 'w') as f:
    f.write(process_banner)

# 4. Referral Banner
referral_banner = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 240" width="800" height="240">
  <defs>
    <linearGradient id="refGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0F172A" />
      <stop offset="100%" stop-color="#1E293B" />
    </linearGradient>
  </defs>

  <rect width="800" height="240" rx="16" fill="url(#refGrad)" stroke="#FFC800" stroke-width="1.5" />

  <g transform="translate(40, 40)">
    <rect width="120" height="30" rx="15" fill="#FFC800" fill-opacity="0.2" stroke="#FFC800" />
    <text x="15" y="20" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="12" fill="#FFC800">REFERRAL BONUS</text>

    <text x="0" y="70" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="30" fill="#FFFFFF">Earn Up To <tspan fill="#FFC800">€75 Per Friend</tspan></text>
    <text x="0" y="100" font-family="'Plus Jakarta Sans', sans-serif" font-weight="500" font-size="15" fill="#94A3B8">Share your Lennuabi referral link with friends who experienced flight delays.</text>
    <text x="0" y="122" font-family="'Plus Jakarta Sans', sans-serif" font-weight="500" font-size="15" fill="#94A3B8">Receive a cash reward as soon as their claim is approved and settled!</text>
  </g>

  <g transform="translate(560, 45)">
    <rect width="180" height="150" rx="16" fill="#061838" stroke="#10B981" stroke-width="1.5" />
    <text x="90" y="45" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="36" fill="#34D399" text-anchor="middle">€75</text>
    <text x="90" y="75" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="14" fill="#FFFFFF" text-anchor="middle">Cash Bonus</text>
    <rect x="25" y="100" width="130" height="30" rx="6" fill="#10B981" />
    <text x="90" y="120" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="12" fill="#FFFFFF" text-anchor="middle">INVITE FRIENDS</text>
  </g>
</svg>'''

with open('assets/images/banners/lennuabi-referral-banner.svg', 'w') as f:
    f.write(referral_banner)

print("Generated Lennuabi banners successfully!")
