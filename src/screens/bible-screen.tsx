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
import { Book } from "../types"
import bibleService from "../services/bible-service"
import LoadingSpinner from "../components/loading-spinner"
import { COLORS, SIZES } from "../config/constants"
import { RootStackParamList, TabParamList } from "../types/navigation"

type BibleScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, "BibleTab">,
  NativeStackNavigationProp<RootStackParamList>
>

type BibleScreenProps = {
  navigation: BibleScreenNavigationProp
}

const BibleScreen: React.FC<BibleScreenProps> = ({ navigation }) => {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBooks()
  }, [])

  const loadBooks = async () => {
    setLoading(true)
    try {
      const loadedBooks = await bibleService.getAllBooks()
      setBooks(loadedBooks)
    } catch (error) {
      console.error("Error loading books:", error)
    } finally {
      setLoading(false)
    }
  }

  const renderBooksByTestament = (testament: "AT" | "NT") => {
    const testamentBooks = books.filter((book) => book.testament === testament)
    const testamentTitle = testament === "AT" ? "Ancien Testament" : "Nouveau Testament"

    if (testamentBooks.length === 0) return null

    return (
      <View style={styles.testamentSection}>
        <Text style={styles.testamentTitle}>{testamentTitle}</Text>
        <View style={styles.booksGrid}>
          {testamentBooks.map((book) => (
            <TouchableOpacity
              key={book.id}
              style={styles.bookCard}
              onPress={() =>
                navigation.navigate("BibleReader", {
                  book: book.id,
                  chapter: 1,
                })
              }
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.bookIconContainer,
                  {
                    backgroundColor:
                      testament === "AT" ? COLORS.accent : COLORS.primary,
                  },
                ]}
              >
                <Ionicons
                  name="book"
                  size={24}
                  color={testament === "AT" ? COLORS.accent : COLORS.primary}
                />
              </View>
              <Text style={styles.bookName}>{book.name}</Text>
              <Text style={styles.bookChapters}>
                {book.chapters} chapitre{book.chapters > 1 ? "s" : ""}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    )
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>La Bible</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Search")}
          style={styles.searchButton}
        >
          <Ionicons name="search" size={24} color={COLORS.textLight} />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={() => navigation.navigate("BibleBooks")}
            style={styles.actionButton}
          >
            <Ionicons name="book" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Search")}
            style={styles.searchButton}
          >
            <Ionicons name="search" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.featuredSection}>
          <TouchableOpacity
            style={styles.fullBibleCard}
            onPress={() => navigation.navigate("BibleBooks")}
            activeOpacity={0.8}
          >
            <View style={styles.fullBibleIconContainer}>
              <Ionicons name="book" size={40} color={COLORS.white} />
            </View>
            <View style={styles.fullBibleContent}>
              <Text style={styles.fullBibleTitle}>Bible complète</Text>
              <Text style={styles.fullBibleDescription}>
                Explorez les 66 livres de la Bible par catégorie
              </Text>
              <View style={styles.fullBibleStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>39</Text>
                  <Text style={styles.statLabel}>AT</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>27</Text>
                  <Text style={styles.statLabel}>NT</Text>
                </View>
              </View>
            </View>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={COLORS.textLight}
            />
          </TouchableOpacity>
        </View>

        {renderBooksByTestament("AT")}
        {renderBooksByTestament("NT")}
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
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: SIZES.title,
    fontWeight: "bold",
    color: COLORS.text,
  },
  headerActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  featuredSection: {
    padding: SIZES.padding,
  },
  fullBibleCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: SIZES.padding,
  },
  fullBibleIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  fullBibleContent: {
    flex: 1,
  },
  fullBibleTitle: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 4,
  },
  fullBibleDescription: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    marginBottom: 8,
  },
  fullBibleStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statNumber: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
  statDivider: {
    width: 1,
    height: 16,
    backgroundColor: COLORS.border,
    marginHorizontal: 12,
  },
  container: {
    flex: 1,
  },
  testamentSection: {
    marginBottom: SIZES.padding * 2,
  },
  testamentTitle: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    color: COLORS.text,
    marginHorizontal: SIZES.padding * 2,
    marginTop: SIZES.padding * 2,
    marginBottom: SIZES.padding,
  },
  booksGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: SIZES.padding,
  },
  bookCard: {
    width: "47%",
    backgroundColor: COLORS.cardBg,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    margin: "1.5%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  bookIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    opacity: 0.15,
  },
  bookName: {
    fontSize: SIZES.medium,
    fontWeight: "600",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 4,
  },
  bookChapters: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    textAlign: "center",
  },
})

export default BibleScreen
