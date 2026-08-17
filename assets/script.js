(function () {
  'use strict';

  var STORAGE_KEY = 'lang';

  function getStoredLang() {
    try { return localStorage.getItem(STORAGE_KEY) || 'fr'; } catch (e) { return 'fr'; }
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

  // Terminal typewriter
  function typeTerminal() {
    var lines = document.querySelectorAll('.term > div');
    if (!lines.length) return;
    lines.forEach(function (line) { line.style.opacity = '0.35'; });
    var i = 0;
    function show() {
      if (i < lines.length) {
        lines[i].style.opacity = '1';
        i++;
        setTimeout(show, 320);
      }
    }
    show();
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
    typeTerminal();
    initReveal();
    initSpy();
    initRail();
  });
})();