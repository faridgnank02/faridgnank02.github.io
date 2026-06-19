# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite portfolio from hacker/terminal aesthetic to modern minimal professional consulting style, with updated CV content.

**Architecture:** Single-page static site (HTML + CSS + JS), no framework. Bilingual FR/EN via JS. Clean modular sections.

**Tech Stack:** Pure HTML/CSS/JS, Google Fonts (Inter), Font Awesome 6

---

### Task 1: Rewrite `index.html`

**Files:**
- Rewrite: `index.html`

- [ ] **Step 1: Write the complete HTML file**

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Farid Gnankambary - AI Engineering Consultant</title>
    <meta name="description" content="Farid Gnankambary - AI Engineering Consultant spécialisé en GenAI, Agents IA, RAG et MLOps">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="header">
        <nav class="nav-container">
            <a href="#" class="logo">Farid Gnankambary</a>
            <ul class="nav-links" id="navLinks">
                <li><a href="#about" data-fr="À propos" data-en="About">À propos</a></li>
                <li><a href="#skills" data-fr="Compétences" data-en="Skills">Compétences</a></li>
                <li><a href="#experience" data-fr="Expérience" data-en="Experience">Expérience</a></li>
                <li><a href="#projects" data-fr="Projets" data-en="Projects">Projets</a></li>
                <li><a href="#education" data-fr="Formation" data-en="Education">Formation</a></li>
                <li><a href="#contact" data-fr="Contact" data-en="Contact">Contact</a></li>
            </ul>
            <div class="nav-actions">
                <div class="lang-switch">
                    <button class="lang-btn active" data-lang="fr" onclick="switchLanguage('fr')">FR</button>
                    <button class="lang-btn" data-lang="en" onclick="switchLanguage('en')">EN</button>
                </div>
                <button class="mobile-menu-btn" onclick="toggleMobileMenu()" aria-label="Menu">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
        </nav>
    </header>

    <main>
        <!-- Hero -->
        <section class="hero">
            <div class="container">
                <div class="hero-content">
                    <div class="lang-content active" data-lang="fr">
                        <p class="hero-label">AI Engineering Consultant</p>
                        <h1 class="hero-title">Farid Gnankambary</h1>
                        <p class="hero-subtitle">GenAI &bull; Agents IA &bull; RAG &bull; MLOps &bull; Prototypage</p>
                        <p class="hero-description">Concevoir des prototypes IA à forte valeur métier — du concept à la production</p>
                    </div>
                    <div class="lang-content" data-lang="en">
                        <p class="hero-label">AI Engineering Consultant</p>
                        <h1 class="hero-title">Farid Gnankambary</h1>
                        <p class="hero-subtitle">GenAI &bull; AI Agents &bull; RAG &bull; MLOps &bull; Prototyping</p>
                        <p class="hero-description">Designing high-business-value AI prototypes — from concept to production</p>
                    </div>
                    <div class="hero-buttons">
                        <a href="#contact" class="btn btn-primary">
                            <i class="fas fa-paper-plane"></i>
                            <span data-fr="Me contacter" data-en="Contact me">Me contacter</span>
                        </a>
                        <a href="#projects" class="btn btn-outline">
                            <i class="fas fa-code"></i>
                            <span data-fr="Voir mes projets" data-en="View my projects">Voir mes projets</span>
                        </a>
                    </div>
                    <div class="hero-stats">
                        <div class="hero-stat-item">
                            <span class="hero-stat-number">2+</span>
                            <span class="hero-stat-label" data-fr="Années d'expérience" data-en="Years experience">Années d'expérience</span>
                        </div>
                        <div class="hero-stat-divider"></div>
                        <div class="hero-stat-item">
                            <span class="hero-stat-number">8+</span>
                            <span class="hero-stat-label" data-fr="Projets IA livrés" data-en="AI projects delivered">Projets IA livrés</span>
                        </div>
                        <div class="hero-stat-divider"></div>
                        <div class="hero-stat-item">
                            <span class="hero-stat-number">4</span>
                            <span class="hero-stat-label" data-fr="Clients enterprise" data-en="Enterprise clients">Clients enterprise</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- About -->
        <section id="about" class="section section-alt">
            <div class="container">
                <h2 class="section-title fade-in">
                    <span data-fr="À propos" data-en="About me">À propos</span>
                </h2>
                <div class="about-grid">
                    <div class="about-photo fade-in">
                        <div class="photo-placeholder">
                            <i class="fas fa-user-astronaut"></i>
                        </div>
                        <div class="photo-info">
                            <p><i class="fas fa-envelope"></i> mohamedgnank@gmail.com</p>
                            <p><i class="fas fa-phone"></i> +33 (0)7 85 47 23 87</p>
                            <p><i class="fas fa-map-marker-alt"></i> Île-de-France, France</p>
                            <p><i class="fas fa-globe"></i> FR (Natif) | EN (Courant - TOEIC 955)</p>
                        </div>
                    </div>
                    <div class="about-text fade-in">
                        <div class="lang-content active" data-lang="fr">
                            <p>Ingénieur IA diplômé en Mathématiques Appliquées (CY Tech), spécialisé en conception et déploiement de systèmes LLM, agents IA et pipelines RAG en environnement enterprise et SaaS. 2+ ans d'expérience en prototypage rapide, orchestration d'agents (LangGraph), workflows LLM et MLOps (Docker, Kubernetes, AWS, Azure) chez Capgemini et DiGreen Advisory.</p>
                            <p>Expert en développement de démonstrateurs IA orientés valeur métier : intégration d'APIs tierces, stratégies de prompting maintenables, évaluation LLM (LangFuse, LLM-as-Judge) et MCP (Model Context Protocol) pour connecter les agents à des sources de vérité réglementaires en temps réel. Habitué à collaborer avec des équipes produit, experts métiers et architectes en contexte Agile.</p>
                        </div>
                        <div class="lang-content" data-lang="en">
                            <p>AI Engineer with a degree in Applied Mathematics (CY Tech), specialized in designing and deploying LLM systems, AI agents and RAG pipelines in enterprise and SaaS environments. 2+ years of experience in rapid prototyping, agent orchestration (LangGraph), LLM workflows and MLOps (Docker, Kubernetes, AWS, Azure) at Capgemini and DiGreen Advisory.</p>
                            <p>Expert in developing business-value-driven AI demonstrators: third-party API integration, maintainable prompting strategies, LLM evaluation (LangFuse, LLM-as-Judge) and MCP (Model Context Protocol) to connect agents to real-time regulatory sources of truth. Experienced collaborating with product teams, business experts and architects in Agile environments.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Skills -->
        <section id="skills" class="section">
            <div class="container">
                <h2 class="section-title fade-in">
                    <span data-fr="Compétences" data-en="Skills">Compétences</span>
                </h2>
                <div class="skills-grid">
                    <div class="skill-card fade-in">
                        <div class="skill-icon-wrapper">
                            <i class="fas fa-brain"></i>
                        </div>
                        <h3>IA Generative & Agents</h3>
                        <ul>
                            <li>LLM / RAG / Agents IA (LangGraph, LangChain)</li>
                            <li>MCP (Model Context Protocol)</li>
                            <li>Ollama, HuggingFace, Llama-3, Mistral-7B</li>
                            <li>Prompt Engineering, Structured Output (Pydantic)</li>
                            <li>Fine-tuning (QLoRA), Embeddings</li>
                            <li>Vector Stores (FAISS, Chroma)</li>
                        </ul>
                    </div>
                    <div class="skill-card fade-in">
                        <div class="skill-icon-wrapper">
                            <i class="fas fa-cloud"></i>
                        </div>
                        <h3>MLOps & Cloud</h3>
                        <ul>
                            <li>Docker, Kubernetes</li>
                            <li>AWS (ECS, EC2, S3, Lambda)</li>
                            <li>CI/CD (GitHub Actions, Jenkins)</li>
                            <li>MLflow (tracking, monitoring, déploiement)</li>
                            <li>LangFuse (tracing, evaluation, scoring LLM)</li>
                            <li>FastAPI, REST APIs, Architecture SaaS</li>
                        </ul>
                    </div>
                    <div class="skill-card fade-in">
                        <div class="skill-icon-wrapper">
                            <i class="fas fa-database"></i>
                        </div>
                        <h3>Data & ML</h3>
                        <ul>
                            <li>PyTorch, TensorFlow, scikit-learn, XGBoost</li>
                            <li>NLP : NER, Classification, Embeddings</li>
                            <li>ETL, Parsing PDF, Anonymisation PII (RGPD)</li>
                            <li>Évaluation LLM (RAGAS, NDCG, hallucination)</li>
                            <li>Python, SQL, R</li>
                            <li>Data pipelines structurés/non-structurés</li>
                        </ul>
                    </div>
                    <div class="skill-card fade-in">
                        <div class="skill-icon-wrapper">
                            <i class="fas fa-users"></i>
                        </div>
                        <h3>Soft Skills</h3>
                        <ul>
                            <li>Communication technique & vulgarisation</li>
                            <li>Collaboration équipes produit/métier/architecture</li>
                            <li>Méthodologies Agiles (Scrum, Kanban)</li>
                            <li>Documentation technique & expérimentations</li>
                            <li>Veille technologique IA</li>
                            <li>Animation de démonstrations clients</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- Experience -->
        <section id="experience" class="section section-alt">
            <div class="container">
                <h2 class="section-title fade-in">
                    <span data-fr="Expérience" data-en="Experience">Expérience</span>
                </h2>
                <div class="timeline">
                    <div class="timeline-item fade-in">
                        <div class="timeline-marker"></div>
                        <div class="timeline-card">
                            <div class="timeline-date">04/2025 — Présent</div>
                            <h3>Ingénieur IA</h3>
                            <p class="timeline-company">DiGreen Advisory — Paris</p>
                            <div class="lang-content active" data-lang="fr">
                                <ul>
                                    <li>Conçu et mis en production (SaaS) Di Tech Control : automatisation de +250 points de contrôle internes via pipelines LLM</li>
                                    <li>Architecture souveraine multi-tenant : anonymisation AES-256, zero-retention LLM, isolation des données clients</li>
                                    <li>Conçu Di Tech Decision : agent décisionnel RegTech en LangGraph (superviseur + 4 sous-graphes)</li>
                                    <li>Intégré un MCP connecté à des bases réglementaires pour injection temps réel</li>
                                    <li>Évaluation continue LangFuse + monitoring MLflow sur AWS Docker scalable</li>
                                </ul>
                            </div>
                            <div class="lang-content" data-lang="en">
                                <ul>
                                    <li>Designed and shipped (SaaS) Di Tech Control: automated 250+ internal control points via LLM pipelines</li>
                                    <li>Sovereign multi-tenant architecture: AES-256 anonymization, zero-retention LLM, client data isolation</li>
                                    <li>Built Di Tech Decision: RegTech decision agent in LangGraph (supervisor + 4 sub-graphs)</li>
                                    <li>Integrated MCP connected to regulatory databases for real-time data injection</li>
                                    <li>Continuous evaluation with LangFuse + MLflow monitoring on scalable AWS Docker infrastructure</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="timeline-item fade-in">
                        <div class="timeline-marker"></div>
                        <div class="timeline-card">
                            <div class="timeline-date">06/2025 — Présent</div>
                            <h3>Développeur IA Freelance</h3>
                            <p class="timeline-company">Fiverr — Remote</p>
                            <div class="lang-content active" data-lang="fr">
                                <ul>
                                    <li>Conçu et livré des systèmes IA agentiques (LangGraph, RAG, FastAPI) pour clients internationaux</li>
                                    <li>Chatbots IA et pipelines LLM end-to-end : ingestion, indexation vectorielle, API REST, monitoring</li>
                                    <li>Déploiement cloud AWS (EC2, S3, Lambda) avec Docker et GitHub Actions CI/CD</li>
                                </ul>
                            </div>
                            <div class="lang-content" data-lang="en">
                                <ul>
                                    <li>Designed and delivered agentic AI systems (LangGraph, RAG, FastAPI) for international clients</li>
                                    <li>AI chatbots and end-to-end LLM pipelines: ingestion, vector indexing, REST API, monitoring</li>
                                    <li>AWS cloud deployment (EC2, S3, Lambda) with Docker and GitHub Actions CI/CD</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="timeline-item fade-in">
                        <div class="timeline-marker"></div>
                        <div class="timeline-card">
                            <div class="timeline-date">11/2023 — 11/2024</div>
                            <h3>Data Scientist — Alternant</h3>
                            <p class="timeline-company">Sogeti (Groupe Capgemini) — Issy-les-Moulineaux</p>
                            <div class="lang-content active" data-lang="fr">
                                <ul>
                                    <li>Système de recommandation hybride (Content-Based + RAG) avec LangChain, Llama-3, FAISS : +18% de pertinence</li>
                                    <li>Suite d'évaluation Python (NDCG/Recall, équité, hallucination via LLM-as-Judge)</li>
                                    <li>Pipelines MLOps Azure bout-en-bout : parsing PDF, anonymisation PII, structuration LLM</li>
                                    <li>Benchmarking Content-Based vs RAG ; CI/CD GitHub Actions et déploiement Docker/ECS</li>
                                </ul>
                            </div>
                            <div class="lang-content" data-lang="en">
                                <ul>
                                    <li>Hybrid recommendation system (Content-Based + RAG) with LangChain, Llama-3, FAISS: +18% relevance</li>
                                    <li>Python evaluation suite (NDCG/Recall, fairness, hallucination via LLM-as-Judge)</li>
                                    <li>End-to-end Azure MLOps pipelines: PDF parsing, PII anonymization, LLM structuring</li>
                                    <li>Content-Based vs RAG benchmarking; GitHub Actions CI/CD and Docker/ECS deployment</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="timeline-item fade-in">
                        <div class="timeline-marker"></div>
                        <div class="timeline-card">
                            <div class="timeline-date">06/2023 — 09/2023</div>
                            <h3>Machine Learning Engineer — Stagiaire</h3>
                            <p class="timeline-company">OUIcoding — Paris</p>
                            <div class="lang-content active" data-lang="fr">
                                <ul>
                                    <li>Pipeline NLP (NER, POS tagging) sur métadonnées produits pour amélioration SEO</li>
                                    <li>Workflow MLOps sur GCP : entraînement automatisé, API REST, versioning de modèles</li>
                                    <li>POC prédictif retail (prévision ventes + dashboard interactif)</li>
                                </ul>
                            </div>
                            <div class="lang-content" data-lang="en">
                                <ul>
                                    <li>NLP pipeline (NER, POS tagging) on product metadata for SEO improvement</li>
                                    <li>MLOps workflow on GCP: automated training, REST API, model versioning</li>
                                    <li>Retail predictive POC (sales forecasting + interactive dashboard)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Projects -->
        <section id="projects" class="section">
            <div class="container">
                <h2 class="section-title fade-in">
                    <span data-fr="Projets" data-en="Projects">Projets</span>
                </h2>
                <div class="projects-grid">
                    <div class="project-card fade-in">
                        <div class="project-icon"><i class="fas fa-robot"></i></div>
                        <h3>Plateforme IA Multi-Agents</h3>
                        <div class="lang-content active" data-lang="fr">
                            <p>Analyse et classification automatique de 21 000+ projets via système multi-agents LangGraph avec RAG hybride et monitoring LangFuse.</p>
                        </div>
                        <div class="lang-content" data-lang="en">
                            <p>Automated analysis and classification of 21,000+ projects via LangGraph multi-agent system with hybrid RAG and LangFuse monitoring.</p>
                        </div>
                        <div class="project-tech">
                            <span>LangGraph</span><span>RAG</span><span>FastAPI</span><span>FAISS</span><span>Docker</span><span>LangFuse</span>
                        </div>
                        <a href="https://github.com/faridgnank02" class="project-link" target="_blank"><i class="fab fa-github"></i> Voir le projet</a>
                    </div>
                    <div class="project-card fade-in">
                        <div class="project-icon"><i class="fas fa-database"></i></div>
                        <h3 data-fr="Générateur Text-to-SQL Multilingue" data-en="Multilingual Text-to-SQL Generator">Générateur Text-to-SQL Multilingue</h3>
                        <div class="lang-content active" data-lang="fr">
                            <p>Agent LangGraph orchestrant un workflow LLM avec RAG sur schémas SQL, génération supervisée, évaluation automatisée, pipeline CI/CD complet.</p>
                        </div>
                        <div class="lang-content" data-lang="en">
                            <p>LangGraph agent orchestrating an LLM workflow with RAG on SQL schemas, supervised generation, automated evaluation, full CI/CD pipeline.</p>
                        </div>
                        <div class="project-tech">
                            <span>LangChain</span><span>LangGraph</span><span>RAG</span><span>FAISS</span><span>Docker</span><span>K8s</span><span>MLFlow</span>
                        </div>
                        <a href="https://github.com/faridgnank02/multilingual-text-2-sql/tree/main" class="project-link" target="_blank"><i class="fab fa-github"></i> Voir le projet</a>
                    </div>
                    <div class="project-card fade-in">
                        <div class="project-icon"><i class="fas fa-graduation-cap"></i></div>
                        <h3>LLM Decision System</h3>
                        <div class="lang-content active" data-lang="fr">
                            <p>Fine-tuning QLoRA de Mistral-7B + raisonnement Chain-of-Thought pour évaluation automatique avec explications traçables.</p>
                        </div>
                        <div class="lang-content" data-lang="en">
                            <p>QLoRA fine-tuning of Mistral-7B + Chain-of-Thought reasoning for automatic evaluation with traceable explanations.</p>
                        </div>
                        <div class="project-tech">
                            <span>Mistral-7B</span><span>QLoRA</span><span>CoT</span><span>LangFuse</span><span>PyTorch</span>
                        </div>
                        <a href="https://github.com/faridgnank02" class="project-link" target="_blank"><i class="fab fa-github"></i> Voir le projet</a>
                    </div>
                    <div class="project-card fade-in">
                        <div class="project-icon"><i class="fas fa-eye"></i></div>
                        <h3>Website Monitoring Agent</h3>
                        <div class="lang-content active" data-lang="fr">
                            <p>Agent autonome de monitoring avec détection automatique de changements, analyse sémantique et notifications email. Déployé sur AWS.</p>
                        </div>
                        <div class="lang-content" data-lang="en">
                            <p>Autonomous monitoring agent with automatic change detection, semantic analysis and email notifications. Deployed on AWS.</p>
                        </div>
                        <div class="project-tech">
                            <span>LangGraph</span><span>RAG</span><span>FastAPI</span><span>AWS</span><span>Docker</span>
                        </div>
                        <a href="https://github.com/faridgnank02" class="project-link" target="_blank"><i class="fab fa-github"></i> Voir le projet</a>
                    </div>
                    <div class="project-card fade-in">
                        <div class="project-icon"><i class="fas fa-video"></i></div>
                        <h3>Video Summarizer</h3>
                        <div class="lang-content active" data-lang="fr">
                            <p>Plateforme web d'extraction et résumé automatique de contenu vidéo, avec deux modèles d'IA et cadre d'évaluation hybride.</p>
                        </div>
                        <div class="lang-content" data-lang="en">
                            <p>Web platform for automatic video content extraction and summarization, with two AI models and hybrid evaluation framework.</p>
                        </div>
                        <div class="project-tech">
                            <span>Python</span><span>PyTorch</span><span>OpenAI</span><span>Streamlit</span><span>FastAPI</span><span>Docker</span>
                        </div>
                        <a href="https://github.com/faridgnank02/video-summarizer/tree/main" class="project-link" target="_blank"><i class="fab fa-github"></i> Voir le projet</a>
                    </div>
                    <div class="project-card fade-in">
                        <div class="project-icon"><i class="fas fa-home"></i></div>
                        <h3 data-fr="Chatbot Énergie Intelligente" data-en="Smart Energy Chatbot">Chatbot Énergie Intelligente</h3>
                        <div class="lang-content active" data-lang="fr">
                            <p>Plateforme de prédiction et optimisation de consommation énergétique avec ML (Random Forest) et IA générative (TinyLlama).</p>
                        </div>
                        <div class="lang-content" data-lang="en">
                            <p>Energy consumption prediction and optimization platform with ML (Random Forest) and generative AI (TinyLlama).</p>
                        </div>
                        <div class="project-tech">
                            <span>Python</span><span>Flask</span><span>Scikit-learn</span><span>TinyLlama</span><span>HuggingFace</span>
                        </div>
                        <a href="https://github.com/faridgnank02/energy-prediction-chatbot" class="project-link" target="_blank"><i class="fab fa-github"></i> Voir le projet</a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Education -->
        <section id="education" class="section section-alt">
            <div class="container">
                <h2 class="section-title fade-in">
                    <span data-fr="Formation" data-en="Education">Formation</span>
                </h2>
                <div class="timeline">
                    <div class="timeline-item fade-in">
                        <div class="timeline-marker"></div>
                        <div class="timeline-card">
                            <div class="timeline-date">2021 — 2024</div>
                            <h3>Diplôme d'Ingénieur — Mathématiques Appliquées, spécialité IA</h3>
                            <p class="timeline-company">CY Tech — Cergy, France</p>
                            <div class="lang-content active" data-lang="fr">
                                <p class="timeline-desc">Deep Learning | NLP | Reinforcement Learning | AI-based Image Processing | Big Data | GPU Computing | Multiobjective Optimization | Signal Processing</p>
                            </div>
                            <div class="lang-content" data-lang="en">
                                <p class="timeline-desc">Deep Learning | NLP | Reinforcement Learning | AI-based Image Processing | Big Data | GPU Computing | Multiobjective Optimization | Signal Processing</p>
                            </div>
                        </div>
                    </div>
                    <div class="timeline-item fade-in">
                        <div class="timeline-marker"></div>
                        <div class="timeline-card">
                            <div class="timeline-date">2019 — 2021</div>
                            <h3 data-fr="Classes Préparatoires Scientifiques" data-en="Scientific Preparatory Classes">Classes Préparatoires Scientifiques</h3>
                            <p class="timeline-company">Lycée Ibn Al Ghazi — Rabat, Morocco</p>
                        </div>
                    </div>
                </div>
                <div class="certifications fade-in">
                    <h3 data-fr="Certifications" data-en="Certifications">Certifications</h3>
                    <div class="cert-list">
                        <span class="cert-item"><i class="fas fa-certificate"></i> Deep Learning Specialization (DeepLearning.AI)</span>
                        <span class="cert-item"><i class="fas fa-certificate"></i> Neural Networks with PyTorch (IBM)</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Contact -->
        <section id="contact" class="section">
            <div class="container">
                <h2 class="section-title fade-in">
                    <span data-fr="Contact" data-en="Contact">Contact</span>
                </h2>
                <div class="contact-grid">
                    <div class="contact-info fade-in">
                        <h3 data-fr="Restons en contact" data-en="Let's stay in touch">Restons en contact</h3>
                        <div class="contact-item">
                            <i class="fas fa-envelope"></i>
                            <div>
                                <p class="contact-label">Email</p>
                                <a href="mailto:mohamedgnank@gmail.com">mohamedgnank@gmail.com</a>
                            </div>
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-phone"></i>
                            <div>
                                <p class="contact-label">Téléphone</p>
                                <p>+33 (0)7 85 47 23 87</p>
                            </div>
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <div>
                                <p class="contact-label">Localisation</p>
                                <p>Île-de-France, France</p>
                            </div>
                        </div>
                        <div class="contact-item">
                            <i class="fab fa-github"></i>
                            <div>
                                <p class="contact-label">GitHub</p>
                                <a href="https://github.com/faridgnank02" target="_blank">github.com/faridgnank02</a>
                            </div>
                        </div>
                        <div class="contact-item">
                            <i class="fab fa-linkedin"></i>
                            <div>
                                <p class="contact-label">LinkedIn</p>
                                <a href="https://linkedin.com/in/farid-gnankambary-a617821b2/" target="_blank">linkedin.com/in/farid-gnankambary</a>
                            </div>
                        </div>
                    </div>
                    <div class="contact-form fade-in">
                        <form onsubmit="handleFormSubmit(event)">
                            <div class="form-group">
                                <label for="name"><span data-fr="Nom" data-en="Name">Nom</span></label>
                                <input type="text" id="name" name="name" required>
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" name="email" required>
                            </div>
                            <div class="form-group">
                                <label for="subject"><span data-fr="Sujet" data-en="Subject">Sujet</span></label>
                                <input type="text" id="subject" name="subject" required>
                            </div>
                            <div class="form-group">
                                <label for="message"><span data-fr="Message" data-en="Message">Message</span></label>
                                <textarea id="message" name="message" rows="5" required></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary btn-block">
                                <i class="fas fa-paper-plane"></i>
                                <span data-fr="Envoyer" data-en="Send">Envoyer</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <div class="social-links">
                <a href="https://github.com/faridgnank02" class="social-link" target="_blank" aria-label="GitHub"><i class="fab fa-github"></i></a>
                <a href="https://linkedin.com/in/farid-gnankambary-a617821b2/" class="social-link" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                <a href="mailto:mohamedgnank@gmail.com" class="social-link" aria-label="Email"><i class="fas fa-envelope"></i></a>
            </div>
            <p>&copy; 2026 Farid Gnankambary</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>
