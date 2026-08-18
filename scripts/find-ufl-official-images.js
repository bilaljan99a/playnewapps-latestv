const fs = require('fs');

async function testFetch(url) {
  try {
    console.log('Fetching:', url);
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8'
      }
    });
    console.log(url, 'Status:', res.status);
    const text = await res.text();
    const urls = text.match(/https?:\/\/[^\s"'<>()\\]+?\.(?:png|jpg|jpeg|webp|avif|svg)/gi) || [];
    const unique = Array.from(new Set(urls));
    console.log(`Found ${unique.length} media URLs on ${url}:`);
    console.log(unique.slice(0, 40));
    return unique;
  } catch (err) {
    console.error(`Error fetching ${url}:`, err.message);
    return [];
  }
}

async function main() {
  await testFetch('https://uflgame.com');
  await testFetch('https://joinufl.com');
  await testFetch('https://webshop.uflgame.com');
}

main();
