'use client';

import React, { useState } from 'react';
import { ContentBlock } from '@/types/cms';
import {
  Zap,
  Shield,
  Layers,
  Sparkles,
  Blocks,
  Check,
  Copy,
  ChevronDown,
  ChevronUp,
  Star,
  ArrowRight,
  ExternalLink,
  Play,
  Pause,
  Mail,
  Cpu,
  Globe,
  Award,
  Users,
  Info,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Lightbulb,
  HelpCircle,
  Radio,
  Music,
  Volume2,
  Download,
  Share2,
  Calendar,
  Clock,
  Link2,
  Flame,
  CheckSquare,
  BarChart2,
  Code2,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Zap,
  Shield,
  Layers,
  Sparkles,
  Blocks,
  Cpu,
  Globe,
  Award,
  Users,
  Info,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Lightbulb,
  HelpCircle,
  Radio,
  Music,
  Calendar,
  Clock,
  Flame,
};

interface BlockRendererProps {
  block: ContentBlock;
  isEditing?: boolean;
  onUpdateContent?: (newContent: any) => void;
}

export function BlockRenderer({ block, isEditing = false, onUpdateContent }: BlockRendererProps) {
  const { type, content, styles } = block;

  const styleClasses = [
    styles?.textAlign === 'center' ? 'text-center' : styles?.textAlign === 'right' ? 'text-right' : 'text-left',
    styles?.paddingY === 'large' ? 'py-12' : styles?.paddingY === 'small' ? 'py-2' : styles?.paddingY === 'none' ? 'py-0' : 'py-6',
    styles?.maxWidth === 'narrow' ? 'max-w-xl mx-auto' : styles?.maxWidth === 'medium' ? 'max-w-3xl mx-auto' : styles?.maxWidth === 'wide' ? 'max-w-5xl mx-auto' : 'w-full',
    styles?.borderRadius === 'lg' ? 'rounded-2xl' : styles?.borderRadius === 'md' ? 'rounded-xl' : styles?.borderRadius === 'sm' ? 'rounded-md' : styles?.borderRadius === 'full' ? 'rounded-full' : '',
    styles?.border ? 'border border-slate-200' : '',
  ].filter(Boolean).join(' ');

  const containerStyle = {
    backgroundColor: styles?.backgroundColor || undefined,
    color: styles?.textColor || undefined,
  };

  switch (type) {
    case 'hero': {
      return (
        <div className={`relative overflow-hidden ${styleClasses}`} style={containerStyle}>
          <div className="max-w-4xl mx-auto px-4 py-8">
            {content.badge && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{content.badge}</span>
              </div>
            )}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight mb-4">
              {content.title || 'Título Hero'}
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
              {content.subtitle}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {content.primaryCtaText && (
                <a
                  href={content.primaryCtaUrl || '#'}
                  className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors shadow-sm inline-flex items-center gap-2"
                >
                  {content.primaryCtaText}
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}
              {content.secondaryCtaText && (
                <a
                  href={content.secondaryCtaUrl || '#'}
                  className="px-6 py-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors"
                >
                  {content.secondaryCtaText}
                </a>
              )}
            </div>
            {content.imageUrl && (
              <div className="mt-8 relative rounded-xl overflow-hidden shadow-lg border border-slate-200">
                <img
                  src={content.imageUrl}
                  alt={content.imageAlt || 'Hero visual'}
                  className="w-full max-h-96 object-cover"
                />
              </div>
            )}
          </div>
        </div>
      );
    }

    case 'heading': {
      const level = Math.min(Math.max(content.level || 2, 1), 6);
      const HeadingTag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
      const sizeClass =
        level === 1
          ? 'text-3xl sm:text-4xl font-extrabold text-slate-900'
          : level === 2
          ? 'text-2xl sm:text-3xl font-bold text-slate-900 mt-4 mb-2'
          : level === 3
          ? 'text-xl sm:text-2xl font-semibold text-slate-800 mt-3 mb-1.5'
          : 'text-lg font-medium text-slate-800';

      return (
        <div className={styleClasses} style={containerStyle}>
          <HeadingTag className={sizeClass}>{content.text || 'Título'}</HeadingTag>
        </div>
      );
    }

    case 'paragraph': {
      return (
        <div className={styleClasses} style={containerStyle}>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed whitespace-pre-line">
            {content.text || 'Parágrafo de texto...'}
          </p>
        </div>
      );
    }

    case 'quote': {
      return (
        <div className={styleClasses} style={containerStyle}>
          <blockquote className="relative p-6 bg-slate-50 border-l-4 border-blue-600 rounded-r-xl">
            <p className="text-lg italic font-serif text-slate-800 mb-3 leading-relaxed">
              &ldquo;{content.quote || 'Citação inspiradora...'}&rdquo;
            </p>
            {(content.author || content.role) && (
              <footer className="text-sm text-slate-600 font-medium flex items-center gap-2">
                <span className="font-semibold text-slate-900">{content.author}</span>
                {content.role && <span className="text-slate-400">• {content.role}</span>}
              </footer>
            )}
          </blockquote>
        </div>
      );
    }

    case 'image': {
      return (
        <div className={styleClasses} style={containerStyle}>
          <figure className="relative">
            <img
              src={content.url || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80'}
              alt={content.altText || 'Imagem'}
              className="w-full h-auto rounded-xl object-cover shadow-sm border border-slate-200 max-h-[500px]"
            />
            {content.caption && (
              <figcaption className="text-xs sm:text-sm text-center text-slate-500 mt-2 italic">
                {content.caption}
              </figcaption>
            )}
          </figure>
        </div>
      );
    }

    case 'gallery': {
      const cols = content.columns || 3;
      const gridClass = cols === 2 ? 'grid-cols-1 sm:grid-cols-2' : cols === 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-1 sm:grid-cols-3';
      const images: Array<{ url: string; caption?: string }> = content.images || [];

      return (
        <div className={styleClasses} style={containerStyle}>
          <div className={`grid gap-4 ${gridClass}`}>
            {images.map((img, i) => (
              <div key={i} className="group relative rounded-lg overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                <img
                  src={img.url}
                  alt={img.caption || `Galeria foto ${i + 1}`}
                  className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {img.caption && (
                  <div className="absolute bottom-0 inset-x-0 bg-slate-900/70 text-white text-xs p-2 backdrop-blur-xs">
                    {img.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    case 'video': {
      return (
        <div className={styleClasses} style={containerStyle}>
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-black">
            <iframe
              src={content.url || 'https://www.youtube.com/embed/dQw4w9WgXcQ'}
              title={content.title || 'Vídeo'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          {content.caption && (
            <p className="text-xs sm:text-sm text-center text-slate-500 mt-2">{content.caption}</p>
          )}
        </div>
      );
    }

    case 'button': {
      const isPrimary = content.variant !== 'outline' && content.variant !== 'secondary';
      const alignClass = content.align === 'center' ? 'text-center' : content.align === 'right' ? 'text-right' : 'text-left';

      return (
        <div className={`${styleClasses} ${alignClass}`} style={containerStyle}>
          <a
            href={content.url || '#'}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-sm ${
              isPrimary
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-300'
            }`}
          >
            <span>{content.text || 'Botão de Ação'}</span>
            <ExternalLink className="w-4 h-4 opacity-75" />
          </a>
        </div>
      );
    }

    case 'columns': {
      const items: Array<{ icon?: string; title: string; text: string }> = content.items || [];
      const cols = content.columnsCount || 3;
      const gridClass = cols === 2 ? 'grid-cols-1 md:grid-cols-2' : cols === 4 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 md:grid-cols-3';

      return (
        <div className={styleClasses} style={containerStyle}>
          {(content.title || content.subtitle) && (
            <div className="text-center max-w-2xl mx-auto mb-8">
              {content.title && <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">{content.title}</h2>}
              {content.subtitle && <p className="text-slate-600">{content.subtitle}</p>}
            </div>
          )}
          <div className={`grid gap-6 ${gridClass}`}>
            {items.map((item, i) => {
              const IconComp = (item.icon && ICON_MAP[item.icon]) ? ICON_MAP[item.icon] : Zap;
              return (
                <div key={i} className="p-6 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    case 'code': {
      return <CodeBlockComponent code={content.code} language={content.language} styleClasses={styleClasses} />;
    }

    case 'table': {
      const headers: string[] = content.headers || [];
      const rows: string[][] = content.rows || [];

      return (
        <div className={styleClasses} style={containerStyle}>
          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full text-left text-sm text-slate-700">
              {headers.length > 0 && (
                <thead className="bg-slate-100 text-slate-900 uppercase font-semibold text-xs border-b border-slate-200">
                  <tr>
                    {headers.map((h, i) => (
                      <th key={i} className="px-4 py-3">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody className="divide-y divide-slate-200 bg-white">
                {rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-3 font-medium">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    case 'pricing': {
      const plans: Array<{
        name: string;
        price: string;
        period: string;
        description: string;
        features: string[];
        buttonText: string;
        isPopular?: boolean;
      }> = content.plans || [];

      return (
        <div className={styleClasses} style={containerStyle}>
          {(content.title || content.subtitle) && (
            <div className="text-center max-w-2xl mx-auto mb-8">
              {content.title && <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">{content.title}</h2>}
              {content.subtitle && <p className="text-slate-600">{content.subtitle}</p>}
            </div>
          )}
          <div className={`grid gap-6 ${plans.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto' : 'grid-cols-1 md:grid-cols-3'}`}>
            {plans.map((p, i) => (
              <div
                key={i}
                className={`relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all ${
                  p.isPopular
                    ? 'border-2 border-blue-600 bg-white shadow-xl scale-102 z-10'
                    : 'border border-slate-200 bg-white shadow-sm hover:shadow-md'
                }`}
              >
                {p.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    Mais Popular
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{p.name}</h3>
                  <p className="text-xs text-slate-500 mb-4">{p.description}</p>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">{p.price}</span>
                    <span className="text-sm font-medium text-slate-500">{p.period || '/mês'}</span>
                  </div>
                  <ul className="space-y-3 mb-6 text-sm text-slate-600">
                    {(p.features || []).map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  type="button"
                  className={`w-full py-2.5 px-4 rounded-lg font-semibold text-sm transition-colors ${
                    p.isPopular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  {p.buttonText || 'Selecionar Plano'}
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case 'testimonials': {
      const items: Array<{ quote: string; author: string; role: string; company?: string; rating?: number }> = content.items || [];
      return (
        <div className={styleClasses} style={containerStyle}>
          {(content.title || content.subtitle) && (
            <div className="text-center max-w-2xl mx-auto mb-8">
              {content.title && <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">{content.title}</h2>}
              {content.subtitle && <p className="text-slate-600">{content.subtitle}</p>}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item, i) => (
              <div key={i} className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center gap-1 mb-3 text-amber-400">
                  {Array.from({ length: item.rating || 5 }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 italic text-sm sm:text-base mb-4 leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{item.author}</p>
                  <p className="text-xs text-slate-500">
                    {item.role} {item.company ? `• ${item.company}` : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case 'faq': {
      const items: Array<{ question: string; answer: string }> = content.items || [];
      return (
        <div className={styleClasses} style={containerStyle}>
          {(content.title || content.subtitle) && (
            <div className="text-center max-w-2xl mx-auto mb-8">
              {content.title && <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">{content.title}</h2>}
              {content.subtitle && <p className="text-slate-600">{content.subtitle}</p>}
            </div>
          )}
          <FaqAccordion items={items} />
        </div>
      );
    }

    case 'cta_banner': {
      const isDark = content.styleVariant === 'dark';
      const isGradient = content.styleVariant === 'gradient' || !content.styleVariant;

      return (
        <div className={styleClasses}>
          <div
            className={`p-8 sm:p-12 rounded-2xl text-center shadow-md ${
              isDark
                ? 'bg-slate-900 text-white'
                : isGradient
                ? 'bg-linear-to-r from-blue-700 via-indigo-700 to-purple-800 text-white'
                : 'bg-blue-50 border border-blue-200 text-slate-900'
            }`}
          >
            {content.tagline && (
              <span className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 ${isDark || isGradient ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-800'}`}>
                {content.tagline}
              </span>
            )}
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-4 tracking-tight">
              {content.title || 'Chamada para Ação'}
            </h2>
            <p className={`text-base sm:text-lg max-w-2xl mx-auto mb-8 ${isDark || isGradient ? 'text-slate-100' : 'text-slate-600'}`}>
              {content.description}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {content.primaryButtonText && (
                <a
                  href={content.primaryButtonUrl || '#'}
                  className={`px-6 py-3 rounded-lg font-bold text-sm shadow-md transition-all ${
                    isDark || isGradient
                      ? 'bg-white text-slate-900 hover:bg-slate-100'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {content.primaryButtonText}
                </a>
              )}
              {content.secondaryButtonText && (
                <a
                  href={content.secondaryButtonUrl || '#'}
                  className={`px-6 py-3 rounded-lg font-bold text-sm transition-all ${
                    isDark || isGradient
                      ? 'bg-white/10 hover:bg-white/20 text-white'
                      : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                  }`}
                >
                  {content.secondaryButtonText}
                </a>
              )}
            </div>
          </div>
        </div>
      );
    }

    case 'newsletter': {
      return <NewsletterBox content={content} styleClasses={styleClasses} />;
    }

    case 'stats': {
      const items: Array<{ label: string; value: string; description?: string }> = content.items || [];
      return (
        <div className={styleClasses} style={containerStyle}>
          <div className={`grid grid-cols-2 md:grid-cols-${Math.min(items.length, 4)} gap-6 text-center`}>
            {items.map((stat, i) => (
              <div key={i} className="p-4">
                <p className="text-3xl sm:text-4xl font-extrabold text-blue-600 mb-1">{stat.value}</p>
                <p className="text-sm font-semibold text-slate-800">{stat.label}</p>
                {stat.description && <p className="text-xs text-slate-500 mt-0.5">{stat.description}</p>}
              </div>
            ))}
          </div>
        </div>
      );
    }

    case 'divider': {
      return (
        <div className="py-6">
          <hr className="border-slate-200" />
        </div>
      );
    }

    case 'spacer': {
      return <div style={{ height: content.height || '40px' }} />;
    }

    case 'custom_html': {
      return (
        <div className={styleClasses} style={containerStyle}>
          <div
            dangerouslySetInnerHTML={{
              __html: content.html || '<p class="text-slate-400 italic">Bloco HTML vazio</p>',
            }}
          />
        </div>
      );
    }

    case 'callout': {
      return <CalloutBox content={content} styleClasses={styleClasses} />;
    }

    case 'timeline': {
      return <TimelineComponent content={content} styleClasses={styleClasses} />;
    }

    case 'tabs': {
      return <TabsComponent content={content} styleClasses={styleClasses} />;
    }

    case 'poll': {
      return <PollComponent content={content} styleClasses={styleClasses} />;
    }

    case 'embed': {
      return <EmbedComponent content={content} styleClasses={styleClasses} />;
    }

    case 'audio': {
      return <AudioPlayerComponent content={content} styleClasses={styleClasses} />;
    }

    default:
      return (
        <div className="p-4 border border-dashed border-slate-300 rounded-lg text-xs text-slate-500">
          Tipo de bloco desconhecido: {type}
        </div>
      );
  }
}

function CodeBlockComponent({ code, language, styleClasses }: { code?: string; language?: string; styleClasses: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={styleClasses}>
      <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 text-slate-200 text-xs sm:text-sm font-mono shadow-md">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-950/80 border-b border-slate-800 text-slate-400 text-xs">
          <span>{language || 'code'}</span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 hover:text-white px-2 py-0.5 rounded transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copiado!' : 'Copiar'}</span>
          </button>
        </div>
        <pre className="p-4 overflow-x-auto leading-relaxed">
          <code>{code || '// Insira seu código aqui'}</code>
        </pre>
      </div>
    </div>
  );
}

function FaqAccordion({ items }: { items: Array<{ question: string; answer: string }> }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      {items.map((item, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div
            key={idx}
            className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs transition-colors"
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full p-4 sm:p-5 text-left font-semibold text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
            >
              <span>{item.question}</span>
              {isOpen ? <ChevronUp className="w-5 h-5 text-slate-500 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
            </button>
            {isOpen && (
              <div className="px-4 pb-5 sm:px-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function NewsletterBox({ content, styleClasses }: { content: any; styleClasses: string }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <div className={styleClasses}>
      <div className="max-w-xl mx-auto p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
        <div className="w-12 h-12 mx-auto rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
          <Mail className="w-6 h-6" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
          {content.title || 'Assine nossa Newsletter'}
        </h3>
        <p className="text-sm text-slate-600 mb-6">{content.description}</p>

        {subscribed ? (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center justify-center gap-2">
            <Check className="w-5 h-5 text-emerald-600" />
            <span>Obrigado! Inscrição confirmada com sucesso.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={content.placeholder || 'Digite seu e-mail...'}
                className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors shrink-0 shadow-sm"
              >
                {content.buttonText || 'Inscrever-se'}
              </button>
            </div>
            {content.privacyNote && (
              <p className="text-xs text-slate-400">{content.privacyNote}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

function CalloutBox({ content, styleClasses }: { content: any; styleClasses: string }) {
  const tone = content.tone || 'info'; // info | warning | success | error | tip | neutral
  const toneStyles: Record<string, { bg: string; border: string; text: string; iconBg: string; iconColor: string; defaultIcon: any }> = {
    info: { bg: 'bg-blue-50/80', border: 'border-blue-200', text: 'text-blue-950', iconBg: 'bg-blue-100', iconColor: 'text-blue-600', defaultIcon: Info },
    warning: { bg: 'bg-amber-50/80', border: 'border-amber-200', text: 'text-amber-950', iconBg: 'bg-amber-100', iconColor: 'text-amber-600', defaultIcon: AlertTriangle },
    success: { bg: 'bg-emerald-50/80', border: 'border-emerald-200', text: 'text-emerald-950', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600', defaultIcon: CheckCircle2 },
    error: { bg: 'bg-rose-50/80', border: 'border-rose-200', text: 'text-rose-950', iconBg: 'bg-rose-100', iconColor: 'text-rose-600', defaultIcon: XCircle },
    tip: { bg: 'bg-purple-50/80', border: 'border-purple-200', text: 'text-purple-950', iconBg: 'bg-purple-100', iconColor: 'text-purple-600', defaultIcon: Lightbulb },
    neutral: { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-900', iconBg: 'bg-slate-200', iconColor: 'text-slate-700', defaultIcon: Info },
  };

  const currentTone = toneStyles[tone] || toneStyles.info;
  const CustomIcon = content.icon && ICON_MAP[content.icon] ? ICON_MAP[content.icon] : currentTone.defaultIcon;

  return (
    <div className={styleClasses}>
      <div className={`p-4 sm:p-5 rounded-xl border ${currentTone.bg} ${currentTone.border} shadow-2xs flex items-start gap-3.5 transition-all`}>
        <div className={`p-2 rounded-lg ${currentTone.iconBg} ${currentTone.iconColor} shrink-0 mt-0.5 shadow-2xs`}>
          <CustomIcon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          {content.title && (
            <h4 className={`font-bold text-sm sm:text-base ${currentTone.text} mb-1 tracking-tight`}>
              {content.title}
            </h4>
          )}
          <div className={`text-xs sm:text-sm leading-relaxed ${currentTone.text} opacity-90`}>
            {content.text || 'Adicione o texto informativo deste destaque notion-style.'}
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelineBlockItem({ item, isLast }: { item: { title: string; date?: string; description?: string; status?: 'done' | 'active' | 'upcoming'; tag?: string }; isLast: boolean }) {
  const status = item.status || 'done';
  const statusConfig = {
    done: { dot: 'bg-emerald-500 text-white ring-4 ring-emerald-100', line: 'bg-emerald-200', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    active: { dot: 'bg-blue-600 text-white ring-4 ring-blue-100 animate-pulse', line: 'bg-blue-200', badge: 'bg-blue-50 text-blue-700 border-blue-200' },
    upcoming: { dot: 'bg-slate-200 text-slate-500 ring-4 ring-slate-100', line: 'bg-slate-200', badge: 'bg-slate-100 text-slate-600 border-slate-200' },
  };

  const conf = statusConfig[status] || statusConfig.done;

  return (
    <div className="relative flex gap-4 sm:gap-6 group">
      {/* Indicator Line & Dot */}
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${conf.dot} z-10 transition-transform group-hover:scale-110`}>
          {status === 'done' ? <Check className="w-4 h-4" /> : status === 'active' ? <Flame className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
        </div>
        {!isLast && <div className={`w-0.5 flex-1 ${conf.line} my-1`} />}
      </div>

      {/* Content Card */}
      <div className="flex-1 pb-8">
        <div className="p-4 sm:p-5 rounded-xl border border-slate-200/80 bg-white hover:border-blue-300 hover:shadow-xs transition-all">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <h4 className="font-bold text-sm sm:text-base text-slate-900">{item.title}</h4>
            <div className="flex items-center gap-2">
              {item.tag && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${conf.badge}`}>
                  {item.tag}
                </span>
              )}
              {item.date && (
                <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {item.date}
                </span>
              )}
            </div>
          </div>
          {item.description && (
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function TimelineComponent({ content, styleClasses }: { content: any; styleClasses: string }) {
  const items: Array<{ title: string; date?: string; description?: string; status?: 'done' | 'active' | 'upcoming'; tag?: string }> =
    content.items || [
      { title: 'Concepção do Projeto', date: 'Jan 2026', description: 'Definição dos requisitos híbridos e arquitetura Next.js 15.', status: 'done', tag: 'Planejamento' },
      { title: 'Editor Visual & GraphQL', date: 'Fev 2026', description: 'Criação dos blocos modulares e camada API-first headless.', status: 'done', tag: 'Core' },
      { title: 'Bancos Reais & SEO Suite', date: 'Mar 2026', description: 'Integração com Prisma/Drizzle e otimização avançada de busca.', status: 'active', tag: 'Em Andamento' },
    ];

  return (
    <div className={styleClasses}>
      {content.title && (
        <div className="text-center mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{content.title}</h3>
          {content.subtitle && <p className="text-sm text-slate-500 mt-1">{content.subtitle}</p>}
        </div>
      )}
      <div className="max-w-2xl mx-auto pt-2">
        {items.map((item, idx) => (
          <TimelineBlockItem key={idx} item={item} isLast={idx === items.length - 1} />
        ))}
      </div>
    </div>
  );
}

function TabsComponent({ content, styleClasses }: { content: any; styleClasses: string }) {
  const tabs: Array<{ id: string; label: string; content: string; icon?: string; badge?: string }> =
    content.tabs || [
      { id: 'tab1', label: 'Visão Geral', content: 'A arquitetura modular permite estender qualquer funcionalidade como blocos React e APIs headless.' },
      { id: 'tab2', label: 'Benefícios Técnicos', content: 'Renderização híbrida (SSG, ISR, SSR), Next.js 15 App Router, React 19 e suporte a PostgreSQL e MongoDB.' },
      { id: 'tab3', label: 'Integrações', content: 'Conecte com Google Gemini, Stripe, Zapier, Webhooks e servidores headless com facilidade.' },
    ];

  const [activeTab, setActiveTab] = useState(tabs[0]?.id || 'tab1');
  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <div className={styleClasses}>
      <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Tab Headers */}
        <div className="flex border-b border-slate-200 overflow-x-auto bg-slate-50/70 p-1.5 gap-1.5 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                  isActive
                    ? 'bg-white text-blue-600 shadow-xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8 min-h-[120px] flex items-center">
          <div className="text-sm text-slate-700 leading-relaxed w-full">
            {currentTab?.content}
          </div>
        </div>
      </div>
    </div>
  );
}

function PollComponent({ content, styleClasses }: { content: any; styleClasses: string }) {
  const initialOptions: Array<{ id: string; text: string; votes: number }> =
    content.options || [
      { id: 'opt1', text: 'Sim, blocos modulares aceleram muito o desenvolvimento', votes: 42 },
      { id: 'opt2', text: 'Prefiro editor Markdown tradicional', votes: 12 },
      { id: 'opt3', text: 'Ambos em formato híbrido são ideais', votes: 78 },
    ];

  const [options, setOptions] = useState(initialOptions);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const totalVotes = options.reduce((acc, curr) => acc + curr.votes, 0);

  const handleVote = (optionId: string) => {
    if (selectedOptionId) return; // voted already
    setSelectedOptionId(optionId);
    setOptions((prev) =>
      prev.map((opt) => (opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt))
    );
  };

  return (
    <div className={styleClasses}>
      <div className="max-w-xl mx-auto p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
            <BarChart2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600">Enquete Interativa</span>
            <h4 className="font-bold text-base sm:text-lg text-slate-900">{content.question || 'Qual recurso você considera mais importante no CMS?'}</h4>
          </div>
        </div>

        <div className="space-y-3">
          {options.map((opt) => {
            const hasVoted = Boolean(selectedOptionId);
            const isSelected = selectedOptionId === opt.id;
            const percentage = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleVote(opt.id)}
                disabled={hasVoted}
                className={`w-full relative overflow-hidden text-left p-3.5 rounded-xl border transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50/40 ring-1 ring-blue-500'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                }`}
              >
                {/* Progress bar background on vote */}
                {hasVoted && (
                  <div
                    className={`absolute inset-y-0 left-0 transition-all duration-500 ${
                      isSelected ? 'bg-blue-100/70' : 'bg-slate-200/50'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                )}

                <div className="relative flex items-center justify-between gap-3 text-xs sm:text-sm">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5" />}
                    </div>
                    <span className="font-medium text-slate-800">{opt.text}</span>
                  </div>

                  {hasVoted && (
                    <span className="font-bold text-slate-700 shrink-0">{percentage}%</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100">
          <span>{totalVotes} votos registrados</span>
          {selectedOptionId ? (
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Voto computado
            </span>
          ) : (
            <span>Clique para votar</span>
          )}
        </div>
      </div>
    </div>
  );
}

function EmbedComponent({ content, styleClasses }: { content: any; styleClasses: string }) {
  const provider = content.provider || 'youtube'; // youtube, spotify, codepen, figma, custom
  const url = content.url || '';

  const getEmbedIframe = () => {
    if (!url) {
      return (
        <div className="p-8 text-center bg-slate-100 rounded-xl text-xs text-slate-500">
          Insira uma URL de embed (YouTube, Spotify, CodePen, Figma) no Inspector lateral.
        </div>
      );
    }

    if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
      const videoId = url.includes('youtu.be/')
        ? url.split('youtu.be/')[1]?.split('?')[0]
        : url.split('v=')[1]?.split('&')[0];
      return (
        <iframe
          className="w-full aspect-video rounded-xl shadow-md"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }

    if (url.includes('spotify.com/')) {
      const cleanUrl = url.replace('open.spotify.com/', 'open.spotify.com/embed/');
      return (
        <iframe
          className="w-full h-40 rounded-xl shadow-md"
          src={cleanUrl}
          allow="encrypted-media"
        />
      );
    }

    return (
      <iframe
        className="w-full aspect-video rounded-xl shadow-md border border-slate-200"
        src={url}
        title={content.title || 'Embed Content'}
      />
    );
  };

  return (
    <div className={styleClasses}>
      <div className="max-w-3xl mx-auto">
        {content.title && (
          <h4 className="font-bold text-sm sm:text-base text-slate-900 mb-3">{content.title}</h4>
        )}
        {getEmbedIframe()}
        {content.caption && (
          <p className="text-xs text-slate-500 text-center mt-2 italic">{content.caption}</p>
        )}
      </div>
    </div>
  );
}

function AudioPlayerComponent({ content, styleClasses }: { content: any; styleClasses: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className={styleClasses}>
      <div className="max-w-2xl mx-auto p-5 sm:p-6 rounded-2xl bg-linear-to-r from-slate-900 to-indigo-950 text-white shadow-lg border border-slate-800">
        <div className="flex items-center gap-4">
          {/* Play/Pause Button */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-md transition-transform hover:scale-105"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>

          {/* Episode Info & Sound Wave */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                {content.tag || 'Podcast / Áudio'}
              </span>
              <span className="text-xs text-slate-400">{content.duration || '24:18'}</span>
            </div>
            <h4 className="font-bold text-sm sm:text-base text-white truncate">
              {content.title || 'Episódio #12: O Futuro dos CMS Híbridos com Next.js'}
            </h4>
            <p className="text-xs text-slate-400 truncate mt-0.5">
              {content.author || 'Tech Lead & Redação'}
            </p>

            {/* Sound Wave Animation Visualizer */}
            <div className="flex items-end gap-1 h-5 mt-3">
              {[40, 70, 30, 90, 60, 100, 45, 80, 20, 95, 65, 85, 35, 75, 55, 90, 40, 70, 85, 30].map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-full transition-all duration-300 ${
                    isPlaying ? 'bg-blue-400 animate-pulse' : 'bg-slate-700'
                  }`}
                  style={{ height: isPlaying ? `${Math.max(20, (h * Math.random()).toFixed(0))}%` : `${h * 0.4}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