```

### Task 2: Rewrite `styles.css`

**Files:**
- Rewrite: `styles.css`

- [ ] **Step 1: Write the complete CSS file**

```css
:root {
    --bg: #fafafa;
    --bg-alt: #f1f5f9;
    --surface: #ffffff;
    --text: #0f172a;
    --text-secondary: #475569;
    --text-muted: #94a3b8;
    --accent: #2563eb;
    --accent-hover: #1d4ed8;
    --accent-light: #eff6ff;
    --accent-secondary: #0ea5e9;
    --border: #e2e8f0;
    --shadow: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
    --shadow-md: 0 4px 6px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.04);
    --shadow-lg: 0 10px 15px rgba(0,0,0,0.05), 0 4px 6px rgba(0,0,0,0.03);
    --radius: 12px;
    --radius-sm: 8px;
    --transition: 0.2s ease;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: var(--bg);
    color: var(--text);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

/* Header */
.header {
    position: fixed;
    top: 0;
    width: 100%;
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border);
    z-index: 1000;
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 64px;
}

.logo {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text);
    text-decoration: none;
}

.nav-links {
    display: flex;
    gap: 0.25rem;
    list-style: none;
    align-items: center;
}

.nav-links a {
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius-sm);
    transition: all var(--transition);
}

.nav-links a:hover {
    color: var(--accent);
    background: var(--accent-light);
}

