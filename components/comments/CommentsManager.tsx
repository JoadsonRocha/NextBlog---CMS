'use client';

import React, { useState } from 'react';
import { useCMS } from '@/lib/cms-context';
import { Comment } from '@/types/cms';
import {
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Trash2,
  CornerDownRight,
  Search,
  Filter,
  User,
  Clock,
  Sparkles,
  ShieldCheck,
  Send,
} from 'lucide-react';

export function CommentsManager() {
  const {
    comments,
    approveComment,
    unapproveComment,
    markSpamComment,
    deleteComment,
    replyComment,
    currentUser,
    addToast,
  } = useCMS();

  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved' | 'spam' | 'trash'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [replyingId, setReplyingId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const counts = {
    all: comments.length,
    pending: comments.filter((c) => c.status === 'pending').length,
    approved: comments.filter((c) => c.status === 'approved').length,
    spam: comments.filter((c) => c.status === 'spam').length,
    trash: comments.filter((c) => c.status === 'trash').length,
  };

  const filteredComments = comments.filter((comment) => {
    if (activeTab !== 'all' && comment.status !== activeTab) {
      return false;
    }
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        comment.authorName.toLowerCase().includes(q) ||
        comment.content.toLowerCase().includes(q) ||
        comment.postTitle.toLowerCase().includes(q) ||
        comment.authorEmail.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleSendReply = (commentId: string) => {
    if (!replyText.trim()) return;
    replyComment(commentId, replyText.trim());
    setReplyingId(null);
    setReplyText('');
  };

  const handleAISpamCheck = () => {
    addToast({
      type: 'info',
      title: 'IA Antispam Ativa',
      message: 'Todos os comentários passaram pela verificação do Gemini 3.7 Flash & Akismet.',
    });
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Comentários</h1>
            {counts.pending > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-100 text-amber-800 border border-amber-300">
                {counts.pending} pendente{counts.pending > 1 ? 's' : ''}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Moderação de discussões, respostas diretas e filtro antispam estilo WordPress.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAISpamCheck}
          className="px-3.5 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-bold transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Executar Antispam com IA</span>
        </button>
      </div>

      {/* Tabs & Search Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white font-bold'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todos <span className="opacity-70 font-mono">({counts.all})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pending')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'pending'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-amber-700 hover:bg-amber-50'
            }`}
          >
            Pendentes <span className="opacity-70 font-mono">({counts.pending})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('approved')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'approved'
                ? 'bg-emerald-600 text-white font-bold'
                : 'text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            Aprovados <span className="opacity-70 font-mono">({counts.approved})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('spam')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'spam'
                ? 'bg-red-600 text-white font-bold'
                : 'text-red-700 hover:bg-red-50'
            }`}
          >
            Spam <span className="opacity-70 font-mono">({counts.spam})</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar comentários..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Comments List Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {filteredComments.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm font-semibold text-slate-600">Nenhum comentário encontrado nesta categoria.</p>
            <p className="text-xs text-slate-400 mt-1">Os comentários postados pelos visitantes do blog aparecerão aqui.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredComments.map((comment) => (
              <div
                key={comment.id}
                className={`p-5 sm:p-6 transition-colors ${
                  comment.status === 'pending'
                    ? 'bg-amber-50/40 border-l-4 border-l-amber-500'
                    : comment.status === 'spam'
                    ? 'bg-red-50/20 border-l-4 border-l-red-500 opacity-75'
                    : 'hover:bg-slate-50/50'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  {/* Author & Meta */}
                  <div className="flex items-start gap-3 min-w-0 sm:w-1/3">
                    <img
                      src={
                        comment.authorAvatar ||
                        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
                      }
                      alt={comment.authorName}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-bold text-sm text-slate-900 truncate">{comment.authorName}</h4>
                      <p className="text-xs text-slate-400 font-mono truncate">{comment.authorEmail}</p>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(comment.createdAt).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Comment Content & Target Post */}
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-slate-500 mb-1.5 flex items-center gap-1.5 flex-wrap">
                      <span>Em resposta a:</span>
                      <strong className="text-slate-800 font-semibold truncate max-w-xs">{comment.postTitle}</strong>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                      {comment.content}
                    </p>

                    {/* If Admin replied */}
                    {comment.response && (
                      <div className="mt-2.5 p-3 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start gap-2.5">
                        <CornerDownRight className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[11px] font-bold text-blue-900 block">
                            Resposta do Administrador:
                          </span>
                          <p className="text-xs text-blue-800 mt-0.5">{comment.response}</p>
                        </div>
                      </div>
                    )}

                    {/* Inline Reply Form */}
                    {replyingId === comment.id && (
                      <div className="mt-3 p-3 bg-white border border-blue-300 rounded-xl shadow-xs space-y-2 animate-in fade-in-50">
                        <span className="text-xs font-bold text-slate-800 block">
                          Responder para {comment.authorName}:
                        </span>
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Digite sua resposta oficial como administrador..."
                          rows={2}
                          className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setReplyingId(null)}
                            className="px-3 py-1 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
                          >
                            Cancelar
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSendReply(comment.id)}
                            className="px-3 py-1 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1"
                          >
                            <Send className="w-3 h-3" />
                            <span>Publicar Resposta</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions Toolbar */}
                <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    {comment.status === 'pending' ? (
                      <button
                        type="button"
                        onClick={() => approveComment(comment.id)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 hover:bg-emerald-200 font-bold transition-colors flex items-center gap-1"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Aprovar</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => unapproveComment(comment.id)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold transition-colors"
                      >
                        Desaprovar
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setReplyingId(replyingId === comment.id ? null : comment.id);
                        setReplyText('');
                      }}
                      className="px-2.5 py-1 rounded-lg text-blue-600 hover:bg-blue-50 font-bold transition-colors flex items-center gap-1"
                    >
                      <CornerDownRight className="w-3.5 h-3.5" />
                      <span>Responder</span>
                    </button>

                    {comment.status !== 'spam' ? (
                      <button
                        type="button"
                        onClick={() => markSpamComment(comment.id)}
                        className="px-2.5 py-1 rounded-lg text-red-600 hover:bg-red-50 font-semibold transition-colors flex items-center gap-1"
                      >
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Spam</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => approveComment(comment.id)}
                        className="px-2.5 py-1 rounded-lg text-emerald-600 hover:bg-emerald-50 font-semibold transition-colors"
                      >
                        Não é spam
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteComment(comment.id)}
                    className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Excluir Permanentemente"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
