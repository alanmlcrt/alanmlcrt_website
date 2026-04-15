# Guide des Champs SEO - Portfolio Alan Molcrette

Ce guide explique l'utilité de chaque champ ajouté dans votre CMS Strapi pour optimiser votre référencement (SEO) et votre visibilité sur les moteurs d'IA (GEO).

---

## 1. Composant SEO (Général)

Ce composant est disponible dans vos types de contenu **Projets** et **About**. Il permet de configurer l'identité de chaque page pour le monde extérieur.

### `metaTitle` (Titre SEO)
- **C'est quoi ?** Le titre bleu qui s'affiche dans les résultats de recherche Google ou dans l'onglet de votre navigateur.
- **Pourquoi l'utiliser ?** Pour inclure des mots-clés qui ne sont pas forcément dans votre titre principal. Par exemple, au lieu de juste "V'Lille Tracker", utilisez "Supervision IoT V'Lille Tracker - Portfolio Alan Molcrette".
- **Conseil :** Gardez-le sous les 60 caractères.

### `metaDescription` (Description SEO)
- **C'est quoi ?** Le petit texte gris sous le titre dans Google.
- **Pourquoi l'utiliser ?** C'est votre "accroche" commerciale. Elle doit donner envie de cliquer.
- **Conseil :** Entre 150 et 160 caractères. Incluez les mots-clés principaux de votre projet.

### `metaImage` (Image de partage)
- **C'est quoi ?** L'image qui s'affiche quand vous collez le lien de votre site sur LinkedIn, Twitter ou Slack.
- **Pourquoi l'utiliser ?** Par défaut, le site utilise votre photo de profil ou l'image du projet. Ce champ permet de choisir une image spécifiquement cadrée pour les réseaux sociaux.

### `keywords` (Mots-clés)
- **C'est quoi ?** Une liste de mots importants (ex: "Arduino, IoT, Lille, Ingénieur").
- **Pourquoi l'utiliser ?** Moins important pour Google aujourd'hui, mais très utile pour les algorithmes internes et certains moteurs de recherche secondaires.

### `metaRobots` (Directives robots)
- **C'est quoi ?** Par défaut réglé sur `index, follow`.
- **Pourquoi l'utiliser ?** Si une page ne doit pas être trouvée sur Google (ex: page de test), vous pouvez changer pour `noindex, nofollow`.

### `canonicalURL` (URL Canonique)
- **C'est quoi ?** L'adresse "officielle" de la page.
- **Pourquoi l'utiliser ?** Si vous postez le même article sur votre blog ET sur Medium/LinkedIn, vous mettez l'URL de votre blog ici pour dire à Google que la source originale, c'est vous.

### `structuredData` (Données structurées JSON-LD)
- **C'est quoi ?** Du code invisible qui explique à Google de quel type de page il s'agit.
- **Pourquoi l'utiliser ?** Pour obtenir les "Rich Snippets" (étoiles de notation, prix, FAQ, etc.). C'est aussi crucial pour le **GEO** (IA Search) car cela structure l'information pour les robots.

---

## 2. Meta Social (Réseaux Sociaux Spécifiques)

Ce champ répétable permet de personnaliser l'affichage différemment pour Facebook et Twitter.

### `socialNetwork` 
- Choix entre Facebook et Twitter.

### `title` / `description` / `image`
- Permet par exemple d'avoir un titre très court pour Twitter et un titre plus long avec une image de haute qualité pour LinkedIn/Facebook.

---

## 3. SEO vs GEO (IA Search)

- **SEO (Google/Bing) :** Se base sur les balises de titre et description.
- **GEO (ChatGPT/Perplexity/SearchGPT) :** Se base énormément sur la **metaDescription** et les **structuredData**. Le fait d'avoir rempli ces champs permet aux IA de "résumer" votre travail avec beaucoup plus de précision et de vous citer comme source.

---

**Note technique :** Si vous laissez ces champs vides, le site est programmé pour utiliser automatiquement vos titres et résumés par défaut. Vous n'avez donc à les remplir que pour les pages que vous souhaitez vraiment "pousser" ou mettre en avant.
