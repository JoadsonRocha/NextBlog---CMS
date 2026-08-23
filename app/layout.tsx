import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'NextBlock CMS - CMS Moderno e Visual em Next.js',
  description: 'CMS inspirado no WordPress com editor drag-and-drop de blocos, GraphQL, REST e IA Gemini.',
  openGraph: {
    title: 'NextBlock CMS - CMS Moderno e Visual em Next.js',
    description: 'CMS inspirado no WordPress com editor drag-and-drop de blocos, GraphQL, REST e IA Gemini.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NextBlock CMS',
    description: 'CMS moderno em Next.js com editor de blocos e APIs.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
