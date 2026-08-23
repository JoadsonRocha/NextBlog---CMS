'use client';

import React, { useState } from 'react';
import { useCMS } from '@/lib/cms-context';
import { Page } from '@/types/cms';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Copy,
  ExternalLink,
  Layers,
  Home,
  CheckCircle2,
  FolderTree,
  LayoutGrid,
  ChevronRight,
  GitBranch,
  FileText,
  CornerDownRight,
} from 'lucide-react';

export function PagesManager() {
  const { pages, createNewPage, startEditingPage, deletePage, duplicatePage, currentUser, setPublicRoute, setActiveView } = useCMS();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'tree'>('grid');

  const filteredPages = pages.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePreviewPage = (slug: string) => {
    setPublicRoute({ type: 'page', slug });
    setActiveView('public-site');
  };

  // Group pages for Wagtail-style Page Tree
  const rootPages = filteredPages.filter((p) => !p.parentId || p.isHomePage);
  const childPages = filteredPages.filter((p) => p.parentId && !p.isHomePage);

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Páginas Dinâmicas & Landing Pages</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-blue-100 text-blue-800 border border-blue-200">
              {pages.length} páginas
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Estruture páginas estáticas, árvores hierárquicas e landing pages completas usando o editor visual.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View mode toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'grid' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('tree')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'tree' ? 'bg-white text-purple-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <FolderTree className="w-3.5 h-3.5" />
              <span>Árvore (Wagtail Tree)</span>
            </button>
          </div>

          <button
            type="button"
            onClick={createNewPage}
            disabled={currentUser.role === 'visitor'}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Criar Nova Página</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar páginas por título ou slug (ex: home, sobre, contato)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* VIEW 1: GRID MODE */}
      {viewMode === 'grid' && (
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
                    className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
                    title="Ver no site público"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => startEditingPage(page.id)}
                    className="p-2 rounded-lg hover:bg-blue-50 text-blue-600"
                    title="Editar no Editor Visual"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => duplicatePage(page.id)}
                    className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
                    title="Duplicar Página"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => deletePage(page.id)}
                    disabled={currentUser.role === 'visitor' || page.isHomePage}
                    className="p-2 rounded-lg hover:bg-rose-50 text-rose-500 disabled:opacity-30"
                    title="Remover Página"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW 2: WAGTAIL-STYLE PAGE TREE */}
      {viewMode === 'tree' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderTree className="w-5 h-5 text-purple-600" />
              <span className="font-bold text-xs text-slate-800 uppercase tracking-wider">
                Estrutura Hierárquica do Site (Page Tree)
              </span>
            </div>
            <span className="text-xs text-slate-500">Herança de URLs aninhadas e rotas filhas</span>
          </div>

          <div className="p-4 divide-y divide-slate-100 space-y-2">
            {rootPages.map((root) => {
              const children = childPages.filter((c) => c.parentId === root.id || root.slug === 'home');

              return (
                <div key={root.id} className="pt-2">
                  {/* Root / Parent Page Card */}
                  <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200 flex items-center justify-between hover:border-purple-300 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs shrink-0">
                        {root.isHomePage ? <Home className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4
                            onClick={() => startEditingPage(root.id)}
                            className="font-bold text-sm text-slate-900 hover:text-purple-600 cursor-pointer"
                          >
                            {root.title}
                          </h4>
                          {root.isHomePage && (
                            <span className="text-[10px] font-extrabold uppercase px-2 py-0.2 rounded-full bg-blue-100 text-blue-800">
                              Home
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-mono text-slate-400">/{root.slug === 'home' ? '' : root.slug}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-slate-500 font-semibold">{root.blocks.length} blocos</span>
                      <button
                        type="button"
                        onClick={() => startEditingPage(root.id)}
                        className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold"
                      >
                        Editar
                      </button>
                    </div>
                  </div>

                  {/* Subpages / Children indentation */}
                  {children.length > 0 && (
                    <div className="pl-8 sm:pl-12 pt-2 space-y-2 border-l-2 border-dashed border-purple-200 ml-4 my-2">
                      {children.map((child) => (
                        <div
                          key={child.id}
                          className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between hover:border-purple-400 transition-all shadow-2xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <CornerDownRight className="w-4 h-4 text-purple-400 shrink-0" />
                            <FileText className="w-4 h-4 text-slate-400" />
                            <div>
                              <h5
                                onClick={() => startEditingPage(child.id)}
                                className="font-bold text-xs text-slate-900 hover:text-purple-600 cursor-pointer"
                              >
                                {child.title}
                              </h5>
                              <span className="text-[11px] font-mono text-purple-700">
                                /{root.slug === 'home' ? '' : `${root.slug}/`}{child.slug}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-slate-400">{child.blocks.length} blocos</span>
                            <button
                              type="button"
                              onClick={() => startEditingPage(child.id)}
                              className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                            >
                              Editar
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
