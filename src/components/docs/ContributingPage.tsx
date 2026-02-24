import { CodeBlock } from '@/components/common/CodeBlock';

const SETUP = `# Install git hooks (commit message linting)
./scripts.sh setup-hooks

# Install frontend dependencies
cd frontend && pnpm install`;

const BACKEND_CHECKS = `cd backend
go test ./...
goimports -w .
go build -o /dev/null ./cmd/reedme`;

const FRONTEND_CHECKS = `cd frontend
npx tsc -b --noEmit
pnpm lint
pnpm build`;

const COMMIT_EXAMPLES = `feat(frontend): add dark mode toggle
fix(backend): prevent race condition in feed puller
docs: update installation instructions`;

export function ContributingPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Contributing</h1>
        <p className="text-muted-foreground">
          Contributions are welcome. ReedMe values simple, maintainable changes over complex abstractions.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight border-b border-border pb-2">Before you start</h2>
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
          <li>Search existing issues and PRs first.</li>
          <li>For bugs, include reproducible steps, expected behaviour, and actual behaviour.</li>
          <li>For features, explain the concrete use case and user value.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight border-b border-border pb-2">Local setup</h2>
        <p className="text-sm text-muted-foreground">
          Requirements: Go 1.25+, Node.js 24+, pnpm.
        </p>
        <CodeBlock code={SETUP} language="shell" />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight border-b border-border pb-2">
          Validation checklist (required before PR)
        </h2>

        <h3 className="font-medium">Backend</h3>
        <CodeBlock code={BACKEND_CHECKS} language="shell" />

        <h3 className="font-medium mt-4">Frontend</h3>
        <CodeBlock code={FRONTEND_CHECKS} language="shell" />

        <p className="text-sm text-muted-foreground">
          If your change is scoped, you can run a smaller test subset first, but run the relevant final checks
          before requesting review.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight border-b border-border pb-2">
          Commit message convention
        </h2>
        <p className="text-sm text-muted-foreground">
          ReedMe uses{' '}
          <a
            href="https://www.conventionalcommits.org/"
            target="_blank"
            rel="noreferrer"
            className="text-primary underline underline-offset-2 hover:no-underline"
          >
            Conventional Commits
          </a>{' '}
          for automated releases. Format:{' '}
          <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
            {'<type>[optional scope]: <description>'}
          </code>
        </p>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-2.5 font-semibold">Type</th>
                <th className="text-left px-4 py-2.5 font-semibold">When to use</th>
                <th className="text-left px-4 py-2.5 font-semibold">Version bump</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ['feat', 'New feature', 'minor'],
                ['fix', 'Bug fix', 'patch'],
                ['docs', 'Documentation changes', '—'],
                ['refactor', 'Code refactoring', '—'],
                ['perf', 'Performance improvements', '—'],
                ['test', 'Adding or updating tests', '—'],
                ['chore', 'Other changes', '—'],
              ].map(([type, when, bump]) => (
                <tr key={type} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-2.5 font-mono text-xs">{type}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{when}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{bump}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CodeBlock code={COMMIT_EXAMPLES} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight border-b border-border pb-2">Pull request expectations</h2>
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
          <li>Keep PRs focused — one PR, one clear problem.</li>
          <li>Use conventional commit format for commit messages.</li>
          <li>Explain <em>why</em> the change is needed, not only what changed.</li>
          <li>Include screenshots or GIFs for UI changes.</li>
          <li>Link related issue(s).</li>
          <li>Mark as Draft if not ready for review.</li>
          <li>If you use AI tools, review and validate outputs carefully before submission.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight border-b border-border pb-2">Code style guidelines</h2>
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
          <li>Prefer readable, self-explanatory naming.</li>
          <li>Avoid over-engineering.</li>
          <li>Add comments only for non-obvious logic or decisions.</li>
          <li>Keep docs and API behaviour aligned when changing contracts.</li>
        </ul>
      </section>
    </div>
  );
}
