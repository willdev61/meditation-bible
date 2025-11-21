import React, { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { RouteProp } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../types/navigation"
import MeditationTimer from "../components/meditation-timer"
import { COLORS, SIZES } from "../config/constants"

type MeditationScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Meditation">
  route: RouteProp<RootStackParamList, "Meditation">
}

const MeditationScreen: React.FC<MeditationScreenProps> = ({
  navigation,
  route,
}) => {
  const { verse } = route.params
  const [notes, setNotes] = useState("")
  const [showTimer, setShowTimer] = useState(false)

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Méditation</Text>
          <TouchableOpacity style={styles.menuButton} onPress={handleSaveNotes}>
            <Ionicons name="save-outline" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          {/* Verset */}
          <View style={styles.verseCard}>
            <Text style={styles.verseReference}>{verse.reference}</Text>
            <Text style={styles.verseText}>{verse.text}</Text>
          </View>

          {/* Timer de méditation */}
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.timerToggle}
              onPress={() => setShowTimer(!showTimer)}
            >
              <View style={styles.timerToggleLeft}>
                <Ionicons
                  name="timer-outline"
                  size={24}
                  color={COLORS.primary}
                />
                <Text style={styles.timerToggleText}>
                  {showTimer ? "Masquer" : "Afficher"} le minuteur
                </Text>
              </View>
              <Ionicons
                name={showTimer ? "chevron-up" : "chevron-down"}
                size={24}
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
            <Text style={styles.sectionTitle}>
              <Ionicons name="help-circle" size={20} color={COLORS.primary} />{" "}
              Questions de réflexion
            </Text>
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
            <Text style={styles.sectionTitle}>
              <Ionicons
                name="create-outline"
                size={20}
                color={COLORS.primary}
              />{" "}
              Mes notes et réflexions
            </Text>
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
            >
              <Ionicons
                name="checkmark-circle"
                size={24}
                color={COLORS.white}
              />
              <Text style={styles.actionButtonText}>Sauvegarder</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.secondaryButton]}
              onPress={() => {
                // TODO: Implémenter le partage
                alert("Fonctionnalité de partage à venir !")
              }}
            >
              <Ionicons name="share-outline" size={24} color={COLORS.primary} />
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
              <Ionicons name="bulb" size={20} color={COLORS.secondary} />
              <Text style={styles.tipsTitle}>Conseils pour méditer</Text>
            </View>
            <Text style={styles.tipsText}>
              • Trouvez un endroit calme{"\n"}• Lisez le verset plusieurs fois
              lentement{"\n"}• Priez avant de commencer{"\n"}• Notez ce qui vous
              interpelle{"\n"}• Demandez à Dieu de vous parler
            </Text>
          </View>
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.padding,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontWeight: "600",
    color: COLORS.primary,
  },
  menuButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  verseCard: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
    margin: SIZES.padding,
    marginBottom: SIZES.padding / 2,
  },
  verseReference: {
    fontSize: SIZES.medium,
    color: COLORS.secondary,
    fontWeight: "600",
    marginBottom: 12,
  },
  verseText: {
    fontSize: SIZES.large,
    color: COLORS.white,
    lineHeight: 28,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
    margin: SIZES.padding,
    marginTop: SIZES.padding / 2,
    marginBottom: SIZES.padding / 2,
  },
  timerToggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 12,
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
  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: "600",
    color: COLORS.primary,
    marginBottom: 16,
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
    backgroundColor: COLORS.accent,
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
    borderRadius: 8,
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
    paddingHorizontal: SIZES.padding,
    marginVertical: SIZES.padding / 2,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 8,
    gap: 8,
  },
  actionButtonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  secondaryButtonText: {
    color: COLORS.primary,
  },
  tipsCard: {
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
    margin: SIZES.padding,
    marginTop: SIZES.padding / 2,
    marginBottom: SIZES.padding * 2,
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
    color: COLORS.secondary,
  },
  tipsText: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    lineHeight: 24,
  },
})

export default MeditationScreen
