import { useEffect, useState } from 'react';
import { parseChangelog } from '@/lib/parseChangelog';
import { Badge } from '@/components/ui/badge';
import type { Change, Release } from '@/lib/parseChangelog';

const CHANGELOG_URL =
  'https://raw.githubusercontent.com/patrickjmcd/reedme/main/CHANGELOG.md';

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
  const [releases, setReleases] = useState<Release[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(CHANGELOG_URL)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.text();
      })
      .then((text) => setReleases(parseChangelog(text)))
      .catch(() => setError(true));
  }, []);

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

      {error && (
        <p className="text-sm text-muted-foreground">
          Could not load changelog. View it directly on{' '}
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
      )}

      {!error && releases.length === 0 && (
        <p className="text-sm text-muted-foreground animate-pulse">Loading changelog…</p>
      )}

      <div className="space-y-10">
        {releases.map((release, i) => (
          <ReleaseSection key={release.version} release={release} latest={i === 0} />
        ))}
      </div>
    </div>
  );
}

function ReleaseSection({ release, latest }: { release: Release; latest: boolean }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-bold tracking-tight">
          {release.url ? (
            <a
              href={release.url}
              target="_blank"
              rel="noreferrer"
              className="hover:underline underline-offset-2"
            >
              v{release.version}
            </a>
          ) : (
            `v${release.version}`
          )}
        </h2>
        <span className="text-sm text-muted-foreground">{release.date}</span>
        {latest && <Badge>Latest</Badge>}
      </div>
      <ul className="space-y-2">
        {release.changes.map((change, j) => (
          <li key={j} className="flex items-start gap-2.5 text-sm">
            <Badge
              variant={TYPE_VARIANTS[change.type]}
              className="mt-0.5 shrink-0 text-[10px] py-0"
            >
              {TYPE_LABELS[change.type]}
            </Badge>
            <span className="text-muted-foreground">
              {change.description}
              {change.pr && change.prUrl && (
                <a
                  href={change.prUrl}
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
  );
}
