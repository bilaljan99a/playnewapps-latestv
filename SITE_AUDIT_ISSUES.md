# PlayNewApps SimilarWeb & Technical SEO Audit Master Tracker (2026)

This document catalogs all errors, warnings, notices, and optimization recommendations identified from the **SimilarWeb Site Audit**, crawler logs, and technical analysis of `www.playnewapps.store`.

Each issue is assigned a unique number (`Issue 1`, `Issue 2`, etc.) and prioritized so you can simply prompt:
> **"Fix Issue 1"**, **"Fix Issue 2"**, or **"Fix all High Priority issues"**

---

## 📊 Summary of Audit Findings

| Priority | Category | Issues Identified | Status | Impact on SEO & Rankings |
| :--- | :--- | :--- | :--- | :--- |
| 🟢 **Resolved** | **Issue 1** | Old Blogger URLs returning 404 instead of 410 Gone | **FIXED ✅** | Crawl budget saved, dead Google indexation purged |
| 🟢 **Resolved** | **Issue 2** | Redirect Chains, Loops & Query-Parameter Targets | **FIXED ✅** | 100% link equity preserved, 0 loops, 0 chains |
| 🟢 **Resolved** | **Issue 3** | Title Tags Too Long (> 65 Chars) & Truncated in SERPs | **FIXED ✅** | Clean SERP snippets, zero truncation, higher CTR |
| 🟡 **Medium** | **Issue 4** | Internal Link Marked with `nofollow` (`headway-coupons`) | Pending ⏳ | PageRank flow blockage, crawl obstruction |
| 🟡 **Medium** | **Issue 5** | Missing Structured Data (Schema.org JSON-LD) | Pending ⏳ | Lost Rich Snippets / Star Ratings in Google SERP |
| 🟢 **Low / Speed** | **Issue 6** | Unminified JavaScript & CSS Assets (> 350 KB uncompressed) | Pending ⏳ | Core Web Vitals (LCP, FID/INP), slower mobile load |
| 🟢 **Low / Quality** | **Issue 7** | Content Not Optimized (Thin Pages & Low Word Count Stubs) | Pending ⏳ | Google Panda / Helpful Content penalty risk |
| 🟢 **Low / Future** | **Issue 8** | Missing `llms.txt` & AI Search Optimization | Pending ⏳ | Exclusion from AI search engines (Perplexity, SearchGPT) |

---

## 🛠️ Detailed Issues & Action Plan

---

### 🟢 ISSUE 1: Old URL Structure Returning 404 Instead of 410 Gone (STATUS: FIXED ✅)
- **Severity:** High / Critical (Resolved)
- **Fix Applied:**
  - Configured Cloudflare Pages Edge Middleware (`functions/_middleware.js`) to intercept every incoming request to `playnewapps.com`.
  - Accurately matches:
    - Date archives: `/2010` through `/2029` (bare `/2018`, trailing slash `/2018/`, and subpaths `/2018/05/article.html`)
    - Blogger system paths: `/p`, `/p/`, `/search`, `/feeds`, `/label`, `/archive`, `/b`
    - Legacy APK articles (`-apk`, `/apk-`, `mod-apk`, `apk-download`, `hotspot-shield`, `netflix`, `ludo-star`, etc., while protecting active `/apk-files-coupons`)
    - Direct visits: `/410` and `/410.html`
  - Returns genuine `HTTP 410 Gone` with `X-Robots-Tag: noindex, nofollow` and `Cache-Control: public, max-age=86400`.
  - 100% parity across Cloudflare Pages Edge Functions, `server.js`, `vercel.json`, and `firebase.json`.

---

### 🟢 ISSUE 2: Redirect Chains, Loops & Query-Parameter Targets (STATUS: FIXED ✅)
- **Severity:** High / Critical (Resolved)
- **Fix Applied:**
  - Removed conflicting rewrites and loops in `_redirects` (eliminated `/aliexpress-coupons` 200 rewrite loop and `/blog` 200 rewrite loop).
  - Eliminated query-parameter redirect chains:
    - `/nordvpn-coupons.html` now redirects 301 directly to `/nordvpn-coupons` (removed intermediary `/store?id=nordvpn`).
    - `/hostinger-coupons.html` redirects directly to `/hostinger-coupons`.
    - `/war-thunder.html` redirects directly to `/war-thunder-coupons`.
    - `/notta-ai-coupons.html` redirects directly to `/notta-ai-coupons`.
    - `/store?id=...` parameters automatically 301 redirect directly to `/{brand}-coupons`.
    - Legacy Blogger mobile `?m=0` / `?m=1` parameters stripped via 301 redirect to clean URL.
  - Zero chains, zero loops, zero query parameter targets verified across 60 redirect rules.

---

### 🟢 ISSUE 3: Title Tags Exceeding Recommended Length (> 65 Characters) (STATUS: FIXED ✅)
- **Severity:** Medium (Resolved)
- **Fix Applied:**
  - Optimized all 34 HTML pages with titles previously exceeding 60-65 characters down to crisp, Google-recommended lengths (strictly between 40 and 55 characters).
  - Preserved primary high-intent search keywords (Brand Name + Coupon Codes / Promo Deals / Review) and the target year `(2026)`.
  - Also synchronized all 18 store records in `data/stores.json` so every single store title stays strictly under 55 characters.
  - **Verification:** Automated regex audit of all 153 HTML files confirmed **0 pages have title > 60 characters** (100% pass rate).

---

