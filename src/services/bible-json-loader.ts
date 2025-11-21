import BibleData from "../../assets/data/bible-fr.json"

// Types pour le fichier JSON de la Bible
export interface BibleJSONVerse {
  ID?: number
  Text: string
}

export interface BibleJSONChapter {
  ID?: number
  Verses: BibleJSONVerse[]
}

export interface BibleJSONBook {
  Text: string
  Chapters: BibleJSONChapter[]
}

export interface BibleJSONTestament {
  Text?: string
  Books: BibleJSONBook[]
}

export interface BibleJSON {
  Abbreviation: string
  Publisher: string
  VersionDate: string
  IsCompressed: number
  IsProtected: number
  Guid: string
  Testaments: BibleJSONTestament[]
  Text?: string
}

// Catégories de livres de la Bible
export enum BookCategory {
  PENTATEUQUE = "Pentateuque",
  HISTORIQUES = "Livres historiques",
  POETIQUES = "Poétiques",
  PROPHETES_MAJEURS = "Prophètes majeurs",
  PROPHETES_MINEURS = "Prophètes mineurs",
  EVANGILES = "Évangiles",
  ACTES = "Actes",
  EPITRES_PAUL = "Épîtres de Paul",
  EPITRES_GENERALES = "Épîtres générales",
  APOCALYPSE = "Apocalypse",
}

export interface BibleBookInfo {
  index: number // Index dans le tableau (0-65)
  testamentIndex: number // 0 pour AT, 1 pour NT
  bookIndex: number // Index dans le testament
  name: string
  testament: "AT" | "NT"
  category: BookCategory
  icon: string
  chaptersCount: number
}

