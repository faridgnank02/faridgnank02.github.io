# Engaging Portfolio Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn faridgnank02.github.io into a more dynamic, English-primary portfolio with an animated hero, curated identity-based skills, plain-language projects/experience, and a Markdown-driven blog.

**Architecture:** Enhance the existing static single-page site in place (`index.html`, `assets/styles.css`, `assets/script.js`). Add a client-side Markdown blog (`blog.html`, `post.html`, `assets/blog.js`, `posts/`). No backend, no build step — deploys to GitHub Pages unchanged.

**Tech Stack:** HTML5, CSS3 (custom properties, keyframe animation), vanilla JS (ES5-compatible IIFE, matching existing style), marked.js (CDN) for Markdown rendering.

## Global Constraints

- **Static only.** No backend, no build step. Vanilla JS + one main CSS file. Must deploy to GitHub Pages unchanged.
- **English-primary.** `<html lang="en">`, `STORAGE_KEY` default = `en`, English is the visible `textContent` in every `.i18n` element (French lives in `data-fr`, English in `data-en`).
- **Keep** the existing FR/EN i18n mechanism (`.i18n` + `data-fr`/`data-en`, `.lang button[data-lang]`), the teal `--accent:#0f766e` / indigo `--accent2:#4f46e5` light palette, and the `.wrap` (max-width 1080px) container.
- **All motion respects** `@media (prefers-reduced-motion: reduce)`.
- **No vanity stat counters. No clichés** (no "obsessed with proofs", no "rigorous, measurable"). Real project metrics allowed but secondary.
- **Identity:** "AI Engineer / Data Scientist", growing toward ML Engineering. Both sides visible.
- **Content is from the CVs / latest READMEs — do not invent.** Sources: `Farid_GNANKAMBARY_AI_Engineer_CV.pdf`, `Farid_GNANKAMBARY_CV_ML.pdf`, `Farid_GNANKAMBARY_Portfolio.pdf`, live GitHub READMEs, and local `~/Desktop/x/Agentic Project/production-ai-app/README.md`.
- **Commits:** plain messages, **no `Co-Authored-By: Claude` trailer** (project preference).
- Handle: `fr_trenton02`. Motto accent: `Tatakae` (used as an accent, never labeled "my motto").
- Contact: Email `mohamedgnank@gmail.com`, GitHub `github.com/faridgnank02`, LinkedIn `linkedin.com/in/farid-gnankambary-a617821b2/`.

---

## File Structure

- `index.html` — the single homepage. Sections in order: nav, hero, "What I do", projects, writing, journey, beyond-code, contact, footer.
- `assets/styles.css` — all homepage + shared styles (aurora hero, chips, identity cards, toolbelt, project cards, writing cards, article base tokens).
- `assets/script.js` — homepage behavior: i18n (default EN), rotating typewriter, magnetic CTA, reveal-on-scroll, scrollspy, project rail, homepage "Writing" loader.
- `blog.html` — blog index page (lists all posts from the manifest). Shares `styles.css`.
- `post.html` — single-post reader (`?slug=`); fetches Markdown and renders it. Shares `styles.css`.
- `assets/blog.js` — logic for both `blog.html` (list) and `post.html` (render one post).
- `posts/index.json` — post manifest (array of `{slug, title, date, description, series}`).
- `posts/README.md` — how to add a post.
- `posts/*.md` — post bodies, **added by the user** (not by this plan).

---

## Verification setup (used by every task)

Preview the site with the in-app browser before committing each task:
- Start once: `preview_start` with a static server. Create `.claude/launch.json` with a config named `site` running `python3 -m http.server 8000` on port 8000, url `http://localhost:8000`. (Python http.server serves `posts/*.md` and JSON with correct-enough MIME for `fetch`.)
- Navigate to `http://localhost:8000/index.html`, screenshot, and confirm the described result. For reduced-motion checks, verify the CSS `@media (prefers-reduced-motion: reduce)` block exists and disables the animation (visual toggle is optional).

---

### Task 1: Static preview server config

**Files:**
- Create: `.claude/launch.json`

**Interfaces:**
- Produces: a `preview_start` target named `site` at `http://localhost:8000` serving the repo root.

- [ ] **Step 1: Create the launch config**

Create `.claude/launch.json`:

```json
{
  "version": "0.0.1",
  "configurations": [
    {
      "name": "site",
      "runtimeExecutable": "python3",
      "runtimeArgs": ["-m", "http.server", "8000"],
      "port": 8000,
      "url": "http://localhost:8000"
    }
  ]
}
```

- [ ] **Step 2: Start the preview and verify the current site loads**

Use `preview_start` with `name: "site"`, then `navigate` to `http://localhost:8000/index.html` and screenshot. Expected: the existing site renders (terminal hero, sections).

- [ ] **Step 3: Commit**

```bash
git add .claude/launch.json
git commit -m "chore: add static preview server config"
```

---

### Task 2: English-primary i18n default

Flip the site to English-first without breaking the FR toggle. This touches the language machinery only; section content gets rewritten (already English-first) in later tasks.

**Files:**
- Modify: `index.html:2` (html lang), and the nav `.lang` buttons `index.html:27-29`
- Modify: `assets/script.js` (STORAGE_KEY default)

**Interfaces:**
- Produces: `getStoredLang()` defaults to `'en'`; `.lang button[data-lang="en"]` carries class `on` by default.

- [ ] **Step 1: Set the document language to English**

In `index.html`, change line 2 from `<html lang="fr">` to `<html lang="en">`.

- [ ] **Step 2: Make EN the default active toggle button**

In `index.html`, update the language buttons so EN is marked active by default:

```html
<span class="lang" role="group" aria-label="Language">
  <button data-lang="en" class="on">EN</button>
  <span>/</span>
  <button data-lang="fr">FR</button>
</span>
```

- [ ] **Step 3: Default the stored language to English**

In `assets/script.js`, change the default in `getStoredLang`:

```js
function getStoredLang() {
  try { return localStorage.getItem(STORAGE_KEY) || 'en'; } catch (e) { return 'en'; }
}
```

- [ ] **Step 4: Verify in the browser**

In a fresh session (clear the `lang` localStorage key or use a private context), navigate to `http://localhost:8000/index.html`. Expected: EN button is highlighted; existing `.i18n` nodes show their English `data-en` text after load. Click FR → text switches to French; reload → still FR (persisted). Reset to EN.

- [ ] **Step 5: Commit**

```bash
git add index.html assets/script.js
git commit -m "feat: make the site English-primary by default"
```

---

### Task 3: CSS design tokens for the redesign

Add the shared visual primitives used by later tasks: aurora keyframes, chips, identity cards, curated toolbelt, featured project card, hover glows, gradient name, and article/blog base. Adds only new rules; does not remove existing ones yet (terminal styles are removed in Task 4).

