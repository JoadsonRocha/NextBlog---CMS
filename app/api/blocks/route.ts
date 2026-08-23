import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_REUSABLE_BLOCKS } from '@/lib/initial-data';

let blocksStore = [...INITIAL_REUSABLE_BLOCKS];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');

  let results = [...blocksStore];
  if (category) {
    results = results.filter((b) => b.category === category);
  }

  return NextResponse.json({
    meta: { total: results.length },
    data: results,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newBlock = {
      id: `reuse_${Date.now()}`,
      title: body.title || 'Bloco Reutilizável',
      category: body.category || 'content',
      description: body.description || '',
      block: body.block,
      usageCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    blocksStore.push(newBlock);
    return NextResponse.json({ success: true, data: newBlock }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Erro ao criar bloco' }, { status: 400 });
  }
}