.nav-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.lang-switch {
    display: flex;
    gap: 0.25rem;
}

.lang-btn {
    padding: 0.35rem 0.65rem;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text-secondary);
    border-radius: var(--radius-sm);
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: 500;
    font-family: inherit;
    transition: all var(--transition);
}

.lang-btn.active {
    background: var(--accent);
    color: white;
    border-color: var(--accent);
}

.lang-btn:hover:not(.active) {
    border-color: var(--accent);
    color: var(--accent);
}

.mobile-menu-btn {
    display: none;
    background: none;
    border: 1px solid var(--border);
    color: var(--text-secondary);
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius-sm);
    cursor: pointer;
}

/* Sections */
.section {
    padding: 5rem 0;
}

.section-alt {
    background: var(--bg-alt);
}

.section-title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 3rem;
    color: var(--text);
}

/* Hero */
.hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding-top: 64px;
    background: linear-gradient(135deg, var(--bg) 0%, var(--accent-light) 100%);
}

.hero-content {
    max-width: 800px;
}

.hero-label {
    font-size: 1rem;
    font-weight: 600;
    color: var(--accent);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 1rem;
}

.hero-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
    margin-bottom: 0.75rem;
    color: var(--text);
}

.hero-subtitle {
    font-size: 1.25rem;
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
}

