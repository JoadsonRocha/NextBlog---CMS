# 📚 Central de Documentação do NextBlog CMS

> **Estrutura modular de documentação técnica e guias de uso para o NextBlog CMS.**
> *Projetada para fácil leitura, integração com páginas de documentação (estilo Mintlify, Fumadocs, Nextra ou Docusaurus) e onboarding rápido.*

---

## 🧭 Mapa da Documentação (Sitemap)

```
 docs/
 ├── README.md               <-- (Você está aqui) Índice Geral e Visão da Central
 ├── GETTING_STARTED.md      <-- Guia de Início Rápido (3 Minutos)
 ├── GUIA_COMPLETO_CMS.md    <-- Manual Mestre Completo (12 Seções Detalhadas)
 ├── BLOCKS_AND_EDITOR.md    <-- Catálogo dos 24 Widgets, Notion Editor & Slash (/)
 ├── DATABASE_INTEGRATION.md <-- PostgreSQL, Prisma ORM, Drizzle e MongoDB
 ├── DEPLOY_GUIDE.md         <-- Deploy na Vercel, Netlify, Railway, Render e Docker
 ├── SEO_AND_PLUGINS.md      <-- RankPulse SEO Pro, Schema.org e Extensões
 ├── PYTHON_INTEGRATION.md   <-- Ponto Focal 2D, Revisions Diff e FastAPI Microservice
 └── ARCHITECTURE.md         <-- Arquitetura Técnica do Next.js 15 e React 19
```

---

## 📑 Guias por Categoria

### 🚀 1. Primeiros Passos & Deploy
* ⚡ **[Guia de Início Rápido (GETTING_STARTED.md)](GETTING_STARTED.md)**: Como rodar localmente em 3 passos simples.
* 🌐 **[Deploy Multi-Nuvem (DEPLOY_GUIDE.md)](DEPLOY_GUIDE.md)**: Como hospedar com 1 clique na Vercel, Netlify, Railway, Render ou Docker.
* 🧙‍♂️ **[Assistente de Instalação (Setup Wizard)](DEPLOY_GUIDE.md#6-️-assistente-de-instalação-setup-wizard)**: Como usar o instalador de 5 minutos estilo WordPress.

---

### ✍️ 2. Conteúdo & Editor Notion-Style
* 🧱 **[Catálogo dos 24 Widgets (BLOCKS_AND_EDITOR.md)](BLOCKS_AND_EDITOR.md)**: Manual dos blocos de Enquete, Linha do Tempo, Abas, Áudio, Embeds, Hero, FAQ, Tabelas e Preços.
* ⌨️ **[Slash Commands (/) & Atalhos de Teclado](BLOCKS_AND_EDITOR.md#3-slash-commands--e-atalhos-de-teclado)**: Comandos rápidos para acelerar a escrita.
* 🕒 **[Histórico de Versões & Visual Diff](PYTHON_INTEGRATION.md#22-histórico-de-versões--comparador-visual-diff-wagtail-revisions)**: Como comparar e reverter snapshots anteriores de posts.
* 🖼️ **[Ponto Focal 2D para Fotos](PYTHON_INTEGRATION.md#21-ponto-focal-2d-para-imagens-wagtail-renditions)**: Enquadramento inteligente em mobile e banners.

---

### ⚙️ 3. Dados, Infraestrutura & APIs
* 🗄️ **[Bancos de Dados & Migrações (DATABASE_INTEGRATION.md)](DATABASE_INTEGRATION.md)**: Conexão com PostgreSQL (Supabase/Neon), SQLite e MongoDB com Prisma e Drizzle ORM.
* 🔮 **[Camada Headless (APIs REST & GraphQL)](GUIA_COMPLETO_CMS.md#10-camada-headless-apis-rest--graphql)**: Consumo de endpoints para alimentar apps mobile ou outros frontends.
* 🐍 **[Microserviço Python FastAPI (PYTHON_INTEGRATION.md)](PYTHON_INTEGRATION.md)**: Busca semântica vetorial (RAG) e exportador automatizado de PDF/E-books.

---

### 📈 4. SEO, IA & Plugins
* 🔍 **[RankPulse SEO Pro & Schema.org (SEO_AND_PLUGINS.md)](SEO_AND_PLUGINS.md)**: Auditoria de pontuação (0-100), Google SERP preview e dados estruturados JSON-LD.
* ⚡ **[Inteligência Artificial Groq (Llama 3.3 70B)](GUIA_COMPLETO_CMS.md#6-inteligência-artificial-integrada--groq-ai--llama-33-70b)**: Geração de artigos, títulos e seções em menos de 1 segundo.
* 🧩 **[Ecossistema de Plugins](SEO_AND_PLUGINS.md#2-ecossistema-de-plugins)**: WooCommerce Headless, Webhooks (Zapier/n8n) e Purge de Cache Edge.

---

### 🏛️ 5. Arquitetura do Sistema
* 📐 **[Arquitetura do NextBlog CMS (ARCHITECTURE.md)](ARCHITECTURE.md)**: Árvore de componentes, gerenciamento de estado reativo e convenções do Next.js 15 App Router.
