'use client';

import React, { useState } from 'react';
import { useCMS } from '@/lib/cms-context';
import {
  BookOpen,
  Search,
  ChevronRight,
  Code2,
  Copy,
  Check,
  ExternalLink,
  Layers,
  Sparkles,
  Database,
  Rocket,
  Palette,
  Terminal,
  Cpu,
  HelpCircle,
  Clock,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  ArrowLeft,
  Share2,
  CheckCircle2,
  Play,
  Volume2,
  Sliders,
  FolderTree,
} from 'lucide-react';

// Documentation topics dictionary
interface DocTopic {
  id: string;
  category: string;
  title: string;
  badge?: string;
  summary: string;
  content: {
    overview: string;
    liveType?: string;
    sampleData?: any;
    codeJson?: string;
    propsTable?: Array<{ prop: string; type: string; defaultVal: string; description: string }>;
    tips?: string[];
  };
}

const DOC_TOPICS: DocTopic[] = [
  {
    id: 'getting-started',
    category: '1. Getting Started',
    title: 'Guia de Início Rápido (3 Minutos)',
    badge: 'Início',
    summary: 'Como rodar o NextBlog CMS localmente ou na nuvem em menos de 3 minutos.',
    content: {
      overview: 'O NextBlog CMS foi desenvolvido sobre o Next.js 15 App Router e React 19. Para iniciar o desenvolvimento local, basta clonar o repositório e executar o servidor de desenvolvimento.',
      codeJson: `# 1. Clonar o repositório
git clone https://github.com/JoadsonRocha/NextBlog---CMS.git
cd NextBlog---CMS

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env

# 4. Iniciar servidor local
npm run dev`,
      tips: [
        'O site e o painel administrativo estarão disponíveis em http://localhost:3000.',
        'Você pode obter uma chave de IA gratuita em https://console.groq.com/keys para ativar o assistente Llama 3.3 70B.',
      ],
    },
  },
  {
    id: 'deploy-multicloud',
    category: '1. Getting Started',
    title: 'Deploy Multi-Nuvem (Vercel, Railway, Render, Netlify)',
    badge: '1-Click',
    summary: 'Manifestos e instruções para hospedagem com 1 clique nos principais provedores do mercado.',
    content: {
      overview: 'O NextBlog CMS conta com manifestos oficiais configurados para todos os principais servidores de nuvem: vercel.json, netlify.toml, railway.json, render.yaml e Dockerfile multi-stage.',
      codeJson: `# Executar em qualquer servidor Linux com Docker:
docker build -t nextblog-cms .
docker run -d -p 3000:3000 -e GROQ_API_KEY="sua_chave" nextblog-cms`,
      propsTable: [
        { prop: 'Vercel', type: 'Serverless / Edge', defaultVal: 'vercel.json', description: 'Deploy nativo Next.js 15 com ISR e SSL gratuito.' },
        { prop: 'Railway', type: 'Container / Nixpacks', defaultVal: 'railway.json', description: 'Deploy contínuo com banco PostgreSQL gerenciado integrado.' },
        { prop: 'Render', type: 'Blueprint IaC', defaultVal: 'render.yaml', description: 'Cria Web Service e banco PostgreSQL automaticamente.' },
        { prop: 'Netlify', type: 'Plugin Next.js', defaultVal: 'netlify.toml', description: 'Hospedagem com CDN global e formulários.' },
      ],
    },
  },
  {
    id: 'widget-accordion',
    category: '2. Componentes & Widgets',
    title: 'Accordion / FAQ Expansível',
    badge: 'Interativo',
    summary: 'Seção colapsável de perguntas e respostas com animações suaves e alta densidade de informação.',
    content: {
      overview: 'O bloco de Accordion/FAQ permite agrupar tópicos extensos em gavetas expansíveis, melhorando a experiência do usuário e a retenção na página.',
      liveType: 'faq',
      sampleData: {
        title: 'Perguntas Frequentes sobre o NextBlog',
        subtitle: 'Tudo o que você precisa saber sobre o CMS',
        items: [
          { question: 'Como funciona o editor em blocos?', answer: 'Você pode arrastar blocos ou digitar a tecla / para abrir a paleta de comandos rápidos.' },
          { question: 'Posso usar meu próprio banco PostgreSQL?', answer: 'Sim! O schema Prisma e Drizzle já vêm prontos para PostgreSQL, Supabase e Neon.' },
        ],
      },
      codeJson: `{
  "type": "faq",
  "content": {
    "title": "Perguntas Frequentes",
    "subtitle": "Tire suas dúvidas",
    "items": [
      { "question": "Como funciona?", "answer": "Resposta detalhada..." }
    ]
  }
}`,
      propsTable: [
        { prop: 'title', type: 'string', defaultVal: '""', description: 'Título principal exibido no cabeçalho do bloco.' },
        { prop: 'subtitle', type: 'string', defaultVal: '""', description: 'Subtítulo opcional de suporte.' },
        { prop: 'items', type: 'Array<{ question, answer }>', defaultVal: '[]', description: 'Lista de perguntas e respostas expansíveis.' },
      ],
    },
  },
  {
    id: 'widget-poll',
    category: '2. Componentes & Widgets',
    title: 'Poll / Enquete com Votação ao Vivo',
    badge: 'Engajamento',
    summary: 'Widget de votação interativa em tempo real com cálculo dinâmico de porcentagens.',
    content: {
      overview: 'Ideal para engajar a audiência, coletar feedback de leitores e aumentar o tempo de permanência na página.',
      liveType: 'poll',
      sampleData: {
        question: 'Qual é o seu recurso favorito no NextBlog CMS?',
        options: [
          { text: 'Editor Notion-style com Slash Commands (/)', votes: 42 },
          { text: 'IA Groq Llama 3.3 70B ultra-rápida (< 1s)', votes: 38 },
          { text: 'Ponto Focal 2D para Fotos (Wagtail style)', votes: 25 },
        ],
      },
      codeJson: `{
  "type": "poll",
  "content": {
    "question": "Qual funcionalidade você mais gostou?",
    "options": [
      { "text": "Editor em blocos", "votes": 10 },
      { "text": "Deploy em 1 clique", "votes": 15 }
    ]
  }
}`,
      propsTable: [
        { prop: 'question', type: 'string', defaultVal: '""', description: 'Pergunta principal da enquete.' },
        { prop: 'options', type: 'Array<{ text, votes }>', defaultVal: '[]', description: 'Lista de opções com contagem de votos.' },
      ],
    },
  },
  {
    id: 'widget-callout',
    category: '2. Componentes & Widgets',
    title: 'Callout Box (Destaque Notion Style)',
    badge: 'Notion',
    summary: 'Caixas de destaque com 6 variações visuais de cor e ícones temáticos.',
    content: {
      overview: 'Perfeito para destacar avisos importantes, dicas de código, alertas de segurança ou citações em evidência.',
      liveType: 'callout',
      sampleData: {
        type: 'tip',
        title: 'Dica de Otimização de Imagens',
        message: 'Utilize o Ponto Focal 2D para garantir que o assunto principal da foto nunca seja cortado em telas de celular.',
      },
      codeJson: `{
  "type": "callout",
  "content": {
    "type": "tip",
    "title": "Dica de Otimização",
    "message": "Mensagem destacada em verde esmeralda..."
  }
}`,
      propsTable: [
        { prop: 'type', type: '"info" | "warning" | "success" | "tip" | "error" | "neutral"', defaultVal: '"info"', description: 'Tema visual e ícone da caixa de destaque.' },
        { prop: 'title', type: 'string', defaultVal: '""', description: 'Título em negrito no topo da caixa.' },
        { prop: 'message', type: 'string', defaultVal: '""', description: 'Texto explicativo do destaque.' },
      ],
    },
  },
  {
    id: 'widget-focalpoint',
    category: '2. Componentes & Widgets',
    title: 'Image & Ponto Focal 2D (Wagtail Style)',
    badge: 'Wagtail',
    summary: 'Controle de corte responsivo inteligente onde o editor clica na foto para definir as coordenadas X/Y.',
    content: {
      overview: 'Inspirado no Wagtail Renditions, o Ponto Focal 2D aplica object-position: X% Y% para que nenhuma foto corte rostos ou produtos em layouts verticais ou banners.',
      codeJson: `{
  "type": "image",
  "content": {
    "url": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
    "altText": "Circuito eletrônico de alta tecnologia",
    "caption": "Arquitetura NextBlog CMS",
    "focalPoint": {
      "x": 60,
      "y": 45
    }
  }
}`,
      tips: [
        'No Inspector Lateral, basta clicar na miniatura da foto para mover o alvo de foco.',
        'O CSS atualiza em tempo real para Desktop, Tablet e Mobile.',
      ],
    },
  },
  {
    id: 'customization-themes',
    category: '3. Customização & Temas',
    title: 'Temas Nativos, Variáveis CSS & Google Fonts',
    badge: 'Design System',
    summary: 'Personalização visual completa com 4 temas profissionais, tipografias do Google e injeção de CSS.',
    content: {
      overview: 'Alterne entre Modern SaaS, Editorial Minimal, Vibrant Creative e Dark Luxury no menu Aparência com aplicação instantânea em todo o site.',
      codeJson: `:root {
  --cms-primary: #2563eb;
  --cms-primary-hover: #1d4ed8;
  --cms-font-heading: 'Inter', system-ui, sans-serif;
  --cms-radius-lg: 16px;
  --cms-shadow-card: 0 1px 3px 0 rgb(0 0 0 / 0.1);
}`,
      propsTable: [
        { prop: 'Modern SaaS', type: 'Inter / Plus Jakarta Sans', defaultVal: '#2563eb', description: 'Clean, moderno e profissional com sombras suaves.' },
        { prop: 'Editorial Minimal', type: 'Merriweather / Lora', defaultVal: '#0f172a', description: 'Focado em leitura longa, artigos de jornal e revistas.' },
        { prop: 'Vibrant Creative', type: 'Outfit / Poppins', defaultVal: '#7c3aed', description: 'Gradientes modernos e estética de startups.' },
        { prop: 'Dark Luxury', type: 'Playfair Display', defaultVal: '#f59e0b', description: 'Tema escuro premium com contrastes refinados.' },
      ],
    },
  },
  {
    id: 'groq-ai',
    category: '4. IA & Automações',
    title: 'Inteligência Artificial Groq (Llama 3.3 70B)',
    badge: 'Ultra-Fast',
    summary: 'Geração de artigos completos, reescrita de tom de voz e SEO em menos de 1 segundo.',
    content: {
      overview: 'Integrado à infraestrutura Groq LPU, o assistente de IA responde em milissegundos via Llama 3.3 70B diretamente nas rotas de API do servidor Next.js.',
      codeJson: `// Chamada da API Groq no servidor:
const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${process.env.GROQ_API_KEY}\`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: 'Gere um post sobre Next.js' }],
  }),
});`,
      tips: [
        'Pressione Ctrl + I no editor visual para abrir o assistente de IA.',
        'A chave GROQ_API_KEY fica 100% protegida no servidor sem exposição pública.',
      ],
    },
  },
  {
    id: 'database-prisma',
    category: '5. Bancos & Backend',
    title: 'PostgreSQL, Prisma ORM e Drizzle',
    badge: 'SQL & NoSQL',
    summary: 'Modelagem completa de tabelas com suporte a colunas JSONB para blocos Notion e backups em 1 clique.',
    content: {
      overview: 'O projeto inclui os schemas prontos em prisma/schema.prisma, lib/db/drizzle/schema.ts e lib/db/mongoose/models.ts.',
      codeJson: `# Rodar migrações do Prisma no PostgreSQL:
npx prisma migrate dev --name init_cms

# Abrir o visualizador de banco Prisma Studio:
npx prisma studio`,
      propsTable: [
        { prop: 'PostgreSQL', type: 'Prisma / Drizzle', defaultVal: 'DATABASE_URL', description: 'Ideal para Supabase, Neon e Railway.' },
        { prop: 'MongoDB', type: 'Mongoose', defaultVal: 'MONGODB_URI', description: 'Banco orientado a documentos NoSQL.' },
        { prop: 'SQLite', type: 'Prisma / Turso', defaultVal: 'file:./dev.db', description: 'Banco local ou serverless para edge.' },
      ],
    },
  },
];

