'use client';

import React, { useState } from 'react';
import { useCMS } from '@/lib/cms-context';
import { BlockType } from '@/types/cms';
import {
  Type,
  AlignLeft,
  Quote,
  Image as ImageIcon,
  Images,
  Video,
  MousePointerClick,
  Columns as ColumnsIcon,
  Code2,
  Table as TableIcon,
  CreditCard,
  MessageSquareQuote,
  HelpCircle,
  Megaphone,
  Mail,
  BarChart3,
  Minus,
  MoveVertical,
  Code,
  Sparkles,
  Search,
  X,
  BookmarkCheck,
  Plus,
} from 'lucide-react';

interface BlockCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  insertIndex?: number;
}

interface BlockDefinition {
  type: BlockType;
  title: string;
  description: string;
  icon: React.ElementType;
  category: 'text' | 'media' | 'layout' | 'marketing' | 'interactive';
  badge?: string;
}

const BLOCK_DEFINITIONS: BlockDefinition[] = [
  // Texto
  { type: 'heading', title: 'Título / Cabeçalho', description: 'Títulos H1 a H6 para estruturação semântica', icon: Type, category: 'text' },
  { type: 'paragraph', title: 'Parágrafo de Texto', description: 'Texto corrido com suporte a formatação rica', icon: AlignLeft, category: 'text' },
  { type: 'quote', title: 'Citação / Depoimento', description: 'Destaque citações com autor e cargo', icon: Quote, category: 'text' },
  { type: 'code', title: 'Bloco de Código', description: 'Trechos de código com botão de cópia rápida', icon: Code2, category: 'text' },
  { type: 'custom_html', title: 'HTML / Componente Custom', description: 'Insira código HTML ou JSX personalizado', icon: Code, category: 'text', badge: 'Pro' },

  // Mídia
  { type: 'image', title: 'Imagem Única', description: 'Foto com legenda, alt text e bordas arredondadas', icon: ImageIcon, category: 'media' },
  { type: 'gallery', title: 'Galeria de Imagens', description: 'Grade responsiva com 2 a 4 colunas de fotos', icon: Images, category: 'media' },
  { type: 'video', title: 'Player de Vídeo', description: 'Embed responsivo de YouTube, Vimeo ou MP4', icon: Video, category: 'media' },

  // Layout
  { type: 'hero', title: 'Seção Hero Principal', description: 'Banner de impacto com título, subtítulo e botões', icon: Sparkles, category: 'layout', badge: 'Destaque' },
  { type: 'columns', title: 'Colunas de Recursos', description: 'Grade de 2 a 4 colunas com ícones e textos', icon: ColumnsIcon, category: 'layout' },
  { type: 'divider', title: 'Divisor de Linha', description: 'Linha sutil para separar seções', icon: Minus, category: 'layout' },
  { type: 'spacer', title: 'Espaçador Flexível', description: 'Espaço em branco com altura customizável', icon: MoveVertical, category: 'layout' },

  // Marketing & Conversão
  { type: 'cta_banner', title: 'Banner de Conversão (CTA)', description: 'Chamada para ação de alto impacto com botões', icon: Megaphone, category: 'marketing', badge: 'Alta Conversão' },
  { type: 'newsletter', title: 'Formulário de Newsletter', description: 'Captura de e-mails com validação interativa', icon: Mail, category: 'marketing' },
  { type: 'pricing', title: 'Tabela de Preços', description: 'Grade de planos SaaS com destaques e recursos', icon: CreditCard, category: 'marketing' },
  { type: 'testimonials', title: 'Cards de Depoimentos', description: 'Avaliações de clientes com estrelas e fotos', icon: MessageSquareQuote, category: 'marketing' },
  { type: 'faq', title: 'Acordeão de FAQ', description: 'Perguntas frequentes expansíveis interativas', icon: HelpCircle, category: 'marketing' },
  { type: 'stats', title: 'Métricas e Estatísticas', description: 'Contadores e números de impacto com legendas', icon: BarChart3, category: 'marketing' },
  { type: 'button', title: 'Botão de Ação', description: 'Botão isolado com link interno ou externo', icon: MousePointerClick, category: 'marketing' },
  { type: 'table', title: 'Tabela de Dados', description: 'Tabela comparativa ou informativa estruturada', icon: TableIcon, category: 'interactive' },
];

