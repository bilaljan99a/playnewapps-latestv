import json, re

# Load JSON data
with open('data/apps.json', 'r', encoding='utf-8') as f: apps = json.load(f)
with open('data/games.json', 'r', encoding='utf-8') as f: games = json.load(f)
with open('data/software.json', 'r', encoding='utf-8') as f: software = json.load(f)
with open('data/stores.json', 'r', encoding='utf-8') as f: stores = json.load(f)
with open('data/coupons.json', 'r', encoding='utf-8') as f: coupons = json.load(f)

all_reviews = apps + games + software

# Helper functions matching components.js
def get_rating_stars(rating):
    r = rating or 5
    html = ''
    for i in range(1, 6):
        if r >= i:
            html += '<span class="material-icons-round star active" aria-hidden="true">star</span>'
        elif r >= i - 0.5:
            html += '<span class="material-icons-round star half" aria-hidden="true">star_half</span>'
        else:
            html += '<span class="material-icons-round star" aria-hidden="true">star_border</span>'
    return html

def get_platform_icon(platform):
    p = (platform or '').lower()
    if 'ios' in p or 'apple' in p: return 'apple'
    if 'android' in p: return 'android'
    if 'pc' in p or 'windows' in p or 'desktop' in p: return 'computer'
    if any(k in p for k in ['game', 'playstation', 'ps5', 'xbox', 'console', 'handheld', 'steamos']): return 'sports_esports'
    if any(k in p for k in ['vr', 'quest', 'meta']): return 'view_in_ar'
    return 'apps'

def sanitize_text(text, code):
    if not text: return ''
    res = str(text)
    res = re.sub(r'US\s*\$', '$', res, flags=re.I)
    res = re.sub(r'USD\s*\$', '$', res, flags=re.I)
    res = re.sub(r'US\s*(\$\d+)', r'\1', res, flags=re.I)
    res = re.sub(r'\bUSD\s+(\d+)', r'$\1', res, flags=re.I)
    res = re.sub(r'(\$\d+)\s*USD\b', r'\1', res, flags=re.I)

    if code and isinstance(code, str) and len(code.strip()) > 1:
        c = code.strip()
        escaped = re.escape(c)
        res = re.sub(rf'(?:use\s+)?(?:promo\s+|coupon\s+)?code\s*[:=-]?\s*{escaped}\s*(?:at\s+checkout)?', 'with verified promo code', res, flags=re.I)
        res = re.sub(rf'with\s+(?:promo\s+|coupon\s+)?code\s*[:=-]?\s*{escaped}', 'with verified promo code', res, flags=re.I)
        res = re.sub(rf'\b{escaped}\b', 'promo code', res)
        res = re.sub(r'\s{2,}', ' ', res).strip()
    return res

def create_slide_card(item):
    platforms = item.get('platforms', [])
    platform = platforms[0] if platforms else item.get('platform', 'PC')
    icon = get_platform_icon(platform)
    title = item.get('title') or item.get('name') or 'Software Review'
    img = item.get('icon') or item.get('logo') or item.get('image') or item.get('banner') or '/assets/images/brands/wondershare.svg'
    link = item.get('reviewUrl') or item.get('url') or (item.get('id') if item.get('id', '').endswith('.html') else f'review.html?id={item.get("id", "")}')
    desc = item.get('description') or item.get('summary') or ''
    is_logo = img.endswith('.svg') or '/brands/' in img or '/apps/' in img or 'logo' in img
    img_class = "card-img card-img-logo" if is_logo else "card-img"
    has_logo_bg = "has-logo-bg" if is_logo else ""
    author = 'PlayNewApps' if item.get('authorId') else 'Reviewer'
    rating = item.get('rating', 5.0)

    return f'''                    <article class="slide card review-card">
                        <div class="card-img-wrapper {has_logo_bg}">
                            <img src="{img}" alt="{title}" class="{img_class}" width="600" height="400" loading="lazy">
                            <span class="badge platform-badge"><span class="material-icons-round">{icon}</span> {platform}</span>
                        </div>
                        <div class="card-content">
                            <h3 class="card-title"><a href="{link}">{title}</a></h3>
                            <div class="rating" aria-label="Rating {rating} out of 5 stars">
                                {get_rating_stars(rating)}
                                <span class="rating-text">{rating}</span>
                            </div>
                            <p class="card-excerpt">{desc}</p>
                            <div class="card-footer">
                                <span class="author">By {author}</span>
                                <a href="{link}" class="btn btn-outline btn-sm slide-review-btn">Read Review</a>
                            </div>
                        </div>
                    </article>'''