export function DocumentationView() {
  const { setActiveView, setPublicRoute } = useCMS();
  const [selectedTopicId, setSelectedTopicId] = useState<string>('getting-started');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  const selectedTopic = DOC_TOPICS.find((t) => t.id === selectedTopicId) || DOC_TOPICS[0];

  // Group topics by category
  const categories = Array.from(new Set(DOC_TOPICS.map((t) => t.category)));

  const filteredTopics = DOC_TOPICS.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyCode = (text: string) => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  // Find next and previous topics for bottom pagination
  const currentIndex = DOC_TOPICS.findIndex((t) => t.id === selectedTopic.id);
  const prevTopic = currentIndex > 0 ? DOC_TOPICS[currentIndex - 1] : null;
  const nextTopic = currentIndex < DOC_TOPICS.length - 1 ? DOC_TOPICS[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Navbar (Bootstrap Docs Style) */}
      <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              onClick={() => setActiveView('dashboard')}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-white block leading-tight">
                  NextBlog Docs
                </span>
                <span className="text-[10px] text-blue-300 font-mono">v2.4.0 (Latest)</span>
              </div>
            </div>
          </div>

          {/* Quick Search */}
          <div className="relative flex-1 max-w-md hidden md:block">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar em todos os tópicos da documentação..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => setActiveView('dashboard')}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition-colors"
            >
              Painel Admin
            </button>
            <button
              type="button"
              onClick={() => {
                setPublicRoute({ type: 'page', slug: 'home' });
                setActiveView('public-site');
              }}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors flex items-center gap-1 shadow-xs"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Ver Site</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Documentation Container */}
      <div className="max-w-7xl mx-auto w-full flex-1 flex">
        {/* Left Sidebar: Topic Navigation (Bootstrap / Nextra style) */}
        <aside className="w-64 sm:w-72 border-r border-slate-200 bg-white p-5 overflow-y-auto shrink-0 hidden md:block max-h-[calc(100vh-4rem)] sticky top-16 space-y-6">
          {categories.map((cat) => {
            const topicsInCat = filteredTopics.filter((t) => t.category === cat);
            if (topicsInCat.length === 0) return null;

            return (
              <div key={cat} className="space-y-1.5">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block px-2">
                  {cat}
                </span>

                <div className="space-y-0.5">
                  {topicsInCat.map((topic) => {
                    const isSelected = selectedTopic.id === topic.id;

                    return (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() => setSelectedTopicId(topic.id)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-blue-50 text-blue-700 font-bold shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                        }`}
                      >
                        <span className="truncate">{topic.title}</span>
                        {topic.badge && (
                          <span className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded shrink-0 ml-1 ${
                            isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {topic.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </aside>

        {/* Center Article Content */}
        <main className="flex-1 p-6 sm:p-12 overflow-y-auto space-y-8 max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <span>Docs</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-600">{selectedTopic.category}</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-blue-600 font-bold">{selectedTopic.title}</span>
          </div>

          {/* Article Header */}
          <div className="space-y-2 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {selectedTopic.title}
              </h1>
              {selectedTopic.badge && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-blue-100 text-blue-800 border border-blue-200">
                  {selectedTopic.badge}
                </span>
              )}
            </div>
            <p className="text-base text-slate-600 leading-relaxed">
              {selectedTopic.summary}
            </p>
          </div>

          {/* Overview text */}
          <div className="text-sm text-slate-700 leading-relaxed space-y-4">
            <p>{selectedTopic.content.overview}</p>
          </div>

          {/* Live Component Preview Simulator (if applicable) */}
          {selectedTopic.content.sampleData && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5 text-blue-600" />
                  <span>Prévia Interativa ao Vivo</span>
                </span>
                <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded">Componente Real</span>
              </div>

              <div className="p-6 bg-white rounded-2xl border-2 border-slate-200 shadow-xs">
                {selectedTopic.content.liveType === 'faq' && (
                  <div className="space-y-3">
                    <h3 className="font-bold text-base text-slate-900">{selectedTopic.content.sampleData.title}</h3>
                    <p className="text-xs text-slate-500">{selectedTopic.content.sampleData.subtitle}</p>
                    <div className="space-y-2 pt-2">
                      {selectedTopic.content.sampleData.items.map((item: any, i: number) => (
                        <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                          <p className="font-bold text-slate-800 mb-1">❓ {item.question}</p>
                          <p className="text-slate-600 pl-4">{item.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedTopic.content.liveType === 'poll' && (
                  <div className="space-y-3 max-w-md">
                    <h4 className="font-bold text-sm text-slate-900">{selectedTopic.content.sampleData.question}</h4>
                    <div className="space-y-2">
                      {selectedTopic.content.sampleData.options.map((opt: any, i: number) => (
                        <button
                          key={i}
                          type="button"
                          className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 text-left text-xs font-semibold flex items-center justify-between transition-colors"
                        >
                          <span>{opt.text}</span>
                          <span className="font-mono text-slate-400 text-[11px]">{opt.votes} votos</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedTopic.content.liveType === 'callout' && (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-xs text-emerald-900">{selectedTopic.content.sampleData.title}</h5>
                      <p className="text-xs text-emerald-800 mt-0.5">{selectedTopic.content.sampleData.message}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Copyable Code Snippet Box (Bootstrap Style) */}
          {selectedTopic.content.codeJson && (
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-purple-600" />
                  <span>Código & Estrutura de Dados</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyCode(selectedTopic.content.codeJson!)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copiado!' : 'Copiar Código'}</span>
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-slate-950">
                <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 pl-2">schema.json</span>
                </div>
                <pre className="p-4 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                  {selectedTopic.content.codeJson}
                </pre>
              </div>
            </div>
          )}

          {/* Props Table (Bootstrap Style) */}
          {selectedTopic.content.propsTable && (
            <div className="space-y-3 pt-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500 block">
                Tabela de Propriedades & Atributos (Props)
              </span>

              <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-2xs bg-white">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                      <th className="p-3 font-bold">Propriedade</th>
                      <th className="p-3 font-bold">Tipo</th>
                      <th className="p-3 font-bold">Valor Padrão</th>
                      <th className="p-3 font-bold">Descrição</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedTopic.content.propsTable.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50/70">
                        <td className="p-3 font-mono font-bold text-purple-700">{row.prop}</td>
                        <td className="p-3 font-mono text-slate-500 text-[11px]">{row.type}</td>
                        <td className="p-3 font-mono text-slate-600">{row.defaultVal}</td>
                        <td className="p-3 text-slate-700">{row.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tips and Alerts */}
          {selectedTopic.content.tips && (
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-blue-950 space-y-1.5 text-xs">
              <span className="font-bold flex items-center gap-1.5 text-blue-900">
                <Sparkles className="w-4 h-4 text-blue-600" />
                Dicas & Boas Práticas:
              </span>
              <ul className="list-disc list-inside space-y-1 text-blue-900/80 pl-2">
                {selectedTopic.content.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Bottom Pagination (Next & Previous Topics) */}
          <div className="pt-8 border-t border-slate-200 flex items-center justify-between gap-4 text-xs">
            {prevTopic ? (
              <button
                type="button"
                onClick={() => setSelectedTopicId(prevTopic.id)}
                className="p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold flex items-center gap-2 transition-colors shadow-2xs text-left"
              >
                <ArrowLeft className="w-4 h-4 text-slate-400" />
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-bold">Anterior</span>
                  <span className="text-slate-900 truncate max-w-xs">{prevTopic.title}</span>
                </div>
              </button>
            ) : <div />}

            {nextTopic && (
              <button
                type="button"
                onClick={() => setSelectedTopicId(nextTopic.id)}
                className="p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold flex items-center gap-2 transition-colors shadow-2xs text-right"
              >
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-bold">Próximo</span>
                  <span className="text-slate-900 truncate max-w-xs">{nextTopic.title}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-blue-600" />
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