.hero-description {
    font-size: 1.1rem;
    color: var(--text-muted);
    margin-bottom: 2rem;
    max-width: 600px;
    line-height: 1.7;
}

.hero-buttons {
    display: flex;
    gap: 1rem;
    margin-bottom: 3rem;
}

.btn {
    padding: 0.8rem 1.75rem;
    border: none;
    border-radius: var(--radius-sm);
    font-size: 0.95rem;
    font-weight: 500;
    font-family: inherit;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: all var(--transition);
}

.btn-primary {
    background: var(--accent);
    color: white;
}

.btn-primary:hover {
    background: var(--accent-hover);
}

.btn-outline {
    background: transparent;
    color: var(--accent);
    border: 1px solid var(--accent);
}

.btn-outline:hover {
    background: var(--accent-light);
}

.btn-block {
    width: 100%;
    justify-content: center;
}

.hero-stats {
    display: flex;
    gap: 2rem;
    align-items: center;
}

.hero-stat-item {
    text-align: center;
}

.hero-stat-number {
    display: block;
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--accent);
}

.hero-stat-label {
    font-size: 0.85rem;
    color: var(--text-muted);
}

.hero-stat-divider {
    width: 1px;
    height: 40px;
    background: var(--border);
}

/* About */
.about-grid {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 3rem;
    align-items: start;
}

