import { useState, useMemo } from 'react'
import { courses, TECH_COLORS, TECH_ICONS } from '../data/courseData.js'
import CodeBlock from './CodeBlock.jsx'

// ─── Markdown-like Content Renderer ───────────────────────────────────────────
function ContentRenderer({ text }) {
  const lines = text.split('\n')
  const elements = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('**') && line.includes('|')) {
      // Table detection
      const tableLines = []
      while (i < lines.length && lines[i].includes('|')) {
        tableLines.push(lines[i])
        i++
      }
      const headers = tableLines[0].split('|').map(h => h.trim()).filter(Boolean)
      const rows = tableLines.slice(2).map(r => r.split('|').map(c => c.trim()).filter(Boolean))
      elements.push(
        <table key={i}>
          <thead><tr>{headers.map((h, j) => <th key={j}>{h}</th>)}</tr></thead>
          <tbody>{rows.map((r, j) => <tr key={j}>{r.map((c, k) => <td key={k}>{c}</td>)}</tr>)}</tbody>
        </table>
      )
      continue
    }

    if (line.startsWith('**') && line.endsWith('**') && !line.slice(2,-2).includes('**')) {
      elements.push(<h3 key={i} style={{ color: 'var(--text-primary)', marginBottom: 8, marginTop: 16 }}>{line.slice(2,-2)}</h3>)
      i++; continue
    }

    if (line.startsWith('- ') || line.startsWith('* ')) {
      const items = []
      while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('* '))) {
        items.push(lines[i].slice(2))
        i++
      }
      elements.push(
        <ul key={i}>
          {items.map((item, j) => <li key={j} dangerouslySetInnerHTML={{ __html: parseInline(item) }} />)}
        </ul>
      )
      continue
    }

    if (line.trim() === '') {
      elements.push(<br key={i} />)
      i++; continue
    }

    elements.push(
      <p key={i} dangerouslySetInnerHTML={{ __html: parseInline(line) }} />
    )
    i++
  }

  return <div className="lesson-content">{elements}</div>
}

function parseInline(text) {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
}

// ─── Lesson View ──────────────────────────────────────────────────────────────
function LessonView({ lesson, onComplete, isCompleted, onBack }) {
  const [activeExample, setActiveExample] = useState(0)
  const [showExercise, setShowExercise] = useState(false)
  const [exerciseDone, setExerciseDone] = useState(false)

  const levelColor = {
    Beginner: 'var(--green)',
    Intermediate: 'var(--yellow)',
    Advanced: 'var(--orange)'
  }[lesson.level] || 'var(--text-muted)'

  return (
    <div className="animate-fade-in" style={{ maxWidth: 820 }}>
      {/* Back */}
      <button className="btn btn-ghost btn-sm" style={{ marginBottom: 20 }} onClick={onBack}>
        ← Back to module
      </button>

      {/* Header */}
      <div style={{ marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <span className="badge" style={{ color: levelColor, background: levelColor + '18', border: `1px solid ${levelColor}33` }}>
            {lesson.level}
          </span>
          <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            ⏱ {lesson.duration}
          </span>
          {isCompleted && <span className="badge badge-green">✓ Completed</span>}
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 0 }}>{lesson.title}</h1>
      </div>

      {/* Content */}
      <div style={{ marginBottom: 28 }}>
        <ContentRenderer text={lesson.content} />
      </div>

      {/* Code Examples */}
      {lesson.examples && lesson.examples.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            💻 Code Examples
          </h2>
          {lesson.examples.length > 1 && (
            <div className="tabs" style={{ marginBottom: 12 }}>
              {lesson.examples.map((ex, i) => (
                <button key={i} className={`tab-item ${activeExample === i ? 'active' : ''}`} onClick={() => setActiveExample(i)}>
                  {ex.title}
                </button>
              ))}
            </div>
          )}
          {lesson.examples[activeExample] && (
            <div className="animate-fade-in">
              {lesson.examples.length === 1 && (
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>
                  {lesson.examples[0].title}
                </div>
              )}
              <CodeBlock
                code={lesson.examples[activeExample].code}
                lang={lesson.examples[activeExample].lang}
              />
            </div>
          )}
        </div>
      )}

      {/* Exercise */}
      {lesson.exercise && (
        <div style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-bright)',
          borderLeft: '3px solid var(--cyan)',
          borderRadius: 'var(--radius-md)',
          padding: 20,
          marginBottom: 28
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--cyan)', margin: 0 }}>
              🏋 Practice Exercise
            </h3>
            {exerciseDone && <span className="badge badge-green">✓ Done</span>}
          </div>
          <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6, fontSize: 14 }}>
            {lesson.exercise}
          </p>
          {!exerciseDone && (
            <button
              className="btn btn-outline btn-sm"
              style={{ marginTop: 12 }}
              onClick={() => setExerciseDone(true)}
            >
              Mark as Complete
            </button>
          )}
        </div>
      )}

      {/* Complete Button */}
      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', paddingTop: 16, borderTop: '1px solid var(--border)' }}>
        {!isCompleted ? (
          <button className="btn btn-primary" onClick={onComplete}>
            ✓ Mark Lesson Complete
          </button>
        ) : (
          <span className="badge badge-green" style={{ padding: '8px 16px', fontSize: 13 }}>
            ✓ Lesson Completed
          </span>
        )}
      </div>
    </div>
  )
}

