import { DataSource, CURRENT_DATA_SOURCE } from "../config/constants"
import { Verse, Book } from "../types/bible"
import { StrongDefinition } from "../types/strong"
import {
  getVerse as getMockVerse,
  getBook as getMockBook,
  getAllBooks as getMockAllBooks,
} from "../data/bible-mock"
import {
  getStrongDefinition as getMockStrong,
  searchStrongs as searchMockStrongs,
} from "../data/strong-mock"

class BibleService {
  private dataSource: DataSource

  constructor() {
    this.dataSource = CURRENT_DATA_SOURCE
  }

  async getVerse(
    book: string,
    chapter: number,
    verse: number,
  ): Promise<Verse | null> {
    try {
      switch (this.dataSource) {
        case DataSource.MOCK:
          return getMockVerse(book, chapter, verse)

        case DataSource.LUEUR:
          return await this.fetchFromLueur(book, chapter, verse)

        case DataSource.OPENSOURCE:
          return await this.fetchFromOpenSource(book, chapter, verse)

        default:
          return getMockVerse(book, chapter, verse)
      }
    } catch (error) {
      console.error("Error fetching verse:", error)
      return null
    }
  }

  async getStrongDefinition(number: string): Promise<StrongDefinition | null> {
    try {
      switch (this.dataSource) {
        case DataSource.MOCK:
          return getMockStrong(number)

        case DataSource.LUEUR:
          return await this.fetchStrongFromLueur(number)

        default:
          return getMockStrong(number)
      }
    } catch (error) {
      console.error("Error fetching Strong definition:", error)
      return null
    }
  }

  async getBook(bookId: string): Promise<Book | undefined> {
    try {
      switch (this.dataSource) {
        case DataSource.MOCK:
          return getMockBook(bookId)

        default:
          return getMockBook(bookId)
      }
    } catch (error) {
      console.error("Error fetching book:", error)
      return undefined
    }
  }

  async getAllBooks(): Promise<Book[]> {
    try {
      switch (this.dataSource) {
        case DataSource.MOCK:
          return getMockAllBooks()

        default:
          return getMockAllBooks()
      }
    } catch (error) {
      console.error("Error fetching books:", error)
      return []
    }
  }

  async searchStrongs(query: string): Promise<StrongDefinition[]> {
    try {
      switch (this.dataSource) {
        case DataSource.MOCK:
          return searchMockStrongs(query)

        default:
          return searchMockStrongs(query)
      }
    } catch (error) {
      console.error("Error searching Strongs:", error)
      return []
    }
  }

  // Méthodes à implémenter plus tard
  private async fetchFromLueur(
    book: string,
    chapter: number,
    verse: number,
  ): Promise<Verse | null> {
    // TODO: Implémenter quand API Lueur disponible
    throw new Error("Lueur API not yet implemented")
  }

  private async fetchStrongFromLueur(
    number: string,
  ): Promise<StrongDefinition | null> {
    // TODO: Implémenter
    throw new Error("Lueur Strong API not yet implemented")
  }

  private async fetchFromOpenSource(
    book: string,
    chapter: number,
    verse: number,
  ): Promise<Verse | null> {
    // TODO: Plan B
    throw new Error("OpenSource API not yet implemented")
  }

  // Changer la source de données
  setDataSource(source: DataSource): void {
    this.dataSource = source
  }

  getDataSource(): DataSource {
    return this.dataSource
  }
}

export default new BibleService()