**Files:**
- Modify: `assets/styles.css` (append a "Redesign" block before the `/* Reveal */` section)

**Interfaces:**
- Produces CSS classes consumed later: `.hero-aurora`, `.hero-kicker`, `.tatakae`, `.rotator`, `.chips`, `.chip`, `.idcards`, `.idcard`, `.idcard .tools`, `.toolbelt`, `.toolbelt span`, `.research-line`, `.pcard.featured`, `.plain`, `.tech`, `.writecard`, `.article`.

- [ ] **Step 1: Append the redesign CSS**

Append to `assets/styles.css` (before the `/* Reveal */` comment block):

```css
/* ===== Redesign ===== */

/* Hero (animated, no terminal) */
.hero{position:relative;overflow:hidden}
.hero-aurora{position:absolute;inset:-20% -10% auto -10%;height:120%;z-index:0;pointer-events:none;
  background:
    radial-gradient(40% 55% at 20% 25%, rgba(15,118,110,.28), transparent 60%),
    radial-gradient(38% 50% at 80% 20%, rgba(79,70,229,.24), transparent 60%),
    radial-gradient(45% 55% at 60% 80%, rgba(20,184,166,.18), transparent 60%);
  filter:blur(24px);animation:aurora 18s ease-in-out infinite alternate}
@keyframes aurora{
  0%{transform:translate3d(-3%,-2%,0) scale(1.05)}
  50%{transform:translate3d(3%,2%,0) scale(1.12)}
  100%{transform:translate3d(-2%,3%,0) scale(1.06)}
}
.hero .wrap{position:relative;z-index:1}
.hero-kicker{font-family:var(--mono);font-size:13px;color:var(--muted);letter-spacing:.02em;
  display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.tatakae{display:inline-flex;align-items:center;gap:6px;color:var(--accent);font-weight:700;
  border:1px solid var(--line);border-radius:999px;padding:3px 10px;background:rgba(255,255,255,.6)}
.h-name em{background:linear-gradient(90deg,var(--accent),var(--accent2),var(--accent));
  background-size:200% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;
  animation:shimmer 6s linear infinite}
@keyframes shimmer{to{background-position:200% 0}}
.rotator-wrap{margin-top:12px;font-size:1.15rem;color:var(--ink);font-weight:600;min-height:1.6em}
.rotator{color:var(--accent)}
.rotator .cursor{display:inline-block;width:2px;height:1.05em;background:var(--accent);
  vertical-align:-2px;margin-left:2px;animation:blink 1s steps(1) infinite}

/* Personality chips */
.chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:20px}
.chip{font-size:13px;color:#3a3a36;background:#fff;border:1px solid var(--line);
  border-radius:999px;padding:6px 13px}

/* Identity cards ("What I do") */
.idcards{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px}
.idcard{background:var(--paper);border:1px solid var(--line);border-radius:var(--radius);padding:22px;
  transition:transform .15s ease,box-shadow .15s ease,border-color .15s ease}
.idcard:hover{transform:translateY(-3px);box-shadow:0 6px 18px rgba(20,20,20,.07);border-color:#c7d2fe}
.idcard h3{font-size:1.05rem;font-weight:700;margin-bottom:4px}
.idcard .learn{font-size:12px;color:var(--accent2);font-weight:700;text-transform:uppercase;
  letter-spacing:.06em;margin-bottom:6px}
.idcard p{color:var(--muted);font-size:14px;margin-bottom:12px}
.idcard .tools{display:flex;flex-wrap:wrap;gap:6px}
.idcard .tools span{font-family:var(--mono);font-size:11px;border:1px solid var(--line);
  border-radius:6px;padding:3px 8px;color:#3a3a36}

/* Curated toolbelt + research line */
.toolbelt{margin-top:22px;display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.toolbelt .lab{font-size:13px;font-weight:700;margin-right:4px}
.toolbelt span.t{font-size:13px;background:#fff;border:1px solid var(--line);border-radius:999px;
  padding:5px 12px;color:#3a3a36}
.research-line{margin-top:16px;font-size:14px;color:var(--muted)}
.research-line b{color:var(--ink)}

/* Project cards: plain-language + featured */
.pcard .plain{color:var(--ink);font-size:14px;font-weight:600;margin:2px 0 8px}
.pcard .tech{color:var(--muted);font-size:13px;border-left:2px solid var(--line);padding-left:12px;flex:1}
.pcard{transition:transform .15s ease,box-shadow .15s ease,border-color .15s ease}
.pcard:hover{box-shadow:0 8px 22px rgba(20,20,20,.08);border-color:#c7d2fe}
.pcard.featured{flex-basis:360px;border-color:#c7d2fe;background:linear-gradient(180deg,#fff,#f7f8ff)}
.pcard .links{display:flex;gap:14px;margin-top:12px;flex-wrap:wrap}

/* Writing (homepage) */
.writecards{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px}
.writecard{display:block;background:var(--paper);border:1px solid var(--line);border-radius:var(--radius);
  padding:20px;transition:transform .15s ease,box-shadow .15s ease,border-color .15s ease}
.writecard:hover{transform:translateY(-3px);box-shadow:0 6px 18px rgba(20,20,20,.07);border-color:#c7d2fe}
.writecard .series{font-size:11px;font-family:var(--mono);color:var(--accent2);text-transform:uppercase;
  letter-spacing:.06em}
.writecard h3{font-size:1rem;font-weight:700;margin:6px 0}
.writecard p{color:var(--muted);font-size:13px}
.writecard .date{color:var(--muted);font-size:12px;margin-top:10px;display:block}
.see-all{display:inline-flex;margin-top:16px;color:var(--accent);font-weight:600;font-size:14px}

/* Contact simplified */
.reach{display:flex;flex-wrap:wrap;gap:12px;margin-top:8px}

/* Article / blog reader */
.article{max-width:760px;margin:0 auto;padding:40px 24px 64px}
.article .back{color:var(--accent);font-weight:600;font-size:14px;display:inline-flex;margin-bottom:20px}
.article h1{font-size:clamp(1.7rem,4vw,2.4rem);font-weight:700;letter-spacing:-.01em;line-height:1.15;margin-bottom:8px}
.article .meta{color:var(--muted);font-size:14px;margin-bottom:28px}
.article-body{line-height:1.7}
.article-body h2{font-size:1.4rem;margin:32px 0 10px}
.article-body h3{font-size:1.15rem;margin:24px 0 8px}
.article-body p{margin:0 0 16px}
.article-body a{color:var(--accent);text-decoration:underline}
.article-body ul,.article-body ol{margin:0 0 16px 22px}
.article-body li{margin:4px 0}
.article-body blockquote{border-left:3px solid var(--line);padding-left:14px;color:var(--muted);margin:0 0 16px}
.article-body code{font-family:var(--mono);font-size:.9em;background:#f0f0ec;border-radius:5px;padding:1px 5px}
.article-body pre{background:var(--term-bg);color:#e5e7eb;border-radius:12px;padding:16px 18px;overflow-x:auto;margin:0 0 18px}
.article-body pre code{background:none;padding:0;color:inherit}
.article-body table{border-collapse:collapse;width:100%;margin:0 0 18px;font-size:14px;display:block;overflow-x:auto}
.article-body th,.article-body td{border:1px solid var(--line);padding:7px 10px;text-align:left}
.article-body img{max-width:100%;border-radius:10px}
.blog-list{max-width:760px;margin:0 auto;padding:0 24px}
.loading{color:var(--muted);font-size:14px;padding:20px 0}

@media(prefers-reduced-motion:reduce){
  .hero-aurora{animation:none}
  .h-name em{animation:none}
  .rotator .cursor{animation:none}
}
```

