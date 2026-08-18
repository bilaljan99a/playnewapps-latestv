const fs = require('fs');
const path = require('path');

const banners = [
  {
    srcJpg: 'assets/images/banners/ufl-hero-official.jpg',
    destSvg: 'assets/images/banners/ufl-hero-official.svg',
    width: 1920,
    height: 1080
  },
  {
    srcJpg: 'assets/images/banners/ufl-gameplay-official.jpg',
    destSvg: 'assets/images/banners/ufl-gameplay-official.svg',
    width: 1920,
    height: 1080
  },
  {
    srcJpg: 'assets/images/banners/ufl-squad-webshop-official.jpg',
    destSvg: 'assets/images/banners/ufl-squad-webshop-official.svg',
    width: 1920,
    height: 1080
  },
  {
    srcJpg: 'assets/images/banners/ufl-teampass-official.jpg',
    destSvg: 'assets/images/banners/ufl-teampass-official.svg',
    width: 1920,
    height: 1080
  }
];

for (const b of banners) {
  if (fs.existsSync(b.srcJpg)) {
    const jpgBuffer = fs.readFileSync(b.srcJpg);
    const b64 = jpgBuffer.toString('base64');
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${b.width} ${b.height}" width="100%" height="100%">
  <image width="${b.width}" height="${b.height}" href="data:image/jpeg;base64,${b64}" xlink:href="data:image/jpeg;base64,${b64}"/>
</svg>`;
    fs.writeFileSync(b.destSvg, svgContent);
    console.log(`Successfully generated SVG: ${b.destSvg} (${svgContent.length} chars)`);
  } else {
    console.error(`Missing JPG: ${b.srcJpg}`);
  }
}
