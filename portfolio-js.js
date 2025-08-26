// Variables globales
let currentLanguage = 'fr';

// Fonction de changement de langue
function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Mettre à jour les boutons de langue
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Mettre à jour le contenu par langue
    document.querySelectorAll('.lang-content').forEach(content => {
        content.classList.remove('active');
        if (content.dataset.lang === lang) {
            content.classList.add('active');
        }
    });
    
    // Mettre à jour les éléments avec attributs data-lang
    document.querySelectorAll('[data-fr]').forEach(element => {
        const text = element.dataset[lang];
        if (text) {
            element.textContent = text;
        }
    });
}

// Fonction de menu mobile
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Navigation fluide
document.addEventListener('DOMContentLoaded', function() {
    // Ajout des événements de navigation fluide
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            // Fermer le menu mobile après clic
            document.querySelector('.nav-links').classList.remove('active');
        });
    });

    // Observer pour les animations au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observer tous les éléments avec la classe fade-in
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Initialiser le curseur clignotant
    blinkCursor();
    
    // Animation d'écriture pour le titre principal
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.style.borderRight = '3px solid var(--primary)';
            setTimeout(() => {
                heroTitle.style.borderRight = 'none';
            }, 2000);
        }
    }, 3000);
});

// Effet du header au scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.98)';
        header.style.borderBottom = '1px solid var(--secondary)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
        header.style.borderBottom = '1px solid var(--primary)';
    }
});

// Fonction pour créer des caractères Matrix
function createMatrixChar() {
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン';
    const char = document.createElement('div');
    char.classList.add('matrix-char');
    char.textContent = chars[Math.floor(Math.random() * chars.length)];
    char.style.left = Math.random() * 100 + 'vw';
    char.style.animationDelay = Math.random() * 3 + 's';
    char.style.fontSize = Math.random() * 20 + 10 + 'px';
    
    document.body.appendChild(char);
    
    setTimeout(() => {
        char.remove();
    }, 3000);
}

// Créer l'effet Matrix périodiquement
setInterval(createMatrixChar, 200);

// Fonction pour faire clignoter le curseur
function blinkCursor() {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 500);
    }
}

// Gestion de la soumission du formulaire
function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Créer le lien mailto
    const mailtoLink = `mailto:gnankambar@cy-tech.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`De: ${name} (${email})\n\n${message}`)}`;
    window.location.href = mailtoLink;
}

// Fonction pour ajouter des effets de particules
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.backgroundColor = 'var(--primary)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.opacity = '0.7';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    particle.style.zIndex = '-1';
    
    document.body.appendChild(particle);
    
    const animation = particle.animate([
        { transform: 'translateY(0px)', opacity: 0.7 },
        { transform: `translateY(-${window.innerHeight + 100}px)`, opacity: 0 }
    ], {
        duration: 3000 + Math.random() * 2000,
        easing: 'linear'
    });
    
    animation.onfinish = () => particle.remove();
}

// Créer des particules périodiquement
setInterval(createParticle, 300);

// Fonction pour les effets de survol des cartes
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.skill-card, .project-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Fonction pour les effets de typing
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Fonction pour détecter si l'élément est visible
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Fonction pour ajouter des effets de glitch
function addGlitchEffect(element) {
    element.style.animation = 'glitch 0.3s ease-in-out';
    setTimeout(() => {
        element.style.animation = '';
    }, 300);
}

// Ajout d'événements pour les effets spéciaux
document.addEventListener('DOMContentLoaded', function() {
    // Ajouter les effets de survol
    addCardHoverEffects();
    
    // Effet de glitch sur le logo au clic
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', () => addGlitchEffect(logo));
    }
    
    // Effet de particules au clic
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-primary') || e.target.classList.contains('btn-outline')) {
            for (let i = 0; i < 10; i++) {
                setTimeout(() => createParticle(), i * 50);
            }
        }
    });
    
    // Animation des liens sociaux
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach((link, index) => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotate(360deg)';
            this.style.transition = 'all 0.3s ease';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });
    
    // Effet de machine à écrire sur le terminal
    const terminalLines = document.querySelectorAll('.terminal-line');
    terminalLines.forEach((line, index) => {
        const originalText = line.textContent;
        line.textContent = '';
        setTimeout(() => {
            typeWriter(line, originalText, 50);
        }, index * 500);
    });
});

// Fonction pour gérer le mode sombre/clair (bonus)
function toggleTheme() {
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme');
    
    if (currentTheme === 'light') {
        root.setAttribute('data-theme', 'dark');
    } else {
        root.setAttribute('data-theme', 'light');
    }
}

// Fonction pour sauvegarder les préférences utilisateur
function saveUserPreferences() {
    localStorage.setItem('language', currentLanguage);
    localStorage.setItem('theme', document.documentElement.getAttribute('data-theme') || 'dark');
}

// Fonction pour charger les préférences utilisateur
function loadUserPreferences() {
    const savedLanguage = localStorage.getItem('language');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedLanguage && savedLanguage !== currentLanguage) {
        switchLanguage(savedLanguage);
    }
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
}

// Fonction pour ajouter des effets sonores (optionnel)
function playSound(type) {
    // Cette fonction peut être étendue pour ajouter des effets sonores
    // using Web Audio API si désiré
    console.log(`Playing ${type} sound effect`);
}

// Gestion des erreurs JavaScript
window.addEventListener('error', function(e) {
    console.log('Erreur capturée:', e.error);
    // Ici vous pouvez ajouter un système de logging des erreurs
});

// Performance monitoring
function measurePageLoadTime() {
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Page chargée en ${loadTime.toFixed(2)}ms`);
    });
}

// Initialisation finale
document.addEventListener('DOMContentLoaded', function() {
    loadUserPreferences();
    measurePageLoadTime();
    
    // Sauvegarder les préférences lors du changement
    window.addEventListener('beforeunload', saveUserPreferences);
    
    console.log('🚀 Portfolio Farid Gnankambary initialisé avec succès!');
});

// Export des fonctions principales pour utilisation externe si nécessaire
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        switchLanguage,
        toggleMobileMenu,
        handleFormSubmit,
        createMatrixChar,
        addGlitchEffect
    };
}