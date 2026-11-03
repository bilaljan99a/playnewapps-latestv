/* PlayNewApps standard coupon reveal — ONE behavior on every coupon page.
 *
 * RetailMeNot-exact flow (adapted 2026-11-03, supersedes the modal-only
 * refined flow): one click on "Show Code" does TWO things at once —
 *   (1) the CURRENT tab navigates to the affiliate URL, and
 *   (2) a NEW tab opens on the same coupon page with ?pna_code=<code>,
 *       and browser focus switches to that new tab, where a modal shows
 *       the code (COPY button copies it; the card behind shows the code
 *       revealed inline). No auto-copy on the first click — copying happens
 *       only via the modal's COPY button, exactly like RetailMeNot.
 * Closing the modal drops ?pna_code from the URL, so a fresh load shows
 * all cards masked again (session-tied state, like RetailMeNot).
 * Clicking an already-revealed control re-opens the modal only.
 *
 * The script tag lives in <head> (not before </body>) so the capture
 * listener is attached before any card button can be clicked — this kills
 * the load race where an instant click ran the page's own handler.
 * The parser below (between PARSER-START / PARSER-END) is pure string
 * logic and is unit-tested in Node against every real onclick on the site.
 */

/* PARSER-START */
function pnaParseReveal(onclick) {
  if (!onclick) return null;
  var quoted = [];
  var re = /'([^']*)'|"([^"]*)"/g;
  var m;
  while ((m = re.exec(onclick)) !== null) {
    quoted.push(m[1] !== undefined ? m[1] : m[2]);
  }
  var url = null;
  for (var i = 0; i < quoted.length; i++) {
    if (/^https?:\/\//.test(quoted[i])) { url = quoted[i]; break; }
  }
  var fnMatch = onclick.match(/^\s*([A-Za-z_$][\w$]*)\s*\(/);
  var fn = fnMatch ? fnMatch[1] : null;
  var code = null;
  if (/writeText\s*\(/.test(onclick)) {
    var wt = onclick.match(/writeText\(\s*['"]([^'"]+)['"]/);
    if (wt) code = wt[1];
  } else if (fn === 'handleCouponReveal') {
    code = quoted[0] || null;
  } else if (fn === 'handleShowCode' || fn === 'handleCouponClick') {
    code = quoted[0] || null;
  } else if (fn === 'openCouponModal' || fn === 'openCodeModal') {
    code = quoted[0] || null;
  } else if (fn === 'revealAndCopyCode') {
    code = quoted[1] || null;
  } else if (fn === 'revealCode' || fn === 'copyAndRedirect') {
    code = quoted[0] || null;
  } else {
    // Unknown handler: only accept an unambiguous single short token.
    var rest = quoted.filter(function (q) { return q !== url; });
    if (rest.length === 1 && /^[A-Za-z0-9\-_]{3,40}$/.test(rest[0])) code = rest[0];
  }
  if (fn === 'handleCouponReveal' || fn === 'handleShowCode' ||
      fn === 'handleCouponClick' || fn === 'openCouponModal' ||
      fn === 'openCodeModal' || fn === 'revealAndCopyCode' ||
      fn === 'revealCode' || fn === 'copyAndRedirect') {
    // URL is positional for known handlers; fall back to the http arg found.
    var pos = { handleCouponReveal: 3, handleShowCode: 1, handleCouponClick: 1,
      openCouponModal: 2, openCodeModal: 2, revealAndCopyCode: 2,
      revealCode: 1, copyAndRedirect: 2 }[fn];
    if (quoted[pos] && /^https?:\/\//.test(quoted[pos])) url = quoted[pos];
  }
  if (code && url) return { code: code, url: url };
  return null;
}
/* PARSER-END */

(function () {
  function pnaFallbackCopy(text) {
    try {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    } catch (e) { /* clipboard unavailable; modal still shows the code */ }
  }

  function pnaCopy(text) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(function () { pnaFallbackCopy(text); });
        return;
      }
    } catch (e) {}
    pnaFallbackCopy(text);
  }

  function pnaCloseModal() {
    var modal = document.getElementById('pna-reveal-modal');
    if (modal) modal.className = 'pna-modal-hidden';
    // RetailMeNot drops its modal param on close; do the same.
    try {
      var u = new URL(window.location.href);
      if (u.searchParams.has('pna_code')) {
        u.searchParams.delete('pna_code');
        window.history.replaceState(null, '', u.toString());
      }
    } catch (e) {}
  }

  function pnaEnsureModal() {
    var modal = document.getElementById('pna-reveal-modal');
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'pna-reveal-modal';
    modal.className = 'pna-modal-hidden';
    modal.innerHTML =
      '<div class="pna-modal-overlay">' +
        '<div class="pna-modal-card" role="dialog" aria-label="Your coupon code">' +
          '<button type="button" class="pna-modal-close" aria-label="Close">&times;</button>' +
          '<div class="pna-modal-title">Your coupon code</div>' +
          '<div id="pna-modal-deal" style="font-weight:700;margin:6px 0 10px;"></div>' +
          '<div class="pna-modal-code" id="pna-modal-code"></div>' +
          '<div class="pna-modal-note">Copy and paste this code at checkout.</div>' +
          '<div class="pna-modal-actions">' +
            '<button type="button" id="pna-modal-copy">COPY</button>' +
            '<a id="pna-modal-continue" target="_blank" rel="noopener noreferrer nofollow">Continue to store</a>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modal);
    modal.querySelector('.pna-modal-close').addEventListener('click', pnaCloseModal);
    modal.querySelector('.pna-modal-overlay').addEventListener('click', function (e) {
      if (e.target === this) pnaCloseModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') pnaCloseModal();
    });
    modal.querySelector('#pna-modal-copy').addEventListener('click', function () {
      var code = document.getElementById('pna-modal-code').textContent;
      pnaCopy(code);
      this.textContent = 'COPIED';
    });
    return modal;
  }

  function pnaShowModal(data, dealTitle) {
    var modal = pnaEnsureModal();
    document.getElementById('pna-modal-code').textContent = data.code;
    var deal = document.getElementById('pna-modal-deal');
    if (deal) deal.textContent = dealTitle || '';
    document.getElementById('pna-modal-continue').href = data.url;
    var copyBtn = document.getElementById('pna-modal-copy');
    copyBtn.textContent = 'COPY';
    modal.className = '';
  }

  function pnaExtract(el) {
    var oc = el.getAttribute && el.getAttribute('onclick');
    if (oc) {
      var parsed = pnaParseReveal(oc);
      if (parsed) return parsed;
    }
    var wrapper = el.closest ? el.closest('.code-reveal-wrapper') : null;
    var code = (wrapper && wrapper.getAttribute('data-code')) || el.getAttribute('data-code');
    var link = (wrapper && wrapper.getAttribute('data-link')) || el.getAttribute('data-link');
    if (code && link) return { code: code, url: link };
    return null;
  }

  // Reveal the masked code inline. No label changes here: nothing is
  // copied yet, so no 'Copied!' state is ever shown before a COPY click.
  function pnaRevealInline(btn, code) {
    var spans = btn.querySelectorAll ? btn.querySelectorAll('span') : [];
    for (var i = 0; i < spans.length; i++) {
      var st = spans[i].textContent || '';
      if (/•{3,}/.test(st)) {
        spans[i].textContent = code;
        // Mask sits INSIDE the purple button: white text, not green — dark
        // green on purple is unreadable (user-reported 2026-11-03).
        spans[i].style.color = '#FFFFFF';
        spans[i].style.fontWeight = '800';
      }
    }
    // Sibling mask (standard template: <span>••••</span> before the button).
    var prev = btn.previousElementSibling;
    if (prev && /•{3,}/.test(prev.textContent || '')) {
      prev.textContent = code;
      prev.style.color = '#047857';
      prev.style.fontWeight = '800';
    }
    // Wrapper mask (shared-button pages).
    var wrapper = btn.closest ? btn.closest('.code-reveal-wrapper') : null;
    if (wrapper) {
      var wm = wrapper.querySelector('.hidden-code-mask');
      if (wm) {
        wm.textContent = code;
        wm.style.color = '#047857';
        wm.style.fontWeight = '800';
      }
    }
  }

  // New-tab load path: the button area itself becomes the code pill,
  // exactly like RetailMeNot's revealed card.
  function pnaRevealCardForLoad(el, code) {
    var spans = el.querySelectorAll ? el.querySelectorAll('span') : [];
    var inBtn = false;
    for (var i = 0; i < spans.length; i++) {
      if (/•{3,}/.test(spans[i].textContent || '')) { inBtn = true; break; }
    }
    if (inBtn && el.tagName === 'BUTTON') {
      try { el.textContent = code; } catch (e) {}
      el.style.color = '#FFFFFF';
      el.style.fontWeight = '800';
      return;
    }
    pnaRevealInline(el, code);
  }

  function pnaCardTitle(el) {
    try {
      var card = el.closest ? el.closest('article') : null;
      var h = card && (card.querySelector('h2 a') || card.querySelector('h2'));
      if (h && h.textContent) return h.textContent.replace(/\s+/g, ' ').trim();
    } catch (e) {}
    return '';
  }

  function pnaModalUrl(code) {
    try {
      var u = new URL(window.location.href);
      u.searchParams.delete('pna_code');
      u.searchParams.set('pna_code', code);
      u.hash = '';
      return u.toString();
    } catch (e) {
      var base = window.location.href.split('#')[0].split('?')[0];
      return base + '?pna_code=' + encodeURIComponent(code);
    }
  }

  document.addEventListener('click', function (e) {
    var target = e.target;
    if (!target || !target.closest) return;
    var el = target.closest('button, a');
    if (!el) return;
    // Never intercept clicks inside our own modal or an old page modal.
    if (el.closest('#pna-reveal-modal')) return;
    var doneCode = el.getAttribute && el.getAttribute('data-pna-code');
    var doneUrl = el.getAttribute && el.getAttribute('data-pna-url');
    var data = null;
    var repeat = false;
    if (doneCode && doneUrl) {
      data = { code: doneCode, url: doneUrl };
      repeat = true;
    } else {
      var text = (el.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
      if (text.indexOf('show code') === -1) return;
      data = pnaExtract(el);
    }
    if (!data || !data.code || !data.url) return; // leave unknown buttons alone
    e.preventDefault();
    e.stopPropagation();
    if (el.tagName === 'BUTTON') {
      try {
        el.setAttribute('data-pna-code', data.code);
        el.setAttribute('data-pna-url', data.url);
      } catch (err) {}
    }
    if (repeat) {
      // Already-revealed control: modal only, no navigation, no new tab.
      pnaShowModal(data, pnaCardTitle(el));
      return;
    }
    // RetailMeNot-exact: reveal inline as a fallback, open the modal tab,
    // then navigate this tab to the affiliate URL. No auto-copy.
    pnaRevealInline(el, data.code);
    try { window.open(pnaModalUrl(data.code), '_blank', 'noopener,noreferrer'); } catch (err) {}
    window.location.href = data.url;
  }, true);

  function pnaHandleLoadParam() {
    var code = null;
    try { code = new URL(window.location.href).searchParams.get('pna_code'); } catch (e) {}
    if (!code) return;
    var els = document.querySelectorAll('button, a');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (el.closest && el.closest('#pna-reveal-modal')) continue;
      var data = null;
      var oc = el.getAttribute && el.getAttribute('onclick');
      if (oc) {
        var parsed = pnaParseReveal(oc);
        if (parsed && parsed.code === code) data = parsed;
      }
      if (!data) {
        var wrapper = el.closest ? el.closest('.code-reveal-wrapper') : null;
        var wcode = (wrapper && wrapper.getAttribute('data-code')) || el.getAttribute('data-code');
        var wlink = (wrapper && wrapper.getAttribute('data-link')) || el.getAttribute('data-link');
        if (wcode === code && wlink) data = { code: wcode, url: wlink };
      }
      if (!data) continue;
      if (el.tagName === 'BUTTON') {
        try {
          el.setAttribute('data-pna-code', data.code);
          el.setAttribute('data-pna-url', data.url);
        } catch (err) {}
      }
      pnaRevealCardForLoad(el, code);
      pnaShowModal(data, pnaCardTitle(el));
      break;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', pnaHandleLoadParam);
  } else {
    pnaHandleLoadParam();
  }
})();
