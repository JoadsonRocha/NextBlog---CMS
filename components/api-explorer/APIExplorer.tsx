'use client';

import React, { useState } from 'react';
import { useCMS } from '@/lib/cms-context';
import {
  Code2,
  Play,
  Copy,
  Check,
  Zap,
  Globe,
  Database,
  Terminal,
  BookOpen,
  ArrowRight,
  Server,
  Layers,
  Send,
  Loader2,
} from 'lucide-react';

const SAMPLE_GRAPHQL_QUERIES = [
  {
    name: 'Listar Todos os Posts Publicados',
    query: `query GetPublishedPosts {
  posts(status: "published", limit: 10) {
    id
    title
    slug
    excerpt
    category
    readingTime
    featuredImage
    authorName
    publishedAt
    blocks {
      id
      type
    }
  }
}`,
    variables: '{}',
  },
  {
    name: 'Buscar Post Completo por Slug com Blocos',
    query: `query GetPostBySlug($slug: String!) {
  post(slug: $slug) {
    id
    title
    slug
    category
    excerpt
    readingTime
    authorName
    authorAvatar
    featuredImage
    seo {
      metaTitle
      metaDescription
      keywords
    }
    blocks {
      id
      type
      content
      styles
    }
  }
}`,
    variables: JSON.stringify({ slug: 'o-futuro-do-desenvolvimento-web-com-nextjs-15-e-ia' }, null, 2),
  },
  {
    name: 'Buscar Página Dinâmica e Blocos',
    query: `query GetPage($slug: String!) {
  page(slug: $slug) {
    id
    title
    slug
    isHomePage
    blocks {
      id
      type
      content
      styles
    }
  }
}`,
    variables: JSON.stringify({ slug: 'home' }, null, 2),
  },
  {
    name: 'Consultar Biblioteca de Blocos Reutilizáveis',
    query: `query GetReusableBlocks {
  reusableBlocks {
    id
    title
    category
    usageCount
    block {
      type
      content
    }
  }
}`,
    variables: '{}',
  },
];

