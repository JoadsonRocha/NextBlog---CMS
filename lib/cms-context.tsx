'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Post,
  Page,
  ReusableBlock,
  MediaItem,
  Category,
  User,
  UserRole,
  GlobalSettings,
  ContentBlock,
  BlockType,
  DeploymentConfig,
  AdminView,
  Comment,
  Theme,
  PluginItem,
  MenuItem,
  ContentRevision,
} from '@/types/cms';
import {
  INITIAL_POSTS,
  INITIAL_PAGES,
  INITIAL_REUSABLE_BLOCKS,
  INITIAL_MEDIA,
  INITIAL_CATEGORIES,
  INITIAL_USERS,
  INITIAL_SETTINGS,
  INITIAL_COMMENTS,
  INITIAL_THEMES,
  INITIAL_PLUGINS,
  INITIAL_MENUS,
} from '@/lib/initial-data';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
}

export interface PublicRoute {
  type: 'page' | 'post' | 'blog' | 'docs';
  slug?: string;
}

interface CMSContextType {
  // Navigation & User
  activeView: AdminView;
  setActiveView: (view: AdminView) => void;
  currentUser: User;
  setCurrentUser: (user: User) => void;
  setUserRole: (role: UserRole) => void;
  switchUserRole: (role: UserRole) => void;

  // Installation & Authentication (WordPress Style)
  isInstalled: boolean;
  setIsInstalled: (val: boolean) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
  completeInstallation: (config: {
    siteName: string;
    siteTagline?: string;
    dbProvider: string;
    dbUrl?: string;
    adminName: string;
    adminEmail: string;
    adminPassword?: string;
    themeId?: string;
    loadDemo?: boolean;
  }) => void;
  login: (email: string, password?: string) => boolean;
  logout: () => void;

  // Currently Editing Item
  editingTarget: { type: 'post' | 'page'; id: string } | null;
  setEditingTarget: (target: { type: 'post' | 'page'; id: string } | null) => void;
  startEditingPost: (postId: string) => void;
  startEditingPage: (pageId: string) => void;
  createNewPost: () => string;
  createNewPage: () => string;
  createQuickDraft: (title: string, content: string) => string;

  // Active public page routing
  publicRoute: PublicRoute;
  setPublicRoute: (route: PublicRoute) => void;

  // Data Stores
  posts: Post[];
  pages: Page[];
  reusableBlocks: ReusableBlock[];
  media: MediaItem[];
  categories: Category[];
  users: User[];
  comments: Comment[];
  themes: Theme[];
  plugins: PluginItem[];
  menus: MenuItem[];
  settings: GlobalSettings;
  deployment: DeploymentConfig;
  revisions: ContentRevision[];

  // Revisions & Version History Actions
  createRevisionSnapshot: (itemId: string, itemType: 'post' | 'page', changeSummary?: string) => void;
  restoreRevision: (revisionId: string) => void;

  // Post Actions
  updatePost: (id: string, updates: Partial<Post>) => void;
  deletePost: (id: string) => void;
  duplicatePost: (id: string) => void;

  // Page Actions
  updatePage: (id: string, updates: Partial<Page>) => void;
  deletePage: (id: string) => void;
  duplicatePage: (id: string) => void;

  // Comment Actions
  approveComment: (id: string) => void;
  unapproveComment: (id: string) => void;
  markSpamComment: (id: string) => void;
  deleteComment: (id: string) => void;
  replyComment: (id: string, response: string) => void;
  addComment: (postId: string, postTitle: string, authorName: string, authorEmail: string, content: string) => void;

  // Theme Actions
  activateTheme: (id: string) => void;

  // Plugin Actions
  togglePlugin: (id: string) => void;

  // Menu Actions
  addMenuItem: (label: string, url: string) => void;
  deleteMenuItem: (id: string) => void;

  // Block Actions for Active Editor
  activeBlocks: ContentBlock[];
  addBlock: (type: BlockType, index?: number, customContent?: any) => string;
  insertReusableBlock: (reusableId: string, index?: number) => void;
  updateBlock: (blockId: string, content: any, styles?: any) => void;
  removeBlock: (blockId: string) => void;
  moveBlock: (blockId: string, direction: 'up' | 'down') => void;
  reorderBlocks: (startIndex: number, endIndex: number) => void;
  duplicateBlock: (blockId: string) => void;
  saveAsReusableBlock: (blockId: string, title: string, category: ReusableBlock['category']) => void;

  // Reusable Blocks Actions
  deleteReusableBlock: (id: string) => void;
  updateReusableBlock: (id: string, updates: Partial<ReusableBlock>) => void;

  // Media Actions
  addMediaItem: (item: Omit<MediaItem, 'id' | 'createdAt'>) => void;
  deleteMediaItem: (id: string) => void;

  // User Actions
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;

  // Category Actions
  addCategory: (cat: Omit<Category, 'id' | 'count'>) => void;
  deleteCategory: (id: string) => void;

  // Settings & Deploy
  updateSettings: (newSettings: Partial<GlobalSettings>) => void;
  triggerDeployment: (platform: DeploymentConfig['platform']) => Promise<void>;
  triggerDeploy: () => Promise<void>;

  // Data management
  resetToDemoData: () => void;
  exportJSONBackup: () => void;
  importJSONBackup: (jsonData: string) => boolean;

