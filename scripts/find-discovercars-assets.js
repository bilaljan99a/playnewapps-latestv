const fs = require('fs');

async function main() {
  try {
    const res = await fetch('https://www.discovercars.com', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
      }
    });
    console.log('DiscoverCars status:', res.status);
    const html = await res.text();
    const imgs = html.match(/https?:\/\/[^\s"'<>()\\]+?\.(?:png|jpg|jpeg|webp|svg)/gi) || [];
    const relativeImgs = html.match(/src="(\/[^"]+?\.(?:png|jpg|jpeg|webp|svg))"/gi) || [];
    console.log('Absolute media matches:', Array.from(new Set(imgs)).slice(0, 30));
    console.log('Relative media matches:', Array.from(new Set(relativeImgs)).slice(0, 30));
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
}

main();
