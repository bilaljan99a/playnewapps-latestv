import json

# Update coupons.json
with open('data/coupons.json', 'r') as f:
    coupons = json.load(f)

# Find italki coupons
italki_coupons = [c for c in coupons if c.get('storeId') == 'italki']
other_coupons = [c for c in coupons if c.get('storeId') != 'italki']

# Rearrange italki coupons to make 50% trial first
trial_coupon = next((c for c in italki_coupons if '50% Off Trial' in c.get('title', '')), None)
if trial_coupon:
    italki_coupons.remove(trial_coupon)
    italki_coupons.insert(0, trial_coupon)

# Reassemble
new_coupons_list = italki_coupons + other_coupons

with open('data/coupons.json', 'w') as f:
    json.dump(new_coupons_list, f, indent=4)

# Update stores.json
with open('data/stores.json', 'r') as f:
    stores = json.load(f)

for s in stores:
    if s.get('id') == 'italki':
        s['banners'] = [
            {
                "image": "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=1200&q=80",
                "title": "Start Speaking Today: Get 50% OFF Trial Lessons",
                "link": "https://flcoz.com/g/9ks8krpbbqb68b264a769911c0dd7a/",
                "buttonText": "Book Trial"
            },
            {
                "image": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
                "title": "Learn from Native Speakers & Claim $10 Bonus",
                "link": "https://flcoz.com/g/9ks8krpbbqb68b264a769911c0dd7a/",
                "buttonText": "Claim Bonus"
            }
        ]
        
        # Also maybe add an image into extraSections just to be safe about "content 2 ya 3 banner"?
        s['extraSections'][0]['content'] = '<a href="https://flcoz.com/g/9ks8krpbbqb68b264a769911c0dd7a/" target="_blank"><img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80" alt="italki Language Learning" style="width:100%; border-radius:12px; margin-bottom:1rem; border:1px solid var(--border-color);"></a>\n\n' + s['extraSections'][0]['content']
        break

with open('data/stores.json', 'w') as f:
    json.dump(stores, f, indent=4)
