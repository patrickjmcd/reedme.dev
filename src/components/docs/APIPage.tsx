import { Badge } from '@/components/ui/badge';

interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  summary: string;
  auth?: boolean;
}

interface EndpointGroup {
  tag: string;
  endpoints: Endpoint[];
}

const METHOD_COLORS: Record<string, string> = {
  GET: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  POST: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  PUT: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  PATCH: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
  DELETE: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
};

const API_GROUPS: EndpointGroup[] = [
  {
    tag: 'Sessions',
    endpoints: [
      { method: 'POST', path: '/api/sessions', summary: 'Login with password', auth: false },
      { method: 'DELETE', path: '/api/sessions', summary: 'Logout' },
    ],
  },
  {
    tag: 'OIDC',
    endpoints: [
      { method: 'GET', path: '/api/oidc', summary: 'Check if OIDC is enabled and get login URL', auth: false },
      { method: 'GET', path: '/api/oidc/callback', summary: 'OIDC callback endpoint', auth: false },
    ],
  },
  {
    tag: 'Groups',
    endpoints: [
      { method: 'GET', path: '/api/groups', summary: 'List all groups' },
      { method: 'POST', path: '/api/groups', summary: 'Create a group' },
      { method: 'GET', path: '/api/groups/:id', summary: 'Get a group' },
      { method: 'PUT', path: '/api/groups/:id', summary: 'Update a group' },
      { method: 'DELETE', path: '/api/groups/:id', summary: 'Delete a group' },
    ],
  },
  {
    tag: 'Feeds',
    endpoints: [
      { method: 'GET', path: '/api/feeds', summary: 'List all feeds' },
      { method: 'POST', path: '/api/feeds', summary: 'Create a feed' },
      { method: 'POST', path: '/api/feeds/batch', summary: 'Batch create feeds (OPML import)' },
      { method: 'POST', path: '/api/feeds/refresh', summary: 'Refresh all non-suspended feeds' },
      { method: 'GET', path: '/api/feeds/validate', summary: 'Validate and auto-discover a feed URL' },
      { method: 'GET', path: '/api/feeds/:id', summary: 'Get a feed' },
      { method: 'PUT', path: '/api/feeds/:id', summary: 'Update a feed' },
      { method: 'DELETE', path: '/api/feeds/:id', summary: 'Delete a feed' },
      { method: 'POST', path: '/api/feeds/:id/refresh', summary: 'Refresh a single feed' },
    ],
  },
  {
    tag: 'Items',
    endpoints: [
      { method: 'GET', path: '/api/items', summary: 'List items (supports filter, feed, group, pagination)' },
      { method: 'GET', path: '/api/items/:id', summary: 'Get an item' },
      { method: 'PUT', path: '/api/items/:id/read', summary: 'Mark item as read' },
      { method: 'DELETE', path: '/api/items/:id/read', summary: 'Mark item as unread' },
    ],
  },
  {
    tag: 'Search',
    endpoints: [
      { method: 'GET', path: '/api/search', summary: 'Search feeds and items in one request' },
    ],
  },
  {
    tag: 'Bookmarks',
    endpoints: [
      { method: 'GET', path: '/api/bookmarks', summary: 'List bookmarks' },
      { method: 'POST', path: '/api/bookmarks', summary: 'Create a bookmark (content snapshot)' },
      { method: 'GET', path: '/api/bookmarks/:id', summary: 'Get a bookmark' },
      { method: 'DELETE', path: '/api/bookmarks/:id', summary: 'Delete a bookmark' },
    ],
  },
];

function MethodBadge({ method }: { method: string }) {
  return (
    <span
      className={`inline-flex items-center rounded px-1.5 py-0.5 font-mono text-xs font-semibold ${METHOD_COLORS[method] ?? ''}`}
    >
      {method}
    </span>
  );
}

export function APIPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">API Reference</h1>
        <p className="text-muted-foreground">
          ReedMe exposes a REST API under <code className="bg-muted px-1.5 py-0.5 rounded text-sm">/api</code>.
          Authentication uses a session cookie named <code className="bg-muted px-1.5 py-0.5 rounded text-sm">session</code>.
        </p>
      </div>

      <div className="rounded-lg border border-border p-4 flex items-center gap-3 text-sm">
        <Badge variant="outline">OpenAPI</Badge>
        <span className="text-muted-foreground">
          The full machine-readable contract is in{' '}
          <a
            href="https://github.com/patrickjmcd/reedme/blob/main/docs/openapi.yaml"
            target="_blank"
            rel="noreferrer"
            className="text-primary underline underline-offset-2 hover:no-underline"
          >
            docs/openapi.yaml
          </a>{' '}
          in the repository.
        </span>
      </div>

      {/* Auth */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight border-b border-border pb-2">Authentication</h2>
        <p className="text-sm text-muted-foreground">
          Most endpoints require an authenticated session. Log in via{' '}
          <code className="bg-muted px-1 rounded">POST /api/sessions</code> with your password. The response
          sets an <code className="bg-muted px-1 rounded">HttpOnly</code> session cookie that must be included
          in subsequent requests.
        </p>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-2.5 font-semibold">Property</th>
                <th className="text-left px-4 py-2.5 font-semibold">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ['Cookie name', 'session'],
                ['Cookie flags', 'HttpOnly, SameSite=Lax, Secure (on HTTPS)'],
                ['Auth method', 'Password (bcrypt) + optional OIDC SSO'],
              ].map(([prop, val]) => (
                <tr key={prop}>
                  <td className="px-4 py-2.5 text-muted-foreground">{prop}</td>
                  <td className="px-4 py-2.5 font-mono text-xs">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Endpoints */}
      {API_GROUPS.map((group) => (
        <section key={group.tag} className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight border-b border-border pb-2">{group.tag}</h2>
          <div className="space-y-2">
            {group.endpoints.map((ep) => (
              <div
                key={`${ep.method}-${ep.path}`}
                className="flex items-center gap-3 rounded-lg border border-border px-4 py-2.5 text-sm hover:bg-muted/30 transition-colors"
              >
                <MethodBadge method={ep.method} />
                <code className="font-mono text-xs flex-1">{ep.path}</code>
                <span className="text-muted-foreground text-right">{ep.summary}</span>
                {ep.auth === false && (
                  <Badge variant="secondary" className="text-[10px] shrink-0">no auth</Badge>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Breaking change note */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight border-b border-border pb-2">Breaking change: feed runtime fields</h2>
        <p className="text-sm text-muted-foreground">
          Feed runtime pull fields moved from top-level <code className="bg-muted px-1 rounded">feed.*</code> to
          nested <code className="bg-muted px-1 rounded">feed.fetch_state.*</code>. The following top-level
          fields were removed:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground font-mono">
          <li>last_build</li>
          <li>last_failure_at</li>
          <li>failure</li>
          <li>failures</li>
        </ul>
        <p className="text-sm text-muted-foreground">
          Clients must update to decode <code className="bg-muted px-1 rounded">fetch_state.*</code> before
          upgrading.
        </p>
      </section>
    </div>
  );
}
