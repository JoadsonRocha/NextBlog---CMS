# 🧩 Catálogo de Componentes & Widgets (Estilo Bootstrap)

> **Documentação completa de componentes, sintaxe de dados, exemplos e tabelas de propriedades do NextBlog CMS.**

---

## 📑 Sumário de Componentes

| Categoria | Componentes Disponíveis |
|---|---|
| **Interatividade** | [Accordion / FAQ](#1-accordion--faq-expansível), [Tabs](#2-tabs--abas-interativas), [Poll](#3-poll--enquete-com-votação-ao-vivo), [Timeline](#4-timeline--linha-do-tempo-roadmap), [Modal](#5-modal--diálogos) |
| **Mídia** | [Audio Player](#6-audio-player--podcast), [Image & Focal Point](#7-image--ponto-focal-2d), [Gallery](#8-gallery--grade-responsiva), [Embed](#9-embed-universal-spotifyyoutube) |
| **Marketing & Conversão** | [Hero Banner](#10-hero-banner-alto-impacto), [CTA Banner](#11-cta-banner), [Pricing Tables](#12-pricing-tables--tabela-de-preços), [Testimonials](#13-testimonials--depoimentos-com-estrelas), [Stats](#14-stats--contadores-de-impacto) |
| **Tipografia & Conteúdo** | [Callout Box](#15-callout-box-notion-style), [Headings](#16-headings-h1-a-h6), [Paragraph](#17-paragraph--texto-rico), [Code Block](#18-code-block--syntax-highlighting), [Quote](#19-quote--citação) |

---

## 1. Accordion / FAQ (Expansível)

O componente de Accordion permite criar seções colapsáveis perfeitas para perguntas frequentes e documentações extensas.

### 📋 Exemplo Visual:
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ❓ Como funciona a indexação no Google?                                 [-] │
│ O NextBlog CMS gera automaticamente Schema.org JSON-LD e sitemaps XML.      │
├─────────────────────────────────────────────────────────────────────────────┤
│ ❓ Posso integrar com qualquer banco SQL?                               [+] │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 💻 Estrutura de Dados JSON:
```json
{
  "type": "faq",
  "content": {
    "title": "Perguntas Frequentes",
    "subtitle": "Tire suas dúvidas sobre a plataforma",
    "items": [
      {
        "question": "Como funciona o editor visual?",
        "answer": "Você pode arrastar blocos ou digitar a tecla / para abrir os comandos rápidos."
      },
      {
        "question": "O CMS suporta banco PostgreSQL?",
        "answer": "Sim, com suporte nativo via Prisma ORM e Drizzle ORM."
      }
    ]
  },
  "styles": {
    "paddingY": "medium"
  }
}
```

### ⚙️ Tabela de Propriedades (Props):
| Campo | Tipo | Padrão | Descrição |
|---|---|---|---|
| `title` | `string` | `""` | Título principal da seção de FAQ |
| `subtitle` | `string` | `""` | Subtítulo explicativo |
| `items` | `Array<{ question: string, answer: string }>` | `[]` | Lista de perguntas e respostas |

---

## 2. Tabs / Abas Interativas

Permite alternar entre diferentes painéis de conteúdo sem recarregar a página.

### 💻 Estrutura de Dados JSON:
```json
{
  "type": "tabs",
  "content": {
    "tabs": [
      { "label": "Visão Geral", "content": "Texto introdutório sobre o recurso." },
      { "label": "Instalação", "content": "Execute npm install para começar." },
      { "label": "Exemplos de Código", "content": "Veja como consumir via GraphQL ou REST." }
    ]
  }
}
```

### ⚙️ Tabela de Propriedades:
| Campo | Tipo | Descrição |
|---|---|---|
| `tabs` | `Array<{ label: string, content: string }>` | Lista de abas com título e corpo de texto |

---

## 3. Poll / Enquete com Votação ao Vivo

Widget de engajamento que permite votação em tempo real com cálculo dinâmico de porcentagens.

### 💻 Estrutura de Dados JSON:
```json
{
  "type": "poll",
  "content": {
    "question": "Qual é a sua funcionalidade favorita no NextBlog CMS?",
    "options": [
      { "text": "Editor Notion-style com Slash Commands (/)", "votes": 42 },
      { "text": "Inteligência Artificial Groq ultra-rápida", "votes": 38 },
      { "text": "Ponto Focal 2D para Fotos (Wagtail style)", "votes": 25 },
      { "text": "Deploy em 1 Clique (Vercel / Railway / Render)", "votes": 31 }
    ]
  }
}
```

---

## 4. Timeline / Linha do Tempo & Roadmap

Exibe marcos cronológicos sequenciais com status visual colorido (*Concluído, Ativo, Planejado*).

### 💻 Estrutura de Dados JSON:
```json
{
  "type": "timeline",
  "content": {
    "title": "Roadmap de Engenharia 2026",
    "subtitle": "Evolução da arquitetura",
    "items": [
      { "date": "Q1 2026", "title": "Lançamento do Editor 24 Blocos", "description": "Widgets interativos e slash commands.", "status": "completed" },
      { "date": "Q2 2026", "title": "Integração Groq Llama 3.3 70B", "description": "Geração de conteúdo em tempo real (< 1s).", "status": "current" },
      { "date": "Q3 2026", "title": "Microserviços Python FastAPI", "description": "Busca semântica vetorial e RAG.", "status": "upcoming" }
    ]
  }
}
```

---

## 5. Audio Player / Podcast

Player de áudio elegante em tema escuro com visualizador de ondas sonoras animadas.

### 💻 Estrutura de Dados JSON:
```json
{
  "type": "audio",
  "content": {
    "title": "Episódio #12: O Futuro dos CMS Híbridos com Next.js 15",
    "author": "Tech Lead & Redação",
    "duration": "24:18",
    "tag": "PODCAST EXCLUSIVO",
    "url": "https://example.com/podcast.mp3"
  }
}
```

---

## 6. Image & Ponto Focal 2D (Wagtail Style)

Exibição de imagem responsiva com corte inteligente baseado em retículo de coordenadas `(X, Y)`.

### 💻 Estrutura de Dados JSON:
```json
{
  "type": "image",
  "content": {
    "url": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
    "altText": "Placa de circuito integrado de alta tecnologia",
    "caption": "Arquitetura de microsserviços em produção",
    "focalPoint": {
      "x": 65,
      "y": 40
    }
  }
}
```

> [!TIP]
> **Como o CSS aplica o Ponto Focal**: O componente gera automaticamente `style="object-position: 65% 40%"`, garantindo que mesmo em telas verticais de celular o foco principal nunca seja cortado.

---

## 7. Callout Box (Destaque Notion Style)

Caixa de alerta e destaque com ícone e 6 opções semânticas de cores.

### 💻 Estrutura de Dados JSON:
```json
{
  "type": "callout",
  "content": {
    "type": "tip",
    "title": "Dica de Alta Performance",
    "message": "Utilize o plugin Cloudflare Edge Purge para invalidar o cache em menos de 50ms após publicar um novo post."
  }
}
```

### 🎨 Variações Disponíveis (`type`):
* `info`: Azul informativo com ícone de informação.
* `tip`: Esmeralda / Verde com ícone de lâmpada.
* `warning`: Âmbar / Amarelo com ícone de alerta.
* `error`: Carmesim / Vermelho com ícone de erro.
* `neutral`: Ardósia / Cinza neutro moderno.

---

## 8. Pricing Tables (Tabela de Preços SaaS)

Grade de cards de planos com lista de benefícios, valores e badge de plano mais popular.

### 💻 Estrutura de Dados JSON:
```json
{
  "type": "pricing",
  "content": {
    "title": "Planos Transparentes",
    "subtitle": "Escolha o melhor plano para o seu negócio",
    "plans": [
      {
        "name": "Starter",
        "price": "R$ 0",
        "period": "/mês",
        "description": "Ideal para blogs pessoais e projetos individuais.",
        "features": ["1 Usuário Admin", "Até 50 Artigos", "API REST", "Suporte da Comunidade"],
        "buttonText": "Começar Grátis",
        "isPopular": false
      },
      {
        "name": "Pro Scale",
        "price": "R$ 89",
        "period": "/mês",
        "description": "Para times editoriais e publicações em crescimento.",
        "features": ["Usuários Ilimitados (RBAC)", "Artigos Ilimitados", "GraphQL + REST", "Groq AI Ilimitado", "Suporte Prioritário"],
        "buttonText": "Assinar Plano Pro",
        "isPopular": true
      }
    ]
  }
}
```
