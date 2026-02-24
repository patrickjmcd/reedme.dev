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

interface SidebarProps {
  current: Page;
  onNavigate: (page: Page) => void;
}

export function Sidebar({ current, onNavigate }: SidebarProps) {
  const groups = ['Getting Started', 'Usage', 'Development'];

  return (
    <aside className="fixed top-14 left-0 bottom-0 w-56 border-r border-border bg-background overflow-y-auto py-6 px-3">
      {/* Overview (no group) */}
      {NAV_ITEMS.filter((i) => !i.group).map((item) => (
        <NavLink key={item.id} item={item} current={current} onNavigate={onNavigate} />
      ))}

      {groups.map((group) => {
        const items = NAV_ITEMS.filter((i) => i.group === group);
        return (
          <div key={group} className="mt-4">
            <p className="px-3 mb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {group}
            </p>
            {items.map((item) => (
              <NavLink key={item.id} item={item} current={current} onNavigate={onNavigate} />
            ))}
          </div>
        );
      })}
    </aside>
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
