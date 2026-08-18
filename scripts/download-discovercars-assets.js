const fs = require('fs');
const path = require('path');

async function downloadAsset(url, dest) {
  try {
    console.log(`Downloading ${url} to ${dest}...`);
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buffer);
    console.log(`Saved ${dest} (${buffer.length} bytes)`);
    return true;
  } catch (err) {
    console.error(`Error downloading ${url}:`, err.message);
    return false;
  }
}

async function main() {
  await downloadAsset('https://www.discovercars.com/assets/common/img/logos/discovercars.svg', 'assets/images/brands/discovercars.svg');
  await downloadAsset('https://www.discovercars.com/resources/common/discovercars-thumbnail.jpg', 'assets/images/banners/discovercars-hero.jpg');
  await downloadAsset('https://www.discovercars.com/images/cms/world_travel_tech_awards_winner_2025_847bc120d8.png', 'assets/images/brands/discovercars-award-1.png');
  await downloadAsset('https://www.discovercars.com/images/cms/Magellan_Travel_Weekly_Awards_Gold_Winner_2025_2f318de710.webp', 'assets/images/brands/discovercars-award-2.webp');
}

main();
