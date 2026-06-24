/* JO Companion — partials partagés (header, footer, sprite).
   Source unique injectée dans chaque page via des placeholders [data-partial].
   Évite de dupliquer le markup commun entre les pages. Doit s'exécuter AVANT main.js. */
(function () {
  'use strict';

  var PARTIALS = {

    /* --- Sprite SVG (icônes inline, recolorables, fonctionne en file://) --- */
    sprite: `
    <svg class="svg-sprite" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
      <symbol id="ic-mountain" viewBox="0 0 135 117">
        <path d="M134.453 116.548H62.2969L91.4339 41.9883L95.5668 49.1527L71.748 110.102H122.961L80.927 103.741L95.2234 66.8241L122.767 96.298L131.337 111.165L134.453 116.548Z"/>
        <path d="M33.827 92.7618L80.169 53.0919L55.3915 116.548H0L79.2945 33.8658L67.2135 12.9102L70.6208 34.0084L20.852 86.1999L63.6183 6.69155L67.2135 0L87.3075 34.8375L15.2293 109.921L33.827 92.7618Z"/>
      </symbol>
      <symbol id="ic-burger" viewBox="0 0 44 26">
        <path d="M0 24C0 25.1046 0.895431 26 2 26H42C43.1046 26 44 25.1046 44 24V23.6667C44 22.5621 43.1046 21.6667 42 21.6667H2C0.895431 21.6667 0 22.5621 0 23.6667V24ZM0 13.1667C0 14.2712 0.895431 15.1667 2 15.1667H42C43.1046 15.1667 44 14.2712 44 13.1667V12.8333C44 11.7288 43.1046 10.8333 42 10.8333H2C0.895431 10.8333 0 11.7288 0 12.8333V13.1667ZM2 0C0.895431 0 0 0.895431 0 2V2.33333C0 3.4379 0.895431 4.33333 2 4.33333H42C43.1046 4.33333 44 3.4379 44 2.33333V2C44 0.89543 43.1046 0 42 0H2Z"/>
      </symbol>
      <symbol id="ic-search" viewBox="0 0 19 21">
        <path d="M9.5 0C4.25389 0 0 4.2315 0 9.45C0 13.8285 2.99778 17.5035 7.06167 18.5745L9.5 21L11.9383 18.5745C16.0022 17.5035 19 13.8285 19 9.45C19 4.2315 14.7461 0 9.5 0ZM9.5 2.1C11.2522 2.1 12.6667 3.507 12.6667 5.25C12.6667 6.993 11.2522 8.4 9.5 8.4C7.74778 8.4 6.33333 6.993 6.33333 5.25C6.33333 3.507 7.74778 2.1 9.5 2.1ZM9.5 17.115C6.86111 17.115 4.52833 15.771 3.16667 13.734C3.19833 11.6445 7.38889 10.5 9.5 10.5C11.6006 10.5 15.8017 11.6445 15.8333 13.734C14.4717 15.771 12.1389 17.115 9.5 17.115Z"/>
      </symbol>
      <symbol id="ic-account" viewBox="0 0 20.5858 20.5858">
        <path d="M20.0738 20.2929C19.6832 20.6834 19.0501 20.6834 18.6596 20.2929L12.6496 14.2829C12.2893 13.9226 11.719 13.8981 11.2815 14.1593C10.8876 14.3944 10.4618 14.5941 10.0042 14.7583C9.24583 15.0306 8.43889 15.1667 7.58333 15.1667C5.46389 15.1667 3.67033 14.4328 2.20267 12.9652C0.734222 11.4967 0 9.70278 0 7.58333C0 5.46389 0.734222 3.66994 2.20267 2.2015C3.67033 0.733833 5.46389 0 7.58333 0C9.70278 0 11.4967 0.733833 12.9652 2.2015C14.4328 3.66994 15.1667 5.46389 15.1667 7.58333C15.1667 8.43889 15.0306 9.24583 14.7583 10.0042C14.5941 10.4618 14.3944 10.8876 14.1593 11.2815C13.8981 11.719 13.9226 12.2893 14.2829 12.6496L20.2929 18.6596C20.6834 19.0501 20.6834 19.6832 20.2929 20.0738L20.0738 20.2929ZM7.58333 12.8333C9.04167 12.8333 10.2814 12.3231 11.3027 11.3027C12.3231 10.2814 12.8333 9.04167 12.8333 7.58333C12.8333 6.125 12.3231 4.88522 11.3027 3.864C10.2814 2.84356 9.04167 2.33333 7.58333 2.33333C6.125 2.33333 4.88522 2.84356 3.864 3.864C2.84356 4.88522 2.33333 6.125 2.33333 7.58333C2.33333 9.04167 2.84356 10.2814 3.864 11.3027C4.88522 12.3231 6.125 12.8333 7.58333 12.8333Z"/>
      </symbol>
      <symbol id="ic-book" viewBox="0 0 24 24">
        <path d="M19 3.25H6.75C6.10713 3.23113 5.483 3.46789 5.01439 3.90839C4.54577 4.34889 4.2709 4.95719 4.25 5.6V18C4.27609 18.7542 4.60027 19.4673 5.15142 19.9829C5.70258 20.4984 6.43571 20.7743 7.19 20.75H19C19.1981 20.7474 19.3874 20.6676 19.5275 20.5275C19.6676 20.3874 19.7474 20.1981 19.75 20V4C19.7474 3.80189 19.6676 3.61263 19.5275 3.47253C19.3874 3.33244 19.1981 3.25259 19 3.25ZM18.25 19.25H7.19C6.83339 19.2748 6.48151 19.1571 6.21156 18.9227C5.94161 18.6884 5.77562 18.3566 5.75 18C5.77562 17.6434 5.94161 17.3116 6.21156 17.0773C6.48151 16.8429 6.83339 16.7252 7.19 16.75H18.25V19.25ZM18.25 15.25H7.19C6.68656 15.2506 6.19135 15.3778 5.75 15.62V5.6C5.7729 5.35589 5.89028 5.13038 6.0771 4.97159C6.26392 4.81279 6.50538 4.73328 6.75 4.75H18.25V15.25Z"/>
        <path d="M8.75 8.75H15.25C15.4489 8.75 15.6397 8.67098 15.7803 8.53033C15.921 8.38968 16 8.19891 16 8C16 7.80109 15.921 7.61032 15.7803 7.46967C15.6397 7.32902 15.4489 7.25 15.25 7.25H8.75C8.55109 7.25 8.36032 7.32902 8.21967 7.46967C8.07902 7.61032 8 7.80109 8 8C8 8.19891 8.07902 8.38968 8.21967 8.53033C8.36032 8.67098 8.55109 8.75 8.75 8.75ZM8.75 12.25H15.25C15.4489 12.25 15.6397 12.171 15.7803 12.0303C15.921 11.8897 16 11.6989 16 11.5C16 11.3011 15.921 11.1103 15.7803 10.9697C15.6397 10.829 15.4489 10.75 15.25 10.75H8.75C8.55109 10.75 8.36032 10.829 8.21967 10.9697C8.07902 11.1103 8 11.3011 8 11.5C8 11.6989 8.07902 11.8897 8.21967 12.0303C8.36032 12.171 8.55109 12.25 8.75 12.25Z"/>
      </symbol>
      <symbol id="ic-heart" viewBox="0 0 17.5222 17.5222">
        <path d="M8.83408 13.7629L8.76107 13.8359L8.68076 13.7629C5.21283 10.6162 2.92034 8.53545 2.92034 6.42548C2.92034 4.9653 4.01548 3.87016 5.47566 3.87016C6.6 3.87016 7.69514 4.60025 8.08209 5.59318H9.44006C9.82701 4.60025 10.9221 3.87016 12.0465 3.87016C13.5067 3.87016 14.6018 4.9653 14.6018 6.42548C14.6018 8.53545 12.3093 10.6162 8.83408 13.7629ZM12.0465 2.40998C10.7761 2.40998 9.55687 3.00135 8.76107 3.92857C7.96528 3.00135 6.74602 2.40998 5.47566 2.40998C3.22698 2.40998 1.46016 4.1695 1.46016 6.42548C1.46016 9.17793 3.94247 11.4339 7.70244 14.8434L8.76107 15.8072L9.81971 14.8434C13.5797 11.4339 16.062 9.17793 16.062 6.42548C16.062 4.1695 14.2952 2.40998 12.0465 2.40998Z"/>
      </symbol>
      <symbol id="ic-heart-fill" viewBox="0 0 17.5222 17.5222">
        <path d="M12.0465 2.40998C10.7761 2.40998 9.55687 3.00135 8.76107 3.92857C7.96528 3.00135 6.74602 2.40998 5.47566 2.40998C3.22698 2.40998 1.46016 4.1695 1.46016 6.42548C1.46016 9.17793 3.94247 11.4339 7.70244 14.8434L8.76107 15.8072L9.81971 14.8434C13.5797 11.4339 16.062 9.17793 16.062 6.42548C16.062 4.1695 14.2952 2.40998 12.0465 2.40998Z"/>
      </symbol>
      <symbol id="ic-chevron" viewBox="0 0 9.5375 16.186">
        <path d="M9.11451 0.423601C8.98051 0.289321 8.82134 0.182789 8.64611 0.110102C8.47088 0.0374147 8.28304 0 8.09333 0C7.90363 0 7.71578 0.0374147 7.54055 0.110102C7.36533 0.182789 7.20615 0.289321 7.07215 0.423601L0.423601 7.07215C0.289321 7.20615 0.182789 7.36533 0.110102 7.54055C0.0374147 7.71578 0 7.90363 0 8.09333C0 8.28304 0.0374147 8.47088 0.110102 8.64611C0.182789 8.82134 0.289321 8.98051 0.423601 9.11451L7.07215 15.7631C7.20625 15.8972 7.36546 16.0035 7.54067 16.0761C7.71589 16.1487 7.90368 16.186 8.09333 16.186C8.28298 16.186 8.47078 16.1487 8.64599 16.0761C8.82121 16.0035 8.98041 15.8972 9.11451 15.7631C9.24862 15.629 9.35499 15.4698 9.42757 15.2945C9.50015 15.1193 9.5375 14.9315 9.5375 14.7419C9.5375 14.5522 9.50015 14.3644 9.42757 14.1892C9.35499 14.014 9.24862 13.8548 9.11451 13.7207L3.49439 8.08609L9.11451 2.46597C9.67942 1.90106 9.66494 0.974026 9.11451 0.423601Z"/>
      </symbol>
    </svg>`,

    /* --- Menu compact collant (apparaît au scroll) --- */
    mininav: `
    <div class="mininav" id="mininav">
      <div class="mininav__inner">
        <a class="mininav__logo" href="index.html" aria-label="Accueil">
          <img src="assets/img/logo-nav.png" alt="Milano Cortina 2026">
        </a>
        <nav class="mininav__links" aria-label="Navigation compacte">
          <a href="les-jeux.html" data-nav="les-jeux">Les jeux</a>
          <a href="#" data-nav="application">L'application</a>
          <a href="#" data-nav="billetterie">Billeterie</a>
        </nav>
        <a class="btn btn--light" href="#">S'inscrire</a>
      </div>
    </div>`,

    /* --- Bandeau rouge (dates + langues) --- */
    topbar: `
    <div class="topbar">
      <p class="topbar__dates">
        Jeux Olympiques d'hiver™ · Du 6 au 22 février 2026 | Jeux Paralympiques d'hiver™ · Du 6 au 15 mars 2026
      </p>
      <ul class="lang-switch" aria-label="Choix de la langue">
        <li><a href="#">IT</a></li>
        <li><a href="#">EN</a></li>
        <li class="is-active"><a href="#" aria-current="true">FR</a></li>
      </ul>
    </div>`,

    /* --- Navigation principale + tiroir mobile --- */
    nav: `
    <nav class="main-nav" aria-label="Navigation principale">
      <div class="main-nav__bar glass">
        <button class="nav-burger" type="button" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="nav-drawer">
          <svg class="icon icon--burger" aria-hidden="true"><use href="#ic-burger"></use></svg>
        </button>

        <ul class="nav-links">
          <li><a href="les-jeux.html" data-nav="les-jeux">Les jeux</a></li>
          <li><a href="#" data-nav="application">L'application</a></li>
        </ul>

        <a class="nav-logo" href="index.html" aria-label="Accueil — Milano Cortina 2026">
          <img src="assets/img/logo-nav.png" alt="Milano Cortina 2026">
        </a>

        <ul class="nav-links">
          <li><a href="#" data-nav="billetterie">Billeterie</a></li>
        </ul>

        <a class="btn btn--light" href="#">S'inscrire</a>

        <div class="nav-actions">
          <a href="#" class="nav-icon" aria-label="Rechercher">
            <svg class="icon icon--search" aria-hidden="true"><use href="#ic-search"></use></svg>
          </a>
          <a href="#" class="nav-icon" aria-label="Mon compte">
            <svg class="icon icon--account" aria-hidden="true"><use href="#ic-account"></use></svg>
          </a>
        </div>
      </div>

      <div class="nav-drawer" id="nav-drawer">
        <a href="les-jeux.html" data-nav="les-jeux">Les jeux</a>
        <a href="#" data-nav="application">L'application</a>
        <a href="#" data-nav="billetterie">Billeterie</a>
        <a class="btn btn--light" href="#">S'inscrire</a>
      </div>
    </nav>`,

    /* --- Footer (partenaires + liens + QR) --- */
    footer: `
    <footer class="site-footer">
      <div class="footer-partners" aria-label="Nos partenaires">
        <img src="assets/img/partner-airbnb.png" alt="Airbnb">
        <img src="assets/img/partner-alibaba.png" alt="Alibaba">
        <img src="assets/img/partner-allianz.png" alt="Allianz">
        <img src="assets/img/partner-cocacola.png" alt="Coca-Cola">
        <img src="assets/img/partner-corona.png" alt="Corona">
        <img src="assets/img/partner-deloitte.png" alt="Deloitte">
        <img src="assets/img/partner-omega.png" alt="Omega">
        <img src="assets/img/partner-pg.png" alt="P&G">
        <img src="assets/img/partner-samsung.png" alt="Samsung">
        <img src="assets/img/partner-tcl.png" alt="TCL">
        <img src="assets/img/partner-visa.png" alt="Visa">
      </div>

      <div class="footer-main">
        <div class="footer-main__bg" aria-hidden="true">
          <img src="assets/img/foot-bg.png" alt="">
        </div>

        <div class="footer-main__inner">
          <a class="footer-cta glass" href="#">Télécharger l'appli</a>

          <div class="footer-content">
            <div class="footer-brand">
              <img class="footer-brand__logo" src="assets/img/logo-nav.png" alt="Milano Cortina 2026">
              <img class="footer-brand__qr" src="assets/img/qrcode.png" alt="QR code de téléchargement de l'application">
            </div>

            <nav class="footer-nav" aria-label="Liens de pied de page">
              <div class="footer-col">
                <h3>Les jeux</h3>
                <a href="les-jeux.html">Sport</a>
                <a href="#">Programme</a>
                <a href="#">Athlètes</a>
                <a href="#">Sites</a>
                <a href="#">Calendrier</a>
              </div>
              <div class="footer-col">
                <h3>À propos</h3>
                <a href="#">Organisation</a>
                <a href="#">Histoire</a>
                <a href="#">Partenaires</a>
                <a href="#">Presse</a>
                <a href="#">Résultats</a>
              </div>
              <div class="footer-col">
                <h3>Nous rejoindre</h3>
                <a href="#">Bénévolat</a>
                <a href="#">Carrières</a>
                <a href="#">Merchandising</a>
                <a href="#">Contact</a>
                <a href="#">Newsletter</a>
              </div>
            </nav>
          </div>

          <div class="footer-bar glass">
            <div class="footer-bar__links">
              <a href="#">Boutique</a>
              <a href="#">Contactez-nous</a>
            </div>
            <p class="footer-bar__copy">© Milano Cortina 2026 — Tous droits réservés</p>
          </div>
        </div>
      </div>
    </footer>`
  };

  /* Remplace chaque placeholder [data-partial="x"] par le markup correspondant.
     On utilise outerHTML pour ne PAS laisser de wrapper parasite (préserve les sélecteurs CSS). */
  var mounts = Array.prototype.slice.call(document.querySelectorAll('[data-partial]'));
  mounts.forEach(function (el) {
    var html = PARTIALS[el.getAttribute('data-partial')];
    if (html) el.outerHTML = html;
  });

  /* Marque le lien de navigation de la page courante (<body data-page="les-jeux">). */
  var page = document.body.getAttribute('data-page');
  if (page) {
    document.querySelectorAll('[data-nav="' + page + '"]').forEach(function (a) {
      a.classList.add('is-active');
      a.setAttribute('aria-current', 'page');
    });
  }
})();
