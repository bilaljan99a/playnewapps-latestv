// Safe binding for Components
const getComponents = () => {
    if (typeof Components !== "undefined") return Components;
    if (typeof window !== "undefined" && window.Components) return window.Components;
    return {
        getRatingStars: (r) => '<span class="material-icons-round active">star</span>'.repeat(Math.round(r || 5)),
        getPlatformIcon: () => "apps",
        createSlideCard: () => "",
        createCouponCard: () => "",
        createStoreCard: () => "",
        createAppCard: () => ""
    };
};

// Safe binding for DataService
const getDataService = () => {
    if (typeof DataService !== 'undefined') return DataService;
    if (typeof window !== 'undefined' && window.DataService) return window.DataService;
    return {
        getAllReviews: async () => [],
        getCoupons: async () => [],
        getStores: async () => [],
        getCategories: async () => [],
        getAuthors: async () => [],
        getApps: async () => [],
        getGames: async () => [],
        getSoftware: async () => [],
        getReviewById: async () => null
    };
};

class App {
    static async init() {
        try {
            const rawPath = window.location.pathname.toLowerCase();
            const path = (rawPath.length > 1 && rawPath.endsWith('/')) ? rawPath.slice(0, -1) : rawPath;

            // Check if this is a legacy Blogger route or old APK path
            const isBloggerDate = /^\/(19|20)\d{2}(\/|$)/.test(rawPath);
            const isBloggerSystem = /^\/(search|feeds|label|b|p|archive)(\/|\?|$)/i.test(rawPath);
            const isOldApk = rawPath.includes('-apk') || rawPath.includes('hotspot-shield') || rawPath.includes('netflix') || rawPath.includes('ludo-star') || rawPath.includes('usa-network') || rawPath.includes('runes-of-magic') || rawPath.includes('bloons') || (rawPath.endsWith('.apk') && !rawPath.startsWith('/assets/'));

            if (isBloggerDate || isBloggerSystem || isOldApk) {
                // Ensure search engines do not index this if served via static SPA fallback
                let metaRobots = document.querySelector('meta[name="robots"]');
                if (!metaRobots) {
                    metaRobots = document.createElement('meta');
                    metaRobots.name = 'robots';
                    document.head.appendChild(metaRobots);
                }
                metaRobots.content = 'noindex, nofollow';

                document.title = '410 Gone - Page Removed | PlayNewApps';
                document.body.innerHTML = `
                    <div style="font-family: system-ui, -apple-system, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #0f172a; color: #f8fafc; text-align: center;">
                        <div style="max-width: 500px; padding: 2.5rem; background: #1e293b; border-radius: 12px; border: 1px solid #334155;">
                            <h1 style="font-size: 3rem; margin: 0 0 0.5rem; color: #ef4444;">410 Gone</h1>
                            <p style="color: #94a3b8; font-size: 1.1rem; line-height: 1.6; margin-bottom: 1.5rem;">This legacy page has been permanently removed and is no longer available on PlayNewApps.</p>
                            <a href="/" style="display: inline-block; padding: 0.75rem 1.5rem; background: #2563eb; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600;">Go to Homepage</a>
                        </div>
                    </div>
                `;
                return;
            }

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
            } else if (path === '/review' || path.endsWith('/review.html') || path.startsWith('/review/') || (path.startsWith('/reviews/') && path !== '/reviews')) {
                await this.initReviewPage();
            } else if (path === '/' || path === '' || path.endsWith('/index.html')) {
                await this.initHomePage();
            } else {
                // Check if this is a known HTML page file (e.g. /contact, /about, /privacy, /wps-office-review.html, etc.)
                const isKnownHtmlPage = document.querySelector('main') !== null && !path.startsWith('/20');
                if (isKnownHtmlPage) {
                    if (document.getElementById('active-coupons-grid') || document.getElementById('store-name')) {
                        await this.initStorePage();
                    }
                } else {
                    // Unknown route served via index.html fallback -> Render 404
                    let metaRobots = document.querySelector('meta[name="robots"]');
                    if (!metaRobots) {
                        metaRobots = document.createElement('meta');
                        metaRobots.name = 'robots';
                        document.head.appendChild(metaRobots);
                    }
                    metaRobots.content = 'noindex, nofollow';

                    document.title = '404 Not Found | PlayNewApps';
                    document.body.innerHTML = `
                        <div style="font-family: system-ui, -apple-system, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #0f172a; color: #f8fafc; text-align: center;">
                            <div style="max-width: 500px; padding: 2.5rem; background: #1e293b; border-radius: 12px; border: 1px solid #334155;">
                                <h1 style="font-size: 3rem; margin: 0 0 0.5rem; color: #f59e0b;">404 Not Found</h1>
                                <p style="color: #94a3b8; font-size: 1.1rem; line-height: 1.6; margin-bottom: 1.5rem;">The page you are looking for does not exist on PlayNewApps.</p>
                                <a href="/" style="display: inline-block; padding: 0.75rem 1.5rem; background: #2563eb; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600;">Go to Homepage</a>
                            </div>
                        </div>
                    `;
                    return;
                }
            }

            // Hide loader immediately once page route content finishes rendering
            const loader = document.getElementById('loader');
            if (loader) {
                loader.style.display = 'none';
            }

            // Secondary non-blocking UI initializations in background
            if (typeof this.initHeaderStoresDropdown === 'function') {
                this.initHeaderStoresDropdown();
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
        const clearBtn = document.getElementById('search-clear-btn');
        const searchResultsSection = document.getElementById('search-results-section');
        const searchResultsGrid = document.getElementById('search-results-grid');
        const searchCountDisplay = document.getElementById('search-count-display');
        const searchQueryDisplay = document.getElementById('search-query-display');
        const searchEmptyState = document.getElementById('search-empty-state');
        const emptyQueryText = document.getElementById('empty-query-text');
        const sectionClearBtn = document.getElementById('clear-search-btn');

        if (!searchInput || !searchForm) return;

        // Lazy-loaded search data
        let allReviews = [];
        let stores = [];
        let coupons = [];
        let searchDataLoaded = false;
        let searchDataPromise = null;

        const ensureSearchData = async () => {
            if (searchDataLoaded) return;
            if (searchDataPromise) return await searchDataPromise;

            searchDataPromise = (async () => {
                try {
                    const [rData, sData, cData] = await Promise.all([
                        getDataService().getAllReviews(),
                        getDataService().getStores(),
                        getDataService().getCoupons()
                    ]);
                    allReviews = rData || [];
                    stores = sData || [];
                    coupons = cData || [];
                    searchDataLoaded = true;
                } catch (err) {
                    console.error('[SEARCH] Failed to load search data:', err);
                } finally {
                    searchDataPromise = null;
                }
            })();

            await searchDataPromise;
        };

        // Prefetch search data during idle time (non-blocking)
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(() => ensureSearchData(), { timeout: 3000 });
        } else {
            setTimeout(ensureSearchData, 1000);
        }

        const escapeHtml = (str) => {
            if (!str) return '';
            return String(str).replace(/[&<>"']/g, m => ({
                '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
            })[m]);
        };

        const highlightMatch = (text, query) => {
            if (!text || !query) return escapeHtml(text || '');
            const str = String(text);
            const cleanQuery = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            if (!cleanQuery) return escapeHtml(str);
            const reg = new RegExp(`(${cleanQuery})`, 'gi');
            return escapeHtml(str).replace(reg, '<mark class="search-hl">$1</mark>');
        };

        const performSearch = (rawQuery) => {
            const query = (rawQuery || '').toLowerCase().trim();
            if (!query) return { stores: [], reviews: [], deals: [], total: 0 };

            const matchedStores = (stores || []).filter(s => {
                const name = (s.name || '').toLowerCase();
                const about = (s.about || '').toLowerCase();
                const cats = (s.categories || []).map(c => c.toLowerCase()).join(' ');
                const seo = ((s.seoTitle || '') + ' ' + (s.seoDescription || '')).toLowerCase();
                const id = (s.id || '').toLowerCase();
                return name.includes(query) || about.includes(query) || cats.includes(query) || seo.includes(query) || id.includes(query);
            });

            const matchedReviews = (allReviews || []).filter(r => {
                const title = (r.title || r.name || '').toLowerCase();
                const desc = (r.description || r.summary || '').toLowerCase();
                const cat = (r.categoryId || '').toLowerCase();
                const tags = (r.tags || []).map(t => t.toLowerCase()).join(' ');
                const platforms = (r.platforms || [r.platform || '']).map(p => p.toLowerCase()).join(' ');
                return title.includes(query) || desc.includes(query) || cat.includes(query) || tags.includes(query) || platforms.includes(query);
            });

            const matchedDeals = (coupons || []).filter(c => {
                const title = (c.title || '').toLowerCase();
                const desc = (c.description || '').toLowerCase();
                const discount = (c.discount || '').toLowerCase();
                const code = (c.code || '').toLowerCase();
                const storeName = (c.store && c.store.name ? c.store.name : (c.storeId || '')).toLowerCase();
                return title.includes(query) || desc.includes(query) || discount.includes(query) || code.includes(query) || storeName.includes(query);
            });

            return {
                stores: matchedStores,
                reviews: matchedReviews,
                deals: matchedDeals,
                total: matchedStores.length + matchedReviews.length + matchedDeals.length
            };
        };

        let activeSuggestionIndex = -1;