- [ ] **Step 2: Verify the stylesheet still parses**

Navigate to `http://localhost:8000/index.html`, screenshot. Expected: existing site renders unchanged (new classes are unused so far; no visual regression, no console CSS errors).

- [ ] **Step 3: Commit**

```bash
git add assets/styles.css
git commit -m "feat: add redesign CSS tokens (aurora, chips, cards, article)"
```

---

### Task 4: Animated hero (replace terminal)

**Files:**
- Modify: `index.html` (replace the `<header class="hero" id="top">…</header>` block, lines 35-47)
- Modify: `assets/styles.css` (the `.term` rules at lines 38-41 become dead; delete them)
- Modify: `assets/script.js` (remove `typeTerminal`; add `initRotator` + `initMagnetic`)

**Interfaces:**
- Consumes: `.hero-aurora`, `.hero-kicker`, `.tatakae`, `.rotator`, `.chips`/`.chip`, `.h-name em` from Task 3.
- Produces: `initRotator()` (drives `#rotator`), `initMagnetic()` (drives `.btn.magnetic`).

- [ ] **Step 1: Replace the hero markup**

In `index.html`, replace the entire `<header class="hero" id="top">…</header>` block with:

```html
<header class="hero" id="top">
  <div class="hero-aurora" aria-hidden="true"></div>
  <div class="wrap">
    <div class="hero-kicker">
      <span>fr_trenton02</span><span>·</span><span>Paris</span>
      <span class="tatakae">進撃 Tatakae</span>
    </div>
    <h1 class="h-name" style="margin-top:16px">
      <span class="i18n" data-en="Hi, I'm " data-fr="Salut, moi c'est ">Hi, I'm </span><em>Farid.</em>
    </h1>
    <div class="rotator-wrap" aria-hidden="true">
      <span id="rotator" class="rotator"></span><span class="cursor"></span>
    </div>
    <p class="h-sub i18n"
       data-en="I design reliable AI systems end to end — agents, RAG and LLM evaluation — with a Data Science foundation."
       data-fr="Je conçois des systèmes d'IA fiables de bout en bout — agents, RAG et évaluation LLM — avec une base Data Science.">I design reliable AI systems end to end — agents, RAG and LLM evaluation — with a Data Science foundation.</p>
    <div class="chips">
      <span class="chip i18n" data-en="Builder" data-fr="Bâtisseur">Builder</span>
      <span class="chip">AI Engineer / Data Scientist</span>
      <span class="chip i18n" data-en="Anime &amp; philosophy" data-fr="Anime &amp; philosophie">Anime &amp; philosophy</span>
      <span class="chip i18n" data-en="Cracked engineer in the making" data-fr="Ingénieur cracked en devenir">Cracked engineer in the making</span>
    </div>
    <a class="btn magnetic i18n" href="#projects" data-en="See my projects →" data-fr="Voir mes projets →">See my projects →</a>
  </div>
</header>
```

- [ ] **Step 2: Remove the dead terminal CSS**

In `assets/styles.css`, delete the four `.term…` / `@keyframes blink`-adjacent rules that styled the old terminal (the block at lines 38-41: `.term{…}`, `.term .p{…}`, `.term .caret{…}`, and the `@keyframes blink` **only if** unused elsewhere). Keep `@keyframes blink` — it is now used by `.rotator .cursor`. So delete only `.term{…}`, `.term .p/.c/.m{…}`, and `.term .caret{…}`.

- [ ] **Step 3: Replace typeTerminal with rotator + magnetic in script.js**

In `assets/script.js`, delete the `typeTerminal` function and its call in `DOMContentLoaded`. Add these two functions and call them:

```js
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
```

Update the `DOMContentLoaded` handler: replace `typeTerminal();` with `initRotator();` and add `initMagnetic();`.

- [ ] **Step 4: Verify the hero**

Navigate to `http://localhost:8000/index.html`, screenshot. Expected: no terminal; animated aurora glow behind the name; "Hi, I'm Farid." with gradient "Farid."; the rotator types/cycles the 4 phrases; chips row; a "See my projects →" button that shifts slightly on mouse-move. Toggle FR → hero copy switches to French (rotator stays as tech terms). No console errors.

- [ ] **Step 5: Commit**

```bash
git add index.html assets/styles.css assets/script.js
git commit -m "feat: animated hero with rotating typewriter and magnetic CTA"
```

---

### Task 5: "What I do" — curated identity section

Replace the old `#what` section body (5 generic cards + grouped toolbox) with 3 identity cards + a curated toolbelt + a research line. Keep the `id="what"` and the nav link target.

**Files:**
- Modify: `index.html` (replace the inner content of `<section class="sec" id="what">`, lines 49-69)

**Interfaces:**
- Consumes: `.idcards`, `.idcard`, `.idcard .learn`, `.idcard .tools`, `.toolbelt`, `.research-line` from Task 3.

- [ ] **Step 1: Replace the section content**

In `index.html`, replace everything inside `<section class="sec" id="what"> … </section>` with:

