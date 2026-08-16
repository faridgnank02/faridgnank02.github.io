const STORE_KEY = 'site-lang';

function getStoredLang() {
  try { return localStorage.getItem(STORE_KEY) || 'en'; } catch (e) { return 'en'; }
}

function switchLanguage(lang) {
  try { localStorage.setItem(STORE_KEY, lang); } catch (e) {}
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  document.querySelectorAll('.lang-content').forEach(content => {
    content.classList.toggle('active', content.dataset.lang === lang);
  });
  document.querySelectorAll('[data-fr]').forEach(element => {
    const key = lang === 'fr' ? 'fr' : 'en';
    const text = element.dataset[key];
    if (text) element.textContent = text;
  });
}

function toggleMobileMenu() {
  document.getElementById('navLinks').classList.toggle('active');
}

function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 800;
      const start = performance.now();
      function frame(now) {
        const p = Math.min((now - start) / duration, 1);
        el.textContent = Math.round(target * p) + suffix;
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
      observer.unobserve(el);
    });
  }, { threshold: 0.3 });
  counters.forEach(c => observer.observe(c));
}

document.addEventListener('DOMContentLoaded', function () {
  switchLanguage(getStoredLang());
  const target = document.getElementById('navLinks');
  if (target) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const t = document.querySelector(this.getAttribute('href'));
        if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.classList.remove('active');
      });
    });
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  animateCounters();
});