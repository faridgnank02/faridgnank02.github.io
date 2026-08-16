# Portfolio Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `faridgnank02.github.io` as a dark indie-builder portfolio (walidkoussa-inspired), bilingual EN-default/FR toggle, with an on-site blog, using plain HTML/CSS/JS multi-page architecture.

**Architecture:** Multi-page static site. Shared `styles.css` (design tokens/design system), shared `script.js` (EN-default FR/EN toggle persisted in `localStorage`, mobile menu, scroll reveal, animated counters). Bilingual pages use `data-fr`/`data-en` + `.lang-content` blocks (extending the existing mechanism). Blog lives in its own MRU-sorted `blog/` folder; a Node `new-post.js` scaffolds posts and regenerates the index. All pages reuse identical header/nav/footer markup (copied verbatim). Deploy = `git push` (GitHub Pages).

**Tech Stack:** HTML5, CSS3 (custom properties), vanilla JS (IntersectionObserver, localStorage), Node.js (built-in `node:test`) for the blog scaffold script. Google Fonts: Space Grotesk, Inter, JetBrains Mono.

**Spec:** `docs/superpowers/specs/2026-08-16-portfolio-rebuild-design.md`

---

## Design Tokens (reference for all tasks)

```css
:root {
  --bg: #0B0F14;
  --surface: #131A22;
  --surface-hover: #1A2430;
  --text-1: #E6EDF3;
  --text-2: #9BA8B4;
  --text-3: #6B7785;
  --accent: #22D3EE;
  --accent-2: #0EA5E9;
  --border: #223040;
  --border-hover: #22D3EE;
  --green: #34D399;
  --font-display: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --radius: 12px;
  --space: 5rem;
  --content-max: 1200px;
}
```

## Page Inventory

All pages except blog posts share this exact `<header>`/`<nav>` (reuse verbatim; adjust `aria-current` / `.active` on current page link):

```html
<header class="site-header">
  <nav class="nav container">
    <span class="logo mono">fr_trenton02</span>
    <ul class="nav-links" id="navLinks">
      <li><a href="skills.html">Skills</a></li>
      <li><a href="projects.html">Projects</a></li>
      <li><a href="about.html">About</a></li>
      <li><a href="blog/index.html">Blog</a></li>
      <li><a href="contact.html">Contact</a></li>
    </ul>
    <div class="nav-actions">
      <div class="lang-switch">
        <button class="lang-btn active" data-lang="en" onclick="switchLanguage('en')">EN</button>
        <button class="lang-btn" data-lang="fr" onclick="switchLanguage('fr')">FR</button>
      </div>
      <button class="mobile-menu-btn" onclick="toggleMobileMenu()" aria-label="Menu">☰</button>
    </div>
  </nav>
</header>
```

Nav labels toggle with language: EN `Skills·Projects·About·Blog·Contact` / FR `Compétences·Projets·À propos·Blog·Contact`, plus In English/fr the links use `data-fr`/`data-en` attributes.

Shared footer (all pages, blog posts too):

```html
<footer class="site-footer">
  <div class="container footer-inner">
    <div class="social-links">
      <a href="https://github.com/faridgnank02" class="social-link" target="_blank" rel="noopener">GitHub</a>
      <a href="https://linkedin.com/in/farid-gnankambary-a617821b2/" class="social-link" target="_blank" rel="noopener">LinkedIn</a>
      <a href="mailto:mohamedgnank@gmail.com" class="social-link">Email</a>
    </div>
    <p class="footer-copy" data-fr="© 2026 Farid GNANKAMBARY — fr_trenton02" data-en="© 2026 Farid GNANKAMBARY — fr_trenton02">© 2026 Farid GNANKAMBARY — fr_trenton02</p>
  </div>
</footer>
```

`script.js` is linked on every page. Blog posts link only the parts of the JS they need (they declare their own minimal loader, see Task 12).

---

### Task 1: Design system & base styles

**Files:**
- Rewrite: `assets/styles.css`

**Context:** Replace the current light-theme `styles.css` (797 lines) entirely with the dark design system. Keep it organized: tokens → reset → base → components (header/nav, buttons, hero, cards, grids, timeline, forms, footer) → utilities → responsive.

- [ ] **Step 1: Create the CSS reset, tokens, and base typography**

Add the `:root` blocks from the Design Tokens section above, plus:

```css
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--font-body);
  background: var(--bg);
  color: var(--text-1);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
.container { max-width: var(--content-max); margin: 0 auto; padding: 0 1.5rem; }
.mono { font-family: var(--font-mono); }
h1,h2,h3,h4 { font-family: var(--font-display); line-height: 1.15; }
a { color: var(--accent); text-decoration: none; }
a:hover { color: var(--accent-2); }
section { padding: var(--space) 0; }
.section-alt { background: #0d1219; }
```

- [ ] **Step 2: Add header/nav/footer styles**

```css
.site-header { position: sticky; top: 0; z-index: 50; background: rgba(11,15,20,.85); backdrop-filter: blur(8px); border-bottom: 1px solid var(--border); }
.nav { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.5rem; }
.logo { color: var(--accent); font-weight: 700; font-size: 1.05rem; }
.nav-links { display: flex; gap: 1.75rem; list-style: none; }
.nav-links a { color: var(--text-2); font-weight: 500; }
.nav-links a:hover, .nav-links a.active { color: var(--accent); }
.nav-actions { display: flex; align-items: center; gap: 1rem; }
.lang-btn { background: none; border: 1px solid var(--border); color: var(--text-2); border-radius: 6px; padding: .25rem .6rem; cursor: pointer; font-family: var(--font-mono); font-size: .8rem; }
.lang-btn.active { border-color: var(--accent); color: var(--accent); }
.mobile-menu-btn { display: none; background: none; border: none; color: var(--text-1); font-size: 1.4rem; cursor: pointer; }
.site-footer { border-top: 1px solid var(--border); padding: 2.5rem 0; margin-top: 3rem; }
.footer-inner { display: flex; flex-direction: column; align-items: center; gap: 1rem; text-align: center; }
.social-links { display: flex; gap: 1.5rem; }
.social-link { color: var(--text-2); font-size: .95rem; }
.social-link:hover { color: var(--accent); }
.footer-copy { color: var(--text-3); font-size: .85rem; }
@media (max-width: 768px) {
  .mobile-menu-btn { display: block; }
  .nav-links { display: none; flex-direction: column; position: absolute; top: 100%; left: 0; right: 0; background: var(--bg); padding: 1rem 1.5rem; border-bottom: 1px solid var(--border); }
  .nav-links.active { display: flex; }
}
```

