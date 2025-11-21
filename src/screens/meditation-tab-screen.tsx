import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { CompositeNavigationProp } from "@react-navigation/native"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Verse } from "../types"
import bibleService from "../services/bible-service"
import MeditationTimer from "../components/meditation-timer"
import LoadingSpinner from "../components/loading-spinner"
import { COLORS, SIZES } from "../config/constants"
import { RootStackParamList, TabParamList } from "../types/navigation"

type MeditationTabScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, "MeditationTab">,
  NativeStackNavigationProp<RootStackParamList>
>

type MeditationTabScreenProps = {
  navigation: MeditationTabScreenNavigationProp
}

const MeditationTabScreen: React.FC<MeditationTabScreenProps> = ({
  navigation,
}) => {
  const [verseOfTheDay, setVerseOfTheDay] = useState<Verse | null>(null)
  const [loading, setLoading] = useState(true)
  const [notes, setNotes] = useState("")
  const [showTimer, setShowTimer] = useState(false)

  useEffect(() => {
    loadVerseOfTheDay()
  }, [])

  const loadVerseOfTheDay = async () => {
    setLoading(true)
    try {
      let randomVerse = await bibleService.getRandomVerse()

      // Si la base de données est vide, utiliser un verset par défaut
      if (!randomVerse) {
        console.log("📖 Base de données vide, utilisation d'un verset par défaut")
        randomVerse = await bibleService.getVerse("jean", 3, 16)
      }

      setVerseOfTheDay(randomVerse)
    } catch (error) {
      console.error("❌ Error loading verse of the day:", error)
      // En cas d'erreur, essayer de charger un verset par défaut
      try {
        const fallbackVerse = await bibleService.getVerse("jean", 3, 16)
        setVerseOfTheDay(fallbackVerse)
      } catch (fallbackError) {
        console.error("❌ Fallback verse also failed:", fallbackError)
      }
    } finally {
      setLoading(false)
    }
  }

  const reflectionQuestions = [
    "Que me révèle ce verset sur Dieu ?",
    "Comment puis-je appliquer cette vérité dans ma vie ?",
    "Y a-t-il une promesse à saisir ou un commandement à obéir ?",
    "Qu'est-ce que ce passage m'apprend sur moi-même ?",
  ]

  const handleSaveNotes = () => {
    // TODO: Implémenter la sauvegarde des notes
    console.log("Notes sauvegardées:", notes)
    alert("Notes sauvegardées avec succès !")
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (!verseOfTheDay) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={64} color={COLORS.textLight} />
          <Text style={styles.errorText}>
            Impossible de charger le verset du jour
          </Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={loadVerseOfTheDay}
          >
            <Text style={styles.retryButtonText}>Réessayer</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Méditation guidée</Text>
            <Text style={styles.headerSubtitle}>Prenez un moment avec Dieu</Text>
          </View>
          <TouchableOpacity
            onPress={loadVerseOfTheDay}
            style={styles.refreshButton}
            activeOpacity={0.7}
          >
            <Ionicons name="refresh" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Verset du jour */}
          <View style={styles.verseCard}>
            <View style={styles.verseHeader}>
              <Ionicons name="sparkles" size={14} color={COLORS.gold} />
              <Text style={styles.verseLabel}>Verset du jour</Text>
            </View>
            <Text style={styles.verseReference}>{verseOfTheDay.reference}</Text>
            <View style={styles.verseQuoteContainer}>
              <View style={styles.quoteMarkLeft}>
                <Text style={styles.quoteMark}>"</Text>
              </View>
              <Text style={styles.verseText}>{verseOfTheDay.text}</Text>
              <View style={styles.quoteMarkRight}>
                <Text style={styles.quoteMark}>"</Text>
              </View>
            </View>
          </View>

          {/* Timer de méditation */}
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.timerToggle}
              onPress={() => setShowTimer(!showTimer)}
              activeOpacity={0.7}
            >
              <View style={styles.timerToggleLeft}>
                <Ionicons
                  name="timer"
                  size={22}
                  color={COLORS.primary}
                />
                <Text style={styles.timerToggleText}>
                  {showTimer ? "Masquer" : "Afficher"} le minuteur
                </Text>
              </View>
              <Ionicons
                name={showTimer ? "chevron-up" : "chevron-down"}
                size={22}
                color={COLORS.textLight}
              />
            </TouchableOpacity>

            {showTimer && (
              <MeditationTimer
                initialMinutes={5}
                onComplete={() => alert("Temps de méditation terminé !")}
              />
            )}
          </View>

          {/* Questions de réflexion */}
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Ionicons name="help-circle" size={20} color={COLORS.primary} />
              <Text style={styles.sectionTitle}>Questions de réflexion</Text>
            </View>
            {reflectionQuestions.map((question, index) => (
              <View key={index} style={styles.questionItem}>
                <View style={styles.questionNumber}>
                  <Text style={styles.questionNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.questionText}>{question}</Text>
              </View>
            ))}
          </View>

          {/* Zone de notes */}
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Ionicons
                name="create"
                size={20}
                color={COLORS.primary}
              />
              <Text style={styles.sectionTitle}>Mes notes et réflexions</Text>
            </View>
            <TextInput
              style={styles.notesInput}
              placeholder="Écrivez vos pensées, prières, ou insights..."
              placeholderTextColor={COLORS.textLight}
              multiline
              numberOfLines={10}
              value={notes}
              onChangeText={setNotes}
              textAlignVertical="top"
            />
            <Text style={styles.characterCount}>{notes.length} caractères</Text>
          </View>

          {/* Actions */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleSaveNotes}
              activeOpacity={0.8}
            >
              <Ionicons
                name="checkmark-circle"
                size={20}
                color={COLORS.white}
              />
              <Text style={styles.actionButtonText}>Sauvegarder</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.secondaryButton]}
              onPress={() => {
                alert("Fonctionnalité de partage à venir !")
              }}
              activeOpacity={0.8}
            >
              <Ionicons name="share-outline" size={20} color={COLORS.primary} />
              <Text
                style={[styles.actionButtonText, styles.secondaryButtonText]}
              >
                Partager
              </Text>
            </TouchableOpacity>
          </View>

          {/* Conseils de méditation */}
          <View style={styles.tipsCard}>
            <View style={styles.tipsHeader}>
              <Ionicons name="bulb" size={20} color={COLORS.earth} />
              <Text style={styles.tipsTitle}>Conseils pour méditer</Text>
            </View>
            <Text style={styles.tipsText}>
              • Trouvez un endroit calme{"\n"}
              • Lisez le verset plusieurs fois lentement{"\n"}
              • Priez avant de commencer{"\n"}
              • Notez ce qui vous interpelle{"\n"}
              • Demandez à Dieu de vous parler
            </Text>
          </View>

          {/* Espace en bas */}
          <View style={{ height: SIZES.padding * 3 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SIZES.padding * 1.5,
    paddingTop: SIZES.padding,
    paddingBottom: SIZES.padding * 1.5,
    backgroundColor: COLORS.background,
  },
  headerTitle: {
    fontSize: SIZES.title,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  headerSubtitle: {
    fontSize: SIZES.medium,
    color: COLORS.textMedium,
    fontStyle: "italic",
  },
  refreshButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.sand,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  content: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.padding * 2,
  },
  errorText: {
    fontSize: SIZES.large,
    color: COLORS.textMedium,
    textAlign: "center",
    marginTop: SIZES.padding,
    marginBottom: SIZES.padding * 2,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
    borderRadius: SIZES.radius,
  },
  retryButtonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: "600",
  },
  verseCard: {
    backgroundColor: COLORS.sand,
    borderRadius: SIZES.radius + 4,
    padding: SIZES.padding * 1.5,
    marginHorizontal: SIZES.padding * 1.5,
    marginBottom: SIZES.padding,
    borderWidth: 1,
    borderColor: COLORS.clay,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  verseHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  verseLabel: {
    fontSize: SIZES.small,
    color: COLORS.gold,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  verseReference: {
    fontSize: SIZES.large,
    color: COLORS.text,
    fontWeight: "700",
    marginBottom: SIZES.padding,
    letterSpacing: 0.5,
  },
  verseQuoteContainer: {
    position: "relative",
    paddingVertical: SIZES.padding * 0.5,
  },
  quoteMarkLeft: {
    position: "absolute",
    top: -8,
    left: -4,
  },
  quoteMarkRight: {
    position: "absolute",
    bottom: -20,
    right: -4,
  },
  quoteMark: {
    fontSize: 48,
    color: COLORS.clay,
    fontWeight: "700",
    lineHeight: 48,
    opacity: 0.3,
  },
  verseText: {
    fontSize: SIZES.large,
    color: COLORS.text,
    lineHeight: 28,
    paddingHorizontal: 12,
    fontWeight: "500",
  },
  card: {
    backgroundColor: COLORS.paper,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
    marginHorizontal: SIZES.padding * 1.5,
    marginBottom: SIZES.padding,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  timerToggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  timerToggleLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  timerToggleText: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    fontWeight: "500",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: "600",
    color: COLORS.text,
  },
  questionItem: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 12,
  },
  questionNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.olive,
    justifyContent: "center",
    alignItems: "center",
  },
  questionNumberText: {
    color: COLORS.white,
    fontSize: SIZES.small,
    fontWeight: "600",
  },
  questionText: {
    flex: 1,
    fontSize: SIZES.medium,
    color: COLORS.text,
    lineHeight: 22,
  },
  notesInput: {
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius - 4,
    padding: 12,
    fontSize: SIZES.medium,
    color: COLORS.text,
    minHeight: 150,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  characterCount: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    textAlign: "right",
    marginTop: 8,
  },
  actionsContainer: {
    flexDirection: "row",
    paddingHorizontal: SIZES.padding * 1.5,
    marginBottom: SIZES.padding,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: SIZES.radius,
    gap: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButtonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: COLORS.paper,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.text,
    shadowOpacity: 0.06,
  },
  secondaryButtonText: {
    color: COLORS.primary,
  },
  tipsCard: {
    backgroundColor: COLORS.lightCream,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
    marginHorizontal: SIZES.padding * 1.5,
    marginBottom: SIZES.padding,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tipsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  tipsTitle: {
    fontSize: SIZES.medium,
    fontWeight: "600",
    color: COLORS.earth,
  },
  tipsText: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    lineHeight: 24,
  },
})

export default MeditationTabScreen
