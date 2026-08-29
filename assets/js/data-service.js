class DataService {
    static _cache = new Map();
    static _inFlight = new Map();

    static async fetchJSON(path) {
        // Check in-memory cache first
        if (this._cache.has(path)) {
            return this._cache.get(path);
        }

        // Check if request is already in flight (deduplicate simultaneous requests)
        if (this._inFlight.has(path)) {
            return await this._inFlight.get(path);
        }

        // Check sessionStorage cache for fast inter-page navigation
        const CACHE_KEY = 'pna_cache_v3_' + path;
        try {
            const sessionData = sessionStorage.getItem(CACHE_KEY);
            if (sessionData) {
                const parsed = JSON.parse(sessionData);
                this._cache.set(path, parsed);
                return parsed;
            }
        } catch (e) {}

        const fetchPromise = (async () => {
            const candidatePaths = [
                path.startsWith('/') ? path : '/' + path,
                path.startsWith('/') ? path.slice(1) : path,
                '.' + (path.startsWith('/') ? path : '/' + path)
            ];

            for (const p of candidatePaths) {
                try {
                    const response = await fetch(p);
                    if (response.ok) {
                        const data = await response.json();
                        this._cache.set(path, data);
                        try {
                            sessionStorage.setItem(CACHE_KEY, JSON.stringify(data));
                        } catch (err) {}
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
