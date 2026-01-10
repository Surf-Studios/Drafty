import type { Book, Flashcard } from '../models'
import { FlashcardsIcon } from '../icons'
import { FlashcardsManager } from '../components/FlashcardsManager'

export function FlashcardsPage({
  user,
  books,
  flashcards,
  setFlashcards,
}: {
  user: { uid: string } | null
  books: Book[]
  flashcards: Flashcard[]
  setFlashcards: (v: Flashcard[]) => void
}) {
  return (
    <div className="mode-container">
      <div className="mode-content">
        <div className="mode-header">
          <FlashcardsIcon size={48} />
          <h2>Flashcards</h2>
          <p>Create and study with flashcards</p>
        </div>
        <div className="mode-body">
          <FlashcardsManager flashcards={flashcards} setFlashcards={setFlashcards} user={user} books={books} />
        </div>
      </div>
    </div>
  )
}
