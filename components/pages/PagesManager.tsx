'use client';

import React, { useState } from 'react';
import { useCMS } from '@/lib/cms-context';
import { Page } from '@/types/cms';
import { Plus, Search, Edit2, Trash2, Copy, ExternalLink, Layers, Home, CheckCircle2 } from 'lucide-react';

export function PagesManager() {
  const { pages, createNewPage, startEditingPage, deletePage, duplicatePage, currentUser, setPublicRoute, setActiveView } = useCMS();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPages = pages.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePreviewPage = (slug: string) => {
    setPublicRoute({ type: 'page', slug });
    setActiveView('public-site');
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Páginas Dinâmicas</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Estruture páginas estáticas e landing pages completas usando o editor visual de blocos.
          </p>
        </div>
        <button
          type="button"
          onClick={createNewPage}
          disabled={currentUser.role === 'visitor'}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Criar Nova Página</span>
        </button>
      </div>

      {/* Search */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar páginas por título ou slug..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPages.map((page) => (
          <div
            key={page.id}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                  {page.isHomePage && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                      <Home className="w-3 h-3" /> Página Inicial
                    </span>
                  )}
                </div>
                <span
                  className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                    page.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {page.status === 'published' ? 'Publicada' : 'Rascunho'}
                </span>
              </div>

              <h3
                onClick={() => startEditingPage(page.id)}
                className="text-base font-bold text-slate-900 hover:text-blue-600 cursor-pointer transition-colors line-clamp-1 mb-1"
              >
                {page.title}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                {page.description || 'Sem descrição cadastrada.'}
              </p>
              <p className="text-xs font-mono text-slate-400">/{page.slug}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-500">{page.blocks.length} blocos</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handlePreviewPage(page.slug)}
                  title="Ver no site"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => duplicatePage(page.id)}
                  title="Duplicar página"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => startEditingPage(page.id)}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold transition-colors flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Editar</span>
                </button>
                {!page.isHomePage && (
                  <button
                    type="button"
                    onClick={() => deletePage(page.id)}
                    disabled={currentUser.role === 'visitor'}
                    className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors disabled:opacity-30"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
