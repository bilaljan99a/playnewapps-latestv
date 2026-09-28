/**
 * Cloudflare Pages Middleware
 * Executes at Cloudflare Edge for playnewapps.com
 * Handles:
 * 1. HTTP 410 Gone for legacy Blogger/Blogspot URLs and old APK archives.
 * 2. Strips legacy Blogger mobile parameter (?m=0, ?m=1) with 301 redirect.
 * 3. 301 redirects legacy query parameter URLs (/store?id=xyz) directly to canonical /{slug}-coupons.
 * 4. 301 redirects all legacy aliases and .html endpoints to clean canonical URLs (0 chains, 0 loops).
 */
export async function onRequest(context) {
  const url = new URL(context.request.url);
  const path = url.pathname.toLowerCase();

  // Explicitly allow active store page for apk-files-coupons
  if (path.includes('apk-files-coupons')) {
    return context.next();
  }

  // Handle direct visits to /410 or /410.html
  const isDirect410 = path === '/410' || path === '/410.html';

  // 1. Match legacy Blogger date-based archive structures:
  // e.g. /2010 to /2029 (including /2018, /2018/, /2018/01/post.html, /2019/..., /2023, /2024, etc.)
  const isBloggerDatePath = /^\/(19|20)\d{2}(\/|$|\.|\?)/.test(path) || /^\/(19|20)\d{2}\/\d{2}/.test(path);

  // 2. Match standard Blogger system directories:
  // /p, /p/, /p/about-us.html, /search, /feeds, /label, /b, /archive
  const isBloggerSystemPath = /^\/(search|feeds|label|b|p|archive)(\/|\?|\.|$)/.test(path);

  // 3. Match legacy APK article paths from old site
  const isOldApkPath = path.includes('-apk') || 
                       path.includes('/apk-') || 
                       path.includes('mod-apk') ||
                       path.includes('apk-download') ||
                       path.includes('hotspot-shield') ||
                       path.includes('netflix') ||
                       path.includes('ludo-star') ||
                       path.includes('usa-network') ||
                       path.includes('runes-of-magic') ||
                       path.includes('bloons') ||
                       (path.endsWith('.apk') && !path.startsWith('/assets/'));

  if (isDirect410 || isBloggerDatePath || isBloggerSystemPath || isOldApkPath) {
    const html410 = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>410 Gone - Page Removed | PlayNewApps</title>
    <meta name="robots" content="noindex, nofollow">
    <link rel="canonical" href="${url.origin}/410">
    <style>
        body { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #0f172a; color: #f8fafc; text-align: center; }
        .card { max-width: 520px; padding: 2.5rem; background: #1e293b; border-radius: 12px; border: 1px solid #334155; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5); }
        h1 { font-size: 3rem; margin: 0 0 0.5rem; color: #ef4444; font-weight: 800; }
        .badge { display: inline-block; padding: 0.25rem 0.75rem; background: rgba(239, 68, 68, 0.15); color: #fca5a5; border-radius: 9999px; font-size: 0.875rem; font-weight: 600; margin-bottom: 1.25rem; }
        p { color: #94a3b8; font-size: 1.1rem; line-height: 1.6; margin-bottom: 1.75rem; }
        a { display: inline-block; padding: 0.75rem 1.75rem; background: #2563eb; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; transition: background 0.2s ease; }
        a:hover { background: #1d4ed8; }
    </style>
    <link rel="icon" type="image/svg+xml" href="/assets/images/favicon.svg">
</head>
<body>
    <div class="card">
        <div class="badge">HTTP Status 410 Gone</div>
        <h1>410 Gone</h1>
        <p>This legacy blog post has been permanently removed and is no longer available on PlayNewApps.</p>
        <a href="/">Go to Homepage</a>
    </div>
</body>
</html>`;

    return new Response(html410, {
      status: 410,
      statusText: "Gone",
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow",
        "Cache-Control": "public, max-age=86400"
      }
    });
  }

  // 4. Strip legacy Blogger mobile parameter (?m=0, ?m=1)
  if (url.searchParams.has('m')) {
    url.searchParams.delete('m');
    const remainingQuery = url.searchParams.toString();
    const cleanDestination = url.origin + url.pathname + (remainingQuery ? '?' + remainingQuery : '');
    return Response.redirect(cleanDestination, 301);
  }

  // 5. Clean /store?id=... query parameter destinations directly to canonical store pages
  if (path === '/store' || path === '/store.html') {
    const id = (url.searchParams.get('id') || '').toLowerCase().trim();
    if (id) {
      const cleanSlug = id.replace(/-coupons$/, '').replace(/-review$/, '');
      return Response.redirect(`${url.origin}/${cleanSlug}-coupons`, 301);
    }
    return Response.redirect(`${url.origin}/stores`, 301);
  }

  // 6. Direct 301 Permanent Redirects for legacy and alternative paths (Zero chains, Zero loops)
  const legacyRedirects = {
    '/categories.html': '/category',
    '/categories': '/category',
    '/coupons.html': '/stores',
    '/coupons': '/stores',
    '/blog.html': '/blog',
    '/trending.html': '/deal',
    '/trending': '/deal',
    '/deals': '/deal',
    '/privacy-policy': '/privacy',
    '/privacy.html': '/privacy',
    '/terms-of-service': '/terms',
    '/terms.html': '/terms',
    '/disclosure': '/affiliate',
    '/affiliate.html': '/affiliate',
    '/movavi-video-suite-coupons.html': '/movavi-coupons',
    '/movavi-video-suite-coupons': '/movavi-coupons',
    '/movavi.html': '/movavi-coupons',
    '/movavi': '/movavi-coupons',
    '/filmora-14-coupons.html': '/wondershare-filmora-coupons',
    '/filmora-14-coupons': '/wondershare-filmora-coupons',
    '/filmora-14': '/wondershare-filmora-coupons',
    '/drfone-coupons.html': '/wondershare-drfone-review',
    '/drfone-coupons': '/wondershare-drfone-review',
    '/drfone': '/wondershare-drfone-review',
    '/aliexpress-coupons.html': '/aliexpress-coupons',
    '/aliexpress.html': '/aliexpress-coupons',
    '/aliexpress': '/aliexpress-coupons',
    '/nordvpn-coupons.html': '/nordvpn-coupons',
    '/nordvpn': '/nordvpn-coupons',
    '/canva-coupons.html': '/canva-review',
    '/canva-coupons': '/canva-review',
    '/canva': '/canva-review',
    '/wps-office-coupons.html': '/wps-office-review',
    '/wps-office-coupons': '/wps-office-review',
    '/wps-office.html': '/wps-office-review',
    '/wps-office': '/wps-office-review',
    '/hostinger-coupons.html': '/hostinger-coupons',
    '/hostinger': '/hostinger-coupons',
    '/war-thunder.html': '/war-thunder-coupons',
    '/war-thunder': '/war-thunder-coupons',
    '/notta-ai-coupons.html': '/notta-ai-coupons',
    '/notta-ai': '/notta-ai-coupons',
    '/adguard.html': '/adguard-coupons',
    '/adguard': '/adguard-coupons',
    '/adheart-me.html': '/adheart',
    '/adheart-me': '/adheart',
    '/italki.html': '/italki-coupons',
    '/italki': '/italki-coupons',
    '/hidemyname.html': '/hidemyname-vpn-coupons',
    '/hidemyname': '/hidemyname-vpn-coupons',
    '/recoverit.html': '/wondershare-recoverit-review',
    '/recoverit': '/wondershare-recoverit-review',
    '/wondershare-recoverit.html': '/wondershare-recoverit-review',
    '/wondershare-recoverit': '/wondershare-recoverit-review',
    '/uniconverter.html': '/wondershare-uniconverter-review',
    '/uniconverter': '/wondershare-uniconverter-review',
    '/wondershare-uniconverter.html': '/wondershare-uniconverter-review',
    '/wondershare-uniconverter': '/wondershare-uniconverter-review',
    '/pdfelement.html': '/wondershare-pdfelement-review',
    '/pdfelement': '/wondershare-pdfelement-review',
    '/retouch4me.html': '/retouch4me-coupons',
    '/retouch4me': '/retouch4me-coupons',
    '/jetpac-esim.html': '/jetpac',
    '/jetpac-esim': '/jetpac',
    '/way-com.html': '/way',
    '/way-com': '/way',
    '/hide-expert-vpn.html': '/hide-expert-vpn-coupons',
    '/hide-expert-vpn': '/hide-expert-vpn-coupons',
    '/planetofhotels': '/planet-of-hotels-coupons',
    '/llms': '/llms.txt',
    '/cdn-cgi/l/email-protection': '/contact'
  };

  const cleanPath = path.replace(/\/+$/, '') || '/';
  if (legacyRedirects[cleanPath]) {
    return Response.redirect(`${url.origin}${legacyRedirects[cleanPath]}`, 301);
  }

  // Pass through all valid application and static assets
  return context.next();
}
