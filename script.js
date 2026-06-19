let currentLanguage = 'fr';

function switchLanguage(lang) {
    currentLanguage = lang;

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    document.querySelectorAll('.lang-content').forEach(content => {
        content.classList.toggle('active', content.dataset.lang === lang);
    });

    document.querySelectorAll('[data-fr]').forEach(element => {
        const text = element.dataset[lang];
        if (text) element.textContent = text;
    });
}

function toggleMobileMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const subject = formData.get('subject');
    const body = `De: ${formData.get('name')} (${formData.get('email')})\n\n${formData.get('message')}`;
    window.location.href = `mailto:mohamedgnank@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            document.getElementById('navLinks').classList.remove('active');
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
