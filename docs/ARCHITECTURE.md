# Arquitetura do NextBlog CMS Híbrido

O **NextBlog CMS** é uma plataforma de gerenciamento de conteúdo híbrida construída sobre o **Next.js 15 (App Router)** e **React 19**, combinando os pontos fortes das 4 principais plataformas do mercado:

```
                            ┌────────────────────────────────────────┐
                            │        NextBlog CMS (Next.js 15)       │
                            └───────────────────┬────────────────────┘
                                                │
       ┌────────────────────┬───────────────────┴───────────────────┬────────────────────┐
       ▼                    ▼                                       ▼                    ▼
┌──────────────┐     ┌──────────────┐                        ┌──────────────┐     ┌──────────────┐
│  WORDPRESS   │     │    STRAPI    │                        │    GHOST     │     │    NOTION    │
│  Ecossistema │     │   API-First  │                        │  Performance │     │    Blocos    │
└──────┬───────┘     └──────┬───────┘                        └──────┬───────┘     └──────┬───────┘
       │                    │                                       │                    │
       ├─ Plugins           ├─ REST /api/posts & /pages             ├─ SEO Automatizado  ├─ 24 Blocos
       ├─ Temas Custom      ├─ GraphQL /api/graphql                 ├─ Tempo de Leitura  ├─ Reusable Blocks
       ├─ Comentários       ├─ API Explorer Interativo              ├─ Posts & Pages     ├─ Slash Menu (/)
       └─ RBAC (Permissões) └─ DB Switcher (Prisma/Drizzle/Mongo)   └─ ISR / Edge Speed  └─ Drag & Drop
```

---

## 1. Visão Geral dos Pilares

| Pilar | Recursos Incorporados | Localização no Código |
|---|---|---|
| **WordPress** | Catálogo de plugins extensíveis, gerenciamento de temas com Google Fonts, controle de usuários/permissões e moderação de comentários. | `components/plugins/`, `components/appearance/`, `components/users/`, `components/comments/` |
| **Strapi** | Arquitetura Headless API-first com endpoints REST completos, endpoint GraphQL e API Explorer interativo no painel. | `app/api/graphql/`, `app/api/posts/`, `app/api/pages/`, `components/api-explorer/` |
| **Ghost** | Experiência de leitura ultra clean, renderização edge ISR/SSG, cálculo automático de tempo de leitura e SEO nativo. | `components/site-view/`, `app/api/sitemap/`, `app/api/robots/` |
| **Notion** | Editor baseado em 24 tipos de blocos modulares, menu flutuante de Slash Commands (`/`), drag-and-drop e blocos reutilizáveis. | `components/editor/`, `components/blocks/`, `components/blocks-library/` |

---

## 2. Estrutura de Diretórios

```
NextBlog---CMS/
├── app/
│   ├── api/
│   │   ├── graphql/         # Endpoint GraphQL universal
│   │   ├── posts/           # Endpoints REST de Posts
│   │   ├── pages/           # Endpoints REST de Páginas
│   │   ├── blocks/          # Endpoints REST de Blocos Reutilizáveis
│   │   ├── gemini/          # Integração IA Google Gemini
│   │   ├── sitemap/         # Geração dinâmica de sitemap.xml
│   │   └── robots/          # Geração dinâmica de robots.txt
│   ├── globals.css          # Design system e tokens Tailwind v4
│   ├── layout.tsx           # Root Layout com fontes Inter e JetBrains Mono
│   └── page.tsx             # Orquestrador da aplicação e roteamento dinâmico
├── components/
│   ├── editor/              # VisualEditor, SlashCommandMenu, BlockInspector, SEOInspectorModal
│   ├── blocks/              # BlockRenderer com 24 componentes de blocos
│   ├── blocks-library/      # Gestor de templates de blocos reutilizáveis
│   ├── dashboard/           # Métricas, analytics e atalhos rápidos
│   ├── plugins/             # Repositório e configurador de plugins
│   ├── appearance/          # Customizador de temas e menus
│   ├── database/            # Conexões e gerador de schemas Prisma/Drizzle/Mongoose
│   ├── api-explorer/        # Playground interativo REST & GraphQL
│   └── site-view/           # Frontend público renderizado em alta performance
├── docs/                    # Documentação técnica completa
├── lib/
│   ├── cms-context.tsx      # Estado global com persistência e reatividade
│   ├── initial-data.ts      # Sementes completas de dados de demonstração
│   └── db/                  # Camada de banco de dados (Prisma, Drizzle, Mongoose, Adapter)
├── prisma/
│   └── schema.prisma        # Schema relacional de banco de dados
└── types/
    └── cms.ts               # Tipagem TypeScript estrita de todo o domínio
```

---

## 3. Fluxo de Dados e Reatividade

1. **Estado Global (`CMSProvider`)**:
   - Todo o estado (posts, páginas, blocos, configurações, temas, plugins e usuários) é encapsulado no [`lib/cms-context.tsx`](file:///d:/FULLSTARK/NextBlog---CMS/lib/cms-context.tsx).
   - O estado sincroniza automaticamente em LocalStorage e emite notificações via Toast.
2. **Camada de Renderização Pública**:
   - Ao trocar a visualização para `public-site`, o CMS renderiza o site exatamente como os visitantes o verão, respeitando o tema ativo, as fontes selecionadas e as cores da marca.
3. **APIs Headless**:
   - Qualquer cliente externo pode consumir o CMS via REST (`GET /api/posts`) ou via GraphQL (`POST /api/graphql` com query GraphQL).
