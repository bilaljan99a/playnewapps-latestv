import urllib.request
import os
import base64

os.makedirs('assets/images/uniconverter', exist_ok=True)

# Map each review section to exact, verified high-resolution official Wondershare graphics
official_assets = [
    {
        'url': 'https://images.wondershare.com/videoconverter/v17index/pc-v17.png',
        'raw': 'assets/images/uniconverter/official-hero-dashboard.png',
        'svg': 'assets/images/uniconverter/uniconverter-hero-dashboard.svg',
        'title': 'Official Wondershare UniConverter Desktop Workspace'
    },
    {
        'url': 'https://images.wondershare.com/videoconverter/v17index/video-converter.png',
        'raw': 'assets/images/uniconverter/official-converter.png',
        'svg': 'assets/images/uniconverter/uniconverter-conversion-engine.svg',
        'title': 'Official Wondershare UniConverter 120x GPU Conversion Engine'
    },
    {
        'url': 'https://images.wondershare.com/videoconverter/2025/topaz-enhance-right.png',
        'raw': 'assets/images/uniconverter/official-ai-enhancer.png',
        'svg': 'assets/images/uniconverter/uniconverter-ai-tools.svg',
        'title': 'Official Wondershare UniConverter AI Video Enhancer & Neural Tools'
    },
    {
        'url': 'https://images.wondershare.com/videoconverter/v17index/video-compressor.png',
        'raw': 'assets/images/uniconverter/official-compressor.png',
        'svg': 'assets/images/uniconverter/uniconverter-video-compressor.svg',
        'title': 'Official Wondershare UniConverter Smart Video Compressor'
    },
    {
        'url': 'https://images.wondershare.com/videoconverter/video-test-2026/card-04-poster.png',
        'raw': 'assets/images/uniconverter/official-recorder.png',
        'svg': 'assets/images/uniconverter/uniconverter-screen-recorder.svg',
        'title': 'Official Wondershare UniConverter 4K Screen Recorder Studio'
    },
    {
        'url': 'https://images.wondershare.com/videoconverter/images2024/home/part-what-more-img2-1.jpg',
        'raw': 'assets/images/uniconverter/official-editor.jpg',
        'svg': 'assets/images/uniconverter/uniconverter-video-editor.svg',
        'title': 'Official Wondershare UniConverter Built-in Video Editor'
    },
    {
        'url': 'https://images.wondershare.com/videoconverter/images2024/home/part-what-more-img2-5.jpg',
        'raw': 'assets/images/uniconverter/official-dvd.jpg',
        'svg': 'assets/images/uniconverter/uniconverter-dvd-burner.svg',
        'title': 'Official Wondershare UniConverter DVD & Blu-ray Authoring Studio'
    },
    {
        'url': 'https://images.wondershare.com/videoconverter/v17index/07-translation-output.png',
        'raw': 'assets/images/uniconverter/official-subtitle.png',
        'svg': 'assets/images/uniconverter/uniconverter-subtitle-editor.svg',
        'title': 'Official Wondershare UniConverter AI Auto Subtitle & Translation'
    }
]

def make_svg(image_path, title):
    ext = os.path.splitext(image_path)[1].lower()
    mime = 'image/png' if ext == '.png' else 'image/jpeg'
    with open(image_path, 'rb') as f:
        b64 = base64.b64encode(f.read()).decode('utf-8')
    data_uri = f"data:{mime};base64,{b64}"

    return f'''<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1280 720" width="100%" height="100%" style="background:#020617;border-radius:16px;overflow:hidden;">
  <defs>
    <clipPath id="clipRounded">
      <rect width="1280" height="720" rx="16" ry="16"/>
    </clipPath>
  </defs>
  <g clip-path="url(#clipRounded)">
    <rect width="1280" height="720" fill="#020617"/>
    <image href="{data_uri}" xlink:href="{data_uri}" x="0" y="0" width="1280" height="720" preserveAspectRatio="xMidYMid contain"/>
  </g>
</svg>'''

for item in official_assets:
    print(f"Downloading {item['url']} -> {item['raw']}...")
    req = urllib.request.Request(item['url'], headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    with urllib.request.urlopen(req) as resp:
        with open(item['raw'], 'wb') as out_f:
            out_f.write(resp.read())
    
    svg_content = make_svg(item['raw'], item['title'])
    with open(item['svg'], 'w', encoding='utf-8') as out_svg:
        out_svg.write(svg_content)
    
    print(f"Successfully generated clean official SVG: {item['svg']} ({os.path.getsize(item['svg'])/1024:.1f} KB)")

print("ALL OFFICIAL WONDERSHARE ASSETS DOWNLOADED AND COMPILED!")
