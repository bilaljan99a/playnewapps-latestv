class App {
    static async init() {
        try {
            const rawPath = window.location.pathname.toLowerCase();
            const path = (rawPath.length > 1 && rawPath.endsWith('/')) ? rawPath.slice(0, -1) : rawPath;

            if (path === '/reviews' || path.endsWith('/reviews.html')) {
                await this.initReviewsPage();
            } else if (path === '/category' || path.endsWith('/category.html')) {
                await this.initCategoryPage();
            } else if (path === '/stores' || path.endsWith('/stores.html') || path === '/store' || path.endsWith('/store.html')) {
                await this.initStorePage();
            } else if (path === '/author' || path.endsWith('/author.html')) {
                await this.initAuthorPage();
            } else if (path === '/coupon' || path.endsWith('/coupon.html') || path === '/coupons' || path.endsWith('/coupons.html')) {
                await this.initCouponPage();
            } else if (path === '/deal' || path.endsWith('/deal.html') || path === '/deals' || path.endsWith('/deals.html')) {
                await this.initDealPage();
            } else if (path === '/review' || path.endsWith('/review.html') || path.startsWith('/review/') || (path.startsWith('/reviews/') && path !== '/reviews') || document.querySelector('.review-title')) {
                await this.initReviewPage();
            } else {
                await this.initHomePage();
            }

            if (typeof this.initHeaderStoresDropdown === 'function') {
                await this.initHeaderStoresDropdown();
            }
            if (typeof this.initSearch === 'function') {
                this.initSearch();
            }
            if (typeof this.initScrollReveal === 'function') {
                this.initScrollReveal();
            }
        } catch (e) {
            console.error(e);
        } finally {
            const loader = document.getElementById('loader');
            if (loader) {
                loader.style.display = 'none';
            }
        }
    }

    static async initSearch() {
        const searchInput = document.getElementById('search-input');
        const searchForm = document.getElementById('search-form');
        const suggestionsBox = document.getElementById('search-suggestions');
        
        if (!searchInput || !searchForm) return;

        const allReviews = await DataService.getAllReviews();

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            if (query.length < 2) {
                if (suggestionsBox) suggestionsBox.innerHTML = '';
                return;
            }

            const results = allReviews.filter(r => 
                r.title.toLowerCase().includes(query) || 
                r.description.toLowerCase().includes(query) ||
                (r.tags && r.tags.some(t => t.toLowerCase().includes(query)))
            ).slice(0, 5);

            if (suggestionsBox) {
                if (results.length > 0) {
                    suggestionsBox.innerHTML = results.map(r => `
                        <a href="review.html?id=${r.id}" class="suggestion-item">
                            <img src="${r.icon}" alt="${r.title} icon" width="30" height="30">
                            <span>${r.title}</span>
                        </a>
                    `).join('');
                } else {
                    suggestionsBox.innerHTML = '<div class="suggestion-item">No results found</div>';
                }
            }
        });

        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.toLowerCase();
            const reviewsGrid = document.getElementById('reviews-grid');
            if (reviewsGrid) {
                const results = allReviews.filter(r => 
                    r.title.toLowerCase().includes(query) || 
                    r.description.toLowerCase().includes(query) ||
                    (r.tags && r.tags.some(t => t.toLowerCase().includes(query)))
                );
                document.getElementById('reviews').scrollIntoView({ behavior: 'smooth' });
                this.renderReviews(results, reviewsGrid);
                // hide pagination on search
                const paginationContainer = document.getElementById('pagination-container');
                if (paginationContainer) paginationContainer.innerHTML = '';
            }
        });
    }

    static async initHomePage() {
        const allReviews = await DataService.getAllReviews();
        const coupons = await DataService.getCoupons();

        // Populate Trending Slider
        const sliderTrack = document.getElementById('slider-track');
        if (sliderTrack) {
            const trending = allReviews.filter(r => r.isTrending);
            if (trending.length > 0) {
                sliderTrack.innerHTML = trending.map(item => Components.createSlideCard(item)).join('');
            } else {
                sliderTrack.innerHTML = allReviews.slice(0, 3).map(item => Components.createSlideCard(item)).join('');
            }
        }

        // Setup Sorting & Pagination
        const sortSelect = document.getElementById('sort-select');
        let currentSort = 'newest';
        let currentPage = 1;
        const itemsPerPage = 8;

        const sortReviews = (reviews, sortStr) => {
            let sorted = [...reviews];
            if (sortStr === 'rating') {
                sorted.sort((a, b) => b.rating - a.rating);
            } else if (sortStr === 'name') {
                sorted.sort((a, b) => a.title.localeCompare(b.title));
            } else {
                sorted.sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));
            }
            return sorted;
        };

        const reviewsGrid = document.getElementById('reviews-grid');
        let filteredReviews = [...allReviews];
        let currentFilter = 'all';

        const renderPagination = (totalItems) => {
            let container = document.getElementById('pagination-container');
            if (!container) {
                container = document.createElement('div');
                container.id = 'pagination-container';
                container.className = 'pagination-container';
                if (reviewsGrid) reviewsGrid.parentNode.insertBefore(container, reviewsGrid.nextSibling);
            }
            
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            if (totalPages <= 1) {
                container.innerHTML = '';
                return;
            }

            let html = '';
            for (let i = 1; i <= totalPages; i++) {
                html += `<button class="btn ${i === currentPage ? 'btn-primary' : 'btn-outline'} page-btn" data-page="${i}">${i}</button>`;
            }
            container.innerHTML = html;

            container.querySelectorAll('.page-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    currentPage = parseInt(e.target.getAttribute('data-page'));
                    updateGrid();
                    document.getElementById('reviews').scrollIntoView({ behavior: 'smooth' });
                });
            });
        };

        const updateGrid = () => {
            let finalData = sortReviews(filteredReviews, currentSort);
            
            // Pagination
            const start = (currentPage - 1) * itemsPerPage;
            const paginatedData = finalData.slice(start, start + itemsPerPage);
            
            this.renderReviews(paginatedData, reviewsGrid);
            renderPagination(finalData.length);
        };

        if (reviewsGrid) {
            updateGrid();

            if (sortSelect) {
                sortSelect.addEventListener('change', (e) => {
                    currentSort = e.target.value;
                    currentPage = 1; // reset to first page
                    updateGrid();
                });
            }

            // Setup filters
            const filterBtns = document.querySelectorAll('.filter-btn');
            filterBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    currentFilter = e.target.getAttribute('data-filter');
                    
                    if (currentFilter !== 'all') {
                        filteredReviews = allReviews.filter(r => {
                            if (currentFilter === 'android' && r.categoryId !== 'pc' && !r.categoryId.includes('ios')) return true;
                            if (currentFilter === 'pc' && r.categoryId === 'pc') return true;
                            if (currentFilter === 'ios' && r.categoryId.includes('ios')) return true;
                            return false;
                        });
                    } else {
                        filteredReviews = [...allReviews];
                    }
                    currentPage = 1; // reset page
                    updateGrid();
                });
            });
        }

        // Populate Coupons Grid
        const couponsGrid = document.querySelector('.coupon-grid');
        if (couponsGrid) {
            const topCoupons = coupons.filter(c => c.isTop);
            couponsGrid.innerHTML = topCoupons.map(c => Components.createCouponCard(c)).join('');
            this.attachCouponListeners(couponsGrid);
        }

        // Populate Featured Partner Stores Grid
        const storesGrid = document.getElementById('stores-grid');
        if (storesGrid) {
            const stores = await DataService.getStores();
            if (stores && stores.length > 0) {
                storesGrid.innerHTML = stores.map(s => Components.createStoreCard(s)).join('');
            }
        }
    }

    static renderReviews(items, container) {
        if(items.length === 0) {
            container.innerHTML = '<p>No items found.</p>';
            return;
        }
        container.innerHTML = items.map(item => Components.createAppCard(item)).join('');
    }

    static attachCouponListeners(container) {
        if (!container) return;
        const revealWrappers = container.querySelectorAll('.code-reveal-wrapper');
        revealWrappers.forEach(wrapper => {
            const btn = wrapper.querySelector('.show-code-btn');
            const mask = wrapper.querySelector('.hidden-code-mask');
            const realCode = wrapper.getAttribute('data-code');
            const affiliateLink = wrapper.getAttribute('data-link');
            
            if (!btn || !mask) return;

            btn.addEventListener('click', async () => {
                if (!wrapper.classList.contains('revealed')) {
                    wrapper.classList.add('revealed');
                    mask.textContent = realCode;
                    btn.textContent = 'Copied';
                    try {
                        await navigator.clipboard.writeText(realCode);
                    } catch (err) {}
                    setTimeout(() => {
                        window.open(affiliateLink, '_blank', 'noopener,sponsored');
                    }, 800);
                    setTimeout(() => { btn.textContent = 'Copy'; }, 3000);
                } else {
                    try {
                        await navigator.clipboard.writeText(realCode);
                        btn.textContent = 'Copied';
                        setTimeout(() => { btn.textContent = 'Copy'; }, 3000);
                    } catch (err) {}
                }
            });
        });
    }

    
    static async setupAffiliateFeatures(review) {
        if (!review) return;

        // -- Affiliate System Injections --
        
        // 1. Affiliate Buttons
        const affiliateContainer = document.getElementById('affiliate-buttons-container');
        if (affiliateContainer) {
            let links = Array.isArray(review.affiliateLinks) ? review.affiliateLinks : null;
            if ((!links || links.length === 0) && Array.isArray(review.downloads) && review.downloads.length > 0) {
                links = review.downloads.map(d => ({
                    label: d.storeId === 'apple' ? 'Get on Apple App Store' : (d.storeId === 'google' ? 'Get on Google Play' : 'Official Site'),
                    url: d.url,
                    isPrimary: d.storeId === 'apple' || d.storeId === 'google',
                    icon: d.storeId === 'apple' ? 'apple' : (d.storeId === 'google' ? 'android' : 'open_in_new')
                }));
            }
            if (Array.isArray(links) && links.length > 0) {
                affiliateContainer.style.display = 'flex';
                affiliateContainer.innerHTML = links.map(link => `
                    <a href="${link.url}" target="_blank" rel="noopener sponsored" class="btn ${link.isPrimary ? 'btn-primary cta-pulse' : 'btn-outline'} affiliate-btn">
                        ${link.icon ? `<span class="material-icons-round">${link.icon}</span>` : ''} ${link.label}
                    </a>
                `).join('');
            } else {
                affiliateContainer.style.display = 'none';
            }
        }

        // 2. Trust Score
        const trustBox = document.getElementById('trust-score-box');
        if (trustBox) {
            if (review.trustScore) {
                trustBox.style.display = 'block';
                trustBox.innerHTML = `
                    <div class="trust-score-header">
                        <span class="material-icons-round text-secondary">verified_user</span>
                        <h3>Trust Score</h3>
                    </div>
                    <div class="trust-score-value">${review.trustScore}<span class="trust-score-max">/100</span></div>
                    <p class="trust-score-desc">Based on expert testing, user reviews, and security audits.</p>
                    ${review.communityRating ? `
                    <div class="community-rating">
                        <span>Community Rating:</span>
                        <div class="rating">
                            ${Components.getRatingStars(review.communityRating)}
                        </div>
                        <strong>${review.communityRating}</strong>
                    </div>` : ''}
                `;
            } else {
                trustBox.style.display = 'none';
            }
        }

        // 3. Price Comparison
        const priceBox = document.getElementById('price-comparison-box');
        if (priceBox) {
            if (review.priceComparison && review.priceComparison.length > 0) {
                priceBox.style.display = 'block';
                priceBox.innerHTML = `
                    <h3>Best Prices Today</h3>
                    <ul class="price-comparison-list">
                        ${review.priceComparison.map(p => `
                            <li class="price-comparison-item ${p.isBest ? 'best-deal-highlight' : ''}">
                                <div class="price-item-header">
                                    <span class="store-name">${p.store}</span>
                                    <div class="price-badges">
                                        ${p.isBest ? `<span class="best-deal-badge">Best Deal</span>` : ''}
                                        ${p.badge ? `<span class="deal-badge">${p.badge}</span>` : ''}
                                    </div>
                                </div>
                                <div class="price-item-body">
                                    <span class="price-amount">${p.price}</span>
                                    <a href="${p.url}" target="_blank" rel="noopener sponsored" class="btn btn-sm ${p.isBest ? 'btn-primary' : 'btn-outline'}">View Deal</a>
                                </div>
                            </li>
                        `).join('')}
                    </ul>
                `;
            } else {
                priceBox.style.display = 'none';
            }
        }

        // 4. Editor Recommendation
        const editorBox = document.getElementById('editor-recommendation-box');
        if (editorBox) {
            if (review.editorRecommendation) {
                editorBox.style.display = 'block';
                editorBox.innerHTML = `
                    <div class="editor-rec-content">
                        <div class="editor-rec-header">
                            <span class="material-icons-round">thumb_up</span>
                            <h3>Editor's Take</h3>
                        </div>
                        <p>${review.editorRecommendation}</p>
                    </div>
                `;
            } else {
                editorBox.style.display = 'none';
            }
        }

        // 5. Related Guides
        const guidesBox = document.getElementById('related-guides-section');
        if (guidesBox) {
            if (review.relatedGuides && review.relatedGuides.length > 0) {
                guidesBox.style.display = 'block';
                guidesBox.innerHTML = `
                    <h2>Related Buying Guides</h2>
                    <ul class="related-guides-list">
                        ${review.relatedGuides.map(g => `
                            <li>
                                <a href="${g.url}">
                                    <span class="material-icons-round">menu_book</span> ${g.title}
                                </a>
                            </li>
                        `).join('')}
                    </ul>
                `;
            } else {
                guidesBox.style.display = 'none';
            }
        }
        
        // 6. Mobile Sticky CTA
        const stickyCta = document.getElementById('sticky-mobile-cta');
        if (stickyCta && review.affiliateLinks && review.affiliateLinks.length > 0) {
            const primaryLink = review.affiliateLinks.find(l => l.isPrimary) || review.affiliateLinks[0];
            if (primaryLink) {
                stickyCta.innerHTML = `
                    <div class="sticky-cta-content">
                        <div class="sticky-cta-info">
                            <strong>${review.title}</strong>
                            <span>${primaryLink.label}</span>
                        </div>
                        <a href="${primaryLink.url}" target="_blank" rel="noopener sponsored" class="btn btn-primary cta-pulse">Get Deal</a>
                    </div>
                `;
                // Show on scroll
                window.addEventListener('scroll', () => {
                    if (window.scrollY > 300) {
                        stickyCta.classList.add('visible');
                    } else {
                        stickyCta.classList.remove('visible');
                    }
                }, {passive: true});
            }
        }
    }

    static async initReviewPage() {
        const urlParams = new URLSearchParams(window.location.search);
        let id = urlParams.get('id');
        
        // Support clean URLs like /reviews/capcut-pro
        if (!id && window.location.pathname.includes('/reviews/')) {
            const parts = window.location.pathname.split('/').filter(Boolean);
            id = parts[parts.length - 1]; 
        }

        const allReviews = await DataService.getAllReviews();
        if (!id && allReviews.length > 0) {
            id = allReviews[0].id;
        }

        let review = allReviews.find(r => r.id === id);
        if (!review && id) {
            const cleanId = id.toLowerCase().replace(/[^a-z0-9]/g, '');
            review = allReviews.find(r => {
                const rCleanId = r.id.toLowerCase().replace(/[^a-z0-9]/g, '');
                const rCleanTitle = r.title.toLowerCase().replace(/[^a-z0-9]/g, '');
                return r.id.toLowerCase() === id.toLowerCase() ||
                       rCleanId === cleanId ||
                       rCleanTitle === cleanId ||
                       rCleanId.includes(cleanId) ||
                       cleanId.includes(rCleanId);
            });
        }

        if (!review) {
            const skeleton = document.getElementById('review-loading-skeleton');
            if (skeleton) skeleton.style.display = 'none';
            const mainContent = document.querySelector('.main-content');
            if (mainContent) {
                mainContent.innerHTML = '<div class="card" style="padding: 2rem; text-align: center;"><h2>Review Not Found</h2><p style="margin: 1rem 0;">The requested review could not be found or has been moved.</p><a href="index.html" class="btn btn-primary">Return to Home</a></div>';
            }
            return;
        }

        // 1. Update Title & SEO Metadata
        document.title = `${review.title} Review 2026 | PlayNewApps`;
      const canonicalUrl = `https://playnewapps.store/review.html?id=${review.id}`;
        
        const updateMeta = (selector, attr, content) => {
            const el = document.querySelector(selector);
            if (el) el.setAttribute(attr, content);
        };

        updateMeta('meta[name="description"]', 'content', review.description || '');
        updateMeta('#canonical-url', 'href', canonicalUrl);
        updateMeta('#og-title', 'content', `${review.title} Review | PlayNewApps`);
        updateMeta('#og-description', 'content', review.description || '');
        updateMeta('#og-url', 'content', canonicalUrl);
        updateMeta('#og-image', 'content', review.icon ? `https://playnewapps.store${review.icon}` : '');
        updateMeta('#twitter-title', 'content', `${review.title} Review (2026)`);
        updateMeta('#twitter-description', 'content', review.description || '');
        updateMeta('#twitter-image', 'content', review.icon ? `https://playnewapps.store${review.icon}` : '');
        
        // 2. Schema JSON-LD Injection
        const schemaReview = {
            "@context": "https://schema.org",
            "@type": "Review",
            "itemReviewed": {
                "@type": "SoftwareApplication",
                "name": review.title,
                "applicationCategory": review.categoryId || "MultimediaApplication",
                "image": review.icon ? `https://playnewapps.store${review.icon}` : ''
            },
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": (review.rating || 5).toString(),
                "bestRating": "5"
            },
            "author": {
                "@type": "Person",
                "name": review.developer || "PlayNewApps Expert"
            }
        };
        const scriptSchema = document.createElement('script');
        scriptSchema.type = 'application/ld+json';
        scriptSchema.text = JSON.stringify(schemaReview);
        document.head.appendChild(scriptSchema);
        
        // 3. Update Breadcrumb
        const breadcrumbEl = document.getElementById('breadcrumb-current');
        if (breadcrumbEl) breadcrumbEl.textContent = review.title;

        // 4. Hero Section Updates
        const setText = (sel, text) => { const el = document.querySelector(sel); if(el) el.textContent = text; };
        const setHtml = (sel, html) => { const el = document.querySelector(sel); if(el) el.innerHTML = html; };
        const setSrc = (sel, src, alt) => {
            const el = document.querySelector(sel);
            if(el) {
                el.src = src || '';
                if (alt) el.alt = alt;
            }
        };

        setText('.review-title', `${review.title} Review`);
        setText('.review-subtitle', review.description || '');
        setSrc('.app-icon', review.icon, `${review.title} Icon`);
        
        // Badges
        const badgesContainer = document.querySelector('.badges');
        if (badgesContainer) {
            if (review.badges && review.badges.length > 0) {
                badgesContainer.style.display = 'flex';
                badgesContainer.innerHTML = review.badges.map(b => {
                    const isVerified = b.toLowerCase().includes('verified');
                    const isEditor = b.toLowerCase().includes('editor');
                    const icon = isVerified ? 'verified' : (isEditor ? 'stars' : 'local_fire_department');
                    return `<span class="badge ${isVerified ? 'verified-badge' : 'editor-choice'}"><span class="material-icons-round" aria-hidden="true">${icon}</span> ${b}</span>`;
                }).join(' ');
            } else {
                badgesContainer.style.display = 'none';
            }
        }

        // Rating
        const ratingHtml = Components.getRatingStars(review.rating || 5) + `<span class="rating-text">${review.rating || 5.0} / 5.0 Overall</span>`;
        setHtml('.review-rating', ratingHtml);

        // Update Date
        const dateEl = document.querySelector('.update-date');
        if (dateEl) {
            if (review.updatedAt) {
                dateEl.style.display = 'inline-flex';
                dateEl.innerHTML = `<span class="material-icons-round">update</span> Updated ${new Date(review.updatedAt).toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'})}`;
            } else {
                dateEl.style.display = 'none';
            }
        }

        // Tags
        const tagsBox = document.querySelector('.tags-box');
        if (tagsBox) {
            if (review.tags && review.tags.length > 0) {
                tagsBox.style.display = 'flex';
                tagsBox.innerHTML = review.tags.map(t => `<span class="tag">#${t}</span>`).join(' ');
            } else {
                tagsBox.style.display = 'none';
            }
        }

        // Quick Info Table
        const tbody = document.querySelector('.quick-info-table tbody');
        if (tbody) {
            tbody.innerHTML = `
                <tr><th>Developer</th><td>${review.developer || 'N/A'}</td></tr>
                <tr><th>Category</th><td>${review.categoryId || 'App'}</td></tr>
                <tr><th>Version</th><td>${review.version || 'Varies'}</td></tr>
                <tr><th>Size</th><td>${review.size || 'Varies'}</td></tr>
                <tr><th>Platforms</th><td>${(review.platforms||[]).join(', ') || 'All Platforms'}</td></tr>
                <tr><th>License</th><td>${review.license || 'Free / Paid'}</td></tr>
            `;
        }

        // 5. Dynamic Review Content Body
        const dynamicBody = document.getElementById('dynamic-review-body');
        if (dynamicBody) {
            if (review.contentHtml || review.body) {
                dynamicBody.style.display = 'block';
                dynamicBody.innerHTML = review.contentHtml || review.body;
                
                // Enhance comparison tables for responsiveness & accessibility
                const tables = dynamicBody.querySelectorAll('table');
                tables.forEach(table => {
                    table.classList.add('comparison-table');
                    if (!table.parentElement.classList.contains('table-responsive')) {
                        const wrapper = document.createElement('div');
                        wrapper.className = 'table-responsive';
                        wrapper.setAttribute('tabindex', '0');
                        wrapper.setAttribute('role', 'region');
                        wrapper.setAttribute('aria-label', `${review.title || 'App'} Comparison Table`);
                        table.parentNode.insertBefore(wrapper, table);
                        wrapper.appendChild(table);
                    }
                });
            } else if (review.summary) {
                dynamicBody.style.display = 'block';
                dynamicBody.innerHTML = `
                    <h2>In-Depth Review & Overview</h2>
                    <p class="lead-text">${review.summary}</p>
                `;
            } else {
                dynamicBody.style.display = 'none';
            }
        }

        // 6. Pros and Cons Section
        const prosConsSection = document.getElementById('pros-cons-section');
        const prosList = document.querySelector('.pros-card .feature-list');
        const consList = document.querySelector('.cons-card .feature-list');
        const hasPros = review.pros && review.pros.length > 0;
        const hasCons = review.cons && review.cons.length > 0;
        if (hasPros || hasCons) {
            if (prosConsSection) prosConsSection.style.display = 'block';
            if (prosList) prosList.innerHTML = hasPros ? review.pros.map(p => `<li>${p}</li>`).join('') : '<li>No major pros listed</li>';
            if (consList) consList.innerHTML = hasCons ? review.cons.map(c => `<li>${c}</li>`).join('') : '<li>No major cons listed</li>';
        } else if (prosConsSection) {
            prosConsSection.style.display = 'none';
        }

        // 7. Screenshots Section
        const screenshotsSection = document.getElementById('screenshots-section');
        const galleryGrid = document.querySelector('.gallery-grid');
        if (review.screenshots && review.screenshots.length > 0) {
            if (screenshotsSection) screenshotsSection.style.display = 'block';
            if (galleryGrid) {
                galleryGrid.innerHTML = review.screenshots.map(s => {
                    const thumbUrl = s.thumbnail || s.url;
                    const fullUrl = s.url || s.thumbnail;
                    const altText = s.alt || `${review.title || 'App'} Screenshot`;
                    return `
                        <img src="${thumbUrl}" data-full="${fullUrl}" alt="${altText}" class="gallery-img lightbox-trigger" loading="lazy" width="800" height="600" tabindex="0">
                    `;
                }).join('');
            }
        } else if (screenshotsSection) {
            screenshotsSection.style.display = 'none';
        }

        // 8. Video Review Section
        const videoSection = document.getElementById('video-section');
        const videoContainer = document.querySelector('.video-container');
        let videoObj = null;
        if (typeof review.video === 'string' && review.video.trim()) {
            const vId = review.video.trim();
            videoObj = {
                youtubeId: vId,
                embedUrl: `https://www.youtube-nocookie.com/embed/${vId}`,
                thumbnail: `https://img.youtube.com/vi/${vId}/maxresdefault.jpg`,
                title: `Watch ${review.id === 'kinemaster' ? 'KineMaster' : review.title} in Action`,
                description: `Watch the official video tutorial and walkthrough to see ${review.id === 'kinemaster' ? 'KineMaster' : review.title}'s core features, interface, and capabilities in action.`
            };
        } else if (review.video && typeof review.video === 'object' && (review.video.thumbnail || review.video.embedUrl || review.video.youtubeId)) {
            const vId = review.video.youtubeId || '';
            let rawEmbed = review.video.embedUrl || (vId ? `https://www.youtube-nocookie.com/embed/${vId}` : '');
            if (rawEmbed) {
                rawEmbed = rawEmbed.replace('www.youtube.com', 'www.youtube-nocookie.com');
            }
            videoObj = {
                youtubeId: vId,
                embedUrl: rawEmbed,
                thumbnail: review.video.thumbnail || (vId ? `https://img.youtube.com/vi/${vId}/maxresdefault.jpg` : ''),
                title: review.video.title || `Watch ${review.id === 'kinemaster' ? 'KineMaster' : review.title} in Action`,
                description: review.video.description || `Watch the official video tutorial and walkthrough to see ${review.id === 'kinemaster' ? 'KineMaster' : review.title}'s core features, interface, and capabilities in action.`
            };
        }

        if (videoObj && (videoObj.embedUrl || videoObj.thumbnail)) {
            if (videoSection) {
                videoSection.style.display = 'block';
                const headingEl = videoSection.querySelector('h2');
                if (headingEl) {
                    headingEl.textContent = review.id === 'kinemaster' ? 'Watch KineMaster in Action' : `Watch ${review.title} in Action`;
                }

                let introEl = videoSection.querySelector('.video-intro-text');
                if (!introEl && videoContainer) {
                    introEl = document.createElement('p');
                    introEl.className = 'video-intro-text';
                    introEl.style.cssText = 'color: #94a3b8; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1rem;';
                    videoContainer.parentNode.insertBefore(introEl, videoContainer);
                }
                if (introEl) {
                    introEl.textContent = videoObj.description;
                }
            }
            if (videoContainer) {
                const embedUrl = videoObj.embedUrl;
                const thumbUrl = videoObj.thumbnail;
                
                if (embedUrl) {
                    videoContainer.innerHTML = `
                        <div class="video-placeholder card" tabindex="0" role="button" aria-label="Play ${review.title} Video Review">
                            <img src="${thumbUrl}" alt="${videoObj.title || review.title + ' Official Video Tutorial'}" class="video-thumbnail" loading="lazy">
                            <div class="play-overlay-badge">
                                <span class="material-icons-round play-icon">play_circle_filled</span>
                                <span class="video-play-text">${videoObj.title || 'Watch Official Video Tutorial'}</span>
                            </div>
                        </div>`;
                    
                    const placeholder = videoContainer.querySelector('.video-placeholder');
                    if (placeholder) {
                        const loadIframe = () => {
                            videoContainer.innerHTML = `<iframe src="${embedUrl}?autoplay=1" title="${review.title} Video Review" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe>`;
                        };
                        placeholder.addEventListener('click', loadIframe);
                        placeholder.addEventListener('keydown', (e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                loadIframe();
                            }
                        });
                    }
                } else if (thumbUrl) {
                    videoContainer.innerHTML = `
                        <div class="video-placeholder card">
                            <img src="${thumbUrl}" alt="${review.title} Video Preview" class="video-thumbnail" loading="lazy">
                            <span class="material-icons-round play-icon">play_circle_filled</span>
                        </div>`;
                }
            }
        } else if (videoSection) {
            videoSection.style.display = 'none';
        }

        // 9. Rating Breakdown Section
        const breakdownSection = document.getElementById('rating-breakdown-section');
        const breakdownBox = document.querySelector('.rating-breakdown-box');
        let rb = review.ratingBreakdown;
        if (!rb && review.rating) {
            const base = review.rating;
            rb = {
                easeOfUse: Math.min(5, Math.max(3.5, Number((base * 0.95).toFixed(1)))),
                features: Math.min(5, Math.max(3.8, Number((base * 1.02).toFixed(1)))),
                design: Math.min(5, Math.max(3.7, Number((base * 0.98).toFixed(1)))),
                performance: Math.min(5, Math.max(3.9, Number((base * 1.01).toFixed(1)))),
                value: Math.min(5, Math.max(3.5, Number((base * 0.96).toFixed(1))))
            };
        }

        if (breakdownBox && rb) {
            if (breakdownSection) breakdownSection.style.display = 'block';
            breakdownBox.innerHTML = Object.keys(rb).map(key => {
                const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                const score = Number(rb[key]);
                const pct = (score / 5) * 100;
                return `
                <div class="rating-bar-row">
                    <span class="rating-label">${label}</span>
                    <div class="progress-bar"><div class="progress-fill ${score >= 4.5 ? 'bg-success' : ''}" style="width: ${pct}%;"></div></div>
                    <span class="rating-score">${score.toFixed(1)}</span>
                </div>`;
            }).join('');
        } else if (breakdownSection) {
            breakdownSection.style.display = 'none';
        }

        // 10. FAQs Section
        const faqSection = document.getElementById('faq-section');
        const faqContainer = document.getElementById('faq-container');
        if (review.faqs && review.faqs.length > 0) {
            if (faqSection) faqSection.style.display = 'block';
            if (faqContainer) {
                faqContainer.innerHTML = review.faqs.map(faq => `
                    <div class="faq-item card">
                        <h4 class="faq-question">${faq.question}</h4>
                        <div class="faq-answer"><p>${faq.answer}</p></div>
                    </div>
                `).join('');
            }
        } else if (faqSection) {
            faqSection.style.display = 'none';
        }

        // 11. Affiliate & Deal Setup
        await this.setupAffiliateFeatures(review);

        // 12. Render Related Content
        await this.renderRelatedContent(review);

        // 13. Hide Skeleton and Show Article
        const skeleton = document.getElementById('review-loading-skeleton');
        const article = document.getElementById('review-article');
        if (skeleton) skeleton.style.display = 'none';
        if (article) {
            article.style.display = 'block';
            article.classList.add('active');
        }
    }

    static async renderRelatedContent(currentReview) {
        const allReviews = await DataService.getAllReviews();
        let related = allReviews.filter(r => r.id !== currentReview.id && (
            r.categoryId === currentReview.categoryId ||
            (r.tags && currentReview.tags && r.tags.some(t => currentReview.tags.includes(t)))
        ));
        
        if (related.length === 0) {
            related = allReviews.filter(r => r.id !== currentReview.id);
        }

        const relatedGrid = document.getElementById('related-grid');
        if (relatedGrid) {
            this.renderReviews(related.slice(0, 3), relatedGrid);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});



