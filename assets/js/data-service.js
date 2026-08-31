class DataService {
    static _cache = new Map();
    static _inFlight = new Map();

    static _cleanLegacyCaches() {
        try {
            if (typeof sessionStorage !== 'undefined') {
                const keysToRemove = [];
                for (let i = 0; i < sessionStorage.length; i++) {
                    const k = sessionStorage.key(i);
                    if (k && (k.startsWith('pna_cache_') || k.includes('/data/'))) {
                        keysToRemove.push(k);
                    }
                }
                keysToRemove.forEach(k => sessionStorage.removeItem(k));
            }
        } catch (e) {}
    }

    static async fetchJSON(path) {
        this._cleanLegacyCaches();

        // Check in-memory cache for the current page execution
        if (this._cache.has(path)) {
            return this._cache.get(path);
        }

        // Check if request is already in flight (deduplicate simultaneous requests)
        if (this._inFlight.has(path)) {
            return await this._inFlight.get(path);
        }

        const fetchPromise = (async () => {
            const candidatePaths = [
                path.startsWith('/') ? path : '/' + path,
                path.startsWith('/') ? path.slice(1) : path,
                '.' + (path.startsWith('/') ? path : '/' + path)
            ];

            const cacheBuster = `_t=${Date.now()}`;
            for (const p of candidatePaths) {
                try {
                    const fetchUrl = p.includes('?') ? `${p}&${cacheBuster}` : `${p}?${cacheBuster}`;
                    const response = await fetch(fetchUrl, { cache: 'no-store' });
                    if (response.ok) {
                        const data = await response.json();
                        this._cache.set(path, data);
                        return data;
                    }
                } catch (err) {
                    // Try next fallback path
                }
            }
            return null;
        })();

        this._inFlight.set(path, fetchPromise);
        try {
            const result = await fetchPromise;
            return result;
        } finally {
            this._inFlight.delete(path);
        }
    }

    static async getApps() { return (await this.fetchJSON('/data/apps.json')) || []; }
    static async getGames() { return (await this.fetchJSON('/data/games.json')) || []; }
    static async getSoftware() { return (await this.fetchJSON('/data/software.json')) || []; }
    
    static async getCoupons() {
        const [coupons, stores] = await Promise.all([
            this.fetchJSON('/data/coupons.json'),
            this.getStores()
        ]);
        if (!coupons) return [];
        const storesList = stores || [];
        const storesMap = new Map(storesList.map(s => [(s.id || '').toLowerCase(), s]));

        return coupons.map(c => {
            let storeObj = null;
            if (typeof c.store === 'object' && c.store !== null) {
                storeObj = c.store;
            } else {
                const sId = (c.storeId || c.store || '').toLowerCase();
                storeObj = storesMap.get(sId) || storesList.find(s => (s.name || '').toLowerCase() === (c.store || '').toLowerCase()) || {
                    id: c.storeId || (c.store ? String(c.store).toLowerCase().replace(/\s+/g, '-') : 'store'),
                    name: c.store || c.storeId || 'Store',
                    logo: '/assets/images/brands/default-store.svg',
                    affiliateLink: c.affiliateUrl || '#'
                };
            }
            const finalLink = c.affiliateLink || c.affiliateUrl || c.url || (storeObj ? storeObj.affiliateLink : '#');
            return {
                ...c,
                storeId: c.storeId || storeObj.id,
                store: storeObj,
                affiliateLink: finalLink,
                affiliateUrl: finalLink,
                url: finalLink
            };
        });
    }

    static async getStores() { return (await this.fetchJSON('/data/stores.json')) || []; }
    static async getCategories() { return (await this.fetchJSON('/data/categories.json')) || []; }
    static async getAuthors() { return (await this.fetchJSON('/data/authors.json')) || []; }
    
    static async getAllReviews() {
        const [apps, games, software] = await Promise.all([
            this.getApps(),
            this.getGames(),
            this.getSoftware()
        ]);
        return [...apps, ...games, ...software];
    }

    static async getReviewById(id) {
        const all = await this.getAllReviews();
        return all.find(item => item.id === id);
    }
}
window.DataService = DataService;
