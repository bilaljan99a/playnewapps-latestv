const fs = require('fs');

if (fs.existsSync('products.html')) {
    let html = fs.readFileSync('products.html', 'utf8');
    
    // Change Title
    html = html.replace(/<title>.*?<\/title>/g, '<title>Hot Products & Gadgets | PlayNewApps</title>');
    
    // Replace #deals section with #products section
    html = html.replace(
        /<section id="deals".*?<\/section>/s,
        `<section id="products" class="section container bg-soft reveal">
            <div class="section-header">
                <h2 class="section-title">Hot Products & Tech Deals</h2>
            </div>
            <!-- Products Grid -->
            <div class="grid products-grid" id="products-grid">
                <!-- Loaded dynamically via app.js -->
            </div>
        </section>`
    );
    
    fs.writeFileSync('products.html', html);
}
