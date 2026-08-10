const fs = require('fs');

// 1. Update software.json
const softwarePath = 'data/software.json';
if (fs.existsSync(softwarePath)) {
  const software = JSON.parse(fs.readFileSync(softwarePath, 'utf8'));
  
  software.forEach(item => {
    if (item.id === 'italki') {
      item.title = "italki Review (2026): 1-on-1 Online Language Lessons & Tutors";
      item.description = "Comprehensive expert review of italki language learning app. Discover how to learn 150+ languages with 30,000+ native tutors, trial pricing, and verified promo deals.";
      item.summary = "Master any language with 1-on-1 online lessons from 30,000+ native speakers worldwide. Flexible pay-per-lesson model with no subscription commitment.";
      item.icon = "/assets/images/brands/italki.svg";
      item.logo = "/assets/images/brands/italki.svg";
      item.image = "/assets/images/brands/italki.svg";
      item.heroImage = "/assets/images/banners/italki-banner-deal-1.svg";
      item.reviewUrl = "italki-coupons.html";
      item.url = "italki-coupons.html";
    }
    if (item.id === 'applicantally') {
      item.title = "ApplicantAlly Review (2026): AI Live Interview Assistant & Copilot";
      item.description = "In-depth expert review of ApplicantAlly AI live interview assistant. Learn how real-time speech-to-text response suggestions work discreetly during video calls.";
      item.summary = "ApplicantAlly is an AI interview copilot for live interviews that listens to questions in real time and provides instant, discreet response suggestions on your screen.";
      item.icon = "/assets/images/brands/applicantally-icon.png";
      item.logo = "/assets/images/brands/applicantally.svg";
      item.image = "/assets/images/brands/applicantally.svg";
      item.heroImage = "/assets/images/banners/applicantally-banner-deal-1.svg";
      item.reviewUrl = "applicantally-coupons.html";
      item.url = "applicantally-coupons.html";
    }
  });

  fs.writeFileSync(softwarePath, JSON.stringify(software, null, 4));
  console.log('Updated software.json');
}

// 2. Update stores.json
const storesPath = 'data/stores.json';
if (fs.existsSync(storesPath)) {
  const stores = JSON.parse(fs.readFileSync(storesPath, 'utf8'));

  stores.forEach(s => {
    if (s.id === 'italki') {
      s.title = "italki Review (2026): 1-on-1 Online Language Lessons & Tutors";
      s.logo = "/assets/images/brands/italki.svg";
      s.storeUrl = "italki-coupons.html";
      s.banners = [
        {
          image: "/assets/images/banners/italki-banner-deal-1.svg",
          title: "Get 50% OFF Your First Trial Lesson",
          link: "https://flcoz.com/g/9ks8krpbbqb68b264a769911c0dd7a/",
          buttonText: "Book 50% Trial"
        },
        {
          image: "/assets/images/banners/italki-banner-deal-2.svg",
          title: "Claim $10 Bonus Credits On Your First Purchase",
          link: "https://flcoz.com/g/9ks8krpbbqb68b264a769911c0dd7a/",
          buttonText: "Claim $10 Bonus"
        },
        {
          image: "/assets/images/banners/italki-banner-deal-3.svg",
          title: "Pay-Per-Lesson Language Learning – Zero Subscriptions",
          link: "https://flcoz.com/g/9ks8krpbbqb68b264a769911c0dd7a/",
          buttonText: "Explore Tutors"
        }
      ];
    }
    if (s.id === 'applicantally') {
      s.title = "ApplicantAlly Review (2026): AI Live Interview Assistant & Copilot";
      s.logo = "/assets/images/brands/applicantally.svg";
      s.storeUrl = "applicantally-coupons.html";
      s.banners = [
        {
          image: "/assets/images/banners/applicantally-banner-deal-1.svg",
          title: "Extra 30 Free Minutes Added with Code: ASTART30",
          link: "https://xqjeo.com/g/p8sdxttwkob68b264a7630360631df/",
          buttonText: "Redeem Code ASTART30"
        },
        {
          image: "/assets/images/banners/applicantally-banner-deal-2.svg",
          title: "15-Minute Free Trial – Test Real-Time AI Interview Assistance",
          link: "https://xqjeo.com/g/p8sdxttwkob68b264a7630360631df/",
          buttonText: "Start Free Trial"
        },
        {
          image: "/assets/images/banners/applicantally-banner-deal-3.svg",
          title: "Discreet & 100% Invisible Overlay for Zoom, Teams & Google Meet",
          link: "https://xqjeo.com/g/p8sdxttwkob68b264a7630360631df/",
          buttonText: "Claim Pack Discount"
        }
      ];
    }
  });

  fs.writeFileSync(storesPath, JSON.stringify(stores, null, 4));
  console.log('Updated stores.json');
}