App.initScrollReveal = function() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => el.classList.add('active'));
};

App.initHeaderStoresDropdown = async function() {
    const dropdownMenu = document.getElementById('stores-dropdown-menu');
    if (!dropdownMenu) return;

    try {
        const stores = await DataService.getStores();
        if (stores && stores.length > 0) {
            dropdownMenu.innerHTML = stores.map(store => `
                <a href="store.html?id=${store.id}" class="dropdown-item">
                    <img src="${store.logo}" alt="${store.name} logo" width="22" height="22" loading="lazy" style="object-fit: contain; background: #ffffff; border-radius: 4px; padding: 2px; border: 1px solid var(--border-color, #e2e8f0);">
                    <span>${store.name}</span>
                </a>
            `).join('') + `
                <div class="dropdown-divider"></div>
                <a href="store.html" class="dropdown-item dropdown-view-all">
                    <strong>View All Stores &rarr;</strong>
                </a>
            `;
        }
    } catch (err) {
        console.error('Error fetching stores for header dropdown:', err);
    }
};

App.initDealPage = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id') || 'wps-office-70pro';
    
    const allCoupons = await DataService.getCoupons();
    const deal = allCoupons ? allCoupons.find(c => c.id === id) : null;
    
    if (!deal) {
        const main = document.querySelector('.main-content');
        if (main) main.innerHTML = '<div class="container" style="padding: 4rem 1rem; text-align: center;"><h2>Deal not found</h2><p><a href="coupon.html" class="btn btn-primary" style="margin-top:1rem;">Browse All Deals</a></p></div>';
        return;
    }

    const stores = await DataService.getStores();
    const store = stores ? stores.find(s => s.id === deal.store.id) : null;

    // Document Title & Meta Tags
    document.title = `${deal.title} - ${deal.store.name} | PlayNewApps`;
    
    const canonicalUrl = `https://playnewapps.store/deal.html?id=${deal.id}`;
    const updateMeta = (selector, attr, content) => {
        const el = document.querySelector(selector);
        if (el) el.setAttribute(attr, content);
    };
    updateMeta('meta[name="description"]', 'content', deal.description || '');
    updateMeta('#canonical-url', 'href', canonicalUrl);
    updateMeta('meta[property="og:url"]', 'content', canonicalUrl);
    updateMeta('meta[property="og:title"]', 'content', `${deal.title} | PlayNewApps`);
    updateMeta('meta[property="og:description"]', 'content', deal.description || '');

    // JSON-LD Structured Data
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "DiscountOffer",
        "name": deal.title,
        "description": deal.description,
        "discount": deal.discount,
        "offeredBy": {
            "@type": "Organization",
            "name": deal.store.name,
            "url": store ? store.affiliateLink : deal.affiliateLink
        },
        "url": canonicalUrl
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);

    // Update Breadcrumbs
    const storeBreadcrumb = document.getElementById('breadcrumb-store-link');
    if (storeBreadcrumb && deal.store) {
        storeBreadcrumb.textContent = deal.store.name;
        storeBreadcrumb.href = `store.html?id=${deal.store.id}`;
    }
    const dealTitleBreadcrumb = document.getElementById('breadcrumb-deal-title');
    if (dealTitleBreadcrumb) dealTitleBreadcrumb.textContent = deal.title;

    // Store Logo & Link
    const dealStoreLogo = document.getElementById('deal-store-logo');
    if (dealStoreLogo) {
        dealStoreLogo.src = deal.store.logo;
        dealStoreLogo.alt = `${deal.store.name} Logo`;
    }
    const dealStoreLink = document.getElementById('deal-store-link');
    if (dealStoreLink) dealStoreLink.href = `store.html?id=${deal.store.id}`;
    const dealStoreName = document.getElementById('deal-store-name');
    if (dealStoreName) {
        dealStoreName.textContent = deal.store.name;
        dealStoreName.href = `store.html?id=${deal.store.id}`;
    }

    // Discount & Badges
    const discountPill = document.getElementById('deal-discount-pill');
    if (discountPill) discountPill.textContent = deal.discount || 'Special Offer';

    // Title & Description
    const titleEl = document.getElementById('deal-title');
    if (titleEl) titleEl.textContent = deal.title;
    const descEl = document.getElementById('deal-description');
    if (descEl) descEl.textContent = deal.description;

    // Success rate & Expiry
    const successRateEl = document.getElementById('deal-success-rate');
    if (successRateEl) successRateEl.textContent = `${deal.successPercentage || deal.successRate || '99%'} Success Rate`;
    const expiryEl = document.getElementById('deal-expiry');
    if (expiryEl) expiryEl.textContent = deal.expiry || 'Verified Daily';

    // CTA Setup
    const ctaBox = document.getElementById('deal-cta-box');
    const mainCta = document.getElementById('deal-main-cta');
    const btnText = document.getElementById('deal-btn-text');

    if (mainCta && deal.affiliateLink) {
        mainCta.href = deal.affiliateLink;
    }

    if (deal.code) {
        if (btnText) btnText.textContent = `Get Deal & Copy Code: ${deal.code}`;
        if (ctaBox) {
            const codeNotice = document.createElement('div');
            codeNotice.className = 'card';
            codeNotice.style.cssText = 'padding: 0.75rem 1.25rem; font-family: monospace; font-weight: bold; font-size: 1.1rem; background: var(--primary-light); color: var(--primary-color); border: 1px dashed var(--primary-color); text-align: center; border-radius: 8px; margin-top: 0.75rem;';
            codeNotice.innerHTML = `Promo Code: <strong>${deal.code}</strong> (Copied on click)`;
            ctaBox.after(codeNotice);
        }
    } else {
        if (btnText) btnText.textContent = 'Claim Discount Offer';
    }

    // About Store section
    const aboutTitle = document.getElementById('deal-about-store-title');
    if (aboutTitle) aboutTitle.textContent = `About ${deal.store.name}`;
    const aboutText = document.getElementById('deal-about-store-text');
    if (aboutText) {
        aboutText.textContent = store ? store.about : `${deal.store.name} provides top-tier software and productivity solutions.`;
    }

    // Sidebar Store Info
    const sbLogo = document.getElementById('sidebar-store-logo');
    if (sbLogo) {
        sbLogo.src = deal.store.logo;
        sbLogo.alt = deal.store.name;
    }
    const sbName = document.getElementById('sidebar-store-name');
    if (sbName) sbName.textContent = deal.store.name;
    const sbRating = document.getElementById('sidebar-store-rating');
    if (sbRating && store) {
        sbRating.innerHTML = `${Components.getRatingStars(store.rating || 4.9)} <span>${store.rating || 4.9} (${store.votes || 1000} votes)</span>`;
    }
    const sbLink = document.getElementById('sidebar-view-store-btn');
    if (sbLink) sbLink.href = `store.html?id=${deal.store.id}`;

    // FAQs section
    const faqContainer = document.getElementById('deal-faq-container');
    const faqSection = document.getElementById('deal-faq-section');
    if (store && store.faqs && store.faqs.length > 0) {
        if (faqSection) faqSection.style.display = 'block';
        if (faqContainer) {
            faqContainer.innerHTML = store.faqs.map(faq => `
                <div class="faq-item card" style="padding: 1.25rem; margin-bottom: 0.75rem; background: var(--surface-color); border-radius: var(--radius-md);">
                    <h4 class="faq-question" style="margin-bottom: 0.5rem; font-size: 1.05rem;">${faq.question}</h4>
                    <div class="faq-answer"><p style="color: var(--text-secondary); line-height: 1.6;">${faq.answer}</p></div>
                </div>
            `).join('');
        }
    } else if (faqSection) {
        faqSection.style.display = 'none';
    }

    // Related Deals
    const relatedDeals = allCoupons.filter(c => c.id !== deal.id);
    const relatedGrid = document.getElementById('related-deals-grid');
    if (relatedGrid) {
        relatedGrid.innerHTML = relatedDeals.slice(0, 3).map(c => Components.createCouponCard(c)).join('');
        this.attachCouponListeners(relatedGrid);
    }

    // Popular Sidebar list
    const popularList = document.getElementById('deal-popular-list');
    if (popularList) {
        popularList.innerHTML = relatedDeals.slice(0, 4).map(c => `
            <div class="popular-coupon-item card" style="padding: 0.75rem; display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
                <img src="${c.store.logo}" alt="${c.store.name}" width="36" height="36" style="object-fit: contain; background: #fff; border-radius: 6px; padding: 2px;">
                <div style="flex: 1; min-width: 0;">
                    <a href="deal.html?id=${c.id}" style="font-weight: 600; font-size: 0.85rem; color: var(--text-primary); text-decoration: none; display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${c.title}</a>
                    <span style="font-size: 0.75rem; color: var(--secondary-color); font-weight: bold;">${c.discount || 'Deal'}</span>
                </div>
            </div>
        `).join('');
    }
};

