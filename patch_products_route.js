const fs = require('fs');
let appJs = fs.readFileSync('assets/js/app.js', 'utf8');

if (!appJs.includes('/products.html')) {
    appJs = appJs.replace(
        /\} else if \(path === '\/deal' \|\| path\.endsWith\('\/deal\.html'\)/,
        `} else if (path === '/products' || path.endsWith('/products.html')) {
                await this.initProductsPage();
            } else if (path === '/deal' || path.endsWith('/deal.html')`
    );
    
    const initProductsMethod = `
App.initProductsPage = async function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) heroTitle.textContent = 'Hot Products & Gadgets';
    const heroSub = document.querySelector('.hero-subtitle');
    if (heroSub) heroSub.textContent = 'Discover top tech, gaming setups, and trending gear with our exclusive recommendations.';
    
    const slider = document.getElementById('featured');
    if(slider) slider.style.display = 'none';
    const counters = document.querySelector('.counters-section');
    if(counters) counters.style.display = 'none';
    const reviews = document.getElementById('reviews');
    if(reviews) reviews.style.display = 'none';

    // The grid should have id="products-grid" in products.html
    const grid = document.querySelector('.coupon-grid') || document.getElementById('products-grid');
    if (grid) {
        grid.className = 'grid products-grid';
        grid.style.display = 'grid';
        grid.style.gap = '1.5rem';
        grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
        const products = await getDataService().getProducts();
        grid.innerHTML = products.map(p => getComponents().createProductCard(p)).join('');
    }
};
`;
    appJs += initProductsMethod;
    fs.writeFileSync('assets/js/app.js', appJs);
}
