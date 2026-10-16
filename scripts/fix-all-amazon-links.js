const fs = require('fs');
const path = require('path');
const https = require('https');

function checkAmazonUrl(url) {
  return new Promise(resolve => {
    try {
      const req = https.get(url, {
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
          const ok = (res.statusCode === 200 || res.statusCode === 301 || res.statusCode === 302) && !isDog;
          resolve({ ok, status: res.statusCode, isDog });
        });
      });
      req.on('error', () => resolve({ ok: false, status: 'ERR', isDog: false }));
      req.setTimeout(3500, () => {
        req.destroy();
        resolve({ ok: false, status: 'TIMEOUT', isDog: false });
      });
    } catch (e) {
      resolve({ ok: false, status: 'EXCEPTION', isDog: false });
    }
  });
}

// Clean title into a high-converting Amazon search query
function getCleanSearchQuery(title) {
  return title
    .replace(/\s*\(.*?\)\s*/g, ' ')
    .replace(/\s*\[.*?\]\s*/g, ' ')
    .replace(/,\s*\d+.*$/g, '')
    .replace(/[–—]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .slice(0, 7)
    .join(' ');
}

// Candidate active ASINs for known items:
const candidateAsins = {
  'amazon-b0chx545tc': 'B0CHX68KTL', // Apple Watch
  'amazon-b09lk2qvg2': 'B09LK16V36', // Logitech MX Mechanical
  'amazon-b0b8qf9b4f': 'B0B8QF9816', // Arctis Nova 7
  'amazon-b0b6y7l81g': 'B0B6Y5L8X8', // Razer DeathAdder V3 Pro
  'amazon-b0c77k1z4z': 'B0C7GH6FVD', // ROG Ally
  'amazon-b0cdx1gqg3': 'B0CDX3P3Y6', // DJI Mini 4 Pro
  'amazon-b0b8xhq9v1': 'B0B8XGYK3S', // Insta360 X3
  'amazon-b09xxwkvj1': 'B09XXVK8X3', // Marshall Emberton II
  'amazon-b09g3c799c': 'B09G3CVPTM', // JBL Flip 6
  'amazon-b09nbk2gfw': 'B084G4MGDT', // Belkin BoostCharge
  'amazon-b09wzql3f6': 'B09WZ5KTRM', // Ring Doorbell Plus
  'amazon-b0b1n5kks2': 'B0B1N4N79M', // Blink Outdoor 4
  'amazon-b09vw5kg2b': 'B09PRB1MZM', // TP-Link Deco XE75
  'amazon-b07g115x4h': 'B07G12S9BC', // Philips Hue
  'amazon-b0c28x5y3l': 'B01I93282W', // Dyson V8
  'amazon-b0by9l4p4r': 'B0BVWCX9QG', // Roborock Q Revo
  'amazon-b01n6tvx1q': 'B01N6T5D3X', // Nespresso VertuoPlus
  'amazon-b07x5bc21w': 'B07X7G245X', // Ember Mug 2
  'amazon-b0cfw5c68q': 'B0CDP3C6NL', // Oura Ring
  'amazon-b0cdp3c6nl': 'B0CCZ3K3YV', // Fitbit Charge 6
  'amazon-b083l4694n': 'B083M1FX8Y', // Theragun Prime
  'amazon-b0bt5f9n8y': 'B0BT5D7V5Z', // Garmin Forerunner 265
  'amazon-b0cx246b5j': 'B0BP8R4H2S', // Stanley Quencher
  'amazon-b083g7b74v': 'B083G6C5Y3', // Hydro Flask
  'amazon-b003w3w94c': 'B0083BOGHC', // YETI Tundra 45
  'amazon-b07ztq7n2n': 'B07ZTQ8M8Z', // Peak Design 20L
  'amazon-b09995fxw7': 'B099981KFL', // Tile Pro
  'amazon-b09ncsx8nl': 'B09NCT6644', // Corsair K70
  'amazon-b0cbqvhqj8': 'B0CBQV1ZNL'  // HyperX Cloud III
};

async function fixAllAmazonLinks() {
  const productsFile = path.join(__dirname, '..', 'data', 'products.json');
  const products = JSON.parse(fs.readFileSync(productsFile, 'utf-8'));
  const tag = 'playnewapps-20';

  console.log(`Starting link verification and repair for ${products.length} products...`);
  let fixedCount = 0;
  let alreadyValidCount = 0;

  for (let i = 0; i < products.length; i++) {
    const item = products[i];
    const isAmazon = item.store === 'amazon' || (item.affiliateUrl && item.affiliateUrl.includes('amazon.com'));
    if (!isAmazon) continue;

    const currentUrl = item.affiliateUrl || item.productUrl;
    let asin = item.asin;
    
    // Check if current direct ASIN works
    let check = await checkAmazonUrl(`https://www.amazon.com/dp/${asin}`);
    
    if (check.ok) {
      alreadyValidCount++;
      item.affiliateUrl = `https://www.amazon.com/dp/${asin}?tag=${tag}`;
      item.productUrl = `https://www.amazon.com/dp/${asin}`;
      console.log(`[VALID] ${asin} -> ${item.title.substring(0, 40)}`);
      continue;
    }

    // Try candidate ASIN if available
    let resolvedAsin = candidateAsins[item.id];
    let resolved = false;
    if (resolvedAsin) {
      const candidateCheck = await checkAmazonUrl(`https://www.amazon.com/dp/${resolvedAsin}`);
      if (candidateCheck.ok) {
        item.asin = resolvedAsin;
        item.affiliateUrl = `https://www.amazon.com/dp/${resolvedAsin}?tag=${tag}`;
        item.productUrl = `https://www.amazon.com/dp/${resolvedAsin}`;
        fixedCount++;
        resolved = true;
        console.log(`[FIXED-ASIN] ${asin} -> ${resolvedAsin} (${item.title.substring(0, 35)})`);
      }
    }

    // If candidate ASIN did not work or not available, use the guaranteed Amazon Search Affiliate URL!
    if (!resolved) {
      const query = getCleanSearchQuery(item.title);
      const searchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(query)}&tag=${tag}`;
      item.affiliateUrl = searchUrl;
      item.productUrl = `https://www.amazon.com/s?k=${encodeURIComponent(query)}`;
      fixedCount++;
      console.log(`[FIXED-SEARCH] ${asin} -> Amazon Search "${query}"`);
    }
  }

  fs.writeFileSync(productsFile, JSON.stringify(products, null, 2), 'utf-8');
  console.log('\n=======================================');
  console.log(`Total checked Amazon items. Already valid: ${alreadyValidCount}, Fixed/Guaranteed: ${fixedCount}`);
  console.log('products.json updated successfully!');
}

fixAllAmazonLinks();