- [ ] **Step 3: Add card, button, grid, and reveal utilities**

```css
.btn { display: inline-flex; align-items: center; gap: .5rem; padding: .7rem 1.4rem; border-radius: 8px; font-weight: 600; border: 1px solid transparent; cursor: pointer; transition: all .2s; font-family: var(--font-body); }
.btn-primary { background: var(--accent); color: #07101a; }
.btn-primary:hover { background: var(--accent-2); color: #fff; }
.btn-outline { border-color: var(--border); color: var(--text-1); }
.btn-outline:hover { border-color: var(--accent); color: var(--accent); }
.card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 2rem; transition: transform .2s, border-color .2s; }
.card:hover { border-color: var(--border-hover); transform: translateY(-2px); }
.project-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; }
.tool-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; }
.fade-in { opacity: 0; transform: translateY(20px); transition: opacity .6s, transform .6s; }
.fade-in.visible { opacity: 1; transform: none; }
.tech { display: inline-block; font-family: var(--font-mono); font-size: .72rem; color: var(--text-2); background: rgba(34,211,238,.08); border: 1px solid rgba(34,211,238,.25); border-radius: 5px; padding: .15rem .5rem; margin: .15rem .2rem .15rem 0; }
.badge { font-family: var(--font-mono); font-size: .72rem; color: var(--green); border: 1px solid rgba(52,211,153,.3); background: rgba(52,211,153,.08); border-radius: 5px; padding: .15rem .5rem; }
```

- [ ] **Step 4: Add hero and section-title styles**

```css
.hero { min-height: 60vh; display: flex; flex-direction: column; justify-content: center; padding: 6rem 0; position: relative; overflow: hidden; }
.hero::before { content:''; position:absolute; inset:0; background: radial-gradient(circle at 70% 20%, rgba(34,211,238,.12), transparent 45%), radial-gradient(rgba(34,211,238,.05) 1px, transparent 1px); background-size: auto, 22px 22px; pointer-events:none; z-index:0; }
.hero > .container { position: relative; z-index: 1; }
.hero-handle { font-family: var(--font-mono); color: var(--accent); font-size: 1rem; letter-spacing: .05em; }
.hero-title { font-size: clamp(2.5rem, 6vw, 4.5rem); margin: .5rem 0 1rem; }
.hero-subtitle { color: var(--text-2); font-size: clamp(1.05rem, 2.5vw, 1.4rem); max-width: 56ch; }
.hero-cta { display: flex; gap: 1rem; margin-top: 2rem; flex-wrap: wrap; }
.hero-stats { display: flex; gap: 2rem; margin-top: 3rem; flex-wrap: wrap; }
.stat-number { font-family: var(--font-display); font-size: 2rem; font-weight: 700; color: var(--accent); }
.stat-label { display: block; color: var(--text-3); font-size: .85rem; margin-top: .25rem; }
.section-title { font-size: 2rem; margin-bottom: 2rem; position: relative; padding-bottom: .75rem; }
.section-title::after { content:''; position:absolute; left:0; bottom:0; width: 3rem; height: 3px; background: var(--accent); border-radius: 2px; }
```

- [ ] **Step 5: Verify the stylesheet loads**

Run: open `assets/styles.css` and confirm token/variable definitions at the top, and that file is valid (no unbalanced braces). Then open existing `index.html` in a browser — page renders dark; HTML may look broken (content styles not yet migrated) but base/list styles apply. Note: we fully replace index.html in a later task; temporary visual breakage is expected and acceptable at this stage.
- [ ] **Step 6: Commit**

```bash
git add assets/styles.css && git commit -m "feat(styles): add dark design system and base components"
```

---

### Task 2: Core JS — language toggle, menu, reveal, counters

**Files:**
- Rewrite: `assets/script.js`

**Context:** Extend the existing `script.js`. New behavior: **EN default** (was FR), `localStorage` persistence, animated number counters for hero stats (elements get `data-count`), non-blog pages show `.lang-content`/`data-*` swapping. Keep `handleFormSubmit` removal (no contact form per spec).

- [ ] **Step 1: Write the TODO-list check — implement full script**

Replace `script.js` entirely with:

```js
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
```

- [ ] **Step 2: Create a lightweight smoke test page**

Create `assets/_smoke.html` (temporary; delete in Task 13):

```html
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>smoke</title>
<link rel="stylesheet" href="styles.css"><script src="script.js"></script></head>
<body>
<nav><button class="lang-btn active" data-lang="en">EN</button><button class="lang-btn" data-lang="fr">FR</button></nav>
<p class="lang-content active" data-lang="en">Hello</p>
<p class="lang-content" data-lang="fr">Bonjour</p>
<span data-fr="Accueil" data-en="Home">Home</span>
<span class="stat-number" data-count="1192" data-suffix="K"></span>
<div style="height:100vh"></div><p class="fade-in">seen</p>
</body></html>
```

- [ ] **Step 3: Verify toggle, persistence, counters, reveal**

Open `assets/_smoke.html` in a browser. Assert: (a) shows EN content + "Home" by default; (b) clicking FR swaps to "Bonjour"/"Accueil" and stays after reload (localStorage); (c) `1192K` counter animates on scroll into view; (d) `.fade-in` "seen" gains `.visible` when scrolled into view. Expected: all pass.
- [ ] **Step 4: Commit**