def create_app_card(item):
    platforms = item.get('platforms', [])
    platform = platforms[0] if platforms else item.get('platform') or ('PC' if item.get('categoryId') == 'pc' else ('Games' if item.get('categoryId') in ['action', 'rpg'] else 'Android'))
    icon = get_platform_icon(platform)
    title = item.get('title') or item.get('name') or 'Software Review'
    img = item.get('icon') or item.get('logo') or item.get('image') or item.get('banner') or '/assets/images/brands/wondershare.svg'
    link = item.get('reviewUrl') or item.get('url') or (item.get('id') if item.get('id', '').endswith('.html') else f'review.html?id={item.get("id", "")}')
    desc = item.get('description') or item.get('summary') or ''
    is_logo = img.endswith('.svg') or '/brands/' in img or '/apps/' in img or 'logo' in img
    img_class = "card-img card-img-logo" if is_logo else "card-img"
    has_logo_bg = "has-logo-bg" if is_logo else ""
    author = 'PlayNewApps' if item.get('authorId') else 'Reviewer'
    rating = item.get('rating', 5.0)

    return f'''                <article class="card review-card" data-category="{item.get('categoryId', '')}">
                    <div class="card-img-wrapper {has_logo_bg}">
                        <img src="{img}" alt="{title}" class="{img_class}" width="600" height="400" loading="lazy">
                        <span class="badge platform-badge"><span class="material-icons-round">{icon}</span> {platform}</span>
                    </div>
                    <div class="card-content">
                        <h3 class="card-title"><a href="{link}">{title}</a></h3>
                        <div class="rating" aria-label="Rating {rating} out of 5 stars">
                            {get_rating_stars(rating)}
                            <span class="rating-text">{rating}</span>
                        </div>
                        <p class="card-excerpt">{desc}</p>
                        <div class="card-footer">
                            <span class="author">By {author}</span>
                            <a href="{link}" class="read-review-link">Read Review →</a>
                        </div>
                    </div>
                </article>'''

def create_store_card(item):
    view_link = item.get('storeUrl') or f"store.html?id={item.get('id')}"
    rating = f"★ {item.get('rating')}" if item.get('rating') else "★ 4.9"
    return f'''                <a href="{view_link}" class="store-card-item" data-store-id="{item.get('id')}">
                    <div class="store-card-logo-wrap">
                        <img src="{item.get('logo')}" alt="{item.get('name')} Logo" width="68" height="68" loading="lazy" onerror="this.src='/assets/images/brands/default-store.svg'">
                    </div>
                    <div class="store-card-info">
                        <h3 class="store-card-name" title="{item.get('name')}">{item.get('name')}</h3>
                        <div class="store-card-meta">
                            <span class="store-card-deals-count">View Deals</span>
                            <span class="store-card-rating">{rating}</span>
                        </div>
                    </div>
                    <span class="material-icons-round store-card-arrow" aria-hidden="true">arrow_forward</span>
                </a>'''