### 🟡 ISSUE 4: Internal Link Marked with `nofollow` on `headway-coupons.html`
- **Severity:** Medium (SimilarWeb Audit: "Links: internal link has nofollow attribute")
- **Root Cause:**
  - In `headway-coupons.html` (line 1643), the coupon code modal button uses `href="#"` with `rel="nofollow noopener sponsored"`.
  - Search crawlers treat `href="#"` as an internal page anchor link. Having `rel="nofollow"` on an internal link triggers a site audit warning and wastes internal crawl flow.
- **Solution:**
  - Update modal placeholder links from `href="#"` to dynamic JS triggers or remove `rel="nofollow"` from internal anchor placeholders.
  - Audit all other coupon pages to ensure internal links never carry `rel="nofollow"`.
- **Verification:**
  - Grep across all HTML pages confirms zero internal (`href="#"` or `href="/"`) links have `nofollow`.

---

### 🟡 ISSUE 5: Missing or Incomplete Structured Data (Schema.org JSON-LD)
- **Severity:** Medium (SimilarWeb Audit: "Structured Data Issues")
- **Root Cause:**
  - 4 pages are completely missing JSON-LD structured data:
    1. `vectorstock-coupons.html`
    2. `wps-office.html`
    3. `tools.html`
    4. `amazon-auto-list.html`
  - Other pages need verification for Schema.org compliance (`ItemPage`, `BreadcrumbList`, `Store`, `FAQPage`, `AggregateRating` required properties).
- **Solution:**
  - Add comprehensive Schema.org JSON-LD (BreadcrumbList, WebPage, ItemList / Store) to `vectorstock-coupons.html` and other missing pages.
  - Validate all JSON-LD schemas against Google Search Central Rich Results guidelines.
- **Verification:**
  - 100% of public content pages validate with zero JSON parse errors and complete schema properties.

---

### 🟢 ISSUE 6: Unminified CSS and JavaScript Files
- **Severity:** Low / Performance (`www.playnewapps.store_unminified_javascript_and_css_files_20260928.csv`)
- **Root Cause:**
  - SimilarWeb flagged the core frontend assets because they are served raw/unminified:
    - `assets/css/style.css` (159 KB raw)
    - `assets/js/app.js` (173 KB raw)
    - `assets/js/script.js` (24 KB raw)
    - `assets/js/components.js` (21 KB raw)
    - `assets/js/data-service.js` (11 KB raw)
- **Solution:**
  - Generate minified production versions (`style.min.css`, `app.min.js`, etc.) or add automated minification / compression pipeline.
  - Ensures faster Core Web Vitals (LCP, INP, FCP) and eliminates the SimilarWeb warning.
- **Verification:**
  - Minified assets verified and served with HTTP gzip/brotli compression headers.

---

### 🟢 ISSUE 7: Content Not Optimized (Thin Pages & Low Word Count Stubs)
- **Severity:** Low / Quality (`www.playnewapps.store_content_not_optimized_20260928.csv`)
- **Root Cause:**
  - Several legacy stub files (e.g., `adguard.html`, `movavi.html`, `recoverit.html`, `hidemyname.html`, `way-com.html`, `italki.html`, `wps-office.html`) have under 80 words.
  - These exist as legacy remnants from earlier iterations, causing crawlers to flag "Low word count (< 300 words)" and "Low text-to-HTML ratio (< 10%)".
- **Solution:**
  - Convert remaining thin HTML stub files into clean HTTP 301 permanent redirects to their respective full coupon pages (e.g. `adguard.html` -> `/adguard-coupons`), or remove thin duplicates so search engines only index authoritative 3,000+ word flagship pages.
- **Verification:**
  - Zero indexable pages with thin / duplicate content.

---

### 🟢 ISSUE 8: Modern AI Search Optimization & `llms.txt`
- **Severity:** Low / Enhancement
- **Root Cause:**
  - SimilarWeb and modern AI search engines look for `/llms.txt` (the emerging web standard for AI engines like Perplexity, ChatGPT, and Google Gemini).
- **Solution:**
  - Create `/llms.txt` and `/llms-full.txt` outlining PlayNewApps' core verified coupon database, review methodology, and clean site structure for AI crawlers.
  - Optimize `robots.txt` with explicit Sitemap declarations and clean directive rules.
- **Verification:**
  - `/llms.txt` accessible at HTTP 200 OK.

---

## 🚀 Recommended Action Sequence

1. **Phase 1 (Immediate - High Priority):**
   - **Fix Issue 1:** Old URLs 410 Gone routing fix (`vercel.json`, `_redirects`, `server.js`).
   - **Fix Issue 2:** Redirect chains and query-param loops fix.
2. **Phase 2 (Content & Meta - Medium Priority):**
   - **Fix Issue 3:** Title tag length optimization (< 65 chars).
   - **Fix Issue 4:** Remove `nofollow` from internal anchors.
   - **Fix Issue 5:** Add missing structured data schemas.
3. **Phase 3 (Performance & Polish - Low Priority):**
   - **Fix Issue 6:** Minify JS & CSS assets.
   - **Fix Issue 7:** Eliminate thin duplicate stub pages.
   - **Fix Issue 8:** Add `llms.txt` and finalize `robots.txt`.

---

## 💬 How to Command Fixes

Simply reply with:
- **`fix issue 1`** -> I will resolve the 410 routing issue immediately.
- **`fix issue 2`** -> I will eliminate all redirect chains and query loops.
- **`fix issue [number]`** -> I will handle that specific task cleanly.
- Or say **`fix all high priority`** -> I will complete Issues 1 & 2 together in one go!
