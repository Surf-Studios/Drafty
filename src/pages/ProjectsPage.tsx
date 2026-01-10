import { EditIcon, PencilIcon } from '../icons'
import type { Book, Project } from '../models'
import type { ChangeEvent } from 'react'

export function ProjectsPage({
  books,
  projects,
  setProjects,
  selectedProjectId,
  setSelectedProjectId,
  openNotebook,
}: {
  books: Book[]
  projects: Project[]
  setProjects: (v: Project[]) => void
  selectedProjectId: string | null
  setSelectedProjectId: (id: string | null) => void
  openNotebook: (bookId: string) => void
}) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  const project = selectedProjectId ? projects.find((p) => p.id === selectedProjectId) || null : null

  return (
    <div className="projects-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>Projects</h1>
          <p>Group notebooks for studying</p>
          <button
            className="new-note-btn primary"
            onClick={() => {
              const now = new Date().toISOString()
              const id = Date.now().toString()
              const p: Project = { id, name: 'Untitled Project', bookIds: [], createdAt: now, updatedAt: now }
              setProjects([p, ...projects])
              setSelectedProjectId(id)
            }}
          >
            <EditIcon size={16} /> New Project
          </button>
        </div>
        <div className="notes-list">
          {projects.map((p) => (
            <div
              key={p.id}
              className={`note-item ${selectedProjectId === p.id ? 'active' : ''}`}
              onClick={() => setSelectedProjectId(p.id)}
            >
              <div className="note-item-title">{p.name || 'Untitled Project'}</div>
              <div className="note-item-preview">{p.bookIds.length} notebook{p.bookIds.length === 1 ? '' : 's'}</div>
              <div className="note-item-date">{formatDate(p.updatedAt)}</div>
            </div>
          ))}
        </div>
      </aside>

      <main className="editor-container">
        {project ? (
          <div className="editor-content">
            <h2 className="projects-title">Project</h2>
            <input
              type="text"
              className="note-title-input"
              value={project.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const now = new Date().toISOString()
                setProjects(projects.map((p) => (p.id === project.id ? { ...p, name: e.target.value, updatedAt: now } : p)))
              }}
              placeholder="Project name..."
            />

            <div className="projects-section">
              <h3>Notebooks in this project</h3>
              <div className="projects-books">
                {books.length === 0 ? (
                  <p className="projects-muted">No notebooks yet. Create one in Notebook mode.</p>
                ) : (
                  books.map((b) => {
                    const checked = project.bookIds.includes(b.id)
                    return (
                      <label key={b.id} className="projects-book-row">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {
                            const now = new Date().toISOString()
                            const nextIds = checked ? project.bookIds.filter((id) => id !== b.id) : [b.id, ...project.bookIds]
                            setProjects(projects.map((p) => (p.id === project.id ? { ...p, bookIds: nextIds, updatedAt: now } : p)))
                          }}
                        />
                        <span>{b.name}</span>
                        <button type="button" className="projects-open" onClick={() => openNotebook(b.id)}>
                          Open
                        </button>
                      </label>
                    )
                  })
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">
              <PencilIcon size={64} />
            </div>
            <h2>No Project Selected</h2>
            <p>Create a new project or select one from the sidebar</p>
          </div>
        )}
      </main>
    </div>
  )
}
