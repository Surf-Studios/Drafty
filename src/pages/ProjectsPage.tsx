import { EditIcon, PencilIcon } from '../icons'
import type { Book, Project } from '../models'
import type { ChangeEvent } from 'react'
import { useMemo, useState } from 'react'

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
  const [bookToAddId, setBookToAddId] = useState<string>('')

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

  const projectBooks = useMemo(() => {
    if (!project) return []
    const byId = new Map(books.map((b) => [b.id, b]))
    return project.bookIds.map((id) => byId.get(id)).filter((b): b is Book => Boolean(b))
  }, [books, project])

  const addableBooks = useMemo(() => {
    if (!project) return []
    const inProject = new Set(project.bookIds)
    return books.filter((b) => !inProject.has(b.id))
  }, [books, project])

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

              {books.length === 0 ? (
                <p className="projects-muted">No notebooks yet. Create one in Notebook mode.</p>
              ) : (
                <div className="projects-add">
                  <label className="projects-add-label">
                    Add notebook
                    <select
                      value={bookToAddId}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => setBookToAddId(e.target.value)}
                      disabled={addableBooks.length === 0}
                    >
                      <option value="">{addableBooks.length === 0 ? 'No notebooks available' : 'Select a notebook…'}</option>
                      {addableBooks.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name || 'Untitled Notebook'}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button
                    type="button"
                    className="primary"
                    disabled={!bookToAddId}
                    onClick={() => {
                      if (!bookToAddId) return
                      const now = new Date().toISOString()
                      const nextIds = [bookToAddId, ...project.bookIds]
                      setProjects(projects.map((p) => (p.id === project.id ? { ...p, bookIds: nextIds, updatedAt: now } : p)))
                      setBookToAddId('')
                    }}
                  >
                    Add
                  </button>
                </div>
              )}

              <div className="projects-books">
                {projectBooks.length === 0 ? (
                  <p className="projects-muted">Nothing added yet. Use “Add notebook” above.</p>
                ) : (
                  projectBooks.map((b) => (
                    <div key={b.id} className="projects-book-row">
                      <span className="projects-book-name">{b.name || 'Untitled Notebook'}</span>
                      <div className="projects-book-actions">
                        <button type="button" className="projects-open" onClick={() => openNotebook(b.id)}>
                          Open
                        </button>
                        <button
                          type="button"
                          className="projects-remove"
                          onClick={() => {
                            const now = new Date().toISOString()
                            const nextIds = project.bookIds.filter((id) => id !== b.id)
                            setProjects(projects.map((p) => (p.id === project.id ? { ...p, bookIds: nextIds, updatedAt: now } : p)))
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
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
