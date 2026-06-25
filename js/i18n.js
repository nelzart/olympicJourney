/* JO Companion — i18n FR -> IT (bascule sans rechargement, sans build).
   Mécanique : on traduit les nœuds de texte + quelques attributs via un dictionnaire
   indexé sur la chaîne FRANÇAISE source (le HTML reste en FR = langue par défaut).
   Choix mémorisé (localStorage). Retour au FR = simple rechargement (source = FR).
   Chargé par partials.js APRÈS injection des partials, donc traduit aussi le chrome. */
(function () {
  'use strict';

  /* Jours / mois : appliqués uniquement aux chaînes de type "date" (libellés d'épreuves). */
  var WORD_MAP = {
    'Lundi': 'Lunedì', 'Mardi': 'Martedì', 'Mercredi': 'Mercoledì', 'Jeudi': 'Giovedì',
    'Vendredi': 'Venerdì', 'Samedi': 'Sabato', 'Dimanche': 'Domenica',
    'janvier': 'gennaio', 'février': 'febbraio', 'mars': 'marzo', 'mars 2026': 'marzo 2026'
  };
  var DAY_RE = /^(Lundi|Mardi|Mercredi|Jeudi|Vendredi|Samedi|Dimanche)\b/;

  /* Dictionnaire FR (normalisé) -> IT. Étendu page par page. */
  var DICT = {

    /* ---------- TOPBAR ---------- */
    "Jeux Olympiques d'hiver™ · Du 6 au 22 février 2026 | Jeux Paralympiques d'hiver™ · Du 6 au 15 mars 2026":
      "Giochi Olimpici invernali™ · Dal 6 al 22 febbraio 2026 | Giochi Paralimpici invernali™ · Dal 6 al 15 marzo 2026",
    "Choix de la langue": "Scelta della lingua",

    /* ---------- NAV ---------- */
    "Les jeux": "I Giochi",
    "L'application": "L'applicazione",
    "Billeterie": "Biglietteria",
    "S'inscrire": "Iscriviti",
    "Accueil": "Home",
    "Accueil — Milano Cortina 2026": "Home — Milano Cortina 2026",
    "Navigation principale": "Navigazione principale",
    "Navigation compacte": "Navigazione compatta",
    "Menu mobile": "Menu mobile",
    "Ouvrir le menu": "Apri il menu",
    "Fermer le menu": "Chiudi il menu",
    "Rechercher": "Cerca",
    "Mon compte": "Il mio account",

    /* ---------- FOOTER ---------- */
    "Nos partenaires": "I nostri partner",
    "Télécharger l'appli": "Scarica l'app",
    "Liens de pied de page": "Link a piè di pagina",
    "QR code de téléchargement de l'application": "QR code per scaricare l'applicazione",
    "À propos": "Chi siamo",
    "Nous rejoindre": "Unisciti a noi",
    "Sport": "Sport",
    "Programme": "Programma",
    "Athlètes": "Atleti",
    "Sites": "Sedi",
    "Calendrier": "Calendario",
    "Organisation": "Organizzazione",
    "Histoire": "Storia",
    "Partenaires": "Partner",
    "Presse": "Stampa",
    "Résultats": "Risultati",
    "Bénévolat": "Volontariato",
    "Carrières": "Carriere",
    "Merchandising": "Merchandising",
    "Contact": "Contatto",
    "Newsletter": "Newsletter",
    "Boutique": "Negozio",
    "Contactez-nous": "Contattaci",
    "© Milano Cortina 2026 — Tous droits réservés": "© Milano Cortina 2026 — Tutti i diritti riservati",

    /* ---------- SECTION OLYMPIC JOURNEY (appli) ---------- */
    "L'application Olympic Journey": "L'app Olympic Journey",
    "« Les Jeux ne sont plus seulement regardés. Ils sont vécus. »":
      "« I Giochi non si guardano più soltanto. Si vivono. »",
    "Constituez votre délégation, choisissez vos épreuves culturelles et sportives, collectez des médailles.":
      "Forma la tua delegazione, scegli le tue prove culturali e sportive, colleziona medaglie.",
    "Télécharger l'application": "Scarica l'applicazione",
    "Découvrir Olympic Journey": "Scopri Olympic Journey",
    "Constituez votre délégation": "Forma la tua delegazione",
    "Invitez famille et amis.": "Invita familiari e amici.",
    "Choisissez vos épreuves": "Scegli le tue prove",
    "Chaque lieu lié à une discipline.": "Ogni luogo legato a una disciplina.",
    "Révélez l'angle invisible": "Rivela l'angolo invisibile",
    "Le regard de l'athlète sur la ville.": "Lo sguardo dell'atleta sulla città.",
    "Décrochez vos médailles": "Conquista le tue medaglie",
    "Bronze, Argent, Or — votre palmarès.": "Bronzo, Argento, Oro — il tuo medagliere.",

    /* ---------- OSSATURE PAGES SPORT (titres de section, communs) ---------- */
    "Prochaines": "Prossime",
    "Épreuves": "Prove",
    "Discipline": "Disciplina",
    "Les règles": "Le regole",
    "Du jeu": "Del gioco",
    "Informations": "Informazioni",
    "Pratiques": "Pratiche",
    "Les": "Gli",
    "Jeux Olympiques d'hiver": "Giochi Olimpici invernali",
    "Jeux Paralympiques d'hiver": "Giochi Paralimpici invernali",
    "Je réserve": "Prenoto",
    "Précédent": "Precedente",
    "Suivant": "Successivo",

    /* libellés infos pratiques (fact__label) */
    "Lieu": "Luogo",
    "Lieux": "Luoghi",
    "Capacité": "Capienza",
    "Accès": "Accesso",
    "Billet": "Biglietto",
    "Température": "Temperatura",
    "Ambiance": "Atmosfera",

    /* ---------- PAYS ---------- */
    "France": "Francia",
    "Italie": "Italia",
    "Norvège": "Norvegia",
    "Suède": "Svezia",
    "Allemagne": "Germania",
    "Autriche": "Austria",
    "Suisse": "Svizzera",
    "États-Unis": "Stati Uniti",
    "Japon": "Giappone",
    "Canada": "Canada",
    "Chine": "Cina",
    "Pays-Bas": "Paesi Bassi",
    "Grande-Bretagne": "Gran Bretagna",
    "Ukraine": "Ucraina",
    "Australie": "Australia",

    /* ---------- NOMS DE SPORTS (réutilisés : cartes, grilles, alt) ---------- */
    "Biathlon": "Biathlon",
    "Bobsleigh": "Bob",
    "Combiné nordique": "Combinata nordica",
    "Curling": "Curling",
    "Curling fauteuil": "Curling in carrozzina",
    "Hockey sur glace": "Hockey su ghiaccio",
    "Luge": "Slittino",
    "Para biathlon": "Para biathlon",
    "Para hockey sur glace": "Para hockey su ghiaccio",
    "Para ski alpin": "Para sci alpino",
    "Para ski de fond": "Para sci di fondo",
    "Para snowboard": "Para snowboard",
    "Patinage artistique": "Pattinaggio artistico",
    "Patinage de vitesse": "Pattinaggio di velocità",
    "Patinage de vitesse sur piste de course": "Short track",
    "Saut à ski": "Salto con gli sci",
    "Skeleton": "Skeleton",
    "Ski acrobatique": "Sci acrobatico",
    "Ski alpin": "Sci alpino",
    "Ski de fond": "Sci di fondo",
    "Ski-Alpinisme": "Sci alpinismo",
    "Ski-alpinisme": "Sci alpinismo",
    "Ski alpinisme": "Sci alpinismo",
    "SKI ALPINISME": "SCI ALPINISMO",
    "Snowboard": "Snowboard",
    "Short track": "Short track",
    "Bobsleigh homme": "Bob maschile",
    "Ski alpin homme": "Sci alpino maschile",

    /* ---------- ACCUEIL : titres de section (mots scindés) ---------- */
    "Nos": "I nostri",
    "Sports": "Sport",
    "Ambiances": "Ambienti",
    "Au service de la": "Al servizio della",
    "Durabilité": "Sostenibilità",
    "Tableau des": "Tabella delle",
    "Médailles": "Medaglie",
    "Foire aux": "Domande",
    "Questions": "frequenti",
    "Actualités": "Notizie",
    "À LA UNE": "IN PRIMO PIANO",
    "Officiel": "Ufficiale",
    "Pays": "Paese",
    "USA": "USA",
    "Or": "Oro",
    "Argent": "Argento",
    "Bronze": "Bronzo",

    /* ---------- ACCUEIL : actualités ---------- */
    "L'Odyssée du biathlon français aux JO 26": "L'odissea del biathlon francese ai Giochi 2026",
    "C'était comment, le ski-alpinisme aux JO ?": "Com'è stato lo sci alpinismo ai Giochi?",
    "Les médailles du ski alpinisme français en vidéo": "Le medaglie dello sci alpinismo francese in video",
    "« Toute seule, j'aurais abandonné »": "« Da sola, avrei rinunciato »",
    "Perrine Laffont": "Perrine Laffont",
    "Guillaume Cizeron et Laurence Fournier Beaudry champions olympiques": "Guillaume Cizeron e Laurence Fournier Beaudry campioni olimpici",
    "Lire plus": "Leggi di più",

    /* ---------- ACCUEIL : dates & lieux ---------- */
    "Les dates officielles :": "Le date ufficiali:",
    "Jeux Olympiques : du 6 au 22 février 2026.": "Giochi Olimpici: dal 6 al 22 febbraio 2026.",
    "Jeux Paralympiques : du 6 au 15 mars 2026.": "Giochi Paralimpici: dal 6 al 15 marzo 2026.",
    "Les lieux clés :": "I luoghi chiave:",
    "Milan": "Milano",
    "Cortina d'Ampezzo": "Cortina d'Ampezzo",
    "Val di Fiemme & Anterselva": "Val di Fiemme e Anterselva",
    "Valtellina (Bormio & Livigno)": "Valtellina (Bormio e Livigno)",
    "Vérone": "Verona",
    "FÉVRIER 2026": "FEBBRAIO 2026",
    "MARS 2026": "MARZO 2026",
    "FEVR.": "FEB.",
    "Ouverture des Jeux Olympiques — Cérémonie au stade San Siro, Milan": "Apertura dei Giochi Olimpici — Cerimonia allo stadio San Siro, Milano",
    "Ouverture des Jeux Paralympiques d'hiver": "Apertura dei Giochi Paralimpici invernali",
    "Clôture des Jeux Paralympiques — Arena de Vérone": "Chiusura dei Giochi Paralimpici — Arena di Verona",
    "Slalom Géant - 10:10": "Slalom gigante - 10:10",

    /* ---------- ACCUEIL : FAQ ---------- */
    "Où et quand les Jeux Olympiques d'hiver 2026 se dérouleront-ils ?": "Dove e quando si svolgeranno i Giochi Olimpici invernali 2026?",
    "Les Jeux d'hiver 2026 se tiendront principalement à Milan et Cortina, mais les épreuves seront réparties sur plusieurs pôles (clusters) majeurs dans le nord du pays.": "I Giochi invernali 2026 si terranno principalmente a Milano e Cortina, ma le gare saranno distribuite su diversi poli (cluster) principali nel nord del Paese.",
    ": épreuves sur glace (patinage artistique, short-track, hockey) et la grande cérémonie d'ouverture au mythique stade San Siro.": ": gare sul ghiaccio (pattinaggio artistico, short track, hockey) e la grande cerimonia di apertura nel mitico stadio San Siro.",
    ": surnommée la « Reine des Dolomites », elle accueillera le ski alpin féminin, le curling, le bobsleigh, la luge et le skeleton.": ": soprannominata la « Regina delle Dolomiti », ospiterà lo sci alpino femminile, il curling, il bob, lo slittino e lo skeleton.",
    ": biathlon, ski de fond et saut à ski.": ": biathlon, sci di fondo e salto con gli sci.",
    ": ski alpin masculin, snowboard, freestyle et la grande nouveauté de cette année : le ski-alpinisme.": ": sci alpino maschile, snowboard, freestyle e la grande novità di quest'anno: lo sci alpinismo.",
    ": les Jeux se clôtureront dans le cadre historique des Arènes de Vérone.": ": i Giochi si chiuderanno nella cornice storica dell'Arena di Verona.",
    "Combien de pays participeront aux Jeux d'hiver 2026 ?": "Quanti Paesi parteciperanno ai Giochi invernali 2026?",
    "Environ 90 nations sont attendues à Milano Cortina 2026, un record pour des Jeux d'hiver. Le nombre définitif dépendra des places de quota obtenues par chaque pays à l'issue des épreuves de qualification.": "Circa 90 nazioni sono attese a Milano Cortina 2026, un record per dei Giochi invernali. Il numero definitivo dipenderà dai posti di quota ottenuti da ciascun Paese al termine delle gare di qualificazione.",
    "Comment se qualifier pour les Jeux d'hiver 2026 ?": "Come qualificarsi per i Giochi invernali 2026?",
    "Le parcours de qualification se fait en deux étapes :": "Il percorso di qualificazione avviene in due fasi:",
    "Pour le pays": "Per il Paese",
    ": les athlètes doivent d'abord décrocher des places de « quota » pour leur nation en brillant sur le circuit international (classements en Coupe du monde et Championnats du monde).": ": gli atleti devono prima conquistare dei posti di « quota » per la loro nazione brillando nel circuito internazionale (classifiche di Coppa del Mondo e Campionati del Mondo).",
    "Pour l'athlète": "Per l'atleta",
    ": une fois les places obtenues, chaque Comité National Olympique sélectionne officiellement les athlètes les plus performants pour composer son équipe finale.": ": una volta ottenuti i posti, ogni Comitato Olimpico Nazionale seleziona ufficialmente gli atleti più performanti per comporre la sua squadra finale.",
    "Comment obtenir des billets pour les Jeux d'hiver 2026 ?": "Come ottenere i biglietti per i Giochi invernali 2026?",
    "La billetterie officielle est gérée exclusivement sur le site de Milano Cortina 2026. La vente se fait par phases (tirages au sort puis vente directe selon les disponibilités) : créez un compte pour être informé des ouvertures et éviter les revendeurs non officiels.": "La biglietteria ufficiale è gestita esclusivamente sul sito di Milano Cortina 2026. La vendita avviene per fasi (sorteggi poi vendita diretta secondo le disponibilità): crea un account per essere informato sulle aperture ed evitare i rivenditori non ufficiali.",

    /* ---------- ACCUEIL : durabilité ---------- */
    "Milano Cortina 2026 inaugure un modèle olympique flexible, optimisant les infrastructures existantes pour minimiser l'empreinte environnementale.": "Milano Cortina 2026 inaugura un modello olimpico flessibile, ottimizzando le infrastrutture esistenti per ridurre al minimo l'impronta ambientale.",
    "Sites existants valorisés": "Sedi esistenti valorizzate",
    "Premier modèle olympique basé sur l'optimisation des infrastructures déjà en place, réduisant construction et coûts.": "Primo modello olimpico basato sull'ottimizzazione delle infrastrutture già esistenti, riducendo costruzioni e costi.",
    "Stratégie bas carbone": "Strategia a basse emissioni",
    "Gestion responsable de la neige artificielle et réduction de l'empreinte carbone sur l'ensemble des sites.": "Gestione responsabile della neve artificiale e riduzione dell'impronta di carbonio su tutte le sedi.",
    "Village de Porta Romana": "Villaggio di Porta Romana",
    "Après les Jeux, le village olympique se transforme en résidence étudiante — un héritage durable pour Milan.": "Dopo i Giochi, il villaggio olimpico si trasforma in residenza studentesca — un'eredità duratura per Milano.",

    /* ---------- alt / aria spécifiques accueil ---------- */
    "Équipe de France de biathlon célébrant ses médailles": "La squadra francese di biathlon festeggia le sue medaglie",
    "Athlètes de ski-alpinisme": "Atleti di sci alpinismo",
    "Médaillés français de ski alpinisme aux JO d'hiver": "Medagliati francesi di sci alpinismo ai Giochi invernali",
    "Perrine Laffont émue": "Perrine Laffont commossa",
    "Milan — Piazza del Duomo": "Milano — Piazza del Duomo",
    "Cortina d'Ampezzo sous la neige": "Cortina d'Ampezzo sotto la neve",
    "Découvrir l'ambiance et les sites de Milan": "Scopri l'atmosfera e le sedi di Milano",
    "Découvrir l'ambiance et les sites de Cortina d'Ampezzo": "Scopri l'atmosfera e le sedi di Cortina d'Ampezzo",
    "Prochaines épreuves et tableau des médailles": "Prossime prove e tabella delle medaglie",
    "16 jours de compétition dans 16 disciplines olympiques": "16 giorni di gara in 16 discipline olimpiche",
    "Deux semaines de compétition intense en février, suivies des Jeux Paralympiques en mars. Un programme chargé d'émotions et d'exploits.": "Due settimane di gare intense a febbraio, seguite dai Giochi Paralimpici a marzo. Un programma ricco di emozioni e di imprese."
  };

  /* ===================== MOTEUR ===================== */
  var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEXTAREA: 1 };
  function norm(s) { return (s || '').replace(/\s+/g, ' ').trim(); }

  function translateDates(key) {
    var out = key;
    for (var w in WORD_MAP) { out = out.split(w).join(WORD_MAP[w]); }
    return out;
  }

  function translateText(root) {
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (n.parentNode && SKIP[n.parentNode.nodeName]) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [], n;
    while ((n = w.nextNode())) nodes.push(n);
    nodes.forEach(function (node) {
      var raw = node.nodeValue, key = norm(raw), it = DICT[key];
      if (it === undefined && DAY_RE.test(key)) it = translateDates(key);
      if (it !== undefined && it !== key) {
        var lead = raw.match(/^\s*/)[0], trail = raw.match(/\s*$/)[0];
        node.nodeValue = lead + it + trail;
      }
    });
  }

  function sportIT(name) {
    if (DICT[name]) return DICT[name];
    var cap = name.charAt(0).toUpperCase() + name.slice(1);
    return DICT[cap] || name;
  }
  /* aria-labels génératifs (favoris / découvrir) — évite 44 entrées. */
  function attrPattern(key) {
    var m = key.match(/^Ajouter (.+) aux favoris$/);
    if (m) return 'Aggiungi ' + sportIT(m[1]) + ' ai preferiti';
    m = key.match(/^Découvrir (?:le |la |les |l'|l’)?(.+)$/);
    if (m) return 'Scopri ' + sportIT(m[1]);
    return undefined;
  }

  function translateAttrs(root) {
    ['alt', 'placeholder', 'aria-label', 'title'].forEach(function (a) {
      root.querySelectorAll('[' + a + ']').forEach(function (el) {
        var key = norm(el.getAttribute(a));
        var it = DICT[key];
        if (it === undefined) it = attrPattern(key);
        if (it && it !== key) el.setAttribute(a, it);
      });
    });
  }

  function translateMeta() {
    var t = DICT[norm(document.title)];
    if (t) document.title = t;
    var m = document.querySelector('meta[name="description"]');
    if (m && DICT[norm(m.getAttribute('content'))]) m.setAttribute('content', DICT[norm(m.getAttribute('content'))]);
  }

  function applyIT() {
    document.documentElement.setAttribute('lang', 'it');
    translateText(document.body);
    translateAttrs(document.body);
    translateMeta();
  }

  function setActive(lang) {
    document.querySelectorAll('[data-lang]').forEach(function (a) {
      var on = a.getAttribute('data-lang') === lang;
      if (a.parentNode) a.parentNode.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
  }

  function currentLang() { return localStorage.getItem('oj-lang') || 'fr'; }

  function init() {
    var lang = currentLang();
    if (lang === 'it') applyIT();
    setActive(lang);

    document.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('[data-lang]') : null;
      if (!a) return;
      e.preventDefault();
      var l = a.getAttribute('data-lang');
      if (l === currentLang()) return;
      localStorage.setItem('oj-lang', l);
      if (l === 'it') { applyIT(); setActive('it'); }
      else { location.reload(); } /* FR = source HTML -> rechargement propre */
    });
  }

  /* Outil de récolte des chaînes non encore traduites (console : __ojExtract()). */
  window.__ojExtract = function () {
    var out = {};
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null), n;
    while ((n = w.nextNode())) {
      if (n.parentNode && SKIP[n.parentNode.nodeName]) continue;
      var k = norm(n.nodeValue);
      if (k && !(k in DICT) && !DAY_RE.test(k) && !/^[\d\s.,:;%°·€–—()\/+x-]+$/.test(k)) out[k] = 1;
    }
    ['alt', 'placeholder', 'aria-label', 'title'].forEach(function (a) {
      document.querySelectorAll('[' + a + ']').forEach(function (el) {
        var k = norm(el.getAttribute(a));
        if (k && !(k in DICT)) out['@' + a + '|' + k] = 1;
      });
    });
    return Object.keys(out).sort();
  };

  init();
})();
