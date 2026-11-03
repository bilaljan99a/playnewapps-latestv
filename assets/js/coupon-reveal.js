/* PlayNewApps standard coupon reveal — ONE behavior on every coupon page.
 *
 * User rule: one click on "Show Code" must (1) copy the code, (2) SHOW the code
 * to the user, and (3) auto-open the affiliate link in a NEW tab — no second
 * click, no back-button, no same-tab navigation.
 *
 * How it works: a capture-phase document listener intercepts every "Show Code"
 * click before any page handler runs (inline onclick, modal openers, delayed
 * openers). It extracts code + affiliate URL from the control, copies the
 * code, shows one standard modal with the code, and opens the affiliate URL
 * synchronously in a new tab. If extraction fails, the click is left alone so
 * the page's own behavior still runs — never break a working button.
 *
 * The parser below (between PARSER-START / PARSER-END) is pure string logic
 * and is unit-tested in Node against every real onclick on the site.
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
          '<div class="pna-modal-code" id="pna-modal-code"></div>' +
          '<div class="pna-modal-note">Copied to clipboard — paste it at checkout.</div>' +
          '<div class="pna-modal-actions">' +
            '<a id="pna-modal-continue" target="_blank" rel="noopener noreferrer nofollow">Continue to store</a>' +
            '<button type="button" id="pna-modal-copy">Copy again</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modal);
    modal.querySelector('.pna-modal-close').addEventListener('click', function () {
      modal.className = 'pna-modal-hidden';
    });
    modal.querySelector('.pna-modal-overlay').addEventListener('click', function (e) {
      if (e.target === this) modal.className = 'pna-modal-hidden';
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') modal.className = 'pna-modal-hidden';
    });
    modal.querySelector('#pna-modal-copy').addEventListener('click', function () {
      var code = document.getElementById('pna-modal-code').textContent;
      pnaCopy(code);
      this.textContent = 'Copied!';
      var btn = this;
      setTimeout(function () { btn.textContent = 'Copy again'; }, 2000);
    });
    return modal;
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

  document.addEventListener('click', function (e) {
    var target = e.target;
    if (!target || !target.closest) return;
    var el = target.closest('button, a');
    if (!el) return;
    // Never intercept clicks inside our own modal or an old page modal.
    if (el.closest('#pna-reveal-modal')) return;
    var text = (el.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
    if (text.indexOf('show code') === -1) return;
    var data = pnaExtract(el);
    if (!data || !data.code || !data.url) return; // leave unknown buttons alone
    e.preventDefault();
    e.stopPropagation();
    pnaCopy(data.code);
    var modal = pnaEnsureModal();
    document.getElementById('pna-modal-code').textContent = data.code;
    document.getElementById('pna-modal-continue').href = data.url;
    modal.className = '';
    window.open(data.url, '_blank', 'noopener,noreferrer');
    if (el.tagName === 'BUTTON') {
      try { el.textContent = 'Copied!'; } catch (err) {}
    }
  }, true);
})();
