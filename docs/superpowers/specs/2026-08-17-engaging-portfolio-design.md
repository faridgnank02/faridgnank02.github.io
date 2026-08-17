# Engaging Portfolio Redesign — Design Spec

**Date:** 2026-08-17
**Goal:** Make faridgnank02.github.io more dynamic and engaging (in the spirit of
walidkoussa.com) while keeping a professional AI-engineer tone. Add a blog. Enhance
the existing single-page site in place; do not rebuild.

## Constraints
- **Static only.** GitHub Pages. No backend, no build step. Vanilla JS + one main CSS.
- **English-primary.** `<html lang="en">`, default toggle = EN, English text first in
  every `.i18n` pair. FR remains the secondary toggle. `STORAGE_KEY` default → `en`.
- **No chatbot.** Out of scope.
- **No vanity stat counters.** Real project results allowed but secondary, never headline.
- **No clichés** (e.g. avoid "obsessed with proofs / rigorous, measurable"). Personality
  copy should feel real (e.g. "Cracked engineer in the making").
- **Keep** FR/EN i18n, teal/indigo light palette, `prefers-reduced-motion` gating,
  single static file set. **The terminal hero is replaced** by an animated hero (§1).
- **Identity:** AI Engineer **/ Data Scientist**, actively growing toward ML Engineering.
  Both the AI-Engineer and Data-Scientist sides must be visible.

## Source of truth for content
- CVs — AI-Engineer (`Farid_GNANKAMBARY_AI_Engineer_CV.pdf`), ML/Data-Science
  (`Farid_GNANKAMBARY_CV_ML.pdf`), and Portfolio (`Farid_GNANKAMBARY_Portfolio.pdf`) —
  for skills, tools, experience.
- Latest GitHub READMEs (fetched live) — for project cards. Do not invent.
- Local: `~/Desktop/x/Agentic Project/production-ai-app/README.md` — PPD2 AI Platform.

## Sections

### 1. Hero — animated, NOT a terminal
Bold large-type hero over a soft **animated aurora gradient** backdrop (CSS keyframes;
disabled under reduced-motion). Elements:
- Small kicker line: `fr_trenton02` (the handle) · Paris.
- Name: `Hi, I'm Farid.` with a subtle animated gradient on `Farid`.
- **Rotating typewriter line** cycling identity/subjects:
  `AI Engineer / Data Scientist` → `agentic systems` → `RAG pipelines` → `ML models`
  (JS type/delete loop; reduced-motion → shows the first, static).
- `Tatakae` as a small accent near the name (e.g. a faint kicker/badge), not labeled
  as a motto.
- Personality chip row (no clichés):
  `Builder · AI Engineer / Data Scientist · Anime & philosophy · Cracked engineer in the making`.
- Magnetic CTA "See my projects →" (JS, reduced-motion aware).
The old terminal block is removed.

### 2. "What I do"  (merges old *What I do* + Toolbox — curated, identity-based)
Drop the cliché tagline. **Organized by who Farid is and where he's going**, NOT by
tool-category buckets, NOT a flat dump. Three cards, each with only a handful of
signature tools:
1. **AI Engineer** — I design agentic systems and RAG in production.
   `LangGraph · LangChain · MCP · RAG · LangFuse · FastAPI`
2. **Data Scientist** — Classic ML, NLP, and anomaly detection on real datasets.
   `PyTorch · scikit-learn · XGBoost · Transformers · Hugging Face`
3. **Growing into ML Engineering** *(currently learning)* —
   `GPU programming · high-throughput inference (vLLM) · CUDA · model serving`

Below the cards:
- One short curated **toolbelt** line: `Docker · Kubernetes · AWS · GCP · MLflow ·
  PostgreSQL · FAISS · Python`  (AWS and GCP only — no Azure, no ECS/S3/Lambda detail).
- Small **Research interests** line: `AI for Robotics · Multimodal AI · VLM/VLAs ·
  low-resource languages`.

### 3. Projects (6 cards, scroll rail, featured first)
Each card leads with a **plain-language one-liner** anyone non-technical can understand,
then a short technical line + tags. Content from the latest READMEs; do not invent.
1. **Rebuilding the Cerebras Knowledge Base** (`cerebras_knowledge_base`)
   - Plain: "A search engine that actually answers questions about a huge codebase."
   - Tech: the journey — naive vector → hybrid (dense + BM25-lite + RRF) → LLM reranker →
     planner/tools/synthesis → **MCP server** → web UI. Metric secondary (rerank lifted
     MRR to ~0.90). Tags: Python · pgvector · Hybrid+Rerank · MCP. Links: GitHub **+ Blog series**.
2. **Video Intelligence** (`video-summarizer`)
   - Plain: "Turns any video into a clean written report — summary, chapters, key quotes."
   - Tech: multi-agent pipeline, cost-aware model routing, per-stage tracing, captions-first.
     Tags: yt-dlp · Whisper · Ollama · Claude/GPT.
3. **PPD2 AI Platform** (local)
   - Plain: "Ask plain-English questions about 21,000 development projects, get sourced answers."
   - Tech: RAG over 21,198 projects; GPT-4o + FAISS; pure-async FastAPI + Streamlit; offline
     eval + observability. Link → GitHub profile (repo not public). Tags: FastAPI · FAISS · GPT-4o · RAG.
