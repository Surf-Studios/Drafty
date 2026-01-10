export interface Page {
  id: string
  name: string
  content: string
  createdAt: string
  updatedAt: string
}

export interface Book {
  id: string
  name: string
  pages: Page[]
  createdAt: string
  updatedAt: string
}

export interface Project {
  id: string
  name: string
  bookIds: string[]
  createdAt: string
  updatedAt: string
}

export interface Flashcard {
  id: string
  front: string
  back: string
  bookId: string | null
  createdAt: string
  updatedAt: string
}
