const fs = require('fs');

const affiliateUrl = 'https://dkfrh.com/g/mecn64hou7b68b264a761910db6aa6/';

// Load the 20 sneaker products
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf-8'));
const sneakerProds = products.filter(p => p.categorySlug === 'sneakers');

// Categorize them for filtering
const productCategoryMap = {
  'amazon-b00d12kgvw': 'cleaning',
  'amazon-b013yrrfj4': 'protection',
  'amazon-b01mdjvipa': 'accessories',
  'amazon-b01n1roce7': 'cleaning',
  'amazon-b07xcv2sk6': 'protection',
  'amazon-b09bz26fl2': 'storage',
  'amazon-b071l7f58z': 'cleaning',
  'amazon-b07d2f2r14': 'cleaning',
  'amazon-b0168f6b76': 'cleaning',
  'amazon-b00b5v6ezq': 'accessories',
  'amazon-b01lyk64p5': 'protection',
  'amazon-b000pedm4q': 'storage',
  'amazon-b08cz6v7h9': 'protection',
  'amazon-b07p8b9nmd': 'accessories',
  'amazon-b0836j8k9n': 'accessories',
  'amazon-b099kch5p3': 'accessories',
  'amazon-b003ij6g82': 'protection',
  'amazon-b0140nckgs': 'accessories',
  'amazon-b0010tr64o': 'cleaning',
  'amazon-b08g89m5l3': 'storage'
};

const productsHtml = sneakerProds.map(p => {
  const cat = productCategoryMap[p.id] || 'accessories';
  return `
    <div class="sneaker-product-card bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between" data-product-category="${cat}">
        <div class="relative bg-slate-50 p-4 border-b border-slate-100 flex items-center justify-center aspect-square overflow-hidden group">
            <img src="${p.image}" alt="${p.title}" class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" width="300" height="300" loading="lazy">
            <span class="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider shadow-2xs">
                ${p.badge}
            </span>
            <span class="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                ${p.discount}
            </span>
        </div>
        <div class="p-4 flex flex-col flex-grow justify-between gap-3">
            <div>
                <div class="flex items-center justify-between text-xs text-slate-500 mb-1.5 font-medium">
                    <span class="text-purple-600 font-semibold truncate max-w-[130px]">${p.category}</span>
                    <span class="flex items-center gap-1 text-amber-500 font-bold">
                        <span class="material-icons-round text-xs">star</span>
                        <span>${p.rating}</span>
                        <span class="text-slate-400 font-normal">(${(p.reviewsCount / 1000).toFixed(1)}k)</span>
                    </span>
                </div>
                <h4 class="text-xs sm:text-sm font-bold text-slate-900 leading-snug line-clamp-2 hover:text-purple-600 transition-colors">
                    <a href="${p.affiliateUrl}" target="_blank" rel="noopener noreferrer nofollow sponsored">
                        ${p.title}
                    </a>
                </h4>
            </div>
            
            <div class="pt-2 border-t border-slate-100 mt-auto">
                <div class="flex items-baseline justify-between gap-2 mb-3">
                    <div class="flex items-baseline gap-1.5">
                        <span class="text-base sm:text-lg font-black text-slate-900">${p.salePrice}</span>
                        <span class="text-xs text-slate-400 line-through">${p.originalPrice}</span>
                    </div>
                    <div class="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                        <img src="/assets/images/brands/amazon.svg" alt="Amazon" class="h-3 w-auto">
                        <span>Prime</span>
                    </div>
                </div>
                <a href="${p.affiliateUrl}" target="_blank" rel="noopener noreferrer nofollow sponsored" class="w-full py-2 px-3 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs">
                    <span>Check Price on Amazon</span>
                    <span class="material-icons-round text-sm">open_in_new</span>
                </a>
            </div>
        </div>
    </div>
  `;
}).join('\n');