.photo-placeholder {
    width: 200px;
    height: 200px;
    background: var(--accent-light);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4rem;
    color: var(--accent);
    margin-bottom: 1.5rem;
}

.photo-info p {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
}

.photo-info i {
    width: 1.25rem;
    color: var(--accent);
    margin-right: 0.5rem;
}

.about-text p {
    color: var(--text-secondary);
    margin-bottom: 1.25rem;
    font-size: 1.05rem;
    line-height: 1.8;
}

/* Skills */
.skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.5rem;
}

.skill-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.75rem;
    box-shadow: var(--shadow);
    transition: all var(--transition);
}

.skill-card:hover {
    box-shadow: var(--shadow-md);
    border-color: var(--accent);
}

.skill-icon-wrapper {
    width: 44px;
    height: 44px;
    background: var(--accent-light);
    border-radius: var(--radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent);
    font-size: 1.2rem;
    margin-bottom: 1.25rem;
}

.skill-card h3 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1rem;
}

.skill-card ul {
    list-style: none;
}

.skill-card li {
    color: var(--text-secondary);
    font-size: 0.9rem;
    padding: 0.35rem 0;
    position: relative;
    padding-left: 1.25rem;
}

.skill-card li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.75rem;
    width: 6px;
    height: 6px;
    background: var(--accent);
    border-radius: 50%;
}

