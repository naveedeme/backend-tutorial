import { useState, useEffect, useRef, useCallback, useReducer } from 'react'
import {
  handleCommand, getCompletions, getInstallOutput,
  INITIAL_FS, INITIAL_CWD, INITIAL_DB_STATE
} from '../data/terminalData.js'

// ─── State ────────────────────────────────────────────────────────────────────
const INITIAL_STATE = {
  mode: 'bash',
  cwd: INITIAL_CWD,
  fs: INITIAL_FS,
  env: {},
  git: null,
  db: INITIAL_DB_STATE.psql,
  mongo: INITIAL_DB_STATE.mongo,
  history: [],
  historyIndex: -1,
}

// ─── Welcome Lines ────────────────────────────────────────────────────────────
const WELCOME = [
  { type: 'success', text: '╔══════════════════════════════════════════════════╗' },
  { type: 'success', text: '║   DevPath Terminal Simulator  v2.0              ║' },
  { type: 'success', text: '╚══════════════════════════════════════════════════╝' },
  { type: 'info', text: 'Node.js v20.14.0  |  npm 10.8.1  |  PostgreSQL 16.3  |  MongoDB 7.0.9' },
  { type: 'out', text: '' },
  { type: 'out', text: "Type 'help' to see all available commands." },
  { type: 'out', text: "Try: npm init -y → npm install express → node index.js" },
  { type: 'out', text: '' },
]

// ─── Install Simulation ───────────────────────────────────────────────────────
function InstallProgress({ packages, saveDev, restore, scaffoldType, scaffoldName, onDone }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState(0)
  const [done, setDone] = useState(false)
  const phases = restore
    ? ['Restoring packages...']
    : scaffoldType === 'next'
    ? [`Creating Next.js app '${scaffoldName}'...`, 'Installing dependencies...', 'Setting up TypeScript...', 'Initializing git...']
    : scaffoldType === 'cra'
    ? [`Creating React app '${scaffoldName}'...`, 'Installing packages...', 'Setting up template...']
    : packages.map(p => `Installing ${p.name}...`)

  useEffect(() => {
    let p = 0
    let ph = 0
    const tick = () => {
      p += Math.random() * 12 + 3
      if (p >= 100) {
        p = 100
        setProgress(100)
        ph++
        setPhase(ph)
        if (ph >= phases.length) {
          setTimeout(() => { setDone(true); onDone?.() }, 400)
          return
        }
        p = 0
        setTimeout(tick, 300)
      } else {
        setProgress(p)
        setTimeout(tick, 60 + Math.random() * 80)
      }
    }
    setTimeout(tick, 150)
  }, [])

  if (done) return null
  return (
    <div className="install-bar-wrap">
      {phases[phase] && <div className="install-pkg">{phases[phase]}</div>}
      <div className="install-progress">
        <div className="install-progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div style={{ color: '#6a737d', fontSize: 11 }}>
        {Math.round(progress)}% {progress < 100 ? '⠸' : '✓'}
      </div>
    </div>
  )
}

// ─── Output Line ──────────────────────────────────────────────────────────────
function OutputLine({ line, onInstallDone }) {
  if (line.type === 'clear') return null
  if (line.type === 'install') {
    return (
      <div className="terminal-line">
        <InstallProgress {...line} onDone={onInstallDone} />
      </div>
    )
  }
  if (line.type === 'html') {
    return (
      <div className="terminal-line out"
        dangerouslySetInnerHTML={{ __html: line.text.replace(/\n/g, '<br/>') }}
      />
    )
  }
  return (
    <div className={`terminal-line ${line.type || 'out'}`}>
      <span style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{line.text}</span>
    </div>
  )
}

