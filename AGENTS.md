# PlayNewApps Content Creation & Editorial Standards (AGENTS.md)

This file persists mandatory guidelines for adding new stores, coupon pages, reviews, and editorial content to PlayNewApps.

---

## 1. Store & Coupon Pages Standards

When adding or generating a new Store / Coupon page (e.g. `[brand]-coupons.html` or within `store.html`):

### A. Layout & Hierarchy
- **Top Header Section (Clean & Minimalist):**
  - Brand Logo box (`w-40 sm:w-52 h-16 sm:h-20` clean rounded border container) + Store H1 Title (e.g. `[Brand Name] Coupon Codes & Discount Offers (2026)`).
  - **STRICT RULE - No extra text, badges, rating pills, or subtitle paragraphs:** Do NOT add description paragraphs, subtitles, promotional badges (e.g. "VERIFIED OFFICIAL PARTNER", "30-DAY MONEY BACK"), or star rating blocks inside the top header card. The top card MUST contain ONLY the brand logo box and the H1 title.
  - **Top Coupons & Offers (Immediate Above-The-Fold Visibility):**
    - `[X] Verified Offers Available Today` + `Updated Today` live status bar.
    - All verified coupon cards and promo deals must appear immediately right below the header card before any editorial body content.
  - **Standardized RetailMeNot Coupon Card Components:**
    - Top header bar: `Verified` pill + `CODE` / `SALE` type badge + `[X]% OFF` discount pill.
    - Left side: Big bold purple discount hero badge (e.g. `20% OFF`, `85% OFF`, `+3 MO FREE`).
    - Center info box: Clean hyperlinked deal title with official affiliate URL + Social proof line (`thumb_up [X]% Success • [X] interested users`).
    - Action box: Fully hidden code mask (`••••••••`) with purple `Show Code` copy button OR direct blue `Get Deal` affiliate button.
    - Footer accordion: `Show Details (+)` expandable toggle with info icon and clear offer description. Hidden by default.
- **Main Body (Below Coupons):**
  - **3,000+ Words of Comprehensive Content:** Deep, authoritative, human-crafted guide matching the standard of flagship pages (like AliExpress, Lenovo, AdGuard, Crossout).
  - **Zero AI-Slop / Boilerplate:** Authentic, natural, conversational yet expert tone. Real insights, practical shopping advice, step-by-step instructions.
  - **Sections Required:**
    1. Introduction to the brand, ecosystem, and core offerings.
    2. Step-by-step guide on how to apply promo codes during checkout (with visual callouts).
    3. Comprehensive savings hacks & insider shopping tips (student discounts, newsletter perks, seasonal sales like Choice Day / Black Friday).
    4. Detailed product/service categories & buying recommendations.
    5. Shipping, warranty, refund, and customer support policies explained clearly.
    6. Comparison with key market alternatives or pricing breakdown table.
    7. Comprehensive Frequently Asked Questions (FAQ) schema with high-value answers.

### B. SEO & Keyword Architecture
- **Primary Keywords:** Focus strictly on coupon-intent search terms:
  - `[Brand Name] Coupon Code`
  - `[Brand Name] Promo Code`
  - `[Brand Name] Discount Codes & Verified Deals`
- **Structured Data:** Full `Schema.org` JSON-LD for Organization, BreadcrumbList, WebPage, and ItemList / FAQPage where applicable.
- **Canonical & Meta Tags:** Explicit canonical URL, OpenGraph tags, Twitter Card tags, and meta descriptions.

### C. Visuals & Media
- **Official Assets Only:** Use verified official logos, official platform screenshots, product line diagrams, or high-definition SVG infographics.
- **Official Video Resources:** Embed or link official tutorials, product overviews, or video guides where available.

### D. Automatic Sitemap Inclusion
- Whenever a new store is added to `data/stores.json` or a standalone `[brand]-coupons.html` page is created, run `node generate-sitemap.js` to ensure the URL is automatically included in `sitemap.xml` with proper priority (0.95) and daily change frequency.

---

## 2. Review Pages Standards

When creating dedicated in-depth software, app, or game review pages (e.g. `[brand]-review.html` or `review.html?id=[id]`):
- **Tone & Persona:** Written from the perspective of an expert, objective tech journalist / professional reviewer.
- **Structure:**
  - Hands-on testing methodology & overview.
  - Key features deep dive with actual UI screenshots.
  - Performance benchmarks, ease of use, and compatibility.
  - Honest Pros & Cons list.
  - Pricing & plan value assessment.
  - Editor's final verdict & rating breakdown (Ease of Use, Features, Value, Performance, Design).

---

## 3. Strict UI & Formatting Rules (Zero-Tolerance)

### A. Coupon Codes MUST Be Strictly Hidden
- **Never display the actual promo code in plaintext** anywhere on the page (in coupon titles, descriptions, card body, badges, or "Show Details" text).
- The discount code must **only** be revealed when the user explicitly clicks the **"Show Code"** button (which copies the code to clipboard and launches the official store).
- The code mask placeholder before clicking must always be completely obfuscated (e.g. `••••••••`) so users cannot read the code beforehand.

### B. Clean Currency Notation & Accurate Dollar Values (Zero-Tolerance)
- When the dollar symbol (`$`) is used, **never** write `US$` or `USD$` (e.g., write `$2 OFF`, `$15`, `$55 OFF`, never `US$2 OFF` or `US$15`).
- Keep currency symbols standard and clean: `$`, `€`, `£`, etc.
- **Accurate Figures & No Truncated Values:** Always verify that every monetary amount includes its full digits and proper currency symbol (e.g., `$20 OFF`, `$50 OFF`, `Orders Over $75`, `$100+`, `from $49`).
- **Strict Prohibition of Zero-Value / Broken Numbers:** Never output `0 OFF`, `Over 00`, `FROM 9` (without `$`), `Over 5`, or empty strings like `Starting from `. All offers must be authentic, verified, and complete.

### C. Official Logos & Transparent Backgrounds
- All brand and store logos must be sourced directly from official websites / verified official vector resources (SVG/PNG).
- **Transparent / Clean White Backgrounds Mandatory:** Logos must have transparent or clean white backgrounds that blend seamlessly with the store cards grid on `/stores`, `/categories`, and coupon pages. Never use solid black or dark box backgrounds for logos on light cards.
- **Prefer SVG Vectors:** Always prefer `.svg` for store and brand logos for crisp rendering on high-DPI displays.
- Never use broken, placeholder, or unofficial low-quality imagery.

---

## 4. Data & File Integrity
- Never delete existing stores, reviews, or scripts.
- Ensure all images have valid SVG/PNG paths and proper dimensions (`width`, `height`, `loading="lazy"`).
- Always verify the app with `compile_applet` and `lint_applet` after creating or editing pages.

