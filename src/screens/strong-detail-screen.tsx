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
import { StrongDefinition } from "../types/strong"
import LoadingSpinner from "../components/loading-spinner"
import bibleService from "../services/bible-service"
import { COLORS, SIZES } from "../config/constants"

type StrongDetailScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "StrongDetail">
  route: RouteProp<RootStackParamList, "StrongDetail">
}

const StrongDetailScreen: React.FC<StrongDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const { strongNumber } = route.params
  const [strong, setStrong] = useState<StrongDefinition | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStrong()
  }, [strongNumber])

  const loadStrong = async () => {
    setLoading(true)
    try {
      const definition = await bibleService.getStrongDefinition(strongNumber)
      setStrong(definition)
    } catch (error) {
      console.error("Error loading Strong definition:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (!strong) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Ionicons
            name="alert-circle-outline"
            size={64}
            color={COLORS.error}
          />
          <Text style={styles.errorText}>Définition non trouvée</Text>
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
          <Text style={styles.headerTitle}>Strong's {strong.number}</Text>
          <TouchableOpacity style={styles.menuButton}>
            <Ionicons name="share-outline" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          {/* Mot original */}
          <View style={styles.card}>
            <View style={styles.languageBadge}>
              <Text style={styles.languageText}>{strong.language}</Text>
            </View>

            <Text style={styles.original}>{strong.original}</Text>
            <Text style={styles.transliteration}>{strong.transliteration}</Text>
            <Text style={styles.pronunciation}>[ {strong.pronunciation} ]</Text>
          </View>

          {/* Définition courte */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Définition courte</Text>
            <Text style={styles.shortDef}>{strong.shortDef}</Text>
          </View>

          {/* Définition complète */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Définition complète</Text>
            <Text style={styles.definition}>{strong.definition}</Text>
          </View>

          {/* Usages */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Traductions possibles</Text>
            <View style={styles.usagesContainer}>
              {strong.usages.map((usage, index) => (
                <View key={index} style={styles.usageTag}>
                  <Text style={styles.usageText}>{usage}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Statistiques */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Statistiques</Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Type</Text>
                <Text style={styles.statValue}>{strong.type}</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Occurrences</Text>
                <Text style={styles.statValue}>{strong.occurrences}</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Testament</Text>
                <Text style={styles.statValue}>{strong.testament}</Text>
              </View>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons
                name="bookmark-outline"
                size={24}
                color={COLORS.white}
              />
              <Text style={styles.actionButtonText}>Sauvegarder</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.secondaryButton]}
            >
              <Ionicons
                name="search-outline"
                size={24}
                color={COLORS.primary}
              />
              <Text
                style={[styles.actionButtonText, styles.secondaryButtonText]}
              >
                Voir les versets
              </Text>
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
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
    margin: SIZES.padding,
    marginTop: SIZES.padding / 2,
    marginBottom: SIZES.padding / 2,
  },
  languageBadge: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.accent,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 16,
  },
  languageText: {
    color: COLORS.white,
    fontSize: SIZES.small,
    fontWeight: "600",
  },
  original: {
    fontSize: 48,
    fontWeight: "bold",
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: 8,
  },
  transliteration: {
    fontSize: SIZES.xlarge,
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 4,
  },
  pronunciation: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
    textAlign: "center",
    fontStyle: "italic",
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: "600",
    color: COLORS.primary,
    marginBottom: 12,
  },
  shortDef: {
    fontSize: SIZES.large,
    color: COLORS.secondary,
    fontWeight: "500",
  },
  definition: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    lineHeight: 24,
  },
  usagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  usageTag: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  usageText: {
    fontSize: SIZES.small,
    color: COLORS.text,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statLabel: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  statValue: {
    fontSize: SIZES.large,
    fontWeight: "600",
    color: COLORS.primary,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
  },
  actionsContainer: {
    flexDirection: "row",
    paddingHorizontal: SIZES.padding,
    marginVertical: SIZES.padding,
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

export default StrongDetailScreen
