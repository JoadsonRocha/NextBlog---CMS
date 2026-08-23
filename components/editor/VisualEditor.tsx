'use client';

import React, { useState, useEffect } from 'react';
import { useCMS } from '@/lib/cms-context';
import { BlockRenderer } from '@/components/blocks/BlockRenderer';
import { BlockCatalogModal } from '@/components/editor/BlockCatalogModal';
import { AIAssistantModal } from '@/components/editor/AIAssistantModal';
import { BlockInspector } from '@/components/editor/BlockInspector';
import { SlashCommandMenu } from '@/components/editor/SlashCommandMenu';
import { KeyboardShortcutsModal } from '@/components/editor/KeyboardShortcutsModal';
import { SEOInspectorModal } from '@/components/editor/SEOInspectorModal';
import { ContentBlock, Post, Page, BlockType } from '@/types/cms';
import {
  Monitor,
  Tablet,
  Smartphone,
  Eye,
  Edit3,
  Plus,
  Sparkles,
  Save,
  CheckCircle,
  ExternalLink,
  ArrowLeft,
  GripVertical,
  ArrowUp,
  ArrowDown,
  Trash2,
  Copy,
  Settings2,
  BookmarkCheck,
  Search,
  Share2,
  Keyboard,
  Sliders,
} from 'lucide-react';

