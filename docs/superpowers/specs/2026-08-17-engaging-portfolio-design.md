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
- **Keep** FR/EN i18n, terminal hero concept, teal/indigo light palette,
  `prefers-reduced-motion` gating, single static file set.

## Source of truth for content
- CV (`Farid_GNANKAMBARY_AI_Engineer_CV.pdf`) and Portfolio
  (`Farid_GNANKAMBARY_Portfolio.pdf`) — for skills, tools, experience.
- Latest GitHub READMEs (fetched live) — for project cards. Do not invent.
- Local: `~/Desktop/x/Agentic Project/production-ai-app/README.md` — PPD2 AI Platform.

## Sections

### 1. Hero
Keep terminal + typewriter. Weave in pseudo `fr_trenton02` and motto `Tatakae`:
```
$ whoami
→ fr_trenton02 · AI Engineer · Data Science roots · Paris
$ farid --now
→ agents · RAG · LLM evaluation · inference (CUDA/vLLM, learning)
$ farid --motto
→ Tatakae.
```
Name: `Hi, I'm Farid.` Personality chip row (no clichés):
`Builder · AI Engineer · Anime & philosophy · Cracked engineer in the making`.
Magnetic CTA (JS, reduced-motion aware) + subtle animated gradient on the name
(disabled under reduced-motion).

### 2. "What I build"  (merges old *What I do* + Toolbox)
- Drop the cliché tagline. Heading: **"What I build"**, no filler subtitle.
- Keep the capability cards: RAG & retrieval, Agents & MCP, Evaluation & LLMOps,
  ML Engineering, Research interests (warmer first-person copy).
- **One flat, de-grouped tool list** (no "LLM & Agents / Evaluation" buckets) — a single
  scannable pill cloud, enriched from the CVs:
  LangGraph, LangChain, MCP, RAG, FAISS, Weaviate, Qdrant, pgvector, Chroma, Ollama, vLLM,
  LangFuse, RAGAS, LLM-as-Judge, MLflow, QLoRA, fine-tuning, structured output/Pydantic,
  FastAPI, Docker, Kubernetes, GitHub Actions, GCP (Cloud Run · Vertex AI · BigQuery),
  AWS (ECS · Lambda · S3), Azure, PostgreSQL, Redis, Python, SQL.

### 3. Projects (rewritten from latest READMEs — 6 cards, scroll rail, featured first)
1. **Rebuilding the Cerebras Knowledge Base** (`cerebras_knowledge_base`) — the journey:
   naive vector → hybrid (dense + BM25-lite + RRF) → LLM reranker → planner/tools/synthesis
   → **MCP server** → web UI. Metric secondary (rerank lifted MRR to ~0.90). Tags:
   Python · pgvector · Hybrid+Rerank · MCP. Links: GitHub **+ Blog series**.
2. **Video Intelligence** (`video-summarizer`) — multi-agent pipeline: videos → structured
   reports (summary, chapters, quotes, action items), cost-aware model routing, per-stage
   tracing, captions-first. Tags: yt-dlp · Whisper · Ollama · Claude/GPT.
3. **PPD2 AI Platform** (local) — RAG over 21,198 international-development projects;
   GPT-4o + FAISS; pure-async FastAPI (no LangGraph) + Streamlit; offline eval +
   observability. Link → GitHub profile (repo not public). Tags: FastAPI · FAISS · GPT-4o · RAG.
4. **Monitor Agent** (`website-monitoring-agent`) — natural-language website monitoring;
   Scout→Analyst→Reporter→Action; structured + visual diff; MCP server; human-in-the-loop
   approval. Tags: MCP · FastAPI · Next.js · Agents.
5. **Voice Consent Gate** (`voice-cloning`) — privacy-first multilingual voice-cloning
   consent gate; local XTTS v2; fully on-device. Tags: XTTS v2 · Whisper · Gradio.
6. **Multilingual Text-to-SQL** (`multilingual-text-2-sql`) — NL→SQL in any language;
   LangGraph pipeline; RAG over schema (FAISS); 3-layer injection guards; MLflow.
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

### 5. Journey (Parcours) — 1–2 sentences each, what was worked on (not results), no Fiverr
- **AI Engineer · DiGreen Advisory** (2025–present) — Production GenAI for RegTech: a
  LangGraph supervisor with specialized sub-agents, a Weaviate RAG knowledge base, and
  sovereignty/security (AES-256 anonymization, zero-retention) with continuous evaluation.
- **Freelance AI Engineer** (2025–present) — End-to-end agentic AI and RAG chatbots for
  international clients, from scoping to production. (No employer named.)
- **Data Scientist · Sogeti (Capgemini)** (2023–2024) — Hybrid Content-Based + RAG
  recommendation with LangChain / Llama-3 / FAISS, an LLM evaluation suite, and Azure
  MLOps pipelines.
- **Education:** Engineering degree — Applied Mathematics, AI track · CY Tech (2021–2024).
- **Certifications:** Deep Learning Specialization, Neural Networks with PyTorch (IBM),
  TOEIC 955.

### 6. Beyond code — keep 4 cards, warmer English copy.

### 7. Contact — simplified
- Heading: **"How to reach me"**. Drop the "Want to work on an AI project?" block.
- Three clickable items: Email (`mailto:mohamedgnank@gmail.com`),
  GitHub (`github.com/faridgnank02`), LinkedIn (`/in/farid-gnankambary-a617821b2/`).

## Motion system
- Reveal-on-scroll on all major blocks (extend existing `[data-reveal]`).
- Card hover: `translateY(-3px)` + accent-tinted border + soft shadow.
- Magnetic CTA (small JS transform, disabled under reduced-motion).
- Hero name gradient shimmer (CSS, disabled under reduced-motion).
- Everything respects `@media (prefers-reduced-motion: reduce)`.

## Files touched / added
- `index.html` — English-primary reorder, hero (pseudo + Tatakae + chips), merged
  "What I build", rewritten projects, new "Writing" section, journey rewrite, simplified
  contact.
- `assets/styles.css` — chips, featured card, hover glows, gradient name, flat tool cloud,
  article/blog styles.
- `assets/script.js` — magnetic CTA; default lang → EN; small manifest loader for the
  homepage "Writing" section.
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
