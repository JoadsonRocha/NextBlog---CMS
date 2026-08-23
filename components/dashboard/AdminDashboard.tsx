'use client';

import React, { useState } from 'react';
import { useCMS } from '@/lib/cms-context';
import {
  FileText,
  Layers,
  Eye,
  Plus,
  Sparkles,
  Zap,
  Globe,
  Database,
  ArrowRight,
  TrendingUp,
  Clock,
  ExternalLink,
  Edit2,
  Paintbrush,
  CheckCircle2,
  Wand2,
} from 'lucide-react';

export function AdminDashboard() {
  const {
    posts,
    pages,
    settings,
    currentUser,
    createNewPost,
    createNewPage,
    startEditingPost,
    setActiveView,
    setPublicRoute,
  } = useCMS();

  const publishedPosts = posts.filter((p) => p.status === 'published');
  const totalViews = posts.reduce((acc, p) => acc + (p.views || 0), 0);

  const handleOpenSite = (slug = 'home') => {
    setPublicRoute({ type: 'page', slug });
    setActiveView('public-site');
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto font-sans">
      {/* Clean Welcome Banner */}
      <div className="rounded-3xl bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>NextBlog CMS • Next.js 15 & Groq AI</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Olá, {currentUser.name}! 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Gerencie seu conteúdo, crie páginas dinâmicas e acompanhe a publicação em tempo real.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={createNewPost}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Post</span>
          </button>
          <button
            type="button"
            onClick={() => handleOpenSite('home')}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all flex items-center gap-2"
          >
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>Ver Site</span>
          </button>
        </div>
      </div>

      {/* 4 Essential Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Artigos Publicados</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{publishedPosts.length}</p>
          <p className="text-[11px] text-slate-400">{posts.length} artigos no total</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Páginas Dinâmicas</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{pages.length}</p>
          <p className="text-[11px] text-slate-400">Páginas ativas no site</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Visualizações</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{totalViews.toLocaleString('pt-BR')}</p>
          <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +14.8% esta semana
          </p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Banco de Dados</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <p className="text-sm font-extrabold text-slate-900 truncate uppercase mt-1">
            {settings.databaseProvider || 'PostgreSQL'}
          </p>
          <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Sincronizado & Ativo
          </p>
        </div>
      </div>

      {/* 4 Quick Action Cards */}
      <div className="space-y-3">
        <span className="text-xs font-black uppercase tracking-wider text-slate-400 block px-1">
          Ações Rápidas & Gestão
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={createNewPost}
            className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md cursor-pointer transition-all group space-y-2"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5 text-amber-500" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Criar Post com IA</h4>
            <p className="text-xs text-slate-500">Gere artigos em blocos com a Groq (Llama 3.3 70B).</p>
          </div>

          <div
            onClick={createNewPage}
            className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-purple-500 hover:shadow-md cursor-pointer transition-all group space-y-2"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Nova Página</h4>
            <p className="text-xs text-slate-500">Crie landing pages, página Sobre ou Contato.</p>
          </div>

          <div
            onClick={() => setActiveView('appearance')}
            className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-amber-500 hover:shadow-md cursor-pointer transition-all group space-y-2"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Paintbrush className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Personalizar Tema</h4>
            <p className="text-xs text-slate-500">Mude cores, tipografias do Google Fonts e estilos.</p>
          </div>

          <div
            onClick={() => setActiveView('database')}
            className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md cursor-pointer transition-all group space-y-2"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Database className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Banco de Dados</h4>
            <p className="text-xs text-slate-500">Gerencie conexão SQL, exporte backups e schemas.</p>
          </div>
        </div>
      </div>

      {/* Recent Posts Table */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Artigos Recentes</h3>
            <p className="text-xs text-slate-400">Seus posts publicados e rascunhos em andamento</p>
          </div>
          <button
            type="button"
            onClick={() => setActiveView('posts')}
            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
          >
            <span>Ver Todos ({posts.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-100 overflow-hidden">
          {posts.slice(0, 5).map((post) => (
            <div
              key={post.id}
              className="py-3.5 flex items-center justify-between gap-4 hover:bg-slate-50/80 rounded-xl px-2 transition-colors"
            >
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                    {post.title}
                  </h4>
                  <span
                    className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full shrink-0 ${
                      post.status === 'published'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {post.status === 'published' ? 'Publicado' : 'Rascunho'}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-400">
                  <span>{post.category || 'Geral'}</span>
                  <span>•</span>
                  <span>{post.readingTime || '3 min'} de leitura</span>
                  <span>•</span>
                  <span>{post.views || 0} visualizações</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => startEditingPost(post.id)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 transition-colors"
                  title="Editar no Editor Notion"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