```bash
git add assets/script.js assets/_smoke.html && git commit -m "feat(js): EN-default toggle, persistence, counters, reveal"
```

---

### Task 3: Home page — shell, hero, and stats

**Files:**
- Rewrite: `index.html`

**Context:** Replace the old 499-line single-page `index.html` with the multi-page home shell (partial content; later tasks fill Skills/Projects/etc. sections). This task establishes the head, nav, hero, and footer so later tasks append body sections.

- [ ] **Step 1: Write the document head + nav + hero + footer shell**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Farid GNANKAMBARY — AI Engineer (fr_trenton02)</title>
  <meta name="description" content="AI Engineer building agents, RAG systems and LLM evaluation. Bilingual EN/FR.">
  <meta name="theme-color" content="#0B0F14">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/styles.css">
</head>
<body>
  <header class="site-header">
    <nav class="nav">
      <span class="logo mono">fr_trenton02</span>
      <ul class="nav-links" id="navLinks">
        <li><a href="skills.html"><span data-fr="Compétences" data-en="Skills">Skills</span></a></li>
        <li><a href="projects.html"><span data-fr="Projets" data-en="Projects">Projects</span></a></li>
        <li><a href="about.html"><span data-fr="À propos" data-en="About">About</span></a></li>
        <li><a href="blog/index.html"><span data-fr="Blog" data-en="Blog">Blog</span></a></li>
        <li><a href="contact.html"><span data-fr="Contact" data-en="Contact">Contact</span></a></li>
      </ul>
      <div class="nav-actions">
        <div class="lang-switch">
          <button class="lang-btn active" data-lang="en" onclick="switchLanguage('en')">EN</button>
          <button class="lang-btn" data-lang="fr" onclick="switchLanguage('fr')">FR</button>
        </div>
        <button class="mobile-menu-btn" onclick="toggleMobileMenu()" aria-label="Menu">☰</button>
      </div>
    </nav>
  </header>

  <main>
    <section class="hero">
      <div class="container">
        <p class="hero-handle">fr_trenton02</p>
        <h1 class="hero-title">Farid GNANKAMBARY</h1>
        <p class="hero-subtitle lang-content active" data-lang="en">I design, build and harden AI agents &amp; RAG systems — and make data talk. AI Engineer on the path of the best.</p>
        <p class="hero-subtitle lang-content" data-lang="fr">Je conçois, je construis et je fiabilise des agents IA &amp; des systèmes RAG — et je fais parler les données.</p>
        <div class="hero-cta">
          <a href="projects.html" class="btn btn-primary"><span data-fr="Voir mes projets" data-en="View my projects">View my projects</span></a>
          <a href="contact.html" class="btn btn-outline"><span data-fr="Me contacter" data-en="Contact me">Contact me</span></a>
        </div>
        <div class="hero-stats">
          <div><span class="stat-number" data-count="21">21</span><span class="stat-label" data-fr="K projets analysés" data-en="K projects analyzed">K projects analyzed</span></div>
          <div><span class="stat-number" data-count="250" data-suffix="+">250+</span><span class="stat-label" data-fr="contrôles automatisés" data-en="controls automated">controls automated</span></div>
          <div><span class="stat-number" data-count="10" data-suffix="+">10+</span><span class="stat-label" data-fr="projets open source" data-en="open-source projects">open-source projects</span></div>
          <div><span class="stat-number" data-count="3" data-suffix="+">3+</span><span class="stat-label" data-fr="années d'expérience" data-en="years of experience">years of experience</span></div>
        </div>
      </div>
    </section>
    <!-- SECTIONS_PLACEHOLDER -->
  </main>

  <footer class="site-footer">
    <div class="container footer-inner">
      <div class="social-links">
        <a href="https://github.com/faridgnank02" class="social-link" target="_blank" rel="noopener">GitHub</a>
        <a href="https://linkedin.com/in/farid-gnankambary-a617821b2/" class="social-link" target="_blank" rel="noopener">LinkedIn</a>
        <a href="mailto:mohamedgnank@gmail.com" class="social-link">Email</a>
      </div>
      <p class="footer-copy">© 2026 Farid GNANKAMBARY — fr_trenton02</p>
    </div>
  </footer>
  <script src="assets/script.js"></script>
</body>
</html>
```

Leave the literal marker `<!-- SECTIONS_PLACEHOLDER -->` — later tasks replace it.
- [ ] **Step 2: Verify hero renders and toggle works**

Open `index.html` in a browser. Assert: dark hero, EN text by default; handle `fr_trenton02` in mono cyan; 4 stats shown; FR toggle flips subtitle + nav + stat labels; 21/250+/10+/3+ counters animate.
- [ ] **Step 3: Commit**

```bash
git add index.html && git commit -m "feat(home): hero, nav, footer shell"
```

---

### Task 4: Home — Skills overview + tool stack section

**Files:**
- Modify: `index.html` (replace `<!-- SECTIONS_PLACEHOLDER -->` with this section)

**Context:** Bilingual intro + categorized tool stack grid.

- [ ] **Step 1: Insert the skills + tool stack section**

Replace the placeholder comment in `index.html` with:

```html
<section id="skills" class="section section-alt fade-in">
  <div class="container">
    <h2 class="section-title"><span data-fr="Ce que je fais" data-en="What I do">What I do</span></h2>
    <p class="lang-content active" data-lang="en" style="max-width:70ch;color:var(--text-2)">AI Engineer specialized in generative AI and agentic systems — designing robust, accountable LLM workflows from concept to production: RAG pipelines, multi-agent orchestration, and rigorous evaluation.</p>
    <p class="lang-content" data-lang="fr" style="max-width:70ch;color:var(--text-2)">Ingénieur IA spécialisé en IA générative et systèmes agentiques — je conçois des workflows LLM robustes et traçables, du concept à la production : pipelines RAG, orchestration multi-agents et évaluation rigoureuse.</p>
    <div class="tool-grid" style="margin-top:2.5rem">
      <div class="card"><h3><span data-fr="LLM & Agents" data-en="LLM & Agents">LLM & Agents</span></h3><span class="tech">LangGraph</span><span class="tech">LangChain</span><span class="tech">MCP</span><span class="tech">RAG</span><span class="tech">Fine-tuning</span><span class="tech">Structured Output</span></div>
      <div class="card"><h3><span data-fr="Évaluation & LLMOps" data-en="Evaluation & LLMOps">Evaluation & LLMOps</span></h3><span class="tech">LangFuse</span><span class="tech">LLM-as-Judge</span><span class="tech">RAGAS</span><span class="tech">MLflow</span><span class="tech">Drift</span><span class="tech">Monitoring</span></div>
      <div class="card"><h3><span data-fr="Cloud & Infra" data-en="Cloud & Infra">Cloud & Infra</span></h3><span class="tech">GCP</span><span class="tech">AWS</span><span class="tech">Docker</span><span class="tech">Kubernetes</span><span class="tech">FastAPI</span><span class="tech">CI/CD</span></div>
      <div class="card"><h3><span data-fr="Données" data-en="Data">Data</span></h3><span class="tech">PostgreSQL</span><span class="tech">BigQuery</span><span class="tech">Weaviate</span><span class="tech">FAISS</span><span class="tech">Qdrant</span><span class="tech">Redis</span></div>
    </div>
    <div style="margin-top:2rem"><a href="skills.html" class="btn btn-outline"><span data-fr="Toutes mes compétences" data-en="View all skills">View all skills</span></a></div>
  </div>
