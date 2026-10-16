const fs = require('fs');
const path = require('path');
const https = require('https');

function checkAsinUrl(asin) {
  return new Promise(resolve => {
    if (!asin || asin.length < 5) return resolve({ asin, ok: false, status: 'NO_ASIN' });
    const req = https.get(`https://www.amazon.com/dp/${asin}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    }, res => {
      let chunk = '';
      res.on('data', c => {
        if (chunk.length < 1500) chunk += c;
        if (chunk.length >= 1500) {
          req.destroy();
        }
      });
      res.on('close', () => {
        const isDog = res.statusCode === 404 || chunk.includes("couldn't find that page") || chunk.includes("dogs of Amazon");
        const isOk = (res.statusCode === 200 || res.statusCode === 301 || res.statusCode === 302) && !isDog;
        resolve({ asin, ok: isOk, status: res.statusCode, isDog });
      });
    });
    req.on('error', () => resolve({ asin, ok: false, status: 'ERR' }));
    req.setTimeout(4000, () => {
      req.destroy();
      resolve({ asin, ok: false, status: 'TIMEOUT' });
    });
  });
}

async function verifyAll() {
  const productsFile = path.join(__dirname, '..', 'data', 'products.json');
  const products = JSON.parse(fs.readFileSync(productsFile, 'utf-8'));
  const amazonProducts = products.filter(p => p.store === 'amazon' || (p.affiliateUrl && p.affiliateUrl.includes('amazon.com')));

  console.log(`Checking ${amazonProducts.length} Amazon products...`);
  const results = [];

  for (let i = 0; i < amazonProducts.length; i++) {
    const p = amazonProducts[i];
    const res = await checkAsinUrl(p.asin);
    results.push({ item: p, ...res });
    console.log(`[${i+1}/${amazonProducts.length}] ${p.asin} -> ${res.ok ? 'VALID (200)' : 'BROKEN (' + res.status + ')'} - ${p.title.substring(0, 35)}`);
  }

  const broken = results.filter(r => !r.ok);
  const valid = results.filter(r => r.ok);
  console.log(`\n--- SUMMARY ---`);
  console.log(`Total: ${amazonProducts.length}`);
  console.log(`Valid: ${valid.length}`);
  console.log(`Broken: ${broken.length}`);

  fs.writeFileSync(path.join(__dirname, 'verification-results.json'), JSON.stringify(results, null, 2));
}

verifyAll();
