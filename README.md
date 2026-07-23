# WildPulse

**Le pouls du vivant.** Un observatoire des populations animales : suivre les courbes
d'espèces menacées, comprendre ce qui les fait reculer, et voir ce qui a déjà permis
à d'autres de remonter.

> *La nature a besoin de témoins. Vous en êtes un.*

---

## Ce que contient l'application

**Comprendre**
- **Carte mondiale** — 132 pays, trois couches : espèces menacées, extinctions
  documentées depuis 1500, part du territoire en aire protégée (objectif 30×30).
- **Chronique des disparitions** — frise des espèces éteintes.
- **Comparateur** — superposer deux courbes de population.
- **Voir avec leurs yeux** — 8 perceptions animales reconstituées (chien, oiseau,
  abeille, serpent, chauve-souris, crevette-mante, requin).
- **Écouter le vivant** — synthèses sonores de 6 espèces.

**Agir**
- **Identifier par photo** — reconnaissance d'espèce par IA, avec statut de
  conservation et effectif restant.
- **Mon carnet** — consigner ses observations, export CSV au standard Darwin Core.
- **Mon inventaire** — collection personnelle qui se construit par la découverte.
- **Mes statistiques** — tableau de bord de sa pratique (formule Naturaliste).

**S'engager**
- **Missions** — 18 actions concrètes vérifiables, rattachées à des espèces réelles.
- **Distinctions** — progression par domaine.

**Suivre**
- **Nouvelles du vivant** — actualités équilibrées (bonnes et mauvaises).
- **Registre des reclassements** — changements de statut IUCN.

**Espace Junior** — application séparée pour les enfants (`junior.html`) :
lecture adaptative 3-6 / 7-10 ans, quiz avec système de cartes à collectionner.

---

## Structure du dépôt

```
.
├── index.html          Application principale (autonome, aucune dépendance)
├── junior.html         Espace enfants (autonome)
├── api/
│   └── identify.js     Relais serveur pour la reconnaissance photo
├── assets/             Logos et icônes (SVG)
├── vercel.json         Configuration de déploiement
└── ROADMAP.md          Journal de développement et travaux restants
```

`index.html` et `junior.html` sont **autonomes** : HTML, CSS et JavaScript dans un
seul fichier, sans dépendance externe (hormis les polices Google Fonts et les
contours de pays via CDN). Ils fonctionnent en ouvrant simplement le fichier.

---

## Publier le site

### GitHub Pages (le plus simple)

1. Pousser ce dépôt sur GitHub.
2. Dans **Settings → Pages**, choisir la branche `main` et le dossier `/ (root)`.
3. Le site est en ligne à `https://<utilisateur>.github.io/<dépôt>/`.

`index.html` étant à la racine, il est servi automatiquement.

### Vercel (nécessaire pour la reconnaissance photo)

GitHub Pages ne peut pas exécuter de code serveur. Pour activer l'identification
par IA, il faut Vercel (ou Netlify / Cloudflare Workers) :

1. Importer le dépôt sur [vercel.com](https://vercel.com).
2. Ajouter la variable d'environnement `ANTHROPIC_API_KEY` avec votre clé
   (Settings → Environment Variables).
3. Déployer.
4. Dans `index.html`, renseigner l'adresse du relais :
   ```js
   const ID_ENDPOINT = 'https://votre-projet.vercel.app/api/identify';
   ```

**La clé API ne doit jamais figurer dans le HTML** — elle serait visible par
tous. Le relais `api/identify.js` existe précisément pour la garder côté serveur.

---

## État du projet

L'interface est complète. Ce qui reste à brancher nécessite des comptes et des
services externes :

| Fonctionnalité | État |
|---|---|
| Interface complète (16 sections) | ✅ Terminé |
| Reconnaissance photo | ⚙️ Relais prêt, clé API à fournir |
| Paiement / abonnement | ⚙️ Interface prête, Stripe à brancher |
| Compte utilisateur | ⚙️ Interface prête, Firebase/Supabase à brancher |
| Données IUCN en direct | 📋 À faire (API Red List) |
| Espace Junior : coloriage + jeu | 📋 À faire |

Le détail de chaque chantier est dans [ROADMAP.md](ROADMAP.md).

---

## Sur les données

⚠️ **Les chiffres affichés sont des ordres de grandeur indicatifs**, cohérents avec
les sources publiques (IUCN Red List, WWF, Protected Planet, publications
scientifiques) mais non connectés en direct. Chaque espèce a été vérifiée
individuellement lors de sa saisie.

Pour des données en direct, il faudra brancher :
- [IUCN Red List API](https://api.iucnredlist.org) — statuts de menace
- [Living Planet Index](https://www.livingplanetindex.org) — séries temporelles
- [Protected Planet](https://www.protectedplanet.net) — aires protégées

---

## Modèle

Ce qui sert la cause reste gratuit ; seul le confort est payant.

- **Gratuit** : tout le contenu, le carnet, l'inventaire, la progression,
  et 10 identifications photo par mois.
- **Naturaliste (5,99 €/mois, 14 jours d'essai)** : identifications illimitées,
  statistiques avancées, synchronisation à venir.
- **Dons conservation** : 100 % reversés aux organisations, l'application ne
  prélève rien.

Le système d'expérience et de niveaux est **accessible à tous, gratuitement** :
contribuer à la conservation ne doit jamais être réservé à ceux qui paient.

---

## Licence

Code sous licence MIT (voir [LICENSE](LICENSE)).

Les contenus rédactionnels (descriptions d'espèces, textes de conservation) sont
originaux. Les données factuelles proviennent de sources publiques citées.
