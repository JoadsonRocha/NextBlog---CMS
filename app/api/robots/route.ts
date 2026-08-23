import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://nextblog-cms.vercel.app';

  const robotsTxt = `# NextBlog CMS - robots.txt
User-agent: *
Allow: /
Allow: /blog/
Disallow: /api/
Disallow: /admin/

# Sitemaps
Sitemap: ${baseUrl}/api/sitemap
`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
