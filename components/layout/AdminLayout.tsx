'use client';

import React, { useState } from 'react';
import { useCMS } from '@/lib/cms-context';
import { AdminView } from '@/types/cms';
import { WPAdminBar } from '@/components/layout/WPAdminBar';
import {
  LayoutDashboard,
  FileText,
  Layers,
  BookmarkCheck,
  Image as ImageIcon,
  MessageSquare,
  Paintbrush,
  Puzzle,
  Users,
  Wrench,
  Settings,
  Zap,
  Database,
  Rocket,
  Globe,
  Plus,
  Menu,
  X,
  Shield,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  Info,
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const {
    activeView,
    setActiveView,
    currentUser,
    switchUserRole,
    settings,
    comments,
    toasts,
    removeToast,
    createNewPost,
    createNewPage,
    setPublicRoute,
  } = useCMS();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const pendingCommentsCount = comments.filter((c) => c.status === 'pending').length;

  const navItems: {
    view: AdminView;
    label: string;
    icon: React.ElementType;
    badge?: string | number;
    badgeColor?: string;
  }[] = [
    { view: 'dashboard', label: 'Painel', icon: LayoutDashboard },
    { view: 'posts', label: 'Posts & Blog', icon: FileText },
    { view: 'media', label: 'Mídia', icon: ImageIcon },
    { view: 'pages', label: 'Páginas', icon: Layers },
    {
      view: 'comments',
      label: 'Comentários',
      icon: MessageSquare,
      badge: pendingCommentsCount > 0 ? pendingCommentsCount : undefined,
      badgeColor: 'bg-amber-500 text-slate-950',
    },
    { view: 'reusable-blocks', label: 'Blocos & Modelos', icon: BookmarkCheck },
    { view: 'appearance', label: 'Aparência & Temas', icon: Paintbrush },
    { view: 'plugins', label: 'Plugins & Extensões', icon: Puzzle },
    { view: 'users', label: 'Usuários', icon: Users },
    { view: 'tools', label: 'Ferramentas & Saúde', icon: Wrench },
    { view: 'settings', label: 'Configurações', icon: Settings },
    { view: 'api-explorer', label: 'APIs REST & GraphQL', icon: Zap, badge: 'API' },
    { view: 'database', label: 'Banco de Dados', icon: Database },
    { view: 'deploy', label: 'Deploy & Produção', icon: Rocket },
  ];

  const handleNavClick = (view: AdminView) => {
    setActiveView(view);
    setMobileMenuOpen(false);
  };

  const handleOpenPublicSite = () => {
    setPublicRoute({ type: 'page', slug: 'home' });
    setActiveView('public-site');
  };

  return (
    <div className="flex flex-col h-screen bg-[#f0f0f1] overflow-hidden font-sans select-none">
      {/* WordPress Admin Top Bar */}
      <WPAdminBar />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Drawer Overlay */}
        {mobileMenuOpen && (
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs md:hidden"
          />
        )}

        {/* Left Sidebar WordPress Dark Styled */}
        <aside
          className={`fixed md:static inset-y-0 left-0 z-40 w-56 bg-[#1d2327] text-[#c3c4c7] flex flex-col justify-between border-r border-[#2c3338] transition-transform duration-300 ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          {/* Navigation Menu */}
          <div className="flex-1 overflow-y-auto py-2">
            <div className="px-3 py-2 flex items-center justify-between md:hidden border-b border-[#2c3338] mb-2">
              <span className="font-bold text-white text-xs">Navegação WordPress</span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <nav className="space-y-0.5 px-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.view;
                return (
                  <button
                    key={item.view}
                    type="button"
                    onClick={() => handleNavClick(item.view)}
                    className={`w-full px-3 py-2 rounded-md text-xs font-semibold flex items-center justify-between transition-colors ${
                      isActive
                        ? 'bg-[#2271b1] text-white shadow-xs'
                        : 'text-[#c3c4c7] hover:bg-[#2c3338] hover:text-[#72aee6]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#a7aaad]'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full font-mono ${
                          item.badgeColor || 'bg-blue-500/40 text-blue-200'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer User info */}
          <div className="p-3 border-t border-[#2c3338] bg-[#1d2327]">
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="w-full p-1.5 rounded-md hover:bg-[#2c3338] transition-colors flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <img
                    src={currentUser.avatar || currentUser.avatarUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover border border-[#2c3338] shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-xs text-white truncate">{currentUser.name}</p>
                    <span className="text-[10px] text-blue-400 font-semibold uppercase flex items-center gap-1">
                      <Shield className="w-2.5 h-2.5" />
                      {currentUser.role}
                    </span>
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              </button>

              {userDropdownOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-2 p-2 bg-[#2c3338] rounded-xl border border-slate-700 shadow-2xl z-50 space-y-1 text-xs">
                  <span className="text-[10px] font-bold text-slate-400 px-2 block mb-1 uppercase">
                    Alternar Papel
                  </span>
                  {(['admin', 'editor', 'visitor'] as const).map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => {
                        switchUserRole(role);
                        setUserDropdownOpen(false);
                      }}
                      className={`w-full px-2.5 py-1.5 rounded-lg text-left font-semibold capitalize transition-colors ${
                        currentUser.role === role
                          ? 'bg-[#2271b1] text-white'
                          : 'text-slate-300 hover:bg-[#1d2327]'
                      }`}
                    >
                      {role === 'visitor' ? 'Visitante' : role}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main App Content Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50">
          {/* Top action header for mobile / responsive */}
          {activeView !== 'editor' && (
            <div className="h-12 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between shrink-0 md:hidden">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <span className="text-xs font-bold text-slate-900 capitalize">
                  {navItems.find((i) => i.view === activeView)?.label || activeView}
                </span>
              </div>
            </div>
          )}

          {/* View Component Outlet */}
          <main className="flex-1 overflow-y-auto select-text">{children}</main>
        </div>
      </div>

      {/* Global Toast Notifications Renderer */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            onClick={() => removeToast(toast.id)}
            className={`p-4 rounded-xl shadow-lg border text-xs pointer-events-auto flex items-start gap-3 transition-all animate-in slide-in-from-bottom-2 ${
              toast.type === 'success'
                ? 'bg-emerald-950 text-emerald-100 border-emerald-800'
                : toast.type === 'error'
                ? 'bg-red-950 text-red-100 border-red-800'
                : 'bg-slate-900 text-slate-100 border-slate-800'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            ) : (
              <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <p className="font-bold">{toast.title}</p>
              {toast.message && <p className="text-[11px] opacity-80 mt-0.5">{toast.message}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
