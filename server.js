const express = require('express');
const compression = require('compression');
const path = require('path');
const { generateSitemapXML, writeSitemapFile } = require('./generate-sitemap');
const app = express();
const PORT = 3000;

// Enable gzip/deflate compression for fast asset delivery and high Google PageSpeed score
app.use(compression());

// Disable all HTTP caching in development so preview always gets latest files
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  next();
});

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
  const isBloggerSystemPath = /^\/(search|feeds|label|b|p|archive)(\/|\?|$)/i.test(pathname);

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
  { route: '/alibaba-review', file: 'alibaba.html' },
  { route: '/3dlabprint', file: '3dlabprint-coupons.html' },
  { route: '/3dlabprint-coupons', file: '3dlabprint-coupons.html' },
  { route: '/crossout', file: 'crossout-coupons.html' },
  { route: '/crossout-coupons', file: 'crossout-coupons.html' },
  { route: '/crossout-review', file: 'crossout-review.html' },
  { route: '/vectorstock', file: 'vectorstock-coupons.html' },
  { route: '/vectorstock-coupons', file: 'vectorstock-coupons.html' },
  { route: '/purevpn', file: 'purevpn-coupons.html' },
  { route: '/purevpn-coupons', file: 'purevpn-coupons.html' },
  { route: '/purevpn-review', file: 'purevpn-coupons.html' },
  { route: '/canva', file: 'canva-review.html' },
  { route: '/canva-review', file: 'canva-review.html' },
  { route: '/enlisted', file: 'enlisted-coupons.html' },
  { route: '/enlisted-coupons', file: 'enlisted-coupons.html' },
  { route: '/store/enlisted', file: 'enlisted-coupons.html' },
  { route: '/star-conflict', file: 'star-conflict-coupons.html' },
  { route: '/star-conflict-coupons', file: 'star-conflict-coupons.html' },
  { route: '/store/star-conflict', file: 'star-conflict-coupons.html' },
  { route: '/forcedrop', file: 'forcedrop-coupons.html' },
  { route: '/forcedrop-coupons', file: 'forcedrop-coupons.html' },
  { route: '/store/forcedrop', file: 'forcedrop-coupons.html' },
  { route: '/lenovo', file: 'lenovo-coupons.html' },
  { route: '/lenovo-coupons', file: 'lenovo-coupons.html' },
  { route: '/store/lenovo', file: 'lenovo-coupons.html' },
  { route: '/vevor', file: 'vevor-coupons.html' },
  { route: '/vevor-coupons', file: 'vevor-coupons.html' },
  { route: '/store/vevor', file: 'vevor-coupons.html' },
  { route: '/xp-pen', file: 'xp-pen-coupons.html' },
  { route: '/xp-pen-coupons', file: 'xp-pen-coupons.html' },
  { route: '/store/xp-pen', file: 'xp-pen-coupons.html' },
  { route: '/xppen', file: 'xp-pen-coupons.html' },
  { route: '/xppen-coupons', file: 'xp-pen-coupons.html' },
  { route: '/applicantally', file: 'applicantally-coupons.html' },
  { route: '/applicantally-coupons', file: 'applicantally-coupons.html' },
  { route: '/applicantally-review', file: 'applicantally-review.html' },
  { route: '/store/applicantally', file: 'applicantally-coupons.html' },
  { route: '/italki', file: 'italki-coupons.html' },
  { route: '/italki-coupons', file: 'italki-coupons.html' },
  { route: '/italki-review', file: 'italki-review.html' },
  { route: '/store/italki', file: 'italki-coupons.html' },
  { route: '/uniconverter', file: 'wondershare-uniconverter-review.html' },
  { route: '/uniconverter-review', file: 'wondershare-uniconverter-review.html' },
  { route: '/wondershare-uniconverter-review', file: 'wondershare-uniconverter-review.html' },
  { route: '/avast', file: 'avast-antivirus-review.html' },
  { route: '/avast-antivirus', file: 'avast-antivirus-review.html' },
  { route: '/avast-review', file: 'avast-antivirus-review.html' },
  { route: '/avast-antivirus-review', file: 'avast-antivirus-review.html' },
  { route: '/walmart', file: 'walmart-coupons.html' },
  { route: '/walmart-coupons', file: 'walmart-coupons.html' },
  { route: '/store/walmart', file: 'walmart-coupons.html' },
  { route: '/keeper-security', file: 'keeper-security-coupons.html' },
  { route: '/keeper-security-coupons', file: 'keeper-security-coupons.html' },
  { route: '/store/keeper-security', file: 'keeper-security-coupons.html' },
  { route: '/gomlab', file: 'gomlab-coupons.html' },
  { route: '/gomlab-coupons', file: 'gomlab-coupons.html' },
  { route: '/store/gomlab', file: 'gomlab-coupons.html' },
  { route: '/kissandfly', file: 'kissandfly-coupons.html' },
  { route: '/kissandfly-coupons', file: 'kissandfly-coupons.html' },
  { route: '/store/kissandfly', file: 'kissandfly-coupons.html' }
];

cleanRoutes.forEach(({ route, file }) => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, file));
  });
});

// Serve static assets without stale caching in development
app.use('/assets', express.static(path.join(__dirname, 'assets'), {
  setHeaders: (res, path) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  }
}));

// Serve static files with html extension fallback and fresh headers
app.use(express.static(__dirname, { 
  extensions: ['html'],
  setHeaders: (res, path) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
}));

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

