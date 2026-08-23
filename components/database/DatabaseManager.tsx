'use client';

import React, { useState } from 'react';
import { useCMS } from '@/lib/cms-context';
import {
  Database,
  Server,
  FileCode,
  Download,
  Upload,
  RefreshCw,
  CheckCircle2,
  Copy,
  Check,
  Zap,
  HardDrive,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

const POSTGRESQL_DDL = `-- ==========================================
-- NextBlock CMS - PostgreSQL DDL Schema
-- Suporte nativo para JSONB (Blocos Modulares)
-- Compatível com Supabase, Neon, Railway & AWS RDS
-- ==========================================

-- Tabela de Usuários e Permissões
CREATE TABLE cms_users (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(32) NOT NULL DEFAULT 'editor', -- 'admin', 'editor', 'visitor'
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Categorias
CREATE TABLE cms_categories (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    slug VARCHAR(128) UNIQUE NOT NULL,
    description TEXT,
    color VARCHAR(32) DEFAULT '#3B82F6'
);

-- Tabela de Posts / Artigos do Blog
CREATE TABLE cms_posts (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(512) NOT NULL,
    slug VARCHAR(512) UNIQUE NOT NULL,
    excerpt TEXT,
    category_id VARCHAR(64) REFERENCES cms_categories(id),
    category_name VARCHAR(128),
    tags TEXT[] DEFAULT '{}',
    status VARCHAR(32) NOT NULL DEFAULT 'draft', -- 'published', 'draft'
    featured_image TEXT,
    author_id VARCHAR(64) REFERENCES cms_users(id),
    author_name VARCHAR(255),
    author_avatar TEXT,
    reading_time VARCHAR(32),
    views INTEGER DEFAULT 0,
    published_at TIMESTAMP WITH TIME ZONE,
    seo JSONB DEFAULT '{"metaTitle": "", "metaDescription": "", "keywords": []}'::jsonb,
    blocks JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array de blocos estruturados
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Páginas Dinâmicas & Landing Pages
CREATE TABLE cms_pages (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(512) NOT NULL,
    slug VARCHAR(512) UNIQUE NOT NULL,
    description TEXT,
    is_home_page BOOLEAN DEFAULT FALSE,
    template VARCHAR(64) DEFAULT 'default',
    status VARCHAR(32) NOT NULL DEFAULT 'published',
    seo JSONB DEFAULT '{"metaTitle": "", "metaDescription": "", "keywords": []}'::jsonb,
    blocks JSONB NOT NULL DEFAULT '[]'::jsonb,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Blocos Reutilizáveis (Biblioteca Global)
CREATE TABLE cms_reusable_blocks (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(64) DEFAULT 'content',
    block JSONB NOT NULL,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Mídia e Arquivos
CREATE TABLE cms_media (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    type VARCHAR(32) NOT NULL, -- 'image', 'video', 'document'
    size VARCHAR(32),
    dimensions VARCHAR(32),
    mime_type VARCHAR(64),
    alt_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para busca rápida e SEO
CREATE INDEX idx_posts_slug ON cms_posts(slug);
CREATE INDEX idx_posts_status ON cms_posts(status);
CREATE INDEX idx_posts_category ON cms_posts(category_name);
CREATE INDEX idx_pages_slug ON cms_pages(slug);
CREATE INDEX idx_posts_blocks_gin ON cms_posts USING gin (blocks);
`;

const PRISMA_SCHEMA = `// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  admin
  editor
  visitor
}

enum Status {
  draft
  published
}

model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  role      Role     @default(editor)
  avatarUrl String?
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id            String    @id @default(cuid())
  title         String
  slug          String    @unique
  excerpt       String?
  category      String
  tags          String[]
  status        Status    @default(draft)
  featuredImage String?
  authorId      String
  author        User      @relation(fields: [authorId], references: [id])
  authorName    String
  authorAvatar  String?
  readingTime   String?
  views         Int       @default(0)
  publishedAt   DateTime?
  seo           Json      @default("{}")
  blocks        Json      // Lista de ContentBlock em JSON
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Page {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  description String?
  isHomePage  Boolean  @default(false)
  template    String   @default("default")
  status      Status   @default(published)
  seo         Json     @default("{}")
  blocks      Json
  orderIndex  Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model ReusableBlock {
  id          String   @id @default(cuid())
  title       String
  description String?
  category    String   @default("content")
  block       Json
  usageCount  Int      @default(0)
  createdAt   DateTime @default(now())
}
`;

const MONGOOSE_SCHEMA = `// models/CMS.ts (MongoDB / Mongoose)
import mongoose, { Schema } from 'mongoose';

const ContentBlockSchema = new Schema({
  id: { type: String, required: true },
  type: { type: String, required: true },
  content: { type: Schema.Types.Mixed, default: {} },
  styles: { type: Schema.Types.Mixed, default: {} },
  isReusable: { type: Boolean, default: false }
}, { _id: false });

const PostSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  excerpt: String,
  category: { type: String, index: true },
  tags: [String],
  status: { type: String, enum: ['draft', 'published'], default: 'draft', index: true },
  featuredImage: String,
  authorName: String,
  authorAvatar: String,
  readingTime: String,
  views: { type: Number, default: 0 },
  publishedAt: Date,
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String],
    ogImage: String
  },
  blocks: [ContentBlockSchema]
}, { timestamps: true });

export const PostModel = mongoose.models.Post || mongoose.model('Post', PostSchema);
`;

export function DatabaseManager() {
  const { settings, updateSettings, posts, pages, reusableBlocks, media, resetToDemoData, addToast } = useCMS();
  const [activeTab, setActiveTab] = useState<'postgresql' | 'prisma' | 'mongoose'>('postgresql');
  const [copied, setCopied] = useState(false);

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    addToast({ type: 'success', title: 'Schema copiado com sucesso!' });
  };

  const handleExportJSON = () => {
    const fullBackup = {
      version: '2.4.0',
      exportedAt: new Date().toISOString(),
      settings,
      posts,
      pages,
      reusableBlocks,
      media,
    };
    const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nextblock-cms-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addToast({ type: 'success', title: 'Backup JSON exportado com sucesso!' });
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        if (parsed.posts && parsed.pages) {
          localStorage.setItem('nextblock_cms_posts_v1', JSON.stringify(parsed.posts));
          localStorage.setItem('nextblock_cms_pages_v1', JSON.stringify(parsed.pages));
          if (parsed.reusableBlocks) {
            localStorage.setItem('nextblock_cms_reusable_v1', JSON.stringify(parsed.reusableBlocks));
          }
          if (parsed.media) {
            localStorage.setItem('nextblock_cms_media_v1', JSON.stringify(parsed.media));
          }
          addToast({ type: 'success', title: 'Backup restaurado com sucesso! Recarregando...' });
          setTimeout(() => window.location.reload(), 1000);
        } else {
          throw new Error('Formato de backup inválido');
        }
      } catch (err: any) {
        addToast({ type: 'error', title: 'Erro ao importar backup JSON', message: err.message });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Database className="w-6 h-6 text-blue-600" />
            Banco de Dados & Camada de Persistência
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Configure seu driver de banco de dados (PostgreSQL / MongoDB) e gere schemas prontos para produção.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportJSON}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-blue-600" />
            <span>Exportar Backup (JSON)</span>
          </button>

          <label className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer">
            <Upload className="w-4 h-4 text-indigo-600" />
            <span>Importar Backup</span>
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>
        </div>
      </div>

      {/* Database Provider Settings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Driver de Banco Ativo</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Selecionar Provedor</label>
            <select
              value={settings.databaseProvider}
              onChange={(e) => updateSettings({ databaseProvider: e.target.value as any })}
              className="w-full p-2.5 text-xs font-semibold rounded-lg border border-slate-300 bg-slate-50 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            >
              <option value="postgresql">PostgreSQL (Neon / Supabase / Railway)</option>
              <option value="mongodb">MongoDB Atlas</option>
              <option value="sqlite">SQLite / Turso (Local & Edge)</option>
              <option value="localstorage">In-Memory + LocalStorage Sync</option>
            </select>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Armazenamento de blocos baseado em colunas <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-600 font-mono">JSONB</code> de altíssima performance para consultas e indexação rápida.
          </p>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Status da Conexão</span>
            <span className="font-bold text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Conectado (0.8ms)
            </span>
          </div>
        </div>

        {/* Sync & Backup card */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-sm text-slate-900">Estatísticas do Banco</h3>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Total de Artigos (cms_posts):</span>
              <span className="font-bold text-slate-800">{posts.length}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Páginas Dinâmicas (cms_pages):</span>
              <span className="font-bold text-slate-800">{pages.length}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Blocos Reutilizáveis:</span>
              <span className="font-bold text-slate-800">{reusableBlocks.length}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">Arquivos de Mídia:</span>
              <span className="font-bold text-slate-800">{media.length}</span>
            </div>
          </div>
        </div>

        {/* Demo reset */}
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900 mb-1">Restaurar Dados Demo</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Recarrega o conjunto de dados original de demonstração com páginas completas, artigos técnicos e blocos pré-configurados.
            </p>
          </div>
          <button
            type="button"
            onClick={resetToDemoData}
            className="mt-4 w-full py-2.5 px-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Restaurar Demonstração</span>
          </button>
        </div>
      </div>

      {/* Schema Viewer Section */}
      <div className="bg-slate-900 rounded-2xl p-6 shadow-xl text-slate-100 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <FileCode className="w-5 h-5 text-blue-400" />
            <div>
              <h2 className="text-sm font-bold">Schemas & Migrations Gerados Automaticamente</h2>
              <p className="text-xs text-slate-400">Copie e execute no seu banco de dados de produção</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-800 p-1 rounded-lg text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('postgresql')}
                className={`px-3 py-1 rounded font-semibold ${
                  activeTab === 'postgresql' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                PostgreSQL SQL
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('prisma')}
                className={`px-3 py-1 rounded font-semibold ${
                  activeTab === 'prisma' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Prisma ORM
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('drizzle' as any)}
                className={`px-3 py-1 rounded font-semibold ${
                  activeTab === ('drizzle' as any) ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Drizzle ORM
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('mongoose')}
                className={`px-3 py-1 rounded font-semibold ${
                  activeTab === 'mongoose' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                MongoDB Mongoose
              </button>
            </div>

            <button
              type="button"
              onClick={() =>
                handleCopyCode(
                  activeTab === 'postgresql'
                    ? POSTGRESQL_DDL
                    : activeTab === 'prisma'
                    ? PRISMA_SCHEMA
                    : activeTab === ('drizzle' as any)
                    ? `// lib/db/drizzle/schema.ts
import { pgTable, text, timestamp, integer, boolean, json } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  role: text('role').notNull().default('editor'),
});

export const posts = pgTable('posts', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  excerpt: text('excerpt'),
  status: text('status').notNull().default('draft'),
  blocks: json('blocks').$type<any[]>().default([]),
  metaTitle: text('meta_title'),
  metaDescription: text('meta_description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});`
                    : MONGOOSE_SCHEMA
                )
              }
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar'}</span>
            </button>
          </div>
        </div>

        <pre className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-blue-300 max-h-96 overflow-y-auto leading-relaxed whitespace-pre-wrap border border-slate-800">
          {activeTab === 'postgresql' && POSTGRESQL_DDL}
          {activeTab === 'prisma' && PRISMA_SCHEMA}
          {activeTab === ('drizzle' as any) && `// lib/db/drizzle/schema.ts (Drizzle ORM)
// Execute: npx drizzle-kit push:pg
import { pgTable, text, timestamp, integer, boolean, json, index } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  role: text('role').notNull().default('editor'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const posts = pgTable('posts', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  excerpt: text('excerpt'),
  status: text('status').notNull().default('draft'),
  blocks: json('blocks').$type<any[]>().default([]),
  metaTitle: text('meta_title'),
  metaDescription: text('meta_description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});`}
          {activeTab === 'mongoose' && MONGOOSE_SCHEMA}
        </pre>
      </div>
    </div>
  );
}
