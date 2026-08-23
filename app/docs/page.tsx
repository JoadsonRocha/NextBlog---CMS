'use client';

import React from 'react';
import { CMSProvider } from '@/lib/cms-context';
import { DocumentationView } from '@/components/docs/DocumentationView';

export default function DocsPage() {
  return (
    <CMSProvider>
      <DocumentationView />
    </CMSProvider>
  );
}