  // Toast
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

let toastCounter = 0;
let blockCounter = 0;
let postCounter = 0;
let pageCounter = 0;

export function CMSProvider({ children }: { children: ReactNode }) {
  // Check auth state from localStorage (default false for anonymous/guests)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nextblog_is_authenticated');
      return saved === 'true';
    }
    return false;
  });

  // Default view is public-site for visitors/guests
  const [activeView, setActiveView] = useState<AdminView>(() => {
    if (typeof window !== 'undefined') {
      const isAuth = localStorage.getItem('nextblog_is_authenticated') === 'true';
      if (isAuth) {
        const savedView = localStorage.getItem('nextblog_active_view');
        return (savedView as AdminView) || 'dashboard';
      }
    }
    return 'public-site';
  });

  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USERS[0]);

  // Installation Status (defaults to true or saved state)
  const [isInstalled, setIsInstalled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nextblog_is_installed');
      if (saved === 'false') return false;
      return true;
    }
    return true;
  });

  const [editingTarget, setEditingTarget] = useState<{ type: 'post' | 'page'; id: string } | null>({
    type: 'post',
    id: INITIAL_POSTS[0].id,
  });
  const [publicRoute, setPublicRoute] = useState<PublicRoute>({
    type: 'page',
    slug: 'home',
  });

  const [posts, setPosts] = useState<Post[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('nextblock_cms_state');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.posts) return parsed.posts;
        }
      } catch (e) {
        console.warn(e);
      }
    }
    return INITIAL_POSTS;
  });

  const [pages, setPages] = useState<Page[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('nextblock_cms_state');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.pages) return parsed.pages;
        }
      } catch (e) {
        console.warn(e);
      }
    }
    return INITIAL_PAGES;
  });

  const [reusableBlocks, setReusableBlocks] = useState<ReusableBlock[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('nextblock_cms_state');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.reusableBlocks) return parsed.reusableBlocks;
        }
      } catch (e) {
        console.warn(e);
      }
    }
    return INITIAL_REUSABLE_BLOCKS;
  });

  const [media, setMedia] = useState<MediaItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('nextblock_cms_state');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.media) return parsed.media;
        }
      } catch (e) {
        console.warn(e);
      }
    }
    return INITIAL_MEDIA;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('nextblock_cms_state');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.categories) return parsed.categories;
        }
      } catch (e) {
        console.warn(e);
      }
    }
    return INITIAL_CATEGORIES;
  });

  const [comments, setComments] = useState<Comment[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('nextblock_cms_state');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.comments) return parsed.comments;
        }
      } catch (e) {
        console.warn(e);
      }
    }
    return INITIAL_COMMENTS;
  });

  const [themes, setThemes] = useState<Theme[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('nextblock_cms_state');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.themes) return parsed.themes;
        }
      } catch (e) {
        console.warn(e);
      }
    }
    return INITIAL_THEMES;
  });

  const [plugins, setPlugins] = useState<PluginItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('nextblock_cms_state');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.plugins) return parsed.plugins;
        }
      } catch (e) {
        console.warn(e);
      }
    }
    return INITIAL_PLUGINS;
  });

  const [menus, setMenus] = useState<MenuItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('nextblock_cms_state');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.menus) return parsed.menus;
        }
      } catch (e) {
        console.warn(e);
      }
    }
    return INITIAL_MENUS;
  });

  const [settings, setSettings] = useState<GlobalSettings>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('nextblock_cms_state');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.settings) return parsed.settings;
        }
      } catch (e) {
        console.warn(e);
      }
    }
    return INITIAL_SETTINGS;
  });

  const [deployment, setDeployment] = useState<DeploymentConfig>({
    platform: 'vercel',
    environment: 'production',
    buildStatus: 'ready',
    status: 'online',
    url: 'https://nextblock-cms-production.vercel.app',
    branch: 'main',
    commit: '7b9e4a1 - Build otimizado para SSR/ISR',
    lastDeployedAt: '2026-03-22T10:00:00Z',
    customDomain: 'nextblock-cms.app',
  });

  const [revisions, setRevisions] = useState<ContentRevision[]>([
    {
      id: 'rev_1_initial',
      itemId: 'post_1',
      itemType: 'post',
      version: 1,
      title: 'O Futuro dos CMS Headless e Next.js em 2026',
      authorName: 'Ana Silva',
      changeSummary: 'Versão inicial com introdução e blocos de código',
      blocksSnapshot: INITIAL_POSTS[0].blocks,
      createdAt: '2026-03-20T14:30:00Z',
    },
    {
      id: 'rev_2_enhancement',
      itemId: 'post_1',
      itemType: 'post',
      version: 2,
      title: 'O Futuro dos CMS Headless e Next.js em 2026',
      authorName: 'Carlos Mendes',
      changeSummary: 'Adicionados blocos de FAQ interativo e Newsletter',
      blocksSnapshot: INITIAL_POSTS[0].blocks,
      createdAt: '2026-03-22T09:15:00Z',
    },
  ]);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to localStorage
  useEffect(() => {
    try {
      const payload = {
        posts,
        pages,
        reusableBlocks,
        media,
        categories,
        settings,
        users,
        comments,
        themes,
        plugins,
        menus,
        revisions,
      };
      localStorage.setItem('nextblock_cms_state', JSON.stringify(payload));
    } catch (e) {
      console.warn('Erro ao salvar no localStorage:', e);
    }
  }, [posts, pages, reusableBlocks, media, categories, settings, users, comments, themes, plugins, menus, revisions]);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    toastCounter += 1;
    const id = `toast_${toastCounter}_${Date.now()}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const setUserRole = (role: UserRole) => {
    const found = users.find((u) => u.role === role);
    if (found) {
      setCurrentUser(found);
      addToast({
        type: 'info',
        title: `Papel alterado para: ${role.toUpperCase()}`,
        message: `Você agora está navegando como ${found.name} (${found.role}).`,
      });
    } else {
      setCurrentUser((prev) => ({ ...prev, role }));
      addToast({
        type: 'info',
        title: `Papel alterado para: ${role.toUpperCase()}`,
      });
    }
  };

  const switchUserRole = setUserRole;

  const startEditingPost = (postId: string) => {
    setEditingTarget({ type: 'post', id: postId });
    setActiveView('editor');
  };

  const startEditingPage = (pageId: string) => {
    setEditingTarget({ type: 'page', id: pageId });
    setActiveView('editor');
  };

  const createNewPost = () => {
    postCounter += 1;
    const newId = `post_${postCounter}_${Date.now()}`;
    const newPost: Post = {
      id: newId,
      slug: `novo-post-${postCounter}`,
      title: 'Novo Post Sem Título',
      excerpt: 'Escreva um resumo cativante aqui...',
      featuredImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
      status: 'draft',
      category: categories[0]?.name || 'Tecnologia & Dev',
      tags: ['Next.js', 'CMS'],
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar || currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      views: 0,
      readingTime: '3 min',
      publishedAt: '2026-03-22T10:00:00Z',
      createdAt: '2026-03-22T10:00:00Z',
      updatedAt: '2026-03-22T10:00:00Z',
      seo: {
        metaTitle: 'Novo Post | NextBlock',
        metaDescription: 'Resumo do novo post para motores de busca.',
        keywords: ['artigo', 'novo'],
      },
      blocks: [
        {
          id: `blk_${postCounter}_1`,
          type: 'heading',
          content: { level: 2, text: 'Introdução ao Artigo' },
          styles: { textAlign: 'left' },
        },
        {
          id: `blk_${postCounter}_2`,
          type: 'paragraph',
          content: { text: 'Comece a escrever seu conteúdo aqui ou use o Assistente IA para gerar seções completas...' },
        },
      ],
    };

    setPosts((prev) => [newPost, ...prev]);
    setEditingTarget({ type: 'post', id: newId });
    setActiveView('editor');
    addToast({ type: 'success', title: 'Post criado!', message: 'Pronto para edição visual com blocos.' });
    return newId;
  };

  const createNewPage = () => {
    pageCounter += 1;
    const newId = `page_${pageCounter}_${Date.now()}`;
    const newPage: Page = {
      id: newId,
      slug: `nova-pagina-${pageCounter}`,
      title: 'Nova Página',
      description: 'Descrição da nova página para visitantes.',
      template: 'default',
      status: 'draft',
      isHomePage: false,
      order: pages.length + 1,
      createdAt: '2026-03-22T10:00:00Z',
      updatedAt: '2026-03-22T10:00:00Z',
      seo: {
        metaTitle: 'Nova Página | NextBlock',
        metaDescription: 'Descrição para motores de busca.',
        keywords: ['pagina'],
      },
      blocks: [
        {
          id: `blk_${pageCounter}_h`,
          type: 'hero',
          content: {
            badge: 'PÁGINA DINÂMICA',
            title: 'Título da Sua Nova Página',
            subtitle: 'Personalize este cabeçalho ou adicione outros blocos abaixo.',
            primaryCtaText: 'Ação Principal',
            primaryCtaUrl: '#',
          },
          styles: { paddingY: 'large', textAlign: 'center' },
        },
      ],
    };

    setPages((prev) => [...prev, newPage]);
    setEditingTarget({ type: 'page', id: newId });
    setActiveView('editor');
    addToast({ type: 'success', title: 'Página criada!', message: 'Personalize os blocos e layout.' });
    return newId;
  };

  // Active blocks accessor
  const currentEditingItem = editingTarget
    ? editingTarget.type === 'post'
      ? posts.find((p) => p.id === editingTarget.id)
      : pages.find((p) => p.id === editingTarget.id)
    : null;

  const activeBlocks: ContentBlock[] = currentEditingItem ? currentEditingItem.blocks : [];

  const updatePost = (id: string, updates: Partial<Post>) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates, updatedAt: '2026-03-22T10:00:00Z' } : p))
    );
  };

  const deletePost = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    addToast({ type: 'info', title: 'Post removido' });
  };

  const duplicatePost = (id: string) => {
    const target = posts.find((p) => p.id === id);
    if (!target) return;
    postCounter += 1;
    const duplicated: Post = {
      ...target,
      id: `post_dup_${postCounter}`,
      slug: `${target.slug}-copia-${postCounter}`,
      title: `${target.title} (Cópia)`,
      status: 'draft',
      views: 0,
      createdAt: '2026-03-22T10:00:00Z',
      updatedAt: '2026-03-22T10:00:00Z',
    };
    setPosts((prev) => [duplicated, ...prev]);
    addToast({ type: 'success', title: 'Post duplicado com sucesso!' });
  };

  const createRevisionSnapshot = (itemId: string, itemType: 'post' | 'page', changeSummary: string = 'Revisão salva') => {
    const item = itemType === 'post' ? posts.find((p) => p.id === itemId) : pages.find((p) => p.id === itemId);
    if (!item) return;

    const previousRevs = revisions.filter((r) => r.itemId === itemId);
    const newVersion = previousRevs.length + 1;

    const newRev: ContentRevision = {
      id: `rev_${Date.now()}_v${newVersion}`,
      itemId,
      itemType,
      version: newVersion,
      title: item.title,
      authorName: currentUser.name || 'Editor',
      authorAvatar: currentUser.avatar,
      changeSummary,
      blocksSnapshot: JSON.parse(JSON.stringify(item.blocks)),
      createdAt: new Date().toISOString(),
    };

    setRevisions((prev) => [newRev, ...prev]);
    addToast({ type: 'success', title: `Snapshot v${newVersion} salvo no histórico!`, message: 'Você pode restaurar esta versão a qualquer momento.' });
  };

  const restoreRevision = (revisionId: string) => {
    const rev = revisions.find((r) => r.id === revisionId);
    if (!rev) {
      addToast({ type: 'error', title: 'Revisão não encontrada.' });
      return;
    }

    if (rev.itemType === 'post') {
      setPosts((prev) =>
        prev.map((p) => (p.id === rev.itemId ? { ...p, title: rev.title, blocks: JSON.parse(JSON.stringify(rev.blocksSnapshot)), updatedAt: new Date().toISOString() } : p))
      );
    } else {
      setPages((prev) =>
        prev.map((pg) => (pg.id === rev.itemId ? { ...pg, title: rev.title, blocks: JSON.parse(JSON.stringify(rev.blocksSnapshot)), updatedAt: new Date().toISOString() } : pg))
      );
    }

    addToast({ type: 'success', title: `Versão v${rev.version} restaurada com sucesso!`, message: 'O conteúdo do editor foi revertido para o snapshot selecionado.' });
  };

  const updatePage = (id: string, updates: Partial<Page>) => {
    setPages((prev) =>
      prev.map((pg) => (pg.id === id ? { ...pg, ...updates, updatedAt: '2026-03-22T10:00:00Z' } : pg))
    );
  };

  const deletePage = (id: string) => {
    setPages((prev) => prev.filter((pg) => pg.id !== id));
    addToast({ type: 'info', title: 'Página removida' });
  };

  const duplicatePage = (id: string) => {
    const target = pages.find((pg) => pg.id === id);
    if (!target) return;
    pageCounter += 1;
    const duplicated: Page = {
      ...target,
      id: `page_dup_${pageCounter}`,
      slug: `${target.slug}-copia-${pageCounter}`,
      title: `${target.title} (Cópia)`,
      status: 'draft',
      isHomePage: false,
      createdAt: '2026-03-22T10:00:00Z',
      updatedAt: '2026-03-22T10:00:00Z',
    };
    setPages((prev) => [...prev, duplicated]);
    addToast({ type: 'success', title: 'Página duplicada com sucesso!' });
  };

  // Helper to commit blocks to active item
  const setBlocksForCurrentItem = (newBlocks: ContentBlock[]) => {
    if (!editingTarget) return;
    if (editingTarget.type === 'post') {
      updatePost(editingTarget.id, { blocks: newBlocks });
    } else {
      updatePage(editingTarget.id, { blocks: newBlocks });
    }
  };

  const getDefaultContentForType = (type: BlockType): Record<string, any> => {
    switch (type) {
      case 'heading':
        return { level: 2, text: 'Novo Título de Seção' };
      case 'paragraph':
        return { text: 'Este é um novo parágrafo. Clique duas vezes para editar o texto ou use a barra lateral para estilizar.' };
      case 'quote':
        return { quote: 'Uma citação inspiradora que reforça a credibilidade do seu conteúdo.', author: 'Nome do Autor', role: 'Cargo ou Empresa' };
      case 'image':
        return { url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80', caption: 'Legenda explicativa da imagem', altText: 'Imagem em destaque' };
      case 'gallery':
        return {
          images: [
            { url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80', caption: 'Foto 1' },
            { url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80', caption: 'Foto 2' },
            { url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&auto=format&fit=crop&q=80', caption: 'Foto 3' },
          ],
          columns: 3,
        };
      case 'video':
        return { url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Vídeo Demonstrativo', caption: 'Apresentação interativa dos recursos' };
      case 'button':
        return { text: 'Clique Aqui Agora', url: '#', variant: 'primary', size: 'medium', align: 'center' };
      case 'columns':
        return {
          title: 'Recursos Principais',
          subtitle: 'Visão geral das funcionalidades modulares',
          columnsCount: 3,
          items: [
            { icon: 'Zap', title: 'Ultra Rápido', text: 'Renderização em milissegundos com Next.js App Router.' },
            { icon: 'Shield', title: '100% Seguro', text: 'Sem injeções ou vulnerabilidades PHP tradicionais.' },
            { icon: 'Layers', title: 'Modular', text: 'Combine blocos livremente para criar qualquer layout.' },
          ],
        };
      case 'code':
        return { language: 'typescript', code: `// Exemplo de código interativo\nconst greeting = "Hello NextBlock CMS";\nconsole.log(greeting);` };
      case 'table':
        return {
          headers: ['Recurso', 'Plano Básico', 'Plano Pro'],
          rows: [
            ['Editor Drag & Drop', 'Incluso', 'Incluso'],
            ['Assistente IA', '3 créditos', 'Ilimitado'],
            ['API GraphQL', 'Não incluso', 'Incluso'],
          ],
        };
      case 'pricing':
        return {
          title: 'Escolha o Plano Ideal',
          subtitle: 'Preços claros e justos para todas as necessidades',
          plans: [
            { name: 'Starter', price: 'R$ 39', period: '/mês', description: 'Para blogs individuais.', features: ['1 Site', 'Editor Visual', 'SSL Grátis'], buttonText: 'Começar', isPopular: false },
            { name: 'Profissional', price: 'R$ 99', period: '/mês', description: 'Para equipes e agências.', features: ['Sites ilimitados', 'IA Ilimitada', 'API REST & GraphQL', 'Suporte 24/7'], buttonText: 'Assinar Pro', isPopular: true },
          ],
        };
      case 'testimonials':
        return {
          title: 'O Que Nossos Clientes Dizem',
          subtitle: 'Histórias reais de quem utiliza nossa plataforma todos os dias',
          items: [
            { quote: 'O NextBlock reduziu nosso tempo de publicação pela metade e nossos Core Web Vitals bateram 100.', author: 'Juliana Paes', role: 'Gerente de Produto', company: 'TechFlow' },
            { quote: 'A facilidade do WordPress aliada ao poder do Next.js. O melhor CMS que já experimentei.', author: 'Lucas Rocha', role: 'Head de Engenharia', company: 'Digital Hub' },
          ],
        };
      case 'faq':
        return {
          title: 'Dúvidas Frequentes',
          subtitle: 'Respostas para as perguntas mais comuns',
          items: [
            { question: 'Como funciona o deploy?', answer: 'Com 1 clique na Vercel ou Railway através das variáveis de ambiente integradas.' },
            { question: 'Posso usar meus próprios componentes React?', answer: 'Sim! A arquitetura modular do NextBlock permite registrar novos blocos React em minutos.' },
          ],
        };
      case 'cta_banner':
        return {
          tagline: 'OFERTA ESPECIAL',
          title: 'Transforme seu fluxo de trabalho hoje mesmo',
          description: 'Cadastre-se gratuitamente e aproveite todos os recursos do editor visual.',
          primaryButtonText: 'Criar Conta Grátis',
          primaryButtonUrl: '#',
          styleVariant: 'gradient',
        };
      case 'newsletter':
        return {
          title: 'Assine nossa Newsletter',
          description: 'Conteúdo de alta relevância enviado semanalmente para seu e-mail.',
          placeholder: 'Digite seu e-mail...',
          buttonText: 'Inscrever-se',
          privacyNote: 'Respeitamos sua privacidade.',
        };
      case 'stats':
        return {
          items: [
            { label: 'Projetos Criados', value: '10.000+', description: 'Em mais de 40 países' },
            { label: 'Satisfação', value: '99.4%', description: 'Avaliação dos desenvolvedores' },
          ],
        };
      case 'divider':
        return { style: 'solid', thickness: 'thin' };
      case 'spacer':
        return { height: '40px' };
      case 'custom_html':
        return { html: '<div class="p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 font-medium">Bloco customizado HTML/JSX</div>' };
      case 'hero':
      default:
        return {
          badge: 'DESTAQUE',
          title: 'Título Hero Impactante',
          subtitle: 'Subtítulo persuasivo para prender a atenção do visitante.',
          primaryCtaText: 'Saiba Mais',
          primaryCtaUrl: '#',
        };
    }
  };

  const addBlock = (type: BlockType, index?: number, customContent?: any) => {
    blockCounter += 1;
    const newBlock: ContentBlock = {
      id: `blk_${blockCounter}_${type}`,
      type,
      content: customContent || getDefaultContentForType(type),
      styles: {
        paddingY: 'medium',
        textAlign: 'left',
      },
    };

    const nextBlocks = [...activeBlocks];
    if (typeof index === 'number') {
      nextBlocks.splice(index, 0, newBlock);
    } else {
      nextBlocks.push(newBlock);
    }

    setBlocksForCurrentItem(nextBlocks);
    addToast({ type: 'success', title: `Bloco "${type}" adicionado!` });
    return newBlock.id;
  };

  const insertReusableBlock = (reusableId: string, index?: number) => {
    const found = reusableBlocks.find((r) => r.id === reusableId);
    if (!found) return;

    blockCounter += 1;
    const clonedBlock: ContentBlock = {
      ...found.block,
      id: `blk_reuse_${blockCounter}`,
      isReusable: true,
      reusableId: found.id,
      reusableTitle: found.title,
    };

    const nextBlocks = [...activeBlocks];
    if (typeof index === 'number') {
      nextBlocks.splice(index, 0, clonedBlock);
    } else {
      nextBlocks.push(clonedBlock);
    }

    setBlocksForCurrentItem(nextBlocks);
    setReusableBlocks((prev) =>
      prev.map((r) => (r.id === reusableId ? { ...r, usageCount: r.usageCount + 1 } : r))
    );
    addToast({ type: 'success', title: `Bloco reutilizável "${found.title}" inserido!` });
  };

  const updateBlock = (blockId: string, content: any, styles?: any) => {
    const nextBlocks = activeBlocks.map((b) => {
      if (b.id === blockId) {
        return {
          ...b,
          content: { ...b.content, ...content },
          styles: styles ? { ...b.styles, ...styles } : b.styles,
        };
      }
      return b;
    });
    setBlocksForCurrentItem(nextBlocks);
  };

  const removeBlock = (blockId: string) => {
    const nextBlocks = activeBlocks.filter((b) => b.id !== blockId);
    setBlocksForCurrentItem(nextBlocks);
    addToast({ type: 'info', title: 'Bloco removido' });
  };

  const moveBlock = (blockId: string, direction: 'up' | 'down') => {
    const idx = activeBlocks.findIndex((b) => b.id === blockId);
    if (idx === -1) return;
    if (direction === 'up' && idx === 0) return;
    if (direction === 'down' && idx === activeBlocks.length - 1) return;

    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    const nextBlocks = [...activeBlocks];
    const [moved] = nextBlocks.splice(idx, 1);
    nextBlocks.splice(targetIdx, 0, moved);
    setBlocksForCurrentItem(nextBlocks);
  };

  const reorderBlocks = (startIndex: number, endIndex: number) => {
    const nextBlocks = [...activeBlocks];
    const [moved] = nextBlocks.splice(startIndex, 1);
    nextBlocks.splice(endIndex, 0, moved);
    setBlocksForCurrentItem(nextBlocks);
  };

  const duplicateBlock = (blockId: string) => {
    const idx = activeBlocks.findIndex((b) => b.id === blockId);
    if (idx === -1) return;
    const original = activeBlocks[idx];
    blockCounter += 1;
    const duplicated: ContentBlock = {
      ...original,
      id: `blk_dup_${blockCounter}`,
      content: JSON.parse(JSON.stringify(original.content)),
    };
    const nextBlocks = [...activeBlocks];
    nextBlocks.splice(idx + 1, 0, duplicated);
    setBlocksForCurrentItem(nextBlocks);
    addToast({ type: 'success', title: 'Bloco duplicado com sucesso' });
  };

  const saveAsReusableBlock = (blockId: string, title: string, category: ReusableBlock['category']) => {
    const targetBlock = activeBlocks.find((b) => b.id === blockId);
    if (!targetBlock) return;

    blockCounter += 1;
    const newReusable: ReusableBlock = {
      id: `reuse_${blockCounter}`,
      title: title || 'Bloco Reutilizável Customizado',
      category: category || 'content',
      description: `Criado a partir do editor visual em modo modular`,
      block: { ...targetBlock, isReusable: true },
      usageCount: 1,
      createdAt: '2026-03-22T10:00:00Z',
      updatedAt: '2026-03-22T10:00:00Z',
    };

    setReusableBlocks((prev) => [newReusable, ...prev]);
    addToast({ type: 'success', title: 'Salvo na Biblioteca de Blocos Reutilizáveis!' });
  };

  const deleteReusableBlock = (id: string) => {
    setReusableBlocks((prev) => prev.filter((r) => r.id !== id));
    addToast({ type: 'info', title: 'Bloco reutilizável excluído' });
  };

  const updateReusableBlock = (id: string, updates: Partial<ReusableBlock>) => {
    setReusableBlocks((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updates, updatedAt: '2026-03-22T10:00:00Z' } : r))
    );
  };

  const addMediaItem = (item: Omit<MediaItem, 'id' | 'createdAt'>) => {
    blockCounter += 1;
    const newItem: MediaItem = {
      ...item,
      id: `med_${blockCounter}`,
      createdAt: '2026-03-22T10:00:00Z',
    };
    setMedia((prev) => [newItem, ...prev]);
    addToast({ type: 'success', title: 'Mídia adicionada com sucesso!' });
  };

  const deleteMediaItem = (id: string) => {
    setMedia((prev) => prev.filter((m) => m.id !== id));
    addToast({ type: 'info', title: 'Arquivo de mídia excluído' });
  };

  const addUser = (user: Omit<User, 'id' | 'createdAt'>) => {
    blockCounter += 1;
    const newUser: User = {
      ...user,
      id: `usr_${blockCounter}`,
      createdAt: '2026-03-22T10:00:00Z',
    };
    setUsers((prev) => [...prev, newUser]);
    addToast({ type: 'success', title: 'Novo usuário cadastrado!' });
  };

  const updateUser = (id: string, updates: Partial<User>) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...updates } : u)));
    if (currentUser.id === id) {
      setCurrentUser((prev) => ({ ...prev, ...updates }));
    }
    addToast({ type: 'success', title: 'Usuário atualizado' });
  };

  const deleteUser = (id: string) => {
    if (users.length <= 1) {
      addToast({ type: 'error', title: 'Não é possível excluir o único usuário do sistema.' });
      return;
    }
    setUsers((prev) => prev.filter((u) => u.id !== id));
    addToast({ type: 'info', title: 'Usuário removido' });
  };

  const addCategory = (cat: Omit<Category, 'id' | 'count'>) => {
    blockCounter += 1;
    const newCat: Category = {
      ...cat,
      id: `cat_${blockCounter}`,
      count: 0,
    };
    setCategories((prev) => [...prev, newCat]);
    addToast({ type: 'success', title: 'Categoria adicionada' });
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    addToast({ type: 'info', title: 'Categoria excluída' });
  };

  const createQuickDraft = (title: string, content: string) => {
    postCounter += 1;
    const newId = `post_${postCounter}_${Date.now()}`;
    const newPost: Post = {
      id: newId,
      slug: `rascunho-rapido-${postCounter}`,
      title: title || `Rascunho Rápido #${postCounter}`,
      excerpt: content.slice(0, 120) || 'Rascunho rápido criado diretamente do painel...',
      featuredImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
      status: 'draft',
      category: categories[0]?.name || 'Geral',
      tags: ['Rascunho'],
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar || currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      views: 0,
      readingTime: '2 min',
      publishedAt: '2026-03-22T10:00:00Z',
      createdAt: '2026-03-22T10:00:00Z',
      updatedAt: '2026-03-22T10:00:00Z',
      seo: {
        metaTitle: title || 'Rascunho Rápido',
        metaDescription: content.slice(0, 150),
        keywords: ['rascunho'],
      },
      blocks: [
        {
          id: `blk_qd_${postCounter}_1`,
          type: 'paragraph',
          content: { text: content || 'Ideia inicial anotada no Rascunho Rápido do Painel.' },
        },
      ],
    };

    setPosts((prev) => [newPost, ...prev]);
    addToast({ type: 'success', title: 'Rascunho Rápido salvo!', message: `Post "${newPost.title}" criado como rascunho.` });
    return newId;
  };

  // Comment Actions
  const approveComment = (id: string) => {
    setComments((prev) => prev.map((c) => (c.id === id ? { ...c, status: 'approved' } : c)));
    addToast({ type: 'success', title: 'Comentário aprovado!' });
  };

  const unapproveComment = (id: string) => {
    setComments((prev) => prev.map((c) => (c.id === id ? { ...c, status: 'pending' } : c)));
    addToast({ type: 'info', title: 'Comentário retido para moderação.' });
  };

  const markSpamComment = (id: string) => {
    setComments((prev) => prev.map((c) => (c.id === id ? { ...c, status: 'spam' } : c)));
    addToast({ type: 'info', title: 'Comentário marcado como SPAM.' });
  };

  const deleteComment = (id: string) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
    addToast({ type: 'info', title: 'Comentário excluído.' });
  };

  const replyComment = (id: string, response: string) => {
    setComments((prev) => prev.map((c) => (c.id === id ? { ...c, response, status: 'approved' } : c)));
    addToast({ type: 'success', title: 'Resposta publicada com sucesso!' });
  };

  const addComment = (postId: string, postTitle: string, authorName: string, authorEmail: string, content: string) => {
    blockCounter += 1;
    const newComment: Comment = {
      id: `comm_${blockCounter}_${Date.now()}`,
      postId,
      postTitle,
      authorName: authorName || 'Visitante',
      authorEmail: authorEmail || 'visitante@exemplo.com',
      authorAvatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
      content,
      status: 'pending',
      createdAt: '2026-03-22T10:00:00Z',
    };
    setComments((prev) => [newComment, ...prev]);
    addToast({ type: 'success', title: 'Comentário enviado!', message: 'Aguardando aprovação da moderação.' });
  };

  // Theme Actions
  const activateTheme = (themeId: string) => {
    setThemes((prev) =>
      prev.map((t) => ({
        ...t,
        isActive: t.id === themeId,
      }))
    );
    const active = themes.find((t) => t.id === themeId);
    if (active) {
      setSettings((prev) => ({
        ...prev,
        primaryColor: active.primaryColor,
        fontFamily: active.fontFamily,
      }));
    }
    addToast({ type: 'success', title: 'Tema ativado com sucesso!' });
  };

  // Plugin Actions
  const togglePlugin = (pluginId: string) => {
    setPlugins((prev) =>
      prev.map((p) => {
        if (p.id === pluginId) {
          const nextActive = !p.isActive;
          addToast({
            type: nextActive ? 'success' : 'info',
            title: `Plugin ${p.name} ${nextActive ? 'ativado' : 'desativado'}!`,
          });
          return { ...p, isActive: nextActive };
        }
        return p;
      })
    );
  };

  // Menu Actions
  const addMenuItem = (label: string, url: string) => {
    blockCounter += 1;
    const newItem: MenuItem = {
      id: `menu_${blockCounter}`,
      label,
      url,
    };
    setMenus((prev) => [...prev, newItem]);
    addToast({ type: 'success', title: 'Item adicionado ao menu de navegação!' });
  };

  const deleteMenuItem = (id: string) => {
    setMenus((prev) => prev.filter((m) => m.id !== id));
    addToast({ type: 'info', title: 'Item removido do menu.' });
  };

  const updateSettings = (newSettings: Partial<GlobalSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    addToast({ type: 'success', title: 'Configurações salvas com sucesso!' });
  };

  const triggerDeployment = async (platform: DeploymentConfig['platform']) => {
    setDeployment((prev) => ({ ...prev, buildStatus: 'building', status: 'building', platform }));
    addToast({ type: 'info', title: `Iniciando build para ${platform.toUpperCase()}...` });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setDeployment((prev) => ({
      ...prev,
      buildStatus: 'deployed',
      status: 'online',
      lastDeployedAt: '2026-03-22T10:00:00Z',
    }));
    addToast({
      type: 'success',
      title: 'Deploy concluído com sucesso!',
      message: `Ambiente de produção atualizado em ${platform.toUpperCase()}.`,
    });
  };

  const triggerDeploy = async () => {
    await triggerDeployment(deployment.platform || 'vercel');
  };

  const resetToDemoData = () => {
    setPosts(INITIAL_POSTS);
    setPages(INITIAL_PAGES);
    setReusableBlocks(INITIAL_REUSABLE_BLOCKS);
    setMedia(INITIAL_MEDIA);
    setCategories(INITIAL_CATEGORIES);
    setUsers(INITIAL_USERS);
    setSettings(INITIAL_SETTINGS);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('nextblock_cms_state');
    }
    addToast({ type: 'info', title: 'Dados de demonstração restaurados com sucesso!' });
  };

  const exportJSONBackup = () => {
    const data = {
      exportVersion: '1.0',
      exportedAt: '2026-03-22T10:00:00Z',
      posts,
      pages,
      reusableBlocks,
      media,
      categories,
      users,
      settings,
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nextblock-cms-backup.json`;
    a.click();
    URL.revokeObjectURL(url);
    addToast({ type: 'success', title: 'Backup exportado com sucesso!' });
  };

  const importJSONBackup = (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.posts) setPosts(parsed.posts);
      if (parsed.pages) setPages(parsed.pages);
      if (parsed.reusableBlocks) setReusableBlocks(parsed.reusableBlocks);
      if (parsed.media) setMedia(parsed.media);
      if (parsed.categories) setCategories(parsed.categories);
      if (parsed.users) setUsers(parsed.users);
      if (parsed.settings) setSettings(parsed.settings);
      addToast({ type: 'success', title: 'Backup restaurado com sucesso!' });
      return true;
    } catch (e) {
      addToast({ type: 'error', title: 'Arquivo JSON inválido para restauração.' });
      return false;
    }
  };

  const completeInstallation = (config: {
    siteName: string;
    siteTagline?: string;
    dbProvider: string;
    dbUrl?: string;
    adminName: string;
    adminEmail: string;
    adminPassword?: string;
    themeId?: string;
    loadDemo?: boolean;
  }) => {
    setSettings((prev) => ({
      ...prev,
      siteName: config.siteName || prev.siteName,
      siteTagline: config.siteTagline || prev.siteTagline,
      databaseProvider: (config.dbProvider as any) || prev.databaseProvider,
      databaseUrl: config.dbUrl || prev.databaseUrl,
    }));

    const masterAdmin: User = {
      id: 'admin-master',
      name: config.adminName || 'Super Administrador',
      email: config.adminEmail || 'admin@nextblog.com',
      role: 'admin',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    };
    setUsers((prev) => [masterAdmin, ...prev.filter((u) => u.email !== masterAdmin.email)]);
    setCurrentUser(masterAdmin);

    if (config.themeId) {
      activateTheme(config.themeId);
    }

    setIsInstalled(true);
    setIsAuthenticated(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nextblog_is_installed', 'true');
      localStorage.setItem('nextblog_is_authenticated', 'true');
    }

    addToast({
      type: 'success',
      title: '🎉 Instalação Concluída!',
      message: `Bem-vindo ao NextBlog CMS, ${config.adminName}!`,
    });
  };

  const login = (email: string, password?: string) => {
    const foundUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (foundUser) {
      setCurrentUser(foundUser);
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('nextblog_is_authenticated', 'true');
      }
      addToast({
        type: 'success',
        title: 'Login efetuado com sucesso',
        message: `Olá, ${foundUser.name}!`,
      });
      return true;
    }
    if (email.includes('admin')) {
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('nextblog_is_authenticated', 'true');
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nextblog_is_authenticated', 'false');
    }
    setActiveView('public-site');
    addToast({
      type: 'info',
      title: 'Sessão Encerrada',
      message: 'Você saiu do painel administrativo.',
    });
  };

  return (
    <CMSContext.Provider
      value={{
        isInstalled,
        setIsInstalled,
        isAuthenticated,
        setIsAuthenticated,
        completeInstallation,
        login,
        logout,
        activeView,
        setActiveView,
        currentUser,
        setCurrentUser,
        setUserRole,
        switchUserRole,
        editingTarget,
        setEditingTarget,
        startEditingPost,
        startEditingPage,
        createNewPost,
        createNewPage,
        publicRoute,
        setPublicRoute,
        posts,
        pages,
        reusableBlocks,
        media,
        categories,
        users,
        comments,
        themes,
        plugins,
        menus,
        settings,
        deployment,
        revisions,
        createRevisionSnapshot,
        restoreRevision,
        updatePost,
        deletePost,
        duplicatePost,
        updatePage,
        deletePage,
        duplicatePage,
        createQuickDraft,
        approveComment,
        unapproveComment,
        markSpamComment,
        deleteComment,
        replyComment,
        addComment,
        activateTheme,
        togglePlugin,
        addMenuItem,
        deleteMenuItem,
        activeBlocks,
        addBlock,
        insertReusableBlock,
        updateBlock,
        removeBlock,
        moveBlock,
        reorderBlocks,
        duplicateBlock,
        saveAsReusableBlock,
        deleteReusableBlock,
        updateReusableBlock,
        addMediaItem,
        deleteMediaItem,
        addUser,
        updateUser,
        deleteUser,
        addCategory,
        deleteCategory,
        updateSettings,
        triggerDeployment,
        triggerDeploy,
        resetToDemoData,
        exportJSONBackup,
        importJSONBackup,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS deve ser usado dentro de um CMSProvider');
  }
  return context;
}
