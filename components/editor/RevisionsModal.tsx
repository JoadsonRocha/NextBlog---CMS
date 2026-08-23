'use client';

import React, { useState } from 'react';
import { useCMS } from '@/lib/cms-context';
import { ContentRevision, ContentBlock } from '@/types/cms';
import {
  History,
  GitCommit,
  RotateCcw,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  Clock,
  User,
  ArrowLeft,
  X,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface RevisionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemId: string;
  itemType: 'post' | 'page';
  currentBlocks: ContentBlock[];
}

export function RevisionsModal({ isOpen, onClose, itemId, itemType, currentBlocks }: RevisionsModalProps) {
  const { revisions, restoreRevision, createRevisionSnapshot, addToast } = useCMS();
  const [selectedRevisionId, setSelectedRevisionId] = useState<string | null>(null);
  const [newSnapshotSummary, setNewSnapshotSummary] = useState('');
  const [isCreatingSnapshot, setIsCreatingSnapshot] = useState(false);

  if (!isOpen) return null;

  const itemRevisions = revisions.filter((r) => r.itemId === itemId);
  const activeRev = itemRevisions.find((r) => r.id === selectedRevisionId) || itemRevisions[0] || null;

  const handleCreateManualSnapshot = () => {
    if (!newSnapshotSummary.trim()) {
      addToast({ type: 'error', title: 'Digite uma descrição para o snapshot' });
      return;
    }
    createRevisionSnapshot(itemId, itemType, newSnapshotSummary.trim());
    setNewSnapshotSummary('');
    setIsCreatingSnapshot(false);
  };

  const handleRestore = (revId: string) => {
    restoreRevision(revId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in font-sans">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-linear-to-br from-indigo-600 to-purple-700 text-white shadow-xs">
              <History className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-slate-900">Histórico de Versões & Visual Diff (Wagtail Style)</h3>
                <span className="px-2 py-0.5 rounded-full text-xs font-black bg-purple-100 text-purple-800 border border-purple-200">
                  {itemRevisions.length} versões salvas
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Compare alterações visuais bloco a bloco e reverta para qualquer estado anterior com 1 clique.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsCreatingSnapshot(!isCreatingSnapshot)}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-blue-600" />
              <span>Salvar Novo Snapshot</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Create Snapshot Drawer */}
        {isCreatingSnapshot && (
          <div className="p-4 bg-indigo-50/60 border-b border-indigo-100 flex flex-col sm:flex-row items-center gap-3 animate-fade-in text-xs">
            <div className="flex-1 w-full">
              <input
                type="text"
                value={newSnapshotSummary}
                onChange={(e) => setNewSnapshotSummary(e.target.value)}
                placeholder="Descreva as alterações desta versão (ex: Adicionado FAQ e ajustado Callout)..."
                className="w-full p-2.5 rounded-xl border border-indigo-200 bg-white font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleCreateManualSnapshot}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors shadow-xs"
              >
                Salvar Snapshot
              </button>
              <button
                type="button"
                onClick={() => setIsCreatingSnapshot(false)}
                className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Content Area: Sidebar of Versions + Diff Canvas */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left: Revisions Timeline List */}
          <aside className="w-72 sm:w-80 border-r border-slate-200 bg-slate-50/50 p-4 overflow-y-auto space-y-2.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
              Linha do Tempo de Revisões
            </span>

            {itemRevisions.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400 bg-white rounded-xl border border-slate-200">
                Nenhuma revisão registrada ainda.
              </div>
            ) : (
              itemRevisions.map((rev) => {
                const isSelected = activeRev?.id === rev.id;

                return (
                  <div
                    key={rev.id}
                    onClick={() => setSelectedRevisionId(rev.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white border-purple-500 shadow-md ring-2 ring-purple-100'
                        : 'bg-white hover:bg-slate-100/80 border-slate-200/80 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className={`text-xs font-black px-2 py-0.5 rounded-md ${
                        isSelected ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        v{rev.version}.0
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" />
                        {new Date(rev.createdAt).toLocaleDateString('pt-BR')} às {new Date(rev.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-slate-800 line-clamp-1 mb-1">
                      {rev.changeSummary}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3 text-slate-400" />
                        {rev.authorName}
                      </span>
                      <span className="font-semibold text-slate-600">
                        {rev.blocksSnapshot.length} blocos
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </aside>

          {/* Right: Visual Diff Viewer */}
          <main className="flex-1 overflow-y-auto p-6 bg-slate-100/50 space-y-6">
            {activeRev ? (
              <div className="space-y-6 max-w-4xl mx-auto">
                {/* Revision Header & Restore Action Bar */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-extrabold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-lg border border-purple-200">
                        Versão Selecionada: v{activeRev.version}.0
                      </span>
                      <span className="text-xs text-slate-500">
                        Salva por <strong>{activeRev.authorName}</strong> em {new Date(activeRev.createdAt).toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 italic">
                      "{activeRev.changeSummary}"
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRestore(activeRev.id)}
                    className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-transform hover:scale-105 shrink-0"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Restaurar Esta Versão</span>
                  </button>
                </div>

                {/* Diff Stats Banner */}
                <div className="grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Total de Blocos na v{activeRev.version}</span>
                    <span className="text-lg font-black text-slate-900">{activeRev.blocksSnapshot.length}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Atual no Editor</span>
                    <span className="text-lg font-black text-blue-600">{currentBlocks.length}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Diferença de Blocos</span>
                    <span className={`text-lg font-black ${
                      activeRev.blocksSnapshot.length === currentBlocks.length
                        ? 'text-slate-600'
                        : activeRev.blocksSnapshot.length > currentBlocks.length
                        ? 'text-purple-600'
                        : 'text-amber-600'
                    }`}>
                      {activeRev.blocksSnapshot.length - currentBlocks.length > 0 ? `+${activeRev.blocksSnapshot.length - currentBlocks.length}` : activeRev.blocksSnapshot.length - currentBlocks.length}
                    </span>
                  </div>
                </div>

                {/* Side-by-side or block list diff */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Estrutura de Blocos da Versão v{activeRev.version}
                  </span>

                  {activeRev.blocksSnapshot.map((block, idx) => (
                    <div
                      key={block.id || idx}
                      className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between gap-4 hover:border-purple-300 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-md bg-purple-50 text-purple-700 text-xs font-black flex items-center justify-center border border-purple-100 shrink-0">
                          {idx + 1}
                        </span>
                        <div>
                          <span className="text-xs font-bold text-slate-900 uppercase">
                            {block.type}
                          </span>
                          <p className="text-[11px] text-slate-500 truncate max-w-md">
                            {block.content?.title || block.content?.text || block.content?.quote || block.content?.question || JSON.stringify(block.content).slice(0, 60)}
                          </p>
                        </div>
                      </div>

                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                        Preservado
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 text-xs">
                Selecione uma revisão na lista ao lado para inspecionar e comparar.
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
