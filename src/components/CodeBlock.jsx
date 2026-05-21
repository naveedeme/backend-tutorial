import { useState, useCallback } from 'react'

// ─── Syntax Highlighter ───────────────────────────────────────────────────────
function highlight(code, lang) {
  if (!code) return ''
  let s = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  const L = (lang || '').toLowerCase()

  if (L === 'sql') {
    const kw = /\b(SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|FULL|ON|AS|GROUP BY|ORDER BY|HAVING|LIMIT|OFFSET|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|INDEX|DROP|ALTER|ADD|COLUMN|PRIMARY|KEY|FOREIGN|REFERENCES|DEFAULT|NOT NULL|UNIQUE|CHECK|CONSTRAINT|BEGIN|COMMIT|ROLLBACK|TRANSACTION|IF|EXISTS|AND|OR|NOT|IN|LIKE|BETWEEN|IS|NULL|TRUE|FALSE|COUNT|SUM|AVG|MIN|MAX|DISTINCT|ALL|CASE|WHEN|THEN|ELSE|END|COALESCE|NOW|INTERVAL|WITH|UNION|EXCEPT|INTERSECT|RETURNING|CASCADE|TRIGGER|FUNCTION|RETURNS|LANGUAGE|DECLARE|DO|SAVEPOINT|PARTITION|OVER|RANK|ROW_NUMBER|DENSE_RANK|LAG|LEAD|WINDOW)\b/gi
    const fn = /\b(to_tsvector|to_tsquery|plainto_tsquery|setweight|array_to_string|jsonb_set|json_build_object|date_trunc|date_part|extract|current_date|current_time|current_timestamp|pg_sleep|gen_random_uuid)\b/gi
    s = s
      .replace(/--[^\n]*/g, m => `<span class="tok-comment">${m}</span>`)
      .replace(/'[^']*'/g, m => `<span class="tok-string">${m}</span>`)
      .replace(kw, m => `<span class="tok-sql-kw">${m}</span>`)
      .replace(fn, m => `<span class="tok-sql-fn">${m}</span>`)
      .replace(/\b\d+\.?\d*\b/g, m => `<span class="tok-number">${m}</span>`)
    return s
  }

  if (L === 'bash' || L === 'sh' || L === 'shell') {
    const lines = s.split('\n').map(line => {
      const trimmed = line.trimStart()
      if (trimmed.startsWith('#')) return `<span class="tok-comment">${line}</span>`
      const m = line.match(/^(\s*)([\w./-]+)(.*)$/)
      if (!m) return line
      const [, indent, cmd, rest] = m
      let r = rest
        .replace(/'[^']*'/g, m => `<span class="tok-bash-str">${m}</span>`)
        .replace(/"[^"]*"/g, m => `<span class="tok-bash-str">${m}</span>`)
        .replace(/\s(-[\w-]+)/g, (_, f) => ` <span class="tok-bash-flag">${f}</span>`)
      return `${indent}<span class="tok-bash-cmd">${cmd}</span>${r}`
    })
    return lines.join('\n')
  }

  if (L === 'prisma') {
    s = s
      .replace(/\/\/[^\n]*/g, m => `<span class="tok-comment">${m}</span>`)
      .replace(/"[^"]*"/g, m => `<span class="tok-string">${m}</span>`)
      .replace(/\b(model|enum|datasource|generator|type)\b/g, m => `<span class="tok-sql-kw">${m}</span>`)
      .replace(/\b(String|Int|Boolean|Float|Decimal|DateTime|Json|Bytes|BigInt)\b/g, m => `<span class="tok-type">${m}</span>`)
      .replace(/@[\w.()]+/g, m => `<span class="tok-function">${m}</span>`)
      .replace(/\b\d+\b/g, m => `<span class="tok-number">${m}</span>`)
    return s
  }

  // JS / TS / JSX / TSX
  if (['javascript','js','typescript','ts','jsx','tsx'].includes(L)) {
    const kwRe = /\b(const|let|var|function|class|return|if|else|for|while|do|switch|case|break|continue|import|export|default|from|async|await|try|catch|finally|throw|new|this|typeof|instanceof|in|of|true|false|null|undefined|void|static|super|extends|implements|interface|type|enum|namespace|module|require)\b/g
    const builtinRe = /\b(console|process|require|module|exports|Promise|Array|Object|String|Number|Boolean|Date|Math|JSON|Error|Map|Set|Buffer|setTimeout|setInterval|clearTimeout|clearInterval|fetch|Response|Request|URL|URLSearchParams|Event|EventEmitter|fs|path|http|https)\b/g
    s = s
      .replace(/\/\/[^\n]*/g, m => `<span class="tok-comment">${m}</span>`)
      .replace(/\/\*[\s\S]*?\*\//g, m => `<span class="tok-comment">${m}</span>`)
      .replace(/`[^`]*`/g, m => `<span class="tok-string">${m}</span>`)
      .replace(/'[^']*'/g, m => `<span class="tok-string">${m}</span>`)
      .replace(/"[^"]*"/g, m => `<span class="tok-string">${m}</span>`)
      .replace(kwRe, m => `<span class="tok-keyword">${m}</span>`)
      .replace(builtinRe, m => `<span class="tok-builtin">${m}</span>`)
      .replace(/\b([A-Z][A-Za-z0-9]*)\s*(?=[({])/g, (_, n) => `<span class="tok-type">${n}</span>`)
      .replace(/\b([a-z_][a-zA-Z0-9_]*)\s*(?=\()/g, (_, n) => `<span class="tok-function">${n}(</span>`)
      .replace(/\b\d+\.?\d*\b/g, m => `<span class="tok-number">${m}</span>`)
    return s
  }

  return s
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function CodeBlock({ code, lang = 'js', title, filename, compact = false }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code || '').then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [code])

  const highlighted = highlight(code || '', lang)

  return (
    <div className="code-block" style={{ fontSize: compact ? '12px' : undefined }}>
      <div className="code-block-header">
        <div className="dots">
          <div className="dot dot-red" />
          <div className="dot dot-yellow" />
          <div className="dot dot-green" />
        </div>
        <span className="code-block-lang">
          {filename || title || lang}
        </span>
        <button className="code-block-copy" onClick={handleCopy}>
          {copied ? '✓ copied' : 'copy'}
        </button>
      </div>
      <pre>
        <code dangerouslySetInnerHTML={{ __html: highlighted }} />
      </pre>
    </div>
  )
}
