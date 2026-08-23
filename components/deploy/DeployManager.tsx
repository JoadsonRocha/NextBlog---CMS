'use client';

import React, { useState } from 'react';
import { useCMS } from '@/lib/cms-context';
import {
  Rocket,
  CheckCircle2,
  ExternalLink,
  RefreshCw,
  GitBranch,
  Terminal,
  Server,
  Cloud,
  Layers,
  Copy,
  Check,
  ShieldAlert,
} from 'lucide-react';

export function DeployManager() {
  const { deployment, triggerDeploy, settings, addToast } = useCMS();
  const [activePlatform, setActivePlatform] = useState<'vercel' | 'railway' | 'docker'>('vercel');
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
    addToast({ type: 'success', title: 'Configuração copiada!' });
  };

  const VERCEL_CONFIG = `{
  "buildCommand": "npm run build",
  "framework": "nextjs",
  "installCommand": "npm install",
  "outputDirectory": ".next",
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Credentials", "value": "true" },
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Methods", "value": "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
        { "key": "Access-Control-Allow-Headers", "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization" }
      ]
    }
  ]
}`;

  const RAILWAY_DOCKERFILE = `# Railway / Dockerfile Production Build
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild source code
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Production image, copy all files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
`;

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Rocket className="w-6 h-6 text-indigo-600" />
            Central de Deploy & Hospedagem
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Implante seu CMS no Vercel, Railway ou Docker com configurações otimizadas para SSR e ISR.
          </p>
        </div>

        <button
          type="button"
          onClick={triggerDeploy}
          disabled={deployment.status === 'building'}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${deployment.status === 'building' ? 'animate-spin' : ''}`} />
          <span>{deployment.status === 'building' ? 'Compilando e Publicando...' : 'Disparar Novo Deploy'}</span>
        </button>
      </div>

      {/* Live Deployment Status Card */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-900">Produção Ativa</span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {deployment.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">{deployment.url}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-1.5 font-mono">
              <GitBranch className="w-3.5 h-3.5 text-slate-400" />
              <span>{deployment.branch}</span>
            </div>
            <span>•</span>
            <span className="font-mono">{deployment.commit}</span>
          </div>
        </div>

        {/* Build log simulation */}
        <div className="p-3.5 bg-slate-950 rounded-xl font-mono text-xs text-slate-300 space-y-1">
          <p className="text-emerald-400 font-bold">✓ Next.js 15.4 App Router Build Succeeded</p>
          <p className="text-slate-400">○ Generating static pages with ISR (Incremental Static Regeneration)...</p>
          <p className="text-slate-400">● Dynamic server endpoints initialized (/api/graphql, /api/posts, /api/gemini)</p>
          <p className="text-blue-400">⚡ Edge caching active on global CDN nodes</p>
        </div>
      </div>

      {/* Platform Instructions */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200">
          <button
            type="button"
            onClick={() => setActivePlatform('vercel')}
            className={`px-4 py-2.5 font-bold text-xs border-b-2 transition-all flex items-center gap-2 ${
              activePlatform === 'vercel'
                ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Cloud className="w-4 h-4 text-indigo-600" />
            <span>Vercel (Recomendado)</span>
          </button>
          <button
            type="button"
            onClick={() => setActivePlatform('railway')}
            className={`px-4 py-2.5 font-bold text-xs border-b-2 transition-all flex items-center gap-2 ${
              activePlatform === 'railway'
                ? 'border-purple-600 text-purple-600 bg-purple-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Server className="w-4 h-4 text-purple-600" />
            <span>Railway.app</span>
          </button>
          <button
            type="button"
            onClick={() => setActivePlatform('docker')}
            className={`px-4 py-2.5 font-bold text-xs border-b-2 transition-all flex items-center gap-2 ${
              activePlatform === 'docker'
                ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Terminal className="w-4 h-4 text-blue-600" />
            <span>Docker & Kubernetes</span>
          </button>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 text-slate-100 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono text-slate-400">
              {activePlatform === 'vercel'
                ? 'vercel.json (Configuração de Rotas e Headers CORS)'
                : 'Dockerfile (Multi-Stage Production Container)'}
            </span>
            <button
              type="button"
              onClick={() =>
                handleCopy(
                  activePlatform === 'vercel' ? VERCEL_CONFIG : RAILWAY_DOCKERFILE,
                  activePlatform
                )
              }
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold flex items-center gap-1.5"
            >
              {copied === activePlatform ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied === activePlatform ? 'Copiado!' : 'Copiar'}</span>
            </button>
          </div>

          <pre className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-emerald-300 max-h-80 overflow-y-auto leading-relaxed whitespace-pre-wrap border border-slate-800">
            {activePlatform === 'vercel' ? VERCEL_CONFIG : RAILWAY_DOCKERFILE}
          </pre>
        </div>
      </div>

      {/* Environment Variables Reference */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-500" />
          Variáveis de Ambiente Recomendadas (.env)
        </h3>
        <div className="space-y-2 text-xs font-mono">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <span className="text-blue-600 font-bold">GEMINI_API_KEY</span>
            <span className="text-slate-500 font-sans">Chave secreta de servidor para geração de conteúdo e SEO</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <span className="text-blue-600 font-bold">DATABASE_URL</span>
            <span className="text-slate-500 font-sans">String de conexão PostgreSQL ou MongoDB</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <span className="text-blue-600 font-bold">NEXTAUTH_SECRET</span>
            <span className="text-slate-500 font-sans">Chave de criptografia de sessões JWT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
