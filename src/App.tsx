import { useEffect, useState } from 'react';
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

const PAGES = new Set<Page>([
  'home', 'installation', 'configuration', 'database',
  'keyboard-shortcuts', 'api', 'contributing', 'changelog',
]);

function hashToPage(): Page {
  const hash = window.location.hash.slice(1) as Page;
  return PAGES.has(hash) ? hash : 'home';
}

function PageContent({ page }: { page: Page }) {
  switch (page) {
    case 'home':
      return <HomePage />;
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
  const [page, setPage] = useState<Page>(hashToPage);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      setPage(hashToPage());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onMenuClick={() => setSidebarOpen((o) => !o)} />
      <Sidebar
        current={page}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="md:ml-56 pt-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 py-10">
          <PageContent page={page} />
        </div>
        <footer className="border-t border-border">
          <div className="max-w-3xl mx-auto px-4 sm:px-8 py-6 text-sm text-muted-foreground">
            © {new Date().getFullYear()} Patrick McDonagh. MIT License.
          </div>
        </footer>
      </main>
    </div>
  );
}
