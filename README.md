# 🚀 NextBlog CMS — O CMS Híbrido de Nova Geração

> **Unindo o melhor de WordPress, Strapi, Ghost e Notion em uma plataforma moderna sobre Next.js 15 e React 19.**

---

## 🌟 Os 4 Pilares

* 🟣 **WordPress**: Ecossistema de plugins modulares, customizador de temas com tipografias do Google Fonts, controle de usuários (RBAC) e moderação de comentários.
* 🔵 **Strapi**: Arquitetura Headless API-first com endpoints REST (`/api/posts`, `/api/pages`), endpoint GraphQL (`/api/graphql`), API Explorer interativo e suporte a múltiplos bancos (PostgreSQL, MongoDB, SQLite).
* 👻 **Ghost**: Performance nativa em Next.js 15 (ISR / SSG), SEO integrado com Schema.org JSON-LD, sitemap.xml, robots.txt e experiência editorial minimalista e ultrarrápida.
* ⬛ **Notion**: Editor modular com **24 tipos de blocos interativos**, menu flutuante de **Slash Commands (`/`)**, drag-and-drop, atalhos de teclado e biblioteca de blocos reutilizáveis.
* 🤖 **Google Gemini IA**: Assistente de inteligência artificial embutido para redação, reescrita, tradução e geração de SEO.

---

## 📚 Documentação Técnica Completa

Para um guia passo a passo completo e aprofundado, consulte:

* 📖 **[Manual & Documentação Completa do NextBlog CMS (GUIA_COMPLETO_CMS.md)](docs/GUIA_COMPLETO_CMS.md)**

Guias específicos:
1. 🏛️ **[Arquitetura do Sistema](docs/ARCHITECTURE.md)**: Visão técnica do sistema híbrido, árvore de componentes e fluxo de reatividade.
2. 🗄️ **[Integração com Bancos de Dados](docs/DATABASE_INTEGRATION.md)**: Configuração de PostgreSQL, SQLite e MongoDB com Prisma, Drizzle e Mongoose.
3. ✏️ **[Guia do Editor & Catálogo de 24 Blocos](docs/BLOCKS_AND_EDITOR.md)**: Guia dos blocos interativos, slash-commands e atalhos.
4. 📈 **[SEO Avançado & Plugins](docs/SEO_AND_PLUGINS.md)**: Suíte RankPulse SEO Pro, Schema.org, sitemap e repositório de extensões.

---

## 🛠️ Tecnologias Utilizadas

* **Framework**: Next.js 15 (App Router)
* **Linguagem & UI**: React 19, TypeScript 5.9
* **Estilização**: Tailwind CSS v4, Lucide React, Motion
* **ORM & Bancos**: Prisma ORM, Drizzle ORM, Mongoose (MongoDB)
* **Inteligência Artificial**: Google Gemini 2.4 (`@google/genai`)

---

## 🚀 Como Executar Localmente

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para acessar o painel administrativo e o site público.
