const fs = require('fs');

let componentsJs = fs.readFileSync('assets/js/components.js', 'utf8');

if (!componentsJs.includes('createHomeDealCard')) {
    const methodStr = `
    static createHomeDealCard(item) {
        const link = item.affiliateLink || item.affiliateUrl || item.url || (item.store && item.store.affiliateLink) || '#';
        const cleanTitle = this.sanitizeText(item.title, item.code);
        const storeName = item.store ? item.store.name : 'Store';
        const storeLogo = item.store ? item.store.logo : '/assets/images/brands/default-store.svg';
        const discountText = item.discount || (item.code ? 'PROMO' : 'DEAL');
        
        let actionHtml = '';
        if (item.code) {
            actionHtml = \`
                <div class="code-reveal-wrapper home-reveal-wrapper" data-code="\${item.code}" data-link="\${link}">
                    <span class="hidden-code-mask">••••</span>
                    <button class="btn show-code-btn home-deal-btn" aria-label="Show Coupon Code and Copy">Get Code</button>
                </div>
            \`;
        } else {
            actionHtml = \`
                <a href="\${link}" target="_blank" rel="noopener sponsored" class="btn btn-primary get-deal-btn" style="width: 100%; justify-content: center; text-align: center;">Get Deal</a>
            \`;
        }

        return \`
            <article class="home-deal-card">
                <div class="home-deal-logo-box">
                    <img src="\${storeLogo}" alt="\${storeName} Logo" width="140" height="48" loading="lazy" class="home-deal-logo-img" onerror="this.src='/assets/images/brands/default-store.svg'">
                </div>
                <div class="home-deal-body">
                    <div class="home-deal-badge-row">
                        <span class="home-deal-discount-tag">\${discountText}</span>
                        <span class="home-deal-verified-tag"><span class="material-icons-round" aria-hidden="true" style="font-size: 13px;">verified</span> Verified</span>
                    </div>
                    <h3 class="home-deal-title" title="\${cleanTitle}">
                        <a href="\${link}" target="_blank" rel="noopener sponsored">\${cleanTitle}</a>
                    </h3>
                    \${item.expireDate ? \`
                    <div class="home-deal-expiry">
                        <span class="material-icons-round" aria-hidden="true" style="font-size: 13px;">schedule</span>
                        <span>Exp: \${item.expireDate}</span>
                    </div>
                    \` : ''}
                    <div class="home-deal-action">
                    \${actionHtml}
                    </div>
                </div>
            </article>
        \`;
    }
`;
    // Insert before the last closing brace
    componentsJs = componentsJs.replace(/}\s*$/, methodStr + '\n}');
    fs.writeFileSync('assets/js/components.js', componentsJs);
}
