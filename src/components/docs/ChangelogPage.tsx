import { Badge } from '@/components/ui/badge';

interface Change {
  type: 'feat' | 'fix' | 'chore';
  description: string;
  pr?: number;
}

interface Release {
  version: string;
  date: string;
  changes: Change[];
}

const RELEASES: Release[] = [
  {
    version: '1.2.0',
    date: '2026-02-23',
    changes: [
      { type: 'feat', description: 'Update OIDC configuration to use redirect URI from request', pr: 6 },
    ],
  },
  {
    version: '1.1.2',
    date: '2026-02-23',
    changes: [{ type: 'fix', description: 'TSR bug fix' }],
  },
  {
    version: '1.1.1',
    date: '2026-02-23',
    changes: [{ type: 'fix', description: 'Add pnpm version in GitHub Actions' }],
  },
  {
    version: '1.1.0',
    date: '2026-02-23',
    changes: [{ type: 'feat', description: 'Add pnpm setup step in release workflow' }],
  },
  {
    version: '1.0.0',
    date: '2026-02-21',
    changes: [
      { type: 'feat', description: 'Support fetching feeds through proxy' },
      { type: 'feat', description: 'Add floating action bar for items' },
      { type: 'feat', description: 'Create groups and import feeds, based on OPML' },
      { type: 'feat', description: 'Add bookmark support' },
      { type: 'feat', description: 'Add custom page size' },
      { type: 'feat', description: 'Add direct YouTube video embedding' },
      { type: 'feat', description: 'Add i18n (English, Chinese, German, French, Spanish, Russian, Portuguese, Swedish)' },
      { type: 'feat', description: 'Add keyword search' },
      { type: 'feat', description: 'Add logout' },
      { type: 'feat', description: 'Add pagination to fix rendering performance issues in large lists' },
      { type: 'feat', description: 'Add PostgreSQL support and migration functionality' },
      { type: 'feat', description: 'Add search page' },
      { type: 'feat', description: 'Add Google Reader-style keyboard shortcuts' },
      { type: 'feat', description: 'Add PWA support' },
      { type: 'feat', description: 'Add feed suspend/resume support' },
      { type: 'feat', description: 'Display items by group' },
      { type: 'feat', description: 'Display unread count in sidebar' },
      { type: 'feat', description: 'Add previous/next item navigation' },
      { type: 'feat', description: 'Make password optional (REEDME_ALLOW_EMPTY_PASSWORD)' },
      { type: 'feat', description: 'Support TLS hosting directly' },
      { type: 'feat', description: 'Persist locale and page size preferences across reloads' },
      { type: 'feat', description: 'Show version in page footer' },
      { type: 'fix', description: 'Fix CGO cross-compile for SQLite' },
      { type: 'fix', description: 'Add retry logic for network errors (EOF)' },
      { type: 'fix', description: 'Add QEMU setup for multi-arch Docker builds' },
    ],
  },
];

const TYPE_LABELS: Record<Change['type'], string> = {
  feat: 'Feature',
  fix: 'Fix',
  chore: 'Chore',
};

const TYPE_VARIANTS: Record<Change['type'], 'default' | 'secondary' | 'outline'> = {
  feat: 'default',
  fix: 'secondary',
  chore: 'outline',
};

export function ChangelogPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Changelog</h1>
        <p className="text-muted-foreground">
          All notable changes to ReedMe. Full history on{' '}
          <a
            href="https://github.com/patrickjmcd/reedme/blob/main/CHANGELOG.md"
            target="_blank"
            rel="noreferrer"
            className="text-primary underline underline-offset-2 hover:no-underline"
          >
            GitHub
          </a>
          .
        </p>
      </div>

      <div className="space-y-10">
        {RELEASES.map((release) => (
          <section key={release.version} className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold tracking-tight">v{release.version}</h2>
              <span className="text-sm text-muted-foreground">{release.date}</span>
              {release.version === RELEASES[0].version && (
                <Badge>Latest</Badge>
              )}
            </div>
            <ul className="space-y-2">
              {release.changes.map((change, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  <Badge
                    variant={TYPE_VARIANTS[change.type]}
                    className="mt-0.5 shrink-0 text-[10px] py-0"
                  >
                    {TYPE_LABELS[change.type]}
                  </Badge>
                  <span className="text-muted-foreground">
                    {change.description}
                    {change.pr && (
                      <a
                        href={`https://github.com/patrickjmcd/reedme/issues/${change.pr}`}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-1.5 text-primary underline underline-offset-2 hover:no-underline"
                      >
                        #{change.pr}
                      </a>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
