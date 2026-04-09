# Documentation : Gestion du Portfolio avec Strapi CMS

Cette documentation explique comment utiliser le tableau de bord Strapi pour gérer vos projets, ajouter de nouveaux articles et mettre à jour votre portfolio en temps réel.

> [!NOTE]
> Vous avez mentionné "Stripe", mais étant donné que votre projet utilise **Strapi** comme CMS (et que vous l'aviez ouvert dans votre navigateur), cette documentation se concentre sur **Strapi**. Si vous souhaitiez réellement ajouter des paiements avec Stripe, merci de me le préciser !

## 1. Accès au Tableau de Bord
Le panneau d'administration est accessible localement à l'adresse suivante :
[http://localhost:1337/admin](http://localhost:1337/admin)

![Interface de connexion Strapi](file:///C:/Users/alanc/.gemini/antigravity/brain/a22639b8-abb4-4257-b449-e9d97a0320f7/artifacts/strapi_login_page_1775652990547.png)

---

## 2. Gérer vos Projets
Pour ajouter, modifier ou supprimer des projets :
1. Cliquez sur **Content Manager** dans la barre latérale gauche.
2. Sous "Collection Types", sélectionnez **Project**.
La gestion du contenu a été simplifiée au maximum pour une rédaction fluide et rapide, comme sur un traitement de texte :

### A. Le Contenu de l'Article (Markdown Simple)
Utilisez le champ **Content** pour rédiger tout votre texte. Vous pouvez facilement ajouter :
- **Titre & Sous-titres** : Mettez un `#` (Titre principal) ou `##` (Sous-titre) au début de la ligne.
- **Citations** : Mettez un `>` au début de la ligne pour créer une citation avec un style premium.
- **Listes** : Utilisez `-` ou `*` pour faire des puces de liste de chaque fonctionnalité.
- **Images & Légendes** : Lors de l'ajout d'une image, le texte "alternatif" (alt text) servira automatiquement de **légende** très design sous votre image sur le site internet ! (Syntaxe : `![Voici ma légende pour cette image spectaculaire](lien_image)`)

### B. Project Specs (La Barre Latérale)
Vous pouvez maintenant éditer les "Caractéristiques" (Specs) de vos projets directement depuis Strapi !
- Descendez jusqu'à la section **Specs**.
- Cliquez sur **Add new Spec** et tapez simplement son nom (ex: "Développement React", "Design Ultra-Rapide").
- Ces specs s'afficheront sur la droite de l'écran avec une belle icône "Vérifié" (✓). Si vous laissez la liste vide, des specs "démo" s'afficheront.

![Édition d'un projet dans Strapi](file:///C:/Users/alanc/.gemini/antigravity/brain/a22639b8-abb4-4257-b449-e9d97a0320f7/artifacts/strapi_project_edit_page_1775653160836.png)

> [!TIP]
> N'oubliez pas de cliquer sur **Save** puis sur **Publish** pour que l'article soit visible sur votre site !

---

## 4. Aperçu sur le Frontend
Une fois publié dans Strapi, l'article apparaît automatiquement sur votre site Next.js (souvent sur `http://localhost:3000/projects`).

![Validation de l'affichage sur le site Next.js](file:///C:/Users/alanc/.gemini/antigravity/brain/a22639b8-abb4-4257-b449-e9d97a0320f7/artifacts/frontend_project_list_with_test_article_1775653188597.png)

### Résultat de la validation :
- **Backend Strapi** : Opérationnel ✓
- **Seeding de données** : Opérationnel ✓
- **API (Lecture publique)** : Opérationnelle ✓
- **Affichage Frontend** : Opérationnel ✓