App.initAuthorPage = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id') || 'alex-tech';
    const authors = await DataService.getAuthors();
    const author = authors.find(a => a.id === id);
    
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) heroTitle.textContent = author ? author.name : 'Author Not Found';
    const heroSub = document.querySelector('.hero-subtitle');
    if (heroSub) heroSub.textContent = author ? author.role : '';

    if (author) {
        document.title = `${author.name} - PlayNewApps Author`;
        const canonicalUrl = `https://playnewapps.store/author.html?id=${author.id}`;
        const updateMeta = (selector, attr, content) => {
            const el = document.querySelector(selector);
            if (el) el.setAttribute(attr, content);
        };
        updateMeta('meta[name="description"]', 'content', author.bio || '');
        updateMeta('#canonical-url', 'href', canonicalUrl);
        updateMeta('meta[property="og:url"]', 'content', canonicalUrl);
        updateMeta('meta[property="og:title"]', 'content', `${author.name} - PlayNewApps Author`);
        updateMeta('meta[property="og:description"]', 'content', author.bio || '');
    }
    
    // Clear sliders and deals
    const slider = document.getElementById('featured');
    if(slider) slider.style.display = 'none';
    const deals = document.getElementById('deals');
    if(deals) deals.style.display = 'none';
    const counters = document.querySelector('.counters-section');
    if(counters) counters.style.display = 'none';

    const sectionTitle = document.querySelector('#reviews .section-title');
    if (sectionTitle) sectionTitle.textContent = `Reviews by ${author ? author.name : 'Author'}`;
    const allReviews = await DataService.getAllReviews();
    const authorReviews = allReviews.filter(r => r.authorId === id);
    const reviewsGrid = document.getElementById('reviews-grid');
    if (reviewsGrid) this.renderReviews(authorReviews, reviewsGrid);
};

