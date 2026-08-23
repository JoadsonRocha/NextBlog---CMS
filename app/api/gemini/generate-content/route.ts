import { NextRequest, NextResponse } from 'next/server';

// Forward legacy calls to the new ultra-fast Groq API route
export async function POST(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = '/api/groq/generate-content';
  return fetch(url.toString(), {
    method: 'POST',
    headers: req.headers,
    body: await req.text(),
  });
}
