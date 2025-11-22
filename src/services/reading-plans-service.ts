import { openDatabase } from './database'
import { ReadingPlan, ReadingPlanDay } from '../types'

class ReadingPlansService {
  // Initialiser les plans de lecture par défaut
  async initializeDefaultPlans(): Promise<void> {
    const db = await openDatabase()

    // Vérifier si les plans existent déjà
    const existingPlans = await db.getFirstAsync<{ count: number }>(
      'SELECT COUNT(*) as count FROM reading_plans'
    )

    if ((existingPlans?.count ?? 0) > 0) {
      return // Plans déjà initialisés
    }

    // Plan 1: Psaumes en 30 jours (5 chapitres par jour)
    await db.runAsync(
      `INSERT INTO reading_plans (id, name, description, total_days, current_day, start_date, completed)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      'psalms-30',
      'Psaumes en 30 jours',
      'Lisez les 150 chapitres des Psaumes en 30 jours',
      30,
      0,
      null,
      0
    )

    // Créer les jours pour les Psaumes (150 chapitres / 30 jours = 5 par jour)
    for (let day = 1; day <= 30; day++) {
      const startChapter = (day - 1) * 5 + 1
      const endChapter = Math.min(day * 5, 150)

      await db.runAsync(
        `INSERT INTO reading_plan_days (plan_id, day, book, start_chapter, end_chapter, completed)
         VALUES (?, ?, ?, ?, ?, ?)`,
        'psalms-30',
        day,
        'PSA',
        startChapter,
        endChapter,
        0
      )
    }

    // Plan 2: Évangiles en 40 jours
    await db.runAsync(
      `INSERT INTO reading_plans (id, name, description, total_days, current_day, start_date, completed)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      'gospels-40',
      'Évangiles en 40 jours',
      'Lisez les 4 évangiles (Matthieu, Marc, Luc, Jean) en 40 jours',
      40,
      0,
      null,
      0
    )

    // Matthieu (28 chapitres) - Jours 1-10
    const matthewDays = [
      [1, 3],
      [4, 6],
      [7, 9],
      [10, 12],
      [13, 15],
      [16, 18],
      [19, 21],
      [22, 24],
      [25, 26],
      [27, 28],
    ]
    for (let i = 0; i < matthewDays.length; i++) {
      await db.runAsync(
        `INSERT INTO reading_plan_days (plan_id, day, book, start_chapter, end_chapter, completed)
         VALUES (?, ?, ?, ?, ?, ?)`,
        'gospels-40',
        i + 1,
        'MAT',
        matthewDays[i][0],
        matthewDays[i][1],
        0
      )
    }

    // Marc (16 chapitres) - Jours 11-18
    const markDays = [
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
      [9, 10],
      [11, 12],
      [13, 14],
      [15, 16],
    ]
    for (let i = 0; i < markDays.length; i++) {
      await db.runAsync(
        `INSERT INTO reading_plan_days (plan_id, day, book, start_chapter, end_chapter, completed)
         VALUES (?, ?, ?, ?, ?, ?)`,
        'gospels-40',
        i + 11,
        'MRK',
        markDays[i][0],
        markDays[i][1],
        0
      )
    }

    // Luc (24 chapitres) - Jours 19-30
    const lukeDays = [
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
      [9, 10],
      [11, 12],
      [13, 14],
      [15, 16],
      [17, 18],
      [19, 20],
      [21, 22],
      [23, 24],
    ]
    for (let i = 0; i < lukeDays.length; i++) {
      await db.runAsync(
        `INSERT INTO reading_plan_days (plan_id, day, book, start_chapter, end_chapter, completed)
         VALUES (?, ?, ?, ?, ?, ?)`,
        'gospels-40',
        i + 19,
        'LUK',
        lukeDays[i][0],
        lukeDays[i][1],
        0
      )
    }

    // Jean (21 chapitres) - Jours 31-40
    const johnDays = [
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
      [9, 10],
      [11, 12],
      [13, 14],
      [15, 16],
      [17, 18],
      [19, 21],
    ]
    for (let i = 0; i < johnDays.length; i++) {
      await db.runAsync(
        `INSERT INTO reading_plan_days (plan_id, day, book, start_chapter, end_chapter, completed)
         VALUES (?, ?, ?, ?, ?, ?)`,
        'gospels-40',
        i + 31,
        'JHN',
        johnDays[i][0],
        johnDays[i][1],
        0
      )
    }

    console.log('✅ Plans de lecture initialisés')
  }

  // Récupérer tous les plans
  async getAllPlans(): Promise<ReadingPlan[]> {
    const db = await openDatabase()

    const planRows = await db.getAllAsync<{
      id: string
      name: string
      description: string
      total_days: number
      current_day: number
      start_date: string | null
      completed: number
    }>('SELECT * FROM reading_plans')

    const plans: ReadingPlan[] = []

    for (const planRow of planRows) {
      const dayRows = await db.getAllAsync<{
        day: number
        book: string
        start_chapter: number
        end_chapter: number
        completed: number
      }>(
        'SELECT day, book, start_chapter, end_chapter, completed FROM reading_plan_days WHERE plan_id = ? ORDER BY day',
        planRow.id
      )

      plans.push({
        id: planRow.id,
        name: planRow.name,
        description: planRow.description,
        totalDays: planRow.total_days,
        currentDay: planRow.current_day,
        startDate: planRow.start_date,
        completed: planRow.completed === 1,
        readings: dayRows.map((day) => ({
          day: day.day,
          book: day.book,
          startChapter: day.start_chapter,
          endChapter: day.end_chapter,
          completed: day.completed === 1,
        })),
      })
    }

    return plans
  }

  // Récupérer un plan spécifique
  async getPlan(planId: string): Promise<ReadingPlan | null> {
    const plans = await this.getAllPlans()
    return plans.find((p) => p.id === planId) ?? null
  }

  // Démarrer un plan
  async startPlan(planId: string): Promise<void> {
    const db = await openDatabase()
    const startDate = new Date().toISOString()

    await db.runAsync(
      'UPDATE reading_plans SET start_date = ?, current_day = 1 WHERE id = ?',
      startDate,
      planId
    )
  }

  // Marquer un jour comme complété
  async completePlanDay(planId: string, day: number): Promise<void> {
    const db = await openDatabase()

    await db.runAsync(
      'UPDATE reading_plan_days SET completed = 1 WHERE plan_id = ? AND day = ?',
      planId,
      day
    )

    // Mettre à jour le jour actuel du plan
    const plan = await this.getPlan(planId)
    if (plan) {
      const nextDay = day + 1
      const allCompleted = plan.readings.every((r) => r.day <= day || r.completed)

      if (allCompleted && nextDay <= plan.totalDays) {
        await db.runAsync(
          'UPDATE reading_plans SET current_day = ? WHERE id = ?',
          nextDay,
          planId
        )
      } else if (nextDay > plan.totalDays) {
        // Plan terminé
        await db.runAsync(
          'UPDATE reading_plans SET completed = 1, current_day = ? WHERE id = ?',
          plan.totalDays,
          planId
        )
      }
    }
  }

  // Réinitialiser un plan
  async resetPlan(planId: string): Promise<void> {
    const db = await openDatabase()

    await db.runAsync(
      'UPDATE reading_plans SET current_day = 0, start_date = NULL, completed = 0 WHERE id = ?',
      planId
    )

    await db.runAsync(
      'UPDATE reading_plan_days SET completed = 0 WHERE plan_id = ?',
      planId
    )
  }
}

export default new ReadingPlansService()
