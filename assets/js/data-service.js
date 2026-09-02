class DataService {
    static _cache = new Map();
    static _inFlight = new Map();
    static CACHE_KEY_PREFIX = 'pna_data_v5_';
    static CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache

    static _cleanOldCaches() {
        try {
            if (typeof localStorage === 'undefined') return;
            for (let i = localStorage.length - 1; i >= 0; i--) {
                const key = localStorage.key(i);
                if (key && key.startsWith('pna_data_') && !key.startsWith(this.CACHE_KEY_PREFIX)) {
                    localStorage.removeItem(key);
                }
            }
        } catch (e) {}
    }

    static _getStorageCache(path) {
        try {
            if (typeof localStorage === 'undefined') return null;
            this._cleanOldCaches();
            const key = this.CACHE_KEY_PREFIX + path;
            const item = localStorage.getItem(key);
            if (!item) return null;
            const parsed = JSON.parse(item);
            if (parsed && parsed.data && (Date.now() - (parsed.time || 0) < this.CACHE_TTL_MS)) {
                return parsed.data;
            }
        } catch (e) {}
        return null;
    }

    static _setStorageCache(path, data) {
        try {
            if (typeof localStorage === 'undefined') return;
            const key = this.CACHE_KEY_PREFIX + path;
            localStorage.setItem(key, JSON.stringify({
                time: Date.now(),
                data: data
            }));
        } catch (e) {}
    }

    static async fetchJSON(path) {
        // 1. Check in-memory cache for instant zero-latency return
        if (this._cache.has(path)) {
            return this._cache.get(path);
        }

        // 2. Check localStorage cache for instant return across sessions
        const storageData = this._getStorageCache(path);
        if (storageData) {
            this._cache.set(path, storageData);
            // Non-blocking background revalidation
            this._revalidateInBackground(path);
            return storageData;
        }

        // 3. Deduplicate simultaneous network requests
        if (this._inFlight.has(path)) {
            return await this._inFlight.get(path);
        }

        const fetchPromise = this._executeFetch(path);
        this._inFlight.set(path, fetchPromise);
        try {
            const result = await fetchPromise;
            return result;
        } finally {
            this._inFlight.delete(path);
        }
    }

    static async _executeFetch(path) {
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
                    this._setStorageCache(path, data);
                    return data;
                }
            } catch (err) {
                // Try next fallback path
            }
        }
        return null;
    }

    static _revalidateInBackground(path) {
        setTimeout(async () => {
            try {
                const data = await this._executeFetch(path);
                if (data) {
                    this._cache.set(path, data);
                    this._setStorageCache(path, data);
                }
            } catch (e) {}
        }, 1000);
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