</section>
```

- [ ] **Step 2: Verify section renders and is bilingual**

Open `index.html`. Assert: 4 tool cards (LLM&Agents, Evaluation&LLMOps, Cloud&Infra, Data) with mono tech badges; FR toggle translates the intro and card headers; card hover lifts (transform + cyan border).
- [ ] **Step 3: Commit**

```bash
git add index.html && git commit -m "feat(home): skills overview and tool stack"
```

---

### Task 5: Home — Featured projects (6 cards)

**Files:**
- Modify: `index.html` (insert before `<section id="skills">`, after hero)

**Context:** The 6 featured project cards, ordered per spec. Insert AFTER `</section>` (hero) and BEFORE `<section id="skills"`.

- [ ] **Step 1: Insert the featured projects section**

```html
<section id="projects" class="section fade-in">
  <div class="container">
    <h2 class="section-title"><span data-fr="Projets à la une" data-en="Featured projects">Featured projects</span></h2>
    <div class="project-grid">
      <!-- card template; repeat 6x -->
      <article class="card project-card"><div class="badge">AI / RAG</div><h3>Knowbase</h3><p class="lang-content active" data-lang="en" style="color:var(--text-2)">From-scratch RAG knowledge base over FastAPI's corpus — vector + full-text + LLM reranker (MRR 0.90); CLI, MCP server &amp; web UI.</p><p class="lang-content" data-lang="fr" style="color:var(--text-2)">Base de connaissances RAG built from scratch sur le corpus FastAPI — vectoriel + full-text + reranker LLM (MRR 0.90) ; CLI, serveur MCP &amp; web UI.</p><div><span class="tech">Python</span><span class="tech">pgvector</span><span class="tech">MCP</span><span class="tech">RAG</span><span class="tech">FastAPI</span></div><a href="https://github.com/faridgnank02/cerebras_knowledge_base" target="_blank" rel="noopener" class="project-link">GitHub →</a></article>
      <article class="card project-card"><div class="badge">Voice AI</div><h3>Voice Clone Consent Gate</h3><p class="lang-content active" data-lang="en" style="color:var(--text-2)">Privacy-first local voice cloning with a multilingual consent gate and cross-lingual synthesis (XTTS v2) — no external APIs.</p><p class="lang-content" data-lang="fr" style="color:var(--text-2)">Clonage vocal local, respectueux de la vie privée, avec portail de consentement multilingue et synthèse cross-lingue (XTTS v2) — sans API externe.</p><div><span class="tech">XTTS v2</span><span class="tech">Whisper</span><span class="tech">Gradio</span><span class="tech">Ollama</span></div><a href="https://github.com/faridgnank02/voice-cloning" target="_blank" rel="noopener" class="project-link">GitHub →</a></article>
      <article class="card project-card"><div class="badge">Agentic RAG</div><h3>PPD2 AI Platform</h3><p class="lang-content active" data-lang="en" style="color:var(--text-2)">Agentic RAG platform analyzing 21,198 international development projects — AdaptiveRouter 8-step pipeline, FAISS, security layers.</p><p class="lang-content" data-lang="fr" style="color:var(--text-2)">Plateforme RAG agentique analysant 21 198 projets internationaux de développement — pipeline AdaptiveRouter en 8 étapes, FAISS, couches de sécurité.</p><div><span class="tech">FastAPI</span><span class="tech">FAISS</span><span class="tech">GPT-4o</span><span class="tech">Streamlit</span></div><a href="https://github.com/faridgnank02" target="_blank" rel="noopener" class="project-link">GitHub →</a></article>
      <article class="card project-card"><div class="badge">Agents</div><h3>Monitor Agent</h3><p class="lang-content active" data-lang="en" style="color:var(--text-2)">Enterprise website-change monitoring: multi-agent pipeline, MCP server, human-in-the-loop approvals, real-time dashboard.</p><p class="lang-content" data-lang="fr" style="color:var(--text-2)">Monitoring de changement de sites en entreprise : pipeline multi-agents, serveur MCP, approbations humain-dans-la-boucle, dashboard temps réel.</p><div><span class="tech">LangGraph</span><span class="tech">MCP</span><span class="tech">FastAPI</span><span class="tech">Next.js</span><span class="tech">Groq</span></div><a href="https://github.com/faridgnank02/website-monitoring-agent" target="_blank" rel="noopener" class="project-link">GitHub →</a></article>
      <article class="card project-card"><div class="badge">Video AI</div><h3>Video Intelligence</h3><p class="lang-content active" data-lang="en" style="color:var(--text-2)">Agentic video analysis into structured reports — summary, chapters, quotes — with cost-aware model routing and per-stage tracing.</p><p class="lang-content" data-lang="fr" style="color:var(--text-2)">Analyse vidéo agentique en rapports structurés — résumé, chapitres, citations — avec routage de modèles optimisé coût et tracing par étape.</p><div><span class="tech">yt-dlp</span><span class="tech">Whisper</span><span class="tech">Ollama</span><span class="tech">FastAPI</span><span class="tech">React</span></div><a href="https://github.com/faridgnank02/video-summarizer" target="_blank" rel="noopener" class="project-link">GitHub →</a></article>
      <article class="card project-card"><div class="badge">Text-to-SQL</div><h3>Multilingual Text-to-SQL</h3><p class="lang-content active" data-lang="en" style="color:var(--text-2)">Natural language → SQL in FR/EN/ES/DE via a LangGraph 8-node pipeline, RAG, anti-injection layers, MLflow + CI/CD.</p><p class="lang-content" data-lang="fr" style="color:var(--text-2)">Langage naturel → SQL en FR/EN/ES/DE via un pipeline LangGraph à 8 nœuds, RAG, couches anti-injection, MLflow + CI/CD.</p><div><span class="tech">LangGraph</span><span class="tech">RAG</span><span class="tech">FAISS</span><span class="tech">MLflow</span><span class="tech">Docker</span></div><a href="https://github.com/faridgnank02/multilingual-text-2-sql" target="_blank" rel="noopener" class="project-link">GitHub →</a></article>
    </div>
    <div style="margin-top:2rem"><a href="projects.html" class="btn btn-outline"><span data-fr="Tous mes projets" data-en="All projects">All projects</span></a></div>
  </div>
