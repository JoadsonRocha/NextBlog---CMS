'use client';

import React, { useState } from 'react';
import { useCMS } from '@/lib/cms-context';
import {
  Paintbrush,
  Check,
  Eye,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Layers,
  Sparkles,
  Layout,
  ExternalLink,
  Globe,
  Sliders,
  Palette,
  Type,
  Menu as MenuIcon,
} from 'lucide-react';

export function AppearanceManager() {
  const {
    themes,
    activateTheme,
    menus,
    addMenuItem,
    deleteMenuItem,
    settings,
    updateSettings,
    setActiveView,
    setPublicRoute,
    addToast,
  } = useCMS();

  const [activeSubTab, setActiveSubTab] = useState<'themes' | 'menus' | 'customize'>('themes');
  const [newMenuLabel, setNewMenuLabel] = useState('');
  const [newMenuUrl, setNewMenuUrl] = useState('');

  const activeTheme = themes.find((t) => t.isActive) || themes[0];

  const handleAddMenu = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMenuLabel.trim() || !newMenuUrl.trim()) return;
    addMenuItem(newMenuLabel.trim(), newMenuUrl.trim());
    setNewMenuLabel('');
    setNewMenuUrl('');
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Aparência & Temas</h1>
          <p className="text-xs text-slate-500 mt-1">
            Gerenciamento de temas, navegação de menus e personalização visual estilo WordPress Gutenberg.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setPublicRoute({ type: 'page', slug: 'home' });
              setActiveView('public-site');
            }}
            className="px-3.5 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4" />
            <span>Visualizar Site com Tema Ativo</span>
          </button>
        </div>
      </div>

      {/* Sub Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveSubTab('themes')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'themes'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layout className="w-4 h-4" />
          <span>Temas ({themes.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('menus')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'menus'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <MenuIcon className="w-4 h-4" />
          <span>Menus de Navegação ({menus.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('customize')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'customize'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Personalizador FSE</span>
        </button>
      </div>

      {/* VIEW: THEMES GALLERY */}
      {activeSubTab === 'themes' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className={`bg-white rounded-2xl border transition-all overflow-hidden flex flex-col ${
                  theme.isActive
                    ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                {/* Screenshot */}
                <div className="relative aspect-video bg-slate-100 overflow-hidden group">
                  <img
                    src={theme.screenshot}
                    alt={theme.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {theme.isActive && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-blue-600 text-white text-[11px] font-extrabold uppercase tracking-wider rounded-full shadow-md flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Ativo</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
                    <button
                      type="button"
                      onClick={() => {
                        setPublicRoute({ type: 'page', slug: 'home' });
                        setActiveView('public-site');
                      }}
                      className="px-3.5 py-1.5 bg-white/90 text-slate-900 text-xs font-bold rounded-lg hover:bg-white flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Prévia</span>
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-base text-slate-900">{theme.name}</h3>
                      <span className="text-[11px] font-mono text-slate-400">v{theme.version}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">Por {theme.author}</p>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-2">
                      {theme.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {theme.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    {theme.isActive ? (
                      <button
                        type="button"
                        onClick={() => setActiveSubTab('customize')}
                        className="w-full py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Sliders className="w-3.5 h-3.5" />
                        <span>Personalizar Tema</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => activateTheme(theme.id)}
                        className="w-full py-2 bg-slate-900 text-white hover:bg-blue-600 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Ativar Tema</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW: MENUS MANAGER */}
      {activeSubTab === 'menus' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add Menu Item */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Plus className="w-4 h-4 text-blue-600" />
              <span>Adicionar Link ao Menu</span>
            </h3>
            <p className="text-xs text-slate-500">
              Adicione links personalizados, páginas ou categorias à barra de navegação principal.
            </p>

            <form onSubmit={handleAddMenu} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Rótulo de Navegação</label>
                <input
                  type="text"
                  value={newMenuLabel}
                  onChange={(e) => setNewMenuLabel(e.target.value)}
                  placeholder="Ex: Produtos, Portfólio, Contato"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">URL de Destino</label>
                <input
                  type="text"
                  value={newMenuUrl}
                  onChange={(e) => setNewMenuUrl(e.target.value)}
                  placeholder="Ex: /portfolio ou https://..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar ao Menu</span>
              </button>
            </form>
          </div>

          {/* Menu Structure List */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-sm text-slate-900">Estrutura do Menu Principal (Header)</h3>
                <p className="text-xs text-slate-500">Arraste ou ordene os links exibidos no cabeçalho do site.</p>
              </div>
              <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                {menus.length} itens
              </span>
            </div>

            <div className="space-y-2">
              {menus.map((item, index) => (
                <div
                  key={item.id}
                  className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between hover:bg-slate-100/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-400 w-4">{index + 1}.</span>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{item.label}</h4>
                      <span className="text-[11px] text-blue-600 font-mono">{item.url}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => deleteMenuItem(item.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remover do menu"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW: CUSTOMIZER FSE */}
      {activeSubTab === 'customize' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Palette className="w-4 h-4 text-blue-600" />
              <span>Identidade Visual & Cores Globais</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Cor Primária da Marca</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={settings.primaryColor || '#2563eb'}
                    onChange={(e) => updateSettings({ primaryColor: e.target.value })}
                    className="w-10 h-10 rounded-xl border border-slate-200 cursor-pointer p-1"
                  />
                  <input
                    type="text"
                    value={settings.primaryColor || '#2563eb'}
                    onChange={(e) => updateSettings({ primaryColor: e.target.value })}
                    className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Família Tipográfica Global</label>
                <select
                  value={settings.fontFamily || 'Inter'}
                  onChange={(e) => updateSettings({ fontFamily: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Inter">Inter (Padrão Moderno / Tech)</option>
                  <option value="Plus Jakarta Sans">Plus Jakarta Sans (Elegante & SaaS)</option>
                  <option value="Outfit">Outfit (Geométrico & Jovial)</option>
                  <option value="Playfair Display">Playfair Display (Editorial / Revista)</option>
                  <option value="Merriweather">Merriweather (Clássico / Leitura)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Slogan / Descrição do Site</label>
                <input
                  type="text"
                  value={settings.siteDescription || ''}
                  onChange={(e) => updateSettings({ siteDescription: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Full Site Editing (FSE) com React & Next.js</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Diferente do WordPress tradicional baseado em PHP, o NextBlock CMS compila todos os blocos Gutenberg em componentes React otimizados com Server-Side Rendering (SSR) e suporte a revalidação estática incremental (ISR).
            </p>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-700">Tema Ativo Atual:</span>
                <span className="font-bold text-blue-600">{activeTheme.name}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-700">Modo de Renderização:</span>
                <span className="font-bold text-emerald-600 font-mono">Next.js 15 App Router</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
