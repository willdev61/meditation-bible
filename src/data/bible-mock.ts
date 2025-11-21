import { BibleData, Book, Verse } from "../types"

export const mockBible: BibleData = {
  books: [
    { id: "jean", name: "Jean", chapters: 21, testament: "NT" },
    { id: "psaume", name: "Psaumes", chapters: 150, testament: "AT" },
    { id: "genese", name: "Genèse", chapters: 50, testament: "AT" },
    { id: "matthieu", name: "Matthieu", chapters: 28, testament: "NT" },
    { id: "romains", name: "Romains", chapters: 16, testament: "NT" },
  ],

  verses: {
    "jean-3-16": {
      book: "Jean",
      chapter: 3,
      verse: 16,
      reference: "Jean 3:16",
      text: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.",
      words: [
        { text: "Car", strong: null, position: 0 },
        { text: "Dieu", strong: "G2316", position: 1 },
        { text: "a", strong: null, position: 2 },
        { text: "tant", strong: null, position: 3 },
        { text: "aimé", strong: "G25", position: 4 },
        { text: "le", strong: null, position: 5 },
        { text: "monde", strong: "G2889", position: 6 },
        { text: "qu'il", strong: null, position: 7 },
        { text: "a", strong: null, position: 8 },
        { text: "donné", strong: "G1325", position: 9 },
        { text: "son", strong: null, position: 10 },
        { text: "Fils", strong: "G5207", position: 11 },
        { text: "unique", strong: "G3439", position: 12 },
      ],
    },

    "jean-1-1": {
      book: "Jean",
      chapter: 1,
      verse: 1,
      reference: "Jean 1:1",
      text: "Au commencement était la Parole, et la Parole était avec Dieu, et la Parole était Dieu.",
      words: [
        { text: "Au", strong: null, position: 0 },
        { text: "commencement", strong: "G746", position: 1 },
        { text: "était", strong: "G1510", position: 2 },
        { text: "la", strong: null, position: 3 },
        { text: "Parole", strong: "G3056", position: 4 },
        { text: "et", strong: null, position: 5 },
        { text: "la", strong: null, position: 6 },
        { text: "Parole", strong: "G3056", position: 7 },
        { text: "était", strong: "G1510", position: 8 },
        { text: "avec", strong: "G4314", position: 9 },
        { text: "Dieu", strong: "G2316", position: 10 },
      ],
    },

    "psaume-23-1": {
      book: "Psaumes",
      chapter: 23,
      verse: 1,
      reference: "Psaume 23:1",
      text: "L'Éternel est mon berger: je ne manquerai de rien.",
      words: [
        { text: "L'Éternel", strong: "H3068", position: 0 },
        { text: "est", strong: null, position: 1 },
        { text: "mon", strong: null, position: 2 },
        { text: "berger", strong: "H7462", position: 3 },
        { text: "je", strong: null, position: 4 },
        { text: "ne", strong: null, position: 5 },
        { text: "manquerai", strong: "H2637", position: 6 },
        { text: "de", strong: null, position: 7 },
        { text: "rien", strong: null, position: 8 },
      ],
    },

    "genese-1-1": {
      book: "Genèse",
      chapter: 1,
      verse: 1,
      reference: "Genèse 1:1",
      text: "Au commencement, Dieu créa les cieux et la terre.",
      words: [
        { text: "Au", strong: null, position: 0 },
        { text: "commencement", strong: "H7225", position: 1 },
        { text: "Dieu", strong: "H430", position: 2 },
        { text: "créa", strong: "H1254", position: 3 },
        { text: "les", strong: null, position: 4 },
        { text: "cieux", strong: "H8064", position: 5 },
        { text: "et", strong: null, position: 6 },
        { text: "la", strong: null, position: 7 },
        { text: "terre", strong: "H776", position: 8 },
      ],
    },

    "matthieu-5-3": {
      book: "Matthieu",
      chapter: 5,
      verse: 3,
      reference: "Matthieu 5:3",
      text: "Heureux les pauvres en esprit, car le royaume des cieux est à eux!",
      words: [
        { text: "Heureux", strong: "G3107", position: 0 },
        { text: "les", strong: null, position: 1 },
        { text: "pauvres", strong: "G4434", position: 2 },
        { text: "en", strong: null, position: 3 },
        { text: "esprit", strong: "G4151", position: 4 },
      ],
    },

    "romains-8-28": {
      book: "Romains",
      chapter: 8,
      verse: 28,
      reference: "Romains 8:28",
      text: "Nous savons, du reste, que toutes choses concourent au bien de ceux qui aiment Dieu, de ceux qui sont appelés selon son dessein.",
      words: [
        { text: "Nous", strong: null, position: 0 },
        { text: "savons", strong: "G1492", position: 1 },
        { text: "que", strong: null, position: 2 },
        { text: "toutes", strong: "G3956", position: 3 },
        { text: "choses", strong: null, position: 4 },
        { text: "concourent", strong: "G4903", position: 5 },
        { text: "au", strong: null, position: 6 },
        { text: "bien", strong: "G18", position: 7 },
      ],
    },
  },
}

export const getVerse = (
  book: string,
  chapter: number,
  verse: number,
): Verse | null => {
  const key = `${book.toLowerCase()}-${chapter}-${verse}`
  return mockBible.verses[key] || null
}

export const getBook = (bookId: string): Book | undefined => {
  return mockBible.books.find((b) => b.id === bookId)
}

export const getAllBooks = (): Book[] => {
  return mockBible.books
}

export const getBooksByTestament = (testament: "AT" | "NT"): Book[] => {
  return mockBible.books.filter((b) => b.testament === testament)
}
