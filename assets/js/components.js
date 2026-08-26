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
            <article class="slide card review-card">
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

    static sanitizeText(text, code) {
        if (!text) return '';
        let res = String(text);
        // Normalize currency formatting: remove redundant USD / US prefix when $ is present
        res = res
            .replace(/US\s*\$/gi, '$')
            .replace(/USD\s*\$/gi, '$')
            .replace(/US\s*(\$\d+)/gi, '$1')
            .replace(/\bUSD\s+(\d+)/gi, '$$$1')
            .replace(/(\$\d+)\s*USD\b/gi, '$1');

        // Strictly sanitize any raw promo code from text so code is ONLY revealed behind Show Code
        if (code && typeof code === 'string' && code.trim().length > 1) {
            const trimmedCode = code.trim();
            const escaped = trimmedCode.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const pattern1 = new RegExp(`(?:use\\s+)?(?:promo\\s+|coupon\\s+)?code\\s*[:=-]?\\s*${escaped}\\s*(?:at\\s+checkout)?`, 'gi');
            const pattern2 = new RegExp(`with\\s+(?:promo\\s+|coupon\\s+)?code\\s*[:=-]?\\s*${escaped}`, 'gi');
            const pattern3 = new RegExp(`\\b${escaped}\\b`, 'g');

            res = res.replace(pattern1, 'with verified promo code');
            res = res.replace(pattern2, 'with verified promo code');
            res = res.replace(pattern3, 'promo code');
            res = res.replace(/\s{2,}/g, ' ').trim();
        }
        return res;
    }

    static createCouponCard(item) {
        const link = item.affiliateLink || item.affiliateUrl || item.url || (item.store && item.store.affiliateLink) || '#';
        const cleanTitle = this.sanitizeText(item.title, item.code);
        const cleanDesc = this.sanitizeText(item.description, item.code);
        const cleanDiscount = this.sanitizeText(item.discount || (item.code ? 'PROMO' : 'DEAL'), item.code);

        let actionHtml = '';
        if (item.code) {
            // Mask is fully obfuscated with dots so code is never revealed before clicking Show Code
            const masked = '••••••••';
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
        const discountText = cleanDiscount;
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
                    ${discountText ? `<span class="badge discount-pill">${discountText}</span>` : ''}
                </div>

                <div class="coupon-main-body">
                    <div class="coupon-discount-box">
                        <span class="discount-hero">${discountText}</span>
                    </div>

                    <div class="coupon-info-box">
                        <h3 class="coupon-title">
                            <a href="${link}" target="_blank" rel="noopener sponsored">${cleanTitle}</a>
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
                            <p>${cleanDesc || 'Tap offer to copy the verified promo code or activate deal. Remember to apply at checkout.'}</p>
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
        const viewLink = item.storeUrl || `store.html?id=${item.id}`;
        const rating = item.rating ? `★ ${item.rating}` : '★ 4.9';
        return `
            <a href="${viewLink}" class="store-card-item" data-store-id="${item.id}">
                <div class="store-card-logo-wrap">
                    <img src="${item.logo}" alt="${item.name} Logo" width="68" height="68" loading="lazy" onerror="this.src='/assets/images/brands/default-store.svg'">
                </div>
                <div class="store-card-info">
                    <h3 class="store-card-name" title="${item.name}">${item.name}</h3>
                    <div class="store-card-meta">
                        <span class="store-card-deals-count">View Deals</span>
                        <span class="store-card-rating">${rating}</span>
                    </div>
                </div>
                <span class="material-icons-round store-card-arrow" aria-hidden="true">arrow_forward</span>
            </a>
        `;
    }
}
window.Components = Components;
