const fs = require('fs');
const path = require('path');

function createSvgFromImage(imagePath, title, badgeText = 'Official Interface') {
  const ext = path.extname(imagePath).toLowerCase();
  const mime = ext === '.png' ? 'image/png' : 'image/jpeg';
  const imgBuffer = fs.readFileSync(imagePath);
  const base64Data = imgBuffer.toString('base64');
  const dataUri = `data:${mime};base64,${base64Data}`;

  // Clean SVG wrapper embedding the authentic original screenshot
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1280 720" width="100%" height="100%" style="background:#0f172a;border-radius:16px;overflow:hidden;">
  <defs>
    <clipPath id="clipRounded">
      <rect width="1280" height="720" rx="16" ry="16"/>
    </clipPath>
  </defs>
  <g clip-path="url(#clipRounded)">
    <image href="${dataUri}" xlink:href="${dataUri}" x="0" y="0" width="1280" height="720" preserveAspectRatio="xMidYMid slice"/>
  </g>
</svg>`;
}

// 1. CANVA SVGs from REAL OFFICIAL SCREENSHOTS
const canvaMappings = [
  {
    target: 'assets/images/canva/canva-hero-overview.svg',
    source: 'assets/images/canva/official-canva-workspace-overview-hd.jpg',
    title: 'Canva Cloud-Native Workspace Interface'
  },
  {
    target: 'assets/images/canva/canva-magic-studio.svg',
    source: 'assets/images/canva/official-canva-magic-studio-hd.jpg',
    title: 'Canva Magic Studio AI Tools'
  },
  {
    target: 'assets/images/canva/canva-templates-ecosystem.svg',
    source: 'assets/images/canva/official-canva-templates-hd.jpg',
    title: 'Canva Curated Template Library'
  },
  {
    target: 'assets/images/canva/canva-video-photo-editor.svg',
    source: 'assets/images/canva/official-canva-video-photo-hd.jpg',
    title: 'Canva Multi-Track Video and Photo Suite'
  },
  {
    target: 'assets/images/canva/canva-presentations.svg',
    source: 'assets/images/canva/official-canva-presentations-hd.jpg',
    title: 'Canva Interactive Presentations & Pitch Decks'
  },
  {
    target: 'assets/images/canva/canva-brand-kit-collaboration.svg',
    source: 'assets/images/canva/official-canva-brand-hub-hd.jpg',
    title: 'Canva Brand Hub & Team Asset Governance'
  }
];

canvaMappings.forEach(item => {
  const svg = createSvgFromImage(item.source, item.title, 'Official Canva UI');
  fs.writeFileSync(item.target, svg, 'utf8');
  console.log(`Generated real Canva SVG: ${item.target} (${(fs.statSync(item.target).size / 1024).toFixed(1)} KB)`);
});

// 2. ITALKI SVGs from REAL OFFICIAL SCREENSHOTS
const italkiMappings = [
  {
    target: 'assets/images/italki/italki-review-hero.svg',
    bannerTarget: 'assets/images/banners/italki-review-hero.svg',
    source: 'assets/images/italki/italki-official-tutor-browse.jpg',
    title: 'italki Global Tutor Marketplace'
  },
  {
    target: 'assets/images/italki/italki-tutor-selection.svg',
    bannerTarget: 'assets/images/banners/italki-tutor-selection.svg',
    source: 'assets/images/italki/italki-official-tutor-profile.jpg',
    title: 'italki Teacher Profile & Qualifications'
  },
  {
    target: 'assets/images/italki/italki-community-practice.svg',
    bannerTarget: 'assets/images/banners/italki-community-practice.svg',
    source: 'assets/images/italki/italki-official-community-practice.jpg',
    title: 'italki Community Practice & Corrections'
  },
  {
    target: 'assets/images/italki/italki-classroom.svg',
    bannerTarget: 'assets/images/banners/italki-classroom.svg',
    source: 'assets/images/italki/italki-official-1on1-classroom.jpg',
    title: 'italki WebRTC 1-on-1 Virtual Classroom'
  },
  {
    target: 'assets/images/italki/italki-pricing-breakdown.svg',
    bannerTarget: 'assets/images/banners/italki-pricing-breakdown.svg',
    source: 'assets/images/italki/italki-official-lesson-booking.jpg',
    title: 'italki Lesson Booking & Flexible Pricing'
  }
];

italkiMappings.forEach(item => {
  const svg = createSvgFromImage(item.source, item.title, 'Official italki UI');
  fs.writeFileSync(item.target, svg, 'utf8');
  if (item.bannerTarget) {
    fs.writeFileSync(item.bannerTarget, svg, 'utf8');
  }
  console.log(`Generated real italki SVG: ${item.target} (${(fs.statSync(item.target).size / 1024).toFixed(1)} KB)`);
});

console.log('All Canva and italki real SVG images generated successfully!');
