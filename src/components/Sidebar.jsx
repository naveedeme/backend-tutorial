import { courses, TECH_COLORS, TECH_ICONS } from '../data/courseData.js'

const NAV_TOP = [
  { id: 'dashboard', label: 'Dashboard', icon: '⌂' },
  { id: 'terminal', label: 'Terminal', icon: '⌨' },
  { id: 'courses', label: 'All Courses', icon: '📚' },
  { id: 'projects', label: 'Projects', icon: '🚀' },
]

export default function Sidebar({ currentView, currentCourse, onNavigate, progress }) {
  const getLessonCount = (course) => {
    const total = course.modules.reduce((t, m) => t + m.lessons.length, 0)
    const done = course.modules.reduce((t, m) => t + m.lessons.filter(l => progress?.[l.id]).length, 0)
    return { total, done }
  }

  return (
    <aside className="sidebar-content">
      {/* Logo */}
      <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #0d1117, #1a2332)',
            border: '1px solid rgba(0,230,118,.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, flexShrink: 0
          }}>
            ⬡
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 15, lineHeight: 1 }}>DevPath</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>
              Backend Mastery v2
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="nav-section">
        {NAV_TOP.map(item => (
          <button
            key={item.id}
            className={`nav-item ${currentView === item.id && !currentCourse ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="divider" style={{ margin: '4px 0' }} />

      {/* Courses */}
      <nav className="nav-section" style={{ flex: 1, overflowY: 'auto' }}>
        <div className="nav-section-title">Learning Tracks</div>
        {courses.map(course => {
          const { total, done } = getLessonCount(course)
          const color = TECH_COLORS[course.id]
          const icon = TECH_ICONS[course.id]
          const isActive = currentView === 'course' && currentCourse === course.id
          const pct = total ? Math.round((done / total) * 100) : 0

          return (
            <button
              key={course.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              style={{ borderLeftColor: isActive ? color : undefined, color: isActive ? color : undefined }}
              onClick={() => onNavigate('course', course.id)}
            >
              <span className="nav-icon" style={{ fontSize: 14 }}>{icon}</span>
              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>{course.title}</span>
              {pct > 0 ? (
                <span className="nav-badge" style={{ color: pct === 100 ? color : undefined }}>
                  {pct}%
                </span>
              ) : (
                <span className="nav-badge">{total}</span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Bottom links */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', flexShrink: 0 }}>
        <a
          href="https://github.com/naveedeme/backend-tutorial"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: 12, textDecoration: 'none' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
          </svg>
          GitHub Source
        </a>
      </div>
    </aside>
  )
}