App.initReviewsPage = async function() {
    await this.renderReviewsDirectoryUI({
        title: 'All App & Software Reviews',
        subtitle: 'Explore comprehensive, independent reviews of top Android apps, iOS tools, PC software, and trending games.',
        activeCategory: 'all',
        isCategoryPage: false
    });
};

App.initCategoryPage = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id') || 'all';
    
    await this.renderReviewsDirectoryUI({
        activeCategory: id,
        isCategoryPage: true
    });
};

App.renderReviewsDirectoryUI = async function(options = {}) {
    const urlParams = new URLSearchParams(window.location.search);
    let catId = options.activeCategory || urlParams.get('id') || urlParams.get('category') || 'all';
    catId = catId.toLowerCase();

    const allReviews = await DataService.getAllReviews();
    const categories = await DataService.getCategories();

    const categoryInfoMap = {
        'all': {
            name: 'All App & Software Reviews',
            desc: 'Explore comprehensive, independent reviews of top Android apps, iOS tools, PC software, and trending games.'
        },
        'android': {
            name: 'Android Apps Reviews',
            desc: 'In-depth reviews, performance benchmarks, and feature breakdowns for top Android applications.'
        },
        'ios': {
            name: 'iOS & iPadOS Apps Reviews',
            desc: 'Expert reviews, buying guides, and software evaluations for iPhone and iPad applications.'
        },
        'pc': {
            name: 'PC & Desktop Software Reviews',
            desc: 'Comprehensive software reviews for Windows, macOS, and Linux desktop applications.'
        },
        'games': {
            name: 'Trending Games Reviews',
            desc: 'In-depth reviews, graphics benchmarks, and ratings for top RPG, action, and mobile/PC games.'
        }
    };

    let catInfo = categoryInfoMap[catId];
    if (!catInfo) {
        const matchedCategory = categories ? categories.find(c => c.id === catId) : null;
        if (matchedCategory) {
            catInfo = {
                name: `${matchedCategory.name} Reviews`,
                desc: `Browse tested software and applications in ${matchedCategory.name}.`
            };
        } else {
            catInfo = {
                name: `${catId.charAt(0).toUpperCase() + catId.slice(1)} Reviews`,
                desc: 'Explore tested and verified app reviews on PlayNewApps.'
            };
        }
    }

    const title = options.title || catInfo.name;
    const subtitle = options.subtitle || catInfo.desc;

    document.title = `${title} | PlayNewApps`;
    const updateMeta = (selector, attr, content) => {
        const el = document.querySelector(selector);
        if (el) el.setAttribute(attr, content);
    };
    const canonicalUrl = `https://playnewapps.store/${options.isCategoryPage ? 'category.html?id=' + catId : 'reviews.html'}`;
    updateMeta('#canonical-url', 'href', canonicalUrl);
    updateMeta('meta[name="description"]', 'content', subtitle);
    updateMeta('meta[property="og:url"]', 'content', canonicalUrl);
    updateMeta('meta[property="og:title"]', 'content', `${title} | PlayNewApps`);
    updateMeta('meta[property="og:description"]', 'content', subtitle);

    const main = document.querySelector('main') || document.querySelector('.main-content');
    if (!main) return;

    const filterOptions = [
        { id: 'all', label: 'All Reviews' },
        { id: 'android', label: 'Android Apps' },
        { id: 'ios', label: 'iOS Apps' },
        { id: 'pc', label: 'PC Software' },
        { id: 'games', label: 'Games' },
        { id: 'video-editors', label: 'Video Editors' },
        { id: 'vpn', label: 'VPN Services' },
        { id: 'productivity', label: 'Productivity' }
    ];

    main.innerHTML = `
        <nav class="container breadcrumbs" aria-label="Breadcrumb">
            <ol>
                <li><a href="index.html">Home</a></li>
                ${options.isCategoryPage ? `<li><a href="reviews.html">Reviews</a></li><li aria-current="page">${catInfo.name.replace(' Reviews', '')}</li>` : `<li aria-current="page">Reviews</li>`}
            </ol>
        </nav>

        <section class="section container reveal active" style="padding-top: 1rem; margin-bottom: 3rem;">
            <div class="card" style="padding: 2rem 1.5rem; margin-bottom: 2rem; background: var(--card-bg, #ffffff); border-radius: 12px; border: 1px solid var(--border-color, #e2e8f0);">
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <div>
                        <h1 class="hero-title" style="margin-bottom: 0.5rem; font-size: 2rem;" id="directory-title">${title}</h1>
                        <p class="hero-subtitle" style="color: var(--text-secondary); margin: 0; font-size: 1rem;" id="directory-desc">${subtitle}</p>
                    </div>

                    <div class="search-box-wrapper" style="margin-top: 0.5rem; width: 100%; max-width: 100%;">
                        <div class="search-box" style="display: flex; align-items: center; gap: 0.5rem; background: var(--bg-primary, #f8fafc); border: 1px solid var(--border-color, #cbd5e1); border-radius: 8px; padding: 0.5rem 1rem;">
                            <span class="material-icons-round search-icon" aria-hidden="true" style="color: var(--text-secondary);">search</span>
                            <input type="search" id="directory-search-input" placeholder="Search reviews by app name, topic, or keyword..." aria-label="Search reviews" autocomplete="off" style="border: none; background: transparent; width: 100%; outline: none; color: inherit; font-size: 0.95rem;">
                            <button id="directory-search-clear" style="display: none; border: none; background: transparent; cursor: pointer; color: var(--text-secondary);" aria-label="Clear search"><span class="material-icons-round">close</span></button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="category-filters" role="tablist" aria-label="Review Categories" style="margin-bottom: 1.5rem; display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; justify-content: space-between;">
                <div class="filter-buttons-wrap" style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    ${filterOptions.map(f => `
                        <button class="filter-btn ${catId === f.id ? 'active' : ''}" data-cat="${f.id}" role="tab" aria-selected="${catId === f.id}">${f.label}</button>
                    `).join('')}
                </div>
                
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <label for="directory-sort-select" style="font-size: 0.875rem; color: var(--text-secondary); font-weight: 500;">Sort:</label>
                    <select id="directory-sort-select" class="sort-select" aria-label="Sort Reviews">
                        <option value="newest">Newest</option>
                        <option value="rating">Top Rated</option>
                        <option value="name">A-Z</option>
                    </select>
                </div>
            </div>

            <div class="grid" id="reviews-grid" aria-live="polite"></div>

            <div id="no-reviews-found" class="card" style="display: none; padding: 3rem 1.5rem; text-align: center; margin-top: 1.5rem;">
                <span class="material-icons-round" style="font-size: 3rem; color: var(--text-secondary); margin-bottom: 0.5rem;" aria-hidden="true">search_off</span>
                <h3 style="margin-bottom: 0.5rem;">No reviews found</h3>
                <p style="color: var(--text-secondary); margin-bottom: 1rem;">No matching reviews found for your current filter or search criteria.</p>
                <button id="directory-reset-btn" class="btn btn-outline">Reset Filters</button>
            </div>

            <div id="reviews-pagination" class="pagination-container" style="margin-top: 2rem; display: flex; justify-content: center; gap: 0.5rem;"></div>
        </section>
    `;

    // State
    let currentCategory = catId;
    let currentSearch = '';
    let currentSort = 'newest';
    let currentPage = 1;
    const itemsPerPage = 9;

    const getFilteredReviews = () => {
        let filtered = [...allReviews];

        // 1. Category Filter
        if (currentCategory !== 'all') {
            const cat = currentCategory.toLowerCase();
            if (cat === 'android') {
                filtered = filtered.filter(r => 
                    (r.platforms && r.platforms.some(p => p.toLowerCase().includes('android'))) ||
                    ['video-editors', 'productivity', 'vpn', 'design'].includes(r.categoryId)
                );
            } else if (cat === 'ios') {
                filtered = filtered.filter(r => 
                    r.platforms && r.platforms.some(p => p.toLowerCase().includes('ios') || p.toLowerCase().includes('ipad'))
                );
            } else if (cat === 'pc') {
                filtered = filtered.filter(r => 
                    (r.platforms && r.platforms.some(p => p.toLowerCase().includes('windows') || p.toLowerCase().includes('mac') || p.toLowerCase().includes('linux') || p.toLowerCase().includes('pc'))) ||
                    r.categoryId === 'vpn'
                );
            } else if (cat === 'games') {
                filtered = filtered.filter(r => 
                    r.categoryId === 'rpg' || r.categoryId === 'action' || 
                    (r.platforms && r.platforms.some(p => p.toLowerCase().includes('playstation') || p.toLowerCase().includes('xbox')))
                );
            } else {
                filtered = filtered.filter(r => 
                    r.categoryId === cat || (r.id && r.id.toLowerCase().includes(cat))
                );
            }
        }

        // 2. Search Query Filter
        if (currentSearch.trim().length > 0) {
            const q = currentSearch.trim().toLowerCase();
            filtered = filtered.filter(r => 
                (r.title && r.title.toLowerCase().includes(q)) ||
                (r.description && r.description.toLowerCase().includes(q)) ||
                (r.developer && r.developer.toLowerCase().includes(q)) ||
                (r.tags && r.tags.some(t => t.toLowerCase().includes(q)))
            );
        }

        // 3. Sort
        if (currentSort === 'rating') {
            filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        } else if (currentSort === 'name') {
            filtered.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
        } else {
            // Newest
            filtered.sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));
        }

        return filtered;
    };

    const renderGrid = () => {
        const grid = document.getElementById('reviews-grid');
        const noFound = document.getElementById('no-reviews-found');
        const pagContainer = document.getElementById('reviews-pagination');

        const filtered = getFilteredReviews();

        if (filtered.length === 0) {
            if (grid) grid.style.display = 'none';
            if (noFound) noFound.style.display = 'block';
            if (pagContainer) pagContainer.innerHTML = '';
            return;
        }

        if (grid) grid.style.display = 'grid';
        if (noFound) noFound.style.display = 'none';

        const totalPages = Math.ceil(filtered.length / itemsPerPage);
        if (currentPage > totalPages) currentPage = 1;

        const start = (currentPage - 1) * itemsPerPage;
        const pageItems = filtered.slice(start, start + itemsPerPage);

        if (grid) {
            grid.innerHTML = pageItems.map(item => Components.createAppCard(item)).join('');
        }

        if (pagContainer) {
            if (totalPages <= 1) {
                pagContainer.innerHTML = '';
            } else {
                let pButtons = '';
                for (let i = 1; i <= totalPages; i++) {
                    pButtons += `
                        <button class="btn ${i === currentPage ? 'btn-primary' : 'btn-outline'} page-btn" data-page="${i}" style="min-width: 40px; padding: 0.4rem 0.8rem;">${i}</button>
                    `;
                }
                pagContainer.innerHTML = pButtons;

                pagContainer.querySelectorAll('.page-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        currentPage = parseInt(e.target.getAttribute('data-page'));
                        renderGrid();
                        const heroSec = document.getElementById('directory-title');
                        if (heroSec) heroSec.scrollIntoView({ behavior: 'smooth' });
                    });
                });
            }
        }
    };

    renderGrid();

    const searchInput = document.getElementById('directory-search-input');
    const searchClear = document.getElementById('directory-search-clear');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value;
            currentPage = 1;
            if (searchClear) searchClear.style.display = currentSearch.length > 0 ? 'block' : 'none';
            renderGrid();
        });
    }

    if (searchClear) {
        searchClear.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            currentSearch = '';
            searchClear.style.display = 'none';
            currentPage = 1;
            renderGrid();
        });
    }

    const filterBtns = main.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            e.target.classList.add('active');
            e.target.setAttribute('aria-selected', 'true');

            currentCategory = e.target.getAttribute('data-cat');
            currentPage = 1;

            const info = categoryInfoMap[currentCategory] || {
                name: `${currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)} Reviews`,
                desc: 'Explore tested and verified app reviews on PlayNewApps.'
            };
            const titleEl = document.getElementById('directory-title');
            const descEl = document.getElementById('directory-desc');
            if (titleEl) titleEl.textContent = info.name;
            if (descEl) descEl.textContent = info.desc;

            renderGrid();
        });
    });

    const sortSelect = document.getElementById('directory-sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            currentPage = 1;
            renderGrid();
        });
    }

    const resetBtn = document.getElementById('directory-reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            currentCategory = 'all';
            currentSearch = '';
            currentSort = 'newest';
            currentPage = 1;
            if (searchInput) searchInput.value = '';
            if (searchClear) searchClear.style.display = 'none';
            if (sortSelect) sortSelect.value = 'newest';

            filterBtns.forEach(b => {
                const isAll = b.getAttribute('data-cat') === 'all';
                b.classList.toggle('active', isAll);
                b.setAttribute('aria-selected', isAll ? 'true' : 'false');
            });

            const info = categoryInfoMap['all'];
            const titleEl = document.getElementById('directory-title');
            const descEl = document.getElementById('directory-desc');
            if (titleEl) titleEl.textContent = info.name;
            if (descEl) descEl.textContent = info.desc;

            renderGrid();
        });
    }

    this.initScrollReveal();
};

