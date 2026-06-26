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

    /* ===================== SKELETON ===================== */
    "Le skeleton aux Jeux Olympiques d'hiver Milano Cortina 2026 : descente tête la première — épreuves, règles, piste Eugenio Monti de Cortina et les athlètes à suivre.": "Lo skeleton ai Giochi Olimpici invernali Milano Cortina 2026: discesa a testa in avanti — prove, regole, pista Eugenio Monti di Cortina e gli atleti da seguire.",
    "Présentation du skeleton": "Presentazione dello skeleton",
    "Départ de skeleton, athlète poussant sa luge": "Partenza di skeleton, atleta che spinge la slitta",
    "Skeletoneur tête la première sur la piste": "Skeletonista a testa in avanti sulla pista",
    "Hommes & femmes": "Uomini e donne",
    "Manches par finale": "Manche per finale",
    "Tête la première, à plat ventre": "A testa in avanti, a pancia in giù",
    "Essais": "Prove",
    "Entraînements chronométrés": "Allenamenti cronometrati",
    "Manches 1 & 2": "Manche 1 e 2",
    "Manches 3 & 4 femmes": "Manche 3 e 4 femminile",
    "Manches 3 & 4 hommes 🥇": "Manche 3 e 4 maschile 🥇",
    "Qu'est-ce que le skeleton ?": "Che cos'è lo skeleton?",
    "Le skeleton est sans doute la discipline la plus vertigineuse des Jeux : l'athlète dévale la piste de glace": "Lo skeleton è senza dubbio la disciplina più vertiginosa dei Giochi: l'atleta sfreccia giù per la pista di ghiaccio",
    "à plat ventre, tête la première": "a pancia in giù, a testa in avanti",
    ", le menton à quelques centimètres de la glace, à près de 130 km/h.": ", con il mento a pochi centimetri dal ghiaccio, a quasi 130 km/h.",
    "Tout démarre par un": "Tutto parte da una",
    "départ sprinté": "partenza sprintata",
    ": l'athlète pousse sa luge sur une trentaine de mètres puis plonge dessus. Le": ": l'atleta spinge la slitta per una trentina di metri poi ci si tuffa sopra. Il",
    "se fait au millimètre, par d'infimes transferts de poids des épaules et des genoux. La moindre crispation coûte des centièmes.": "si fa al millimetro, con minimi spostamenti di peso di spalle e ginocchia. La minima contrazione costa centesimi.",
    "Le Letton Martins Dukurs, recordman de victoires, est la référence intemporelle de la discipline.": "Il lettone Martins Dukurs, recordman di vittorie, è il riferimento intramontabile della disciplina.",
    "La position": "La posizione",
    "À plat ventre, tête en avant, menton près de la glace : le contraire exact de la luge.": "A pancia in giù, testa in avanti, mento vicino al ghiaccio: l'esatto contrario dello slittino.",
    "Un sprint de ~30 m en poussant la luge, puis un plongeon dessus. Le départ fait la course.": "Uno sprint di ~30 m spingendo la slitta, poi un tuffo sopra. La partenza fa la gara.",
    "On dirige par d'infimes pressions des épaules et des genoux. Aucune commande mécanique.": "Si guida con minime pressioni di spalle e ginocchia. Nessun comando meccanico.",
    "L'engin": "Il mezzo",
    "Une luge basse et lourde, sans carénage : l'athlète est totalement exposé à la glace.": "Una slitta bassa e pesante, senza carenatura: l'atleta è totalmente esposto al ghiaccio.",
    "Le même toboggan que le bob et la luge, partagé sur le site Eugenio Monti de Cortina.": "Lo stesso budello del bob e dello slittino, condiviso sul sito Eugenio Monti di Cortina.",
    "Quatre manches sur deux jours, cumul des temps : tout se joue au centième près.": "Quattro manche in due giorni, somma dei tempi: tutto si gioca al centesimo.",
    "Navettes JO depuis Cortina centre. Piste partagée avec bob et luge.": "Navette olimpiche dal centro di Cortina. Pista condivisa con bob e slittino.",
    "À partir de 40 € · 110 € (finale hommes)": "A partire da 40 € · 110 € (finale maschile)",

    /* ===================== LUGE ===================== */
    "La luge aux Jeux Olympiques d'hiver Milano Cortina 2026 : simple, double et relais par équipes — épreuves, règles, piste Eugenio Monti de Cortina et les athlètes à suivre.": "Lo slittino ai Giochi Olimpici invernali Milano Cortina 2026: singolo, doppio e staffetta a squadre — prove, regole, pista Eugenio Monti di Cortina e gli atleti da seguire.",
    "Luge — Milano Cortina 2026": "Slittino — Milano Cortina 2026",
    "Présentation de la luge": "Presentazione dello slittino",
    "Lugeur lancé sur la piste olympique": "Slittinista lanciato sulla pista olimpica",
    "Lugeurs lancés sur la piste de glace": "Slittinisti lanciati sulla pista di ghiaccio",
    "LUGE": "SLITTINO",
    "Simple, double & relais": "Singolo, doppio e staffetta",
    "Épreuves au programme": "Prove in programma",
    "Frein sur la luge": "Freno sulla slitta",
    "Simple": "Singolo",
    "Double": "Doppio",
    "Par équipes": "A squadre",
    "Finales hommes & femmes": "Finali maschile e femminile",
    "Relais mixte 🥇": "Staffetta mista 🥇",
    "Qu'est-ce que la luge ?": "Che cos'è lo slittino?",
    "En luge, l'athlète descend la piste de glace": "Nello slittino, l'atleta scende lungo la pista di ghiaccio",
    "allongé sur le dos, pieds en avant": "disteso sulla schiena, con i piedi in avanti",
    ", sur un engin sans aucun frein ni gouvernail. La vitesse peut dépasser 140 km/h, le visage à quelques centimètres de la glace.": ", su un mezzo senza alcun freno né timone. La velocità può superare i 140 km/h, con il viso a pochi centimetri dal ghiaccio.",
    "Tout commence par un": "Tutto inizia con una",
    "départ tracté": "partenza tirata",
    ": assis, le lugeur s'élance en tirant sur deux poignées puis se propulse avec des griffes. Le": ": seduto, lo slittinista si lancia tirando su due maniglie poi si spinge con i ramponi. Il",
    "est invisible : il se fait par de subtiles pressions des mollets sur les patins et des épaules sur la luge. Au millième de seconde près.": "è invisibile: si fa con sottili pressioni dei polpacci sui pattini e delle spalle sulla slitta. Al millesimo di secondo.",
    "L'Italien Armin Zöggeler, sextuple médaillé olympique, reste la légende absolue de la discipline.": "L'italiano Armin Zöggeler, sei volte medagliato olimpico, resta la leggenda assoluta della disciplina.",
    "Sur le dos, pieds devant, tête en arrière : l'aérodynamisme prime sur tout le reste.": "Sulla schiena, piedi avanti, testa indietro: l'aerodinamica conta più di ogni altra cosa.",
    "Assis, le lugeur se tracte sur des poignées puis griffe la glace : les centièmes du départ sont décisifs.": "Seduto, lo slittinista si traina sulle maniglie poi gratta il ghiaccio: i centesimi della partenza sono decisivi.",
    "Aucun gouvernail : on dirige par la pression des mollets et des épaules, invisible à l'œil nu.": "Nessun timone: si guida con la pressione dei polpacci e delle spalle, invisibile a occhio nudo.",
    "Le double": "Il doppio",
    "Deux athlètes superposés sur une même luge : synchronisation parfaite obligatoire.": "Due atleti sovrapposti sulla stessa slitta: sincronizzazione perfetta obbligatoria.",
    "Le même toboggan de glace que le bobsleigh et le skeleton, mais départ plus haut pour la luge.": "Lo stesso budello di ghiaccio del bob e dello skeleton, ma partenza più in alto per lo slittino.",
    "Le simple se court en quatre manches ; le titre se joue souvent au millième de seconde.": "Il singolo si corre in quattro manche; il titolo si decide spesso al millesimo di secondo.",
    "Navettes JO depuis Cortina centre. Piste partagée avec bob et skeleton.": "Navette olimpiche dal centro di Cortina. Pista condivisa con bob e skeleton.",
    "À partir de 40 € · 110 € (relais par équipes)": "A partire da 40 € · 110 € (staffetta a squadre)",
    "Épreuves en soirée — prévoir -6 °C en bord de piste": "Gare in serata — prevedere -6 °C a bordo pista",

    /* ===================== SKI DE FOND ===================== */
    "Le ski de fond aux Jeux Olympiques d'hiver Milano Cortina 2026 : sprint, skiathlon, relais, mass start — épreuves, règles, site de Tesero (Val di Fiemme) et les athlètes à suivre.": "Lo sci di fondo ai Giochi Olimpici invernali Milano Cortina 2026: sprint, skiathlon, staffetta, mass start — prove, regole, sito di Tesero (Val di Fiemme) e gli atleti da seguire.",
    "Ski de fond — Milano Cortina 2026": "Sci di fondo — Milano Cortina 2026",
    "Présentation du ski de fond": "Presentazione dello sci di fondo",
    "Fondeur en action, technique libre": "Fondista in azione, tecnica libera",
    "Peloton de fondeurs en pleine course": "Gruppo di fondisti in piena gara",
    "SKI DE FOND": "SCI DI FONDO",
    "2 techniques : classique & libre": "2 tecniche: classico e libero",
    "Techniques de glisse": "Tecniche di scivolamento",
    "Technique libre": "Tecnica libera",
    "Sprint individuel": "Sprint individuale",
    "Mixte": "Misto",
    "Skiathlon femmes": "Skiathlon femminile",
    "Mass start classique": "Mass start classico",
    "Relais 4 × 7,5 km hommes": "Staffetta 4 × 7,5 km maschile",
    "50 km hommes 🥇": "50 km maschile 🥇",
    "Qu'est-ce que le ski de fond ?": "Che cos'è lo sci di fondo?",
    "Le ski de fond est l'épreuve d'": "Lo sci di fondo è la prova di",
    "endurance": "resistenza",
    "reine des sports d'hiver : des parcours vallonnés de 1,4 à 50 km, parcourus à la seule force des skis et des bâtons. C'est le berceau historique du ski nordique.": "regina degli sport invernali: percorsi ondulati da 1,4 a 50 km, affrontati con la sola forza di sci e bastoncini. È la culla storica dello sci nordico.",
    "Deux techniques se partagent les épreuves : le": "Due tecniche si dividono le prove: il",
    "classique": "classico",
    ", skis parallèles dans les traces, et le": ", sci paralleli nelle tracce, e il",
    "libre": "libero",
    "(skating), en pas de patineur, plus rapide. Du sprint explosif au 50 km marathon, chaque format réclame des qualités différentes.": "(skating), a passo pattinato, più veloce. Dallo sprint esplosivo alla maratona di 50 km, ogni formato richiede qualità diverse.",
    "La Norvégienne Therese Johaug et le sprinteur Johannes Klæbo incarnent la domination scandinave sur la discipline.": "La norvegese Therese Johaug e lo sprinter Johannes Klæbo incarnano il dominio scandinavo sulla disciplina.",
    "Le classique": "Il classico",
    "Skis parallèles dans des traces parallèles : la technique historique, fluide et exigeante.": "Sci paralleli in tracce parallele: la tecnica storica, fluida ed esigente.",
    "Le libre (skating)": "Il libero (skating)",
    "Un pas de patineur en canard, plus rapide : la technique reine des épreuves modernes.": "Un passo pattinato a papera, più veloce: la tecnica regina delle prove moderne.",
    "Le sprint": "Lo sprint",
    "Une qualification chronométrée puis des séries en duel sur ~1,4 km. Explosivité maximale.": "Una qualificazione cronometrata poi batterie in duello su ~1,4 km. Esplosività massima.",
    "Le skiathlon": "Lo skiathlon",
    "Une moitié en classique, une moitié en libre, avec changement de skis en pleine course.": "Una metà in classico, una metà in libero, con cambio di sci in piena gara.",
    "Le relais": "La staffetta",
    "Quatre relayeurs par équipe, deux en classique puis deux en libre. La tactique d'équipe prime.": "Quattro staffettisti per squadra, due in classico poi due in libero. La tattica di squadra è decisiva.",
    "Le parcours de sprint": "Il percorso di sprint",
    "Départ individuel au chrono ou départ groupé (mass start) au coude-à-coude, selon le format.": "Partenza individuale a cronometro o partenza in gruppo (mass start) gomito a gomito, a seconda del formato.",
    "Stade de fond du Lago di Tesero — Val di Fiemme": "Stadio dello sci di fondo del Lago di Tesero — Val di Fiemme",
    "≈ 10 000 places le long du parcours": "≈ 10 000 posti lungo il percorso",
    "Navettes JO depuis Cavalese et Predazzo. Parkings relais fléchés en vallée.": "Navette olimpiche da Cavalese e Predazzo. Parcheggi scambiatori segnalati a valle.",
    "À partir de 30 € (sprint) · 95 € (50 km)": "A partire da 30 € (sprint) · 95 € (50 km)",
    "Vallée de montagne — prévoir -6 °C, 1 000 m d'altitude": "Valle di montagna — prevedere -6 °C, 1 000 m di altitudine",

    /* ===================== SAUT À SKI ===================== */
    "Le saut à ski aux Jeux Olympiques d'hiver Milano Cortina 2026 : tremplins normal et grand, épreuve par équipes, règles, site de Predazzo (Val di Fiemme) et les athlètes à suivre.": "Il salto con gli sci ai Giochi Olimpici invernali Milano Cortina 2026: trampolino normale e lungo, prova a squadre, regole, sito di Predazzo (Val di Fiemme) e gli atleti da seguire.",
    "Saut à ski — Milano Cortina 2026": "Salto con gli sci — Milano Cortina 2026",
    "Présentation du saut à ski": "Presentazione del salto con gli sci",
    "Sauteur à ski en plein vol au-dessus du tremplin": "Saltatore con gli sci in pieno volo sopra il trampolino",
    "Sauteur à ski en plein vol, style en V": "Saltatore con gli sci in pieno volo, stile a V",
    "SAUT À SKI": "SALTO CON GLI SCI",
    "Tremplins normal & grand": "Trampolino normale e lungo",
    "Vitesse sur la table": "Velocità sulla tavola",
    "Juges de style": "Giudici di stile",
    "Grand tremplin": "Trampolino lungo",
    "Tremplin normal": "Trampolino normale",
    "Individuel femmes": "Individuale femminile",
    "Individuel hommes": "Individuale maschile",
    "Épreuve mixte 🥇": "Prova mista 🥇",
    "Le grand tremplin (HS)": "Il trampolino lungo (HS)",
    "Qu'est-ce que le saut à ski ?": "Che cos'è il salto con gli sci?",
    "Le saut à ski consiste à s'élancer d'un tremplin pour parcourir la plus grande distance possible… avec le plus de style. Après une descente d'élan à près de 95 km/h, l'athlète décolle de la table et plane skis en V pendant plusieurs secondes.": "Il salto con gli sci consiste nel lanciarsi da un trampolino per coprire la maggiore distanza possibile… con il massimo stile. Dopo una rincorsa a quasi 95 km/h, l'atleta decolla dalla tavola e plana con gli sci a V per diversi secondi.",
    "La note finale combine deux éléments : la": "Il punteggio finale combina due elementi: la",
    "distance": "distanza",
    "parcourue (rapportée au point K du tremplin) et le": "percorsa (rapportata al punto K del trampolino) e lo",
    "style": "stile",
    ", évalué par cinq juges, jusqu'à la réception en télémark. Le vent et la position de barre d'élan sont compensés pour rester équitables.": ", valutato da cinque giudici, fino all'atterraggio in telemark. Il vento e la posizione della barra di partenza sono compensati per restare equi.",
    "Le Japonais Ryōyū Kobayashi et l'Autrichien Stefan Kraft figurent parmi les rois de la discipline, dans la lignée du légendaire Kamil Stoch.": "Il giapponese Ryōyū Kobayashi e l'austriaco Stefan Kraft figurano tra i re della disciplina, sulla scia del leggendario Kamil Stoch.",
    "L'élan": "La rincorsa",
    "Une descente accroupie sur la piste d'élan pour atteindre près de 95 km/h avant le décollage.": "Una discesa accovacciata sulla pista di rincorsa per raggiungere quasi 95 km/h prima del decollo.",
    "La table": "La tavola",
    "L'instant du décollage : l'extension parfaite au bord du tremplin lance toute la trajectoire.": "L'istante del decollo: l'estensione perfetta al bordo del trampolino lancia tutta la traiettoria.",
    "Le vol": "Il volo",
    "Skis ouverts en V, corps allongé : l'aérodynamisme prolonge le vol de quelques mètres décisifs.": "Sci aperti a V, corpo disteso: l'aerodinamica prolunga il volo di qualche metro decisivo.",
    "La réception": "L'atterraggio",
    "Le télémark, un pied avancé, est obligatoire pour valider tous les points de style.": "Il telemark, un piede avanzato, è obbligatorio per convalidare tutti i punti di stile.",
    "Les notes": "I punteggi",
    "Distance + style (5 juges, on retire la meilleure et la pire note) = score du saut.": "Distanza + stile (5 giudici, si tolgono il voto migliore e il peggiore) = punteggio del salto.",
    "Le vent": "Il vento",
    "Vent et hauteur de barre d'élan sont compensés par des points pour garantir l'équité.": "Vento e altezza della barra di partenza sono compensati con punti per garantire l'equità.",
    "Navettes JO depuis Cavalese et Tesero. Site partagé avec le combiné nordique.": "Navette olimpiche da Cavalese e Tesero. Sito condiviso con la combinata nordica.",
    "≈ 12 000 places au pied des tremplins": "≈ 12 000 posti ai piedi dei trampolini",
    "À partir de 40 € · 120 € (grand tremplin)": "A partire da 40 € · 120 € (trampolino lungo)",
    "Épreuves en soirée — prévoir -7 °C sous les projecteurs": "Gare in serata — prevedere -7 °C sotto i riflettori",

    /* ===================== COMBINÉ NORDIQUE ===================== */
    "Le combiné nordique aux Jeux Olympiques d'hiver Milano Cortina 2026 : saut à ski + ski de fond, méthode Gundersen, épreuves, règles, sites de Predazzo et Tesero, et les athlètes à suivre.": "La combinata nordica ai Giochi Olimpici invernali Milano Cortina 2026: salto con gli sci + sci di fondo, metodo Gundersen, prove, regole, siti di Predazzo e Tesero e gli atleti da seguire.",
    "Combiné nordique — Milano Cortina 2026": "Combinata nordica — Milano Cortina 2026",
    "Présentation du combiné nordique": "Presentazione della combinata nordica",
    "Athlète de combiné nordique en course de ski de fond": "Atleta di combinata nordica nella gara di sci di fondo",
    "Athlètes de combiné nordique en poursuite": "Atleti di combinata nordica nell'inseguimento",
    "COMBINÉ NORDIQUE": "COMBINATA NORDICA",
    "Saut à ski + ski de fond": "Salto con gli sci + sci di fondo",
    "Disciplines combinées": "Discipline combinate",
    "en 1": "in 1",
    "Individuel Gundersen": "Individuale Gundersen",
    "Saut · entraînement": "Salto · allenamento",
    "Sauts officiels d'essai": "Salti ufficiali di prova",
    "Tremplin normal · 10 km": "Trampolino normale · 10 km",
    "Grand tremplin · 10 km": "Trampolino lungo · 10 km",
    "Grand tremplin · 4 × 5 km": "Trampolino lungo · 4 × 5 km",
    "Épreuve par équipes 🥇": "Prova a squadre 🥇",
    "Qu'est-ce que le combiné nordique ?": "Che cos'è la combinata nordica?",
    "Le combiné nordique réunit dans une même journée les deux piliers du ski nordique : le": "La combinata nordica riunisce in una stessa giornata i due pilastri dello sci nordico: il",
    "saut à ski": "salto con gli sci",
    "le matin, puis le": "al mattino, poi lo",
    "l'après-midi. C'est l'épreuve des athlètes les plus complets.": "il pomeriggio. È la prova degli atleti più completi.",
    "Tout repose sur la": "Tutto si basa sul",
    "méthode Gundersen": "metodo Gundersen",
    ": le classement du saut détermine l'ordre et les écarts de départ de la course. Le vainqueur du saut s'élance le premier, les autres avec un retard proportionnel à leurs points. Le premier à franchir la ligne du 10 km gagne, tout simplement.": ": la classifica del salto determina l'ordine e i distacchi di partenza della gara. Il vincitore del salto parte per primo, gli altri con un ritardo proporzionale ai loro punti. Il primo a tagliare il traguardo dei 10 km vince, semplicemente.",
    "Le Norvégien Jarl Magnus Riiber écrase la discipline, dans la lignée du recordman olympique allemand Eric Frenzel.": "Il norvegese Jarl Magnus Riiber domina la disciplina, sulla scia del recordman olimpico tedesco Eric Frenzel.",
    "Le saut": "Il salto",
    "Un saut compte : distance + style établissent le classement et les points de départ.": "Un solo salto conta: distanza + stile stabiliscono la classifica e i punti di partenza.",
    "La méthode Gundersen": "Il metodo Gundersen",
    "Chaque point d'avance au saut se convertit en secondes d'avance au départ de la course.": "Ogni punto di vantaggio nel salto si converte in secondi di vantaggio alla partenza della gara.",
    "La course de fond": "La gara di fondo",
    "La course de fond se dispute en technique libre (skating), la plus rapide.": "La gara di fondo si disputa in tecnica libera (skating), la più veloce.",
    "La poursuite": "L'inseguimento",
    "Les fondeurs partent en décalé : sur la piste, la position reflète directement le classement.": "I fondisti partono in modo sfalsato: in pista, la posizione riflette direttamente la classifica.",
    "Le sprint final": "Lo sprint finale",
    "Premier sur la ligne, premier au classement : un final souvent décidé au sprint.": "Primo sul traguardo, primo in classifica: un finale spesso deciso in volata.",
    "Le 10 km": "I 10 km",
    "Quatre relayeurs par nation : sauts cumulés puis relais 4 × 5 km en poursuite.": "Quattro staffettisti per nazione: salti cumulati poi staffetta 4 × 5 km a inseguimento.",
    "Saut à Predazzo · fond à Tesero — Val di Fiemme": "Salto a Predazzo · fondo a Tesero — Val di Fiemme",
    "≈ 12 000 places (saut) · 10 000 (fond)": "≈ 12 000 posti (salto) · 10 000 (fondo)",
    "Navettes JO entre Predazzo et Tesero. Billet combiné saut + fond recommandé.": "Navette olimpiche tra Predazzo e Tesero. Biglietto combinato salto + fondo consigliato.",
    "À partir de 45 € (journée complète saut + fond)": "A partire da 45 € (giornata completa salto + fondo)",

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

    /* ===================== BIATHLON (EN) ===================== */
    "Le biathlon aux Jeux Olympiques d'hiver Milano Cortina 2026 : épreuves, règles (ski de fond + tir), informations pratiques à Anterselva et les athlètes à suivre.": "Biathlon at the Milano Cortina 2026 Olympic Winter Games: events, rules (cross-country skiing + shooting), practical information in Anterselva and the athletes to watch.",
    "Présentation du biathlon": "Biathlon overview",
    "Pas de tir et skieur lors d'une épreuve de biathlon": "Shooting range and skier during a biathlon event",
    "Biathlètes au pas de tir, position couchée": "Biathletes at the shooting range, prone position",
    "~30 nations engagées": "~30 nations competing",
    "Distance de tir": "Shooting distance",
    "Anneau de pénalité": "Penalty loop",
    "La plus longue épreuve": "The longest event",
    "Relais": "Relay",
    "Relais mixte": "Mixed relay",
    "Individuel": "Individual",
    "Sprint 7,5 km femmes": "Women's 7.5 km sprint",
    "Poursuite 12,5 km hommes": "Men's 12.5 km pursuit",
    "Départ groupé 15 km hommes 🥇": "Men's 15 km mass start 🥇",
    "Qu'est-ce que le biathlon ?": "What is biathlon?",
    "Le biathlon marie deux disciplines opposées : l'endurance explosive du": "Biathlon blends two opposing disciplines: the explosive endurance of",
    "ski de fond": "cross-country skiing",
    "et le sang-froid absolu du": "and the absolute composure of",
    "tir à la carabine": "rifle shooting",
    ". Les athlètes enchaînent boucles de ski et passages au pas de tir, le cœur à plus de 180 pulsations, pour viser cinq cibles à 50 mètres.": ". Athletes alternate ski loops and trips to the shooting range, heart pounding at over 180 beats per minute, to aim at five targets 50 metres away.",
    "Chaque cible manquée coûte cher : un tour de pénalité de 150 mètres ou une minute ajoutée selon le format. La moindre erreur de tir peut anéantir un effort parfait sur les skis — c'est tout le sel de ce sport.": "Every missed target comes at a price: a 150-metre penalty loop or one minute added depending on the format. The slightest shooting error can wipe out a perfect effort on the skis — that's the whole thrill of this sport.",
    "Légende vivante de la discipline, le Français Martin Fourcade a marqué le biathlon de sept titres olympiques.": "A living legend of the discipline, France's Martin Fourcade left his mark on biathlon with seven Olympic titles.",
    "Le ski": "The skiing",
    "Du ski de fond en style libre (skating), sur des boucles entrecoupées de passages au stand de tir.": "Cross-country skiing in free technique (skating), on loops broken up by trips to the shooting range.",
    "Le tir": "The shooting",
    "Cinq cibles à abattre à 50 m, en position couchée puis debout, selon le format de course.": "Five targets to hit at 50 m, prone then standing, depending on the race format.",
    "Couché & debout": "Prone & standing",
    "Cible de 45 mm en couché, de 115 mm en debout : la position debout est bien plus exigeante.": "A 45 mm target when prone, 115 mm when standing: the standing position is far more demanding.",
    "La pénalité": "The penalty",
    "Chaque cible manquée impose un tour de pénalité de 150 m — ou une minute ajoutée en individuel.": "Each missed target means a 150 m penalty loop — or one minute added in the individual.",
    "La carabine": "The rifle",
    "Une carabine .22 LR d'environ 3,5 kg, portée sur le dos pendant tout l'effort.": "A .22 LR rifle of around 3.5 kg, carried on the back throughout the race.",
    "Les formats": "The formats",
    "Sprint, poursuite, individuel, mass start et relais : chacun a ses règles de tir et de pénalité.": "Sprint, pursuit, individual, mass start and relay: each has its own shooting and penalty rules.",
    "Südtirol Arena, Anterselva (Antholz) — Haut-Adige": "Südtirol Arena, Anterselva (Antholz) — South Tyrol",
    "Navettes officielles depuis Brunico (Bruneck), à 25 min. Parkings relais fléchés.": "Official shuttles from Brunico (Bruneck), 25 min away. Signposted park-and-ride lots.",
    "À partir de 35 € (sprint) · 110 € (mass start)": "From €35 (sprint) · €110 (mass start)",
    "Froid d'altitude — prévoir -5 °C, 1 600 m d'altitude": "High-altitude cold — expect -5 °C, 1,600 m elevation",

    /* ===================== CURLING (EN) ===================== */
    "Le curling aux Jeux Olympiques d'hiver Milano Cortina 2026 : épreuves, règles du jeu, informations pratiques au Mediolanum Forum de Milan et les athlètes à suivre.": "Curling at the Milano Cortina 2026 Olympic Winter Games: events, rules of play, practical information at Milan's Mediolanum Forum and the athletes to watch.",
    "Présentation du curling": "Curling overview",
    "Curleur canadien lançant une pierre sur la glace olympique": "Canadian curler delivering a stone on the Olympic ice",
    "Action de curling pendant un match": "Curling action during a match",
    "10 équipes par épreuve": "10 teams per event",
    "Poids d'une pierre": "Stone weight",
    "Manches par match": "Ends per match",
    "Phase 1 : Le double mixte": "Phase 1: Mixed doubles",
    "Lancement du tour préliminaire": "Start of the round robin",
    "Matchs de poule en continu": "Round-robin matches ongoing",
    "Phase finale : Le double mixte": "Final phase: Mixed doubles",
    "Demi-finales": "Semi-finals",
    "Finale pour la médaille d'or 🥇": "Gold medal final 🥇",
    "Qu'est-ce que le curling ?": "What is curling?",
    "Le curling est un sport de précision sur glace opposant deux équipes de quatre joueurs. Chaque équipe fait glisser des pierres de granit de 19,1 kg sur une piste de 45 mètres vers une cible circulaire appelée la maison.": "Curling is a precision sport on ice pitting two teams of four players against each other. Each team slides 19.1 kg granite stones down a 45-metre sheet toward a circular target called the house.",
    "L'objectif est simple : placer ses pierres le plus près possible du centre (le bouton). Mais la stratégie, la communication et le balayage (sweeping) en font un sport d'une richesse tactique exceptionnelle — souvent comparé aux échecs sur glace.": "The aim is simple: place your stones as close as possible to the centre (the button). But strategy, communication and sweeping make it a sport of exceptional tactical richness — often compared to chess on ice.",
    "Aux JO de Milano Cortina 2026, trois médailles d'or sont en jeu : hommes, femmes et double mixte.": "At the Milano Cortina 2026 Games, three gold medals are up for grabs: men, women and mixed doubles.",
    "La pierre": "The stone",
    "Chaque équipe dispose de 8 pierres de granit par manche. Les équipes jouent alternativement, une pierre à la fois.": "Each team has 8 granite stones per end. Teams play alternately, one stone at a time.",
    "La maison": "The house",
    "La cible (maison) est un cercle de 3,66 m de diamètre. Seule l'équipe dont la pierre est la plus proche du bouton marque des points.": "The target (house) is a circle 3.66 m in diameter. Only the team whose stone is closest to the button scores points.",
    "Le balayage": "Sweeping",
    "Deux coéquipiers balaient la glace devant la pierre pour modifier sa trajectoire et sa distance de glissement.": "Two teammates sweep the ice in front of the stone to alter its path and sliding distance.",
    "Le score": "The score",
    "On compte le nombre de pierres plus proches du bouton que la meilleure pierre adverse. Maximum 8 points par manche.": "Count the number of stones closer to the button than the opponent's best stone. Maximum 8 points per end.",
    "Le temps": "The time",
    "Chaque équipe dispose de 38 minutes de réflexion pour un match de 10 manches. Un dépassement peut coûter le match.": "Each team has 38 minutes of thinking time for a 10-end match. Going over can cost the match.",
    "La victoire": "The win",
    "L'équipe qui totalise le plus de points après 10 manches gagne. En cas d'égalité, des manches supplémentaires sont jouées.": "The team with the most points after 10 ends wins. In the event of a tie, extra ends are played.",
    "Métro M2 — Assago Milanofiori Forum. Navette officielle depuis le Duomo (30 min).": "Metro M2 — Assago Milanofiori Forum. Official shuttle from the Duomo (30 min).",
    "À partir de 25 € (préliminaires) · 90 € (finales)": "From €25 (preliminaries) · €90 (finals)",
    "-3 °C sur la glace · 12 °C dans les tribunes": "-3 °C on the ice · 12 °C in the stands",

    /* ===================== SKELETON (EN) ===================== */
    "Le skeleton aux Jeux Olympiques d'hiver Milano Cortina 2026 : descente tête la première — épreuves, règles, piste Eugenio Monti de Cortina et les athlètes à suivre.": "Skeleton at the Milano Cortina 2026 Olympic Winter Games: head-first descent — events, rules, Cortina's Eugenio Monti track and the athletes to watch.",
    "Présentation du skeleton": "Skeleton overview",
    "Départ de skeleton, athlète poussant sa luge": "Skeleton start, athlete pushing the sled",
    "Skeletoneur tête la première sur la piste": "Skeleton slider head first on the track",
    "Hommes & femmes": "Men & women",
    "Manches par finale": "Heats per final",
    "Tête la première, à plat ventre": "Head first, face down",
    "Essais": "Trials",
    "Entraînements chronométrés": "Timed training runs",
    "Finale": "Final",
    "Manches 1 & 2": "Heats 1 & 2",
    "Manches 3 & 4 femmes": "Heats 3 & 4 women",
    "Manches 3 & 4 hommes 🥇": "Heats 3 & 4 men 🥇",
    "Qu'est-ce que le skeleton ?": "What is skeleton?",
    "Le skeleton est sans doute la discipline la plus vertigineuse des Jeux : l'athlète dévale la piste de glace": "Skeleton is arguably the most dizzying discipline of the Games: the athlete hurtles down the ice track",
    "à plat ventre, tête la première": "face down, head first",
    ", le menton à quelques centimètres de la glace, à près de 130 km/h.": ", chin just centimetres from the ice, at nearly 130 km/h.",
    "Tout démarre par un": "It all starts with a",
    "départ sprinté": "sprint start",
    ": l'athlète pousse sa luge sur une trentaine de mètres puis plonge dessus. Le": ": the athlete pushes the sled for about thirty metres then dives onto it. The",
    "se fait au millimètre, par d'infimes transferts de poids des épaules et des genoux. La moindre crispation coûte des centièmes.": "is done to the millimetre, through tiny weight shifts of the shoulders and knees. The slightest tension costs hundredths.",
    "Le Letton Martins Dukurs, recordman de victoires, est la référence intemporelle de la discipline.": "Latvia's Martins Dukurs, the record holder for wins, is the timeless benchmark of the discipline.",
    "La position": "The position",
    "À plat ventre, tête en avant, menton près de la glace : le contraire exact de la luge.": "Face down, head forward, chin near the ice: the exact opposite of luge.",
    "Un sprint de ~30 m en poussant la luge, puis un plongeon dessus. Le départ fait la course.": "A ~30 m sprint pushing the sled, then a dive onto it. The start makes the race.",
    "On dirige par d'infimes pressions des épaules et des genoux. Aucune commande mécanique.": "You steer with tiny pressures of the shoulders and knees. No mechanical controls.",
    "L'engin": "The sled",
    "Une luge basse et lourde, sans carénage : l'athlète est totalement exposé à la glace.": "A low, heavy sled with no fairing: the athlete is fully exposed to the ice.",
    "Le même toboggan que le bob et la luge, partagé sur le site Eugenio Monti de Cortina.": "The same chute as bob and luge, shared at Cortina's Eugenio Monti venue.",
    "Quatre manches sur deux jours, cumul des temps : tout se joue au centième près.": "Four heats over two days, combined times: it all comes down to the hundredth.",
    "Navettes JO depuis Cortina centre. Piste partagée avec bob et luge.": "Olympic shuttles from Cortina centre. Track shared with bob and luge.",
    "À partir de 40 € · 110 € (finale hommes)": "From €40 · €110 (men's final)",

    /* ===================== LUGE (EN) ===================== */
    "La luge aux Jeux Olympiques d'hiver Milano Cortina 2026 : simple, double et relais par équipes — épreuves, règles, piste Eugenio Monti de Cortina et les athlètes à suivre.": "Luge at the Milano Cortina 2026 Olympic Winter Games: singles, doubles and team relay — events, rules, Cortina's Eugenio Monti track and the athletes to watch.",
    "Présentation de la luge": "Luge overview",
    "Lugeur lancé sur la piste olympique": "Luger launched on the Olympic track",
    "Lugeurs lancés sur la piste de glace": "Lugers launched on the ice track",
    "Simple, double & relais": "Singles, doubles & relay",
    "Épreuves au programme": "Events on the programme",
    "Frein sur la luge": "Brake on the sled",
    "Simple": "Singles",
    "Double": "Doubles",
    "Par équipes": "Team",
    "Finales hommes & femmes": "Men's & women's finals",
    "Relais mixte 🥇": "Mixed relay 🥇",
    "Qu'est-ce que la luge ?": "What is luge?",
    "En luge, l'athlète descend la piste de glace": "In luge, the athlete descends the ice track",
    "allongé sur le dos, pieds en avant": "lying on their back, feet first",
    ", sur un engin sans aucun frein ni gouvernail. La vitesse peut dépasser 140 km/h, le visage à quelques centimètres de la glace.": ", on a sled with no brakes or steering. Speed can exceed 140 km/h, the face just centimetres from the ice.",
    "Tout commence par un": "It all starts with a",
    "départ tracté": "handle pull-start",
    ": assis, le lugeur s'élance en tirant sur deux poignées puis se propulse avec des griffes. Le": ": sitting down, the slider launches by pulling on two handles then propels themselves with spikes. The",
    "est invisible : il se fait par de subtiles pressions des mollets sur les patins et des épaules sur la luge. Au millième de seconde près.": "is invisible: it happens through subtle pressures of the calves on the runners and the shoulders on the sled. Down to the thousandth of a second.",
    "L'Italien Armin Zöggeler, sextuple médaillé olympique, reste la légende absolue de la discipline.": "Italy's Armin Zöggeler, a six-time Olympic medallist, remains the absolute legend of the discipline.",
    "Sur le dos, pieds devant, tête en arrière : l'aérodynamisme prime sur tout le reste.": "On the back, feet first, head back: aerodynamics matter above all else.",
    "Assis, le lugeur se tracte sur des poignées puis griffe la glace : les centièmes du départ sont décisifs.": "Sitting, the slider pulls on the handles then claws the ice: the hundredths at the start are decisive.",
    "Aucun gouvernail : on dirige par la pression des mollets et des épaules, invisible à l'œil nu.": "No steering: you guide with the pressure of the calves and shoulders, invisible to the naked eye.",
    "Le double": "The doubles",
    "Deux athlètes superposés sur une même luge : synchronisation parfaite obligatoire.": "Two athletes stacked on the same sled: perfect synchronisation required.",
    "Le même toboggan de glace que le bobsleigh et le skeleton, mais départ plus haut pour la luge.": "The same ice chute as bobsleigh and skeleton, but a higher start for luge.",
    "Le simple se court en quatre manches ; le titre se joue souvent au millième de seconde.": "The singles is run over four heats; the title is often decided by a thousandth of a second.",
    "Navettes JO depuis Cortina centre. Piste partagée avec bob et skeleton.": "Olympic shuttles from Cortina centre. Track shared with bob and skeleton.",
    "À partir de 40 € · 110 € (relais par équipes)": "From €40 · €110 (team relay)",
    "Épreuves en soirée — prévoir -6 °C en bord de piste": "Evening events — expect -6 °C at trackside",

    /* ===================== SKI DE FOND (EN) ===================== */
    "Le ski de fond aux Jeux Olympiques d'hiver Milano Cortina 2026 : sprint, skiathlon, relais, mass start — épreuves, règles, site de Tesero (Val di Fiemme) et les athlètes à suivre.": "Cross-country skiing at the Milano Cortina 2026 Olympic Winter Games: sprint, skiathlon, relay, mass start — events, rules, the Tesero venue (Val di Fiemme) and the athletes to watch.",
    "Présentation du ski de fond": "Cross-country skiing overview",
    "Fondeur en action, technique libre": "Cross-country skier in action, free technique",
    "Peloton de fondeurs en pleine course": "Pack of cross-country skiers mid-race",
    "2 techniques : classique & libre": "2 techniques: classic & free",
    "Techniques de glisse": "Gliding techniques",
    "Technique libre": "Free technique",
    "Sprint individuel": "Individual sprint",
    "Mixte": "Mixed",
    "Skiathlon femmes": "Women's skiathlon",
    "Mass start classique": "Classic mass start",
    "Relais 4 × 7,5 km hommes": "Men's 4 × 7.5 km relay",
    "50 km hommes 🥇": "Men's 50 km 🥇",
    "Qu'est-ce que le ski de fond ?": "What is cross-country skiing?",
    "Le ski de fond est l'épreuve d'": "Cross-country skiing is the",
    "reine des sports d'hiver : des parcours vallonnés de 1,4 à 50 km, parcourus à la seule force des skis et des bâtons. C'est le berceau historique du ski nordique.": "endurance event par excellence of winter sports: rolling courses from 1.4 to 50 km, covered by the sheer power of skis and poles. It's the historic cradle of nordic skiing.",
    "Deux techniques se partagent les épreuves : le": "Two techniques share the events: the",
    "classique": "classic",
    ", skis parallèles dans les traces, et le": ", skis parallel in the tracks, and the",
    "libre": "free",
    "(skating), en pas de patineur, plus rapide. Du sprint explosif au 50 km marathon, chaque format réclame des qualités différentes.": "(skating), in a skating stride, faster. From the explosive sprint to the 50 km marathon, each format demands different qualities.",
    "La Norvégienne Therese Johaug et le sprinteur Johannes Klæbo incarnent la domination scandinave sur la discipline.": "Norway's Therese Johaug and sprinter Johannes Klæbo embody Scandinavian dominance in the discipline.",
    "Le classique": "The classic",
    "Skis parallèles dans des traces parallèles : la technique historique, fluide et exigeante.": "Skis parallel in parallel tracks: the historic technique, smooth and demanding.",
    "Le libre (skating)": "The free technique (skating)",
    "Un pas de patineur en canard, plus rapide : la technique reine des épreuves modernes.": "A duck-footed skating stride, faster: the queen technique of modern events.",
    "Le sprint": "The sprint",
    "Une qualification chronométrée puis des séries en duel sur ~1,4 km. Explosivité maximale.": "A timed qualifier then duel heats over ~1.4 km. Maximum explosiveness.",
    "Le skiathlon": "The skiathlon",
    "Une moitié en classique, une moitié en libre, avec changement de skis en pleine course.": "Half in classic, half in free, with a ski change mid-race.",
    "Le relais": "The relay",
    "Quatre relayeurs par équipe, deux en classique puis deux en libre. La tactique d'équipe prime.": "Four legs per team, two in classic then two in free. Team tactics are decisive.",
    "Le parcours de sprint": "The sprint course",
    "Départ individuel au chrono ou départ groupé (mass start) au coude-à-coude, selon le format.": "Individual timed start or mass start neck-and-neck, depending on the format.",
    "Stade de fond du Lago di Tesero — Val di Fiemme": "Lago di Tesero Cross-Country Stadium — Val di Fiemme",
    "≈ 10 000 places le long du parcours": "≈ 10,000 seats along the course",
    "Navettes JO depuis Cavalese et Predazzo. Parkings relais fléchés en vallée.": "Olympic shuttles from Cavalese and Predazzo. Signposted park-and-ride lots in the valley.",
    "À partir de 30 € (sprint) · 95 € (50 km)": "From €30 (sprint) · €95 (50 km)",
    "Vallée de montagne — prévoir -6 °C, 1 000 m d'altitude": "Mountain valley — expect -6 °C, 1,000 m elevation",

    /* ===================== SAUT À SKI (EN) ===================== */
    "Le saut à ski aux Jeux Olympiques d'hiver Milano Cortina 2026 : tremplins normal et grand, épreuve par équipes, règles, site de Predazzo (Val di Fiemme) et les athlètes à suivre.": "Ski jumping at the Milano Cortina 2026 Olympic Winter Games: normal and large hills, team event, rules, the Predazzo venue (Val di Fiemme) and the athletes to watch.",
    "Présentation du saut à ski": "Ski jumping overview",
    "Sauteur à ski en plein vol au-dessus du tremplin": "Ski jumper in full flight above the hill",
    "Sauteur à ski en plein vol, style en V": "Ski jumper in full flight, V-style",
    "SAUT À SKI": "SKI JUMPING",
    "Tremplins normal & grand": "Normal & large hills",
    "Vitesse sur la table": "Speed on the table",
    "Juges de style": "Style judges",
    "Grand tremplin": "Large hill",
    "Tremplin normal": "Normal hill",
    "Individuel femmes": "Women's individual",
    "Individuel hommes": "Men's individual",
    "Épreuve mixte 🥇": "Mixed event 🥇",
    "Le grand tremplin (HS)": "The large hill (HS)",
    "Qu'est-ce que le saut à ski ?": "What is ski jumping?",
    "Le saut à ski consiste à s'élancer d'un tremplin pour parcourir la plus grande distance possible… avec le plus de style. Après une descente d'élan à près de 95 km/h, l'athlète décolle de la table et plane skis en V pendant plusieurs secondes.": "Ski jumping is about launching off a hill to cover the greatest possible distance… with the most style. After an in-run at nearly 95 km/h, the athlete takes off from the table and glides with skis in a V for several seconds.",
    "La note finale combine deux éléments : la": "The final score combines two elements: the",
    "parcourue (rapportée au point K du tremplin) et le": "covered (relative to the hill's K point) and the",
    ", évalué par cinq juges, jusqu'à la réception en télémark. Le vent et la position de barre d'élan sont compensés pour rester équitables.": ", judged by five judges, through to the telemark landing. Wind and the gate position are compensated to keep things fair.",
    "Le Japonais Ryōyū Kobayashi et l'Autrichien Stefan Kraft figurent parmi les rois de la discipline, dans la lignée du légendaire Kamil Stoch.": "Japan's Ryōyū Kobayashi and Austria's Stefan Kraft are among the kings of the discipline, in the lineage of the legendary Kamil Stoch.",
    "L'élan": "The in-run",
    "Une descente accroupie sur la piste d'élan pour atteindre près de 95 km/h avant le décollage.": "A crouched descent down the in-run to reach nearly 95 km/h before take-off.",
    "La table": "The table",
    "L'instant du décollage : l'extension parfaite au bord du tremplin lance toute la trajectoire.": "The moment of take-off: the perfect extension at the edge of the hill launches the whole trajectory.",
    "Le vol": "The flight",
    "Skis ouverts en V, corps allongé : l'aérodynamisme prolonge le vol de quelques mètres décisifs.": "Skis open in a V, body stretched out: aerodynamics extend the flight by a few decisive metres.",
    "La réception": "The landing",
    "Le télémark, un pied avancé, est obligatoire pour valider tous les points de style.": "The telemark, one foot forward, is required to validate all the style points.",
    "Les notes": "The scores",
    "Distance + style (5 juges, on retire la meilleure et la pire note) = score du saut.": "Distance + style (5 judges, the best and worst marks dropped) = jump score.",
    "Le vent": "The wind",
    "Vent et hauteur de barre d'élan sont compensés par des points pour garantir l'équité.": "Wind and gate height are compensated with points to ensure fairness.",
    "Navettes JO depuis Cavalese et Tesero. Site partagé avec le combiné nordique.": "Olympic shuttles from Cavalese and Tesero. Venue shared with nordic combined.",
    "≈ 12 000 places au pied des tremplins": "≈ 12,000 seats at the foot of the hills",
    "À partir de 40 € · 120 € (grand tremplin)": "From €40 · €120 (large hill)",
    "Épreuves en soirée — prévoir -7 °C sous les projecteurs": "Evening events — expect -7 °C under the floodlights",

    /* ===================== COMBINÉ NORDIQUE (EN) ===================== */
    "Le combiné nordique aux Jeux Olympiques d'hiver Milano Cortina 2026 : saut à ski + ski de fond, méthode Gundersen, épreuves, règles, sites de Predazzo et Tesero, et les athlètes à suivre.": "Nordic combined at the Milano Cortina 2026 Olympic Winter Games: ski jumping + cross-country skiing, the Gundersen method, events, rules, the Predazzo and Tesero venues and the athletes to watch.",
    "Combiné nordique — Milano Cortina 2026": "Nordic combined — Milano Cortina 2026",
    "Présentation du combiné nordique": "Nordic combined overview",
    "Athlète de combiné nordique en course de ski de fond": "Nordic combined athlete in the cross-country race",
    "Athlètes de combiné nordique en poursuite": "Nordic combined athletes in the pursuit",
    "COMBINÉ NORDIQUE": "NORDIC COMBINED",
    "Saut à ski + ski de fond": "Ski jumping + cross-country skiing",
    "Disciplines combinées": "Combined disciplines",
    "en 1": "in 1",
    "Individuel Gundersen": "Gundersen individual",
    "Saut · entraînement": "Jump · training",
    "Sauts officiels d'essai": "Official trial jumps",
    "Tremplin normal · 10 km": "Normal hill · 10 km",
    "Grand tremplin · 10 km": "Large hill · 10 km",
    "Grand tremplin · 4 × 5 km": "Large hill · 4 × 5 km",
    "Épreuve par équipes 🥇": "Team event 🥇",
    "Qu'est-ce que le combiné nordique ?": "What is nordic combined?",
    "Le combiné nordique réunit dans une même journée les deux piliers du ski nordique : le": "Nordic combined brings together in a single day the two pillars of nordic skiing: the",
    "saut à ski": "ski jumping",
    "le matin, puis le": "in the morning, then",
    "l'après-midi. C'est l'épreuve des athlètes les plus complets.": "in the afternoon. It's the event for the most complete athletes.",
    "Tout repose sur la": "Everything rests on the",
    "méthode Gundersen": "Gundersen method",
    ": le classement du saut détermine l'ordre et les écarts de départ de la course. Le vainqueur du saut s'élance le premier, les autres avec un retard proportionnel à leurs points. Le premier à franchir la ligne du 10 km gagne, tout simplement.": ": the jump standings determine the order and the start gaps for the race. The jump winner sets off first, the others with a delay proportional to their points. The first across the 10 km line wins, quite simply.",
    "Le Norvégien Jarl Magnus Riiber écrase la discipline, dans la lignée du recordman olympique allemand Eric Frenzel.": "Norway's Jarl Magnus Riiber crushes the discipline, in the lineage of Germany's Olympic record holder Eric Frenzel.",
    "Le saut": "The jump",
    "Un saut compte : distance + style établissent le classement et les points de départ.": "One jump counts: distance + style set the standings and the starting points.",
    "La méthode Gundersen": "The Gundersen method",
    "Chaque point d'avance au saut se convertit en secondes d'avance au départ de la course.": "Each point of lead in the jump converts into seconds of lead at the start of the race.",
    "La course de fond": "The cross-country race",
    "La course de fond se dispute en technique libre (skating), la plus rapide.": "The cross-country race is run in free technique (skating), the fastest.",
    "La poursuite": "The pursuit",
    "Les fondeurs partent en décalé : sur la piste, la position reflète directement le classement.": "The skiers start at staggered times: on the course, position directly reflects the standings.",
    "Le sprint final": "The final sprint",
    "Premier sur la ligne, premier au classement : un final souvent décidé au sprint.": "First across the line, first in the standings: a finish often decided in a sprint.",
    "Le 10 km": "The 10 km",
    "Quatre relayeurs par nation : sauts cumulés puis relais 4 × 5 km en poursuite.": "Four legs per nation: combined jumps then a 4 × 5 km pursuit relay.",
    "Saut à Predazzo · fond à Tesero — Val di Fiemme": "Jumping in Predazzo · cross-country in Tesero — Val di Fiemme",
    "≈ 12 000 places (saut) · 10 000 (fond)": "≈ 12,000 seats (jumping) · 10,000 (cross-country)",
    "Navettes JO entre Predazzo et Tesero. Billet combiné saut + fond recommandé.": "Olympic shuttles between Predazzo and Tesero. Combined jumping + cross-country ticket recommended.",
    "À partir de 45 € (journée complète saut + fond)": "From €45 (full day jumping + cross-country)",

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
