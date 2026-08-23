'use client';

import React, { useState } from 'react';
import { useCMS } from '@/lib/cms-context';
import { BlockRenderer } from '@/components/blocks/BlockRenderer';
import { WPAdminBar } from '@/components/layout/WPAdminBar';
import {
  Layers,
  Sparkles,
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  Share2,
  Bookmark,
  MessageSquare,
  Search,
  ArrowRight,
  Send,
  CheckCircle2,
  Globe,
  Sliders,
  Shield,
  CornerDownRight,
} from 'lucide-react';

export function PublicSiteView() {
  const {
    pages,
    posts,
    menus,
    settings,
    publicRoute,
    setPublicRoute,
    setActiveView,
    startEditingPost,
    startEditingPage,
    currentUser,
    comments: globalComments,
    addComment,
    addToast,
  } = useCMS();

  const [blogSearch, setBlogSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentText, setCommentText] = useState('');

  // Determine current page or post
  const isBlogList = publicRoute.type === 'blog';
  const isSinglePost = publicRoute.type === 'post';
  const isSinglePage = publicRoute.type === 'page';

  const currentPage = isSinglePage
    ? pages.find((p) => p.slug === publicRoute.slug) || pages.find((p) => p.isHomePage) || pages[0]
    : null;

  const currentPost = isSinglePost
    ? posts.find((p) => p.slug === publicRoute.slug) || posts[0]
    : null;

  const filteredPosts = posts.filter((p) => {
    if (p.status !== 'published') return false;
    const matchesSearch =
      p.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(blogSearch.toLowerCase());
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const postApprovedComments = globalComments.filter(
    (c) => c.postId === currentPost?.id && c.status === 'approved'
  );

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName || !commentText || !currentPost) return;
    addComment(
      currentPost.id,
      currentPost.title,
      commentName,
      commentEmail || `${commentName.toLowerCase().replace(/\s+/g, '')}@exemplo.com`,
      commentText
    );
    setCommentName('');
    setCommentEmail('');
    setCommentText('');
    addToast({
      type: 'success',
      title: 'Comentário Enviado',
      message: 'Seu comentário foi registrado e publicado com sucesso no WordPress!',
    });
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast({ type: 'success', title: 'Link copiado para a área de transferência!' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-blue-100 selection:text-blue-900 font-sans">
      {/* WordPress Admin Top Bar */}
      <WPAdminBar />

      {/* Public Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-8 z-30 transition-all shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <div
            onClick={() => setPublicRoute({ type: 'page', slug: 'home' })}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900 block leading-tight">
                {settings.siteName}
              </span>
              <span className="text-[10px] text-slate-400 font-medium hidden sm:block">
                {settings.siteDescription}
              </span>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="hidden md:flex items-center gap-1">
            {pages
              .filter((p) => p.status === 'published')
              .map((pg) => (
                <button
                  key={pg.id}
                  type="button"
                  onClick={() => setPublicRoute({ type: 'page', slug: pg.slug })}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    isSinglePage && currentPage?.slug === pg.slug
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {pg.title}
                </button>
              ))}

            <button
              type="button"
              onClick={() => setPublicRoute({ type: 'blog' })}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                isBlogList || isSinglePost
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Blog & Artigos
            </button>
          </nav>

          {/* Action */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPublicRoute({ type: 'blog' })}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors"
            >
              Explorar Conteúdos
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {/* VIEW 1: DYNAMIC PAGE (HOME, FEATURES, PRICING, ABOUT) */}
        {isSinglePage && currentPage && (
          <div className="w-full">
            {currentPage.blocks.map((block) => (
              <BlockRenderer key={block.id} block={block} isEditing={false} />
            ))}
          </div>
        )}

        {/* VIEW 2: BLOG LISTING */}
        {isBlogList && (
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                Nosso Blog Técnico
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Artigos, Tutoriais & Novidades de Engenharia
              </h1>
              <p className="text-sm text-slate-600">
                Conteúdos estruturados com arquitetura modular em blocos e atualizações constantes.
              </p>
            </div>

            {/* Filter bar */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Pesquisar artigos por palavra-chave..."
                  value={blogSearch}
                  onChange={(e) => setBlogSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                {['all', 'Tecnologia', 'CMS', 'Inteligência Artificial', 'Arquitetura'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      selectedCategory === cat
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat === 'all' ? 'Todos' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  onClick={() => setPublicRoute({ type: 'post', slug: post.slug })}
                  className="group bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl hover:border-blue-200 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="relative aspect-video overflow-hidden bg-slate-100">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold bg-white/90 text-slate-800 backdrop-blur-xs shadow-xs">
                        {post.category}
                      </span>
                    </div>

                    <div className="p-6">
                      <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h2>
                      <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <img
                        src={post.authorAvatar}
                        alt={post.authorName}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="font-semibold text-slate-700">{post.authorName}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px]">
                      <span>{post.readingTime || '3 min'}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" /> {post.views}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
                <Search className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                <h3 className="font-bold text-slate-800">Nenhum artigo encontrado</h3>
                <p className="text-xs text-slate-500 mt-1">Tente pesquisar por outros termos ou limpar a categoria.</p>
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: SINGLE POST READING VIEW */}
        {isSinglePost && currentPost && (
          <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-8">
            <button
              type="button"
              onClick={() => setPublicRoute({ type: 'blog' })}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar ao Blog</span>
            </button>

            {/* Article Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                  {currentPost.category}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {currentPost.readingTime || '3 min'} de leitura
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {currentPost.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                {currentPost.excerpt}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-b border-slate-200 py-3 text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={currentPost.authorAvatar}
                    alt={currentPost.authorName}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900">{currentPost.authorName}</h4>
                    <p className="text-slate-400 text-[11px]">
                      Publicado em {currentPost.publishedAt ? new Date(currentPost.publishedAt).toLocaleDateString('pt-BR') : '22/03/2026'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleShare}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1 text-xs font-semibold"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Compartilhar</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200 aspect-16/9 bg-slate-100">
              <img
                src={currentPost.featuredImage}
                alt={currentPost.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Block Content Render */}
            <div className="space-y-4 pt-4">
              {currentPost.blocks.map((block) => (
                <BlockRenderer key={block.id} block={block} isEditing={false} />
              ))}
            </div>

            {/* Tags */}
            {currentPost.tags && currentPost.tags.length > 0 && (
              <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-600">Tags:</span>
                {currentPost.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Comments Section */}
            <div className="pt-10 border-t border-slate-200 space-y-6">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                Discussão & Comentários ({postApprovedComments.length})
              </h3>

              {/* Form */}
              <form onSubmit={handleAddComment} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 text-xs">
                <h4 className="font-bold text-slate-800">Deixe seu comentário</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Seu nome completo *"
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="email"
                    placeholder="Seu e-mail (não será publicado)"
                    value={commentEmail}
                    onChange={(e) => setCommentEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <textarea
                  rows={3}
                  required
                  placeholder="O que você achou deste artigo? Compartilhe seus insights..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Publicar Comentário</span>
                  </button>
                </div>
              </form>

              {/* List */}
              <div className="space-y-3">
                {postApprovedComments.length === 0 ? (
                  <div className="p-6 text-center text-slate-400 bg-white rounded-xl border border-slate-200 text-xs">
                    Nenhum comentário aprovado ainda neste artigo. Seja o primeiro a comentar!
                  </div>
                ) : (
                  postApprovedComments.map((c) => (
                    <div key={c.id} className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center uppercase">
                            {c.authorName.charAt(0)}
                          </div>
                          <span className="font-bold text-slate-900">{c.authorName}</span>
                        </div>
                        <span className="text-[11px] text-slate-400">
                          {new Date(c.createdAt).toLocaleDateString('pt-BR')} às{' '}
                          {new Date(c.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed pl-8">{c.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Public Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold">
                  <Layers className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-white text-base">{settings.siteName}</span>
              </div>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                CMS moderno e escalável construído com Next.js 15, editor visual de blocos modulares, APIs Headless GraphQL/REST e IA Gemini.
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider mb-2">Páginas</h4>
              <p
                onClick={() => setPublicRoute({ type: 'page', slug: 'home' })}
                className="hover:text-white cursor-pointer"
              >
                Início
              </p>
              <p
                onClick={() => setPublicRoute({ type: 'page', slug: 'recursos' })}
                className="hover:text-white cursor-pointer"
              >
                Recursos
              </p>
              <p
                onClick={() => setPublicRoute({ type: 'page', slug: 'precos' })}
                className="hover:text-white cursor-pointer"
              >
                Planos & Preços
              </p>
              <p
                onClick={() => setPublicRoute({ type: 'blog' })}
                className="hover:text-white cursor-pointer"
              >
                Blog & Tutoriais
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider mb-2">Desenvolvedores</h4>
              <p onClick={() => setActiveView('api-explorer')} className="hover:text-white cursor-pointer">
                GraphQL Playground
              </p>
              <p onClick={() => setActiveView('api-explorer')} className="hover:text-white cursor-pointer">
                Documentação REST
              </p>
              <p onClick={() => setActiveView('database')} className="hover:text-white cursor-pointer">
                Schemas PostgreSQL & Mongo
              </p>
              <p onClick={() => setActiveView('deploy')} className="hover:text-white cursor-pointer">
                Deploy no Vercel & Railway
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <span>© {new Date().getFullYear()} {settings.siteName}. Todos os direitos reservados.</span>
            <div className="flex items-center gap-4">
              <span>Next.js 15 App Router</span>
              <span>•</span>
              <span>Tailwind CSS</span>
              <span>•</span>
              <span>Gemini 3.7 Flash</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
