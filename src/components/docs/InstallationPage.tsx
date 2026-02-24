import { CodeBlock } from '@/components/common/CodeBlock';

const DOCKER_RUN = `docker run -it -d -p 8080:8080 \\
  -v $(pwd)/reedme:/data \\
  -e REEDME_PASSWORD="reedme" \\
  ghcr.io/patrickjmcd/reedme:latest`;

const DOCKER_COMPOSE = `version: "3"
services:
  reedme:
    image: ghcr.io/patrickjmcd/reedme:latest
    ports:
      - "127.0.0.1:8080:8080"
    environment:
      - REEDME_PASSWORD=reedme
    restart: unless-stopped
    volumes:
      - ./data:/data`;

const DOCKER_TAGS = `# Latest stable release
ghcr.io/patrickjmcd/reedme:latest

# Latest development build (main branch)
ghcr.io/patrickjmcd/reedme:main`;

const BUILD_FROM_SOURCE = `# Requirements: Go 1.25+, Node.js 24+, pnpm

git clone https://github.com/patrickjmcd/reedme.git
cd reedme

# Build everything (backend + frontend)
./scripts.sh build`;

export function InstallationPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Installation</h1>
        <p className="text-muted-foreground">Multiple ways to run ReedMe — choose what fits your setup.</p>
      </div>

      {/* Docker */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight border-b border-border pb-2">Docker (recommended)</h2>
        <p className="text-sm text-muted-foreground">The easiest path. No build step required.</p>

        <h3 className="font-medium">Image tags</h3>
        <CodeBlock code={DOCKER_TAGS} language="shell" />

        <h3 className="font-medium mt-4">docker run</h3>
        <CodeBlock code={DOCKER_RUN} language="shell" />

        <h3 className="font-medium mt-4">Docker Compose</h3>
        <CodeBlock code={DOCKER_COMPOSE} language="yaml" />
      </section>

      {/* Binary */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight border-b border-border pb-2">Pre-built binary</h2>
        <p className="text-sm text-muted-foreground">
          Download a pre-compiled binary for your platform from the{' '}
          <a
            href="https://github.com/patrickjmcd/reedme/releases"
            target="_blank"
            rel="noreferrer"
            className="text-primary underline underline-offset-2 hover:no-underline"
          >
            GitHub Releases page
          </a>
          . No runtime dependencies required.
        </p>
        <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
          <li>Download the archive for your OS/architecture.</li>
          <li>Extract the binary.</li>
          <li>
            Set <code className="bg-muted px-1 rounded text-foreground">REEDME_PASSWORD</code> and run.
          </li>
        </ol>
      </section>

      {/* Build from source */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight border-b border-border pb-2">Build from source</h2>
        <p className="text-sm text-muted-foreground">
          Requires Go 1.25+ and Node.js 24+ with pnpm.
        </p>
        <CodeBlock code={BUILD_FROM_SOURCE} language="shell" />
      </section>
    </div>
  );
}
