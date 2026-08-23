import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_POSTS, INITIAL_PAGES, INITIAL_REUSABLE_BLOCKS, INITIAL_CATEGORIES, INITIAL_SETTINGS } from '@/lib/initial-data';

export async function POST(req: NextRequest) {
  try {
    const { query, variables } = await req.json();

    if (!query || typeof query !== 'string') {
      return NextResponse.json({ errors: [{ message: 'Nenhuma query GraphQL fornecida' }] }, { status: 400 });
    }

    const cleanQuery = query.replace(/\s+/g, ' ').trim();
    const resultData: Record<string, any> = {};

    // Match query fields
    if (cleanQuery.includes('posts')) {
      let filtered = [...INITIAL_POSTS];
      if (variables?.status) {
        filtered = filtered.filter((p) => p.status === variables.status);
      }
      if (variables?.category) {
        filtered = filtered.filter((p) => p.category.toLowerCase() === variables.category.toLowerCase());
      }
      if (variables?.limit) {
        filtered = filtered.slice(0, variables.limit);
      }
      resultData.posts = filtered.map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        featuredImage: p.featuredImage,
        status: p.status,
        category: p.category,
        tags: p.tags,
        authorName: p.authorName,
        readingTime: p.readingTime,
        publishedAt: p.publishedAt,
        views: p.views,
        blocksCount: p.blocks.length,
        blocks: p.blocks,
      }));
    }

    if (cleanQuery.includes('post(') || (cleanQuery.includes('post ') && variables?.slug)) {
      const slug = variables?.slug || 'o-futuro-dos-cms-headless-e-nextjs-em-2026';
      const single = INITIAL_POSTS.find((p) => p.slug === slug) || INITIAL_POSTS[0];
      resultData.post = single;
    }

    if (cleanQuery.includes('pages')) {
      resultData.pages = INITIAL_PAGES.map((pg) => ({
        id: pg.id,
        slug: pg.slug,
        title: pg.title,
        description: pg.description,
        template: pg.template,
        status: pg.status,
        isHomePage: pg.isHomePage,
        blocksCount: pg.blocks.length,
        blocks: pg.blocks,
      }));
    }

    if (cleanQuery.includes('page(') || (cleanQuery.includes('page ') && variables?.slug)) {
      const slug = variables?.slug || 'home';
      const single = INITIAL_PAGES.find((p) => p.slug === slug) || INITIAL_PAGES[0];
      resultData.page = single;
    }

    if (cleanQuery.includes('reusableBlocks')) {
      resultData.reusableBlocks = INITIAL_REUSABLE_BLOCKS;
    }

    if (cleanQuery.includes('categories')) {
      resultData.categories = INITIAL_CATEGORIES;
    }

    if (cleanQuery.includes('siteSettings')) {
      resultData.siteSettings = INITIAL_SETTINGS;
    }

    return NextResponse.json({
      data: Object.keys(resultData).length > 0 ? resultData : {
        message: 'Query executada com sucesso',
        schema: {
          types: ['Post', 'Page', 'ReusableBlock', 'Category', 'SiteSettings'],
          queries: ['posts', 'post(slug: String!)', 'pages', 'page(slug: String!)', 'reusableBlocks', 'categories', 'siteSettings'],
        },
      },
    });
  } catch (error: any) {
    return NextResponse.json({ errors: [{ message: error?.message || 'Erro de execução GraphQL' }] }, { status: 500 });
  }
}
