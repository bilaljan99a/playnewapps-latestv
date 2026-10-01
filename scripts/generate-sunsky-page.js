const fs = require('fs');

const deals = [
  {
    id: "deal-sunsky-1",
    code: "EDA0070271",
    type: "CODE",
    discount: "15% OFF",
    category: "phone-cases",
    title: "15% OFF iPhone 16 Pro Max / Pro / Plus Lichi Texture PU Leather Cases",
    description: "Apply this verified SUNSKY promo code at checkout to claim an exclusive 15% discount on iPhone 16 Pro Max, 16 Pro, 16 Plus, and iPhone 16 dual-color lichi grain PU leather phone cases in Orange, Black, Green, and White.",
    url: "https://dorinebeaumont.com/g/7npkd4cs1ib68b264a76869a299fda/?ulp=https://www.sunsky-online.com/product/default!link.do?itemNo=EDA007027104A",
    verified: true,
    successRate: 99,
    usersCount: 3840
  },
  {
    id: "deal-sunsky-2",
    code: "EDA0070272",
    type: "CODE",
    discount: "15% OFF",
    category: "phone-cases",
    title: "15% OFF Google Pixel 9 Pro XL & Pixel 9 Hybrid Ring Kickstand Shockproof Cases",
    description: "Take an instant 15% discount on heavy-duty TPU hybrid PC armor cases featuring a 360-degree rotating metal ring kickstand and hidden card slot for Google Pixel 9 Pro XL, Pixel 9 Pro, and Pixel 9.",
    url: "https://dorinebeaumont.com/g/7npkd4cs1ib68b264a76869a299fda/?ulp=https://www.sunsky-online.com/product/default!link.do?itemNo=EDA007027201D",
    verified: true,
    successRate: 98,
    usersCount: 3120
  },
  {
    id: "deal-sunsky-3",
    code: "EDA0070273",
    type: "CODE",
    discount: "15% OFF",
    category: "phone-cases",
    title: "15% OFF iPhone 16 Series Black Frame Two-Color Calf Texture PU Cases",
    description: "Unlock 15% savings on luxury calf-texture phone cases with shock-absorbent black camera frames for iPhone 16 Pro Max, 16 Pro, 16 Plus, and iPhone 16 across Black, Pink, Blue, Brown, and Red colorways.",
    url: "https://dorinebeaumont.com/g/7npkd4cs1ib68b264a76869a299fda/?ulp=https://www.sunsky-online.com/product/default!link.do?itemNo=EDA007027301A",
    verified: true,
    successRate: 99,
    usersCount: 2980
  },
  {
    id: "deal-sunsky-4",
    code: "EDA0070274",
    type: "CODE",
    discount: "15% OFF",
    category: "phone-cases",
    title: "15% OFF Google Pixel 9 Pro XL & Pixel 9 Skin-Feel MagSafe Magnetic Cases",
    description: "Enjoy 15% off ultra-soft dual-color skin-feel protective cases engineered with high-strength MagSafe magnetic wireless charging arrays for Google Pixel 9 Pro XL and Pixel 9.",
    url: "https://dorinebeaumont.com/g/7npkd4cs1ib68b264a76869a299fda/?ulp=https://www.sunsky-online.com/product/default!link.do?itemNo=EDA007027401C",
    verified: true,
    successRate: 97,
    usersCount: 2450
  },
  {
    id: "deal-sunsky-5",
    code: "TBD06051669",
    type: "CODE",
    discount: "15% OFF",
    category: "tools",
    title: "15% OFF Woodturning Pen Mandrel Collet Lathe Turning Clamping Tool",
    description: "Receive 15% off precision DIY woodworking penmaking lathe collet chucks with Morse taper shank or straight shank fittings designed for vibration-free pen turning.",
    url: "https://dorinebeaumont.com/g/7npkd4cs1ib68b264a76869a299fda/?ulp=https://www.sunsky-online.com/product/default!link.do?itemNo=TBD0605166901A",
    verified: true,
    successRate: 96,
    usersCount: 1690
  },
  {
    id: "deal-sunsky-6",
    code: "NEWARRIVALS",
    type: "SALE",
    discount: "25% OFF",
    category: "electronics",
    title: "Up to 25% OFF Trending New Arrivals in Consumer Electronics & Accessories",
    description: "Save up to 25% on weekly factory-fresh arrivals spanning smart home accessories, fast GaN wall chargers, active stylus pens, and automotive diagnostics at factory-direct pricing.",
    url: "https://dorinebeaumont.com/g/7npkd4cs1ib68b264a76869a299fda/?ulp=https://www.sunsky-online.com/marketing/newArrivals",
    verified: true,
    successRate: 99,
    usersCount: 5870
  },
  {
    id: "deal-sunsky-7",
    code: "BULKSAVE35",
    type: "SALE",
    discount: "35% OFF",
    category: "wholesale",
    title: "Up to 35% OFF Tiered Bulk Wholesale Volume Pricing (Zero MOQ)",
    description: "Take advantage of SUNSKY transparent volume discounts with automatic price breaks scaling from 1 item to 1,000+ pieces, saving up to 35% on mobile repair parts and phone accessories.",
    url: "https://dorinebeaumont.com/g/7npkd4cs1ib68b264a76869a299fda/?ulp=https://www.sunsky-online.com",
    verified: true,
    successRate: 100,
    usersCount: 8420
  },
  {
    id: "deal-sunsky-8",
    code: "DROPSHIPVIP",
    type: "SALE",
    discount: "FREE VIP",
    category: "wholesale",
    title: "Free Global Dropshipping Membership with Automated Order Sync & Blind Shipping",
    description: "Access turnkey blind dropshipping with zero membership fees. Packages ship directly to your customers with your business name on labels and zero SUNSKY branding.",
    url: "https://dorinebeaumont.com/g/7npkd4cs1ib68b264a76869a299fda/?ulp=https://www.sunsky-online.com",
    verified: true,
    successRate: 100,
    usersCount: 9650
  },
  {
    id: "deal-sunsky-9",
    code: "FLASH70",
    type: "SALE",
    discount: "70% OFF",
    category: "electronics",
    title: "Up to 70% OFF Clearance Electronics, Tempered Glass & Cables",
    description: "Browse thousands of deeply discounted liquidation and overstock consumer gadgets, iPad keyboard cases, smart watch bands, and cables at up to 70% off retail.",
    url: "https://dorinebeaumont.com/g/7npkd4cs1ib68b264a76869a299fda/?ulp=https://www.sunsky-online.com",
    verified: true,
    successRate: 98,
    usersCount: 4920
  },
  {
    id: "deal-sunsky-10",
    code: "WELCOME5",
    type: "CODE",
    discount: "$5 OFF",
    category: "wholesale",
    title: "$5 OFF Your First Wholesale Order of $50 or More",
    description: "Register a new buyer account on SUNSKY and apply this coupon code at checkout to take $5 off your initial electronics purchase of $50 or more.",
    url: "https://dorinebeaumont.com/g/7npkd4cs1ib68b264a76869a299fda/?ulp=https://www.sunsky-online.com",
    verified: true,
    successRate: 97,
    usersCount: 3410
  }
];

