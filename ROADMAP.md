# ROADMAP — WildPulse

> **À conserver et me re-uploader au début de chaque nouvelle conversation.**
> La mémoire n'est pas activée : ce fichier est la seule trace durable du projet.

---

## Positionnement

Devenir éditeur spécialisé dans les applications animalières.
Le trou du marché : tout est conçu pour le grand public curieux, personne ne construit
pour les gens qui **travaillent** avec les animaux (vétos, soigneurs, éthologues,
gardes, éleveurs, assos, photographes animaliers, étudiants véto).

**Nom** : WildPulse — retenu.

---

## État : toutes les fonctionnalités de la liste sont construites

Les 6 fonctionnalités initiales et les 10 demandées ensuite sont faites,
à l'exception du coloriage et du jeu d'adresse côté Junior.
**Le chantier restant est le branchement des données réelles**, pas
l'ajout de fonctionnalités.

---

## Base actuelle — fait

- Prototype web `atlas-declin.html` : catalogue de fiches espèces
- Courbes de population par espèce (indice base 100), tracé animé à l'encre
- Statut IUCN affiché en tampon, incliné selon la gravité
- Recherche + filtres par groupe (mammifères / marin / insectes)
- Design carnet de terrain : fond encre, Newsreader + Inter + IBM Plex Mono
- Accessibilité : navigation clavier, focus visible, reduced-motion respecté
- Chronique des disparitions (frise temporelle animée sur carte)
- Comparateur de trajectoires
- Causes du déclin + précédents de conservation + actions concrètes par espèce
- Simulateur de perception sensorielle (5 espèces)
- Registre des reclassements (fil d'événements de statut, filtrable)
- Carte mondiale choroplèthe (2 couches, zoom, déplacement, 132 pays)
- Voix du vivant (6 synthèses audio — à remplacer par de vrais enregistrements)
- Missions (18) et Distinctions (8 badges)
- Identification par photo (interface complète + relais serveur `identify.js`)
- Carnet d'observations personnel + export Darwin Core
- Nouvelles du vivant (10 brèves équilibrées, filtrables)
- Effectif restant affiché à l'identification (fourchette + fiabilité + tendance)
- Menu de navigation latéral, icônes ECG animées, ancrage automatique
- Identité visuelle : logo WildPulse (tracé moniteur + empreinte + point qui bat),
  icônes d'app, favicon — fichiers SVG dans les livrables
- **Données actuellement illustratives** — pas encore branchées aux vraies API

---

## Fonctionnalités validées — à construire

### 1. Frise temporelle des extinctions — ✅ FAIT
« Chronique des disparitions » : 12 espèces éteintes documentées, carte du monde,
lecture animée sur 424 ans, onde de choc au moment de l'extinction, récit détaillé
de la dernière espèce perdue. Curseur manuel également.

### 2. Les causes du déclin — ✅ FAIT
Barre de répartition des menaces par espèce + liste détaillée en pourcentages.
Encadré « Ce qui a déjà fonctionné » avec un précédent de conservation réel
et le facteur décisif identifié.

### 3. « Ce que tu peux faire » — ✅ FAIT
Trois leviers vérifiables par espèce, classés du plus direct au plus indirect.
Aucun ne demande de don pour être utile.

### 4. Simulateur de sens animaux — ✅ FAIT
« Voir avec leurs yeux » : la même scène (prairie au crépuscule) redessinée selon
la physiologie de 5 espèces, en vis-à-vis avec la perception humaine.
- **Chien** : dichromatie bleu/jaune, gain nocturne (tapetum lucidum)
- **Oiseau** : tétrachromatie, traînées d'urine UV visibles au sol
- **Chauve-souris** : écholocation animée, fronts d'onde et échos des cibles
- **Serpent** : imagerie thermique, proie brûlante sur fond froid
- **Abeille** : cibles UV sur les fleurs, rouge devenu sombre, trame de l'œil composé
Curseur d'intensité pour doser l'effet. Module autonome, sans lien avec le jeu.

### 5. Comparateur d'espèces — ✅ FAIT
Deux menus, courbes superposées, lecture automatique de l'écart.
Message de fond : l'écart tient à la protection effective, pas à la biologie.

### 6. Notifications de reclassement IUCN — ✅ FAIT (registre)
« Registre des reclassements » : fil chronologique des événements de statut,
filtrable par type (amélioration, aggravation, redécouverte, extinction,
programme de sauvegarde). Badges de transition CR → EN, etc.
Bouton d'abonnement présent mais **non fonctionnel** : les vraies notifications
demandent un backend + service de push. À faire lors du branchement IUCN.

---

## Fonctionnalités demandées — à construire (v2 et au-delà)

> Liste établie par l'utilisateur. À ajouter progressivement.

### 1. Carte mondiale — ✅ FAIT (v1)
Choroplèthe mondiale avec deux couches au choix : espèces menacées et
extinctions documentées. 132 pays renseignés. Zoom (molette, boutons, pincer),
déplacement au glisser, infobulle au survol avec les deux chiffres.
Échelle de couleur en racine carrée pour ne pas écraser les petites valeurs.
**Reste à faire** : couche des aires protégées (source WDPA / Protected Planet),
et remplacement des chiffres indicatifs par l'API IUCN (endpoint /country).
**✅ Base cartographique faite** : la Chronique des disparitions utilise
désormais les contours réels Natural Earth (world-atlas TopoJSON via jsDelivr),
avec un décodeur TopoJSON et une projection Robinson écrits à la main —
aucune dépendance à d3-geo ou Leaflet, le fichier reste autonome.
Repli propre si le réseau échoue. Infobulle et clic sur les repères.
**Reste à faire pour la carte mondiale** : couche des frontières par pays
(`countries-110m.json` au lieu de `land-110m.json`), coloration par niveau
de menace, zoom/panoramique, couche des aires protégées (source : WDPA).

### 2. Reconnaissance d'animaux par IA — ✅ FAIT (relais à déployer)
« Identifier par photo » : dépôt de fichier ou glisser-déposer,
redimensionnement automatique à 1024 px avant envoi (divise le coût
par ~10 sur une photo de téléphone), barre de confiance colorée,
statut IUCN, espèces à ne pas confondre, lien vers la fiche de l'atlas
si l'espèce y figure, et lien de signalement GBIF.

**Fichier `identify.js`** : relais serveur fourni, prêt à déployer.
Il détient la clé et appelle l'API Anthropic (modèle claude-sonnet-4-5,
endpoint /v1/messages avec image base64).

