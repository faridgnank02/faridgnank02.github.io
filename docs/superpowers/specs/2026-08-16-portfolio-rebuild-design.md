# Portfolio Rebuild — Farid Gnankambary (fr_trenton02)

## Goal
Rebuild `faridgnank02.github.io` as an **indie-builder / personal-brand portfolio** inspired by the structure and tone of `walidkoussa.com`, while showcasing Farid's real engineering depth (AI agents, RAG, LLMOps, evaluation). Primary audience: personal brand, clients and peers interested in AI engineering. English default, French toggle.

## Context Gathered
- Resumes/CV (extracted from PDFs): AI Engineer / GenAI Consultant. Strengths: LLM evaluation (LangFuse, LLM-as-Judge, RAGAS, drift/hallucination), agentic architectures (LangGraph supervisor + sub-graphs, MCP), security/sovereignty (AES-256, zero-retention, multi-tenant), RAG (Weaviate, FAISS, hybrid). Metrics: +250 controls automated, +18% matching relevance, 21,198 projects analyzed.
- Experience: DiGreen Advisory (Ingénieur IA, SaaS production, 04/2025–now), Sogeti/Capgemini (Data Scientist alternance 2023–2024), Fiverr freelance (06/2025–now), OUIcoding internship (2023).
- GitHub (10 original repos) shows hands-on independent building.

## Decisions Made
1. **Direction**: Personal brand / indie builder, not a plain resume dump.
2. **Language**: Bilingual FR/EN toggle; **English is default**. Stored in `localStorage`. Blog posts are single-language (FR or EN as written) — toggle affects only bilingual pages.
3. **No chatbot** section. Static site only, free hosting, no API keys.
4. **Build approach**: Evolve current plain HTML/CSS/JS. Multi-page. Deploy via `git push` to GitHub Pages.
5. **Blog**: Real blog on-site (separate pages). Posts are FR or EN as written. `blog/index.html` listing + per-post pages.
6. **Style**: Dark theme, electric **cyan/teal** accent, Space Grotesk headings + Inter body, monospace accents for the handle, subtle grid/noise background, animated stat counters, card hover effects, smooth scroll.

## Design System

### Palette
- Background: `#0B0F14` (near-black)
- Surface (cards): `#131A22`
- Surface hover: `#1A2430`
- Text primary: `#E6EDF3`
- Text secondary: `#9BA8B4`
- Text muted: `#6B7785`
- Accent primary: `#22D3EE` (cyan-400)
- Accent secondary: `#0EA5E9` (sky-500)
- Border: `#223040`
- Border hover: `#22D3EE`
- Success/green (optional stats): `#34D399`

### Typography
- Display font: **Space Grotesk** (Google Fonts) for headings + hero handle
- Body font: **Inter** (Google Fonts)
- Mono font: **JetBrains Mono** for the `fr_trenton02` handle, code tags, tech badges
- Sizes: h1 clamp(2.5rem, 6vw, 4.5rem), h2 2rem, h3 1.25rem, body 1rem

### Layout
- Max-width: 1200px, centered
- Sections: 5rem padding top/bottom
- Cards: dark surface, border-radius 12px, 1px border, padding 2rem, hover border-accent + translateY(-2px)
- Background: subtle radial grid / noise, no heavy effects

## Site Architecture & Files

```
gh_website/
├── index.html                  # Home (EN default, FR toggle)
├── about.html                  # À propos (bilingual)
├── skills.html                 # Skills overview + tool stack (bilingual)
├── experience.html             # Latest work history (bilingual)
├── education.html              # Formation (bilingual)
├── contact.html                # Contact info (bilingual)
├── projects.html               # Full projects grid (bilingual, incl. alternates)
├── blog/
│   ├── index.html              # Blog listing (auto-sorted)
│   ├── _template.html          # Post scaffold
│   └── <slug>.html             # Posts (FR or EN)
├── assets/
│   ├── styles.css              # Shared stylesheet
│   ├── script.js               # Nav, toggle, scroll, counters, blog rendering
│   └── new-post.js             # Node scaffold script (dev tool)
└── docs/superpowers/...        # Specs & plans
```

Nav (present on all pages, in order): **Skills · Projects · À propos · Blog · Contact** + FR/EN toggle. Active page highlighted.

## Home Page Sections (top to bottom)

