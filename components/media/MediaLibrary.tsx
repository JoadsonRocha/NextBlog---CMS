'use client';

import React, { useState } from 'react';
import { useCMS } from '@/lib/cms-context';
import { MediaItem } from '@/types/cms';
import {
  Image as ImageIcon,
  Upload,
  Search,
  Plus,
  Trash2,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Layers,
  X,
} from 'lucide-react';

const STOCK_SUGGESTIONS = [
  { name: 'Inteligência Artificial & Dados', url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop&q=80', size: '1.6 MB', dimensions: '1920x1080' },
  { name: 'Arquitetura e Design Minimalista', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80', size: '1.9 MB', dimensions: '2000x1333' },
  { name: 'Reunião de Planejamento Tech', url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&auto=format&fit=crop&q=80', size: '2.4 MB', dimensions: '2400x1600' },
  { name: 'Setup de Programador com Café', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80', size: '1.1 MB', dimensions: '1600x1066' },
  { name: 'Interface Mobile no Smartphone', url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&auto=format&fit=crop&q=80', size: '1.3 MB', dimensions: '1800x1200' },
  { name: 'Conexões de Rede em Nuvem', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80', size: '2.8 MB', dimensions: '2560x1440' },
];

export function MediaLibrary() {
  const { media, addMediaItem, deleteMediaItem, currentUser, addToast } = useCMS();
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newMediaName, setNewMediaName] = useState('');
  const [newMediaAlt, setNewMediaAlt] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredMedia = media.filter((m) =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.altText.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    addToast({ type: 'success', title: 'URL da mídia copiada!' });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMediaUrl || !newMediaName) {
      addToast({ type: 'error', title: 'Preencha o nome e a URL da imagem' });
      return;
    }

    addMediaItem({
      name: newMediaName,
      url: newMediaUrl,
      type: 'image',
      size: '1.2 MB',
      dimensions: '1920x1080',
      mimeType: 'image/jpeg',
      altText: newMediaAlt || newMediaName,
    });

    setUploadModalOpen(false);
    setNewMediaUrl('');
    setNewMediaName('');
    setNewMediaAlt('');
  };

  const handleAddStock = (stock: typeof STOCK_SUGGESTIONS[0]) => {
    addMediaItem({
      name: stock.name,
      url: stock.url,
      type: 'image',
      size: stock.size,
      dimensions: stock.dimensions,
      mimeType: 'image/jpeg',
      altText: stock.name,
    });
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-blue-600" />
            Biblioteca de Mídia
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Gerencie fotos, vídeos e assets para usar nos seus blocos e artigos com otimização automática.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setUploadModalOpen(true)}
          disabled={currentUser.role === 'visitor'}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
        >
          <Upload className="w-4 h-4" />
          <span>Fazer Upload / Adicionar Mídia</span>
        </button>
      </div>

      {/* Search toolbar */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar arquivos por nome ou texto alternativo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="group rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="relative aspect-video bg-slate-100 overflow-hidden">
              <img
                src={item.url}
                alt={item.altText}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/80 p-1 rounded-lg backdrop-blur-xs">
                <button
                  type="button"
                  onClick={() => handleCopyUrl(item.url, item.id)}
                  title="Copiar URL"
                  className="p-1 text-white hover:text-blue-300 transition-colors"
                >
                  {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  title="Abrir em Nova Aba"
                  className="p-1 text-white hover:text-blue-300 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 truncate mb-1" title={item.name}>
                {item.name}
              </h3>
              <p className="text-[11px] text-slate-500 line-clamp-1 mb-2 italic">
                &ldquo;{item.altText || 'Sem alt text'}&rdquo;
              </p>
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono border-t border-slate-100 pt-2">
                <span>{item.dimensions || '1920x1080'}</span>
                <span>{item.size}</span>
              </div>
            </div>

            <div className="px-4 pb-3 flex justify-end">
              <button
                type="button"
                onClick={() => deleteMediaItem(item.id)}
                disabled={currentUser.role === 'visitor'}
                className="text-[11px] text-red-500 hover:text-red-700 font-semibold flex items-center gap-1 disabled:opacity-30"
              >
                <Trash2 className="w-3 h-3" />
                <span>Excluir</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Instant Stock Photos Section */}
      <div className="mt-12 p-6 rounded-2xl bg-linear-to-br from-slate-50 to-blue-50/50 border border-slate-200">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h2 className="text-base font-bold text-slate-900">Banco de Imagens em Alta Resolução (Royalty-Free)</h2>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Adicione fotos profissionais selecionadas à sua biblioteca com 1 clique.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {STOCK_SUGGESTIONS.map((stock, i) => (
            <div key={i} className="group relative rounded-xl overflow-hidden border border-slate-200 shadow-2xs bg-white flex flex-col">
              <img src={stock.url} alt={stock.name} className="h-24 w-full object-cover group-hover:scale-105 transition-transform" />
              <div className="p-2 flex-1 flex flex-col justify-between">
                <p className="text-[10px] font-bold text-slate-800 line-clamp-1">{stock.name}</p>
                <button
                  type="button"
                  onClick={() => handleAddStock(stock)}
                  className="mt-2 w-full py-1 rounded bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 text-[10px] font-bold transition-colors flex items-center justify-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Adicionar</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Upload className="w-4 h-4 text-blue-600" />
                Adicionar Arquivo de Mídia
              </h3>
              <button
                type="button"
                onClick={() => setUploadModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nome do Arquivo</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Banner Tecnologia 2026"
                  value={newMediaName}
                  onChange={(e) => setNewMediaName(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">URL da Imagem / Vídeo</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={newMediaUrl}
                  onChange={(e) => setNewMediaUrl(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 font-mono text-xs"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Texto Alternativo (Alt Text - SEO)</label>
                <input
                  type="text"
                  placeholder="Descrição da imagem para leitores de tela e Google"
                  value={newMediaAlt}
                  onChange={(e) => setNewMediaAlt(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-4 py-2 text-slate-600 font-semibold hover:bg-slate-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm"
                >
                  Salvar Mídia
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
