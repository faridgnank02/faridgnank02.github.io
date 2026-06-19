# Portfolio Redesign — Farid Gnankambary

## Goal
Redesign the portfolio website from hacker/terminal aesthetic to a modern, minimal, professional consulting-style site. Update all content to match the candidate's current CV (AI Engineering Consultant specializing in GenAI, Agents, RAG, MLOps).

## Design System

### Palette
- Background: `#FAFAFA`
- Surface (cards): `#FFFFFF`
- Text primary: `#0F172A` (slate-900)
- Text secondary: `#475569` (slate-600)
- Text muted: `#94A3B8` (slate-400)
- Accent primary: `#2563EB` (blue-600)
- Accent secondary: `#0EA5E9` (sky-500)
- Border: `#E2E8F0` (slate-200)
- Border hover: `#2563EB`

### Typography
- Font: Inter (Google Fonts), sans-serif
- Sizes: h1 clamp(2.5rem, 5vw, 4rem), h2 2rem, h3 1.25rem, body 1rem
- Weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Layout
- Max-width: 1200px, centered
- Sections: 5rem padding top/bottom
- Cards: white background, border-radius 12px, box-shadow subtle, padding 2rem

## Sections

### Header
- Fixed navbar, white background, bottom border
- Logo: "Farid Gnankambary" bold
- Nav links: About, Skills, Experience, Projects, Education, Contact
- Language switch: FR/EN toggle
- Mobile: hamburger menu

### Hero
- Full viewport height, centered
- Title: "AI Engineering Consultant"
- Subtitle: "GenAI - Agents IA - RAG - MLOps - Prototypage"
- Tagline: "Concevoir des prototypes IA à forte valeur métier — du concept à la production"
- Taglines (EN version)
- Two CTA buttons: "Me contacter" and "Voir mes projets"
- Subtle background gradient or pattern

### About
- Two-column layout
- Left: professional photo/avatar + key info (email, phone, location, languages)
- Right: professional summary paragraph from CV
- Stats row: experience years, projects completed, etc.

### Skills
- 4-card grid:
  1. IA Generative & Agents (LLM, LangGraph, RAG, MCP, Ollama, Fine-tuning, Vector Stores)
  2. MLOps & Cloud (Docker, Kubernetes, AWS, CI/CD, MLflow, LangFuse, FastAPI)
  3. Data & ML (PyTorch, NLP, ETL, LLM Evaluation, Python, SQL)
  4. Soft Skills (Communication, Agile, Documentation, Tech Watch)

### Experience
- Vertical timeline, clean design
- Entries:
  1. **DiGreen Advisory** — Paris — 04/2025–Present — Ingénieur IA
     - Di Tech Control SaaS, Di Tech Decision (LangGraph), MCP, LangFuse evaluation, agent drift correction
  2. **Fiverr** — Remote — 06/2025–Present — Développeur IA Freelance
     - Agentic systems, chatbots, cloud deployment
  3. **Sogeti (Capgemini)** — Issy-les-Moulineaux — 11/2023–11/2024 — Data Scientist
     - Recommendation system, MLOps Azure, LLM benchmarking
  4. **OUIcoding** — Paris — 06/2023–09/2023 — ML Engineer Intern
     - NLP pipeline, predictive modeling, GCP MLOps

### Projects
- 6-card grid:
  1. Plateforme IA Multi-Agents (Analyse de Projets)
  2. Générateur Text-to-SQL Multilingue
  3. LLM Decision System (Évaluation Automatique)
  4. Website Monitoring Agent
  5. Video Summarizer
  6. Smart Energy Consumption Chatbot

Each card: icon, title, short description, tech tags, GitHub link.

### Education
- Timeline:
  1. Diplôme d'Ingénieur — Mathématiques Appliquées, spécialité IA — CY Tech (2021–2024)
  2. Classes Préparatoires Scientifiques — Lycée Ibn Al Ghazi (2019–2021)
- Certifications: Deep Learning Specialization, Neural Networks with PyTorch

### Contact
- Two-column layout:
  - Left: contact info (email, phone, location, GitHub, LinkedIn)
  - Right: contact form (name, email, subject, message)
- Clean, minimal design, no terminal theme

### Footer
- Social links (GitHub, LinkedIn, Email)
- Copyright line

## Technical Notes
- Pure HTML/CSS/JS (no framework)
- Remove all Matrix, glitch, neon, terminal effects
- Keep bilingual FR/EN system (simplified from current)
- Keep scroll animations (subtler, using Intersection Observer)
- Responsive design (mobile-first)
- SEO meta tags updated

## Files
- `index.html` — rewritten
- `styles.css` — rewritten
- `script.js` — simplified, removing Matrix/particle effects
