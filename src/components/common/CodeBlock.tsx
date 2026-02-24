interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code }: CodeBlockProps) {
  return (
    <pre className="rounded-lg bg-muted p-4 overflow-x-auto text-sm font-mono leading-relaxed">
      <code>{code.trim()}</code>
    </pre>
  );
}
