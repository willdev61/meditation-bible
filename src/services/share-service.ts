import { Share } from 'react-native'
import { Verse } from '../types'

class ShareService {
  // Partager un verset sous forme de texte
  async shareVerse(verse: Verse): Promise<void> {
    try {
      const message = `${verse.text}\n\n— ${verse.reference}`

      await Share.share({
        message,
        title: verse.reference,
      })
    } catch (error) {
      console.error('Error sharing verse:', error)
    }
  }

  // Partager plusieurs versets
  async shareVerses(verses: Verse[], reference: string): Promise<void> {
    try {
      const text = verses.map((v) => `${v.verse}. ${v.text}`).join('\n')
      const message = `${text}\n\n— ${reference}`

      await Share.share({
        message,
        title: reference,
      })
    } catch (error) {
      console.error('Error sharing verses:', error)
    }
  }

  // Générer une citation formatée pour partage
  formatVerseForShare(verse: Verse, includeReference: boolean = true): string {
    const quote = `"${verse.text}"`
    return includeReference ? `${quote}\n\n— ${verse.reference}` : quote
  }
}

export default new ShareService()
