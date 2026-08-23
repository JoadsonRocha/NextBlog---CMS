'use client';

import React, { useState } from 'react';
import { useCMS } from '@/lib/cms-context';
import { User, UserRole } from '@/types/cms';
import {
  Users,
  Shield,
  ShieldCheck,
  UserCheck,
  Plus,
  Trash2,
  Edit2,
  Check,
  CheckCircle2,
  XCircle,
  X,
} from 'lucide-react';

const INITIAL_DEMO_USERS: User[] = [
  {
    id: 'usr_admin',
    name: 'Carlos Oliveira',
    email: 'admin@nextblock.io',
    role: 'admin',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'usr_editor',
    name: 'Juliana Mendes',
    email: 'juliana.editor@nextblock.io',
    role: 'editor',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-02-01T14:30:00Z',
  },
  {
    id: 'usr_visitor',
    name: 'Visitante / Leitor',
    email: 'visitante@nextblock.io',
    role: 'visitor',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-03-01T09:00:00Z',
  },
];

export function UserManager() {
  const { currentUser, switchUserRole, addToast } = useCMS();
  const [usersList, setUsersList] = useState<User[]>(INITIAL_DEMO_USERS);
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('editor');

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail) {
      addToast({ type: 'error', title: 'Preencha todos os campos obrigatórios' });
      return;
    }

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: newName,
      email: newEmail,
      role: newRole,
      avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
      createdAt: new Date().toISOString(),
    };

    setUsersList([...usersList, newUser]);
    setAddUserModalOpen(false);
    setNewName('');
    setNewEmail('');
    addToast({ type: 'success', title: 'Usuário cadastrado com sucesso!' });
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-600" />
            Usuários & Controle de Acesso (RBAC)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Gerencie permissões entre Administrador, Editor e Visitante para publicação e edição.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setAddUserModalOpen(true)}
          disabled={currentUser.role !== 'admin'}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          <span>Convidar Usuário</span>
        </button>
      </div>

      {/* Role Simulator Switcher Banner */}
      <div className="p-6 rounded-2xl bg-linear-to-r from-slate-900 to-indigo-950 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/30 mb-2 inline-block">
            Simulador de Sessão Ativa
          </span>
          <h2 className="text-lg font-bold">Você está autenticado como: {currentUser.name}</h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Alterne o papel do usuário abaixo para testar o comportamento do CMS em tempo real.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-xl border border-white/10">
          {(['admin', 'editor', 'visitor'] as UserRole[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => switchUserRole(r)}
              className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all flex items-center gap-1.5 ${
                currentUser.role === r
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {currentUser.role === r && <Check className="w-3.5 h-3.5" />}
              <span>{r === 'visitor' ? 'Visitante' : r}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs sm:text-sm text-slate-700">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[11px] border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Usuário</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Papel (Role)</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {usersList.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900">{user.name}</h4>
                      <p className="text-[11px] text-slate-400 font-mono">ID: {user.id}</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 font-mono text-xs text-slate-600">{user.email}</td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold capitalize ${
                      user.role === 'admin'
                        ? 'bg-purple-100 text-purple-800'
                        : user.role === 'editor'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    <Shield className="w-3 h-3" />
                    {user.role}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Ativo
                  </span>
                </td>

                <td className="px-6 py-4 text-right">
                  <button
                    type="button"
                    onClick={() => switchUserRole(user.role)}
                    className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                  >
                    Logar como este
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Permissions Matrix */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-600" />
          Matriz de Permissões por Papel
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Recurso / Ação</th>
                <th className="p-3 text-center">Admin</th>
                <th className="p-3 text-center">Editor</th>
                <th className="p-3 text-center">Visitante</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-3 font-medium text-slate-800">Criar & Editar Artigos e Páginas</td>
                <td className="p-3 text-center"><CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                <td className="p-3 text-center"><CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                <td className="p-3 text-center"><XCircle className="w-4 h-4 text-slate-300 mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-slate-800">Publicar Conteúdo em Produção</td>
                <td className="p-3 text-center"><CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                <td className="p-3 text-center"><CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                <td className="p-3 text-center"><XCircle className="w-4 h-4 text-slate-300 mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-slate-800">Gerenciar Usuários & Permissões</td>
                <td className="p-3 text-center"><CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                <td className="p-3 text-center"><XCircle className="w-4 h-4 text-slate-300 mx-auto" /></td>
                <td className="p-3 text-center"><XCircle className="w-4 h-4 text-slate-300 mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-slate-800">Backups de Banco e Deploy</td>
                <td className="p-3 text-center"><CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                <td className="p-3 text-center"><XCircle className="w-4 h-4 text-slate-300 mx-auto" /></td>
                <td className="p-3 text-center"><XCircle className="w-4 h-4 text-slate-300 mx-auto" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {addUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                Convidar Novo Membro
              </h3>
              <button
                type="button"
                onClick={() => setAddUserModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Beatriz Lima"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Endereço de E-mail</label>
                <input
                  type="email"
                  required
                  placeholder="beatriz@empresa.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Papel / Nível de Acesso</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as UserRole)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 bg-white"
                >
                  <option value="editor">Editor (Cria e edita posts/páginas)</option>
                  <option value="admin">Administrador (Controle total)</option>
                  <option value="visitor">Visitante (Apenas visualização)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAddUserModalOpen(false)}
                  className="px-4 py-2 text-slate-600 font-semibold hover:bg-slate-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm"
                >
                  Enviar Convite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
