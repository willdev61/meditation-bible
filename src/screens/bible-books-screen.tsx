import React, { useState, useMemo } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  SectionList,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../types/navigation"
import { COLORS, SIZES } from "../config/constants"
import bibleJSONLoader, {
  BibleBookInfo,
  BookCategory,
} from "../services/bible-json-loader"

type BibleBooksScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "BibleBooks">
}

type TestamentFilter = "ALL" | "AT" | "NT"

interface BookSection {
  title: string
  data: BibleBookInfo[]
  icon: string
}

const BibleBooksScreen: React.FC<BibleBooksScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [testamentFilter, setTestamentFilter] = useState<TestamentFilter>("ALL")

  // Récupérer tous les livres
  const allBooks = useMemo(() => bibleJSONLoader.getAllBooks(), [])

  // Filtrer les livres selon les critères
  const filteredBooks = useMemo(() => {
    let books = allBooks

    // Filtre par testament
    if (testamentFilter !== "ALL") {
      books = books.filter((book) => book.testament === testamentFilter)
    }

    // Filtre par recherche
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      books = books.filter((book) => book.name.toLowerCase().includes(query))
    }

    return books
  }, [allBooks, testamentFilter, searchQuery])

  // Organiser les livres par catégorie
  const bookSections = useMemo(() => {
    const sections: BookSection[] = []
    const categories = [
      BookCategory.PENTATEUQUE,
      BookCategory.HISTORIQUES,
      BookCategory.POETIQUES,
      BookCategory.PROPHETES_MAJEURS,
      BookCategory.PROPHETES_MINEURS,
      BookCategory.EVANGILES,
      BookCategory.ACTES,
      BookCategory.EPITRES_PAUL,
      BookCategory.EPITRES_GENERALES,
      BookCategory.APOCALYPSE,
    ]

    categories.forEach((category) => {
      const categoryBooks = filteredBooks.filter(
        (book) => book.category === category,
      )
      if (categoryBooks.length > 0) {
        sections.push({
          title: category,
          data: categoryBooks,
          icon: categoryBooks[0]?.icon || "📖",
        })
      }
    })

    return sections
  }, [filteredBooks])

  const handleBookPress = (book: BibleBookInfo) => {
    navigation.navigate("BibleChaptersList", { bookIndex: book.index })
  }

  const renderTestamentFilter = () => (
    <View style={styles.filterContainer}>
      <TouchableOpacity
        style={[
          styles.filterButton,
          testamentFilter === "ALL" && styles.filterButtonActive,
        ]}
        onPress={() => setTestamentFilter("ALL")}
      >
        <Text
          style={[
            styles.filterButtonText,
            testamentFilter === "ALL" && styles.filterButtonTextActive,
          ]}
        >
          Tous
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.filterButton,
          testamentFilter === "AT" && styles.filterButtonActive,
        ]}
        onPress={() => setTestamentFilter("AT")}
      >
        <Text
          style={[
            styles.filterButtonText,
            testamentFilter === "AT" && styles.filterButtonTextActive,
          ]}
        >
          Ancien Testament
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.filterButton,
          testamentFilter === "NT" && styles.filterButtonActive,
        ]}
        onPress={() => setTestamentFilter("NT")}
      >
        <Text
          style={[
            styles.filterButtonText,
            testamentFilter === "NT" && styles.filterButtonTextActive,
          ]}
        >
          Nouveau Testament
        </Text>
      </TouchableOpacity>
    </View>
  )

  const renderBookItem = (book: BibleBookInfo) => (
    <TouchableOpacity
      key={book.index}
      style={styles.bookCard}
      onPress={() => handleBookPress(book)}
      activeOpacity={0.7}
    >
      <View style={styles.bookCardContent}>
        <Text style={styles.bookIcon}>{book.icon}</Text>
        <View style={styles.bookInfo}>
          <Text style={styles.bookName}>{book.name}</Text>
          <Text style={styles.bookStats}>
            {book.chaptersCount} chapitre
            {book.chaptersCount > 1 ? "s" : ""}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
      </View>
    </TouchableOpacity>
  )

  const renderSectionHeader = ({ section }: { section: BookSection }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionIcon}>{section.icon}</Text>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <Text style={styles.sectionCount}>({section.data.length})</Text>
    </View>
  )

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>Bible complète</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Barre de recherche */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color={COLORS.textLight}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un livre..."
            placeholderTextColor={COLORS.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          )}
        </View>

        {/* Filtres testament */}
        {renderTestamentFilter()}
      </View>

      {/* Liste des livres par catégorie */}
      <SectionList
        sections={bookSections}
        keyExtractor={(item) => `book-${item.index}`}
        renderItem={({ item }) => renderBookItem(item)}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="book-outline"
              size={64}
              color={COLORS.textLight}
            />
            <Text style={styles.emptyText}>Aucun livre trouvé</Text>
          </View>
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: SIZES.padding,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: SIZES.title,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  placeholder: {
    width: 40,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background,
    borderRadius: 12,
    marginHorizontal: SIZES.padding,
    marginTop: SIZES.padding,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: SIZES.medium,
    color: COLORS.text,
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: SIZES.padding,
    marginTop: SIZES.padding,
    gap: 8,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: COLORS.background,
    alignItems: "center",
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
  },
  filterButtonText: {
    fontSize: SIZES.small,
    color: COLORS.text,
    fontWeight: "600",
  },
  filterButtonTextActive: {
    color: COLORS.white,
  },
  listContent: {
    paddingBottom: SIZES.padding * 2,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SIZES.padding,
    paddingVertical: 12,
    backgroundColor: COLORS.background,
    marginTop: SIZES.padding,
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    color: COLORS.text,
    flex: 1,
  },
  sectionCount: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
  },
  bookCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.padding,
    marginVertical: 4,
    borderRadius: 12,
    overflow: "hidden",
  },
  bookCardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: SIZES.padding,
  },
  bookIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  bookInfo: {
    flex: 1,
  },
  bookName: {
    fontSize: SIZES.medium,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 4,
  },
  bookStats: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
    marginTop: 16,
  },
})

export default BibleBooksScreen
