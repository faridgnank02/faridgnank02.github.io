# Engaging Portfolio Redesign — Design Spec

**Date:** 2026-08-17
**Goal:** Make faridgnank02.github.io more dynamic and engaging, in the spirit of
walidkoussa.com, while keeping Farid's professional AI-engineer tone. Enhance the
existing single-page site in place; do not rebuild.

## Constraints

- **Static only.** GitHub Pages hosting. No backend, no build step. Vanilla JS, one
  CSS file, one HTML file (current structure: `index.html`, `assets/styles.css`,
  `assets/script.js`).
- **No chatbot.** The reference site's AI agent is out of scope.
- **No decorative stat counters / vanity numbers** (no "142K lines of code" style).
  Real, meaningful project results (e.g. retrieval MRR) are allowed but must be
  secondary, never the headline.
- **Keep** the FR/EN i18n system, the terminal hero concept, section order, the
  teal (`--accent`) / indigo (`--accent2`) light palette, and `prefers-reduced-motion`
  gating.
- **Balanced vibe:** warmer, first-person, a bit of personality — not gimmicky.

## Sections & changes

### 1. Hero
- Keep terminal block + typewriter reveal.
- Add a compact **personality chip row** under the subtitle (Walid's archetype energy,
  no numbers). FR/EN via `.i18n`. Example set:
  `Builder · Researcher · Anime & philosophie · Obsédé par les preuves`.
- CTA button: hover-lift + subtle magnetic feel (transform on mousemove, small).
- Subtle animated gradient accent behind the name (`--accent`→`--accent2`), reduced-motion
  disables the animation.

### 2. What I do
- Keep the 5 cards + toolbox.
- Warmer first-person copy tweaks.
- Toolbox pill groups: keep static grid (no autoscroll marquee — avoids motion noise);
  add hover state on pills.

### 3. Projects (largest content change)
Rewrite all 6 cards from the real GitHub READMEs / local project, in Farid's voice.
Keep the scroll rail + arrows. First card gets a "featured" visual treatment
(slightly larger, accent border). Richer hover: lift + accent border glow.

Six cards, accurate stacks and links:

1. **Rebuilding Cerebras Knowledge Base** — `cerebras_knowledge_base`.
   Emphasize the *journey*, not the metric: from plain vector search → hybrid
   (dense + BM25-lite, RRF) → LLM reranker → an `ask` planner with tools, exposed as
   CLI + **MCP server** + web UI. Metric allowed but secondary (reranking took retrieval
   MRR to 0.90). Tags: Python · pgvector · Hybrid+Rerank · MCP.
2. **Video Intelligence** — `video-summarizer`. Multi-agent pipeline turning videos into
   structured reports (summary, chapters, quotes, action items) with cost-aware model
   routing and per-stage tracing. Tags: yt-dlp · Whisper · Ollama · Claude/GPT.
3. **PPD2 AI Platform** — local (`~/Desktop/x/Agentic Project/production-ai-app`).
   RAG over 21,198 international-development projects; GPT-4o + FAISS; pure-async FastAPI
   (no LangGraph) + Streamlit; offline eval + observability. Link → GitHub profile (repo
   not public). Tags: FastAPI · FAISS · GPT-4o · RAG.
4. **Monitor Agent** — `website-monitoring-agent`. Natural-language website monitoring;
   Scout→Analyst→Reporter→Action agents; structured + visual diff; human-in-the-loop
   approval. Tags: LangGraph-style agents · MCP · FastAPI · Next.js.
5. **Voice Consent Gate** — `voice-cloning`. Privacy-first multilingual voice-cloning
   consent gate; local XTTS v2; all on-device. Tags: XTTS v2 · Whisper · Gradio.
6. **Multilingual Text-to-SQL** — `multilingual-text-2-sql`. NL→SQL in any language;
   auto language detection; LangChain/LangGraph + FAISS; injection guards; MLflow.
   Tags: LangGraph · FAISS · MLflow.

### 4. Parcours (Journey)
- No content change; add consistent reveal timing.

### 5. Beyond code
- Keep 4 cards; warmer copy.

### 6. Contact + Footer
- No structural change.

## Motion system
- Reveal-on-scroll on all major blocks (extend existing `[data-reveal]`).
- Card hover: `translateY(-3px)` + accent-tinted border + soft shadow.
- CTA magnetic hover (small, JS-driven, disabled under reduced-motion).
- Hero name gradient shimmer (CSS animation, disabled under reduced-motion).
- All new motion respects `@media (prefers-reduced-motion: reduce)`.

## Files touched
- `index.html` — hero chip row, rewritten project cards, minor copy.
- `assets/styles.css` — chip row, featured card, hover glows, gradient name, marquee-free.
- `assets/script.js` — magnetic CTA handler (reduced-motion aware). Keep existing lang/
  typewriter/reveal/spy/rail logic.

## Out of scope
- AI chatbot, dark mode, multi-page routing, framework migration, new build tooling.

## Success criteria
- Site feels noticeably more alive (motion, personality) but stays professional.
- All 6 project cards reflect real, accurate project content and links.
- No vanity numbers. Works FR + EN. Reduced-motion clean. Still a static site that
  deploys to GitHub Pages unchanged.
