# 📚 Central de Documentação do NextBlog CMS

> **Documentação estruturada no padrão mundial do Bootstrap e frameworks modernos de documentação (Nextra, Mintlify, Fumadocs).**
> *Estrutura modular dividida em Getting Started, Componentes, Layout, Customização, Dados, IA e Deploy.*

---

## 🧭 Mapa Geral da Documentação (Sitemap)

```
 docs/
 ├── README.md               <-- (Você está aqui) Índice Geral e Visão da Central
 ├── GETTING_STARTED.md      <-- ⚡ Início Rápido (Instalação em 3 Minutos)
 ├── COMPONENTS.md           <-- 🧩 Catálogo de Componentes & Widgets (Estilo Bootstrap)
 ├── CUSTOMIZE.md            <-- 🎨 Temas, Variáveis CSS, Cores e Google Fonts
 ├── BLOCKS_AND_EDITOR.md    <-- ✏️ Editor Notion-Style, 24 Blocos e Slash (/)
 ├── DEPLOY_GUIDE.md         <-- 🚀 Deploy na Vercel, Netlify, Railway, Render e Docker
 ├── DATABASE_INTEGRATION.md <-- 🗄️ PostgreSQL, Prisma ORM, Drizzle e MongoDB
 ├── SEO_AND_PLUGINS.md      <-- 📈 RankPulse SEO Pro, Schema.org, Groq AI e Plugins
 ├── PYTHON_INTEGRATION.md   <-- 🐍 Ponto Focal 2D, Revisions Diff e FastAPI
 ├── GUIA_COMPLETO_CMS.md    <-- 📖 Manual Mestre Completo (12 Seções Detalhadas)
 └── ARCHITECTURE.md         <-- 🏛️ Arquitetura Técnica do Next.js 15 e React 19
```

---

## 📑 Navegação por Categorias (Bootstrap Style)

### ⚡ 1. Getting Started (Primeiros Passos)
* **[Guia de Início Rápido (GETTING_STARTED.md)](GETTING_STARTED.md)**: Instalação local em 3 comandos e variáveis `.env`.
* **[Deploy Multi-Nuvem (DEPLOY_GUIDE.md)](DEPLOY_GUIDE.md)**: Hospedagem com 1 clique na Vercel, Netlify, Railway, Render ou Docker.
* **[Assistente de Instalação (Setup Wizard)](DEPLOY_GUIDE.md#6-️-assistente-de-instalação-setup-wizard)**: Instalador visual guiado de 5 minutos.

---

### 🧩 2. Components (Componentes & Widgets)
* **[Catálogo de Componentes Bootstrap Style (COMPONENTS.md)](COMPONENTS.md)**:
  * **Interatividade**: *Accordion/FAQ, Tabs, Polls com votação ao vivo, Timeline/Roadmap, Modais*.
  * **Mídia**: *Audio Player de Podcast, Imagens com Ponto Focal 2D, Galerias Responsivas, Embeds Universais*.
  * **Marketing**: *Hero Banners, Banners de Conversão CTA, Tabelas de Preços SaaS, Depoimentos, Stats*.
  * **Tipografia**: *Caixas de Destaque Callout, Títulos H1-H6, Parágrafos Ricos, Blocos de Código e Citações*.

---

### 🎨 3. Customize (Customização & Design System)
* **[Design Tokens & Temas (CUSTOMIZE.md)](CUSTOMIZE.md)**:
  * 4 Temas Nativos (*Modern SaaS, Editorial Minimal, Vibrant Creative, Dark Luxury*).
  * Variáveis CSS globais (`--cms-primary`, `--cms-radius`, `--cms-shadow`).
  * Tipografia com injeção automática de Google Fonts (*Inter, Outfit, Playfair Display, Merriweather*).
  * Injeção de regras CSS personalizadas no painel.

---

### ✍️ 4. Content & Notion Editor (Editor Visual)
* **[Editor Notion-Style (BLOCKS_AND_EDITOR.md)](BLOCKS_AND_EDITOR.md)**:
  * Menu flutuante de **Slash Commands (`/`)**.
  * Tabela de **Atalhos Globais de Teclado** (`Ctrl+S`, `Ctrl+P`, `Ctrl+I`, `?`).
  * Criação e salvamento de **Blocos Reutilizáveis**.
* **[Histórico de Versões & Visual Diff (PYTHON_INTEGRATION.md)](PYTHON_INTEGRATION.md#22-histórico-de-versões--comparador-visual-diff-wagtail-revisions)**: Snapshots e comparador de revisões.

---

### 🗄️ 5. Databases & Backend (Dados & Infraestrutura)
* **[Bancos de Dados & Migrações (DATABASE_INTEGRATION.md)](DATABASE_INTEGRATION.md)**:
  * PostgreSQL (Supabase / Neon) via Prisma ORM e Drizzle.
  * MongoDB Atlas via Mongoose.
  * SQLite / Turso local e serverless.
  * Exportação e Importação de Backups JSON em 1 clique.
* **[Camada Headless REST & GraphQL (GUIA_COMPLETO_CMS.md)](GUIA_COMPLETO_CMS.md#10-camada-headless-apis-rest--graphql)**: Consumo de endpoints para frontends externos e apps mobile.

---

### 🔍 6. SEO, IA & Plugins
* **[RankPulse SEO Pro (SEO_AND_PLUGINS.md)](SEO_AND_PLUGINS.md)**: Score 0-100, Google SERP Simulator, Social Cards e Schema.org JSON-LD.
* **[IA Groq Llama 3.3 70B (GUIA_COMPLETO_CMS.md)](GUIA_COMPLETO_CMS.md#6-inteligência-artificial-integrada--groq-ai--llama-33-70b)**: Geração ultra-rápida de artigos e seções em menos de 1 segundo.
* **[Ecossistema de Plugins (SEO_AND_PLUGINS.md)](SEO_AND_PLUGINS.md#2-ecossistema-de-plugins)**: WooCommerce Headless, Webhooks (Zapier/n8n) e Edge Cache Purge.

---

### 🏛️ 7. Architecture (Arquitetura Técnica)
* **[Arquitetura do Sistema (ARCHITECTURE.md)](ARCHITECTURE.md)**: Next.js 15 App Router, React 19, fluxo de reatividade e ciclo de vida de dados.
