/* ============================================================
   Nesta mission page — interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---------- NAV DROPDOWNS ---------- */
  var items = document.querySelectorAll('.nav__item[data-menu]');
  function closeAll(except) {
    items.forEach(function (it) {
      if (it !== except) {
        it.classList.remove('open');
        var b = it.querySelector('.nav__link');
        if (b) b.setAttribute('aria-expanded', 'false');
      }
    });
  }
  items.forEach(function (it) {
    var btn = it.querySelector('.nav__link');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var willOpen = !it.classList.contains('open');
      closeAll(it);
      it.classList.toggle('open', willOpen);
      btn.setAttribute('aria-expanded', String(willOpen));
    });
    it.addEventListener('mouseenter', function () { closeAll(it); it.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); });
    it.addEventListener('mouseleave', function () { it.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); });
  });
  document.addEventListener('click', function () { closeAll(null); });

  /* ---------- SEARCH OVERLAY ---------- */
  var veil = document.getElementById('searchVeil');
  var input = document.getElementById('searchInput');
  function openSearch() { veil.classList.add('show'); setTimeout(function () { input.focus(); }, 60); }
  function closeSearch() { veil.classList.remove('show'); input.blur(); }
  document.getElementById('openSearch').addEventListener('click', openSearch);
  document.getElementById('closeSearch').addEventListener('click', closeSearch);
  veil.addEventListener('click', function (e) { if (e.target === veil) closeSearch(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeSearch();
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && !veil.classList.contains('show')) {
      e.preventDefault(); openSearch();
    }
  });

  /* ---------- MOBILE BURGER (reveals nav inline) ---------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  if (burger) burger.addEventListener('click', function () {
    var shown = nav.style.display === 'flex';
    nav.style.display = shown ? '' : 'flex';
    nav.style.position = shown ? '' : 'absolute';
    nav.style.cssText = shown ? '' : 'display:flex;flex-direction:column;align-items:flex-start;position:absolute;top:76px;left:0;right:0;background:#fff;border-bottom:1px solid var(--line);padding:12px 20px;gap:2px;z-index:55';
  });

  /* ---------- SCROLL REVEALS ---------- */
  var revs = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revs.forEach(function (r, i) { r.style.transitionDelay = (Math.min(i % 5, 4) * 60) + 'ms'; io.observe(r); });
  } else {
    revs.forEach(function (r) { r.classList.add('in'); });
  }

  /* ============================================================
     TWEAKS  — vanilla host protocol
     ============================================================ */
  var panel = document.getElementById('tweaks');
  var KEY = 'nesta-tweaks-v2';
  var root = document.documentElement;
  var body = document.body;

  var state = { accent: '#fdb633', accentDeep: '#e89a1c', font: '"Zosia", "Hanken Grotesk", sans-serif', cards: 'plain', motion: 'on' };
  try { Object.assign(state, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) {}

  function apply() {
    root.style.setProperty('--accent', state.accent);
    root.style.setProperty('--accent-deep', state.accentDeep);
    root.style.setProperty('--font-display', state.font);
    body.setAttribute('data-cards', state.cards);
    body.setAttribute('data-motion', state.motion);
    // reflect active buttons
    syncBtn('accent', state.accent);
    syncBtn('font', state.font);
    syncBtn('cards', state.cards);
    syncBtn('motion', state.motion);
  }
  function syncBtn(group, val) {
    var wrap = panel.querySelector('[data-tw="' + group + '"]');
    if (!wrap) return;
    wrap.querySelectorAll('button').forEach(function (b) {
      b.classList.toggle('on', b.getAttribute('data-v') === val);
    });
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }

  panel.querySelectorAll('[data-tw]').forEach(function (wrap) {
    var group = wrap.getAttribute('data-tw');
    wrap.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () {
        var v = b.getAttribute('data-v');
        if (group === 'accent') { state.accent = v; state.accentDeep = b.getAttribute('data-deep'); }
        else { state[group] = v; }
        apply(); save();
      });
    });
  });

  document.getElementById('twClose').addEventListener('click', function () {
    panel.classList.remove('show');
    try { window.parent.postMessage({ type: 'tweaks-visibility', visible: false }, '*'); } catch (e) {}
  });

  // host protocol: toolbar toggles the panel
  window.addEventListener('message', function (e) {
    var d = e.data || {};
    if (d.type === 'tweaks-toggle' || d.type === 'toggle-tweaks') panel.classList.toggle('show');
    if (d.type === 'tweaks-show' || d.type === 'show-tweaks') panel.classList.add('show');
    if (d.type === 'tweaks-hide' || d.type === 'hide-tweaks') panel.classList.remove('show');
  });
  // announce readiness
  try { window.parent.postMessage({ type: 'tweaks-ready', hasTweaks: true }, '*'); } catch (e) {}

  // drag the panel by its header
  (function () {
    var head = document.getElementById('twDrag'), drag = false, sx, sy, ox, oy;
    head.addEventListener('mousedown', function (e) {
      drag = true; sx = e.clientX; sy = e.clientY;
      var r = panel.getBoundingClientRect(); ox = r.left; oy = r.top;
      panel.style.right = 'auto'; panel.style.bottom = 'auto'; panel.style.left = ox + 'px'; panel.style.top = oy + 'px';
      e.preventDefault();
    });
    window.addEventListener('mousemove', function (e) {
      if (!drag) return;
      panel.style.left = (ox + e.clientX - sx) + 'px';
      panel.style.top = (oy + e.clientY - sy) + 'px';
    });
    window.addEventListener('mouseup', function () { drag = false; });
  })();

  apply();
})();