/* Timeline */
.timeline {
    position: relative;
    padding-left: 2rem;
}

.timeline::before {
    content: '';
    position: absolute;
    left: 7px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--border);
}

.timeline-item {
    position: relative;
    margin-bottom: 2rem;
}

.timeline-marker {
    position: absolute;
    left: -2rem;
    top: 1.5rem;
    width: 16px;
    height: 16px;
    background: var(--accent);
    border: 3px solid var(--bg);
    border-radius: 50%;
    z-index: 1;
}

.timeline-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.75rem;
    box-shadow: var(--shadow);
}

.timeline-date {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--accent);
    margin-bottom: 0.5rem;
}

.timeline-card h3 {
    font-size: 1.15rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
}

.timeline-company {
    color: var(--text-muted);
    font-size: 0.9rem;
    margin-bottom: 1rem;
}

.timeline-card ul {
    list-style: none;
}

.timeline-card li {
    color: var(--text-secondary);
    font-size: 0.9rem;
    padding: 0.35rem 0;
    padding-left: 1.25rem;
    position: relative;
}

.timeline-card li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.75rem;
    width: 6px;
    height: 6px;
    background: var(--accent);
    border-radius: 50%;
}

.timeline-desc {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-top: 0.5rem;
}

/* Projects */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.5rem;
}

