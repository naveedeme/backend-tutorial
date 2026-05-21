import { useState, useEffect, useCallback, useRef } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Dashboard from './components/Dashboard.jsx'
import Terminal from './components/Terminal.jsx'
import CourseView from './components/CourseView.jsx'
import ProjectsView from './components/ProjectsView.jsx'
import { courses } from './data/courseData.js'

// ─── Hash Router ──────────────────────────────────────────────────────────────
const VALID_VIEWS = new Set(['dashboard', 'terminal', 'courses', 'course', 'projects', 'project'])

function parseHash() {
  const hash = window.location.hash.replace('#', '')
  const [view, param] = hash.split('/')
  const safeView = VALID_VIEWS.has(view) ? view : 'dashboard'
  return { view: safeView, param: param || null }
}

// ─── Install Banner ───────────────────────────────────────────────────────────
function InstallBanner({ onInstall, onDismiss }) {
  return (
    <div className="install-banner">
      <span style={{ fontSize: 24, flexShrink: 0 }}>📱</span>
      <div style={{ flex: 1 }}>
        <p><strong>Install DevPath</strong></p>
        <p>Add to home screen for offline access</p>
      </div>
      <div style={{ display: 'flex', gap: 6, flexDirection: 'column' }}>
        <button className="btn btn-primary btn-sm" onClick={onInstall}>Install</button>
        <button className="btn btn-ghost btn-sm" onClick={onDismiss}>Later</button>
      </div>
    </div>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState('dashboard')
  const [courseId, setCourseId] = useState(null)
  const [projectId, setProjectId] = useState(null)
  const [terminalCommand, setTerminalCommand] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [progress, setProgress] = useState(() => {
    try { return JSON.parse(localStorage.getItem('devpath-progress') || '{}') } catch { return {} }
  })
  const [installPrompt, setInstallPrompt] = useState(null)
  const [showInstallBanner, setShowInstallBanner] = useState(false)
  const terminalPreload = useRef(null)

  // Sync hash with view
  useEffect(() => {
    const { view: v, param: p } = parseHash()
    setView(v)
    if (v === 'course' && p) setCourseId(p)
    if (v === 'project' && p) setProjectId(p)
  }, [])

  useEffect(() => {
    const onHashChange = () => {
      const { view: v, param: p } = parseHash()
      setView(v)
      if (v === 'course' && p) setCourseId(p)
      else if (v === 'project' && p) setProjectId(p)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  // PWA Install prompt
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setInstallPrompt(e)
      const dismissed = localStorage.getItem('pwa-dismissed')
      if (!dismissed) setShowInstallBanner(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  // Save progress
  useEffect(() => {
    localStorage.setItem('devpath-progress', JSON.stringify(progress))
  }, [progress])

  // Navigation
  const navigate = useCallback((newView, param = null, cmd = null) => {
    setView(newView)
    setSidebarOpen(false)

    if (newView === 'course' && param) {
      setCourseId(param)
      setProjectId(null)
      window.location.hash = `#course/${param}`
    } else if (newView === 'project' && param) {
      setProjectId(param)
      setCourseId(null)
      window.location.hash = `#project/${param}`
    } else if (newView === 'terminal') {
      if (cmd) {
        terminalPreload.current = cmd
        setTerminalCommand(cmd)
      }
      window.location.hash = `#terminal`
    } else {
      setCourseId(null)
      setProjectId(null)
      window.location.hash = `#${newView}`
    }
  }, [])

  const handleCourseSelect = useCallback((course) => {
    setCourseId(course.id)
    setView('course')
    window.location.hash = `#course/${course.id}`
  }, [])

  const handleLessonComplete = useCallback((lessonId) => {
    setProgress(prev => ({ ...prev, [lessonId]: true }))
  }, [])

  const handleInstall = async () => {
    if (!installPrompt) return
    installPrompt.prompt()
    const { outcome } = await installPrompt.userChoice
    setInstallPrompt(null)
    setShowInstallBanner(false)
    if (outcome === 'accepted') localStorage.setItem('pwa-installed', 'true')
  }

  const selectedCourse = courseId ? courses.find(c => c.id === courseId) : null

  // Determine current section label
  const getViewLabel = () => {
    if (view === 'dashboard') return 'Dashboard'
    if (view === 'terminal') return 'Terminal'
    if (view === 'courses') return 'Courses'
    if (view === 'course' && selectedCourse) return selectedCourse.title
    if (view === 'projects' || view === 'project') return 'Projects'
    return 'DevPath'
  }

  return (
    <div className="app-shell">
      {/* Header */}
      <header className="app-header">
        {/* Mobile hamburger */}
        <button
          className="btn btn-ghost btn-icon"
          style={{ display: 'none' }}
          id="mobile-menu-btn"
          onClick={() => setSidebarOpen(o => !o)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <div className="header-titlebar" style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: 18 }}>⬡</span>
          <span style={{ fontWeight: 700, fontSize: 15 }}>DevPath</span>
          <span style={{ color: 'var(--border-bright)' }}>/</span>
          <span className="header-current-view" style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{getViewLabel()}</span>
        </div>

        {/* Header actions */}
        <div className="header-actions" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            className="btn btn-ghost btn-sm header-terminal-btn"
            onClick={() => navigate('terminal')}
            style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}
          >
            ⌨ <span className="header-terminal-label">Terminal</span>
          </button>
          <a
            href="https://github.com/naveedeme/backend-tutorial"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-sm header-github-link"
          >
            ★ GitHub
          </a>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`mobile-overlay ${sidebarOpen ? 'active' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div className={`app-sidebar ${sidebarOpen ? 'mobile-open' : ''}`}>
        <Sidebar
          currentView={view}
          currentCourse={courseId}
          onNavigate={navigate}
          progress={progress}
        />
      </div>

      {/* Main */}
      <main className="app-main">
        {view === 'dashboard' && (
          <Dashboard
            onNavigate={navigate}
            progress={progress}
          />
        )}

        {view === 'terminal' && (
          <div style={{ height: '100%' }}>
            <Terminal preloadCommand={terminalCommand} key={terminalCommand} />
          </div>
        )}

        {(view === 'courses' || view === 'course') && (
          <CourseView
            selectedCourse={selectedCourse}
            onSelectCourse={handleCourseSelect}
            onBack={() => navigate('courses')}
            progress={progress}
            onComplete={handleLessonComplete}
          />
        )}

        {(view === 'projects' || view === 'project') && (
          <ProjectsView
            selectedProjectId={view === 'project' ? projectId : null}
            onSelectProject={(id) => { setProjectId(id); setView('project'); window.location.hash = `#project/${id}` }}
            onBack={() => navigate('projects')}
          />
        )}
      </main>

      {/* PWA install banner */}
      {showInstallBanner && (
        <InstallBanner
          onInstall={handleInstall}
          onDismiss={() => {
            setShowInstallBanner(false)
            localStorage.setItem('pwa-dismissed', 'true')
          }}
        />
      )}

      {/* Mobile CSS injection */}
      <style>{`
        @media (max-width: 768px) {
          #mobile-menu-btn { display: flex !important; }
          .app-sidebar { position: fixed !important; left: -280px !important; top: 0 !important; bottom: 0 !important; width: 280px !important; z-index: 200 !important; transition: left .25s ease !important; }
          .app-sidebar.mobile-open { left: 0 !important; box-shadow: var(--shadow-lg) !important; }
          .mobile-overlay.active { display: block !important; }
        }
        @media (max-width: 600px) {
          [style*="padding: 28px 32px"], [style*="padding: '28px 32px'"] { padding: 16px !important; }
        }
      `}</style>
    </div>
  )
}
