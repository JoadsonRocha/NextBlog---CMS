<div align="center">

# 🚀 NextBlog CMS — The Next-Generation Hybrid CMS

### **Combining the best of WordPress, Strapi, Ghost, and Notion into a modern platform powered by Next.js 15, React 19, and Tailwind CSS v4.**

<br />

[![Next.js 15](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4.1-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Groq AI Llama 3.3](https://img.shields.io/badge/Groq_AI-Llama_3.3_70B-orange?style=for-the-badge&logo=groq)](https://groq.com/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-ORM-2d3748?style=for-the-badge&logo=prisma)](https://prisma.io/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![License MIT](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)

<br />

### 🌐 1-Click Cloud Deployment (Free Tier Ready)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FJoadsonRocha%2FNextBlog---CMS&env=GROQ_API_KEY,DATABASE_URL&project-name=nextblog-cms)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https%3A%2F%2Fgithub.com%2FJoadsonRocha%2FNextBlog---CMS)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/JoadsonRocha/NextBlog---CMS)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/JoadsonRocha/NextBlog---CMS)

<br />

---

</div>

## 🌟 The Hybrid Architecture: 4 Foundational Pillars

NextBlog CMS addresses the trade-offs of traditional content management systems by bringing together the strengths of industry-leading platforms:

```
 ┌───────────────────────────────────────────────────────────────────────────┐
 │                           NEXTBLOG HYBRID CMS                             │
 └─────────────────────────────────────┬─────────────────────────────────────┘
                                       │
        ┌──────────────┬───────────────┼───────────────┬──────────────┐
        ▼              ▼               ▼               ▼              ▼
   🟣 WordPress    🔵 Strapi        👻 Ghost        ⬛ Notion      ⚡ Groq AI
   Plugins, Themes REST/GraphQL     Peak Speed      24 Widgets     Llama 3.3 70B
   & User RBAC     API Explorer     & SEO Schema    Slash (/) Menu Real-Time (<1s)
```

1. 🟣 **WordPress**: Modular plugin ecosystem, visual theme customizer with dynamic Google Fonts typography, granular Role-Based Access Control (Super Admin, Editor, Visitor), and full comment moderation.
2. 🔵 **Strapi**: Headless API-first architecture featuring unified REST endpoints (`/api/posts`, `/api/pages`), a native GraphQL endpoint (`/api/graphql`), an interactive API Explorer, and multi-database support (PostgreSQL, Supabase, Neon, SQLite, MongoDB, and Zero-Config In-Memory).
3. 👻 **Ghost**: Extreme production performance on Next.js 15 (ISR / SSG / Edge runtime), automatic SEO suite with Schema.org JSON-LD structured data, dynamic `sitemap.xml`, `robots.txt`, and a distraction-free editorial experience.
4. ⬛ **Notion**: Block-based canvas editor with **24 modular interactive widgets**, floating **Slash Command menu (`/`)**, drag-and-drop reordering, keyboard shortcuts, version revision history, and a reusable block library.
5. ⚡ **Groq AI (Llama 3.3 70B)**: Sub-second AI copilot for generating structured block content, rewording tone, translation, and one-click SEO metadata generation.

---

## 📚 Documentation Hub

Explore the complete technical documentation suite:

| Guide | Description |
|---|---|
| 🧭 **[Documentation Hub (docs/README.md)](docs/README.md)** | Master index organized by technical topic and role. |
| ⚡ **[Getting Started Guide (docs/GETTING_STARTED.md)](docs/GETTING_STARTED.md)** | Local setup, prerequisites, and first-time configuration in under 3 minutes. |
| 🏗️ **[System Architecture (docs/ARCHITECTURE.md)](docs/ARCHITECTURE.md)** | Deep dive into SSR/ISR rendering, state management, and data flow. |
| 🧩 **[Component & Widget Catalog (docs/COMPONENTS.md)](docs/COMPONENTS.md)** | Full specification of all 24 Notion-style widgets with JSON schemas and props. |
| ✏️ **[Blocks & Visual Editor (docs/BLOCKS_AND_EDITOR.md)](docs/BLOCKS_AND_EDITOR.md)** | Visual editor guide, Slash commands, drag-and-drop, and revision history. |
| 🗄️ **[Database & ORM Integration (docs/DATABASE_INTEGRATION.md)](docs/DATABASE_INTEGRATION.md)** | PostgreSQL, Prisma ORM, Neon, Supabase, SQLite, and MongoDB integration. |
| 🚀 **[Multi-Cloud Deployment (docs/DEPLOY_GUIDE.md)](docs/DEPLOY_GUIDE.md)** | Production deployment to Vercel, Netlify, Railway, Render, and Docker. |
| 📈 **[SEO Engine & Plugins (docs/SEO_AND_PLUGINS.md)](docs/SEO_AND_PLUGINS.md)** | RankPulse SEO Pro suite, OpenGraph, Schema.org, and custom plugin development. |
| 🎨 **[Theming & Customization (docs/CUSTOMIZE.md)](docs/CUSTOMIZE.md)** | Tailwind CSS v4 design tokens, color palettes, and typography presets. |
| 🐍 **[Python & FastAPI Sidecar (docs/PYTHON_INTEGRATION.md)](docs/PYTHON_INTEGRATION.md)** | 2D focal point cropping, vector embeddings, and semantic search. |
| 📖 **[Comprehensive Platform Manual (docs/GUIA_COMPLETO_CMS.md)](docs/GUIA_COMPLETO_CMS.md)** | End-to-end operational manual covering all 12 platform modules. |

---

## 🧱 The 24 Notion-Style Modular Widgets

NextBlog CMS treats all content as modular, composable blocks:

* 📊 **Interactive & Engagement**: Live-voting Polls, Multi-Tab switchers, Collapsible FAQ Accordions, Interactive Roadmaps & Timelines.
* 🎧 **Rich Media**: Audio/Podcast Player with animated sound waves, Wagtail-style 2D Focal Point responsive images, Masonry Galleries, and Embeds (YouTube, Spotify, CodeSandbox, Figma).
* 📣 **Marketing & SaaS**: High-conversion Hero Banners, Call-To-Action (CTA) Banners, Tiered SaaS Pricing Tables, Newsletter Subscription Bars, Star-Rating Testimonials, KPI Metrics.
* 📝 **Editorial & Typography**: Notion-style Callout boxes, Structured Headings (H1–H6), Rich Text paragraphs, Code Blocks with syntax highlighting, and Blockquotes.

---

## 🚀 Quickstart

### Prerequisites
* **Node.js**: `v20.x` or `v22.x` (LTS recommended)
* **npm**: `v10.x` or higher (or pnpm / yarn)
* **Git**: Installed and configured

### Step-by-Step Installation

```bash
# 1. Clone the repository
git clone https://github.com/JoadsonRocha/NextBlog---CMS.git
cd NextBlog---CMS

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env

# 4. Start local development server
npm run dev
```

Navigate to **[http://localhost:3000](http://localhost:3000)** to view the public website, or **[http://localhost:3000/admin](http://localhost:3000/admin)** to access the management dashboard.

---

## 🧙‍♂️ 5-Minute Setup Wizard (WordPress Style)

When launching NextBlog CMS for the first time, an intuitive 5-step onboarding wizard guides your setup:

1. **System Diagnostics**: Automatic verification of Next.js 15, React 19, and Node.js environment health.
2. **Database Selection**: Choose between PostgreSQL (Supabase / Neon), SQLite, MongoDB Atlas, or Instant In-Memory Browser Storage with live connection testing.
3. **Site Identity**: Configure site title, tagline, branding logo, and initial design theme.
4. **Super Admin Setup**: Create your root administrator credentials with secure RBAC assignment.
5. **AI Copilot & Demo Content**: Provide an optional Groq API key and import sample articles, categories, and landing pages.

---

## 🔌 Headless API Endpoints

NextBlog CMS functions out-of-the-box as a Headless Content API:

### 1. Posts API (`/api/posts`)
```bash
# List published posts
curl -X GET "http://localhost:3000/api/posts?status=published&limit=10"

# Fetch a single post by slug
curl -X GET "http://localhost:3000/api/posts?slug=meu-primeiro-post"
```

### 2. Pages API (`/api/pages`)
```bash
# Fetch page and its modular block tree
curl -X GET "http://localhost:3000/api/pages?slug=home"
```

### 3. GraphQL Endpoint (`/api/graphql`)
```graphql
query GetPublishedPosts {
  posts(status: "published", limit: 5) {
    id
    title
    slug
    excerpt
    views
    publishedAt
  }
}
```

### 4. Groq AI Integration (`/api/groq/generate-content`)
```bash
curl -X POST "http://localhost:3000/api/groq/generate-content" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Write a 3-block introduction about React 19 features", "type": "article"}'
```

---

## 🗄️ Database Architecture & Prisma ORM

NextBlog CMS supports multiple persistence strategies through a unified Data Adapter layer (`lib/db/adapter.ts`):

* **PostgreSQL / Neon / Supabase (Prisma ORM)**: Complete relational schema ready in `prisma/schema.prisma`.
* **SQLite / Turso**: Lightweight embedded database ideal for edge deployments and local prototyping.
* **MongoDB (NoSQL)**: Document-oriented structure documented in `lib/db/mongoose/models.ts`.
* **Zero-Config Storage**: Reactive browser storage with zero external dependencies required for immediate testing.

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init_cms

# Open visual database browser
npx prisma studio
```

---

## 📂 Project Structure

```
NextBlog---CMS/
├── app/                       # Next.js 15 App Router
│   ├── admin/                 # CMS Admin Dashboard & Management Hub
│   ├── api/                   # Headless REST, GraphQL & AI API Routes
│   │   ├── posts/             # REST Endpoints for Posts
│   │   ├── pages/             # REST Endpoints for Pages
│   │   ├── graphql/           # GraphQL Query/Mutation Handler
│   │   └── groq/              # Groq AI Llama 3.3 Fast Inference
│   ├── docs/                  # In-App Interactive Documentation Portal
│   ├── layout.tsx             # Root Layout with Font & Theme Providers
│   └── page.tsx               # Dynamic Frontend (Landing & Articles)
├── components/                # Modular React 19 Components
│   ├── blocks/                # 24 Notion-Style Block Renderers
│   ├── editor/                # Visual Canvas, Slash Menu, SEO & Revisions
│   ├── layout/                # Admin Shell, WP Admin Bar, Public Header/Footer
│   ├── setup-wizard/          # 5-Minute Guided Installer Modal & Page
│   └── docs/                  # Interactive Documentation Viewer
├── docs/                      # Technical Documentation Markdown Guides
│   ├── ARCHITECTURE.md        # System Architecture & Tech Specifications
│   ├── COMPONENTS.md          # 24 Widgets Catalog & JSON Specifications
│   ├── DATABASE_INTEGRATION.md# Prisma ORM & Multi-Database Setup
│   ├── DEPLOY_GUIDE.md        # Multi-Cloud Production Deployments
│   └── GETTING_STARTED.md     # Quickstart & Onboarding Guide
├── lib/                       # Core Logic, Contexts & Adapters
│   ├── cms-context.tsx        # Central State Management & Reactive Store
│   ├── db/                    # Unified DB Adapters (Prisma, Memory, Drizzle)
│   └── initial-data.ts        # Seed Data, Themes, and Starter Templates
├── prisma/
│   └── schema.prisma          # Complete Relational Prisma Schema
├── public/                    # Static Assets, Icons & Media
└── package.json               # Dependencies & NPM Scripts
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

| Variable | Description | Required | Default |
|---|---|---|---|
| `DATABASE_URL` | PostgreSQL or SQLite connection string | Optional (Prisma) | `postgresql://...` |
| `GROQ_API_KEY` | Groq Cloud API key for ultra-fast Llama 3.3 70B AI inference | Optional | `""` |
| `NEXT_PUBLIC_SITE_URL` | Canonical domain for SEO and OpenGraph generation | Recommended | `http://localhost:3000` |
| `NEXT_PUBLIC_DEFAULT_THEME`| Initial active theme (`modern`, `editorial`, `saas`, etc.) | Optional | `modern` |

---

## 🤝 Contributing

Contributions are warmly welcomed! Please read through our contributing process:

1. **Fork** the repository on GitHub.
2. Create your feature branch (`git checkout -b feature/amazing-block`).
3. Commit your changes (`git commit -m 'feat(blocks): add CodeSandbox embed block'`).
4. Push to the branch (`git push origin feature/amazing-block`).
5. Open a **Pull Request**.

---

## 📄 License

This project is open-source software licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.
