const fs = require('fs');

let html = fs.readFileSync('elevenlabs-review.html', 'utf8');

// Replace the fantasy book image under section 9 with the official Voice Cloning & Quality Tuning UI image
const oldImg = '<img src="https://eleven-public-cdn.elevenlabs.io/payloadcms/zxkj4p06eoh-audiobook-narrator-cover.webp" alt="ElevenLabs Creative Output" width="900" height="450" loading="lazy">';
const newImg = '<img src="https://eleven-public-cdn.elevenlabs.io/payloadcms/70i3eou5egx-voice-cloning-cover.webp" alt="ElevenLabs Voice Cloning & Quality Tuning Interface" width="900" height="450" loading="lazy">';

if (html.includes(oldImg)) {
    html = html.replace(oldImg, newImg);
    fs.writeFileSync('elevenlabs-review.html', html);
    console.log('Successfully replaced Section 9 image with official Voice Cloning UI!');
} else {
    console.log('Target string not found, searching with regex...');
    html = html.replace(/<img src="https:\/\/eleven-public-cdn\.elevenlabs\.io\/payloadcms\/zxkj4p06eoh-audiobook-narrator-cover\.webp"[^>]*>/, newImg);
    fs.writeFileSync('elevenlabs-review.html', html);
    console.log('Replaced via regex.');
}
