'use client';

import React, { useState } from 'react';
import { useCMS } from '@/lib/cms-context';
import { ContentBlock, ReusableBlock } from '@/types/cms';
import {
  Settings,
  AlignLeft,
  AlignCenter,
  AlignRight,
  BookmarkPlus,
  Trash2,
  Copy,
  ArrowUp,
  ArrowDown,
  Palette,
  Sliders,
  Type,
  X,
  Sparkles,
} from 'lucide-react';

interface BlockInspectorProps {
  block: ContentBlock | null;
  onClose: () => void;
}

export function BlockInspector({ block, onClose }: BlockInspectorProps) {
  const { updateBlock, removeBlock, duplicateBlock, moveBlock, saveAsReusableBlock, addToast } = useCMS();
  const [activeTab, setActiveTab] = useState<'content' | 'styles'>('content');
  const [saveReusableModalOpen, setSaveReusableModalOpen] = useState(false);
  const [reusableTitle, setReusableTitle] = useState('');
  const [reusableCategory, setReusableCategory] = useState<ReusableBlock['category']>('content');

  if (!block) {
    return (
      <aside className="w-80 border-l border-slate-200 bg-white p-6 flex flex-col items-center justify-center text-center text-slate-400">
        <Settings className="w-8 h-8 mb-2 text-slate-300" />
        <p className="text-sm font-medium">Nenhum bloco selecionado</p>
        <p className="text-xs text-slate-400 mt-1">Clique em qualquer bloco na tela para inspecionar e editar suas propriedades.</p>
      </aside>
    );
  }

  const handleContentChange = (field: string, value: any) => {
    updateBlock(block.id, { [field]: value });
  };

  const handleStyleChange = (field: string, value: any) => {
    updateBlock(block.id, {}, { [field]: value });
  };

  const handleSaveReusable = () => {
    if (!reusableTitle) {
      addToast({ type: 'error', title: 'Digite um título para o bloco reutilizável' });
      return;
    }
    saveAsReusableBlock(block.id, reusableTitle, reusableCategory);
    setSaveReusableModalOpen(false);
    setReusableTitle('');
  };

  return (
    <aside className="w-80 border-l border-slate-200 bg-white flex flex-col h-full shadow-xs">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-md bg-blue-100 text-blue-700 text-xs font-bold uppercase">
            {block.type}
          </span>
          <span className="text-xs font-bold text-slate-800">Propriedades</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            title="Mover para Cima"
            onClick={() => moveBlock(block.id, 'up')}
            className="p-1.5 rounded-md hover:bg-slate-200 text-slate-500"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Mover para Baixo"
            onClick={() => moveBlock(block.id, 'down')}
            className="p-1.5 rounded-md hover:bg-slate-200 text-slate-500"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Duplicar Bloco"
            onClick={() => duplicateBlock(block.id)}
            className="p-1.5 rounded-md hover:bg-slate-200 text-slate-500"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Remover Bloco"
            onClick={() => removeBlock(block.id)}
            className="p-1.5 rounded-md hover:bg-red-50 text-red-500"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-slate-200 text-slate-400 hover:text-slate-700 ml-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('content')}
          className={`flex-1 py-2.5 text-center flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
            activeTab === 'content'
              ? 'border-blue-600 text-blue-600 bg-blue-50/30'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          Conteúdo
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('styles')}
          className={`flex-1 py-2.5 text-center flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
            activeTab === 'styles'
              ? 'border-blue-600 text-blue-600 bg-blue-50/30'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          Estilo & Layout
        </button>
      </div>

      {/* Content Form Fields */}
      <div className="p-4 overflow-y-auto flex-1 space-y-4 text-xs">
        {activeTab === 'content' && (
          <>
            {block.type === 'heading' && (
              <>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nível de Título</label>
                  <div className="grid grid-cols-4 gap-1">
                    {[1, 2, 3, 4].map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => handleContentChange('level', lvl)}
                        className={`py-1.5 rounded text-xs font-bold border transition-colors ${
                          (block.content.level || 2) === lvl
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        H{lvl}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Texto do Título</label>
                  <input
                    type="text"
                    value={block.content.text || ''}
                    onChange={(e) => handleContentChange('text', e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
              </>
            )}

            {block.type === 'paragraph' && (
              <div>
                <label className="block font-bold text-slate-700 mb-1">Texto do Parágrafo</label>
                <textarea
                  rows={6}
                  value={block.content.text || ''}
                  onChange={(e) => handleContentChange('text', e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-300 bg-white leading-relaxed"
                />
              </div>
            )}

            {block.type === 'quote' && (
              <>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Citação</label>
                  <textarea
                    rows={4}
                    value={block.content.quote || ''}
                    onChange={(e) => handleContentChange('quote', e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Autor</label>
                  <input
                    type="text"
                    value={block.content.author || ''}
                    onChange={(e) => handleContentChange('author', e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Cargo / Empresa</label>
                  <input
                    type="text"
                    value={block.content.role || ''}
                    onChange={(e) => handleContentChange('role', e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
              </>
            )}

            {block.type === 'hero' && (
              <>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Badge Superior</label>
                  <input
                    type="text"
                    value={block.content.badge || ''}
                    onChange={(e) => handleContentChange('badge', e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Título Principal</label>
                  <textarea
                    rows={2}
                    value={block.content.title || ''}
                    onChange={(e) => handleContentChange('title', e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subtítulo Explicativo</label>
                  <textarea
                    rows={3}
                    value={block.content.subtitle || ''}
                    onChange={(e) => handleContentChange('subtitle', e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Texto Botão Primário</label>
                  <input
                    type="text"
                    value={block.content.primaryCtaText || ''}
                    onChange={(e) => handleContentChange('primaryCtaText', e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">URL Botão Primário</label>
                  <input
                    type="text"
                    value={block.content.primaryCtaUrl || ''}
                    onChange={(e) => handleContentChange('primaryCtaUrl', e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">URL Imagem Destacada</label>
                  <input
                    type="text"
                    value={block.content.imageUrl || ''}
                    onChange={(e) => handleContentChange('imageUrl', e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
              </>
            )}

            {block.type === 'image' && (
              <>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">URL da Imagem</label>
                  <input
                    type="text"
                    value={block.content.url || ''}
                    onChange={(e) => handleContentChange('url', e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Legenda da Foto</label>
                  <input
                    type="text"
                    value={block.content.caption || ''}
                    onChange={(e) => handleContentChange('caption', e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Alt Text (Acessibilidade & SEO)</label>
                  <input
                    type="text"
                    value={block.content.altText || ''}
                    onChange={(e) => handleContentChange('altText', e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
              </>
            )}

            {block.type === 'cta_banner' && (
              <>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tagline</label>
                  <input
                    type="text"
                    value={block.content.tagline || ''}
                    onChange={(e) => handleContentChange('tagline', e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Título da Chamada</label>
                  <input
                    type="text"
                    value={block.content.title || ''}
                    onChange={(e) => handleContentChange('title', e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Descrição</label>
                  <textarea
                    rows={3}
                    value={block.content.description || ''}
                    onChange={(e) => handleContentChange('description', e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Texto do Botão</label>
                  <input
                    type="text"
                    value={block.content.primaryButtonText || ''}
                    onChange={(e) => handleContentChange('primaryButtonText', e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Estilo Visual do Banner</label>
                  <select
                    value={block.content.styleVariant || 'gradient'}
                    onChange={(e) => handleContentChange('styleVariant', e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="gradient">Gradiente Moderno (Azul / Roxo)</option>
                    <option value="dark">Escuro Minimalista (Slate 900)</option>
                    <option value="light">Claro com Borda (Blue 50)</option>
                  </select>
                </div>
              </>
            )}

            {block.type === 'code' && (
              <>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Linguagem</label>
                  <input
                    type="text"
                    value={block.content.language || 'typescript'}
                    onChange={(e) => handleContentChange('language', e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Código</label>
                  <textarea
                    rows={8}
                    value={block.content.code || ''}
                    onChange={(e) => handleContentChange('code', e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-slate-900 text-slate-100 font-mono text-[11px]"
                  />
                </div>
              </>
            )}

            {block.type === 'custom_html' && (
              <div>
                <label className="block font-bold text-slate-700 mb-1">Código HTML / JSX</label>
                <textarea
                  rows={8}
                  value={block.content.html || ''}
                  onChange={(e) => handleContentChange('html', e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-300 bg-white font-mono text-[11px]"
                />
              </div>
            )}

            {block.type === 'callout' && (
              <>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tom Visual do Destaque</label>
                  <select
                    value={block.content.tone || 'info'}
                    onChange={(e) => handleContentChange('tone', e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white text-xs font-semibold"
                  >
                    <option value="info">Azul (Informação / Dica)</option>
                    <option value="warning">Âmbar (Aviso / Atenção)</option>
                    <option value="success">Verde (Sucesso / Concluído)</option>
                    <option value="error">Vermelho (Alerta / Erro)</option>
                    <option value="tip">Roxo (Insight / Criativo)</option>
                    <option value="neutral">Cinza Neutro (Minimalista)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Título do Destaque</label>
                  <input
                    type="text"
                    value={block.content.title || ''}
                    onChange={(e) => handleContentChange('title', e.target.value)}
                    placeholder="Ex: Nota Importante"
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Texto Informativo</label>
                  <textarea
                    rows={4}
                    value={block.content.text || ''}
                    onChange={(e) => handleContentChange('text', e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white text-xs"
                  />
                </div>
              </>
            )}

            {block.type === 'timeline' && (
              <>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Título do Roadmap</label>
                  <input
                    type="text"
                    value={block.content.title || ''}
                    onChange={(e) => handleContentChange('title', e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subtítulo</label>
                  <input
                    type="text"
                    value={block.content.subtitle || ''}
                    onChange={(e) => handleContentChange('subtitle', e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white text-xs"
                  />
                </div>
                <div className="pt-2 border-t border-slate-100">
                  <span className="block font-bold text-slate-700 text-xs mb-2">Marcos da Timeline</span>
                  <div className="space-y-3">
                    {(block.content.items || []).map((item: any, idx: number) => (
                      <div key={idx} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1.5">
                        <input
                          type="text"
                          value={item.title || ''}
                          onChange={(e) => {
                            const newItems = [...(block.content.items || [])];
                            newItems[idx] = { ...newItems[idx], title: e.target.value };
                            handleContentChange('items', newItems);
                          }}
                          placeholder="Título do Marco"
                          className="w-full p-1.5 rounded border border-slate-300 bg-white font-semibold"
                        />
                        <div className="grid grid-cols-2 gap-1.5">
                          <input
                            type="text"
                            value={item.date || ''}
                            onChange={(e) => {
                              const newItems = [...(block.content.items || [])];
                              newItems[idx] = { ...newItems[idx], date: e.target.value };
                              handleContentChange('items', newItems);
                            }}
                            placeholder="Data (ex: Jan 2026)"
                            className="w-full p-1.5 rounded border border-slate-300 bg-white text-[11px]"
                          />
                          <select
                            value={item.status || 'done'}
                            onChange={(e) => {
                              const newItems = [...(block.content.items || [])];
                              newItems[idx] = { ...newItems[idx], status: e.target.value };
                              handleContentChange('items', newItems);
                            }}
                            className="w-full p-1.5 rounded border border-slate-300 bg-white text-[11px]"
                          >
                            <option value="done">Concluído</option>
                            <option value="active">Em Progresso</option>
                            <option value="upcoming">Planejado</option>
                          </select>
                        </div>
                        <input
                          type="text"
                          value={item.description || ''}
                          onChange={(e) => {
                            const newItems = [...(block.content.items || [])];
                            newItems[idx] = { ...newItems[idx], description: e.target.value };
                            handleContentChange('items', newItems);
                          }}
                          placeholder="Breve descrição"
                          className="w-full p-1.5 rounded border border-slate-300 bg-white text-[11px]"
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const newItems = [...(block.content.items || []), { title: 'Novo Marco', date: 'Q3 2026', description: 'Descrição da etapa', status: 'upcoming', tag: 'Novo' }];
                        handleContentChange('items', newItems);
                      }}
                      className="w-full py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                    >
                      + Adicionar Marco
                    </button>
                  </div>
                </div>
              </>
            )}

            {block.type === 'tabs' && (
              <>
                <span className="block font-bold text-slate-700 text-xs mb-2">Abas do Bloco</span>
                <div className="space-y-3">
                  {(block.content.tabs || []).map((tab: any, idx: number) => (
                    <div key={idx} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1.5">
                      <div className="flex gap-1.5">
                        <input
                          type="text"
                          value={tab.label || ''}
                          onChange={(e) => {
                            const newTabs = [...(block.content.tabs || [])];
                            newTabs[idx] = { ...newTabs[idx], label: e.target.value };
                            handleContentChange('tabs', newTabs);
                          }}
                          placeholder="Nome da Aba"
                          className="flex-1 p-1.5 rounded border border-slate-300 bg-white font-bold"
                        />
                        <input
                          type="text"
                          value={tab.badge || ''}
                          onChange={(e) => {
                            const newTabs = [...(block.content.tabs || [])];
                            newTabs[idx] = { ...newTabs[idx], badge: e.target.value };
                            handleContentChange('tabs', newTabs);
                          }}
                          placeholder="Badge"
                          className="w-20 p-1.5 rounded border border-slate-300 bg-white text-[11px]"
                        />
                      </div>
                      <textarea
                        rows={3}
                        value={tab.content || ''}
                        onChange={(e) => {
                          const newTabs = [...(block.content.tabs || [])];
                          newTabs[idx] = { ...newTabs[idx], content: e.target.value };
                          handleContentChange('tabs', newTabs);
                        }}
                        placeholder="Conteúdo exibido nesta aba..."
                        className="w-full p-1.5 rounded border border-slate-300 bg-white text-[11px]"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const newTabs = [...(block.content.tabs || []), { id: `tab_${Date.now()}`, label: 'Nova Aba', content: 'Conteúdo descritivo da nova aba.' }];
                      handleContentChange('tabs', newTabs);
                    }}
                    className="w-full py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                  >
                    + Adicionar Nova Aba
                  </button>
                </div>
              </>
            )}

            {block.type === 'poll' && (
              <>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Pergunta da Enquete</label>
                  <input
                    type="text"
                    value={block.content.question || ''}
                    onChange={(e) => handleContentChange('question', e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white text-xs font-bold"
                  />
                </div>
                <div className="pt-2 border-t border-slate-100">
                  <span className="block font-bold text-slate-700 text-xs mb-2">Opções de Voto</span>
                  <div className="space-y-2">
                    {(block.content.options || []).map((opt: any, idx: number) => (
                      <div key={opt.id || idx} className="flex gap-2">
                        <input
                          type="text"
                          value={opt.text || ''}
                          onChange={(e) => {
                            const newOptions = [...(block.content.options || [])];
                            newOptions[idx] = { ...newOptions[idx], text: e.target.value };
                            handleContentChange('options', newOptions);
                          }}
                          placeholder={`Opção ${idx + 1}`}
                          className="flex-1 p-1.5 rounded border border-slate-300 bg-white text-xs"
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const newOptions = [...(block.content.options || []), { id: `opt_${Date.now()}`, text: 'Nova Opção', votes: 0 }];
                        handleContentChange('options', newOptions);
                      }}
                      className="w-full py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                    >
                      + Adicionar Opção
                    </button>
                  </div>
                </div>
              </>
            )}

            {block.type === 'embed' && (
              <>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Provedor de Mídia</label>
                  <select
                    value={block.content.provider || 'youtube'}
                    onChange={(e) => handleContentChange('provider', e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white text-xs"
                  >
                    <option value="youtube">YouTube Vídeo</option>
                    <option value="spotify">Spotify Playlist / Podcast</option>
                    <option value="figma">Figma Protótipo</option>
                    <option value="codesandbox">CodeSandbox</option>
                    <option value="custom">Iframe Personalizado</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">URL de Compartilhamento / Embed</label>
                  <input
                    type="text"
                    value={block.content.url || ''}
                    onChange={(e) => handleContentChange('url', e.target.value)}
                    placeholder="https://..."
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Legenda Opcional</label>
                  <input
                    type="text"
                    value={block.content.caption || ''}
                    onChange={(e) => handleContentChange('caption', e.target.value)}
                    placeholder="Ex: Protótipo interativo no Figma"
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white text-xs"
                  />
                </div>
              </>
            )}

            {block.type === 'audio' && (
              <>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Título do Áudio / Episódio</label>
                  <input
                    type="text"
                    value={block.content.title || ''}
                    onChange={(e) => handleContentChange('title', e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Apresentador / Autor</label>
                  <input
                    type="text"
                    value={block.content.author || ''}
                    onChange={(e) => handleContentChange('author', e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Duração (ex: 18:45)</label>
                  <input
                    type="text"
                    value={block.content.duration || '24:00'}
                    onChange={(e) => handleContentChange('duration', e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">URL do Arquivo MP3 / Stream</label>
                  <input
                    type="text"
                    value={block.content.audioUrl || ''}
                    onChange={(e) => handleContentChange('audioUrl', e.target.value)}
                    placeholder="https://exemplo.com/podcast.mp3"
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white text-xs font-mono"
                  />
                </div>
              </>
            )}
          </>
        )}

        {activeTab === 'styles' && (
          <div className="space-y-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Alinhamento de Texto</label>
              <div className="grid grid-cols-3 gap-1">
                <button
                  type="button"
                  onClick={() => handleStyleChange('textAlign', 'left')}
                  className={`p-2 rounded border flex items-center justify-center ${
                    block.styles?.textAlign === 'left' || !block.styles?.textAlign ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <AlignLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleStyleChange('textAlign', 'center')}
                  className={`p-2 rounded border flex items-center justify-center ${
                    block.styles?.textAlign === 'center' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <AlignCenter className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleStyleChange('textAlign', 'right')}
                  className={`p-2 rounded border flex items-center justify-center ${
                    block.styles?.textAlign === 'right' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <AlignRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Espaçamento Vertical (Padding)</label>
              <select
                value={block.styles?.paddingY || 'medium'}
                onChange={(e) => handleStyleChange('paddingY', e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-300 bg-white"
              >
                <option value="none">Nenhum (0px)</option>
                <option value="small">Compacto (8px)</option>
                <option value="medium">Padrão (24px)</option>
                <option value="large">Espaçoso (48px)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Arredondamento de Bordas</label>
              <select
                value={block.styles?.borderRadius || 'none'}
                onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-300 bg-white"
              >
                <option value="none">Reto (0px)</option>
                <option value="sm">Suave (6px)</option>
                <option value="md">Médio (12px)</option>
                <option value="lg">Arredondado (16px)</option>
                <option value="full">Pílula / Redondo</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Cor de Fundo Customizada</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={block.styles?.backgroundColor || '#ffffff'}
                  onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                  className="w-8 h-8 rounded border border-slate-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={block.styles?.backgroundColor || ''}
                  onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                  placeholder="#ffffff"
                  className="flex-1 p-2 rounded-lg border border-slate-300 font-mono text-xs"
                />
                {block.styles?.backgroundColor && (
                  <button
                    type="button"
                    onClick={() => handleStyleChange('backgroundColor', undefined)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Limpar
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Save as Reusable CTA */}
      <div className="p-3 border-t border-slate-200 bg-slate-50">
        <button
          type="button"
          onClick={() => setSaveReusableModalOpen(true)}
          className="w-full py-2 px-3 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
        >
          <BookmarkPlus className="w-3.5 h-3.5 text-amber-700" />
          Salvar como Bloco Reutilizável
        </button>
      </div>

      {/* Reusable modal prompt */}
      {saveReusableModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-sm w-full p-5 border border-slate-200 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
              <BookmarkPlus className="w-4 h-4 text-amber-600" />
              Salvar Bloco na Biblioteca
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Este bloco ficará disponível para inserção em qualquer página ou post com 1 clique.
            </p>
            <div className="space-y-3 text-xs mb-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Título do Bloco</label>
                <input
                  type="text"
                  placeholder="Ex: CTA Promoção de Natal"
                  value={reusableTitle}
                  onChange={(e) => setReusableTitle(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Categoria</label>
                <select
                  value={reusableCategory}
                  onChange={(e) => setReusableCategory(e.target.value as any)}
                  className="w-full p-2 rounded-lg border border-slate-300"
                >
                  <option value="marketing">Marketing & Conversão</option>
                  <option value="content">Conteúdo & Artigo</option>
                  <option value="layout">Layout & Hero</option>
                  <option value="commerce">Comércio & Preços</option>
                  <option value="interactive">Interativo & Formulários</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setSaveReusableModalOpen(false)}
                className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveReusable}
                className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white shadow-xs"
              >
                Salvar Bloco
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
