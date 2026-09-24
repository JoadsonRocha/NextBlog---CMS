# 🧩 Component & Widget Catalog (Bootstrap Style)

> **Complete reference guide to NextBlog CMS modular blocks, JSON data schemas, prop interfaces, and render examples.**

---

## 📑 Component Directory

| Category | Available Widgets |
|---|---|
| **Interactive & Engagement** | [Accordion / FAQ](#1-accordion--faq-collapsible), [Tabs](#2-tabs--interactive-panels), [Poll](#3-poll--live-voting-widget), [Timeline & Roadmap](#4-timeline--roadmap), [Modal Dialog](#5-modal-dialog) |
| **Rich Media** | [Audio Player](#6-audio--podcast-player), [Image & 2D Focal Point](#7-image--2d-focal-point-wagtail-style), [Gallery](#8-responsive-grid-gallery), [Universal Embed](#9-universal-embed-youtubespotifyfigma) |
| **Marketing & SaaS** | [Hero Banner](#10-hero-banner), [CTA Banner](#11-cta-conversion-banner), [Pricing Tables](#12-saas-pricing-tables), [Testimonials](#13-star-rating-testimonials), [Stats Counters](#14-kpi-stats-counters) |
| **Editorial & Typography** | [Callout Box](#15-notion-style-callout-box), [Headings](#16-structured-headings-h1h6), [Rich Paragraph](#17-rich-paragraph), [Code Block](#18-syntax-highlighted-code-block), [Blockquote](#19-blockquote) |

---

## 1. Accordion / FAQ (Collapsible)

The Accordion component generates collapsible disclosure panels ideal for FAQs, product specs, and structured documentation.

### 📋 Visual Structure:
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ❓ How does Google SEO indexing work in NextBlog CMS?                   [-] │
│ NextBlog CMS automatically injects Schema.org JSON-LD and dynamic XML.      │
├─────────────────────────────────────────────────────────────────────────────┤
│ ❓ Can I connect to external PostgreSQL databases?                      [+] │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 💻 JSON Data Schema:
```json
{
  "type": "faq",
  "content": {
    "title": "Frequently Asked Questions",
    "subtitle": "Everything you need to know about the platform",
    "items": [
      {
        "question": "How does the Notion-style editor work?",
        "answer": "Drag and drop any block or press the / key to open the instant Slash Command menu."
      },
      {
        "question": "Does NextBlog CMS support PostgreSQL?",
        "answer": "Yes, native support is provided through Prisma ORM and Drizzle ORM."
      }
    ]
  },
  "styles": {
    "paddingY": "medium"
  }
}
```

### ⚙️ Properties Table (Props):
| Property | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `""` | Primary header for the FAQ section |
| `subtitle` | `string` | `""` | Supporting descriptive subtitle |
| `items` | `Array<{ question: string, answer: string }>` | `[]` | Array of collapsible question and answer pairs |

---

## 2. Tabs / Interactive Panels

Allows users to switch between multiple content views without triggering page reloads.

### 💻 JSON Data Schema:
```json
{
  "type": "tabs",
  "content": {
    "tabs": [
      { "label": "Overview", "content": "Introductory summary explaining the core feature set." },
      { "label": "Installation", "content": "Run `npm install` and `npm run dev` to get started." },
      { "label": "Code Examples", "content": "Explore sample GraphQL queries and REST endpoints." }
    ]
  }
}
```

---

## 3. Poll / Live Voting Widget

Interactive engagement widget supporting real-time voting with dynamic percentage and bar calculations.

### 💻 JSON Data Schema:
```json
{
  "type": "poll",
  "content": {
    "question": "What is your favorite capability in NextBlog CMS?",
    "options": [
      { "text": "Notion-style Editor with Slash Commands (/)", "votes": 42 },
      { "text": "Sub-second Groq AI Llama 3.3 Copilot", "votes": 38 },
      { "text": "2D Focal Point Image Cropping (Wagtail style)", "votes": 25 },
      { "text": "1-Click Cloud Deployment (Vercel / Railway / Render)", "votes": 31 }
    ]
  }
}
```

---

## 4. Timeline / Roadmap

Chronological milestones with colored status badges (*Completed, In Progress, Upcoming*).

### 💻 JSON Data Schema:
```json
{
  "type": "timeline",
  "content": {
    "title": "Engineering Roadmap 2026",
    "subtitle": "Next-generation architecture evolution",
    "items": [
      { "date": "Q1 2026", "title": "24-Block Notion Canvas", "description": "Interactive widgets and slash commands.", "status": "completed" },
      { "date": "Q2 2026", "title": "Groq Llama 3.3 70B Integration", "description": "Sub-second AI copy generation.", "status": "current" },
      { "date": "Q3 2026", "title": "Python FastAPI Sidecar", "description": "Vector semantic search and automated RAG.", "status": "upcoming" }
    ]
  }
}
```

---

## 5. Audio / Podcast Player

Sleek, dark-themed audio player featuring animated sound wave bars.

### 💻 JSON Data Schema:
```json
{
  "type": "audio",
  "content": {
    "title": "Episode #12: The Future of Hybrid CMS on Next.js 15",
    "author": "Engineering Lead & Editorial Board",
    "duration": "24:18",
    "tag": "EXCLUSIVE PODCAST",
    "url": "https://example.com/podcast.mp3"
  }
}
```

---

## 6. Image & 2D Focal Point (Wagtail Style)

Responsive image display with coordinate-based focus reticle `(X, Y)` to prevent awkward cropping across portrait and mobile displays.

### 💻 JSON Data Schema:
```json
{
  "type": "image",
  "content": {
    "url": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
    "altText": "High-tech integrated circuit board",
    "caption": "Production microservice infrastructure",
    "focalPoint": {
      "x": 65,
      "y": 40
    }
  }
}
```

> [!TIP]
> **CSS Implementation**: The component automatically computes `style="object-position: 65% 40%"`, ensuring that portrait and mobile layouts maintain optimal visual framing.

---

## 7. Notion-Style Callout Box

Highlighted alert banner supporting custom icons and 5 semantic color themes.

### 💻 JSON Data Schema:
```json
{
  "type": "callout",
  "content": {
    "type": "tip",
    "title": "Performance Optimization Tip",
    "message": "Leverage the Cloudflare Edge Cache plugin to purge global edge caches in under 50ms upon article publication."
  }
}
```

### 🎨 Available Types (`type`):
* `info`: Cool blue with informative shield icon.
* `tip`: Emerald green with incandescent bulb icon.
* `warning`: Warm amber with alert triangle icon.
* `error`: Crimson red with circle-x icon.
* `neutral`: Slate monochrome for minimal documentation styling.

---

## 8. SaaS Pricing Tables

Tiered subscription cards with feature checklists, pricing badges, and highlighted best-value tiers.

### 💻 JSON Data Schema:
```json
{
  "type": "pricing",
  "content": {
    "title": "Transparent Plans",
    "subtitle": "Choose the optimal plan for your organization",
    "plans": [
      {
        "name": "Starter",
        "price": "$0",
        "period": "/mo",
        "description": "Ideal for personal publications and developer blogs.",
        "features": ["1 Admin Seat", "Up to 50 Articles", "Headless REST API", "Community Support"],
        "buttonText": "Get Started Free",
        "isPopular": false
      },
      {
        "name": "Pro Scale",
        "price": "$29",
        "period": "/mo",
        "description": "For growing editorial teams and digital publications.",
        "features": ["Unlimited Seats (RBAC)", "Unlimited Articles", "GraphQL + REST Gateways", "Unlimited Groq AI Invocations", "Priority Support"],
        "buttonText": "Upgrade to Pro",
        "isPopular": true
      }
    ]
  }
}
```
