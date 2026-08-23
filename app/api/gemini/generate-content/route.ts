import { GoogleGenAI, Type } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Chave GEMINI_API_KEY não configurada no servidor.' },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const body = await req.json();
    const { action, prompt, currentText, tone, blockType, title, category } = body;

    if (action === 'generate_post') {
      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: `Você é um redator e estrategista de conteúdo sênior em um CMS moderno estilo WordPress.
Gere um artigo completo em português sobre o tema: "${prompt}".
Retorne estritamente um JSON estruturado com os seguintes campos:
- title: título cativante do post
- excerpt: resumo introdutório de 2 linhas
- category: categoria sugerida (ex: Tecnologia & Dev, Design & UI/UX, Marketing & SEO, Negócios)
- tags: lista de 3 a 5 tags
- readingTime: tempo estimado de leitura (ex: "4 min")
- metaTitle: título para SEO (máx 60 caracteres)
- metaDescription: descrição para SEO (máx 155 caracteres)
- blocks: lista de blocos de conteúdo. Cada bloco deve ter 'type' ('heading', 'paragraph', 'quote', 'cta_banner', 'faq', 'code', 'pricing') e 'content' com os dados adequados.
Crie no mínimo 4 a 6 blocos ricos com conteúdo aprofundado e relevante.`,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const text = response.text;
      if (!text) {
        throw new Error('Nenhuma resposta retornada pela IA.');
      }
      const parsed = JSON.parse(text);
      return NextResponse.json({ success: true, data: parsed });
    }

    if (action === 'rewrite_text') {
      const tonePrompt = tone || 'profissional e envolvente';
      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: `Reescreva o seguinte texto em português, mantendo a mensagem central mas tornando-o ${tonePrompt}. Texto original: "${currentText}"`,
      });

      return NextResponse.json({ success: true, result: response.text });
    }

    if (action === 'generate_block') {
      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: `Gere o conteúdo para um bloco do tipo "${blockType}" no CMS para o tópico/contexto: "${prompt}".
Retorne estritamente um objeto JSON com o formato de dados correspondente para o bloco:
- Se 'faq': { title: string, subtitle: string, items: [{ question: string, answer: string }] }
- Se 'pricing': { title: string, subtitle: string, plans: [{ name: string, price: string, period: string, description: string, features: string[], buttonText: string, isPopular: boolean }] }
- Se 'testimonials': { title: string, subtitle: string, items: [{ quote: string, author: string, role: string, company: string, rating: number }] }
- Se 'cta_banner': { tagline: string, title: string, description: string, primaryButtonText: string, secondaryButtonText: string }
- Se 'hero': { badge: string, title: string, subtitle: string, primaryCtaText: string, secondaryCtaText: string }
- Se 'stats': { items: [{ label: string, value: string, description: string }] }
- Se 'table': { headers: string[], rows: string[][] }
Tudo em português com alta qualidade editorial.`,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const text = response.text;
      if (!text) {
        throw new Error('Nenhuma resposta retornada pela IA.');
      }
      const parsed = JSON.parse(text);
      return NextResponse.json({ success: true, data: parsed });
    }

    if (action === 'generate_seo') {
      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: `Gere metadados de SEO otimizados para um conteúdo com título: "${title}" e categoria: "${category || 'Geral'}".
Retorne em JSON:
{
  "metaTitle": "título curto e com alto CTR (máx 60 caracteres)",
  "metaDescription": "resumo persuasivo para SERP com palavra-chave (máx 155 caracteres)",
  "keywords": ["palavra1", "palavra2", "palavra3", "palavra4", "palavra5"]
}`,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const text = response.text;
      if (!text) {
        throw new Error('Nenhuma resposta retornada pela IA.');
      }
      const parsed = JSON.parse(text);
      return NextResponse.json({ success: true, data: parsed });
    }

    // Default general assistant
    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt || 'Olá! Como posso ajudar você no gerenciamento do seu CMS?',
    });

    return NextResponse.json({ success: true, result: response.text });
  } catch (error: any) {
    console.error('Erro na rota Gemini API:', error);
    return NextResponse.json(
      { error: error?.message || 'Erro ao processar solicitação de IA' },
      { status: 500 }
    );
  }
}
