import { MetadataRoute } from 'next';
import { INITIAL_POSTS, INITIAL_PAGES } from '@/lib/initial-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nextblog-cms.vercel.app';

  const postsEntries: MetadataRoute.Sitemap = INITIAL_POSTS.filter((p) => p.status === 'published').map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.createdAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const pagesEntries: MetadataRoute.Sitemap = INITIAL_PAGES.filter((p) => p.status === 'published').map((page) => ({
    url: `${baseUrl}/${page.slug === 'home' ? '' : page.slug}`,
    lastModified: new Date(page.updatedAt || page.createdAt),
    changeFrequency: page.isHomePage ? 'daily' : 'monthly',
    priority: page.isHomePage ? 1.0 : 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...pagesEntries,
    ...postsEntries,
  ];
}