</section>
```

- [ ] **Step 2: Verify the 6 cards render with correct order & links**

Open `index.html`. Assert order: Knowbase → Voice Clone → PPD2 → Monitor Agent → Video Intelligence → Text-to-SQL. Each: badge, title, EN+FR description, tech badges, GitHub link (target _blank). Toggle swaps descriptions.
- [ ] **Step 3: Commit**

```bash
git add index.html && git commit -m "feat(home): six featured project cards"
```

---

### Task 6: Home — Work history, formation, about teaser, contact

**Files:**
- Modify: `index.html` (insert the remaining sections between `<section id="projects">` and `</main>`)

- [ ] **Step 1: Insert recent work history section**

```html
<section id="experience" class="section section-alt fade-in">
  <div class="container">
    <h2 class="section-title"><span data-fr="Parcours récent" data-en="Recent work">Recent work</span></h2>
    <div class="timeline" style="display:flex;flex-direction:column;gap:1.5rem">
      <div class="card"><h3>Ingénieur IA <span class="badge">since 04/2025</span></h3><p style="color:var(--text-2)">DiGreen Advisory — Paris</p><ul style="margin:1rem 0 0 1.2rem;color:var(--text-2)"><li class="lang-content active" data-lang="en">Designed &amp; shipped SaaS GenAI (Di Tech Control): automated 250+ internal compliance controls via full LLM pipelines.</li><li class="lang-content" data-lang="fr">Conçu et mis en production le SaaS GenAI (Di Tech Control) : automatisation de 250+ contrôles internes via des pipelines LLM complets.</li><li class="lang-content active" data-lang="en">Built RegTech decision agent (Di Tech Decision) in LangGraph — supervisor + 4 specialized sub-graphs.</li><li class="lang-content" data-lang="fr">Développé l'agent décisionnel RegTech (Di Tech Decision) en LangGraph — superviseur + 4 sous-graphes spécialisés.</li></ul></div>
      <div class="card"><h3>Data Scientist <span class="badge">2023–2024</span></h3><p style="color:var(--text-2)">Sogeti (Capgemini) — Issy-les-Moulineaux</p><ul style="margin:1rem 0 0 1.2rem;color:var(--text-2)"><li class="lang-content active" data-lang="en">Hybrid recommendation system (Content-Based + RAG) over 4,000+ CVs/jobs → +18% matching relevance.</li><li class="lang-content" data-lang="fr">Système de recommandation hybride (Content-Based + RAG) sur 4 000+ CVs/offres → +18% de pertinence.</li></ul></div>
      <div class="card"><h3>Développeur IA Freelance <span class="badge">since 06/2025</span></h3><p style="color:var(--text-2)">Fiverr — Remote</p><ul style="margin:1rem 0 0 1.2rem;color:var(--text-2)"><li class="lang-content active" data-lang="en">Shipped agentic AI systems &amp; RAG chatbots end-to-end (LangGraph, FastAPI, AWS, Docker).</li><li class="lang-content" data-lang="fr">Livré des systèmes IA agentiques et chatbots RAG bout-en-bout (LangGraph, FastAPI, AWS, Docker).</li></ul></div>
    </div>
    <div style="margin-top:2rem"><a href="experience.html" class="btn btn-outline"><span data-fr="Tout mon parcours" data-en="Full experience">Full experience</span></a></div>
  </div>
</section>
```

- [ ] **Step 2: Insert formation + about teaser + contact sections**

```html
<section id="education" class="section fade-in">
  <div class="container">
    <h2 class="section-title"><span data-fr="Formation" data-en="Education">Education</span></h2>
    <div class="card"><h3><span data-fr="Diplôme d'Ingénieur" data-en="Engineering Degree">Engineering Degree</span> — <span data-fr="Mathématiques Appliquées, spécialité IA" data-en="Applied Mathematics, AI track">Applied Mathematics, AI track</span></h3><p style="color:var(--text-2)">CY Tech — Cergy, France · 2021–2024</p><p style="color:var(--text-2);margin-top:.5rem"><span class="badge">TOEIC 955</span> <span class="badge">Deep Learning Specialization</span> <span class="badge">PyTorch (IBM)</span></p></div>
    <div style="margin-top:2rem"><a href="education.html" class="btn btn-outline"><span data-fr="Voir la formation" data-en="View education">View education</span></a></div>
  </div>