export function BlockCatalogModal({ isOpen, onClose, insertIndex }: BlockCatalogModalProps) {
  const { addBlock, reusableBlocks, insertReusableBlock } = useCMS();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'text' | 'media' | 'layout' | 'marketing' | 'reusable'>('all');

  if (!isOpen) return null;

  const filteredBlocks = BLOCK_DEFINITIONS.filter((b) => {
    const matchesSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase()) || b.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'all' || b.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const filteredReusable = reusableBlocks.filter((r) => {
    return r.title.toLowerCase().includes(searchTerm.toLowerCase()) || r.description.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSelectBlock = (type: BlockType) => {
    addBlock(type, insertIndex);
    onClose();
  };

  const handleSelectReusable = (id: string) => {
    insertReusableBlock(id, insertIndex);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-600" />
              Adicionar Bloco de Conteúdo
            </h2>
            <p className="text-xs text-slate-500">Escolha um bloco estruturado ou selecione da sua biblioteca reutilizável</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Tabs */}
        <div className="p-4 border-b border-slate-200 space-y-3 bg-white">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar blocos (ex: pricing, hero, cta, faq, imagem, código)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
                selectedCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              Todos os Blocos ({BLOCK_DEFINITIONS.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('layout')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
                selectedCategory === 'layout' ? 'bg-blue-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              Layout & Hero
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('text')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
                selectedCategory === 'text' ? 'bg-blue-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              Texto & Tipografia
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('media')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
                selectedCategory === 'media' ? 'bg-blue-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              Mídia & Vídeo
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('marketing')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
                selectedCategory === 'marketing' ? 'bg-blue-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              Marketing & Conversão
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('reusable')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 flex items-center gap-1.5 ${
                selectedCategory === 'reusable' ? 'bg-amber-600 text-white' : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200'
              }`}
            >
              <BookmarkCheck className="w-3.5 h-3.5" />
              Reutilizáveis ({reusableBlocks.length})
            </button>
          </div>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50/50">
          {selectedCategory === 'reusable' || (selectedCategory === 'all' && filteredReusable.length > 0 && searchTerm) ? (
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-3 flex items-center gap-1.5">
                <BookmarkCheck className="w-4 h-4 text-amber-600" />
                Seus Blocos Reutilizáveis Salvos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredReusable.map((r) => (
                  <div
                    key={r.id}
                    onClick={() => handleSelectReusable(r.id)}
                    className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 hover:bg-amber-100/70 hover:border-amber-400 cursor-pointer transition-all flex items-start justify-between gap-3 shadow-xs"
                  >
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 mb-1">{r.title}</h4>
                      <p className="text-xs text-slate-600 line-clamp-2">{r.description}</p>
                      <span className="inline-block mt-2 text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                        {r.category} • Usado {r.usageCount}x
                      </span>
                    </div>
                    <span className="shrink-0 p-2 rounded-lg bg-white border border-amber-200 text-amber-700">
                      <Plus className="w-4 h-4" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {selectedCategory !== 'reusable' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {filteredBlocks.map((b) => {
                const Icon = b.icon;
                return (
                  <button
                    key={b.type}
                    type="button"
                    onClick={() => handleSelectBlock(b.type)}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-500 hover:shadow-md transition-all text-left group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                        {b.badge && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                            {b.badge}
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {b.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                        {b.description}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Inserir Bloco</span>
                      <Plus className="w-3.5 h-3.5" />
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {filteredBlocks.length === 0 && selectedCategory !== 'reusable' && (
            <div className="text-center py-12 text-slate-500">
              <Search className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="font-medium text-sm">Nenhum bloco encontrado para &quot;{searchTerm}&quot;</p>
              <p className="text-xs text-slate-400 mt-1">Tente pesquisar por outro termo ou selecione uma categoria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
