const express = require('express');
const path = require('path');
const { generateSitemapXML, writeSitemapFile } = require('./generate-sitemap');
const app = express();
const PORT = 3000;

// Automatically write/update sitemap.xml file on server startup
writeSitemapFile();

// Dynamic route to serve live sitemap.xml
app.get('/sitemap.xml', (req, res) => {
  const { xml } = generateSitemapXML();
  res.header('Content-Type', 'application/xml; charset=utf-8');
  res.send(xml);
});

// Middleware 1: Legacy Blogger & Old APK Removal Detection (Returns HTTP 410 Gone)
app.use((req, res, next) => {
  const urlObj = new URL(req.url, 'http://localhost');
  const pathname = urlObj.pathname;
  const lowerPath = pathname.toLowerCase();

  // 1. Match old Blogger date-based archive structures: /2018/..., /2020/..., /1999/..., etc.
  const isBloggerDatePath = /^\/(19|20)\d{2}(\/|$)/.test(pathname);

  // 2. Match standard Blogger system directories
  const isBloggerSystemPath = /^\/(search|category|feeds|label|b|p|archive)(\/|\?|$)/i.test(pathname);

  // 3. Match legacy APK article paths from old site
  const isOldApkPath = lowerPath.includes('-apk') ||
                       lowerPath.includes('hotspot-shield') ||
                       lowerPath.includes('netflix') ||
                       lowerPath.includes('ludo-star') ||
                       lowerPath.includes('usa-network') ||
                       lowerPath.includes('runes-of-magic') ||
                       (lowerPath.endsWith('.apk') && !lowerPath.startsWith('/assets/'));

  if (isBloggerDatePath || isBloggerSystemPath || isOldApkPath) {
    return res.status(410).send('410 Gone - This legacy page has been permanently removed.');
  }

  next();
});

// Middleware 2: Handle legacy Blogger mobile parameter (?m=0, ?m=1) on legitimate new URLs
app.use((req, res, next) => {
  const urlObj = new URL(req.url, 'http://localhost');
  if (urlObj.searchParams.has('m')) {
    urlObj.searchParams.delete('m');
    const remainingQuery = urlObj.searchParams.toString();
    const cleanUrl = urlObj.pathname + (remainingQuery ? '?' + remainingQuery : '');
    return res.redirect(301, cleanUrl);
  }
  next();
});

// Explicit Extensionless Page Routes for New Website Architecture
const cleanRoutes = [
  { route: '/contact', file: 'contact.html' },
  { route: '/about', file: 'about.html' },
  { route: '/coupon', file: 'coupon.html' },
  { route: '/stores', file: 'stores.html' },
  { route: '/reviews', file: 'reviews.html' },
  { route: '/privacy', file: 'privacy.html' },
  { route: '/terms', file: 'terms.html' },
  { route: '/affiliate', file: 'affiliate.html' },
  { route: '/category', file: 'category.html' },
  { route: '/store', file: 'store.html' },
  { route: '/review', file: 'review.html' },
  { route: '/author', file: 'author.html' },
  { route: '/deal', file: 'deal.html' },
  { route: '/hide-expert-vpn', file: 'hide-expert-vpn-coupons.html' },
  { route: '/hide-expert-vpn-coupons', file: 'hide-expert-vpn-coupons.html' },
  { route: '/lennuabi-coupons', file: 'lennuabi-coupons.html' },
  { route: '/lennuabi-review', file: 'lennuabi-review.html' },
  { route: '/alibaba', file: 'alibaba.html' },
  { route: '/alibaba-review', file: 'alibaba.html' }
];

cleanRoutes.forEach(({ route, file }) => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, file));
  });
});

// Serve static files with html extension fallback
app.use(express.static(__dirname, { extensions: ['html'] }));

// Custom 404 for any other missing routes
app.use((req, res) => {
  res.status(404).send('404 Not Found - The requested page does not exist.');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});

