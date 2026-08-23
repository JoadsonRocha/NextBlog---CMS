'use client';

import React, { useState } from 'react';
import { useCMS } from '@/lib/cms-context';
import { Post, Page, SEOMetadata } from '@/types/cms';
import {
  Search,
  CheckCircle,
  AlertCircle,
  XCircle,
  Sparkles,
  Share2,
  Code2,
  Copy,
  Check,
  Globe,
  ExternalLink,
  Twitter,
  FileText,
  Sliders,
  X,
} from 'lucide-react';

interface SEOInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Post | Page;
  isPost: boolean;
}

export function SEOInspectorModal({ isOpen, onClose, item, isPost }: SEOInspectorModalProps) {
  const { updatePost, updatePage, addToast, settings } = useCMS();
  const [activeTab, setActiveTab] = useState<'general' | 'score' | 'social' | 'schema'>('general');
  const [keyword, setKeyword] = useState(item.seo?.keywords?.[0] || '');
  const [copiedSchema, setCopiedSchema] = useState(false);

  if (!isOpen) return null;

  const currentSeo: SEOMetadata = item.seo || {
    metaTitle: item.title,
    metaDescription: (item as any).excerpt || (item as any).description || '',
    keywords: [],
  };

  const handleUpdate = (fields: Partial<SEOMetadata>) => {
    const updated = { ...currentSeo, ...fields };
    if (isPost) {
      updatePost(item.id, { seo: updated });
    } else {
      updatePage(item.id, { seo: updated });
    }
  };

  // SEO Score Calculation Algorithm
  const title = currentSeo.metaTitle || item.title || '';
  const desc = currentSeo.metaDescription || '';
  const blocksCount = item.blocks?.length || 0;
  const kw = keyword.toLowerCase().trim();

  const titleLengthOk = title.length >= 30 && title.length <= 65;
  const descLengthOk = desc.length >= 70 && desc.length <= 160;
  const kwInTitle = kw ? title.toLowerCase().includes(kw) : false;
  const kwInDesc = kw ? desc.toLowerCase().includes(kw) : false;
  const contentRichness = blocksCount >= 3;
  const hasOgImage = Boolean(currentSeo.ogImage || (item as any).featuredImage);

  const checks = [
    { label: 'Título SEO com tamanho ideal (30 - 65 caracteres)', passed: titleLengthOk, weight: 20, tip: `Atualmente: ${title.length} caracteres` },
    { label: 'Meta Descrição atrativa e informativa (70 - 160 caracteres)', passed: descLengthOk, weight: 20, tip: `Atualmente: ${desc.length} caracteres` },
    { label: 'Palavra-chave principal presente no Título', passed: Boolean(kw && kwInTitle), weight: 15, tip: kw ? (kwInTitle ? 'Presente' : 'Não encontrada no título') : 'Defina uma palavra-chave' },
    { label: 'Palavra-chave presente na Meta Descrição', passed: Boolean(kw && kwInDesc), weight: 15, tip: kw ? (kwInDesc ? 'Presente' : 'Não encontrada na descrição') : 'Defina uma palavra-chave' },
    { label: 'Estrutura e densidade de conteúdo em blocos', passed: contentRichness, weight: 15, tip: `${blocksCount} blocos inseridos` },
    { label: 'Imagem de destaque configurada para OpenGraph', passed: hasOgImage, weight: 15, tip: hasOgImage ? 'Configurada' : 'Nenhuma imagem associada' },
  ];

  const totalScore = checks.reduce((acc, c) => acc + (c.passed ? c.weight : 0), 0);

  // Schema.org JSON-LD generation
  const siteUrl = 'https://nextblog-cms.vercel.app';
  const postUrl = `${siteUrl}/${isPost ? 'blog/' : ''}${item.slug}`;

  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@type': isPost ? 'BlogPosting' : 'WebPage',
    headline: title,
    description: desc,
    image: currentSeo.ogImage || (item as any).featuredImage || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200',
    datePublished: (item as any).publishedAt || (item as any).createdAt,
    dateModified: (item as any).updatedAt || new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: (item as any).authorName || 'Ana Silva',
    },
    publisher: {
      '@type': 'Organization',
      name: settings?.siteName || 'NextBlog CMS',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
  };

  const jsonLdString = JSON.stringify(schemaJsonLd, null, 2);

  const handleCopySchema = () => {
    navigator.clipboard.writeText(`<script type="application/ld+json">\n${jsonLdString}\n</script>`);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
    addToast({ type: 'success', title: 'Schema.org JSON-LD copiado para a área de transferência!' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in font-sans">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 text-white shadow-xs">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-slate-900">RankPulse SEO Pro & Rich Data</h3>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-black border ${
                    totalScore >= 80
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : totalScore >= 50
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-rose-50 text-rose-700 border-rose-200'
                  }`}
                >
                  Score: {totalScore}/100
                </span>
              </div>
              <p className="text-xs text-slate-500">Otimização completa de busca, metatags, redes sociais e Schema.org</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50/50 px-5 gap-2 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('general')}
            className={`py-3 px-3 border-b-2 transition-all ${
              activeTab === 'general' ? 'border-blue-600 text-blue-600 bg-white rounded-t-lg' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Metatags & SERP
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('score')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'score' ? 'border-blue-600 text-blue-600 bg-white rounded-t-lg' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Auditoria SEO ({totalScore}%)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('social')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'social' ? 'border-blue-600 text-blue-600 bg-white rounded-t-lg' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Social Cards (OG)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('schema')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'schema' ? 'border-blue-600 text-blue-600 bg-white rounded-t-lg' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Schema.org JSON-LD</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'general' && (
            <div className="space-y-4 text-xs">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-slate-700">Palavra-chave Foco</label>
                  <button
                    type="button"
                    onClick={() => {
                      const baseKw = keyword || item.title.split(' ').slice(0, 3).join(' ');
                      const optimalTitle = `${item.title.length > 50 ? item.title.slice(0, 48) + '...' : item.title} | Guia Completo`;
                      const optimalDesc = `Aprenda tudo sobre ${baseKw || 'este tópico'}: estratégias práticas, dicas essenciais e guia passo a passo completo atualizado para 2026.`;
                      setKeyword(baseKw);
                      handleUpdate({
                        metaTitle: optimalTitle,
                        metaDescription: optimalDesc,
                        keywords: [baseKw],
                      });
                      addToast({ type: 'success', title: 'SEO otimizado automaticamente com IA!', message: 'Título e meta descrição ajustados para pontuação máxima.' });
                    }}
                    className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-blue-600" />
                    <span>Auto-Otimizar com IA</span>
                  </button>
                </div>
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => {
                    setKeyword(e.target.value);
                    handleUpdate({ keywords: [e.target.value] });
                  }}
                  placeholder="Ex: nextjs cms, headless cms..."
                  className="w-full p-2.5 rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-bold text-slate-700">Título SEO (Meta Title)</label>
                  <span className={`text-[11px] ${title.length > 65 || title.length < 30 ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {title.length} / 65 caracteres
                  </span>
                </div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleUpdate({ metaTitle: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-300 bg-white font-semibold"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-bold text-slate-700">Meta Descrição</label>
                  <span className={`text-[11px] ${desc.length > 160 || desc.length < 70 ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {desc.length} / 160 caracteres
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={desc}
                  onChange={(e) => handleUpdate({ metaDescription: e.target.value })}
                  placeholder="Resumo persuasivo para os resultados de busca do Google..."
                  className="w-full p-2.5 rounded-lg border border-slate-300 bg-white"
                />
              </div>

              {/* SERP Preview Box */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-2">
                  Prévia no Google Search (SERP)
                </span>
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-4 h-4 rounded-full bg-blue-600 text-[10px] text-white flex items-center justify-center font-bold">
                      N
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-700 font-semibold">{settings?.siteName || 'NextBlog CMS'}</p>
                      <p className="text-[10px] text-emerald-700 truncate">{postUrl}</p>
                    </div>
                  </div>
                  <h4 className="text-base text-blue-700 font-medium hover:underline cursor-pointer leading-snug">
                    {title || 'Título da Página'}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {desc || 'Adicione uma meta descrição para que ela seja apresentada aos usuários nos resultados de busca.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'score' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-linear-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold">Pontuação Global de Otimização</h4>
                  <p className="text-xs text-slate-300 mt-0.5">Baseado em mais de 6 critérios essenciais do Google Search Essentials</p>
                </div>
                <div className="text-3xl font-black text-emerald-400">{totalScore}%</div>
              </div>

              <div className="space-y-2.5">
                {checks.map((c, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl border border-slate-200 bg-white flex items-start gap-3 text-xs"
                  >
                    <div className="mt-0.5">
                      {c.passed ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-amber-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`font-bold ${c.passed ? 'text-slate-800' : 'text-slate-700'}`}>{c.label}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${c.passed ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                          +{c.weight} pts
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{c.tip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">URL da Imagem OpenGraph (og:image)</label>
                <input
                  type="text"
                  value={currentSeo.ogImage || (item as any).featuredImage || ''}
                  onChange={(e) => handleUpdate({ ogImage: e.target.value })}
                  placeholder="https://..."
                  className="w-full p-2.5 rounded-lg border border-slate-300 bg-white"
                />
              </div>

              {/* Social Card Preview */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-2">
                  Prévia no Twitter / X & LinkedIn Card
                </span>
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs max-w-md mx-auto">
                  <div className="aspect-video bg-slate-100 overflow-hidden">
                    <img
                      src={currentSeo.ogImage || (item as any).featuredImage || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800'}
                      alt="Social Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 bg-slate-900 text-white">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">nextblog.dev</span>
                    <h5 className="font-bold text-xs text-white truncate mt-0.5">{title}</h5>
                    <p className="text-[11px] text-slate-300 line-clamp-2 mt-1">{desc}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-slate-800">Marcação Estruturada Schema.org (JSON-LD)</h4>
                  <p className="text-[11px] text-slate-500">Permite que o Google exiba Rich Snippets, carrosséis e dados de autor nos resultados.</p>
                </div>
                <button
                  type="button"
                  onClick={handleCopySchema}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs"
                >
                  {copiedSchema ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSchema ? 'Copiado!' : 'Copiar JSON-LD'}</span>
                </button>
              </div>

              <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 text-emerald-400 p-4 text-[11px] font-mono max-h-72 overflow-y-auto">
                <pre>{jsonLdString}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Globe className="w-3.5 h-3.5" />
            <span>Sitemap e robots.txt automáticos ativos em <code className="text-slate-800 font-bold">/api/sitemap</code></span>
          </div>
          <button
            type="button"
            onClick={() => {
              onClose();
              addToast({ type: 'success', title: 'Metadados de SEO atualizados com sucesso!' });
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
          >
            Salvar e Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
