# 🍣 SENSEI SUSHI - Site Web

Site web vitrine pour le restaurant japonais Sensei Sushi à Bruxelles.

## 📁 Structure du Projet

```
sensei-sushi/
├── fr/                          # Pages en français
│   ├── index.html              # Page d'accueil
│   ├── menu.html               # Menu complet
│   ├── restaurants.html        # Liste des restaurants
│   ├── livraison.html         # Zones de livraison
│   ├── a-propos.html          # À propos
│   ├── contact.html           # Contact
│   └── restaurants/           # Pages détail restaurants
│       ├── jette.html
│       ├── schaerbeek.html
│       └── meiser.html
├── assets/
│   ├── css/                   # Styles CSS modulaires
│   ├── js/                    # Scripts JavaScript
│   └── images/                # Images (à ajouter)
├── img/                       # Images existantes
├── sitemap.xml                # Sitemap SEO
├── robots.txt                 # Robots.txt
└── index.html                 # Redirection vers /fr/
```

## 🚀 Installation

1. Cloner ou télécharger le projet
2. Ouvrir `fr/index.html` dans un navigateur
3. Pour un serveur local : `npx serve . -p 3000`

## 📝 Pages à Compléter

### Page Menu (`fr/menu.html`)
La page menu est structurée avec un système de filtres. Pour ajouter tous les produits du menu complet :

1. Utiliser la structure `.menu-card` pour chaque produit
2. Ajouter les attributs `data-category` et `data-tags` pour les filtres
3. Exemple :
```html
<article class="menu-card" data-category="signature" data-tags="popular">
  <div class="menu-card__image-wrapper">
    <img src="/assets/images/products/pink-lady.webp" alt="Pink Lady">
    <div class="menu-card__badges">
      <span class="badge badge--popular">Populaire</span>
    </div>
    <span class="menu-card__pieces">8 pcs</span>
  </div>
  <div class="menu-card__content">
    <span class="menu-card__number">#51</span>
    <h3 class="menu-card__title">Pink Lady</h3>
    <p class="menu-card__description">Poulet, sauce spicy, concombre, mangue, mayo et pignon de pin</p>
    <div class="menu-card__footer">
      <span class="menu-card__price">9,90€</span>
    </div>
  </div>
</article>
```

### Catégories de Menu
Les catégories disponibles pour `data-category` :
- `entrees` - Entrées
- `crusty` - Crusty (California rolls frits)
- `gyoza` - Gyoza
- `salades` - Salades
- `california` - California Rolls
- `saumon-rolls` - Saumon Rolls
- `makis` - Makis
- `signature` - Signature Rolls
- `udon` - Udon
- `nouilles` - Nouilles fines
- `donburi` - Donburi
- `chirashi` - Chirashi
- `sashimi` - Sashimi
- `poke` - Poké Bowls
- `sushi-piece` - Sushi à la pièce
- `plateaux` - Plateaux
- `menus-midi` - Menus midi
- `desserts` - Desserts
- `boissons` - Boissons

### Tags disponibles
- `popular` - Populaire
- `new` - Nouveau
- `veggie` - Végétarien
- `spicy` - Épicé

## 🎨 Personnalisation

### Couleurs
Modifier les variables CSS dans `assets/css/variables.css` :
- `--color-primary` : Rouge principal (#C8102E)
- `--color-gold` : Or (#D4A84B)
- `--color-black` : Noir (#1A1A1A)

### Polices
Les polices sont chargées depuis Google Fonts :
- Playfair Display (titres)
- Inter (corps de texte)
- Noto Sans JP (texte japonais)

## 📱 Responsive

Le site est entièrement responsive avec breakpoints :
- Mobile : < 768px
- Tablet : 768px - 1023px
- Desktop : 1024px+

## 🔍 SEO

- Meta tags optimisés sur toutes les pages
- Schema.org (Restaurant) sur la page d'accueil
- Sitemap.xml configuré
- Robots.txt configuré
- URLs canoniques

## 📞 Contact

- Email : info@senseisushi.be
- Téléphone Jette : 02 425 27 99
- Téléphone Schaerbeek : 02 648 14 54
- Téléphone Meiser : 02 770 06 16

## 📄 Licence

© 2024 Sensei Sushi. Tous droits réservés.

