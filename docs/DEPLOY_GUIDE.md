# 🚀 Guia Oficial de Deploy Multi-Nuvem do NextBlog CMS

> **Instruções passo a passo para hospedar o NextBlog CMS com 1 clique nos principais provedores de nuvem do mundo.**

---

## 📑 Sumário

1. [▲ Vercel (Recomendado para Next.js 15)](#1--vercel-recomendado-para-nextjs-15)
2. [▲ Netlify](#2--netlify)
3. [🚂 Railway.app](#3--railwayapp)
4. [🟣 Render.com](#4--rendercom)
5. [🐳 Docker / Coolify / CapRover / VPS](#5--docker--coolify--caprover--vps)
6. [🧙‍♂️ Assistente de Instalação (Setup Wizard)](#6-️-assistente-de-instalação-setup-wizard)

---

## 1. ▲ Vercel (Recomendado para Next.js 15)

A Vercel é a criadora do Next.js e oferece o melhor suporte nativo a SSR, Server Actions, rotas de API e cache em Edge CDN.

### Passo a Passo:
1. Faça push do seu repositório para o GitHub.
2. Acesse [vercel.com/new](https://vercel.com/new) e importe o repositório **`NextBlog---CMS`**.
3. O arquivo [`vercel.json`](file:///d:/FULLSTARK/NextBlog---CMS/vercel.json) já configurará os cabeçalhos de segurança automaticamente.
4. Adicione as variáveis de ambiente em **Environment Variables**:
   * `GROQ_API_KEY`: sua chave obtida em [console.groq.com/keys](https://console.groq.com/keys).
   * `DATABASE_URL`: string de conexão com seu banco PostgreSQL (Supabase, Neon, etc.).
5. Clique em **Deploy**.

---

## 2. ▲ Netlify

O NextBlog CMS inclui o manifesto oficial [`netlify.toml`](file:///d:/FULLSTARK/NextBlog---CMS/netlify.toml) configurado com o plugin `@netlify/plugin-nextjs`.

### Passo a Passo:
1. Acesse [app.netlify.com](https://app.netlify.com/) -> **Add new site** -> **Import an existing project**.
2. Selecione o repositório GitHub.
3. O Netlify detectará automaticamente o `netlify.toml`.
4. Em **Site settings** -> **Environment variables**, adicione `GROQ_API_KEY` e `DATABASE_URL`.
5. Clique em **Deploy site**.

---

## 3. 🚂 Railway.app

A Railway é ideal para quem quer hospedar o Next.js junto com um banco PostgreSQL gerenciado na mesma infraestrutura.

### Passo a Passo:
1. Acesse [railway.app/new](https://railway.app/new).
2. Clique em **Deploy from GitHub repo** e selecione `NextBlog---CMS`.
3. O arquivo [`railway.json`](file:///d:/FULLSTARK/NextBlog---CMS/railway.json) instruirá o motor Nixpacks a compilar o Next.js 15.
4. Clique em **+ New** -> **Database** -> **Add PostgreSQL**.
5. Conecte a variável `${{Postgres.DATABASE_URL}}` ao seu serviço Web.
6. Em **Variables**, adicione `GROQ_API_KEY`.
7. Gere um domínio público em **Settings** -> **Generate Domain**.

---

## 4. 🟣 Render.com

O NextBlog CMS conta com o Blueprint [`render.yaml`](file:///d:/FULLSTARK/NextBlog---CMS/render.yaml) que cria o Web Service e o banco de dados PostgreSQL simultaneamente.

### Passo a Passo:
1. Acesse [dashboard.render.com/blueprints](https://dashboard.render.com/blueprints).
2. Clique em **New Blueprint Instance** e conecte seu repositório.
3. O Render lerá o `render.yaml` e provisionará o serviço web e a instância do banco `nextblog-postgres`.
4. Insira a `GROQ_API_KEY` quando solicitado.
5. Clique em **Apply**.

---

## 5. 🐳 Docker / Coolify / CapRover / VPS

Para qualquer servidor Linux (Ubuntu, Debian, AWS EC2, DigitalOcean, Hetzner) ou gerenciadores PaaS self-hosted como **Coolify** e **CapRover**:

### Build e Execução Manual via Docker:
```bash
# 1. Construir a imagem otimizada multi-stage
docker build -t nextblog-cms .

# 2. Executar o container na porta 3000
docker run -d -p 3000:3000 \
  -e GROQ_API_KEY="sua_chave_aqui" \
  -e DATABASE_URL="postgresql://user:pass@host:5432/db" \
  --name nextblog \
  nextblog-cms
```

---

## 6. 🧙‍♂️ Assistente de Instalação (Setup Wizard)

Ao abrir o CMS pela primeira vez ou clicar no botão **"Assistente (Wizard)"** na barra superior preta:
1. **Passo 1 (Diagnóstico)**: Validação automática de versão e ambiente.
2. **Passo 2 (Banco)**: Seleção do provedor com teste de conexão instantâneo.
3. **Passo 3 (Identidade)**: Personalização do nome do site, slogan e tema inicial.
4. **Passo 4 (Admin)**: Definição do super administrador.
5. **Passo 5 (IA & Demo)**: Conexão com Groq e importação de artigos/páginas exemplo.