```html
<section class="sec" id="what">
  <div class="wrap">
    <div class="k i18n" data-en="What I do" data-fr="Ce que je fais">What I do</div>
    <h2 class="i18n" data-en="AI Engineer / Data Scientist." data-fr="AI Engineer / Data Scientist.">AI Engineer / Data Scientist.</h2>
    <div class="idcards">
      <div class="idcard" data-reveal>
        <h3>AI Engineer</h3>
        <p class="i18n" data-en="I design agentic systems and RAG that run in production." data-fr="Je conçois des systèmes agentiques et du RAG en production.">I design agentic systems and RAG that run in production.</p>
        <div class="tools"><span>LangGraph</span><span>LangChain</span><span>MCP</span><span>RAG</span><span>LangFuse</span><span>FastAPI</span></div>
      </div>
      <div class="idcard" data-reveal style="--d:.05s">
        <h3>Data Scientist</h3>
        <p class="i18n" data-en="Classic ML, NLP and anomaly detection on real datasets." data-fr="ML classique, NLP et détection d'anomalies sur données réelles.">Classic ML, NLP and anomaly detection on real datasets.</p>
        <div class="tools"><span>PyTorch</span><span>scikit-learn</span><span>XGBoost</span><span>Transformers</span><span>Hugging Face</span></div>
      </div>
      <div class="idcard" data-reveal style="--d:.1s">
        <div class="learn i18n" data-en="Currently learning" data-fr="En apprentissage">Currently learning</div>
        <h3 class="i18n" data-en="Growing into ML Engineering" data-fr="Vers le ML Engineering">Growing into ML Engineering</h3>
        <div class="tools"><span>GPU programming</span><span>High-throughput inference</span><span>vLLM</span><span>CUDA</span><span>Model serving</span></div>
      </div>
    </div>
    <div class="toolbelt">
      <span class="lab i18n" data-en="Also work with" data-fr="J'utilise aussi">Also work with</span>
      <span class="t">Docker</span><span class="t">Kubernetes</span><span class="t">AWS</span><span class="t">GCP</span><span class="t">MLflow</span><span class="t">PostgreSQL</span><span class="t">FAISS</span><span class="t">Python</span>
    </div>
    <p class="research-line"><b class="i18n" data-en="Research interests:" data-fr="Intérêts de recherche :">Research interests:</b> <span class="i18n" data-en="AI for Robotics · Multimodal AI · VLM/VLAs · low-resource languages" data-fr="IA pour la robotique · IA multimodale · VLM/VLAs · langues peu dotées">AI for Robotics · Multimodal AI · VLM/VLAs · low-resource languages</span></p>
  </div>
</section>
```

- [ ] **Step 2: Verify**

Navigate to `http://localhost:8000/index.html`, scroll to "What I do", screenshot. Expected: 3 cards (AI Engineer / Data Scientist / Growing into ML Engineering with a "Currently learning" kicker), each revealing on scroll and lifting on hover; a single "Also work with" toolbelt line (AWS + GCP, no Azure); a research-interests line. FR toggle switches copy. No console errors.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: curated identity-based 'What I do' section"
```

---

### Task 6: Projects — plain-language cards from latest READMEs

Rewrite the 6 project cards to lead with a plain-language line, then a technical line + tags + links. First card is featured with a blog link.

**Files:**
- Modify: `index.html` (replace the `#rail` inner cards, lines 76-83)

**Interfaces:**
- Consumes: `.pcard.featured`, `.plain`, `.tech`, `.links` from Task 3. Rail arrow JS (`initRail`) already targets `.pcard` width — unchanged.

- [ ] **Step 1: Replace the rail cards**

In `index.html`, replace the contents of `<div class="rail" id="rail"> … </div>` with these 6 cards:

```html
<div class="rail" id="rail">
  <div class="pcard featured" data-reveal>
    <h3>Rebuilding the Cerebras Knowledge Base</h3>
    <div class="role i18n" data-en="RAG from scratch" data-fr="RAG from scratch">RAG from scratch</div>
    <div class="plain i18n" data-en="A search engine that actually answers questions about a huge codebase." data-fr="Un moteur de recherche qui répond vraiment aux questions sur une énorme base de code.">A search engine that actually answers questions about a huge codebase.</div>
    <div class="tech i18n" data-en="Built step by step: naive vector search → hybrid retrieval → an LLM reranker (MRR ~0.90) → a planner with tools → an MCP server and a web UI." data-fr="Construit étape par étape : recherche vectorielle naïve → retrieval hybride → reranker LLM (MRR ~0.90) → planificateur outillé → serveur MCP et UI web.">Built step by step: naive vector search → hybrid retrieval → an LLM reranker (MRR ~0.90) → a planner with tools → an MCP server and a web UI.</div>
    <div class="tags"><span>Python</span><span>pgvector</span><span>Hybrid+Rerank</span><span>MCP</span></div>
    <div class="links">
      <a class="lnk" href="https://github.com/faridgnank02/cerebras_knowledge_base" target="_blank" rel="noopener">GitHub →</a>
      <a class="lnk i18n" href="blog.html" data-en="Blog series →" data-fr="Série d'articles →">Blog series →</a>
    </div>
  </div>
  <div class="pcard" data-reveal>
    <h3>Video Intelligence</h3>
    <div class="role i18n" data-en="Agentic video analysis" data-fr="Analyse vidéo agentique">Agentic video analysis</div>
    <div class="plain i18n" data-en="Turns any video into a clean written report — summary, chapters, key quotes." data-fr="Transforme n'importe quelle vidéo en rapport écrit clair — résumé, chapitres, citations clés.">Turns any video into a clean written report — summary, chapters, key quotes.</div>
    <div class="tech i18n" data-en="A multi-agent pipeline with cost-aware model routing and per-stage tracing; uses captions when available, Whisper otherwise." data-fr="Un pipeline multi-agents avec routage de modèles optimisé coût et tracing par étape ; utilise les sous-titres si disponibles, sinon Whisper.">A multi-agent pipeline with cost-aware model routing and per-stage tracing; uses captions when available, Whisper otherwise.</div>
    <div class="tags"><span>yt-dlp</span><span>Whisper</span><span>Ollama</span><span>Claude/GPT</span></div>
    <div class="links"><a class="lnk" href="https://github.com/faridgnank02/video-summarizer" target="_blank" rel="noopener">GitHub →</a></div>
  </div>
  <div class="pcard" data-reveal>
    <h3>PPD2 AI Platform</h3>
    <div class="role i18n" data-en="Agentic RAG" data-fr="RAG agentique">Agentic RAG</div>
    <div class="plain i18n" data-en="Ask plain-English questions about 21,000 development projects and get sourced answers." data-fr="Posez des questions en langage courant sur 21 000 projets de développement et obtenez des réponses sourcées.">Ask plain-English questions about 21,000 development projects and get sourced answers.</div>
    <div class="tech i18n" data-en="RAG over 21,198 projects with GPT-4o and FAISS, on a pure-async FastAPI backend with offline evaluation and observability." data-fr="RAG sur 21 198 projets avec GPT-4o et FAISS, backend FastAPI 100% async avec évaluation offline et observabilité.">RAG over 21,198 projects with GPT-4o and FAISS, on a pure-async FastAPI backend with offline evaluation and observability.</div>
    <div class="tags"><span>FastAPI</span><span>FAISS</span><span>GPT-4o</span><span>RAG</span></div>
    <div class="links"><a class="lnk" href="https://github.com/faridgnank02" target="_blank" rel="noopener">GitHub →</a></div>
  </div>
  <div class="pcard" data-reveal>
    <h3>Monitor Agent</h3>
    <div class="role i18n" data-en="Agents + MCP" data-fr="Agents + MCP">Agents + MCP</div>
    <div class="plain i18n" data-en="Watches any website and tells you, in plain English, exactly what changed." data-fr="Surveille n'importe quel site et vous dit, en clair, ce qui a changé.">Watches any website and tells you, in plain English, exactly what changed.</div>
    <div class="tech i18n" data-en="Scout → Analyst → Reporter → Action agents with structured and visual diffing, an MCP server, and human-in-the-loop approval." data-fr="Agents Scout → Analyste → Reporter → Action avec diff structuré et visuel, serveur MCP et validation human-in-the-loop.">Scout → Analyst → Reporter → Action agents with structured and visual diffing, an MCP server, and human-in-the-loop approval.</div>
    <div class="tags"><span>MCP</span><span>FastAPI</span><span>Next.js</span><span>Agents</span></div>
    <div class="links"><a class="lnk" href="https://github.com/faridgnank02/website-monitoring-agent" target="_blank" rel="noopener">GitHub →</a></div>
  </div>
  <div class="pcard" data-reveal>
    <h3>Voice Consent Gate</h3>
    <div class="role i18n" data-en="Ethical voice AI" data-fr="Voice AI éthique">Ethical voice AI</div>
    <div class="plain i18n" data-en="Clone a voice across languages — but only with recorded consent, all on your own machine." data-fr="Cloner une voix dans plusieurs langues — mais uniquement avec consentement enregistré, entièrement en local.">Clone a voice across languages — but only with recorded consent, all on your own machine.</div>
    <div class="tech i18n" data-en="A privacy-first, multilingual consent gate with local XTTS v2 voice cloning; no external APIs." data-fr="Un consent gate multilingue privacy-first avec clonage vocal local XTTS v2 ; aucune API externe.">A privacy-first, multilingual consent gate with local XTTS v2 voice cloning; no external APIs.</div>
    <div class="tags"><span>XTTS v2</span><span>Whisper</span><span>Gradio</span></div>
    <div class="links"><a class="lnk" href="https://github.com/faridgnank02/voice-cloning" target="_blank" rel="noopener">GitHub →</a></div>
  </div>
  <div class="pcard" data-reveal>
    <h3>Multilingual Text-to-SQL</h3>
    <div class="role i18n" data-en="NL to SQL" data-fr="NL vers SQL">NL to SQL</div>
    <div class="plain i18n" data-en="Ask a database questions in your own language; it writes and runs the SQL for you." data-fr="Interrogez une base de données dans votre langue ; elle écrit et exécute le SQL pour vous.">Ask a database questions in your own language; it writes and runs the SQL for you.</div>
    <div class="tech i18n" data-en="A LangGraph pipeline with schema-aware RAG (FAISS), three layers of injection guards, and MLflow tracking." data-fr="Un pipeline LangGraph avec RAG sur schéma (FAISS), trois couches anti-injection et suivi MLflow.">A LangGraph pipeline with schema-aware RAG (FAISS), three layers of injection guards, and MLflow tracking.</div>
    <div class="tags"><span>LangGraph</span><span>FAISS</span><span>MLflow</span></div>
    <div class="links"><a class="lnk" href="https://github.com/faridgnank02/multilingual-text-2-sql" target="_blank" rel="noopener">GitHub →</a></div>
  </div>
</div>
```