        const renderSuggestions = async (query) => {
            if (!suggestionsBox) return;
            activeSuggestionIndex = -1;

            if (!query || query.trim().length === 0) {
                suggestionsBox.innerHTML = '';
                suggestionsBox.classList.remove('active');
                return;
            }

            await ensureSearchData();
            const { stores: matchedStores, reviews: matchedReviews, deals: matchedDeals, total } = performSearch(query);

            if (total === 0) {
                suggestionsBox.innerHTML = `
                    <div style="padding: 1.25rem; text-align: center; color: var(--text-secondary);">
                        <span class="material-icons-round" style="font-size: 1.75rem; vertical-align: middle; margin-bottom: 0.25rem; color: #94a3b8;" aria-hidden="true">search_off</span>
                        <p style="margin: 0.25rem 0 0 0; font-size: 0.95rem; font-weight: 500;">No instant matches for "<strong>${escapeHtml(query)}</strong>"</p>
                        <p style="margin: 0.25rem 0 0 0; font-size: 0.8rem;">Press Enter to search all software, stores, and coupons</p>
                    </div>
                `;
                suggestionsBox.classList.add('active');
                return;
            }

            let html = '';

            // 1. Partner Stores & Brands (up to 3)
            if (matchedStores.length > 0) {
                html += `<div class="suggestion-group-title"><span class="material-icons-round" style="font-size: 1rem;" aria-hidden="true">storefront</span> Partner Stores (${matchedStores.length})</div>`;
                matchedStores.slice(0, 3).forEach(s => {
                    const storeLink = s.storeUrl || `store.html?id=${s.id}`;
                    html += `
                        <a href="${storeLink}" class="suggestion-item">
                            <img src="${s.logo}" alt="${s.name}" class="suggestion-thumb" onerror="this.src='/assets/images/brands/default-store.svg'">
                            <div class="suggestion-info">
                                <div class="suggestion-title">${highlightMatch(s.name, query)}</div>
                                <div class="suggestion-meta">
                                    <span class="suggestion-badge store">Store</span>
                                    <span>${s.rating ? '★ ' + s.rating : 'Verified Store'}</span>
                                    <span>• Deals & Coupons</span>
                                </div>
                            </div>
                            <span class="material-icons-round suggestion-arrow" aria-hidden="true">arrow_forward</span>
                        </a>
                    `;
                });
            }

            // 2. Apps & Software Reviews (up to 4)
            if (matchedReviews.length > 0) {
                html += `<div class="suggestion-group-title"><span class="material-icons-round" style="font-size: 1rem;" aria-hidden="true">apps</span> Apps & Software (${matchedReviews.length})</div>`;
                matchedReviews.slice(0, 4).forEach(r => {
                    const reviewLink = r.reviewUrl || (`review.html?id=${r.id}`);
                    const platform = (r.platforms && r.platforms.length > 0) ? r.platforms[0] : (r.platform || 'Software');
                    html += `
                        <a href="${reviewLink}" class="suggestion-item">
                            <img src="${r.icon || '/assets/images/brands/default-store.svg'}" alt="${r.title}" class="suggestion-thumb" onerror="this.src='/assets/images/brands/default-store.svg'">
                            <div class="suggestion-info">
                                <div class="suggestion-title">${highlightMatch(r.title, query)}</div>
                                <div class="suggestion-meta">
                                    <span class="suggestion-badge">${platform}</span>
                                    <span>★ ${r.rating || 5.0}</span>
                                    <span>• ${r.categoryId ? r.categoryId.toUpperCase() : 'Review'}</span>
                                </div>
                            </div>
                            <span class="material-icons-round suggestion-arrow" aria-hidden="true">arrow_forward</span>
                        </a>
                    `;
                });
            }

            // 3. Coupons & Deals (up to 3)
            if (matchedDeals.length > 0) {
                html += `<div class="suggestion-group-title"><span class="material-icons-round" style="font-size: 1rem;" aria-hidden="true">local_offer</span> Verified Deals & Coupons (${matchedDeals.length})</div>`;
                matchedDeals.slice(0, 3).forEach(c => {
                    const dealLink = c.affiliateLink || c.affiliateUrl || c.url || (c.store && c.store.affiliateLink) || '#';
                    const storeName = (c.store && c.store.name) ? c.store.name : (c.storeId || 'Verified Offer');
                    const storeLogo = (c.store && c.store.logo) ? c.store.logo : '/assets/images/brands/default-store.svg';
                    html += `
                        <a href="${dealLink}" target="_blank" rel="noopener sponsored" class="suggestion-item">
                            <img src="${storeLogo}" alt="${storeName}" class="suggestion-thumb" onerror="this.src='/assets/images/brands/default-store.svg'">
                            <div class="suggestion-info">
                                <div class="suggestion-title">${highlightMatch(c.title, query)}</div>
                                <div class="suggestion-meta">
                                    <span class="suggestion-badge deal">${c.discount || 'DEAL'}</span>
                                    <span>${storeName}</span>
                                </div>
                            </div>
                            <span class="material-icons-round suggestion-arrow" aria-hidden="true">open_in_new</span>
                        </a>
                    `;
                });
            }

            // Bottom View All row
            html += `
                <div class="suggestion-view-all" id="suggestion-view-all-btn" role="button" tabindex="0">
                    <span class="material-icons-round" style="font-size: 1.15rem;" aria-hidden="true">search</span>
                    <span>View all ${total} results for "${escapeHtml(query)}"</span>
                    <span class="material-icons-round" style="font-size: 1rem;" aria-hidden="true">keyboard_return</span>
                </div>
            `;

            suggestionsBox.innerHTML = html;
            suggestionsBox.classList.add('active');

            const viewAllBtn = document.getElementById('suggestion-view-all-btn');
            if (viewAllBtn) {
                viewAllBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    executeSearchResultsView(query);
                });
            }
        };

        const renderSearchResultsView = async (query, filter = 'all') => {
            if (!searchResultsSection || !searchResultsGrid) return;

            await ensureSearchData();
            const { stores: matchedStores, reviews: matchedReviews, deals: matchedDeals, total } = performSearch(query);

            if (searchQueryDisplay) searchQueryDisplay.textContent = `"${query}"`;
            if (searchCountDisplay) searchCountDisplay.textContent = total;

            const countAll = document.getElementById('count-all');
            const countStores = document.getElementById('count-stores');
            const countReviews = document.getElementById('count-reviews');
            const countDeals = document.getElementById('count-deals');

            if (countAll) countAll.textContent = total;
            if (countStores) countStores.textContent = matchedStores.length;
            if (countReviews) countReviews.textContent = matchedReviews.length;
            if (countDeals) countDeals.textContent = matchedDeals.length;

            // Update Tab Active states
            const tabBtns = searchResultsSection.querySelectorAll('.search-tab-btn');
            tabBtns.forEach(btn => {
                const f = btn.getAttribute('data-search-filter');
                if (f === filter) {
                    btn.classList.add('active');
                    btn.setAttribute('aria-selected', 'true');
                } else {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                }
            });

            searchResultsSection.style.display = 'block';

            if (total === 0) {
                searchResultsGrid.innerHTML = '';
                if (searchEmptyState) {
                    searchEmptyState.style.display = 'block';
                    if (emptyQueryText) emptyQueryText.textContent = query;
                }
                return;
            }

            if (searchEmptyState) searchEmptyState.style.display = 'none';

            const storeCards = matchedStores.map(s => getComponents().createStoreCard(s));
            const reviewCards = matchedReviews.map(r => getComponents().createAppCard(r));
            const dealCards = matchedDeals.map(d => getComponents().createCouponCard(d));

            let outputHtml = '';

            if (filter === 'all') {
                let sectionsHtml = '';

                // 1. Partner Stores Section
                if (matchedStores.length > 0) {
                    sectionsHtml += `
                        <div class="search-category-section">
                            <div class="search-category-header">
                                <h3 class="search-category-title">
                                    <span class="material-icons-round" aria-hidden="true">storefront</span>
                                    <span>Partner Stores &amp; Brands</span>
                                    <span class="category-count-badge">${matchedStores.length}</span>
                                </h3>
                                ${matchedStores.length > 3 ? `<button type="button" class="btn-filter-jump" data-target-filter="stores">View all stores &rarr;</button>` : ''}
                            </div>
                            <div class="store-cards-grid">
                                ${storeCards.join('')}
                            </div>
                        </div>
                    `;
                }

                // 2. Apps & Software Reviews Section
                if (matchedReviews.length > 0) {
                    sectionsHtml += `
                        <div class="search-category-section">
                            <div class="search-category-header">
                                <h3 class="search-category-title">
                                    <span class="material-icons-round" aria-hidden="true">apps</span>
                                    <span>Apps &amp; Software Reviews</span>
                                    <span class="category-count-badge">${matchedReviews.length}</span>
                                </h3>
                                ${matchedReviews.length > 6 ? `<button type="button" class="btn-filter-jump" data-target-filter="reviews">View all software &rarr;</button>` : ''}
                            </div>
                            <div class="grid review-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem;">
                                ${reviewCards.join('')}
                            </div>
                        </div>
                    `;
                }

                // 3. Verified Deals & Coupons Section
                if (matchedDeals.length > 0) {
                    sectionsHtml += `
                        <div class="search-category-section">
                            <div class="search-category-header">
                                <h3 class="search-category-title">
                                    <span class="material-icons-round" aria-hidden="true">local_offer</span>
                                    <span>Verified Deals &amp; Promo Codes</span>
                                    <span class="category-count-badge">${matchedDeals.length}</span>
                                </h3>
                                ${matchedDeals.length > 5 ? `<button type="button" class="btn-filter-jump" data-target-filter="deals">View all deals &rarr;</button>` : ''}
                            </div>
                            <div class="store-coupons-grid">
                                ${dealCards.join('')}
                            </div>
                        </div>
                    `;
                }

                outputHtml = sectionsHtml;

            } else if (filter === 'stores') {
                if (matchedStores.length === 0) {
                    outputHtml = `<div class="search-no-filter-match"><p>No partner store matches found for "<strong>${escapeHtml(query)}</strong>".</p></div>`;
                } else {
                    outputHtml = `<div class="store-cards-grid">${storeCards.join('')}</div>`;
                }
            } else if (filter === 'reviews') {
                if (matchedReviews.length === 0) {
                    outputHtml = `<div class="search-no-filter-match"><p>No app or software review matches found for "<strong>${escapeHtml(query)}</strong>".</p></div>`;
                } else {
                    outputHtml = `<div class="grid review-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem;">${reviewCards.join('')}</div>`;
                }
            } else if (filter === 'deals') {
                if (matchedDeals.length === 0) {
                    outputHtml = `<div class="search-no-filter-match"><p>No discount deals or coupons found for "<strong>${escapeHtml(query)}</strong>".</p></div>`;
                } else {
                    outputHtml = `<div class="store-coupons-grid">${dealCards.join('')}</div>`;
                }
            }

            searchResultsGrid.innerHTML = outputHtml;

            // Attach jump filter buttons
            const jumpBtns = searchResultsGrid.querySelectorAll('.btn-filter-jump');
            jumpBtns.forEach(jBtn => {
                jBtn.addEventListener('click', () => {
                    const targetFilter = jBtn.getAttribute('data-target-filter');
                    if (targetFilter) {
                        renderSearchResultsView(query, targetFilter);
                    }
                });
            });
        };

        const executeSearchResultsView = (query) => {
            const trimmed = (query || '').trim();
            if (!trimmed) return;

            if (suggestionsBox) {
                suggestionsBox.classList.remove('active');
            }

            const rawPath = window.location.pathname.toLowerCase();
            const isHomePage = rawPath === '/' || rawPath === '' || rawPath.endsWith('/index.html');

            if (!isHomePage && !searchResultsSection) {
                window.location.href = `/?q=${encodeURIComponent(trimmed)}`;
                return;
            }

            renderSearchResultsView(trimmed, 'all');

            try {
                const url = new URL(window.location);
                url.searchParams.set('q', trimmed);
                window.history.replaceState({}, '', url);
            } catch (err) {}

            if (searchResultsSection) {
                searchResultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };

        const resetSearch = () => {
            searchInput.value = '';
            if (clearBtn) clearBtn.style.display = 'none';
            if (suggestionsBox) {
                suggestionsBox.innerHTML = '';
                suggestionsBox.classList.remove('active');
            }
            if (searchResultsSection) searchResultsSection.style.display = 'none';

            try {
                const url = new URL(window.location);
                url.searchParams.delete('q');
                url.searchParams.delete('search');
                url.searchParams.delete('s');
                window.history.replaceState({}, '', url);
            } catch (err) {}
        };

        // Event: Input with debounce
        let debounceTimer;
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value;
            if (clearBtn) {
                clearBtn.style.display = query.length > 0 ? 'flex' : 'none';
            }

            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                renderSuggestions(query);
            }, 120);
        });

        // Event: Focus shows suggestions if query exists
        searchInput.addEventListener('focus', () => {
            if (searchInput.value.trim().length > 0) {
                renderSuggestions(searchInput.value);
            }
        });

        // Event: Clear Button
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                resetSearch();
                searchInput.focus();
            });
        }

        if (sectionClearBtn) {
            sectionClearBtn.addEventListener('click', () => {
                resetSearch();
            });
        }

        // Event: Form Submit
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            executeSearchResultsView(searchInput.value);
        });

        // Event: Filter Tabs Click
        if (searchResultsSection) {
            const filterTabsContainer = searchResultsSection.querySelector('.search-filter-tabs');
            if (filterTabsContainer) {
                filterTabsContainer.addEventListener('click', (e) => {
                    const btn = e.target.closest('.search-tab-btn');
                    if (!btn) return;
                    const filter = btn.getAttribute('data-search-filter');
                    renderSearchResultsView(searchInput.value || searchQueryDisplay?.textContent?.replace(/"/g, '') || '', filter);
                });
            }
        }

        // Event: Popular Quick Tags Click
        document.addEventListener('click', (e) => {
            const quickTag = e.target.closest('.search-quick-tag');
            if (quickTag) {
                const tagText = quickTag.textContent.trim();
                searchInput.value = tagText;
                if (clearBtn) clearBtn.style.display = 'flex';
                executeSearchResultsView(tagText);
            }
        });

        // Keyboard Navigation for Suggestions
        searchInput.addEventListener('keydown', (e) => {
            if (!suggestionsBox || !suggestionsBox.classList.contains('active')) return;
            const items = suggestionsBox.querySelectorAll('.suggestion-item, .suggestion-view-all');
            if (items.length === 0) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                activeSuggestionIndex = (activeSuggestionIndex + 1) % items.length;
                items.forEach((item, idx) => {
                    if (idx === activeSuggestionIndex) {
                        item.classList.add('selected');
                        item.scrollIntoView({ block: 'nearest' });
                    } else {
                        item.classList.remove('selected');
                    }
                });
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                activeSuggestionIndex = (activeSuggestionIndex - 1 + items.length) % items.length;
                items.forEach((item, idx) => {
                    if (idx === activeSuggestionIndex) {
                        item.classList.add('selected');
                        item.scrollIntoView({ block: 'nearest' });
                    } else {
                        item.classList.remove('selected');
                    }
                });
            } else if (e.key === 'Escape') {
                suggestionsBox.classList.remove('active');
            } else if (e.key === 'Enter') {
                if (activeSuggestionIndex >= 0 && items[activeSuggestionIndex]) {
                    e.preventDefault();
                    items[activeSuggestionIndex].click();
                }
            }
        });

        // Click outside closes suggestions
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
                suggestionsBox.classList.remove('active');
            }
        });

        // Auto-run if URL contains ?q= or ?search= or ?s=
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const queryParam = urlParams.get('q') || urlParams.get('search') || urlParams.get('s');
            if (queryParam && queryParam.trim().length > 0) {
                searchInput.value = queryParam.trim();
                if (clearBtn) clearBtn.style.display = 'flex';
                executeSearchResultsView(queryParam.trim());
            }
        } catch (err) {}
    }

    static async initHomePage() {
        const [allReviews, coupons] = await Promise.all([
            getDataService().getAllReviews(),
            getDataService().getCoupons()
        ]);

        // Populate Trending Slider
        const sliderTrack = document.getElementById('slider-track');
        if (sliderTrack && allReviews && allReviews.length > 0) {
            const trending = allReviews.filter(r => r.isTrending);
            if (trending.length > 0) {
                sliderTrack.innerHTML = trending.map(item => getComponents().createSlideCard(item)).join('');
            } else if (allReviews.length > 0) {
                sliderTrack.innerHTML = allReviews.slice(0, 3).map(item => getComponents().createSlideCard(item)).join('');
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

        // Populate Featured Deals Grid (Limit to curated top stores for clean visual UX & high conversion)
        const couponsGrid = document.querySelector('.coupon-grid');
        if (couponsGrid) {
            const getStoreId = (c) => {
                const s = c.storeId || c.store_id || c.store;
                if (typeof s === 'object' && s !== null) return s.id;
                return s || '';
            };

            const priorityStores = [
                '1password', 'expressvpn', 'protonvpn', 'sitpack', 'tiqets',
                'lenovo', 'asaptickets', 'chicme', 'headway', 'keeper-security',
                'redmagic', 'openhagen', 'aomei', 'gomlab', 'klook', 'walmart',
                'f-secure', 'italiarail', 'purevpn', 'discovercars'
            ];

            const seenStores = new Set();
            const featuredStoreDeals = [];

            // Select best deal per priority store
            for (const pStore of priorityStores) {
                const deal = coupons.find(c => {
                    const sid = String(getStoreId(c)).toLowerCase();
                    return sid === pStore && (c.code || c.isTop);
                }) || coupons.find(c => String(getStoreId(c)).toLowerCase() === pStore);

                if (deal && !seenStores.has(pStore)) {
                    seenStores.add(pStore);
                    featuredStoreDeals.push(deal);
                }
            }

            // Fill up to 15 if any remaining
            if (featuredStoreDeals.length < 15) {
                for (const c of coupons) {
                    const sid = String(getStoreId(c)).toLowerCase();
                    if (sid && !seenStores.has(sid)) {
                        seenStores.add(sid);
                        featuredStoreDeals.push(c);
                        if (featuredStoreDeals.length >= 15) break;
                    }
                }
            }

            const topCoupons = featuredStoreDeals.slice(0, 15);
            couponsGrid.classList.add('home-deals-grid');
            couponsGrid.innerHTML = topCoupons.map(c => getComponents().createHomeDealCard(c)).join('');
            this.attachCouponListeners(couponsGrid);
        }

        // Populate Featured Partner Stores Grid (Limit strictly to Top 20 featured stores)
        const storesGrid = document.getElementById('stores-grid');
        if (storesGrid) {
            const stores = await getDataService().getStores();
            if (stores && stores.length > 0) {
                const featuredStores = stores.slice(0, 20);
                storesGrid.innerHTML = featuredStores.map(s => getComponents().createStoreCard(s)).join('');
            }
        }
    }

    static renderReviews(items, container) {
        if(items.length === 0) {
            container.innerHTML = '<p>No items found.</p>';
            return;
        }
        container.innerHTML = items.map(item => getComponents().createAppCard(item)).join('');
    }

    static attachCouponListeners(container) {
        if (!container) return;
        
        // Code reveal buttons
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
                            ${getComponents().getRatingStars(review.communityRating)}
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
                        ${review.priceComparison.map(p => {
                            const storeName = p.store || p.plan || p.name || 'Official Store';
                            const planPrice = p.price || '';
                            const planUrl = p.url || review.downloadUrl || '#';
                            return `
                            <li class="price-comparison-item ${p.isBest ? 'best-deal-highlight' : ''}">
                                <div class="price-item-header">
                                    <span class="store-name">${storeName}</span>
                                    <div class="price-badges">
                                        ${p.isBest ? `<span class="best-deal-badge">Best Deal</span>` : ''}
                                        ${p.badge ? `<span class="deal-badge">${p.badge}</span>` : ''}
                                    </div>
                                </div>
                                <div class="price-item-body">
                                    <span class="price-amount">${planPrice}</span>
                                    <a href="${planUrl}" target="_blank" rel="noopener sponsored" class="btn btn-sm ${p.isBest ? 'btn-primary' : 'btn-outline'}">View Deal</a>
                                </div>
                            </li>
                        `;
                        }).join('')}
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

        const allReviews = await getDataService().getAllReviews();
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

        if (review.reviewUrl && review.reviewUrl.endsWith('.html') && !review.reviewUrl.includes('review.html')) {
            window.location.href = review.reviewUrl;
            return;
        }

        // 1. Update Title & SEO Metadata
        const baseTitle = (review.title || '').replace(/\s+Review$/i, '');
        const heroTitle = `${baseTitle} Review`;
        const pageTitle = review.metaTitle || `${baseTitle} Review (2026): Is It Worth Buying?`;
        
        document.title = pageTitle.includes('PlayNewApps') ? pageTitle : `${pageTitle} | PlayNewApps`;
        const canonicalUrl = `https://www.playnewapps.store/review?id=${review.id}`;
        
        const updateMeta = (selector, attr, content) => {
            const el = document.querySelector(selector);
            if (el) el.setAttribute(attr, content);
        };

        updateMeta('meta[name="description"]', 'content', review.description || '');
        updateMeta('#canonical-url', 'href', canonicalUrl);
        updateMeta('#og-title', 'content', `${pageTitle} | PlayNewApps`);
        updateMeta('#og-description', 'content', review.description || '');
        updateMeta('#og-url', 'content', canonicalUrl);
        updateMeta('#og-image', 'content', review.icon ? `https://www.playnewapps.store${review.icon}` : '');
        updateMeta('#twitter-title', 'content', pageTitle);
        updateMeta('#twitter-description', 'content', review.description || '');
        updateMeta('#twitter-image', 'content', review.icon ? `https://www.playnewapps.store${review.icon}` : '');
        
        // 2. Schema JSON-LD Injection
        const schemaReview = {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "Review",
                    "@id": `${canonicalUrl}#review`,
                    "itemReviewed": {
                        "@type": "SoftwareApplication",
                        "@id": `${canonicalUrl}#software`,
                        "name": baseTitle,
                        "applicationCategory": "MultimediaApplication",
                        "operatingSystem": (review.platforms || []).join(', ') || "Windows, macOS",
                        "image": review.icon ? `https://www.playnewapps.store${review.icon}` : '',
                        "offers": {
                            "@type": "Offer",
                            "price": "49.99",
                            "priceCurrency": "USD",
                            "availability": "https://schema.org/InStock",
                            "url": review.officialUrl || canonicalUrl
                        }
                    },
                    "reviewRating": {
                        "@type": "Rating",
                        "ratingValue": (review.rating || 4.8).toString(),
                        "bestRating": "5",
                        "worstRating": "1"
                    },
                    "author": {
                        "@type": "Organization",
                        "name": "PlayNewApps",
                        "url": "https://www.playnewapps.store"
                    },
                    "publisher": {
                        "@type": "Organization",
                        "name": "PlayNewApps",
                        "url": "https://www.playnewapps.store"
                    }
                },
                {
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.playnewapps.store/" },
                        { "@type": "ListItem", "position": 2, "name": "Reviews", "item": "https://www.playnewapps.store/category.html?id=all" },
                        { "@type": "ListItem", "position": 3, "name": heroTitle, "item": canonicalUrl }
                    ]
                },
                {
                    "@type": "FAQPage",
                    "mainEntity": [
                        {
                            "@type": "Question",
                            "name": "Is Wondershare Filmora 15 beginner-friendly?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Yes, Filmora is designed with an intuitive magnetic multi-track timeline, visual drag-and-drop effects, and interactive AI Copilot assistance so complete beginners can produce polished 4K videos in minutes."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "Can I export 4K videos without a watermark in Filmora free trial?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "The free trial allows full access to all editing features but adds a watermark during export. Upgrading to an Annual Plan or Perpetual License removes all watermarks and enables 4K/8K export rendering."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "What is the difference between Filmora Annual Plan and Perpetual License?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "The Annual Plan ($49.99/yr) includes continuous major release upgrades (Filmora 15, 16, etc.) and monthly AI cloud credits. The Perpetual License ($79.99 one-time) grants lifetime ownership of Filmora 15."
                            }
                        }
                    ]
                }
            ]
        };
        const scriptSchema = document.createElement('script');
        scriptSchema.type = 'application/ld+json';
        scriptSchema.text = JSON.stringify(schemaReview);
        document.head.appendChild(scriptSchema);
        
        // 3. Update Breadcrumb
        const breadcrumbEl = document.getElementById('breadcrumb-current');
        if (breadcrumbEl) breadcrumbEl.textContent = heroTitle;

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

        setText('.review-title', heroTitle);
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
        const ratingHtml = getComponents().getRatingStars(review.rating || 5) + `<span class="rating-text">${review.rating || 5.0} / 5.0 Overall</span>`;
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

                // Enhance inline FAQ accordions inside dynamicBody for full interactivity & accessibility
                const inlineFaqQuestions = dynamicBody.querySelectorAll('.faq-question');
                inlineFaqQuestions.forEach((qEl, idx) => {
                    if (qEl.tagName === 'SUMMARY') {
                        // Native <details><summary> element - do not mutate DOM
                        return;
                    }
                    let btn = qEl;
                    if (qEl.tagName !== 'BUTTON') {
                        const newBtn = document.createElement('button');
                        newBtn.className = 'faq-question';
                        newBtn.setAttribute('aria-expanded', 'false');
                        newBtn.setAttribute('type', 'button');
                        newBtn.id = `inline-faq-btn-${idx}`;
                        
                        let text = qEl.textContent.trim();
                        newBtn.innerHTML = `<span>${text}</span><span class="material-icons-round" aria-hidden="true">expand_more</span>`;
                        qEl.parentNode.replaceChild(newBtn, qEl);
                        btn = newBtn;
                    } else if (!btn.getAttribute('aria-expanded')) {
                        btn.setAttribute('aria-expanded', 'false');
                    }
                    
                    const answer = btn.nextElementSibling;
                    if (answer && answer.classList.contains('faq-answer')) {
                        answer.setAttribute('id', `inline-faq-ans-${idx}`);
                        btn.setAttribute('aria-controls', `inline-faq-ans-${idx}`);
                        answer.setAttribute('aria-hidden', btn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
                        
                        btn.addEventListener('click', (e) => {
                            e.preventDefault();
                            const expanded = btn.getAttribute('aria-expanded') === 'true';
                            btn.setAttribute('aria-expanded', !expanded);
                            answer.setAttribute('aria-hidden', expanded ? 'true' : 'false');
                            if (!expanded) {
                                answer.style.maxHeight = (answer.scrollHeight + 100) + 'px';
                                answer.style.padding = '0 1.5rem 1.5rem 1.5rem';
                            } else {
                                answer.style.maxHeight = null;
                                answer.style.padding = '0 1.5rem';
                            }
                        });
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
                    const thumbUrl = typeof s === 'string' ? s : (s.thumbnail || s.url);
                    const fullUrl = typeof s === 'string' ? s : (s.url || s.thumbnail);
                    const altText = typeof s === 'string' ? `${review.title || 'App'} Screenshot` : (s.alt || `${review.title || 'App'} Screenshot`);
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
        let vId = '';
        if (typeof review.video === 'string' && review.video.trim()) {
            const raw = review.video.trim();
            const match = raw.match(/(?:v=|\/embed\/|\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
            vId = match ? match[1] : (raw.length === 11 ? raw : '');
        } else if (review.video && typeof review.video === 'object') {
            vId = review.video.youtubeId || '';
            if (!vId && review.video.embedUrl) {
                const match = review.video.embedUrl.match(/(?:v=|\/embed\/|\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
                if (match) vId = match[1];
            }
        }

        if (vId) {
            const embedUrl = `https://www.youtube-nocookie.com/embed/${vId}`;
            const thumbUrl = (typeof review.video === 'object' && review.video.thumbnail) ? review.video.thumbnail : `https://img.youtube.com/vi/${vId}/hqdefault.jpg`;
            videoObj = {
                youtubeId: vId,
                embedUrl: embedUrl,
                thumbnail: thumbUrl,
                title: (typeof review.video === 'object' && review.video.title) || `Watch ${review.id === 'kinemaster' ? 'KineMaster' : review.title} in Action`,
                description: (typeof review.video === 'object' && review.video.description) || `Watch the official video tutorial and walkthrough to see ${review.id === 'kinemaster' ? 'KineMaster' : review.title}'s core features, interface, and capabilities in action.`
            };
        }

        const dynamicHasVideo = dynamicBody && (
            dynamicBody.querySelector('#video-walkthrough') || 
            dynamicBody.querySelector('.video-container') || 
            dynamicBody.querySelector('iframe[src*="youtube"]') ||
            dynamicBody.querySelector('iframe[src*="youtu.be"]')
        );

        if (vId && !dynamicHasVideo) {
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
                const ytWatchUrl = videoObj.youtubeId ? `https://www.youtube.com/watch?v=${videoObj.youtubeId}` : 'https://www.youtube.com/';
                
                videoContainer.innerHTML = `
                    <a href="${ytWatchUrl}" target="_blank" rel="noopener noreferrer" class="video-placeholder card" style="display: block; text-decoration: none;" aria-label="Watch ${review.title} Video Review on YouTube">
                        <img src="${thumbUrl}" alt="${videoObj.title || review.title + ' Official Video Tutorial'}" class="video-thumbnail" loading="lazy">
                        <div class="play-overlay-badge">
                            <span class="material-icons-round play-icon">play_circle_filled</span>
                            <span class="video-play-text">${videoObj.title || 'Watch Official Video Tutorial'} (Opens in New Tab)</span>
                        </div>
                    </a>`;
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
        
        let faqsToRender = review.faqs;
        if ((!faqsToRender || faqsToRender.length === 0) && review.id) {
            const stores = await getDataService().getStores();
            const matchingStore = stores.find(s => s.id === review.id);
            if (matchingStore && matchingStore.faqs) {
                faqsToRender = matchingStore.faqs;
            }
        }

        const dynamicHasFaq = dynamicBody && (
            dynamicBody.querySelector('#faqs') || 
            dynamicBody.querySelector('.faq-container') || 
            dynamicBody.querySelector('.faq-accordion') || 
            dynamicBody.querySelector('.faq-item')
        );
        if (faqsToRender && faqsToRender.length > 0 && !dynamicHasFaq) {
            if (faqSection) faqSection.style.display = 'block';
            if (faqContainer) {
                faqContainer.innerHTML = faqsToRender.map((faq, index) => `
                    <div class="faq-item card">
                        <button class="faq-question" aria-expanded="false" id="faq-btn-${index}" aria-controls="faq-ans-${index}">
                            ${faq.question}
                            <span class="material-icons-round" aria-hidden="true">expand_more</span>
                        </button>
                        <div class="faq-answer" id="faq-ans-${index}" aria-hidden="true">
                            <p>${faq.answer}</p>
                        </div>
                    </div>
                `).join('');

                const faqQuestions = faqContainer.querySelectorAll('.faq-question');
                faqQuestions.forEach(btn => {
                    btn.addEventListener('click', () => {
                        const expanded = btn.getAttribute('aria-expanded') === 'true';
                        btn.setAttribute('aria-expanded', !expanded);
                        const answer = btn.nextElementSibling;
                        if (answer) {
                            if (!expanded) {
                                answer.setAttribute('aria-hidden', 'false');
                                answer.style.maxHeight = answer.scrollHeight + 'px';
                            } else {
                                answer.setAttribute('aria-hidden', 'true');
                                answer.style.maxHeight = null;
                            }
                        }
                    });
                });
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
        const allReviews = await getDataService().getAllReviews();
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
        const stores = await getDataService().getStores();
        if (stores && stores.length > 0) {
            const POPULAR_KEYS = [
                'walmart',
                'alibaba',
                'aliexpress',
                'amazon',
                'fiverr',
                'wondershare',
                'adobe',
                'canva',
                'grammarly',
                'hostinger',
                'nordvpn'
            ];

            const popularStores = [];
            POPULAR_KEYS.forEach(key => {
                const matched = stores.find(s => 
                    s.id === key || 
                    s.name.toLowerCase() === key.toLowerCase() || 
                    s.id.includes(key)
                );
                if (matched && !popularStores.some(ps => ps.id === matched.id)) {
                    popularStores.push(matched);
                }
            });

            let html = `
                <div class="dropdown-section-header">
                    <span class="star-icon">⭐</span> Popular Stores
                </div>
            `;

            if (popularStores.length > 0) {
                html += popularStores.map(store => `
                    <a href="store.html?id=${store.id}" class="dropdown-item">
                        <img src="${store.logo}" alt="${store.name} logo" width="22" height="22" loading="lazy" style="object-fit: contain; background: #ffffff; border-radius: 4px; padding: 2px; border: 1px solid var(--border-color, #e2e8f0);">
                        <span>${store.name}</span>
                    </a>
                `).join('');
            }

            html += `
                <div class="dropdown-divider"></div>
                <a href="stores.html" class="dropdown-item dropdown-view-all">
                    <span>View All Stores</span>
                    <span class="view-all-arrow">&rarr;</span>
                </a>
            `;

            dropdownMenu.innerHTML = html;
        }
    } catch (err) {
        console.error('Error fetching stores for header dropdown:', err);
    }
};

App.initDealPage = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id') || 'wps-office-70pro';
    
    const [allCoupons, stores] = await Promise.all([
        getDataService().getCoupons(),
        getDataService().getStores()
    ]);
    const deal = allCoupons ? allCoupons.find(c => c.id === id) : null;
    
    if (!deal) {
        const main = document.querySelector('.main-content');
        if (main) main.innerHTML = '<div class="container" style="padding: 4rem 1rem; text-align: center;"><h2>Deal not found</h2><p><a href="coupon.html" class="btn btn-primary" style="margin-top:1rem;">Browse All Deals</a></p></div>';
        return;
    }

    const store = stores ? stores.find(s => s.id === deal.store.id) : null;

    // Document Title & Meta Tags
    document.title = `${deal.title} - ${deal.store.name} | PlayNewApps`;
    
    const canonicalUrl = `https://www.playnewapps.store/deal?id=${deal.id}`;
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
        if (btnText) btnText.textContent = 'Claim Deal & Reveal Code';
        if (mainCta) {
            mainCta.addEventListener('click', () => {
                if (typeof window.showCouponModal === 'function') {
                    window.showCouponModal(deal.code, deal.affiliateLink);
                }
            });
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
        sbRating.innerHTML = `${getComponents().getRatingStars(store.rating || 4.9)} <span>${store.rating || 4.9} (${store.votes || 1000} votes)</span>`;
    }
    const sbLink = document.getElementById('sidebar-view-store-btn');
    if (sbLink) sbLink.href = `store.html?id=${deal.store.id}`;

    // FAQs section
    const faqContainer = document.getElementById('deal-faq-container');
    const faqSection = document.getElementById('deal-faq-section');
    if (store && store.faqs && store.faqs.length > 0) {
        if (faqSection) faqSection.style.display = 'block';
        if (faqContainer) {
            faqContainer.innerHTML = store.faqs.map((faq, index) => `
                <div class="faq-item card" style="margin-bottom: 0.75rem;">
                    <button class="faq-question" aria-expanded="false" id="deal-faq-btn-${index}" aria-controls="deal-faq-ans-${index}">
                        ${faq.question}
                        <span class="material-icons-round" aria-hidden="true">expand_more</span>
                    </button>
                    <div class="faq-answer" id="deal-faq-ans-${index}" aria-hidden="true">
                        <p style="color: var(--text-secondary); line-height: 1.6;">${faq.answer}</p>
                    </div>
                </div>
            `).join('');

            const faqQuestions = faqContainer.querySelectorAll('.faq-question');
            faqQuestions.forEach(btn => {
                btn.addEventListener('click', () => {
                    const expanded = btn.getAttribute('aria-expanded') === 'true';
                    btn.setAttribute('aria-expanded', !expanded);
                    const answer = btn.nextElementSibling;
                    if (answer) {
                        if (!expanded) {
                            answer.setAttribute('aria-hidden', 'false');
                            answer.style.maxHeight = answer.scrollHeight + 'px';
                        } else {
                            answer.setAttribute('aria-hidden', 'true');
                            answer.style.maxHeight = null;
                        }
                    }
                });
            });
        }
    } else if (faqSection) {
        faqSection.style.display = 'none';
    }

    // Related Deals
    const relatedDeals = allCoupons.filter(c => c.id !== deal.id);
    const relatedGrid = document.getElementById('related-deals-grid');
    if (relatedGrid) {
        relatedGrid.innerHTML = relatedDeals.slice(0, 3).map(c => getComponents().createCouponCard(c)).join('');
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
    const authors = await getDataService().getAuthors();
    const author = authors.find(a => a.id === id);
    
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) heroTitle.textContent = author ? author.name : 'Author Not Found';
    const heroSub = document.querySelector('.hero-subtitle');
    if (heroSub) heroSub.textContent = author ? author.role : '';

    if (author) {
        document.title = `${author.name} - PlayNewApps Author`;
        const canonicalUrl = `https://www.playnewapps.store/author?id=${author.id}`;
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
    const allReviews = await getDataService().getAllReviews();
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

    const [allReviews, categories] = await Promise.all([
        getDataService().getAllReviews(),
        getDataService().getCategories()
    ]);

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
        'software': {
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
    const canonicalUrl = `https://www.playnewapps.store/${options.isCategoryPage ? 'category?id=' + catId : 'reviews'}`;
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

    const storeCategoryMap = {
        'gaming': 'Gaming',
        'games': 'Gaming',
        'rpg': 'Gaming',
        'action': 'Gaming',
        'android': 'Apps',
        'ios': 'Apps',
        'pc': 'Software',
        'software': 'Software',
        'productivity': 'Productivity',
        'vpn': 'Security & VPN',
        'video-editors': 'Digital Services',
        'design': 'Digital Services'
    };
    const relatedStoreCategory = storeCategoryMap[catId.toLowerCase()] || (catId !== 'all' ? catId : null);

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

            ${relatedStoreCategory ? `
            <div class="category-crosslink-banner">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <span class="material-icons-round" style="color: var(--primary-color); font-size: 1.75rem;" aria-hidden="true">local_offer</span>
                    <div>
                        <div style="font-weight: 700; color: var(--text-primary); font-size: 0.95rem;">Looking for verified discount coupons &amp; promo codes?</div>
                        <div style="color: var(--text-secondary); font-size: 0.85rem;">Browse verified partner store deals and coupon codes in ${relatedStoreCategory}.</div>
                    </div>
                </div>
                <a href="stores.html?category=${encodeURIComponent(relatedStoreCategory)}" class="btn btn-sm btn-primary" style="white-space: nowrap; display: inline-flex; align-items: center; gap: 0.35rem;">
                    <span>View ${relatedStoreCategory} Stores</span>
                    <span class="material-icons-round" style="font-size: 1rem;">arrow_forward</span>
                </a>
            </div>
            ` : ''}

            <div class="category-filters" aria-label="Review Categories" style="margin-bottom: 1.5rem; display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; justify-content: space-between;">
                <div class="filter-buttons-wrap" role="tablist" aria-label="Filter Reviews By Category" style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
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
    const itemsPerPage = 12;

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
            } else if (cat === 'pc' || cat === 'software') {
                filtered = filtered.filter(r => 
                    (r.platforms && r.platforms.some(p => p.toLowerCase().includes('windows') || p.toLowerCase().includes('mac') || p.toLowerCase().includes('linux') || p.toLowerCase().includes('pc'))) ||
                    ['vpn', 'productivity', 'video-editors', 'design'].includes(r.categoryId)
                );
            } else if (cat === 'games') {
                filtered = filtered.filter(r => 
                    r.categoryId === 'games' || r.categoryId === 'rpg' || r.categoryId === 'action' || 
                    (r.platforms && r.platforms.some(p => p.toLowerCase().includes('playstation') || p.toLowerCase().includes('ps5') || p.toLowerCase().includes('xbox') || p.toLowerCase().includes('vr') || p.toLowerCase().includes('quest') || p.toLowerCase().includes('handheld') || p.toLowerCase().includes('steamos') || p.toLowerCase().includes('console')))
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
            grid.innerHTML = pageItems.map(item => getComponents().createAppCard(item)).join('');
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
        const rawFilename = window.location.pathname.split('/').pop().replace(/\.html$/i, '').toLowerCase();
        if (rawFilename && rawFilename !== 'store' && rawFilename !== 'stores') {
            id = rawFilename;
        }
    }

    if (!id) {
        await this.renderAllStoresPage();
        return;
    }

    // Render skeleton loading placeholders immediately before fetching store data
    const breadcrumbEl = document.getElementById('breadcrumb-store');
    if (breadcrumbEl) breadcrumbEl.textContent = 'Loading...';

    const nameEl = document.getElementById('store-name');
    if (nameEl) nameEl.textContent = 'Loading Store...';

    const logoEl = document.getElementById('store-logo');
    if (logoEl) {
        logoEl.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 150 150'%3E%3Crect width='150' height='150' fill='%23f1f5f9' rx='12'/%3E%3C/svg%3E";
        logoEl.alt = "Loading...";
    }

    const ratingBoxEl = document.getElementById('store-rating-box');
    if (ratingBoxEl) {
        ratingBoxEl.innerHTML = `
            <div class="rating" aria-label="Loading Rating">
                <span class="material-icons-round star" style="color:var(--border-color);">star</span>
                <span class="material-icons-round star" style="color:var(--border-color);">star</span>
                <span class="material-icons-round star" style="color:var(--border-color);">star</span>
                <span class="material-icons-round star" style="color:var(--border-color);">star</span>
                <span class="material-icons-round star" style="color:var(--border-color);">star</span>
            </div>
            <span class="votes-count"></span>
        `;
    }

    const activeGridInit = document.getElementById('active-coupons-grid');
    if (activeGridInit) {
        activeGridInit.innerHTML = `
            <article class="card coupon-card affiliate-card skeleton-card-placeholder" style="min-height: 240px; pointer-events: none;">
                <div class="coupon-header">
                    <div class="coupon-top-bar">
                        <div class="skeleton-text short" style="height: 1.2rem; margin: 0;"></div>
                        <div class="skeleton-text short" style="height: 1.2rem; width: 60px; margin: 0;"></div>
                    </div>
                    <div class="store-info">
                        <div class="skeleton-text" style="width: 48px; height: 48px; border-radius: 50%; margin: 0;"></div>
                        <div class="skeleton-text medium" style="height: 1.2rem; margin: 0;"></div>
                    </div>
                </div>
                <div class="coupon-content">
                    <div class="skeleton-text" style="height: 1.4rem; width: 80%;"></div>
                    <div class="skeleton-text" style="height: 1rem; width: 100%;"></div>
                    <div class="skeleton-text medium" style="height: 1rem;"></div>
                    <div class="skeleton-text" style="height: 44px; width: 100%; border-radius: 6px; margin-top: 1rem;"></div>
                </div>
            </article>
        `.repeat(3);
    }

    const popularListInit = document.getElementById('popular-coupons-list');
    if (popularListInit) {
        popularListInit.innerHTML = '<p style="color: var(--text-secondary);">Loading...</p>';
    }

    const relatedListInit = document.getElementById('related-stores-list');
    if (relatedListInit) {
        relatedListInit.innerHTML = '<p style="color: var(--text-secondary);">Loading...</p>';
    }

    const aboutElInit = document.getElementById('store-about');
    if (aboutElInit) aboutElInit.textContent = 'Loading store details...';

    const brandTextElInit = document.getElementById('store-brand-about-text');
    if (brandTextElInit) brandTextElInit.textContent = 'Loading brand information...';

    const [stores, allCoupons] = await Promise.all([
        getDataService().getStores(),
        getDataService().getCoupons()
    ]);
    const store = stores ? stores.find(s => s.id === id || s.id === id.replace(/-coupons$/, '').replace(/-review$/, '')) : null;
    
    if (!store) {
        const main = document.querySelector('main') || document.querySelector('.main-content');
        if (main) main.innerHTML = '<div class="container" style="padding: 4rem 1rem; text-align: center;"><h2>Store Not Found</h2><p style="margin-top:1rem;"><a href="store.html" class="btn btn-primary">Browse All Stores</a></p></div>';
        return;
    }

    if (store.storeUrl) {
        const targetUrl = store.storeUrl.startsWith('/') ? store.storeUrl : '/' + store.storeUrl;
        const currentPath = window.location.pathname;
        if (!currentPath.endsWith(targetUrl) && !currentPath.endsWith(targetUrl.replace(/^\//, ''))) {
            window.location.replace(targetUrl);
            return;
        }
    }

    if (store.seoTitle) {
        document.title = store.seoTitle;
    } else {
        document.title = `${store.name} Promo Codes & Deals (2026)`;
    }
    
    // Update Meta tags
    const canonicalUrl = `https://www.playnewapps.store/store?id=${store.id}`;
    const updateMeta = (selector, attr, content) => {
        const el = document.querySelector(selector);
        if (el) el.setAttribute(attr, content);
    };
    const storeDesc = store.seoDescription || store.about || '';
    updateMeta('meta[name="description"]', 'content', storeDesc);
    updateMeta('#canonical-url', 'href', canonicalUrl);
    updateMeta('meta[property="og:url"]', 'content', canonicalUrl);
    updateMeta('meta[property="og:title"]', 'content', store.seoTitle || `${store.name} Promo Codes & Deals`);
    updateMeta('meta[property="og:description"]', 'content', storeDesc);
    
    // Header Info
    const breadcrumbElTarget = document.getElementById('breadcrumb-store');
    if (breadcrumbElTarget) breadcrumbElTarget.textContent = store.name;

    const storeNameEl = document.getElementById('store-name');
    if (storeNameEl) storeNameEl.textContent = `${store.name} Coupons & Promo Codes`;

    const storeLogoEl = document.getElementById('store-logo');
    if (storeLogoEl) {
        storeLogoEl.src = store.logo;
        storeLogoEl.alt = `${store.name} Logo`;
    }

    const storeAboutEl = document.getElementById('store-about');
    if (storeAboutEl) storeAboutEl.textContent = store.about || `Discover the latest deals for ${store.name}.`;
    
    const storeCta = document.getElementById('store-cta');
    if (storeCta) {
        storeCta.href = store.affiliateLink || '#';
        storeCta.textContent = `Shop at ${store.name}`;
        storeCta.target = '_blank';
        storeCta.rel = 'noopener sponsored';
    }

    // Rating
    const storeRatingBox = document.getElementById('store-rating-box');
    if (storeRatingBox) {
        storeRatingBox.innerHTML = `
            <div class="rating" aria-label="Store Rating ${store.rating}">
                ${getComponents().getRatingStars(store.rating)}
            </div>
            <span class="votes-count">(${store.votes || 0} votes)</span>
        `;
    }

    // Category Badges
    const catBadgesEl = document.getElementById('store-category-badges');
    if (catBadgesEl && store.categories && store.categories.length > 0) {
        catBadgesEl.innerHTML = store.categories.map(cat => `
            <a href="stores.html?category=${encodeURIComponent(cat)}" class="store-category-chip" aria-label="Browse ${cat} Stores">
                <span class="material-icons-round" style="font-size: 0.95rem;">label</span>
                <span>${cat}</span>
            </a>
        `).join('');
    }

    // Filter coupons for this store
    const storeCoupons = (allCoupons || []).filter(c => {
        if (!c) return false;
        const sId = (c.storeId || (typeof c.store === 'object' && c.store ? c.store.id : c.store) || '').toLowerCase();
        const sName = (typeof c.store === 'object' && c.store ? c.store.name : (c.store || '')).toLowerCase();
        const targetId = (id || '').toLowerCase();
        return sId === targetId || (sName && sName.includes(targetId)) || targetId.includes(sId);
    });
    
    const activeCoupons = storeCoupons.filter(c => c.status !== 'expired');
    const expiredCoupons = storeCoupons.filter(c => c.status === 'expired');

    const activeGrid = document.getElementById('active-coupons-grid');
    if (activeGrid) {
        if (activeCoupons.length > 0) {
            activeGrid.innerHTML = activeCoupons.map(c => getComponents().createCouponCard(c)).join('');
            this.attachCouponListeners(activeGrid);
        } else {
            activeGrid.innerHTML = '<p>No active coupons found at the moment.</p>';
        }
    }

    const expiredGrid = document.getElementById('expired-coupons-grid');
    const expiredSection = document.getElementById('expired-coupons');
    if (expiredGrid && expiredSection) {
        if (expiredCoupons.length > 0) {
            expiredGrid.innerHTML = expiredCoupons.map(c => getComponents().createCouponCard(c)).join('');
            this.attachCouponListeners(expiredGrid);
            expiredSection.style.display = 'block';
        } else {
            expiredSection.style.display = 'none';
        }
    }

    // Promotional Banners Rendering
    const bannerSec1 = document.getElementById('store-banner-section-1');
    const bannerSec2 = document.getElementById('store-banner-section-2');

    if (store.banners && store.banners.length > 0) {
        if (store.banners[0] && bannerSec1) {
            const b1 = store.banners[0];
            bannerSec1.style.display = 'block';
            bannerSec1.innerHTML = `
                <div class="card" style="padding: 1.25rem; border-radius: 12px; overflow: hidden; background: var(--card-bg); border: 1px solid var(--border-color); box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
                    <a href="${b1.link}" target="_blank" rel="noopener sponsored" style="display: block; text-decoration: none; border-radius: 10px; overflow: hidden; transition: transform 0.2s ease;">
                        <img src="${b1.image}" alt="${b1.title}" style="width: 100%; height: auto; display: block; border-radius: 10px; border: 1px solid var(--border-color);" loading="lazy">
                    </a>
                    <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; margin-top: 1rem; padding: 0.25rem 0.25rem 0;">
                        <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--text-color); font-weight: 700; font-size: 0.925rem;">
                            <span class="material-icons-round" style="color: #FF6A00;">campaign</span>
                            <span>${b1.title}</span>
                        </div>
                        <a href="${b1.link}" target="_blank" rel="noopener sponsored" class="btn btn-sm" style="background: #FF6A00; color: #fff; font-weight: 800; padding: 0.45rem 1.25rem; border-radius: 6px; text-decoration: none; display: inline-flex; align-items: center; gap: 0.35rem;">
                            ${b1.buttonText || 'Claim Offer'} <span class="material-icons-round" style="font-size: 0.9rem;">arrow_forward</span>
                        </a>
                    </div>
                </div>
            `;
        }
        if (store.banners.length > 1 && bannerSec2) {
            bannerSec2.style.display = 'block';
            bannerSec2.innerHTML = store.banners.slice(1).map(b => `
                <div class="card" style="padding: 1.25rem; border-radius: 12px; overflow: hidden; background: var(--card-bg); border: 1px solid var(--border-color); box-shadow: 0 4px 20px rgba(0,0,0,0.03); margin-bottom: 1.25rem;">
                    <a href="${b.link}" target="_blank" rel="noopener sponsored" style="display: block; text-decoration: none; border-radius: 10px; overflow: hidden; transition: transform 0.2s ease;">
                        <img src="${b.image}" alt="${b.title}" style="width: 100%; height: auto; display: block; border-radius: 10px; border: 1px solid var(--border-color);" loading="lazy">
                    </a>
                    <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; margin-top: 1rem; padding: 0.25rem 0.25rem 0;">
                        <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--text-color); font-weight: 700; font-size: 0.925rem;">
                            <span class="material-icons-round" style="color: #2563EB;">stars</span>
                            <span>${b.title}</span>
                        </div>
                        <a href="${b.link}" target="_blank" rel="noopener sponsored" class="btn btn-sm" style="background: #2563EB; color: #fff; font-weight: 800; padding: 0.45rem 1.25rem; border-radius: 6px; text-decoration: none; display: inline-flex; align-items: center; gap: 0.35rem;">
                            ${b.buttonText || 'Shop Collection'} <span class="material-icons-round" style="font-size: 0.9rem;">shopping_bag</span>
                        </a>
                    </div>
                </div>
            `).join('');
        }
    }

    // Video Demonstration Section Rendering
    const videoSec = document.getElementById('store-video-section');
    if (store.video && videoSec) {
        const v = store.video;
        videoSec.style.display = 'block';
        videoSec.innerHTML = `
            <div class="card" style="padding: 1.5rem; border-radius: 12px; background: var(--card-bg); border: 1px solid var(--border-color); box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                    <span class="material-icons-round" style="color: #FF0000; font-size: 1.75rem;">play_circle_filled</span>
                    <h2 style="font-size: 1.25rem; font-weight: 800; margin: 0; color: var(--text-color);">${v.title || 'Official Product Demonstration Video'}</h2>
                </div>
                <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1.25rem; line-height: 1.5;">${v.description || ''}</p>
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 10px; border: 1px solid var(--border-color); background: #000;">
                    <iframe src="${v.embedUrl}?rel=0" title="${v.title || 'Video Player'}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
                </div>
            </div>
        `;
    }

    // About Brand Section
    const brandTitle = document.getElementById('store-brand-title');
    const brandText = document.getElementById('store-brand-about-text');
    const brandSection = document.getElementById('store-about-brand-section');
    if (brandTitle && brandText) {
        brandTitle.textContent = `About ${store.name}`;
        let brandHtml = '';

        if (store.detailedOverview) {
            brandHtml += `<p style="margin-bottom: 0.75rem; color: var(--text-color); line-height: 1.6;">${store.detailedOverview}</p>`;
        }
        if (store.brandHistory) {
            brandHtml += `<div style="margin-top: 1rem; padding-top: 0.85rem; border-top: 1px dashed var(--border-color);"><strong style="color: var(--text-primary); display: block; margin-bottom: 0.25rem;">Brand History & Overview</strong><p style="margin: 0; color: var(--text-secondary); line-height: 1.5;">${store.brandHistory}</p></div>`;
        }
        if (store.whoIsItFor) {
            brandHtml += `<div style="margin-top: 1rem; padding-top: 0.85rem; border-top: 1px dashed var(--border-color);"><strong style="color: var(--text-primary); display: block; margin-bottom: 0.25rem;">Who Should Use It</strong><p style="margin: 0; color: var(--text-secondary); line-height: 1.5;">${store.whoIsItFor}</p></div>`;
        }
        if (store.keyFeatures) {
            brandHtml += `<div style="margin-top: 1rem; padding-top: 0.85rem; border-top: 1px dashed var(--border-color);"><strong style="color: var(--text-primary); display: block; margin-bottom: 0.25rem;">Key Features & Core Benefits</strong><p style="margin: 0; color: var(--text-secondary); line-height: 1.5;">${store.keyFeatures}</p></div>`;
        }
        if (store.buyingGuide) {
            brandHtml += `<div style="margin-top: 1rem; padding-top: 0.85rem; border-top: 1px dashed var(--border-color);"><strong style="color: var(--text-primary); display: block; margin-bottom: 0.25rem;">First-Time Shopping Advice & Savings Tips</strong><p style="margin: 0; color: var(--text-secondary); line-height: 1.5;">${store.buyingGuide}</p></div>`;
        }
        if (store.shippingInfo) {
            brandHtml += `<div style="margin-top: 1rem; padding-top: 0.85rem; border-top: 1px dashed var(--border-color);"><strong style="color: var(--text-primary); display: block; margin-bottom: 0.25rem;">Shipping Information</strong><p style="margin: 0; color: var(--text-secondary); line-height: 1.5;">${store.shippingInfo}</p></div>`;
        }
        if (store.buyerProtection) {
            brandHtml += `<div style="margin-top: 1rem; padding-top: 0.85rem; border-top: 1px dashed var(--border-color);"><strong style="color: var(--text-primary); display: block; margin-bottom: 0.25rem;">Buyer Protection & Guarantee</strong><p style="margin: 0; color: var(--text-secondary); line-height: 1.5;">${store.buyerProtection}</p></div>`;
        }
        if (store.paymentMethods && store.paymentMethods.length > 0) {
            brandHtml += `<div style="margin-top: 1rem; padding-top: 0.85rem; border-top: 1px dashed var(--border-color);"><strong style="color: var(--text-primary); display: block; margin-bottom: 0.5rem;">Accepted Payment Methods</strong><div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">${store.paymentMethods.map(pm => `<span class="badge" style="background: var(--bg-color); border: 1px solid var(--border-color); color: var(--text-color); font-size: 0.825rem; padding: 0.25rem 0.65rem; border-radius: 6px;">${pm}</span>`).join('')}</div></div>`;
        }
        if (store.categories && store.categories.length > 0) {
            brandHtml += `<div style="margin-top: 1rem; padding-top: 0.85rem; border-top: 1px dashed var(--border-color);"><strong style="color: var(--text-primary); display: block; margin-bottom: 0.5rem;">Popular Product Categories</strong><div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">${store.categories.map(cat => `<span class="badge" style="background: rgba(37, 99, 235, 0.08); border: 1px solid var(--border-color); color: var(--primary-color); font-size: 0.825rem; padding: 0.25rem 0.65rem; border-radius: 6px; font-weight: 600;">${cat}</span>`).join('')}</div></div>`;
        }
        if (store.extraSections && store.extraSections.length > 0) {
            store.extraSections.forEach(sec => {
                const formattedContent = sec.content.replace(/\n/g, '<br>');
                brandHtml += `<div style="margin-top: 1rem; padding-top: 0.85rem; border-top: 1px dashed var(--border-color);"><strong style="color: var(--text-primary); display: block; margin-bottom: 0.25rem;">${sec.title}</strong><p style="margin: 0; color: var(--text-secondary); line-height: 1.5;">${formattedContent}</p></div>`;
            });
        }

        brandText.innerHTML = brandHtml;
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
            const faqQuestions = faqContainer.querySelectorAll('.faq-question');
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
    const canonicalUrl = `https://www.playnewapps.store/stores`;
    const updateMeta = (selector, attr, content) => {
        const el = document.querySelector(selector);
        if (el) el.setAttribute(attr, content);
    };
    updateMeta('meta[name="description"]', 'content', 'Browse exclusive coupon codes, verified software discounts, and promotional offers from all stores on PlayNewApps.');
    updateMeta('#canonical-url', 'href', canonicalUrl);
    updateMeta('meta[property="og:url"]', 'content', canonicalUrl);
    updateMeta('meta[property="og:title"]', 'content', 'All Stores & Promo Codes | PlayNewApps');
    updateMeta('meta[property="og:description"]', 'content', 'Browse exclusive coupon codes and verified software discounts from all stores.');

    const stores = await getDataService().getStores();

    if (!stores || stores.length === 0) {
        const main = document.querySelector('main') || document.querySelector('.main-content');
        if (main) main.innerHTML = '<div class="container" style="padding: 4rem 1rem; text-align: center;"><h2>No stores available</h2></div>';
        return;
    }

    // Sort stores alphabetically by name
    const sortedStores = [...stores].sort((a, b) => a.name.localeCompare(b.name));

    // Popular categories definition
    const POPULAR_CATEGORIES = [
        { name: "Software", icon: "terminal" },
        { name: "Gaming", icon: "sports_esports" },
        { name: "Apps", icon: "apps" },
        { name: "AI Tools", icon: "auto_awesome" },
        { name: "Productivity", icon: "check_circle" },
        { name: "PC Tools", icon: "build" },
        { name: "Security & VPN", icon: "shield" },
        { name: "Home & Garden", icon: "home" },
        { name: "Fashion & Apparel", icon: "checkroom" },
        { name: "Health & Beauty", icon: "spa" },
        { name: "Electronics", icon: "devices" },
        { name: "Computers & Technology", icon: "laptop" },
        { name: "Mobile & Accessories", icon: "smartphone" },
        { name: "Office & Business", icon: "business_center" },
        { name: "Education & Online Learning", icon: "school" },
        { name: "Travel", icon: "flight" },
        { name: "Food & Grocery", icon: "restaurant" },
        { name: "Sports & Fitness", icon: "fitness_center" },
        { name: "Automotive", icon: "directions_car" },
        { name: "Pets", icon: "pets" },
        { name: "Kids & Family", icon: "family_restroom" },
        { name: "Shopping", icon: "shopping_bag" },
        { name: "Entertainment", icon: "movie" },
        { name: "Web Hosting & Domains", icon: "dns" },
        { name: "Digital Services", icon: "cloud_sync" },
        { name: "Finance & Shopping Tools", icon: "savings" }
    ];

    const main = document.querySelector('main') || document.querySelector('.main-content');
    if (!main) return;

    // Filter helper
    const filterStoresByCategory = (list, cat) => {
        if (!cat || cat === 'all' || cat === 'All Stores') return list;
        const target = cat.trim().toLowerCase();
        
        const aliases = {
            'pc': ['pc tools', 'pc & desktop', 'computers & technology', 'pc software'],
            'vpn': ['security & vpn', 'vpn & security', 'vpn services', 'privacy tools'],
            'games': ['gaming', 'free-to-play games', 'entertainment'],
            'android': ['apps', 'software & apps', 'mobile & accessories'],
            'ios': ['apps', 'software & apps', 'mobile & accessories'],
            'hosting': ['web hosting & domains', 'server hosting', 'vps & cloud'],
            'ai': ['ai tools', 'generative ai', 'ai writing assistants'],
            'design': ['digital services', 'graphic design', 'creative tools']
        };

        return list.filter(s => {
            if (!s.categories || !Array.isArray(s.categories)) return false;
            return s.categories.some(c => {
                const normalized = c.trim().toLowerCase();
                if (normalized === target || normalized.includes(target) || target.includes(normalized)) {
                    return true;
                }
                if (aliases[target] && aliases[target].some(alias => normalized.includes(alias) || alias.includes(normalized))) {
                    return true;
                }
                return false;
            });
        });
    };

    let activeCategory = new URLSearchParams(window.location.search).get('category') || '';

    const renderLayout = () => {
        const isFiltered = Boolean(activeCategory && activeCategory !== 'all');
        const currentFiltered = isFiltered ? filterStoresByCategory(sortedStores, activeCategory) : sortedStores;
        const pageTitle = isFiltered ? `${activeCategory} Stores & Promo Codes` : `All Stores & Verified Promo Codes`;
        const pageIntro = isFiltered 
            ? `Browse verified discount coupons, exclusive software promo codes, and special offers in ${activeCategory}.`
            : `Browse exclusive coupon codes, verified software discounts, and promotional offers from leading global tech brands.`;

        main.innerHTML = `
            <nav class="container breadcrumbs" aria-label="Breadcrumb">
                <ol>
                    <li><a href="index.html">Home</a></li>
                    ${isFiltered ? `<li><a href="stores.html" id="breadcrumb-stores-link">Stores</a></li><li aria-current="page">${activeCategory}</li>` : `<li aria-current="page">Stores</li>`}
                </ol>
            </nav>

            <section class="all-stores-hero container reveal active">
                <div class="all-stores-header-card card">
                    <div class="all-stores-header-top">
                        <div>
                            <h1 class="hero-title" style="margin-bottom: 0.25rem;" id="stores-page-title">${pageTitle}</h1>
                            <p class="all-stores-intro" id="stores-page-intro">
                                ${pageIntro}
                            </p>
                        </div>
                        <div class="all-stores-count-badge">
                            <span class="material-icons-round" aria-hidden="true">storefront</span>
                            <span id="total-stores-count">${currentFiltered.length} Available Stores</span>
                        </div>
                    </div>
                    
                    <div class="stores-search-box">
                        <span class="material-icons-round search-icon" aria-hidden="true">search</span>
                        <input type="text" id="stores-search-input" placeholder="Search stores by name (e.g., Lenovo, Adobe, NordVPN, WPS Office)..." aria-label="Search stores">
                        <button id="stores-search-clear" class="search-clear-btn" aria-label="Clear search" style="display: none;">
                            <span class="material-icons-round" aria-hidden="true">close</span>
                        </button>
                    </div>

                    <!-- Interactive Popular Categories Filter Bar -->
                    <div class="stores-category-bar-wrapper" aria-label="Filter stores by popular category">
                        <div class="stores-category-bar" id="stores-category-bar">
                            <button class="stores-category-chip ${!isFiltered ? 'active' : ''}" data-cat="" aria-label="All Stores">
                                <span class="material-icons-round chip-icon" aria-hidden="true">apps</span>
                                <span>All Stores</span>
                            </button>
                            ${POPULAR_CATEGORIES.map(cat => `
                                <button class="stores-category-chip ${activeCategory.toLowerCase() === cat.name.toLowerCase() ? 'active' : ''}" data-cat="${cat.name}" aria-label="${cat.name} Category">
                                    <span class="material-icons-round chip-icon" aria-hidden="true">${cat.icon}</span>
                                    <span>${cat.name}</span>
                                </button>
                            `).join('')}
                        </div>
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
                    <p style="color: var(--text-secondary); margin-bottom: 1rem;">We couldn't find any store matching your filter or search query.</p>
                    <button id="clear-search-btn" class="btn btn-outline">Reset Category &amp; Search</button>
                </div>
            </section>
        `;

        bindEvents();
        renderStores(currentFiltered);
    };

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
            const letterKey = /[A-Z]/.test(firstChar) ? firstChar : '0–9';
            activeLetters.add(letterKey);
            if (!groups[letterKey]) groups[letterKey] = [];
            groups[letterKey].push(s);
        });

        // Render Alphabet Nav (only show letters that have stores in current filter)
        renderAlphabetNav(activeLetters);

        // Sort keys (0–9 first if present, then A-Z)
        const sortedKeys = Object.keys(groups).sort((a, b) => {
            if (a === '0–9' || a === '0-9' || a === '#') return -1;
            if (b === '0–9' || b === '0-9' || b === '#') return 1;
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
                                return `
                                    <a href="${s.storeUrl || 'store.html?id=' + s.id}" class="store-card-item" aria-label="${s.name} promo codes and deals">
                                        <div class="store-card-logo-wrap">
                                            <img src="${s.logo}" alt="${s.name} logo" width="80" height="80" loading="lazy" onerror="this.src='/assets/images/brands/default-store.svg'">
                                        </div>
                                        <div class="store-card-info">
                                            <div class="store-card-name">${s.name}</div>
                                            <div class="store-card-meta">
                                                <span class="store-card-rating">★ ${s.rating || '4.8'}</span>
                                                ${s.categories && s.categories[0] ? `<span class="store-card-deals-count">${s.categories[0]}</span>` : ''}
                                            </div>
                                        </div>
                                        <span class="material-icons-round store-card-arrow" aria-hidden="true">arrow_forward</span>
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

        const allLetters = [];
        if (activeLettersSet.has('0–9')) allLetters.push('0–9');
        else if (activeLettersSet.has('0-9')) allLetters.push('0-9');
        else if (activeLettersSet.has('#')) allLetters.push('#');
        for (let i = 65; i <= 90; i++) {
            allLetters.push(String.fromCharCode(i));
        }

        navEl.innerHTML = allLetters.map(letter => {
            const hasStores = activeLettersSet.has(letter);
            if (!hasStores) return '';
            return `
                <button class="alphabet-pill" data-letter="${letter}" aria-label="Go to section ${letter}">${letter}</button>
            `;
        }).join('');

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

    const bindEvents = () => {
        const searchInput = document.getElementById('stores-search-input');
        const clearBtn = document.getElementById('stores-search-clear');
        const emptyClearBtn = document.getElementById('clear-search-btn');
        const categoryBar = document.getElementById('stores-category-bar');
        const breadcrumbStoresLink = document.getElementById('breadcrumb-stores-link');

        const applyFilterAndSearch = () => {
            const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
            if (clearBtn) clearBtn.style.display = query ? 'flex' : 'none';

            let baseList = activeCategory ? filterStoresByCategory(sortedStores, activeCategory) : sortedStores;

            if (!query) {
                renderStores(baseList);
                return;
            }

            const filtered = baseList.filter(s => {
                const nameMatch = s.name.toLowerCase().includes(query) || (s.id && s.id.toLowerCase().includes(query));
                const catMatch = s.categories && s.categories.some(c => c.toLowerCase().includes(query));
                return nameMatch || catMatch;
            });

            renderStores(filtered);
        };

        if (searchInput) {
            searchInput.addEventListener('input', applyFilterAndSearch);
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (searchInput) searchInput.value = '';
                applyFilterAndSearch();
                if (searchInput) searchInput.focus();
            });
        }

        if (emptyClearBtn) {
            emptyClearBtn.addEventListener('click', () => {
                activeCategory = '';
                if (searchInput) searchInput.value = '';
                window.history.pushState(null, '', 'stores.html');
                renderLayout();
            });
        }

        if (breadcrumbStoresLink) {
            breadcrumbStoresLink.addEventListener('click', (e) => {
                e.preventDefault();
                activeCategory = '';
                window.history.pushState(null, '', 'stores.html');
                renderLayout();
            });
        }

        if (categoryBar) {
            categoryBar.querySelectorAll('.stores-category-chip').forEach(chip => {
                chip.addEventListener('click', (e) => {
                    e.preventDefault();
                    const chosenCat = chip.getAttribute('data-cat') || '';
                    if (activeCategory === chosenCat) return;

                    activeCategory = chosenCat;
                    const newUrl = chosenCat ? `stores.html?category=${encodeURIComponent(chosenCat)}` : `stores.html`;
                    window.history.pushState({ category: chosenCat }, '', newUrl);
                    
                    // Update document title
                    document.title = chosenCat ? `${chosenCat} Stores & Promo Codes | PlayNewApps` : `All Stores & Promo Codes | PlayNewApps`;

                    renderLayout();

                    // Scroll category chip into view smoothly on mobile if needed
                    const chipEl = document.querySelector(`.stores-category-chip[data-cat="${chosenCat}"]`);
                    if (chipEl) {
                        chipEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                    }
                });
            });
        }
    };

    // Handle browser forward/back buttons seamlessly
    window.addEventListener('popstate', () => {
        const urlParams = new URLSearchParams(window.location.search);
        const cat = urlParams.get('category') || '';
        if (cat !== activeCategory) {
            activeCategory = cat;
            renderLayout();
        }
    });

    renderLayout();
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

    const allCoupons = await getDataService().getCoupons();
    const couponsGrid = document.querySelector('.coupon-grid');
    if (couponsGrid) {
        couponsGrid.innerHTML = allCoupons.map(c => getComponents().createCouponCard(c)).join('');
        this.attachCouponListeners(couponsGrid);
    }
};
