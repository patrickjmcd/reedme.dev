import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { HomePage } from '@/components/docs/HomePage';
import { InstallationPage } from '@/components/docs/InstallationPage';
import { ConfigurationPage } from '@/components/docs/ConfigurationPage';
import { DatabasePage } from '@/components/docs/DatabasePage';
import { KeyboardShortcutsPage } from '@/components/docs/KeyboardShortcutsPage';
import { APIPage } from '@/components/docs/APIPage';
import { ContributingPage } from '@/components/docs/ContributingPage';
import { ChangelogPage } from '@/components/docs/ChangelogPage';
import type { Page } from '@/types';

function PageContent({ page, onNavigate }: { page: Page; onNavigate: (p: Page) => void }) {
  switch (page) {
    case 'home':
      return <HomePage onNavigate={onNavigate} />;
    case 'installation':
      return <InstallationPage />;
    case 'configuration':
      return <ConfigurationPage />;
    case 'database':
      return <DatabasePage />;
    case 'keyboard-shortcuts':
      return <KeyboardShortcutsPage />;
    case 'api':
      return <APIPage />;
    case 'contributing':
      return <ContributingPage />;
    case 'changelog':
      return <ChangelogPage />;
  }
}

export default function App() {
  const [page, setPage] = useState<Page>('home');

  function navigate(p: Page) {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Sidebar current={page} onNavigate={navigate} />
      <main className="ml-56 pt-14">
        <div className="max-w-3xl mx-auto px-8 py-10">
          <PageContent page={page} onNavigate={navigate} />
        </div>
      </main>
    </div>
  );
}
