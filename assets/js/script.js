/**
 * PlayNewApps - Main JavaScript File
 * Vanilla JS Implementation - Performance & UX Optimized
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Set Current Year in Footer
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // 1. Loading Animation Removal (Graceful)
    const loader = document.getElementById('loader');
    if (loader) {
        // Fallback max wait
        window.addEventListener('load', removeLoader);
        setTimeout(removeLoader, 3000); 
    }

    function removeLoader() {
        if (!loader.classList.contains('fade-out')) {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    }

    // 2. Theme Toggle (Dark/Light Mode)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector('.material-icons-round');

        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            htmlElement.setAttribute('data-theme', 'dark');
            if (themeIcon) themeIcon.textContent = 'light_mode';
        }

        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            if (currentTheme === 'light') {
                htmlElement.setAttribute('data-theme', 'dark');
                if (themeIcon) themeIcon.textContent = 'light_mode';
                localStorage.setItem('theme', 'dark');
            } else {
                htmlElement.setAttribute('data-theme', 'light');
                if (themeIcon) themeIcon.textContent = 'dark_mode';
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // 3. Mobile Menu Toggle (Accessibility Improved)
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('nav');
    if (mobileMenuBtn && nav) {
        const menuIcon = mobileMenuBtn.querySelector('.material-icons-round');

        function toggleMenu() {
            const isActive = nav.classList.toggle('active');
            mobileMenuBtn.setAttribute('aria-expanded', isActive);
            
            if (isActive) {
                if (menuIcon) menuIcon.textContent = 'close';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            } else {
                if (menuIcon) menuIcon.textContent = 'menu';
                document.body.style.overflow = '';
            }
        }

        mobileMenuBtn.addEventListener('click', toggleMenu);

        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    }

    // 4. Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        // Throttle scroll event for performance
        let isScrolling;
        window.addEventListener('scroll', () => {
            window.clearTimeout(isScrolling);
            isScrolling = setTimeout(() => {
                if (window.scrollY > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            }, 100); // 100ms throttle
        }, { passive: true }); // passive listener for scroll performance

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 5. Affiliate Coupon System
    const toastContainer = document.getElementById('toast-container') || createToastContainer();
    
    function createToastContainer() {
        const container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        container.setAttribute('aria-live', 'polite');
        document.body.appendChild(container);
        return container;
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<span class="material-icons-round">check_circle</span> ${message}`;
        
        toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('hiding');
            toast.addEventListener('animationend', () => {
                toast.remove();
            });
        }, 3000);
    }

    document.addEventListener('click', async (e) => {
        const btn = e.target.closest('.show-code-btn');
        if (!btn) return;
        const wrapper = btn.closest('.code-reveal-wrapper');
        if (!wrapper) return;

        const mask = wrapper.querySelector('.hidden-code-mask');
        const realCode = wrapper.getAttribute('data-code');
        const affiliateLink = wrapper.getAttribute('data-link') || 'https://rzekl.com/g/pm1aev55clb68b264a76219aa26f6f/?ulp=https%3A%2F%2Fwww.alibaba.com';

        if (!realCode) return;

        if (!wrapper.classList.contains('revealed')) {
            wrapper.classList.add('revealed');
            if (mask) mask.textContent = realCode;
            btn.textContent = 'Copied!';
            
            try {
                await navigator.clipboard.writeText(realCode);
                if (typeof showToast === 'function') showToast('Coupon copied! Opening store...');
            } catch (err) {
                if (typeof showToast === 'function') showToast('Code revealed! Opening store...');
            }

            if (typeof window.showCouponModal === 'function') {
                window.showCouponModal(realCode, affiliateLink);
            }

            if (affiliateLink) {
                window.open(affiliateLink, '_blank', 'noopener,sponsored');
            }
            
            setTimeout(() => {
                btn.textContent = 'Copy';
            }, 3000);
        } else {
            try {
                await navigator.clipboard.writeText(realCode);
                btn.textContent = 'Copied!';
                if (typeof showToast === 'function') showToast('Coupon copied!');
                if (typeof window.showCouponModal === 'function') {
                    window.showCouponModal(realCode, affiliateLink);
                }
                setTimeout(() => {
                    btn.textContent = 'Copy';
                }, 3000);
            } catch (err) {}
        }
    });

    // 6. Smooth Reveal Animations via Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, {
            root: null,
            threshold: 0.1, // Trigger when 10% is visible
            rootMargin: "0px 0px -50px 0px"
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('active'));
    }

    // 7. Animated Counters
    const counters = document.querySelectorAll('.counter-number');
    
    if ('IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    } else {
        counters.forEach(counter => startCounter(counter));
    }

    function startCounter(counter) {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const stepTime = Math.abs(Math.floor(duration / 100)); // ~100 frames
        let current = 0;
        const increment = target / 100;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.innerText = target > 1000 ? (target/1000).toFixed(target>=1000000?1:0) + (target>=1000000?'M+':'k+') : target;
                clearInterval(timer);
            } else {
                counter.innerText = Math.ceil(current);
            }
        }, stepTime);
    }

    // 8. Search Suggestions - Delegated to App.initSearch() in app.js for real data integration

    // 9. Skeleton Loading & Review Injection
    const reviewsGrid = document.getElementById('reviews-grid');
    const reviewDataTemplate = document.getElementById('review-data');
    
    if (reviewsGrid && reviewDataTemplate) {
        // Create 3 skeleton cards
        for(let i=0; i<3; i++) {
            const skeletonHTML = `
                <article class="card skeleton">
                    <div class="card-img-wrapper">
                        <div class="skeleton-img"></div>
                    </div>
                    <div class="card-content">
                        <div class="skeleton-text short"></div>
                        <div class="skeleton-text"></div>
                        <div class="skeleton-text medium"></div>
                        <div class="skeleton-text short" style="margin-top:auto"></div>
                    </div>
                </article>
            `;
            reviewsGrid.insertAdjacentHTML('beforeend', skeletonHTML);
        }

        // Simulate network request then replace skeletons with actual data
        setTimeout(() => {
            reviewsGrid.innerHTML = '';
            const clone = reviewDataTemplate.content.cloneNode(true);
            reviewsGrid.appendChild(clone);
            initCategoryFilter(); // Initialize filter after items are injected
        }, 1500); // 1.5s delay simulation
    }

    // 10. Category Filter
    function initCategoryFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const reviewCards = document.querySelectorAll('#reviews-grid .review-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button state
                filterBtns.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');

                const filter = btn.getAttribute('data-filter');

                // Filter cards
                reviewCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.classList.remove('hide');
                        // Small animation reset
                        card.style.animation = 'none';
                        card.offsetHeight; /* trigger reflow */
                        card.style.animation = null; 
                    } else {
                        card.classList.add('hide');
                    }
                });
            });
        });
    }

    // 11. Featured Slider (Vanilla JS)
    const track = document.getElementById('slider-track');
    const prevBtn = document.querySelector('.slider-container .prev-btn');
    const nextBtn = document.querySelector('.slider-container .next-btn');

    if (track && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            const slide = track.querySelector('.slide');
            if (!slide) return;
            const gap = parseFloat(window.getComputedStyle(track).gap) || 24;
            const slideWidth = slide.offsetWidth + gap;
            track.scrollBy({ left: -slideWidth, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            const slide = track.querySelector('.slide');
            if (!slide) return;
            const gap = parseFloat(window.getComputedStyle(track).gap) || 24;
            const slideWidth = slide.offsetWidth + gap;
            track.scrollBy({ left: slideWidth, behavior: 'smooth' });
        });
    }

    // 12. FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';
            
            btn.setAttribute('aria-expanded', !isExpanded);
            btn.nextElementSibling.setAttribute('aria-hidden', isExpanded);
        });
    });

    // 13. Newsletter Form Validation
    const newsletterForm = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('newsletter-email');
    const errorMsg = document.getElementById('email-error');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!email) {
                showError('Email is required.');
            } else if (!emailRegex.test(email)) {
                showError('Please enter a valid email address.');
            } else {
                // Success
                errorMsg.textContent = '';
                emailInput.classList.remove('error');
                
                const btn = newsletterForm.querySelector('button');
                const originalText = btn.textContent;
                btn.textContent = 'Subscribed!';
                btn.style.backgroundColor = 'var(--secondary-color)';
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                    emailInput.value = '';
                }, 3000);
            }
        });

        emailInput.addEventListener('input', () => {
            if (emailInput.classList.contains('error')) {
                errorMsg.textContent = '';
                emailInput.classList.remove('error');
            }
        });
    }

    function showError(msg) {
        errorMsg.textContent = msg;
        emailInput.classList.add('error');
        emailInput.focus();
    }

    // 14. Cookie Consent Banner (Deferred for Perfect Core Web Vitals & Non-blocking FCP/LCP)
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const declineBtn = document.getElementById('cookie-decline');

    if (cookieBanner) {
        let bannerTriggered = false;
        const triggerCookieBanner = () => {
            if (bannerTriggered) return;
            bannerTriggered = true;
            cleanupCookieListeners();
            if (!localStorage.getItem('cookieConsent')) {
                cookieBanner.classList.add('show');
            }
        };

        const cleanupCookieListeners = () => {
            window.removeEventListener('scroll', triggerCookieBanner);
            window.removeEventListener('touchstart', triggerCookieBanner);
            window.removeEventListener('click', triggerCookieBanner);
            window.removeEventListener('keydown', triggerCookieBanner);
        };

        if (!localStorage.getItem('cookieConsent')) {
            window.addEventListener('scroll', triggerCookieBanner, { passive: true, once: true });
            window.addEventListener('touchstart', triggerCookieBanner, { passive: true, once: true });
            window.addEventListener('click', triggerCookieBanner, { passive: true, once: true });
            window.addEventListener('keydown', triggerCookieBanner, { passive: true, once: true });
            setTimeout(triggerCookieBanner, 6000);
        }

        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => {
                localStorage.setItem('cookieConsent', 'accepted');
                cookieBanner.classList.remove('show');
            });
        }

        if (declineBtn) {
            declineBtn.addEventListener('click', () => {
                localStorage.setItem('cookieConsent', 'declined');
                cookieBanner.classList.remove('show');
            });
        }
    }

    // 15. Lightbox for Review Page
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (lightbox && lightboxImg) {
        const closeLightbox = () => {
            lightbox.classList.remove('active');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            setTimeout(() => {
                if (!lightbox.classList.contains('active')) {
                    lightboxImg.setAttribute('src', '');
                }
            }, 300);
        };

        const openLightbox = (src, alt) => {
            if (!src) return;
            lightboxImg.setAttribute('src', src);
            lightboxImg.setAttribute('alt', alt || 'Enlarged screenshot');
            lightbox.classList.add('active');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        };

        // Close button event listener
        if (lightboxClose) {
            lightboxClose.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                closeLightbox();
            });
        }

        // Close on background click (clicking outside the image content)
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-close') || e.target.closest('.lightbox-close')) {
                closeLightbox();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if ((e.key === 'Escape' || e.key === 'Esc') && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });

        // Open lightbox via click delegation on any .lightbox-trigger element (handles dynamic elements)
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('.lightbox-trigger');
            if (trigger) {
                const src = trigger.getAttribute('data-full') || trigger.getAttribute('src');
                const alt = trigger.getAttribute('alt');
                openLightbox(src, alt);
            }
        });

        // Open lightbox via Enter key when focused on a trigger
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && document.activeElement && document.activeElement.classList.contains('lightbox-trigger')) {
                const src = document.activeElement.getAttribute('data-full') || document.activeElement.getAttribute('src');
                const alt = document.activeElement.getAttribute('alt');
                openLightbox(src, alt);
            }
        });
    }
});

