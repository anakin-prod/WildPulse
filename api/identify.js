/**
 * WildPulse — relais d'identification d'espèces
 * ---------------------------------------------
 * Ce fichier tourne CÔTÉ SERVEUR. Il détient la clé API et la protège :
 * le navigateur ne la voit jamais.
 *
 * Déploiement (Vercel) :
 *   1. Placer ce fichier dans  api/identify.js  à la racine du projet
 *   2. Réglages → Environment Variables → ajouter ANTHROPIC_API_KEY
 *   3. Déployer. L'adresse obtenue est à reporter dans ID_ENDPOINT
 *      côté page (section « Identifier par photo »).
 *
 * Netlify : renommer en  netlify/functions/identify.js
 * Cloudflare Workers : adapter l'export (voir la note en bas de fichier)
 *
 * ⚠️ Ne jamais committer la clé dans le dépôt. Elle vit uniquement
 *    dans les variables d'environnement de l'hébergeur.
 */

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-5';

/* Domaines autorisés à appeler ce relais.
   À restreindre à votre domaine avant mise en production —
   sinon n'importe quel site peut consommer votre quota. */
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:8000',
  // 'https://wildpulse.fr',
];

const PROMPT = `Tu es un naturaliste qui identifie des espèces animales à partir de photographies.

Analyse l'image et réponds UNIQUEMENT par un objet JSON valide, sans texte avant ni après, sans balises de code.

Format exact attendu :
{
  "nom": "nom vernaculaire français",
  "nom_scientifique": "Genre species",
  "confiance": 0.0 à 1.0,
  "statut": "LC" | "NT" | "VU" | "EN" | "CR" | "EW" | "EX" | null,
  "effectif": "fourchette d'individus matures restants, ex. \"environ 10\", \"1 500 à 2 000\", \"plusieurs millions\"" | null,
  "effectif_fiabilite": "estimée" | "approximative" | "inconnue",
  "tendance": "hausse" | "stable" | "baisse" | "inconnue",
  "taille": "gabarit adulte, ex. \"30 à 40 cm\", \"1,2 m au garrot\", \"jusqu'à 2 m d'envergure\"" | null,
  "habitats": ["liste parmi : forêt, montagne, littoral, océan, eau douce, prairie, désert, zone humide, milieu urbain, toundra, savane"],
  "description": "2 à 3 phrases : apparence, répartition, comportement notable",
  "confusion": "les espèces proches avec lesquelles on peut la confondre, et le détail qui permet de trancher"
}

Règles :
- "confiance" doit refléter honnêtement ta certitude. Photo floue, animal partiellement caché,
  ou plusieurs espèces possibles → descends la valeur. Ne surestime jamais.
- "statut" est la catégorie IUCN si tu la connais avec certitude pour cette espèce, sinon null.
  Ne devine pas une catégorie.
- "effectif" : population mondiale d'individus matures. Beaucoup d'espèces n'ont pas de
  recensement fiable — dans ce cas mets null plutôt qu'un chiffre inventé. Pour les espèces
  communes, une formulation large suffit ("plusieurs millions"). Précise l'ordre de grandeur,
  jamais un nombre exact sauf pour les espèces suivies individuellement (vaquita, kakapo…).
- "effectif_fiabilite" : "estimée" si un recensement existe, "approximative" si c'est un
  ordre de grandeur, "inconnue" si aucune donnée sérieuse.
- "tendance" : direction de la population selon les évaluations récentes.
- "taille" : gabarit typique d'un adulte (longueur, hauteur ou envergure selon l'espèce), null si incertain.
- "habitats" : un à trois milieux où l'espèce vit réellement, choisis STRICTEMENT dans la liste fournie. Tableau vide si tu ne sais pas.
- Si l'image ne contient aucun animal identifiable, réponds :
  {"nom": null, "nom_scientifique": null, "confiance": 0, "statut": null,
   "effectif": null, "effectif_fiabilite": "inconnue", "tendance": "inconnue",
   "taille": null, "habitats": [],
   "description": "Aucun animal identifiable sur cette image.", "confusion": null}
- Si tu ne peux descendre qu'au genre ou à la famille, indique-le dans "nom"
  (par exemple "Mésange, espèce indéterminée") et baisse la confiance en conséquence.
- Écris en français.`;

