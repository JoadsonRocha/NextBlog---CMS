'use client';

import React from 'react';
import { Keyboard, X, Command, Sparkles, Plus, Eye, Save } from 'lucide-react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function KeyboardShortcutsModal({ isOpen, onClose }: KeyboardShortcutsModalProps) {
  if (!isOpen) return null;

  const shortcuts = [
    { key: '/', desc: 'Abrir Menu Slash Commands para inserir blocos rapidamente', icon: Plus },
    { key: 'Ctrl / ⌘ + S', desc: 'Salvar alterações do post / página', icon: Save },
    { key: 'Ctrl / ⌘ + P', desc: 'Alternar entre Modo de Edição e Modo Preview', icon: Eye },
    { key: 'Ctrl / ⌘ + I', desc: 'Abrir Assistente Inteligente Google Gemini', icon: Sparkles },
    { key: 'Esc', desc: 'Fechar qualquer gaveta, modal ou menu aberto' },
    { key: '↑ / ↓ (no menu /)', desc: 'Navegar pela lista de blocos do comando /' },
    { key: 'Enter (no menu /)', desc: 'Inserir o bloco selecionado imediatamente' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Atalhos de Teclado (Notion Style)</h3>
              <p className="text-xs text-slate-500">Acelere sua produtividade na criação de conteúdo</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-2.5 max-h-[60vh] overflow-y-auto">
          {shortcuts.map((sc, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-100/80 transition-colors"
            >
              <span className="text-xs text-slate-700 font-medium">{sc.desc}</span>
              <kbd className="px-2.5 py-1 rounded-md bg-white border border-slate-300 text-slate-800 text-xs font-mono font-bold shadow-2xs shrink-0 ml-3">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
