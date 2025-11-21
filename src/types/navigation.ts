import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RouteProp } from "@react-navigation/native"
import { Verse } from "./bible"

export type RootStackParamList = {
  Home: undefined
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
}

// Navigation props
export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>
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
