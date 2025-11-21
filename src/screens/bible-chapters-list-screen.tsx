import React from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { RouteProp } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../types/navigation"
import { COLORS, SIZES } from "../config/constants"
import bibleJSONLoader from "../services/bible-json-loader"

type BibleChaptersListScreenProps = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "BibleChaptersList"
  >
  route: RouteProp<RootStackParamList, "BibleChaptersList">
}

const BibleChaptersListScreen: React.FC<BibleChaptersListScreenProps> = ({
  navigation,
  route,
}) => {
  const { bookIndex } = route.params
  const bookInfo = bibleJSONLoader.getBookInfo(bookIndex)

  if (!bookInfo) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={64} color={COLORS.error} />
          <Text style={styles.errorText}>Livre non trouvé</Text>
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

  const chapters = Array.from(
    { length: bookInfo.chaptersCount },
    (_, i) => i + 1,
  )

  const handleChapterPress = (chapterNumber: number) => {
    navigation.navigate("BibleChapterReader", {
      bookIndex: bookInfo.index,
      chapterNumber,
    })
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerIcon}>{bookInfo.icon}</Text>
          <View>
            <Text style={styles.title}>{bookInfo.name}</Text>
            <Text style={styles.subtitle}>
              {bookInfo.chaptersCount} chapitres
            </Text>
          </View>
        </View>
        <View style={styles.placeholder} />
      </View>

      {/* Liste des chapitres */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.chaptersGrid}>
          {chapters.map((chapterNumber) => (
            <TouchableOpacity
              key={chapterNumber}
              style={styles.chapterCard}
              onPress={() => handleChapterPress(chapterNumber)}
              activeOpacity={0.7}
            >
              <Text style={styles.chapterNumber}>{chapterNumber}</Text>
              <Text style={styles.chapterLabel}>Chapitre</Text>
            </TouchableOpacity>
          ))}
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
    paddingHorizontal: SIZES.padding,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 8,
  },
  headerCenter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerIcon: {
    fontSize: 32,
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
  placeholder: {
    width: 40,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: SIZES.padding,
  },
  chaptersGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  chapterCard: {
    width: "22%",
    aspectRatio: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chapterNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 4,
  },
  chapterLabel: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
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

export default BibleChaptersListScreen
