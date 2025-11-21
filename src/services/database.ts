import * as SQLite from 'expo-sqlite'
import { Book, Verse, Word } from '../types'
import { StrongDefinition } from '../types/strong'

const DB_NAME = 'meditation_bible.db'

// Ouvrir ou créer la base de données
export const openDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  return await SQLite.openDatabaseAsync(DB_NAME)
}

// Initialiser le schéma de la base de données
export const initializeDatabase = async (): Promise<void> => {
  const db = await openDatabase()

  // Table des livres
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS books (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      chapters INTEGER NOT NULL,
      testament TEXT NOT NULL CHECK(testament IN ('AT', 'NT'))
    );
  `)

  // Table des versets
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS verses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      book TEXT NOT NULL,
      chapter INTEGER NOT NULL,
      verse INTEGER NOT NULL,
      text TEXT NOT NULL,
      reference TEXT NOT NULL,
      FOREIGN KEY (book) REFERENCES books(id),
      UNIQUE(book, chapter, verse)
    );
  `)

  // Index pour améliorer les performances de recherche
  await db.execAsync(`
    CREATE INDEX IF NOT EXISTS idx_verses_book_chapter
    ON verses(book, chapter);
  `)

  await db.execAsync(`
    CREATE INDEX IF NOT EXISTS idx_verses_reference
    ON verses(reference);
  `)

  // Table des mots avec numéros Strong's
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS words (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      verse_id INTEGER NOT NULL,
      text TEXT NOT NULL,
      strong TEXT,
      position INTEGER,
      FOREIGN KEY (verse_id) REFERENCES verses(id) ON DELETE CASCADE
    );
  `)

  // Index pour les mots
  await db.execAsync(`
    CREATE INDEX IF NOT EXISTS idx_words_verse_id
    ON words(verse_id);
  `)

  await db.execAsync(`
    CREATE INDEX IF NOT EXISTS idx_words_strong
    ON words(strong) WHERE strong IS NOT NULL;
  `)

  // Table des définitions Strong's
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS strongs (
      number TEXT PRIMARY KEY,
      testament TEXT NOT NULL CHECK(testament IN ('AT', 'NT')),
      language TEXT NOT NULL,
      original TEXT NOT NULL,
      transliteration TEXT NOT NULL,
      pronunciation TEXT NOT NULL,
      definition TEXT NOT NULL,
      short_def TEXT NOT NULL,
      usages TEXT NOT NULL,
      occurrences INTEGER NOT NULL,
      type TEXT NOT NULL,
      etymology TEXT,
      related_words TEXT
    );
  `)

  // Index pour les recherches Strong's
  await db.execAsync(`
    CREATE INDEX IF NOT EXISTS idx_strongs_number
    ON strongs(number);
  `)

  await db.execAsync(`
    CREATE INDEX IF NOT EXISTS idx_strongs_testament
    ON strongs(testament);
  `)

  // Table des favoris
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      book TEXT NOT NULL,
      chapter INTEGER NOT NULL,
      verse INTEGER NOT NULL,
      verse_text TEXT NOT NULL,
      reference TEXT NOT NULL,
      note TEXT,
      created_at TEXT NOT NULL,
      UNIQUE(book, chapter, verse)
    );
  `)

  // Table des surlignages
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS highlights (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      book TEXT NOT NULL,
      chapter INTEGER NOT NULL,
      verse INTEGER NOT NULL,
      color TEXT NOT NULL CHECK(color IN ('yellow', 'green', 'blue')),
      created_at TEXT NOT NULL,
      UNIQUE(book, chapter, verse)
    );
  `)

  // Table des statistiques de lecture
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS reading_stats (
      id INTEGER PRIMARY KEY CHECK(id = 1),
      total_chapters_read INTEGER DEFAULT 0,
      total_verses_read INTEGER DEFAULT 0,
      current_streak INTEGER DEFAULT 0,
      longest_streak INTEGER DEFAULT 0,
      last_read_date TEXT,
      chapters_read_today INTEGER DEFAULT 0,
      total_reading_time_minutes INTEGER DEFAULT 0
    );
  `)

  // Insérer les stats initiales
  await db.execAsync(`
    INSERT OR IGNORE INTO reading_stats (id) VALUES (1);
  `)

  // Table des plans de lecture
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS reading_plans (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      total_days INTEGER NOT NULL,
      current_day INTEGER DEFAULT 0,
      start_date TEXT,
      completed INTEGER DEFAULT 0
    );
  `)

  // Table des jours de plans de lecture
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS reading_plan_days (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      plan_id TEXT NOT NULL,
      day INTEGER NOT NULL,
      book TEXT NOT NULL,
      start_chapter INTEGER NOT NULL,
      end_chapter INTEGER NOT NULL,
      completed INTEGER DEFAULT 0,
      FOREIGN KEY (plan_id) REFERENCES reading_plans(id) ON DELETE CASCADE
    );
  `)

  // Table des paramètres utilisateur
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS user_settings (
      id INTEGER PRIMARY KEY CHECK(id = 1),
      font_size INTEGER DEFAULT 16,
      line_height REAL DEFAULT 1.8,
      theme TEXT DEFAULT 'light' CHECK(theme IN ('light', 'dark', 'sepia')),
      show_verse_numbers INTEGER DEFAULT 1,
      show_strong_numbers INTEGER DEFAULT 1,
      auto_play_audio INTEGER DEFAULT 0,
      notifications_enabled INTEGER DEFAULT 1,
      daily_reminder_time TEXT
    );
  `)

  // Insérer les paramètres par défaut
  await db.execAsync(`
    INSERT OR IGNORE INTO user_settings (id) VALUES (1);
  `)

  console.log('✅ Base de données initialisée avec succès')
}

