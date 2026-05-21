import { useState } from 'react'
import { projects } from '../data/projectData.js'
import { TECH_COLORS } from '../data/courseData.js'
import CodeBlock from './CodeBlock.jsx'

const DIFF_ORDER = { Beginner: 0, Intermediate: 1, Advanced: 2 }

function StepCard({ step, index, isLast }) {
  const [open, setOpen] = useState(index === 0)

  return (
    <div style={{ position: 'relative' }}>
      {/* Connector line */}
      {!isLast && (
        <div style={{
          position: 'absolute', left: 19, top: '100%',
          width: 2, height: 24, zIndex: 0,
          background: 'linear-gradient(to bottom, var(--green), transparent)'
        }} />
      )}

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        marginBottom: 10,
        overflow: 'hidden',
        position: 'relative', zIndex: 1
      }}>
        <button
          style={{
            width: '100%', padding: '14px 18px',
            display: 'flex', alignItems: 'center', gap: 12,
            background: 'none', border: 'none', cursor: 'pointer',
            textAlign: 'left', fontFamily: 'var(--font-sans)'
          }}
          onClick={() => setOpen(o => !o)}
        >
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'var(--bg-elevated)', border: '2px solid var(--green)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--green)', fontSize: 14, fontWeight: 700, flexShrink: 0
          }}>
            {index + 1}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>{step.title}</div>
            {step.description && (
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{step.description}</div>
            )}
          </div>
          <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>{open ? '▾' : '▸'}</span>
        </button>

        {open && (
          <div style={{ borderTop: '1px solid var(--border)', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {step.commands?.length > 0 && (
              <div>
                <div style={{ fontSize: 12, color: 'var(--cyan)', fontWeight: 600, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                  ⌨ Commands
                </div>
                <div style={{
                  background: 'var(--bg-terminal)', borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border)', padding: '12px 14px',
                  fontFamily: 'var(--font-mono)', fontSize: 13
                }}>
                  {step.commands.map((cmd, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, marginBottom: i < step.commands.length - 1 ? 6 : 0 }}>
                      <span style={{ color: 'var(--green)', userSelect: 'none' }}>$</span>
                      <span style={{ color: '#c9d1d9' }}>{cmd}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step.code && (
              <div>
                <div style={{ fontSize: 12, color: 'var(--orange)', fontWeight: 600, marginBottom: 8 }}>
                  📄 {step.code.filename}
                </div>
                <CodeBlock code={step.code.content} lang={step.code.lang} compact />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function ProjectDetail({ project, onBack }) {
  const [tab, setTab] = useState('guide')

  return (
    <div style={{ padding: '28px 32px', maxWidth: 920 }} className="animate-fade-in">
      <button className="btn btn-ghost btn-sm" style={{ marginBottom: 20 }} onClick={onBack}>
        ← All Projects
      </button>

      {/* Header */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xl)',
        padding: '24px 28px',
        marginBottom: 24
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
              <span className={`badge diff-${project.difficulty.toLowerCase()}`}>{project.difficulty}</span>
              <span className="badge badge-dim">⏱ {project.duration}</span>
              <span className="badge badge-dim">{project.steps.length} steps</span>
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 10 }}>{project.title}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.6, maxWidth: 620 }}>
              {project.description}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
          {project.tags.map(tag => (
            <span key={tag} className="tag-pill">{tag}</span>
          ))}
        </div>

        {/* Key Concepts */}
        <div style={{ marginTop: 14 }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>KEY CONCEPTS</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {project.concepts.map(c => (
              <span key={c} className="badge badge-cyan">{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs" style={{ marginBottom: 24 }}>
        {['guide', 'frontend', 'concepts'].map(t => (
          <button key={t} className={`tab-item ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
            {t === 'guide' ? '📋 Step-by-Step Guide' : t === 'frontend' ? '🎨 Frontend Design' : '💡 Concepts'}
          </button>
        ))}
      </div>

      {tab === 'guide' && (
        <div>
          <div style={{
            padding: '12px 16px',
            background: 'rgba(0,229,255,.06)',
            border: '1px solid rgba(0,229,255,.2)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 20,
            fontSize: 13.5, color: 'var(--cyan)'
          }}>
            💡 Click each step to expand it. Copy commands directly into the terminal simulator.
          </div>

          {project.steps.map((step, i) => (
            <StepCard key={i} step={step} index={i} isLast={i === project.steps.length - 1} />
          ))}
        </div>
      )}

      {tab === 'frontend' && (
        <div style={{ padding: 24, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 32 }}>🎨</span>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>React Frontend Design</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Frontend notes for building the UI with React</p>
            </div>
          </div>
          <div style={{
            padding: 16, background: 'var(--bg-terminal)', borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)', fontSize: 14, lineHeight: 1.7, color: 'var(--text-secondary)'
          }}>
            {project.frontendNote}
          </div>

          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 12 }}>
              Suggested Frontend Stack:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 10 }}>
              {[
                { name: 'React 18', desc: 'UI framework', icon: '⚛' },
                { name: 'TypeScript', desc: 'Type safety', icon: '📘' },
                { name: 'Tailwind CSS', desc: 'Styling', icon: '🎨' },
                { name: 'React Query', desc: 'Data fetching', icon: '🔄' },
                { name: 'React Router', desc: 'Routing', icon: '🧭' },
                { name: 'Vite', desc: 'Build tool', icon: '⚡' },
              ].map(item => (
                <div key={item.name} style={{ padding: '10px 12px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 2 }}>
                    <span>{item.icon}</span>
                    <span style={{ fontWeight: 600, fontSize: 13 }}>{item.name}</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'concepts' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {project.concepts.map((concept, i) => (
            <div key={i} style={{ padding: '16px 18px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(0,230,118,.12)', border: '2px solid rgba(0,230,118,.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--green)', fontSize: 13, fontWeight: 700, flexShrink: 0
              }}>
                {i + 1}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{concept}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                  Core skill for this project
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Project Card ──────────────────────────────────────────────────────────────
function ProjectCard({ project, onClick }) {
  return (
    <div className="card" style={{ padding: 20, cursor: 'pointer', display: 'flex', flexDirection: 'column' }} onClick={onClick}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <span className={`badge diff-${project.difficulty.toLowerCase()}`}>{project.difficulty}</span>
        <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{project.duration}</span>
      </div>
      <h3 style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 6, lineHeight: 1.3 }}>{project.title}</h3>
      <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 12, lineHeight: 1.55, flex: 1 }}>
        {project.description}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
        {project.tags.slice(0, 4).map(tag => (
          <span key={tag} className="tag-pill">{tag}</span>
        ))}
        {project.tags.length > 4 && (
          <span className="tag-pill" style={{ color: 'var(--text-muted)' }}>+{project.tags.length - 4}</span>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          {project.steps.length} steps
        </span>
        <span style={{ fontSize: 12, color: 'var(--green)', fontWeight: 600 }}>View Guide →</span>
      </div>
    </div>
  )
}

// ─── Projects View ─────────────────────────────────────────────────────────────
export default function ProjectsView({ selectedProjectId, onSelectProject, onBack }) {
  const [filter, setFilter] = useState('All')
  const [sort, setSort] = useState('featured')

  const selectedProject = selectedProjectId ? projects.find(p => p.id === selectedProjectId) : null

  if (selectedProject) {
    return <ProjectDetail project={selectedProject} onBack={onBack} />
  }

  const diffs = ['All', 'Beginner', 'Intermediate', 'Advanced']
  const filtered = filter === 'All' ? projects : projects.filter(p => p.difficulty === filter)
  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
    if (sort === 'difficulty') return DIFF_ORDER[a.difficulty] - DIFF_ORDER[b.difficulty]
    return a.title.localeCompare(b.title)
  })

  return (
    <div style={{ padding: '28px 32px' }} className="animate-fade-in">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Project Library</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
          {projects.length} real-world projects with step-by-step guides, code examples, and React frontend design notes.
        </p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {diffs.map(d => (
            <button
              key={d}
              className={`badge ${filter === d ? (d === 'Beginner' ? 'diff-beginner' : d === 'Intermediate' ? 'diff-intermediate' : d === 'Advanced' ? 'diff-advanced' : 'badge-green') : 'badge-dim'}`}
              style={{ cursor: 'pointer', padding: '5px 14px', fontSize: 12 }}
              onClick={() => setFilter(d)}
            >
              {d}
            </button>
          ))}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Sort:</span>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            style={{
              background: 'var(--bg-elevated)', border: '1px solid var(--border)',
              color: 'var(--text-primary)', borderRadius: 'var(--radius-sm)',
              padding: '5px 10px', fontSize: 12, fontFamily: 'var(--font-sans)', cursor: 'pointer'
            }}
          >
            <option value="featured">Featured first</option>
            <option value="difficulty">By difficulty</option>
            <option value="name">A–Z</option>
          </select>
        </div>
      </div>

      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>
        Showing {sorted.length} project{sorted.length !== 1 ? 's' : ''}
      </div>

      <div className="grid-auto">
        {sorted.map(project => (
          <ProjectCard key={project.id} project={project} onClick={() => onSelectProject(project.id)} />
        ))}
      </div>
    </div>
  )
}
