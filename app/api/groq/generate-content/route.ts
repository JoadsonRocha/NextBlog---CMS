import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Chave GROQ_API_KEY não configurada nas variáveis de ambiente do servidor.' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { action, prompt, currentText, tone, blockType, title, category } = body;

    // Helper to call Groq API (OpenAI compatible endpoint)
    const callGroq = async (systemPrompt: string, userPrompt: string, jsonMode: boolean = false) => {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          temperature: 0.7,
          ...(jsonMode ? { response_format: { type: 'json_object' } } : {}),
        }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson?.error?.message || `Groq API Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content || '';
    };

    if (action === 'generate_post') {
      const systemPrompt = `Você é um redator e estrategista de conteúdo sênior em um CMS moderno (NextBlog).
Gere um artigo completo em português sobre o tema solicitado.
Você DEVE retornar estritamente um objeto JSON válido contendo:
- "title": título cativante do post
- "excerpt": resumo introdutório de 2 linhas
- "category": categoria sugerida (ex: Tecnologia & Dev, Design & UI/UX, Marketing & SEO, Negócios)
- "tags": array com 3 a 5 tags
- "readingTime": tempo estimado de leitura (ex: "4 min")
- "metaTitle": título para SEO (máx 60 caracteres)
- "metaDescription": descrição para SEO (máx 155 caracteres)
- "blocks": array de blocos de conteúdo. Cada bloco deve ter 'type' ('heading', 'paragraph', 'quote', 'cta_banner', 'faq', 'code', 'pricing', 'callout', 'timeline', 'tabs') e 'content' com os dados necessários.
Crie entre 4 e 6 blocos ricos e aprofundados.`;

      const userPrompt = `Gere o artigo completo em JSON para o tema: "${prompt}"`;
      const resultText = await callGroq(systemPrompt, userPrompt, true);
      const parsed = JSON.parse(resultText);
      return NextResponse.json({ success: true, data: parsed });
    }

    if (action === 'rewrite_text') {
      const tonePrompt = tone || 'profissional e envolvente';
      const systemPrompt = `Você é um editor de texto experiente. Reescreva o texto em português brasileiro no tom: "${tonePrompt}". Retorne apenas o texto reescrito, sem introduções ou explicações.`;
      const userPrompt = `Texto original: "${currentText}"`;
      const rewritten = await callGroq(systemPrompt, userPrompt, false);
      return NextResponse.json({ success: true, result: rewritten });
    }

    if (action === 'generate_block') {
      const systemPrompt = `Você é um designer de conteúdo para CMS em blocos Notion-style.
Gere os dados JSON para um bloco do tipo "${blockType}" no contexto solicitado.
Retorne estritamente um JSON com a estrutura correspondente:
- Se 'faq': {"title": string, "subtitle": string, "items": [{"question": string, "answer": string}]}
- Se 'pricing': {"title": string, "subtitle": string, "plans": [{"name": string, "price": string, "period": string, "description": string, "features": string[], "buttonText": string, "isPopular": boolean}]}
- Se 'testimonials': {"title": string, "subtitle": string, "items": [{"quote": string, "author": string, "role": string, "company": string, "rating": 5}]}
- Se 'cta_banner': {"tagline": string, "title": string, "description": string, "primaryButtonText": string, "secondaryButtonText": string}
- Se 'hero': {"badge": string, "title": string, "subtitle": string, "primaryCtaText": string, "secondaryCtaText": string}
- Se 'stats': {"items": [{"label": string, "value": string, "description": string}]}
- Se 'callout': {"type": "info" | "warning" | "success" | "tip", "title": string, "message": string}
- Se 'timeline': {"title": string, "subtitle": string, "items": [{"date": string, "title": string, "description": string, "status": "completed" | "current" | "upcoming"}]}
- Se 'tabs': {"tabs": [{"label": string, "content": string}]}
- Se 'poll': {"question": string, "options": [{"text": string, "votes": number}]}`;

      const userPrompt = `Gere os dados JSON do bloco tipo "${blockType}" para: "${prompt}"`;
      const resultText = await callGroq(systemPrompt, userPrompt, true);
      const parsed = JSON.parse(resultText);
      return NextResponse.json({ success: true, data: parsed });
    }

    if (action === 'generate_seo') {
      const systemPrompt = `Você é um especialista em SEO internacional.
Gere metadados de alto ranking para o conteúdo informado.
Retorne estritamente um objeto JSON com:
- "metaTitle": título curto e atraente (máx 60 caracteres)
- "metaDescription": resumo persuasivo para CTR no Google (máx 155 caracteres)
- "keywords": array com 5 palavras-chave relevantes`;

      const userPrompt = `Título: "${title}". Categoria: "${category || 'Geral'}"`;
      const resultText = await callGroq(systemPrompt, userPrompt, true);
      const parsed = JSON.parse(resultText);
      return NextResponse.json({ success: true, data: parsed });
    }

    // Default general assistant
    const systemPrompt = 'Você é o assistente inteligente de IA Groq (Llama 3.3 70B) do NextBlog CMS.';
    const userPrompt = prompt || 'Olá! Como posso ajudar você no gerenciamento do seu CMS?';
    const result = await callGroq(systemPrompt, userPrompt, false);

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error('Erro na rota Groq API:', error);
    return NextResponse.json(
      { error: error?.message || 'Erro ao processar solicitação de IA no Groq' },
      { status: 500 }
    );
  }
}
