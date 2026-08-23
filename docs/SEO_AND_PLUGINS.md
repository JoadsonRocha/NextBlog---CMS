# Guia de SEO Avançado e Repositório de Plugins

O **NextBlog CMS** inclui uma suíte nativa de auditoria SEO em tempo real, geração automatizada de dados estruturados Schema.org e um sistema de plugins extensível inspirado no ecossistema WordPress.

---

## 1. Suíte de SEO RankPulse Pro

Ao editar qualquer post ou página, clique em **SEO Pro** para acessar a central de otimização:

### 🎯 1.1 Auditoria e Pontuação SEO (Score 0-100)
O algoritmo analisa automaticamente 6 pilares de qualidade:
* **Tamanho do Título SEO**: Recomenda entre 30 e 65 caracteres.
* **Tamanho da Meta Descrição**: Recomenda entre 70 e 160 caracteres.
* **Palavra-chave Foco**: Verifica a presença no título e na meta descrição.
* **Riqueza de Conteúdo**: Avalia a profundidade e quantidade de blocos estruturados.
* **OpenGraph Image**: Garante que imagens de alta resolução estejam configuradas para compartilhamento.

### 🌐 1.2 Google SERP Preview
Simulação visual idêntica aos resultados de pesquisa do Google Desktop e Mobile, exibindo favicon, URL canônica, título formatado e meta descrição.

### 📱 1.3 Social Cards (Twitter / X, LinkedIn e Facebook)
Visualização em tempo real do cartão de compartilhamento em redes sociais utilizando as metatags `og:image`, `og:title` e `og:description`.

### ⚡ 1.4 Geração de Schema.org JSON-LD
Geração automática de marcação estruturada para **Rich Results** do Google:
* `BlogPosting` / `Article` (com autor, data de publicação, imagem e publisher).
* `WebPage` (para páginas institucionais).
* `FAQPage` (para blocos de perguntas e respostas).

---

## 2. Endpoints Dinâmicos de Indexação

* **Sitemap XML**: Acesse `/api/sitemap` para obter o XML atualizado com todas as URLs públicas e datas de modificação.
* **Robots.txt**: Acesse `/api/robots` para obter as diretivas automáticas de rastreamento para os robôs do Google, Bing e motores de busca.

---

## 3. Repositório e Sistema de Plugins

O CMS suporta plugins modulares com controle de ativação e telas de configuração:

| Plugin | Categoria | Descrição |
|---|---|---|
| **RankPulse SEO Pro Suite** | SEO | Auditoria SEO, Schema.org JSON-LD e SERP previews. |
| **Webhooks & Event Engine** | Utilities | Disparo de eventos para Zapier, Make, n8n, Slack e Discord. |
| **Cloudflare & Edge Cache Purge** | Performance | Invalidação instantânea de CDN e revalidação sob demanda com Next.js 15. |
| **WP Gemini AI Supercharge** | IA | Assistente com Gemini 3.7 Flash para redação, tradução e títulos. |
| **WooCommerce Headless Bridge** | eCommerce | Conexão de catálogo de produtos, checkout e pedidos. |
| **Advanced Custom Fields (ACF Pro)** | Utilities | Campos personalizados e metadados estruturados. |
| **WP Super Cache & ISR** | Performance | Cache estático e revalidação ISR. |
| **WP Mail SMTP** | Forms | Entrega de e-mails transacionais via API SMTP/SendGrid. |
