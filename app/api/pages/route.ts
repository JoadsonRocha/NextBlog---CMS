import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_PAGES } from '@/lib/initial-data';

let pagesStore = [...INITIAL_PAGES];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  const status = searchParams.get('status');

  let results = [...pagesStore];

  if (slug) {
    const single = results.find((p) => p.slug === slug);
    if (!single) {
      return NextResponse.json({ error: 'Página não encontrada' }, { status: 404 });
    }
    return NextResponse.json({ data: single });
  }

  if (status) {
    results = results.filter((p) => p.status === status);
  }

  return NextResponse.json({
    meta: {
      total: results.length,
      timestamp: new Date().toISOString(),
    },
    data: results,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newPage = {
      id: `page_${Date.now()}`,
      slug: body.slug || `pagina-${Date.now()}`,
      title: body.title || 'Nova Página',
      description: body.description || '',
      template: body.template || 'default',
      status: body.status || 'published',
      isHomePage: !!body.isHomePage,
      order: pagesStore.length + 1,
      blocks: body.blocks || [],
      seo: body.seo || {
        metaTitle: body.title || '',
        metaDescription: body.description || '',
        keywords: [],
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    pagesStore.push(newPage);
    return NextResponse.json({ success: true, data: newPage }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Erro ao criar página' }, { status: 400 });
  }
}
