const https = require("https");
const fs = require("fs");

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" } }, (res) => {
      let data = "";
      res.on("data", c => data += c);
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch(e) {
          resolve({ error: e.message, raw: data.slice(0, 500) });
        }
      });
    }).on("error", reject);
  });
}

async function run() {
  console.log("Fetching Shopify products.json...");
  const data = await fetchJson("https://wauglobal.com/products.json?limit=250");
  if (data.products) {
    console.log(`Found ${data.products.length} products!`);
    fs.writeFileSync("wau-products.json", JSON.stringify(data.products, null, 2));

    const discounted = [];
    const regular = [];

    data.products.forEach(p => {
      const v = p.variants[0];
      const price = parseFloat(v.price);
      const comparePrice = v.compare_at_price ? parseFloat(v.compare_at_price) : null;
      let discountPct = 0;
      if (comparePrice && comparePrice > price) {
        discountPct = Math.round(((comparePrice - price) / comparePrice) * 100);
      }
      const item = {
        id: p.id,
        title: p.title,
        handle: p.handle,
        product_type: p.product_type,
        tags: p.tags,
        price,
        comparePrice,
        discountPct,
        image: p.images && p.images[0] ? p.images[0].src : null,
        imagesCount: p.images ? p.images.length : 0
      };
      if (discountPct > 0) {
        discounted.push(item);
      } else {
        regular.push(item);
      }
    });

    console.log(`\n=== DISCOUNTED PRODUCTS (${discounted.length}) ===`);
    discounted.sort((a,b) => b.discountPct - a.discountPct).forEach(d => {
      console.log(`[${d.discountPct}% OFF] ${d.title} | Now: €${d.price} (Was: €${d.comparePrice}) | Type: ${d.product_type} | Handle: ${d.handle}`);
    });

    console.log(`\n=== REGULAR PRODUCTS (${regular.length}) ===`);
    regular.forEach(r => {
      console.log(`[Reg] ${r.title} | Price: €${r.price} | Type: ${r.product_type} | Handle: ${r.handle}`);
    });
  } else {
    console.log("Products endpoint response:", data);
  }
}

run().catch(console.error);
