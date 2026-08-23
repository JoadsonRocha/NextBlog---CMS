# 🎨 Customização Visual & Design System (Estilo Bootstrap)

> **Guia de estilização, variáveis CSS, temas prontos e fontes do Google Fonts no NextBlog CMS.**

---

## 📑 Sumário

1. [Temas Nativos](#1-temas-nativos)
2. [Variáveis CSS (Design Tokens)](#2-variáveis-css-design-tokens)
3. [Tipografia & Google Fonts](#3-tipografia--google-fonts)
4. [Injeção de CSS Customizado](#4-injeção-de-css-customizado)

---

## 1. Temas Nativos

O NextBlog CMS conta com 4 temas profissionais prontos para produção que podem ser alternados com 1 clique no menu **Aparência**:

| Tema | Família Tipográfica | Cor Primária | Estilo Visual |
|---|---|---|---|
| **Modern SaaS** *(Padrão)* | `Inter` / `Plus Jakarta Sans` | `#2563eb` (Azul Elétrico) | Clean, moderno, com bordas arredondadas e sombras suaves. |
| **Editorial Minimal** | `Merriweather` / `Lora` | `#0f172a` (Ardósia Escuro) | Estilo clássico de revista e jornal com foco extremo em leitura longa. |
| **Vibrant Creative** | `Outfit` / `Poppins` | `#7c3aed` (Roxo Vibrante) | Gradientes expressivos, estética jovem e startups. |
| **Dark Luxury** | `Playfair Display` | `#f59e0b` (Dourado Âmbar) | Fundo escuro com contrastes premium e serifas refinadas. |

---

## 2. Variáveis CSS (Design Tokens)

O tema do site é controlado pelas variáveis CSS nativas injetadas no elemento `:root`:

```css
:root {
  /* Cores da Marca */
  --cms-primary: #2563eb;
  --cms-primary-hover: #1d4ed8;
  --cms-primary-light: #eff6ff;

  /* Tipografia */
  --cms-font-heading: 'Inter', system-ui, -apple-system, sans-serif;
  --cms-font-body: 'Inter', system-ui, -apple-system, sans-serif;

  /* Layout & Espaçamento */
  --cms-container-max: 1280px;
  --cms-radius-sm: 8px;
  --cms-radius-md: 12px;
  --cms-radius-lg: 16px;
  --cms-radius-full: 9999px;

  /* Sombras */
  --cms-shadow-card: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --cms-shadow-dropdown: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}
```

---

## 3. Tipografia & Google Fonts

Você pode alternar a fonte de todo o site no painel **Aparência** -> **Tipografia**:

```html
<!-- Injeção automática de Google Fonts de alta performance -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&family=Outfit:wght@400;600;800&family=Playfair+Display:ital,wght@0,600;0,800;1,400&family=Plus+Jakarta+Sans:wght@500;700;800&family=Merriweather:ital,wght@0,400;0,700;1,300&display=swap" rel="stylesheet">
```

---

## 4. Injeção de CSS Customizado

No menu **Aparência** -> **CSS Customizado**, administradores podem escrever regras CSS personalizadas que sobrescrevem os estilos padrão sem precisar recompilar a aplicação:

```css
/* Exemplo de estilização sob medida para botões */
.cms-cta-button {
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  border-radius: 9999px;
  box-shadow: 0 4px 14px 0 rgba(37, 99, 235, 0.39);
  transition: transform 0.2s ease;
}

.cms-cta-button:hover {
  transform: translateY(-2px);
}
```
