// NextBlog CMS - Mongoose MongoDB Schemas
// Modelagem NoSQL com suporte nativo a subdocumentos flexíveis

export interface IMongoosePost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  featuredImage?: string;
  status: 'published' | 'draft' | 'scheduled';
  category?: string;
  tags: string[];
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  readingTime: string;
  views: number;
  blocks: Array<{
    id: string;
    type: string;
    content: Record<string, any>;
    styles?: Record<string, any>;
    isReusable?: boolean;
  }>;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
    keywords?: string[];
  };
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const PostMongooseSchema = {
  slug: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true },
  excerpt: { type: String },
  featuredImage: { type: String },
  status: { type: String, enum: ['published', 'draft', 'scheduled'], default: 'draft', index: true },
  category: { type: String, index: true },
  tags: [{ type: String, index: true }],
  authorId: { type: String, required: true },
  authorName: { type: String, required: true },
  authorAvatar: { type: String },
  readingTime: { type: String, default: '3 min' },
  views: { type: Number, default: 0 },
  blocks: [
    {
      id: String,
      type: { type: String, required: true },
      content: { type: Object, default: {} },
      styles: { type: Object, default: {} },
      isReusable: Boolean,
    },
  ],
  seo: {
    metaTitle: String,
    metaDescription: String,
    ogImage: String,
    keywords: [String],
  },
  publishedAt: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
};
