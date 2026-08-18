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
  const images = [
    { url: "https://wauglobal.com/cdn/shop/files/Phototherapy-face-mask.webp", dest: "assets/images/banners/wau-hero-official.webp" },
    { url: "https://wauglobal.com/cdn/shop/files/Wireless-led-mask.webp", dest: "assets/images/banners/wau-led-mask-3.webp" },
    { url: "https://wauglobal.com/cdn/shop/files/Microcurrent-anti-aging-face-massager.webp", dest: "assets/images/banners/wau-mira-microcurrent.webp" },
    { url: "https://wauglobal.com/cdn/shop/files/Phototherapy-mask-kit.png", dest: "assets/images/banners/wau-led-set-kit.png" },
    { url: "https://wauglobal.com/cdn/shop/files/Multistyler-for-hair.webp", dest: "assets/images/banners/wau-karu-styler.webp" },
    { url: "https://wauglobal.com/cdn/shop/files/Professional-oral-irrigator.png", dest: "assets/images/banners/wau-oral-care.png" },
    { url: "https://wauglobal.com/cdn/shop/files/Compact-shaver-heads.webp", dest: "assets/images/banners/wau-shavers.webp" }
  ];

  for (let item of images) {
    try {
      console.log(`Downloading ${item.dest}...`);
      await download(item.url, item.dest);
      console.log(`Saved ${item.dest} (${Math.round(fs.statSync(item.dest).size / 1024)} KB)`);
    } catch(e) {
      console.error(`Failed ${item.dest}:`, e.message);
    }
  }
}

run().catch(console.error);