// Vérifier si la base de données contient des données
export const isDatabaseSeeded = async (): Promise<boolean> => {
  const db = await openDatabase()
  const result = await db.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM books'
  )
  return (result?.count ?? 0) > 0
}

// Réinitialiser la base de données (pour développement/test)
export const resetDatabase = async (): Promise<void> => {
  const db = await openDatabase()

  await db.execAsync('DROP TABLE IF EXISTS reading_plan_days;')
  await db.execAsync('DROP TABLE IF EXISTS reading_plans;')
  await db.execAsync('DROP TABLE IF EXISTS highlights;')
  await db.execAsync('DROP TABLE IF EXISTS favorites;')
  await db.execAsync('DROP TABLE IF EXISTS reading_stats;')
  await db.execAsync('DROP TABLE IF EXISTS user_settings;')
  await db.execAsync('DROP TABLE IF EXISTS words;')
  await db.execAsync('DROP TABLE IF EXISTS verses;')
  await db.execAsync('DROP TABLE IF EXISTS strongs;')
  await db.execAsync('DROP TABLE IF EXISTS books;')

  await initializeDatabase()
  console.log('🔄 Base de données réinitialisée')
}

// CRUD Operations pour les livres
export const insertBook = async (book: Book): Promise<void> => {
  const db = await openDatabase()
  await db.runAsync(
    'INSERT OR REPLACE INTO books (id, name, chapters, testament) VALUES (?, ?, ?, ?)',
    book.id,
    book.name,
    book.chapters,
    book.testament
  )
}

export const getBook = async (bookId: string): Promise<Book | null> => {
  const db = await openDatabase()
  const row = await db.getFirstAsync<{
    id: string
    name: string
    chapters: number
    testament: 'AT' | 'NT'
  }>('SELECT * FROM books WHERE id = ?', bookId)

  if (!row) return null

  return {
    id: row.id,
    name: row.name,
    chapters: row.chapters,
    testament: row.testament,
  }
}

export const getAllBooks = async (): Promise<Book[]> => {
  const db = await openDatabase()
  const rows = await db.getAllAsync<{
    id: string
    name: string
    chapters: number
    testament: 'AT' | 'NT'
  }>('SELECT * FROM books ORDER BY id')

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    chapters: row.chapters,
    testament: row.testament,
  }))
}