// Global RetailMeNot Style Coupon Details Toggle
function toggleCouponDetails(btn) {
    if (!btn) return;
    
    // Prevent double execution from inline onclick + event listener bubbling
    const now = Date.now();
    if (btn._lastToggle && (now - btn._lastToggle < 200)) {
        return;
    }
    btn._lastToggle = now;

    const card = btn.closest('.coupon-card, .deal-card, .card, article, .retailmenot-style, .retailmenot-card') || 
                 (btn.closest('.coupon-details-footer') ? btn.closest('.coupon-details-footer').parentElement : btn.parentElement.parentElement);
    if (!card) return;
    const detailsBox = card.querySelector('.coupon-details-content, .details-content, .coupon-details');
    if (!detailsBox) return;

    const isHidden = detailsBox.classList.contains('hidden') || window.getComputedStyle(detailsBox).display === 'none';
    const textSpan = btn.querySelector('.btn-text') || btn.querySelector('span:not(.toggle-icon)');
    const iconSpan = btn.querySelector('.toggle-icon');

    if (isHidden) {
        detailsBox.classList.remove('hidden');
        detailsBox.style.display = 'block';
        if (textSpan) textSpan.textContent = 'Hide Details ';
        if (iconSpan) iconSpan.textContent = '-';
        btn.classList.add('bg-amber-300', 'text-slate-950', 'border-amber-400', 'active-details');
        btn.classList.remove('bg-slate-100', 'text-slate-700', 'border-slate-300');
        btn.style.backgroundColor = '#facc15';
        btn.style.color = '#0f172a';
        btn.style.borderColor = '#eab308';
    } else {
        detailsBox.classList.add('hidden');
        detailsBox.style.display = 'none';
        if (textSpan) textSpan.textContent = 'Show Details ';
        if (iconSpan) iconSpan.textContent = '+';
        btn.classList.remove('bg-amber-300', 'text-slate-950', 'border-amber-400', 'active-details');
        btn.classList.add('bg-slate-100', 'text-slate-700', 'border-slate-300');
        btn.style.backgroundColor = '#f1f5f9';
        btn.style.color = '#334155';
        btn.style.borderColor = '#cbd5e1';
    }
}
window.toggleCouponDetails = toggleCouponDetails;

