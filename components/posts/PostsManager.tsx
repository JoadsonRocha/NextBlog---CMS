'use client';

import React, { useState } from 'react';
import { useCMS } from '@/lib/cms-context';
import { Post, PostStatus } from '@/types/cms';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Copy,
  ExternalLink,
  Eye,
  CheckCircle,
  Clock,
  Sparkles,
  Calendar,
} from 'lucide-react';

export function PostsManager() {
  const {
    posts,
    createNewPost,
    startEditingPost,
    deletePost,
    duplicatePost,
    categories,
    currentUser,
    setPublicRoute,
    setActiveView,
  } = useCMS();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | PostStatus>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handlePreviewPost = (slug: string) => {
    setPublicRoute({ type: 'post', slug });
    setActiveView('public-site');
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gerenciador de Posts</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Crie, edite e organize os artigos do seu blog com diagramação visual em blocos.
          </p>
        </div>
        <button
          type="button"
          onClick={createNewPost}
          disabled={currentUser.role === 'visitor'}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Artigo</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar artigos por título ou resumo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="p-2 text-xs rounded-lg border border-slate-300 bg-white font-medium text-slate-700"
          >
            <option value="all">Todos os Status ({posts.length})</option>
            <option value="published">Publicados ({posts.filter((p) => p.status === 'published').length})</option>
            <option value="draft">Rascunhos ({posts.filter((p) => p.status === 'draft').length})</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 text-xs rounded-lg border border-slate-300 bg-white font-medium text-slate-700"
          >
            <option value="all">Todas Categorias</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-700">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[11px] border-b border-slate-200">
              <tr>
                <th className="px-5 py-3.5">Título do Post</th>
                <th className="px-4 py-3.5">Categoria</th>
                <th className="px-4 py-3.5">Autor</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Blocos</th>
                <th className="px-4 py-3.5">Visualizações</th>
                <th className="px-5 py-3.5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50/70 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <h3
                          onClick={() => startEditingPost(post.id)}
                          className="font-bold text-slate-900 hover:text-blue-600 cursor-pointer transition-colors line-clamp-1"
                        >
                          {post.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5 font-mono">/blog/{post.slug}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                      {post.category}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={post.authorAvatar}
                        alt={post.authorName}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="font-medium text-slate-800 text-xs">{post.authorName}</span>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                        post.status === 'published'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          post.status === 'published' ? 'bg-emerald-600' : 'bg-slate-400'
                        }`}
                      />
                      {post.status === 'published' ? 'Publicado' : 'Rascunho'}
                    </span>
                  </td>

                  <td className="px-4 py-4 font-semibold text-slate-600 text-xs">
                    {post.blocks.length} blocos
                  </td>

                  <td className="px-4 py-4 font-semibold text-slate-800 text-xs">
                    {post.views.toLocaleString('pt-BR')}
                  </td>

                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => handlePreviewPost(post.slug)}
                        title="Ver no Site Público"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => duplicatePost(post.id)}
                        title="Duplicar Artigo"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => startEditingPost(post.id)}
                        title="Editar no Editor Visual"
                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deletePost(post.id)}
                        disabled={currentUser.role === 'visitor'}
                        title="Excluir Artigo"
                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors disabled:opacity-30"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPosts.length === 0 && (
          <div className="p-12 text-center text-slate-400">
            <Search className="w-8 h-8 mx-auto mb-2 text-slate-300" />
            <p className="font-semibold text-sm">Nenhum post encontrado</p>
            <p className="text-xs text-slate-400 mt-1">Tente ajustar seus termos de busca ou filtros.</p>
          </div>
        )}
      </div>
    </div>
  );
}
