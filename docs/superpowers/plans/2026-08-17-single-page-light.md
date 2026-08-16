# Single-Page Light Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the multi-page portfolio with a single-page, light-theme, FR-first/EN-toggle portfolio with an interactive terminal hero, scroll reveals, and a horizontal project rail.

**Architecture:** Plain HTML/CSS/JS on GitHub Pages. One `index.html`, one `assets/styles.css`, one `assets/script.js`. Bilingual text is inline via `data-fr`/`data-en` attributes on `.i18n` elements; `switchLanguage()` swaps text and persists to `localStorage('lang')`. No build step, no new deps.

**Tech Stack:** Vanilla HTML5, CSS (custom properties, IntersectionObserver for reveal/scrollspy), vanilla JS. Node is available but only used for the prior blog tooling (which is removed).

---

### Task 1: Clean up old multi-page artifacts

**Files:**
- Delete: `skills.html`, `projects.html`, `about.html`, `experience.html`, `education.html`, `contact.html`
- Delete: `blog/` (entire dir)
- Delete: `assets/new-post.js`, `assets/new-post.test.js`

- [ ] **Step 1: Remove old pages and blog**

```bash
git rm -r skills.html projects.html about.html experience.html education.html contact.html blog assets/new-post.js assets/new-post.test.js
```

- [ ] **Step 2: Verify deletions**

Run: `ls *.html && ls blog 2>&1`
Expected: only `index.html` (and delete `assets/_smoke.html` if it still exists).

- [ ] **Step 3: Commit**

```bash
git commit -m "chore: remove old multi-page structure before single-page build"
```

---

### Task 2: Light design system — `assets/styles.css`

**Files:**
- Create: `assets/styles.css` (overwrites the old dark one)

- [ ] **Step 1: Write the light design system**

Write `assets/styles.css` with this full content:

