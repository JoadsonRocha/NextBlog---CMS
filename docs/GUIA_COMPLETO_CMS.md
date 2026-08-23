# 📖 Manual & Documentação Completa do NextBlog CMS

> **Guia definitivo de uso, personalização, desenvolvimento e infraestrutura do NextBlog CMS Híbrido.**

---

## 📑 Sumário

1. [Visão Geral e Conceito Híbrido](#1-visão-geral-e-conceito-híbrido)
2. [Gestão de Conteúdo (Páginas, Posts e Mídias)](#2-gestão-de-conteúdo-páginas-posts-e-mídias)
3. [Editor Notion-Style e Catálogo de 24 Widgets/Blocos](#3-editor-notion-style-e-catálogo-de-24-widgetsblocos)
4. [Slash Commands (/) e Atalhos de Teclado](#4-slash-commands--e-atalhos-de-teclado)
5. [Personalização Visual (Temas, Cores e Tipografia)](#5-personalização-visual-temas-cores-e-tipografia)
6. [Inteligência Artificial Integrada (Google Gemini)](#6-inteligência-artificial-integrada-google-gemini)
7. [Suíte RankPulse SEO Pro & Rich Data (Schema.org)](#7-suíte-rankpulse-seo-pro--rich-data-schemaorg)
8. [Ecossistema de Plugins e Extensões](#8-ecossistema-de-plugins-e-extensões)
9. [Integração com Bancos de Dados (PostgreSQL, SQLite, MongoDB)](#9-integração-com-bancos-de-dados-postgresql-sqlite-mongodb)
10. [Camada Headless (APIs REST & GraphQL)](#10-camada-headless-apis-rest--graphql)
11. [Usuários, Permissões (RBAC) e Comentários](#11-usuários-permissões-rbac-e-comentários)
12. [Deploy em Produção (Vercel, Railway, Docker)](#12-deploy-em-produção-vercel-railway-docker)

---

## 1. Visão Geral e Conceito Híbrido

O **NextBlog CMS** foi desenvolvido para solucionar a fragmentação entre os principais sistemas de gestão de conteúdo do mercado. Ele combina:

* 🟣 **WordPress**: Ecossistema maduro de plugins, customizador visual de temas, tipografias do Google Fonts, controle de usuários e moderação de comentários.
* 🔵 **Strapi**: Arquitetura Headless API-First, endpoints REST, endpoint GraphQL dinâmico, API Explorer no dashboard e flexibilidade total de banco de dados.
* 👻 **Ghost**: Foco implacável em performance (Next.js 15 ISR/SSG), SEO automatizado, cálculo de tempo de leitura e interface de leitura limpa.
* ⬛ **Notion**: Experiência modular de escrita por blocos arrastáveis, atalhos de comando barra (`/`) e templates de blocos reutilizáveis.
* 🤖 **Google Gemini**: IA nativa para redação, tradução e otimização de busca.

---

## 2. Gestão de Conteúdo (Páginas, Posts e Mídias)

### 📄 2.1 Páginas Institucionais & Landing Pages
* **Como acessar**: Menu lateral -> **Páginas**.
* **Criar nova página**: Clique em *"+ Nova Página"*.
* **Definir Página Inicial**: Marque a opção *"Definir como Home Page"* para que a URL `/` carregue esta página no site público.
* **Modelos/Templates**:
  * `Padrão`: Layout contido com cabeçalho e rodapé.
  * `Fullwidth`: Largura total de 100% da tela, ideal para seções visuais.
  * `Landing`: Layout focado em conversão e campanhas.

### 📝 2.2 Posts do Blog
* **Como acessar**: Menu lateral -> **Posts**.
* **Campos principais**: Título, Slug (URL amigável), Categoria, Tags coloridas, Autor vinculado, Imagem de destaque e Resumo (Excerpt).
* **Fluxo de Publicação**:
  * `Rascunho`: Visível apenas para administradores e editores no painel.
  * `Publicado`: Visível no site público e indexável pelos motores de busca.
  * `Agendado`: Programado para publicação automática futura.

### 🖼️ 2.3 Biblioteca de Mídia
* **Como acessar**: Menu lateral -> **Mídia**.
* Suporte a upload de imagens (JPEG, PNG, WebP, SVG), vídeos e documentos com extração de dimensões, tamanho e definição de **Alt Text** para acessibilidade e SEO.

---

## 3. Editor Notion-Style e Catálogo de 24 Widgets/Blocos

O editor opera através de componentes React independentes. Cada bloco possui configurações exclusivas no **Inspector Lateral** e pode ser arrastado, reordenado ou transformado em bloco reutilizável.

### 📋 Lista Completa de Widgets (24 Tipos):

#### 📝 Texto & Tipografia
1. **Título (Heading)**: Hierarquia H1 a H6 com controle de alinhamento.
2. **Parágrafo (Paragraph)**: Texto rico formatável.
3. **Destaque Notion (Callout)**: Caixa de destaque com ícone e 6 tons visuais (*info, warning, success, error, tip, neutral*).
4. **Citação (Quote)**: Bloco de citação elegante com autor, cargo e empresa.
5. **Código (Code)**: Bloco com syntax highlighting, seleção de linguagem e botão de cópia com 1 clique.
6. **HTML Customizado (Custom HTML)**: Inserção de código HTML/JSX direto.

#### 🖼️ Mídia & Embeds
7. **Imagem Única (Image)**: Foto com legenda, alt text e bordas arredondadas.
8. **Galeria de Imagens (Gallery)**: Grade responsiva de 2 a 4 colunas com efeito lightbox.
9. **Player de Vídeo (Video)**: Embeds responsivos de YouTube, Vimeo ou arquivos MP4.
10. **Player de Áudio / Podcast (Audio)**: Player elegante com visualizador de ondas sonoras animadas e controle de tempo.
11. **Embed Universal (Embed)**: Incorporação de Spotify, Figma, CodeSandbox, CodePen e iframes externos.

#### 📐 Layout & Estrutura
12. **Banner Hero (Hero)**: Seção principal de alto impacto com badge, título, subtítulo e botões de chamada.
13. **Abas Interativas (Tabs)**: Navegação por abas dinâmicas para condensar informações.
14. **Linha do Tempo / Roadmap (Timeline)**: Marcos sequenciais com datas, status (*concluído, ativo, planejado*) e badges.
15. **Colunas de Recursos (Columns)**: Grade flexível de 2 a 4 colunas com ícones e descrições.
16. **Divisor de Linha (Divider)**: Linha sutil para separar seções.
17. **Espaçador (Spacer)**: Espaço em branco com altura regulável.

#### 🚀 Interatividade & Marketing
18. **Enquete Interativa (Poll)**: Votação em tempo real com cálculo dinâmico de porcentagens e feedback visual.
19. **Banner de Conversão (CTA Banner)**: Banner de chamada para ação com gradientes e botões destacados.
20. **Formulário de Newsletter (Newsletter)**: Campo de captura de leads com validação instantânea.
21. **Tabela de Preços (Pricing)**: Cards de planos SaaS com recursos, preços e badges de destaque.
22. **Depoimentos de Clientes (Testimonials)**: Avaliações com fotos, nomes e classificação em estrelas.
23. **Acordeão de FAQ (FAQ)**: Perguntas e respostas expansíveis interativas.
24. **Métricas & Estatísticas (Stats)**: Contadores de números de impacto com legendas.

---

## 4. Slash Commands (/) e Atalhos de Teclado

### ⚡ Menu Flutuante Slash (`/`)
Ao editar qualquer conteúdo:
1. Pressione a tecla `/` no teclado (fora de campos de texto) ou clique em **"/ Comandos"**.
2. Digite o nome do bloco desejado (ex: `callout`, `timeline`, `tabs`, `poll`, `hero`).
3. Navegue com as setas `↑` e `↓` e pressione `Enter` para inserir imediatamente.

### ⌨️ Tabela de Atalhos Globais:
| Atalho | Função |
|---|---|
| `/` | Abre a paleta de comandos rápidos Notion-style |
| `Ctrl / ⌘ + S` | Salva o post ou página |
| `Ctrl / ⌘ + P` | Alterna entre o Modo de Edição e o Modo Preview |
| `Ctrl / ⌘ + I` | Abre o Assistente Inteligente Google Gemini |
| `?` | Abre o modal com a lista de todos os atalhos |
| `Esc` | Fecha modais, gavetas e menus suspensos |

---

## 5. Personalização Visual (Temas, Cores e Tipografia)

No menu lateral -> **Aparência**:

1. **Galeria de Temas**: Alterne entre temas prontos (*Modern SaaS, Editorial Minimal, Vibrant Creative, Dark Luxury*) com aplicação instantânea em todo o site.
2. **Fontes Google Fonts**: Selecione a tipografia principal entre *Inter, Plus Jakarta Sans, Outfit, Playfair Display e Merriweather*.
3. **Cor Primária da Marca**: Seletor de cores HSL/HEX que atualiza botões, links, badges e gradientes.
4. **Construtor de Menus**: Adicione, remova e reordene links de navegação para o cabeçalho público.
5. **CSS Customizado**: Escreva regras CSS sob medida aplicadas em tempo real.

---

## 6. Inteligência Artificial Integrada (Google Gemini)

O modal **Assistente IA** (`Ctrl + I` no editor) permite:
* **Geração de Artigos Completos**: Forneça um tópico ou palavra-chave e a IA estruturará o título, introdução, seções temáticas em blocos e conclusão.
* **Reescrita e Tom de Voz**: Alterne o texto entre tons *Profissional, Persuasivo, Didático, Técnico ou Descontraído*.
* **Geração de Títulos & SEO**: Sugestões automáticas de títulos chamativos e meta descrições otimizadas para cliques (CTR).
* **Tradução Multilíngue**: Traduza conteúdos inteiros para Inglês, Espanhol, Francês e Alemão mantendo a estrutura de blocos.

---

## 7. Suíte RankPulse SEO Pro & Rich Data (Schema.org)

Clique no botão **"SEO Pro"** dentro do editor para abrir o painel de auditoria:

* **Pontuação SEO em Tempo Real (Score 0-100)**: Avalia o tamanho ideal de títulos (30-65 caracteres), meta descrição (70-160 caracteres), palavra-chave foco e imagens.
* **Google SERP Preview**: Simulador idêntico ao resultado de busca do Google Desktop e Mobile.
* **Social Cards**: Prévia em tempo real de compartilhamento no Twitter/X, LinkedIn e Facebook OpenGraph.
* **Schema.org JSON-LD**: Gera automaticamente códigos estruturados para Rich Snippets do Google (`BlogPosting`, `WebPage`, `FAQPage`).
* **Sitemaps & Robots**: Endpoints dinâmicos prontos para produção em [`/api/sitemap`](file:///d:/FULLSTARK/NextBlog---CMS/app/api/sitemap/route.ts) e [`/api/robots`](file:///d:/FULLSTARK/NextBlog---CMS/app/api/robots/route.ts).

---

## 8. Ecossistema de Plugins e Extensões

No menu lateral -> **Plugins**, ative ou configure:
* **RankPulse SEO Pro**: Otimização avançada e dados estruturados.
* **WooCommerce Headless Bridge**: Conexão de produtos, checkout e gateways (Stripe, PIX).
* **Webhooks & Event Trigger Engine**: Disparo de eventos automáticos para Zapier, Make, n8n, Slack e Discord.
* **Cloudflare & Edge Cache Purge**: Invalidação instantânea de CDN em milissegundos via tags de cache.
* **Advanced Custom Fields (ACF Pro)**: Criação de campos extras estruturados para posts e páginas.
* **WP Mail SMTP**: Entrega de e-mails transacionais via SendGrid/Amazon SES.

---

## 9. Integração com Bancos de Dados (PostgreSQL, SQLite, MongoDB)

No menu lateral -> **Banco de Dados**:

### 🐘 9.1 PostgreSQL com Prisma ORM (Recomendado)
1. Instale o Prisma:
   ```bash
   npm install @prisma/client && npm install -D prisma
   ```
2. Adicione a conexão no `.env`:
   ```env
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/nextblog_db?schema=public"
   ```
3. Execute as migrações:
   ```bash
   npx prisma migrate dev --name init_cms_schema
   ```

### ⚡ 9.2 Drizzle ORM (Alta Performance)
* Schema em [`lib/db/drizzle/schema.ts`](file:///d:/FULLSTARK/NextBlog---CMS/lib/db/drizzle/schema.ts).
* Sincronize com: `npx drizzle-kit push`.

### 🍃 9.3 MongoDB Atlas com Mongoose
* Schema em [`lib/db/mongoose/models.ts`](file:///d:/FULLSTARK/NextBlog---CMS/lib/db/mongoose/models.ts).
* Conecte usando `MONGODB_URI="mongodb+srv://..."`.

### 💾 9.4 Backups em 1 Clique
* **Exportar Backup (JSON)**: Baixa um snapshot completo de todo o banco (posts, páginas, mídias, configurações).
* **Importar Backup**: Restaura todo o conteúdo a partir de um arquivo JSON.

---

## 10. Camada Headless (APIs REST & GraphQL)

### 🚀 10.1 Endpoints REST Disponíveis
* `GET /api/posts` — Lista todos os posts (filtros: `status`, `category`, `limit`).
* `GET /api/pages` — Lista todas as páginas públicas.
* `GET /api/blocks` — Lista todos os blocos reutilizáveis.

### 🔮 10.2 Endpoint GraphQL
* **URL**: `POST /api/graphql`
* **Exemplo de Query**:
  ```graphql
  query {
    posts(status: "published", limit: 5) {
      id
      title
      slug
      excerpt
      featuredImage
      readingTime
      blocks
    }
  }
  ```

### 🧪 10.3 API Explorer Integrado
Acesse **API Explorer** no menu lateral para testar chamadas REST e executar queries GraphQL interativamente com geração de tokens de autenticação Bearer.

---

## 11. Usuários, Permissões (RBAC) e Comentários

* **Perfis de Acesso ([`UserManager.tsx`](file:///d:/FULLSTARK/NextBlog---CMS/components/users/UserManager.tsx))**:
  * `Administrador`: Acesso total a configurações, bancos, plugins, deploy e usuários.
  * `Editor`: Criação e edição completa de posts, páginas, mídias e moderação de comentários.
  * `Visitante`: Apenas leitura e visualização pública.
* **Moderação de Comentários ([`CommentsManager.tsx`](file:///d:/FULLSTARK/NextBlog---CMS/components/comments/CommentsManager.tsx))**:
  * Abas de *Aprovados*, *Pendentes*, *Spam* e *Lixeira*.
  * Respostas diretas da administração vinculadas ao post.

---

## 12. Deploy em Produção (Vercel, Railway, Docker)

No menu lateral -> **Deploy**:

### 🔺 Vercel (Recomendado para Next.js 15)
1. Conecte seu repositório no dashboard da Vercel.
2. Defina a variável `DATABASE_URL` nas Environment Variables.
3. Deploy automático com suporte a Edge ISR e revalidação sob demanda.

### 🚂 Railway / Render / Docker
O projeto suporta build tradicional:
```bash
npm run build
npm start
```
Porta padrão: `3000`.
