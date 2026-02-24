export interface Change {
  type: 'feat' | 'fix' | 'chore';
  description: string;
  pr?: number;
  prUrl?: string;
}

export interface Release {
  version: string;
  date: string;
  url?: string;
  changes: Change[];
}

// Strip trailing commit hash link: ([abc1234](url))
const COMMIT_LINK_RE = /\s*\(\[([0-9a-f]{7,})\]\([^)]+\)\)\s*$/;

// PR reference: ([#123](url))
const PR_LINK_RE = /\(\[#(\d+)\]\(([^)]+)\)\)/;

// Strip bold scope prefix: **scope:**
const SCOPE_RE = /^\*\*[^*]+\*\*:\s*/;

function parseLine(raw: string): Pick<Change, 'description' | 'pr' | 'prUrl'> {
  let text = raw.trim().replace(/^\*\s*/, '');

  // Remove commit hash link at end
  text = text.replace(COMMIT_LINK_RE, '');

  // Extract PR number/url
  const prMatch = PR_LINK_RE.exec(text);
  const pr = prMatch ? parseInt(prMatch[1], 10) : undefined;
  const prUrl = prMatch ? prMatch[2] : undefined;

  // Remove the PR link from the description
  text = text.replace(PR_LINK_RE, '').trim();

  // Remove bold scope prefix
  text = text.replace(SCOPE_RE, '');

  // Clean up trailing punctuation artifacts
  text = text.replace(/\s+$/, '');

  return { description: text, pr, prUrl };
}

export function parseChangelog(markdown: string): Release[] {
  const releases: Release[] = [];
  // Split on release headings: ## [x.y.z] or ## x.y.z
  const sections = markdown.split(/^## /m).slice(1);

  for (const section of sections) {
    const lines = section.split('\n');
    const heading = lines[0].trim();

    // Parse version and date from: [1.2.3](url) (2026-01-01) or 1.0.0 (2026-01-01)
    const versionMatch = /^\[?([^\]()]+)\]?(?:\([^)]*\))?\s+\((\d{4}-\d{2}-\d{2})\)/.exec(heading);
    if (!versionMatch) continue;

    const version = versionMatch[1];
    const date = versionMatch[2];
    const urlMatch = /^\[([^\]]+)\]\(([^)]+)\)/.exec(heading);
    const url = urlMatch ? urlMatch[2] : undefined;

    const changes: Change[] = [];
    let currentType: Change['type'] = 'chore';

    for (const line of lines.slice(1)) {
      const trimmed = line.trim();
      if (trimmed === '### Features') { currentType = 'feat'; continue; }
      if (trimmed === '### Bug Fixes') { currentType = 'fix'; continue; }
      if (trimmed.startsWith('### ')) { currentType = 'chore'; continue; }
      if (trimmed.startsWith('* ')) {
        changes.push({ type: currentType, ...parseLine(trimmed) });
      }
    }

    if (changes.length > 0) {
      releases.push({ version, date, url, changes });
    }
  }

  return releases;
}
