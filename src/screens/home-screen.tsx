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
import { RootStackParamList, TabParamList } from "../types/navigation"
import { Verse } from "../types"
import { COLORS, SIZES } from "../config/constants"
import bibleService from "../services/bible-service"
import LoadingSpinner from "../components/loading-spinner"

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, "AccueilTab">,
  NativeStackNavigationProp<RootStackParamList>
>

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [verseOfTheDay, setVerseOfTheDay] = useState<Verse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadVerseOfTheDay()
  }, [])

  const loadVerseOfTheDay = async () => {
    setLoading(true)
    try {
      const randomVerse = await bibleService.getRandomVerse()
      setVerseOfTheDay(randomVerse)
    } catch (error) {
      console.error("Error loading verse of the day:", error)
    } finally {
      setLoading(false)
    }
  }

  const menuItems = [
    {
      id: "1",
      title: "Lire la Bible",
      subtitle: "Explorer les Écritures",
      icon: "book-outline",
      color: COLORS.primary,
      onPress: () =>
        navigation.navigate("BibleReader", {
          book: "jean",
          chapter: 1,
        }),
    },
    {
      id: "2",
      title: "Concordance Strong's",
      subtitle: "Étudier les mots originaux",
      icon: "language-outline",
      color: COLORS.secondary,
      onPress: () => navigation.navigate("Search"),
    },
    {
      id: "3",
      title: "Méditation",
      subtitle: "Approfondir un verset",
      icon: "heart-outline",
      color: COLORS.accent,
      onPress: () => {
        if (verseOfTheDay) {
          navigation.navigate("Meditation", { verse: verseOfTheDay })
        }
      },
    },
  ]

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Méditation Bible</Text>
          <Text style={styles.subtitle}>Approfondissez votre foi</Text>
        </View>

        {/* Verset du jour */}
        {verseOfTheDay && (
          <View style={styles.verseCard}>
            <View style={styles.verseHeader}>
              <Text style={styles.verseLabel}>Verset du jour</Text>
              <TouchableOpacity
                onPress={loadVerseOfTheDay}
                style={styles.refreshButton}
              >
                <Ionicons name="refresh" size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
            <Text style={styles.verseReference}>{verseOfTheDay.reference}</Text>
            <Text style={styles.verseText}>{verseOfTheDay.text}</Text>
            <TouchableOpacity
              style={styles.meditateButton}
              onPress={() =>
                navigation.navigate("Meditation", {
                  verse: verseOfTheDay,
                })
              }
            >
              <Text style={styles.meditateButtonText}>
                Méditer sur ce verset
              </Text>
              <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        )}

        {/* Menu principal */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View
                style={[styles.iconContainer, { backgroundColor: item.color }]}
              >
                <Ionicons
                  name={item.icon as any}
                  size={32}
                  color={item.color}
                />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={COLORS.textLight}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Statistiques */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Jours de suite</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Versets lus</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Minutes</Text>
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
  container: {
    flex: 1,
  },
  header: {
    padding: SIZES.padding * 2,
    paddingTop: SIZES.padding,
  },
  title: {
    fontSize: SIZES.title,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
  },
  verseCard: {
    backgroundColor: COLORS.paper, // Paper pour les cards principales
    borderRadius: SIZES.radius + 4,
    padding: SIZES.padding * 1.5,
    marginHorizontal: SIZES.padding,
    marginBottom: SIZES.padding * 2,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, // Shadow Light
    shadowRadius: 4,
    elevation: 2,
  },
  verseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  verseLabel: {
    fontSize: SIZES.small,
    color: COLORS.primary,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  refreshButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.sand, // Sand pour un fond très doux
    justifyContent: "center",
    alignItems: "center",
  },
  verseReference: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    fontWeight: "600",
    marginBottom: 12,
  },
  verseText: {
    fontSize: SIZES.medium + 1,
    color: COLORS.text,
    lineHeight: 26,
    marginBottom: 16,
  },
  meditateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    gap: 8,
  },
  meditateButtonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: "600",
  },
  menuContainer: {
    paddingHorizontal: SIZES.padding,
    marginBottom: SIZES.padding * 2,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.paper,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: 12,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    opacity: 0.15,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: SIZES.large,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.paper,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
    marginHorizontal: SIZES.padding,
    marginBottom: SIZES.padding * 2,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: SIZES.xlarge,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    textAlign: "center",
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 8,
  },
})

export default HomeScreen
