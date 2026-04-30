"use client"
import * as React from "react"
import { codeToHtml } from "shiki"
import { Copy, Check } from "lucide-react"
import { cn } from "../utils"

export interface CodeBlockProps {
  children: string
  language?: "tsx" | "ts" | "css" | "html" | "bash" | "json"
  className?: string
}

export function CodeBlock({ children, language = "tsx", className }: CodeBlockProps) {
  const [html, setHtml] = React.useState<string>("")
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    let mounted = true
    codeToHtml(children, {
      lang: language,
      theme: "github-light",
    }).then((rendered) => {
      if (mounted) setHtml(rendered)
    })
    return () => { mounted = false }
  }, [children, language])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  // shiki output is trusted — content comes from controlled showcase pages,
  // not user input. dangerouslySetInnerHTML is required for syntax highlight markup.
  return (
    <div className={cn("relative group rounded-[var(--radius-md)] border border-[var(--color-border)] overflow-hidden bg-[var(--color-surface)]", className)}>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copiado" : "Copiar código"}
        className="absolute top-2 right-2 inline-flex items-center justify-center h-8 w-8 rounded-md bg-[var(--color-bg)] border border-[var(--color-border)] opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity hover:bg-[var(--color-surface-muted)]"
      >
        {copied ? <Check className="h-4 w-4 text-[var(--color-success)]" /> : <Copy className="h-4 w-4 text-[var(--color-text-muted)]" />}
      </button>
      <div
        className="text-sm font-mono leading-relaxed [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:bg-transparent"
        dangerouslySetInnerHTML={{ __html: html || `<pre><code>${children}</code></pre>` }}
      />
    </div>
  )
}
