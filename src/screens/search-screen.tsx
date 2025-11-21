import React, { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../types/navigation"
import { StrongDefinition } from "../types/strong"
import bibleService from "../services/bible-service"
import { COLORS, SIZES } from "../config/constants"

type SearchScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Search">
}

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<StrongDefinition[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async (query: string) => {
    setSearchQuery(query)

    if (query.length < 2) {
      setResults([])
      return
    }

    setIsSearching(true)
    try {
      const searchResults = await bibleService.searchStrongs(query)
      setResults(searchResults)
    } catch (error) {
      console.error("Error searching:", error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleStrongPress = (strongNumber: string) => {
    navigation.navigate("StrongDetail", { strongNumber })
  }

  const renderStrongItem = ({ item }: { item: StrongDefinition }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => handleStrongPress(item.number)}
      activeOpacity={0.7}
    >
      <View style={styles.resultHeader}>
        <View style={styles.resultLeft}>
          <View
            style={[
              styles.languageBadge,
              {
                backgroundColor:
                  item.language === "Grec" ? COLORS.primary : COLORS.accent,
              },
            ]}
          >
            <Text style={styles.languageText}>
              {item.language === "Grec" ? "G" : "H"}
            </Text>
          </View>
          <View>
            <Text style={styles.strongNumber}>{item.number}</Text>
            <Text style={styles.original}>{item.original}</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={24} color={COLORS.textLight} />
      </View>

      <Text style={styles.transliteration}>{item.transliteration}</Text>
      <Text style={styles.shortDef} numberOfLines={2}>
        {item.shortDef}
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.statBadge}>
          <Ionicons
            name="document-text-outline"
            size={14}
            color={COLORS.textLight}
          />
          <Text style={styles.statText}>{item.occurrences} fois</Text>
        </View>
        <View style={styles.statBadge}>
          <Ionicons
            name="pricetag-outline"
            size={14}
            color={COLORS.textLight}
          />
          <Text style={styles.statText}>{item.type}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  const renderEmptyState = () => {
    if (searchQuery.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Ionicons name="search" size={64} color={COLORS.textLight} />
          <Text style={styles.emptyTitle}>Rechercher dans Strong's</Text>
          <Text style={styles.emptyText}>
            Recherchez un mot hébreu, grec, ou sa définition française
          </Text>
          <View style={styles.examplesContainer}>
            <Text style={styles.examplesTitle}>Exemples :</Text>
            <TouchableOpacity
              style={styles.exampleTag}
              onPress={() => handleSearch("amour")}
            >
              <Text style={styles.exampleText}>amour</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.exampleTag}
              onPress={() => handleSearch("logos")}
            >
              <Text style={styles.exampleText}>logos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.exampleTag}
              onPress={() => handleSearch("G2316")}
            >
              <Text style={styles.exampleText}>G2316</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    if (isSearching) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Recherche en cours...</Text>
        </View>
      )
    }

    if (results.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Ionicons name="sad-outline" size={64} color={COLORS.textLight} />
          <Text style={styles.emptyTitle}>Aucun résultat</Text>
          <Text style={styles.emptyText}>
            Essayez avec un autre mot ou numéro Strong's
          </Text>
        </View>
      )
    }

    return null
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
          <Text style={styles.headerTitle}>Recherche Strong's</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={COLORS.textLight} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un mot ou numéro..."
            placeholderTextColor={COLORS.textLight}
            value={searchQuery}
            onChangeText={handleSearch}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setSearchQuery("")
                setResults([])
              }}
            >
              <Ionicons
                name="close-circle"
                size={20}
                color={COLORS.textLight}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Results */}
        <FlatList
          data={results}
          renderItem={renderStrongItem}
          keyExtractor={(item) => item.number}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmptyState}
          showsVerticalScrollIndicator={false}
        />
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
  placeholder: {
    width: 40,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    margin: SIZES.padding,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: SIZES.radius,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: SIZES.medium,
    color: COLORS.text,
  },
  listContent: {
    paddingBottom: SIZES.padding * 2,
  },
  resultItem: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginHorizontal: SIZES.padding,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  resultLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  languageBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  languageText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: "600",
  },
  strongNumber: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    fontWeight: "600",
  },
  original: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    fontWeight: "600",
  },
  transliteration: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginBottom: 4,
    fontStyle: "italic",
  },
  shortDef: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginBottom: 8,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  statBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statText: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.padding * 3,
  },
  emptyTitle: {
    fontSize: SIZES.xlarge,
    fontWeight: "600",
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
    textAlign: "center",
    lineHeight: 24,
  },
  examplesContainer: {
    marginTop: 24,
    alignItems: "center",
  },
  examplesTitle: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    marginBottom: 12,
  },
  exampleTag: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  exampleText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: "500",
  },
})

export default SearchScreen
