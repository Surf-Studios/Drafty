import { useState } from 'react'
import type { Flashcard } from '../models'

export function StudyManager({ flashcards }: { flashcards: Flashcard[] }) {
  const [index, setIndex] = useState(0)
  const [showBack, setShowBack] = useState(false)

  if (!flashcards || flashcards.length === 0) return <div>No flashcards yet.</div>

  const card = flashcards[index % flashcards.length]

  return (
    <div>
      <div style={{ padding: 16, border: '1px solid var(--border-color)', borderRadius: 8 }}>
        <h3>{card.front}</h3>
        {showBack && <p>{card.back}</p>}
        <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button onClick={() => setShowBack(!showBack)}>{showBack ? 'Hide' : 'Show'} Answer</button>
          <button
            onClick={() => {
              setIndex(index + 1)
              setShowBack(false)
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