export function VisualEditor() {
  const {
    editingTarget,
    posts,
    pages,
    updatePost,
    updatePage,
    activeBlocks,
    addBlock,
    removeBlock,
    duplicateBlock,
    moveBlock,
    saveAsReusableBlock,
    currentUser,
    setActiveView,
    setPublicRoute,
    addToast,
  } = useCMS();

  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [insertIndex, setInsertIndex] = useState<number | undefined>(undefined);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isSEOOpen, setIsSEOOpen] = useState(false);
  const [isSlashOpen, setIsSlashOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isInspectorVisible, setIsInspectorVisible] = useState(true);

  if (!editingTarget) {
    return (
      <div className="p-12 text-center text-slate-500">
        <p className="font-semibold">Nenhum item selecionado para edição.</p>
        <button
          type="button"
          onClick={() => setActiveView('posts')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold"
        >
          Ir para Lista de Posts
        </button>
      </div>
    );
  }

  const isPost = editingTarget.type === 'post';
  const currentItem = isPost
    ? posts.find((p) => p.id === editingTarget.id)
    : pages.find((p) => p.id === editingTarget.id);

  if (!currentItem) {
    return <div className="p-12 text-center text-slate-500">Item não encontrado.</div>;
  }

  const selectedBlock = activeBlocks.find((b) => b.id === selectedBlockId) || null;

  // Global Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing inside input or textarea
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

      // Ctrl/Cmd + S -> Salvar
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        addToast({ type: 'success', title: 'Alterações salvas com sucesso!' });
        return;
      }

      // Ctrl/Cmd + P -> Toggle Preview
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        setIsPreviewMode((prev) => !prev);
        return;
      }

      // Ctrl/Cmd + I -> Assistente IA
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'i') {
        e.preventDefault();
        setIsAIOpen(true);
        return;
      }

      // '/' Key -> Slash Command menu (when not inside inputs)
      if (e.key === '/' && !isInput && !isPreviewMode) {
        e.preventDefault();
        setInsertIndex(activeBlocks.length);
        setIsSlashOpen(true);
        return;
      }

      // '?' Key -> Keyboard Shortcuts Guide
      if (e.key === '?' && !isInput) {
        e.preventDefault();
        setIsShortcutsOpen(true);
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeBlocks.length, isPreviewMode, addToast]);

  const handleTitleChange = (newTitle: string) => {
    if (isPost) {
      updatePost(currentItem.id, { title: newTitle });
    } else {
      updatePage(currentItem.id, { title: newTitle });
    }
  };

  const handleStatusChange = (status: 'published' | 'draft') => {
    if (isPost) {
      updatePost(currentItem.id, {
        status,
        publishedAt: status === 'published' ? new Date().toISOString() : '',
      });
    } else {
      updatePage(currentItem.id, { status });
    }
    addToast({
      type: 'success',
      title: status === 'published' ? 'Publicado com sucesso!' : 'Salvo como rascunho.',
    });
  };

  const handleOpenPublicView = () => {
    if (isPost) {
      setPublicRoute({ type: 'post', slug: currentItem.slug });
    } else {
      setPublicRoute({ type: 'page', slug: currentItem.slug });
    }
    setActiveView('public-site');
  };

  const openCatalogAt = (idx?: number) => {
    setInsertIndex(idx);
    setIsCatalogOpen(true);
  };

  const openSlashAt = (idx?: number) => {
    setInsertIndex(idx);
    setIsSlashOpen(true);
  };

  const handleSelectSlashBlock = (type: BlockType) => {
    addBlock(type, insertIndex);
    addToast({ type: 'success', title: `Bloco "${type}" inserido com sucesso!` });
  };

  const handleApplyAIPost = (postData: any) => {
    if (isPost) {
      updatePost(currentItem.id, {
        title: postData.title || currentItem.title,
        excerpt: postData.excerpt || (currentItem as Post).excerpt,
        category: postData.category || (currentItem as Post).category,
        tags: postData.tags || (currentItem as Post).tags,
        readingTime: postData.readingTime || (currentItem as Post).readingTime,
        seo: {
          metaTitle: postData.metaTitle || postData.title,
          metaDescription: postData.metaDescription || postData.excerpt,
          keywords: postData.tags || [],
        },
        blocks: (postData.blocks || []).map((b: any, i: number) => ({
          id: `blk_ai_${Date.now()}_${i}`,
          type: b.type,
          content: b.content,
          styles: { paddingY: 'medium' },
        })),
      });
      addToast({ type: 'success', title: 'Artigo completo aplicado no editor com sucesso!' });
    }
  };

  const handleApplyAIBlock = (type: any, content: any) => {
    addBlock(type, undefined, content);
  };

  const viewportWidthClass =
    viewport === 'mobile' ? 'max-w-[375px]' : viewport === 'tablet' ? 'max-w-[768px]' : 'max-w-4xl';

  return (
    <div className="flex flex-col h-full bg-slate-100 overflow-hidden font-sans">
      {/* Top Navbar for Visual Editor */}
      <header className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveView(isPost ? 'posts' : 'pages')}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Voltar</span>
          </button>
          <div className="h-4 w-px bg-slate-200" />
          <span className="text-xs font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
            {isPost ? 'Post' : 'Página'}
          </span>
          <span className="text-xs font-bold text-slate-800 truncate max-w-[140px] sm:max-w-xs">
            {currentItem.title || 'Sem título'}
          </span>
        </div>

        {/* Viewport switcher */}
        <div className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setViewport('desktop')}
            className={`p-1.5 rounded-md transition-colors ${
              viewport === 'desktop' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
            title="Desktop"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewport('tablet')}
            className={`p-1.5 rounded-md transition-colors ${
              viewport === 'tablet' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
            title="Tablet"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewport('mobile')}
            className={`p-1.5 rounded-md transition-colors ${
              viewport === 'mobile' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
            title="Mobile"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        {/* Actions & Buttons */}
        <div className="flex items-center gap-2">
          {/* Quick Slash Command Button */}
          {!isPreviewMode && (
            <button
              type="button"
              onClick={() => openSlashAt(activeBlocks.length)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 transition-colors"
              title="Pressione / no editor para abrir"
            >
              <span className="font-mono text-blue-600">/</span>
              <span className="hidden sm:inline">Comandos</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsAIOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-linear-to-r from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100 border border-blue-200 text-blue-700 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Assistente IA</span>
          </button>

          <button
            type="button"
            onClick={() => setIsSEOOpen(true)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">SEO Pro</span>
          </button>

          <button
            type="button"
            onClick={() => setIsShortcutsOpen(true)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Atalhos de Teclado (?)"
          >
            <Keyboard className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isPreviewMode
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {isPreviewMode ? <Edit3 className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{isPreviewMode ? 'Modo Edição' : 'Preview'}</span>
          </button>

          <button
            type="button"
            onClick={handleOpenPublicView}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Ver no Site Público"
          >
            <ExternalLink className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => handleStatusChange(currentItem.status === 'published' ? 'draft' : 'published')}
            disabled={currentUser.role === 'visitor'}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 ${
              currentItem.status === 'published'
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>{currentItem.status === 'published' ? 'Publicado' : 'Publicar'}</span>
          </button>
        </div>
      </header>

      {/* Main Workspace: Canvas + Inspector Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Visual Editor Canvas */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center">
          <div className={`w-full ${viewportWidthClass} transition-all duration-300 bg-white rounded-2xl shadow-md border border-slate-200 min-h-[85vh] p-6 sm:p-12 relative flex flex-col`}>
            {/* Title Header of post/page */}
            <div className="mb-8 border-b border-slate-100 pb-6">
              <input
                type="text"
                value={currentItem.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Título do Conteúdo..."
                disabled={isPreviewMode || currentUser.role === 'visitor'}
                className="w-full text-2xl sm:text-4xl font-extrabold text-slate-900 placeholder:text-slate-300 border-none focus:outline-hidden bg-transparent tracking-tight leading-tight"
              />

              {isPost && (
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <img
                      src={(currentItem as Post).authorAvatar}
                      alt={(currentItem as Post).authorName}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span className="font-semibold text-slate-700">{(currentItem as Post).authorName}</span>
                  </div>
                  <span>•</span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium">
                    {(currentItem as Post).category}
                  </span>
                  <span>•</span>
                  <span>{(currentItem as Post).readingTime || '3 min'} de leitura</span>
                </div>
              )}
            </div>

            {/* List of Content Blocks */}
            <div className="space-y-4 flex-1">
              {activeBlocks.map((block, idx) => {
                const isSelected = selectedBlockId === block.id && !isPreviewMode;

                return (
                  <div key={block.id} className="group/block relative">
                    {/* Floating Add Button Before Block */}
                    {!isPreviewMode && (
                      <div className="opacity-0 group-hover/block:opacity-100 transition-opacity absolute -top-3 inset-x-0 flex justify-center items-center gap-2 z-10">
                        <button
                          type="button"
                          onClick={() => openSlashAt(idx)}
                          className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[11px] font-bold shadow-md hover:bg-slate-800 flex items-center gap-1 transition-transform hover:scale-105"
                        >
                          <span className="text-blue-400 font-mono">/</span>
                          <span>Comando Rápido</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => openCatalogAt(idx)}
                          className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[11px] font-bold shadow-md hover:bg-blue-700 flex items-center gap-1 transition-transform hover:scale-105"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Catálogo</span>
                        </button>
                      </div>
                    )}

                    {/* Block Wrapper */}
                    <div
                      onClick={() => !isPreviewMode && setSelectedBlockId(block.id)}
                      className={`relative rounded-xl transition-all ${
                        isPreviewMode
                          ? ''
                          : isSelected
                          ? 'ring-2 ring-blue-600 bg-blue-50/10 p-2'
                          : 'hover:ring-1 hover:ring-slate-300 p-2 cursor-pointer'
                      }`}
                    >
                      {/* Notion Style Floating Action Controls */}
                      {!isPreviewMode && (
                        <div className={`absolute -top-3.5 right-4 z-20 flex items-center gap-1 rounded-md px-2 py-0.5 shadow-md text-xs transition-opacity ${
                          isSelected ? 'bg-slate-900 text-white opacity-100' : 'bg-slate-800/90 text-slate-200 opacity-0 group-hover/block:opacity-100'
                        }`}>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 mr-1">
                            {block.type}
                          </span>
                          {block.isReusable && (
                            <span className="text-[9px] font-semibold bg-amber-500/30 text-amber-300 px-1.5 py-0.2 rounded mr-1">
                              Reutilizável
                            </span>
                          )}

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              moveBlock(block.id, 'up');
                            }}
                            className="p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white"
                            title="Mover para cima"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              moveBlock(block.id, 'down');
                            }}
                            className="p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white"
                            title="Mover para baixo"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              duplicateBlock(block.id);
                            }}
                            className="p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white"
                            title="Duplicar bloco"
                          >
                            <Copy className="w-3 h-3" />
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeBlock(block.id);
                            }}
                            className="p-1 hover:bg-rose-900 rounded text-rose-300 hover:text-white"
                            title="Remover bloco"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}

                      {/* Render block */}
                      <BlockRenderer block={block} isEditing={!isPreviewMode} />
                    </div>
                  </div>
                );
              })}

              {/* Empty state or End of content Add Button */}
              {activeBlocks.length === 0 ? (
                <div className="py-16 text-center border-2 border-dashed border-slate-200 rounded-2xl p-8 bg-slate-50/50">
                  <Plus className="w-10 h-10 mx-auto text-slate-300 mb-3" />
                  <h3 className="text-base font-bold text-slate-800 mb-1">Página em branco</h3>
                  <p className="text-xs text-slate-500 mb-6 max-w-sm mx-auto">
                    Comece digitando <kbd className="px-1.5 py-0.5 rounded bg-slate-200 font-mono text-slate-800">/</kbd> para inserir blocos ou use nosso assistente inteligente de IA.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => openSlashAt(0)}
                      className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
                    >
                      <span className="text-blue-400 font-mono font-black">/</span>
                      <span>Menu Rápido (Slash)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openCatalogAt(0)}
                      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Catálogo Completo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAIOpen(true)}
                      className="px-4 py-2 rounded-lg bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Gerar com IA</span>
                    </button>
                  </div>
                </div>
              ) : (
                !isPreviewMode && (
                  <div className="pt-6 flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => openSlashAt(activeBlocks.length)}
                      className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold inline-flex items-center gap-2 transition-all shadow-xs"
                    >
                      <span className="text-blue-400 font-mono font-bold">/</span>
                      <span>Inserir Bloco (Slash)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openCatalogAt(activeBlocks.length)}
                      className="px-4 py-2.5 rounded-xl border border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/50 text-slate-600 hover:text-blue-600 text-xs font-bold inline-flex items-center gap-2 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Catálogo de Blocos</span>
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        </main>

        {/* Right Side Inspector */}
        {!isPreviewMode && isInspectorVisible && (
          <BlockInspector block={selectedBlock} onClose={() => setSelectedBlockId(null)} />
        )}
      </div>

      {/* Block Catalog Drawer */}
      <BlockCatalogModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        insertIndex={insertIndex}
      />

      {/* Slash Command Palette */}
      <SlashCommandMenu
        isOpen={isSlashOpen}
        onClose={() => setIsSlashOpen(false)}
        onSelectBlock={handleSelectSlashBlock}
      />

      {/* Keyboard Shortcuts Modal */}
      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      {/* AI Assistant Modal */}
      <AIAssistantModal
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        onApplyGeneratedPost={handleApplyAIPost}
        onApplyBlockContent={handleApplyAIBlock}
      />

      {/* SEO Pro Modal */}
      <SEOInspectorModal
        isOpen={isSEOOpen}
        onClose={() => setIsSEOOpen(false)}
        item={currentItem}
        isPost={isPost}
      />
    </div>
  );
}
