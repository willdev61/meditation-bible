import React, { useEffect } from "react"
import { View, StyleSheet } from "react-native"
import { CompositeNavigationProp, useFocusEffect } from "@react-navigation/native"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import LoadingSpinner from "../components/loading-spinner"
import readingPositionService from "../services/reading-position-service"
import { RootStackParamList, TabParamList } from "../types/navigation"

type BibleScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, "BibleTab">,
  NativeStackNavigationProp<RootStackParamList>
>

type BibleScreenProps = {
  navigation: BibleScreenNavigationProp
}

const BibleScreen: React.FC<BibleScreenProps> = ({ navigation }) => {
  useFocusEffect(
    React.useCallback(() => {
      // Charger la dernière position de lecture
      const loadLastPosition = async () => {
        try {
          const lastPosition = await readingPositionService.getLastPosition()

          if (lastPosition) {
            // Rediriger vers le dernier chapitre lu
            navigation.navigate("BibleChapterReader", {
              bookIndex: lastPosition.bookIndex,
              chapterNumber: lastPosition.chapterNumber,
            })
          } else {
            // Première fois : rediriger vers Genèse 1
            navigation.navigate("BibleChapterReader", {
              bookIndex: 0,
              chapterNumber: 1,
            })
          }
        } catch (error) {
          console.error("Error loading last position:", error)
          // En cas d'erreur, rediriger vers Genèse 1
          navigation.navigate("BibleChapterReader", {
            bookIndex: 0,
            chapterNumber: 1,
          })
        }
      }

      loadLastPosition()
    }, [navigation])
  )

  return (
    <View style={styles.container}>
      <LoadingSpinner />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default BibleScreen
