'use client';

import React, { useState } from 'react';
import { useCMS } from '@/lib/cms-context';
import { PluginItem } from '@/types/cms';
import {
  Puzzle,
  Search,
  Sparkles,
  Zap,
  ShoppingBag,
  Database,
  Mail,
  CheckCircle,
  ToggleLeft,
  ToggleRight,
  Settings,
  Star,
  Download,
  Plus,
  ExternalLink,
  ShieldCheck,
  X,
} from 'lucide-react';

export function PluginsManager() {
  const { plugins, togglePlugin, addToast } = useCMS();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPluginSettings, setSelectedPluginSettings] = useState<PluginItem | null>(null);

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'seo', label: 'SEO & Tráfego' },
    { id: 'ecommerce', label: 'eCommerce' },
    { id: 'performance', label: 'Performance & Cache' },
    { id: 'ai', label: 'Inteligência Artificial' },
    { id: 'utilities', label: 'Campos & ACF' },
    { id: 'forms', label: 'Formulários & SMTP' },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-amber-500" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-5 h-5 text-purple-500" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-blue-500" />;
      case 'Database':
        return <Database className="w-5 h-5 text-emerald-500" />;
      case 'Mail':
        return <Mail className="w-5 h-5 text-indigo-500" />;
      default:
        return <Puzzle className="w-5 h-5 text-slate-500" />;
    }
  };

  const filteredPlugins = plugins.filter((plugin) => {
    if (activeCategory !== 'all' && plugin.category !== activeCategory) {
      return false;
    }
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        plugin.name.toLowerCase().includes(q) ||
        plugin.description.toLowerCase().includes(q) ||
        plugin.author.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const activeCount = plugins.filter((p) => p.isActive).length;

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Plugins & Extensões</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-blue-100 text-blue-800 border border-blue-200">
              {activeCount} ativos
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Estenda os recursos do seu CMS com integrações do ecossistema WordPress adaptadas para Next.js.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            addToast({
              type: 'info',
              title: 'Repositório de Plugins WordPress',
              message: 'Todos os 6 plugins essenciais já estão instalados e prontos para uso.',
            })
          }
          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Adicionar Novo Plugin</span>
        </button>
      </div>

      {/* Category Pills & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar plugins instalados..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Plugins Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlugins.map((plugin) => (
          <div
            key={plugin.id}
            className={`bg-white rounded-2xl border transition-all p-5 flex flex-col justify-between space-y-4 ${
              plugin.isActive
                ? 'border-blue-300 ring-1 ring-blue-500/10 shadow-xs'
                : 'border-slate-200 opacity-80 hover:opacity-100'
            }`}
          >
            <div>
              {/* Header card */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                    {getIcon(plugin.icon)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 leading-snug">{plugin.name}</h3>
                    <p className="text-[11px] text-slate-400">Por {plugin.author}</p>
                  </div>
                </div>

                {plugin.isPro && (
                  <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-extrabold text-[10px] uppercase tracking-wider">
                    PRO
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                {plugin.description}
              </p>

              {/* Stats */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-4 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-slate-700">{plugin.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="w-3.5 h-3.5" />
                  <span>{plugin.activeInstalls} instalações</span>
                </div>
                <span className="font-mono text-[10px]">v{plugin.version}</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => togglePlugin(plugin.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  plugin.isActive
                    ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {plugin.isActive ? (
                  <>
                    <ToggleRight className="w-4 h-4 text-blue-600" />
                    <span>Ativo</span>
                  </>
                ) : (
                  <>
                    <ToggleLeft className="w-4 h-4 text-slate-400" />
                    <span>Inativo</span>
                  </>
                )}
              </button>

              {plugin.isActive && (
                <button
                  type="button"
                  onClick={() => setSelectedPluginSettings(plugin)}
                  className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1 text-xs font-medium"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Configurar</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Plugin Settings Modal */}
      {selectedPluginSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-2xl border border-slate-200 shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  {getIcon(selectedPluginSettings.icon)}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{selectedPluginSettings.name}</h3>
                  <p className="text-[11px] text-slate-400">Painel de Ajustes & Opções</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPluginSettings(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <span className="font-bold text-slate-800 block">Status da Integração Next.js:</span>
                <p>
                  Este plugin está conectado aos ganchos de ciclo de vida (hooks) do NextBlock CMS e opera tanto em tempo de build quanto em tempo de execução via API REST/GraphQL.
                </p>
              </div>

              <div className="space-y-2">
                <label className="block font-bold text-slate-700">Modo de Operação</label>
                <select className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                  <option>Automático (Recomendado para produção)</option>
                  <option>Agressivo (Otimização máxima de performance)</option>
                  <option>Manual (Configurado por bloco Gutenberg)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedPluginSettings(null)}
                className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
