const https = require("https");
const fs = require("fs");

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" } }, (res) => {
      let data = "";
      res.on("data", c => data += c);
      res.on("end", () => resolve(data));
    }).on("error", reject);
  });
}

async function run() {
  const html = await fetch("https://wauglobal.com/");
  fs.writeFileSync("wau-home.html", html);
  console.log("HTML length:", html.length);

  // Let us see title, meta tags, headers
  const title = html.match(/<title>([^<]+)<\/title>/i);
  console.log("Title:", title ? title[1] : "N/A");

  // Find all links
  const links = [...html.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
  console.log("Unique links count:", new Set(links).size);
  const categories = links.filter(l => l.includes("/category/") || l.includes("/collection") || l.includes("/catalog") || l.includes("/shop"));
  console.log("Categories / catalog links:", [...new Set(categories)]);

  // Let us search for products in the HTML
  const productMatches = [...html.matchAll(/class="[^"]*(?:product|card|item)[^"]*"[\s\S]*?<\/div>/gi)];
  console.log("Product card matches count:", productMatches.length);

  // Find all images
  const imgs = [...html.matchAll(/(?:src|data-src|srcset)="([^"]+)"/g)].map(m => m[1]);
  const productImgs = imgs.filter(i => (i.includes(".jpg") || i.includes(".png") || i.includes(".webp")) && (i.includes("upload") || i.includes("product") || i.includes("image") || i.includes("media")));
  console.log("Product images found:", [...new Set(productImgs)].slice(0, 25));
}

run().catch(console.error);
