'use client';

import React, { useState } from 'react';
import { useCMS } from '@/lib/cms-context';
import { BlockRenderer } from '@/components/blocks/BlockRenderer';
import { ReusableBlock, BlockType } from '@/types/cms';
import { BookmarkCheck, Plus, Search, Trash2, Edit2, Layers, Tag, Eye } from 'lucide-react';

export function ReusableBlocksManager() {
  const { reusableBlocks, deleteReusableBlock, currentUser, addToast } = useCMS();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [previewBlock, setPreviewBlock] = useState<ReusableBlock | null>(null);

  const filteredBlocks = reusableBlocks.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === 'all' || b.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <BookmarkCheck className="w-6 h-6 text-amber-600" />
            Biblioteca de Blocos Reutilizáveis
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Crie blocos modulares no editor visual e reutilize-os em múltiplos posts e páginas com 1 clique.
          </p>
        </div>
      </div>

      {/* Filter toolbar */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar blocos reutilizáveis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="p-2 text-xs rounded-lg border border-slate-300 bg-white font-medium text-slate-700 w-full sm:w-auto"
        >
          <option value="all">Todas as Categorias</option>
          <option value="marketing">Marketing & Conversão</option>
          <option value="commerce">Comércio & Planos</option>
          <option value="content">Conteúdo</option>
          <option value="layout">Layout</option>
        </select>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlocks.map((r) => (
          <div
            key={r.id}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                  {r.category}
                </span>
                <span className="text-xs text-slate-400 font-medium">Usado em {r.usageCount} páginas</span>
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-1.5">{r.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">{r.description}</p>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 font-mono flex items-center justify-between">
                <span>Tipo: {r.block.type}</span>
                <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-500">
                  ID: {r.id}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setPreviewBlock(r)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Visualizar Bloco</span>
              </button>

              <button
                type="button"
                onClick={() => deleteReusableBlock(r.id)}
                disabled={currentUser.role === 'visitor'}
                className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors disabled:opacity-30"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewBlock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 border border-slate-200 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">{previewBlock.title}</h3>
                <p className="text-xs text-slate-500">{previewBlock.description}</p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewBlock(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <BlockRenderer block={previewBlock.block} />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setPreviewBlock(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold"
              >
                Fechar Prévia
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