```css
:root{
  --bg:#f7f7f5; --paper:#ffffff; --line:#e4e4df;
  --ink:#1a1a1a; --muted:#6b6b64;
  --accent:#0f766e; --accent2:#4f46e5; --accent-bg:#eef2ff;
  --term-bg:#111113; --term-line:#8b8b90; --term-cmd:#22d3ee; --term-out:#a78bfa; --term-in:#e5e7eb;
  --radius:14px; --radius-lg:16px;
  --shadow:0 1px 2px rgba(20,20,20,.05);
  --font:Inter,-apple-system,"Segoe UI",system-ui,sans-serif;
  --mono:ui-monospace,"SF Mono",Menlo,Consolas,monospace;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:var(--font);background:var(--bg);color:var(--ink);line-height:1.55;-webkit-font-smoothing:antialiased}
.wrap{max-width:1080px;margin:0 auto;padding:0 24px}
a{color:var(--accent);text-decoration:none}
em{font-style:normal}

/* Nav */
.site-nav{position:sticky;top:0;z-index:50;background:rgba(247,247,245,.9);backdrop-filter:blur(8px);border-bottom:1px solid var(--line)}
.site-nav .in{display:flex;align-items:center;justify-content:space-between;padding:14px 0;max-width:1080px;margin:0 auto;padding-left:24px;padding-right:24px}
.logo{font-family:var(--mono);font-weight:700;font-size:15px;color:var(--ink)}
.nav-links a{color:var(--muted);font-size:14px;margin-left:18px}
.nav-links a:hover{color:var(--ink)}
.nav-links a.active{color:var(--accent)}
.lang{display:inline-flex;gap:4px;border:1px solid var(--line);border-radius:999px;padding:5px 11px;font-size:13px;font-weight:600;margin-left:14px}
.lang button{background:none;border:none;cursor:pointer;color:var(--muted);font:inherit}
.lang button.on{color:var(--accent)}

/* Hero */
.hero{padding:72px 0 56px;border-bottom:1px solid var(--line)}
.term{font-family:var(--mono);background:var(--term-bg);color:var(--term-line);border-radius:14px;padding:22px 24px;font-size:14px;line-height:1.9;max-width:760px;box-shadow:var(--shadow)}
.term .p{color:var(--term-cmd)}.term .c{color:var(--term-in)}.term .m{color:var(--term-out)}
.term .caret{display:inline-block;width:9px;height:15px;background:var(--term-cmd);vertical-align:middle;animation:blink 1s steps(1) infinite}
@keyframes blink{50%{opacity:0}}
.h-name{margin-top:34px;font-size:clamp(2.2rem,5vw,3.4rem);font-weight:700;letter-spacing:-.02em;line-height:1.05}
.h-name em{color:var(--accent)}
.h-sub{margin-top:14px;color:var(--muted);font-size:1.08rem;max-width:560px}
.btn{display:inline-flex;margin-top:26px;background:var(--ink);color:#fff;font-weight:600;font-size:15px;padding:13px 22px;border-radius:11px}
.btn:hover{transform:translateY(-1px)}
.btn{transition:transform .15s ease}

/* Sections */
.sec{padding:64px 0;border-bottom:1px solid var(--line)}
.k{display:flex;align-items:center;gap:12px;font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--accent);margin-bottom:22px}
.k::after{content:"";height:1px;background:var(--line);flex:1}
h2{font-size:clamp(1.5rem,3vw,2rem);font-weight:700;letter-spacing:-.01em;margin-bottom:8px}

/* Cards grid */
.cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px}
.card{background:var(--paper);border:1px solid var(--line);border-radius:var(--radius);padding:20px;transition:transform .15s ease,box-shadow .15s ease}
.card:hover{transform:translateY(-2px);box-shadow:0 4px 14px rgba(20,20,20,.06)}
.card h3{font-size:1.02rem;font-weight:700;margin-bottom:6px}
.card p{color:var(--muted);font-size:14px}
.mini{margin-top:10px;display:flex;flex-wrap:wrap;gap:5px}
.mini span{font-family:var(--mono);font-size:11px;border:1px solid var(--line);border-radius:6px;padding:2px 7px;color:var(--muted)}
.card.research{border-color:#c7d2fe;background:linear-gradient(180deg,#fff,var(--accent-bg))}
.card.research h3{color:var(--accent2)}

/* Toolbox */
.toolbox{margin-top:34px}
.grp{margin-bottom:18px}
.grp .lab{font-size:13px;font-weight:700;margin-bottom:8px}
.pill{display:inline-flex;background:#fff;border:1px solid var(--line);border-radius:999px;padding:6px 13px;font-size:13px;margin:0 6px 6px 0;color:#3a3a36}

/* Projects rail */
.railh{display:flex;align-items:center;justify-content:space-between;margin-top:8px}
.arrows{display:flex;gap:8px}
.arrow{border:1px solid var(--line);background:#fff;border-radius:10px;width:38px;height:38px;display:flex;align-items:center;justify-content:center;font-size:18px;cursor:pointer}
.arrow:hover{background:var(--paper)}
.rail{display:flex;gap:14px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding:6px 4px 16px}
.rail::-webkit-scrollbar{display:none}
.pcard{flex:0 0 330px;scroll-snap-align:start;background:var(--paper);border:1px solid var(--line);border-radius:var(--radius-lg);padding:22px;display:flex;flex-direction:column;transition:transform .15s ease}
.pcard:hover{transform:translateY(-2px)}
.pcard h3{font-size:1.15rem;font-weight:700}
.pcard .role{color:var(--accent);font-size:12px;margin:2px 0 12px}
.pcard blockquote{color:var(--muted);font-style:italic;font-size:14px;border-left:2px solid var(--line);padding-left:12px;flex:1}
.pcard .tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:14px}
.pcard .tags span{font-family:var(--mono);font-size:11px;border:1px solid var(--line);border-radius:6px;padding:3px 8px;color:var(--muted)}
.pcard .lnk{margin-top:12px;color:var(--accent);font-weight:600;font-size:13px}
.rail-hint{color:var(--muted);font-size:14px}

/* Parcours */
.twocol{display:grid;grid-template-columns:1fr 1fr;gap:40px}
@media(max-width:820px){.twocol{grid-template-columns:1fr}}
.col h3{font-size:1.05rem;font-weight:700;margin-bottom:18px}
.tli{position:relative;margin-bottom:22px;padding-left:18px;border-left:2px solid var(--line)}
.tli b{font-weight:700}
.tli .d{color:var(--accent);font-size:13px;display:block;margin:2px 0 6px}
.tli p{color:var(--muted);font-size:14px}

/* Humans */
.human .cards .card{text-align:center}

/* Contact */
.contact{display:grid;grid-template-columns:1fr 1fr;gap:16px;align-items:center}
@media(max-width:820px){.contact{grid-template-columns:1fr}}
.contact .big{font-size:clamp(1.6rem,3.4vw,2.4rem);font-weight:700;letter-spacing:-.01em;line-height:1.2}
.contact p{color:var(--muted);margin-top:10px}
.cbtns{display:flex;flex-wrap:wrap;gap:10px}
.cbtn{border:1px solid var(--line);background:#fff;border-radius:12px;padding:14px 18px;color:var(--ink);font-weight:600;font-size:14px;display:inline-flex;gap:8px;align-items:center}
.cbtn:hover{box-shadow:var(--shadow)}
.cbtn{transition:box-shadow .15s ease}

/* Footer */
.footer{max-width:1080px;margin:0 auto;padding:28px 24px;color:var(--muted);font-size:13px;display:flex;justify-content:space-between}
.footlink{color:var(--muted)}

/* Reveal */
[data-reveal]{opacity:0;transform:translateY(14px);transition:opacity .5s ease var(--d,0s),transform .5s ease var(--d,0s)}
[data-reveal].visible{opacity:1;transform:none}
@media(prefers-reduced-motion:reduce){
  *{scroll-behavior:auto!important}
  [data-reveal]{opacity:1;transform:none}
  .term .caret{animation:none}
}
```