App.initStorePage = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id');
    
    if (!id) {
        await this.renderAllStoresPage();
        return;
    }

    const stores = await DataService.getStores();
    const store = stores ? stores.find(s => s.id === id) : null;
    
    if (!store) {
        const main = document.querySelector('main') || document.querySelector('.main-content');
        if (main) main.innerHTML = '<div class="container" style="padding: 4rem 1rem; text-align: center;"><h2>Store Not Found</h2><p style="margin-top:1rem;"><a href="store.html" class="btn btn-primary">Browse All Stores</a></p></div>';
        return;
    }

    document.title = `${store.name} Promo Codes & Deals | PlayNewApps`;
    
    // Update Meta tags
    const canonicalUrl = `https://playnewapps.store/store.html?id=${store.id}`;
    const updateMeta = (selector, attr, content) => {
        const el = document.querySelector(selector);
        if (el) el.setAttribute(attr, content);
    };
    updateMeta('meta[name="description"]', 'content', store.about || '');
    updateMeta('#canonical-url', 'href', canonicalUrl);
    updateMeta('meta[property="og:url"]', 'content', canonicalUrl);
    updateMeta('meta[property="og:title"]', 'content', `${store.name} Promo Codes & Deals`);
    updateMeta('meta[property="og:description"]', 'content', store.about || '');
    
    // Header Info
    document.getElementById('breadcrumb-store').textContent = store.name;
    document.getElementById('store-name').textContent = `${store.name} Coupons & Promo Codes`;
    document.getElementById('store-logo').src = store.logo;
    document.getElementById('store-logo').alt = `${store.name} Logo`;
    document.getElementById('store-about').textContent = store.about || `Discover the latest deals for ${store.name}.`;
    
    const storeCta = document.getElementById('store-cta');
    if (storeCta) {
        storeCta.href = store.affiliateLink || '#';
        storeCta.textContent = `Shop at ${store.name}`;
        storeCta.target = '_blank';
        storeCta.rel = 'noopener sponsored';
    }

    // Rating
    document.getElementById('store-rating-box').innerHTML = `
        <div class="rating" aria-label="Store Rating ${store.rating}">
            ${Components.getRatingStars(store.rating)}
        </div>
        <span class="votes-count">(${store.votes || 0} votes)</span>
    `;

    // Coupons
    const allCoupons = await DataService.getCoupons();
    const storeCoupons = allCoupons.filter(c => c.store.id === id || c.store.name.toLowerCase().includes(id));
    
    const activeCoupons = storeCoupons.filter(c => c.status !== 'expired');
    const expiredCoupons = storeCoupons.filter(c => c.status === 'expired');

    const activeGrid = document.getElementById('active-coupons-grid');
    if (activeGrid) {
        if (activeCoupons.length > 0) {
            activeGrid.innerHTML = activeCoupons.map(c => Components.createCouponCard(c)).join('');
            this.attachCouponListeners(activeGrid);
        } else {
            activeGrid.innerHTML = '<p>No active coupons found at the moment.</p>';
        }
    }

    const expiredGrid = document.getElementById('expired-coupons-grid');
    const expiredSection = document.getElementById('expired-coupons');
    if (expiredGrid && expiredSection) {
        if (expiredCoupons.length > 0) {
            expiredGrid.innerHTML = expiredCoupons.map(c => Components.createCouponCard(c)).join('');
            this.attachCouponListeners(expiredGrid);
        } else {
            expiredSection.style.display = 'none';
        }
    }

    // About Brand Section
    const brandTitle = document.getElementById('store-brand-title');
    const brandText = document.getElementById('store-brand-about-text');
    const brandSection = document.getElementById('store-about-brand-section');
    if (brandTitle && brandText) {
        brandTitle.textContent = `About ${store.name}`;
        brandText.textContent = store.about || `${store.name} is a leading software provider offering productivity tools and digital solutions.`;
    }

    // Why Shop Section
    const whyTitle = document.getElementById('store-why-title');
    const whyList = document.getElementById('store-why-list');
    const whySection = document.getElementById('store-why-shop-section');
    if (whyTitle && whyList) {
        whyTitle.textContent = `Why Shop at ${store.name}`;
        if (store.whyShop && store.whyShop.length > 0) {
            whyList.innerHTML = store.whyShop.map(item => `<li>${item}</li>`).join('');
        } else {
            whyList.innerHTML = `
                <li>Verified official discounts & promo offers</li>
                <li>Instant download & multi-device compatibility</li>
                <li>Premium feature support and regular updates</li>
            `;
        }
    }

    // Shopping & Savings Tips Section
    const tipsTitle = document.getElementById('store-tips-title');
    const tipsList = document.getElementById('store-tips-list');
    const tipsSection = document.getElementById('store-shopping-tips-section');
    if (tipsTitle && tipsList) {
        tipsTitle.textContent = `Shopping & Savings Tips for ${store.name}`;
        if (store.shoppingTips && store.shoppingTips.length > 0) {
            tipsList.innerHTML = store.shoppingTips.map(tip => `<li>${tip}</li>`).join('');
        } else {
            tipsList.innerHTML = `
                <li>Choose annual billing options to maximize overall subscription savings.</li>
                <li>Check PlayNewApps regularly for exclusive promotional code updates.</li>
                <li>Test free plans or trial versions before committing to long-term plans.</li>
            `;
        }
    }

    // FAQs
    const faqContainer = document.getElementById('faq-container');
    const faqSection = document.getElementById('store-faq');
    if (faqContainer && faqSection) {
        if (store.faqs && store.faqs.length > 0) {
            faqContainer.innerHTML = store.faqs.map(faq => `
                <div class="faq-item">
                    <button class="faq-question" aria-expanded="false">
                        ${faq.question}
                        <span class="material-icons-round" aria-hidden="true">expand_more</span>
                    </button>
                    <div class="faq-answer" aria-hidden="true">
                        <p>${faq.answer}</p>
                    </div>
                </div>
            `).join('');
            
            // Re-initialize FAQ toggles
            const faqQuestions = document.querySelectorAll('.faq-question');
            faqQuestions.forEach(btn => {
                btn.addEventListener('click', () => {
                    const expanded = btn.getAttribute('aria-expanded') === 'true' || false;
                    btn.setAttribute('aria-expanded', !expanded);
                    const answer = btn.nextElementSibling;
                    if (!expanded) {
                        answer.setAttribute('aria-hidden', 'false');
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    } else {
                        answer.setAttribute('aria-hidden', 'true');
                        answer.style.maxHeight = null;
                    }
                });
            });
        } else {
            faqSection.style.display = 'none';
        }
    }

    // Popular Coupons (Sidebar)
    const popularList = document.getElementById('popular-coupons-list');
    if (popularList) {
        const popularCoupons = activeCoupons.filter(c => c.isTop).slice(0, 5);
        if (popularCoupons.length > 0) {
            popularList.innerHTML = popularCoupons.map(c => `
                <div class="popular-coupon-item">
                    <div class="popular-coupon-title">${c.title}</div>
                    <div class="popular-coupon-meta">${c.discount} - ${c.successRate} Success</div>
                </div>
            `).join('');
        } else {
            popularList.innerHTML = '<p>No popular coupons available.</p>';
        }
    }

    // Related Stores
    const relatedList = document.getElementById('related-stores-list');
    if (relatedList) {
        if (store.related && store.related.length > 0) {
            const relatedStores = stores.filter(s => store.related.includes(s.id));
            relatedList.innerHTML = relatedStores.map(s => `
                <a href="store.html?id=${s.id}" class="related-store-item">
                    <img src="${s.logo}" alt="${s.name}" class="related-store-icon" width="40" height="40">
                    <span>${s.name}</span>
                </a>
            `).join('');
        } else {
            relatedList.innerHTML = '<p>No related stores.</p>';
        }
    }

    // JSON-LD Schema (Store & FAQ)
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    const schemaData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Store",
                "name": store.name,
                "image": store.logo,
                "description": store.about
            }
        ]
    };
    if (store.faqs && store.faqs.length > 0) {
        schemaData["@graph"].push({
            "@type": "FAQPage",
            "mainEntity": store.faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        });
    }
    script.textContent = JSON.stringify(schemaData);
    document.head.appendChild(script);
    this.initScrollReveal();
};

