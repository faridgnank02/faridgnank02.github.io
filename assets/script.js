(function () {
  'use strict';

  var STORAGE_KEY = 'lang';

  function getStoredLang() {
    try { return localStorage.getItem(STORAGE_KEY) || 'en'; } catch (e) { return 'en'; }
  }

  function applyLang(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('.i18n').forEach(function (el) {
      var val = el.getAttribute('data-' + lang);
      if (val !== null) el.textContent = val;
    });
    document.querySelectorAll('.lang button').forEach(function (btn) {
      btn.classList.toggle('on', btn.getAttribute('data-lang') === lang);
    });
  }

  function switchLanguage(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    applyLang(lang);
  }

  function initLang() {
    document.querySelectorAll('.lang button').forEach(function (btn) {
      btn.addEventListener('click', function () { switchLanguage(btn.getAttribute('data-lang')); });
    });
    applyLang(getStoredLang());
  }

  // Rotating typewriter
  function initRotator() {
    var el = document.getElementById('rotator');
    if (!el) return;
    var words = ['AI Engineer / Data Scientist', 'agentic systems', 'RAG pipelines', 'ML models'];
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { el.textContent = words[0]; return; }
    var w = 0, c = 0, deleting = false;
    function tick() {
      var word = words[w];
      el.textContent = word.slice(0, c);
      if (!deleting && c < word.length) { c++; setTimeout(tick, 70); }
      else if (!deleting && c === word.length) { deleting = true; setTimeout(tick, 1400); }
      else if (deleting && c > 0) { c--; setTimeout(tick, 35); }
      else { deleting = false; w = (w + 1) % words.length; setTimeout(tick, 250); }
    }
    tick();
  }

  // Magnetic CTA
  function initMagnetic() {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    document.querySelectorAll('.magnetic').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        btn.style.transform = 'translate(' + (x * 0.15) + 'px,' + (y * 0.15) + 'px)';
      });
      btn.addEventListener('mouseleave', function () { btn.style.transform = ''; });
    });
  }

  // Reveal on scroll
  function initReveal() {
    var els = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  // Scrollspy
  function initSpy() {
    var links = document.querySelectorAll('.nav-links a');
    if (!links.length || !('IntersectionObserver' in window)) return;
    var sections = [];
    links.forEach(function (a) {
      var id = a.getAttribute('href').slice(1);
      var s = document.getElementById(id);
      if (s) sections.push({ a: a, s: s });
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (a) { a.classList.remove('active'); });
          sections.forEach(function (x) { if (x.s === entry.target) x.a.classList.add('active'); });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (x) { io.observe(x.s); });
  }

  // Project rail arrows
  function initRail() {
    var rail = document.getElementById('rail');
    if (!rail) return;
    document.querySelectorAll('[data-arrow]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var card = rail.querySelector('.pcard');
        var step = card ? card.offsetWidth + 14 : 330;
        rail.scrollBy({ left: parseInt(btn.getAttribute('data-arrow'), 10) * step, behavior: 'smooth' });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initLang();
    initRotator();
    initMagnetic();
    initReveal();
    initSpy();
    initRail();
    if (window.Blog && window.Blog.renderHome) window.Blog.renderHome('home-posts', 3);
  });
})();