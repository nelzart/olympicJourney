/* JO Companion — i18n FR -> IT (bascule sans rechargement, sans build).
   Mécanique : on traduit les nœuds de texte + quelques attributs via un dictionnaire
   indexé sur la chaîne FRANÇAISE source (le HTML reste en FR = langue par défaut).
   Choix mémorisé (localStorage). Retour au FR = simple rechargement (source = FR).
   Chargé par partials.js APRÈS injection des partials, donc traduit aussi le chrome. */
(function () {
  'use strict';

  /* Jours / mois : appliqués uniquement aux chaînes de type "date" (libellés d'épreuves). */
  var WORD_MAP = {
    it: {
      'Lundi': 'Lunedì', 'Mardi': 'Martedì', 'Mercredi': 'Mercoledì', 'Jeudi': 'Giovedì',
      'Vendredi': 'Venerdì', 'Samedi': 'Sabato', 'Dimanche': 'Domenica',
      'janvier': 'gennaio', 'février': 'febbraio', 'mars': 'marzo', 'avril': 'aprile',
      'mai': 'maggio', 'juin': 'giugno', 'juillet': 'luglio', 'août': 'agosto',
      'septembre': 'settembre', 'octobre': 'ottobre', 'novembre': 'novembre', 'décembre': 'dicembre'
    },
    en: {
      'Lundi': 'Monday', 'Mardi': 'Tuesday', 'Mercredi': 'Wednesday', 'Jeudi': 'Thursday',
      'Vendredi': 'Friday', 'Samedi': 'Saturday', 'Dimanche': 'Sunday',
      'janvier': 'January', 'février': 'February', 'mars': 'March', 'avril': 'April',
      'mai': 'May', 'juin': 'June', 'juillet': 'July', 'août': 'August',
      'septembre': 'September', 'octobre': 'October', 'novembre': 'November', 'décembre': 'December'
    }
  };
  var DAY_RE = /^(Lundi|Mardi|Mercredi|Jeudi|Vendredi|Samedi|Dimanche)\b/;
  var MONTH_RE = /(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/i;

  /* Dictionnaires FR (normalisé) -> { it, en }. Étendus page par page. */
  var T = {
  it: {

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
    "Deux semaines de compétition intense en février, suivies des Jeux Paralympiques en mars. Un programme chargé d'émotions et d'exploits.": "Due settimane di gare intense a febbraio, seguite dai Giochi Paralimpici a marzo. Un programma ricco di emozioni e di imprese.",

    /* ===================== CURLING ===================== */
    "Présentation du curling": "Presentazione del curling",
    "10 équipes par épreuve": "10 squadre per prova",
    "Milan — Mediolanum Forum": "Milano — Mediolanum Forum",
    "Longueur de la piste": "Lunghezza della pista",
    "Poids d'une pierre": "Peso di una pietra",
    "Manches par match": "Mani per partita",
    "Phase 1 : Le double mixte": "Fase 1: Il doppio misto",
    "Lancement du tour préliminaire": "Inizio del turno preliminare",
    "Matchs de poule en continu": "Partite del girone in continuo",
    "Phase finale : Le double mixte": "Fase finale: Il doppio misto",
    "Demi-finales": "Semifinali",
    "Finale pour la médaille d'or 🥇": "Finale per la medaglia d'oro 🥇",
    "Qu'est-ce que le curling ?": "Che cos'è il curling?",
    "Le curling est un sport de précision sur glace opposant deux équipes de quatre joueurs. Chaque équipe fait glisser des pierres de granit de 19,1 kg sur une piste de 45 mètres vers une cible circulaire appelée la maison.": "Il curling è uno sport di precisione sul ghiaccio che oppone due squadre di quattro giocatori. Ogni squadra fa scivolare pietre di granito da 19,1 kg su una pista di 45 metri verso un bersaglio circolare chiamato casa.",
    "L'objectif est simple : placer ses pierres le plus près possible du centre (le bouton). Mais la stratégie, la communication et le balayage (sweeping) en font un sport d'une richesse tactique exceptionnelle — souvent comparé aux échecs sur glace.": "L'obiettivo è semplice: piazzare le proprie pietre il più vicino possibile al centro (il bottone). Ma la strategia, la comunicazione e lo sweeping ne fanno uno sport di eccezionale ricchezza tattica — spesso paragonato agli scacchi sul ghiaccio.",
    "Aux JO de Milano Cortina 2026, trois médailles d'or sont en jeu : hommes, femmes et double mixte.": "Ai Giochi di Milano Cortina 2026 sono in palio tre medaglie d'oro: uomini, donne e doppio misto.",
    "La pierre": "La pietra",
    "Chaque équipe dispose de 8 pierres de granit par manche. Les équipes jouent alternativement, une pierre à la fois.": "Ogni squadra dispone di 8 pietre di granito per mano. Le squadre giocano alternativamente, una pietra alla volta.",
    "La maison": "La casa",
    "La cible (maison) est un cercle de 3,66 m de diamètre. Seule l'équipe dont la pierre est la plus proche du bouton marque des points.": "Il bersaglio (casa) è un cerchio di 3,66 m di diametro. Solo la squadra la cui pietra è più vicina al bottone segna punti.",
    "Le balayage": "Lo sweeping",
    "Deux coéquipiers balaient la glace devant la pierre pour modifier sa trajectoire et sa distance de glissement.": "Due compagni spazzano il ghiaccio davanti alla pietra per modificarne la traiettoria e la distanza di scivolamento.",
    "Le score": "Il punteggio",
    "On compte le nombre de pierres plus proches du bouton que la meilleure pierre adverse. Maximum 8 points par manche.": "Si conta il numero di pietre più vicine al bottone rispetto alla migliore pietra avversaria. Massimo 8 punti per mano.",
    "Le temps": "Il tempo",
    "Chaque équipe dispose de 38 minutes de réflexion pour un match de 10 manches. Un dépassement peut coûter le match.": "Ogni squadra dispone di 38 minuti di riflessione per una partita di 10 mani. Un superamento può costare la partita.",
    "La victoire": "La vittoria",
    "L'équipe qui totalise le plus de points après 10 manches gagne. En cas d'égalité, des manches supplémentaires sont jouées.": "La squadra che totalizza più punti dopo 10 mani vince. In caso di parità, si giocano mani supplementari.",
    "Mediolanum Forum, Assago — Milan": "Mediolanum Forum, Assago — Milano",
    "12 700 places": "12 700 posti",
    "Métro M2 — Assago Milanofiori Forum. Navette officielle depuis le Duomo (30 min).": "Metro M2 — Assago Milanofiori Forum. Navetta ufficiale dal Duomo (30 min).",
    "À partir de 25 € (préliminaires) · 90 € (finales)": "A partire da 25 € (preliminari) · 90 € (finali)",
    "-3 °C sur la glace · 12 °C dans les tribunes": "-3 °C sul ghiaccio · 12 °C sugli spalti",
    "Curleur canadien lançant une pierre sur la glace olympique": "Curler canadese che lancia una pietra sul ghiaccio olimpico",
    "Action de curling pendant un match": "Azione di curling durante una partita",
    "Le curling aux Jeux Olympiques d'hiver Milano Cortina 2026 : épreuves, règles du jeu, informations pratiques au Mediolanum Forum de Milan et les athlètes à suivre.": "Il curling ai Giochi Olimpici invernali Milano Cortina 2026: prove, regole del gioco, informazioni pratiche al Mediolanum Forum di Milano e gli atleti da seguire.",

    /* ===================== BIATHLON ===================== */
    "Présentation du biathlon": "Presentazione del biathlon",
    "~30 nations engagées": "~30 nazioni in gara",
    "Distance de tir": "Distanza di tiro",
    "Anneau de pénalité": "Anello di penalità",
    "La plus longue épreuve": "La prova più lunga",
    "Relais": "Staffetta",
    "Relais mixte": "Staffetta mista",
    "Individuel": "Individuale",
    "Sprint 7,5 km femmes": "Sprint 7,5 km femminile",
    "Poursuite 12,5 km hommes": "Inseguimento 12,5 km maschile",
    "Départ groupé 15 km hommes 🥇": "Partenza in linea 15 km maschile 🥇",
    "Qu'est-ce que le biathlon ?": "Che cos'è il biathlon?",
    "Le biathlon marie deux disciplines opposées : l'endurance explosive du": "Il biathlon unisce due discipline opposte: l'endurance esplosiva dello",
    "ski de fond": "sci di fondo",
    "et le sang-froid absolu du": "e il sangue freddo assoluto del",
    "tir à la carabine": "tiro con la carabina",
    ". Les athlètes enchaînent boucles de ski et passages au pas de tir, le cœur à plus de 180 pulsations, pour viser cinq cibles à 50 mètres.": ". Gli atleti alternano giri sugli sci e passaggi al poligono di tiro, con il cuore oltre i 180 battiti, per mirare a cinque bersagli a 50 metri.",
    "Chaque cible manquée coûte cher : un tour de pénalité de 150 mètres ou une minute ajoutée selon le format. La moindre erreur de tir peut anéantir un effort parfait sur les skis — c'est tout le sel de ce sport.": "Ogni bersaglio mancato si paga caro: un giro di penalità di 150 metri o un minuto aggiunto a seconda del formato. Il minimo errore al tiro può vanificare uno sforzo perfetto sugli sci — è tutto il sale di questo sport.",
    "Légende vivante de la discipline, le Français Martin Fourcade a marqué le biathlon de sept titres olympiques.": "Leggenda vivente della disciplina, il francese Martin Fourcade ha segnato il biathlon con sette titoli olimpici.",
    "Le ski": "Lo sci",
    "Du ski de fond en style libre (skating), sur des boucles entrecoupées de passages au stand de tir.": "Sci di fondo in tecnica libera (skating), su giri intervallati da passaggi al poligono di tiro.",
    "Le tir": "Il tiro",
    "Cinq cibles à abattre à 50 m, en position couchée puis debout, selon le format de course.": "Cinque bersagli da abbattere a 50 m, in posizione a terra poi in piedi, a seconda del formato di gara.",
    "Couché & debout": "A terra e in piedi",
    "Cible de 45 mm en couché, de 115 mm en debout : la position debout est bien plus exigeante.": "Bersaglio di 45 mm a terra, di 115 mm in piedi: la posizione in piedi è molto più impegnativa.",
    "La pénalité": "La penalità",
    "Chaque cible manquée impose un tour de pénalité de 150 m — ou une minute ajoutée en individuel.": "Ogni bersaglio mancato impone un giro di penalità di 150 m — o un minuto aggiunto nell'individuale.",
    "La carabine": "La carabina",
    "Une carabine .22 LR d'environ 3,5 kg, portée sur le dos pendant tout l'effort.": "Una carabina .22 LR di circa 3,5 kg, portata sulla schiena per tutta la gara.",
    "Les formats": "I formati",
    "Sprint, poursuite, individuel, mass start et relais : chacun a ses règles de tir et de pénalité.": "Sprint, inseguimento, individuale, mass start e staffetta: ognuno ha le sue regole di tiro e di penalità.",
    "Südtirol Arena, Anterselva (Antholz) — Haut-Adige": "Südtirol Arena, Anterselva (Antholz) — Alto Adige",
    "Navettes officielles depuis Brunico (Bruneck), à 25 min. Parkings relais fléchés.": "Navette ufficiali da Brunico (Bruneck), a 25 min. Parcheggi scambiatori segnalati.",
    "À partir de 35 € (sprint) · 110 € (mass start)": "A partire da 35 € (sprint) · 110 € (mass start)",
    "Froid d'altitude — prévoir -5 °C, 1 600 m d'altitude": "Freddo d'alta quota — prevedere -5 °C, 1 600 m di altitudine",
    "Pas de tir et skieur lors d'une épreuve de biathlon": "Poligono di tiro e sciatore durante una gara di biathlon",
    "Biathlètes au pas de tir, position couchée": "Biathleti al poligono di tiro, posizione a terra",
    "Le biathlon aux Jeux Olympiques d'hiver Milano Cortina 2026 : épreuves, règles (ski de fond + tir), informations pratiques à Anterselva et les athlètes à suivre.": "Il biathlon ai Giochi Olimpici invernali Milano Cortina 2026: prove, regole (sci di fondo + tiro), informazioni pratiche ad Anterselva e gli atleti da seguire.",

    /* ===================== BOBSLEIGH ===================== */
    "Bobsleigh — Milano Cortina 2026": "Bob — Milano Cortina 2026",
    "Le bobsleigh aux Jeux Olympiques d'hiver Milano Cortina 2026 : bob à deux, à quatre et monobob — épreuves, règles, piste Eugenio Monti de Cortina et les athlètes à suivre.": "Il bob ai Giochi Olimpici invernali Milano Cortina 2026: bob a due, a quattro e monobob — prove, regole, pista Eugenio Monti di Cortina e gli atleti da seguire.",
    "Présentation du bobsleigh": "Presentazione del bob",
    "Équipage de bobsleigh lancé sur la glace": "Equipaggio di bob lanciato sul ghiaccio",
    "Bob à deux lancé sur la piste olympique": "Bob a due lanciato sulla pista olimpica",
    "BOBSLEIGH": "BOB",
    "Bob à 2, à 4 et monobob": "Bob a 2, a 4 e monobob",
    "Vitesse de pointe": "Velocità massima",
    "Virages relevés": "Curve paraboliche",
    "Finale femmes": "Finale femminile",
    "Bob à deux": "Bob a due",
    "Finale hommes": "Finale maschile",
    "Bob à quatre": "Bob a quattro",
    "Finale hommes 🥇": "Finale maschile 🥇",
    "Qu'est-ce que le bobsleigh ?": "Che cos'è il bob?",
    "Le bobsleigh, c'est une descente chronométrée dans un engin caréné lancé à plus de 130 km/h sur une piste de glace. Tout commence par un": "Il bob è una discesa cronometrata su un mezzo carenato lanciato a oltre 130 km/h su una pista di ghiaccio. Tutto inizia con una",
    "départ explosif": "partenza esplosiva",
    ": l'équipage pousse le bob sur 50 mètres avant de sauter à bord.": ": l'equipaggio spinge il bob per 50 metri prima di saltare a bordo.",
    "Vient ensuite le": "Viene poi il",
    "pilotage": "pilotaggio",
    ": à l'avant, le pilote négocie 16 virages relevés en subissant jusqu'à 5 G, pendant que les équipiers restent immobiles pour limiter les frottements. Le freineur stoppe l'engin en bas. Quatre manches, le cumul des temps désigne le vainqueur.": ": davanti, il pilota affronta 16 curve paraboliche subendo fino a 5 G, mentre i compagni restano immobili per ridurre gli attriti. Il frenatore ferma il mezzo in fondo. Quattro manche, la somma dei tempi decreta il vincitore.",
    "À Cortina, les épreuves se disputent sur la piste Eugenio Monti, où l'Allemand Francesco Friedrich vise de nouveaux titres.": "A Cortina, le gare si disputano sulla pista Eugenio Monti, dove il tedesco Francesco Friedrich punta a nuovi titoli.",
    "Le départ": "La partenza",
    "L'équipage pousse le bob sur ~50 m : les centièmes gagnés au départ pèsent sur tout le run.": "L'equipaggio spinge il bob per ~50 m: i centesimi guadagnati alla partenza pesano su tutta la discesa.",
    "Le pilotage": "Il pilotaggio",
    "Le pilote dirige le bob via deux anneaux reliés aux patins. Une trajectoire propre = de la vitesse.": "Il pilota guida il bob tramite due anelli collegati ai pattini. Una traiettoria pulita = velocità.",
    "La piste": "La pista",
    "Un toboggan de glace de ~1 750 m et 16 virages, partagé avec la luge et le skeleton.": "Un budello di ghiaccio di ~1 750 m e 16 curve, condiviso con slittino e skeleton.",
    "Les G": "Le G",
    "Dans les courbes les plus serrées, les pilotes encaissent jusqu'à 5 fois leur poids.": "Nelle curve più strette, i piloti subiscono fino a 5 volte il loro peso.",
    "L'équipage": "L'equipaggio",
    "Du monobob (en solo) au bob à quatre, la cohésion et la synchronisation font la différence.": "Dal monobob (in solo) al bob a quattro, la coesione e la sincronizzazione fanno la differenza.",
    "Le chrono": "Il cronometro",
    "Quatre manches sur deux jours : on additionne les temps au millième près.": "Quattro manche in due giorni: si sommano i tempi al millesimo.",
    "≈ 5 000 places le long de la piste": "≈ 5 000 posti lungo la pista",
    "Navettes JO depuis Cortina centre. Piste partagée avec luge et skeleton.": "Navette olimpiche dal centro di Cortina. Pista condivisa con slittino e skeleton.",
    "À partir de 45 € · 130 € (finale bob à 4)": "A partire da 45 € · 130 € (finale bob a 4)",
    "Glace réfrigérée — prévoir -5 °C en bord de piste": "Ghiaccio refrigerato — prevedere -5 °C a bordo pista",

    /* @IT_APPEND — prose ajoutée page par page sous ce repère */
  },

  /* ===================== EN — ANGLAIS =====================
     Socle partagé (chrome, ossature, sports, pays). La prose propre à chaque page
     reste à compléter page par page (cf. prompt de reprise). */
  en: {
    /* TOPBAR */
    "Jeux Olympiques d'hiver™ · Du 6 au 22 février 2026 | Jeux Paralympiques d'hiver™ · Du 6 au 15 mars 2026":
      "Olympic Winter Games™ · 6–22 February 2026 | Paralympic Winter Games™ · 6–15 March 2026",
    "Choix de la langue": "Language selection",
    /* NAV */
    "Les jeux": "The Games", "L'application": "The app", "Billeterie": "Tickets",
    "S'inscrire": "Sign up", "Accueil": "Home", "Accueil — Milano Cortina 2026": "Home — Milano Cortina 2026",
    "Navigation principale": "Main navigation", "Navigation compacte": "Compact navigation", "Menu mobile": "Mobile menu",
    "Ouvrir le menu": "Open menu", "Fermer le menu": "Close menu", "Rechercher": "Search", "Mon compte": "My account",
    /* FOOTER */
    "Nos partenaires": "Our partners", "Télécharger l'appli": "Download the app", "Liens de pied de page": "Footer links",
    "QR code de téléchargement de l'application": "App download QR code", "À propos": "About", "Nous rejoindre": "Join us",
    "Sport": "Sport", "Programme": "Schedule", "Athlètes": "Athletes", "Sites": "Venues", "Calendrier": "Calendar",
    "Organisation": "Organisation", "Histoire": "History", "Partenaires": "Partners", "Presse": "Press", "Résultats": "Results",
    "Bénévolat": "Volunteering", "Carrières": "Careers", "Merchandising": "Merchandise", "Contact": "Contact", "Newsletter": "Newsletter",
    "Boutique": "Shop", "Contactez-nous": "Contact us",
    "© Milano Cortina 2026 — Tous droits réservés": "© Milano Cortina 2026 — All rights reserved",
    /* APP */
    "L'application Olympic Journey": "The Olympic Journey app",
    "« Les Jeux ne sont plus seulement regardés. Ils sont vécus. »": "« The Games are no longer just watched. They are lived. »",
    "Constituez votre délégation, choisissez vos épreuves culturelles et sportives, collectez des médailles.": "Build your delegation, choose your cultural and sporting events, collect medals.",
    "Télécharger l'application": "Download the app", "Découvrir Olympic Journey": "Discover Olympic Journey",
    "Constituez votre délégation": "Build your delegation", "Invitez famille et amis.": "Invite family and friends.",
    "Choisissez vos épreuves": "Choose your events", "Chaque lieu lié à une discipline.": "Each venue linked to a discipline.",
    "Révélez l'angle invisible": "Reveal the invisible angle", "Le regard de l'athlète sur la ville.": "The athlete's view of the city.",
    "Décrochez vos médailles": "Win your medals", "Bronze, Argent, Or — votre palmarès.": "Bronze, Silver, Gold — your medal haul.",
    /* OSSATURE PAGES SPORT */
    "Prochaines": "Upcoming", "Épreuves": "Events", "Discipline": "Discipline",
    "Les règles": "The rules", "Du jeu": "of the Game", "Informations": "Practical", "Pratiques": "Information",
    "La": "The", "Les": "The",
    "Jeux Olympiques d'hiver": "Olympic Winter Games", "Jeux Paralympiques d'hiver": "Paralympic Winter Games",
    "Je réserve": "Book now", "Précédent": "Previous", "Suivant": "Next",
    "Lieu": "Venue", "Lieux": "Venues", "Capacité": "Capacity", "Accès": "Access", "Billet": "Ticket",
    "Température": "Temperature", "Ambiance": "Atmosphere",
    /* PAYS */
    "France": "France", "Italie": "Italy", "Norvège": "Norway", "Suède": "Sweden", "Allemagne": "Germany",
    "Autriche": "Austria", "Suisse": "Switzerland", "États-Unis": "United States", "Japon": "Japan", "Canada": "Canada",
    "Chine": "China", "Pays-Bas": "Netherlands", "Grande-Bretagne": "Great Britain", "Ukraine": "Ukraine", "Australie": "Australia",
    /* NOMS DE SPORTS */
    "Biathlon": "Biathlon", "Bobsleigh": "Bobsleigh", "Combiné nordique": "Nordic combined", "Curling": "Curling",
    "Curling fauteuil": "Wheelchair curling", "Hockey sur glace": "Ice hockey", "Luge": "Luge",
    "Para biathlon": "Para biathlon", "Para hockey sur glace": "Para ice hockey", "Para ski alpin": "Para alpine skiing",
    "Para ski de fond": "Para cross-country skiing", "Para snowboard": "Para snowboard", "Patinage artistique": "Figure skating",
    "Patinage de vitesse": "Speed skating", "Patinage de vitesse sur piste de course": "Short track",
    "Saut à ski": "Ski jumping", "Skeleton": "Skeleton", "Ski acrobatique": "Freestyle skiing", "Ski alpin": "Alpine skiing",
    "Ski de fond": "Cross-country skiing", "Ski-Alpinisme": "Ski mountaineering", "Ski-alpinisme": "Ski mountaineering",
    "Ski alpinisme": "Ski mountaineering", "Snowboard": "Snowboard", "Short track": "Short track",

    /* ===================== BOBSLEIGH ===================== */
    "Le bobsleigh aux Jeux Olympiques d'hiver Milano Cortina 2026 : bob à deux, à quatre et monobob — épreuves, règles, piste Eugenio Monti de Cortina et les athlètes à suivre.": "Bobsleigh at the Milano Cortina 2026 Olympic Winter Games: two-man, four-man and monobob — events, rules, Cortina's Eugenio Monti track and the athletes to watch.",
    "Présentation du bobsleigh": "Bobsleigh overview",
    "Équipage de bobsleigh lancé sur la glace": "Bobsleigh crew launched on the ice",
    "Bob à deux lancé sur la piste olympique": "Two-man bob launched on the Olympic track",
    "Bob à 2, à 4 et monobob": "Two-man, four-man and monobob",
    "Vitesse de pointe": "Top speed",
    "Longueur de la piste": "Track length",
    "Virages relevés": "Banked turns",
    "Monobob": "Monobob",
    "Finale femmes": "Women's final",
    "Bob à deux": "Two-man bob",
    "Finale hommes": "Men's final",
    "Bob à quatre": "Four-man bob",
    "Finale hommes 🥇": "Men's final 🥇",
    "Qu'est-ce que le bobsleigh ?": "What is bobsleigh?",
    "Le bobsleigh, c'est une descente chronométrée dans un engin caréné lancé à plus de 130 km/h sur une piste de glace. Tout commence par un": "Bobsleigh is a timed descent in a streamlined sled launched at over 130 km/h down an ice track. It all starts with an",
    "départ explosif": "explosive start",
    ": l'équipage pousse le bob sur 50 mètres avant de sauter à bord.": ": the crew pushes the bob for 50 metres before jumping aboard.",
    "Vient ensuite le": "Then comes the",
    "pilotage": "driving",
    ": à l'avant, le pilote négocie 16 virages relevés en subissant jusqu'à 5 G, pendant que les équipiers restent immobiles pour limiter les frottements. Le freineur stoppe l'engin en bas. Quatre manches, le cumul des temps désigne le vainqueur.": ": up front, the pilot negotiates 16 banked turns while enduring up to 5 G, as the crew stays still to limit drag. The brakeman stops the sled at the bottom. Four heats, the combined times decide the winner.",
    "À Cortina, les épreuves se disputent sur la piste Eugenio Monti, où l'Allemand Francesco Friedrich vise de nouveaux titres.": "In Cortina, the events are held on the Eugenio Monti track, where Germany's Francesco Friedrich is aiming for new titles.",
    "Le départ": "The start",
    "L'équipage pousse le bob sur ~50 m : les centièmes gagnés au départ pèsent sur tout le run.": "The crew pushes the bob for ~50 m: the hundredths gained at the start weigh on the whole run.",
    "Le pilotage": "The driving",
    "Le pilote dirige le bob via deux anneaux reliés aux patins. Une trajectoire propre = de la vitesse.": "The pilot steers the bob via two rings linked to the runners. A clean line = speed.",
    "La piste": "The track",
    "Un toboggan de glace de ~1 750 m et 16 virages, partagé avec la luge et le skeleton.": "An ice chute of ~1,750 m with 16 turns, shared with luge and skeleton.",
    "Les G": "The G-force",
    "Dans les courbes les plus serrées, les pilotes encaissent jusqu'à 5 fois leur poids.": "In the tightest curves, pilots take up to 5 times their body weight.",
    "L'équipage": "The crew",
    "Du monobob (en solo) au bob à quatre, la cohésion et la synchronisation font la différence.": "From monobob (solo) to four-man bob, cohesion and synchronisation make the difference.",
    "Le chrono": "The clock",
    "Quatre manches sur deux jours : on additionne les temps au millième près.": "Four heats over two days: times are added up to the thousandth.",
    "≈ 5 000 places le long de la piste": "≈ 5,000 seats along the track",
    "Navettes JO depuis Cortina centre. Piste partagée avec luge et skeleton.": "Olympic shuttles from Cortina centre. Track shared with luge and skeleton.",
    "À partir de 45 € · 130 € (finale bob à 4)": "From €45 · €130 (four-man final)",
    "Glace réfrigérée — prévoir -5 °C en bord de piste": "Refrigerated ice — expect -5 °C at trackside",

    /* @EN_APPEND — prose ajoutée page par page sous ce repère */
  }
  };

  /* ===================== MOTEUR ===================== */
  var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEXTAREA: 1 };
  var CUR = 'fr', DICT = {}, WMAP = {};   /* dictionnaire + table jours/mois de la langue active */
  function norm(s) { return (s || '').replace(/\s+/g, ' ').trim(); }

  function translateDates(key) {
    var out = key;
    for (var w in WMAP) { out = out.split(w).join(WMAP[w]); }
    return out;
  }

  /* Phrases templatisées récurrentes (évite une entrée par valeur). */
  function textPattern(key) {
    var m = key.match(/^(\d+) médailles? d'or en jeu$/);
    if (m) {
      if (CUR === 'en') return m[1] + (m[1] === '1' ? ' gold medal up for grabs' : ' gold medals up for grabs');
      return m[1] + (m[1] === '1' ? " medaglia d'oro in palio" : " medaglie d'oro in palio");
    }
    m = key.match(/^(≈\s*)?([\d\s]+)\s*places$/);
    if (m) return (m[1] || '') + m[2].trim() + (CUR === 'en' ? ' seats' : ' posti');
    return undefined;
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
      if (it === undefined && (DAY_RE.test(key) || (/\d/.test(key) && MONTH_RE.test(key) && key.length < 48))) it = translateDates(key);
      if (it === undefined) it = textPattern(key);
      if (it !== undefined && it !== key) {
        var lead = raw.match(/^\s*/)[0], trail = raw.match(/\s*$/)[0];
        node.nodeValue = lead + it + trail;
      }
    });
  }

  function sportName(name) {
    if (DICT[name]) return DICT[name];
    var cap = name.charAt(0).toUpperCase() + name.slice(1);
    return DICT[cap] || name;
  }
  /* aria-labels génératifs (favoris / découvrir) — évite des dizaines d'entrées. */
  function attrPattern(key) {
    var m = key.match(/^Ajouter (.+) aux favoris$/);
    if (m) return CUR === 'en' ? 'Add ' + sportName(m[1]) + ' to favourites' : 'Aggiungi ' + sportName(m[1]) + ' ai preferiti';
    m = key.match(/^Découvrir (?:le |la |les |l'|l’)?(.+)$/);
    if (m) return CUR === 'en' ? 'Discover ' + sportName(m[1]) : 'Scopri ' + sportName(m[1]);
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

  function applyLang(lang) {
    CUR = lang;
    DICT = T[lang] || {};
    WMAP = WORD_MAP[lang] || {};
    document.documentElement.setAttribute('lang', lang);
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
    if (lang === 'it' || lang === 'en') applyLang(lang);
    setActive(lang);

    document.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('[data-lang]') : null;
      if (!a) return;
      e.preventDefault();
      var l = a.getAttribute('data-lang');
      if (l === currentLang()) return;
      localStorage.setItem('oj-lang', l);
      /* Depuis le FR (DOM source) on traduit en direct ; sinon on recharge pour
         repartir d'une base FR propre (évite tout texte figé en it<->en). */
      if (CUR === 'fr' && l !== 'fr') { applyLang(l); setActive(l); }
      else { location.reload(); }
    });
  }

  /* Outil de récolte des chaînes non encore traduites (console : __ojExtract()). */
  window.__ojExtract = function (lang) {
    var d = T[lang || 'it'] || {}, out = {};
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null), n;
    while ((n = w.nextNode())) {
      if (n.parentNode && SKIP[n.parentNode.nodeName]) continue;
      var k = norm(n.nodeValue);
      if (k && !(k in d) && !DAY_RE.test(k) && !/^[\d\s.,:;%°·€–—()\/+x-]+$/.test(k)) out[k] = 1;
    }
    ['alt', 'placeholder', 'aria-label', 'title'].forEach(function (a) {
      document.querySelectorAll('[' + a + ']').forEach(function (el) {
        var k = norm(el.getAttribute(a));
        if (k && !(k in d)) out['@' + a + '|' + k] = 1;
      });
    });
    return Object.keys(out).sort();
  };

  init();
})();
