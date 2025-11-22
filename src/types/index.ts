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

// Highlight colors
export type HighlightColor = 'yellow' | 'green' | 'blue'

// Verse Highlight
export interface VerseHighlight {
  id?: number
  book: string
  chapter: number
  verse: number
  color: HighlightColor
  createdAt: string
}

// Favorite Verse
export interface FavoriteVerse {
  id?: number
  book: string
  chapter: number
  verse: number
  verseText: string
  reference: string
  note?: string
  createdAt: string
}

// Reading Statistics
export interface ReadingStats {
  totalChaptersRead: number
  totalVersesRead: number
  currentStreak: number
  longestStreak: number
  lastReadDate: string
  chaptersReadToday: number
  totalReadingTimeMinutes: number
}

// Reading Plan
export interface ReadingPlan {
  id: string
  name: string
  description: string
  totalDays: number
  currentDay: number
  startDate: string | null
  completed: boolean
  readings: ReadingPlanDay[]
}

export interface ReadingPlanDay {
  day: number
  book: string
  startChapter: number
  endChapter: number
  completed: boolean
}

// User Settings/Options
export interface UserSettings {
  fontSize: number // 14-24
  lineHeight: number // 1.5-2.5
  theme: 'light' | 'dark' | 'sepia'
  showVerseNumbers: boolean
  showStrongNumbers: boolean
  autoPlayAudio: boolean
  notificationsEnabled: boolean
  dailyReminderTime: string | null
}
