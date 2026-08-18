const fs = require('fs');
const path = require('path');

const officialImages = [
  {
    name: 'ufl-hero-official.jpg',
    url: 'https://uflgame.com/wp-content/uploads/2026/04/FOOTM_2823_3840_2160_v02-scaled.webp',
    fallbackUrl: 'https://uflgame.com/wp-content/uploads/2026/05/UFL-1920x1080_ENG-1.webp'
  },
  {
    name: 'ufl-gameplay-official.jpg',
    url: 'https://uflgame.com/wp-content/uploads/2026/05/UFL-1920x1080_ENG-1.webp',
    fallbackUrl: 'https://uflgame.com/wp-content/uploads/2026/06/UFL_Article-PvP_1920x1080.webp'
  },
  {
    name: 'ufl-webshop-official.jpg',
    url: 'https://uflgame.com/wp-content/uploads/2026/05/UFL-Squad-Swap-Exlainer-Cover-1920x1080-1.webp',
    fallbackUrl: 'https://cdn.xsolla.net/merchant-bucket-prod/files/uploaded/sitebuilder/821115/3aaa0ff8bbdda4ea2b82bc9c2c0334c4.jpg'
  },
  {
    name: 'ufl-teampass-official.jpg',
    url: 'https://uflgame.com/wp-content/uploads/2026/07/UFL-Pre-Season-Camp-TeamPass-KV2-1920x1080-1.webp',
    fallbackUrl: 'https://uflgame.com/wp-content/uploads/2026/07/UFL-Breakthrough-Pack-3840x2160-1-400x220.webp'
  }
];

async function downloadImage(item) {
  const destPath = path.join('assets/images/banners', item.name);
  console.log(`Downloading ${item.name} from ${item.url}...`);
  try {
    let res = await fetch(item.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
      }
    });

    if (!res.ok && item.fallbackUrl) {
      console.log(`Primary failed (${res.status}), trying fallback: ${item.fallbackUrl}`);
      res = await fetch(item.fallbackUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
        }
      });
    }

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }

    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(destPath, buffer);
    console.log(`Successfully saved ${destPath} (${buffer.length} bytes)`);
    return true;
  } catch (err) {
    console.error(`Failed to download ${item.name}:`, err.message);
    return false;
  }
}

async function main() {
  for (const img of officialImages) {
    await downloadImage(img);
  }
}

main();