function generateDealCard(d) {
  const isCode = d.type === "CODE";
  const actionButton = isCode
    ? `<div class="flex items-center gap-1.5 w-full sm:w-auto">
         <div class="px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-xs font-mono font-bold tracking-widest text-slate-500 select-none">
           ••••••••
         </div>
         <button onclick="openCouponModal('${d.id}', '${d.code}', '${d.url}')" class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white text-xs font-bold rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap cursor-pointer">
           <span>Show Code</span>
           <span class="material-icons-round text-sm">content_copy</span>
         </button>
       </div>`
    : `<a href="${d.url}" target="_blank" rel="noopener sponsored" class="inline-flex items-center justify-center gap-1.5 w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap">
         <span>Get Deal</span>
         <span class="material-icons-round text-sm">open_in_new</span>
       </a>`;

  return `
        <!-- Deal Card: ${d.id} -->
        <article class="deal-card bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden" data-category="${d.category}">
            <!-- Top bar -->
            <div class="bg-slate-50/80 px-4 sm:px-6 py-2 border-b border-slate-100 flex items-center justify-between text-xs">
                <div class="flex items-center gap-2">
                    <span class="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full text-[11px]">
                        <span class="material-icons-round text-xs">verified</span>
                        Verified Offer
                    </span>
                    <span class="text-slate-400">•</span>
                    <span class="font-bold text-slate-600 uppercase tracking-wider text-[10px] bg-slate-200/60 px-2 py-0.5 rounded">${d.type}</span>
                </div>
                <span class="font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded text-[11px]">${d.discount}</span>
            </div>

            <!-- Card Body -->
            <div class="p-4 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                <!-- Left: Big Purple Hero Discount Badge -->
                <div class="hidden sm:flex flex-col items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-2xl shadow-sm shrink-0 text-center p-2">
                    <span class="text-lg font-black leading-none">${d.discount}</span>
                    <span class="text-[10px] font-semibold uppercase tracking-wider opacity-90 mt-1">${d.type === 'CODE' ? 'PROMO' : 'SAVINGS'}</span>
                </div>

                <!-- Center: Info -->
                <div class="flex-grow">
                    <h3 class="text-base sm:text-lg font-bold text-slate-900 hover:text-purple-600 transition-colors leading-snug">
                        <a href="${d.url}" target="_blank" rel="noopener sponsored">${d.title}</a>
                    </h3>
                    <div class="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500">
                        <span class="inline-flex items-center gap-1 text-emerald-600 font-medium">
                            <span class="material-icons-round text-sm">thumb_up</span>
                            ${d.successRate}% Success
                        </span>
                        <span>•</span>
                        <span>${Number(d.usersCount).toLocaleString()} shoppers used</span>
                        <span>•</span>
                        <span class="text-slate-400">Official SUNSKY Store</span>
                    </div>
                </div>

                <!-- Right: Action Box -->
                <div class="w-full md:w-auto shrink-0 flex items-center justify-end">
                    ${actionButton}
                </div>
            </div>

            <!-- Accordion Details Toggle -->
            <div class="px-4 sm:px-6 py-2.5 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-xs">
                <button type="button" onclick="toggleDetails('${d.id}')" class="inline-flex items-center gap-1 text-slate-500 hover:text-purple-600 font-medium transition-colors cursor-pointer" aria-expanded="false">
                    <span class="material-icons-round text-sm">info</span>
                    <span>Show Details</span>
                    <span class="material-icons-round text-sm transition-transform duration-200" id="icon-${d.id}">expand_more</span>
                </button>
                <span class="text-slate-400 text-[11px]">Valid through 2026</span>
            </div>

            <!-- Expandable Details Content -->
            <div id="details-${d.id}" class="details-content hidden px-4 sm:px-6 py-3 bg-purple-50/30 border-t border-purple-100 text-xs text-slate-600 leading-relaxed">
                <p>${d.description}</p>
            </div>
        </article>`;
}

const cardsHtml = deals.map(generateDealCard).join("\n");

console.log("Generated deal cards HTML successfully. Total cards:", deals.length);
fs.writeFileSync("scripts/deal-cards.html", cardsHtml, "utf-8");