4. **Monitor Agent** (`website-monitoring-agent`)
   - Plain: "Watches any website and tells you, in plain English, exactly what changed."
   - Tech: Scout→Analyst→Reporter→Action agents; structured + visual diff; MCP server;
     human-in-the-loop approval. Tags: MCP · FastAPI · Next.js · Agents.
5. **Voice Consent Gate** (`voice-cloning`)
   - Plain: "Clone a voice across languages — but only with recorded consent, all on your own machine."
   - Tech: privacy-first multilingual consent gate; local XTTS v2; fully on-device.
     Tags: XTTS v2 · Whisper · Gradio.
6. **Multilingual Text-to-SQL** (`multilingual-text-2-sql`)
   - Plain: "Ask a database questions in your own language; it writes and runs the SQL for you."
   - Tech: LangGraph pipeline; RAG over schema (FAISS); 3-layer injection guards; MLflow.
     Tags: LangGraph · FAISS · MLflow.
Card hover: lift + accent border glow. First card gets featured treatment.

### 4. Blog / Writing (NEW)
- **Approach:** Markdown files rendered client-side (marked.js via CDN — allowed on
  GitHub Pages). **User supplies the post `.md` files themselves**; this work sets up the
  structure, styling, manifest, and renderer.
- **Structure:**
  - `posts/` — folder for `.md` files (user drops them here).
  - `posts/index.json` — manifest array: `{slug, title, date, description, series?}`.
    Seeded with the 7 Cerebras entries (titles/descriptions known) so the section works
    as soon as the `.md` files are added.
  - `blog.html` — full blog index listing all posts from the manifest (shares site CSS).
  - `post.html` — reads `?slug=`, `fetch()`es `posts/<slug>.md`, renders with marked.js
    into the styled article layout; back-link to blog + home.
- **Homepage "Writing" section** — new section listing the latest ~3 posts from the
  manifest, each linking to `post.html?slug=`, with a "See all posts →" link to `blog.html`.
- Article styling: readable measure, styled headings/code blocks/tables/blockquotes,
  reduced-motion clean. FR/EN toggle applies to site chrome; post bodies render as written.
- Note in a short `posts/README.md`: how to add a post (drop `slug.md`, add a manifest row).

### 5. Journey (Parcours) — plain-language first, then a short technical line. Freelance DELETED.
Each experience leads with a simple sentence anyone can understand, then the technical detail.
- **AI Engineer · DiGreen Advisory** (2025–present)
  - Plain: "I build the AI features of a compliance product that reads documents on its own
    and writes audit-ready reports."
  - Tech: LangGraph supervisor + specialized sub-agents, a Weaviate RAG knowledge base,
    sovereignty/security (AES-256, zero-retention), continuous evaluation on AWS.
- **Data Scientist · Sogeti (Capgemini)** (2023–2024)
  - Plain: "I built a system that matches CVs to job offers and measured how fair and
    accurate it was."
  - Tech: hybrid Content-Based + RAG (LangChain / Llama-3 / FAISS / Sentence Transformers),
    an LLM evaluation suite on an annotated golden dataset, Azure MLOps pipelines.
- **Education:** Engineering degree — Applied Mathematics, AI track · CY Tech (2021–2024).
- **Certifications:** Deep Learning Specialization, Neural Networks with PyTorch (IBM),
  TOEIC 955.

### 6. Beyond code — keep 4 cards, warmer English copy.

### 7. Contact — simplified
- Heading: **"How to reach me"**. Drop the "Want to work on an AI project?" block.
- Three clickable items: Email (`mailto:mohamedgnank@gmail.com`),
  GitHub (`github.com/faridgnank02`), LinkedIn (`/in/farid-gnankambary-a617821b2/`).

## Motion system
- Animated aurora-gradient hero backdrop (CSS, disabled under reduced-motion).
- Rotating typewriter identity line in hero (JS; reduced-motion → static first item).
- Reveal-on-scroll on all major blocks (extend existing `[data-reveal]`).
- Card hover: `translateY(-3px)` + accent-tinted border + soft shadow.
- Magnetic CTA (small JS transform, disabled under reduced-motion).
- Hero name gradient shimmer (CSS, disabled under reduced-motion).
- Everything respects `@media (prefers-reduced-motion: reduce)`.

## Files touched / added
- `index.html` — English-primary reorder, animated hero (handle + Tatakae + rotating line
  + chips), merged curated "What I do", plain-language projects, new "Writing" section,
  journey rewrite (freelance removed), simplified contact.
- `assets/styles.css` — aurora hero, chips, identity cards, curated toolbelt, featured card,
  hover glows, gradient name, article/blog styles.
- `assets/script.js` — rotating typewriter, magnetic CTA; default lang → EN; small manifest
  loader for the homepage "Writing" section.
- `assets/blog.js` (new) — manifest listing (`blog.html`) + post rendering (`post.html`)
  with marked.js.
- `blog.html`, `post.html` (new).
- `posts/index.json`, `posts/README.md` (new). `.md` post files added by the user.

## Out of scope
- AI chatbot, dark mode, framework migration, build tooling, writing the post `.md` bodies.

## Success criteria
- Site is English-primary, noticeably more alive, still professional; FR toggle works.
- All 6 project cards reflect real, current README content and correct links.
- Blog structure works: manifest-driven listing + client-side Markdown rendering; adding a
  post = drop a `.md` + one manifest row.
- No vanity numbers, no clichés. Reduced-motion clean. Deploys to GitHub Pages unchanged.
