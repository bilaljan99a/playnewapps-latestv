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
            actionHtml = `<a href="${link}" target="_blank" rel="noopener sponsored" class="btn btn-primary full-width get-deal-btn ${item.isTop ? 'cta-pulse' : ''}">Get Deal</a>`;
        }
        
        const successRate = item.successPercentage ? `${item.successPercentage}%` : (item.successRate || '99%');
        const votes = item.votesCount ? `(${item.votesCount} votes)` : '';
        const isExpired = item.status === 'expired';
        const storeName = item.store ? item.store.name : 'Store';
        const expiryText = item.expiry || 'Verified Daily';

        return `
            <article class="card coupon-card affiliate-card ${isExpired ? 'opacity-60' : ''}">
                <div class="coupon-header">
                    <div class="coupon-top-bar">
                        <span class="badge ${isExpired ? 'expired-badge' : 'verified-badge'}">
                            <span class="material-icons-round" aria-hidden="true">${isExpired ? 'event_busy' : 'verified'}</span> ${isExpired ? 'Expired' : 'Verified'}
                        </span>
                        ${item.discount ? `<span class="badge discount-badge">${item.discount}</span>` : ''}
                    </div>
                    <div class="store-info">
                        ${item.store && item.store.id ? `<a href="store.html?id=${item.store.id}" style="display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none; color: inherit;">
                            <img src="${item.store.logo}" alt="${item.store.name} Logo" class="store-logo" width="50" height="50" loading="lazy">
                            <div class="store-name">${item.store.name}</div>
                        </a>` : `
                            <img src="${item.store ? item.store.logo : ''}" alt="${storeName} Logo" class="store-logo" width="50" height="50" loading="lazy">
                            <div class="store-name">${storeName}</div>
                        `}
                    </div>
                </div>
                <div class="coupon-content">
                    <h3 class="coupon-title"><a href="deal.html?id=${item.id}" style="color: inherit; text-decoration: none;">${item.title}</a></h3>
                    <p class="coupon-desc">${item.description}</p>
                    <div class="coupon-meta">
                        <span class="success-rate" title="Success Rate"><span class="material-icons-round" aria-hidden="true">thumb_up</span> ${successRate} ${votes}</span>
                        <span class="expiry-date"><span class="material-icons-round" aria-hidden="true">timer</span> ${expiryText}</span>
                    </div>
                    <div class="coupon-action">${actionHtml}</div>
                </div>
            </article>
        `;
    }

    static createStoreCard(item) {
        const rating = item.rating || 4.9;
        const votes = item.votes ? `(${item.votes} votes)` : '';
        const link = item.affiliateLink || `store.html?id=${item.id}`;
        return `
            <article class="card store-card affiliate-card" data-store-id="${item.id}">
                <div class="coupon-header" style="align-items: center; gap: 1rem;">
                    <img src="${item.logo}" alt="${item.name} Logo" class="store-logo" width="55" height="55" loading="lazy" style="object-fit: contain; background: #ffffff; border-radius: 10px; padding: 4px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">
                    <div>
                        <h3 class="card-title" style="margin-bottom: 0.25rem; font-size: 1.15rem;"><a href="store.html?id=${item.id}">${item.name}</a></h3>
                        <div class="rating" aria-label="Rating ${rating} out of 5 stars">
                            ${this.getRatingStars(rating)}
                            <span class="rating-text">${rating} ${votes}</span>
                        </div>
                    </div>
                </div>
                <div class="card-content" style="display: flex; flex-direction: column; justify-content: space-between; flex-grow: 1;">
                    <p class="card-excerpt" style="font-size: 0.875rem; color: #64748b; margin-bottom: 1rem; line-height: 1.5;">${item.about}</p>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        <a href="${link}" target="_blank" rel="noopener sponsored" class="btn btn-primary cta-pulse" style="flex: 1; text-align: center; justify-content: center;">Official Store</a>
                        <a href="store.html?id=${item.id}" class="btn btn-outline" style="white-space: nowrap;">View Deals</a>
                    </div>
                </div>
            </article>
        `;
    }
}
window.Components = Components;