- [ ] **Step 2: Verify**

Navigate to `http://localhost:8000/index.html`, scroll to Projects, screenshot. Expected: 6 cards in a horizontal rail; first card visually featured (wider, tinted, with a "Blog series →" link); each card shows a bold plain-language line then a lighter technical line, tags, and GitHub link; arrows scroll the rail; hover lifts cards. FR toggle switches copy. No console errors.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: plain-language project cards from latest READMEs"
```

---

### Task 7: Blog infrastructure — manifest, reader, and index pages

Add the client-side Markdown blog. The manifest is seeded with the 7 Cerebras entries; the user drops the matching `.md` files into `posts/` later.

**Files:**
- Create: `posts/index.json`
- Create: `posts/README.md`
- Create: `assets/blog.js`
- Create: `blog.html`
- Create: `post.html`

**Interfaces:**
- `posts/index.json`: array of `{ "slug": string, "title": string, "date": "YYYY-MM-DD", "description": string, "series": string }`.
- `assets/blog.js` exposes `window.Blog.renderList(mountId)` and `window.Blog.renderPost(mountId)`.
- Post body file path: `posts/<slug>.md`.

- [ ] **Step 1: Create the manifest**

Create `posts/index.json` (newest first; series marks the Cerebras set):

```json
[
  { "slug": "cerebras-7-web-ui", "title": "Rebuilding the Cerebras Knowledge Base: the web UI and a look back", "date": "2026-07-27", "series": "Cerebras KB", "description": "Part 7: a thin FastAPI web UI over the whole pipeline, plus the series scoreboard and what seven posts of measurement taught me." },
  { "slug": "cerebras-6-mcp", "title": "Rebuilding the Cerebras Knowledge Base: an MCP server", "date": "2026-07-26", "series": "Cerebras KB", "description": "Part 6: exposing the retrieval tools over MCP with zero model calls, so any agent supplies the planning and synthesis." },
  { "slug": "cerebras-5-planner-synthesis", "title": "Rebuilding the Cerebras Knowledge Base: planner, tools, and synthesis", "date": "2026-07-25", "series": "Cerebras KB", "description": "Part 5: a planner routes each question, grep_code handles named symbols, and synthesis returns a cited answer." },
  { "slug": "cerebras-4-rerank", "title": "Rebuilding the Cerebras Knowledge Base: an LLM reranker", "date": "2026-07-24", "series": "Cerebras KB", "description": "Part 4: one LLM call reranks hybrid's fused top-20. MRR goes from 0.57 to 0.90." },
  { "slug": "cerebras-3-distillation-bursting", "title": "Rebuilding the Cerebras Knowledge Base: LLM distillation and bursting", "date": "2026-07-23", "series": "Cerebras KB", "description": "Part 3: distilling each issue thread with an LLM and bursting out its high-signal comments; the recall ceiling rises to 0.94." },
  { "slug": "cerebras-2-hybrid-retrieval", "title": "Rebuilding the Cerebras Knowledge Base: adding hybrid search", "date": "2026-07-22", "series": "Cerebras KB", "description": "Part 2: full-text search plus reciprocal-rank fusion, and why hybrid regressed against plain vector search on this corpus." },
  { "slug": "cerebras-1-naive-vector", "title": "Rebuilding the Cerebras Knowledge Base: the naive vector baseline", "date": "2026-07-21", "series": "Cerebras KB", "description": "Part 1: one pgvector table and cosine similarity over FastAPI code and issues — how far naive vector search gets, and where it fails." }
]
```

- [ ] **Step 2: Create the authoring guide**

Create `posts/README.md`:

```markdown
# Blog posts

