import { Badge } from '@/components/ui/badge';
import { CodeBlock } from '@/components/common/CodeBlock';

const FEATURES = [
  {
    title: 'Fast reading workflow',
    description:
      'Unread tracking, bookmarks, search, and Google Reader-style keyboard shortcuts keep you focused.',
  },
  {
    title: 'Feed management',
    description: 'RSS/Atom parsing, feed auto-discovery, OPML import/export, and group organisation.',
  },
  {
    title: 'Responsive PWA',
    description: 'Works on desktop and mobile. Installable as a Progressive Web App.',
  },
  {
    title: 'Self-hosting friendly',
    description: 'Single binary or Docker deployment. Runs anywhere Go runs.',
  },
  {
    title: 'Built-in i18n',
    description: 'Ships with English, Chinese, German, French, Spanish, Russian, Portuguese, and Swedish.',
  },
  {
    title: 'No AI by design',
    description: 'Focused, distraction-free RSS reading. No algorithmic feeds, no summaries.',
  },
];

const DOCKER_QUICK_START = `docker run -it -d -p 8080:8080 \\
  -v $(pwd)/reedme:/data \\
  -e REEDME_PASSWORD="reedme" \\
  ghcr.io/patrickjmcd/reedme:latest`;

export function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Open Source</Badge>
            <Badge variant="secondary">Self-hosted</Badge>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">ReedMe</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            A lightweight, self-hosted RSS reader. Fast reading workflow, keyboard-driven, no AI.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href="#installation"
            className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Get Started
          </a>
          <a
            href="https://github.com/patrickjmcd/reedme"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-md border border-border text-sm font-medium hover:bg-accent transition-colors"
          >
            View on GitHub
          </a>
        </div>
      </section>

      {/* Screenshots */}
      <section className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <img
            src="/article_list_light.png"
            alt="Article list view"
            className="rounded-lg border border-border shadow-sm w-full"
          />
          <img
            src="/article_detail_light.png"
            alt="Article detail view"
            className="rounded-lg border border-border shadow-sm w-full"
          />
        </div>
      </section>

      {/* Features */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Features</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-lg border border-border p-4 space-y-2">
              <h3 className="font-semibold text-sm">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick start */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Quick Start</h2>
        <p className="text-muted-foreground">
          The fastest way to run ReedMe is with Docker. Open{' '}
          <code className="text-sm bg-muted px-1.5 py-0.5 rounded">http://localhost:8080</code> after the
          container starts.
        </p>
        <CodeBlock code={DOCKER_QUICK_START} language="shell" />
        <p className="text-sm text-muted-foreground">
          For other installation options see the{' '}
          <a href="#installation" className="text-primary underline underline-offset-2 hover:no-underline">
            Installation guide
          </a>
          .
        </p>
      </section>

      {/* Tech stack */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Tech Stack</h2>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-2.5 font-semibold">Layer</th>
                <th className="text-left px-4 py-2.5 font-semibold">Technology</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ['Backend language', 'Go 1.25'],
                ['HTTP framework', 'Gin'],
                ['Database', 'SQLite (default) or PostgreSQL'],
                ['Frontend framework', 'React 19 + TypeScript'],
                ['Build tool', 'Vite'],
                ['Router', 'TanStack Router'],
                ['Data fetching', 'TanStack Query'],
                ['UI system', 'shadcn/ui + Tailwind CSS'],
                ['Feed parsing', 'gofeed'],
              ].map(([area, tech]) => (
                <tr key={area} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-2.5 text-muted-foreground">{area}</td>
                  <td className="px-4 py-2.5">{tech}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
