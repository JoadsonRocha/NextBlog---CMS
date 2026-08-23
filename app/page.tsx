'use client';

import React from 'react';
import { CMSProvider, useCMS } from '@/lib/cms-context';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';
import { VisualEditor } from '@/components/editor/VisualEditor';
import { PostsManager } from '@/components/posts/PostsManager';
import { PagesManager } from '@/components/pages/PagesManager';
import { ReusableBlocksManager } from '@/components/blocks-library/ReusableBlocksManager';
import { MediaLibrary } from '@/components/media/MediaLibrary';
import { CommentsManager } from '@/components/comments/CommentsManager';
import { AppearanceManager } from '@/components/appearance/AppearanceManager';
import { PluginsManager } from '@/components/plugins/PluginsManager';
import { ToolsManager } from '@/components/tools/ToolsManager';
import { SettingsManager } from '@/components/settings/SettingsManager';
import { APIExplorer } from '@/components/api-explorer/APIExplorer';
import { DatabaseManager } from '@/components/database/DatabaseManager';
import { DeployManager } from '@/components/deploy/DeployManager';
import { UserManager } from '@/components/users/UserManager';
import { PublicSiteView } from '@/components/site-view/PublicSiteView';

function CMSAppContent() {
  const { activeView } = useCMS();

  // If the user is currently viewing the live public site, render the full public frontend view
  if (activeView === 'public-site') {
    return <PublicSiteView />;
  }

  // Otherwise render within the Admin Dashboard Layout
  return (
    <AdminLayout>
      {activeView === 'dashboard' && <AdminDashboard />}
      {activeView === 'editor' && <VisualEditor />}
      {activeView === 'posts' && <PostsManager />}
      {activeView === 'pages' && <PagesManager />}
      {activeView === 'reusable-blocks' && <ReusableBlocksManager />}
      {activeView === 'media' && <MediaLibrary />}
      {activeView === 'comments' && <CommentsManager />}
      {activeView === 'appearance' && <AppearanceManager />}
      {activeView === 'plugins' && <PluginsManager />}
      {activeView === 'tools' && <ToolsManager />}
      {activeView === 'settings' && <SettingsManager />}
      {activeView === 'api-explorer' && <APIExplorer />}
      {activeView === 'database' && <DatabaseManager />}
      {activeView === 'deploy' && <DeployManager />}
      {activeView === 'users' && <UserManager />}
    </AdminLayout>
  );
}

export default function Page() {
  return (
    <CMSProvider>
      <CMSAppContent />
    </CMSProvider>
  );
}
