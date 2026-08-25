import json
import re

files = [
    '3dlabprint-coupons.html', 'aomei-coupons.html', 'applicantally-coupons.html', 'box.html',
    'crossout-coupons.html', 'crsed-coupons.html', 'discovercars-coupons.html', 'doctronic-coupons.html',
    'enlisted-coupons.html', 'eurowings-coupons.html', 'f-secure-coupons.html', 'fiverr.html',
    'forcedrop-coupons.html', 'godlike-host-coupons.html', 'hide-expert-vpn-coupons.html',
    'keycense-coupons.html', 'lennuabi-coupons.html', 'lenovo-coupons.html', 'placeit-coupons.html',
    'presenti-ai-coupons.html', 'purevpn-coupons.html', 'qustodio-coupons.html', 'redmagic-coupons.html',
    'star-conflict-coupons.html', 'top-of-the-results-coupons.html', 'ufl-coupons.html',
    'vectorstock-coupons.html', 'wau-coupons.html'
]

for f in files:
    with open(f) as fp:
        c = fp.read()
    
    print(f'=== {f} ===')
    # Find container of cards
    # Look for common patterns
    # Pattern A: <div class="space-y-3.5"> or <div class="space-y-4">
    # Pattern B: <div id="active-coupons-grid" ...>
    # Pattern C: <section id="...offers-section">
    patterns = [
        r'(<div[^>]*class=[\"\'][^\"\']*(?:space-y-3\.5|space-y-4|flex flex-col gap-4|flex flex-col gap-5)[^\"\']*[\"\'][^>]*>)(.*?)(</div>\s*(?:</section>|<section|<article|<!--\s*(?:2|SECTION|IN-DEPTH|BUYING|ABOUT)))',
        r'(<div[^>]*id=[\"\']active-coupons-grid[\"\'][^>]*>)(.*?)(</div>\s*(?:</section>|<section|<article|<!--\s*(?:2|SECTION)))',
        r'(<section[^>]*id=[\"\'][^\"\']*offers-section[\"\'][^>]*>)(.*?)(</section>)',
    ]
    matched = False
    for pat in patterns:
        m = re.search(pat, c, re.DOTALL)
        if m:
            print(f'  Matched pattern! Opening tag: {m.group(1)[:50]}... Inner length: {len(m.group(2))}')
            matched = True
            break
    if not matched:
        print('  NO match for standard patterns!')
