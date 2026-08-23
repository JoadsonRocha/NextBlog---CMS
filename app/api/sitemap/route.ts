import { NextResponse } from 'next/server';
import { INITIAL_POSTS, INITIAL_PAGES } from '@/lib/initial-data';

export async function GET() {
  const baseUrl = 'https://nextblog-cms.vercel.app';

  const postUrls = INITIAL_POSTS.filter((p) => p.status === 'published').map((post) => `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.updatedAt || post.createdAt).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('');

  const pageUrls = INITIAL_PAGES.filter((p) => p.status === 'published').map((page) => `
  <url>
    <loc>${baseUrl}/${page.slug === 'home' ? '' : page.slug}</loc>
    <lastmod>${new Date(page.updatedAt || page.createdAt).toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${page.isHomePage ? '1.0' : '0.7'}</priority>
  </url>`).join('');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pageUrls}
  ${postUrls}
</urlset>`;

  return new NextResponse(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
