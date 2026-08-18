const fs = require("fs");

const products = JSON.parse(fs.readFileSync("wau-products.json", "utf8"));
console.log("Total products:", products.length);

const discounted = [];
const allCategorized = {
  "LED Masks & Phototherapy": [],
  "Microcurrent & Facial Lifting": [],
  "Eye Care & Specialized RF": [],
  "Hair Styling & Scalp Care": [],
  "Dental & Oral Care": [],
  "Body Sculpting & Massage": [],
  "Shavers & Trimmers": [],
  "Discounted Sets & Bundles": [],
  "Cosmetics & MTS Serums": [],
  "Biohacking & Supplements": [],
  "Accessories & Replacements": []
};

products.forEach(p => {
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
    images: p.images ? p.images.map(i => i.src) : []
  };

  if (discountPct > 0) {
    discounted.push(item);
  }

  const titleLower = p.title.toLowerCase();
  const typeLower = (p.product_type || "").toLowerCase();

  if (titleLower.includes("led mask") || titleLower.includes("phototherapy") || titleLower.includes("led face")) {
    allCategorized["LED Masks & Phototherapy"].push(item);
  } else if (titleLower.includes("mira") || titleLower.includes("mio") || titleLower.includes("microcurrent") || titleLower.includes("ren") || titleLower.includes("scrubber") || titleLower.includes("lifting")) {
    allCategorized["Microcurrent & Facial Lifting"].push(item);
  } else if (titleLower.includes("ai new") || titleLower.includes("eye") || titleLower.includes("lipo jeune")) {
    allCategorized["Eye Care & Specialized RF"].push(item);
  } else if (titleLower.includes("karu") || titleLower.includes("yuto") || titleLower.includes("hair") || titleLower.includes("styler") || titleLower.includes("comb")) {
    allCategorized["Hair Styling & Scalp Care"].push(item);
  } else if (titleLower.includes("miga") || titleLower.includes("mori") || titleLower.includes("oral") || titleLower.includes("irrigator") || titleLower.includes("toothbrush") || titleLower.includes("dental")) {
    allCategorized["Dental & Oral Care"].push(item);
  } else if (titleLower.includes("hige") || titleLower.includes("shaver") || titleLower.includes("blade")) {
    allCategorized["Shavers & Trimmers"].push(item);
  } else if (titleLower.includes("set") || titleLower.includes("набор") || titleLower.includes("комплекс") || typeLower === "sets") {
    allCategorized["Discounted Sets & Bundles"].push(item);
  } else if (typeLower === "supplements" || titleLower.includes("vitamin") || titleLower.includes("omega") || titleLower.includes("complex") || titleLower.includes("chelate")) {
    allCategorized["Biohacking & Supplements"].push(item);
  } else if (typeLower === "cosmetics" || titleLower.includes("gel") || titleLower.includes("cream") || titleLower.includes("serum") || titleLower.includes("pad")) {
    allCategorized["Cosmetics & MTS Serums"].push(item);
  } else if (typeLower === "accessories" || titleLower.includes("nozzle") || titleLower.includes("replacement") || titleLower.includes("attachment")) {
    allCategorized["Accessories & Replacements"].push(item);
  } else {
    allCategorized["Body Sculpting & Massage"].push(item);
  }
});

console.log("\n================ DISCOUNTED PRODUCTS ================");
discounted.sort((a,b) => b.discountPct - a.discountPct).forEach(d => {
  console.log(`- ${d.discountPct}% OFF: ${d.title} | Now: €${d.price} (Was: €${d.comparePrice}) | Save: €${(d.comparePrice - d.price).toFixed(2)} | Image: ${d.image}`);
});

console.log("\n================ CATEGORY COUNTS ================");
Object.keys(allCategorized).forEach(cat => {
  console.log(`${cat}: ${allCategorized[cat].length} products`);
});
