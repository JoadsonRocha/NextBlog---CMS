# 🐍 Integração Python & Recursos Inspirados em CMSs Python (Wagtail & Plone)

> **Como o NextBlog CMS incorpora os melhores padrões de governança, integridade de dados e pipelines de IA do ecossistema Python.**

---

## 📑 Sumário
1. [Inspirações do Ecossistema Python](#1-inspirações-do-ecossistema-python)
2. [Recursos Python Implementados no NextBlog CMS](#2-recursos-python-implementados-no-nextblog-cms)
   - [2.1 Ponto Focal 2D para Imagens (Wagtail Renditions)](#21-ponto-focal-2d-para-imagens-wagtail-renditions)
   - [2.2 Histórico de Versões & Comparador Visual Diff (Wagtail Revisions)](#22-histórico-de-versões--comparador-visual-diff-wagtail-revisions)
   - [2.3 Workflow Editorial & Moderação por Etapas (Plone Governance)](#23-workflow-editorial--moderação-por-etapas-plone-governance)
   - [2.4 Árvore de Páginas Hierárquica (Wagtail Page Tree)](#24-árvore-de-páginas-hierárquica-wagtail-page-tree)
3. [Microserviço Python FastAPI para Busca Semântica Vetorial](#3-microserviço-python-fastapi-para-busca-semântica-vetorial)
4. [Microserviço Python para Geração Automatizada de PDF & E-books](#4-microserviço-python-para-geração-automatizada-de-pdf--e-books)

---

## 1. Inspirações do Ecossistema Python

Os CMSs em Python (notavelmente **Wagtail CMS** utilizado por NASA, Google e Torchbox, e **Plone CMS** utilizado por governos e instituições financeiras) são as referências da indústria em:

* **Integridade de Dados (StreamField)**: O conteúdo não é uma sopa de HTML estático, mas sim fluxos de blocos estritamente tipados e versionáveis.
* **Governança Empresarial**: Controle estrito de aprovações onde editores submetem conteúdos para administradores revisarem antes da publicação.
* **Pipelines Assíncronos**: Integração natural com ecossistemas de Machine Learning, busca vetorial e geração de documentos.

---

## 2. Recursos Python Implementados no NextBlog CMS

### 2.1 Ponto Focal 2D para Imagens (Wagtail Renditions)
* **Como funciona**: No [`BlockInspector.tsx`](file:///d:/FULLSTARK/NextBlog---CMS/components/editor/BlockInspector.tsx), ao selecionar qualquer imagem, o editor visualiza a miniatura e clica no ponto de maior relevância (ex: rosto de uma pessoa, logo da marca).
* **Renderização**: O componente armazena `{ focalPoint: { x: number, y: number } }` e renderiza `object-position: ${x}% ${y}%` no CSS do [`BlockRenderer.tsx`](file:///d:/FULLSTARK/NextBlog---CMS/components/blocks/BlockRenderer.tsx). Em qualquer formato de tela (desktop, mobile, banner 16:9 ou card 1:1), o assunto principal nunca é cortado.

### 2.2 Histórico de Versões & Comparador Visual Diff (Wagtail Revisions)
* **Como funciona**: No menu superior do editor, o botão **"Versões"** abre o [`RevisionsModal.tsx`](file:///d:/FULLSTARK/NextBlog---CMS/components/editor/RevisionsModal.tsx).
* **Comparação**: O sistema compara os blocos da versão selecionada com os blocos atuais, calculando adições, alterações e remoções.
* **Restauração em 1 Clique**: Qualquer snapshot anterior pode ser restaurado instantaneamente com o botão *"Restaurar Esta Versão"*.

### 2.3 Workflow Editorial & Moderação por Etapas (Plone Governance)
* **Fluxo de Estados**:
  ```
  [Rascunho (Draft)] ──► [Em Revisão (In Review)] ──► [Aprovado (Approved)] ──► [Publicado (Published)]
                                                                           └──► [Arquivado (Archived)]
  ```
* **Controle por Papel (RBAC)**:
  * Editores podem criar rascunhos e clicar em **"Solicitar Revisão"**.
  * Administradores recebem o status e podem clicar em **"Aprovar Conteúdo"** e **"Publicar Agora"**.

### 2.4 Árvore de Páginas Hierárquica (Wagtail Page Tree)
* No painel de páginas ([`PagesManager.tsx`](file:///d:/FULLSTARK/NextBlog---CMS/components/pages/PagesManager.tsx)), alterne para o modo **"Árvore (Wagtail Tree)"** para gerenciar páginas-mãe e subpáginas com herança de caminhos de URL (ex: `/empresa/sobre-nos` e `/empresa/equipe`).

---

## 3. Microserviço Python FastAPI para Busca Semântica Vetorial

Para adicionar inteligência semântica e busca vetorial por significado (RAG) aos posts do NextBlog CMS, utilize o microserviço FastAPI abaixo:

### `server.py` (Python FastAPI + ChromaDB + SentenceTransformers)
```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import chromadb
from sentence_transformers import SentenceTransformer

app = FastAPI(title="NextBlog CMS Python Vector Engine", version="1.0.0")

# Inicializa ChromaDB e Modelo de Embeddings
chroma_client = chromadb.Client()
collection = chroma_client.get_or_create_collection(name="nextblog_posts")
model = SentenceTransformer("all-MiniLM-L6-v2")

class PostIndexRequest(BaseModel):
    id: str
    title: str
    excerpt: str
    content: str
    category: str

class SemanticSearchQuery(BaseModel):
    query: str
    limit: Optional[int] = 5

@app.post("/api/v1/embeddings/index")
async def index_post(post: PostIndexRequest):
    """Indexa o post no banco vetorial gerando embeddings densos."""
    full_text = f"{post.title}. {post.excerpt}. {post.content}"
    embedding = model.encode(full_text).tolist()
    
    collection.upsert(
        ids=[post.id],
        embeddings=[embedding],
        metadatas=[{"title": post.title, "category": post.category, "excerpt": post.excerpt}]
    )
    return {"status": "indexed", "post_id": post.id}

@app.post("/api/v1/search/semantic")
async def semantic_search(search: SemanticSearchQuery):
    """Realiza busca vetorial por similaridade de cosseno."""
    query_embedding = model.encode(search.query).tolist()
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=search.limit
    )
    return {"results": results}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

### Como consumir do Next.js:
Na sua rota de API `app/api/search/route.ts`:
```typescript
export async function POST(req: Request) {
  const { query } = await req.json();
  const res = await fetch('http://localhost:8000/api/v1/search/semantic', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, limit: 5 }),
  });
  return Response.json(await res.json());
}
```

---

## 4. Microserviço Python para Geração Automatizada de PDF & E-books

Para converter séries de artigos em e-books ou apostilas em PDF com alta fidelidade tipográfica:

```python
from fastapi import FastAPI, Response
from pydantic import BaseModel
from weasyprint import HTML, CSS

app = FastAPI()

class PDFExportRequest(BaseModel):
    title: str
    author: str
    html_content: str

@app.post("/api/v1/export/pdf")
async def export_post_pdf(data: PDFExportRequest):
    styled_html = f"""
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          @page {{ margin: 2cm; }}
          body {{ font-family: 'Helvetica Neue', Arial, sans-serif; color: #1e293b; line-height: 1.6; }}
          h1 {{ color: #1e40af; font-size: 26pt; margin-bottom: 8px; }}
          .author {{ color: #64748b; font-size: 11pt; margin-bottom: 24px; }}
        </style>
      </head>
      <body>
        <h1>{data.title}</h1>
        <div class="author">Por {data.author} — NextBlog CMS</div>
        <div class="content">{data.html_content}</div>
      </body>
    </html>
    """
    pdf_bytes = HTML(string=styled_html).write_pdf()
    return Response(content=pdf_bytes, media_type="application/pdf")
```
