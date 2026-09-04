const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldHeader = `<div class="section-header">
                <div>
                    <h2 class="section-title">Trending Products &amp; Hot Deals</h2>
                    <p class="section-subtitle" style="color: var(--text-secondary); margin-top: 0.35rem; font-size: 0.95rem;">
                        Hand-picked electronics, gaming hardware, and lifestyle gear with direct verified savings from global stores. Click &ldquo;Check Price&rdquo; to view real-time store pricing.
                    </p>
                </div>
            </div>`;

const newHeader = `<div class="section-header" style="align-items: flex-start;">
                <div>
                    <h2 class="section-title">Trending Products &amp; Hot Deals</h2>
                    <p class="section-subtitle" style="color: var(--text-secondary); margin-top: 0.35rem; font-size: 0.95rem; max-width: 600px;">
                        Hand-picked electronics, gaming hardware, and lifestyle gear with direct verified savings from global stores. Click &ldquo;Check Price&rdquo; to view real-time store pricing.
                    </p>
                </div>
                <a href="/products" class="view-all" aria-label="View All Products" style="flex-shrink: 0; margin-top: 0.5rem;">View All <span class="material-icons-round" aria-hidden="true">arrow_forward</span></a>
            </div>`;

if (html.includes('<h2 class="section-title">Trending Products &amp; Hot Deals</h2>')) {
    html = html.replace(oldHeader, newHeader);
    fs.writeFileSync('index.html', html);
    console.log('Successfully patched index.html');
} else {
    console.log('Could not find header');
}
