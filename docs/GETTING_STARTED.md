# ⚡ Guia de Início Rápido (Getting Started)

> **Coloque o NextBlog CMS para rodar localmente ou na nuvem em menos de 3 minutos.**

---

## 💻 1. Rodando Localmente no seu Computador

### Passo 1: Clonar o Repositório
```bash
git clone https://github.com/JoadsonRocha/NextBlog---CMS.git
cd NextBlog---CMS
```

### Passo 2: Instalar Dependências
```bash
npm install
```

### Passo 3: Configurar Variáveis de Ambiente
Copie o arquivo de exemplo:
```bash
cp .env.example .env
```
*(Opcional: insira sua `GROQ_API_KEY` obtida gratuitamente em [console.groq.com/keys](https://console.groq.com/keys)).*

### Passo 4: Iniciar o Servidor
```bash
npm run dev
```
Abra seu navegador em [http://localhost:3000](http://localhost:3000).

---

## 🌐 2. Deploy na Nuvem em 1 Clique (Sem Terminal)

Basta clicar em um dos botões abaixo:

* [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FJoadsonRocha%2FNextBlog---CMS&env=GROQ_API_KEY,DATABASE_URL&project-name=nextblog-cms) **Deploy na Vercel**
* [![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https%3A%2F%2Fgithub.com%2FJoadsonRocha%2FNextBlog---CMS) **Deploy na Railway**
* [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/JoadsonRocha/NextBlog---CMS) **Deploy no Netlify**
* [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/JoadsonRocha/NextBlog---CMS) **Deploy no Render**

---

## 🧙‍♂️ 3. Usando o Assistente de Configuração (Setup Wizard)

Ao abrir o CMS pela primeira vez:
1. Clique em **"Assistente (Wizard)"** na barra superior preta.
2. O assistente visual em 5 passos guiará você para:
   * Checar os requisitos do sistema.
   * Conectar seu banco PostgreSQL ou usar o modo In-Memory.
   * Personalizar a marca e escolher o tema inicial.
   * Criar a conta do Super Administrador.
   * Conectar a IA Groq (Llama 3.3 70B).

---

## 📚 4. Próximos Passos
* 🧱 [Aprenda a usar os 24 Widgets e o Editor Notion (BLOCKS_AND_EDITOR.md)](BLOCKS_AND_EDITOR.md)
* 🗄️ [Como integrar com PostgreSQL e Prisma (DATABASE_INTEGRATION.md)](DATABASE_INTEGRATION.md)
* 📖 [Manual Completo com todas as funcionalidades (GUIA_COMPLETO_CMS.md)](GUIA_COMPLETO_CMS.md)
