'use client';

import React, { useState, useEffect, useRef } from 'react';
import { BlockType } from '@/types/cms';
import {
  Type,
  AlignLeft,
  Info,
  Quote,
  Code2,
  Code,
  ImageIcon,
  Images,
  Video,
  Headphones,
  Link,
  Sparkles,
  Layers,
  GitCommit,
  Columns as ColumnsIcon,
  Minus,
  MoveVertical,
  BarChart2,
  Megaphone,
  Mail,
  CreditCard,
  MessageSquareQuote,
  HelpCircle,
  BarChart3,
  MousePointerClick,
  Table as TableIcon,
  Search,
  CornerDownLeft,
} from 'lucide-react';

interface SlashCommandItem {
  type: BlockType;
  title: string;
  description: string;
  icon: React.ElementType;
  category: 'Texto' | 'Mídia' | 'Layout' | 'Interativo' | 'Marketing';
  shortcut?: string;
}

const COMMAND_ITEMS: SlashCommandItem[] = [
  { type: 'heading', title: 'Título / Cabeçalho', description: 'Títulos H1 a H6 para hierarquia', icon: Type, category: 'Texto', shortcut: '# ' },
  { type: 'paragraph', title: 'Parágrafo', description: 'Texto corrido estruturado', icon: AlignLeft, category: 'Texto', shortcut: 'p ' },
  { type: 'callout', title: 'Destaque (Callout)', description: 'Aviso ou dica com ícone e cor', icon: Info, category: 'Texto', shortcut: '/callout' },
  { type: 'quote', title: 'Citação', description: 'Destaque depoimentos ou citações', icon: Quote, category: 'Texto', shortcut: '> ' },
  { type: 'code', title: 'Bloco de Código', description: 'Código com syntax highlight e cópia', icon: Code2, category: 'Texto', shortcut: '```' },
  { type: 'custom_html', title: 'HTML Custom', description: 'Código HTML / JSX direto', icon: Code, category: 'Texto' },

  { type: 'image', title: 'Imagem Única', description: 'Foto com legenda e alt text', icon: ImageIcon, category: 'Mídia', shortcut: '/img' },
  { type: 'gallery', title: 'Galeria', description: 'Grade responsiva de fotos', icon: Images, category: 'Mídia' },
  { type: 'video', title: 'Vídeo (YouTube/Vimeo)', description: 'Player responsivo de vídeo', icon: Video, category: 'Mídia' },
  { type: 'audio', title: 'Áudio / Podcast', description: 'Player de áudio com ondas sonoras', icon: Headphones, category: 'Mídia' },
  { type: 'embed', title: 'Embed (Spotify/Figma)', description: 'Incorporação inteligente externa', icon: Link, category: 'Mídia' },

  { type: 'hero', title: 'Banner Hero', description: 'Seção de destaque inicial com CTA', icon: Sparkles, category: 'Layout' },
  { type: 'tabs', title: 'Abas Interativas', description: 'Navegação por abas compactas', icon: Layers, category: 'Layout' },
  { type: 'timeline', title: 'Linha do Tempo', description: 'Roadmap sequencial com marcos', icon: GitCommit, category: 'Layout' },
  { type: 'columns', title: 'Colunas', description: 'Grade de recursos em colunas', icon: ColumnsIcon, category: 'Layout' },
  { type: 'divider', title: 'Divisor', description: 'Linha sutil de separação', icon: Minus, category: 'Layout', shortcut: '---' },
  { type: 'spacer', title: 'Espaçador', description: 'Espaço em branco configurável', icon: MoveVertical, category: 'Layout' },

  { type: 'poll', title: 'Enquete / Votação', description: 'Quiz interativo com contagem em tempo real', icon: BarChart2, category: 'Interativo' },
  { type: 'cta_banner', title: 'Banner de CTA', description: 'Chamada para conversão de alto impacto', icon: Megaphone, category: 'Marketing' },
  { type: 'newsletter', title: 'Newsletter', description: 'Captura de leads com validação', icon: Mail, category: 'Marketing' },
  { type: 'pricing', title: 'Tabela de Preços', description: 'Planos SaaS com destaques', icon: CreditCard, category: 'Marketing' },
  { type: 'testimonials', title: 'Depoimentos', description: 'Cards de avaliações com estrelas', icon: MessageSquareQuote, category: 'Marketing' },
  { type: 'faq', title: 'FAQ Acordeão', description: 'Perguntas e respostas expansíveis', icon: HelpCircle, category: 'Marketing' },
  { type: 'stats', title: 'Estatísticas', description: 'Métricas e números de destaque', icon: BarChart3, category: 'Marketing' },
];

interface SlashCommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBlock: (type: BlockType) => void;
  position?: { top: number; left: number };
}

export function SlashCommandMenu({ isOpen, onClose, onSelectBlock, position }: SlashCommandMenuProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filteredItems = COMMAND_ITEMS.filter((item) => {
    const q = query.toLowerCase().replace('/', '').trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + (filteredItems.length || 1)) % (filteredItems.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        onSelectBlock(filteredItems[selectedIndex].type);
        onClose();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-2xs animate-fade-in">
      <div
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search header with Notion-like styling */}
        <div className="p-3.5 border-b border-slate-100 bg-slate-50/70 flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center text-xs font-black shrink-0">
            /
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite para filtrar blocos (ex: callout, tabs, poll)..."
            className="flex-1 bg-transparent border-none text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-hidden"
          />
          <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono">
            <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-600">↑↓</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-600 flex items-center gap-0.5">
              <CornerDownLeft className="w-2.5 h-2.5" /> Enter
            </span>
          </div>
        </div>

        {/* Filtered list */}
        <div ref={listRef} className="p-2 overflow-y-auto flex-1 divide-y divide-slate-50 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              Nenhum bloco encontrado para "{query}".
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              const Icon = item.icon;

              return (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => {
                    onSelectBlock(item.type);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full p-2.5 rounded-xl text-left flex items-center gap-3 transition-colors ${
                    isSelected
                      ? 'bg-blue-50/80 text-blue-900 border border-blue-200/80'
                      : 'hover:bg-slate-50 text-slate-700 border border-transparent'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg shrink-0 ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900">{item.title}</span>
                      <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{item.description}</p>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-2.5 bg-slate-50/90 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Pressione <strong className="text-slate-600">Esc</strong> para fechar</span>
          <span>{filteredItems.length} blocos disponíveis</span>
        </div>
      </div>
    </div>
  );
}
