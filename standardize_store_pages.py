import json
import re
import os

with open('data/coupons.json') as f:
    all_coupons = json.load(f)

with open('data/stores.json') as f:
    all_stores = json.load(f)

store_map = {}
for s in all_stores:
    surl = s.get('storeUrl')
    if surl:
        store_map[surl.lstrip('/')] = s
    store_map[s['id']] = s

def clean_currency(text):
    if not text:
        return ""
    return text.replace('US$', '$').replace('USD$', '$').replace('USD', '$')

def format_card(c, store_name, default_link):
    title = c.get('title', '')
    desc = c.get('description', '')
    code = c.get('code', '')
    link = c.get('link') or default_link or '#'
    discount = c.get('discount', '')
    category = c.get('category') or store_name or 'Verified'
    votes = c.get('votes', 1840)
    success_rate = c.get('successRate', '99%')
    if isinstance(success_rate, int):
        success_rate = f"{success_rate}%"
    
    if not discount:
        m = re.search(r'(\d+%\s*OFF|\$\d+\s*OFF|FREE\s*(?:SHIPPING|TRIAL)?|\d+%\s*Discount)', title, re.I)
        discount = m.group(0).upper() if m else 'SPECIAL DEAL'
    
    discount = clean_currency(discount)
    code_type = 'CODE' if code else 'SALE'

    if code:
        action_html = f'''<div class="code-reveal-wrapper" data-code="{code}" data-link="{link}">
                                        <span class="hidden-code-mask">••••••••</span>
                                        <button class="btn show-code-btn" aria-label="Show Coupon Code and Copy">Show Code</button>
                                    </div>'''
    else:
        action_html = f'''<a href="{link}" target="_blank" rel="noopener sponsored" class="btn btn-primary get-deal-btn" style="width: 100%; justify-content: center; text-align: center;">Get Deal</a>'''

    return f'''<article class="card coupon-card affiliate-card retailmenot-style">
                                <div class="coupon-header-bar">
                                    <div class="header-badges">
                                        <span class="badge verified-badge"><span class="material-icons-round" aria-hidden="true">verified</span> Verified</span>
                                        <span class="badge type-badge">{code_type}</span>
                                    </div>
                                    <span class="badge discount-pill">{discount}</span>
                                </div>
                                <div class="coupon-main-body">
                                    <div class="coupon-discount-box">
                                        <span class="discount-hero">{discount}</span>
                                    </div>
                                    <div class="coupon-info-box">
                                        <h3 class="coupon-title">
                                            <a href="{link}" target="_blank" rel="noopener sponsored">{title}</a>
                                        </h3>
                                        <div class="coupon-social-proof">
                                            <span class="success-rate"><span class="material-icons-round" aria-hidden="true">thumb_up</span> {success_rate} Success</span>
                                            <span class="meta-dot">•</span>
                                            <span class="users-meta">{votes} interested users</span>
                                        </div>
                                    </div>
                                    <div class="coupon-action-box">
                                        {action_html}
                                    </div>
                                </div>
                                <div class="coupon-details-footer">
                                    <div class="coupon-details-content hidden">
                                        <div class="details-inner-box">
                                            <span class="material-icons-round info-icon">info</span>
                                            <p>{desc or 'Click offer to copy verified promo code and apply at checkout on the official store.'}</p>
                                        </div>
                                    </div>
                                    <div class="details-toggle-container">
                                        <button type="button" class="toggle-details-btn" onclick="toggleCouponDetails(this)">
                                            <span class="btn-text">Show Details</span>
                                            <span class="toggle-icon">+</span>
                                        </button>
                                    </div>
                                </div>
                            </article>'''

print("standardize_store_pages script created")
