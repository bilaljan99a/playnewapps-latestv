const fs = require('fs');
const path = require('path');

// Common Header Generator
function getHeader(title, activeSection, brandLogo, brandName, targetUrl, ctaText = 'Check Price & Availability') {
  return `
    <!-- Header Navigation -->
    <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm" id="site-header">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <!-- Brand Logo & Name -->
                <a href="/" class="flex items-center gap-3 text-decoration-none" id="brand-home-link">
                    <img src="/assets/images/logo.svg" alt="PlayNewApps Logo" class="w-10 h-10 rounded-xl shadow-sm" style="width: 40px; height: 40px; max-width: 40px; max-height: 40px; flex-shrink: 0; object-fit: contain;">
                    <div class="flex flex-col">
                        <span class="font-extrabold text-xl tracking-tight text-gray-900 leading-none">PlayNewApps</span>
                        <span class="text-xs font-semibold text-blue-600 uppercase tracking-wider mt-1">${title}</span>
                    </div>
                </a>

                <!-- Navigation Links -->
                <nav class="hidden md:flex items-center space-x-7 text-sm font-medium text-gray-600" id="desktop-nav">
                    <a href="/reviews" class="hover:text-blue-600 transition-colors">All Reviews</a>
                    <a href="#overview" class="hover:text-blue-600 transition-colors">Overview</a>
                    <a href="#hardware-specs" class="hover:text-blue-600 transition-colors">Hardware &amp; Design</a>
                    <a href="#benchmarks" class="hover:text-blue-600 transition-colors">Benchmarks</a>
                    <a href="#comparison" class="hover:text-blue-600 transition-colors">Competitors</a>
                    <a href="#pros-and-cons" class="hover:text-blue-600 transition-colors">Pros &amp; Cons</a>
                    <a href="#faq-section" class="hover:text-blue-600 transition-colors">FAQ</a>
                </nav>

                <!-- CTA Header Button -->
                <div class="flex items-center gap-3">
                    <a href="${targetUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 rounded-lg shadow-sm transition-all transform hover:-translate-y-0.5" id="header-cta-btn">
                        <span>${ctaText}</span>
                        <span class="material-icons-round text-base" aria-hidden="true">open_in_new</span>
                    </a>
                </div>
            </div>
        </div>
    </header>`;
}

// Common Footer Generator
function getFooter() {
  return `
    <!-- Global Footer -->
    <footer class="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-20" id="site-footer">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div>
                    <div class="flex items-center gap-2 mb-4">
                        <img src="/assets/images/logo.svg" alt="PlayNewApps Logo" class="w-8 h-8 rounded-lg" style="width: 32px; height: 32px;">
                        <span class="font-black text-xl text-white tracking-tight">PlayNewApps</span>
                    </div>
                    <p class="text-xs text-slate-400 leading-relaxed mb-4">
                        Independent software, gaming, and tech hardware testing laboratory. Unbiased benchmarks, comprehensive teardowns, and verified savings guides.
                    </p>
                    <div class="text-xs text-slate-500">
                        &copy; 2026 PlayNewApps. All rights reserved.
                    </div>
                </div>

                <div>
                    <h4 class="text-xs font-bold text-white uppercase tracking-wider mb-4">Hardware &amp; Gaming</h4>
                    <ul class="space-y-2 text-xs">
                        <li><a href="/steam-deck-review" class="hover:text-white transition-colors">Steam Deck Review</a></li>
                        <li><a href="/xbox-series-x-review" class="hover:text-white transition-colors">Xbox Series X Review</a></li>
                        <li><a href="/ps5-review" class="hover:text-white transition-colors">PS5 Review</a></li>
                        <li><a href="/oculus-quest-2-review" class="hover:text-white transition-colors">Oculus Quest 2 Review</a></li>
                    </ul>
                </div>

                <div>
                    <h4 class="text-xs font-bold text-white uppercase tracking-wider mb-4">Software &amp; OS Reviews</h4>
                    <ul class="space-y-2 text-xs">
                        <li><a href="/windows-11-review" class="hover:text-white transition-colors">Windows 11 Review</a></li>
                        <li><a href="/canva-review" class="hover:text-white transition-colors">Canva Review</a></li>
                        <li><a href="/elevenlabs-review" class="hover:text-white transition-colors">ElevenLabs Review</a></li>
                        <li><a href="/avast-antivirus-review" class="hover:text-white transition-colors">Avast Antivirus Review</a></li>
                    </ul>
                </div>

                <div>
                    <h4 class="text-xs font-bold text-white uppercase tracking-wider mb-4">Navigation &amp; Legal</h4>
                    <ul class="space-y-2 text-xs">
                        <li><a href="/reviews" class="hover:text-white transition-colors">All Reviews Directory</a></li>
                        <li><a href="/stores" class="hover:text-white transition-colors">Verified Stores &amp; Deals</a></li>
                        <li><a href="/about" class="hover:text-white transition-colors">About Our Lab &amp; Methodology</a></li>
                        <li><a href="/privacy" class="hover:text-white transition-colors">Privacy Policy</a></li>
                        <li><a href="/affiliate" class="hover:text-white transition-colors">Affiliate Disclosure</a></li>
                    </ul>
                </div>
            </div>
            <div class="pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
                PlayNewApps is an independent consumer technology publication. Trademarks, product logos, and brand names are property of their respective owners.
            </div>
        </div>
    </footer>`;
}

module.exports = { getHeader, getFooter };
