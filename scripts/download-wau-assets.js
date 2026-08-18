const https = require("https");
const fs = require("fs");

function download(url, dest) {
  if (url.startsWith("//")) url = "https:" + url;
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      const stream = fs.createWriteStream(dest);
      res.pipe(stream);
      stream.on("finish", () => {
        stream.close();
        resolve();
      });
    }).on("error", reject);
  });
}

async function run() {
  const html = fs.readFileSync("wau-home.html", "utf8");
  
  // Find logo in header or shopify files
  const cdnFiles = [...html.matchAll(/(https?:)?\/\/wauglobal\.com\/cdn\/shop\/files\/[a-zA-Z0-9_\-\.]+\.(?:png|svg|jpg|webp)/gi)].map(m => m[0]);
  console.log("Unique CDN files on WAU:", [...new Set(cdnFiles)]);
  
  // Let us see if there is a logo or Fav
  for (let f of cdnFiles) {
    if (f.toLowerCase().includes("logo") || f.toLowerCase().includes("fav") || f.toLowerCase().includes("brand")) {
      console.log("Downloading logo candidate:", f);
      await download(f, "assets/images/brands/wau-downloaded.png");
    }
  }
}

run().catch(console.error);
