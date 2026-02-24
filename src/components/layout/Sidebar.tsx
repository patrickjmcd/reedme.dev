import { clsx } from 'clsx';
import type { Page } from '@/types';

interface NavItem {
  id: Page;
  label: string;
  group?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Overview' },
  { id: 'installation', label: 'Installation', group: 'Getting Started' },
  { id: 'configuration', label: 'Configuration', group: 'Getting Started' },
  { id: 'database', label: 'Database', group: 'Getting Started' },
  { id: 'keyboard-shortcuts', label: 'Keyboard Shortcuts', group: 'Usage' },
  { id: 'api', label: 'API Reference', group: 'Usage' },
  { id: 'contributing', label: 'Contributing', group: 'Development' },
  { id: 'changelog', label: 'Changelog', group: 'Development' },
];

const GROUPS = ['Getting Started', 'Usage', 'Development'];

interface SidebarProps {
  current: Page;
  open: boolean;
  onClose: () => void;
  onNavigate: (page: Page) => void;
}

export function Sidebar({ current, open, onClose, onNavigate }: SidebarProps) {
  function handleNavigate(page: Page) {
    onNavigate(page);
    onClose();
  }

  const navContent = (
    <>
      {NAV_ITEMS.filter((i) => !i.group).map((item) => (
        <NavLink key={item.id} item={item} current={current} onNavigate={handleNavigate} />
      ))}
      {GROUPS.map((group) => (
        <div key={group} className="mt-4">
          <p className="px-3 mb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {group}
          </p>
          {NAV_ITEMS.filter((i) => i.group === group).map((item) => (
            <NavLink key={item.id} item={item} current={current} onNavigate={handleNavigate} />
          ))}
        </div>
      ))}
    </>
  );

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={clsx(
          'fixed top-14 left-0 bottom-0 z-40 w-56 border-r border-border bg-background overflow-y-auto py-6 px-3 transition-transform duration-200',
          // Mobile: slide in/out
          'md:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        )}
      >
        {navContent}
      </aside>
    </>
  );
}

function NavLink({
  item,
  current,
  onNavigate,
}: {
  item: NavItem;
  current: Page;
  onNavigate: (page: Page) => void;
}) {
  return (
    <button
      onClick={() => onNavigate(item.id)}
      className={clsx(
        'w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors',
        current === item.id
          ? 'bg-accent text-accent-foreground font-medium'
          : 'text-muted-foreground hover:text-foreground hover:bg-accent/50',
      )}
    >
      {item.label}
    </button>
  );
}
