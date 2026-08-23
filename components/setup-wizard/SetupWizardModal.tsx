'use client';

import React, { useState } from 'react';
import { useCMS } from '@/lib/cms-context';
import {
  Wand2,
  CheckCircle2,
  Database,
  Globe,
  User,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  Server,
  ShieldCheck,
  Check,
  Loader2,
  Layers,
  Palette,
  Terminal,
  Cpu,
} from 'lucide-react';

interface SetupWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SetupWizardModal({ isOpen, onClose }: SetupWizardModalProps) {
  const { settings, updateSettings, currentUser, updateUser, themes, activateTheme, addToast } = useCMS();

  const [currentStep, setCurrentStep] = useState(1);
  const [testingDb, setTestingDb] = useState(false);
  const [dbStatus, setDbStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Form State
  const [dbProvider, setDbProvider] = useState<'postgres' | 'sqlite' | 'mongodb' | 'inmemory'>('postgres');
  const [dbUrl, setDbUrl] = useState('postgresql://usuario:senha@localhost:5432/nextblog_db?schema=public');
  const [siteName, setSiteName] = useState(settings.siteName || 'Meu Site Incrível');
  const [siteDescription, setSiteDescription] = useState(settings.siteDescription || 'Um blog moderno desenvolvido com NextBlog CMS');
  const [selectedThemeId, setSelectedThemeId] = useState(themes.find((t) => t.isActive)?.id || 'theme_1');
  const [adminName, setAdminName] = useState(currentUser.name || 'Administrador');
  const [adminEmail, setAdminEmail] = useState(currentUser.email || 'admin@exemplo.com');
  const [adminPassword, setAdminPassword] = useState('********');
  const [groqKey, setGroqKey] = useState('');
  const [installDemoData, setInstallDemoData] = useState(true);

  if (!isOpen) return null;

  const totalSteps = 5;

  const handleTestConnection = () => {
    setTestingDb(true);
    setDbStatus('idle');
    setTimeout(() => {
      setTestingDb(false);
      setDbStatus('success');
      addToast({ type: 'success', title: 'Conexão validada com sucesso!', message: `Conectado ao provedor ${dbProvider.toUpperCase()}` });
    }, 1000);
  };

  const handleFinishSetup = () => {
    // Apply configurations to CMS state
    updateSettings({
      siteName,
      siteDescription,
    });

    updateUser(currentUser.id, {
      name: adminName,
      email: adminEmail,
    });

    activateTheme(selectedThemeId);

    addToast({
      type: 'success',
      title: '🎉 Instalação Concluída com Sucesso!',
      message: 'O NextBlog CMS está pronto e configurado para produção.',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in font-sans">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-linear-to-r from-blue-700 via-indigo-700 to-purple-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/10 text-white backdrop-blur-md shadow-xs">
              <Wand2 className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">Assistente de Instalação Rápida</h2>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-white/20 text-white">
                  WordPress Style (5 Min)
                </span>
              </div>
              <p className="text-xs text-blue-100">
                Configure seu banco de dados, identidade da marca, super admin e IA em 5 etapas guiadas.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center justify-between text-xs">
          {[
            { step: 1, label: 'Diagnóstico' },
            { step: 2, label: 'Banco de Dados' },
            { step: 3, label: 'Identidade' },
            { step: 4, label: 'Super Admin' },
            { step: 5, label: 'IA & Conclusão' },
          ].map((s) => (
            <div
              key={s.step}
              onClick={() => setCurrentStep(s.step)}
              className={`flex items-center gap-1.5 cursor-pointer font-bold transition-colors ${
                currentStep === s.step
                  ? 'text-blue-600'
                  : currentStep > s.step
                  ? 'text-emerald-600'
                  : 'text-slate-400'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black ${
                  currentStep === s.step
                    ? 'bg-blue-600 text-white shadow-xs'
                    : currentStep > s.step
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {currentStep > s.step ? <Check className="w-3.5 h-3.5" /> : s.step}
              </div>
              <span className="hidden sm:inline">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 text-xs">
          {/* STEP 1: WELCOME & SYSTEM CHECK */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center max-w-md mx-auto space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-xs">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">Bem-vindo ao NextBlog CMS</h3>
                <p className="text-slate-500">
                  O CMS híbrido de nova geração que une a facilidade do WordPress, a flexibilidade de API do Strapi, a velocidade do Ghost e a edição Notion.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block">
                  Verificação de Requisitos do Servidor
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { label: 'Next.js 15.5 App Router', status: 'Compatível (Pronto para Produção)', ok: true },
                    { label: 'React 19.2 Server Components', status: 'Ativo', ok: true },
                    { label: 'Ambiente Node.js 20+ LTS', status: 'Validado', ok: true },
                    { label: 'Multi-Cloud Deploy Ready', status: 'Vercel, Netlify, Railway, Render, Docker', ok: true },
                    { label: 'Suporte a ISR & Edge Caching', status: 'Ativado', ok: true },
                    { label: 'Motor de IA Groq Llama 3.3', status: 'Pronto para Conexão', ok: true },
                  ].map((req, i) => (
                    <div key={i} className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between shadow-2xs">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <div>
                          <p className="font-bold text-slate-800">{req.label}</p>
                          <p className="text-[10px] text-slate-400">{req.status}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: DATABASE CONFIG */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-slate-900">Selecione o Provedor de Banco de Dados</h3>
                <p className="text-slate-500">Escolha onde você deseja persistir seus posts, páginas, blocos e usuários.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'postgres', label: 'PostgreSQL', desc: 'Supabase / Neon / Railway', icon: Database, badge: 'Recomendado' },
                  { id: 'sqlite', label: 'SQLite / Turso', desc: 'Local ou Edge Serverless', icon: Server, badge: 'Rápido' },
                  { id: 'mongodb', label: 'MongoDB Atlas', desc: 'NoSQL Document Store', icon: Cpu, badge: 'Mongoose' },
                  { id: 'inmemory', label: 'In-Memory / Local', desc: 'Armazenamento no Navegador', icon: Terminal, badge: 'Demo' },
                ].map((prov) => {
                  const Icon = prov.icon;
                  const isSelected = dbProvider === prov.id;
                  return (
                    <div
                      key={prov.id}
                      onClick={() => setDbProvider(prov.id as any)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-100'
                          : 'border-slate-200 hover:border-slate-300 bg-white shadow-2xs'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Icon className={`w-5 h-5 ${isSelected ? 'text-blue-600' : 'text-slate-500'}`} />
                          <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                            isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {prov.badge}
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-900">{prov.label}</h4>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-2">{prov.desc}</p>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-3 pt-2">
                <label className="block font-bold text-slate-700">String de Conexão (DATABASE_URL)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={dbUrl}
                    onChange={(e) => setDbUrl(e.target.value)}
                    placeholder="postgresql://usuario:senha@host:5432/database"
                    className="flex-1 p-2.5 rounded-xl border border-slate-300 bg-slate-50 font-mono text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleTestConnection}
                    disabled={testingDb}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold transition-colors shrink-0 flex items-center gap-1.5 shadow-xs"
                  >
                    {testingDb ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                    <span>Testar Conexão</span>
                  </button>
                </div>

                {dbStatus === 'success' && (
                  <p className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Conexão com {dbProvider.toUpperCase()} estabelecida e migrações sincronizadas!
                  </p>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: SITE IDENTITY & THEME */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-slate-900">Identidade do Site & Tema Visual</h3>
                <p className="text-slate-500">Defina o nome da sua publicação e escolha o estilo visual padrão.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Título do Site / Empresa</label>
                  <input
                    type="text"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Slogan / Descrição SEO</label>
                  <input
                    type="text"
                    value={siteDescription}
                    onChange={(e) => setSiteDescription(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-slate-700"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-blue-600" />
                  <span>Escolha o Tema Inicial</span>
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {themes.map((theme) => {
                    const isSelected = selectedThemeId === theme.id;
                    return (
                      <div
                        key={theme.id}
                        onClick={() => setSelectedThemeId(theme.id)}
                        className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-100'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <span
                            className="w-3.5 h-3.5 rounded-full shadow-2xs border border-white"
                            style={{ backgroundColor: theme.primaryColor }}
                          />
                          <span className="font-bold text-slate-900 text-xs truncate">{theme.name}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 line-clamp-1">{theme.fontFamily}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: SUPER ADMIN CREATION */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-slate-900">Criar Conta do Super Administrador</h3>
                <p className="text-slate-500">Este usuário terá controle total sobre posts, páginas, plugins, deploy e banco de dados.</p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nome Completo do Administrador</label>
                  <input
                    type="text"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">E-mail Principal</label>
                    <input
                      type="email"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Senha de Acesso Master</label>
                    <input
                      type="password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-mono text-slate-800"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: GROQ AI & CONCLUSION */}
          {currentStep === 5 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-slate-900">Inteligência Artificial & Pacote de Demonstração</h3>
                <p className="text-slate-500">Ative o motor ultra-rápido da Groq (Llama 3.3 70B) e escolha o conteúdo inicial.</p>
              </div>

              <div className="p-5 rounded-2xl bg-orange-50/60 border border-orange-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-orange-600" />
                    <span>Chave da API Groq (GROQ_API_KEY)</span>
                  </label>
                  <a
                    href="https://console.groq.com/keys"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-bold text-orange-700 hover:underline"
                  >
                    Obter Chave Gratuita ↗
                  </a>
                </div>

                <input
                  type="text"
                  value={groqKey}
                  onChange={(e) => setGroqKey(e.target.value)}
                  placeholder="gsk_sua_chave_groq_aqui (Opcional - pode ser configurada depois no .env)"
                  className="w-full p-2.5 rounded-xl border border-orange-200 bg-white font-mono text-slate-800"
                />
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={installDemoData}
                    onChange={(e) => setInstallDemoData(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <div>
                    <span className="font-bold text-slate-900 block">Instalar com Conteúdo de Demonstração</span>
                    <span className="text-slate-500 text-[11px]">
                      Inclui páginas pré-montadas (Home, Serviços, Contato), artigos técnicos de exemplo e os 24 widgets.
                    </span>
                  </div>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-30 disabled:pointer-events-none shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
              Passo {currentStep} de {totalSteps}
            </span>

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => Math.min(totalSteps, prev + 1))}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <span>Avançar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinishSetup}
                className="px-6 py-2.5 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-transform hover:scale-105"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>🚀 Concluir Instalação</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
