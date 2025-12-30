import { useState, useEffect } from 'react'
import './App.css'

interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

function App() {
  // Load notes from localStorage on initialization
  const loadNotesFromStorage = () => {
    const savedNotes = localStorage.getItem('drafty-notes')
    if (savedNotes) {
      try {
        return JSON.parse(savedNotes)
      } catch (e) {
        console.error('Failed to load notes:', e)
      }
    }
    return []
  }

  const initialNotes = loadNotesFromStorage()
  const [notes, setNotes] = useState<Note[]>(initialNotes)
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(
    initialNotes.length > 0 ? initialNotes[0].id : null
  )

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem('drafty-notes', JSON.stringify(notes))
    }
  }, [notes])

  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setNotes([newNote, ...notes])
    setSelectedNoteId(newNote.id)
  }

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(notes.map(note =>
      note.id === id
        ? { ...note, ...updates, updatedAt: new Date().toISOString() }
        : note
    ))
  }

  const deleteNote = (id: string) => {
    const noteIndex = notes.findIndex(n => n.id === id)
    const newNotes = notes.filter(note => note.id !== id)
    setNotes(newNotes)
    
    if (selectedNoteId === id) {
      if (newNotes.length > 0) {
        const newSelectedIndex = Math.min(noteIndex, newNotes.length - 1)
        setSelectedNoteId(newNotes[newSelectedIndex].id)
      } else {
        setSelectedNoteId(null)
      }
    }
  }

  const selectedNote = notes.find(note => note.id === selectedNoteId)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return 'Today'
    } else if (diffDays === 1) {
      return 'Yesterday'
    } else if (diffDays < 7) {
      return `${diffDays} days ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>Drafty</h1>
          <p>Your thoughts, organized</p>
          <button className="new-note-btn primary" onClick={createNewNote}>
            ✏️ New Note
          </button>
        </div>
        <div className="notes-list">
          {notes.map(note => (
            <div
              key={note.id}
              className={`note-item ${selectedNoteId === note.id ? 'active' : ''}`}
              onClick={() => setSelectedNoteId(note.id)}
            >
              <div className="note-item-title">{note.title || 'Untitled'}</div>
              <div className="note-item-preview">
                {note.content.substring(0, 60) || 'No content'}
              </div>
              <div className="note-item-date">{formatDate(note.updatedAt)}</div>
            </div>
          ))}
        </div>
      </aside>

      <main className="editor-container">
        {selectedNote ? (
          <>
            <div className="editor-header">
              <div>{formatDate(selectedNote.updatedAt)}</div>
              <div className="editor-actions">
                <button onClick={() => deleteNote(selectedNote.id)} className="delete-btn">
                  🗑️ Delete
                </button>
              </div>
            </div>
            <div className="editor-content">
              <input
                type="text"
                className="note-title-input"
                value={selectedNote.title}
                onChange={(e) => updateNote(selectedNote.id, { title: e.target.value })}
                placeholder="Note title..."
              />
              <textarea
                className="note-content-textarea"
                value={selectedNote.content}
                onChange={(e) => updateNote(selectedNote.id, { content: e.target.value })}
                placeholder="Start writing your note..."
              />
            </div>
          </>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">📝</div>
            <h2>No Note Selected</h2>
            <p>Create a new note or select one from the sidebar</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
