import subprocess
import os

images = [
    {
        "url": "https://uflgame.com/wp-content/uploads/2026/04/FOOTM_2823_3840_2160_v02-scaled.webp",
        "base_name": "ufl-hero-official"
    },
    {
        "url": "https://uflgame.com/wp-content/uploads/2026/05/UFL-1920x1080_ENG-1.webp",
        "base_name": "ufl-gameplay-official"
    },
    {
        "url": "https://uflgame.com/wp-content/uploads/2026/05/UFL-Squad-Swap-Exlainer-Cover-1920x1080-1.webp",
        "base_name": "ufl-squad-webshop-official"
    },
    {
        "url": "https://uflgame.com/wp-content/uploads/2026/07/UFL-Pre-Season-Camp-TeamPass-KV2-1920x1080-1.webp",
        "base_name": "ufl-teampass-official"
    }
]

banners_dir = "assets/images/banners"
temp_dir = "temp_banners"
os.makedirs(temp_dir, exist_ok=True)
os.makedirs(banners_dir, exist_ok=True)

for item in images:
    temp_file = os.path.join(temp_dir, f"{item['base_name']}.webp")
    jpg_file = os.path.join(banners_dir, f"{item['base_name']}.jpg")
    png_file = os.path.join(banners_dir, f"{item['base_name']}.png")
    
    print(f"Downloading {item['url']} to {temp_file}...")
    subprocess.run(["curl", "-sSL", "-A", "Mozilla/5.0", item["url"], "-o", temp_file], check=True)
    
    print(f"Converting {temp_file} to true JPEG: {jpg_file}...")
    subprocess.run(["ffmpeg", "-y", "-i", temp_file, "-vf", "scale=1920:-1", "-q:v", "3", jpg_file], check=True)
    
    print(f"Converting {temp_file} to PNG: {png_file}...")
    subprocess.run(["ffmpeg", "-y", "-i", temp_file, "-vf", "scale=1920:-1", png_file], check=True)

print("Cleaning up temp files...")
subprocess.run(["rm", "-rf", temp_dir])

print("Conversion complete! Verifying files:")
subprocess.run(["file", "assets/images/banners/ufl-*.jpg"])
