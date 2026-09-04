const fs = require('fs');

let appJs = fs.readFileSync('assets/js/app.js', 'utf8');

const regex = /App\.initCouponPage = async function\(\) \{[\s\S]*?(?=App\.initDealsPage)/;

const newInitCouponPage = `App.initCouponPage = async function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) heroTitle.textContent = 'Exclusive Store Offers';
    const heroSub = document.querySelector('.hero-subtitle');
    if (heroSub) heroSub.textContent = 'Top verified deals from your favorite brands and software.';
    
    const slider = document.getElementById('featured');
    if(slider) slider.style.display = 'none';
    const counters = document.querySelector('.counters-section');
    if(counters) counters.style.display = 'none';
    const reviews = document.getElementById('reviews');
    if(reviews) reviews.style.display = 'none';
    const products = document.getElementById('trending-products');
    if(products) products.style.display = 'none';

    const allCoupons = await getDataService().getCoupons();
    
    // Group coupons by store id, keep only the first/top one
    const topOffersMap = new Map();
    for (const c of allCoupons) {
        if (!c.store || !c.store.id) continue;
        if (!topOffersMap.has(c.store.id)) {
            topOffersMap.set(c.store.id, c);
        }
    }
    
    const topOffers = Array.from(topOffersMap.values());
    
    const couponsGrid = document.querySelector('.coupon-grid');
    if (couponsGrid) {
        // Change grid class to use the home deals design
        couponsGrid.className = 'grid coupon-grid home-deals-grid';
        couponsGrid.innerHTML = topOffers.map(c => getComponents().createHomeDealCard(c)).join('');
        this.attachCouponListeners(couponsGrid);
    }
};

`;

appJs = appJs.replace(regex, newInitCouponPage);
fs.writeFileSync('assets/js/app.js', appJs);

