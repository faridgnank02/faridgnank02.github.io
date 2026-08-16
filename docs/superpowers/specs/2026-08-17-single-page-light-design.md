# Farid GNANKAMBARY — Single-Page Portfolio Design

**Date:** 2026-08-17
**Status:** Approved by user
**Supersedes:** `2026-08-16-portfolio-rebuild-design.md` (the multi-page rebuild that shipped and was rejected for not matching the intended style)

## Motivation

The user's intent was a dynamic, personality-forward, single-page portfolio in the spirit of `walidkoussa.com` (playful copy, interactive feel, FR/EN toggle) — **not** a conventional multi-page bilingual CV site. The previous multi-page rebuild (7 pages + blog) was rejected. This spec defines a fresh, single-page design built from scratch. Key corrections vs the rejected attempt:

- **Light theme** (not dark), original styling (not a Walid clone)
- Identity framed as **"AI Engineer with a Data Science background"** — no fake years/project counters
- Single page, no sub-pages, no blog
- Killed the multi-page structure, keep only the real the projects

## Design Direction

- **Single scrolling page**, light theme, subtle warm paper background (`#f7f7f5` / white cards).
- **FR-first** default; **EN** via a toggle that live-switches the whole page through `data-fr` / `data-en` attributes (localStorage persisted).
- Tone: confident, rigorous, a little playful — but restrained (minimal emojis).
- Dynamic feel via: interactive terminal hero (typewriter), IntersectionObserver scroll reveals, hover motion, scrollspy nav, and the horizontal project rail.

## Browser / assets

Plain HTML/CSS/JS, GitHub Pages. Files:
- `index.html` — single page
- `assets/styles.css` — light design system
- `assets/script.js` — FR/EN toggle, terminal typewriter, reveals, scrollspy, project-rail arrows
- Old files (`skills.html`, `projects.html`, `about.html`, `experience.html`, `education.html`, `contact.html`, `blog/`, seed posts, old `assets/new-post.*`, `blog/README.md`) are deleted.

## Page Structure (top → bottom)

Fixed sticky nav: `fr_trenton02` logo · anchor links (Ce que je fais / Projets / Toolbox / Parcours / Contact) · FR/EN pill. Scrollspy highlights current section.

### 1. Hero — Terminal
A dark terminal card on the light page (visual anchor). Monospace, typing effect on load, blinking caret. Lines include a `whoami` style intro emphasizing **AI Engineer · Data Science roots · Paris** and a `--focus` line listing agents · RAG · évaluation LLM · inference (CUDA/vLLM en cours). Below it:
- Big name: **"Salut, moi c'est Farid."** (EN: "Hi, I'm Farid.")
- One-line intro: builds reliable, sovereign AI systems idea→deployment, with a Data Science base and an obsession with evidence.
- One CTA button: "Voir mes projets →" (scrolls to projects).
- **No** tag chips, **no** fake stats.

### 2. Ce que je fais
Heading + 5 cards (grid, auto-fill). No emoji icons — just titles + one-line descriptions + small mono tech tags:
1. **RAG & retrieval** — pgvector, FAISS, MCP
2. **Agents & MCP** — LangGraph, LangChain
3. **Évaluation & LLMOps** — LangFuse, MLflow, RAGAS
4. **ML Engineering** — LLM inference (Ollama), learning CUDA/vLLM
5. **Mes intérêts de recherche** (accent card) — AI for Robotics, Multimodal AI, VLM/VLAs, low-resource languages

### 3. Toolbox (directly under Ce que je fais)
Grouped pill tags, no logos:
- LLM & Agents: LangGraph, LangChain, MCP, Ollama, vLLM, FAISS
- Évaluation & LLMOps: LangFuse, LLM-as-Judge, RAGAS, MLflow, Monitoring
- Cloud & Infra: Docker, Kubernetes, GCP, AWS, FastAPI, CI/CD
- Data & Stockage: PostgreSQL, BigQuery, Weaviate, pgvector, Redis

