'use client';

import React, { useState } from 'react';
import { useCMS } from '@/lib/cms-context';
import { BlockType } from '@/types/cms';
import { Sparkles, Loader2, Wand2, RefreshCw, Check, ArrowRight, X, Lightbulb } from 'lucide-react';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyGeneratedPost?: (postData: any) => void;
  onApplyBlockContent?: (blockType: BlockType, content: any) => void;
}

export function AIAssistantModal({ isOpen, onClose, onApplyGeneratedPost, onApplyBlockContent }: AIAssistantModalProps) {
  const { addToast } = useCMS();
  const [activeTab, setActiveTab] = useState<'full_post' | 'single_block' | 'rewrite'>('full_post');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedData, setGeneratedData] = useState<any>(null);
  const [selectedBlockType, setSelectedBlockType] = useState<BlockType>('faq');
  const [rewriteTone, setRewriteTone] = useState('profissional e persuasivo');
  const [textToRewrite, setTextToRewrite] = useState('');

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (activeTab === 'full_post' && !prompt) {
      addToast({ type: 'error', title: 'Digite o tema ou tópico do artigo' });
      return;
    }
    if (activeTab === 'single_block' && !prompt) {
      addToast({ type: 'error', title: 'Digite o contexto do bloco desejado' });
      return;
    }
    if (activeTab === 'rewrite' && !textToRewrite) {
      addToast({ type: 'error', title: 'Insira o texto que deseja reescrever' });
      return;
    }

    setLoading(true);
    setGeneratedData(null);

    try {
      let payload: any = {};
      if (activeTab === 'full_post') {
        payload = { action: 'generate_post', prompt };
      } else if (activeTab === 'single_block') {
        payload = { action: 'generate_block', prompt, blockType: selectedBlockType };
      } else if (activeTab === 'rewrite') {
        payload = { action: 'rewrite_text', currentText: textToRewrite, tone: rewriteTone };
      }

      const res = await fetch('/api/groq/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok || json.error) {
        throw new Error(json.error || 'Falha ao gerar conteúdo com IA da Groq');
      }

      setGeneratedData(json.data || json.result);
      addToast({ type: 'success', title: 'Conteúdo gerado via Groq (Llama 3.3 70B) com sucesso!' });
    } catch (err: any) {
      console.error(err);
      addToast({ type: 'error', title: 'Erro ao chamar Groq API', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (!generatedData) return;

    if (activeTab === 'full_post' && onApplyGeneratedPost) {
      onApplyGeneratedPost(generatedData);
      onClose();
    } else if (activeTab === 'single_block' && onApplyBlockContent) {
      onApplyBlockContent(selectedBlockType, generatedData);
      onClose();
    } else if (activeTab === 'rewrite' && onApplyBlockContent) {
      onApplyBlockContent('paragraph', { text: generatedData });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-linear-to-r from-orange-600 via-amber-600 to-indigo-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-white/10 text-amber-200 shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2">
                Assistente de Conteúdo IA
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-white/20 text-white border border-white/30">
                  ⚡ Groq Llama 3.3 70B
                </span>
              </h2>
              <p className="text-xs text-orange-100">Geração ultra-rápida de artigos estruturados em blocos, SEO e seções com Groq</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Tabs */}
        <div className="p-3 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
          <button
            type="button"
            onClick={() => { setActiveTab('full_post'); setGeneratedData(null); }}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'full_post'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            Artigo Completo em Blocos
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('single_block'); setGeneratedData(null); }}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'single_block'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            Gerar Bloco Específico (FAQ, Preços, etc.)
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('rewrite'); setGeneratedData(null); }}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'rewrite'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            Reescrever e Aprimorar Texto
          </button>
        </div>

        {/* Body input */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'full_post' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Sobre o que você quer escrever?
              </label>
              <textarea
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ex: Como migrar um site WordPress legado para Next.js 15 mantendo SEO e performance..."
                className="w-full p-3 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>A IA gerará título, resumo, tags, metadados de SEO e uma sequência de 5+ blocos prontos.</span>
              </div>
            </div>
          )}

          {activeTab === 'single_block' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Tipo de Bloco
                </label>
                <select
                  value={selectedBlockType}
                  onChange={(e) => setSelectedBlockType(e.target.value as BlockType)}
                  className="w-full p-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                >
                  <option value="faq">Acordeão de FAQ (Perguntas Frequentes)</option>
                  <option value="pricing">Tabela de Preços e Planos</option>
                  <option value="testimonials">Depoimentos de Clientes</option>
                  <option value="cta_banner">Banner de Conversão (CTA)</option>
                  <option value="hero">Cabeçalho Hero</option>
                  <option value="stats">Estatísticas & Métricas</option>
                  <option value="table">Tabela Comparativa</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Contexto ou Nicho
                </label>
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ex: Plataforma de automação de marketing para pequenas empresas"
                  className="w-full p-2.5 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'rewrite' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Tom de Voz Desejado
                </label>
                <select
                  value={rewriteTone}
                  onChange={(e) => setRewriteTone(e.target.value)}
                  className="w-full p-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                >
                  <option value="profissional, claro e persuasivo">Profissional & Persuasivo</option>
                  <option value="casual, moderno e direto ao ponto">Casual & Moderno</option>
                  <option value="altamente técnico e aprofundado">Técnico & Especialista</option>
                  <option value="curto, sintético e objetivo para mobile">Conciso & Objetivo</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Texto Original
                </label>
                <textarea
                  rows={4}
                  value={textToRewrite}
                  onChange={(e) => setTextToRewrite(e.target.value)}
                  placeholder="Cole aqui o texto que você deseja melhorar ou reescrever..."
                  className="w-full p-3 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* Action button */}
          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Gerando com Gemini 3.7 Flash...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                <span>Gerar Conteúdo com IA</span>
              </>
            )}
          </button>

          {/* Result preview */}
          {generatedData && (
            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Resultado Gerado
                </span>
              </div>
              <pre className="p-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 max-h-56 overflow-y-auto leading-relaxed whitespace-pre-wrap">
                {typeof generatedData === 'string'
                  ? generatedData
                  : JSON.stringify(generatedData, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
          >
            Cancelar
          </button>
          {generatedData && (
            <button
              type="button"
              onClick={handleApply}
              className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5"
            >
              <span>Aplicar no Editor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