// CRUD Operations pour les versets
export const insertVerse = async (verse: Verse): Promise<number> => {
  const db = await openDatabase()

  // Insérer le verset
  const result = await db.runAsync(
    'INSERT OR REPLACE INTO verses (book, chapter, verse, text, reference) VALUES (?, ?, ?, ?, ?)',
    verse.book,
    verse.chapter,
    verse.verse,
    verse.text,
    verse.reference
  )

  const verseId = result.lastInsertRowId

  // Supprimer les anciens mots si le verset existe déjà
  await db.runAsync('DELETE FROM words WHERE verse_id = ?', verseId)

  // Insérer les mots avec leurs numéros Strong's
  for (const word of verse.words) {
    await db.runAsync(
      'INSERT INTO words (verse_id, text, strong, position) VALUES (?, ?, ?, ?)',
      verseId,
      word.text,
      word.strong,
      word.position ?? null
    )
  }

  return verseId
}

export const getVerse = async (
  book: string,
  chapter: number,
  verse: number
): Promise<Verse | null> => {
  const db = await openDatabase()

  // Récupérer le verset
  const verseRow = await db.getFirstAsync<{
    id: number
    book: string
    chapter: number
    verse: number
    text: string
    reference: string
  }>('SELECT * FROM verses WHERE book = ? AND chapter = ? AND verse = ?', [
    book,
    chapter,
    verse,
  ])

  if (!verseRow) return null

  // Récupérer les mots associés
  const wordRows = await db.getAllAsync<{
    text: string
    strong: string | null
    position: number | null
  }>(
    'SELECT text, strong, position FROM words WHERE verse_id = ? ORDER BY position',
    verseRow.id
  )

  const words: Word[] = wordRows.map((w) => ({
    text: w.text,
    strong: w.strong,
    position: w.position ?? undefined,
  }))

  return {
    book: verseRow.book,
    chapter: verseRow.chapter,
    verse: verseRow.verse,
    text: verseRow.text,
    reference: verseRow.reference,
    words,
  }
}

export const getChapterVerses = async (
  book: string,
  chapter: number
): Promise<Verse[]> => {
  const db = await openDatabase()

  // Récupérer tous les versets du chapitre
  const verseRows = await db.getAllAsync<{
    id: number
    book: string
    chapter: number
    verse: number
    text: string
    reference: string
  }>('SELECT * FROM verses WHERE book = ? AND chapter = ? ORDER BY verse', [
    book,
    chapter,
  ])

  // Récupérer les mots pour chaque verset
  const verses: Verse[] = []
  for (const verseRow of verseRows) {
    const wordRows = await db.getAllAsync<{
      text: string
      strong: string | null
      position: number | null
    }>(
      'SELECT text, strong, position FROM words WHERE verse_id = ? ORDER BY position',
      verseRow.id
    )

    const words: Word[] = wordRows.map((w) => ({
      text: w.text,
      strong: w.strong,
      position: w.position ?? undefined,
    }))

    verses.push({
      book: verseRow.book,
      chapter: verseRow.chapter,
      verse: verseRow.verse,
      text: verseRow.text,
      reference: verseRow.reference,
      words,
    })
  }

  return verses
}

