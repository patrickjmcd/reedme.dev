import { Badge } from '@/components/ui/badge';
import { CodeBlock } from '@/components/common/CodeBlock';

interface EnvVar {
  name: string;
  default?: string;
  description: string;
  required?: boolean;
}

const ENV_GROUPS: { title: string; vars: EnvVar[] }[] = [
  {
    title: 'Authentication',
    vars: [
      {
        name: 'REEDME_PASSWORD',
        description: 'Password for the web interface.',
        required: true,
      },
      {
        name: 'REEDME_ALLOW_EMPTY_PASSWORD',
        default: 'false',
        description: 'Set to true to start without a password (not recommended).',
      },
    ],
  },
  {
    title: 'Server',
    vars: [
      {
        name: 'REEDME_PORT',
        default: '8080',
        description: 'Port the HTTP server listens on.',
      },
      {
        name: 'REEDME_CORS_ALLOWED_ORIGINS',
        description: 'Comma-separated list of allowed CORS origins. Empty means allow all.',
      },
      {
        name: 'REEDME_TRUSTED_PROXIES',
        description: 'Comma-separated list of trusted reverse proxy IPs/CIDRs.',
      },
      {
        name: 'REEDME_ALLOW_PRIVATE_FEEDS',
        default: 'false',
        description: 'Allow pulling feeds from private/localhost URLs.',
      },
    ],
  },
  {
    title: 'Database',
    vars: [
      {
        name: 'REEDME_DB_PATH',
        default: 'reedme.db',
        description: 'Path to the SQLite database file.',
      },
      {
        name: 'REEDME_DATABASE_URL',
        description:
          'PostgreSQL connection string (e.g. postgres://user:pass@host:5432/reedme?sslmode=disable). When set, SQLite is ignored.',
      },
    ],
  },
  {
    title: 'Feed Pull Service',
    vars: [
      {
        name: 'REEDME_PULL_INTERVAL',
        default: '1800',
        description: 'How often to pull feeds, in seconds (default: 30 minutes).',
      },
      {
        name: 'REEDME_PULL_TIMEOUT',
        default: '30',
        description: 'HTTP request timeout for feed pulls, in seconds.',
      },
      {
        name: 'REEDME_PULL_CONCURRENCY',
        default: '10',
        description: 'Maximum number of feeds to pull concurrently.',
      },
      {
        name: 'REEDME_PULL_MAX_BACKOFF',
        default: '172800',
        description: 'Maximum scheduling delay (backoff cap) in seconds (default: 48 hours).',
      },
    ],
  },
  {
    title: 'Login Rate Limiting',
    vars: [
      {
        name: 'REEDME_LOGIN_RATE_LIMIT',
        default: '10',
        description: 'Maximum failed login attempts per window before blocking.',
      },
      {
        name: 'REEDME_LOGIN_WINDOW',
        default: '60',
        description: 'Rate limit window size in seconds.',
      },
      {
        name: 'REEDME_LOGIN_BLOCK',
        default: '300',
        description: 'Block duration in seconds after the limit is exceeded.',
      },
    ],
  },
  {
    title: 'Logging',
    vars: [
      {
        name: 'REEDME_LOG_LEVEL',
        default: 'INFO',
        description: 'Log verbosity: DEBUG, INFO, WARN, or ERROR.',
      },
      {
        name: 'REEDME_LOG_FORMAT',
        default: 'auto',
        description: 'Log format: text, json, or auto (auto picks text for TTY, json otherwise).',
      },
    ],
  },
  {
    title: 'OIDC / SSO (optional)',
    vars: [
      {
        name: 'REEDME_OIDC_ISSUER',
        description: 'OIDC provider URL. Setting this enables SSO login.',
      },
      {
        name: 'REEDME_OIDC_CLIENT_ID',
        description: 'OAuth2 client ID from your OIDC provider.',
      },
      {
        name: 'REEDME_OIDC_CLIENT_SECRET',
        description: 'OAuth2 client secret from your OIDC provider.',
      },
      {
        name: 'REEDME_OIDC_ALLOWED_USER',
        description: 'Restrict OIDC login to a specific email or subject claim (optional).',
      },
    ],
  },
];

const LEGACY_NOTE = `# Legacy env var names still accepted for backward compatibility:
DB          → REEDME_DB_PATH
PASSWORD    → REEDME_PASSWORD
PORT        → REEDME_PORT`;

export function ConfigurationPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Configuration</h1>
        <p className="text-muted-foreground">
          ReedMe is configured entirely via environment variables. All keys are optional except{' '}
          <code className="bg-muted px-1.5 py-0.5 rounded text-sm">REEDME_PASSWORD</code> (unless you set{' '}
          <code className="bg-muted px-1.5 py-0.5 rounded text-sm">REEDME_ALLOW_EMPTY_PASSWORD=true</code>).
        </p>
      </div>

      {ENV_GROUPS.map((group) => (
        <section key={group.title} className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight border-b border-border pb-2">{group.title}</h2>
          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-4 py-2.5 font-semibold">Variable</th>
                  <th className="text-left px-4 py-2.5 font-semibold">Default</th>
                  <th className="text-left px-4 py-2.5 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {group.vars.map((v) => (
                  <tr key={v.name} className="hover:bg-muted/30 transition-colors align-top">
                    <td className="px-4 py-3 font-mono text-xs whitespace-nowrap">
                      {v.name}
                      {v.required && (
                        <Badge variant="destructive" className="ml-2 text-[10px] py-0">
                          required
                        </Badge>
                      )}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground font-mono text-xs">
                      {v.default ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{v.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      <section className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight border-b border-border pb-2">Legacy env var names</h2>
        <p className="text-sm text-muted-foreground">
          The following legacy names are still accepted for backward compatibility with earlier ReedMe versions.
        </p>
        <CodeBlock code={LEGACY_NOTE} />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight border-b border-border pb-2">OIDC redirect URI</h2>
        <p className="text-sm text-muted-foreground">
          The redirect URI is derived dynamically from the incoming request and proxy headers. Register the
          following callback in your OIDC provider:
        </p>
        <CodeBlock code={`https://<external-host>/api/oidc/callback\n# or, for local dev:\nhttp://<external-host>/api/oidc/callback`} />
      </section>
    </div>
  );
}
