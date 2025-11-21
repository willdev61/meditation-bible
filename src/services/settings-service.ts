import { openDatabase } from './database'
import { UserSettings } from '../types'

class SettingsService {
  // Récupérer les paramètres
  async getSettings(): Promise<UserSettings> {
    const db = await openDatabase()
    const row = await db.getFirstAsync<{
      font_size: number
      line_height: number
      theme: 'light' | 'dark' | 'sepia'
      show_verse_numbers: number
      show_strong_numbers: number
      auto_play_audio: number
      notifications_enabled: number
      daily_reminder_time: string | null
    }>('SELECT * FROM user_settings WHERE id = 1')

    if (!row) {
      return {
        fontSize: 16,
        lineHeight: 1.8,
        theme: 'light',
        showVerseNumbers: true,
        showStrongNumbers: true,
        autoPlayAudio: false,
        notificationsEnabled: true,
        dailyReminderTime: null,
      }
    }

    return {
      fontSize: row.font_size,
      lineHeight: row.line_height,
      theme: row.theme,
      showVerseNumbers: row.show_verse_numbers === 1,
      showStrongNumbers: row.show_strong_numbers === 1,
      autoPlayAudio: row.auto_play_audio === 1,
      notificationsEnabled: row.notifications_enabled === 1,
      dailyReminderTime: row.daily_reminder_time,
    }
  }

  // Mettre à jour les paramètres
  async updateSettings(settings: Partial<UserSettings>): Promise<void> {
    const db = await openDatabase()
    const current = await this.getSettings()
    const updated = { ...current, ...settings }

    await db.runAsync(
      `UPDATE user_settings SET
        font_size = ?,
        line_height = ?,
        theme = ?,
        show_verse_numbers = ?,
        show_strong_numbers = ?,
        auto_play_audio = ?,
        notifications_enabled = ?,
        daily_reminder_time = ?
       WHERE id = 1`,
      updated.fontSize,
      updated.lineHeight,
      updated.theme,
      updated.showVerseNumbers ? 1 : 0,
      updated.showStrongNumbers ? 1 : 0,
      updated.autoPlayAudio ? 1 : 0,
      updated.notificationsEnabled ? 1 : 0,
      updated.dailyReminderTime
    )
  }

  // Réinitialiser les paramètres par défaut
  async resetSettings(): Promise<void> {
    const db = await openDatabase()
    await db.runAsync(
      `UPDATE user_settings SET
        font_size = 16,
        line_height = 1.8,
        theme = 'light',
        show_verse_numbers = 1,
        show_strong_numbers = 1,
        auto_play_audio = 0,
        notifications_enabled = 1,
        daily_reminder_time = NULL
       WHERE id = 1`
    )
  }
}

export default new SettingsService()
