import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RouteProp } from "@react-navigation/native"
import { Verse } from "."

// Bottom Tab Navigator
export type TabParamList = {
  AccueilTab: undefined
  BibleTab: undefined
  StrongTab: undefined
  MeditationTab: undefined
}

// Root Stack Navigator
export type RootStackParamList = {
  Splash: undefined
  Onboarding: undefined
  MainTabs: undefined
  BibleReader: {
    book: string
    chapter: number
    verse?: number
  }
  StrongDetail: {
    strongNumber: string
  }
  Meditation: {
    verse: Verse
  }
  Search: undefined
  BibleBooks: undefined
  BibleChaptersList: {
    bookIndex: number
  }
  BibleChapterReader: {
    bookIndex: number
    chapterNumber: number
  }
  Favorites: undefined
  Stats: undefined
  ReadingPlans: undefined
  ReadingPlanDetail: {
    planId: string
  }
  Options: undefined
}
// Navigation props for stack screens
export type BibleReaderNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "BibleReader"
>
export type StrongDetailNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "StrongDetail"
>
export type MeditationNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Meditation"
>

// Route props
export type BibleReaderRouteProp = RouteProp<RootStackParamList, "BibleReader">
export type StrongDetailRouteProp = RouteProp<
  RootStackParamList,
  "StrongDetail"
>
export type MeditationRouteProp = RouteProp<RootStackParamList, "Meditation">
