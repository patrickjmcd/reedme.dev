import { Rss, Github } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 gap-4">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <Rss className="h-5 w-5 text-primary" />
          <span>ReedMe</span>
          <span className="text-muted-foreground font-normal text-sm">docs</span>
        </div>
        <div className="flex-1" />
        <a
          href="https://github.com/patrickjmcd/reedme"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Github className="h-4 w-4" />
          GitHub
        </a>
      </div>
    </header>
  );
}
