import React, { useState, useMemo, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  useColorScheme,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { RouteProp } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../types/navigation"
import { COLORS, SIZES } from "../config/constants"
import bibleJSONLoader, { BibleJSONVerse } from "../services/bible-json-loader"
import readingPositionService from "../services/reading-position-service"

type BibleChapterReaderScreenProps = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "BibleChapterReader"
  >
  route: RouteProp<RootStackParamList, "BibleChapterReader">
}

type FontSize = "S" | "M" | "L" | "XL"
type ReadingMode = "light" | "dark" | "sepia"

const FONT_SIZES: Record<FontSize, number> = {
  S: 14,
  M: 16,
  L: 18,
  XL: 20,
}

const BibleChapterReaderScreen: React.FC<BibleChapterReaderScreenProps> = ({
  navigation,
  route,
}) => {
  const { bookIndex, chapterNumber } = route.params
  const systemColorScheme = useColorScheme()

  // États pour les options de lecture
  const [fontSize, setFontSize] = useState<FontSize>("M")
  const [readingMode, setReadingMode] = useState<ReadingMode>(
    systemColorScheme === "dark" ? "dark" : "light",
  )
  const [showVerseNumbers, setShowVerseNumbers] = useState(true)
  const [lineSpacing, setLineSpacing] = useState(1.5)
  const [showSettings, setShowSettings] = useState(false)

  // Récupérer les données
  const bookInfo = useMemo(
    () => bibleJSONLoader.getBookInfo(bookIndex),
    [bookIndex],
  )
  const chapter = useMemo(
    () => bibleJSONLoader.getChapter(bookIndex, chapterNumber),
    [bookIndex, chapterNumber],
  )

  // Sauvegarder la position de lecture
  useEffect(() => {
    const savePosition = async () => {
      await readingPositionService.saveLastPosition(bookIndex, chapterNumber)
    }
    savePosition()
  }, [bookIndex, chapterNumber])

  if (!bookInfo || !chapter) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={64} color={COLORS.error} />
          <Text style={styles.errorText}>Chapitre non trouvé</Text>
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

  // Couleurs selon le mode de lecture
  const getThemeColors = () => {
    switch (readingMode) {
      case "dark":
        return {
          background: "#1a1a1a",
          card: "#2a2a2a",
          text: "#e0e0e0",
          textLight: "#a0a0a0",
          verseNumber: "#6a9bd8",
        }
      case "sepia":
        return {
          background: "#f4ecd8",
          card: "#f9f5e8",
          text: "#5c4f3d",
          textLight: "#8c7f6d",
          verseNumber: "#9d7145",
        }
      default:
        return {
          background: COLORS.background,
          card: COLORS.white,
          text: COLORS.text,
          textLight: COLORS.textLight,
          verseNumber: COLORS.primary,
        }
    }
  }

  const themeColors = getThemeColors()

  // Navigation
  const canGoPrevious = chapterNumber > 1
  const canGoNext = chapterNumber < bookInfo.chaptersCount

  const handlePrevious = () => {
    if (canGoPrevious) {
      navigation.setParams({
        bookIndex,
        chapterNumber: chapterNumber - 1,
      })
    }
  }

  const handleNext = () => {
    if (canGoNext) {
      navigation.setParams({
        bookIndex,
        chapterNumber: chapterNumber + 1,
      })
    }
  }

  const renderVerse = (verse: BibleJSONVerse, index: number) => {
    const verseNumber = index + 1
    return (
      <View key={`verse-${verseNumber}`} style={styles.verseContainer}>
        {showVerseNumbers && (
          <Text
            style={[
              styles.verseNumber,
              {
                color: themeColors.verseNumber,
                fontSize: FONT_SIZES[fontSize] - 2,
              },
            ]}
          >
            {verseNumber}
          </Text>
        )}
        <Text
          style={[
            styles.verseText,
            {
              color: themeColors.text,
              fontSize: FONT_SIZES[fontSize],
              lineHeight: FONT_SIZES[fontSize] * lineSpacing,
            },
          ]}
        >
          {verse.Text}
        </Text>
      </View>
    )
  }

  const renderSettingsModal = () => (
    <Modal
      visible={showSettings}
      transparent
      animationType="slide"
      onRequestClose={() => setShowSettings(false)}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[styles.modalContent, { backgroundColor: themeColors.card }]}
        >
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: themeColors.text }]}>
              Options de lecture
            </Text>
            <TouchableOpacity onPress={() => setShowSettings(false)}>
              <Ionicons name="close" size={24} color={themeColors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            {/* Taille de police */}
            <View style={styles.settingSection}>
              <Text style={[styles.settingLabel, { color: themeColors.text }]}>
                Taille de police
              </Text>
              <View style={styles.fontSizeButtons}>
                {(["S", "M", "L", "XL"] as FontSize[]).map((size) => (
                  <TouchableOpacity
                    key={size}
                    style={[
                      styles.fontSizeButton,
                      fontSize === size && styles.fontSizeButtonActive,
                      fontSize === size && {
                        backgroundColor: themeColors.verseNumber,
                      },
                    ]}
                    onPress={() => setFontSize(size)}
                  >
                    <Text
                      style={[
                        styles.fontSizeButtonText,
                        { color: themeColors.text },
                        fontSize === size && styles.fontSizeButtonTextActive,
                      ]}
                    >
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Mode de lecture */}
            <View style={styles.settingSection}>
              <Text style={[styles.settingLabel, { color: themeColors.text }]}>
                Mode de lecture
              </Text>
              <View style={styles.modeButtons}>
                <TouchableOpacity
                  style={[
                    styles.modeButton,
                    readingMode === "light" && styles.modeButtonActive,
                    readingMode === "light" && {
                      backgroundColor: COLORS.primary,
                    },
                  ]}
                  onPress={() => setReadingMode("light")}
                >
                  <Ionicons name="sunny" size={20} color={COLORS.white} />
                  <Text style={styles.modeButtonText}>Jour</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.modeButton,
                    readingMode === "dark" && styles.modeButtonActive,
                    readingMode === "dark" && { backgroundColor: "#2a2a2a" },
                  ]}
                  onPress={() => setReadingMode("dark")}
                >
                  <Ionicons name="moon" size={20} color={COLORS.white} />
                  <Text style={styles.modeButtonText}>Nuit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.modeButton,
                    readingMode === "sepia" && styles.modeButtonActive,
                    readingMode === "sepia" && { backgroundColor: "#9d7145" },
                  ]}
                  onPress={() => setReadingMode("sepia")}
                >
                  <Ionicons name="newspaper" size={20} color={COLORS.white} />
                  <Text style={styles.modeButtonText}>Sépia</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Afficher numéros de versets */}
            <View style={styles.settingSection}>
              <TouchableOpacity
                style={styles.toggleRow}
                onPress={() => setShowVerseNumbers(!showVerseNumbers)}
              >
                <Text style={[styles.settingLabel, { color: themeColors.text }]}>
                  Numéros de versets
                </Text>
                <Ionicons
                  name={showVerseNumbers ? "checkbox" : "square-outline"}
                  size={24}
                  color={themeColors.verseNumber}
                />
              </TouchableOpacity>
            </View>

            {/* Espacement des lignes */}
            <View style={styles.settingSection}>
              <Text style={[styles.settingLabel, { color: themeColors.text }]}>
                Espacement des lignes
              </Text>
              <View style={styles.spacingButtons}>
                {[1.2, 1.5, 1.8, 2.0].map((spacing) => (
                  <TouchableOpacity
                    key={spacing}
                    style={[
                      styles.spacingButton,
                      lineSpacing === spacing && styles.spacingButtonActive,
                      lineSpacing === spacing && {
                        backgroundColor: themeColors.verseNumber,
                      },
                    ]}
                    onPress={() => setLineSpacing(spacing)}
                  >
                    <Text
                      style={[
                        styles.spacingButtonText,
                        { color: themeColors.text },
                        lineSpacing === spacing &&
                          styles.spacingButtonTextActive,
                      ]}
                    >
                      {spacing.toFixed(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  )

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: themeColors.background }]}
    >
      {/* Header - YouVersion style - Fixed/Sticky */}
      <View style={[styles.header, { backgroundColor: themeColors.card }]}>
        <View style={styles.headerTop}>
          {/* Audio, Search, Emoji, Version */}
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.headerIconButton}>
              <Ionicons name="volume-medium" size={20} color={themeColors.text} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerIconButton}
              onPress={() => navigation.navigate("Search")}
            >
              <Ionicons name="search" size={20} color={themeColors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIconButton}>
              <Ionicons name="happy-outline" size={20} color={themeColors.text} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerIconButton}
              onPress={() => setShowSettings(true)}
            >
              <Ionicons name="language" size={20} color={themeColors.text} />
              <Text style={[styles.versionText, { color: themeColors.text }]}>PDV2017</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Book & Chapter Selector */}
        <TouchableOpacity
          style={styles.headerCenter}
          onPress={() => navigation.navigate("BibleBooks")}
        >
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>
            {bookInfo.name} {chapterNumber}
          </Text>
          <Ionicons name="chevron-down" size={16} color={themeColors.textLight} />
        </TouchableOpacity>
      </View>

      {/* Contenu du chapitre */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.chapterCard, { backgroundColor: themeColors.card }]}>
          {/* Chapter Number at the start of verses */}
          <Text style={[styles.chapterNumberInline, { color: themeColors.text }]}>
            {chapterNumber}
          </Text>
          {chapter.Verses.map((verse, index) => renderVerse(verse, index))}
        </View>

        {/* Navigation entre chapitres - YouVersion style */}
        <View style={[styles.bottomNavBar, { backgroundColor: themeColors.card }]}>
          <TouchableOpacity
            style={styles.navIconButton}
            onPress={handlePrevious}
            disabled={!canGoPrevious}
          >
            <Ionicons
              name="play-back"
              size={28}
              color={canGoPrevious ? themeColors.text : themeColors.textLight}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navChapterButton}
            onPress={() => navigation.navigate("BibleBooks")}
          >
            <Text style={[styles.navChapterText, { color: themeColors.text }]}>
              {bookInfo.name} {chapterNumber}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navIconButton}
            onPress={handleNext}
            disabled={!canGoNext}
          >
            <Ionicons
              name="play-forward"
              size={28}
              color={canGoNext ? themeColors.text : themeColors.textLight}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal des paramètres */}
      {renderSettingsModal()}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SIZES.padding,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTop: {
    marginBottom: 12,
  },
  headerIcons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 12,
  },
  headerIconButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    padding: 4,
  },
  versionText: {
    fontSize: 11,
    fontWeight: "600",
  },
  headerCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingVertical: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textLight,
  },
  chapterNumberInline: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 16,
    marginLeft: -4,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: SIZES.padding,
  },
  chapterCard: {
    borderRadius: 12,
    padding: SIZES.padding * 1.5,
    marginBottom: SIZES.padding,
  },
  verseContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  verseNumber: {
    fontWeight: "bold",
    marginRight: 8,
    minWidth: 24,
  },
  verseText: {
    flex: 1,
  },
  bottomNavBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: SIZES.padding * 2,
    marginTop: SIZES.padding,
    marginBottom: SIZES.padding * 2,
    marginHorizontal: SIZES.padding,
    borderRadius: 24,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  navIconButton: {
    padding: 8,
  },
  navChapterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: COLORS.background,
    borderRadius: 20,
  },
  navChapterText: {
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
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: SIZES.large,
    fontWeight: "bold",
  },
  modalBody: {
    padding: SIZES.padding,
  },
  settingSection: {
    marginBottom: 24,
  },
  settingLabel: {
    fontSize: SIZES.medium,
    fontWeight: "600",
    marginBottom: 12,
  },
  fontSizeButtons: {
    flexDirection: "row",
    gap: 12,
  },
  fontSizeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: COLORS.background,
    alignItems: "center",
  },
  fontSizeButtonActive: {
    backgroundColor: COLORS.primary,
  },
  fontSizeButtonText: {
    fontSize: SIZES.medium,
    fontWeight: "600",
  },
  fontSizeButtonTextActive: {
    color: COLORS.white,
  },
  modeButtons: {
    flexDirection: "row",
    gap: 12,
  },
  modeButton: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: COLORS.textLight,
    gap: 8,
  },
  modeButtonActive: {
    opacity: 1,
  },
  modeButtonText: {
    fontSize: SIZES.small,
    color: COLORS.white,
    fontWeight: "600",
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  spacingButtons: {
    flexDirection: "row",
    gap: 12,
  },
  spacingButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: COLORS.background,
    alignItems: "center",
  },
  spacingButtonActive: {
    backgroundColor: COLORS.primary,
  },
  spacingButtonText: {
    fontSize: SIZES.medium,
    fontWeight: "600",
  },
  spacingButtonTextActive: {
    color: COLORS.white,
  },
})

export default BibleChapterReaderScreen
