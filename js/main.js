/* JO Companion — interactions & animations */

/* === Réglages globaux === */
var CAROUSEL_AUTOPLAY_MS = 4000;  // délai d'auto-défilement du carrousel des sports

(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia('(max-width: 820px)').matches;

  /* --- Menu mobile : le burger ouvre/ferme le tiroir --- */
  const burger = document.querySelector('.nav-burger');
  const mainNav = document.querySelector('.main-nav');
  if (burger && mainNav) {
    const setMenu = function (open) {
      mainNav.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';   // verrou du scroll quand l'overlay est ouvert
    };
    burger.addEventListener('click', function () { setMenu(!mainNav.classList.contains('is-open')); });
    const closeBtn = mainNav.querySelector('.nav-drawer__close');
    if (closeBtn) closeBtn.addEventListener('click', function () { setMenu(false); });
    // fermer en cliquant un lien du menu
    mainNav.querySelectorAll('.nav-drawer a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    // fermer avec Échap
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mainNav.classList.contains('is-open')) setMenu(false);
    });
  }

  /* --- Carrousel réutilisable (Nos Sports, Les Athlètes…) : pagination par
     translation + rebond + autoplay ping-pong (desktop) ; swipe natif (mobile).
     Pilote TOUTES les instances .sports__carousel. Le pas est mesuré sur la 1re carte. --- */
  const stepOf = function (rail) {
    const first = rail.children[0];
    if (!first) return 0;
    const gap = parseFloat(getComputedStyle(rail).gap) || 0;
    return first.getBoundingClientRect().width + gap;
  };

  const initCarousel = function (carousel) {
    const rail = carousel.querySelector('.sports__rail');
    const track = carousel.querySelector('.sports__track');
    const navs = carousel.querySelectorAll('.sports__nav');
    if (!rail || !track) return;

    if (isMobile) {
      // mobile : la piste défile en natif (CSS), les flèches font défiler
      navs.forEach(function (btn) {
        btn.addEventListener('click', function () {
          const dir = Number(btn.dataset.dir) || 1;
          const maxScroll = track.scrollWidth - track.clientWidth;
          if (dir > 0 && track.scrollLeft >= maxScroll - 4) track.scrollTo({ left: 0, behavior: 'smooth' });          // fin -> début
          else if (dir < 0 && track.scrollLeft <= 4) track.scrollTo({ left: maxScroll, behavior: 'smooth' });          // début -> fin
          else track.scrollBy({ left: dir * stepOf(rail), behavior: 'smooth' });
        });
      });
      return;
    }

    let index = 0, timer = null;
    const maxIndex = function () {
      const step = stepOf(rail);
      const visible = step ? Math.max(1, Math.round(track.clientWidth / step)) : 1;
      return Math.max(0, rail.children.length - visible);
    };
    const render = function () { rail.style.transform = 'translateX(' + (-index * stepOf(rail)) + 'px)'; };
    const go = function (delta) {
      const max = maxIndex();
      index += delta;
      if (index > max) index = 0;        // arrivé au bout -> on boucle au premier
      else if (index < 0) index = max;   // au début -> on va à la fin
      render();
    };
    const autoStep = function () { go(1); };   // avance en continu et boucle
    const startAuto = function () {
      clearInterval(timer);
      if (!reduceMotion) timer = setInterval(autoStep, CAROUSEL_AUTOPLAY_MS);
    };

    navs.forEach(function (btn) {
      btn.addEventListener('click', function () { go(Number(btn.dataset.dir) || 1); startAuto(); });
    });
    carousel.addEventListener('mouseenter', function () { clearInterval(timer); });
    carousel.addEventListener('mouseleave', startAuto);
    window.addEventListener('resize', render, { passive: true });
    startAuto();
  };

  document.querySelectorAll('.sports__carousel').forEach(initCarousel);

  /* --- Cœur favori (toggle : rouge + rempli) --- */
  document.querySelectorAll('.sport-card__fav').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const fav = btn.classList.toggle('is-fav');
      btn.setAttribute('aria-pressed', fav);
      const use = btn.querySelector('use');
      if (use) use.setAttribute('href', fav ? '#ic-heart-fill' : '#ic-heart');
    });
  });

  /* --- Filtre dynamique des sports (page Les Jeux uniquement : nécessite des .sport-grid) --- */
  const filterBar = document.querySelector('.sport-grid') ? document.querySelector('.filters') : null;
  if (filterBar) {
    const buttons = filterBar.querySelectorAll('.filter');
    const searchInput = filterBar.querySelector('input');
    const grids = Array.prototype.slice.call(document.querySelectorAll('.sport-grid'));
    const divider = document.querySelector('.jeux__divider');
    const emptyMsg = document.querySelector('.sport-empty');
    const GLISSE = ['biathlon', 'bobsleigh', 'luge', 'saut à ski', 'skeleton', 'ski acrobatique', 'ski de fond', 'snowboard', 'combiné nordique', 'para biathlon', 'para snowboard', 'para ski alpin', 'para ski de fond'];
    const VITESSE = ['bobsleigh', 'luge', 'patinage de vitesse', 'skeleton', 'para ski alpin'];
    let activeCat = 'tous';

    const nameOf = function (card) {
      const el = card.querySelector('.sport-card__name');
      return el ? el.textContent.trim().toLowerCase() : '';
    };

    const apply = function () {
      const q = (searchInput ? searchInput.value : '').trim().toLowerCase();
      let totalVisible = 0;
      grids.forEach(function (grid, gi) {
        const cat = gi === 0 ? 'olympique' : 'paralympique';   // 1re grille = olympique, 2e = paralympique
        const cards = grid.querySelectorAll('.sport-card');
        cards.forEach(function (card) {
          const name = nameOf(card);
          const catOk = activeCat === 'tous'
            || activeCat === cat
            || (activeCat === 'glisse'  && GLISSE.indexOf(name) !== -1)
            || (activeCat === 'vitesse' && VITESSE.indexOf(name) !== -1);
          const searchOk = !q || name.indexOf(q) !== -1;
          card.hidden = !(catOk && searchOk);
          if (!card.hidden) totalVisible++;
        });
        grid.hidden = !Array.prototype.some.call(cards, function (c) { return !c.hidden; });
      });
      if (divider) divider.hidden = grids.length < 2 || grids[0].hidden || grids[1].hidden;
      if (emptyMsg) emptyMsg.hidden = totalVisible > 0;
    };

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('is-active'); b.setAttribute('aria-pressed', 'false'); });
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');
        activeCat = btn.getAttribute('data-filter') || 'tous';
        apply();
      });
    });
    if (searchInput) searchInput.addEventListener('input', apply);
  }

  /* --- Billetterie : filtres (villes / sports / types) + tri par date --- */
  const tickets = document.querySelector('.tickets');
  if (tickets) {
    const chips = Array.prototype.slice.call(tickets.querySelectorAll('.filter'));
    const items = Array.prototype.slice.call(tickets.querySelectorAll('.ticket'));
    const empty = tickets.querySelector('.tickets__empty');
    const sortSel = tickets.querySelector('.tickets__sort select');

    const activeVals = function (group) {
      return Array.prototype.slice
        .call(tickets.querySelectorAll('.filter[data-group="' + group + '"].is-active'))
        .map(function (c) { return c.dataset.val; })
        .filter(function (v) { return v && v !== 'all'; });
    };
    const apply = function () {
      const city = activeVals('city'), sport = activeVals('sport'), type = activeVals('type');
      let visible = 0;
      items.forEach(function (t) {
        const ok = (!city.length  || city.indexOf(t.dataset.city)   !== -1)
                && (!sport.length || sport.indexOf(t.dataset.sport) !== -1)
                && (!type.length  || type.indexOf(t.dataset.type)   !== -1);
        t.hidden = !ok;
        if (ok) visible++;
      });
      if (empty) empty.hidden = visible > 0;
    };

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        const g = chip.dataset.group;
        if (chip.dataset.val === 'all') {                 // chip "Toutes" : réinitialise le groupe
          tickets.querySelectorAll('.filter[data-group="' + g + '"]').forEach(function (c) {
            c.classList.toggle('is-active', c === chip);
          });
        } else {
          chip.classList.toggle('is-active');
          const allChip = tickets.querySelector('.filter[data-group="' + g + '"][data-val="all"]');
          if (allChip) {
            const anyOn = tickets.querySelectorAll('.filter[data-group="' + g + '"].is-active:not([data-val="all"])').length > 0;
            allChip.classList.toggle('is-active', !anyOn);
          }
        }
        apply();
      });
    });

    if (sortSel) {
      const list = tickets.querySelector('.tickets__list');
      sortSel.addEventListener('change', function () {
        const dir = sortSel.value === 'desc' ? -1 : 1;
        items.slice().sort(function (a, b) {
          return dir * a.dataset.date.localeCompare(b.dataset.date);
        }).forEach(function (t) { list.insertBefore(t, empty); });
      });
    }
  }

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
    '.faq-item', '.footer-content', '.footer-bar',
    '.section-header--center', '.tl-item'   /* page Les Jeux (stat-card exclu : compteur + hover) */
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
  document.querySelectorAll('.cal-date__num, .stat-card__num, .medals tbody td:not(:first-child)').forEach(function (el) {
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
