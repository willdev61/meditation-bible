import { openDatabase } from './database'
import { ReadingStats } from '../types'

class StatsService {
  // Récupérer les statistiques
  async getStats(): Promise<ReadingStats> {
    const db = await openDatabase()
    const row = await db.getFirstAsync<{
      total_chapters_read: number
      total_verses_read: number
      current_streak: number
      longest_streak: number
      last_read_date: string | null
      chapters_read_today: number
      total_reading_time_minutes: number
    }>('SELECT * FROM reading_stats WHERE id = 1')

    if (!row) {
      return {
        totalChaptersRead: 0,
        totalVersesRead: 0,
        currentStreak: 0,
        longestStreak: 0,
        lastReadDate: '',
        chaptersReadToday: 0,
        totalReadingTimeMinutes: 0,
      }
    }

    return {
      totalChaptersRead: row.total_chapters_read,
      totalVersesRead: row.total_verses_read,
      currentStreak: row.current_streak,
      longestStreak: row.longest_streak,
      lastReadDate: row.last_read_date ?? '',
      chaptersReadToday: row.chapters_read_today,
      totalReadingTimeMinutes: row.total_reading_time_minutes,
    }
  }

  // Enregistrer la lecture d'un chapitre
  async recordChapterRead(versesCount: number): Promise<void> {
    const db = await openDatabase()
    const today = new Date().toISOString().split('T')[0]
    const stats = await this.getStats()

    let currentStreak = stats.currentStreak
    let longestStreak = stats.longestStreak
    let chaptersReadToday = stats.chaptersReadToday

    // Si c'est un nouveau jour
    if (stats.lastReadDate && stats.lastReadDate.split('T')[0] !== today) {
      const lastDate = new Date(stats.lastReadDate)
      const todayDate = new Date(today)
      const diffDays = Math.floor(
        (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
      )

      if (diffDays === 1) {
        // Jour consécutif
        currentStreak += 1
      } else {
        // Streak cassé
        currentStreak = 1
      }

      chaptersReadToday = 0
      longestStreak = Math.max(longestStreak, currentStreak)
    } else if (!stats.lastReadDate) {
      currentStreak = 1
      longestStreak = 1
    }

    await db.runAsync(
      `UPDATE reading_stats SET
        total_chapters_read = total_chapters_read + 1,
        total_verses_read = total_verses_read + ?,
        current_streak = ?,
        longest_streak = ?,
        last_read_date = ?,
        chapters_read_today = ? + 1
       WHERE id = 1`,
      versesCount,
      currentStreak,
      longestStreak,
      new Date().toISOString(),
      chaptersReadToday
    )
  }

  // Ajouter du temps de lecture
  async addReadingTime(minutes: number): Promise<void> {
    const db = await openDatabase()
    await db.runAsync(
      'UPDATE reading_stats SET total_reading_time_minutes = total_reading_time_minutes + ? WHERE id = 1',
      minutes
    )
  }

  // Réinitialiser les statistiques
  async resetStats(): Promise<void> {
    const db = await openDatabase()
    await db.runAsync(
      `UPDATE reading_stats SET
        total_chapters_read = 0,
        total_verses_read = 0,
        current_streak = 0,
        longest_streak = 0,
        last_read_date = NULL,
        chapters_read_today = 0,
        total_reading_time_minutes = 0
       WHERE id = 1`
    )
  }
}

export default new StatsService()
