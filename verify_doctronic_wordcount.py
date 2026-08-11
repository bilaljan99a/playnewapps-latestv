import re

with open('doctronic-coupons.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Remove head, script, style, header, footer
html_clean = re.sub(r'<head.*?>.*?</head>', '', html, flags=re.DOTALL | re.IGNORECASE)
html_clean = re.sub(r'<script.*?>.*?</script>', '', html_clean, flags=re.DOTALL | re.IGNORECASE)
html_clean = re.sub(r'<style.*?>.*?</style>', '', html_clean, flags=re.DOTALL | re.IGNORECASE)
html_clean = re.sub(r'<header.*?>.*?</header>', '', html_clean, flags=re.DOTALL | re.IGNORECASE)
html_clean = re.sub(r'<footer.*?>.*?</footer>', '', html_clean, flags=re.DOTALL | re.IGNORECASE)

# Strip SVG blocks
html_clean = re.sub(r'<svg.*?>.*?</svg>', '', html_clean, flags=re.DOTALL | re.IGNORECASE)

# Strip remaining HTML tags
text = re.sub(r'<.*?>', ' ', html_clean)

# Decode HTML entities
text = re.sub(r'&amp;', '&', text)
text = re.sub(r'&gt;', '>', text)
text = re.sub(r'&lt;', '<', text)
text = re.sub(r'&quot;', '"', text)
text = re.sub(r'&#39;', "'", text)

words = re.findall(r'\b[\w\'-]+\b', text)
print("==================================================")
print("ACTUAL USER-FACING VISIBLE MAIN BODY WORD COUNT:")
print("Total main body words:", len(words))
print("==================================================")
