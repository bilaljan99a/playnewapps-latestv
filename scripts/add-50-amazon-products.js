const fs = require('fs');
const path = require('path');

const PRODUCTS_FILE = path.join(__dirname, '..', 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8'));

console.log('Current total products:', products.length);

const newAmazonProducts = [
  {
    asin: 'B0CHWRXH8B',
    title: 'Apple AirPods Pro (2nd Generation) Wireless Earbuds with USB-C Charging',
    category: 'Audio & Headphones',
    categorySlug: 'tech',
    image: 'https://m.media-amazon.com/images/I/61SUj2aKoEL._AC_SL1200_.jpg',
    badge: '#1 Best Seller',
    rating: 4.7,
    reviewsCount: 38400,
    originalPrice: '$249.00',
    salePrice: '$189.00',
    discount: '24% OFF',
    highlights: [
      'Active Noise Cancellation reduces up to 2x more unwanted background noise',
      'Transparency mode lets outside sound in so you can hear what is happening around you',
      'Customized acoustic seal with four pairs of silicone ear tips (XS, S, M, L)',
      'Dust, sweat, and water resistant for AirPods Pro and MagSafe Charging Case (IP54)'
    ]
  },
  {
    asin: 'B0CHX545TC',
    title: 'Apple Watch Series 9 [GPS 41mm] Smartwatch with Midnight Aluminum Case',
    category: 'Smartwatches & Wearables',
    categorySlug: 'tech',
    image: 'https://m.media-amazon.com/images/I/71XMTLtZd5L._AC_SL1200_.jpg',
    badge: "Editor's Choice",
    rating: 4.6,
    reviewsCount: 14200,
    originalPrice: '$399.00',
    salePrice: '$329.00',
    discount: '18% OFF',
    highlights: [
      'S9 SiP chip enables a super-bright display and magical double tap gesture',
      'Advanced health insights including Blood Oxygen, ECG, and sleep stage tracking',
      'Comprehensive workout tracking with advanced metrics and heart rate zones',
      'Crash Detection and Fall Detection can automatically connect you with emergency services'
    ]
  },
  {
    asin: 'B0BJLXMVMV',
    title: 'Apple iPad (10th Generation): with A14 Bionic chip, 10.9-inch Liquid Retina Display',
    category: 'Tablets & Computing',
    categorySlug: 'tech',
    image: 'https://m.media-amazon.com/images/I/61goypdjAYL._AC_SL1200_.jpg',
    badge: "Amazon's Choice",
    rating: 4.8,
    reviewsCount: 28900,
    originalPrice: '$349.00',
    salePrice: '$299.00',
    discount: '14% OFF',
    highlights: [
      'Striking 10.9-inch Liquid Retina display with True Tone technology',
      'A14 Bionic chip delivers fast CPU and graphics performance for multitasking',
      'Landscape 12MP Ultra Wide front camera with Center Stage for immersive video calls',
      'Fast Wi-Fi 6 connectivity and all-day battery life with USB-C charging'
    ]
  },
  {
    asin: 'B09XS7JWHH',
    title: 'Sony WH-1000XM5 Wireless Industry Leading Noise Canceling Headphones',
    category: 'Audio & Headphones',
    categorySlug: 'tech',
    image: 'https://m.media-amazon.com/images/I/61VBCSttMFL._AC_SL1200_.jpg',
    badge: 'Top Rated',
    rating: 4.6,
    reviewsCount: 19800,
    originalPrice: '$399.99',
    salePrice: '$328.00',
    discount: '18% OFF',
    highlights: [
      'Two processors and 8 microphones deliver unprecedented noise-canceling performance',
      'Magnificent sound engineered with the lightweight Integrated Processor V1',
      'Crystal-clear hands-free calling with 4 beamforming microphones and noise reduction',
      'Up to 30-hour battery life with quick charging (3 min charge for 3 hours of playback)'
    ]
  },
  {
    asin: 'B0CCZ26B5V',
    title: 'Bose QuietComfort Ultra Wireless Noise Cancelling Over-Ear Headphones with Spatial Audio',
    category: 'Audio & Headphones',
    categorySlug: 'tech',
    image: 'https://m.media-amazon.com/images/I/51rpbVmg8tL._AC_SL1200_.jpg',
    badge: 'Premium Pick',
    rating: 4.5,
    reviewsCount: 8200,
    originalPrice: '$429.00',
    salePrice: '$379.00',
    discount: '12% OFF',
    highlights: [
      'Bose Immersive Audio pushes spatial boundaries for hyper-realistic audio immersion',
      'World-class active noise cancellation with Quiet Mode and Aware Mode',
      'CustomTune technology automatically tailors the sound profile to your ear shape',
      'Ultra-plush synthetic leather ear cushions with elevated aluminum headband design'
    ]
  },
  {
    asin: 'B0C33XXS56',
    title: 'Sony WF-1000XM5 The Best Truly Wireless Noise Canceling Earbuds',
    category: 'Audio & Headphones',
    categorySlug: 'tech',
    image: 'https://m.media-amazon.com/images/I/61S51d41f7L._AC_SL1200_.jpg',
    badge: "Amazon's Choice",
    rating: 4.4,
    reviewsCount: 7400,
    originalPrice: '$299.99',
    salePrice: '$248.00',
    discount: '17% OFF',
    highlights: [
      'Dynamic Driver X delivers wide frequency reproduction and rich, detailed vocals',
      'Dual feedback microphones and noise isolation earbud tips for superior ANC',
      'Multipoint connection lets you pair two Bluetooth devices simultaneously',
      'Compact, lightweight ergonomic design with 24 hours total battery life with case'
    ]
  },
  {
    asin: 'B09TMN58KL',
    title: 'Amazon Kindle Paperwhite (16 GB) – Now with a 6.8-inch display and adjustable warm light',
    category: 'E-Readers & Tablets',
    categorySlug: 'tech',
    image: 'https://m.media-amazon.com/images/I/61q3j7-f1xL._AC_SL1200_.jpg',
    badge: '#1 Best Seller',
    rating: 4.7,
    reviewsCount: 42100,
    originalPrice: '$149.99',
    salePrice: '$124.99',
    discount: '17% OFF',
    highlights: [
      '6.8-inch glare-free 300 ppi display reads like real paper even in bright sunlight',
      'Adjustable warm light to shift screen shade from white to amber for night reading',
      'Waterproof (IPX8) reading protection at the beach, pool, or bath',
      'Single charge via USB-C lasts up to 10 weeks of continuous reading'
    ]
  },
  {
    asin: 'B0BSHF7WHW',
    title: 'Amazon Echo Show 8 (3rd Gen, 2023 release) | HD smart display with spatial audio and smart home hub',
    category: 'Smart Home & Displays',
    categorySlug: 'tech',
    image: 'https://m.media-amazon.com/images/I/51O1O-jZpIL._AC_SL1200_.jpg',
    badge: 'Prime Deal',
    rating: 4.5,
    reviewsCount: 16700,
    originalPrice: '$149.99',
    salePrice: '$99.99',
    discount: '33% OFF',
    highlights: [
      '8-inch HD touchscreen with adaptive color adjusts dynamically to room lighting',
      'Spatial audio provides room-filling sound with enhanced clarity and deep bass',
      'Centrally mounted 13MP camera with auto-framing keeps you centered during video calls',
      'Built-in smart home hub compatible with Zigbee, Matter, and Thread devices'
    ]
  },
  {
    asin: 'B0BP9MDCQZ',
    title: 'Amazon Fire TV Stick 4K Max streaming device, supports Wi-Fi 6E, ambient experience',
    category: 'Streaming & Home Theater',
    categorySlug: 'tech',
    image: 'https://m.media-amazon.com/images/I/51y1-B4A1-L._AC_SL1200_.jpg',
    badge: '#1 Best Seller',
    rating: 4.6,
    reviewsCount: 68500,
    originalPrice: '$59.99',
    salePrice: '$39.99',
    discount: '33% OFF',
    highlights: [
      'Powerful 2.0 GHz quad-core processor delivers lightning-fast app launch times',
      'Wi-Fi 6E support ensures smooth 4K streaming even on congested networks',
      'Vibrant 4K Ultra HD with Dolby Vision, HDR10+, and immersive Dolby Atmos audio',
      'Fire TV Ambient Experience turns your TV into an in-home art gallery'
    ]
  },
  {
    asin: 'B09HM94VDS',
    title: 'Logitech MX Master 3S Wireless Performance Mouse with Quiet Clicks, 8K DPI Sensor',
    category: 'Computer Accessories',
    categorySlug: 'tech',
    image: 'https://m.media-amazon.com/images/I/61ni3t1ryQL._AC_SL1200_.jpg',
    badge: "Amazon's Choice",
    rating: 4.7,
    reviewsCount: 15300,
    originalPrice: '$99.99',
    salePrice: '$89.99',
    discount: '10% OFF',
    highlights: [
      '8,000 DPI track-on-glass optical sensor tracks anywhere, even on glass surfaces',
      'Quiet Click buttons deliver satisfying tactile feel with 90% less click noise',
      'MagSpeed electromagnetic scroll wheel scrolls up to 1,000 lines per second',
      'Ergonomic silhouette crafted for hand comfort with intuitive thumb controls'
    ]
  },
  {
    asin: 'B09LK2QVG2',
    title: 'Logitech MX Mechanical Wireless Illuminated Performance Keyboard, Tactile Quiet Switches',
    category: 'Computer Accessories',
    categorySlug: 'tech',
    image: 'https://m.media-amazon.com/images/I/71r4qE1a4RL._AC_SL1200_.jpg',
    badge: 'Top Rated',
    rating: 4.6,
    reviewsCount: 4800,
    originalPrice: '$169.99',
    salePrice: '$144.99',
    discount: '15% OFF',
    highlights: [
      'Low-profile mechanical switches offer smooth, precise tactile feedback with quiet actuation',
      'Smart illumination backlighting lights up as hands approach and adapts to room conditions',
      'Pair with up to 3 devices across macOS, Windows, Linux, and iOS via Bluetooth or Logi Bolt',
      'USB-C quick recharge lasts up to 15 days or up to 10 months with backlighting off'
    ]
  },
  {
    asin: 'B0B8QF9B4F',
    title: 'SteelSeries Arctis Nova 7 Wireless Multi-Platform Gaming & Mobile Headset',
    category: 'PC Gaming Gear',
    categorySlug: 'tech',
    image: 'https://m.media-amazon.com/images/I/71K2U8yY5nL._AC_SL1200_.jpg',
    badge: 'Amazon Best Seller',
    rating: 4.5,
    reviewsCount: 6200,
    originalPrice: '$179.99',
    salePrice: '$149.99',
    discount: '17% OFF',
    highlights: [
      'Almighty Audio combines high-fidelity custom hardware with Sonar Software audio suite',
      '360° Spatial Audio delivers pinpoint directional awareness in competitive games',
      'Simultaneous 2.4GHz gaming wireless and mobile Bluetooth audio mixing',
      '38-hour battery life with USB-C fast charge (15 minutes gives 6 hours of playtime)'
    ]
  },
  {
    asin: 'B0B6Y7L81G',
    title: 'Razer DeathAdder V3 Pro Wireless Gaming Mouse: 63g Ultra-Lightweight, Focus Pro 30K Sensor',
    category: 'PC Gaming Gear',
    categorySlug: 'tech',
    image: 'https://m.media-amazon.com/images/I/61N+V352b2L._AC_SL1200_.jpg',
    badge: 'Pro Choice',
    rating: 4.5,
    reviewsCount: 5100,
    originalPrice: '$149.99',
    salePrice: '$119.99',
    discount: '20% OFF',
    highlights: [
      '63g ultra-lightweight ergonomic shape co-developed with top esports pros',
      'Focus Pro 30K Optical Sensor provides flawless tracking on diverse surfaces including glass',
      'Optical Mouse Switches Gen-3 rated for 90 million clicks with zero double-clicking issues',
      'Up to 90 hours of uninterrupted ultra-low latency wireless battery performance'
    ]
  },
  {
    asin: 'B0C77K1Z4Z',
    title: 'ASUS ROG Ally 7-inch 120Hz Gaming Handheld - AMD Ryzen Z1 Extreme, 512GB SSD',
    category: 'PC Gaming & Handhelds',
    categorySlug: 'tech',
    image: 'https://m.media-amazon.com/images/I/61P0Q7Vv+nL._AC_SL1200_.jpg',
    badge: "Editor's Choice",
    rating: 4.3,
    reviewsCount: 3800,
    originalPrice: '$699.99',
    salePrice: '$599.99',
    discount: '14% OFF',
    highlights: [
      'AMD Ryzen Z1 Extreme Processor delivers cutting-edge handheld graphics power',
      '7-inch 120Hz Full HD (1080p) touchscreen with AMD FreeSync Premium smoothness',
      'Runs full Windows 11 with access to Steam, Xbox Game Pass, Epic Games, and GOG',
      'ROG Zero Gravity thermal cooling system ensures quiet and efficient heat dissipation'
    ]
  },
  {
    asin: 'B09VLK9W3S',
    title: 'SAMSUNG T7 Shield 2TB, Portable SSD, up to 1050MB/s, USB 3.2 Gen2, Rugged, IP65',
    category: 'Data Storage & Memory',
    categorySlug: 'tech',
    image: 'https://m.media-amazon.com/images/I/61RkWZ25qFL._AC_SL1200_.jpg',
    badge: '#1 Best Seller',
    rating: 4.8,
    reviewsCount: 24700,
    originalPrice: '$284.99',
    salePrice: '$189.99',
    discount: '33% OFF',
    highlights: [
      'Transfer huge files in seconds with sequential read/write speeds up to 1,050/1,000 MB/s',
      'IP65 water, dust, and shock resistance with rugged elastomer outer casing',
      'Compatible with PC, Mac, Android devices, gaming consoles, and 4K video cameras',
      'Dynamic Thermal Guard controls heat to maintain optimal performance speeds'
    ]
  },
  {
    asin: 'B08GTYFC37',
    title: 'SanDisk 1TB Extreme Portable SSD - Up to 1050MB/s, USB-C, USB 3.2 Gen 2, IP55',
    category: 'Data Storage & Memory',
    categorySlug: 'tech',
    image: 'https://m.media-amazon.com/images/I/71YOGWbJ5iL._AC_SL1200_.jpg',
    badge: "Amazon's Choice",
    rating: 4.7,
    reviewsCount: 59300,
    originalPrice: '$149.99',
    salePrice: '$104.99',
    discount: '30% OFF',
    highlights: [
      'NVMe solid state performance featuring 1050MB/s read and 1000MB/s write speeds',
      'Up to 3-meter drop protection and IP55 water and dust resistance rating',
      'Handy carabiner loop to secure the drive to your belt loop or backpack',
      'Password protection featuring 256-bit AES hardware encryption'
    ]
  },
  {
    asin: 'B09VPHVT2Z',
    title: 'Anker 737 Power Bank (PowerCore 24K), 24,000mAh 3-Port Portable Charger with 140W Output',
    category: 'Chargers & Power',
    categorySlug: 'tech',
    image: 'https://m.media-amazon.com/images/I/61N9p7X6pTL._AC_SL1200_.jpg',
    badge: 'Top Rated',
    rating: 4.7,
    reviewsCount: 14800,
    originalPrice: '$149.99',
    salePrice: '$109.99',
    discount: '27% OFF',
    highlights: [
      'Equipped with Power Delivery 3.1 and bi-directional technology to quickly recharge the bank',
      'High 24,000mAh capacity provides multiple charges for laptops, tablets, and phones',
      'Smart digital display shows real-time output/input wattage and estimated recharge time',
      'ActiveShield 2.0 temperature monitoring safeguards connected electronics continuously'
    ]
  },
  {
    asin: 'B0C7GH6FVD',
    title: 'Anker Prime 6-in-1 Charging Station, 140W USB-C Power Strip with Smart Digital Display',
    category: 'Chargers & Power',
    categorySlug: 'tech',
    image: 'https://m.media-amazon.com/images/I/61iPjJ5B1cL._AC_SL1200_.jpg',
    badge: "Amazon's Choice",
    rating: 4.6,
    reviewsCount: 2600,
    originalPrice: '$109.99',
    salePrice: '$79.99',
    discount: '27% OFF',
    highlights: [
      'Ultra-compact 6-in-1 design includes 2 AC outlets, 2 USB-C ports, and 2 USB-A ports',
      'Maximum 140W high-speed charging powers MacBook Pro to 50% in just 28 minutes',
      'Ultra-thin 0.7-inch profile with flat AC plug designed to fit tight desk workspaces',
      'Built-in smart display offers real-time wattage tracking across every plugged-in device'
    ]
  },
  {
    asin: 'B0CDX1GQG3',
    title: 'DJI Mini 4 Pro (DJI RC 2), Mini Drone with 4K HDR Video Camera, Omnidirectional Obstacle Sensing',
    category: 'Drones & Photography',
    categorySlug: 'tech',
    image: 'https://m.media-amazon.com/images/I/61y88LgD6PL._AC_SL1200_.jpg',
    badge: "Editor's Choice",
    rating: 4.7,
    reviewsCount: 3100,
    originalPrice: '$959.00',
    salePrice: '$859.00',
    discount: '10% OFF',
    highlights: [
      'Sub-249g ultra-lightweight folding design requires no FAA registration in most regions',
      'Omnidirectional Active Obstacle Sensing ensures safe flight navigation in complex areas',
      '4K/60fps HDR True Vertical Shooting for direct, high-definition social media content',
      'Up to 34 minutes of flight time with up to 20 km FHD video transmission range'
    ]
  },
  {
    asin: 'B0CGN9374C',
    title: 'GoPro HERO12 Black - Waterproof Action Camera with 5.3K60 Ultra HD Video, 27MP Photos, HDR',
    category: 'Cameras & Video',
    categorySlug: 'tech',
    image: 'https://m.media-amazon.com/images/I/61P-96xU9zL._AC_SL1200_.jpg',
    badge: 'Amazon Best Seller',
    rating: 4.5,
    reviewsCount: 4900,
    originalPrice: '$399.99',
    salePrice: '$299.99',
    discount: '25% OFF',
    highlights: [
      'High Dynamic Range (HDR) video captures vivid detail and balanced highlights in shadows',
      'HyperSmooth 6.0 video stabilization with 360° Horizon Lock delivers gimbal-like smoothness',
      'Rugged, waterproof housing withstands depths up to 33 feet (10m) right out of the box',
      'Up to 2x longer continuous runtime with included Enduro rechargeable cold-weather battery'
    ]
  },
  {
    asin: 'B0B8XHQ9V1',
    title: 'Insta360 X3 - Waterproof 360 Action Camera with 1/2" 48MP Sensors, 5.7K 360 Video',
    category: 'Cameras & Video',
    categorySlug: 'tech',
    image: 'https://m.media-amazon.com/images/I/51wNqK8g6iL._AC_SL1200_.jpg',
    badge: "Creator's Choice",
    rating: 4.5,
    reviewsCount: 4100,
    originalPrice: '$449.99',
    salePrice: '$399.99',
    discount: '11% OFF',
    highlights: [
      '5.7K 360 Active HDR capture allows reframing your shots after shooting in the app',
      'Massive 1/2" 48MP image sensors capture superior clarity and vibrant low-light detail',
      'Invisible Selfie Stick effect automatically erases the stick from your final videos',
      'Vibrant 2.29" tempered glass touchscreen for ultra-easy camera control and previews'
    ]
  },
  {
    asin: 'B09738CV2G',
    title: 'Elgato Stream Deck MK.2 – Studio Controller, 15 Macro Keys, Trigger Actions in Apps and Software',
    category: 'Streaming & Creator Gear',
    categorySlug: 'tech',
    image: 'https://m.media-amazon.com/images/I/61pD7x2+TzL._AC_SL1200_.jpg',
    badge: '#1 Best Seller',
    rating: 4.8,
    reviewsCount: 18200,
    originalPrice: '$149.99',
    salePrice: '$129.99',
    discount: '13% OFF',
    highlights: [
      '15 customizable LCD keys to trigger unlimited actions with instantaneous visual feedback',
      'Deep integration with OBS Studio, Twitch, YouTube, Spotify, Discord, Philips Hue, and more',
      'Hotkeys, scene transitions, audio adjustments, and smart macro chains in a single tap',
      'Detachable desktop stand and swappable magnetic faceplate for custom workstation aesthetics'
    ]
  },
  {
    asin: 'B08G7RG9ML',
    title: 'Shure MV7 USB Microphone for Podcasting, Recording, Live Streaming & Gaming',
    category: 'Microphones & Audio',
    categorySlug: 'tech',
    image: 'https://m.media-amazon.com/images/I/61J2yT3YpBL._AC_SL1200_.jpg',
    badge: "Amazon's Choice",
    rating: 4.7,
    reviewsCount: 11400,
    originalPrice: '$249.00',
    salePrice: '$219.00',
    discount: '12% OFF',
    highlights: [
      'Dual USB/XLR outputs allow digital recording or connection to analog audio interfaces',
      'Voice Isolation Technology uses a laser-focused dynamic capsule to reject room noise',
      'Intuitive touch panel interface for volume control, headphone monitoring, and mic mute',
      'ShurePlus MOTIV desktop software provides Auto Level Mode and custom EQ presets'
    ]
  },
  {
    asin: 'B00HVLUR86',
    title: 'Audio-Technica ATH-M50x Professional Studio Monitor Headphones, Black',
    category: 'Audio & Headphones',
    categorySlug: 'tech',
    image: 'https://m.media-amazon.com/images/I/71m4+6Kq3zL._AC_SL1200_.jpg',
    badge: '#1 Best Seller',
    rating: 4.7,
    reviewsCount: 43200,
    originalPrice: '$169.00',
    salePrice: '$149.00',
    discount: '12% OFF',
    highlights: [
      'Critically acclaimed sonic performance praised by top audio engineers and pro reviewers',
      'Proprietary 45mm large-aperture drivers with copper-clad aluminum wire voice coils',
      'Circumaural design contours around ears for excellent sound isolation in loud settings',
      '90° swiveling earcups for easy, one-ear monitoring and collapsible portability'
    ]
  },
  {
    asin: 'B09XXWKVJ1',
    title: 'Marshall Emberton II Portable Bluetooth Speaker - Black and Brass, 30+ Hours Playtime',
    category: 'Audio & Speakers',
    categorySlug: 'tech',
    image: 'https://m.media-amazon.com/images/I/71h3K7+Y+KL._AC_SL1200_.jpg',
    badge: 'Top Rated',
    rating: 4.6,
    reviewsCount: 6300,
    originalPrice: '$169.99',
    salePrice: '$139.99',
    discount: '18% OFF',
    highlights: [
      'True Stereophonic multi-directional sound delivers rich, 360-degree room audio',
      '30+ hours of portable playtime on a single charge with fast charging capability',
      'Durable roadworthy design with rugged silicone exterior and solid metal grill (IP67)',
      'Stack Mode lets you connect multiple Emberton II speakers for an amplified soundstage'
    ]
  },
  {
    asin: 'B09G3C799C',
    title: 'JBL Flip 6 - Portable Bluetooth Speaker, Powerful Sound and Deep Bass, IP67 Waterproof',
    category: 'Audio & Speakers',
    categorySlug: 'tech',
    image: 'https://m.media-amazon.com/images/I/61e7k8i13BL._AC_SL1200_.jpg',
    badge: '#1 Best Seller',
    rating: 4.7,
    reviewsCount: 31200,
    originalPrice: '$129.95',
    salePrice: '$99.95',
    discount: '23% OFF',
    highlights: [
      '2-way speaker system delivers loud, crystal clear audio with racetrack-shaped woofer',
      'IP67 waterproof and dustproof rating allows you to bring your music anywhere outdoors',
      '12 hours of playtime on a single charge to keep the party going day and night',
      'PartyBoost compatibility lets you pair two JBL PartyBoost-compatible speakers in stereo'
    ]
  },
  {
    asin: 'B09NBK2GFW',
    title: 'Belkin BoostCharge Pro 3-in-1 Wireless Charger with Official MagSafe 15W Fast Charging',
    category: 'Chargers & Accessories',
    categorySlug: 'tech',
    image: 'https://m.media-amazon.com/images/I/61-dJ7iLhRL._AC_SL1200_.jpg',
    badge: "Editor's Choice",
    rating: 4.6,
    reviewsCount: 8700,
    originalPrice: '$149.99',
    salePrice: '$119.99',
    discount: '20% OFF',
    highlights: [
      'Official MagSafe technology delivers up to 15W fast wireless charging for iPhone',
      'Simultaneously charge your iPhone, Apple Watch, and AirPods wirelessly in one stand',
      'Architectural stainless steel arm design holds phone in portrait or landscape mode',
      'LED indicator light confirms safe, foreign-object-free wireless charging status'
    ]
  },
  {
    asin: 'B09WZQL3F6',
    title: 'Ring Battery Doorbell Plus | Smart Video Doorbell with Head-to-Toe HD+ Video and Motion Alerts',
    category: 'Smart Home Security',
    categorySlug: 'tech',
    image: 'https://m.media-amazon.com/images/I/51r26rF0o2L._AC_SL1200_.jpg',
    badge: 'Amazon Best Seller',
    rating: 4.6,
    reviewsCount: 14500,
    originalPrice: '$149.99',
    salePrice: '$119.99',
    discount: '20% OFF',
    highlights: [
      'Head-to-Toe HD+ video with 1536p resolution provides an expanded field of view',
      'Color Night Vision lets you see clear color video details even after the sun goes down',
      'Two-Way Talk with noise cancellation allows you to speak to visitors from anywhere',
      'Custom motion zones alert your smartphone whenever visitors approach your front door'
    ]
  },
  {
    asin: 'B0B1N5KKS2',
    title: 'Blink Outdoor 4 (4th Gen) Wire-Free Smart Security Camera, Two-Year Battery Life, HD Live View',
    category: 'Smart Home Security',
    categorySlug: 'tech',
    image: 'https://m.media-amazon.com/images/I/51x88RjYVlL._AC_SL1200_.jpg',
    badge: 'Prime Deal',
    rating: 4.3,
    reviewsCount: 28400,
    originalPrice: '$119.99',
    salePrice: '$71.99',
    discount: '40% OFF',
    highlights: [
      'Wire-free weather-resistant security camera with up to two years of battery life',
      '1080p HD live view with enhanced infrared night vision and crisp two-way audio',
      'Person detection alerts using computer vision with Blink Subscription Plan',
      'Easy DIY setup in minutes with no wiring or professional installation required'
    ]
  },
  {
    asin: 'B09VW5KG2B',
    title: 'TP-Link Deco AXE5400 Tri-Band WiFi 6E Mesh System (Deco XE75) - Covers up to 7200 Sq.Ft',
    category: 'Networking & WiFi',
    categorySlug: 'tech',
    image: 'https://m.media-amazon.com/images/I/61Nl8Rk6YcL._AC_SL1200_.jpg',
    badge: "Amazon's Choice",
    rating: 4.5,
    reviewsCount: 9800,
    originalPrice: '$299.99',
    salePrice: '$219.99',
    discount: '27% OFF',
    highlights: [
      'Brand new 6GHz band brings dedicated bandwidth without interference from older devices',
      'AI-driven mesh roaming seamlessly learns your network environment for optimal coverage',
      'Tri-Band speeds up to 5400 Mbps connect up to 200 devices without lag',
      'TP-Link HomeShield provides premium network security and robust parental controls'
    ]
  },
  {
    asin: 'B07G115X4H',
    title: 'Philips Hue White and Color Ambiance Smart 75W A19 LED Bulb Starter Kit (4 Bulbs + Hue Bridge)',
    category: 'Smart Home Lighting',
    categorySlug: 'tech',
    image: 'https://m.media-amazon.com/images/I/71lR4k6tO2L._AC_SL1200_.jpg',
    badge: 'Top Rated',
    rating: 4.6,
    reviewsCount: 8200,
    originalPrice: '$199.99',
    salePrice: '$159.99',
    discount: '20% OFF',
    highlights: [
      'Choose from 16 million colors and 50,000 shades of warm-to-cool white light',
      'Included Hue Bridge unlocks whole-home automations, out-of-home control, and smart switches',
      'Sync smart lighting with movies, gaming, and Spotify music for captivating ambiance',
      'Works seamlessly with Alexa, Apple HomeKit, and Google Assistant for hands-free voice control'
    ]
  },
  {
    asin: 'B0C28X5Y3L',
    title: 'Dyson V8 Cordless Vacuum Cleaner, Powerful Suction, Lightweight, De-tangling Motorbar',
    category: 'Home & Lifestyle',
    categorySlug: 'lifestyle',
    image: 'https://m.media-amazon.com/images/I/61U0j8ZlVCL._AC_SL1200_.jpg',
    badge: '#1 Best Seller',
    rating: 4.5,
    reviewsCount: 17300,
    originalPrice: '$469.99',
    salePrice: '$349.99',
    discount: '26% OFF',
    highlights: [
      'Engineered for everyday cleaning with powerful fade-free suction across hard floors and carpets',
      'Motorbar cleaner head deep cleans carpets and automatically clears wrapped hair from brush bar',
      'Converts to a handheld vacuum for car interiors, stairs, and tight upholstery spaces',
      'Advanced whole-machine filtration traps 99.99% of microscopic particles as small as 0.3 microns'
    ]
  },
  {
    asin: 'B0BY9L4P4R',
    title: 'Roborock Q Revo Robot Vacuum and Mop with Multifunctional Dock, Auto-Drying, 5500Pa Suction',
    category: 'Smart Home & Cleaning',
    categorySlug: 'lifestyle',
    image: 'https://m.media-amazon.com/images/I/71N7M2Jz6OL._AC_SL1200_.jpg',
    badge: "Editor's Choice",
    rating: 4.5,
    reviewsCount: 4800,
    originalPrice: '$899.99',
    salePrice: '$699.99',
    discount: '22% OFF',
    highlights: [
      'All-in-one dock auto-washes dual spinning mops and hot-air dries them to prevent odors',
      '5,500 Pa extreme suction picks up stubborn debris and pet hair with an all-rubber brush',
      'Auto mop lifting rises 7mm over carpets to vacuum and mop in a single automated session',
      'PreciSense LiDAR navigation and reactive tech obstacle avoidance navigate precisely'
    ]
  },
  {
    asin: 'B07FDJMC9Q',
    title: 'Ninja AF101 Air Fryer that Crisps, Roasts, Reheats, & Dehydrates, 4-Quart Capacity, Grey',
    category: 'Kitchen & Appliances',
    categorySlug: 'lifestyle',
    image: 'https://m.media-amazon.com/images/I/71m4-Z4vj4L._AC_SL1200_.jpg',
    badge: '#1 Best Seller',
    rating: 4.8,
    reviewsCount: 88500,
    originalPrice: '$129.99',
    salePrice: '$89.99',
    discount: '31% OFF',
    highlights: [
      'Guilt-free fried favorites with up to 75% less fat than traditional deep-frying methods',
      'Wide temperature range from 105°F to 400°F gently removes moisture or flash-cooks food',
      '4-quart ceramic-coated nonstick basket fits up to 2 lbs of French fries easily',
      'Dishwasher-safe parts include nonstick basket, crisper plate, and multi-layer rack'
    ]
  },
  {
    asin: 'B08WCLJ7JG',
    title: 'Instant Pot Duo Plus 9-in-1 Electric Pressure Cooker, Slow Cooker, Rice Cooker, Steamer, 6 Quart',
    category: 'Kitchen & Appliances',
    categorySlug: 'lifestyle',
    image: 'https://m.media-amazon.com/images/I/71K1jN6r-zL._AC_SL1200_.jpg',
    badge: "Amazon's Choice",
    rating: 4.7,
    reviewsCount: 42100,
    originalPrice: '$129.95',
    salePrice: '$99.95',
    discount: '23% OFF',
    highlights: [
      '9-in-1 functionality: pressure cook, slow cook, rice cooker, yogurt maker, steamer, and sous vide',
      'Easy-to-read display with full cooking progress bar and simple one-touch smart programs',
      'Food-grade stainless-steel (18/8) cooking pot with tri-ply bottom for even heat distribution',
      'Whisper-quiet steam release switch protects hands from hot steam automatically'
    ]
  },
  {
    asin: 'B00XBOXVIA',
    title: 'Breville Smart Oven Pro Convection Toaster Oven, Brushed Stainless Steel, Element iQ System',
    category: 'Kitchen & Appliances',
    categorySlug: 'lifestyle',
    image: 'https://m.media-amazon.com/images/I/81kF6hLzW6L._AC_SL1200_.jpg',
    badge: "Chef's Choice",
    rating: 4.7,
    reviewsCount: 14200,
    originalPrice: '$329.95',
    salePrice: '$279.95',
    discount: '15% OFF',
    highlights: [
      'Element iQ system directs 1800W heat precisely across 5 independent quartz heating elements',
      '10 preset cooking functions: Toast, Bagel, Bake, Roast, Broil, Pizza, Cookies, Reheat, Warm, Slow Cook',
      'Built-in convection fan circulates hot air for up to 30% faster roasting times',
      'Interior oven light with auto shut-off illuminates the spacious 6-slice / 13-inch pizza interior'
    ]
  },
  {
    asin: 'B01N6TVX1Q',
    title: "Nespresso VertuoPlus Coffee and Espresso Maker by De'Longhi, Matte Black, Single Serve Machine",
    category: 'Coffee & Kitchen',
    categorySlug: 'lifestyle',
    image: 'https://m.media-amazon.com/images/I/71p0g5X4RIL._AC_SL1200_.jpg',
    badge: '#1 Best Seller',
    rating: 4.6,
    reviewsCount: 21800,
    originalPrice: '$199.00',
    salePrice: '$149.00',
    discount: '25% OFF',
    highlights: [
      'Centrifusion extraction technology spins capsules at 7,000 RPM to craft signature crema',
      'Brews 5 distinct cup sizes: 5 oz, 8 oz, 14 oz coffee, as well as single and double espresso',
      'Barcode reading technology automatically adjusts brewing parameters for each coffee blend',
      'Moveable 60 oz water reservoir swivels to fit snugly on any kitchen countertop corner'
    ]
  },
  {
    asin: 'B07X5BC21W',
    title: 'Ember Temperature Control Smart Mug 2, 14 oz, App-Controlled Heated Coffee Mug, 80 Min Battery',
    category: 'Smart Home & Kitchen',
    categorySlug: 'lifestyle',
    image: 'https://m.media-amazon.com/images/I/51fFzN8Q+SL._AC_SL1200_.jpg',
    badge: 'Gift Pick',
    rating: 4.4,
    reviewsCount: 9100,
    originalPrice: '$179.95',
    salePrice: '$149.95',
    discount: '17% OFF',
    highlights: [
      'Set your precise drinking temperature between 120°F and 145°F and maintain it for 80 minutes',
      'All-day heat retention when used with the included scratch-resistant charging coaster',
      'Auto-sleep sensor detects when liquid is empty or mug is inactive to save battery',
      'Pair with Ember smartphone app to customize temperature presets and receive notifications'
    ]
  },
  {
    asin: 'B0CFW5C68Q',
    title: 'Oura Ring Gen3 Horizon - Smart Ring for Sleep Tracking, Heart Rate, Activity & Readiness Score',
    category: 'Health & Wearables',
    categorySlug: 'lifestyle',
    image: 'https://m.media-amazon.com/images/I/51w7Q6R5p8L._AC_SL1200_.jpg',
    badge: "Editor's Choice",
    rating: 4.4,
    reviewsCount: 3200,
    originalPrice: '$349.00',
    salePrice: '$299.00',
    discount: '14% OFF',
    highlights: [
      'Sleek titanium smart ring delivers lab-grade biometric accuracy directly from your finger pulse',
      'Tracks sleep stages (REM, deep, light), daytime heart rate, skin temperature, and SpO2 oxygen',
      'Daily Readiness Score evaluates how well your body recovered to guide workout intensity',
      'Lightweight, waterproof to 100m, and holds up to 7 days of continuous battery life'
    ]
  },
  {
    asin: 'B0CDP3C6NL',
    title: 'Fitbit Charge 6 Fitness Tracker with Google Apps, Heart Rate, Built-in GPS, 7-Day Battery',
    category: 'Fitness & Wearables',
    categorySlug: 'lifestyle',
    image: 'https://m.media-amazon.com/images/I/61k8f5d0VPL._AC_SL1200_.jpg',
    badge: 'Amazon Best Seller',
    rating: 4.3,
    reviewsCount: 8400,
    originalPrice: '$159.95',
    salePrice: '$139.95',
    discount: '13% OFF',
    highlights: [
      'Google integration brings Google Maps turn-by-turn navigation and Google Wallet payments to wrist',
      'Up to 60% more accurate heart rate tracking during intense HIIT and cycling workouts',
      'Built-in GPS tracks pace and outdoor distance in real-time without needing your smartphone',
      'Over 40 exercise modes with 24/7 heart rate monitoring and up to 7 days of battery life'
    ]
  },
  {
    asin: 'B083L4694N',
    title: 'Therabody Theragun Prime - Bluetooth Percussive Therapy Deep Tissue Muscle Massage Gun',
    category: 'Health & Recovery',
    categorySlug: 'lifestyle',
    image: 'https://m.media-amazon.com/images/I/61+eXp2Xy7L._AC_SL1200_.jpg',
    badge: 'Pro Athlete Choice',
    rating: 4.7,
    reviewsCount: 5200,
    originalPrice: '$299.00',
    salePrice: '$249.00',
    discount: '17% OFF',
    highlights: [
      '16mm amplitude reaches 60% deeper into muscle tissue than standard consumer vibration massagers',
      'Patented ergonomic multi-grip handle design reduces strain on wrists and arms during treatment',
      'QuietForce Technology motor delivers up to 30 lbs of stall force without loud rattling noise',
      'Bluetooth connectivity pairs with Therabody app for guided wellness routines and customized speeds'
    ]
  },
  {
    asin: 'B0BT5F9N8Y',
    title: 'Garmin Forerunner 265 Running Smartwatch, Colorful AMOLED Touchscreen Display, Training Metrics',
    category: 'Sports & Fitness',
    categorySlug: 'lifestyle',
    image: 'https://m.media-amazon.com/images/I/61s8-L3FjZL._AC_SL1200_.jpg',
    badge: 'Top Rated',
    rating: 4.7,
    reviewsCount: 2800,
    originalPrice: '$449.99',
    salePrice: '$399.99',
    discount: '11% OFF',
    highlights: [
      'Vivid 1.3-inch AMOLED touchscreen with responsive traditional 5-button athlete layout',
      'Morning Report synthesizes sleep score, HRV status, recovery guidance, and weather outlook',
      'Training Readiness score tells you whether today is optimal for a tough workout or rest',
      'Multi-band GNSS with SatIQ technology delivers pinpoint positioning accuracy in dense cities'
    ]
  },
  {
    asin: 'B0CX246B5J',
    title: 'Stanley Quencher H2.0 FlowState Stainless Steel Vacuum Insulated Tumbler with Lid and Straw, 40 oz',
    category: 'Hydration & Lifestyle',
    categorySlug: 'lifestyle',
    image: 'https://m.media-amazon.com/images/I/71tQ8V6bYOL._AC_SL1200_.jpg',
    badge: '#1 Best Seller',
    rating: 4.7,
    reviewsCount: 48900,
    originalPrice: '$45.00',
    salePrice: '$45.00',
    discount: 'Best Value',
    highlights: [
      'Double-wall vacuum insulation keeps iced drinks frosty cold for up to 48 hours',
      'FlowState rotating 3-position lid: a straw opening, drink opening, and full-cover splash guard',
      'Constructed with 90% recycled BPA-free 18/8 food-grade stainless steel for lifetime durability',
      'Ergonomic comfort-grip handle and slim base designed to fit standard car cup holders'
    ]
  },
  {
    asin: 'B083G7B74V',
    title: 'Hydro Flask Stainless Steel Wide Mouth Water Bottle with Flex Straw Lid, 32 oz',
    category: 'Hydration & Outdoors',
    categorySlug: 'lifestyle',
    image: 'https://m.media-amazon.com/images/I/61w7-O2Z9-L._AC_SL1200_.jpg',
    badge: "Amazon's Choice",
    rating: 4.8,
    reviewsCount: 36200,
    originalPrice: '$44.95',
    salePrice: '$35.95',
    discount: '20% OFF',
    highlights: [
      'TempShield double-wall vacuum insulation keeps beverages cold for up to 24 hours',
      'Flex Straw Lid is leakproof when closed and allows easy one-handed sipping on the go',
      'Pro-grade 18/8 stainless steel construction ensures pure taste with no flavor transfer',
      'Color Last powder coat is slip-free, sweat-free, and 100% dishwasher safe'
    ]
  },
  {
    asin: 'B003W3W94C',
    title: 'YETI Tundra 45 Cooler, Premium Outdoor Insulated Hard Ice Chest with Tie-Down Slots',
    category: 'Outdoor & Adventure',
    categorySlug: 'lifestyle',
    image: 'https://m.media-amazon.com/images/I/81k3S1iYlZL._AC_SL1200_.jpg',
    badge: 'Rugged Pick',
    rating: 4.8,
    reviewsCount: 14700,
    originalPrice: '$325.00',
    salePrice: '$300.00',
    discount: '8% OFF',
    highlights: [
      'Rotomolded construction makes the Tundra virtually indestructible and certified bear-resistant',
      'PermaFrost insulation and FatWall design deliver multi-day ice retention in extreme heat',
      'Heavy-duty T-Rex rubber lid latches built with patented tech so they never break',
      'Non-slip BearFoot rubber feet keep the cooler securely planted on boat decks and truck beds'
    ]
  },
  {
    asin: 'B07ZTQ7N2N',
    title: 'Peak Design Everyday Backpack 20L (Black V2) Camera & Laptop Travel Bag, Weatherproof',
    category: 'Travel & Photography Bags',
    categorySlug: 'lifestyle',
    image: 'https://m.media-amazon.com/images/I/71R2H0N1Q5L._AC_SL1200_.jpg',
    badge: 'Design Award',
    rating: 4.7,
    reviewsCount: 2300,
    originalPrice: '$279.95',
    salePrice: '$249.95',
    discount: '11% OFF',
    highlights: [
      'Versatile iconic daypack engineered for photography gear, tech devices, and daily commutes',
      'Patented MagLatch hardware provides secure top access with fast one-handed opening',
      'Dual side access via weatherproof UltraZips to reach camera gear without removing bag',
      'Configurable FlexFold dividers customize internal compartments to protect delicate equipment'
    ]
  },
  {
    asin: 'B09995FXW7',
    title: 'Tile Pro (2022) 4-Pack - High Performance Bluetooth Tracker, Keys & Luggage Finder, 400 ft Range',
    category: 'Gadgets & Everyday Carry',
    categorySlug: 'tech',
    image: 'https://m.media-amazon.com/images/I/61v2+L3n-lL._AC_SL1200_.jpg',
    badge: "Amazon's Choice",
    rating: 4.5,
    reviewsCount: 12400,
    originalPrice: '$99.99',
    salePrice: '$79.99',
    discount: '20% OFF',
    highlights: [
      'Powerful 400 ft / 120m Bluetooth tracking range with the loudest ring of any Tile device',
      'Replaceable CR2032 coin battery powers the tracker for up to 1 full year',
      'IP67 water-resistant rating withstands rain, accidental spills, and 1-meter immersion',
      'Double press the Tile button to make your lost phone ring aloud even when set to silent'
    ]
  },
  {
    asin: 'B09NCSX8NL',
    title: 'Corsair K70 RGB PRO Mechanical Gaming Keyboard, CHERRY MX Red Linear Switches, 8000Hz Polling',
    category: 'PC Gaming Gear',
    categorySlug: 'tech',
    image: 'https://m.media-amazon.com/images/I/71y8k4S8wGL._AC_SL1200_.jpg',
    badge: "Gamer's Choice",
    rating: 4.6,
    reviewsCount: 3700,
    originalPrice: '$169.99',
    salePrice: '$129.99',
    discount: '24% OFF',
    highlights: [
      'CORSAIR AXON Hyper-Processing Technology delivers inputs up to 8x faster with 8,000Hz polling',
      '100% CHERRY MX Red linear mechanical key switches offer ultra-smooth, responsive actuation',
      'Precision-molded double-shot PBT keycaps resist wear, fading, and finger oil shine',
      'Durable brushed aluminum frame with detachable magnetic soft-touch wrist rest'
    ]
  },
  {
    asin: 'B0CBQVHQJ8',
    title: 'HyperX Cloud III Wireless – Gaming Headset for PC, PS5, Switch, 120-Hour Battery, 53mm Angled Drivers',
    category: 'PC Gaming Gear',
    categorySlug: 'tech',
    image: 'https://m.media-amazon.com/images/I/71-L6N9lWkL._AC_SL1200_.jpg',
    badge: 'Top Rated',
    rating: 4.6,
    reviewsCount: 4800,
    originalPrice: '$169.99',
    salePrice: '$139.99',
    discount: '18% OFF',
    highlights: [
      'Industry-leading up to 120 hours of continuous wireless gaming battery life on a single charge',
      'Re-engineered 53mm angled audio drivers tuned by acoustic engineers for pinpoint spatial clarity',
      'HyperX signature plush memory foam ear cushions wrapped in premium soft leatherette',
      'Upgraded 10mm ultra-clear microphone with internal mesh pop filter and LED mute indicator'
    ]
  },
  {
    asin: 'B08WT889V3',
    title: 'BenQ ScreenBar Halo LED Monitor Light Bar with Wireless Controller, Auto-Dimming, Backlight',
    category: 'Workspace & Desk Setup',
    categorySlug: 'tech',
    image: 'https://m.media-amazon.com/images/I/71q5n9a8ZHL._AC_SL1200_.jpg',
    badge: "Editor's Choice",
    rating: 4.7,
    reviewsCount: 6100,
    originalPrice: '$179.00',
    salePrice: '$159.00',
    discount: '11% OFF',
    highlights: [
      'Patented asymmetrical optical design illuminates the desk area with zero screen glare',
      'Wireless rotary desktop controller allows seamless brightness and color temperature adjustment',
      'Integrated back ambient light reduces eye strain and balances contrast behind your display',
      'Patented weighted clip mounts securely on both flat and curved monitors without tape or screws'
    ]
  }
];

console.log('New Amazon products to add:', newAmazonProducts.length);

const formattedNewProducts = newAmazonProducts.map(p => {
  const asinUpper = p.asin.toUpperCase();
  return {
    id: `amazon-${asinUpper.toLowerCase()}`,
    asin: asinUpper,
    title: p.title,
    category: p.category,
    categorySlug: p.categorySlug,
    store: 'amazon',
    merchantName: 'Amazon',
    merchantLogo: '/assets/images/brands/amazon.svg',
    image: p.image,
    badge: p.badge,
    rating: p.rating,
    reviewsCount: p.reviewsCount,
    originalPrice: p.originalPrice,
    salePrice: p.salePrice,
    discount: p.discount,
    productUrl: `https://www.amazon.com/dp/${asinUpper}`,
    affiliateUrl: `https://www.amazon.com/dp/${asinUpper}?tag=playnewapps-20`,
    featured: true,
    highlights: p.highlights
  };
});

// Prepend the new Amazon products so they appear immediately at the top of the products section!
const updatedProducts = [...formattedNewProducts, ...products];

fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(updatedProducts, null, 2), 'utf-8');
console.log('Successfully saved data/products.json! New total:', updatedProducts.length);