.project-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.75rem;
    box-shadow: var(--shadow);
    transition: all var(--transition);
    display: flex;
    flex-direction: column;
}

.project-card:hover {
    box-shadow: var(--shadow-md);
    border-color: var(--accent);
    transform: translateY(-2px);
}

.project-icon {
    width: 44px;
    height: 44px;
    background: var(--accent-light);
    border-radius: var(--radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent);
    font-size: 1.2rem;
    margin-bottom: 1rem;
}

.project-card h3 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
}

.project-card p {
    color: var(--text-secondary);
    font-size: 0.9rem;
    line-height: 1.6;
    margin-bottom: 1rem;
    flex: 1;
}

.project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 1rem;
}

.project-tech span {
    background: var(--bg-alt);
    color: var(--text-secondary);
    font-size: 0.8rem;
    padding: 0.2rem 0.6rem;
    border-radius: 4px;
    font-weight: 500;
}

.project-link {
    color: var(--accent);
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
}

.project-link:hover {
    color: var(--accent-hover);
}

/* Education / Certifications */
.certifications {
    margin-top: 3rem;
}

.certifications h3 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1rem;
}

.cert-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.cert-item {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
    color: var(--text-secondary);
}

.cert-item i {
    color: var(--accent);
    margin-right: 0.4rem;
}

/* Contact */
.contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
}

.contact-info h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 2rem;
}