// Global Coupon Modal Popup Function
window.showCouponModal = function(code, link) {
    let modal = document.getElementById('coupon-modal-popup');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'coupon-modal-popup';
        modal.className = 'coupon-modal-overlay';
        document.body.appendChild(modal);
    }

    const targetUrl = link || 'https://www.alibaba.com';

    modal.innerHTML = `
        <div class="coupon-modal-card">
            <button class="coupon-modal-close" aria-label="Close modal">&times;</button>
            <div class="coupon-modal-header">
                <span class="material-icons-round modal-check-icon">verified</span>
                <h3>Promo Code Copied!</h3>
                <p>Paste this verified code at checkout to apply your savings.</p>
            </div>
            <div class="coupon-modal-code-box">
                <span class="modal-code-text">${code}</span>
                <button class="modal-copy-btn" id="modal-copy-trigger">
                    <span class="material-icons-round">content_copy</span> Copy
                </button>
            </div>
            <div class="coupon-modal-actions">
                <a href="${targetUrl}" target="_blank" rel="noopener sponsored" class="modal-go-btn">
                    <span>Go to Store</span>
                    <span class="material-icons-round">open_in_new</span>
                </a>
            </div>
            <p class="modal-note">Opening store in a new tab...</p>
        </div>
    `;

    modal.classList.add('active');

    // Attach modal close events
    const closeBtn = modal.querySelector('.coupon-modal-close');
    if (closeBtn) {
        closeBtn.onclick = () => modal.classList.remove('active');
    }
    modal.onclick = (e) => {
        if (e.target === modal) modal.classList.remove('active');
    };

    // Attach modal copy button event
    const copyBtn = modal.querySelector('#modal-copy-trigger');
    if (copyBtn) {
        copyBtn.onclick = async () => {
            try {
                await navigator.clipboard.writeText(code);
                copyBtn.innerHTML = `<span class="material-icons-round">check</span> Copied!`;
                setTimeout(() => {
                    copyBtn.innerHTML = `<span class="material-icons-round">content_copy</span> Copy`;
                }, 2500);
            } catch(e){}
        };
    }
};

document.addEventListener('click', function(e) {
    const btn = e.target.closest('.toggle-details-btn');
    if (btn) {
        e.preventDefault();
        window.toggleCouponDetails(btn);
    }
});


