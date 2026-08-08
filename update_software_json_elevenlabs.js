const fs = require('fs');
let data = fs.readFileSync('data/software.json', 'utf8');
let json = JSON.parse(data);

const elevenlabs = {
  "id": "elevenlabs",
  "name": "ElevenLabs",
  "developer": "ElevenLabs",
  "category": "AI Voice Generator",
  "rating": 4.9,
  "reviewCount": 12540,
  "summary": "The ultimate AI voice generator featuring hyper-realistic text-to-speech, instant voice cloning, and real-time AI dubbing across 29 languages.",
  "logo": "/assets/images/brands/elevenlabs-logo.svg",
  "heroImage": "https://eleven-public-cdn.elevenlabs.io/payloadcms/klynektbpi-BlogCover7.jpg",
  "reviewUrl": "elevenlabs-review.html",
  "affiliateUrl": "https://elevenlabs.io",
  "downloadUrl": "https://elevenlabs.io",
  "pricing": {
    "free": "$0/month (10k chars)",
    "subscription": "From $5.00/mo"
  },
  "pros": [
    "Unrivaled hyper-realistic human voice quality",
    "Instant voice cloning from just 60s of audio",
    "AI dubbing supports 29 languages seamlessly",
    "Extensive community voice library"
  ],
  "cons": [
    "Character limits on generated audio tests",
    "No built-in timeline video editor"
  ],
  "title": "ElevenLabs Review 2026",
  "icon": "/assets/images/brands/elevenlabs-logo.svg",
  "image": "https://eleven-public-cdn.elevenlabs.io/payloadcms/klynektbpi-BlogCover7.jpg",
  "description": "ElevenLabs is a cutting-edge voice AI company offering text-to-speech, voice cloning, and AI dubbing tools with unprecedented realism.",
  "url": "elevenlabs-review.html",
  "categoryId": "pc",
  "platforms": [
    "Web",
    "API"
  ]
};

// Only add if not already there
if (!json.find(app => app.id === 'elevenlabs')) {
    json.unshift(elevenlabs);
    fs.writeFileSync('data/software.json', JSON.stringify(json, null, 2));
    console.log('Successfully added ElevenLabs to software.json');
} else {
    console.log('ElevenLabs already exists in software.json');
}