App.renderAllStoresPage = async function() {
    document.title = "All Stores & Promo Codes | PlayNewApps";
    
    // Update Meta tags
    const canonicalUrl = `https://playnewapps.store/store.html`;
    const updateMeta = (selector, attr, content) => {
        const el = document.querySelector(selector);
        if (el) el.setAttribute(attr, content);
    };
    updateMeta('meta[name="description"]', 'content', 'Browse exclusive coupon codes, verified software discounts, and promotional offers from all stores on PlayNewApps.');
    updateMeta('#canonical-url', 'href', canonicalUrl);
    updateMeta('meta[property="og:url"]', 'content', canonicalUrl);
    updateMeta('meta[property="og:title"]', 'content', 'All Stores & Promo Codes | PlayNewApps');
    updateMeta('meta[property="og:description"]', 'content', 'Browse exclusive coupon codes and verified software discounts from all stores.');

    const stores = await DataService.getStores();
    const coupons = await DataService.getCoupons();

    if (!stores || stores.length === 0) {
        const main = document.querySelector('main') || document.querySelector('.main-content');
        if (main) main.innerHTML = '<div class="container" style="padding: 4rem 1rem; text-align: center;"><h2>No stores available</h2></div>';
        return;
    }

    // Sort stores alphabetically by name
    const sortedStores = [...stores].sort((a, b) => a.name.localeCompare(b.name));

    // Compute active deal counts per store
    const storeDealCounts = {};
    sortedStores.forEach(s => {
        const activeCoupons = coupons ? coupons.filter(c => c && c.store && (c.store.id === s.id || (c.store.name && c.store.name.toLowerCase().includes(s.id))) && c.status !== 'expired') : [];
        const totalStoreCoupons = coupons ? coupons.filter(c => c && c.store && (c.store.id === s.id || (c.store.name && c.store.name.toLowerCase().includes(s.id)))) : [];
        storeDealCounts[s.id] = activeCoupons.length > 0 ? activeCoupons.length : totalStoreCoupons.length;
    });

    const main = document.querySelector('main') || document.querySelector('.main-content');
    if (!main) return;

    main.innerHTML = `
        <nav class="container breadcrumbs" aria-label="Breadcrumb">
            <ol>
                <li><a href="index.html">Home</a></li>
                <li aria-current="page">Stores</li>
            </ol>
        </nav>

        <section class="all-stores-hero container reveal active">
            <div class="all-stores-header-card card">
                <div class="all-stores-header-top">
                    <div>
                        <h1 class="hero-title" style="margin-bottom: 0.25rem;">All Stores</h1>
                        <p class="all-stores-intro">
                            Browse exclusive coupon codes, verified software discounts, and promotional offers from leading tech brands.
                        </p>
                    </div>
                    <div class="all-stores-count-badge">
                        <span class="material-icons-round" aria-hidden="true">storefront</span>
                        <span id="total-stores-count">${sortedStores.length} Available Stores</span>
                    </div>
                </div>
                
                <div class="stores-search-box">
                    <span class="material-icons-round search-icon" aria-hidden="true">search</span>
                    <input type="text" id="stores-search-input" placeholder="Search stores by name (e.g., Adobe, NordVPN, WPS Office)..." aria-label="Search stores">
                    <button id="stores-search-clear" class="search-clear-btn" aria-label="Clear search" style="display: none;">
                        <span class="material-icons-round" aria-hidden="true">close</span>
                    </button>
                </div>

                <nav class="alphabet-nav-wrapper" aria-label="Alphabetical Store Navigation">
                    <div class="alphabet-nav" id="alphabet-nav">
                        <!-- Filled dynamically -->
                    </div>
                </nav>
            </div>
        </section>

        <section class="all-stores-container container reveal active" style="margin-top: 2rem; margin-bottom: 3rem;">
            <div id="all-stores-list" class="all-stores-list">
                <!-- Filled dynamically -->
            </div>
            <div id="no-stores-found" class="card" style="display: none; padding: 3rem 1.5rem; text-align: center;">
                <span class="material-icons-round" style="font-size: 3rem; color: var(--text-secondary); margin-bottom: 0.5rem;" aria-hidden="true">search_off</span>
                <h3 style="margin-bottom: 0.5rem;">No stores found</h3>
                <p style="color: var(--text-secondary); margin-bottom: 1rem;">We couldn't find any store matching your search query.</p>
                <button id="clear-search-btn" class="btn btn-outline">Clear Search</button>
            </div>
        </section>
    `;

    // Function to render Alphabet Nav and Store Groups based on filtered list
    const renderStores = (filteredStores) => {
        const totalCountEl = document.getElementById('total-stores-count');
        if (totalCountEl) {
            totalCountEl.textContent = `${filteredStores.length} ${filteredStores.length === 1 ? 'Available Store' : 'Available Stores'}`;
        }

        const noFoundEl = document.getElementById('no-stores-found');
        const listEl = document.getElementById('all-stores-list');

        if (filteredStores.length === 0) {
            if (listEl) listEl.style.display = 'none';
            if (noFoundEl) noFoundEl.style.display = 'block';
            renderAlphabetNav(new Set());
            return;
        } else {
            if (listEl) listEl.style.display = 'flex';
            if (noFoundEl) noFoundEl.style.display = 'none';
        }

        // Group filtered stores by first letter
        const groups = {};
        const activeLetters = new Set();

        filteredStores.forEach(s => {
            const firstChar = s.name.trim().charAt(0).toUpperCase();
            const letterKey = /[A-Z]/.test(firstChar) ? firstChar : '#';
            activeLetters.add(letterKey);
            if (!groups[letterKey]) groups[letterKey] = [];
            groups[letterKey].push(s);
        });

        // Render Alphabet Nav (only show letters that have stores in current filter)
        renderAlphabetNav(activeLetters);

        // Sort keys (# first if present, then A-Z)
        const sortedKeys = Object.keys(groups).sort((a, b) => {
            if (a === '#') return -1;
            if (b === '#') return 1;
            return a.localeCompare(b);
        });

        if (listEl) {
            listEl.innerHTML = sortedKeys.map(letter => {
                const storeList = groups[letter];
                return `
                    <div class="store-letter-group" id="group-${letter}">
                        <h2 class="letter-heading">${letter}</h2>
                        <div class="store-cards-grid">
                            ${storeList.map(s => {
                                const count = storeDealCounts[s.id] || 0;
                                const dealText = `${count} ${count === 1 ? 'Deal' : 'Deals'}`;
                                const shortDesc = s.about ? (s.about.length > 80 ? s.about.slice(0, 80) + '...' : s.about) : '';
                                return `
                                    <a href="store.html?id=${s.id}" class="store-card-item">
                                        <div class="store-card-logo-wrap">
                                            <img src="${s.logo}" alt="${s.name} logo" width="40" height="40" loading="lazy">
                                        </div>
                                        <div class="store-card-info">
                                            <div class="store-card-name">${s.name}</div>
                                            ${shortDesc ? `<p class="store-card-desc" style="font-size: 0.8rem; color: var(--text-secondary); margin: 0.2rem 0 0.35rem 0; line-height: 1.3;">${shortDesc}</p>` : ''}
                                            <span class="store-card-deals-count">${dealText}</span>
                                        </div>
                                        <span class="material-icons-round store-card-arrow" aria-hidden="true">chevron_right</span>
                                    </a>
                                `;
                            }).join('')}
                        </div>
                    </div>
                `;
            }).join('');
        }
    };

    const renderAlphabetNav = (activeLettersSet) => {
        const navEl = document.getElementById('alphabet-nav');
        if (!navEl) return;

        // Generate full A-Z array (+ '#' if present in activeLettersSet)
        const allLetters = [];
        if (activeLettersSet.has('#')) allLetters.push('#');
        for (let i = 65; i <= 90; i++) {
            allLetters.push(String.fromCharCode(i));
        }

        // Only display letters that have stores (automatically hide letters with 0 stores)
        navEl.innerHTML = allLetters.map(letter => {
            const hasStores = activeLettersSet.has(letter);
            if (!hasStores) return '';
            return `
                <button class="alphabet-pill" data-letter="${letter}" aria-label="Go to section ${letter}">${letter}</button>
            `;
        }).join('');

        // Attach click listener for smooth scrolling
        navEl.querySelectorAll('.alphabet-pill').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const letter = btn.getAttribute('data-letter');
                const groupEl = document.getElementById(`group-${letter}`);
                if (groupEl) {
                    const offset = 100;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = groupEl.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    navEl.querySelectorAll('.alphabet-pill').forEach(p => p.classList.remove('active'));
                    btn.classList.add('active');
                }
            });
        });
    };

    // Initial render of all stores
    renderStores(sortedStores);

    // Setup Search Filter
    const searchInput = document.getElementById('stores-search-input');
    const clearBtn = document.getElementById('stores-search-clear');
    const emptyClearBtn = document.getElementById('clear-search-btn');

    const handleSearch = () => {
        const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
        if (clearBtn) clearBtn.style.display = query ? 'flex' : 'none';

        if (!query) {
            renderStores(sortedStores);
            return;
        }

        const filtered = sortedStores.filter(s => {
            return s.name.toLowerCase().includes(query) || (s.id && s.id.toLowerCase().includes(query));
        });

        renderStores(filtered);
    };

    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            handleSearch();
            if (searchInput) searchInput.focus();
        });
    }

    if (emptyClearBtn) {
        emptyClearBtn.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            handleSearch();
            if (searchInput) searchInput.focus();
        });
    }
};

App.initCouponPage = async function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) heroTitle.textContent = 'All Coupons & Deals';
    const heroSub = document.querySelector('.hero-subtitle');
    if (heroSub) heroSub.textContent = 'Save money on the best software.';
    
    const slider = document.getElementById('featured');
    if(slider) slider.style.display = 'none';
    const counters = document.querySelector('.counters-section');
    if(counters) counters.style.display = 'none';
    const reviews = document.getElementById('reviews');
    if(reviews) reviews.style.display = 'none';

    const allCoupons = await DataService.getCoupons();
    const couponsGrid = document.querySelector('.coupon-grid');
    if (couponsGrid) {
        couponsGrid.innerHTML = allCoupons.map(c => Components.createCouponCard(c)).join('');
        this.attachCouponListeners(couponsGrid);
    }
};
