export interface Book {
  id: string
  name: string
  chapters: number
  testament: "AT" | "NT"
}

export interface Word {
  text: string
  strong: string | null
  position?: number
}

export interface Verse {
  book: string
  chapter: number
  verse: number
  text: string
  words: Word[]
  reference: string // Ex: "Jean 3:16"
}

export interface Chapter {
  book: string
  chapter: number
  verses: Verse[]
}

export interface BibleData {
  books: Book[]
  verses: Record<string, Verse>
}
