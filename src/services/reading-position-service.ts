import AsyncStorage from "@react-native-async-storage/async-storage"

const LAST_POSITION_KEY = "@bible_last_position"

export interface ReadingPosition {
  bookIndex: number
  chapterNumber: number
  timestamp: number
}

class ReadingPositionService {
  /**
   * Sauvegarde la dernière position de lecture
   */
  async saveLastPosition(bookIndex: number, chapterNumber: number): Promise<void> {
    try {
      const position: ReadingPosition = {
        bookIndex,
        chapterNumber,
        timestamp: Date.now(),
      }
      await AsyncStorage.setItem(LAST_POSITION_KEY, JSON.stringify(position))
    } catch (error) {
      console.error("Error saving last position:", error)
    }
  }

  /**
   * Récupère la dernière position de lecture
   * Retourne null si aucune position n'a été sauvegardée
   */
  async getLastPosition(): Promise<ReadingPosition | null> {
    try {
      const positionStr = await AsyncStorage.getItem(LAST_POSITION_KEY)
      if (!positionStr) {
        return null
      }
      return JSON.parse(positionStr) as ReadingPosition
    } catch (error) {
      console.error("Error getting last position:", error)
      return null
    }
  }

  /**
   * Efface la dernière position de lecture
   */
  async clearLastPosition(): Promise<void> {
    try {
      await AsyncStorage.removeItem(LAST_POSITION_KEY)
    } catch (error) {
      console.error("Error clearing last position:", error)
    }
  }
}

export default new ReadingPositionService()
