import { openDatabase } from './database'
import { VerseHighlight, HighlightColor } from '../types'

class HighlightsService {
  // Ajouter ou mettre à jour un surlignage
  async setHighlight(
    book: string,
    chapter: number,
    verse: number,
    color: HighlightColor
  ): Promise<void> {
    const db = await openDatabase()
    const createdAt = new Date().toISOString()

    await db.runAsync(
      `INSERT OR REPLACE INTO highlights
       (book, chapter, verse, color, created_at)
       VALUES (?, ?, ?, ?, ?)`,
      book,
      chapter,
      verse,
      color,
      createdAt
    )
  }

  // Supprimer un surlignage
  async removeHighlight(book: string, chapter: number, verse: number): Promise<void> {
    const db = await openDatabase()
    await db.runAsync(
      'DELETE FROM highlights WHERE book = ? AND chapter = ? AND verse = ?',
      book,
      chapter,
      verse
    )
  }

  // Récupérer le surlignage d'un verset
  async getHighlight(
    book: string,
    chapter: number,
    verse: number
  ): Promise<VerseHighlight | null> {
    const db = await openDatabase()
    const row = await db.getFirstAsync<{
      id: number
      book: string
      chapter: number
      verse: number
      color: HighlightColor
      created_at: string
    }>(
      'SELECT * FROM highlights WHERE book = ? AND chapter = ? AND verse = ?',
      book,
      chapter,
      verse
    )

    if (!row) return null

    return {
      id: row.id,
      book: row.book,
      chapter: row.chapter,
      verse: row.verse,
      color: row.color,
      createdAt: row.created_at,
    }
  }

  // Récupérer tous les surlignages d'un chapitre
  async getChapterHighlights(
    book: string,
    chapter: number
  ): Promise<Map<number, HighlightColor>> {
    const db = await openDatabase()
    const rows = await db.getAllAsync<{
      verse: number
      color: HighlightColor
    }>('SELECT verse, color FROM highlights WHERE book = ? AND chapter = ?', book, chapter)

    const highlightsMap = new Map<number, HighlightColor>()
    rows.forEach((row) => {
      highlightsMap.set(row.verse, row.color)
    })

    return highlightsMap
  }

  // Récupérer tous les surlignages
  async getAllHighlights(): Promise<VerseHighlight[]> {
    const db = await openDatabase()
    const rows = await db.getAllAsync<{
      id: number
      book: string
      chapter: number
      verse: number
      color: HighlightColor
      created_at: string
    }>('SELECT * FROM highlights ORDER BY created_at DESC')

    return rows.map((row) => ({
      id: row.id,
      book: row.book,
      chapter: row.chapter,
      verse: row.verse,
      color: row.color,
      createdAt: row.created_at,
    }))
  }

  // Compter les surlignages
  async getHighlightsCount(): Promise<number> {
    const db = await openDatabase()
    const result = await db.getFirstAsync<{ count: number }>(
      'SELECT COUNT(*) as count FROM highlights'
    )
    return result?.count ?? 0
  }

  // Compter par couleur
  async getCountByColor(): Promise<Record<HighlightColor, number>> {
    const db = await openDatabase()
    const rows = await db.getAllAsync<{ color: HighlightColor; count: number }>(
      'SELECT color, COUNT(*) as count FROM highlights GROUP BY color'
    )

    const counts: Record<HighlightColor, number> = {
      yellow: 0,
      green: 0,
      blue: 0,
    }

    rows.forEach((row) => {
      counts[row.color] = row.count
    })

    return counts
  }
}

export default new HighlightsService()