.contact-item {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.contact-item i {
    width: 44px;
    height: 44px;
    background: var(--accent-light);
    border-radius: var(--radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent);
    font-size: 1.1rem;
    flex-shrink: 0;
}

.contact-label {
    font-size: 0.8rem;
    color: var(--text-muted);
    margin-bottom: 0.15rem;
}

.contact-item p {
    color: var(--text-secondary);
    font-size: 0.9rem;
}

.contact-item a {
    color: var(--accent);
    text-decoration: none;
    font-size: 0.9rem;
}

.contact-item a:hover {
    text-decoration: underline;
}

.contact-form {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 2rem;
    box-shadow: var(--shadow);
}

.form-group {
    margin-bottom: 1.25rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.4rem;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text);
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    color: var(--text);
    font-family: inherit;
    font-size: 0.95rem;
    transition: all var(--transition);
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-light);
}

/* Footer */
.footer {
    border-top: 1px solid var(--border);
    padding: 2rem 0;
    text-align: center;
}

.social-links {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
}

.social-link {
    width: 40px;
    height: 40px;
    border: 1px solid var(--border);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary);
    text-decoration: none;
    transition: all var(--transition);
}

.social-link:hover {
    background: var(--accent);
    color: white;
    border-color: var(--accent);
}

.footer p {
    font-size: 0.85rem;
    color: var(--text-muted);
}

/* Language toggle */
.lang-content {
    display: none;
}

.lang-content.active {
    display: block;
}

/* Animations */
.fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in.visible {
    opacity: 1;
    transform: translateY(0);
}

/* Responsive */
@media (max-width: 768px) {
    .mobile-menu-btn {
        display: block;
    }

    .nav-links {
        display: none;
        position: fixed;
        top: 64px;
        left: 0;
        width: 100%;
        background: var(--surface);
        border-bottom: 1px solid var(--border);
        flex-direction: column;
        padding: 1rem;
        gap: 0.25rem;
    }

    .nav-links.active {
        display: flex;
    }

    .nav-links a {
        display: block;
        padding: 0.75rem 1rem;
    }

    .about-grid {
        grid-template-columns: 1fr;
    }

    .contact-grid {
        grid-template-columns: 1fr;
    }

    .hero-stats {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
    }

    .hero-stat-divider {
        display: none;
    }

    .hero-buttons {
        flex-direction: column;
    }

    .btn {
        width: 100%;
        justify-content: center;
    }

    .section {
        padding: 3rem 0;
    }

    .cert-list {
        flex-direction: column;
    }
}
```

### Task 3: Simplify `script.js`

**Files:**
- Rewrite: `script.js`

- [ ] **Step 1: Write the complete JavaScript file**

```js
let currentLanguage = 'fr';

function switchLanguage(lang) {
    currentLanguage = lang;

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    document.querySelectorAll('.lang-content').forEach(content => {
        content.classList.toggle('active', content.dataset.lang === lang);
    });

    document.querySelectorAll('[data-fr]').forEach(element => {
        const text = element.dataset[lang];
        if (text) element.textContent = text;
    });
}

function toggleMobileMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const subject = formData.get('subject');
    const body = `De: ${formData.get('name')} (${formData.get('email')})\n\n${formData.get('message')}`;
    window.location.href = `mailto:mohamedgnank@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            document.getElementById('navLinks').classList.remove('active');
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
```

### Task 4: Verify

- [ ] **Step 1: Serve the site locally**

Run: `python3 -m http.server 8080`

Open the browser and check:
- All sections display correctly
- Language switch works (FR/EN)
- Mobile menu works
- Smooth scroll navigation works
- Scroll animations work
- Form opens mailto link
- All links are correct
- Responsive design at mobile widths

---

## Self-Review Checklist

### Spec Coverage
- ✅ Design system (colors, typography, layout) — Task 2 (CSS)
- ✅ Header with navbar + lang switch — Task 1 (HTML) + Task 2 (CSS)
- ✅ Hero with title/subtitle/statistics — Task 1 (HTML)
- ✅ About section with photo + summary — Task 1 (HTML)
- ✅ Skills section with 4 categories — Task 1 (HTML)
- ✅ Experience timeline with 4 entries — Task 1 (HTML)
- ✅ Projects grid with 6 projects — Task 1 (HTML)
- ✅ Education + Certifications — Task 1 (HTML)
- ✅ Contact section with info + form — Task 1 (HTML)
- ✅ Footer with social links — Task 1 (HTML)
- ✅ Bilingual FR/EN — Task 1 (HTML) + Task 3 (JS)
- ✅ Subtle scroll animations — Task 2 (CSS) + Task 3 (JS)
- ✅ Responsive design — Task 2 (CSS)
- ✅ No Matrix/glitch/terminal/neon — all tasks
- ✅ Content matches PDF CV — Task 1 (HTML)

### Placeholder Scan
- No TBD, TODO, or incomplete code in any task
- All file paths are exact
- All commands include expected behavior