// Mapping des livres avec leurs catégories
const BIBLE_BOOKS_INFO: BibleBookInfo[] = [
  // Ancien Testament - Pentateuque (5 livres)
  {
    index: 0,
    testamentIndex: 0,
    bookIndex: 0,
    name: "Genèse",
    testament: "AT",
    category: BookCategory.PENTATEUQUE,
    icon: "📜",
    chaptersCount: 50,
  },
  {
    index: 1,
    testamentIndex: 0,
    bookIndex: 1,
    name: "Exode",
    testament: "AT",
    category: BookCategory.PENTATEUQUE,
    icon: "📜",
    chaptersCount: 40,
  },
  {
    index: 2,
    testamentIndex: 0,
    bookIndex: 2,
    name: "Lévitique",
    testament: "AT",
    category: BookCategory.PENTATEUQUE,
    icon: "📜",
    chaptersCount: 27,
  },
  {
    index: 3,
    testamentIndex: 0,
    bookIndex: 3,
    name: "Nombres",
    testament: "AT",
    category: BookCategory.PENTATEUQUE,
    icon: "📜",
    chaptersCount: 36,
  },
  {
    index: 4,
    testamentIndex: 0,
    bookIndex: 4,
    name: "Deutéronome",
    testament: "AT",
    category: BookCategory.PENTATEUQUE,
    icon: "📜",
    chaptersCount: 34,
  },
  // Livres historiques (12 livres)
  {
    index: 5,
    testamentIndex: 0,
    bookIndex: 5,
    name: "Josué",
    testament: "AT",
    category: BookCategory.HISTORIQUES,
    icon: "📖",
    chaptersCount: 24,
  },
  {
    index: 6,
    testamentIndex: 0,
    bookIndex: 6,
    name: "Juges",
    testament: "AT",
    category: BookCategory.HISTORIQUES,
    icon: "📖",
    chaptersCount: 21,
  },
  {
    index: 7,
    testamentIndex: 0,
    bookIndex: 7,
    name: "Ruth",
    testament: "AT",
    category: BookCategory.HISTORIQUES,
    icon: "📖",
    chaptersCount: 4,
  },
  {
    index: 8,
    testamentIndex: 0,
    bookIndex: 8,
    name: "1 Samuel",
    testament: "AT",
    category: BookCategory.HISTORIQUES,
    icon: "📖",
    chaptersCount: 31,
  },
  {
    index: 9,
    testamentIndex: 0,
    bookIndex: 9,
    name: "2 Samuel",
    testament: "AT",
    category: BookCategory.HISTORIQUES,
    icon: "📖",
    chaptersCount: 24,
  },
  {
    index: 10,
    testamentIndex: 0,
    bookIndex: 10,
    name: "1 Rois",
    testament: "AT",
    category: BookCategory.HISTORIQUES,
    icon: "📖",
    chaptersCount: 22,
  },
  {
    index: 11,
    testamentIndex: 0,
    bookIndex: 11,
    name: "2 Rois",
    testament: "AT",
    category: BookCategory.HISTORIQUES,
    icon: "📖",
    chaptersCount: 25,
  },
  {
    index: 12,
    testamentIndex: 0,
    bookIndex: 12,
    name: "1 Chroniques",
    testament: "AT",
    category: BookCategory.HISTORIQUES,
    icon: "📖",
    chaptersCount: 29,
  },
  {
    index: 13,
    testamentIndex: 0,
    bookIndex: 13,
    name: "2 Chroniques",
    testament: "AT",
    category: BookCategory.HISTORIQUES,
    icon: "📖",
    chaptersCount: 36,
  },
  {
    index: 14,
    testamentIndex: 0,
    bookIndex: 14,
    name: "Esdras",
    testament: "AT",
    category: BookCategory.HISTORIQUES,
    icon: "📖",
    chaptersCount: 10,
  },
  {
    index: 15,
    testamentIndex: 0,
    bookIndex: 15,
    name: "Néhémie",
    testament: "AT",
    category: BookCategory.HISTORIQUES,
    icon: "📖",
    chaptersCount: 13,
  },
  {
    index: 16,
    testamentIndex: 0,
    bookIndex: 16,
    name: "Esther",
    testament: "AT",
    category: BookCategory.HISTORIQUES,
    icon: "📖",
    chaptersCount: 10,
  },
  // Livres poétiques (5 livres)
  {
    index: 17,
    testamentIndex: 0,
    bookIndex: 17,
    name: "Job",
    testament: "AT",
    category: BookCategory.POETIQUES,
    icon: "✍️",
    chaptersCount: 42,
  },
  {
    index: 18,
    testamentIndex: 0,
    bookIndex: 18,
    name: "Psaumes",
    testament: "AT",
    category: BookCategory.POETIQUES,
    icon: "✍️",
    chaptersCount: 150,
  },
  {
    index: 19,
    testamentIndex: 0,
    bookIndex: 19,
    name: "Proverbes",
    testament: "AT",
    category: BookCategory.POETIQUES,
    icon: "✍️",
    chaptersCount: 31,
  },
  {
    index: 20,
    testamentIndex: 0,
    bookIndex: 20,
    name: "Ecclésiaste",
    testament: "AT",
    category: BookCategory.POETIQUES,
    icon: "✍️",
    chaptersCount: 12,
  },
  {
    index: 21,
    testamentIndex: 0,
    bookIndex: 21,
    name: "Cantique des cantiques",
    testament: "AT",
    category: BookCategory.POETIQUES,
    icon: "✍️",
    chaptersCount: 8,
  },
  // Prophètes majeurs (5 livres)
  {
    index: 22,
    testamentIndex: 0,
    bookIndex: 22,
    name: "Ésaïe",
    testament: "AT",
    category: BookCategory.PROPHETES_MAJEURS,
    icon: "📯",
    chaptersCount: 66,
  },
  {
    index: 23,
    testamentIndex: 0,
    bookIndex: 23,
    name: "Jérémie",
    testament: "AT",
    category: BookCategory.PROPHETES_MAJEURS,
    icon: "📯",
    chaptersCount: 52,
  },
  {
    index: 24,
    testamentIndex: 0,
    bookIndex: 24,
    name: "Lamentations",
    testament: "AT",
    category: BookCategory.PROPHETES_MAJEURS,
    icon: "📯",
    chaptersCount: 5,
  },
  {
    index: 25,
    testamentIndex: 0,
    bookIndex: 25,
    name: "Ézéchiel",
    testament: "AT",
    category: BookCategory.PROPHETES_MAJEURS,
    icon: "📯",
    chaptersCount: 48,
  },
  {
    index: 26,
    testamentIndex: 0,
    bookIndex: 26,
    name: "Daniel",
    testament: "AT",
    category: BookCategory.PROPHETES_MAJEURS,
    icon: "📯",
    chaptersCount: 12,
  },
  // Prophètes mineurs (12 livres)
  {
    index: 27,
    testamentIndex: 0,
    bookIndex: 27,
    name: "Osée",
    testament: "AT",
    category: BookCategory.PROPHETES_MINEURS,
    icon: "📢",
    chaptersCount: 14,
  },
  {
    index: 28,
    testamentIndex: 0,
    bookIndex: 28,
    name: "Joël",
    testament: "AT",
    category: BookCategory.PROPHETES_MINEURS,
    icon: "📢",
    chaptersCount: 3,
  },
  {
    index: 29,
    testamentIndex: 0,
    bookIndex: 29,
    name: "Amos",
    testament: "AT",
    category: BookCategory.PROPHETES_MINEURS,
    icon: "📢",
    chaptersCount: 9,
  },
  {
    index: 30,
    testamentIndex: 0,
    bookIndex: 30,
    name: "Abdias",
    testament: "AT",
    category: BookCategory.PROPHETES_MINEURS,
    icon: "📢",
    chaptersCount: 1,
  },
  {
    index: 31,
    testamentIndex: 0,
    bookIndex: 31,
    name: "Jonas",
    testament: "AT",
    category: BookCategory.PROPHETES_MINEURS,
    icon: "📢",
    chaptersCount: 4,
  },
  {
    index: 32,
    testamentIndex: 0,
    bookIndex: 32,
    name: "Michée",
    testament: "AT",
    category: BookCategory.PROPHETES_MINEURS,
    icon: "📢",
    chaptersCount: 7,
  },
  {
    index: 33,
    testamentIndex: 0,
    bookIndex: 33,
    name: "Nahum",
    testament: "AT",
    category: BookCategory.PROPHETES_MINEURS,
    icon: "📢",
    chaptersCount: 3,
  },
  {
    index: 34,
    testamentIndex: 0,
    bookIndex: 34,
    name: "Habacuc",
    testament: "AT",
    category: BookCategory.PROPHETES_MINEURS,
    icon: "📢",
    chaptersCount: 3,
  },
  {
    index: 35,
    testamentIndex: 0,
    bookIndex: 35,
    name: "Sophonie",
    testament: "AT",
    category: BookCategory.PROPHETES_MINEURS,
    icon: "📢",
    chaptersCount: 3,
  },
  {
    index: 36,
    testamentIndex: 0,
    bookIndex: 36,
    name: "Aggée",
    testament: "AT",
    category: BookCategory.PROPHETES_MINEURS,
    icon: "📢",
    chaptersCount: 2,
  },
  {
    index: 37,
    testamentIndex: 0,
    bookIndex: 37,
    name: "Zacharie",
    testament: "AT",
    category: BookCategory.PROPHETES_MINEURS,
    icon: "📢",
    chaptersCount: 14,
  },
  {
    index: 38,
    testamentIndex: 0,
    bookIndex: 38,
    name: "Malachie",
    testament: "AT",
    category: BookCategory.PROPHETES_MINEURS,
    icon: "📢",
    chaptersCount: 4,
  },
  // Nouveau Testament - Évangiles (4 livres)
  {
    index: 39,
    testamentIndex: 1,
    bookIndex: 0,
    name: "Matthieu",
    testament: "NT",
    category: BookCategory.EVANGILES,
    icon: "✝️",
    chaptersCount: 28,
  },
  {
    index: 40,
    testamentIndex: 1,
    bookIndex: 1,
    name: "Marc",
    testament: "NT",
    category: BookCategory.EVANGILES,
    icon: "✝️",
    chaptersCount: 16,
  },
  {
    index: 41,
    testamentIndex: 1,
    bookIndex: 2,
    name: "Luc",
    testament: "NT",
    category: BookCategory.EVANGILES,
    icon: "✝️",
    chaptersCount: 24,
  },
  {
    index: 42,
    testamentIndex: 1,
    bookIndex: 3,
    name: "Jean",
    testament: "NT",
    category: BookCategory.EVANGILES,
    icon: "✝️",
    chaptersCount: 21,
  },
  // Actes (1 livre)
  {
    index: 43,
    testamentIndex: 1,
    bookIndex: 4,
    name: "Actes",
    testament: "NT",
    category: BookCategory.ACTES,
    icon: "📚",
    chaptersCount: 28,
  },
  // Épîtres de Paul (13 livres)
  {
    index: 44,
    testamentIndex: 1,
    bookIndex: 5,
    name: "Romains",
    testament: "NT",
    category: BookCategory.EPITRES_PAUL,
    icon: "✉️",
    chaptersCount: 16,
  },
  {
    index: 45,
    testamentIndex: 1,
    bookIndex: 6,
    name: "1 Corinthiens",
    testament: "NT",
    category: BookCategory.EPITRES_PAUL,
    icon: "✉️",
    chaptersCount: 16,
  },
  {
    index: 46,
    testamentIndex: 1,
    bookIndex: 7,
    name: "2 Corinthiens",
    testament: "NT",
    category: BookCategory.EPITRES_PAUL,
    icon: "✉️",
    chaptersCount: 13,
  },
  {
    index: 47,
    testamentIndex: 1,
    bookIndex: 8,
    name: "Galates",
    testament: "NT",
    category: BookCategory.EPITRES_PAUL,
    icon: "✉️",
    chaptersCount: 6,
  },
  {
    index: 48,
    testamentIndex: 1,
    bookIndex: 9,
    name: "Éphésiens",
    testament: "NT",
    category: BookCategory.EPITRES_PAUL,
    icon: "✉️",
    chaptersCount: 6,
  },
  {
    index: 49,
    testamentIndex: 1,
    bookIndex: 10,
    name: "Philippiens",
    testament: "NT",
    category: BookCategory.EPITRES_PAUL,
    icon: "✉️",
    chaptersCount: 4,
  },
  {
    index: 50,
    testamentIndex: 1,
    bookIndex: 11,
    name: "Colossiens",
    testament: "NT",
    category: BookCategory.EPITRES_PAUL,
    icon: "✉️",
    chaptersCount: 4,
  },
  {
    index: 51,
    testamentIndex: 1,
    bookIndex: 12,
    name: "1 Thessaloniciens",
    testament: "NT",
    category: BookCategory.EPITRES_PAUL,
    icon: "✉️",
    chaptersCount: 5,
  },
  {
    index: 52,
    testamentIndex: 1,
    bookIndex: 13,
    name: "2 Thessaloniciens",
    testament: "NT",
    category: BookCategory.EPITRES_PAUL,
    icon: "✉️",
    chaptersCount: 3,
  },
  {
    index: 53,
    testamentIndex: 1,
    bookIndex: 14,
    name: "1 Timothée",
    testament: "NT",
    category: BookCategory.EPITRES_PAUL,
    icon: "✉️",
    chaptersCount: 6,
  },
  {
    index: 54,
    testamentIndex: 1,
    bookIndex: 15,
    name: "2 Timothée",
    testament: "NT",
    category: BookCategory.EPITRES_PAUL,
    icon: "✉️",
    chaptersCount: 4,
  },
  {
    index: 55,
    testamentIndex: 1,
    bookIndex: 16,
    name: "Tite",
    testament: "NT",
    category: BookCategory.EPITRES_PAUL,
    icon: "✉️",
    chaptersCount: 3,
  },
  {
    index: 56,
    testamentIndex: 1,
    bookIndex: 17,
    name: "Philémon",
    testament: "NT",
    category: BookCategory.EPITRES_PAUL,
    icon: "✉️",
    chaptersCount: 1,
  },
  // Épîtres générales (8 livres)
  {
    index: 57,
    testamentIndex: 1,
    bookIndex: 18,
    name: "Hébreux",
    testament: "NT",
    category: BookCategory.EPITRES_GENERALES,
    icon: "📜",
    chaptersCount: 13,
  },
  {
    index: 58,
    testamentIndex: 1,
    bookIndex: 19,
    name: "Jacques",
    testament: "NT",
    category: BookCategory.EPITRES_GENERALES,
    icon: "📜",
    chaptersCount: 5,
  },
  {
    index: 59,
    testamentIndex: 1,
    bookIndex: 20,
    name: "1 Pierre",
    testament: "NT",
    category: BookCategory.EPITRES_GENERALES,
    icon: "📜",
    chaptersCount: 5,
  },
  {
    index: 60,
    testamentIndex: 1,
    bookIndex: 21,
    name: "2 Pierre",
    testament: "NT",
    category: BookCategory.EPITRES_GENERALES,
    icon: "📜",
    chaptersCount: 3,
  },
  {
    index: 61,
    testamentIndex: 1,
    bookIndex: 22,
    name: "1 Jean",
    testament: "NT",
    category: BookCategory.EPITRES_GENERALES,
    icon: "📜",
    chaptersCount: 5,
  },
  {
    index: 62,
    testamentIndex: 1,
    bookIndex: 23,
    name: "2 Jean",
    testament: "NT",
    category: BookCategory.EPITRES_GENERALES,
    icon: "📜",
    chaptersCount: 1,
  },
  {
    index: 63,
    testamentIndex: 1,
    bookIndex: 24,
    name: "3 Jean",
    testament: "NT",
    category: BookCategory.EPITRES_GENERALES,
    icon: "📜",
    chaptersCount: 1,
  },
  {
    index: 64,
    testamentIndex: 1,
    bookIndex: 25,
    name: "Jude",
    testament: "NT",
    category: BookCategory.EPITRES_GENERALES,
    icon: "📜",
    chaptersCount: 1,
  },
  // Apocalypse (1 livre)
  {
    index: 65,
    testamentIndex: 1,
    bookIndex: 26,
    name: "Apocalypse",
    testament: "NT",
    category: BookCategory.APOCALYPSE,
    icon: "🔥",
    chaptersCount: 22,
  },
]