⚠️ **La clé API ne doit JAMAIS être dans le HTML** — un fichier web est
lisible par tous. Le relais existe pour ça.

**À faire pour l'activer** :
1. Déployer `identify.js` sur Vercel (`api/identify.js`), Netlify
   (`netlify/functions/identify.js`) ou Cloudflare Workers — offres
   gratuites suffisantes
2. Définir `ANTHROPIC_API_KEY` en variable d'environnement chez l'hébergeur
3. Restreindre `ALLOWED_ORIGINS` à votre domaine (sinon n'importe quel
   site peut consommer votre quota)
4. Reporter l'adresse dans `ID_ENDPOINT` côté page

Sans configuration, l'interface tourne en **mode démonstration** avec un
exemple de résultat.

**Robustesse validée par test** : le relais normalise toute sortie du
modèle (JSON entouré de backticks, préambule, confiance hors bornes,
statut inventé, types incorrects, JSON cassé) et n'expose jamais de
champ inattendu.

**Reste à faire** : lier l'identification aux missions (photo + géoloc
comme preuve de mission), et à la collection d'espèces (n°8).

### 3. Missions écologiques — ✅ FAIT
« Passer à l'action » : 18 missions concrètes, chacune rattachée à une
espèce réelle de l'atlas et accompagnée de son justificatif scientifique.
4 domaines : Habitat (5), Consommation (5), Science participative (4),
Faire entendre (4). 480 points au total. Filtrables par domaine.