Each post is a Markdown file in this folder plus one row in `index.json`.

## Add a post
1. Write `posts/<slug>.md` (plain Markdown; the first `# H1` is optional — the
   title comes from the manifest).
2. Add an object to the **top** of `index.json` (newest first):
   ```json
   { "slug": "<slug>", "title": "…", "date": "YYYY-MM-DD", "series": "", "description": "…" }
   ```
   - `slug` must match the file name (`posts/<slug>.md`).
   - `series` is optional (use `""` for standalone posts).
3. Commit. The homepage "Writing" section shows the newest 3; `blog.html` shows all.

The 7 `cerebras-*` slugs are already in the manifest — drop the matching `.md`
files here (from `cerebras_knowledge_base/docs/blog/`) to publish them.
```

- [ ] **Step 3: Create the shared blog logic**

Create `assets/blog.js`:

```js
(function () {
  'use strict';
  var MANIFEST = 'posts/index.json';

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function fetchManifest() {
    return fetch(MANIFEST, { cache: 'no-cache' }).then(function (r) {
      if (!r.ok) throw new Error('manifest ' + r.status);
      return r.json();
    });
  }

  function cardHTML(p) {
    var series = p.series ? '<span class="series">' + esc(p.series) + '</span>' : '';
    return '<a class="writecard" href="post.html?slug=' + encodeURIComponent(p.slug) + '">' +
      series +
      '<h3>' + esc(p.title) + '</h3>' +
      '<p>' + esc(p.description || '') + '</p>' +
      '<span class="date">' + esc(p.date || '') + '</span>' +
      '</a>';
  }

  // Homepage: newest `limit` posts into #mount
  function renderHome(mountId, limit) {
    var mount = document.getElementById(mountId);
    if (!mount) return;
    fetchManifest().then(function (posts) {
      mount.innerHTML = posts.slice(0, limit).map(cardHTML).join('');
    }).catch(function () {
      mount.innerHTML = '<p class="loading">Posts coming soon.</p>';
    });
  }

  // blog.html: all posts into #mount
  function renderList(mountId) {
    var mount = document.getElementById(mountId);
    if (!mount) return;
    fetchManifest().then(function (posts) {
      mount.innerHTML = '<div class="writecards">' + posts.map(cardHTML).join('') + '</div>';
    }).catch(function () {
      mount.innerHTML = '<p class="loading">No posts yet.</p>';
    });
  }

  // post.html: render ?slug= into #mount
  function renderPost(mountId) {
    var mount = document.getElementById(mountId);
    if (!mount) return;
    var slug = new URLSearchParams(location.search).get('slug') || '';
    if (!/^[a-z0-9-]+$/i.test(slug)) { mount.innerHTML = '<p class="loading">Post not found.</p>'; return; }
    fetchManifest().then(function (posts) {
      var meta = posts.filter(function (p) { return p.slug === slug; })[0];
      return fetch('posts/' + slug + '.md', { cache: 'no-cache' }).then(function (r) {
        if (!r.ok) throw new Error('md ' + r.status);
        return r.text();
      }).then(function (md) {
        var title = meta ? meta.title : slug;
        var date = meta ? (meta.date || '') : '';
        document.title = title + ' — Farid GNANKAMBARY';
        mount.innerHTML =
          '<a class="back" href="blog.html">← All posts</a>' +
          '<h1>' + esc(title) + '</h1>' +
          '<div class="meta">' + esc(date) + '</div>' +
          '<div class="article-body">' + window.marked.parse(md) + '</div>';
      });
    }).catch(function () {
      mount.innerHTML = '<a class="back" href="blog.html">← All posts</a>' +
        '<p class="loading">This post isn\'t published yet.</p>';
    });
  }

  window.Blog = { renderHome: renderHome, renderList: renderList, renderPost: renderPost };
})();
```

- [ ] **Step 4: Create the blog index page**

Create `blog.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Writing — Farid GNANKAMBARY</title>
<meta name="description" content="Notes on AI engineering, RAG, agents and LLM evaluation." />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="assets/styles.css" />
</head>
<body>
<nav class="site-nav" aria-label="Navigation">
  <div class="in">
    <a class="logo" href="index.html">fr_trenton02</a>
    <div><span class="nav-links"><a href="index.html#projects">Projects</a><a href="blog.html" class="active">Writing</a></span></div>
  </div>
</nav>
<main class="sec">
  <div class="blog-list">
    <div class="k">Writing</div>
    <h2 style="margin-bottom:24px">Notes on what I build and learn.</h2>
    <div id="posts"><p class="loading">Loading…</p></div>
  </div>
</main>
<footer class="footer"><span>© 2026 Farid GNANKAMBARY · fr_trenton02</span><span><a class="footlink" href="index.html">Home ↑</a></span></footer>
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script src="assets/blog.js"></script>
<script>window.Blog.renderList('posts');</script>
</body>
</html>
```

- [ ] **Step 5: Create the post reader page**

Create `post.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Writing — Farid GNANKAMBARY</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="assets/styles.css" />
</head>
<body>
<nav class="site-nav" aria-label="Navigation">
  <div class="in">
    <a class="logo" href="index.html">fr_trenton02</a>
    <div><span class="nav-links"><a href="index.html#projects">Projects</a><a href="blog.html">Writing</a></span></div>
  </div>
</nav>
<main class="article" id="post"><p class="loading">Loading…</p></main>
<footer class="footer"><span>© 2026 Farid GNANKAMBARY · fr_trenton02</span><span><a class="footlink" href="blog.html">All posts</a></span></footer>
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script src="assets/blog.js"></script>
<script>window.Blog.renderPost('post');</script>
</body>
</html>
```

- [ ] **Step 6: Verify with a temporary sample post**

Create a throwaway `posts/cerebras-1-naive-vector.md` with a few lines of Markdown (heading, paragraph, list, code block, a small table) **for testing only**. Then:
- Navigate to `http://localhost:8000/blog.html`, screenshot. Expected: 7 cards listed, "Cerebras KB" series tags, newest first.
- Click the part-1 card → `post.html?slug=cerebras-1-naive-vector` renders the Markdown styled (heading, code block dark, table scrolls), with an "← All posts" back link and the manifest title.
- Navigate to `post.html?slug=does-not-exist` → shows "This post isn't published yet." with a back link.
Delete the throwaway file afterward: `git rm --cached` is not needed (never committed); just `rm posts/cerebras-1-naive-vector.md`.

- [ ] **Step 7: Commit**

```bash
git add posts/index.json posts/README.md assets/blog.js blog.html post.html
git commit -m "feat: markdown blog (manifest, index page, post reader)"
```

---

