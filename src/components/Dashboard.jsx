import { useMemo } from 'react'
import { courses, TECH_COLORS, TECH_ICONS } from '../data/courseData.js'
import { projects } from '../data/projectData.js'

const STATS = [
  { label: 'Technologies', value: '8', icon: '⚡', color: 'var(--green)' },
  { label: 'Modules', value: '40+', icon: '📦', color: 'var(--cyan)' },
  { label: 'Code Examples', value: '120+', icon: '💻', color: 'var(--orange)' },
  { label: 'Projects', value: '15+', icon: '🚀', color: '#a78bfa' },
]

const QUICK_COMMANDS = [
  { label: 'npm init', cmd: 'npm init -y', desc: 'Initialize a Node project', color: 'var(--green)' },
  { label: 'npm install express', cmd: 'npm install express', desc: 'Install Express.js', color: 'var(--cyan)' },
  { label: 'npx prisma init', cmd: 'npx prisma init', desc: 'Setup Prisma ORM', color: '#a78bfa' },
  { label: 'psql', cmd: 'psql', desc: 'Open PostgreSQL shell', color: '#336791' },
  { label: 'mongosh', cmd: 'mongosh', desc: 'Open MongoDB shell', color: 'var(--green-dim)' },
  { label: 'node', cmd: 'node', desc: 'Open Node.js REPL', color: 'var(--yellow)' },
]

const LEARNING_PATH = [
  { step: 1, title: 'Node.js Basics', desc: 'Modules, fs, HTTP, events', tech: 'nodejs', time: '1–2 days' },
  { step: 2, title: 'Express APIs', desc: 'Routing, middleware, auth', tech: 'express', time: '2–3 days' },
  { step: 3, title: 'SQL & PostgreSQL', desc: 'Queries, joins, indexes', tech: 'postgresql', time: '2–3 days' },
  { step: 4, title: 'Prisma ORM', desc: 'Schema, migrations, CRUD', tech: 'prisma', time: '1–2 days' },
  { step: 5, title: 'MongoDB & Mongoose', desc: 'Documents, aggregation', tech: 'mongodb', time: '2–3 days' },
  { step: 6, title: 'Next.js Full-Stack', desc: 'App Router, SSR, API routes', tech: 'nextjs', time: '3–5 days' },
]

export default function Dashboard({ onNavigate, progress, onTerminalCommand }) {
  const totalLessons = useMemo(() =>
    courses.reduce((t, c) => t + c.modules.reduce((m, mod) => m + mod.lessons.length, 0), 0)
  , [])

  const completedLessons = useMemo(() =>
    Object.values(progress || {}).filter(Boolean).length
  , [progress])

  const pct = totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1100, margin: '0 auto' }}>
      {/* Hero */}
      <div style={{ marginBottom: 36 }} className="animate-fade-in">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 28 }}>⬡</span>
              <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--green)', letterSpacing: '.1em' }}>
                DEVPATH v2.0
              </span>
            </div>
            <h1 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.1, marginBottom: 12 }}>
              Backend <span style={{ background: 'linear-gradient(135deg,var(--green),var(--cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Mastery</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 16, maxWidth: 520 }}>
              Master Node.js, Express, Next.js, SQL, PostgreSQL, Prisma, NoSQL &amp; MongoDB — from zero to production with an interactive terminal simulator.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <button className="btn btn-primary" onClick={() => onNavigate('courses')}>
              Start Learning →
            </button>
            <button className="btn btn-ghost" onClick={() => onNavigate('terminal')}>
              ⌨ Open Terminal
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        {completedLessons > 0 && (
          <div style={{ marginTop: 24, padding: 16, background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Overall Progress</span>
              <span style={{ color: 'var(--green)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                {completedLessons}/{totalLessons} lessons · {pct}%
              </span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{
                width: `${pct}%`,
                background: 'linear-gradient(90deg, var(--green), var(--cyan))'
              }} />
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid-2" style={{ gridTemplateColumns: 'repeat(4,1fr)', marginBottom: 32, gap: 12 }}>
        {STATS.map(s => (
          <div key={s.label} className="card" style={{ padding: '16px 18px', textAlign: 'center' }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: s.color, fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
              {s.value}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Learning Path */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>🗺 Recommended Learning Path</h2>
          <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('courses')}>
            All Courses →
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 12 }}>
          {LEARNING_PATH.map((step, i) => {
            const color = TECH_COLORS[step.tech]
            const icon = TECH_ICONS[step.tech]
            const isDone = progress?.[`${step.tech}-done`]
            return (
              <div
                key={step.step}
                className="card"
                style={{ padding: 16, cursor: 'pointer', borderColor: isDone ? color + '66' : undefined }}
                onClick={() => onNavigate('course', step.tech)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: color + '22', border: `2px solid ${color}55`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, flexShrink: 0
                  }}>
                    {isDone ? '✓' : step.step}
                  </div>
                  <div style={{ fontSize: 20 }}>{icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{step.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{step.time}</div>
                  </div>
                </div>
                <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', margin: 0 }}>{step.desc}</p>
                {i < LEARNING_PATH.length - 1 && (
                  <div style={{ position: 'absolute', bottom: -13, left: '50%', transform: 'translateX(-50%)', color: 'var(--border-bright)', fontSize: 10 }}>▼</div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Quick Terminal */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>⚡ Quick Commands</h2>
          <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('terminal')}>
            Full Terminal →
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 10 }}>
          {QUICK_COMMANDS.map(qc => (
            <button
              key={qc.cmd}
              style={{
                background: 'var(--bg-terminal)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 14px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all .2s',
                display: 'flex', flexDirection: 'column', gap: 4
              }}
              onClick={() => onNavigate('terminal', null, qc.cmd)}
              onMouseEnter={e => { e.currentTarget.style.borderColor = qc.color; e.currentTarget.style.background = 'var(--bg-elevated)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-terminal)' }}
            >
              <code style={{ color: qc.color, fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600 }}>
                $ {qc.cmd}
              </code>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{qc.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Projects */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>🚀 Featured Projects</h2>
          <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('projects')}>
            All Projects →
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 14 }}>
          {projects.filter(p => p.featured).slice(0, 4).map(proj => (
            <div
              key={proj.id}
              className="card"
              style={{ padding: 18, cursor: 'pointer' }}
              onClick={() => onNavigate('project', proj.id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span className={`badge diff-${proj.difficulty.toLowerCase()}`}>{proj.difficulty}</span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{proj.duration}</span>
              </div>
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, lineHeight: 1.3 }}>{proj.title}</h3>
              <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 12, lineHeight: 1.5 }}>
                {proj.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {proj.tags.slice(0, 4).map(tag => (
                  <span key={tag} className="tag-pill">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack Overview */}
      <div>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>🔧 Full Stack at a Glance</h2>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 16 }}>
            {courses.map(c => (
              <div
                key={c.id}
                style={{ cursor: 'pointer', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: `1px solid ${c.color}33`, background: c.color + '0a', transition: 'all .2s' }}
                onClick={() => onNavigate('course', c.id)}
                onMouseEnter={e => { e.currentTarget.style.background = c.color + '18'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = c.color + '0a'; e.currentTarget.style.transform = 'none' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <span style={{ fontSize: 20 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: c.color }}>{c.title}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {c.modules.reduce((t, m) => t + m.lessons.length, 0)} lessons
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: 11.5, color: 'var(--text-muted)', margin: 0 }}>{c.tagline}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
