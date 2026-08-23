// NextBlog CMS - Drizzle ORM Schema
// Suporta PostgreSQL e SQLite em alta performance

import { pgTable, text, timestamp, integer, boolean, json, index } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  role: text('role').notNull().default('editor'), // admin | editor | visitor
  avatar: text('avatar'),
  bio: text('bio'),
  status: text('status').default('active'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const categories = pgTable('categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  color: text('color').default('#3b82f6'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const posts = pgTable(
  'posts',
  {
    id: text('id').primaryKey(),
    slug: text('slug').notNull().unique(),
    title: text('title').notNull(),
    excerpt: text('excerpt'),
    featuredImage: text('featured_image'),
    status: text('status').notNull().default('draft'), // published | draft | scheduled
    readingTime: text('reading_time').default('3 min'),
    views: integer('views').default(0),
    tags: json('tags').$type<string[]>().default([]),
    authorId: text('author_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    categoryId: text('category_id').references(() => categories.id, { onDelete: 'set null' }),
    
    // Blocos modulares JSON Notion-style
    blocks: json('blocks').$type<any[]>().default([]),

    // SEO Metadados
    metaTitle: text('meta_title'),
    metaDescription: text('meta_description'),
    ogImage: text('og_image'),
    canonicalUrl: text('canonical_url'),
    noIndex: boolean('no_index').default(false),

    publishedAt: timestamp('published_at'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    slugIdx: index('posts_slug_idx').on(table.slug),
    statusIdx: index('posts_status_idx').on(table.status),
  })
);

export const pages = pgTable('pages', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  description: text('description'),
  template: text('template').default('default'),
  status: text('status').default('published'),
  isHomePage: boolean('is_home_page').default(false),
  orderIndex: integer('order_index').default(0),
  blocks: json('blocks').$type<any[]>().default([]),
  metaTitle: text('meta_title'),
  metaDescription: text('meta_description'),
  ogImage: text('og_image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const comments = pgTable('comments', {
  id: text('id').primaryKey(),
  postId: text('post_id').notNull().references(() => posts.id, { onDelete: 'cascade' }),
  authorName: text('author_name').notNull(),
  authorEmail: text('author_email').notNull(),
  authorAvatar: text('author_avatar'),
  content: text('content').notNull(),
  status: text('status').notNull().default('pending'), // approved | pending | spam | trash
  response: text('response'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const reusableBlocks = pgTable('reusable_blocks', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  category: text('category').default('content'),
  description: text('description'),
  blockData: json('block_data').notNull(),
  usageCount: integer('usage_count').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
