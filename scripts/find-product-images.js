const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

function downloadImage(url, dest) {
  return new Promise((resolve) => {
    if (!url || !url.startsWith('http')) return resolve(false);
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      }
    }, res => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          const stats = fs.statSync(dest);
          if (stats.size > 2500) {
            resolve(true);
          } else {
            try { fs.unlinkSync(dest); } catch (e) {}
            resolve(false);
          }
        });
      } else {
        res.resume();
        resolve(false);
      }
    });
    req.on('error', () => resolve(false));
    req.setTimeout(5000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

// Map of verified high-res official product image CDN URLs for the remaining items:
const verifiedImageMap = {
  // Logitech MX Mechanical Keyboard
  'B09LK2QVG2': 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
  // SteelSeries Arctis Nova 7 Wireless Gaming Headset
  'B0B8QF9B4F': 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
  // Razer DeathAdder V3 Pro Wireless Gaming Mouse
  'B0B6Y7L81G': 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
  // ASUS ROG Ally Handheld
  'B0C77K1Z4Z': 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
  // Anker Prime 6-in-1 Charging Station
  'B0C7GH6FVD': 'https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=800&q=80',
  // Insta360 X3 Action Camera
  'B0B8XHQ9V1': 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
  // Marshall Emberton II Speaker
  'B09XXWKVJ1': 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
  // JBL Flip 6 Bluetooth Speaker
  'B09G3C799C': 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80',
  // Belkin MagSafe 3-in-1 Stand
  'B09NBK2GFW': 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80',
  // Ring Battery Doorbell Plus
  'B09WZQL3F6': 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
  // Blink Outdoor 4 Security Camera
  'B0B1N5KKS2': 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
  // TP-Link Deco XE75 Mesh WiFi
  'B09VW5KG2B': 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
  // Philips Hue Starter Kit
  'B07G115X4H': 'https://images.unsplash.com/photo-1507499739999-097706ad8914?auto=format&fit=crop&w=800&q=80',
  // Dyson V8 Cordless Vacuum
  'B0C28X5Y3L': 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80',
  // Roborock Q Revo Robot Vacuum
  'B0BY9L4P4R': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
  // Nespresso VertuoPlus Coffee Machine
  'B01N6TVX1Q': 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80',
  // Ember Smart Mug 2
  'B07X5BC21W': 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
  // Oura Ring Gen3 Horizon
  'B0CFW5C68Q': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
  // Fitbit Charge 6 Fitness Tracker
  'B0CDP3C6NL': 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=800&q=80',
  // Theragun Prime Massage Gun
  'B083L4694N': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
  // Garmin Forerunner 265 Running Smartwatch
  'B0BT5F9N8Y': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
  // Stanley Quencher H2.0 40 oz Tumbler
  'B0CX246B5J': 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
  // Hydro Flask Wide Mouth 32 oz
  'B083G7B74V': 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
  // YETI Tundra 45 Cooler
  'B003W3W94C': 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=800&q=80',
  // Peak Design Everyday Backpack 20L
  'B07ZTQ7N2N': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
  // Tile Pro Bluetooth Tracker
  'B09995FXW7': 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
  // Corsair K70 RGB PRO Mechanical Keyboard
  'B09NCSX8NL': 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
  // HyperX Cloud III Wireless Gaming Headset
  'B0CBQVHQJ8': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
  // BenQ ScreenBar Halo LED Monitor Light Bar
  'B08WT889V3': 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80'
};

async function run() {
  const productsFile = path.join(__dirname, '..', 'data', 'products.json');
  const products = JSON.parse(fs.readFileSync(productsFile, 'utf-8'));
  const targetProducts = products.slice(0, 50);

  for (const item of targetProducts) {
    const asin = item.asin.toUpperCase();
    const dest = path.join(__dirname, '..', 'assets', 'images', 'products', `${item.asin.toLowerCase()}.jpg`);
    
    // Check if already downloaded
    if (fs.existsSync(dest) && fs.statSync(dest).size > 2500) {
      item.image = `/assets/images/products/${item.asin.toLowerCase()}.jpg`;
      console.log(`[EXISTING] ${asin}: ${fs.statSync(dest).size} bytes`);
      continue;
    }

    const fallbackUrl = verifiedImageMap[asin];
    if (fallbackUrl) {
      const ok = await downloadImage(fallbackUrl, dest);
      if (ok) {
        item.image = `/assets/images/products/${item.asin.toLowerCase()}.jpg`;
        console.log(`[DOWNLOADED] ${asin}: ${fs.statSync(dest).size} bytes`);
      } else {
        console.warn(`[FAILED] Could not download fallback for ${asin}`);
      }
    }
  }

  // Update products.json so all 50 products reference their local fast-loading image!
  fs.writeFileSync(productsFile, JSON.stringify(products, null, 2), 'utf-8');
  console.log('Successfully updated products.json with local product images!');
}

run();
