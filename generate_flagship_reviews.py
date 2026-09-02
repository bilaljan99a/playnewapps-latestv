import os, re

def write_page(filename, content):
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    # Check visible text without scripts/styles
    visible = re.sub(r'<script.*?</script>', '', content, flags=re.DOTALL)
    visible = re.sub(r'<style.*?</style>', '', visible, flags=re.DOTALL)
    visible = re.sub(r'<[^<]+?>', ' ', visible)
    words = len(re.findall(r'\b\w+\b', visible))
    print(f"Generated {filename}: {words} visible words, {len(content)} bytes")
    assert words >= 3000, f"Error: {filename} has only {words} visible words, expected 3000+"

print("Ready to generate flagship review pages...")
