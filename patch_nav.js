const fs = require('fs');
let htmlFiles = ['index.html', 'coupon.html', 'products.html', 'deal.html', 'stores.html', 'store.html', 'category.html', 'about.html', 'contact.html', 'reviews.html', 'review.html'];

for (let file of htmlFiles) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        content = content.replace(
            /<li><a href="#popular-categories"[^>]*>Categories<\/a><\/li>\s*<li><a href="#trending-products"[^>]*>Hot Deals<\/a><\/li>\s*<li><a href="\/reviews"[^>]*>Reviews<\/a><\/li>\s*<li><a href="\/reviews"[^>]*>Blog<\/a><\/li>/g,
            '<li><a href="/coupon" class="nav-link">Deals</a></li>\n                    <li><a href="/products" class="nav-link">Products</a></li>\n                    <li><a href="/reviews" class="nav-link">Reviews</a></li>'
        );
        fs.writeFileSync(file, content);
    }
}
