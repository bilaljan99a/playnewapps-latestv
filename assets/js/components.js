class Components {
    static getRatingStars(rating) {
        let html = '';
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
                html += `<span class="material-icons-round star active" aria-hidden="true">star</span>`;
            } else if (rating >= i - 0.5) {
                html += `<span class="material-icons-round star half" aria-hidden="true">star_half</span>`;
            } else {
                html += `<span class="material-icons-round star" aria-hidden="true">star_border</span>`;
            }
        }
        return html;
    }

    static getPlatformIcon(platform) {
        const p = platform ? platform.toLowerCase() : '';
        if (p.includes('ios') || p.includes('apple')) return 'apple';
        if (p.includes('android')) return 'android';
        if (p.includes('pc') || p.includes('windows')) return 'computer';
        return 'apps';
    }

    static getBannerImage(item) {
        if (item.banner) return item.banner;
        if (item.screenshots && item.screenshots.length > 0) {
            const ss = item.screenshots[0];
            return ss.thumbnail || ss.url || item.icon;
        }
        return item.icon;
    }

    static createAppCard(item) {
        const platform = (item.platforms && item.platforms.length > 0) ? item.platforms[0] : (item.platform || (item.categoryId === 'pc' ? 'PC' : (item.categoryId === 'action' || item.categoryId === 'rpg' ? 'Games' : 'Android')));
        const icon = this.getPlatformIcon(platform);
        const title = item.title || item.name || 'Software Review';
        const img = item.icon || item.logo || item.image || item.banner || '/assets/images/brands/wondershare.svg';
        const link = item.reviewUrl || item.url || (item.id ? (item.id.includes('.html') ? item.id : 'review.html?id=' + item.id) : '#');
        const desc = item.description || item.summary || '';
        
        const isLogo = img.endsWith('.svg') || img.includes('/brands/') || img.includes('/apps/') || img.includes('logo');
        const imgClass = isLogo ? "card-img card-img-logo" : "card-img";

        return `
            <article class="card review-card" data-category="${item.categoryId || ''}">
                <div class="card-img-wrapper ${isLogo ? 'has-logo-bg' : ''}">
                    <img src="${img}" alt="${title}" class="${imgClass}" width="600" height="400" loading="lazy">
                    <span class="badge platform-badge"><span class="material-icons-round">${icon}</span> ${platform}</span>
                </div>
                <div class="card-content">
                    <h3 class="card-title"><a href="${link}">${title}</a></h3>
                    <div class="rating" aria-label="Rating ${item.rating || 5} out of 5 stars">
                        ${this.getRatingStars(item.rating || 5)}
                        <span class="rating-text">${item.rating || 5.0}</span>
                    </div>
                    <p class="card-excerpt">${desc}</p>
                    <div class="card-footer">
                        <span class="author">By ${item.authorId ? 'PlayNewApps' : 'Reviewer'}</span>
                        <a href="${link}" class="read-review-link">Read Review →</a>
                    </div>
                </div>
            </article>
        `;
    }

    static createSlideCard(item) {
        const platform = (item.platforms && item.platforms.length > 0) ? item.platforms[0] : (item.platform || 'PC');
        const icon = this.getPlatformIcon(platform);
        const title = item.title || item.name || 'Software Review';
        const img = item.icon || item.logo || item.image || item.banner || '/assets/images/brands/wondershare.svg';
        const link = item.reviewUrl || item.url || (item.id ? (item.id.includes('.html') ? item.id : 'review.html?id=' + item.id) : '#');
        const desc = item.description || item.summary || '';

        const isLogo = img.endsWith('.svg') || img.includes('/brands/') || img.includes('/apps/') || img.includes('logo');
        const imgClass = isLogo ? "card-img card-img-logo" : "card-img";

        return `
            <article class="slide card review-card" role="group" aria-roledescription="slide">
                <div class="card-img-wrapper ${isLogo ? 'has-logo-bg' : ''}">
                    <img src="${img}" alt="${title}" class="${imgClass}" width="600" height="400" loading="lazy">
                    <span class="badge platform-badge"><span class="material-icons-round">${icon}</span> ${platform}</span>
                </div>
                <div class="card-content">
                    <h3 class="card-title"><a href="${link}">${title}</a></h3>
                    <div class="rating" aria-label="Rating ${item.rating || 5} out of 5 stars">
                        ${this.getRatingStars(item.rating || 5)}
                        <span class="rating-text">${item.rating || 5.0}</span>
                    </div>
                    <p class="card-excerpt">${desc}</p>
                    <div class="card-footer">
                        <span class="author">By ${item.authorId ? 'PlayNewApps' : 'Reviewer'}</span>
                        <a href="${link}" class="btn btn-outline btn-sm slide-review-btn">Read Review</a>
                    </div>
                </div>
            </article>
        `;
    }

    static createCouponCard(item) {
        const link = item.affiliateLink || item.affiliateUrl || item.url || (item.store && item.store.affiliateLink) || '#';
        let actionHtml = '';
        if (item.code) {
            const masked = item.code.substring(0, 4) + '••••';
            actionHtml = `
                <div class="code-reveal-wrapper" data-code="${item.code}" data-link="${link}">
                    <span class="hidden-code-mask">${masked}</span>
                    <button class="btn show-code-btn" aria-label="Show Coupon Code and Copy">Show Code</button>
                </div>`;
        } else {
            actionHtml = `<a href="${link}" target="_blank" rel="noopener sponsored" class="btn btn-primary get-deal-btn ${item.isTop ? 'cta-pulse' : ''}" style="width: 100%; justify-content: center; text-align: center;">Get Deal</a>`;
        }
        
        const successRate = item.successPercentage ? `${item.successPercentage}%` : (item.successRate || '99%');
        const votesText = item.votesCount ? `${item.votesCount} interested users` : (item.votes ? `${item.votes} votes` : 'Verified Offer');
        const isExpired = item.status === 'expired';
        const discountText = item.discount || (item.code ? 'PROMO' : 'DEAL');
        const codeType = item.code ? 'Code' : 'Sale';

        return `
            <article class="card coupon-card affiliate-card retailmenot-style ${isExpired ? 'opacity-60' : ''}">
                <div class="coupon-header-bar">
                    <div class="header-badges">
                        <span class="badge ${isExpired ? 'expired-badge' : 'verified-badge'}">
                            <span class="material-icons-round" aria-hidden="true">${isExpired ? 'event_busy' : 'verified'}</span> ${isExpired ? 'Expired' : 'Verified'}
                        </span>
                        <span class="badge type-badge">${codeType}</span>
                    </div>
                    ${item.discount ? `<span class="badge discount-pill">${item.discount}</span>` : ''}
                </div>

                <div class="coupon-main-body">
                    <div class="coupon-discount-box">
                        <span class="discount-hero">${discountText}</span>
                    </div>

                    <div class="coupon-info-box">
                        <h3 class="coupon-title">
                            <a href="${link}" target="_blank" rel="noopener sponsored">${item.title}</a>
                        </h3>
                        <div class="coupon-social-proof">
                            <span class="success-rate"><span class="material-icons-round" aria-hidden="true">thumb_up</span> ${successRate} Success</span>
                            <span class="meta-dot">•</span>
                            <span class="users-meta">${votesText}</span>
                        </div>
                    </div>

                    <div class="coupon-action-box">
                        ${actionHtml}
                    </div>
                </div>

                <div class="coupon-details-footer">
                    <div class="coupon-details-content hidden">
                        <div class="details-inner-box">
                            <span class="material-icons-round info-icon">info</span>
                            <p>${item.description || 'Tap offer to copy the coupon code or activate deal. Remember to apply at checkout.'}</p>
                        </div>
                    </div>
                    <div class="details-toggle-container">
                        <button type="button" class="toggle-details-btn" onclick="toggleCouponDetails(this)">
                            <span class="btn-text">Show Details</span>
                            <span class="toggle-icon">+</span>
                        </button>
                    </div>
                </div>
            </article>
        `;
    }

    static createStoreCard(item) {
        const link = item.affiliateLink || `store.html?id=${item.id}`;
        const viewLink = item.storeUrl || `store.html?id=${item.id}`;
        return `
            <article class="card store-card affiliate-card" data-store-id="${item.id}" style="padding: 1.25rem;">
                <a href="${viewLink}" style="display: flex; align-items: center; gap: 1.25rem; text-decoration: none; color: inherit;">
                    <div style="width: 72px; height: 72px; border-radius: 12px; background: #ffffff; border: 1px solid var(--border-color, #e2e8f0); padding: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
                        <img src="${item.logo}" alt="${item.name} Logo" class="store-logo" width="72" height="72" loading="lazy" style="width: 100%; height: 100%; object-fit: contain;">
                    </div>
                    <div style="flex: 1; min-width: 0;">
                        <h3 class="card-title" style="margin: 0; font-size: 1.2rem; font-weight: 700; color: var(--text-primary);">${item.name}</h3>
                        <span style="display: inline-block; margin-top: 0.35rem; font-size: 0.85rem; color: var(--primary-color); font-weight: 600;">View Store Deals &rarr;</span>
                    </div>
                </a>
            </article>
        `;
    }
}
window.Components = Components;
