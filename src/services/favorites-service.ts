import { openDatabase } from './database'
import { FavoriteVerse } from '../types'

class FavoritesService {
  // Ajouter un favori
  async addFavorite(
    book: string,
    chapter: number,
    verse: number,
    verseText: string,
    reference: string,
    note?: string
  ): Promise<void> {
    const db = await openDatabase()
    const createdAt = new Date().toISOString()

    await db.runAsync(
      `INSERT OR REPLACE INTO favorites
       (book, chapter, verse, verse_text, reference, note, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      book,
      chapter,
      verse,
      verseText,
      reference,
      note ?? null,
      createdAt
    )
  }

  // Supprimer un favori
  async removeFavorite(book: string, chapter: number, verse: number): Promise<void> {
    const db = await openDatabase()
    await db.runAsync(
      'DELETE FROM favorites WHERE book = ? AND chapter = ? AND verse = ?',
      book,
      chapter,
      verse
    )
  }

  // Vérifier si un verset est en favori
  async isFavorite(book: string, chapter: number, verse: number): Promise<boolean> {
    const db = await openDatabase()
    const result = await db.getFirstAsync<{ count: number }>(
      'SELECT COUNT(*) as count FROM favorites WHERE book = ? AND chapter = ? AND verse = ?',
      book,
      chapter,
      verse
    )
    return (result?.count ?? 0) > 0
  }

  // Récupérer tous les favoris
  async getAllFavorites(): Promise<FavoriteVerse[]> {
    const db = await openDatabase()
    const rows = await db.getAllAsync<{
      id: number
      book: string
      chapter: number
      verse: number
      verse_text: string
      reference: string
      note: string | null
      created_at: string
    }>('SELECT * FROM favorites ORDER BY created_at DESC')

    return rows.map((row) => ({
      id: row.id,
      book: row.book,
      chapter: row.chapter,
      verse: row.verse,
      verseText: row.verse_text,
      reference: row.reference,
      note: row.note ?? undefined,
      createdAt: row.created_at,
    }))
  }

  // Mettre à jour la note d'un favori
  async updateNote(
    book: string,
    chapter: number,
    verse: number,
    note: string
  ): Promise<void> {
    const db = await openDatabase()
    await db.runAsync(
      'UPDATE favorites SET note = ? WHERE book = ? AND chapter = ? AND verse = ?',
      note,
      book,
      chapter,
      verse
    )
  }

  // Compter les favoris
  async getFavoritesCount(): Promise<number> {
    const db = await openDatabase()
    const result = await db.getFirstAsync<{ count: number }>(
      'SELECT COUNT(*) as count FROM favorites'
    )
    return result?.count ?? 0
  }
}

export default new FavoritesService()