### Task 8: Homepage "Writing" section + nav

Add a "Writing" section to the homepage showing the newest 3 posts, plus nav links. Place it between Projects and Journey.

**Files:**
- Modify: `index.html` (add a `<section id="writing">` after the projects section; add nav links)
- Modify: `assets/script.js` (call `window.Blog.renderHome` on load)

**Interfaces:**
- Consumes: `window.Blog.renderHome(mountId, limit)` from Task 7; `.writecards`, `.see-all` from Task 3.

- [ ] **Step 1: Add the Writing section**

In `index.html`, immediately after the closing `</section>` of `#projects`, insert:

```html
<section class="sec" id="writing">
  <div class="wrap">
    <div class="k i18n" data-en="Writing" data-fr="Articles">Writing</div>
    <h2 class="i18n" data-en="Notes on what I build and learn." data-fr="Des notes sur ce que je construis et apprends.">Notes on what I build and learn.</h2>
    <div id="home-posts" class="writecards"><p class="loading">Loading…</p></div>
    <a class="see-all i18n" href="blog.html" data-en="See all posts →" data-fr="Voir tous les articles →">See all posts →</a>
  </div>
</section>
```

- [ ] **Step 2: Add nav links for Projects/Writing**

In `index.html` nav (`.nav-links`), add a Writing link after Projects. The nav currently has: What I do, Projects, Journey, Contact. Add Writing between Projects and Journey:

```html
<a href="#writing"><span class="i18n" data-en="Writing" data-fr="Articles">Writing</span></a>
```

Also update the existing "What I do" nav link text pair to `data-en="What I do"` first (English primary) if not already, and ensure all nav `.i18n` spans have `data-en` as the visible text.

- [ ] **Step 3: Load the homepage posts**

Include the blog scripts on the homepage. In `index.html`, before the existing `<script src="assets/script.js"></script>`, add:

```html
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script src="assets/blog.js"></script>
```

Then in `assets/script.js`, inside the `DOMContentLoaded` handler, add a guarded call:

```js
if (window.Blog && window.Blog.renderHome) window.Blog.renderHome('home-posts', 3);
```

- [ ] **Step 4: Verify**

Navigate to `http://localhost:8000/index.html`, scroll to Writing, screenshot. Expected: 3 newest post cards (from the manifest), a "See all posts →" link to `blog.html`, and a "Writing" nav link that scrolls to the section and is highlighted by scrollspy. Because no `.md` files exist yet, the cards still render (they link to posts that will 404 gracefully until files are added). No console errors beyond optional 404s for missing `.md` (only on click).

- [ ] **Step 5: Commit**

```bash
git add index.html assets/script.js
git commit -m "feat: homepage Writing section and nav link"
```

---

### Task 9: Journey, Beyond code, and Contact rewrite

Plain-language-first experiences (freelance removed), warmer "Beyond code" copy, and a simplified contact.

**Files:**
- Modify: `index.html` (`#parcours` section lines 87-103; `.human` section 105-116; `#contact` section 118-133)

**Interfaces:**
- Consumes: `.tli`, `.twocol`, `.col` (existing) for journey; `.reach`, `.cbtn` for contact.

- [ ] **Step 1: Rewrite the Journey section**

In `index.html`, replace the `.twocol` inner content of `<section class="sec" id="parcours">` with:

```html
<div class="twocol">
  <div class="col"><h3 class="i18n" data-en="Experience" data-fr="Expérience">Experience</h3>
    <div class="tli" data-reveal>
      <b>AI Engineer · DiGreen Advisory</b>
      <span class="d i18n" data-en="2025 to today" data-fr="2025 à aujourd'hui">2025 to today</span>
      <p class="i18n" data-en="I build the AI features of a compliance product that reads documents on its own and writes audit-ready reports — a LangGraph supervisor with specialized sub-agents, a Weaviate RAG knowledge base, sovereignty and security (AES-256, zero-retention), and continuous evaluation on AWS." data-fr="Je développe les fonctionnalités IA d'un produit de conformité qui lit les documents et rédige des rapports audit-ready — un superviseur LangGraph avec sous-agents spécialisés, une base de connaissances RAG Weaviate, souveraineté et sécurité (AES-256, zero-retention), et évaluation continue sur AWS.">I build the AI features of a compliance product that reads documents on its own and writes audit-ready reports — a LangGraph supervisor with specialized sub-agents, a Weaviate RAG knowledge base, sovereignty and security (AES-256, zero-retention), and continuous evaluation on AWS.</p>
    </div>
    <div class="tli" data-reveal style="--d:.05s">
      <b>Data Scientist · Sogeti (Capgemini)</b>
      <span class="d i18n" data-en="2023 to 2024" data-fr="2023 à 2024">2023 to 2024</span>
      <p class="i18n" data-en="I built a system that matches CVs to job offers and measured how fair and accurate it was — a hybrid Content-Based + RAG recommender (LangChain, Llama-3, FAISS, Sentence Transformers), an LLM evaluation suite on an annotated golden dataset, and Azure MLOps pipelines." data-fr="J'ai construit un système qui met en correspondance CV et offres, et mesuré son équité et sa pertinence — un recommandeur hybride Content-Based + RAG (LangChain, Llama-3, FAISS, Sentence Transformers), une suite d'évaluation LLM sur golden dataset annoté, et des pipelines MLOps Azure.">I built a system that matches CVs to job offers and measured how fair and accurate it was — a hybrid Content-Based + RAG recommender (LangChain, Llama-3, FAISS, Sentence Transformers), an LLM evaluation suite on an annotated golden dataset, and Azure MLOps pipelines.</p>
    </div>
  </div>
  <div class="col"><h3 class="i18n" data-en="Education" data-fr="Formation">Education</h3>
    <div class="tli" data-reveal>
      <b class="i18n" data-en="Engineering degree · CY Tech" data-fr="Diplôme d'ingénieur · CY Tech">Engineering degree · CY Tech</b>
      <span class="d i18n" data-en="Applied Mathematics, AI track" data-fr="Mathématiques appliquées, spécialité IA">Applied Mathematics, AI track</span>
      <p class="i18n" data-en="2021 to 2024." data-fr="2021 à 2024.">2021 to 2024.</p>
    </div>
    <div class="tli" data-reveal style="--d:.05s">
      <b class="i18n" data-en="Certifications" data-fr="Certifications">Certifications</b>
      <p class="i18n" data-en="Deep Learning Specialization, Neural Networks with PyTorch (IBM), TOEIC 955." data-fr="Deep Learning Specialization, Neural Networks with PyTorch (IBM), TOEIC 955.">Deep Learning Specialization, Neural Networks with PyTorch (IBM), TOEIC 955.</p>
    </div>
  </div>
</div>
```

