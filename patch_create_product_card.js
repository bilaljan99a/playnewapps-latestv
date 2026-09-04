const fs = require('fs');

let code = fs.readFileSync('assets/js/components.js', 'utf8');

const regex = /static createProductCard\(item\) \{[\s\S]*?\}\s*\}\s*window\.Components = Components;/;

const newMethod = `static createProductCard(item) {
        const affiliateUrl = item.affiliateUrl || item.productUrl || '#';
        const title = item.title || 'Featured Product';
        const merchantName = item.merchantName || item.store || 'Store';
        const merchantLogo = item.merchantLogo || '/assets/images/brands/aliexpress.svg';
        const img = item.image || '/assets/images/products/keyboard.jpg';
        
        return \`
            <article class="product-deal-card" data-category="\${item.categorySlug || 'all'}">
                <a href="\${affiliateUrl}" target="_blank" rel="noopener noreferrer nofollow sponsored" class="product-img-wrapper" aria-label="View \${title}">
                    <img src="\${img}" alt="\${title}" width="320" height="240" loading="lazy" class="product-card-img" onerror="this.src='/assets/images/products/keyboard.jpg'">
                </a>
                <div class="product-card-body" style="display: flex; flex-direction: column; justify-content: space-between; gap: 1rem; flex-grow: 1;">
                    <h3 class="product-card-title" title="\${title}">
                        <a href="\${affiliateUrl}" target="_blank" rel="noopener noreferrer nofollow sponsored">\${title}</a>
                    </h3>
                    
                    <div class="product-card-action" style="margin-top: auto;">
                        <a href="\${affiliateUrl}" target="_blank" rel="noopener noreferrer nofollow sponsored" class="btn btn-primary check-price-btn" aria-label="Check Price on \${merchantName}" style="width: 100%; display: flex; justify-content: center; align-items: center; gap: 0.5rem; text-align: center;">
                            <span>Check Price</span>
                            <span class="material-icons-round" style="font-size: 1.1rem;">open_in_new</span>
                        </a>
                        <div class="product-merchant-attribution" style="margin-top: 0.75rem; text-align: center; display: flex; align-items: center; justify-content: center; gap: 0.5rem; color: var(--text-secondary); font-size: 0.85rem;">
                            <img src="\${merchantLogo}" alt="\${merchantName}" width="20" height="20" class="merchant-mini-logo" onerror="this.style.display='none'" style="border-radius: 4px;">
                            <span>from <strong>\${merchantName}</strong></span>
                        </div>
                    </div>
                </div>
            </article>
        \`;
    }
}

window.Components = Components;`;

if (regex.test(code)) {
    code = code.replace(regex, newMethod);
    fs.writeFileSync('assets/js/components.js', code);
    console.log('Successfully updated createProductCard');
} else {
    console.log('Regex did not match');
}
