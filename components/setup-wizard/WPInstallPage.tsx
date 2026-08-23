'use client';

import React, { useState } from 'react';
import { useCMS } from '@/lib/cms-context';
import {
  Layers,
  Wand2,
  Check,
  Zap,
  Sparkles,
  Database,
  Server,
  ShieldCheck,
  Loader2,
  ArrowRight,
  ExternalLink,
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
} from 'lucide-react';

export function WPInstallPage() {
  const { completeInstallation, settings } = useCMS();

  const [currentStep, setCurrentStep] = useState(1);
  const [siteName, setSiteName] = useState('Meu Blog & Portal');
  const [siteTagline, setSiteTagline] = useState('Publicação moderna com Next.js e IA');
  const [dbProvider, setDbProvider] = useState<'postgres' | 'inmemory' | 'sqlite' | 'mongodb'>('postgres');
  const [dbUrl, setDbUrl] = useState('process.env.DATABASE_URL (Vercel Storage / Supabase)');
  const [adminName, setAdminName] = useState('Joadson Rocha');
  const [adminEmail, setAdminEmail] = useState('admin@nextblog.com');
  const [adminPassword, setAdminPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [themeId, setThemeId] = useState('modern-saas');
  const [loadDemo, setLoadDemo] = useState(true);
  const [groqKey, setGroqKey] = useState('');
  const [installing, setInstalling] = useState(false);

  const handleFinishInstall = () => {
    setInstalling(true);
    setTimeout(() => {
      completeInstallation({
        siteName,
        siteTagline,
        dbProvider,
        dbUrl,
        adminName,
        adminEmail,
        adminPassword,
        themeId,
        loadDemo,
      });
      setInstalling(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#f0f0f1] text-[#3c434a] flex flex-col justify-center items-center p-4 sm:p-6 font-sans select-none">
      {/* WordPress / NextBlog Center Header Logo */}
      <div className="mb-6 flex flex-col items-center gap-2 text-center">
        <div className="w-16 h-16 rounded-3xl bg-linear-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shadow-xl shadow-blue-500/20">
          <Layers className="w-9 h-9" />
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight text-[#1d2327]">
          Instalação do NextBlog CMS
        </h1>
        <p className="text-xs text-slate-500 font-medium max-w-md">
          Assistente de Configuração em 5 Minutos (Estilo WordPress)
        </p>
      </div>

      {/* Main Installation Form Container (wp-admin/install.php style) */}
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#dcdcde] overflow-hidden flex flex-col">
        {/* Step Progress Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600/30 text-blue-400 border border-blue-500/30">
              <Wand2 className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <span className="font-bold text-sm block">Configuração Inicial</span>
              <span className="text-[11px] text-slate-400">
                {currentStep === 1 && 'Passo 1: Banco de Dados'}
                {currentStep === 2 && 'Passo 2: Identidade do Site'}
                {currentStep === 3 && 'Passo 3: Super Administrador & Conclusão'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  currentStep === step
                    ? 'bg-blue-600 text-white shadow-xs'
                    : currentStep > step
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {currentStep > step ? <Check className="w-3.5 h-3.5" /> : step}
              </div>
            ))}
          </div>
        </div>

        {/* Step Form Body */}
        <div className="p-6 sm:p-8 space-y-6 text-xs overflow-y-auto max-h-[70vh]">
          {/* STEP 1: DATABASE SELECTION */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-slate-900">1. Conexão com o Banco de Dados</h3>
                <p className="text-slate-500">Selecione onde os artigos, páginas e usuários serão armazenados.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Method 1: Vercel Storage 1-Click */}
                <div
                  onClick={() => {
                    setDbProvider('postgres');
                    setDbUrl('process.env.DATABASE_URL (Vercel Storage / Supabase)');
                  }}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    dbProvider === 'postgres'
                      ? 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-100'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Zap className="w-5 h-5 text-blue-600" />
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-blue-600 text-white">
                        1-Click Nuvem
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">Vercel Storage & Supabase</h4>
                    <p className="text-[11px] text-slate-500">
                      Conectado na aba Storage da Vercel sem terminal.
                    </p>
                  </div>
                </div>

                {/* Method 2: Zero Configuration / In-Memory */}
                <div
                  onClick={() => {
                    setDbProvider('inmemory');
                    setDbUrl('');
                  }}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    dbProvider === 'inmemory'
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-100'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Sparkles className="w-5 h-5 text-emerald-600" />
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-emerald-600 text-white">
                        Mais Rápido
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">Zero Configuração (Navegador)</h4>
                    <p className="text-[11px] text-slate-500">
                      Não precisa de banco. Salva tudo no navegador na hora.
                    </p>
                  </div>
                </div>

                {/* Method 3: Custom Connection String */}
                <div
                  onClick={() => setDbProvider('sqlite')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    dbProvider === 'sqlite' || dbProvider === 'mongodb'
                      ? 'border-purple-600 bg-purple-50/50 shadow-md ring-2 ring-purple-100'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Database className="w-5 h-5 text-purple-600" />
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-purple-600 text-white">
                        Custom
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">Neon / PostgreSQL Próprio</h4>
                    <p className="text-[11px] text-slate-500">
                      Cole a URL do seu banco PostgreSQL, SQLite ou Mongo.
                    </p>
                  </div>
                </div>
              </div>

              {dbProvider !== 'inmemory' && (
                <div className="space-y-1.5 pt-2">
                  <label className="block font-bold text-slate-700">String de Conexão (DATABASE_URL)</label>
                  <input
                    type="text"
                    value={dbUrl}
                    onChange={(e) => setDbUrl(e.target.value)}
                    placeholder="postgresql://usuario:senha@host:5432/db"
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 font-mono text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>
          )}

          {/* STEP 2: SITE IDENTITY & THEME */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-slate-900">2. Identidade do Site & Tema Visual</h3>
                <p className="text-slate-500">Defina o nome da sua publicação e escolha o estilo de design.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Título do Site / Blog</label>
                  <input
                    type="text"
                    required
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Slogan / Descrição SEO</label>
                  <input
                    type="text"
                    value={siteTagline}
                    onChange={(e) => setSiteTagline(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="block font-bold text-slate-700">Tema Visual Inicial</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'modern-saas', label: 'Modern SaaS', font: 'Inter', color: 'bg-blue-600' },
                    { id: 'editorial-minimal', label: 'Editorial Minimal', font: 'Merriweather', color: 'bg-slate-900' },
                    { id: 'vibrant-creative', label: 'Vibrant Creative', font: 'Outfit', color: 'bg-purple-600' },
                    { id: 'dark-luxury', label: 'Dark Luxury', font: 'Playfair', color: 'bg-amber-600' },
                  ].map((thm) => (
                    <div
                      key={thm.id}
                      onClick={() => setThemeId(thm.id)}
                      className={`p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                        themeId === thm.id
                          ? 'border-blue-600 bg-blue-50/40 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className={`w-full h-3 rounded-full ${thm.color} mb-2`} />
                      <p className="font-bold text-slate-900 text-xs truncate">{thm.label}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{thm.font}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: MASTER ADMIN & GROQ AI */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-slate-900">3. Conta do Super Administrador (Admin Master)</h3>
                <p className="text-slate-500">Crie as credenciais de acesso para gerenciar o painel administrativo.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nome Completo do Admin</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                      className="w-full pl-3.5 pr-8 py-2.5 rounded-xl border border-slate-300 font-medium text-slate-900"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Endereço de E-mail</label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      className="w-full pl-3.5 pr-8 py-2.5 rounded-xl border border-slate-300 font-medium text-slate-900"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-bold text-slate-700">Senha do Administrador</label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[11px] text-blue-600 hover:underline flex items-center gap-1"
                  >
                    {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    <span>{showPassword ? 'Ocultar' : 'Mostrar'}</span>
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full pl-3.5 pr-8 py-2.5 rounded-xl border border-slate-300 font-mono text-slate-900"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Demo Content Checkbox */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="loadDemo"
                  checked={loadDemo}
                  onChange={(e) => setLoadDemo(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 mt-0.5 cursor-pointer"
                />
                <label htmlFor="loadDemo" className="cursor-pointer">
                  <span className="font-bold text-slate-900 block">Carregar Artigos e Páginas de Exemplo</span>
                  <span className="text-slate-500 text-[11px] block mt-0.5">
                    Seu blog já nascerá com posts completos, blocos interativos e navegação pronta para você personalizar.
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Footer Action Buttons */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 transition-colors text-xs"
            >
              ← Voltar
            </button>
          ) : <div />}

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5"
            >
              <span>Avançar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinishInstall}
              disabled={installing}
              className="px-6 py-3 rounded-xl bg-linear-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold text-xs shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2"
            >
              {installing ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
              <span>{installing ? 'Instalando NextBlog CMS...' : '🚀 Instalar NextBlog CMS'}</span>
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 text-xs text-slate-400">
        NextBlog CMS v2.4.0 • WordPress Headless Engine
      </div>
    </div>
  );
}