Parti pris : **pas de gamification creuse**. Chaque mission est vérifiable
et explique pourquoi elle compte (ex. « percer 13 cm au bas d'une clôture »
avec l'explication sur le territoire nocturne du hérisson). C'est ce qui
rend l'ensemble crédible auprès d'un adulte.

**Point de vigilance non résolu** : la vérification reste déclarative.
Cocher une mission n'engage à rien. Pour une vraie valeur, il faudrait
photo + géoloc ou validation communautaire — à traiter avec la
reconnaissance IA (n°2), les deux vont ensemble.

### 4. Système de badges — ✅ FAIT
« Distinctions » : 8 badges avec anneau de progression animé.
Premier geste, Jardinier du vivant, Consommateur averti, Contributeur
scientifique, Porte-voix, Sur tous les fronts, Cent points,
Engagement complet.
**Validé par test** : aucun badge débloqué sans action, tous atteignables,
jauges toujours dans [0,1], progression étalée de la 1re à la 18e mission.

### 5. Sons authentiques — ⚠️ PROTOTYPE (à remplacer)
« Voix du vivant » : 6 espèces (loup, chouette, baleine, grillon, rainette,
éléphant) avec spectre animé pendant la lecture.
**Ce sont des SYNTHÈSES Web Audio, pas des enregistrements réels.**
Construites à partir des caractéristiques acoustiques décrites dans la
littérature (fondamentale, harmoniques, rythme, modulation).
Suffisant pour valider l'interface, à remplacer impérativement avant publication.
**Sources réelles à brancher** :
- Xeno-canto API v3 (`xeno-canto.org/api/3/recordings`) — oiseaux uniquement,
  **clé API requise**, gratuite pour les membres inscrits avec email vérifié.
  Ne pas publier la clé dans un dépôt git ; créer une clé dédiée à l'app.
- Macaulay Library (Cornell) — mammifères, amphibiens, insectes.
- Licences à vérifier au cas par cas, même en Creative Commons (attribution
  du preneur de son obligatoire).

### 6. Alertes importantes
Notification quand une espèce : change de statut, est redécouverte,
est déclarée éteinte, ou fait l'objet d'un programme de sauvegarde.
(Recouvre le point 6 de la liste initiale.)

### 7. Mode enfant — 🟡 EN COURS (cartes faites)
**Fichier séparé** : `wildpulse-junior.html`, avec sa propre identité visuelle
(fond papier clair, Fraunces + Nunito, palette chaude) — délibérément opposée
à l'app adulte, tout en gardant l'esprit carnet de terrain.

**✅ Quiz + cartes à collectionner** (les deux modules fusionnés) :
le quiz est la SEULE façon d'obtenir une carte. Bonne réponse = carte gagnée.
- 10 animaux, illustrations SVG originales dessinées à la main
  (aucune banque d'images, aucun problème de droits)
- 20 questions : une version 3-6 ans (2 choix) et une version 7-10 ans
  (3 choix) par animal, avec explication après chaque réponse
- Réponses mélangées à chaque tirage
- **Système de vies** : 3 cœurs. Trois erreurs d'affilée = une carte
  aléatoire est perdue et redevient trouvable (sanction réelle mais pas
  décourageante). 4 bonnes réponses d'affilée = une vie récupérée.
- Compteur de série (« 🔥 4 de suite »)
- 4 raretés, tirage pondéré (commun 57 %, légendaire 4 %)
- Rangs : Apprenti → Pisteur → Naturaliste → Gardien → Grand explorateur

**Équilibrage validé par simulation** (plusieurs milliers de parties) :
- enfant qui comprend (80 %) : carnet complet en ~13 tours
- enfant moyen (65 %) : ~18 tours, 1,5 carte perdue
- réponses au hasard sans lire (20 %) : 15 % des parties n'aboutissent pas
  → marteler ne marche pas, c'est le but
- enfant qui lit les explications et retient : termine à 100 %

**Reste à faire** : coloriage numérique, petit jeu d'adresse.

⚠️ **Réglementation** : services destinés aux mineurs = RGPD renforcé.
Actuellement aucune donnée n'est collectée ni stockée (la collection se
réinitialise au rechargement). Dès qu'on ajoute une sauvegarde de progression,
il faudra traiter le consentement parental.

### 8. Collection d'animaux — ✅ FAIT sous forme de carnet d'observations
« Mon carnet » : consigner espèce, date, coordonnées, nombre d'individus
et remarques. Carte des observations personnelles (même projection
Robinson que le reste de l'app), géolocalisation en un clic,
suggestions d'espèces depuis l'atlas.

**Relié à l'identification par photo** : le bouton « Consigner dans mon
carnet » pré-remplit le formulaire avec l'espèce identifiée et la photo.

**Export Darwin Core** : CSV aux termes officiels GBIF (occurrenceID,
vernacularName, scientificName, eventDate, decimalLatitude,
decimalLongitude, individualCount, occurrenceRemarks, basisOfRecord,
geodeticDatum). Validé par test : échappement RFC 4180 conforme,
colonnes cohérentes même avec virgules/guillemets/sauts de ligne.

**Rien n'est stocké ni envoyé** — volontaire tant que la plateforme de
versement n'est pas branchée. Les observations disparaissent au
rechargement.

**Reste à faire pour que l'utilisateur contribue vraiment** :
1. Persistance locale (IndexedDB) pour que le carnet survive
2. Versement réel des données. Deux voies :
   - **iNaturalist** : API d'écriture disponible, validation
     communautaire. Rapide, mais WildPulse devient client de leur réseau.
   - **Devenir éditeur GBIF** : plus long (enregistrement + engagement
     qualité), mais jeu de données propre à WildPulse = vraie douve.
     Recommandé vu l'ambition d'éditeur spécialisé.
3. Retour à l'utilisateur : « votre observation est la 3ᵉ de cette
   espèce dans votre département cette année » — c'est CE retour qui
   crée le sentiment de contribuer, pas le fait de photographier.

### 9. Actualités — ✅ FAIT (brèves figées)
« Nouvelles du vivant » : 10 brèves filtrables par tonalité
(bonnes / mauvaises / nuancées), avec barre d'équilibre visible.

**Choix éditorial assumé** : 5 bonnes, 3 mauvaises, 2 nuancées.
Le déclin domine l'actualité réelle, mais une revue uniquement négative
décourage plus qu'elle n'informe. La catégorie « nuancée » évite le
manichéisme (ex. « le braconnage recule, les conflits augmentent »).

**Charge d'entretien non résolue** — c'est la seule fonctionnalité qui
demande un travail permanent. Deux voies :
- **Curation manuelle** : qualité garantie, mais 1-2 h par semaine
- **Flux RSS filtré** : Mongabay, communiqués IUCN, Conservation
  International. Nécessite un tri, les flux bruts sont bruyants.
  Un classement automatique de tonalité serait possible via l'API
  (le relais `identify.js` peut servir de modèle).

---

## Pistes de différenciation — gardées, à trancher plus tard

### A. L'observation qui devient de la science — recommandé
Photo → identification → géoloc + horodatage → **versement dans GBIF**.
Le naturaliste amateur devient contributeur scientifique, nom sur la donnée.
Modèle iNaturalist, mais iNaturalist est daté et mal conçu ; place pour une
version moderne et française.
**Seule des trois pistes avec un vrai effet réseau** (plus d'utilisateurs = plus de
valeur = barrière à l'entrée pour la concurrence).
Se marie avec l'Atlas : les observations alimentent les mêmes courbes que l'IUCN.

### B. Carnet de terrain pro
Suivi individuel d'animaux : identification, historique sanitaire, comportement,
photos datées. Pour refuges, sanctuaires, éleveurs, assos.
Marché petit mais qui paie en abonnement, zéro concurrence sérieuse en français.

### C. La preuve de l'impact
Relier un don à une population précise et montrer sa courbe évoluer.
Personne ne le fait.

---

## Photos — sources sans risque juridique

Les photos d'animaux sauvages de qualité sont presque toutes sous copyright.
Sources exploitables :

- **GBIF** et **iNaturalist** (API gratuites) — photos d'observations réelles,
  souvent CC-BY, avec lieu et date. Colle au concept : donnée de terrain, pas du stock.
- **Wikimedia Commons** — bon fond, licences claires.
- **Illustrations vectorielles maison** — plus coûteux en temps, mais identité
  visuelle unique et zéro problème de droits.

---

## Forums — décision

Écartés en v1. Un forum vide tue la crédibilité, et la modération d'une communauté
animalière est brutale (chasse, zoos, véganisme, élevage).

**À la place** : commentaires par espèce, ou section « observations » où les gens
postent ce qu'ils ont vu. Du contenu sans champ de bataille.

---

## Données — à brancher

| Source | Usage | Accès |
|---|---|---|
| IUCN Red List API (`api.iucnredlist.org`) | Statut de menace, historique des reclassements | Clé gratuite sur inscription |
| Living Planet Index (ZSL / WWF) | Séries temporelles de population, 42 000 populations / 5 579 espèces depuis 1970 | Contact / téléchargement |
| GBIF | Observations géolocalisées, photos | API ouverte |
| iNaturalist | Observations, photos CC | API ouverte |

**Note** : les inscriptions IUCN et le contact Living Planet Index sont à faire
par l'utilisateur, elles ne peuvent pas être créées à sa place.

---

## Technique

- **Web d'abord**, puis mobile (encapsulation ou React Native)
- Actuellement : HTML/CSS/JS vanilla, Canvas pour les courbes
- Pas de dépendance externe pour l'instant — à réévaluer si la frise
  temporelle demande une vraie carte (Leaflet / MapLibre)

---

## Projet parallèle — en pause

Jeu mobile **« Through Their Eyes »** : prototype jouable `through-their-eyes.html`,
renard en monde ouvert, mécanique de sens animal, vent, terrier, prédateurs,
méta-progression. Portage Godot 4 prévu si le design est validé par playtest.
Décision : mis de côté au profit de l'application animalière.

---

## Catalogue d'espèces — enrichi

14 espèces avec fiche complète (courbe, causes, précédent de conservation,
3 actions). Données vérifiées par recherche web, sourcées IUCN/WWF/USFWS :

Espèces initiales (8) : vaquita, tigre, gorille de montagne, éléphant de
savane, papillon monarque, léopard de l'Amour, thon rouge, loutre de mer.

Ajouts emblématiques (6, juillet 2026) :
- **Panda géant** (VU) — reclassé depuis « en danger » en 2016, ~1 900 sauvages
- **Ours polaire** (VU) — ~26 000, menacé par la fonte de la banquise
- **Orang-outan de Sumatra** (CR) — ~14 000, habitat détruit par l'huile de palme
- **Pygargue à tête blanche** (LC) — 417 couples en 1963 → 300 000+, cas d'école DDT
- **Rhinocéros noir** (CR) — effondrement puis doublement depuis 1995
- **Baleine à bosse** (LC) — reconstituée après le moratoire de 1986

Deuxième vague d'ajouts (6, juillet 2026) — variété géographique et
équilibre déclin/reconquête :
- **Léopard des neiges** (VU) — 7 000-8 000, montagnes d'Asie centrale
- **Condor de Californie** (CR) — 22 individus en 1982 → 550+, pari fou réussi
- **Éléphant de forêt d'Afrique** (CR) — -86 % en 30 ans, espèce reconnue en 2021
- **Lynx ibérique** (VU) — <100 en 2002 → 2 000+, plus grande reconquête féline
- **Macareux moine** (VU) — déclin lié au réchauffement de la mer
- **Tortue luth** (VU) — Pacifique effondré, Atlantique mieux protégé

**Total : 20 espèces**, chacune avec courbe, causes (somme vérifiée à
100 %), précédent de conservation et 3 actions. Équilibre d'ensemble :
plusieurs reconquêtes (pygargue, baleine, panda, rhinocéros, lynx
ibérique, condor) face aux déclins, pour montrer que la protection
produit des résultats.

Note : les courbes restent des ordres de grandeur cohérents avec les
sources, à remplacer par les séries exactes du Living Planet Index.

**Reste à faire côté catalogue** : cartes Junior (10 actuellement),
et surtout brancher les vraies séries temporelles.


---

## Navigation refondue (juillet 2026)

**Problème corrigé** : toutes les sections étaient empilées sur une seule
page-fleuve. Le menu ne faisait que défiler vers une ancre, et il fallait
scroller sans fin pour tout parcourir.

**Nouvelle logique** : une seule section visible à la fois. Le menu
bascule le panneau affiché (les autres sont masqués). L'accueil est
devenu un **tableau de bord** : une tuile cliquable par section, avec
un aperçu et un compteur (nombre d'espèces, de missions, d'observations…).

- 12 panneaux : accueil + 11 sections
- Rendu différé des canvas quand leur panneau devient visible
  (un canvas masqué a une taille nulle et ne peut pas se dessiner)
- Renvois inter-panneaux préservés : « voir la courbe » depuis
  l'identification ramène à l'accueil sur la bonne fiche ; « consigner
  dans mon carnet » bascule vers le carnet
- Ouverture directe par #ancre conservée
- Structure validée : sections équilibrées, aucun ID dupliqué,
  chaque cible de menu reliée à son panneau

**Reste** : pas de transition de défilement entre panneaux (bascule
instantanée avec léger fondu). Suffisant, mais on pourra raffiner.


---

## Inventaire naturaliste + persistance locale (juillet 2026)

Nouvelle section « Mon inventaire » — l'idée du « Pokédex » de l'utilisateur,
mais recadrée pour rester fidèle au sérieux du projet. **Le mot Pokédex
n'apparaît nulle part** : c'est un inventaire naturaliste, pas un jeu.

**Principe** : la collection se construit par la découverte. Elle part
vide ; chaque espèce identifiée par photo y entre avec sa fiche complète.
Pas de grille pré-remplie de cases grises (plus d'un million d'espèces
existent — un mur infini serait décourageant). La collection, c'est ce
que l'utilisateur a réellement croisé.

**Contenu d'une fiche** : photo prise par l'utilisateur, rareté = statut
IUCN réel, effectif restant dans le monde, taille, habitats, description,
espèces à ne pas confondre, date de première rencontre, nombre de fois revue.

**Garde-fous éthiques assumés dès la conception** :
- La rareté N'EST PAS un score. « En danger critique » est présenté
  comme une alerte (couleur grave), jamais comme un trophée doré.
  Pas de confettis, pas de fanfare.
- Progression par habitats explorés (11 milieux), mais SANS quota
  agressif qui pousserait à déranger la faune pour « cocher » un milieu.
- Partage communautaire : prévu plus tard via l'espace connecté, pas
  bricolé sans modération.

**Persistance locale (IndexedDB)** : la collection survit d'une session
à l'autre, sur l'appareil, rien n'est envoyé. Repli mémoire si IndexedDB
indisponible (mode privé strict). Le jour où l'espace connexion existe,
cette collection se synchronisera sur le compte.

**Relié à l'identification** : bouton « + Ajouter à mon inventaire »
après chaque reconnaissance. Déduplication par nom scientifique
(insensible à la casse) : revoir une espèce actualise sa fiche et son
compteur sans créer de doublon. Validé par test.

**Relais enrichi** : `identify.js` renvoie désormais aussi la taille et
les habitats (liste fermée de 11 milieux, normalisée côté serveur).

**Export CSV** de l'inventaire disponible.

**Reste à faire** : validation communautaire (avec l'espace connecté),
et brancher la même persistance sur le carnet d'observations.


---

## Modèle économique — interface construite (juillet 2026)

Nouveau panneau « Soutenir WildPulse ». Principe directeur retenu avec
l'utilisateur : **ce qui sert la cause reste gratuit, seul le confort
est payant.** Rien de ce qui fait la mission (consulter, apprendre,
carte, actualités) n'est bridé.

**Formule gratuite** : tout le contenu + 10 identifications photo / mois
(le seul bridage, car chaque identification a un coût API réel).

**Formule Naturaliste — 5,99 €/mois, 14 jours d'essai gratuit** :
identifications illimitées, synchronisation à venir, statistiques
avancées, soutien au développement.

**Bouton « Soutenir le créateur »** : café offert / soutien mensuel libre.

**Rubrique dons à la conservation** : liens directs vers les pages de
don officielles (WWF, UICN, FNH, Sea Shepherd, ASPAS). **100 % reversé,
le projet ne prélève rien** et ne collecte pas l'argent — simple pont
vers les organisations. Choix éthique explicite de l'utilisateur.

**Mécanique de quota** (validée par test) : compteur mensuel qui se
réinitialise au changement de mois, essai de 14 jours qui expire
automatiquement, premium illimité et stable, annulation propre.
État persisté en IndexedDB (table `account`, base v2).

⚠️ **Paiement réel à brancher** : toute l'interface est prête, mais
encaisser nécessite un prestataire (Stripe recommandé) et donc un
serveur + compte. Comme pour l'IA, l'interface attend le branchement.
Les boutons de paiement affichent pour l'instant un message d'attente.

**Reste à faire côté monétisation** :
- Brancher Stripe (abonnement + essai) et un lien Ko-fi/Stripe pour le soutien
- Décider du pourcentage de reversement si un jour le modèle change
- Statistiques avancées (promises au premium, à construire)
- Synchronisation multi-appareils (avec l'espace connecté)


---

## Statistiques premium + finalisation monétisation (juillet 2026)

Nouveau panneau « Mes statistiques » — le tableau de bord réservé aux
abonnés promis dans la formule Naturaliste. Réunit les deux volets :

**Composition de la collection** : 4 indicateurs clés (espèces
documentées, habitats explorés, espèces menacées croisées, observations),
répartition par statut de conservation (barres colorées, ordre de
gravité), répartition par habitat.

**Suivi dans le temps** : courbe cumulée en escalier des découvertes
d'espèces et des observations, sur l'axe temporel réel des données.

**Verrouillage premium** : aperçu flouté pour les non-abonnés avec un
appel à l'action clair. Le flou se lève dès l'abonnement (l'écran se
rafraîchit quand le statut change). Calculs validés par test : KPI
exacts, répartitions justes, pas de division par zéro, champs manquants
gérés.

Menu et ordre des panneaux réalignés (15 sections).

**Bilan monétisation — tout est construit côté interface :**
- Formule gratuite (tout le contenu + 10 identifications/mois)
- Formule Naturaliste 5,99 €/mois, 14 j d'essai (identifications
  illimitées + statistiques premium)
- Bouton soutenir le créateur
- Dons conservation 100 % reversés
- Tableau de bord statistique premium

**Ce qui reste pour rendre la monétisation réelle :**
1. Brancher Stripe (abonnement, essai, gestion résiliation)
2. Lien de soutien (Ko-fi ou Stripe) pour le créateur
3. Espace connecté (compte utilisateur) → le quota et l'abonnement
   deviennent inviolables côté serveur, et la synchronisation
   multi-appareils promise au premium devient possible
4. Détail thématique : dans le corps, les panneaux stats/soutien
   tombent entre news et reclassements ; à réordonner un jour pour
   un regroupement plus logique (sans impact fonctionnel)


---

## Espace connexion — interface (juillet 2026)

Bouton compte en haut à droite (symétrique du menu en haut à gauche).
Invité : affiche « Connexion » ; connecté : avatar avec initiales + nom.

**Modale d'authentification** : onglets Connexion / Inscription,
email + mot de passe, validation (email bien formé, mot de passe ≥ 6
caractères, confirmation à l'inscription). Boutons Google et Apple
présents avec mention « bientôt » (branchement OAuth à venir).

**Panneau profil** (accès par le bouton compte, hors menu latéral) :
identité, formule d'abonnement, compteurs (espèces, observations,
identifications restantes), raccourcis vers inventaire/carnet/stats,
gestion de l'abonnement, déconnexion.

**Lien avec l'abonnement** : le plan est porté par le même objet
ACCOUNT que l'email, donc connexion et abonnement cohérents. Se
connecter ne réinitialise pas le plan.

Logique validée par test : validation email (8 cas), formulaire,
initiales (5 cas), cycle connexion/déconnexion, préservation du plan.

⚠️ **Ce n'est PAS une authentification sécurisée.** Sans serveur, le
compte vit localement et le mot de passe n'est volontairement PAS
conservé (le hacher correctement exige un backend). Toute l'interface
est prête pour brancher un vrai service :

**Pour rendre la connexion réelle** :
1. Choisir un fournisseur : Firebase Auth, Supabase Auth, Auth0, ou
   backend maison. Firebase/Supabase sont les plus rapides à mettre
   en place et gèrent email + Google + Apple d'emblée.
2. Remplacer le corps de `doAuth()` par l'appel au service (le point
   d'insertion est commenté dans le code).
3. Une fois le compte serveur en place : le quota et l'abonnement
   deviennent inviolables, la synchronisation multi-appareils de
   l'inventaire devient possible, et les boutons Google/Apple s'activent.

Total : 16 panneaux (15 dans le menu + profil via bouton compte).


---

## Perception animale enrichie (juillet 2026)

Section « Voir avec leurs yeux » portée de 5 à 7 animaux (8 modes avec
l'humain de référence). Deux perceptions radicalement nouvelles, chacune
avec son rendu visuel animé et ses données vérifiées par recherche :

- **Crevette-mante** (Stomatopoda) — vision à balayage : 12 à 16 types
  de photorécepteurs, lumière polarisée. Le rendu montre les bandes
  spectrales et la barre de scan. Fait contre-intuitif assumé dans le
  texte : elle distingue MOINS bien les couleurs que nous, car elle
  balaie au lieu de comparer (étude Thoen et al., Science 2014).
- **Requin** (Selachimorpha) — électroréception via les ampoules de
  Lorenzini : détecte des champs de quelques nV/cm, révélant une proie
  enfouie et invisible. Le rendu montre les champs bioélectriques
  pulsants, dont une proie cachée sous le sable.

Modes précédents : humain, chien (dichromatie), oiseau (UV), abeille
(cibles florales UV), serpent (thermique), chauve-souris (écholocation).

Total : 8 perceptions. Chargement complet vérifié sans erreur.


---

## Système d'expérience et de rangs (juillet 2026)

Premier socle de la future dimension communautaire (rassembler les
protecteurs des animaux). Système d'XP conçu pour FÉDÉRER, pas pour
pousser à collectionner.

**Principe validé avec l'utilisateur — bascule progressive** :
l'activité personnelle fait monter vite au début, puis son rendement
décroît palier après palier tandis que l'entraide prend le relais.
Les hauts rangs ne s'atteignent qu'en aidant la communauté.

**10 niveaux, 4 rangs nommés** : Aventurier (1-3) → Éclaireur (4-5)
→ Naturaliste (6-7) → Guide (8) → Chercheur (9-10).

**Barème** : espèce nouvelle +25 (variété), espèce revue +3 (quantité,
faible), observation de qualité +12, validation d'un débutant +30,
réponse d'entraide +20, mentorat +40. Les gains perso sont multipliés
par un coefficient qui décroît de ×1.0 (niv 1) à ×0.2 (niv 10) ;
l'entraide garde/augmente sa valeur (×1.0 → ×1.27).

**Validé par simulation (3 profils sur 1 an)** :
- solo pur : plafonne au niveau 7, ne peut PAS devenir Chercheur seul ✓
- entraideur : atteint le niveau 10 ✓
- équilibré : niveau 9 ✓

**Carte de membre** (dans le profil) : c'est ce qu'un débutant verra
en parlant à quelqu'un — niveau, rang, barre de progression, ancienneté
en jours, espèces documentées, XP d'entraide. Le bouton compte affiche
aussi le niveau. Badge de niveau réutilisable (`levelBadge()`) prêt pour
les futures conversations entre membres.

**Relié aux actions réelles** : ajouter une espèce à l'inventaire et
consigner une observation donnent de l'XP (nouvelle vs revue, qualité
vs simple). Champs `xp`, `helpXp`, `created` ajoutés au compte,
persistés en IndexedDB, rétrocompatibles.

**Reste à faire (avec le serveur)** : les actions d'entraide
(validation, réponses, mentorat) ne peuvent donner de l'XP réelle
qu'une fois l'entraide entre membres branchée côté serveur. Le barème
et les fonctions sont prêts.


---

## Aires protégées sur la carte (juillet 2026)

Troisième couche ajoutée à l'atlas mondial : « Aires protégées ».
Part du territoire terrestre classée en aire protégée, par pays.

- Échelle de couleur verte (distincte des couches menaces/extinctions
  en tons chauds) : plus le vert est intense, plus le pays s'approche
  ou dépasse l'objectif 30×30.
- Données vérifiées par recherche (Protected Planet / WDPA, World Bank) :
  moyenne des 132 pays = 18,7 % (proche du réel ~17 %), max Venezuela
  56 %, 24 pays atteignent déjà les 30 %.
- Infobulle contextualisée : « objectif 30×30 atteint », « au-dessus/
  sous la moyenne mondiale » selon la valeur.
- Note pédagogique rappelant que protéger sur le papier ne suffit pas —
  tout dépend des moyens de gestion réels.

Structure : 3e indice ajouté aux 132 pays de COUNTRY_DATA (le nom passe
en position 4). Tous les accès mis à jour. Chargement vérifié.

**À brancher plus tard** : données live via l'API Protected Planet,
et distinction terrestre/marin (l'objectif 30×30 couvre les deux).


---

## Catalogue enrichi — diversité des groupes (juillet 2026)

Passage de 20 à 24 espèces, avec un objectif clair : combler les groupes
absents. Le catalogue était déséquilibré (13 mammifères, 6 marins,
1 insecte). Quatre nouveaux groupes ajoutés, chaque espèce vérifiée par
recherche web (IUCN, sources spécialisées) :

- **Axolotl** (Ambystoma mexicanum, CR) — 1er AMPHIBIEN. Endémique de
  Xochimilco, effondrement de 6000 à <35 individus/km². Cas emblématique
  où sauver l'espèce impose de sauver l'écosystème d'abord.
- **Tortue géante des Galápagos** (Chelonoidis niger, VU) — 1er REPTILE.
  De 250 000 à ~10 000, puis remontée par « head-starting » (>5000
  rapatriées sur Pinzón). Beau cas de reconquête.
- **Kakapo** (Strigops habroptilus, CR) — 1er OISEAU. Perroquet nocturne
  inapte au vol, 51 individus en 1995 → ~244 en 2024, chacun suivi et nommé.
- **Esturgeon européen** (Acipenser sturio, CR) — 1er POISSON. Poisson
  préhistorique réduit à une population relique en Gironde (<750 adultes).
  Les esturgeons = groupe animal le plus menacé au monde (IUCN).

Chaque fiche : courbe de population cohérente avec les sources, causes
sommant à 100 %, précédent de conservation, 3 actions concrètes.
Nouveaux filtres de catalogue : Oiseaux, Reptiles, Amphibiens, Poissons.

Répartition finale : marin 6, mammifère 13, amphibien 1, reptile 1,
oiseau 1, poisson 1, insecte 1. (24 espèces.)

Note : les courbes restent des ordres de grandeur cohérents avec les
sources, à remplacer un jour par le Living Planet Index réel.


---

## Catalogue : 27 espèces (juillet 2026)

Trois espèces supplémentaires, toutes vérifiées par recherche web :

- **Bourdon terrestre** (Bombus terrestris, LC) — 2e INSECTE. Seul
  pollinisateur capable de « pollinisation par vibration » (tomates,
  myrtilles). ~46 % des espèces de bourdons d'Europe régressent, ~25 %
  menacées (UICN). Actions directement reproductibles au jardin.
- **Saola** (Pseudoryx nghetinhensis, CR) — la « licorne d'Asie »,
  découverte seulement en 1992, dernière observation confirmée en 2013,
  <100 individus voire déjà éteint. Seul survivant d'une branche
  évolutive de 12-15 millions d'années. Menace principale : les collets
  posés pour d'autres animaux.
- **Grenouille dorée du Panama** (Atelopus zeteki, CR) — 2e AMPHIBIEN.
  Éteinte à l'état sauvage en 2009 (chytride), réintroduite après ~20 ans
  d'élevage conservatoire. Illustre la pire menace pour les amphibiens :
  une maladie ayant fait décliner 500+ espèces, ~90 présumées éteintes.

Répartition : marin 6, mammifère 14, insecte 2, amphibien 2, reptile 1,
oiseau 1, poisson 1.

Toutes vérifications passées : causes = 100 %, years/pop alignés,
menaces avec couleur, chargement sans erreur.


---

## Catalogue : 30 espèces (juillet 2026)

Trois espèces de plus, vérifiées par recherche, ciblant les groupes
sous-représentés :

- **Pangolin de Sunda** (Manis javanica, CR) — le mammifère le plus
  trafiqué au monde, un individu capturé toutes les 5 minutes. Saisie
  record à Singapour en 2019 : 12,9 t d'écailles = ~36 000 animaux.
  Précédent : CITES Annexe I (2017) + retrait de la pharmacopée
  chinoise (2020).
- **Vautour chaugoun** (Gyps bengalensis, CR) — 2e OISEAU. Chute de
  99,7 % en une décennie (40 M → <20 000), la plus rapide jamais
  enregistrée pour un oiseau, causée par un seul médicament vétérinaire
  (diclofénac). Cascade sanitaire : prolifération des chiens errants et
  recrudescence de la rage. Précédent : interdiction en 2006, déclin
  ralenti voire inversé.
- **Requin-baleine** (Rhincodon typus, EN) — 2e POISSON. Plus grand
  poisson du monde, population divisée par 2 en 75 ans, -65 % en
  Indo-Pacifique. Précédent : sanctuaires et tourisme encadré.

Répartition : mammifère 15, marin 6, insecte 2, amphibien 2, oiseau 2,
poisson 2, reptile 1.

Vérifications : causes = 100 %, courbes alignées, menaces colorées,
chargement sans erreur.


---

## Catalogue : 33 espèces (juillet 2026)

Trois dernières espèces de cette phase d'enrichissement :

- **Gavial du Gange** (Gavialis gangeticus, CR) — 2e REPTILE. Dernier
  de sa lignée (séparé des autres crocodiliens il y a 40 M d'années),
  -96 % depuis 1940, ~650 adultes. Le sanctuaire de la Chambal produit
  85 % des nids mondiaux. Incapable de contourner un barrage à pied.
- **Indri** (Indri indri, CR) — le plus grand lémurien, chant portant
  à 2 km, impossible à maintenir en captivité (aucun zoo au monde).
  Porte le chiffre-clé de Madagascar : 103 des 107 espèces de lémuriens
  évaluées sont menacées (98 %), record pour un groupe de vertébrés.
- **Diable de Tasmanie** (Sarcophilus harrisii, EN) — région Océanie
  (absente jusqu'ici). Plus grand marsupial carnivore, -80 % depuis les
  années 1990 à cause d'un cancer transmissible (l'un des 3 connus chez
  l'animal). Populations « assurance » sur îles + résistance génétique
  naturelle en émergence : la population se stabilise.

Répartition finale : mammifère 17, marin 6, insecte 2, amphibien 2,
reptile 2, oiseau 2, poisson 2. Aucun doublon d'id ni de code.

Bilan de la phase : le catalogue est passé de 20 à 33 espèces, de 3 à
7 groupes taxonomiques, avec toutes les données vérifiées par recherche
web (IUCN, WWF, publications scientifiques).
