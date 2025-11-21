import React, { useEffect, useState } from "react"
import { StatusBar } from "expo-status-bar"
import { View, ActivityIndicator, Text } from "react-native"
import AppNavigator from "./src/navigation/navigator"
import { COLORS } from "./src/config/constants"
import { initializeDatabase } from "./src/services/database"
import { seedDatabase } from "./src/services/seed-database"
import readingPlansService from "./src/services/reading-plans-service"

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initApp = async () => {
      try {
        console.log('🚀 Initialisation de l\'application...')

        // Initialiser le schéma de la base de données
        await initializeDatabase()

        // Peupler la base de données avec les données initiales
        await seedDatabase()

        // Initialiser les plans de lecture par défaut
        await readingPlansService.initializeDefaultPlans()

        console.log('✅ Application prête!')
        setIsLoading(false)
      } catch (err) {
        console.error('❌ Erreur lors de l\'initialisation:', err)
        setError(err instanceof Error ? err.message : 'Erreur inconnue')
        setIsLoading(false)
      }
    }

    initApp()
  }, [])

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ marginTop: 16, color: COLORS.text }}>
          Initialisation de la Bible...
        </Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
        <Text style={{ color: COLORS.error, fontSize: 16, textAlign: 'center', paddingHorizontal: 20 }}>
          Erreur lors de l'initialisation: {error}
        </Text>
      </View>
    )
  }

  return (
    <>
      <StatusBar style="dark" backgroundColor={COLORS.background} />
      <AppNavigator />
    </>
  )
}