### 4. Mes derniers projets
Heading "**Mes derniers projets.**" Horizontal snap-scroll rail of all 6 projects, with `‹ ›` arrows. Each card: title, role line, one-line first-person quote, mono tech tags, repo link (GitHub, or GitHub profile for PPD2). Links `target="_blank" rel="noopener"`.
1. Knowbase — RAG from scratch — GitHub `cerebras_knowledge_base`
2. Voice Clone Consent Gate — Voice AI éthique — GitHub `voice-cloning`
3. PPD2 AI Platform — RAG agentique — GitHub profile (no public repo)
4. Monitor Agent — Agents — GitHub `website-monitoring-agent`
5. Video Intelligence — Video AI — GitHub `video-summarizer`
6. Text-to-SQL multilingue — NL vers SQL — GitHub `multilingual-text-2-sql`

### 5. Parcours
Two columns side by side: **Expérience** (left) and **Formation** (right). **Expérience latest → oldest**, short phrases, **no numbers** (no "+18%"), **no dashes "–"** (use "à"):
- AI Engineer · DiGreen Advisory — 2025 à aujourd'hui — GenAI de production, agents LangGraph, souveraineté & évaluation continue
- Freelance AI Developer — 2025 à aujourd'hui — agents & RAG bout en bout, ateliers FR/EN (no "Fiverr")
- Data Scientist · Sogeti (Capgemini) — 2023 à 2024 — recommandation hybride Content-Based & RAG, suite d'évaluation, MLOps

**Formation** (on the right):
- Diplôme d'ingénieur · CY Tech (EISTI) — Maths appliquées, spécialité IA — 2021 à 2024
- Certifications — TOEIC, Deep Learning Specialization, PyTorch

### 6. Au-delà du code
Centered grid, minimal emojis: Anime · Philosophie · Littérature · Maths, each a card with a one-line human touch.

### 7. How to contact me
Heading "**How to contact me**" (not "Travaillons ensemble"). Big line: "Envie de travailler sur un projet d'IA ?" + short text: available for projects & collaborations, always happy to be reached out. Buttons: Email (mailto:mohamedgnank@gmail.com), GitHub (https://github.com/faridgnank02), LinkedIn (https://linkedin.com/in/farid-gnankambary-a617821b2/). **No** response-delay message.

Footer: © 2026 Farid GNANKAMBARY · fr_trenton02 · back-to-top link.

## Dynamic / interactive behavior

- **FR/EN toggle**: `script.js` `switchLanguage(lang)` swaps `.i18n` elements' text via `data-en`/`data-fr`, persists to `localStorage('lang')`, default `fr`.
- **Terminal typewriter**: types the monospace lines with a blinking caret on load (re-triggers are fine).
- **Scroll reveals**: IntersectionObserver adds a `.visible` class to `[data-reveal]` elements; staggered with inline `--delay`.
- **Scrollspy**: IntersectionObserver toggles `.active` nav link per section.
- **Project rail**: `‹ ›` buttons scroll the rail horizontally (scrollBy card width); rail uses scroll-snap. Touch/drag works natively.
- Hover motion: subtle translate/lift on cards and buttons via CSS transitions.

## Accessibility & quality

- One `<h1>` (name), sensible `<h2>` section headings, `aria-label` on interactive icon-less controls.
- External project/contact links `target="_blank" rel="noopener"`.
- Contrast on light theme AA; accent color used sparingly for headings/roles.
- No console errors; everything degrades gracefully if JS disabled (page still readable).

## Out of scope

- Chatbot / AI widget (explicitly declined).
- Fake metrics/counters.
- Blog and multi-page structure (removed).
- No analytics/tracking.

## Verification

- Open `index.html` locally: light theme, FR default, EN toggle works and persists, terminal types, reveals fire on scroll, scrollspy follows, rail scrolls with arrows and touch, anchors navigate, responsive at 375px & 1440px. No console errors.
- After build: `git push`, confirm GitHub Pages serves the new single-page site.