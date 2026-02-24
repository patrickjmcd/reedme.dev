import { CodeBlock } from '@/components/common/CodeBlock';

const SQLITE_DOCKER = `docker run -it -d -p 8080:8080 \\
  -v $(pwd)/reedme:/data \\
  -e REEDME_PASSWORD="reedme" \\
  -e REEDME_DB_PATH="/data/reedme.db" \\
  ghcr.io/patrickjmcd/reedme:latest`;

const POSTGRES_DOCKER = `docker run -it -d -p 8080:8080 \\
  -e REEDME_PASSWORD="reedme" \\
  -e REEDME_DATABASE_URL="postgres://user:password@host:5432/reedme?sslmode=disable" \\
  ghcr.io/patrickjmcd/reedme:latest`;

const POSTGRES_COMPOSE = `services:
  postgres:
    image: postgres:17
    environment:
      POSTGRES_DB: reedme
      POSTGRES_USER: reedme
      POSTGRES_PASSWORD: reedme
    volumes:
      - postgres_data:/var/lib/postgresql/data

  reedme:
    image: ghcr.io/patrickjmcd/reedme:latest
    environment:
      REEDME_PASSWORD: changeme
      REEDME_DATABASE_URL: postgres://reedme:reedme@postgres:5432/reedme?sslmode=disable
    ports:
      - "127.0.0.1:8080:8080"
    depends_on:
      postgres:
        condition: service_healthy

volumes:
  postgres_data:`;

export function DatabasePage() {
  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Database</h1>
        <p className="text-muted-foreground">
          ReedMe supports SQLite and PostgreSQL. The two are mutually exclusive — choose one at deploy time.
          Migrations run automatically on startup for both backends.
        </p>
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30 p-4 text-sm text-amber-800 dark:text-amber-200">
        <strong>No migration path between backends.</strong> Once you choose SQLite or PostgreSQL, stick with
        it. There is no built-in export/import path between the two.
      </div>

      {/* SQLite */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight border-b border-border pb-2">
          SQLite <span className="text-sm font-normal text-muted-foreground ml-2">(default)</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          No extra setup required. ReedMe creates the database file at startup. Configure the path with{' '}
          <code className="bg-muted px-1 rounded">REEDME_DB_PATH</code> (default:{' '}
          <code className="bg-muted px-1 rounded">reedme.db</code>).
        </p>
        <p className="text-sm text-muted-foreground">
          When using Docker, mount a host directory so the database file persists across container restarts.
        </p>
        <CodeBlock code={SQLITE_DOCKER} language="shell" />
      </section>

      {/* PostgreSQL */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight border-b border-border pb-2">PostgreSQL</h2>
        <p className="text-sm text-muted-foreground">
          Set <code className="bg-muted px-1 rounded">REEDME_DATABASE_URL</code> to a PostgreSQL connection
          string. When this variable is present,{' '}
          <code className="bg-muted px-1 rounded">REEDME_DB_PATH</code> is ignored.
        </p>

        <h3 className="font-medium">docker run</h3>
        <CodeBlock code={POSTGRES_DOCKER} language="shell" />

        <h3 className="font-medium mt-4">Docker Compose with managed PostgreSQL</h3>
        <CodeBlock code={POSTGRES_COMPOSE} language="yaml" />
      </section>

      {/* Schema overview */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight border-b border-border pb-2">Schema overview</h2>
        <p className="text-sm text-muted-foreground">
          Migrations are embedded SQL files that run automatically. The canonical schema source is in{' '}
          <code className="bg-muted px-1 rounded">backend/internal/store/migrations/</code>.
        </p>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-2.5 font-semibold">Table</th>
                <th className="text-left px-4 py-2.5 font-semibold">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ['groups', 'Feed groups. A default group (id=1) always exists.'],
                ['feeds', 'Subscribed RSS/Atom feeds, linked to a group.'],
                ['feed_fetch_state', 'Per-feed runtime pull state: ETags, backoff, failure counters.'],
                ['items', 'Feed articles. Full-text search backed by items_fts (FTS5).'],
                ['bookmarks', 'Content snapshots of starred items. Survives source deletion.'],
                ['schema_migrations', 'Migration version tracking table.'],
              ].map(([table, purpose]) => (
                <tr key={table} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-2.5 font-mono text-xs">{table}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Legacy migration */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight border-b border-border pb-2">Legacy database migration</h2>
        <p className="text-sm text-muted-foreground">
          When an old pre-<code className="bg-muted px-1 rounded">schema_migrations</code> database is
          detected, ReedMe automatically:
        </p>
        <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
          <li>Creates a timestamped <code className="bg-muted px-1 rounded">.bak</code> backup of the old file.</li>
          <li>Builds a fresh temporary database with the current schema.</li>
          <li>Imports legacy groups, feeds, and items data.</li>
          <li>Atomically swaps the files and records baseline version 1.</li>
        </ol>
      </section>
    </div>
  );
}
