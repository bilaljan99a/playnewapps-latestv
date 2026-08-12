const fs = require('fs');
const path = require('path');

const CANONICAL_HOST = 'https://www.playnewapps.store';

function getFileLastmod(filepath) {
  try {
    const fullPath = path.join(__dirname, filepath);
    if (fs.existsSync(fullPath)) {
      const stats = fs.statSync(fullPath);
      return stats.mtime.toISOString().split('T')[0];
    }
  } catch (err) {
    // ignore
  }
  return null;
}

function loadJSON(filepath) {
  try {
    const fullPath = path.join(__dirname, filepath);
    if (fs.existsSync(fullPath)) {
      return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    }
  } catch (err) {
    console.error(`Error loading JSON ${filepath}:`, err.message);
  }
  return [];
}

function escapeXML(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateSitemapXML() {
  const urlsMap = new Map();

  function addURL(loc, lastmod = null, changefreq = null, priority = '0.8') {
    if (!loc) return;

    // Normalize protocol and canonical host
    let url = loc.trim();
    if (url.startsWith('/')) {
      url = CANONICAL_HOST + url;
    } else if (url.startswith ? url.startswith('http') : url.indexOf('http') === 0) {
      url = url.replace(/^https?:\/\/(www\.)?playnewapps\.store/i, CANONICAL_HOST);
    } else {
      url = CANONICAL_HOST + '/' + url.replace(/^\/+/, '');
    }

    // Strip trailing slash except root
    if (url.endsWith('/') && url !== CANONICAL_HOST + '/') {
      url = url.slice(0, -1);
    }

    // Reject non-canonical domains, affiliate links, asset files, admin routes
    if (!url.startsWith(CANONICAL_HOST)) return;
    if (url.includes('dhwnh.com') || url.includes('rcpsj.com') || url.includes('bednari.com')) return;
    if (/\.(png|jpg|jpeg|gif|css|js|json|ico|svg|zip)$/i.test(url)) return;

    const key = url;
    const existing = urlsMap.get(key);

    if (!existing) {
      urlsMap.set(key, {
        loc: url,
        lastmod: lastmod || null,
        changefreq: changefreq || null,
        priority: priority ? String(priority) : '0.8'
      });
    } else {
      if (lastmod && !existing.lastmod) existing.lastmod = lastmod;
      if (changefreq && !existing.changefreq) existing.changefreq = changefreq;
      if (priority && parseFloat(priority) > parseFloat(existing.priority)) {
        existing.priority = String(priority);
      }
    }
  }

  // 1. Static Core Pages
  const staticPages = [
    { path: '/', cf: 'daily', pr: '1.0' },
    { path: '/coupon.html', cf: 'daily', pr: '0.9' },
    { path: '/stores.html', cf: 'daily', pr: '0.9' },
    { path: '/reviews.html', cf: 'daily', pr: '0.9' },
    { path: '/about.html', cf: 'monthly', pr: '0.7' },
    { path: '/contact.html', cf: 'monthly', pr: '0.7' },
    { path: '/privacy.html', cf: 'monthly', pr: '0.6' },
    { path: '/terms.html', cf: 'monthly', pr: '0.6' },
    { path: '/affiliate.html', cf: 'monthly', pr: '0.6' },
    { path: '/category.html', cf: 'weekly', pr: '0.7' }
  ];

  for (const page of staticPages) {
    const filePath = page.path === '/' ? 'index.html' : page.path.replace(/^\//, '');
    const mtime = getFileLastmod(filePath);
    addURL(page.path, mtime, page.cf, page.pr);
  }

  // 2. Stores from data/stores.json
  const stores = loadJSON('data/stores.json');
  for (const s of stores) {
    if (s && s.id) {
      addURL(`/store.html?id=${encodeURIComponent(s.id)}`, null, 'daily', '0.9');
    }
  }

  // 3. Authors from data/authors.json
  const authors = loadJSON('data/authors.json');
  for (const a of authors) {
    if (a && a.id) {
      addURL(`/author.html?id=${encodeURIComponent(a.id)}`, null, 'monthly', '0.6');
    }
  }

  // 4. Software / Apps / Games dynamic reviews
  const software = loadJSON('data/software.json');
  for (const item of software) {
    if (item && item.id) {
      addURL(`/review.html?id=${encodeURIComponent(item.id)}`, null, 'weekly', '0.8');
    }
  }

  const apps = loadJSON('data/apps.json');
  for (const item of apps) {
    if (item && item.id) {
      addURL(`/review.html?id=${encodeURIComponent(item.id)}`, null, 'weekly', '0.8');
    }
  }

  const games = loadJSON('data/games.json');
  for (const item of games) {
    if (item && item.id) {
      addURL(`/review.html?id=${encodeURIComponent(item.id)}`, null, 'weekly', '0.8');
    }
  }

  // 5. Standalone HTML files on disk
  const excludeHtml = new Set([
    'index.html', 'coupon.html', 'stores.html', 'reviews.html',
    'about.html', 'contact.html', 'privacy.html', 'terms.html',
    'affiliate.html', 'category.html', 'author.html', 'store.html',
    'review.html', 'deal.html', '404.html', '410.html'
  ]);

  try {
    const files = fs.readdirSync(__dirname);
    for (const file of files) {
      if (file.endsWith('.html') && !excludeHtml.has(file)) {
        const fullPath = path.join(__dirname, file);
        try {
          const content = fs.readFileSync(fullPath, 'utf8');

          // Skip refresh redirects or cookie check stub pages
          if (/http-equiv=["']?refresh["']?/i.test(content)) continue;
          if (/cookie check/i.test(content) && content.length < 15000) continue;

          const mtime = getFileLastmod(file);
          if (file.endsWith('-coupons.html')) {
            addURL(`/${file}`, mtime, 'daily', '0.95');
          } else if (file.endsWith('-review.html') || file.endsWith('-pricing.html')) {
            addURL(`/${file}`, mtime, 'weekly', '0.9');
          } else {
            addURL(`/${file}`, mtime, 'daily', '0.95');
          }
        } catch (err) {
          // ignore unreadable file
        }
      }
    }
  } catch (err) {
    console.error('Error reading directory files:', err.message);
  }

  // Build XML output
  const urlEntries = Array.from(urlsMap.values());

  // Sort URLs deterministically for clean output
  urlEntries.sort((a, b) => a.loc.localeCompare(b.loc));

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const entry of urlEntries) {
    xml += '  <url>\n';
    xml += `    <loc>${escapeXML(entry.loc)}</loc>\n`;
    if (entry.lastmod) {
      xml += `    <lastmod>${escapeXML(entry.lastmod)}</lastmod>\n`;
    }
    if (entry.changefreq) {
      xml += `    <changefreq>${escapeXML(entry.changefreq)}</changefreq>\n`;
    }
    if (entry.priority) {
      xml += `    <priority>${escapeXML(entry.priority)}</priority>\n`;
    }
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';
  return { xml, urlCount: urlEntries.length, urlsMap };
}

function writeSitemapFile() {
  const { xml, urlCount } = generateSitemapXML();
  const filePath = path.join(__dirname, 'sitemap.xml');
  fs.writeFileSync(filePath, xml, 'utf8');
  console.log(`[SITEMAP] Generated sitemap.xml with ${urlCount} URLs at ${filePath}`);
  return { xml, urlCount };
}

if (require.main === module) {
  writeSitemapFile();
}

module.exports = {
  generateSitemapXML,
  writeSitemapFile
};
