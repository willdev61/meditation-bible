import * as Database from './database'
import { mockBible } from '../data/bible-mock'
import { mockStrongs } from '../data/strong-mock'
import { Verse } from '../types'

/**
 * Peupler la base de données avec les données mockées
 * Cette fonction est appelée au démarrage de l'application si la base est vide
 */
export const seedDatabase = async (): Promise<void> => {
  try {
    console.log('🌱 Début du seeding de la base de données...')

    // Vérifier si la base est déjà peuplée
    const isSeeded = await Database.isDatabaseSeeded()
    if (isSeeded) {
      console.log('✅ Base de données déjà peuplée, seeding ignoré')
      return
    }

    // 1. Insérer les livres
    console.log('📚 Insertion des livres...')
    for (const book of mockBible.books) {
      await Database.insertBook(book)
    }
    console.log(`✅ ${mockBible.books.length} livres insérés`)

    // 2. Insérer les versets
    console.log('📖 Insertion des versets...')
    const verses = Object.values(mockBible.verses) as Verse[]
    for (const verse of verses) {
      await Database.insertVerse(verse)
    }
    console.log(`✅ ${verses.length} versets insérés`)

    // 3. Insérer les définitions Strong's
    console.log('🔤 Insertion des définitions Strong\'s...')
    const strongs = Object.values(mockStrongs)
    for (const strong of strongs) {
      await Database.insertStrongDefinition(strong)
    }
    console.log(`✅ ${strongs.length} définitions Strong's insérées`)

    // 4. Afficher les statistiques
    const stats = await Database.getDatabaseStats()
    console.log('\n📊 Statistiques de la base de données:')
    console.log(`   - Livres: ${stats.booksCount}`)
    console.log(`   - Versets: ${stats.versesCount}`)
    console.log(`   - Mots: ${stats.wordsCount}`)
    console.log(`   - Strong's: ${stats.strongsCount}`)

    console.log('\n✅ Seeding terminé avec succès!')
  } catch (error) {
    console.error('❌ Erreur lors du seeding:', error)
    throw error
  }
}

/**
 * Ajouter un nouveau verset dans la base de données
 * Utile pour enrichir la base avec plus de contenu
 */
export const addVerse = async (verse: Verse): Promise<void> => {
  try {
    await Database.insertVerse(verse)
    console.log(`✅ Verset ajouté: ${verse.reference}`)
  } catch (error) {
    console.error(`❌ Erreur lors de l'ajout du verset ${verse.reference}:`, error)
    throw error
  }
}

/**
 * Réinitialiser et repeupler la base de données
 * ⚠️ ATTENTION: Cette fonction supprime toutes les données!
 */
export const reseedDatabase = async (): Promise<void> => {
  console.log('⚠️  Réinitialisation de la base de données...')
  await Database.resetDatabase()
  await seedDatabase()
}
