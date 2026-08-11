const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Catch legacy Blogger and old APK routes and return 410 Gone
app.use((req, res, next) => {
  const lowerUrl = req.url.toLowerCase();
  
  // Identify Blogger archives, search pages, category pages, etc.
  const isBloggerRoute = /^\/20\d{2}(\/|$)/.test(lowerUrl) || 
                         /^\/search(\/|\?|$)/.test(lowerUrl) || 
                         /^\/category\//.test(lowerUrl) ||
                         /^\/p\/.*\.html$/.test(lowerUrl);
                         
  // Identify old specific APK paths
  const isOldApk = lowerUrl.includes('-apk') || 
                   lowerUrl.includes('hotspot-shield') || 
                   lowerUrl.includes('netflix') || 
                   lowerUrl.includes('ludo-star') || 
                   lowerUrl.includes('.apk');

  if (isBloggerRoute || isOldApk) {
    return res.status(410).send('410 Gone - This legacy page has been permanently removed.');
  }

  next();
});

// Specific routes for clean URLs
app.get('/hide-expert-vpn', (req, res) => {
  res.sendFile(path.join(__dirname, 'hide-expert-vpn-coupons.html'));
});

app.get('/hide-expert-vpn-coupons', (req, res) => {
  res.sendFile(path.join(__dirname, 'hide-expert-vpn-coupons.html'));
});

app.get('/lennuabi-coupons', (req, res) => {
  res.sendFile(path.join(__dirname, 'lennuabi-coupons.html'));
});

app.get('/lennuabi-review', (req, res) => {
  res.sendFile(path.join(__dirname, 'lennuabi-review.html'));
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
