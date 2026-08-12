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

// CRITICAL MIDDLEWARE 1: Legacy Blogger & Old APK Route Removal Detection
// MUST execute BEFORE any static file serving or homepage fallback!
app.use((req, res, next) => {
  const rawUrl = req.url || '';
  const pathname = rawUrl.split('?')[0];
  const lowerPath = pathname.toLowerCase();

  // 1. Match old Blogger date-based archive structures: /2018/..., /2021/..., /1999/..., etc.
  const isBloggerDatePath = /^\/(19|20)\d{2}(\/|$)/.test(pathname) || /^\/(19|20)\d{2}\/\d{2}/.test(pathname);

  // 2. Match standard Blogger system directories
  const isBloggerSystemPath = /^\/(search|category|feeds|label|b|p|archive)(\/|\?|$)/i.test(pathname);

  // 3. Match legacy APK article paths from old site
  const isOldApkPath = lowerPath.includes('-apk') ||
                       lowerPath.includes('hotspot-shield') ||
                       lowerPath.includes('netflix') ||
                       lowerPath.includes('ludo-star') ||
                       lowerPath.includes('usa-network') ||
                       lowerPath.includes('runes-of-magic') ||
                       lowerPath.includes('bloons') ||
                       (lowerPath.endsWith('.apk') && !lowerPath.startsWith('/assets/'));

  if (isBloggerDatePath || isBloggerSystemPath || isOldApkPath) {
    res.status(410);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    return res.sendFile(path.join(__dirname, '410.html'));
  }

  next();
});

// Middleware 2: Handle legacy Blogger mobile parameter (?m=0, ?m=1) on clean pages
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

// Custom 404 for any other missing routes (Return 404 Not Found, NEVER homepage!)
app.use((req, res) => {
  res.status(404);
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.sendFile(path.join(__dirname, '404.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});