function cors(origin) {
  const ok = ALLOWED_ORIGINS.includes(origin);
  return {
    'Access-Control-Allow-Origin': ok ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

export default async function handler(req, res) {
  const headers = cors(req.headers.origin);
  Object.entries(headers).forEach(([k, v]) => res.setHeader(k, v));

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return res.status(500).json({
      error: "La variable d'environnement ANTHROPIC_API_KEY n'est pas définie sur le serveur.",
    });
  }

  const { image, media_type } = req.body || {};
  if (!image) {
    return res.status(400).json({ error: 'Aucune image reçue.' });
  }

  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  const media = allowed.includes(media_type) ? media_type : 'image/jpeg';

  // Garde-fou de taille : ~7 Mo de base64 ≈ 5 Mo d'image
  if (image.length > 7_000_000) {
    return res.status(413).json({ error: 'Image trop volumineuse.' });
  }

  try {
    const r = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 700,
        messages: [
          {
            role: 'user',
            content: [
              { type: 'image', source: { type: 'base64', media_type: media, data: image } },
              { type: 'text', text: PROMPT },
            ],
          },
        ],
      }),
    });

    if (!r.ok) {
      const detail = await r.text().catch(() => '');
      console.error('Erreur API Anthropic:', r.status, detail.slice(0, 400));
      // On ne renvoie pas le détail brut au navigateur : il peut contenir
      // des informations sur la configuration du compte.
      return res.status(502).json({
        error: `L'API a renvoyé une erreur (${r.status}). Vérifiez la clé et le quota du compte.`,
      });
    }

    const data = await r.json();
    const text = (data.content || [])
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
      .trim();

    // Le modèle peut entourer sa réponse de balises de code malgré la consigne
    const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      // Dernier recours : isoler le premier objet JSON du texte
      const m = cleaned.match(/\{[\s\S]*\}/);
      if (!m) {
        console.error('Réponse non exploitable:', cleaned.slice(0, 300));
        return res.status(502).json({ error: 'Réponse du modèle non exploitable.' });
      }
      try {
        parsed = JSON.parse(m[0]);
      } catch {
        return res.status(502).json({ error: 'Réponse du modèle non exploitable.' });
      }
    }

    // Normalisation : on ne fait jamais confiance à la forme de la sortie
    const out = {
      nom: typeof parsed.nom === 'string' ? parsed.nom : null,
      nom_scientifique:
        typeof parsed.nom_scientifique === 'string' ? parsed.nom_scientifique : null,
      confiance:
        typeof parsed.confiance === 'number'
          ? Math.max(0, Math.min(1, parsed.confiance))
          : 0,
      statut: ['LC', 'NT', 'VU', 'EN', 'CR', 'EW', 'EX'].includes(parsed.statut)
        ? parsed.statut
        : null,
      effectif: typeof parsed.effectif === 'string' && parsed.effectif.trim()
        ? parsed.effectif.trim()
        : null,
      effectif_fiabilite: ['estimée', 'approximative', 'inconnue'].includes(
        parsed.effectif_fiabilite
      )
        ? parsed.effectif_fiabilite
        : 'inconnue',
      tendance: ['hausse', 'stable', 'baisse', 'inconnue'].includes(parsed.tendance)
        ? parsed.tendance
        : 'inconnue',
      taille: typeof parsed.taille === 'string' && parsed.taille.trim()
        ? parsed.taille.trim()
        : null,
      habitats: Array.isArray(parsed.habitats)
        ? parsed.habitats
            .filter((x) => typeof x === 'string')
            .map((x) => x.toLowerCase().trim())
            .filter((x) =>
              [
                'forêt', 'montagne', 'littoral', 'océan', 'eau douce', 'prairie',
                'désert', 'zone humide', 'milieu urbain', 'toundra', 'savane',
              ].includes(x)
            )
            .slice(0, 3)
        : [],
      description: typeof parsed.description === 'string' ? parsed.description : null,
      confusion: typeof parsed.confusion === 'string' ? parsed.confusion : null,
    };

    return res.status(200).json(out);
  } catch (e) {
    console.error('Erreur relais:', e);
    return res.status(500).json({ error: "Le relais n'a pas pu joindre l'API." });
  }
}

/* ---------------------------------------------------------------------
   Variante Cloudflare Workers — remplacer l'export ci-dessus par :

   export default {
     async fetch(request, env) {
       if (request.method === 'OPTIONS')
         return new Response(null, { status: 204, headers: cors(request.headers.get('Origin')) });
       if (request.method !== 'POST')
         return new Response('Méthode non autorisée', { status: 405 });

       const { image, media_type } = await request.json();
       // … même logique, avec env.ANTHROPIC_API_KEY au lieu de process.env
       // et return new Response(JSON.stringify(out), { headers: {...cors(...), 'Content-Type':'application/json'} })
     }
   };
   --------------------------------------------------------------------- */
