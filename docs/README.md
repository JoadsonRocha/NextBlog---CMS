# 📚 NextBlog CMS — Documentation Portal

> **Enterprise-grade technical documentation structured in accordance with modern documentation framework standards (Nextra, Mintlify, Fumadocs, and Bootstrap Docs).**
> *Modular architecture divided into Getting Started, Architecture, Components, Customization, Databases, AI, and Production Deployment.*

---

## 🧭 Documentation Sitemap & Master Index

```
docs/
├── README.md               <-- (You are here) Master Portal & Navigation Index
├── GETTING_STARTED.md      <-- ⚡ Quickstart Guide (3-Minute Setup & Configuration)
├── ARCHITECTURE.md         <-- 🏛️ System Architecture, Next.js 15, React 19 & Data Flow
├── COMPONENTS.md           <-- 🧩 24 Notion-Style Widgets Catalog & JSON Schemas
├── BLOCKS_AND_EDITOR.md    <-- ✏️ Block Canvas Editor, Slash (/) Commands & Revisions
├── DATABASE_INTEGRATION.md <-- 🗄️ PostgreSQL, Prisma ORM, Neon, Supabase & MongoDB
├── DEPLOY_GUIDE.md         <-- 🚀 Multi-Cloud Deployment: Vercel, Netlify, Railway, Render, Docker
├── SEO_AND_PLUGINS.md      <-- 📈 RankPulse SEO Pro, Schema.org, Groq AI & Plugin Engine
├── CUSTOMIZE.md            <-- 🎨 Themes, CSS Variables, Design Tokens & Google Fonts
├── PYTHON_INTEGRATION.md   <-- 🐍 2D Focal Point Cropping, Revisions Diff & FastAPI
└── GUIA_COMPLETO_CMS.md    <-- 📖 Comprehensive Reference Manual
```

---

## 📑 Categorized Guide Directory

### ⚡ 1. Getting Started
* **[Quickstart Guide (GETTING_STARTED.md)](GETTING_STARTED.md)**: Local installation in 3 commands, prerequisite matrix, and `.env` setup.
* **[Multi-Cloud Deployment Guide (DEPLOY_GUIDE.md)](DEPLOY_GUIDE.md)**: 1-click cloud hosting on Vercel, Netlify, Railway, Render, and Docker.
* **[WordPress-Style Setup Wizard (GETTING_STARTED.md#5-minute-setup-wizard)](GETTING_STARTED.md#5-minute-setup-wizard)**: Guided 5-minute visual onboarding installer.

---

### 🏛️ 2. Architecture & Design
* **[System Architecture (ARCHITECTURE.md)](ARCHITECTURE.md)**: Next.js 15 App Router, React 19 Client/Server boundaries, ISR/SSG lifecycle, and state reactivity.
* **[Python & FastAPI Sidecar (PYTHON_INTEGRATION.md)](PYTHON_INTEGRATION.md)**: Microservice backend architecture for 2D focal point image cropping and vector semantic search.

---

### 🧩 3. Components & Widgets
* **[Component & Widget Catalog (COMPONENTS.md)](COMPONENTS.md)**:
  * **Interactive**: *Collapsible FAQ Accordions, Multi-Tabs, Live-voting Polls, Roadmap & Timelines, Modal Dialogs*.
  * **Rich Media**: *Podcast Audio Player with animated sound waves, 2D Focal Point Images, Masonry Galleries, Universal Embeds (YouTube, Spotify, Figma, CodeSandbox)*.
  * **Marketing**: *Hero Banners, Conversion CTA Banners, SaaS Tiered Pricing Tables, Star-Rating Testimonials, KPI Metric Counters*.
  * **Editorial**: *Notion-style Callout highlights, Structured Headings H1–H6, Rich Paragraphs, Syntax-Highlighted Code Blocks, Blockquotes*.

---

### 🎨 4. Customization & Theming
* **[Design Tokens & Customization (CUSTOMIZE.md)](CUSTOMIZE.md)**:
  * 4 Production Themes (*Modern SaaS, Editorial Minimal, Vibrant Creative, Dark Luxury*).
  * Global CSS Custom Properties (`--cms-primary`, `--cms-radius`, `--cms-shadow`).
  * Dynamic Google Fonts typography loader (*Inter, Outfit, Playfair Display, Merriweather*).
  * Live custom CSS override injection.

---

### ✍️ 5. Content Management & Notion Editor
* **[Blocks & Visual Editor Guide (BLOCKS_AND_EDITOR.md)](BLOCKS_AND_EDITOR.md)**:
  * Floating **Slash Command Menu (`/`)**.
  * Complete **Global Keyboard Shortcuts Table** (`Ctrl+S`, `Ctrl+P`, `Ctrl+I`, `?`).
  * Saving, organizing, and inserting **Reusable Block Templates**.
  * Version History, Snapshots, and Visual Diff Rollbacks.

---

### 🗄️ 6. Databases & Persistence
* **[Database & ORM Integration Guide (DATABASE_INTEGRATION.md)](DATABASE_INTEGRATION.md)**:
  * PostgreSQL (Supabase / Neon / Railway) via Prisma ORM and Drizzle.
  * MongoDB Atlas persistence via Mongoose schemas.
  * Embedded SQLite / Turso for Edge runtimes.
  * 1-Click JSON Snapshot backup and restore.

---

### 🔍 7. SEO, AI & Extensions
* **[RankPulse SEO Suite (SEO_AND_PLUGINS.md)](SEO_AND_PLUGINS.md)**: Real-time 0–100 SEO scoring, Google SERP simulator, OpenGraph previews, and Schema.org JSON-LD generation.
* **[Groq AI Copilot (Llama 3.3 70B)](SEO_AND_PLUGINS.md#groq-ai-integration)**: Sub-second AI drafting, tone rewriting, translation, and automated metadata synthesis.
* **[Plugin Architecture (SEO_AND_PLUGINS.md#plugin-ecosystem)](SEO_AND_PLUGINS.md#plugin-ecosystem)**: Headless Commerce, Webhooks (Zapier/n8n/Slack), and Edge CDN Cache Purge.