def create_home_deal_card(item):
    store_obj = item.get('store') if isinstance(item.get('store'), dict) else {}
    link = item.get('affiliateLink') or item.get('affiliateUrl') or item.get('url') or store_obj.get('affiliateLink') or '#'
    code = item.get('code')
    clean_title = sanitize_text(item.get('title'), code)
    clean_discount = sanitize_text(item.get('discount') or ('PROMO' if code else 'DEAL'), code)
    store_name = store_obj.get('name') or item.get('storeName') or item.get('storeId') or item.get('store') or 'Store'
    store_logo = store_obj.get('logo') or item.get('logo') or item.get('storeLogo') or '/assets/images/brands/default-store.svg'
    is_expired = item.get('status') == 'expired'
    expiry_text = item.get('expiryDate') or 'Dec 31, 2026'

    if code:
        action_html = f'''                        <div class="code-reveal-wrapper home-reveal-wrapper" data-code="{code}" data-link="{link}">
                            <span class="hidden-code-mask">••••</span>
                            <button class="btn show-code-btn home-deal-btn" aria-label="Show Coupon Code and Copy">Get Code</button>
                        </div>'''
    else:
        action_html = f'''                        <a href="{link}" target="_blank" rel="noopener sponsored" class="btn btn-primary home-deal-btn">Get Deal</a>'''

    return f'''                <article class="home-deal-card {'opacity-60' if is_expired else ''}">
                    <div class="home-deal-logo-box">
                        <img src="{store_logo}" alt="{store_name} Logo" width="140" height="48" loading="lazy" class="home-deal-logo-img" onerror="this.src='/assets/images/brands/default-store.svg'">
                    </div>
                    <div class="home-deal-body">
                        <div class="home-deal-badge-row">
                            <span class="home-deal-discount-tag">{clean_discount}</span>
                            <span class="home-deal-verified-tag"><span class="material-icons-round" aria-hidden="true" style="font-size: 13px;">verified</span> Verified</span>
                        </div>
                        <h3 class="home-deal-title" title="{clean_title}">
                            <a href="{link}" target="_blank" rel="noopener sponsored">{clean_title}</a>
                        </h3>
                        <div class="home-deal-expiry">
                            <span class="material-icons-round" aria-hidden="true" style="font-size: 13px;">schedule</span>
                            <span>Exp: {expiry_text}</span>
                        </div>
                        <div class="home-deal-action">
{action_html}
                        </div>
                    </div>
                </article>'''

# 1. Trending Slides
trending_items = [r for r in all_reviews if r.get('isTrending')]
if not trending_items:
    trending_items = all_reviews[:4]
else:
    trending_items = trending_items[:4]
slides_html = '\n'.join([create_slide_card(item) for item in trending_items])

# 2. Latest Reviews (Top 8)
sorted_reviews = sorted(all_reviews, key=lambda x: str(x.get('updatedAt', '')), reverse=True)
top_reviews = sorted_reviews[:8]
reviews_html = '\n'.join([create_app_card(item) for item in top_reviews])

# 3. Featured Stores (Top 20)
top_stores = stores[:20]
stores_html = '\n'.join([create_store_card(s) for s in top_stores])

# 4. Top Software Deals (Top 15 priority stores)
stores_map = {str(s.get('id', '')).lower(): s for s in stores}
for c in coupons:
    s_id = str(c.get('storeId') or c.get('store') or '').lower()
    if not isinstance(c.get('store'), dict):
        c['store'] = stores_map.get(s_id, {'name': c.get('store', 'Store'), 'logo': '/assets/images/brands/default-store.svg', 'affiliateLink': '#'})

priority_stores = [
    '1password', 'expressvpn', 'protonvpn', 'sitpack', 'tiqets',
    'lenovo', 'asaptickets', 'chicme', 'headway', 'keeper-security',
    'redmagic', 'openhagen', 'aomei', 'gomlab', 'klook', 'walmart',
    'f-secure', 'italiarail', 'purevpn', 'discovercars'
]

seen_stores = set()
featured_deals = []

