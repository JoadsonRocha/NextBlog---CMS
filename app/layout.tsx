import type { Metadata, Viewport } from 'next';
import './globals.css';

const siteUrl = 'https://nextblog-cms.vercel.app';
const siteTitle = 'NextBlog CMS — O CMS Híbrido de Nova Geração (WordPress + Strapi + Ghost + Notion)';
const siteDescription =
  'Plataforma CMS moderna em Next.js 15 e React 19 com editor Notion-style de 24 blocos, APIs REST e GraphQL, SEO automatizado com Schema.org e IA Google Gemini.';

export const viewport: Viewport = {
  themeColor: '#2563eb',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: '%s | NextBlog CMS',
  },
  description: siteDescription,
  applicationName: 'NextBlog CMS',
  authors: [{ name: 'NextBlog Core Team', url: siteUrl }],
  generator: 'Next.js 15 & React 19',
  keywords: [
    'Next.js 15 CMS',
    'Headless CMS',
    'Notion style editor',
    'WordPress alternativo',
    'Ghost CMS',
    'Strapi Next.js',
    'React 19 CMS',
    'GraphQL CMS',
    'Schema.org SEO',
    'SEO Next.js',
  ],
  referrer: 'origin-when-cross-origin',
  creator: 'NextBlog Team',
  publisher: 'NextBlog CMS Inc.',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    languages: {
      'pt-BR': '/',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: 'NextBlog CMS',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
        width: 1200,
        height: 630,
        alt: 'NextBlog CMS - O CMS Híbrido de Nova Geração',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    site: '@nextblog_cms',
    creator: '@nextblog_cms',
    images: ['https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Global Schema.org Structured Data (WebSite + Organization + SearchAction)
  const globalSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'NextBlog CMS',
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/logo.png`,
        },
        sameAs: ['https://twitter.com/nextblog_cms', 'https://github.com/JoadsonRocha/NextBlog---CMS'],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'NextBlog CMS',
        description: siteDescription,
        publisher: {
          '@id': `${siteUrl}/#organization`,
        },
        potentialAction: [
          {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${siteUrl}/blog?search={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
        ],
      },
    ],
  };

  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
      </head>
      <body suppressHydrationWarning className="antialiased min-h-screen bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