class BibleJSONLoader {
  private bibleData: BibleJSON
  private booksInfo: BibleBookInfo[]

  constructor() {
    this.bibleData = BibleData as BibleJSON
    this.booksInfo = BIBLE_BOOKS_INFO
  }

  // Récupérer tous les livres avec leurs informations
  getAllBooks(): BibleBookInfo[] {
    return this.booksInfo
  }

  // Récupérer les livres par testament
  getBooksByTestament(testament: "AT" | "NT"): BibleBookInfo[] {
    return this.booksInfo.filter((book) => book.testament === testament)
  }

  // Récupérer les livres par catégorie
  getBooksByCategory(category: BookCategory): BibleBookInfo[] {
    return this.booksInfo.filter((book) => book.category === category)
  }

  // Récupérer un livre par son index
  getBookInfo(bookIndex: number): BibleBookInfo | null {
    return this.booksInfo[bookIndex] || null
  }

  // Récupérer un livre par son nom
  getBookInfoByName(name: string): BibleBookInfo | null {
    return (
      this.booksInfo.find(
        (book) => book.name.toLowerCase() === name.toLowerCase(),
      ) || null
    )
  }

  // Récupérer un chapitre complet
  getChapter(
    bookIndex: number,
    chapterNumber: number,
  ): BibleJSONChapter | null {
    const bookInfo = this.getBookInfo(bookIndex)
    if (!bookInfo) return null

    const testament = this.bibleData.Testaments[bookInfo.testamentIndex]
    if (!testament) return null

    const book = testament.Books[bookInfo.bookIndex]
    if (!book) return null

    const chapter = book.Chapters[chapterNumber - 1]
    return chapter || null
  }

  // Récupérer un verset spécifique
  getVerse(
    bookIndex: number,
    chapterNumber: number,
    verseNumber: number,
  ): BibleJSONVerse | null {
    const chapter = this.getChapter(bookIndex, chapterNumber)
    if (!chapter) return null

    const verse = chapter.Verses[verseNumber - 1]
    return verse || null
  }

  // Récupérer le nombre total de versets d'un chapitre
  getVersesCount(bookIndex: number, chapterNumber: number): number {
    const chapter = this.getChapter(bookIndex, chapterNumber)
    return chapter ? chapter.Verses.length : 0
  }

  // Rechercher des livres par nom
  searchBooks(query: string): BibleBookInfo[] {
    const lowerQuery = query.toLowerCase()
    return this.booksInfo.filter((book) =>
      book.name.toLowerCase().includes(lowerQuery),
    )
  }

  // Obtenir les catégories uniques
  getCategories(): BookCategory[] {
    return Object.values(BookCategory)
  }
}

export default new BibleJSONLoader()