// ─── Module Accordion ─────────────────────────────────────────────────────────
function ModuleItem({ mod, courseColor, onSelectLesson, progress }) {
  const [open, setOpen] = useState(true)
  const completed = mod.lessons.filter(l => progress?.[l.id]).length

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      marginBottom: 10
    }}>
      <button
        style={{
          width: '100%', padding: '14px 18px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)',
          fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 15, textAlign: 'left'
        }}
        onClick={() => setOpen(o => !o)}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: courseColor }}>{open ? '▾' : '▸'}</span>
          {mod.title}
          <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 400 }}>
            {mod.lessons.length} lessons
          </span>
        </span>
        <span style={{ fontSize: 12, color: completed === mod.lessons.length ? courseColor : 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          {completed}/{mod.lessons.length}
        </span>
      </button>

      {open && (
        <div style={{ borderTop: '1px solid var(--border)' }}>
          {mod.lessons.map((lesson, i) => {
            const done = progress?.[lesson.id]
            return (
              <button
                key={lesson.id}
                style={{
                  width: '100%', padding: '12px 18px 12px 32px',
                  display: 'flex', alignItems: 'center', gap: 12,
                  background: 'none', border: 'none',
                  borderBottom: i < mod.lessons.length - 1 ? '1px solid var(--border)' : 'none',
                  cursor: 'pointer', textAlign: 'left',
                  transition: 'background .15s',
                  color: done ? courseColor : 'var(--text-secondary)',
                  fontFamily: 'var(--font-sans)'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-elevated)'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
                onClick={() => onSelectLesson(lesson)}
              >
                <span style={{
                  width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                  border: `2px solid ${done ? courseColor : 'var(--border-bright)'}`,
                  background: done ? courseColor : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, color: done ? '#000' : 'transparent'
                }}>✓</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 13.5 }}>{lesson.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', display: 'flex', gap: 8, marginTop: 2 }}>
                    <span>{lesson.level}</span>
                    <span>·</span>
                    <span>{lesson.duration}</span>
                  </div>
                </div>
                <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>→</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ─── Single Course View ───────────────────────────────────────────────────────
function SingleCourseView({ course, onBack, progress, onComplete }) {
  const [selectedLesson, setSelectedLesson] = useState(null)
  const color = TECH_COLORS[course.id]
  const icon = TECH_ICONS[course.id]
  const totalLessons = course.modules.reduce((t, m) => t + m.lessons.length, 0)
  const completedLessons = course.modules.reduce((t, m) => t + m.lessons.filter(l => progress?.[l.id]).length, 0)
  const pct = totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0

  if (selectedLesson) {
    return (
      <div style={{ padding: '28px 32px' }}>
        <LessonView
          lesson={selectedLesson}
          isCompleted={!!progress?.[selectedLesson.id]}
          onComplete={() => onComplete(selectedLesson.id)}
          onBack={() => setSelectedLesson(null)}
        />
      </div>
    )
  }

  return (
    <div style={{ padding: '28px 32px' }} className="animate-fade-in">
      <button className="btn btn-ghost btn-sm" style={{ marginBottom: 20 }} onClick={onBack}>
        ← All Courses
      </button>

      {/* Course Header */}
      <div style={{
        background: `linear-gradient(135deg, ${color}18, transparent)`,
        border: `1px solid ${color}44`,
        borderRadius: 'var(--radius-xl)',
        padding: '28px 32px',
        marginBottom: 28
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
          <div style={{
            width: 72, height: 72, borderRadius: 'var(--radius-lg)',
            background: color + '22', border: `2px solid ${color}55`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 32, flexShrink: 0
          }}>
            {icon}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
              <span className="badge" style={{ color, background: color + '18', border: `1px solid ${color}33` }}>
                {course.level}
              </span>
              {course.prerequisites.length > 0 && (
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  Prerequisites: {course.prerequisites.join(', ')}
                </span>
              )}
            </div>
            <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 8, color }}>{course.title}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, margin: 0, maxWidth: 600 }}>
              {course.description}
            </p>
            <div style={{ marginTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>
                <span>{completedLessons} of {totalLessons} lessons completed</span>
                <span style={{ color, fontFamily: 'var(--font-mono)' }}>{pct}%</span>
              </div>
              <div className="progress-bar" style={{ height: 6 }}>
                <div className="progress-fill" style={{ width: `${pct}%`, background: color }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modules */}
      <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 14 }}>Course Modules</h2>
      {course.modules.map(mod => (
        <ModuleItem
          key={mod.id}
          mod={mod}
          courseColor={color}
          onSelectLesson={setSelectedLesson}
          progress={progress}
        />
      ))}
    </div>
  )
}

// ─── All Courses View ─────────────────────────────────────────────────────────
export default function CourseView({ selectedCourse, onSelectCourse, onBack, progress, onComplete }) {
  const [filter, setFilter] = useState('all')

  if (selectedCourse) {
    return (
      <SingleCourseView
        course={selectedCourse}
        onBack={onBack}
        progress={progress}
        onComplete={onComplete}
      />
    )
  }

  const levels = ['all', 'Foundation', 'Core Backend', 'Full Stack', 'Data Foundation', 'Database', 'ORM', 'Concepts', 'NoSQL Database']
  const displayed = filter === 'all' ? courses : courses.filter(c => c.level === filter)

  return (
    <div style={{ padding: '28px 32px' }} className="animate-fade-in">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Learning Tracks</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
          8 technologies, beginner to mastery. Follow the recommended path or jump anywhere.
        </p>
      </div>

      {/* Filter pills */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {['all', 'Foundation', 'Core Backend', 'Full Stack', 'Database', 'ORM'].map(f => (
          <button
            key={f}
            className={`badge ${filter === f ? 'badge-green' : 'badge-dim'}`}
            style={{ cursor: 'pointer', padding: '5px 14px', fontSize: 12 }}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All' : f}
          </button>
        ))}
      </div>

      <div className="grid-auto">
        {displayed.map(course => {
          const color = TECH_COLORS[course.id]
          const icon = TECH_ICONS[course.id]
          const totalLessons = course.modules.reduce((t, m) => t + m.lessons.length, 0)
          const completedLessons = course.modules.reduce((t, m) => t + m.lessons.filter(l => progress?.[l.id]).length, 0)
          const pct = totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0

          return (
            <div
              key={course.id}
              className="card"
              style={{ padding: 20, cursor: 'pointer', borderColor: pct === 100 ? color + '66' : undefined }}
              onClick={() => onSelectCourse(course)}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 'var(--radius-md)',
                  background: color + '20', border: `2px solid ${color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22
                }}>
                  {icon}
                </div>
                <span className="badge" style={{ color, background: color + '18', border: `1px solid ${color}33`, fontSize: 10 }}>
                  {course.level}
                </span>
              </div>

              <h3 style={{ fontSize: 17, fontWeight: 800, color, marginBottom: 4 }}>{course.title}</h3>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12, fontStyle: 'italic' }}>{course.tagline}</p>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 14, lineHeight: 1.5 }}>
                {course.description.slice(0, 100)}…
              </p>

              <div style={{ display: 'flex', gap: 12, fontSize: 11, color: 'var(--text-muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>
                <span>📦 {course.modules.length} modules</span>
                <span>📖 {totalLessons} lessons</span>
              </div>

              {pct > 0 && (
                <div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${pct}%`, background: color }} />
                  </div>
                  <div style={{ fontSize: 11, color, fontFamily: 'var(--font-mono)', marginTop: 4, textAlign: 'right' }}>
                    {pct}%
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
