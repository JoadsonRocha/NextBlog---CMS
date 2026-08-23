'use client';

import React, { useState } from 'react';
import { useCMS } from '@/lib/cms-context';
import {
  Settings,
  Globe,
  Sliders,
  Sparkles,
  Link,
  MessageSquare,
  BookOpen,
  FileEdit,
  Save,
  CheckCircle,
  Shield,
  Key,
  Database,
} from 'lucide-react';

export function SettingsManager() {
  const { settings, updateSettings, addToast, resetToDemoData } = useCMS();

  const [activeTab, setActiveTab] = useState<'general' | 'writing' | 'reading' | 'discussion' | 'permalinks' | 'ai'>('general');

  // Form local state
  const [formData, setFormData] = useState({
    siteName: settings.siteName || 'NextBlock CMS',
    siteTagline: settings.siteTagline || 'Gerenciador de Conteúdo Moderno em Next.js',
    siteDescription: settings.siteDescription || '',
    defaultLanguage: settings.defaultLanguage || 'pt-BR',
    allowComments: settings.allowComments ?? true,
    showAuthorBio: settings.showAuthorBio ?? true,
    permalinkStructure: '/%year%/%month%/%postname%/',
    aiModel: settings.aiModel || 'gemini-3.7-flash',
    postsPerPage: 10,
    feedSummary: 'excerpt',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      siteName: formData.siteName,
      siteTagline: formData.siteTagline,
      siteDescription: formData.siteDescription,
      defaultLanguage: formData.defaultLanguage,
      allowComments: formData.allowComments,
      showAuthorBio: formData.showAuthorBio,
      aiModel: formData.aiModel,
    });
    addToast({
      type: 'success',
      title: 'Configurações Salvas',
      message: 'As preferências do site foram atualizadas com sucesso.',
    });
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-5xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Opções & Configurações</h1>
          <p className="text-xs text-slate-500 mt-1">
            Painel geral de configurações do sistema inspirado no WordPress Settings & Headless Next.js.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 shadow-xs self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Salvar Alterações</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200">
        {[
          { id: 'general', label: 'Geral', icon: Globe },
          { id: 'writing', label: 'Escrita', icon: FileEdit },
          { id: 'reading', label: 'Leitura', icon: BookOpen },
          { id: 'discussion', label: 'Discussão', icon: MessageSquare },
          { id: 'permalinks', label: 'Links Permanentes', icon: Link },
          { id: 'ai', label: 'Inteligência Artificial', icon: Sparkles },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* TAB: GENERAL */}
        {activeTab === 'general' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-3">
              Configurações Gerais
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <label className="text-xs font-bold text-slate-700 sm:text-right">Título do Site</label>
              <div className="sm:col-span-2">
                <input
                  type="text"
                  value={formData.siteName}
                  onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <label className="text-xs font-bold text-slate-700 sm:text-right">Descrição / Slogan</label>
              <div className="sm:col-span-2">
                <input
                  type="text"
                  value={formData.siteTagline}
                  onChange={(e) => setFormData({ ...formData, siteTagline: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-[11px] text-slate-400 mt-1">Em poucas palavras, explique sobre o que é este site.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <label className="text-xs font-bold text-slate-700 sm:text-right">Idioma do Site</label>
              <div className="sm:col-span-2">
                <select
                  value={formData.defaultLanguage}
                  onChange={(e) => setFormData({ ...formData, defaultLanguage: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pt-BR">Português do Brasil</option>
                  <option value="en-US">English (United States)</option>
                  <option value="es-ES">Español</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* TAB: WRITING */}
        {activeTab === 'writing' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-3">
              Opções de Escrita & Editor Visual
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <label className="text-xs font-bold text-slate-700 sm:text-right">Categoria Padrão de Posts</label>
              <div className="sm:col-span-2">
                <select className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl">
                  <option>Tecnologia & Dev</option>
                  <option>Arquitetura CMS</option>
                  <option>Performance & SEO</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <label className="text-xs font-bold text-slate-700 sm:text-right">Editor Padrão</label>
              <div className="sm:col-span-2 space-y-1">
                <label className="flex items-center gap-2 text-xs text-slate-700">
                  <input type="radio" checked readOnly className="text-blue-600" />
                  <span>Editor Visual em Blocos Gutenberg / React (NextBlock)</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* TAB: READING */}
        {activeTab === 'reading' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-3">
              Opções de Leitura
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
              <label className="text-xs font-bold text-slate-700 sm:text-right pt-1">A página inicial exibe</label>
              <div className="sm:col-span-2 space-y-2 text-xs">
                <label className="flex items-center gap-2 text-slate-800 font-medium">
                  <input type="radio" name="homeDisplay" defaultChecked className="text-blue-600" />
                  <span>Uma página estática modular (Página Inicial com Blocos)</span>
                </label>
                <label className="flex items-center gap-2 text-slate-800 font-medium">
                  <input type="radio" name="homeDisplay" className="text-blue-600" />
                  <span>Seus posts mais recentes (Feed de Blog)</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <label className="text-xs font-bold text-slate-700 sm:text-right">Posts por página no blog</label>
              <div className="sm:col-span-2">
                <input
                  type="number"
                  defaultValue={10}
                  className="w-24 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-center"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB: DISCUSSION */}
        {activeTab === 'discussion' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-3">
              Opções de Discussão & Comentários
            </h3>

            <div className="space-y-3 text-xs">
              <label className="flex items-center gap-2 font-medium text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.allowComments}
                  onChange={(e) => setFormData({ ...formData, allowComments: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span>Permitir que as pessoas enviem comentários em novos artigos</span>
              </label>

              <label className="flex items-center gap-2 font-medium text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span>O autor do comentário deve preencher nome e e-mail</span>
              </label>

              <label className="flex items-center gap-2 font-medium text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span>Os comentários devem ser aprovados manualmente por um moderador</span>
              </label>
            </div>
          </div>
        )}

        {/* TAB: PERMALINKS */}
        {activeTab === 'permalinks' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-3">
              Estrutura de Links Permanentes (Permalinks)
            </h3>
            <p className="text-xs text-slate-500">
              O Next.js utiliza rotas dinâmicas baseadas em slugs amigáveis para indexação instantânea no Google.
            </p>

            <div className="space-y-3 text-xs">
              {[
                { label: 'Nome do Post (Recomendado para SEO)', example: 'https://site.com/post-exemplo/' },
                { label: 'Dia e Nome', example: 'https://site.com/2026/03/22/post-exemplo/' },
                { label: 'Mês e Nome', example: 'https://site.com/2026/03/post-exemplo/' },
                { label: 'Numérica', example: 'https://site.com/archives/123' },
              ].map((item, i) => (
                <label
                  key={item.label}
                  className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100/70 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <input type="radio" name="permalink" defaultChecked={i === 0} className="text-blue-600" />
                    <span className="font-bold text-slate-800">{item.label}</span>
                  </div>
                  <span className="font-mono text-slate-500 text-[11px] hidden sm:inline">{item.example}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* TAB: AI GEMINI */}
        {activeTab === 'ai' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Configurações do Gemini AI Studio (Server-Side)</span>
            </h3>

            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-900 space-y-1">
              <p className="font-bold">Segurança e Chave de API:</p>
              <p>
                A chave do Gemini opera exclusivamente no lado do servidor via rotas Next.js App Router API, sem exposição pública.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <label className="text-xs font-bold text-slate-700 sm:text-right">Modelo Principal</label>
              <div className="sm:col-span-2">
                <select
                  value={formData.aiModel}
                  onChange={(e) => setFormData({ ...formData, aiModel: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-mono"
                >
                  <option value="gemini-3.7-flash">gemini-3.7-flash (Velocidade & Redação Inteligente)</option>
                  <option value="gemini-2.5-pro">gemini-2.5-pro (Raciocínio Complexo & SEO Avançado)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Reset Button */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 text-xs">
          <button
            type="button"
            onClick={resetToDemoData}
            className="text-red-600 hover:text-red-700 font-bold hover:underline"
          >
            Restaurar Dados e Configurações Padrão de Fábrica
          </button>

          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>Salvar Alterações</span>
          </button>
        </div>
      </form>
    </div>
  );
}
