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
import { CompositeNavigationProp } from "@react-navigation/native"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Verse } from "../types"
import bibleService from "../services/bible-service"
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
  const [suggestedVerses, setSuggestedVerses] = useState<Verse[]>([])

  useEffect(() => {
    loadSuggestedVerses()
  }, [])

  const loadSuggestedVerses = async () => {
    try {
      // Charger quelques versets suggérés pour la méditation
      const verses: Verse[] = []
      const verse1 = await bibleService.getVerse("jean", 3, 16)
      const verse2 = await bibleService.getVerse("psaume", 23, 1)
      const verse3 = await bibleService.getVerse("jean", 1, 1)

      if (verse1) verses.push(verse1)
      if (verse2) verses.push(verse2)
      if (verse3) verses.push(verse3)

      setSuggestedVerses(verses)
    } catch (error) {
      console.error("Error loading suggested verses:", error)
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Méditation</Text>
      </View>

      <ScrollView style={styles.container}>
        {/* Introduction */}
        <View style={styles.introCard}>
          <Ionicons name="heart" size={48} color={COLORS.accent} />
          <Text style={styles.introTitle}>
            Approfondissez votre foi
          </Text>
          <Text style={styles.introText}>
            Prenez un moment pour méditer sur la Parole de Dieu. Laissez l'Esprit Saint vous parler à travers les Écritures.
          </Text>
        </View>

        {/* Versets suggérés */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Versets suggérés</Text>
          {suggestedVerses.map((verse, index) => (
            <TouchableOpacity
              key={`${verse.book}-${verse.chapter}-${verse.verse}`}
              style={styles.verseCard}
              onPress={() => navigation.navigate("Meditation", { verse })}
              activeOpacity={0.7}
            >
              <View style={styles.verseHeader}>
                <Text style={styles.verseReference}>{verse.reference}</Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={COLORS.textLight}
                />
              </View>
              <Text style={styles.verseText} numberOfLines={3}>
                {verse.text}
              </Text>
              <View style={styles.meditateButton}>
                <Ionicons name="heart-outline" size={16} color={COLORS.accent} />
                <Text style={styles.meditateButtonText}>Méditer</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Guide de méditation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Comment méditer ?</Text>
          <View style={styles.guideCard}>
            <View style={styles.guideStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Lire</Text>
                <Text style={styles.stepText}>
                  Lisez le verset plusieurs fois, lentement et attentivement
                </Text>
              </View>
            </View>

            <View style={styles.guideStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Réfléchir</Text>
                <Text style={styles.stepText}>
                  Demandez-vous ce que Dieu vous dit à travers ce passage
                </Text>
              </View>
            </View>

            <View style={styles.guideStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Prier</Text>
                <Text style={styles.stepText}>
                  Parlez à Dieu de ce que vous avez découvert
                </Text>
              </View>
            </View>

            <View style={styles.guideStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>4</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Appliquer</Text>
                <Text style={styles.stepText}>
                  Pensez à comment mettre en pratique ce que vous avez appris
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: SIZES.title,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  container: {
    flex: 1,
  },
  introCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 2,
    margin: SIZES.padding * 2,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  introTitle: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    color: COLORS.text,
    marginTop: 12,
    marginBottom: 8,
  },
  introText: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
    textAlign: "center",
    lineHeight: 22,
  },
  section: {
    marginBottom: SIZES.padding * 2,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    color: COLORS.text,
    marginHorizontal: SIZES.padding * 2,
    marginBottom: SIZES.padding,
  },
  verseCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
    marginHorizontal: SIZES.padding * 2,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  verseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  verseReference: {
    fontSize: SIZES.medium,
    fontWeight: "600",
    color: COLORS.primary,
  },
  verseText: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    lineHeight: 22,
    marginBottom: 12,
  },
  meditateButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  meditateButtonText: {
    fontSize: SIZES.small,
    fontWeight: "600",
    color: COLORS.accent,
  },
  guideCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
    marginHorizontal: SIZES.padding * 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  guideStep: {
    flexDirection: "row",
    marginBottom: SIZES.padding * 1.5,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.accent,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  stepNumberText: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
    color: COLORS.white,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: SIZES.medium,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 4,
  },
  stepText: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    lineHeight: 18,
  },
})

export default MeditationTabScreen
