<div align="center">

# 🚀 NextBlog CMS — O CMS Híbrido de Nova Geração

### **Unindo o melhor de WordPress, Strapi, Ghost e Notion em uma plataforma moderna sobre Next.js 15 e React 19.**

<br />

[![Next.js 15](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4.1-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Groq AI Llama 3.3](https://img.shields.io/badge/Groq_AI-Llama_3.3_70B-orange?style=for-the-badge&logo=groq)](https://groq.com/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-ORM-2d3748?style=for-the-badge&logo=prisma)](https://prisma.io/)
[![Licença MIT](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)

<br />

### 🌐 Deploy na Nuvem em 1 Clique (Gratuito)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FJoadsonRocha%2FNextBlog---CMS&env=GROQ_API_KEY,DATABASE_URL&project-name=nextblog-cms)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https%3A%2F%2Fgithub.com%2FJoadsonRocha%2FNextBlog---CMS)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/JoadsonRocha/NextBlog---CMS)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/JoadsonRocha/NextBlog---CMS)

<br />

---

</div>

## 🌟 O Conceito Híbrido: Os 4 Pilares

```
 ┌───────────────────────────────────────────────────────────────────────────┐
 │                            NEXTBLOG CMS HÍBRIDO                           │
 └─────────────────────────────────────┬─────────────────────────────────────┘
                                       │
        ┌──────────────┬───────────────┼───────────────┬──────────────┐
        ▼              ▼               ▼               ▼              ▼
   🟣 WordPress    🔵 Strapi        👻 Ghost        ⬛ Notion      ⚡ Groq AI
   Plugins, Temas  API REST/GraphQL Performance     24 Widgets     Llama 3.3 70B
   e Usuários RBAC e API Explorer   e SEO Schema    e Slash (/)    Tempo Real (<1s)
```

1. 🟣 **WordPress**: Ecossistema de plugins modulares, customizador de temas com tipografias do Google Fonts, controle de usuários (RBAC) e moderação de comentários.
2. 🔵 **Strapi**: Arquitetura Headless API-first com endpoints REST (`/api/posts`, `/api/pages`), endpoint GraphQL (`/api/graphql`), API Explorer interativo e suporte a múltiplos bancos (PostgreSQL, MongoDB, SQLite).
3. 👻 **Ghost**: Performance nativa em Next.js 15 (ISR / SSG), SEO integrado com Schema.org JSON-LD, sitemap.xml, robots.txt e experiência editorial minimalista e ultrarrápida.
4. ⬛ **Notion**: Editor modular com **24 tipos de blocos interativos**, menu flutuante de **Slash Commands (`/`)**, drag-and-drop, atalhos de teclado e biblioteca de blocos reutilizáveis.
5. ⚡ **Groq AI (Llama 3.3 70B)**: Assistente de inteligência artificial em tempo real (< 1s) para redação de posts em blocos, reescrita de tom de voz, tradução e SEO automático.

---

## 📚 Central de Documentação Completa

| Guia | Descrição |
|---|---|
| 🧭 **[Central de Documentação (docs/README.md)](docs/README.md)** | Hub geral de navegação estruturado por categorias. |
| ⚡ **[Guia de Início Rápido (docs/GETTING_STARTED.md)](docs/GETTING_STARTED.md)** | Como rodar localmente ou na nuvem em menos de 3 minutos. |
| 🧩 **[Catálogo de Componentes (docs/COMPONENTS.md)](docs/COMPONENTS.md)** | Guia estilo Bootstrap dos 24 widgets com props e esquemas JSON. |
| 🎨 **[Customização & Design System (docs/CUSTOMIZE.md)](docs/CUSTOMIZE.md)** | Temas, variáveis CSS e Google Fonts. |
| 🚀 **[Guia de Deploy Multi-Nuvem (docs/DEPLOY_GUIDE.md)](docs/DEPLOY_GUIDE.md)** | Passo a passo para Vercel, Netlify, Railway, Render e Docker. |
| 🗄️ **[Bancos de Dados & Migrações (docs/DATABASE_INTEGRATION.md)](docs/DATABASE_INTEGRATION.md)** | PostgreSQL, Prisma ORM, Drizzle e MongoDB. |
| 📈 **[SEO Pro, Groq AI & Plugins (docs/SEO_AND_PLUGINS.md)](docs/SEO_AND_PLUGINS.md)** | RankPulse SEO Pro, Schema.org e repositório de extensões. |
| 🐍 **[Recursos Python & FastAPI (docs/PYTHON_INTEGRATION.md)](docs/PYTHON_INTEGRATION.md)** | Ponto focal 2D, histórico de revisões e busca vetorial. |
| 📖 **[Manual Completo do CMS (docs/GUIA_COMPLETO_CMS.md)](docs/GUIA_COMPLETO_CMS.md)** | Referência de todas as 12 seções da plataforma. |

---

## 🧱 Catálogo dos 24 Widgets do Editor Notion-Style

* 📊 **Interatividade**: Enquetes/Polls com votação ao vivo, Abas interativas, FAQ em Acordeão expansível, Linha do Tempo / Roadmap.
* 🎧 **Mídia**: Player de Áudio / Podcast com ondas sonoras animadas, Imagens com Ponto Focal 2D (Wagtail style), Galerias responsivas, Embeds (Spotify, YouTube, Figma, CodeSandbox).
* 📣 **Marketing**: Hero Banners de alto impacto, Banners de Conversão CTA, Tabelas de Preços SaaS, Formulários de Newsletter, Depoimentos com estrelas, Estatísticas.
* 📝 **Tipografia**: Caixas de Destaque Notion (Callout), Títulos H1 a H6, Parágrafos Ricos, Blocos de Código com syntax highlighting e Citações.

---

## 🚀 Como Rodar Localmente

```bash
# 1. Clonar o repositório
git clone https://github.com/JoadsonRocha/NextBlog---CMS.git
cd NextBlog---CMS

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env

# 4. Iniciar servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para acessar o painel administrativo e o site público.

---

## 🧙‍♂️ Wizard de Instalação (WordPress Style)

Ao abrir o CMS pela primeira vez ou clicar em **"Assistente (Wizard)"** na barra superior, um instalador visual de 5 etapas guiará você para:
1. **Diagnóstico do Sistema**: Verificação de compatibilidade com Next.js 15 e React 19.
2. **Banco de Dados**: Seleção de PostgreSQL, SQLite, MongoDB ou Modo In-Memory com teste de conexão instantâneo.
3. **Identidade**: Nome do site, slogan e escolha do tema inicial.
4. **Super Admin**: Criação da conta de administrador master.
5. **IA Groq & Pacote Demo**: Inserção da chave `GROQ_API_KEY` e importação de artigos exemplo.

---

## 📄 Licença

Distribuído sob a licença **MIT**. Consulte `LICENSE` para mais informações.
