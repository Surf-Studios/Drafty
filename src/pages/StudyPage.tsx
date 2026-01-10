import type { Flashcard } from '../models'
import { StudyIcon } from '../icons'
import { StudyManager } from '../components/StudyManager'

export function StudyPage({ flashcards }: { flashcards: Flashcard[] }) {
  return (
    <div className="mode-container">
      <div className="mode-content">
        <div className="mode-header">
          <StudyIcon size={48} />
          <h2>Study & Revise</h2>
          <p>Review your flashcards and revise effectively</p>
        </div>
        <div className="mode-body">
          <StudyManager flashcards={flashcards} />
        </div>
      </div>
    </div>
  )
}
