const fs = require('fs');

const banners = [
  {
    filename: 'assets/images/banners/applicantally-banner-deal-1.svg',
    gradStart: '#1E1B4B', gradEnd: '#2563EB', badgeText: '⚡ EXCLUSIVE VERIFIED COUPON 2026', badgeBg: '#3B82F6',
    title1: 'Extra 30 Free Minutes Added', title2: 'Use Promo Code: ASTART30', title2Color: '#60A5FA',
    desc: 'Get +30 minutes bonus added to any pay-as-you-go time pack. AI live interview copilot.',
    btnText: 'REDEEM ASTART30 NOW →',
    badgeVal: '+30 MINS FREE'
  },
  {
    filename: 'assets/images/banners/applicantally-banner-deal-2.svg',
    gradStart: '#0F172A', gradEnd: '#0D9488', badgeText: '🎁 100% FREE NO CREDIT CARD', badgeBg: '#14B8A6',
    title1: 'Free 15-Minute Live Trial', title2: 'Test Real-Time AI Copilot', title2Color: '#2DD4BF',
    desc: 'Instant real-time speech-to-text response suggestions discreetly on your screen.',
    btnText: 'START 15-MIN FREE TRIAL →',
    badgeVal: '15-MIN TRIAL'
  },
  {
    filename: 'assets/images/banners/applicantally-banner-deal-3.svg',
    gradStart: '#2E1065', gradEnd: '#4338CA', badgeText: '🔥 PAY-AS-YOU-GO TIME PACKS', badgeBg: '#8B5CF6',
    title1: 'Discreet & 100% Invisible Overlay', title2: 'Save Up to 35% on Packs', title2Color: '#C084FC',
    desc: 'Invisible to Zoom, Microsoft Teams & Google Meet screen sharing during live calls.',
    btnText: 'CLAIM PACK DISCOUNT →',
    badgeVal: 'SAVE UP TO 35%'
  },
  {
    filename: 'assets/images/banners/italki-banner-deal-1.svg',
    gradStart: '#881337', gradEnd: '#E11D48', badgeText: '🌟 50% OFF FEATURED OFFER', badgeBg: '#F43F5E',
    title1: 'Get 50% OFF Trial Lessons', title2: 'Start Speaking A New Language Today', title2Color: '#FDA4AF',
    desc: 'Connect with 30,000+ native speakers & certified tutors across 150+ languages.',
    btnText: 'BOOK 50% TRIAL LESSON →',
    badgeVal: '50% OFF TRIAL'
  },
  {
    filename: 'assets/images/banners/italki-banner-deal-2.svg',
    gradStart: '#1E1B4B', gradEnd: '#E11D48', badgeText: '🎉 NEW USER SPECIAL BONUS', badgeBg: '#FF5A5F',
    title1: 'Claim $10 Bonus Credits', title2: 'Buy $20 Credits & Get $10 Free', title2Color: '#FF8A8E',
    desc: 'Flexible pay-per-lesson language learning with no forced monthly subscriptions.',
    btnText: 'CLAIM $10 BONUS CREDIT →',
    badgeVal: '$10 BONUS'
  },
  {
    filename: 'assets/images/banners/italki-banner-deal-3.svg',
    gradStart: '#064E3B', gradEnd: '#0D9488', badgeText: '🌍 LEARN FROM NATIVE TUTORS', badgeBg: '#10B981',
    title1: 'Master English, Spanish, Japanese', title2: '& 150+ Languages 1-on-1', title2Color: '#34D399',
    desc: 'Tailored 1-on-1 live video classes on your desktop, iOS, or Android device.',
    btnText: 'EXPLORE NATIVE TUTORS →',
    badgeVal: '150+ LANGUAGES'
  }
];

banners.forEach(b => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 400" width="1200" height="400">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${b.gradStart}"/>
      <stop offset="100%" stop-color="${b.gradEnd}"/>
    </linearGradient>
    <filter id="shadow">
      <feDropShadow dx="0" dy="10" stdDeviation="15" flood-color="#000000" flood-opacity="0.3"/>
    </filter>
  </defs>
  <rect width="1200" height="400" rx="24" fill="url(#bg)"/>
  <path d="M 0 100 L 1200 100 M 0 200 L 1200 200 M 0 300 L 1200 300" stroke="#FFFFFF" stroke-width="1" opacity="0.08"/>
  <path d="M 300 0 L 300 400 M 600 0 L 600 400 M 900 0 L 900 400" stroke="#FFFFFF" stroke-width="1" opacity="0.08"/>
  <g transform="translate(60, 60)">
    <rect width="360" height="38" rx="19" fill="${b.badgeBg}"/>
    <text x="180" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="14" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">
      ${b.badgeText}
    </text>
    <text x="0" y="95" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="42" fill="#FFFFFF" letter-spacing="-1">
      ${b.title1}
    </text>
    <text x="0" y="145" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="42" fill="${b.title2Color}" letter-spacing="-1">
      ${b.title2}
    </text>
    <text x="0" y="188" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="500" font-size="18" fill="#E2E8F0">
      ${b.desc}
    </text>
    <g transform="translate(0, 215)" filter="url(#shadow)">
      <rect width="320" height="56" rx="14" fill="#FFFFFF"/>
      <text x="160" y="34" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="17" fill="#0F172A" text-anchor="middle">
        ${b.btnText}
      </text>
    </g>
  </g>
  <g transform="translate(800, 70)" filter="url(#shadow)">
    <rect width="320" height="260" rx="20" fill="#FFFFFF" opacity="0.12" stroke="#FFFFFF" stroke-width="2"/>
    <circle cx="160" cy="110" r="50" fill="#FFFFFF" opacity="0.2"/>
    <text x="160" y="120" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="32" fill="#FFFFFF" text-anchor="middle">
      PLAY
    </text>
    <text x="160" y="200" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="20" fill="#FFFFFF" text-anchor="middle" letter-spacing="2">
      ${b.badgeVal}
    </text>
  </g>
</svg>`;
  fs.writeFileSync(b.filename, svg);
  console.log('Created banner:', b.filename);
});
