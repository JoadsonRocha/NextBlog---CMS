export type UserRole = 'admin' | 'editor' | 'visitor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  avatarUrl?: string;
  bio?: string;
  status?: 'active' | 'inactive';
  createdAt?: string;
}

export type AdminView =
  | 'dashboard'
  | 'editor'
  | 'posts'
  | 'pages'
  | 'reusable-blocks'
  | 'media'
  | 'comments'
  | 'appearance'
  | 'plugins'
  | 'users'
  | 'tools'
  | 'settings'
  | 'api-explorer'
  | 'database'
  | 'deploy'
  | 'docs'
  | 'public-site';

export interface Comment {
  id: string;
  postId: string;
  postTitle: string;
  authorName: string;
  authorEmail: string;
  authorAvatar?: string;
  content: string;
  status: 'approved' | 'pending' | 'spam' | 'trash';
  createdAt: string;
  response?: string;
}

export interface Theme {
  id: string;
  name: string;
  slug: string;
  description: string;
  author: string;
  version: string;
  screenshot: string;
  primaryColor: string;
  fontFamily: 'Inter' | 'Plus Jakarta Sans' | 'Outfit' | 'Playfair Display' | 'Merriweather';
  tags: string[];
  isActive: boolean;
}

export interface PluginItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  author: string;
  version: string;
  icon: string;
  isActive: boolean;
  category: 'seo' | 'ecommerce' | 'performance' | 'ai' | 'utilities' | 'forms';
  settingsUrl?: string;
  rating: number;
  activeInstalls: string;
  isPro?: boolean;
}

export interface MenuItem {
  id: string;
  label: string;
  url: string;
  isExternal?: boolean;
  target?: '_self' | '_blank';
}

export type BlockType =
  | 'hero'
  | 'heading'
  | 'paragraph'
  | 'quote'
  | 'image'
  | 'gallery'
  | 'video'
  | 'button'
  | 'columns'
  | 'code'
  | 'table'
  | 'pricing'
  | 'testimonials'
  | 'faq'
  | 'cta_banner'
  | 'newsletter'
  | 'stats'
  | 'divider'
  | 'spacer'
  | 'custom_html'
  | 'callout'
  | 'timeline'
  | 'tabs'
  | 'poll'
  | 'embed'
  | 'audio';

export interface BlockStyles {
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  textColor?: string;
  backgroundColor?: string;
  paddingY?: 'none' | 'small' | 'medium' | 'large';
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  border?: boolean;
  borderColor?: string;
  maxWidth?: 'narrow' | 'medium' | 'wide' | 'full';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  animation?: 'none' | 'fade-in' | 'slide-up' | 'zoom-in';
}

export interface ContentBlock {
  id: string;
  type: BlockType;
  content: Record<string, any>;
  styles?: BlockStyles;
  isReusable?: boolean;
  reusableTitle?: string;
  reusableId?: string;
}

export interface ReusableBlock {
  id: string;
  title: string;
  category: 'content' | 'marketing' | 'layout' | 'commerce' | 'interactive';
  description: string;
  block: ContentBlock;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface SEOMetadata {
  metaTitle: string;
  metaDescription: string;
  ogImage?: string;
  keywords: string[];
  canonicalUrl?: string;
  noIndex?: boolean;
}

export type PostStatus = 'published' | 'draft' | 'in_review' | 'approved' | 'scheduled' | 'archived';

export interface ContentRevision {
  id: string;
  itemId: string;
  itemType: 'post' | 'page';
  version: number;
  title: string;
  authorName: string;
  authorAvatar?: string;
  changeSummary: string;
  blocksSnapshot: ContentBlock[];
  createdAt: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  focalPoint?: { x: number; y: number };
  status: PostStatus;
  editorialNotes?: string;
  category: string;
  tags: string[];
  authorId: string;
  authorName: string;
  authorAvatar: string;
  blocks: ContentBlock[];
  seo: SEOMetadata;
  views: number;
  readingTime: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  description: string;
  template: 'default' | 'fullwidth' | 'landing';
  status: 'published' | 'draft' | 'in_review' | 'approved' | 'archived';
  isHomePage: boolean;
  parentId?: string;
  parentSlug?: string;
  order?: number;
  orderIndex?: number;
  blocks: ContentBlock[];
  seo: SEOMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  count: number;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'document';
  size: string;
  dimensions?: string;
  mimeType: string;
  altText: string;
  createdAt: string;
}

export interface GlobalSettings {
  siteName: string;
  siteTitle?: string;
  siteDescription: string;
  siteTagline?: string;
  siteLogo?: string;
  siteFavicon?: string;
  primaryColor?: string;
  fontFamily?: 'Inter' | 'Plus Jakarta Sans' | 'Outfit' | 'Playfair Display' | 'Merriweather';
  allowComments?: boolean;
  showAuthorBio?: boolean;
  defaultLanguage?: string;
  databaseProvider: 'postgresql' | 'mongodb' | 'sqlite' | 'localstorage' | 'memory';
  dbType?: 'postgresql' | 'mongodb' | 'sqlite' | 'memory';
  databaseUrl?: string;
  apiEnabled?: boolean;
  graphqlEnabled?: boolean;
  aiModel?: string;
}

export interface DeploymentConfig {
  platform: 'vercel' | 'railway' | 'docker' | 'render';
  repoUrl?: string;
  environment: 'production' | 'preview' | 'development';
  lastDeployedAt?: string;
  buildStatus: 'ready' | 'building' | 'deployed' | 'failed';
  status?: string;
  url?: string;
  branch?: string;
  commit?: string;
  customDomain?: string;
}
