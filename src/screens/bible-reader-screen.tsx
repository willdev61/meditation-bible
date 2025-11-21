import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { RouteProp } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../types/navigation"
import { Verse } from "../types"
import StrongWord from "../components/strong-word"
import LoadingSpinner from "../components/loading-spinner"
import bibleService from "../services/bible-service"
import { COLORS, SIZES } from "../config/constants"

type BibleReaderScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "BibleReader">
  route: RouteProp<RootStackParamList, "BibleReader">
}

const BibleReaderScreen: React.FC<BibleReaderScreenProps> = ({
  navigation,
  route,
}) => {
  const { book, chapter, verse: verseNumber } = route.params
  const [verse, setVerse] = useState<Verse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadVerse()
  }, [book, chapter, verseNumber])

  const loadVerse = async () => {
    setLoading(true)
    try {
      const loadedVerse = await bibleService.getVerse(
        book,
        chapter,
        verseNumber || 1,
      )
      setVerse(loadedVerse)
    } catch (error) {
      console.error("Error loading verse:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleStrongPress = (strongNumber: string) => {
    navigation.navigate("StrongDetail", { strongNumber })
  }

  const handleMeditate = () => {
    if (verse) {
      navigation.navigate("Meditation", { verse })
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (!verse) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Ionicons
            name="alert-circle-outline"
            size={64}
            color={COLORS.error}
          />
          <Text style={styles.errorText}>Verset non trouvé</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Retour</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
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
          <Text style={styles.headerTitle}>{verse.reference}</Text>
          <TouchableOpacity style={styles.menuButton}>
            <Ionicons
              name="ellipsis-vertical"
              size={24}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          {/* Verset */}
          <View style={styles.verseContainer}>
            <Text style={styles.verseReference}>{verse.reference}</Text>

            <View style={styles.verseTextContainer}>
              {verse.words.map((word, index) => (
                <StrongWord
                  key={index}
                  word={word}
                  onPress={handleStrongPress}
                />
              ))}
            </View>

            <Text style={styles.instruction}>
              <Ionicons
                name="information-circle"
                size={16}
                color={COLORS.textLight}
              />{" "}
              Appuyez sur les mots soulignés pour voir leur définition Strong's
            </Text>
          </View>

          {/* Actions */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleMeditate}
            >
              <Ionicons name="heart" size={24} color={COLORS.white} />
              <Text style={styles.actionButtonText}>Méditer</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.secondaryButton]}
            >
              <Ionicons
                name="bookmark-outline"
                size={24}
                color={COLORS.primary}
              />
              <Text
                style={[styles.actionButtonText, styles.secondaryButtonText]}
              >
                Sauvegarder
              </Text>
            </TouchableOpacity>
          </View>

          {/* Navigation */}
          <View style={styles.navigationContainer}>
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => {
                // TODO: Implémenter navigation verset précédent
              }}
            >
              <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
              <Text style={styles.navButtonText}>Précédent</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navButton}
              onPress={() => {
                // TODO: Implémenter navigation verset suivant
              }}
            >
              <Text style={styles.navButtonText}>Suivant</Text>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={COLORS.primary}
              />
            </TouchableOpacity>
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
  verseContainer: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
    margin: SIZES.padding,
  },
  verseReference: {
    fontSize: SIZES.large,
    fontWeight: "600",
    color: COLORS.secondary,
    marginBottom: 16,
  },
  verseTextContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  instruction: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    fontStyle: "italic",
    marginTop: 8,
  },
  actionsContainer: {
    flexDirection: "row",
    paddingHorizontal: SIZES.padding,
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
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.padding,
    marginBottom: SIZES.padding * 2,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 4,
  },
  navButtonText: {
    color: COLORS.primary,
    fontSize: SIZES.medium,
    fontWeight: "600",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.padding * 2,
  },
  errorText: {
    fontSize: SIZES.large,
    color: COLORS.text,
    marginVertical: 16,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: "600",
  },
})

export default BibleReaderScreen