for p in priority_stores:
    deal = next((c for c in coupons if str(c.get('storeId') or (c.get('store', {}).get('id') if isinstance(c.get('store'), dict) else c.get('store'))).lower() == p and (c.get('code') or c.get('isTop'))), None)
    if not deal:
        deal = next((c for c in coupons if str(c.get('storeId') or (c.get('store', {}).get('id') if isinstance(c.get('store'), dict) else c.get('store'))).lower() == p), None)
    if deal and p not in seen_stores:
        seen_stores.add(p)
        featured_deals.append(deal)

if len(featured_deals) < 15:
    for c in coupons:
        sid = str(c.get('storeId') or (c.get('store', {}).get('id') if isinstance(c.get('store'), dict) else c.get('store'))).lower()
        if sid and sid not in seen_stores:
            seen_stores.add(sid)
            featured_deals.append(c)
            if len(featured_deals) >= 15:
                break

deals_html = '\n'.join([create_home_deal_card(d) for d in featured_deals[:15]])

# 5. Stores Dropdown Menu
POPULAR_KEYS = [
    'walmart', 'alibaba', 'aliexpress', 'amazon', 'fiverr',
    'wondershare', 'adobe', 'canva', 'grammarly', 'hostinger', 'nordvpn'
]
popular_stores = []
for key in POPULAR_KEYS:
    matched = next((s for s in stores if s.get('id') == key or s.get('name', '').lower() == key.lower() or key in str(s.get('id', ''))), None)
    if matched and not any(ps.get('id') == matched.get('id') for ps in popular_stores):
        popular_stores.append(matched)

dropdown_items_html = '\n'.join([f'''                            <a href="store.html?id={s.get('id')}" class="dropdown-item">
                                <img src="{s.get('logo')}" alt="{s.get('name')} Logo" class="dropdown-item-logo" width="24" height="24" onerror="this.src='/assets/images/brands/default-store.svg'">
                                <span class="dropdown-item-name">{s.get('name')}</span>
                            </a>''' for s in popular_stores])

dropdown_full_html = f'''                        <div class="dropdown-menu" id="stores-dropdown-menu" aria-label="Stores Menu">
                            <div class="dropdown-section-header">
                                <span class="star-icon">⭐</span> Popular Stores
                            </div>
{dropdown_items_html}
                            <div class="dropdown-footer">
                                <a href="/stores" class="view-all-link">View All Stores →</a>
                            </div>
                        </div>'''

# Read current index.html
with open('index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

# Replace dropdown-menu
dropdown_pattern = r'<div class="dropdown-menu" id="stores-dropdown-menu" aria-label="Stores Menu">[\s\S]*?</div>\s*</li>'
index_content = re.sub(dropdown_pattern, dropdown_full_html + '\n                    </li>', index_content)

# Replace slider-track
slider_pattern = r'(<div class="slider-track" id="slider-track">)([\s\S]*?)(</div>\s*<button class="slider-btn next-btn")'
index_content = re.sub(slider_pattern, r'\1\n' + slides_html + r'\n                \3', index_content)

# Replace reviews-grid
reviews_pattern = r'(<div class="grid" id="reviews-grid" aria-live="polite">)([\s\S]*?)(</div>\s*</section>)'
index_content = re.sub(reviews_pattern, r'\1\n' + reviews_html + r'\n            \3', index_content)

# Replace stores-grid
stores_pattern = r'(<div class="grid store-grid" id="stores-grid">)([\s\S]*?)(</div>\s*</section>)'
index_content = re.sub(stores_pattern, r'\1\n' + stores_html + r'\n            \3', index_content)

# Replace coupon-grid
coupons_pattern = r'(<div class="grid coupon-grid(?: home-deals-grid)?">)([\s\S]*?)(</div>\s*</section>)'
index_content = re.sub(coupons_pattern, r'<div class="grid coupon-grid home-deals-grid">\n' + deals_html + r'\n            \3', index_content)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(index_content)

print("Pre-rendered index.html successfully with instant content!")

try:
    from prerender_stores import prerender_stores
    prerender_stores()
except Exception as e:
    print(f"Error prerendering stores: {e}")