</section>

<section id="about-teaser" class="section section-alt fade-in">
  <div class="container" style="max-width:760px">
    <h2 class="section-title"><span data-fr="Qui je suis" data-en="Who I am">Who I am</span></h2>
    <p class="lang-content active" data-en style="color:var(--text-2)">AI Engineer with a degree in Applied Mathematics and 3+ years shipping LLM systems in enterprise &amp; SaaS — strong on Generative AI, agents, RAG, MLOps and LLM evaluation.</p>
    <p class="lang-content" data-fr style="color:var(--text-2)">Ingénieur IA diplômé en Mathématiques Appliquées, 3+ ans d'expérience en production de systèmes LLM en entreprise &amp; SaaS — expert IA générative, agents, RAG, MLOps et évaluation LLM.</p>
    <div style="margin-top:1.5rem"><a href="about.html" class="btn btn-outline"><span data-fr="En savoir plus" data-en="Learn more">Learn more</span></a></div>
  </div>
</section>

<section id="contact" class="section fade-in">
  <div class="container">
    <h2 class="section-title"><span data-fr="Travaillons ensemble" data-en="Let's work together">Let's work together</span></h2>
    <div class="tool-grid">
      <a class="card" href="mailto:mohamedgnank@gmail.com" style="color:var(--text-1)"><h3>Email</h3><p class="mono" style="color:var(--accent)">mohamedgnank@gmail.com</p></a>
      <a class="card" href="https://github.com/faridgnank02" target="_blank" rel="noopener" style="color:var(--text-1)"><h3>GitHub</h3><p class="mono" style="color:var(--accent)">github.com/faridgnank02</p></a>
      <a class="card" href="https://linkedin.com/in/farid-gnankambary-a617821b2/" target="_blank" rel="noopener" style="color:var(--text-1)"><h3>LinkedIn</h3><p class="mono" style="color:var(--accent)">in/farid-gnankambary</p></a>
      <div class="card"><h3><span data-fr="Localisation" data-en="Location">Location</span></h3><p class="mono" style="color:var(--accent)">Île-de-France, FR</p></div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Verify home page is complete**

Open `index.html`. Assert all sections in order: Hero → Skills → Projects → Recent work → Education → About teaser → Contact. Toggle translates every bilingual string. All "View more" buttons link to the correct sub-pages. Footer present with 3 socials.
- [ ] **Step 4: Commit**

```bash
git add index.html && git commit -m "feat(home): work history, education, about, contact sections"
```

---

### Task 7: Skills page

**Files:**
- Create: `skills.html`

- [ ] **Step 1: Write skills page (full tool stack detail)**

Same head/fonts/styles/script as `index.html`. Nav with `skills.html` link marked `.active`. Body: page title + a detailed "what he does" intro (EN/FR), then 4 expanded tool cards (from Spec Skills section: LLM & Agents, Evaluation & LLMOps, Cloud & Infra, Data, plus Languages FR/EN/ES/DE + soft skills). Each card lists items as `<li>`s (not just badges) matching the resume competency groups. Close with a CTA back to `index.html#skills`.
- [ ] **Step 2: Verify all skills/links render**

Open `skills.html`. Assert: nav "Skills" highlighted; EN default; FR toggle works; all 4–5 category cards populated; nav links navigate correctly; page is responsive (hamburger on mobile).
- [ ] **Step 3: Commit**

```bash
git add skills.html && git commit -m "feat: skills page with full tool stack"
```

---

### Task 8: Projects page (full grid incl. alternates)

**Files:**
- Create: `projects.html`

- [ ] **Step 1: Write projects page**

Shell as before, nav `projects.html` `.active`. Section: page title "Projects / Projets". Featured 6 as cards (reuse exact markup from Task 5, but with slightly more description). Then a second grid **"More experiments / Autres projets"** listing the remaining public repos with tech badges + GitHub links: `Attack-Detection-in-VANets`, `Automatic-Image-Captioning`, `Energy Prediction Chatbot`, `Proximal Policy Optimization`, `Rennes Data Challenge 2023`. Each gets a short EN/FR description.
- [ ] **Step 2: Verify grid and links**

Open `projects.html`. Assert: 6 featured + 5 alternates; every card links to its GitHub repo (verify the 6 primary repos point to correct specific URLs — especially `cerebras_knowledge_base`, `voice-cloning`, `website-monitoring-agent`, `video-summarizer`, `multilingual-text-2-sql`; PPD2 has no public repo, link to profile). FR toggle works.
- [ ] **Step 3: Commit**

```bash
git add projects.html && git commit -m "feat: projects page with full grid"
```

---

### Task 9: About page

**Files:**
- Create: `about.html`

- [ ] **Step 1: Write about page**

Shell; nav `about.html` `.active`. Content (EN/FR): a headline, the >300-word professional narrative from the resume (condensed), the "objective" quote, languages, and distinctive strengths (evaluation, sovereignty/security, agentic architecture). Include contact email/links at the bottom and a CTA back home.
- [ ] **Step 2: Verify page**

Open `about.html`. Assert: full narrative bilingual; the summary quote present; links to contact; nav highlights About.
- [ ] **Step 3: Commit**

```bash
git add about.html && git commit -m "feat: about page"
```

---

### Task 10: Experience page

**Files:**
- Create: `experience.html`

- [ ] **Step 1: Write experience page**

Shell; nav none active (not in nav) or `index.html` — use no active link. Content (EN/FR) as a vertical timeline (reuse `.card` + a `.timeline-marker` line): DiGreen Advisory (04/2025–now), Fiverr (06/2025–now), Sogeti/Capgemini (11/2023–11/2024), OUIcoding (06/2023–09/2023). Each with 3–5 bullets and impact metrics from the resume. Add a CTA to `contact.html`.
- [ ] **Step 2: Verify page**

Open `experience.html`. Assert: 4 roles in reverse-chronological order with dates, companies, bullets; bilingual; responsive.
- [ ] **Step 3: Commit**