export function APIExplorer() {
  const { addToast } = useCMS();
  const [activeTab, setActiveTab] = useState<'graphql' | 'rest' | 'webhooks'>('graphql');

  // GraphQL state
  const [selectedGqlPreset, setSelectedGqlPreset] = useState(0);
  const [gqlQuery, setGqlQuery] = useState(SAMPLE_GRAPHQL_QUERIES[0].query);
  const [gqlVariables, setGqlVariables] = useState(SAMPLE_GRAPHQL_QUERIES[0].variables);
  const [gqlResult, setGqlResult] = useState<any>(null);
  const [gqlLoading, setGqlLoading] = useState(false);

  // REST state
  const [restEndpoint, setRestEndpoint] = useState('/api/posts');
  const [restMethod, setRestMethod] = useState<'GET' | 'POST'>('GET');
  const [restResult, setRestResult] = useState<any>(null);
  const [restLoading, setRestLoading] = useState(false);
  const [codeLang, setCodeLang] = useState<'curl' | 'js' | 'python'>('js');

  const [copiedCode, setCopiedCode] = useState(false);

  const handleSelectPreset = (index: number) => {
    setSelectedGqlPreset(index);
    setGqlQuery(SAMPLE_GRAPHQL_QUERIES[index].query);
    setGqlVariables(SAMPLE_GRAPHQL_QUERIES[index].variables);
  };

  const handleRunGraphQL = async () => {
    setGqlLoading(true);
    setGqlResult(null);
    try {
      let parsedVars = {};
      try {
        parsedVars = JSON.parse(gqlVariables || '{}');
      } catch (e) {
        addToast({ type: 'error', title: 'JSON de variáveis inválido' });
        setGqlLoading(false);
        return;
      }

      const res = await fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: gqlQuery, variables: parsedVars }),
      });
      const data = await res.json();
      setGqlResult(data);
      addToast({ type: 'success', title: 'Consulta GraphQL executada!' });
    } catch (err: any) {
      setGqlResult({ error: err.message });
      addToast({ type: 'error', title: 'Erro na requisição GraphQL' });
    } finally {
      setGqlLoading(false);
    }
  };

  const handleRunREST = async () => {
    setRestLoading(true);
    setRestResult(null);
    try {
      const res = await fetch(restEndpoint);
      const data = await res.json();
      setRestResult(data);
      addToast({ type: 'success', title: 'Requisição REST concluída!' });
    } catch (err: any) {
      setRestResult({ error: err.message });
      addToast({ type: 'error', title: 'Erro na requisição REST' });
    } finally {
      setRestLoading(false);
    }
  };

  const getGeneratedCode = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://seusite.com';
    const fullUrl = `${origin}${restEndpoint}`;

    if (codeLang === 'curl') {
      return `curl -X GET "${fullUrl}" \\
  -H "Accept: application/json" \\
  -H "Authorization: Bearer NEXTBLOCK_API_KEY"`;
    }
    if (codeLang === 'js') {
      return `// JavaScript / TypeScript (Next.js, Astro, React, Node.js)
const response = await fetch("${fullUrl}", {
  headers: {
    "Accept": "application/json",
    "Authorization": "Bearer NEXTBLOCK_API_KEY"
  },
  next: { revalidate: 60 } // ISR On-demand cache
});

const data = await response.json();
console.log("Posts recebidos:", data);`;
    }
    if (codeLang === 'python') {
      return `# Python (Django, FastAPI, Flask, Pandas)
import requests

url = "${fullUrl}"
headers = {
    "Accept": "application/json",
    "Authorization": "Bearer NEXTBLOCK_API_KEY"
}

response = requests.get(url, headers=headers)
data = response.json()
print(data)`;
    }
    return '';
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
    addToast({ type: 'success', title: 'Código copiado para a área de transferência!' });
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Zap className="w-6 h-6 text-amber-500" />
            Headless API & GraphQL Playground
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Conecte frontends externos (Astro, Mobile Apps, Next.js, Flutter, Gatsby) usando REST e GraphQL em tempo real.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab('graphql')}
          className={`px-4 py-2.5 font-bold text-xs border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'graphql'
              ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Code2 className="w-4 h-4 text-indigo-600" />
          <span>GraphQL Interactive Playground</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('rest')}
          className={`px-4 py-2.5 font-bold text-xs border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'rest'
              ? 'border-blue-600 text-blue-600 bg-blue-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Globe className="w-4 h-4 text-blue-600" />
          <span>REST API Explorer & Code Snippets</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('webhooks')}
          className={`px-4 py-2.5 font-bold text-xs border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'webhooks'
              ? 'border-emerald-600 text-emerald-600 bg-emerald-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Server className="w-4 h-4 text-emerald-600" />
          <span>Webhooks & ISR Revalidation</span>
        </button>
      </div>

      {/* TAB 1: GRAPHQL PLAYGROUND */}
      {activeTab === 'graphql' && (
        <div className="space-y-4">
          {/* Preset Buttons */}
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-700 mr-2 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              Queries Prontas:
            </span>
            {SAMPLE_GRAPHQL_QUERIES.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectPreset(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedGqlPreset === idx
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Editor Col */}
            <div className="bg-slate-900 rounded-2xl p-4 text-slate-100 flex flex-col justify-between shadow-md">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="text-xs font-mono text-slate-400 ml-2">GraphQL Query Editor</span>
                </div>
                <button
                  type="button"
                  onClick={handleRunGraphQL}
                  disabled={gqlLoading}
                  className="px-3.5 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  {gqlLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  <span>Executar Query</span>
                </button>
              </div>

              <textarea
                rows={12}
                value={gqlQuery}
                onChange={(e) => setGqlQuery(e.target.value)}
                className="w-full bg-slate-950 p-3 rounded-xl font-mono text-xs text-indigo-300 border border-slate-800 focus:outline-hidden focus:border-indigo-500 leading-relaxed"
                placeholder="Insira sua query GraphQL..."
              />

              <div className="mt-3">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  Query Variables (JSON)
                </span>
                <textarea
                  rows={3}
                  value={gqlVariables}
                  onChange={(e) => setGqlVariables(e.target.value)}
                  className="w-full bg-slate-950 p-2.5 rounded-xl font-mono text-xs text-emerald-400 border border-slate-800 focus:outline-hidden focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Result Col */}
            <div className="bg-slate-900 rounded-2xl p-4 text-slate-100 flex flex-col justify-between shadow-md">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                <span className="text-xs font-mono text-slate-400">JSON Response Viewer</span>
                {gqlResult && (
                  <button
                    type="button"
                    onClick={() => handleCopy(JSON.stringify(gqlResult, null, 2))}
                    className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copiar JSON</span>
                  </button>
                )}
              </div>

              <div className="flex-1 bg-slate-950 rounded-xl p-3 border border-slate-800 overflow-y-auto max-h-[460px]">
                {gqlLoading ? (
                  <div className="h-48 flex items-center justify-center text-slate-500 text-xs gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                    <span>Executando consulta no servidor...</span>
                  </div>
                ) : gqlResult ? (
                  <pre className="font-mono text-xs text-emerald-400 leading-relaxed whitespace-pre-wrap">
                    {JSON.stringify(gqlResult, null, 2)}
                  </pre>
                ) : (
                  <div className="h-48 flex flex-col items-center justify-center text-slate-600 text-xs">
                    <Play className="w-6 h-6 mb-2 opacity-30" />
                    <span>Clique em &quot;Executar Query&quot; para testar em tempo real.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: REST API EXPLORER */}
      {activeTab === 'rest' && (
        <div className="space-y-6">
          {/* Request bar */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center gap-3">
            <div className="px-3 py-2 rounded-lg bg-blue-100 text-blue-800 font-bold text-xs">
              {restMethod}
            </div>

            <div className="relative flex-1 w-full">
              <select
                value={restEndpoint}
                onChange={(e) => setRestEndpoint(e.target.value)}
                className="w-full p-2 text-xs sm:text-sm rounded-lg border border-slate-300 bg-slate-50 font-mono font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                <option value="/api/posts">/api/posts (Listar todos os artigos)</option>
                <option value="/api/posts?status=published&category=Tecnologia">/api/posts?status=published&category=Tecnologia</option>
                <option value="/api/pages">/api/pages (Listar páginas do site)</option>
                <option value="/api/blocks">/api/blocks (Listar biblioteca de blocos)</option>
              </select>
            </div>

            <button
              type="button"
              onClick={handleRunREST}
              disabled={restLoading}
              className="w-full sm:w-auto px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              {restLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>Testar Requisição</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Live Response */}
            <div className="bg-slate-900 rounded-2xl p-5 text-slate-100 shadow-md">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                <span className="text-xs font-mono text-slate-400">Resposta HTTP 200 OK</span>
                {restResult && (
                  <button
                    type="button"
                    onClick={() => handleCopy(JSON.stringify(restResult, null, 2))}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copiar</span>
                  </button>
                )}
              </div>
              <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 max-h-80 overflow-y-auto font-mono text-xs text-blue-300">
                {restLoading ? (
                  <div className="p-8 text-center text-slate-500">Carregando...</div>
                ) : restResult ? (
                  <pre className="whitespace-pre-wrap leading-relaxed">
                    {JSON.stringify(restResult, null, 2)}
                  </pre>
                ) : (
                  <div className="p-8 text-center text-slate-600">
                    Clique em &quot;Testar Requisição&quot; para enviar a chamada GET.
                  </div>
                )}
              </div>
            </div>

            {/* Generated Code Snippet */}
            <div className="bg-slate-900 rounded-2xl p-5 text-slate-100 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                  <div className="flex items-center gap-1.5 text-xs">
                    <button
                      type="button"
                      onClick={() => setCodeLang('js')}
                      className={`px-2.5 py-1 rounded font-semibold ${
                        codeLang === 'js' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      JavaScript / Next.js
                    </button>
                    <button
                      type="button"
                      onClick={() => setCodeLang('curl')}
                      className={`px-2.5 py-1 rounded font-semibold ${
                        codeLang === 'curl' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      cURL
                    </button>
                    <button
                      type="button"
                      onClick={() => setCodeLang('python')}
                      className={`px-2.5 py-1 rounded font-semibold ${
                        codeLang === 'python' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Python
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(getGeneratedCode())}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1"
                  >
                    {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>

                <pre className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-amber-300 border border-slate-800 overflow-x-auto leading-relaxed">
                  {getGeneratedCode()}
                </pre>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-blue-950/40 border border-blue-800/40 text-xs text-blue-200">
                <span className="font-bold block mb-1">Dica de Performance:</span>
                Utilize <code className="bg-slate-800 px-1 py-0.5 rounded text-white">next: &#123; revalidate: 60 &#125;</code> para obter carregamento instantâneo via Incremental Static Regeneration no seu app consumidor.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: WEBHOOKS & ISR */}
      {activeTab === 'webhooks' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-1">Webhooks de Revalidação em Tempo Real (ISR)</h2>
            <p className="text-xs text-slate-500">
              Notifique seu frontend quando um post ou página for publicado para revalidar o cache estático instantaneamente sem rebuild completo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700">Eventos Emitidos</h3>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                  <span className="font-mono text-blue-600 font-bold">post.published</span>
                  <span className="text-slate-500">Disparado quando um post vai ao ar</span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                  <span className="font-mono text-blue-600 font-bold">post.updated</span>
                  <span className="text-slate-500">Disparado ao salvar alterações</span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                  <span className="font-mono text-indigo-600 font-bold">page.published</span>
                  <span className="text-slate-500">Disparado ao publicar uma landing page</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 text-slate-100 space-y-3 font-mono text-xs">
              <span className="font-bold uppercase tracking-wider text-slate-400 block font-sans">
                Exemplo de Handler no Next.js do Consumidor:
              </span>
              <pre className="p-3 bg-slate-950 rounded-lg text-emerald-400 border border-slate-800 leading-relaxed">
{`// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { event, slug, secret } = await request.json();
  if (secret !== process.env.CMS_WEBHOOK_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  // Revalida a página no cache da CDN instantaneamente
  revalidatePath(\`/blog/\${slug}\`);
  return NextResponse.json({ revalidated: true });
}`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
