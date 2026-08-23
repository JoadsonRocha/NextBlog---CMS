'use client';

import React, { useState } from 'react';
import { useCMS } from '@/lib/cms-context';
import { SetupWizardModal } from '@/components/setup-wizard/SetupWizardModal';
import {
  Globe,
  Plus,
  MessageSquare,
  Sparkles,
  User,
  Shield,
  ChevronDown,
  Layers,
  FileText,
  BookmarkCheck,
  Image as ImageIcon,
  ExternalLink,
  Zap,
  LayoutDashboard,
  Settings,
  Paintbrush,
  Puzzle,
  RotateCw,
  Wand2,
  LogOut,
} from 'lucide-react';

export function WPAdminBar() {
  const {
    activeView,
    setActiveView,
    currentUser,
    switchUserRole,
    settings,
    comments,
    createNewPost,
    createNewPage,
    setPublicRoute,
    logout,
    isAuthenticated,
  } = useCMS();

  const [newDropdownOpen, setNewDropdownOpen] = useState(false);
  const [siteDropdownOpen, setSiteDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const pendingCommentsCount = comments.filter((c) => c.status === 'pending').length;

  const handleOpenSite = (slug = 'home') => {
    setPublicRoute({ type: 'page', slug });
    setActiveView('public-site');
    setSiteDropdownOpen(false);
  };

  // If visitor is NOT logged in, show a clean top bar without exposing admin management tools
  if (!isAuthenticated) {
    return (
      <header
        id="wp-admin-bar"
        className="h-8 bg-[#1d2327] text-[#f0f0f1] text-[12px] px-4 flex items-center justify-between z-50 select-none border-b border-[#2c3338] shrink-0 font-sans"
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center font-black text-[9px] text-white">
            W
          </div>
          <span className="font-bold text-slate-300">{settings.siteName || 'NextBlog'}</span>
          <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">• Modo Visitante</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveView('docs')}
            className="px-2.5 py-0.5 rounded text-xs font-semibold text-slate-300 hover:text-white hover:bg-[#2c3338] transition-colors"
          >
            Documentação
          </button>
          <button
            type="button"
            onClick={() => setActiveView('dashboard')}
            className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold transition-colors flex items-center gap-1 shadow-xs"
          >
            <span>🔒 Acessar Painel Admin</span>
          </button>
        </div>
      </header>
    );
  }

  return (
    <header
      id="wp-admin-bar"
      className="h-8 bg-[#1d2327] text-[#f0f0f1] text-[13px] px-3 flex items-center justify-between z-50 select-none border-b border-[#2c3338] shrink-0 font-sans"
    >
      {/* Left side items */}
      <div className="flex items-center space-x-1 sm:space-x-2">
        {/* WordPress / NextBlock Icon & Dropdown */}
        <div className="relative group">
          <button
            type="button"
            className="flex items-center gap-1.5 px-2 py-1 hover:bg-[#2c3338] text-slate-300 hover:text-white rounded text-xs transition-colors"
            title="Sobre o NextBlock CMS"
          >
            <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center font-black text-[10px] text-white">
              W
            </div>
            <span className="font-bold hidden md:inline text-[12px]">WordPress Headless</span>
          </button>
          <div className="absolute left-0 top-full mt-0 w-48 bg-[#1d2327] border border-[#2c3338] shadow-2xl py-1 hidden group-hover:block z-50 rounded-b">
            <button
              type="button"
              onClick={() => setActiveView('dashboard')}
              className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-blue-600 hover:text-white flex items-center gap-2"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Painel de Controle</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveView('plugins')}
              className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-blue-600 hover:text-white flex items-center gap-2"
            >
              <Puzzle className="w-3.5 h-3.5" />
              <span>Extensões & Plugins</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveView('tools')}
              className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-blue-600 hover:text-white flex items-center gap-2"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Saúde do Site & APIs</span>
            </button>
            <div className="border-t border-[#2c3338] my-1" />
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 text-[11px] text-slate-400 hover:bg-blue-600 hover:text-white flex items-center justify-between"
            >
              <span>Next.js 15 App Router</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Site Name & Visit dropdown */}
        <div className="relative group">
          <button
            type="button"
            onClick={() => handleOpenSite('home')}
            className="flex items-center gap-1.5 px-2 py-1 hover:bg-[#2c3338] text-slate-200 hover:text-white rounded text-xs transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-semibold max-w-[130px] sm:max-w-[200px] truncate">{settings.siteName || 'Meu Site WordPress'}</span>
          </button>
          <div className="absolute left-0 top-full mt-0 w-44 bg-[#1d2327] border border-[#2c3338] shadow-2xl py-1 hidden group-hover:block z-50 rounded-b">
            <button
              type="button"
              onClick={() => handleOpenSite('home')}
              className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-blue-600 hover:text-white flex items-center gap-2"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Visitar Site Público</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setPublicRoute({ type: 'blog' });
                setActiveView('public-site');
              }}
              className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-blue-600 hover:text-white flex items-center gap-2"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Ver Blog & Artigos</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveView('appearance')}
              className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-blue-600 hover:text-white flex items-center gap-2"
            >
              <Paintbrush className="w-3.5 h-3.5" />
              <span>Personalizar Tema</span>
            </button>
          </div>
        </div>

        {/* "+ Novo" Dropdown */}
        <div className="relative group">
          <button
            type="button"
            className="flex items-center gap-1 px-2 py-1 hover:bg-[#2c3338] text-slate-200 hover:text-white rounded text-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-medium">Novo</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
          <div className="absolute left-0 top-full mt-0 w-48 bg-[#1d2327] border border-[#2c3338] shadow-2xl py-1 hidden group-hover:block z-50 rounded-b">
            <button
              type="button"
              onClick={createNewPost}
              className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-blue-600 hover:text-white flex items-center gap-2"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Post / Artigo</span>
            </button>
            <button
              type="button"
              onClick={createNewPage}
              className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-blue-600 hover:text-white flex items-center gap-2"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Página Dinâmica</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveView('media')}
              className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-blue-600 hover:text-white flex items-center gap-2"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Arquivo de Mídia</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveView('reusable-blocks')}
              className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-blue-600 hover:text-white flex items-center gap-2"
            >
              <BookmarkCheck className="w-3.5 h-3.5" />
              <span>Bloco Reutilizável</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveView('users')}
              className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-blue-600 hover:text-white flex items-center gap-2"
            >
              <User className="w-3.5 h-3.5" />
              <span>Novo Usuário</span>
            </button>
          </div>
        </div>

        {/* Comments counter button */}
        <button
          type="button"
          onClick={() => setActiveView('comments')}
          className="flex items-center gap-1.5 px-2 py-1 hover:bg-[#2c3338] text-slate-300 hover:text-white rounded text-xs transition-colors"
          title="Gerenciar Comentários"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          {pendingCommentsCount > 0 ? (
            <span className="bg-amber-500 text-slate-950 font-extrabold text-[10px] px-1.5 py-0.2 rounded-full">
              {pendingCommentsCount}
            </span>
          ) : (
            <span className="text-[11px] text-slate-400">0</span>
          )}
        </button>

        {/* Setup Wizard Button (WordPress Style) */}
        <button
          type="button"
          onClick={() => setIsWizardOpen(true)}
          className="flex items-center gap-1.5 px-2 py-1 bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 hover:text-white rounded text-xs font-bold transition-colors border border-purple-500/30 shadow-2xs"
          title="Assistente de Instalação e Configuração Rápida"
        >
          <Wand2 className="w-3.5 h-3.5 text-amber-300" />
          <span className="hidden sm:inline">Assistente (Wizard)</span>
        </button>

        {/* AI Model Status Badge */}
        <div className="hidden lg:flex items-center gap-1 px-2 py-1 bg-[#2c3338]/80 text-orange-300 rounded text-[11px] font-medium border border-orange-500/20">
          <Sparkles className="w-3 h-3 text-orange-400" />
          <span>Groq Llama 3.3 Ativo</span>
        </div>
      </div>

      {/* Right side items */}
      <div className="flex items-center space-x-2">
        {/* Switch View button if not on public site */}
        {activeView !== 'public-site' ? (
          <button
            type="button"
            onClick={() => handleOpenSite('home')}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-bold transition-colors"
          >
            <Globe className="w-3 h-3" />
            <span>Ver Site</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setActiveView('dashboard')}
            className="flex items-center gap-1 px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded text-xs font-bold transition-colors"
          >
            <LayoutDashboard className="w-3 h-3" />
            <span>Voltar ao Painel Admin</span>
          </button>
        )}

        {/* User Account / Profile Dropdown */}
        <div className="relative group">
          <button
            type="button"
            className="flex items-center gap-2 px-2 py-1 hover:bg-[#2c3338] text-slate-200 hover:text-white rounded text-xs transition-colors"
          >
            <span className="hidden sm:inline text-slate-300">
              Olá, <strong className="text-white">{currentUser.name}</strong>
            </span>
            <img
              src={currentUser.avatar || currentUser.avatarUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'}
              alt={currentUser.name}
              className="w-5 h-5 rounded-full object-cover border border-slate-600"
            />
          </button>
          <div className="absolute right-0 top-full mt-0 w-52 bg-[#1d2327] border border-[#2c3338] shadow-2xl py-2 hidden group-hover:block z-50 rounded-b">
            <div className="px-3 py-1.5 border-b border-[#2c3338] mb-1">
              <p className="font-bold text-xs text-white truncate">{currentUser.name}</p>
              <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
              <span className="inline-flex items-center gap-1 text-[10px] text-blue-400 font-bold uppercase mt-1">
                <Shield className="w-3 h-3" />
                {currentUser.role}
              </span>
            </div>

            <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Alternar Papel (RBAC):
            </div>
            {(['admin', 'editor', 'visitor'] as const).map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => switchUserRole(role)}
                className={`w-full text-left px-3 py-1 text-xs capitalize flex items-center justify-between transition-colors ${
                  currentUser.role === role
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-300 hover:bg-[#2c3338]'
                }`}
              >
                <span>{role === 'visitor' ? 'Visitante' : role}</span>
                {currentUser.role === role && <span className="text-[10px] font-mono">✓ Ativo</span>}
              </button>
            ))}

            <div className="border-t border-[#2c3338] my-1.5" />
            <button
              type="button"
              onClick={() => setActiveView('users')}
              className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-blue-600 hover:text-white flex items-center gap-2"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Editar Meu Perfil</span>
            </button>

            <button
              type="button"
              onClick={logout}
              className="w-full text-left px-3 py-1.5 text-xs text-rose-300 hover:bg-rose-600 hover:text-white flex items-center gap-2 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair (Encerrar Sessão)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Setup Wizard Modal (WordPress 5-Min Installer) */}
      <SetupWizardModal isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} />
    </header>
  );
}