```bash
git add experience.html && git commit -m "feat: experience page"
```

---

### Task 11: Education & Contact pages

**Files:**
- Create: `education.html`
- Create: `contact.html`

- [ ] **Step 1: Write education page**

Shell; nav none active. Content (EN/FR): CY Tech degree (2021–2024) with relevant courses; Lycée Ibn Al Ghazi preparatory classes (2019–2021); certifications (TOEIC 955, Deep Learning Specialization, Neural Networks with PyTorch IBM).
- [ ] **Step 2: Write contact page**

Shell; nav `contact.html` `.active`. Content (EN/FR): heading "Let's work together / Travaillons ensemble". Grid of contact cards: Email (mailto), GitHub, LinkedIn, Location (Île-de-France, FR). Add a short availability note + language note (FR/EN/ES/DE). No form (per spec — direct links).
- [ ] **Step 3: Verify both pages**

Open `education.html` and `contact.html`. Assert: correct nav active state, bilingual, all links work, responsive.
- [ ] **Step 4: Commit**

```bash
git add education.html contact.html && git commit -m "feat: education and contact pages"
```

---

### Task 12: Blog system — template, index, and scaffold script (TDD)

**Files:**
- Create: `blog/_template.html`
- Create: `blog/index.html`
- Create: `assets/new-post.js`
- Test: `assets/new-post.test.js`

**Context:** `new-post.js` has pure, unit-testable functions: `slugify(title)` and `renderIndex(posts, baseName)`. Use Node's built-in test runner (`node --test`), zero dependencies.

- [ ] **Step 1: Write the failing tests**

Create `assets/new-post.test.js`:

```js
const test = require('node:test');
const assert = require('node:assert');
const { slugify, renderIndex } = require('./new-post.js');

test('slugify lowercases and kebab-cases', () => {
  assert.strictEqual(slugify('My Awesome Post!'), 'my-awesome-post');
  assert.strictEqual(slugify('LangGraph & RAG: A Deep Dive'), 'langgraph-rag-a-deep-dive');
  assert.strictEqual(slugify('  spaced   Title  '), 'spaced-title');
});

test('renderIndex emits items sorted newest-first with expected structure', () => {
  const posts = [
    { slug: 'a', title: 'Alpha', date: '2026-01-10', lang: 'en', tags: ['RAG'] },
    { slug: 'b', title: 'Beta', date: '2026-05-01', lang: 'fr', tags: ['Agents', 'MCP'] },
  ];
  const html = renderIndex(posts, 'blog/');
  assert.ok(html.includes('Beta'));
  assert.ok(html.indexOf('Beta') < html.indexOf('Alpha'), 'should be sorted newest first');
  assert.ok(html.includes('Agents'));
  assert.ok(html.includes('class="post-card"'));
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd assets && node --test new-post.test.js`
Expected: FAIL — `Cannot find module './new-post.js'`.

- [ ] **Step 3: Implement `new-post.js`**

Create `assets/new-post.js`:

```js
#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function slugify(title) {
  const s = title.toLowerCase()
    .replace(/['’]/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return s;
}

function renderIndex(posts, prefix) {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  return sorted.map(p => {
    const tags = (p.tags || []).map(t => `<span class="tech">${t}</span>`).join('');
    const langBadge = p.lang === 'fr' ? '<span class="badge">FR</span>' : '<span class="badge">EN</span>';
    return `<article class="card post-card"><div>${langBadge}</div><h3><a href="${prefix}${p.slug}.html">${p.title}</a></h3><p class="post-date">${p.date}</p><p>${tags}</p></article>`;
  }).join('\n');
}

function collectPosts(dir) {
  const prefix = path.basename(dir) + '/';
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.html') && f !== 'index.html' && f !== '_template.html')
    .map(f => {
      const html = fs.readFileSync(path.join(dir, f), 'utf8');
      const get = (re) => (html.match(re) || [])[1] || '';
      return {
        slug: f.replace(/\.html$/, ''),
        title: get(/<title>(.*?)<\/title>/),
        date: get(/<meta name="published" content="([\d-]+)">/),
        lang: get(/<meta name="lang" content="([a-z]{2})">/),
        tags: (get(/<meta name="tags" content="([^"]*)">/) || '').split(',').map(t => t.trim()).filter(Boolean),
      };
    });
}

function writeIndex(dir, posts) {
  const templateDir = path.join(__dirname, '..');
  const shell = fs.readFileSync(path.join(templateDir, 'blog', '_template.html'), 'utf8');
  const body = renderIndex(posts, path.basename(dir) + '/');
  const indexHtml = shell.replace('<!-- BLOG_LIST -->', body).replace('<!-- PAGE_TITLE -->', 'Posts');
  fs.writeFileSync(path.join(dir, 'index.html'), indexHtml);
}

function main(Strings) {
  const title = Strings.join(' ').trim();
  const lang = (process.argv.includes('--fr') || process.argv.includes('--en')) ? (process.argv.find(a => a.endsWith('-fr')) ? 'fr' : 'en') : 'en';
  const dir = path.join(__dirname, '..', 'blog');
  if (title) {
    const slug = slugify(title);
    const date = new Date().toISOString().slice(0, 10);
    const tpl = fs.readFileSync(path.join(__dirname, '..', 'blog', '_template.html'), 'utf8');
    const post = tpl
      .replace(/<!-- PAGE_TITLE -->/g, title)
      .replace('<!-- TITLE -->', title)
      .replace('<!-- PUBLISHED -->', date)
      .replace('<!-- LANG -->', lang)
      .replace('<!-- BODY -->', '<p>Write your post here.</p>')
      .replace(/<!-- PAGE -->/g, slug);
    fs.writeFileSync(path.join(dir, `${date}-${slug}.html`), post);
  }
  const posts = collectPosts(dir);
  writeIndex(dir, posts);
  console.log(`Index regenerated: ${posts.length} posts`);
}

module.exports = { slugify, renderIndex };
if (require.main === module) main(process.argv.slice(2));
```

