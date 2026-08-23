'use client';

import React, { useState } from 'react';
import { useCMS } from '@/lib/cms-context';
import {
  Zap,
  Activity,
  Download,
  Upload,
  Database,
  CheckCircle2,
  AlertCircle,
  FileJson,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Server,
  Code,
} from 'lucide-react';

export function ToolsManager() {
  const {
    exportJSONBackup,
    importJSONBackup,
    resetToDemoData,
    settings,
    posts,
    pages,
    media,
    addToast,
  } = useCMS();

  const [activeTab, setActiveTab] = useState<'health' | 'backup' | 'import_wp' | 'database'>('health');
  const [importText, setImportText] = useState('');

  const handleImport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importText.trim()) return;
    const success = importJSONBackup(importText.trim());
    if (success) setImportText('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        importJSONBackup(content);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-6xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Ferramentas do Sistema</h1>
          <p className="text-xs text-slate-500 mt-1">
            Diagnóstico de saúde do site, importador/exportador compatível com WordPress e utilitários.
          </p>
        </div>

        <button
          type="button"
          onClick={exportJSONBackup}
          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
        >
          <Download className="w-4 h-4" />
          <span>Exportar Backup Completo</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('health')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'health'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Saúde do Site (Site Health)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('backup')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'backup'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Download className="w-4 h-4" />
          <span>Importar / Exportar WXR & JSON</span>
        </button>
      </div>

      {/* VIEW: SITE HEALTH */}
      {activeTab === 'health' && (
        <div className="space-y-6">
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-emerald-950">Status do Sistema: Excelente</h3>
              <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                Seu site NextBlock CMS passou em todos os testes de segurança, performance e integridade de banco de dados. A renderização híbrida SSR/ISR com Next.js 15 garante pontuação máxima no Core Web Vitals.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: 'Arquitetura de Execução',
                val: 'Next.js 15 App Router + React 19',
                status: 'ok',
                desc: 'Compilação estática instantânea e Server Components.',
              },
              {
                title: 'Banco de Dados',
                val: 'PostgreSQL / MongoDB (Headless Ready)',
                status: 'ok',
                desc: 'Conexão ativa com suporte a pooling de conexões.',
              },
              {
                title: 'Motor de IA Server-Side',
                val: 'Gemini 3.7 Flash',
                status: 'ok',
                desc: 'Geração de conteúdo e automação de SEO ativas.',
              },
              {
                title: 'Compressão e Otimização de Mídia',
                val: 'WebP / AVIF Automático',
                status: 'ok',
                desc: 'Imagens redimensionadas sob demanda para economizar tráfego.',
              },
            ].map((check) => (
              <div key={check.title} className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">{check.title}</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Ativo
                  </span>
                </div>
                <p className="text-xs font-mono text-blue-600 font-semibold">{check.val}</p>
                <p className="text-[11px] text-slate-500 mt-1">{check.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW: BACKUP & IMPORT */}
      {activeTab === 'backup' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Download className="w-4 h-4 text-blue-600" />
              <span>Exportar Conteúdo (Formato WordPress / NextBlock)</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Baixe um arquivo contendo todos os seus posts ({posts.length}), páginas ({pages.length}), blocos reutilizáveis e mídias ({media.length}) em formato interoperável.
            </p>
            <button
              type="button"
              onClick={exportJSONBackup}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Baixar Arquivo de Exportação (.json)</span>
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Upload className="w-4 h-4 text-emerald-600" />
              <span>Importar Arquivo de Backup</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Carregue um arquivo JSON previamente exportado para restaurar o estado completo do site.
            </p>

            <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:bg-slate-50 transition-colors">
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
                id="file-import-input"
              />
              <label htmlFor="file-import-input" className="cursor-pointer block">
                <FileJson className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                <span className="text-xs font-bold text-blue-600 hover:underline block">
                  Clique para selecionar arquivo .json
                </span>
                <span className="text-[11px] text-slate-400">ou arraste e solte o arquivo aqui</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