1. **Hero** — handle `fr_trenton02` (mono, accent), name **Farid GNANKAMBARY**, punchy tagline in walidkoussa spirit (EN default, FR alt) e.g. *"I build AI agents and make data talk."* Subtitle with positioning (AI Engineer — Agents · RAG · LLMOps · LLM Evaluation). Animated stats strip. CTAs: *"View projects"* + *"Contact me"*.
2. **Skills overview + tool stack** — intro of what he does + categorized tool stack grid (LLMs & Agents / Cloud & Infra / Data stores / Evaluation & LLMOps / Languages).
3. **Projects** — 6 featured cards (icon, title, 1-line, tech tags, GitHub link). CTA button → `/projects.html`.
4. **Latest work history** — compact timeline of most relevant roles (DiGreen, Sogeti/Capgemini, Fiverr) with impact metrics. Link → `/experience.html`.
5. **Formation** — compact: CY Tech degree + certifications. Link → `/education.html`.
6. **About teaser** — short "Who I am" blurb + link → `/about.html`.
7. **Contact** — email, phone, GitHub, LinkedIn, location + link → `/contact.html`.
8. **Footer** — nav links, socials, copyright, back-to-top.

## Featured Projects (order fixed)

| # | Repo | Display name | One-liner |
|---|------|--------------|-----------|
| 1 | `cerebras_knowledge_base` | **Knowbase** | From-scratch RAG knowledge base over FastAPI's corpus: vector + full-text + LLM reranker (MRR 0.90), exposed as CLI, MCP server & web UI. |
| 2 | `voice-cloning` | **Voice Clone Consent Gate** | Privacy-first local voice cloning with a multilingual consent gate and cross-lingual synthesis (XTTS v2) — no external APIs. |
| 3 | `production-ai-app` (PPD2) | **PPD2 AI Platform** | Agentic RAG platform analyzing 21,198 international development projects: AdaptiveRouter 8-step pipeline, FAISS, security layers, FastAPI + Streamlit. |
| 4 | `website-monitoring-agent` | **Monitor Agent** | Enterprise website-change monitoring: multi-agent pipeline, MCP server, human-in-the-loop approvals, real-time Next.js dashboard. |
| 5 | `video-summarizer` | **Video Intelligence** | Agentic video analysis into structured reports — summary, chapters, quotes — with cost-aware model routing and per-stage tracing. |
| 6 | `multilingual-text-2-sql` | **Multilingual Text-to-SQL** | Natural language → SQL in FR/EN/ES/DE via LangGraph 8-node pipeline, RAG, anti-injection layers, MLflow + CI/CD. |

Other repos (attack detection, image captioning, energy chatbot, PPO, Rennes Data Challenge) appear on `/projects.html` only. Note: `multi-agent-generator` is NOT featured.

## Blog System

- Posts live as HTML in `blog/` (Approach A). Each post has a header block: title, date, lang (FR/EN), tags, optional thumbnail.
- `blog/index.html` lists posts, newest first, showing title/date/tags; auto-regenerated by `new-post.js`.
- `blog/_template.html` — ready-made shell with head/nav/footer wired.
- `new-post.js` (Node): `node new-post.js "Title" [fr|en]` scaffolds a post file, fills date/slug, re-sorts index.
- Language handling: posts are single-language. On a post page, the FR/EN toggle links back to bilingual pages (does not translate post content).
- Writing workflow: copy template (or run script) → fill header → write HTML body → regenerate index → `git push`.

## Language Toggle
- Default **EN**. Toggle stored in `localStorage` (`site-lang`).
- Bilingual pages carry both versions via `data-fr` / `data-en` attributes; JS swaps on toggle (existing mechanism reused/simplified).
- Non-blog pages all bilingual; blog posts single-language.

## Technical Notes
- Pure HTML/CSS/JS, no build step, no framework. Deploy = `git push` to `faridgnank02.github.io` (GitHub Pages).
- Fonts via Google Fonts (Space Grotesk, Inter, JetBrains Mono). No icon font dependency — use inline SVG or Unicode where needed.
- Responsive (mobile-first). Nav collapses to hamburger on mobile.
- Scroll reveal via IntersectionObserver (subtle).
- SEO meta tags updated on all pages. `<html lang>` set per page default (en).
- No external analytics; no contact form (contact page = direct links/mailto).

## Out of Scope
- AI chatbot / interactive widget.
- Contact form.
- Analytics.
- Converting blog to Markdown/Jekyll.
