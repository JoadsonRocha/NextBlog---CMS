'use client';

import React, { useState } from 'react';
import { useCMS } from '@/lib/cms-context';
import {
  FileText,
  Layers,
  BookmarkCheck,
  Eye,
  Plus,
  Sparkles,
  Zap,
  Globe,
  Database,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  ExternalLink,
  Edit2,
  Server,
  MessageSquare,
  Paintbrush,
  Puzzle,
  Send,
  Check,
  AlertTriangle,
  Compass,
  Sliders,
} from 'lucide-react';

export function AdminDashboard() {
  const {
    posts,
    pages,
    reusableBlocks,
    media,
    comments,
    themes,
    currentUser,
    createNewPost,
    createNewPage,
    createQuickDraft,
    approveComment,
    markSpamComment,
    startEditingPost,
    startEditingPage,
    setActiveView,
    setPublicRoute,
  } = useCMS();

  const [quickTitle, setQuickTitle] = useState('');
  const [quickContent, setQuickContent] = useState('');

  const publishedPosts = posts.filter((p) => p.status === 'published');
  const draftPosts = posts.filter((p) => p.status === 'draft');
  const totalViews = posts.reduce((acc, p) => acc + (p.views || 0), 0);
  const pendingComments = comments.filter((c) => c.status === 'pending');
  const activeTheme = themes.find((t) => t.isActive) || themes[0];

  const handleSaveQuickDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTitle.trim() && !quickContent.trim()) return;
    createQuickDraft(quickTitle.trim(), quickContent.trim());
    setQuickTitle('');
    setQuickContent('');
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto font-sans">
      {/* Welcome Banner WordPress-inspired */}
      <div className="rounded-2xl bg-slate-900 text-white p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-3 border border-blue-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>WordPress Headless CMS • Next.js 15 App Router</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Bem-vindo ao seu Painel, {currentUser.name}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-normal">
            Reunimos a simplicidade do WordPress com o poder, segurança e velocidade do ecossistema moderno Next.js e React 19.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-2.5">
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
            onClick={() => setActiveView('appearance')}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all flex items-center gap-2"
          >
            <Paintbrush className="w-4 h-4 text-amber-400" />
            <span>Personalizar Site</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setPublicRoute({ type: 'page', slug: 'home' });
              setActiveView('public-site');
            }}
            className="px-4 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Globe className="w-4 h-4 text-blue-600" />
            <span>Ver Site</span>
          </button>
        </div>

        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 2-Column WordPress Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: At a Glance + Recent Posts */}
        <div className="lg:col-span-2 space-y-6">
          {/* WIDGET: Num Relance (At a Glance) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Compass className="w-4 h-4 text-blue-600" />
              <span>Num Relance (At a Glance)</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <button
                type="button"
                onClick={() => setActiveView('posts')}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-blue-50/50 hover:border-blue-200 transition-all text-left group"
              >
                <div className="flex items-center gap-2 text-slate-500 mb-1">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold">Posts</span>
                </div>
                <p className="text-xl font-extrabold text-slate-900">{posts.length}</p>
                <span className="text-[11px] text-slate-400">{publishedPosts.length} publicados</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveView('pages')}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-blue-50/50 hover:border-blue-200 transition-all text-left group"
              >
                <div className="flex items-center gap-2 text-slate-500 mb-1">
                  <Layers className="w-4 h-4 text-indigo-600" />
                  <span className="font-semibold">Páginas</span>
                </div>
                <p className="text-xl font-extrabold text-slate-900">{pages.length}</p>
                <span className="text-[11px] text-emerald-600 font-semibold">100% SSG / ISR</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveView('comments')}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-blue-50/50 hover:border-blue-200 transition-all text-left group"
              >
                <div className="flex items-center gap-2 text-slate-500 mb-1">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold">Comentários</span>
                </div>
                <p className="text-xl font-extrabold text-slate-900">{comments.length}</p>
                {pendingComments.length > 0 ? (
                  <span className="text-[11px] text-amber-600 font-bold">
                    {pendingComments.length} pendentes
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-400">Todos moderados</span>
                )}
              </button>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
              <div className="flex items-center gap-2">
                <span>Tema em execução:</span>
                <strong className="text-slate-800 font-bold">{activeTheme.name}</strong>
              </div>
              <div className="flex items-center gap-1.5 text-blue-600 font-mono text-[11px]">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Next.js 15 • Full Site Editing</span>
              </div>
            </div>
          </div>

          {/* WIDGET: Atividade Recente (Recent Activity) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Atividade Recente</h2>
                <p className="text-xs text-slate-500">Publicações recentes e moderação de comentários</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveView('posts')}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                <span>Ver Todos os Posts</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Posts List */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Publicados Recentemente</h3>
              <div className="divide-y divide-slate-100">
                {posts.slice(0, 3).map((post) => (
                  <div key={post.id} className="py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <h4
                          onClick={() => startEditingPost(post.id)}
                          className="text-xs font-bold text-slate-900 hover:text-blue-600 cursor-pointer truncate"
                        >
                          {post.title}
                        </h4>
                        <span className="text-[11px] text-slate-400">
                          {new Date(post.createdAt).toLocaleDateString('pt-BR')} • {post.category}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => startEditingPost(post.id)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Editar Post"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Comments Mini Moderation */}
            {comments.length > 0 && (
              <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Últimos Comentários</h3>
                  <button
                    type="button"
                    onClick={() => setActiveView('comments')}
                    className="text-xs font-bold text-blue-600 hover:underline"
                  >
                    Ir para Comentários ({comments.length})
                  </button>
                </div>

                <div className="space-y-2.5">
                  {comments.slice(0, 2).map((c) => (
                    <div
                      key={c.id}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <strong className="text-slate-900 font-bold truncate">{c.authorName}</strong>
                          <span className="text-slate-400 font-mono text-[10px]">em &ldquo;{c.postTitle}&rdquo;</span>
                        </div>
                        <p className="text-slate-600 text-xs line-clamp-1 mt-0.5">&ldquo;{c.content}&rdquo;</p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                        {c.status === 'pending' && (
                          <button
                            type="button"
                            onClick={() => approveComment(c.id)}
                            className="px-2 py-1 rounded bg-emerald-100 text-emerald-800 text-[11px] font-bold hover:bg-emerald-200 transition-colors flex items-center gap-1"
                          >
                            <Check className="w-3 h-3" />
                            <span>Aprovar</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => markSpamComment(c.id)}
                          className="px-2 py-1 rounded text-red-600 hover:bg-red-50 text-[11px] font-semibold transition-colors"
                        >
                          Spam
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Quick Draft + Plugins/Tools status */}
        <div className="space-y-6">
          {/* WIDGET: Rascunho Rápido (Quick Draft) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Rascunho Rápido (Quick Draft)</span>
              </h2>
              <p className="text-xs text-slate-500">Anote uma ideia rápida para artigo</p>
            </div>

            <form onSubmit={handleSaveQuickDraft} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Título</label>
                <input
                  type="text"
                  value={quickTitle}
                  onChange={(e) => setQuickTitle(e.target.value)}
                  placeholder="Ex: Como migrar do WordPress para Next.js..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">No que você está pensando?</label>
                <textarea
                  value={quickContent}
                  onChange={(e) => setQuickContent(e.target.value)}
                  rows={3}
                  placeholder="Esboço de ideias, tópicos ou rascunho de texto..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Salvar como Rascunho</span>
              </button>
            </form>
          </div>

          {/* WIDGET: Extensões & Plugins Ativos */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Puzzle className="w-4 h-4 text-blue-600" />
                <span>Plugins Ativos</span>
              </h2>
              <button
                type="button"
                onClick={() => setActiveView('plugins')}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                Gerenciar
              </button>
            </div>

            <div className="space-y-2 text-xs font-medium">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <span className="text-slate-800">Yoast SEO Pro</span>
                <span className="text-emerald-600 font-bold text-[11px] bg-emerald-50 px-2 py-0.5 rounded">Ativo</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <span className="text-slate-800">WooCommerce Headless Bridge</span>
                <span className="text-purple-600 font-bold text-[11px] bg-purple-50 px-2 py-0.5 rounded">Ativo</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <span className="text-slate-800">WP Gemini AI Supercharge</span>
                <span className="text-amber-600 font-bold text-[11px] bg-amber-50 px-2 py-0.5 rounded">Ativo</span>
              </div>
            </div>
          </div>

          {/* WIDGET: Endpoints Headless */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-3">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-600" />
              <span>APIs Headless</span>
            </h2>
            <div className="space-y-2 text-xs font-mono">
              <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <span className="text-slate-600 font-sans">REST API:</span>
                <span className="text-blue-600 font-bold">/api/posts</span>
              </div>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <span className="text-slate-600 font-sans">GraphQL:</span>
                <span className="text-indigo-600 font-bold">/api/graphql</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setActiveView('api-explorer')}
              className="w-full py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1"
            >
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              <span>Explorar Playground</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
