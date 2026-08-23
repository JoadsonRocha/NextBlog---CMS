# 🚀 NextBlog CMS — O CMS Híbrido de Nova Geração

> **Unindo o melhor de WordPress, Strapi, Ghost e Notion em uma plataforma moderna sobre Next.js 15 e React 19.**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FJoadsonRocha%2FNextBlog---CMS&env=GROQ_API_KEY,DATABASE_URL&project-name=nextblog-cms)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https%3A%2F%2Fgithub.com%2FJoadsonRocha%2FNextBlog---CMS)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/JoadsonRocha/NextBlog---CMS)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/JoadsonRocha/NextBlog---CMS)

---

## 🌟 Os 4 Pilares

* 🟣 **WordPress**: Ecossistema de plugins modulares, customizador de temas com tipografias do Google Fonts, controle de usuários (RBAC) e moderação de comentários.
* 🔵 **Strapi**: Arquitetura Headless API-first com endpoints REST (`/api/posts`, `/api/pages`), endpoint GraphQL (`/api/graphql`), API Explorer interativo e suporte a múltiplos bancos (PostgreSQL, MongoDB, SQLite).
* 👻 **Ghost**: Performance nativa em Next.js 15 (ISR / SSG), SEO integrado com Schema.org JSON-LD, sitemap.xml, robots.txt e experiência editorial minimalista e ultrarrápida.
* ⬛ **Notion**: Editor modular com **24 tipos de blocos interativos**, menu flutuante de **Slash Commands (`/`)**, drag-and-drop, atalhos de teclado e biblioteca de blocos reutilizáveis.
* ⚡ **Groq AI (Llama 3.3 70B)**: Assistente de inteligência artificial em tempo real (< 1s) para redação de posts em blocos, reescrita de tom de voz, tradução e SEO automático.

---

## 📚 Central de Documentação

Para navegar em toda a base de conhecimento organizada por tópicos:

* 🧭 **[Central de Documentação (docs/README.md)](docs/README.md)** — Hub com sitemap e índice geral.
* ⚡ **[Guia de Início Rápido (docs/GETTING_STARTED.md)](docs/GETTING_STARTED.md)** — Como rodar em 3 minutos.
* 📖 **[Manual Completo do CMS (docs/GUIA_COMPLETO_CMS.md)](docs/GUIA_COMPLETO_CMS.md)** — Referência de todas as 12 seções.

Guias específicos:
1. 🚀 **[Guia de Deploy Multi-Nuvem](docs/DEPLOY_GUIDE.md)**: Passo a passo para Vercel, Netlify, Railway, Render e Docker.
2. ✏️ **[Catálogo dos 24 Widgets & Editor Notion](docs/BLOCKS_AND_EDITOR.md)**: Manual dos blocos, slash-commands e atalhos.
3. 🗄️ **[Integração com Bancos de Dados](docs/DATABASE_INTEGRATION.md)**: PostgreSQL, SQLite e MongoDB com Prisma e Drizzle.
4. 📈 **[SEO Avançado, Groq AI & Plugins](docs/SEO_AND_PLUGINS.md)**: RankPulse SEO Pro, Schema.org e extensões.
5. 🐍 **[Recursos Python & Microserviço FastAPI](docs/PYTHON_INTEGRATION.md)**: Ponto focal 2D, histórico de revisões e busca vetorial.
6. 🏛️ **[Arquitetura Técnica do Sistema](docs/ARCHITECTURE.md)**: Visão técnica do Next.js 15 e React 19.

---

## 🛠️ Tecnologias Utilizadas

* **Framework**: Next.js 15 (App Router)
* **Linguagem & UI**: React 19, TypeScript 5.9
* **Estilização**: Tailwind CSS v4, Lucide React, Motion
* **ORM & Bancos**: Prisma ORM, Drizzle ORM, Mongoose (MongoDB)
* **Inteligência Artificial**: Groq AI (Llama 3.3 70B Versatile & Llama 3.1 8B Instant)

---

## 🚀 Como Executar Localmente

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para acessar o painel administrativo e o site público.
