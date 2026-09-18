/**
 * Cloudflare Pages Middleware
 * Intercepts all incoming requests to playnewapps.store
 * Returns a real HTTP 410 Gone for legacy Blogger/Blogspot URLs and removed blog archives.
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
  // e.g. /2018, /2018/, /2018/01/post.html, /2019/..., /2020/04/afk-arena-mod-apk.html, /2023, /2024, etc.
  const isBloggerDatePath = /^\/(19|20)\d{2}(\/|$|\.|\?)/.test(path) || /^\/(19|20)\d{2}\/\d{2}/.test(path);

  // 2. Match standard Blogger system directories:
  // /p, /p/, /p/about-us.html, /search, /feeds, /label, /b, /archive
  const isBloggerSystemPath = /^\/(search|feeds|label|b|p|archive)(\/|\?|\.|$)/.test(path);

  // 3. Match legacy APK article paths from old site
  const isOldApkPath = path.includes('-apk') || 
                       path.includes('/apk-') || 
                       path.includes('mod-apk') ||
                       path.includes('apk-download');

  if (isDirect410 || isBloggerDatePath || isBloggerSystemPath || isOldApkPath) {
    const html410 = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>410 Gone - Page Removed | PlayNewApps</title>
    <meta name="robots" content="noindex, nofollow">
    <link rel="canonical" href="https://www.playnewapps.store/410">
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

  // Pass through all valid application and static assets
  return context.next();
}