// ─── Prompt ───────────────────────────────────────────────────────────────────
function getPrompt(mode, cwd) {
  const short = cwd.replace('/home/user', '~')
  if (mode === 'node') return 'node> '
  if (mode === 'psql') return 'psql=# '
  if (mode === 'mongo') return '> '
  return `user@devpath:${short}$ `
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Terminal({ preloadCommand }) {
  const [shellState, setShellState] = useState(INITIAL_STATE)
  const [outputLines, setOutputLines] = useState(WELCOME)
  const [input, setInput] = useState('')
  const [completions, setCompletions] = useState([])
  const [completionIdx, setCompletionIdx] = useState(-1)
  const [historyIdx, setHistoryIdx] = useState(-1)
  const [installing, setInstalling] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [tabs, setTabs] = useState([{ id: 0, label: 'bash', state: INITIAL_STATE, output: WELCOME }])

  const outputRef = useRef(null)
  const inputRef = useRef(null)
  const didPreload = useRef(false)

  // Auto-scroll
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [outputLines])

  // Focus input
  useEffect(() => { inputRef.current?.focus() }, [activeTab])

  // Preload command
  useEffect(() => {
    if (preloadCommand && !didPreload.current) {
      didPreload.current = true
      setTimeout(() => runCommand(preloadCommand), 500)
    }
  }, [preloadCommand])

  const addLines = useCallback((lines) => {
    setOutputLines(prev => {
      if (lines.some(l => l.type === 'clear')) return []
      return [...prev, ...lines.filter(l => l.type !== 'clear')]
    })
  }, [])

  const runCommand = useCallback((cmd) => {
    const trimmed = cmd.trim()
    if (!trimmed) return

    // Echo the command
    const prompt = getPrompt(shellState.mode, shellState.cwd)
    addLines([{ type: 'cmd', text: `${prompt}${trimmed}` }])

    // Run handler
    const { output, newState } = handleCommand(trimmed, shellState)

    // Check for install animation
    const installLine = output.find(l => l.type === 'install')
    if (installLine) {
      setInstalling(true)
      addLines(output)
    } else {
      addLines(output)
    }

    setShellState({
      ...newState,
      history: [trimmed, ...(newState.history || []).slice(0, 99)]
    })
    setHistoryIdx(-1)
  }, [shellState, addLines])

  const handleInstallDone = useCallback(() => {
    // Find the install line and get its post-output
    const installLine = outputLines.slice().reverse().find(l => l.type === 'install')
    if (installLine) {
      const afterLines = getInstallOutput(
        installLine.packages || [],
        installLine.saveDev,
        installLine.restore
      )
      setOutputLines(prev => [...prev, ...afterLines])
    }
    setInstalling(false)
  }, [outputLines])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (completions.length && completionIdx >= 0) {
        setInput(completions[completionIdx])
        setCompletions([])
        setCompletionIdx(-1)
        return
      }
      if (!installing) {
        runCommand(input)
        setInput('')
        setCompletions([])
        setCompletionIdx(-1)
        setHistoryIdx(-1)
      }
      return
    }

    if (e.key === 'Tab') {
      e.preventDefault()
      if (completions.length === 0) {
        const newComps = getCompletions(input, shellState)
        if (newComps.length === 1) {
          setInput(newComps[0])
        } else if (newComps.length > 1) {
          setCompletions(newComps)
          setCompletionIdx(0)
        }
      } else {
        setCompletionIdx(i => (i + 1) % completions.length)
      }
      return
    }

    if (e.key === 'Escape') {
      setCompletions([])
      setCompletionIdx(-1)
      return
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const hist = shellState.history || []
      const idx = Math.min(historyIdx + 1, hist.length - 1)
      setHistoryIdx(idx)
      if (hist[idx] !== undefined) setInput(hist[idx])
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const hist = shellState.history || []
      const idx = historyIdx - 1
      setHistoryIdx(idx)
      setInput(idx >= 0 ? (hist[idx] || '') : '')
      return
    }

    if (e.key === 'ArrowDown' && completions.length > 0) {
      e.preventDefault()
      setCompletionIdx(i => Math.min(i + 1, completions.length - 1))
      return
    }

    if (e.ctrlKey && e.key === 'c') {
      e.preventDefault()
      addLines([{ type: 'cmd', text: `${getPrompt(shellState.mode, shellState.cwd)}${input}^C` }])
      setInput('')
      setInstalling(false)
      return
    }

    if (e.ctrlKey && e.key === 'l') {
      e.preventDefault()
      setOutputLines([])
      return
    }

    setCompletions([])
    setCompletionIdx(-1)
  }, [input, completions, completionIdx, historyIdx, shellState, installing, runCommand, addLines])

  // New tab
  const addTab = () => {
    const id = Date.now()
    const newTab = { id, label: 'bash', state: INITIAL_STATE, output: WELCOME }
    setTabs(prev => [...prev, newTab])
    setActiveTab(id)
    setShellState(INITIAL_STATE)
    setOutputLines(WELCOME)
    setInput('')
  }

  // Switch tab
  const switchTab = (id) => {
    // Save current tab state
    setTabs(prev => prev.map(t =>
      t.id === activeTab
        ? { ...t, state: shellState, output: outputLines }
        : t
    ))
    const tab = tabs.find(t => t.id === id)
    if (tab) {
      setActiveTab(id)
      setShellState(tab.state)
      setOutputLines(tab.output)
    }
  }

  // Close tab
  const closeTab = (id, e) => {
    e.stopPropagation()
    if (tabs.length <= 1) return
    const newTabs = tabs.filter(t => t.id !== id)
    setTabs(newTabs)
    if (activeTab === id) {
      const newActive = newTabs[newTabs.length - 1]
      setActiveTab(newActive.id)
      setShellState(newActive.state)
      setOutputLines(newActive.output)
    }
  }

  const prompt = getPrompt(shellState.mode, shellState.cwd)
  const modeLabel = shellState.mode === 'bash' ? 'bash' : shellState.mode === 'node' ? 'node REPL' : shellState.mode === 'psql' ? 'PostgreSQL' : 'MongoDB'
  const modeColor = shellState.mode === 'bash' ? '#00e676' : shellState.mode === 'node' ? '#f7df1e' : shellState.mode === 'psql' ? '#336791' : '#47a248'

  return (
    <div className="terminal-wrap" onClick={() => inputRef.current?.focus()}>
      {/* Title Bar */}
      <div className="terminal-titlebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <div className="dot dot-red" style={{ cursor: 'pointer' }} />
            <div className="dot dot-yellow" style={{ cursor: 'pointer' }} />
            <div className="dot dot-green" style={{ cursor: 'pointer' }} />
          </div>
          <span style={{ color: '#6a737d', fontSize: 12, marginLeft: 6, fontFamily: 'var(--font-mono)' }}>
            Terminal
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 10, background: modeColor + '22', color: modeColor, fontFamily: 'var(--font-mono)', border: `1px solid ${modeColor}44` }}>
            {modeLabel}
          </span>
          <span style={{ color: '#6a737d', fontSize: 11, fontFamily: 'var(--font-mono)' }}>
            {shellState.cwd.replace('/home/user', '~')}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="terminal-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`terminal-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => switchTab(tab.id)}
          >
            ⌨ {tab.label}
            {tabs.length > 1 && (
              <span
                onClick={e => closeTab(tab.id, e)}
                style={{ marginLeft: 6, opacity: 0.5, fontSize: 10 }}
              >×</span>
            )}
          </button>
        ))}
        <button
          className="terminal-tab"
          onClick={addTab}
          title="New terminal"
          style={{ opacity: 0.5 }}
        >+</button>
      </div>

      {/* Output */}
      <div className="terminal-output" ref={outputRef}>
        {outputLines.map((line, i) => (
          <OutputLine key={i} line={line} onInstallDone={handleInstallDone} />
        ))}
        {installing && (
          <div className="terminal-line" style={{ color: '#6a737d', fontSize: 11 }}>
            <span className="animate-pulse">Installing packages…</span>
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{ position: 'relative' }}>
        {completions.length > 0 && (
          <div className="completion-list">
            {completions.map((c, i) => (
              <div
                key={c}
                className={`completion-item ${i === completionIdx ? 'selected' : ''}`}
                onClick={() => { setInput(c); setCompletions([]); inputRef.current?.focus() }}
              >
                {c}
              </div>
            ))}
          </div>
        )}
        <div className="terminal-input-row">
          <span className="terminal-prompt" style={{ color: modeColor, fontSize: 12.5, whiteSpace: 'nowrap' }}>
            {prompt}
          </span>
          <input
            ref={inputRef}
            className="terminal-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            disabled={installing}
            placeholder={installing ? 'Installing…' : ''}
          />
          <span className="terminal-cursor" style={{ background: modeColor }} />
        </div>
      </div>
    </div>
  )
}
