# ⚡ Getting Started Guide

> **Get NextBlog CMS running locally or deployed to the cloud in under 3 minutes.**

---

## 💻 1. Local Development Setup

### System Prerequisites
Ensure your development environment meets the following baseline requirements:
* **Node.js**: `v20.x` or `v22.x` (LTS versions recommended)
* **Package Manager**: `npm` (v10+), `pnpm`, or `yarn`
* **Git**: Installed and accessible via CLI

### Step 1: Clone the Repository
Clone the codebase to your local machine and navigate into the project root:
```bash
git clone https://github.com/JoadsonRocha/NextBlog---CMS.git
cd NextBlog---CMS
```

### Step 2: Install Dependencies
Install all required runtime and development packages:
```bash
npm install
```

### Step 3: Configure Environment Variables
Copy the default environment template:
```bash
cp .env.example .env
```

Open `.env` in your preferred editor. The default configuration includes sensible fallbacks:
```env
# Database Connection (Optional - defaults to in-memory/reactive mode if omitted)
DATABASE_URL="postgresql://user:password@localhost:5432/nextblog_db?schema=public"

# Groq Cloud AI Copilot (Optional - get free sub-second inference at console.groq.com)
GROQ_API_KEY=""

# Application Host URL
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# Initial Active Design Theme (modern | editorial | saas | vibrant | dark)
NEXT_PUBLIC_DEFAULT_THEME="modern"
```

### Step 4: Start the Development Server
Launch the Next.js development server with Turbopack acceleration:
```bash
npm run dev
```

Your application is now live at:
* 🌐 **Public Website**: [http://localhost:3000](http://localhost:3000)
* 🛠️ **Administrative Control Center**: [http://localhost:3000/admin](http://localhost:3000/admin)
* 📚 **Interactive Documentation**: [http://localhost:3000/docs](http://localhost:3000/docs)

---

## 🌐 2. 1-Click Cloud Deployment (No Terminal Required)

Deploy instantly to your preferred cloud infrastructure with automated CI/CD and SSL provisioning:

* [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FJoadsonRocha%2FNextBlog---CMS&env=GROQ_API_KEY,DATABASE_URL&project-name=nextblog-cms) **Deploy to Vercel**: Optimized for Next.js App Router, Edge Middleware, and Vercel Postgres/Storage.
* [![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https%3A%2F%2Fgithub.com%2FJoadsonRocha%2FNextBlog---CMS) **Deploy to Railway**: Native containerized environment with integrated PostgreSQL provisioning.
* [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/JoadsonRocha/NextBlog---CMS) **Deploy to Netlify**: Serverless Next.js runtime with instant CDN edge caching.
* [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/JoadsonRocha/NextBlog---CMS) **Deploy to Render**: Automated web service provisioning from blueprint definitions.

---

## 🧙‍♂️ 3. 5-Minute Setup Wizard

When opening NextBlog CMS for the first time, or whenever you trigger **"Wizard"** from the top administrative bar, a 5-step visual installer launches:

1. **System Health Verification**:
   * Evaluates Node runtime, Next.js 15 framework health, and client browser capabilities.
2. **Database Engine Selection**:
   * Choose between **Vercel Storage & Supabase (1-Click)**, **Zero-Config Browser Storage**, or a **Custom SQL/NoSQL Connection String** with real-time connectivity testing.
3. **Branding & Visual Identity**:
   * Set your site name, tagline, branding icon, and select an initial visual theme.
4. **Super Administrator Account**:
   * Provision master administrative credentials with strict RBAC privilege delegation.
5. **AI Inference & Starter Seed**:
   * Connect your Groq API key and choose whether to import sample articles, categories, and blocks.

---

## 📚 4. Next Steps

* 🧩 **[Explore the 24 Notion-Style Block Widgets](COMPONENTS.md)**
* ✏️ **[Learn Visual Editor Shortcuts and Slash Commands](BLOCKS_AND_EDITOR.md)**
* 🗄️ **[Connect PostgreSQL with Prisma ORM](DATABASE_INTEGRATION.md)**
* 🚀 **[Multi-Cloud Production Deployment Guide](DEPLOY_GUIDE.md)**
