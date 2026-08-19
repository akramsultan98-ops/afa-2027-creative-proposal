/* ==========================================================================
   AFA 2027 — Creative Experience Proposal
   Behaviour only. This file must never inject styles or branding.
   ========================================================================== */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var sections   = Array.prototype.slice.call(document.querySelectorAll('main section[data-nav]'));
  var header     = document.querySelector('.site-header');
  var headerName = document.getElementById('header-section');
  var pageCount  = document.querySelector('.page-count');
  var pageNow    = document.querySelector('.page-count b');
  var pageTotal  = document.querySelector('.page-count span');
  var progress   = document.querySelector('.scroll-progress span');

  var drawer  = document.getElementById('nav-drawer');
  var nav     = document.getElementById('drawer-nav');
  var menuBtn = document.querySelector('.menu-btn');
  var closeBtn= document.querySelector('.drawer-close');
  var scrim   = document.querySelector('.drawer-scrim');

  if (!sections.length) return;

  /* ------------------------------------------------------------------------
     1. Reveal on scroll — fades and lifts the whole element only.
        Never scales, rotates or filters artwork.
     ------------------------------------------------------------------------ */

  var revealables = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revealables, function (el) {
      el.classList.add('visible');
    });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);          // fire once, then stop watching
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    Array.prototype.forEach.call(revealables, function (el) {
      revealObserver.observe(el);
    });

    /* Safety net. A fast flick-scroll, a hash jump, or a throttled main thread
       can let an IntersectionObserver callback be skipped. Nothing in a client
       proposal may ever stay invisible, so every scroll frame also sweeps for
       anything that is already past the fold but still hidden. */
    /* The cover is the entrance sequence, not a scroll reveal. Play it in full
       on load so no part of it (the rule, the CTA) can be withheld by an
       intersection threshold or the observer's bottom margin. */
    var cover = document.querySelector('.cover');
    if (cover) {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          Array.prototype.forEach.call(cover.querySelectorAll('.reveal'), function (el) {
            el.classList.add('visible');
            revealObserver.unobserve(el);
          });
        });
      });
    }

    window.__revealSweep = function () {
      var pending = document.querySelectorAll('.reveal:not(.visible)');
      if (!pending.length) return;
      var h = window.innerHeight;
      Array.prototype.forEach.call(pending, function (el) {
        var r = el.getBoundingClientRect();
        // Anything at or above the fold has been "reached" and must be shown —
        // including content the reader has already scrolled clean past.
        if (r.top < h * 0.94) {
          el.classList.add('visible');
          revealObserver.unobserve(el);
        }
      });
    };
  }

  /* ------------------------------------------------------------------------
     2. Navigation drawer, built from the real section list
     ------------------------------------------------------------------------ */

  var links = [];

  sections.forEach(function (section, i) {
    if (!section.id) section.id = 'section-' + (i + 1);
    var a = document.createElement('a');
    a.href = '#' + section.id;
    a.innerHTML = '<b>' + String(i + 1).padStart(2, '0') + '</b><span></span>';
    a.lastChild.textContent = section.dataset.nav;
    if (nav) nav.appendChild(a);
    links.push(a);
  });

  if (pageTotal) pageTotal.textContent = String(sections.length).padStart(2, '0');

  var lastFocused = null;

  function setInert(el, on) {
    if (!el) return;
    if (on) { el.setAttribute('inert', ''); } else { el.removeAttribute('inert'); }
  }

  function openDrawer() {
    if (!drawer) return;
    lastFocused = document.activeElement;
    setInert(drawer, false);
    drawer.classList.add('open');
    if (scrim) { scrim.hidden = false; requestAnimationFrame(function () { scrim.classList.add('visible'); }); }
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
    setInert(document.querySelector('main'), true);
    setInert(document.querySelector('.site-footer'), true);
    setInert(header, true);
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeDrawer() {
    if (!drawer || !drawer.classList.contains('open')) return;
    drawer.classList.remove('open');
    setInert(drawer, true);
    if (scrim) {
      scrim.classList.remove('visible');
      window.setTimeout(function () { scrim.hidden = true; }, reduceMotion ? 0 : 400);
    }
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    setInert(document.querySelector('main'), false);
    setInert(document.querySelector('.site-footer'), false);
    setInert(header, false);
    document.body.style.overflow = '';
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  if (menuBtn)  menuBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (scrim)    scrim.addEventListener('click', closeDrawer);

  links.forEach(function (a) { a.addEventListener('click', closeDrawer); });

  document.addEventListener('keydown', function (e) {
    if (!drawer || !drawer.classList.contains('open')) return;

    if (e.key === 'Escape') { closeDrawer(); return; }
    if (e.key !== 'Tab') return;

    // Focus trap
    var focusables = drawer.querySelectorAll('a[href], button:not([disabled])');
    if (!focusables.length) return;
    var first = focusables[0];
    var last  = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  });

  /* ------------------------------------------------------------------------
     3. Scroll chrome — progress bar, section counter, header name,
        and light/dark header treatment driven by the section's ground.
        rAF-throttled: one measurement pass per frame at most.
     ------------------------------------------------------------------------ */

  var currentIndex = -1;
  var ticking = false;

  function isLightGround(section) {
    return section.classList.contains('ground-cream') ||
           section.classList.contains('ground-gold');
  }

  function measure() {
    ticking = false;

    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    var pct = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0;
    if (progress) progress.style.width = pct + '%';

    // The section sitting under the fixed header wins.
    var line = (header ? header.offsetHeight : 74) + 8;
    var index = 0;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top <= line) index = i;
    }
    if (index === currentIndex) return;
    currentIndex = index;

    var section = sections[index];

    if (pageNow)    pageNow.textContent = String(index + 1).padStart(2, '0');
    if (headerName) headerName.textContent = section.dataset.nav;

    var light = isLightGround(section);
    if (header)    header.classList.toggle('on-light', light);
    if (pageCount) pageCount.classList.toggle('on-light', light);

    var theme = document.querySelector('meta[name="theme-color"]');
    if (theme) {
      theme.setAttribute('content', light
        ? (section.classList.contains('ground-gold') ? '#F7CB2C' : '#ECF3EA')
        : (section.classList.contains('ground-forest') ? '#2A4830' : '#192E1F'));
    }

    links.forEach(function (a, i) { a.classList.toggle('active', i === index); });
  }

  function frame() {
    if (window.__revealSweep) window.__revealSweep();
    measure();
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(frame);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  // Lazy images change document height as they arrive; recompute when they do.
  window.addEventListener('load', frame);
  document.querySelectorAll('img[loading="lazy"]').forEach(function (img) {
    img.addEventListener('load', onScroll, { once: true });
  });

  frame();
  window.setTimeout(frame, 400);
})();
