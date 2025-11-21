import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
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

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Bonjour"
    if (hour < 18) return "Bon après-midi"
    return "Bonsoir"
  }

  const menuItems = [
    {
      id: "1",
      title: "Lire la Bible",
      subtitle: "Explorer les livres et chapitres",
      icon: "book",
      gradient: [COLORS.primary, COLORS.secondary],
      iconColor: COLORS.white,
      onPress: () => navigation.navigate("BibleBooks"),
    },
    {
      id: "2",
      title: "Méditation guidée",
      subtitle: "Approfondir un verset avec le timer",
      icon: "leaf",
      gradient: [COLORS.olive, COLORS.primary],
      iconColor: COLORS.white,
      onPress: () => {
        if (verseOfTheDay) {
          navigation.navigate("Meditation", { verse: verseOfTheDay })
        }
      },
    },
  ]

  const quickAccess = [
    { id: "1", book: "Psaumes", icon: "musical-notes", chapter: 23 },
    { id: "2", book: "Jean", icon: "heart", chapter: 3 },
    { id: "3", book: "Proverbes", icon: "bulb", chapter: 3 },
    { id: "4", book: "Matthieu", icon: "star", chapter: 5 },
  ]

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header avec salutation */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{getGreeting()}</Text>
            <Text style={styles.tagline}>Pause. Médite. Transforme.</Text>
          </View>
          <View style={styles.decorativeIcon}>
            <Ionicons name="leaf" size={28} color={COLORS.primary} />
          </View>
        </View>

        {/* Verset du jour - Design amélioré */}
        {verseOfTheDay && (
          <View style={styles.verseCard}>
            <View style={styles.verseCardHeader}>
              <View style={styles.verseTopBar}>
                <View style={styles.verseLabelContainer}>
                  <Ionicons name="sparkles" size={14} color={COLORS.gold} />
                  <Text style={styles.verseLabel}>Verset du jour</Text>
                </View>
                <TouchableOpacity
                  onPress={loadVerseOfTheDay}
                  style={styles.refreshButton}
                  activeOpacity={0.7}
                >
                  <Ionicons name="refresh" size={18} color={COLORS.primary} />
                </TouchableOpacity>
              </View>
              <Text style={styles.verseReference}>
                {verseOfTheDay.reference}
              </Text>
            </View>

            <View style={styles.verseQuoteContainer}>
              <View style={styles.quoteMarkLeft}>
                <Text style={styles.quoteMark}>"</Text>
              </View>
              <Text style={styles.verseText}>{verseOfTheDay.text}</Text>
              <View style={styles.quoteMarkRight}>
                <Text style={styles.quoteMark}>"</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.meditateButton}
              onPress={() =>
                navigation.navigate("Meditation", {
                  verse: verseOfTheDay,
                })
              }
              activeOpacity={0.8}
            >
              <Ionicons name="leaf" size={18} color={COLORS.white} />
              <Text style={styles.meditateButtonText}>
                Méditer sur ce verset
              </Text>
              <Ionicons name="arrow-forward" size={18} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        )}

        {/* Menu principal - Design amélioré */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Explorer</Text>
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.menuItem,
                  { marginBottom: index === menuItems.length - 1 ? 0 : 12 },
                ]}
                onPress={item.onPress}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: item.gradient[0] },
                  ]}
                >
                  <Ionicons
                    name={item.icon as any}
                    size={28}
                    color={item.iconColor}
                  />
                </View>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
                <View style={styles.chevronContainer}>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={COLORS.textLight}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Accès rapide aux livres populaires */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Accès rapide</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickAccessScroll}
          >
            {quickAccess.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.quickAccessCard,
                  {
                    marginRight:
                      index === quickAccess.length - 1 ? SIZES.padding : 12,
                  },
                ]}
                onPress={() =>
                  navigation.navigate("BibleReader", {
                    book: item.book.toLowerCase(),
                    chapter: item.chapter,
                  })
                }
                activeOpacity={0.7}
              >
                <View style={styles.quickAccessIcon}>
                  <Ionicons
                    name={item.icon as any}
                    size={24}
                    color={COLORS.primary}
                  />
                </View>
                <Text style={styles.quickAccessBook}>{item.book}</Text>
                <Text style={styles.quickAccessChapter}>
                  Chapitre {item.chapter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Statistiques - Design amélioré */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Votre parcours</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <Ionicons name="flame" size={20} color={COLORS.gold} />
              </View>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Jours de suite</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <Ionicons name="book" size={20} color={COLORS.primary} />
              </View>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Versets lus</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <Ionicons name="time" size={20} color={COLORS.olive} />
              </View>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Minutes</Text>
            </View>
          </View>
        </View>

        {/* Espace en bas pour le scroll */}
        <View style={{ height: SIZES.padding * 3 }} />
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SIZES.padding * 1.5,
    paddingTop: SIZES.padding,
    paddingBottom: SIZES.padding * 1.5,
  },
  greeting: {
    fontSize: SIZES.title,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  tagline: {
    fontSize: SIZES.medium,
    color: COLORS.textMedium,
    fontStyle: "italic",
  },
  decorativeIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.sand,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  // Verset du jour
  verseCard: {
    backgroundColor: COLORS.paper,
    borderRadius: SIZES.radius + 4,
    padding: SIZES.padding * 1.5,
    marginHorizontal: SIZES.padding * 1.5,
    marginBottom: SIZES.padding * 2,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  verseCardHeader: {
    marginBottom: SIZES.padding,
  },
  verseTopBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  verseLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  verseLabel: {
    fontSize: SIZES.small,
    color: COLORS.gold,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  refreshButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.sand,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  verseReference: {
    fontSize: SIZES.large,
    color: COLORS.text,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  verseQuoteContainer: {
    position: "relative",
    paddingVertical: SIZES.padding * 0.5,
    marginBottom: SIZES.padding,
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
    color: COLORS.sand,
    fontWeight: "700",
    lineHeight: 48,
  },
  verseText: {
    fontSize: SIZES.large,
    color: COLORS.text,
    lineHeight: 32,
    paddingHorizontal: 12,
    fontFamily: "System",
  },
  meditateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: SIZES.radius,
    gap: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  meditateButtonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: "600",
    letterSpacing: 0.3,
  },

  // Sections
  sectionContainer: {
    marginBottom: SIZES.padding * 2,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SIZES.padding,
    paddingHorizontal: SIZES.padding * 1.5,
    letterSpacing: 0.5,
  },

  // Menu principal
  menuContainer: {
    paddingHorizontal: SIZES.padding * 1.5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.paper,
    borderRadius: SIZES.radius + 4,
    padding: SIZES.padding,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SIZES.padding,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: SIZES.large,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  menuSubtitle: {
    fontSize: SIZES.small + 1,
    color: COLORS.textMedium,
    lineHeight: 18,
  },
  chevronContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.offWhite,
    justifyContent: "center",
    alignItems: "center",
  },

  // Accès rapide
  quickAccessScroll: {
    paddingLeft: SIZES.padding * 1.5,
  },
  quickAccessCard: {
    width: 120,
    backgroundColor: COLORS.paper,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  quickAccessIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.sand,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  quickAccessBook: {
    fontSize: SIZES.medium,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 2,
    textAlign: "center",
  },
  quickAccessChapter: {
    fontSize: SIZES.small,
    color: COLORS.textMedium,
    textAlign: "center",
  },

  // Statistiques
  statsContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.paper,
    borderRadius: SIZES.radius + 4,
    padding: SIZES.padding * 1.5,
    marginHorizontal: SIZES.padding * 1.5,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.sand,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statNumber: {
    fontSize: SIZES.title,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  statLabel: {
    fontSize: SIZES.small,
    color: COLORS.textMedium,
    textAlign: "center",
    lineHeight: 16,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: SIZES.padding,
  },
})

export default HomeScreen