Also update the section's `.k` and `<h2>` to English-primary:
```html
<div class="k i18n" data-en="Journey" data-fr="Parcours">Journey</div>
<h2 class="i18n" data-en="From Data Science to AI engineering." data-fr="De la Data à l'ingénierie d'IA.">From Data Science to AI engineering.</h2>
```

- [ ] **Step 2: Warm up the "Beyond code" section (English-primary)**

In `index.html`, update the `.human` section's `.k`, `<h2>`, and 4 cards to English-primary copy:

```html
<div class="k i18n" data-en="Beyond code" data-fr="Au-delà du code">Beyond code</div>
<h2 class="i18n" data-en="The rest of who I am." data-fr="Le reste de qui je suis.">The rest of who I am.</h2>
<div class="cards">
  <div class="card" data-reveal><h3 class="i18n" data-en="Anime" data-fr="Anime">Anime</h3><p class="i18n" data-en="Stories that think about the world." data-fr="Des récits qui pensent le monde.">Stories that think about the world.</p></div>
  <div class="card" data-reveal style="--d:.05s"><h3 class="i18n" data-en="Philosophy" data-fr="Philosophie">Philosophy</h3><p class="i18n" data-en="Questions before answers." data-fr="Questions avant réponses.">Questions before answers.</p></div>
  <div class="card" data-reveal style="--d:.1s"><h3 class="i18n" data-en="Literature" data-fr="Littérature">Literature</h3><p class="i18n" data-en="Language as material." data-fr="La langue comme matière.">Language as material.</p></div>
  <div class="card" data-reveal style="--d:.15s"><h3 class="i18n" data-en="Maths" data-fr="Maths">Maths</h3><p class="i18n" data-en="The language of proofs." data-fr="Le langage des preuves.">The language of proofs.</p></div>
</div>
```

- [ ] **Step 3: Simplify the Contact section**

In `index.html`, replace the inner content of `<section class="sec" id="contact">` with:

```html
<div class="wrap">
  <div class="k i18n" data-en="How to reach me" data-fr="Comment me contacter">How to reach me</div>
  <div class="reach">
    <a class="cbtn" href="mailto:mohamedgnank@gmail.com">Email</a>
    <a class="cbtn" href="https://github.com/faridgnank02" target="_blank" rel="noopener">GitHub</a>
    <a class="cbtn" href="https://linkedin.com/in/farid-gnankambary-a617821b2/" target="_blank" rel="noopener">LinkedIn</a>
  </div>
</div>
```

- [ ] **Step 4: Verify**

Navigate to `http://localhost:8000/index.html`, screenshot Journey / Beyond code / Contact. Expected: two experiences only (no freelance), each a single plain-language-first paragraph; education + certs; warm "Beyond code" cards; contact reduced to "How to reach me" + three clickable buttons. FR toggle switches all copy. No console errors.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: plain-language journey, warmer beyond-code, simplified contact"
```

---

### Task 10: Final polish, metadata, and full verification

**Files:**
- Modify: `index.html` (`<title>`, meta description, footer year check)
- Modify: `assets/styles.css` (only if the verification finds spacing/overflow issues)

**Interfaces:** none new.

- [ ] **Step 1: Update page metadata to English-primary**

In `index.html` `<head>`, set:

```html
<title>Farid GNANKAMBARY — AI Engineer / Data Scientist</title>
<meta name="description" content="Farid GNANKAMBARY — AI Engineer / Data Scientist. Agents, RAG, LLM evaluation, growing into ML Engineering. EN/FR." />
```

- [ ] **Step 2: Full-site verification pass (desktop)**

Navigate to `http://localhost:8000/index.html`. Verify in one pass:
- Hero: aurora animates, name gradient, rotator cycles, chips, magnetic CTA.
- Nav scrollspy highlights What I do / Projects / Writing / Journey / Contact while scrolling.
- Reveal-on-scroll fires on cards and timeline items.
- Projects rail arrows scroll; featured card + blog link present.
- Writing shows 3 cards; "See all posts →" opens `blog.html`; a card opens `post.html`.
- FR toggle flips all `.i18n` copy and persists across reload; reset to EN.
Screenshot the top and each major section.

- [ ] **Step 3: Mobile verification pass**

Use `resize_window` preset `mobile` (375×812), reload `index.html`, screenshot. Verify: nav wraps cleanly, hero text and chips wrap, cards stack, no horizontal page scroll (the projects rail and any tables scroll inside their own container). Fix any overflow in `assets/styles.css` if found (e.g. add `overflow-wrap:break-word` to long chips), then re-verify.

- [ ] **Step 4: Reduced-motion check**

Confirm `assets/styles.css` contains the `@media (prefers-reduced-motion: reduce)` block disabling aurora, name shimmer, and rotator cursor, and that `assets/script.js` `initRotator`/`initMagnetic` early-return under reduced motion. (Optional: `resize_window` cannot force reduced motion; rely on code inspection.)

- [ ] **Step 5: Commit**

```bash
git add index.html assets/styles.css
git commit -m "chore: english metadata and final polish"
```

- [ ] **Step 6: Finish the branch**

Use the `superpowers:finishing-a-development-branch` skill to present merge/PR options for the `claude/portfolio-website-redesign-d2c532` branch.

---

## Self-Review

**Spec coverage:**
- English-primary → Task 2 (+ every section written English-first).
- Animated hero, handle, Tatakae, rotator, chips, magnetic CTA → Tasks 3–4.
- "What I do" curated identity cards + toolbelt (AWS/GCP only) + research line → Tasks 3, 5.
- "Currently learning" (GPU/inference/vLLM/CUDA) → Task 5 card 3.
- Data Scientist identity visible → Tasks 4 (chip + subtitle), 5 (card 2).
- Projects plain-language + latest READMEs + featured + blog link → Tasks 3, 6.
- Blog (Markdown + JS renderer, user supplies .md, manifest seeded with 7) → Tasks 7–8.
- Homepage Writing section + nav → Task 8.
- Journey plain-language, freelance removed → Task 9.
- Beyond code warmer, Contact simplified to "How to reach me" → Task 9.
- Motion + reduced-motion gating → Tasks 3, 4, 10.
- No Claude co-author in commits → all commit steps.
- Static/GitHub-Pages-safe → Task 1 preview; no build step introduced.

**Placeholder scan:** No TBD/TODO; all code blocks are complete; the only intentionally user-supplied artifacts are the post `.md` bodies (explicitly out of scope) and a throwaway test `.md` in Task 7 Step 6 (deleted before commit).

**Type consistency:** `window.Blog.renderHome/renderList/renderPost` defined in Task 7 and consumed in Tasks 7–8; mount ids `home-posts` (index), `posts` (blog.html), `post` (post.html) are consistent; manifest keys `slug/title/date/description/series` match between `posts/index.json`, `blog.js`, and `posts/README.md`.
