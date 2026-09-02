import json
import re

def prerender_stores():
    with open('data/stores.json', 'r', encoding='utf-8') as f:
        stores = json.load(f)

    # Sort stores alphabetically by name
    sorted_stores = sorted(stores, key=lambda s: s['name'].strip().lower())
    total_stores_count = len(sorted_stores)

    # Group by first letter
    groups = {}
    active_letters = set()

    for s in sorted_stores:
        name = s['name'].strip()
        first_char = name[0].upper() if name else '#'
        letter_key = first_char if first_char.isalpha() else '0–9'
        active_letters.add(letter_key)
        groups.setdefault(letter_key, []).append(s)

    # Sorted letter keys: 0–9 first, then A-Z
    alphabet_all = ['0–9'] + [chr(c) for c in range(ord('A'), ord('Z') + 1)]
    
    # Build Alphabet Nav HTML
    alphabet_nav_html_list = []
    for letter in alphabet_all:
        if letter in active_letters:
            alphabet_nav_html_list.append(f'<a href="#group-{letter}" class="alphabet-letter has-stores" aria-label="Jump to stores starting with {letter}">{letter}</a>')
        else:
            alphabet_nav_html_list.append(f'<span class="alphabet-letter disabled" aria-hidden="true">{letter}</span>')
    
    alphabet_nav_html = ''.join(alphabet_nav_html_list)

    # Build Stores List HTML
    sorted_group_keys = sorted(groups.keys(), key=lambda k: ('0' if k == '0–9' else k))
    
    group_blocks = []
    for letter in sorted_group_keys:
        store_cards = []
        for s in groups[letter]:
            store_url = s.get('storeUrl') or f"/store?id={s['id']}"
            logo = s.get('logo') or '/assets/images/brands/default-store.svg'
            try:
                rating_val = float(s.get('rating', 4.9))
                rating = f"★ {rating_val:.1f}"
            except Exception:
                rating = "★ 4.9"
            categories = s.get('categories', [])
            deals_category = categories[0] if categories else 'Software & Apps'
            
            card_html = f'''                        <a href="{store_url}" class="store-card-item" aria-label="{s['name']} promo codes and deals">
                            <div class="store-card-logo-wrap">
                                <img src="{logo}" alt="{s['name']} logo" width="80" height="80" loading="lazy" onerror="this.src='/assets/images/brands/default-store.svg'">
                            </div>
                            <div class="store-card-info">
                                <div class="store-card-name">{s['name']}</div>
                                <div class="store-card-meta">
                                    <span class="store-card-rating">{rating}</span>
                                    <span class="store-card-deals-count">{deals_category}</span>
                                </div>
                            </div>
                            <span class="material-icons-round store-card-arrow" aria-hidden="true">arrow_forward</span>
                        </a>'''
            store_cards.append(card_html)
        
        cards_joined = '\n\n'.join(store_cards)
        group_html = f'''        <div class="store-letter-group" id="group-{letter}">
            <h2 class="letter-heading">{letter}</h2>
            <div class="store-cards-grid">
{cards_joined}
            </div>
        </div>'''
        group_blocks.append(group_html)

    stores_list_html = '\n\n'.join(group_blocks)

    # Read stores.html and update it
    with open('stores.html', 'r', encoding='utf-8') as f:
        stores_content = f.read()

    # 1. Update total count badge
    stores_content = re.sub(
        r'<span id="total-stores-count">.*?</span>',
        f'<span id="total-stores-count">{total_stores_count} Available Stores</span>',
        stores_content
    )

    # 2. Update alphabet nav
    stores_content = re.sub(
        r'(<div class="alphabet-nav" id="alphabet-nav">)[\s\S]*?(</div>\s*</nav>)',
        f'\\1\n                        {alphabet_nav_html}\n                    \\2',
        stores_content
    )

    # 3. Update all-stores-list
    stores_content = re.sub(
        r'(<div id="all-stores-list" class="all-stores-list">)[\s\S]*?(</div>\s*<div id="no-stores-found")',
        f'\\1\n{stores_list_html}\n            \\2',
        stores_content
    )

    with open('stores.html', 'w', encoding='utf-8') as f:
        f.write(stores_content)

    print(f"Successfully prerendered stores.html with {total_stores_count} stores across {len(sorted_group_keys)} letter groups!")

if __name__ == '__main__':
    prerender_stores()