- [ ] **Step 2: Verify**

Run: `wc -l assets/styles.css`
Expected: non-empty file (> 200 lines).

- [ ] **Step 3: Commit**

```bash
git add assets/styles.css && git commit -m "feat(style): light single-page design system"
```

---

### Task 3: The page — `index.html`

**Files:**
- Create: `index.html` (overwrites old)

- [ ] **Step 1: Write the page**

Write `index.html`. It has one `<html lang="fr">`, links `assets/styles.css` + `assets/script.js`, and uses `.i18n` elements with `data-fr` and `data-en` (French text is the visible default). Full content:

```html
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Farid GNANKAMBARY — AI Engineer (fr_trenton02)</title>
<meta name="description" content="Portfolio de Farid GNANKAMBARY — AI Engineer, racines Data Science. Agents, RAG, évaluation LLM, ingénierie d'inférence. FR/EN." />
<meta name="theme-color" content="#f7f7f5" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="assets/styles.css" />
</head>
<body>

<nav class="site-nav" aria-label="Navigation">
  <div class="in">
    <span class="logo">fr_trenton02</span>
    <div>
      <span class="nav-links">
        <a href="#what"><span class="i18n" data-fr="Ce que je fais" data-en="What I do">Ce que je fais</span></a>
        <a href="#projects"><span class="i18n" data-fr="Projets" data-en="Projects">Projets</span></a>
        <a href="#parcours"><span class="i18n" data-fr="Parcours" data-en="Journey">Parcours</span></a>
        <a href="#contact"><span class="i18n" data-fr="Contact" data-en="Contact">Contact</span></a>
      </span>
      <span class="lang" role="group" aria-label="Language">
        <button data-lang="fr" class="on">FR</button>
        <span>/</span>
        <button data-lang="en">EN</button>
      </span>
    </div>
  </div>
</nav>

<header class="hero">
  <div class="wrap">
    <div class="term" aria-label="Terminal">
      <div><span class="p">$</span> <span class="c">whoami</span></div>
      <div><span class="p">→</span> <span class="m">AI Engineer</span> · <span class="c">racines Data Science</span> · Paris</div>
      <div><span class="p">$</span> <span class="c">farid --focus</span></div>
      <div><span class="p">→</span> <span class="c">agents · RAG · évaluation LLM · inference (CUDA/vLLM en cours)</span><span class="caret" aria-hidden="true"></span>
    </div>
    <h1 class="h-name"><span class="i18n" data-fr="Salut, moi c'est " data-en="Hi, I'm ">Salut, moi c'est </span><em>Farid.</em></h1>
    <p class="h-sub i18n" data-fr="Je conçois des systèmes d'IA fiables et souverains, de l'idée au déploiement, avec une base Data Science et une obsession pour les preuves." data-en="I design reliable, sovereign AI systems from idea to deployment, with a Data Science foundation and an obsession with evidence.">Je conçois des systèmes d'IA fiables et souverains, de l'idée au déploiement, avec une base Data Science et une obsession pour les preuves.</p>
    <a class="btn i18n" href="#projects" data-fr="Voir mes projets →" data-en="See my projects →">Voir mes projets →</a>
  </div>
</header>

<section class="sec" id="what">
  <div class="wrap">
    <div class="k i18n" data-fr="Ce que je fais" data-en="What I do">Ce que je fais</div>
    <h2 class="i18n" data-fr="Rigoureux, mesurable, en production." data-en="Rigorous, measurable, in production.">Rigoureux, mesurable, en production.</h2>
    <div class="cards">
      <div class="card" data-reveal style="--d:.0s"><h3 class="i18n" data-fr="RAG &amp; retrieval" data-en="RAG &amp; retrieval">RAG &amp; retrieval</h3><p class="i18n" data-fr="Bases de connaissances from scratch, hybrid, rerankeurs LLM." data-en="Knowledge bases built from scratch, hybrid retrieval, LLM rerankers.">Bases de connaissances from scratch, hybrid, rerankeurs LLM.</p><div class="mini"><span>pgvector</span><span>FAISS</span><span>MCP</span></div></div>
      <div class="card" data-reveal style="--d:.05s"><h3 class="i18n" data-fr="Agents &amp; MCP" data-en="Agents &amp; MCP">Agents &amp; MCP</h3><p class="i18n" data-fr="Orchestration multi-agents, supervisor et sous-graphes." data-en="Multi-agent orchestration, a supervisor with sub-graphs.">Orchestration multi-agents, supervisor et sous-graphes.</p><div class="mini"><span>LangGraph</span><span>LangChain</span></div></div>
      <div class="card" data-reveal style="--d:.1s"><h3 class="i18n" data-fr="Évaluation &amp; LLMOps" data-en="Evaluation &amp; LLMOps">Évaluation &amp; LLMOps</h3><p class="i18n" data-fr="LLM-as-judge, RAGAS, détection de dérive, guardrails." data-en="LLM-as-judge, RAGAS, drift detection, guardrails.">LLM-as-judge, RAGAS, détection de dérive, guardrails.</p><div class="mini"><span>LangFuse</span><span>MLflow</span><span>RAGAS</span></div></div>
      <div class="card" data-reveal style="--d:.15s"><h3 class="i18n" data-fr="ML Engineering" data-en="ML Engineering">ML Engineering</h3><p class="i18n" data-fr="Inférence LLM locale et serveur, et j'apprends CUDA ainsi que vLLM." data-en="Local and server LLM inference; I'm learning CUDA and vLLM.">Inférence LLM locale et serveur, et j'apprends CUDA ainsi que vLLM.</p><div class="mini"><span>Ollama</span><span>CUDA</span><span>vLLM</span></div></div>
      <div class="card research" data-reveal style="--d:.2s"><h3 class="i18n" data-fr="Mes intérêts de recherche" data-en="My research interests">Mes intérêts de recherche</h3><p class="i18n" data-fr="AI for Robotics, Multimodal AI, VLM/VLAs, low-resource languages." data-en="AI for Robotics, Multimodal AI, VLM/VLAs, low-resource languages.">AI for Robotics, Multimodal AI, VLM/VLAs, low-resource languages.</p><div class="mini"><span>Vision</span><span>VLA</span><span>NLP</span></div></div>
    </div>

    <div class="toolbox">
      <div class="k i18n" data-fr="Toolbox" data-en="Toolbox">Toolbox</div>
      <div class="grp"><div class="lab i18n" data-fr="LLM &amp; Agents" data-en="LLM &amp; Agents">LLM &amp; Agents</div><span class="pill">LangGraph</span><span class="pill">LangChain</span><span class="pill">MCP</span><span class="pill">Ollama</span><span class="pill">vLLM</span><span class="pill">FAISS</span></div>
      <div class="grp"><div class="lab i18n" data-fr="Évaluation &amp; LLMOps" data-en="Evaluation &amp; LLMOps">Évaluation &amp; LLMOps</div><span class="pill">LangFuse</span><span class="pill">LLM-as-Judge</span><span class="pill">RAGAS</span><span class="pill">MLflow</span><span class="pill">Monitoring</span></div>
      <div class="grp"><div class="lab i18n" data-fr="Cloud &amp; Infra" data-en="Cloud &amp; Infra">Cloud &amp; Infra</div><span class="pill">Docker</span><span class="pill">Kubernetes</span><span class="pill">GCP</span><span class="pill">AWS</span><span class="pill">FastAPI</span><span class="pill">CI/CD</span></div>
      <div class="grp"><div class="lab i18n" data-fr="Data &amp; Stockage" data-en="Data &amp; Storage">Data &amp; Stockage</div><span class="pill">PostgreSQL</span><span class="pill">BigQuery</span><span class="pill">Weaviate</span><span class="pill">pgvector</span><span class="pill">Redis</span></div>
    </div>
  </div>
</section>

<section class="sec" id="projects">
  <div class="wrap">
    <div class="k i18n" data-fr="Projets" data-en="Projects">Projets</div>
    <h2 class="i18n" data-fr="Mes derniers projets." data-en="My latest projects.">Mes derniers projets.</h2>
    <div class="railh"><span class="rail-hint i18n" data-fr="← faites défiler →" data-en="← scroll →">← faites défiler →</span><div class="arrows"><button class="arrow" data-arrow="-1" aria-label="Précédent">‹</button><button class="arrow" data-arrow="1" aria-label="Suivant">›</button></div></div>
    <div class="rail" id="rail">
      <div class="pcard"><h3>Knowbase</h3><div class="role i18n" data-fr="RAG from scratch" data-en="RAG from scratch">RAG from scratch</div><blockquote class="i18n" data-fr="« Base de connaissances RAG sur le corpus FastAPI, retrieval hybride avec rerankeur, MRR 0.90. »" data-en="« A from-scratch RAG knowledge base on the FastAPI corpus, hybrid retrieval with an LLM reranker, MRR 0.90. »">« Base de connaissances RAG sur le corpus FastAPI, retrieval hybride avec rerankeur, MRR 0.90. »</blockquote><div class="tags"><span>Python</span><span>pgvector</span><span>MCP</span><span>RAG</span></div><a class="lnk i18n" href="https://github.com/faridgnank02/cerebras_knowledge_base" target="_blank" rel="noopener" data-fr="GitHub →" data-en="GitHub →">GitHub →</a></div>
      <div class="pcard"><h3>Voice Clone Consent Gate</h3><div class="role i18n" data-fr="Voice AI éthique" data-en="Ethical voice AI">Voice AI éthique</div><blockquote class="i18n" data-fr="« Consentement éthique pour le clonage vocal via MCP, privacy-first et multilingue. »" data-en="« An ethical consent gate for voice cloning via MCP, privacy-first and multilingual. »">« Consentement éthique pour le clonage vocal via MCP, privacy-first et multilingue. »</blockquote><div class="tags"><span>XTTS v2</span><span>Whisper</span><span>Gradio</span></div><a class="lnk" href="https://github.com/faridgnank02/voice-cloning" target="_blank" rel="noopener">GitHub →</a></div>
      <div class="pcard"><h3>PPD2 AI Platform</h3><div class="role i18n" data-fr="RAG agentique" data-en="Agentic RAG">RAG agentique</div><blockquote class="i18n" data-fr="« Analyse de projets internationaux de développement, pipeline AdaptiveRouter. »" data-en="« Analysis of international development projects, AdaptiveRouter pipeline. »">« Analyse de projets internationaux de développement, pipeline AdaptiveRouter. »</blockquote><div class="tags"><span>FastAPI</span><span>FAISS</span><span>GPT-4o</span></div><a class="lnk" href="https://github.com/faridgnank02" target="_blank" rel="noopener">GitHub →</a></div>
      <div class="pcard"><h3>Monitor Agent</h3><div class="role i18n" data-fr="Agents" data-en="Agents">Agents</div><blockquote class="i18n" data-fr="« Télémétrie multi-agents et triage d'incidents, human-in-the-loop. »" data-en="« Multi-agent telemetry and incident triage, human-in-the-loop. »">« Télémétrie multi-agents et triage d'incidents, human-in-the-loop. »</blockquote><div class="tags"><span>LangGraph</span><span>MCP</span><span>FastAPI</span></div><a class="lnk" href="https://github.com/faridgnank02/website-monitoring-agent" target="_blank" rel="noopener">GitHub →</a></div>
      <div class="pcard"><h3>Video Intelligence</h3><div class="role i18n" data-fr="Video AI" data-en="Video AI">Video AI</div><blockquote class="i18n" data-fr="« Pipelines GCP Video et LLM en rapports structurés, routage optimisé coût. »" data-en="« GCP Video and LLM pipelines into structured reports, cost-aware routing. »">« Pipelines GCP Video et LLM en rapports structurés, routage optimisé coût. »</blockquote><div class="tags"><span>yt-dlp</span><span>Whisper</span><span>Ollama</span></div><a class="lnk" href="https://github.com/faridgnank02/video-summarizer" target="_blank" rel="noopener">GitHub →</a></div>
      <div class="pcard"><h3>Text-to-SQL multilingue</h3><div class="role i18n" data-fr="NL vers SQL" data-en="NL to SQL">NL vers SQL</div><blockquote class="i18n" data-fr="« Requêtes naturelles en plusieurs langues via LangGraph, anti-injection, suivi MLflow. »" data-en="« Natural-language queries in several languages via LangGraph, anti-injection, MLflow tracking. »">« Requêtes naturelles en plusieurs langues via LangGraph, anti-injection, suivi MLflow. »</blockquote><div class="tags"><span>LangGraph</span><span>RAG</span><span>MLflow</span></div><a class="lnk" href="https://github.com/faridgnank02/multilingual-text-2-sql" target="_blank" rel="noopener">GitHub →</a></div>
    </div>
  </div>
</section>

<section class="sec" id="parcours">
  <div class="wrap">
    <div class="k i18n" data-fr="Parcours" data-en="Journey">Parcours</div>
    <h2 class="i18n" data-fr="De la Data à l'ingénierie d'IA." data-en="From data to AI engineering.">De la Data à l'ingénierie d'IA.</h2>
    <div class="twocol">
      <div class="col"><h3 class="i18n" data-fr="Expérience" data-en="Experience">Expérience</h3>
        <div class="tli" data-reveal><b class="i18n" data-fr="AI Engineer · DiGreen Advisory" data-en="AI Engineer · DiGreen Advisory">AI Engineer · DiGreen Advisory</b><span class="d i18n" data-fr="2025 à aujourd'hui" data-en="2025 to today">2025 à aujourd'hui</span><p class="i18n" data-fr="Solutions GenAI de production, agents LangGraph, souveraineté et évaluation continue." data-en="Production GenAI solutions, LangGraph agents, sovereignty and continuous evaluation.">Solutions GenAI de production, agents LangGraph, souveraineté et évaluation continue.</p></div>
        <div class="tli" data-reveal style="--d:.05s"><b class="i18n" data-fr="Freelance AI Developer" data-en="Freelance AI Developer">Freelance AI Developer</b><span class="d i18n" data-fr="2025 à aujourd'hui" data-en="2025 to today">2025 à aujourd'hui</span><p class="i18n" data-fr="Agents et RAG bout en bout pour des clients, ateliers FR et EN." data-en="End-to-end agents and RAG for clients, workshops in FR and EN.">Agents et RAG bout en bout pour des clients, ateliers FR et EN.</p></div>
        <div class="tli" data-reveal style="--d:.1s"><b class="i18n" data-fr="Data Scientist · Sogeti (Capgemini)" data-en="Data Scientist · Sogeti (Capgemini)">Data Scientist · Sogeti (Capgemini)</b><span class="d i18n" data-fr="2023 à 2024" data-en="2023 to 2024">2023 à 2024</span><p class="i18n" data-fr="Recommandation hybride Content-Based et RAG, mise en place d'une suite d'évaluation, pipeline MLOps." data-en="Hybrid Content-Based and RAG recommendation, an evaluation suite, MLOps pipeline.">Recommandation hybride Content-Based et RAG, mise en place d'une suite d'évaluation, pipeline MLOps.</p></div>
      </div>
      <div class="col"><h3 class="i18n" data-fr="Formation" data-en="Education">Formation</h3>
        <div class="tli" data-reveal><b class="i18n" data-fr="Diplôme d'ingénieur · CY Tech (EISTI)" data-en="Engineering degree · CY Tech (EISTI)">Diplôme d'ingénieur · CY Tech (EISTI)</b><span class="d i18n" data-fr="Mathématiques appliquées, spécialité IA" data-en="Applied Mathematics, AI track">Mathématiques appliquées, spécialité IA</span><p class="i18n" data-fr="2021 à 2024." data-en="2021 to 2024.">2021 à 2024.</p></div>
        <div class="tli" data-reveal style="--d:.05s"><b class="i18n" data-fr="Certifications" data-en="Certifications">Certifications</b><p class="i18n" data-fr="TOEIC, Deep Learning Specialization, PyTorch." data-en="TOEIC, Deep Learning Specialization, PyTorch.">TOEIC, Deep Learning Specialization, PyTorch.</p></div>
      </div>
    </div>
  </div>
</section>

<section class="sec human">
  <div class="wrap">
    <div class="k i18n" data-fr="Au-delà du code" data-en="Beyond code">Au-delà du code</div>
    <h2 class="i18n" data-fr="Le reste de qui je suis." data-en="The rest of who I am.">Le reste de qui je suis.</h2>
    <div class="cards">
      <div class="card" data-reveal><h3 class="i18n" data-fr="Anime" data-en="Anime">Anime</h3><p class="i18n" data-fr="Des récits qui pensent le monde." data-en="Stories that think about the world.">Des récits qui pensent le monde.</p></div>
      <div class="card" data-reveal style="--d:.05s"><h3 class="i18n" data-fr="Philosophie" data-en="Philosophy">Philosophie</h3><p class="i18n" data-fr="Questions avant réponses." data-en="Questions before answers.">Questions avant réponses.</p></div>
      <div class="card" data-reveal style="--d:.1s"><h3 class="i18n" data-fr="Littérature" data-en="Literature">Littérature</h3><p class="i18n" data-fr="La langue comme matière." data-en="Language as material.">La langue comme matière.</p></div>
      <div class="card" data-reveal style="--d:.15s"><h3 class="i18n" data-fr="Maths" data-en="Maths">Maths</h3><p class="i18n" data-fr="Le langage des preuves." data-en="The language of proofs.">Le langage des preuves.</p></div>
    </div>
  </div>
</section>

<section class="sec" id="contact">
  <div class="wrap">
    <div class="k i18n" data-fr="Comment me contacter" data-en="How to contact me">Comment me contacter</div>
    <div class="contact">
      <div>
        <div class="big i18n" data-fr="Envie de travailler sur un projet d'IA ?" data-en="Want to work on an AI project?">Envie de travailler sur un projet d'IA ?</div>
        <p class="i18n" data-fr="Disponible pour des projets et des collaborations, et toujours content d'être contacté." data-en="Available for projects and collaborations, always happy to be reached out.">Disponible pour des projets et des collaborations, et toujours content d'être contacté.</p>
      </div>
      <div class="cbtns">
        <a class="cbtn" href="mailto:mohamedgnank@gmail.com">Email</a>
        <a class="cbtn" href="https://github.com/faridgnank02" target="_blank" rel="noopener">GitHub</a>
        <a class="cbtn" href="https://linkedin.com/in/farid-gnankambary-a617821b2/" target="_blank" rel="noopener">LinkedIn</a>
      </div>
    </div>
  </div>
</section>

<footer class="footer"><span>© 2026 Farid GNANKAMBARY · fr_trenton02</span><span><a class="footlink" href="#top">Back to top ↑</a></span></footer>

<script src="assets/script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify structure**

Run: `grep -c 'class="i18n"' index.html`
Expected: non-zero (bilingual elements present). Also `grep -c 'data-fr=' index.html > 0`.

- [ ] **Step 3: Commit**

```bash
git add index.html && git commit -m "feat(page): single-page light portfolio markup"
```

---

### Task 4: Interactivity — `assets/script.js`

**Files:**
- Create: `assets/script.js` (overwrites old)

- [ ] **Step 1: Write the script**

Write `assets/script.js`:

```js
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
```

- [ ] **Step 2: Verify no syntax errors**

Run: `node --check assets/script.js`
Expected: no output, exit 0.

- [ ] **Step 3: Commit**

```bash
git add assets/script.js && git commit -m "feat(js): language toggle, typewriter, reveal, scrollspy, rail"
```

---

### Task 5: Cleanup stray artifacts + final verify

**Files:**
- Delete: `assets/_smoke.html` if present

- [ ] **Step 1: Remove leftover smoke file (if any)**

```bash
rm -f assets/_smoke.html
```

- [ ] **Step 2: Structural verification**

Run these and capture output (from repo root):
```bash
ls *.html                  # expect: index.html
ls assets                  # expect: styles.css, script.js
grep -c 'class="i18n"' index.html   # > 0
grep -c 'href="assets/' index.html  # styles + script referenced
node --check assets/script.js       # no output
echo "styles $(wc -l < assets/styles.css) lines"
```

- [ ] **Step 3: Link integrity check**

```bash
node -e "const fs=require('fs');const h=fs.readFileSync('index.html','utf8');let bad=0;[...h.matchAll(/(href|src)=\"([^\"]+)\"/g)].forEach(m=>{const u=m[2];if(!/^(mailto:|https:|#)/.test(u)&&!fs.existsSync(u)){console.log('MISSING',u);bad++}});console.log(bad?bad+' broken':'all assets present')"
```
Expected: `all assets present`.

- [ ] **Step 4: Browser check (manual)**

Open `index.html` directly in the browser (or `python3 -m http.server`). Confirm: light theme; FR default; clicking EN toggles text + persists after reload; terminal types; cards reveal on scroll; nav highlights current section; rail arrows scroll; responsive at 375px and 1440px; no console errors.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "chore: single-page cleanup and verification"
```

---

## Self-Review

- **Spec coverage:** light theme (T1–2), terminal hero (T2–3), 5 "ce que je fais" cards + research (T3), toolbox below (T3), 6-project rail (T3), two-col parcours latest→oldest + formation right + no dashes/numbers (T3), au-delà du code (T3), "how to contact me" (T3), FR/EN toggle + typewriter + reveal + scrollspy + rail arrows (T4), cleanup of old pages + blog (T1), no chatbot/no fake stats (spec out-of-scope, honored).
- **Placeholder scan:** every task has full file content; no TBD/TODO; each step has real commands + expected output.
- **Type consistency:** `switchLanguage` / `applyLang` / `getStoredLang` defined in T4 and used consistently; `.i18n` and `data-*` attrs in T3 match the JS in T4. `data-arrow="-1"/"1"` parsed with `parseInt` and used as direction. `#rail`/`.pcard` names consistent between CSS, HTML, and JS.