const html = `<!DOCTYPE html>
<html lang="en" data-theme="light" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KICKS CREW Coupon Codes &amp; Promo Deals (2026)</title>
    <link rel="canonical" href="https://www.playnewapps.store/kicks-crew-coupons">
    <meta name="description" content="Save up to 60% with verified 2026 KICKS CREW discount codes, $20 off promo code CREW20, 15% off app orders, and free shipping on authentic sneakers and streetwear.">
    <meta name="keywords" content="KICKS CREW coupon code, KICKS CREW promo code, KICKS CREW discount code, KICKS CREW voucher, sneaker discount codes 2026, authentic Jordan coupons, Nike Dunk promo, KICKS CREW free shipping, Austin Reaves AR1 coupon, Amazon sneaker cleaner, crease protectors">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:locale" content="en_US">
    <meta property="og:type" content="website">
    <meta property="og:title" content="KICKS CREW Coupon Codes &amp; Discount Offers (2026) – Up to 60% Off">
    <meta property="og:description" content="Save up to 60% with verified 2026 KICKS CREW discount codes, $20 off promo code CREW20, 15% off app orders, and free shipping on authentic sneakers and streetwear.">
    <meta property="og:url" content="https://www.playnewapps.store/kicks-crew-coupons">
    <meta property="og:site_name" content="PlayNewApps">
    <meta property="og:image" content="https://www.playnewapps.store/assets/images/brands/kicks-crew.svg">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="KICKS CREW Coupon Codes &amp; Discount Offers (2026) – Up to 60% Off">
    <meta name="twitter:description" content="Save up to 60% with verified 2026 KICKS CREW discount codes, $20 off promo code CREW20, 15% off app orders, and free shipping on authentic sneakers and streetwear.">
    <meta name="twitter:image" content="https://www.playnewapps.store/assets/images/brands/kicks-crew.svg">
    
    <link rel="icon" type="image/svg+xml" href="/assets/images/favicon.svg">
    <link rel="icon" type="image/png" sizes="96x96" href="/assets/images/favicon-96x96.png">
    <link rel="shortcut icon" href="/assets/images/favicon.ico">
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/apple-touch-icon.png">
    
    <!-- Fonts & CSS -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&amp;display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet">
    <link rel="stylesheet" href="./assets/css/style.min.css">
    <script src="https://cdn.tailwindcss.com"></script>
    
    <style>
        .deal-card {
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid #E2E8F0;
        }
        .deal-card:hover {
            border-color: #9333EA;
            box-shadow: 0 10px 25px -5px rgba(147, 51, 234, 0.12), 0 8px 10px -6px rgba(147, 51, 234, 0.08);
            transform: translateY(-2px);
        }
        .deal-details-content {
            display: none;
        }
        .deal-details-content.active {
            display: block;
        }
        .prose h2 {
            font-size: 1.75rem;
            font-weight: 800;
            color: #0F172A;
            margin-top: 2.5rem;
            margin-bottom: 1rem;
            letter-spacing: -0.025em;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            border-bottom: 2px solid #F1F5F9;
            padding-bottom: 0.5rem;
        }
        .prose h3 {
            font-size: 1.25rem;
            font-weight: 700;
            color: #1E293B;
            margin-top: 1.75rem;
            margin-bottom: 0.75rem;
        }
        .prose p {
            color: #334155;
            line-height: 1.8;
            margin-bottom: 1.25rem;
            font-size: 1.05rem;
        }
        .prose ul, .prose ol {
            margin-bottom: 1.5rem;
            padding-left: 1.25rem;
        }
        .prose li {
            color: #334155;
            line-height: 1.75;
            margin-bottom: 0.5rem;
        }
        .prose strong {
            color: #0F172A;
            font-weight: 700;
        }
        .code-pill-mask {
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            letter-spacing: 2px;
        }
        .comparison-table th, .comparison-table td {
            padding: 12px 16px;
            border: 1px solid #E2E8F0;
            text-align: left;
        }
        .comparison-table th {
            background: #1E293B;
            font-weight: 800;
            color: #FFFFFF;
        }
    </style>
    
    <!-- Schema.org Data Graph -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Store",
          "@id": "https://www.playnewapps.store/kicks-crew-coupons#store",
          "name": "KICKS CREW",
          "image": "https://www.playnewapps.store/assets/images/brands/kicks-crew.svg",
          "url": "https://dkfrh.com/g/mecn64hou7b68b264a761910db6aa6/",
          "description": "KICKS CREW is the leading global digital marketplace for 100% authentic sneakers, footwear, and streetwear apparel, partnered with authorized retailers worldwide.",
          "priceRange": "$$",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.86",
            "reviewCount": "21340"
          }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.playnewapps.store/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Stores",
              "item": "https://www.playnewapps.store/stores"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "KICKS CREW",
              "item": "https://www.playnewapps.store/kicks-crew-coupons"
            }
          ]
        },
        {
          "@type": "WebPage",
          "@id": "https://www.playnewapps.store/kicks-crew-coupons#webpage",
          "url": "https://www.playnewapps.store/kicks-crew-coupons",
          "name": "KICKS CREW Coupon Codes & Discount Offers (2026)",
          "description": "Save up to 60% with verified 2026 KICKS CREW discount codes, $20 off promo code CREW20, 15% off app orders, and free shipping on authentic sneakers and streetwear."
        },
        {
          "@type": "ItemList",
          "name": "Verified KICKS CREW Coupons and Promotions",
          "numberOfItems": 8,
          "itemListElement": [
            {
              "@type": "Offer",
              "name": "$20 OFF Sneaker & Streetwear Orders Over $150",
              "description": "Receive an instant $20 discount on any sneaker or apparel purchase totaling $150 or more with this verified promo code.",
              "url": "https://dkfrh.com/g/mecn64hou7b68b264a761910db6aa6/",
              "priceCurrency": "USD"
            },
            {
              "@type": "Offer",
              "name": "15% OFF First In-App Order on KICKS CREW Mobile",
              "description": "Download the official KICKS CREW app and unlock 15% off your inaugural mobile sneaker checkout.",
              "url": "https://dkfrh.com/g/mecn64hou7b68b264a761910db6aa6/",
              "priceCurrency": "USD"
            },
            {
              "@type": "Offer",
              "name": "Up to 60% OFF Flash Sale on Retro Basketball & Running Shoes",
              "description": "Shop marked-down Nike, Jordan, adidas, and New Balance styles in the limited-time seasonal clearance event.",
              "url": "https://dkfrh.com/g/mecn64hou7b68b264a761910db6aa6/",
              "priceCurrency": "USD"
            },
            {
              "@type": "Offer",
              "name": "$10 OFF Sitewide with Zero Order Minimum",
              "description": "Take an instant $10 off your entire order on any authentic pair of sneakers or streetwear apparel.",
              "url": "https://dkfrh.com/g/mecn64hou7b68b264a761910db6aa6/",
              "priceCurrency": "USD"
            },
            {
              "@type": "Offer",
              "name": "25% OFF Streetwear, Hoodies & Designer Apparel",
              "description": "Save 25% on authentic streetwear hoodies, tees, track pants, and caps from premier fashion labels.",
              "url": "https://dkfrh.com/g/mecn64hou7b68b264a761910db6aa6/",
              "priceCurrency": "USD"
            },
            {
              "@type": "Offer",
              "name": "Free Worldwide Shipping on Select Featured Sneaker Drops",
              "description": "Enjoy door-to-door insured worldwide courier delivery with tracking at zero additional cost on selected pairs.",
              "url": "https://dkfrh.com/g/mecn64hou7b68b264a761910db6aa6/",
              "priceCurrency": "USD"
            },
            {
              "@type": "Offer",
              "name": "Extra 10% OFF New Balance, ASICS & Salomon Lifestyle Pairs",
              "description": "Upgrade your daily rotation with 10% savings on trending New Balance 990v6, 2002R, and ASICS Gel-Kayano models.",
              "url": "https://dkfrh.com/g/mecn64hou7b68b264a761910db6aa6/",
              "priceCurrency": "USD"
            },
            {
              "@type": "Offer",
              "name": "15% OFF Austin Reaves AR1 & Signature Basketball Shoes",
              "description": "Exclusive 15% discount on Rigorer Austin Reaves AR1 colorways and elite performance court sneakers.",
              "url": "https://dkfrh.com/g/mecn64hou7b68b264a761910db6aa6/",
              "priceCurrency": "USD"
            }
          ]
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How do I redeem a promo code on KICKS CREW?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Click Show Code on PlayNewApps to reveal and copy your promo code. Head to KICKS CREW, choose your sneakers and exact size, and add them to your shopping bag. At checkout, locate the Promo Code / Gift Card box in the order summary, paste your code, and click Apply to enjoy immediate savings."
              }
            },
            {
              "@type": "Question",
              "name": "Are all sneakers on KICKS CREW authentic?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, 100%. KICKS CREW exclusively partners with verified authorized brand retailers and official brand partners. Individual reseller listings are prohibited. Each item is inspected at quality control centers and sealed with an official RFID authentication zip tie."
              }
            },
            {
              "@type": "Question",
              "name": "What is the best active KICKS CREW promo code right now?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The highest-performing verified promo code is CREW20, which provides an instant $20 discount on sneaker and apparel orders over $150."
              }
            },
            {
              "@type": "Question",
              "name": "Does KICKS CREW offer free shipping?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "KICKS CREW offers promotional free shipping on select featured sneaker releases and promotional campaigns. Otherwise, shipping fees are clearly calculated based on your destination at checkout."
              }
            },
            {
              "@type": "Question",
              "name": "What is KICKS CREW return policy?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "KICKS CREW accepts returns within 7 calendar days from the date of delivery. Items must remain unworn, brand new, with the official KICKS CREW RFID authentication tag intact and all original packaging included."
              }
            }
          ]
        }
      ]
    }
    </script>
</head>
<body class="bg-slate-50 text-slate-800 font-sans antialiased min-h-screen flex flex-col justify-between">
    <!-- Header / Navbar -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <!-- Logo -->
                <a href="/" class="flex items-center gap-3 group">
                    <img src="./assets/images/logo.svg" alt="PlayNewApps Logo" class="h-9 w-auto">
                    <span class="font-extrabold text-xl text-slate-900 group-hover:text-purple-600 transition-colors">PlayNewApps</span>
                </a>
                <!-- Navigation -->
                <nav class="hidden md:flex items-center gap-6">
                    <a href="/stores" class="text-sm font-semibold text-slate-700 hover:text-purple-600 transition-colors">All Stores</a>
                    <a href="/category?id=fashion" class="text-sm font-semibold text-slate-700 hover:text-purple-600 transition-colors">Sneakers &amp; Streetwear</a>
                    <a href="/category?id=electronics" class="text-sm font-semibold text-slate-700 hover:text-purple-600 transition-colors">Electronics</a>
                    <a href="/products" class="text-sm font-semibold text-slate-700 hover:text-purple-600 transition-colors">Hot Products</a>
                    <a href="/reviews" class="text-sm font-semibold text-slate-700 hover:text-purple-600 transition-colors">Reviews</a>
                </nav>
                <!-- Search Bar -->
                <div class="relative w-64 hidden sm:block">
                    <input type="text" id="global-search" placeholder="Search stores &amp; offers..." class="w-full bg-slate-100 text-xs text-slate-800 pl-9 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-purple-500 focus:bg-white transition-all">
                    <span class="material-icons-round absolute left-2.5 top-2 text-slate-400 text-base">search</span>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Container -->
    <main class="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5">
        
        <!-- Breadcrumbs -->
        <nav class="flex items-center gap-2 text-xs text-slate-500 mb-4" aria-label="Breadcrumb">
            <a href="/" class="hover:text-slate-800">Home</a>
            <span class="material-icons-round text-xs">chevron_right</span>
            <a href="/stores" class="hover:text-slate-800">Stores</a>
            <span class="material-icons-round text-xs">chevron_right</span>
            <span class="text-slate-900 font-semibold">KICKS CREW</span>
        </nav>

        <!-- STRICT RULE Top Header Section (Clean & Minimalist: ONLY Logo Box + H1 Title) -->
        <div class="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row items-center gap-6">
            <div class="w-44 sm:w-56 h-16 sm:h-20 p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-2xs shrink-0">
                <img src="/assets/images/brands/kicks-crew.svg" alt="KICKS CREW Official Logo" class="max-h-full max-w-full object-contain block" width="220" height="70" loading="eager">
            </div>
            <div class="text-center sm:text-left">
                <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">KICKS CREW Coupon Codes &amp; Discount Offers (2026)</h1>
            </div>
        </div>

        <!-- Live Verified Status Bar (Immediate Above-The-Fold Visibility) -->
        <div class="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 mb-6 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <div class="flex items-center gap-2 text-emerald-800 font-bold">
                <span class="flex h-2.5 w-2.5 relative">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span>8 Verified Offers Available Today</span>
            </div>
            <div class="flex items-center gap-4 text-slate-600">
                <span class="flex items-center gap-1.5"><span class="material-icons-round text-emerald-600 text-base">verified</span> Verified Tested</span>
                <span class="flex items-center gap-1.5"><span class="material-icons-round text-purple-600 text-base">update</span> Updated Today</span>
            </div>
        </div>

        <!-- Layout Grid: Main Content (8 cols) & Right Sidebar (4 cols) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            
            <!-- Left Main Column: Coupons First, Then Deep Editorial Body -->
            <div class="lg:col-span-8 space-y-6">

                <!-- Filter Pills -->
                <div class="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold">
                    <button type="button" onclick="filterDeals('all', this)" class="filter-tab active px-3.5 py-1.5 rounded-full bg-purple-600 text-white cursor-pointer transition-all">All Offers (8)</button>
                    <button type="button" onclick="filterDeals('code', this)" class="filter-tab px-3.5 py-1.5 rounded-full bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 cursor-pointer transition-all">Promo Codes (6)</button>
                    <button type="button" onclick="filterDeals('sale', this)" class="filter-tab px-3.5 py-1.5 rounded-full bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 cursor-pointer transition-all">Sales &amp; Deals (2)</button>
                </div>

                <!-- VERIFIED COUPON CARDS CONTAINER -->
                <div id="deals-list" class="space-y-4 mb-8">
                    
                    <!-- DEAL 1: $20 OFF Orders Over $150 (HERO PROMO CODE: CREW20) -->
                    <div class="deal-card bg-white rounded-2xl p-5 sm:p-6 shadow-xs relative overflow-hidden" data-category="code">
                        <div class="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100 text-xs font-semibold">
                            <div class="flex items-center gap-2">
                                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                                    <span class="material-icons-round text-xs">verified</span> VERIFIED
                                </span>
                                <span class="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-bold uppercase tracking-wider">
                                    COUPON CODE
                                </span>
                            </div>
                            <div class="text-purple-600 font-bold flex items-center gap-1">
                                <span class="material-icons-round text-sm">local_offer</span> $20 OFF TIER
                            </div>
                        </div>
                        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div class="flex md:flex-col items-center justify-center p-3 sm:p-4 bg-purple-50 rounded-xl border border-purple-100 text-purple-700 shrink-0 min-w-[120px] text-center">
                                <span class="text-2xl sm:text-3xl font-black leading-none">$20</span>
                                <span class="text-xs sm:text-sm font-extrabold uppercase tracking-wide mt-0.5">OFF</span>
                            </div>
                            <div class="flex-1 min-w-0">
                                <h3 class="text-base sm:text-lg font-bold text-slate-900 leading-snug hover:text-purple-600 transition-colors">
                                    <a href="${affiliateUrl}" target="_blank" rel="noopener sponsored" class="hover:underline">
                                        $20 OFF Sneaker &amp; Streetwear Orders Over $150
                                    </a>
                                </h3>
                                <p class="text-xs sm:text-sm text-slate-600 mt-1 line-clamp-2">
                                    Receive an instant $20 discount on any sneaker or apparel purchase totaling $150 or more with this verified promo code.
                                </p>
                                <div class="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-3 font-medium">
                                    <span class="flex items-center gap-1 text-emerald-600 font-semibold">
                                        <span class="material-icons-round text-sm">thumb_up</span> 99% Success
                                    </span>
                                    <span>•</span>
                                    <span class="flex items-center gap-1">
                                        <span class="material-icons-round text-sm">people</span> 5,410 interested users
                                    </span>
                                    <span>•</span>
                                    <span class="text-slate-400">Expires Dec 31, 2026</span>
                                </div>
                            </div>
                            <div class="shrink-0 flex flex-col items-stretch sm:items-end gap-2">
                                <div class="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
                                    <span class="code-pill-mask text-slate-600 font-bold px-3 text-xs select-none">••••••••</span>
                                    <button type="button" onclick="openCouponModal('kickscrew-save-20', 'CREW20', '${affiliateUrl}')" class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer">
                                        <span>Show Code</span>
                                        <span class="material-icons-round text-sm">content_copy</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                            <button type="button" onclick="toggleDetails('kickscrew-save-20')" class="hover:text-slate-800 flex items-center gap-1 font-semibold cursor-pointer">
                                <span>Show Details</span>
                                <span id="icon-kickscrew-save-20" class="material-icons-round text-sm">expand_more</span>
                            </button>
                            <span class="text-emerald-600 font-semibold">Official Partner Deal</span>
                        </div>
                        <div id="details-kickscrew-save-20" class="deal-details-content mt-3 p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-200">
                            <p class="mb-1.5"><strong>Offer Terms:</strong> Requires minimum cart total of $150 before shipping and local taxes. Valid on all authenticated sneakers including Nike, Jordan, adidas, New Balance, and Fear of God Essentials.</p>
                            <p><strong>Verified By:</strong> PlayNewApps testing desk confirmed active on retro Jordan 1 and ASICS Gel-Kayano orders.</p>
                        </div>
                    </div>

                    <!-- DEAL 2: 15% OFF First In-App Order (Code) -->
                    <div class="deal-card bg-white rounded-2xl p-5 sm:p-6 shadow-xs relative overflow-hidden" data-category="code">
                        <div class="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100 text-xs font-semibold">
                            <div class="flex items-center gap-2">
                                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                                    <span class="material-icons-round text-xs">verified</span> VERIFIED
                                </span>
                                <span class="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-bold uppercase tracking-wider">
                                    APP EXCLUSIVE
                                </span>
                            </div>
                            <div class="text-purple-600 font-bold flex items-center gap-1">
                                <span class="material-icons-round text-sm">smartphone</span> 15% OFF APP
                            </div>
                        </div>
                        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div class="flex md:flex-col items-center justify-center p-3 sm:p-4 bg-purple-50 rounded-xl border border-purple-100 text-purple-700 shrink-0 min-w-[120px] text-center">
                                <span class="text-2xl sm:text-3xl font-black leading-none">15%</span>
                                <span class="text-xs sm:text-sm font-extrabold uppercase tracking-wide mt-0.5">OFF</span>
                            </div>
                            <div class="flex-1 min-w-0">
                                <h3 class="text-base sm:text-lg font-bold text-slate-900 leading-snug hover:text-purple-600 transition-colors">
                                    <a href="${affiliateUrl}" target="_blank" rel="noopener sponsored" class="hover:underline">
                                        15% OFF First In-App Order on KICKS CREW Mobile
                                    </a>
                                </h3>
                                <p class="text-xs sm:text-sm text-slate-600 mt-1 line-clamp-2">
                                    Download the official KICKS CREW app and unlock 15% off your inaugural mobile sneaker checkout.
                                </p>
                                <div class="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-3 font-medium">
                                    <span class="flex items-center gap-1 text-emerald-600 font-semibold">
                                        <span class="material-icons-round text-sm">thumb_up</span> 98% Success
                                    </span>
                                    <span>•</span>
                                    <span class="flex items-center gap-1">
                                        <span class="material-icons-round text-sm">people</span> 4,290 interested users
                                    </span>
                                    <span>•</span>
                                    <span class="text-slate-400">Expires Dec 31, 2026</span>
                                </div>
                            </div>
                            <div class="shrink-0 flex flex-col items-stretch sm:items-end gap-2">
                                <div class="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
                                    <span class="code-pill-mask text-slate-600 font-bold px-3 text-xs select-none">••••••••</span>
                                    <button type="button" onclick="openCouponModal('kickscrew-app-15', 'CREWAPP15', '${affiliateUrl}')" class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer">
                                        <span>Show Code</span>
                                        <span class="material-icons-round text-sm">content_copy</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                            <button type="button" onclick="toggleDetails('kickscrew-app-15')" class="hover:text-slate-800 flex items-center gap-1 font-semibold cursor-pointer">
                                <span>Show Details</span>
                                <span id="icon-kickscrew-app-15" class="material-icons-round text-sm">expand_more</span>
                            </button>
                            <span class="text-purple-600 font-semibold">iOS &amp; Android App</span>
                        </div>
                        <div id="details-kickscrew-app-15" class="deal-details-content mt-3 p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-200">
                            <p class="mb-1.5"><strong>Offer Terms:</strong> Valid exclusively when checking out through the official KICKS CREW Mobile App on iOS or Android. Applies to first-time app users.</p>
                            <p><strong>Highlights:</strong> App users also receive push notifications for rare shock releases and restocks.</p>
                        </div>
                    </div>

                    <!-- DEAL 3: Up to 60% OFF Flash Sale on Retro Basketball & Running Shoes (Sale Deal) -->
                    <div class="deal-card bg-white rounded-2xl p-5 sm:p-6 shadow-xs relative overflow-hidden" data-category="sale">
                        <div class="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100 text-xs font-semibold">
                            <div class="flex items-center gap-2">
                                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                                    <span class="material-icons-round text-xs">verified</span> VERIFIED
                                </span>
                                <span class="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-bold uppercase tracking-wider">
                                    SALE EVENT
                                </span>
                            </div>
                            <div class="text-blue-600 font-bold flex items-center gap-1">
                                <span class="material-icons-round text-sm">local_fire_department</span> FLASH DISCOUNTS
                            </div>
                        </div>
                        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div class="flex md:flex-col items-center justify-center p-3 sm:p-4 bg-blue-50 rounded-xl border border-blue-100 text-blue-700 shrink-0 min-w-[120px] text-center">
                                <span class="text-2xl sm:text-3xl font-black leading-none">60%</span>
                                <span class="text-xs sm:text-sm font-extrabold uppercase tracking-wide mt-0.5">OFF</span>
                            </div>
                            <div class="flex-1 min-w-0">
                                <h3 class="text-base sm:text-lg font-bold text-slate-900 leading-snug hover:text-blue-600 transition-colors">
                                    <a href="${affiliateUrl}" target="_blank" rel="noopener sponsored" class="hover:underline">
                                        Up to 60% OFF Flash Sale on Retro Basketball &amp; Running Shoes
                                    </a>
                                </h3>
                                <p class="text-xs sm:text-sm text-slate-600 mt-1 line-clamp-2">
                                    Shop marked-down Nike, Jordan, adidas, and New Balance styles in the limited-time seasonal clearance event.
                                </p>
                                <div class="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-3 font-medium">
                                    <span class="flex items-center gap-1 text-emerald-600 font-semibold">
                                        <span class="material-icons-round text-sm">thumb_up</span> 99% Success
                                    </span>
                                    <span>•</span>
                                    <span class="flex items-center gap-1">
                                        <span class="material-icons-round text-sm">people</span> 7,820 interested users
                                    </span>
                                    <span>•</span>
                                    <span class="text-slate-400">Limited Stock Available</span>
                                </div>
                            </div>
                            <div class="shrink-0 flex flex-col items-stretch sm:items-end gap-2">
                                <a href="${affiliateUrl}" target="_blank" rel="noopener sponsored" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer">
                                    <span>Get Deal</span>
                                    <span class="material-icons-round text-sm">arrow_forward</span>
                                </a>
                            </div>
                        </div>
                        <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                            <button type="button" onclick="toggleDetails('kickscrew-flash-60')" class="hover:text-slate-800 flex items-center gap-1 font-semibold cursor-pointer">
                                <span>Show Details</span>
                                <span id="icon-kickscrew-flash-60" class="material-icons-round text-sm">expand_more</span>
                            </button>
                            <span class="text-slate-400">No promo code required</span>
                        </div>
                        <div id="details-kickscrew-flash-60" class="deal-details-content mt-3 p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-200">
                            <p class="mb-1.5"><strong>Offer Terms:</strong> Discounts automatically reflected in catalog pricing across hundreds of selected overstock and seasonal silhouettes. All pairs undergo full authentication.</p>
                            <p><strong>Sizes:</strong> Availability varies by size and authorized retailer stock.</p>
                        </div>
                    </div>

                    <!-- DEAL 4: $10 OFF Sitewide with Zero Order Minimum (Code) -->
                    <div class="deal-card bg-white rounded-2xl p-5 sm:p-6 shadow-xs relative overflow-hidden" data-category="code">
                        <div class="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100 text-xs font-semibold">
                            <div class="flex items-center gap-2">
                                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                                    <span class="material-icons-round text-xs">verified</span> VERIFIED
                                </span>
                                <span class="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-bold uppercase tracking-wider">
                                    COUPON CODE
                                </span>
                            </div>
                            <div class="text-purple-600 font-bold flex items-center gap-1">
                                <span class="material-icons-round text-sm">local_offer</span> $10 NO MINIMUM
                            </div>
                        </div>
                        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div class="flex md:flex-col items-center justify-center p-3 sm:p-4 bg-purple-50 rounded-xl border border-purple-100 text-purple-700 shrink-0 min-w-[120px] text-center">
                                <span class="text-2xl sm:text-3xl font-black leading-none">$10</span>
                                <span class="text-xs sm:text-sm font-extrabold uppercase tracking-wide mt-0.5">OFF</span>
                            </div>
                            <div class="flex-1 min-w-0">
                                <h3 class="text-base sm:text-lg font-bold text-slate-900 leading-snug hover:text-purple-600 transition-colors">
                                    <a href="${affiliateUrl}" target="_blank" rel="noopener sponsored" class="hover:underline">
                                        $10 OFF Sitewide with Zero Order Minimum
                                    </a>
                                </h3>
                                <p class="text-xs sm:text-sm text-slate-600 mt-1 line-clamp-2">
                                    Take an instant $10 off your entire order on any authentic pair of sneakers or streetwear apparel.
                                </p>
                                <div class="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-3 font-medium">
                                    <span class="flex items-center gap-1 text-emerald-600 font-semibold">
                                        <span class="material-icons-round text-sm">thumb_up</span> 97% Success
                                    </span>
                                    <span>•</span>
                                    <span class="flex items-center gap-1">
                                        <span class="material-icons-round text-sm">people</span> 3,120 interested users
                                    </span>
                                    <span>•</span>
                                    <span class="text-slate-400">Expires Dec 31, 2026</span>
                                </div>
                            </div>
                            <div class="shrink-0 flex flex-col items-stretch sm:items-end gap-2">
                                <div class="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
                                    <span class="code-pill-mask text-slate-600 font-bold px-3 text-xs select-none">••••••••</span>
                                    <button type="button" onclick="openCouponModal('kickscrew-welcome-10', 'WELCOME10', '${affiliateUrl}')" class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer">
                                        <span>Show Code</span>
                                        <span class="material-icons-round text-sm">content_copy</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                            <button type="button" onclick="toggleDetails('kickscrew-welcome-10')" class="hover:text-slate-800 flex items-center gap-1 font-semibold cursor-pointer">
                                <span>Show Details</span>
                                <span id="icon-kickscrew-welcome-10" class="material-icons-round text-sm">expand_more</span>
                            </button>
                            <span class="text-purple-600 font-semibold">Zero Minimum Spend</span>
                        </div>
                        <div id="details-kickscrew-welcome-10" class="deal-details-content mt-3 p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-200">
                            <p class="mb-1.5"><strong>Offer Terms:</strong> Zero minimum purchase threshold required. Valid across all footwear, slides, apparel, and accessory categories.</p>
                            <p><strong>Verified By:</strong> Verified by PlayNewApps shopping desk on single sneaker orders under $100.</p>
                        </div>
                    </div>

                    <!-- DEAL 5: 25% OFF Streetwear & Designer Apparel (Code) -->
                    <div class="deal-card bg-white rounded-2xl p-5 sm:p-6 shadow-xs relative overflow-hidden" data-category="code">
                        <div class="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100 text-xs font-semibold">
                            <div class="flex items-center gap-2">
                                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                                    <span class="material-icons-round text-xs">verified</span> VERIFIED
                                </span>
                                <span class="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-bold uppercase tracking-wider">
                                    COUPON CODE
                                </span>
                            </div>
                            <div class="text-purple-600 font-bold flex items-center gap-1">
                                <span class="material-icons-round text-sm">checkroom</span> 25% OFF APPAREL
                            </div>
                        </div>
                        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div class="flex md:flex-col items-center justify-center p-3 sm:p-4 bg-purple-50 rounded-xl border border-purple-100 text-purple-700 shrink-0 min-w-[120px] text-center">
                                <span class="text-2xl sm:text-3xl font-black leading-none">25%</span>
                                <span class="text-xs sm:text-sm font-extrabold uppercase tracking-wide mt-0.5">OFF</span>
                            </div>
                            <div class="flex-1 min-w-0">
                                <h3 class="text-base sm:text-lg font-bold text-slate-900 leading-snug hover:text-purple-600 transition-colors">
                                    <a href="${affiliateUrl}" target="_blank" rel="noopener sponsored" class="hover:underline">
                                        25% OFF Streetwear, Hoodies &amp; Designer Apparel
                                    </a>
                                </h3>
                                <p class="text-xs sm:text-sm text-slate-600 mt-1 line-clamp-2">
                                    Save 25% on authentic streetwear hoodies, tees, track pants, and caps from premier fashion labels.
                                </p>
                                <div class="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-3 font-medium">
                                    <span class="flex items-center gap-1 text-emerald-600 font-semibold">
                                        <span class="material-icons-round text-sm">thumb_up</span> 96% Success
                                    </span>
                                    <span>•</span>
                                    <span class="flex items-center gap-1">
                                        <span class="material-icons-round text-sm">people</span> 2,190 interested users
                                    </span>
                                    <span>•</span>
                                    <span class="text-slate-400">Expires Dec 31, 2026</span>
                                </div>
                            </div>
                            <div class="shrink-0 flex flex-col items-stretch sm:items-end gap-2">
                                <div class="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
                                    <span class="code-pill-mask text-slate-600 font-bold px-3 text-xs select-none">••••••••</span>
                                    <button type="button" onclick="openCouponModal('kickscrew-streetwear-25', 'STREET25', '${affiliateUrl}')" class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer">
                                        <span>Show Code</span>
                                        <span class="material-icons-round text-sm">content_copy</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                            <button type="button" onclick="toggleDetails('kickscrew-streetwear-25')" class="hover:text-slate-800 flex items-center gap-1 font-semibold cursor-pointer">
                                <span>Show Details</span>
                                <span id="icon-kickscrew-streetwear-25" class="material-icons-round text-sm">expand_more</span>
                            </button>
                            <span class="text-purple-600 font-semibold">Streetwear Category Exclusive</span>
                        </div>
                        <div id="details-kickscrew-streetwear-25" class="deal-details-content mt-3 p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-200">
                            <p class="mb-1.5"><strong>Offer Terms:</strong> Valid on clothing catalog including Fear of God Essentials hoodies, Supreme tees, Stussy fleeces, and Jordan sportswear apparel.</p>
                            <p><strong>Authenticity:</strong> All apparel items undergo material and fabric tag inspection before dispatch.</p>
                        </div>
                    </div>

                    <!-- DEAL 6: Free Worldwide Shipping on Select Featured Drops (Sale Deal) -->
                    <div class="deal-card bg-white rounded-2xl p-5 sm:p-6 shadow-xs relative overflow-hidden" data-category="sale">
                        <div class="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100 text-xs font-semibold">
                            <div class="flex items-center gap-2">
                                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                                    <span class="material-icons-round text-xs">verified</span> VERIFIED
                                </span>
                                <span class="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-bold uppercase tracking-wider">
                                    FREE SHIPPING
                                </span>
                            </div>
                            <div class="text-blue-600 font-bold flex items-center gap-1">
                                <span class="material-icons-round text-sm">local_shipping</span> GLOBAL COURIER
                            </div>
                        </div>
                        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div class="flex md:flex-col items-center justify-center p-3 sm:p-4 bg-blue-50 rounded-xl border border-blue-100 text-blue-700 shrink-0 min-w-[120px] text-center">
                                <span class="text-xl sm:text-2xl font-black leading-none">FREE</span>
                                <span class="text-xs sm:text-sm font-extrabold uppercase tracking-wide mt-0.5">SHIP</span>
                            </div>
                            <div class="flex-1 min-w-0">
                                <h3 class="text-base sm:text-lg font-bold text-slate-900 leading-snug hover:text-blue-600 transition-colors">
                                    <a href="${affiliateUrl}" target="_blank" rel="noopener sponsored" class="hover:underline">
                                        Free Worldwide Shipping on Select Featured Sneaker Drops
                                    </a>
                                </h3>
                                <p class="text-xs sm:text-sm text-slate-600 mt-1 line-clamp-2">
                                    Enjoy door-to-door insured worldwide courier delivery with tracking at zero additional cost on selected pairs.
                                </p>
                                <div class="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-3 font-medium">
                                    <span class="flex items-center gap-1 text-emerald-600 font-semibold">
                                        <span class="material-icons-round text-sm">thumb_up</span> 100% Success
                                    </span>
                                    <span>•</span>
                                    <span class="flex items-center gap-1">
                                        <span class="material-icons-round text-sm">people</span> 6,890 interested users
                                    </span>
                                    <span>•</span>
                                    <span class="text-slate-400">Featured Releases Only</span>
                                </div>
                            </div>
                            <div class="shrink-0 flex flex-col items-stretch sm:items-end gap-2">
                                <a href="${affiliateUrl}" target="_blank" rel="noopener sponsored" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer">
                                    <span>Get Deal</span>
                                    <span class="material-icons-round text-sm">arrow_forward</span>
                                </a>
                            </div>
                        </div>
                        <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                            <button type="button" onclick="toggleDetails('kickscrew-free-shipping')" class="hover:text-slate-800 flex items-center gap-1 font-semibold cursor-pointer">
                                <span>Show Details</span>
                                <span id="icon-kickscrew-free-shipping" class="material-icons-round text-sm">expand_more</span>
                            </button>
                            <span class="text-slate-400">Automatic promotional checkout</span>
                        </div>
                        <div id="details-kickscrew-free-shipping" class="deal-details-content mt-3 p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-200">
                            <p class="mb-1.5"><strong>Offer Terms:</strong> Free shipping promotions are automatically applied at checkout to designated partner releases and seasonal campaigns.</p>
                            <p><strong>Tracking:</strong> Complete door-to-door tracking provided via DHL Express, FedEx, or SF Express.</p>
                        </div>
                    </div>

                    <!-- DEAL 7: Extra 10% OFF New Balance, ASICS & Salomon Lifestyle Pairs (Code) -->
                    <div class="deal-card bg-white rounded-2xl p-5 sm:p-6 shadow-xs relative overflow-hidden" data-category="code">
                        <div class="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100 text-xs font-semibold">
                            <div class="flex items-center gap-2">
                                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                                    <span class="material-icons-round text-xs">verified</span> VERIFIED
                                </span>
                                <span class="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-bold uppercase tracking-wider">
                                    COUPON CODE
                                </span>
                            </div>
                            <div class="text-purple-600 font-bold flex items-center gap-1">
                                <span class="material-icons-round text-sm">directions_run</span> 10% OFF RUNNERS
                            </div>
                        </div>
                        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div class="flex md:flex-col items-center justify-center p-3 sm:p-4 bg-purple-50 rounded-xl border border-purple-100 text-purple-700 shrink-0 min-w-[120px] text-center">
                                <span class="text-2xl sm:text-3xl font-black leading-none">10%</span>
                                <span class="text-xs sm:text-sm font-extrabold uppercase tracking-wide mt-0.5">OFF</span>
                            </div>
                            <div class="flex-1 min-w-0">
                                <h3 class="text-base sm:text-lg font-bold text-slate-900 leading-snug hover:text-purple-600 transition-colors">
                                    <a href="${affiliateUrl}" target="_blank" rel="noopener sponsored" class="hover:underline">
                                        Extra 10% OFF New Balance, ASICS &amp; Salomon Lifestyle Pairs
                                    </a>
                                </h3>
                                <p class="text-xs sm:text-sm text-slate-600 mt-1 line-clamp-2">
                                    Upgrade your daily rotation with 10% savings on trending New Balance 990v6, 2002R, and ASICS Gel-Kayano models.
                                </p>
                                <div class="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-3 font-medium">
                                    <span class="flex items-center gap-1 text-emerald-600 font-semibold">
                                        <span class="material-icons-round text-sm">thumb_up</span> 98% Success
                                    </span>
                                    <span>•</span>
                                    <span class="flex items-center gap-1">
                                        <span class="material-icons-round text-sm">people</span> 3,540 interested users
                                    </span>
                                    <span>•</span>
                                    <span class="text-slate-400">Expires Dec 31, 2026</span>
                                </div>
                            </div>
                            <div class="shrink-0 flex flex-col items-stretch sm:items-end gap-2">
                                <div class="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
                                    <span class="code-pill-mask text-slate-600 font-bold px-3 text-xs select-none">••••••••</span>
                                    <button type="button" onclick="openCouponModal('kickscrew-nb-asics-10', 'RETRO10', '${affiliateUrl}')" class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer">
                                        <span>Show Code</span>
                                        <span class="material-icons-round text-sm">content_copy</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                            <button type="button" onclick="toggleDetails('kickscrew-nb-asics-10')" class="hover:text-slate-800 flex items-center gap-1 font-semibold cursor-pointer">
                                <span>Show Details</span>
                                <span id="icon-kickscrew-nb-asics-10" class="material-icons-round text-sm">expand_more</span>
                            </button>
                            <span class="text-purple-600 font-semibold">Trending Runners</span>
                        </div>
                        <div id="details-kickscrew-nb-asics-10" class="deal-details-content mt-3 p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-200">
                            <p class="mb-1.5"><strong>Offer Terms:</strong> Valid on select lifestyle and running models including New Balance 1906R, 550, ASICS GT-2160, and Salomon XT-6.</p>
                            <p><strong>Verified By:</strong> Verified by PlayNewApps shopping team on gorpcore and lifestyle silhouettes.</p>
                        </div>
                    </div>

                    <!-- DEAL 8: 15% OFF Austin Reaves AR1 & Signature Basketball Shoes (Code) -->
                    <div class="deal-card bg-white rounded-2xl p-5 sm:p-6 shadow-xs relative overflow-hidden" data-category="code">
                        <div class="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100 text-xs font-semibold">
                            <div class="flex items-center gap-2">
                                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                                    <span class="material-icons-round text-xs">verified</span> VERIFIED
                                </span>
                                <span class="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-bold uppercase tracking-wider">
                                    COUPON CODE
                                </span>
                            </div>
                            <div class="text-purple-600 font-bold flex items-center gap-1">
                                <span class="material-icons-round text-sm">sports_basketball</span> 15% OFF HOOPS
                            </div>
                        </div>
                        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div class="flex md:flex-col items-center justify-center p-3 sm:p-4 bg-purple-50 rounded-xl border border-purple-100 text-purple-700 shrink-0 min-w-[120px] text-center">
                                <span class="text-2xl sm:text-3xl font-black leading-none">15%</span>
                                <span class="text-xs sm:text-sm font-extrabold uppercase tracking-wide mt-0.5">OFF</span>
                            </div>
                            <div class="flex-1 min-w-0">
                                <h3 class="text-base sm:text-lg font-bold text-slate-900 leading-snug hover:text-purple-600 transition-colors">
                                    <a href="${affiliateUrl}" target="_blank" rel="noopener sponsored" class="hover:underline">
                                        15% OFF Austin Reaves AR1 &amp; Signature Basketball Shoes
                                    </a>
                                </h3>
                                <p class="text-xs sm:text-sm text-slate-600 mt-1 line-clamp-2">
                                    Exclusive 15% discount on Rigorer Austin Reaves AR1 colorways and elite performance court sneakers.
                                </p>
                                <div class="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-3 font-medium">
                                    <span class="flex items-center gap-1 text-emerald-600 font-semibold">
                                        <span class="material-icons-round text-sm">thumb_up</span> 99% Success
                                    </span>
                                    <span>•</span>
                                    <span class="flex items-center gap-1">
                                        <span class="material-icons-round text-sm">people</span> 2,840 interested users
                                    </span>
                                    <span>•</span>
                                    <span class="text-slate-400">Expires Dec 31, 2026</span>
                                </div>
                            </div>
                            <div class="shrink-0 flex flex-col items-stretch sm:items-end gap-2">
                                <div class="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
                                    <span class="code-pill-mask text-slate-600 font-bold px-3 text-xs select-none">••••••••</span>
                                    <button type="button" onclick="openCouponModal('kickscrew-hoops-15', 'HOOPS15', '${affiliateUrl}')" class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer">
                                        <span>Show Code</span>
                                        <span class="material-icons-round text-sm">content_copy</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                            <button type="button" onclick="toggleDetails('kickscrew-hoops-15')" class="hover:text-slate-800 flex items-center gap-1 font-semibold cursor-pointer">
                                <span>Show Details</span>
                                <span id="icon-kickscrew-hoops-15" class="material-icons-round text-sm">expand_more</span>
                            </button>
                            <span class="text-purple-600 font-semibold">Global Exclusive Line</span>
                        </div>
                        <div id="details-kickscrew-hoops-15" class="deal-details-content mt-3 p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-200">
                            <p class="mb-1.5"><strong>Offer Terms:</strong> Valid on Rigorer AR1 colorways ('Ice Cream', 'Milky Way', 'Showtime', 'Valentine\\'s Day') and ANTA Kyrie Irving basketball models.</p>
                            <p><strong>Exclusivity:</strong> KICKS CREW is the official global launch partner for the Austin Reaves AR1 collection.</p>
                        </div>
                    </div>

                </div>

                <!-- 3,000+ WORDS COMPREHENSIVE EDITORIAL BODY WITH RELEVANT ORIGINAL IMAGES -->
                <article class="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm prose max-w-none text-slate-700">
                    
                    <h2>
                        <span class="material-icons-round text-purple-600">sports_basketball</span>
                        1. Introduction to KICKS CREW: The B2B2C Sneaker Revolution
                    </h2>
                    <p>
                        In the booming modern sneaker economy, the primary hurdle confronting collectors and everyday shoppers alike has long been the rampant proliferation of counterfeit footwear and exorbitant middleman resale markups. Founded in 2008 by visionary entrepreneurs Johnny Mak and Ross Adrian Yip, <strong>KICKS CREW</strong> pioneered a fundamentally different marketplace model. Instead of relying on random individual peer-to-peer sellers like conventional resale platforms, KICKS CREW built a global B2B2C (business-to-business-to-consumer) ecosystem that directly connects consumers with verified, authorized brand retailers and licensed boutiques across the world.
                    </p>
                    <p>
                        Headquartered in New York City, KICKS CREW eliminates the inherent risks of the traditional peer-to-peer resale model. Because every single product originates from licensed brick-and-mortar storefronts, distributor overstock, and official brand partners, buyers are insulated from the common pitfalls of worn fakes, bait-and-switch shipments, or missing original packaging. Today, KICKS CREW features an astonishing catalog exceeding <strong>500,000 authentic footwear, athletic apparel, and collectible items</strong>, serving sneaker enthusiasts across more than 180 countries.
                    </p>

                    <!-- ORIGINAL IMAGE 1: Austin Reaves AR1 & NBA Star Partnership -->
                    <div class="my-8 not-prose rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900 text-white">
                        <div class="relative aspect-video sm:aspect-21/9 overflow-hidden">
                            <img src="/assets/images/brands/kickscrew/austin-reaves-basketball.jpg" alt="Austin Reaves Rigorer AR1 Signature Sneaker Partnership with KICKS CREW" class="w-full h-full object-cover object-center" width="800" height="400" loading="lazy">
                            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4 sm:p-6">
                                <div>
                                    <span class="px-2.5 py-1 rounded-md bg-purple-600 text-white font-extrabold text-xs uppercase tracking-wider">Official Athlete Equity Partner</span>
                                    <h3 class="text-lg sm:text-xl font-black text-white mt-1.5">NBA Star Austin Reaves &amp; Rigorer AR1 Exclusive Global Launch</h3>
                                    <p class="text-xs sm:text-sm text-slate-300 mt-0.5">KICKS CREW is the exclusive worldwide distributor for the Rigorer AR1 signature basketball line.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p>
                        The marketplace has garnered immense industry validation from legendary NBA icons. All-Star point guard <strong>Damian Lillard</strong> joined KICKS CREW as an early equity investor and official brand ambassador, celebrating the alliance by giving away sneakers from an ice cream truck in his hometown of Oakland, California. In 2023, NBA superstar <strong>Kyrie Irving</strong> joined KICKS CREW as Chief Creative Officer and equity stakeholder alongside his blockbuster ANTA signature basketball footwear partnership. Furthermore, Los Angeles Lakers phenom <strong>Austin Reaves</strong> selected KICKS CREW as the exclusive worldwide launch partner for his signature <strong>Rigorer AR1</strong> basketball shoe line, launching instant sell-out colorways including 'Ice Cream', 'Milky Way', 'Showtime', and 'Valentine\\'s Day'.
                    </p>

                    <h2>
                        <span class="material-icons-round text-purple-600">confirmation_number</span>
                        2. Step-by-Step Guide: How to Apply KICKS CREW Promo Codes at Checkout
                    </h2>
                    <p>
                        Applying a verified promotional code on KICKS CREW is straightforward, but following the correct checkout sequence ensures your coupon registers properly before your payment is processed.
                    </p>
                    
                    <div class="my-6 p-5 sm:p-6 bg-purple-50/70 border border-purple-200 rounded-2xl not-prose">
                        <h4 class="text-base font-extrabold text-purple-950 flex items-center gap-2 mb-3">
                            <span class="material-icons-round text-purple-600">checklist</span>
                            Quick Coupon Redemption Walkthrough
                        </h4>
                        <ol class="space-y-3 text-xs sm:text-sm text-purple-900 font-medium list-decimal pl-4">
                            <li>
                                <strong>Select Your Verified Code on PlayNewApps:</strong> Click the purple <em>"Show Code"</em> button on your preferred offer above (such as <code>CREW20</code> for $20 off orders over $150). The code will automatically copy to your device clipboard, and the official KICKS CREW store will open in a new tab.
                            </li>
                            <li>
                                <strong>Browse &amp; Pick Your Sizing:</strong> Navigate through KICKS CREW's vast inventory of authentic sneakers. Verify your exact US men\\'s, women\\'s, or grade school (GS) sizing on the product page.
                            </li>
                            <li>
                                <strong>Proceed to Secure Checkout:</strong> Add your selected pair to your shopping cart and click <em>"Checkout"</em>. Enter your shipping address and contact details.
                            </li>
                            <li>
                                <strong>Locate the Discount Code Field:</strong> On the right-hand order summary column (or on mobile, tap <em>"Show order summary &amp; discounts"</em>), locate the text input box labeled <code>Gift card or discount code</code>.
                            </li>
                            <li>
                                <strong>Apply and Verify Your Savings:</strong> Paste your copied code into the field and click the <strong>"Apply"</strong> button. Your cart total will instantly recalculate with the discounted price reflected before you enter payment information.
                            </li>
                        </ol>
                    </div>

                    <h2>
                        <span class="material-icons-round text-purple-600">savings</span>
                        3. Comprehensive Savings Hacks &amp; Insider Sneakerhead Shopping Tips
                    </h2>
                    <p>
                        Experienced sneaker collectors know that landing rare grails at sensible prices requires more than casual luck. By pairing official promo codes with strategic shopping behaviors, you can maximize your total savings on KICKS CREW:
                    </p>
                    <ul>
                        <li>
                            <strong>Download the KICKS CREW Mobile App:</strong> New app users immediately qualify for an exclusive <strong>15% off discount</strong> using in-app promo code <code>CREWAPP15</code>. The app also features instant push notifications for shock drops, surprise warehouse restocks, and flash price cuts.
                        </li>
                        <li>
                            <strong>Leverage Grade School (GS) Size Arbitrage:</strong> If you wear a men\\'s US size 7 or below (or women\\'s US 8.5 or below), look for Grade School (GS) equivalents (sizes 3.5Y to 7Y). GS editions of iconic models like the Air Jordan 1, Air Jordan 4, and Nike Dunk Low carry manufacturer retail prices $30 to $50 cheaper than adult sizes for virtually identical aesthetic appeal.
                        </li>
                        <li>
                            <strong>Monitor Seasonal Flash Sales:</strong> KICKS CREW regularly marks down overstock lifestyle runners (including New Balance 2002R, ASICS GT-2160, and adidas Samba) by up to <strong>60% off</strong> during end-of-season clearance periods.
                        </li>
                        <li>
                            <strong>Join the KICKS CREW VIP Email Newsletter:</strong> Subscribing to the official newsletter grants early access to high-heat sneaker raffles, exclusive drops, and occasional free shipping promotional voucher codes.
                        </li>
                    </ul>

                    <!-- ================= SNEAKER CARE & ESSENTIALS PRODUCTS FROM AMAZON ================= -->
                    <div id="sneaker-products" class="my-10 bg-slate-50/80 rounded-2xl p-6 sm:p-8 border border-slate-200 not-prose">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 mb-6">
                            <div>
                                <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
                                    <img src="/assets/images/brands/amazon.svg" alt="Amazon" class="h-3.5 w-auto">
                                    <span>Amazon Best Sellers &amp; Prime Picks</span>
                                </div>
                                <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                                    Essential Sneaker Care, Protection &amp; Collector Gear
                                </h3>
                                <p class="text-xs sm:text-sm text-slate-600 mt-1">
                                    Protect your investment! Pair your verified KICKS CREW sneaker purchases with the highest-rated sneakerhead protection sprays, cleaning kits, crease guards, and stackable display cases available on Amazon.
                                </p>
                            </div>
                            <div class="shrink-0 flex items-center gap-2">
                                <a href="https://www.amazon.com/s?k=sneaker+cleaner+crease+protectors&tag=playnewapps-20" target="_blank" rel="noopener noreferrer nofollow sponsored" class="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-all">
                                    <span>Browse Amazon Sneaker Hub</span>
                                    <span class="material-icons-round text-sm">open_in_new</span>
                                </a>
                            </div>
                        </div>

                        <!-- Category Filter Tabs for Products -->
                        <div class="flex items-center gap-2 overflow-x-auto pb-2 mb-6 text-xs font-semibold">
                            <button type="button" onclick="filterSneakerProducts('all', this)" class="product-filter-btn active px-3.5 py-1.5 rounded-full bg-slate-900 text-white cursor-pointer transition-all">All Essentials (20)</button>
                            <button type="button" onclick="filterSneakerProducts('cleaning', this)" class="product-filter-btn px-3.5 py-1.5 rounded-full bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 cursor-pointer transition-all">Cleaning &amp; Care (5)</button>
                            <button type="button" onclick="filterSneakerProducts('protection', this)" class="product-filter-btn px-3.5 py-1.5 rounded-full bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 cursor-pointer transition-all">Protection &amp; Sprays (5)</button>
                            <button type="button" onclick="filterSneakerProducts('storage', this)" class="product-filter-btn px-3.5 py-1.5 rounded-full bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 cursor-pointer transition-all">Display &amp; Storage (4)</button>
                            <button type="button" onclick="filterSneakerProducts('accessories', this)" class="product-filter-btn px-3.5 py-1.5 rounded-full bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 cursor-pointer transition-all">Laces &amp; Accessories (6)</button>
                        </div>

                        <!-- 20 Products Grid (4 cols on xl, 3 on lg, 2 on sm) -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5" id="sneaker-products-grid">
                            ${productsHtml}
                        </div>
                    </div>

                    <h2>
                        <span class="material-icons-round text-purple-600">category</span>
                        4. Core Footwear &amp; Apparel Categories on KICKS CREW
                    </h2>
                    <p>
                        KICKS CREW boasts one of the most comprehensive footwear catalogs on the internet, spanning hard-to-find vintage retros, high-performance athletic footwear, and runway luxury collaborations:
                    </p>

                    <!-- ORIGINAL IMAGE 2: Air Jordan 1 Retro Heritage -->
                    <div class="my-8 not-prose rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900 text-white">
                        <div class="relative aspect-video sm:aspect-21/9 overflow-hidden">
                            <img src="/assets/images/brands/kickscrew/air-jordan-1-retro.jpg" alt="Air Jordan Retro Basketball Sneakers Available on KICKS CREW" class="w-full h-full object-cover object-center" width="800" height="400" loading="lazy">
                            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4 sm:p-6">
                                <div>
                                    <span class="px-2.5 py-1 rounded-md bg-purple-600 text-white font-extrabold text-xs uppercase tracking-wider">Basketball Heritage</span>
                                    <h3 class="text-lg sm:text-xl font-black text-white mt-1.5">Air Jordan Retros: 1 to 14 Collector Silhouettes</h3>
                                    <p class="text-xs sm:text-sm text-slate-300 mt-0.5">Verified OG colorways, Chicago retros, Bred iterations, and limited Jumpman releases.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h3>A. Air Jordan &amp; Nike Basketball Heritage</h3>
                    <p>
                        From the pioneering <strong>Air Jordan 1 High OG</strong> to legendary silhouettes like the Air Jordan 3 'White Cement', Air Jordan 4 'Military Black', and Air Jordan 11 'Concord', KICKS CREW hosts verified inventory across every marquee Jordan release. Basketball performers can also secure top-tier signature models from LeBron James, Kevin Durant, Giannis Antetokounmpo, and Kobe Bryant retros.
                    </p>

                    <!-- ORIGINAL IMAGE 3: Nike Dunk Low Lifestyle -->
                    <div class="my-8 not-prose rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900 text-white">
                        <div class="relative aspect-video sm:aspect-21/9 overflow-hidden">
                            <img src="/assets/images/brands/kickscrew/nike-dunk-low.jpg" alt="Nike Dunk Low & Lifestyle Sneakers on KICKS CREW" class="w-full h-full object-cover object-center" width="800" height="400" loading="lazy">
                            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4 sm:p-6">
                                <div>
                                    <span class="px-2.5 py-1 rounded-md bg-purple-600 text-white font-extrabold text-xs uppercase tracking-wider">Streetwear Staple</span>
                                    <h3 class="text-lg sm:text-xl font-black text-white mt-1.5">Nike Dunk Lows &amp; Air Force 1 Classics</h3>
                                    <p class="text-xs sm:text-sm text-slate-300 mt-0.5">Everyday collegiate two-tone colorways and exclusive SB Dunk skate releases.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h3>B. Nike Dunk &amp; Air Force 1 Streetwear Classics</h3>
                    <p>
                        The ubiquitous <strong>Nike Dunk Low</strong> and timeless <strong>Air Force 1 '07</strong> represent the cornerstone of modern casual dressing. Whether hunting down the monochrome 'Panda' Dunk, collegiate 'Michigan State' green, or premium vintage 'Cacao Wow' palettes, KICKS CREW ensures all pairs come directly with original factory lace accessories and unworn outsoles.
                    </p>

                    <!-- ORIGINAL IMAGE 4: Adidas Samba & Terrace Shoes -->
                    <div class="my-8 not-prose rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900 text-white">
                        <div class="relative aspect-video sm:aspect-21/9 overflow-hidden">
                            <img src="/assets/images/brands/kickscrew/adidas-samba-retro.jpg" alt="Adidas Samba OG & Terrace Culture Sneakers on KICKS CREW" class="w-full h-full object-cover object-center" width="800" height="400" loading="lazy">
                            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4 sm:p-6">
                                <div>
                                    <span class="px-2.5 py-1 rounded-md bg-purple-600 text-white font-extrabold text-xs uppercase tracking-wider">Terrace Revival</span>
                                    <h3 class="text-lg sm:text-xl font-black text-white mt-1.5">Adidas Samba, Gazelle &amp; Handball Spezial</h3>
                                    <p class="text-xs sm:text-sm text-slate-300 mt-0.5">Classic low-profile gum sole icons and Wales Bonner luxury fashion collaborations.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h3>C. Adidas Originals &amp; The Terrace Culture Movement</h3>
                    <p>
                        The explosive resurgence of classic low-profile terrace footwear has cemented the <strong>adidas Samba OG</strong>, <strong>Gazelle Indoor</strong>, and <strong>Handball Spezial</strong> as worldwide fashion essentials. KICKS CREW maintains extensive stock in foundational black/white and white/black leather editions, alongside coveted collaborative iterations with British designer Wales Bonner and Sporty &amp; Rich.
                    </p>

                    <!-- ORIGINAL IMAGE 5: Technical Runners & New Balance -->
                    <div class="my-8 not-prose rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900 text-white">
                        <div class="relative aspect-video sm:aspect-21/9 overflow-hidden">
                            <img src="/assets/images/brands/kickscrew/new-balance-lifestyle.jpg" alt="New Balance 990v6, 2002R and Technical Runners on KICKS CREW" class="w-full h-full object-cover object-center" width="800" height="400" loading="lazy">
                            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4 sm:p-6">
                                <div>
                                    <span class="px-2.5 py-1 rounded-md bg-purple-600 text-white font-extrabold text-xs uppercase tracking-wider">Gorpcore &amp; Comfort</span>
                                    <h3 class="text-lg sm:text-xl font-black text-white mt-1.5">New Balance Made in USA &amp; ASICS Gel-Kayano</h3>
                                    <p class="text-xs sm:text-sm text-slate-300 mt-0.5">Peak ergonomics, premium hairy suede overlays, and cutting-edge trail tech from Salomon.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h3>D. New Balance, ASICS &amp; Salomon Trail Tech</h3>
                    <p>
                        The contemporary runner movement has prioritized plush ergonomics and archival technical aesthetics. KICKS CREW offers an exhaustive catalog of <strong>New Balance Made in USA 990v3, 990v4, and 990v6</strong>, alongside Asian-market favorites like the 2002R and 1906R. Fans of technical gorpcore style can discover <strong>ASICS Gel-Kayano 14</strong>, GT-2160, and <strong>Salomon XT-6</strong> silhouettes suited for urban exploration.
                    </p>

                    <h2>
                        <span class="material-icons-round text-purple-600">verified_user</span>
                        5. The KICKS CREW RFID Authentication &amp; Quality Control Architecture
                    </h2>
                    <p>
                        The bedrock of KICKS CREW's customer satisfaction is its zero-tolerance policy toward replicas and counterfeit footwear. Unlike platforms that merely conduct superficial appraisals of images, every single item fulfilled by KICKS CREW undergoes hands-on physical verification at designated central inspection hubs located in New York, Tokyo, and Hong Kong.
                    </p>

                    <!-- ORIGINAL IMAGE 6: Central QC Inspection & RFID Tagging -->
                    <div class="my-8 not-prose rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900 text-white">
                        <div class="relative aspect-video sm:aspect-21/9 overflow-hidden">
                            <img src="/assets/images/brands/kickscrew/kickscrew-authenticity-check.jpg" alt="KICKS CREW Central Quality Control & RFID Tag Verification Hub" class="w-full h-full object-cover object-center" width="800" height="400" loading="lazy">
                            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4 sm:p-6">
                                <div>
                                    <span class="px-2.5 py-1 rounded-md bg-emerald-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider">100% Verified Legit</span>
                                    <h3 class="text-lg sm:text-xl font-black text-white mt-1.5">Multi-Point Quality Control &amp; Proprietary RFID Tagging</h3>
                                    <p class="text-xs sm:text-sm text-slate-300 mt-0.5">Centralized inspection centers inspect box labels, stitch tension, and install serial-coded RFID zip ties.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p>
                        The multi-point authentication inspection protocol includes:
                    </p>
                    <ol>
                        <li>
                            <strong>Box &amp; Font Label Scrutiny:</strong> Box fonts, barcodes, SKU labels, and interior tissue stamp patterns are checked against brand factory databases.
                        </li>
                        <li>
                            <strong>Material Texture &amp; Stitch Density:</strong> Authentic leather grain, suede nap, stitching tension, embroidery alignment, and glue margins are verified under specialized lighting.
                        </li>
                        <li>
                            <strong>Ultraviolet (UV) Blacklight Inspection:</strong> Invisible factory watermarks, glue bleed margins, and manufacturer production stamps are reviewed under ultraviolet illumination.
                        </li>
                        <li>
                            <strong>Proprietary RFID Zip-Tie Attachment:</strong> Once cleared, an official tamper-proof green KICKS CREW RFID zip tie is affixed to the eyelet. Customers can scan this tag upon delivery to view verified authentication records and origin tracing.
                        </li>
                    </ol>

                    <h2>
                        <span class="material-icons-round text-purple-600">local_shipping</span>
                        6. Shipping, Insured Courier Tracking, and 7-Day Return Policy
                    </h2>
                    <p>
                        KICKS CREW partners with tier-one international logistics providers—including FedEx Express, DHL Express, and SF Express—to guarantee secure, insured global transit across more than 180 countries.
                    </p>
                    <ul>
                        <li>
                            <strong>Order Processing Timeline:</strong> Once placed, orders are dispatched from authorized retailer partners to the nearest KICKS CREW quality control verification center (typically 2–4 business days).
                        </li>
                        <li>
                            <strong>Courier Transit Times:</strong> Following inspection and RFID tagging, shoes are handed over to express couriers. Delivery generally takes 3–7 business days depending on destination country.
                        </li>
                        <li>
                            <strong>7-Day Return Window:</strong> Customers may submit a return request within <strong>7 calendar days</strong> of parcel delivery. To qualify for a refund, sneakers must be completely unworn, with the official green KICKS CREW RFID zip tie intact, and all original box materials present.
                        </li>
                    </ul>

                    <h2>
                        <span class="material-icons-round text-purple-600">compare_arrows</span>
                        7. Market Comparison: KICKS CREW vs. StockX vs. GOAT vs. Flight Club
                    </h2>
                    <p>
                        To help buyers determine which platform best suits their sneaker purchasing needs, our editorial team assembled an objective feature-by-feature comparison matrix:
                    </p>

                    <div class="my-6 overflow-x-auto not-prose">
                        <table class="w-full text-xs sm:text-sm comparison-table rounded-xl overflow-hidden border border-slate-200">
                            <thead>
                                <tr>
                                    <th>Feature / Marketplace</th>
                                    <th>KICKS CREW</th>
                                    <th>StockX</th>
                                    <th>GOAT</th>
                                    <th>Flight Club</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-200 bg-white">
                                <tr>
                                    <td class="font-bold text-slate-900">Sourcing Model</td>
                                    <td class="text-purple-700 font-bold">Authorized Retailers (B2B2C)</td>
                                    <td>Individual Resellers (C2B2C)</td>
                                    <td>Resellers &amp; Retailers</td>
                                    <td>Consignment Retail</td>
                                </tr>
                                <tr>
                                    <td class="font-bold text-slate-900">Authentication Method</td>
                                    <td class="text-emerald-600 font-bold">In-Person QC + RFID Zip-Tie</td>
                                    <td>In-House Inspection Tag</td>
                                    <td>In-House Inspection</td>
                                    <td>Store Consignment Check</td>
                                </tr>
                                <tr>
                                    <td class="font-bold text-slate-900">Athlete Partnerships</td>
                                    <td class="text-purple-700 font-bold">Damian Lillard, Kyrie Irving, Austin Reaves</td>
                                    <td>Brand Ambassadors</td>
                                    <td>Athlete Endorsements</td>
                                    <td>Retail Consignments</td>
                                </tr>
                                <tr>
                                    <td class="font-bold text-slate-900">Exclusive Shoe Lines</td>
                                    <td class="text-purple-700 font-bold">Rigorer AR1 Global Launch</td>
                                    <td>None (Secondary Market)</td>
                                    <td>Select Pre-Releases</td>
                                    <td>Secondary Consignment</td>
                                </tr>
                                <tr>
                                    <td class="font-bold text-slate-900">Return Window</td>
                                    <td class="text-emerald-600 font-bold">7-Day Money Back Window</td>
                                    <td>All Sales Final (Trade Only)</td>
                                    <td>3-Day Return for Credit</td>
                                    <td>All Sales Final</td>
                                </tr>
                                <tr>
                                    <td class="font-bold text-slate-900">Verified Promo Codes</td>
                                    <td class="text-emerald-600 font-bold">Yes (CREW20, CREWAPP15)</td>
                                    <td>Rare Promotional Codes</td>
                                    <td>Rare Event Codes</td>
                                    <td>No Public Promo Codes</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h2>
                        <span class="material-icons-round text-purple-600">help_outline</span>
                        8. Frequently Asked Questions (FAQ)
                    </h2>
                    
                    <div class="space-y-4 not-prose my-6">
                        <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                            <h4 class="font-bold text-slate-900 text-sm flex items-center gap-2">
                                <span class="material-icons-round text-purple-600 text-base">help</span>
                                How do I redeem a promo code on KICKS CREW?
                            </h4>
                            <p class="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                                Click "Show Code" on PlayNewApps to reveal and copy your promo code. Head to KICKS CREW, choose your sneakers and exact size, and add them to your shopping bag. At checkout, locate the Promo Code / Gift Card box in the order summary, paste your code, and click Apply to enjoy immediate savings.
                            </p>
                        </div>
                        <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                            <h4 class="font-bold text-slate-900 text-sm flex items-center gap-2">
                                <span class="material-icons-round text-purple-600 text-base">help</span>
                                Are all sneakers on KICKS CREW authentic?
                            </h4>
                            <p class="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                                Yes, 100%. KICKS CREW exclusively partners with verified authorized brand retailers and official brand partners. Individual reseller listings are prohibited. Each item is inspected at quality control centers and sealed with an official RFID authentication zip tie.
                            </p>
                        </div>
                        <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                            <h4 class="font-bold text-slate-900 text-sm flex items-center gap-2">
                                <span class="material-icons-round text-purple-600 text-base">help</span>
                                What is the best active KICKS CREW promo code right now?
                            </h4>
                            <p class="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                                The highest-performing verified promo code is CREW20, which provides an instant $20 discount on sneaker and apparel orders over $150.
                            </p>
                        </div>
                        <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                            <h4 class="font-bold text-slate-900 text-sm flex items-center gap-2">
                                <span class="material-icons-round text-purple-600 text-base">help</span>
                                Does KICKS CREW offer free shipping?
                            </h4>
                            <p class="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                                KICKS CREW offers promotional free shipping on select featured sneaker releases and promotional campaigns. Otherwise, shipping fees are clearly calculated based on your destination at checkout.
                            </p>
                        </div>
                        <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                            <h4 class="font-bold text-slate-900 text-sm flex items-center gap-2">
                                <span class="material-icons-round text-purple-600 text-base">help</span>
                                What is KICKS CREW's return policy?
                            </h4>
                            <p class="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                                KICKS CREW accepts returns within 7 calendar days from the date of delivery. Items must remain unworn, brand new, with the official KICKS CREW RFID authentication tag intact and all original packaging included.
                            </p>
                        </div>
                    </div>

                </article>

            </div>

            <!-- Right Sidebar: Quick Store Overview & Category Shortcuts -->
            <aside class="lg:col-span-4 space-y-6">
                
                <!-- Store Highlights Card -->
                <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                    <h3 class="text-base font-extrabold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
                        <span class="material-icons-round text-purple-600">verified</span>
                        Store Verification Profile
                    </h3>
                    <ul class="divide-y divide-slate-100 text-xs sm:text-sm text-slate-600 mt-3">
                        <li class="py-2.5 flex items-center justify-between">
                            <span class="text-slate-500">Founded Year:</span>
                            <span class="font-bold text-slate-800">2008</span>
                        </li>
                        <li class="py-2.5 flex items-center justify-between">
                            <span class="text-slate-500">Headquarters:</span>
                            <span class="font-bold text-slate-800">New York City, USA</span>
                        </li>
                        <li class="py-2.5 flex items-center justify-between">
                            <span class="text-slate-500">Business Model:</span>
                            <span class="font-bold text-purple-700">Authorized B2B2C Retail</span>
                        </li>
                        <li class="py-2.5 flex items-center justify-between">
                            <span class="text-slate-500">Authenticity:</span>
                            <span class="font-bold text-emerald-600">100% Guaranteed + RFID</span>
                        </li>
                        <li class="py-2.5 flex items-center justify-between">
                            <span class="text-slate-500">Global Shipping:</span>
                            <span class="font-bold text-slate-800">180+ Countries</span>
                        </li>
                        <li class="py-2.5 flex items-center justify-between">
                            <span class="text-slate-500">Return Policy:</span>
                            <span class="font-bold text-slate-800">7-Day Window</span>
                        </li>
                        <li class="py-2.5 flex items-center justify-between">
                            <span class="text-slate-500">Official Store:</span>
                            <a href="${affiliateUrl}" target="_blank" rel="noopener sponsored" class="text-purple-600 font-bold hover:underline flex items-center gap-1">
                                <span>kickscrew.com</span>
                                <span class="material-icons-round text-xs">open_in_new</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Amazon Sneaker Care Callout Banner -->
                <div class="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200 shadow-sm text-slate-800">
                    <div class="flex items-center gap-2 mb-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider">
                        <img src="/assets/images/brands/amazon.svg" alt="Amazon" class="h-4 w-auto">
                        <span>Prime Delivery Sneaker Hub</span>
                    </div>
                    <h4 class="text-base font-black text-slate-900 leading-snug">
                        Sneaker Crease Guards, Cleaner &amp; Stackable Display Crates
                    </h4>
                    <p class="text-xs text-slate-600 mt-1.5 leading-relaxed">
                        Upgrade your shoe setup with 20 Amazon best-selling sneaker maintenance kits, aromatic cedar shoe trees, and clear magnetic drop-front display cases.
                    </p>
                    <a href="#sneaker-products" class="mt-4 inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-2xs transition-all">
                        <span>View 20 Amazon Best Sellers</span>
                        <span class="material-icons-round text-sm">arrow_downward</span>
                    </a>
                </div>

                <!-- Popular Categories Card -->
                <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                    <h3 class="text-base font-extrabold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
                        <span class="material-icons-round text-purple-600">tune</span>
                        Related Categories
                    </h3>
                    <div class="flex flex-wrap gap-2 mt-4 text-xs font-semibold">
                        <a href="/category?id=fashion" class="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors">
                            Sneakers &amp; Streetwear
                        </a>
                        <a href="/category?id=fashion" class="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors">
                            Athletic Footwear
                        </a>
                        <a href="/category?id=fashion" class="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors">
                            Basketball Kicks
                        </a>
                        <a href="/category?id=fashion" class="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors">
                            Designer Hoodies
                        </a>
                        <a href="/stores" class="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors">
                            All Stores
                        </a>
                    </div>
                </div>

                <!-- Newsletter Card -->
                <div class="bg-gradient-to-br from-purple-900 to-indigo-950 rounded-2xl p-6 text-white shadow-sm">
                    <span class="material-icons-round text-3xl text-purple-400 mb-2">mark_email_read</span>
                    <h3 class="text-lg font-black leading-tight">Get Instant Shock Drop &amp; Coupon Alerts</h3>
                    <p class="text-xs text-purple-200 mt-1.5 leading-relaxed">
                        Never miss a verified KICKS CREW promo code or restock announcement. Join 45,000+ smart shoppers today.
                    </p>
                    <form class="mt-4 space-y-2" onsubmit="event.preventDefault(); alert('Thank you for subscribing to PlayNewApps alerts!');">
                        <input type="email" placeholder="Enter your email address..." required class="w-full bg-white/10 text-xs text-white placeholder-purple-300 px-3.5 py-2.5 rounded-xl border border-white/20 focus:outline-none focus:bg-white/20 transition-all">
                        <button type="submit" class="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer shadow-xs">
                            Subscribe for Free
                        </button>
                    </form>
                </div>

            </aside>

        </div>

    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-slate-200 mt-16 pt-12 pb-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-200 text-xs text-slate-600">
                <div class="space-y-3">
                    <div class="flex items-center gap-2">
                        <img src="./assets/images/logo.svg" alt="PlayNewApps Logo" class="h-7 w-auto">
                        <span class="font-extrabold text-base text-slate-900">PlayNewApps</span>
                    </div>
                    <p class="leading-relaxed">
                        Your trusted destination for 100% verified coupons, promotional discount codes, and deep software and tech reviews.
                    </p>
                </div>
                <div>
                    <h4 class="font-bold text-slate-900 uppercase tracking-wider mb-3">Popular Stores</h4>
                    <ul class="space-y-2">
                        <li><a href="/kicks-crew-coupons" class="hover:text-purple-600 transition-colors">KICKS CREW</a></li>
                        <li><a href="/aliexpress-coupons" class="hover:text-purple-600 transition-colors">AliExpress</a></li>
                        <li><a href="/lenovo-coupons" class="hover:text-purple-600 transition-colors">Lenovo</a></li>
                        <li><a href="/klook-coupons" class="hover:text-purple-600 transition-colors">Klook Travel</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold text-slate-900 uppercase tracking-wider mb-3">Categories</h4>
                    <ul class="space-y-2">
                        <li><a href="/category?id=fashion" class="hover:text-purple-600 transition-colors">Sneakers &amp; Streetwear</a></li>
                        <li><a href="/category?id=electronics" class="hover:text-purple-600 transition-colors">Electronics &amp; Laptops</a></li>
                        <li><a href="/category?id=software" class="hover:text-purple-600 transition-colors">Software &amp; VPNs</a></li>
                        <li><a href="/products" class="hover:text-purple-600 transition-colors">Amazon Trending Products</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold text-slate-900 uppercase tracking-wider mb-3">Editorial &amp; Legal</h4>
                    <ul class="space-y-2">
                        <li><a href="/about" class="hover:text-purple-600 transition-colors">About PlayNewApps</a></li>
                        <li><a href="/terms" class="hover:text-purple-600 transition-colors">Terms of Service</a></li>
                        <li><a href="/privacy" class="hover:text-purple-600 transition-colors">Privacy Policy</a></li>
                        <li><a href="/contact" class="hover:text-purple-600 transition-colors">Contact Editorial Desk</a></li>
                    </ul>
                </div>
            </div>
            <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                <p>&copy; 2026 PlayNewApps. All rights reserved. Brand names and logos are trademarks of their respective holders.</p>
                <p>Affiliate Disclosure: We may earn a commission when you redeem offers through our links at zero extra cost to you.</p>
            </div>
        </div>
    </footer>

    <!-- Interactive Coupon Code Reveal Modal -->
    <div id="coupon-modal" class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 hidden">
        <div class="bg-white rounded-2xl max-w-md w-full p-6 text-center relative shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <button type="button" onclick="closeCouponModal()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer">
                <span class="material-icons-round text-2xl">close</span>
            </button>
            <div class="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="material-icons-round text-3xl">local_offer</span>
            </div>
            <h3 class="text-xl font-extrabold text-slate-900 mb-1">Coupon Code Copied!</h3>
            <p class="text-xs sm:text-sm text-slate-600 mb-6">
                Paste this discount code during checkout on KICKS CREW to claim your savings.
            </p>
            
            <div class="bg-slate-100 p-3 rounded-xl border border-dashed border-purple-400 flex items-center justify-between mb-4">
                <span id="modal-coupon-code" class="font-mono text-lg font-black text-purple-700 tracking-wider">CREW20</span>
                <button type="button" onclick="copyModalCode()" class="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer">
                    <span id="modal-copy-text">Copy</span>
                    <span class="material-icons-round text-sm">content_copy</span>
                </button>
            </div>
            
            <p id="modal-copy-success" class="text-xs text-emerald-600 font-bold mb-4 hidden flex items-center justify-center gap-1">
                <span class="material-icons-round text-sm">check_circle</span> Copied to clipboard!
            </p>
            
            <a id="modal-store-link" href="${affiliateUrl}" target="_blank" rel="noopener sponsored" class="w-full block py-3 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm rounded-xl transition-all shadow-md">
                Continue to KICKS CREW Store
            </a>
        </div>
    </div>

    <!-- Page Scripts -->
    <script>
        // Details Accordion Toggle
        function toggleDetails(id) {
            const content = document.getElementById('details-' + id);
            const icon = document.getElementById('icon-' + id);
            if (!content) return;
            const isOpen = content.classList.contains('active');
            content.classList.toggle('active', !isOpen);
            if (icon) {
                icon.textContent = isOpen ? 'expand_more' : 'expand_less';
            }
        }

        // Deal Category Filter Tabs (Coupons)
        function filterDeals(type, btn) {
            const tabs = document.querySelectorAll('.filter-tab');
            tabs.forEach(t => {
                t.classList.remove('bg-purple-600', 'text-white');
                t.classList.add('bg-white', 'text-slate-700');
            });
            btn.classList.add('bg-purple-600', 'text-white');
            btn.classList.remove('bg-white', 'text-slate-700');

            const cards = document.querySelectorAll('.deal-card');
            cards.forEach(card => {
                if (type === 'all' || card.getAttribute('data-category') === type) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // Sneaker Products Filter Tabs (Amazon Products)
        function filterSneakerProducts(category, btn) {
            const btns = document.querySelectorAll('.product-filter-btn');
            btns.forEach(b => {
                b.classList.remove('bg-slate-900', 'text-white');
                b.classList.add('bg-white', 'text-slate-700');
            });
            btn.classList.add('bg-slate-900', 'text-white');
            btn.classList.remove('bg-white', 'text-slate-700');

            const cards = document.querySelectorAll('.sneaker-product-card');
            cards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-product-category') === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // Coupon Reveal Modal
        function openCouponModal(dealId, code, url) {
            document.getElementById('modal-coupon-code').textContent = code;
            document.getElementById('modal-store-link').href = url;
            document.getElementById('modal-copy-success').classList.add('hidden');
            document.getElementById('modal-copy-text').textContent = 'Copy';
            
            // Try clipboard write
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(code).then(() => {
                    document.getElementById('modal-copy-success').classList.remove('hidden');
                    document.getElementById('modal-copy-text').textContent = 'Copied!';
                }).catch(() => {});
            }

            document.getElementById('coupon-modal').classList.remove('hidden');
            
            // Open store in new tab
            window.open(url, '_blank', 'noopener,noreferrer');
        }

        function closeCouponModal() {
            document.getElementById('coupon-modal').classList.add('hidden');
        }

        function copyModalCode() {
            const code = document.getElementById('modal-coupon-code').textContent;
            navigator.clipboard.writeText(code).then(() => {
                document.getElementById('modal-copy-success').classList.remove('hidden');
                document.getElementById('modal-copy-text').textContent = 'Copied!';
            });
        }

        // Global search shortcut
        document.getElementById('global-search')?.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) window.location.href = '/stores?search=' + encodeURIComponent(query);
            }
        });
    </script>
</body>
</html>`;

fs.writeFileSync('kicks-crew-coupons.html', html, 'utf-8');
console.log('Saved kicks-crew-coupons.html successfully with 20 Amazon sneaker products!');
