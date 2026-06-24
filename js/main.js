/* JO Companion — interactions & animations */

/* === Réglages globaux === */
var CAROUSEL_AUTOPLAY_MS = 4000;  // délai d'auto-défilement du carrousel des sports

(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Carrousel des sports : fenêtre de 4 cartes, défilement par translation
     (rebond au clic) + auto-défilement (ping-pong) sur timeout global --- */
  const rail = document.getElementById('sports-rail');
  if (rail) {
    const CARD_STEP = 242;                  // carte 212 + gap 30
    const VISIBLE = 4;                       // 4 items affichés
    const total = rail.children.length;
    const maxIndex = Math.max(0, total - VISIBLE);
    let index = 0, autoDir = 1, timer = null;

    const render = function () { rail.style.transform = 'translateX(' + (-index * CARD_STEP) + 'px)'; };
    const go = function (delta) { index = Math.max(0, Math.min(maxIndex, index + delta)); render(); };
    const autoStep = function () {
      if (index >= maxIndex) autoDir = -1;
      else if (index <= 0) autoDir = 1;
      go(autoDir);
    };
    const startAuto = function () {
      clearInterval(timer);
      if (!reduceMotion) timer = setInterval(autoStep, CAROUSEL_AUTOPLAY_MS);
    };

    document.querySelectorAll('.sports__nav').forEach(function (btn) {
      btn.addEventListener('click', function () {
        go(Number(btn.dataset.dir) || 1);
        startAuto();   // relance le minuteur au clic
      });
    });

    // pause au survol du carrousel
    const carousel = document.querySelector('.sports__carousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', function () { clearInterval(timer); });
      carousel.addEventListener('mouseleave', startAuto);
    }

    startAuto();
  }

  /* --- Cœur favori (toggle : rouge + rempli) --- */
  document.querySelectorAll('.sport-card__fav').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const fav = btn.classList.toggle('is-fav');
      btn.setAttribute('aria-pressed', fav);
      const use = btn.querySelector('use');
      if (use) use.setAttribute('href', fav ? '#ic-heart-fill' : '#ic-heart');
    });
  });

  /* --- Menu compact collant --- */
  const mininav = document.getElementById('mininav');
  if (mininav) {
    const onScroll = function () {
      mininav.classList.toggle('is-visible', window.scrollY > 480);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- Apparition au scroll (avec cascade) --- */
  const revealSelectors = [
    '.section-title', '.news-card', '.actus__panel',
    '.ambiances__cities figure', '.app__intro',
    '.info-card', '.cal-date',
    '.faq-item', '.footer-content', '.footer-bar'
  ].join(',');

  const revealEls = Array.prototype.slice.call(document.querySelectorAll(revealSelectors));

  if (!reduceMotion && 'IntersectionObserver' in window) {
    revealEls.forEach(function (el) { el.classList.add('reveal'); });

    // décalage en cascade pour les éléments d'un même groupe
    document.querySelectorAll(
      '.actus__grid, .sports__track, .durability__cards, .calendar__dates, .footer-nav'
    ).forEach(function (group) {
      Array.prototype.slice.call(group.children).forEach(function (child, i) {
        const t = child.classList.contains('reveal') ? child : child.querySelector('.reveal');
        if (t) t.style.transitionDelay = (i * 0.08) + 's';
      });
    });

    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* --- Compteurs animés (dates du calendrier + tableau des médailles) --- */
  const counters = [];
  document.querySelectorAll('.cal-date__num, .medals tbody td:not(:first-child)').forEach(function (el) {
    const raw = el.textContent.trim();
    if (/^\d+$/.test(raw)) {
      el.dataset.count = raw;
      counters.push(el);
    }
  });

  function animateCount(el) {
    const target = Number(el.dataset.count);
    const duration = 1100;
    const start = performance.now();
    (function step(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target;
    })(start);
  }

  if (!reduceMotion && 'IntersectionObserver' in window && counters.length) {
    const cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          animateCount(e.target);
          cio.unobserve(e.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  }
})();
