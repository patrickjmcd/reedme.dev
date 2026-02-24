interface Shortcut {
  keys: string[];
  action: string;
}

interface ShortcutGroup {
  title: string;
  shortcuts: Shortcut[];
}

const SHORTCUT_GROUPS: ShortcutGroup[] = [
  {
    title: 'Global',
    shortcuts: [
      { keys: ['Cmd/Ctrl', 'K'], action: 'Toggle search dialog' },
      { keys: ['Cmd/Ctrl', ','], action: 'Open settings dialog' },
      { keys: ['/'], action: 'Open search dialog' },
      { keys: ['?'], action: 'Open keyboard shortcuts help' },
      { keys: ['Esc'], action: 'Close search / settings / article drawer' },
    ],
  },
  {
    title: 'Article navigation',
    shortcuts: [
      { keys: ['j'], action: 'Next article' },
      { keys: ['n'], action: 'Next article' },
      { keys: ['↓'], action: 'Next article' },
      { keys: ['k'], action: 'Previous article' },
      { keys: ['p'], action: 'Previous article' },
      { keys: ['↑'], action: 'Previous article' },
    ],
  },
  {
    title: 'Article actions',
    shortcuts: [
      { keys: ['m'], action: 'Toggle read / unread for current article' },
      { keys: ['s'], action: 'Toggle star (bookmark) for current article' },
      { keys: ['f'], action: 'Toggle star (bookmark) for current article' },
      { keys: ['o'], action: 'Open current article in browser' },
      { keys: ['v'], action: 'Open current article in browser' },
    ],
  },
  {
    title: 'Navigation (Google Reader-style)',
    shortcuts: [
      { keys: ['g', 'u'], action: 'Go to Unread' },
      { keys: ['g', 'a'], action: 'Go to All' },
      { keys: ['g', 's'], action: 'Go to Starred' },
      { keys: ['g', 'f'], action: 'Go to Feed management' },
    ],
  },
];

function Key({ children }: { children: string }) {
  return (
    <kbd className="inline-flex items-center rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs shadow-sm">
      {children}
    </kbd>
  );
}

export function KeyboardShortcutsPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Keyboard Shortcuts</h1>
        <p className="text-muted-foreground">
          ReedMe implements Google Reader-style keyboard shortcuts for a fast, keyboard-driven reading experience.
          Press <Key>?</Key> in the app to open the shortcuts help dialog.
        </p>
      </div>

      {SHORTCUT_GROUPS.map((group) => (
        <section key={group.title} className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight border-b border-border pb-2">{group.title}</h2>
          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-4 py-2.5 font-semibold w-48">Keys</th>
                  <th className="text-left px-4 py-2.5 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {group.shortcuts.map((shortcut, i) => (
                  <tr key={i} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-2.5">
                      <span className="flex items-center gap-1.5 flex-wrap">
                        {shortcut.keys.map((key, ki) => (
                          <span key={ki} className="flex items-center gap-1">
                            {ki > 0 && <span className="text-muted-foreground text-xs">then</span>}
                            <Key>{key}</Key>
                          </span>
                        ))}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground">{shortcut.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      <section className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight border-b border-border pb-2">Where to find shortcuts in the app</h2>
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
          <li>Sidebar search button hint shows <strong>Cmd+K / ?</strong></li>
          <li>Search dialog Quick Actions includes a <strong>Keyboard Shortcuts</strong> item</li>
          <li>Settings &gt; Appearance includes a <strong>Keyboard Shortcuts</strong> section</li>
        </ul>
      </section>
    </div>
  );
}
