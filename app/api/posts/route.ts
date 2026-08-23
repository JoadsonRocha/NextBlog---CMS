import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_POSTS } from '@/lib/initial-data';

// In-memory fallback / mock store for headless API consumption
let postsStore = [...INITIAL_POSTS];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const category = searchParams.get('category');
  const slug = searchParams.get('slug');
  const limit = searchParams.get('limit');

  let results = [...postsStore];

  if (slug) {
    const single = results.find((p) => p.slug === slug);
    if (!single) {
      return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 });
    }
    return NextResponse.json({ data: single });
  }

  if (status) {
    results = results.filter((p) => p.status === status);
  }

  if (category) {
    results = results.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  if (limit) {
    results = results.slice(0, parseInt(limit, 10));
  }

  return NextResponse.json({
    meta: {
      total: results.length,
      timestamp: new Date().toISOString(),
      version: 'v1',
    },
    data: results,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newPost = {
      id: `post_${Date.now()}`,
      slug: body.slug || `post-${Date.now()}`,
      title: body.title || 'Novo Post Sem Título',
      excerpt: body.excerpt || '',
      featuredImage: body.featuredImage || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
      status: body.status || 'draft',
      category: body.category || 'Tecnologia & Dev',
      tags: body.tags || [],
      authorId: body.authorId || 'usr_admin',
      authorName: body.authorName || 'Ana Silva',
      authorAvatar: body.authorAvatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      blocks: body.blocks || [],
      seo: body.seo || {
        metaTitle: body.title || '',
        metaDescription: body.excerpt || '',
        keywords: body.tags || [],
      },
      views: 0,
      readingTime: body.readingTime || '3 min',
      publishedAt: body.status === 'published' ? new Date().toISOString() : '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    postsStore.unshift(newPost);

    return NextResponse.json({
      success: true,
      message: 'Post criado com sucesso via REST API',
      data: newPost,
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Erro ao criar post' }, { status: 400 });
  }
}
