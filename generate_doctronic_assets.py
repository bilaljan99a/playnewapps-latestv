import os

# Create Doctronic brand icon SVG
doctronic_icon_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="cyanG" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="50%" stop-color="#06B6D4"/>
      <stop offset="100%" stop-color="#0284C7"/>
    </linearGradient>
  </defs>

  <!-- Background container -->
  <rect width="200" height="200" rx="40" fill="#FFFFFF"/>

  <!-- 8-point Cyan Starburst / Medical Asterisk -->
  <g transform="translate(100,100)">
    <!-- Vertical and Horizontal oval petals -->
    <ellipse cx="0" cy="0" rx="16" ry="60" fill="url(#cyanG)" opacity="0.85"/>
    <ellipse cx="0" cy="0" rx="60" ry="16" fill="url(#cyanG)" opacity="0.85"/>
    <!-- Diagonal oval petals -->
    <g transform="rotate(45)">
      <ellipse cx="0" cy="0" rx="16" ry="60" fill="url(#cyanG)" opacity="0.85"/>
      <ellipse cx="0" cy="0" rx="60" ry="16" fill="url(#cyanG)" opacity="0.85"/>
    </g>
    <!-- Center dark 4-point star -->
    <path d="M 0,-24 Q 0,0 -24,0 Q 0,0 0,24 Q 0,0 24,0 Q 0,0 0,-24 Z" fill="#0F172A"/>
  </g>
</svg>'''

# Create Doctronic full horizontal logo SVG
doctronic_full_logo_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 100" width="420" height="100">
  <defs>
    <linearGradient id="cyanG2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="50%" stop-color="#06B6D4"/>
      <stop offset="100%" stop-color="#0284C7"/>
    </linearGradient>
  </defs>

  <!-- Starburst Icon -->
  <g transform="translate(50,50)">
    <ellipse cx="0" cy="0" rx="9" ry="34" fill="url(#cyanG2)" opacity="0.85"/>
    <ellipse cx="0" cy="0" rx="34" ry="9" fill="url(#cyanG2)" opacity="0.85"/>
    <g transform="rotate(45)">
      <ellipse cx="0" cy="0" rx="9" ry="34" fill="url(#cyanG2)" opacity="0.85"/>
      <ellipse cx="0" cy="0" rx="34" ry="9" fill="url(#cyanG2)" opacity="0.85"/>
    </g>
    <path d="M 0,-14 Q 0,0 -14,0 Q 0,0 0,14 Q 0,0 14,0 Q 0,0 0,-14 Z" fill="#0F172A"/>
  </g>

  <!-- Brand Text -->
  <text x="105" y="66" font-family="'Plus Jakarta Sans', 'Times New Roman', Georgia, serif" font-weight="800" font-size="48" fill="#0F172A" letter-spacing="-1.5">doctronic</text>
</svg>'''

os.makedirs('assets/images/brands', exist_ok=True)
with open('assets/images/brands/doctronic-icon.svg', 'w', encoding='utf-8') as f:
    f.write(doctronic_icon_svg)

with open('assets/images/brands/doctronic.svg', 'w', encoding='utf-8') as f:
    f.write(doctronic_full_logo_svg)

print("Created Doctronic SVG logos in assets/images/brands/")
