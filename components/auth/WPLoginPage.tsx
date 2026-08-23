'use client';

import React, { useState } from 'react';
import { useCMS } from '@/lib/cms-context';
import {
  Lock,
  Mail,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Layers,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
} from 'lucide-react';

interface WPLoginPageProps {
  onSuccess?: () => void;
}

export function WPLoginPage({ onSuccess }: WPLoginPageProps) {
  const { login, settings, setPublicRoute, setActiveView, users } = useCMS();

  const [email, setEmail] = useState('admin@nextblog.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    setTimeout(() => {
      const success = login(email, password);
      if (success) {
        setActiveView('dashboard');
        if (onSuccess) onSuccess();
      } else {
        setErrorMsg('E-mail ou senha incorretos. Verifique suas credenciais de administrador.');
      }
      setLoading(false);
    }, 400);
  };

  const handleBackToSite = () => {
    setPublicRoute({ type: 'page', slug: 'home' });
    setActiveView('public-site');
  };

  return (
    <div className="min-h-screen bg-[#f0f0f1] text-[#3c434a] flex flex-col justify-center items-center p-4 font-sans select-none">
      {/* WordPress / NextBlog Center Logo */}
      <div className="mb-6 flex flex-col items-center gap-2">
        <div className="w-16 h-16 rounded-3xl bg-linear-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shadow-xl shadow-blue-500/20">
          <Layers className="w-9 h-9" />
        </div>
        <h1 className="text-xl font-extrabold tracking-tight text-[#1d2327]">
          {settings.siteName || 'NextBlog CMS'}
        </h1>
        <p className="text-xs text-slate-500 font-medium">Painel Administrativo WordPress Headless</p>
      </div>

      {/* Login Card (WordPress wp-login.php Style) */}
      <div className="w-full max-w-sm bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-[#dcdcde] space-y-5">
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-50 border-l-4 border-rose-500 text-rose-800 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">
              Nome de Usuário ou Endereço de E-mail
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@seusite.com"
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-300 bg-white font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-xs"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block font-bold text-slate-700">Senha</label>
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-300 bg-white font-mono text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-xs"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
              />
              <span className="text-slate-600 font-medium">Lembrar-me</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-extrabold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{loading ? 'Autenticando...' : 'Acessar Painel Admin'}</span>
          </button>
        </form>

        {/* Quick Demo Credentials helper */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 space-y-1">
          <span className="font-bold text-slate-700 block">💡 Credenciais Padrão do Administrador:</span>
          <p>E-mail: <strong className="text-slate-900 font-mono">admin@nextblog.com</strong></p>
          <p>Senha: <strong className="text-slate-900 font-mono">admin123</strong></p>
        </div>
      </div>

      {/* Back to Public Site Link */}
      <div className="mt-6 text-xs text-slate-500 flex items-center gap-4 font-medium">
        <button
          type="button"
          onClick={handleBackToSite}
          className="hover:text-blue-600 flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>← Voltar para {settings.siteName || 'o Site'}</span>
        </button>
        <span>•</span>
        <span className="text-slate-400">Next.js 15 App Router</span>
      </div>
    </div>
  );
}