- [ ] **Step 4: Create the post template `_template.html`**

`blog/_template.html`: standard shell (fonts, `blog/style.css` no— reuse `../assets/styles.css`), nav (Blog `.active`), and:

```html
<main class="container podpage" style="max-width:760px;padding:4rem 1.5rem">
  <p class="post-date mono"><!-- PUBLISHED --> · <span class="badge"><!-- LANG --></span></p>
  <h1><!-- TITLE --></h1>
  <!-- BODY -->
</main>
```

Head includes the meta tags `new-post.js` parses: `<meta name="published" content="<!-- PUBLISHED -->">`, `<meta name="lang" content="<!-- LANG -->">`, `<meta name="tags" content=""><!-- TAGS -->`, and `<title><!-- TITLE --></title>`. **Important:** create this AFTER `new-post.js` **and** include the base literal `<!-- BLOG_LIST -->` marker so `writeIndex` works.

- [ ] **Step 5: Run tests to verify they pass**

Run: `cd assets && node --test new-post.test.js`
Expected: PASS (2 tests). Fix any failure.
- [ ] **Step 6: Generate a seed post + index**

Run: `cd assets && node new-post.js "Welcome" --en`
Expected: creates `blog/2026-08-16-welcome.html` and regenerates `blog/index.html`. Manually confirm `blog/index.html` shows the Welcome card.
- [ ] **Step 7: Document the blog workflow in a short README**

Create `blog/README.md` explaining: `node ../assets/new-post.js "Title" --en|--fr` to scaffold, edit the generated file, commit + push to publish. (No need to re-run for content edits — only when adding files or changing metadata.)
- [ ] **Step 8: Commit**

```bash
git add assets/new-post.js assets/new-post.test.js blog/_template.html blog/index.html blog/2026-08-16-welcome.html blog/README.md && git commit -m "feat: blog system with scaffold script (TDD)"
```

---

### Task 13: Write a real seed blog post (case study)

**Files:**
- Modify: `blog/2026-08-16-knownbase-a-rag-story.html` (rename/augment the welcome seed into a real post)

**Context:** Give the blog one genuinely useful article so the section isn't empty. Content: a case study on the **Knowbase** project (from Task 5) — why a from-scratch RAG KB was built, hybrid retrieval + LLM reranker (MRR 0.90), and the MCP/web/CLI front ends. Write in **English**. Use real numbers from `cerebras_knowledge_base` README.

- [ ] **Step 1: Delete the welcome seed and write the real post**

Remove `blog/2026-08-16-welcome.html`; create `blog/2026-08-16-knownbase-a-rag-story.html` following `_template.html`, with meta `published=2026-08-16`, `lang=en`, `tags=RAG,MCP,LLM`. Body: intro → problem → solution (hybrid + rerank) → results table (recall@k / MRR) → front ends → lessons.
- [ ] **Step 2: Regenerate the index**

Run: `cd assets && node new-post.js` (no args) — regenerates `blog/index.html` from existing files.
- [ ] **Step 3: Verify the post + index**

Open `blog/index.html` and the new post in a browser. Assert: post renders centered, mono date/badge, headings/table styled; index lists exactly this one post sorted correctly.
- [ ] **Step 4: Commit**

```bash
git add blog/ && git commit -m "feat(blog): PPD2/Knowbase case-study post and index"
```

---

### Task 14: Cross-links, SEO, cleanup, and full-site verification

**Files:**
- Modify: all pages (cross-links/meta final pass), delete `assets/_smoke.html`

- [ ] **Step 1: Normalize SEO meta across pages**

Ensure every page has: `<html lang>` correct (en default; blog posts use their `lang`), unique `<title>`, `meta description`, and `meta name="theme-color"`. Blog index title "Blog — fr_trenton02".
- [ ] **Step 2: Verify cross-page navigation from every page**

Walk every page: `index.html, skills.html, projects.html, about.html, experience.html, education.html, contact.html, blog/index.html, blog/<post>.html`. Assert nav works from each, no broken relative links (`assets/`, `blog/`, `../`), hamburger on mobile for each page.
- [ ] **Step 3: Delete smoke test file**

Run: `rm assets/_smoke.html`
- [ ] **Step 4: Full verification checklist**

Run (from repo root): `git status` (clean working tree after commits), then open each page in a browser and confirm: dark theme, EN default, FR toggle persists, smooth scroll, no console errors (check devtools), all anchors/buttons navigate, responsive at 375px & 1440px.
- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "chore: final cross-links, SEO, cleanup"
```

---

## Self-Review

**Spec coverage:** Structure/architecture (Tasks 3,7,12), design system (Task 1), JS/lang model (Task 2), hero (Task 3), skills/toolstack (Tasks 4,7), featured projects + alternates (Tasks 5,8), work history (Task 6,10), formation (Tasks 6,11), about (Task 6,9), contact (Task 6,11), footer (Task 3), blog template/index/scaffold (Task 12), real post (Task 13), SEO/cleanup/verify (Task 14). No spec requirement left without a task.

**Placeholder scan:** No TBD/TODO placeholders; every code step shows full content; commands include expected output; blog note markers (`<!-- PUBLISHED -->` etc.) are literal template tokens used by `new-post.js` and `_template.html`, not TODO placeholders.

**Type consistency:** Function names consistent across tasks: `switchLanguage`, `toggleMobileMenu`, `animateCounters`, `slugify`, `renderIndex`, `collectPosts`, `writeIndex`; CSS classes (`card`, `tech`, `badge`, `fade-in`, `stat-number`, `lang-content`, `lang-btn`) defined in Task 1 and reused consistently. Template markers match between `new-post.js` and `_template.html` (`<!-- BLOG_LIST -->`, `<!-- PAGE_TITLE -->`, `<!-- TITLE -->`, `<!-- PUBLISHED -->`, `<!-- LANG -->`, `<!-- BODY -->`, `<!-- PAGE -->`). `data-en`/`data-fr`/`data-lang` attribute usage consistent.