// CRUD Operations pour les définitions Strong's
export const insertStrongDefinition = async (
  strong: StrongDefinition
): Promise<void> => {
  const db = await openDatabase()

  await db.runAsync(
    `INSERT OR REPLACE INTO strongs
    (number, testament, language, original, transliteration, pronunciation,
     definition, short_def, usages, occurrences, type, etymology, related_words)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    strong.number,
    strong.testament,
    strong.language,
    strong.original,
    strong.transliteration,
    strong.pronunciation,
    strong.definition,
    strong.shortDef,
    JSON.stringify(strong.usages),
    strong.occurrences,
    strong.type,
    strong.etymology ?? null,
    strong.relatedWords ? JSON.stringify(strong.relatedWords) : null
  )
}

export const getStrongDefinition = async (
  number: string
): Promise<StrongDefinition | null> => {
  const db = await openDatabase()

  const row = await db.getFirstAsync<{
    number: string
    testament: 'AT' | 'NT'
    language: string
    original: string
    transliteration: string
    pronunciation: string
    definition: string
    short_def: string
    usages: string
    occurrences: number
    type: string
    etymology: string | null
    related_words: string | null
  }>('SELECT * FROM strongs WHERE number = ?', number)

  if (!row) return null

  return {
    number: row.number,
    testament: row.testament,
    language: row.language as 'Hébreu' | 'Grec',
    original: row.original,
    transliteration: row.transliteration,
    pronunciation: row.pronunciation,
    definition: row.definition,
    shortDef: row.short_def,
    usages: JSON.parse(row.usages),
    occurrences: row.occurrences,
    type: row.type as any,
    etymology: row.etymology ?? undefined,
    relatedWords: row.related_words ? JSON.parse(row.related_words) : undefined,
  }
}

export const searchStrongDefinitions = async (
  query: string,
  limit: number = 20
): Promise<StrongDefinition[]> => {
  const db = await openDatabase()

  const searchPattern = `%${query}%`
  const rows = await db.getAllAsync<{
    number: string
    testament: 'AT' | 'NT'
    language: string
    original: string
    transliteration: string
    pronunciation: string
    definition: string
    short_def: string
    usages: string
    occurrences: number
    type: string
    etymology: string | null
    related_words: string | null
  }>(
    `SELECT * FROM strongs
     WHERE number LIKE ?
        OR original LIKE ?
        OR transliteration LIKE ?
        OR definition LIKE ?
        OR short_def LIKE ?
     ORDER BY occurrences DESC
     LIMIT ?`,
    [searchPattern, searchPattern, searchPattern, searchPattern, searchPattern, limit]
  )

  return rows.map((row) => ({
    number: row.number,
    testament: row.testament,
    language: row.language as 'Hébreu' | 'Grec',
    original: row.original,
    transliteration: row.transliteration,
    pronunciation: row.pronunciation,
    definition: row.definition,
    shortDef: row.short_def,
    usages: JSON.parse(row.usages),
    occurrences: row.occurrences,
    type: row.type as any,
    etymology: row.etymology ?? undefined,
    relatedWords: row.related_words ? JSON.parse(row.related_words) : undefined,
  }))
}

// Fonction utilitaire pour obtenir des statistiques
export const getDatabaseStats = async (): Promise<{
  booksCount: number
  versesCount: number
  wordsCount: number
  strongsCount: number
}> => {
  const db = await openDatabase()

  const booksCount =
    (await db.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM books'))
      ?.count ?? 0
  const versesCount =
    (await db.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM verses'))
      ?.count ?? 0
  const wordsCount =
    (await db.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM words'))
      ?.count ?? 0
  const strongsCount =
    (await db.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM strongs'))
      ?.count ?? 0

  return {
    booksCount,
    versesCount,
    wordsCount,
    strongsCount,
  }
}

// Récupérer un verset aléatoire
export const getRandomVerse = async (): Promise<Verse | null> => {
  const db = await openDatabase()

  // Récupérer un verset aléatoire
  const verseRow = await db.getFirstAsync<{
    id: number
    book: string
    chapter: number
    verse: number
    text: string
    reference: string
  }>('SELECT * FROM verses ORDER BY RANDOM() LIMIT 1')

  if (!verseRow) return null

  // Récupérer les mots associés
  const wordRows = await db.getAllAsync<{
    text: string
    strong: string | null
    position: number | null
  }>(
    'SELECT text, strong, position FROM words WHERE verse_id = ? ORDER BY position',
    verseRow.id
  )

  const words: Word[] = wordRows.map((w) => ({
    text: w.text,
    strong: w.strong,
    position: w.position ?? undefined,
  }))

  return {
    book: verseRow.book,
    chapter: verseRow.chapter,
    verse: verseRow.verse,
    text: verseRow.text,
    reference: verseRow.reference,
    words,
  }
}
