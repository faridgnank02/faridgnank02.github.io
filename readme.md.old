# Portfolio Farid Gnankambary - Data Scientist & ML Engineer

Un portfolio moderne et interactif avec un design cyberpunk/tech, optimisé pour GitHub Pages.

## 🚀 Déploiement GitHub Pages

### Option 1: Déploiement rapide

1. **Fork ou clone ce repository**
   ```bash
   git clone https://github.com/votre-username/portfolio-farid.git
   cd portfolio-farid
   ```

2. **Activez GitHub Pages**
   - Allez dans Settings → Pages
   - Source: Deploy from a branch
   - Branch: main / (root)
   - Cliquez sur Save

3. **Votre site sera disponible à:**
   ```
   https://votre-username.github.io/portfolio-farid/
   ```

### Option 2: Déploiement avec nom de domaine personnalisé

1. **Ajoutez un fichier CNAME**
   ```bash
   echo "votre-domaine.com" > CNAME
   ```

2. **Configurez votre DNS**
   - Type A: 185.199.108.153
   - Type A: 185.199.109.153
   - Type A: 185.199.110.153
   - Type A: 185.199.111.153

## 📁 Structure du projet

```
portfolio/
├── index.html          # Page principale
├── styles.css          # Styles CSS
├── script.js           # JavaScript
├── README.md           # Ce fichier
├── CNAME              # Domaine personnalisé (optionnel)
└── assets/            # Images et ressources (à créer)
    ├── images/
    └── icons/
```

## 🛠️ Personnalisation

### 1. Informations personnelles

**Dans `index.html`**, modifiez :
- Nom et titre dans les sections `<h1>` et `<h2>`
- Informations de contact dans la section terminal
- Liens GitHub et LinkedIn
- Email de contact

**Exemple:**
```html
<h1 class="hero-title">Votre_Nom</h1>
<h2 class="hero-subtitle">Votre_Titre</h2>
```

### 2. Expériences professionnelles

**Dans `index.html`**, section `#experience` :
```html
<div class="timeline-item fade-in">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
        <div class="timeline-date">Période</div>
        <h3 class="timeline-title">Votre Poste</h3>
        <div class="timeline-company">Votre Entreprise</div>
        <p class="timeline-description">Votre description...</p>
    </div>
</div>
```

### 3. Projets

**Dans `index.html`**, section `#projects` :
```html
<div class="project-card fade-in">
    <div class="project-header">
        <i class="fas fa-your-icon"></i>
    </div>
    <div class="project-content">
        <h3 class="project-title">Nom du projet</h3>
        <p class="project-description">Description...</p>
        <div class="project-tech">
            <span class="tech-tag">Tech1</span>
            <span class="tech-tag">Tech2</span>
        </div>
        <div class="project-links">
            <a href="lien-github" class="project-link">Repository</a>
        </div>
    </div>
</div>
```

### 4. Compétences

**Dans `index.html`**, section `#skills` :
```html
<div class="skill-card fade-in">
    <div class="skill-header">
        <div class="skill-icon">
            <i class="fas fa-your-icon"></i>
        </div>
        <h3 class="skill-title">Catégorie</h3>
    </div>
    <ul class="skill-list">
        <li class="skill-item">Compétence 1</li>
        <li class="skill-item">Compétence 2</li>
    </ul>
</div>
```

### 5. Couleurs et thème

**Dans `styles.css`**, variables CSS :
```css
:root {
    --primary: #00ff88;      /* Vert néon */
    --secondary: #0099ff;    /* Bleu */
    --accent: #ff0080;       /* Rose */
    --dark: #0a0a0a;        /* Fond principal */
    --dark-alt: #1a1a1a;    /* Fond alternatif */
}
```

## 🎨 Personnalisation avancée

### Ajouter de nouvelles sections

1. **HTML** - Ajoutez dans `index.html` :
```html
<section id="nouvelle-section" class="section">
    <div class="container">
        <h2 class="section-title">nouvelle_section.md</h2>
        <!-- Votre contenu -->
    </div>
</section>
```

2. **Navigation** - Ajoutez dans le menu :
```html
<li><a href="#nouvelle-section">./nouvelle-section</a></li>
```

### Ajouter des images

1. **Créez le dossier assets/images/**
2. **Ajoutez vos images**
3. **Utilisez dans HTML:**
```html
<img src="assets/images/votre-image.jpg" alt="Description">
```

### Modifier les animations

**Dans `styles.css`**, créez de nouvelles animations :
```css
@keyframes votre-animation {
    0% { /* état initial */ }
    100% { /* état final */ }
}

.votre-classe {
    animation: votre-animation 2s ease-in-out;
}
```

## 📱 Responsive Design

Le site est entièrement responsif. Pour tester :
- Ouvrez les outils de développement (F12)
- Activez le mode responsive
- Testez différentes tailles d'écran

## 🔧 Développement local

### Serveur local simple

**Python 3:**
```bash
python -m http.server 8000
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

**Node.js (avec live-server):**
```bash
npm install -g live-server
live-server
```

### Avec VS Code

1. Installez l'extension "Live Server"
2. Clic droit sur `index.html` → "Open with Live Server"

## 🌐 Multi-langue

Le site supporte français et anglais. Pour ajouter une langue :

1. **HTML** - Ajoutez les attributs data :
```html
<element data-fr="Texte français" data-en="English text" data-es="Texto español">
```

2. **JavaScript** - Étendez la fonction switchLanguage :
```javascript
function switchLanguage(lang) {
    // Logique existante...
    // Ajouter support pour nouvelle langue
}
```

## 📈 SEO et Performance

### Meta tags essentiels

```html
<meta name="description" content="Votre description">
<meta name="keywords" content="data science, ML, AI">
<meta name="author" content="Votre Nom">
<meta property="og:title" content="Votre Portfolio">
<meta property="og:description" content="Description">
<meta property="og:image" content="lien-vers-image">
```

### Optimisations

- Images optimisées (WebP recommandé)
- CSS et JS minifiés en production
- Lazy loading pour les images
- Cache browser configuré

## 🛡️ Sécurité

- Pas de données sensibles dans le code
- Validation côté client pour le formulaire
- Utilisation de HTTPS automatique avec GitHub Pages

## 📊 Analytics (optionnel)

Ajoutez Google Analytics dans `<head>` :
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 🚨 Dépannage

### Le site ne se charge pas
- Vérifiez que GitHub Pages est activé
- Attendez 5-10 minutes après activation
- Vérifiez les erreurs dans la console

### Styles ne s'appliquent pas
- Vérifiez le chemin vers `styles.css`
- Videz le cache navigateur (Ctrl+F5)
- Vérifiez les erreurs CSS dans les outils développeur

### JavaScript ne fonctionne pas
- Vérifiez la console pour les erreurs
- Vérifiez le chemin vers `script.js`
- Testez en local d'abord

## 📞 Support

- Issues GitHub pour les bugs
- Discussions pour les questions
- Email : gnankambar@cy-tech.fr

## 📄 Licence

MIT License - Voir le fichier LICENSE pour les détails.

---

**Bon développement ! 🚀**