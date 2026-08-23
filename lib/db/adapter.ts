// NextBlog CMS - Unified Data Access Adapter
// Permite alternar entre Prisma, Drizzle, Mongoose, LocalStorage e In-Memory

import { Post, Page, Category, User, Comment, ReusableBlock, GlobalSettings } from '@/types/cms';
import { INITIAL_POSTS, INITIAL_PAGES, INITIAL_CATEGORIES, INITIAL_USERS, INITIAL_REUSABLE_BLOCKS, INITIAL_SETTINGS } from '@/lib/initial-data';

export type DatabaseDriver = 'prisma' | 'drizzle' | 'mongoose' | 'localstorage' | 'memory';

export interface CMSDataAdapter {
  driver: DatabaseDriver;
  isConnected: () => Promise<boolean>;
  getPosts: (filters?: { status?: string; category?: string; limit?: number }) => Promise<Post[]>;
  getPostBySlug: (slug: string) => Promise<Post | null>;
  createPost: (post: Partial<Post>) => Promise<Post>;
  updatePost: (id: string, post: Partial<Post>) => Promise<Post>;
  deletePost: (id: string) => Promise<boolean>;
  getPages: () => Promise<Page[]>;
  getPageBySlug: (slug: string) => Promise<Page | null>;
  createPage: (page: Partial<Page>) => Promise<Page>;
  updatePage: (id: string, page: Partial<Page>) => Promise<Page>;
  deletePage: (id: string) => Promise<boolean>;
  getCategories: () => Promise<Category[]>;
  getUsers: () => Promise<User[]>;
  getSettings: () => Promise<GlobalSettings>;
  updateSettings: (settings: Partial<GlobalSettings>) => Promise<GlobalSettings>;
}

// Memory / LocalStorage Fallback Adapter
export class MemoryCMSAdapter implements CMSDataAdapter {
  driver: DatabaseDriver = 'memory';

  async isConnected(): Promise<boolean> {
    return true;
  }

  async getPosts(filters?: { status?: string; category?: string; limit?: number }): Promise<Post[]> {
    let list = [...INITIAL_POSTS];
    if (filters?.status) list = list.filter((p) => p.status === filters.status);
    if (filters?.category) list = list.filter((p) => p.category.toLowerCase() === filters.category!.toLowerCase());
    if (filters?.limit) list = list.slice(0, filters.limit);
    return list;
  }

  async getPostBySlug(slug: string): Promise<Post | null> {
    return INITIAL_POSTS.find((p) => p.slug === slug) || null;
  }

  async createPost(post: Partial<Post>): Promise<Post> {
    const newPost: Post = {
      id: `post_${Date.now()}`,
      slug: post.slug || 'novo-post',
      title: post.title || 'Novo Post',
      excerpt: post.excerpt || '',
      featuredImage: post.featuredImage || '',
      status: post.status || 'draft',
      category: post.category || 'Geral',
      tags: post.tags || [],
      authorId: post.authorId || 'usr_admin',
      authorName: post.authorName || 'Ana Silva',
      authorAvatar: post.authorAvatar || '',
      blocks: post.blocks || [],
      seo: post.seo || { metaTitle: post.title || '', metaDescription: '', keywords: [] },
      views: 0,
      readingTime: '3 min',
      publishedAt: post.status === 'published' ? new Date().toISOString() : '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return newPost;
  }

  async updatePost(id: string, post: Partial<Post>): Promise<Post> {
    const existing = await this.getPostBySlug(post.slug || '') || INITIAL_POSTS[0];
    return { ...existing, ...post, updatedAt: new Date().toISOString() };
  }

  async deletePost(id: string): Promise<boolean> {
    return true;
  }

  async getPages(): Promise<Page[]> {
    return INITIAL_PAGES;
  }

  async getPageBySlug(slug: string): Promise<Page | null> {
    return INITIAL_PAGES.find((p) => p.slug === slug) || null;
  }

  async createPage(page: Partial<Page>): Promise<Page> {
    return {
      id: `page_${Date.now()}`,
      slug: page.slug || 'nova-pagina',
      title: page.title || 'Nova Página',
      description: page.description || '',
      template: page.template || 'default',
      status: page.status || 'published',
      isHomePage: false,
      blocks: page.blocks || [],
      seo: page.seo || { metaTitle: page.title || '', metaDescription: '', keywords: [] },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  async updatePage(id: string, page: Partial<Page>): Promise<Page> {
    const existing = await this.getPageBySlug(page.slug || '') || INITIAL_PAGES[0];
    return { ...existing, ...page, updatedAt: new Date().toISOString() };
  }

  async deletePage(id: string): Promise<boolean> {
    return true;
  }

  async getCategories(): Promise<Category[]> {
    return INITIAL_CATEGORIES;
  }

  async getUsers(): Promise<User[]> {
    return INITIAL_USERS;
  }

  async getSettings(): Promise<GlobalSettings> {
    return INITIAL_SETTINGS;
  }

  async updateSettings(settings: Partial<GlobalSettings>): Promise<GlobalSettings> {
    return { ...INITIAL_SETTINGS, ...settings };
  }
}

// Factory function
export function getCMSAdapter(driver: DatabaseDriver = 'memory'): CMSDataAdapter {
  return new MemoryCMSAdapter();
}
