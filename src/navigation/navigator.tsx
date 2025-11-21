import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"
import { RootStackParamList, TabParamList } from "../types/navigation"
import { COLORS } from "../config/constants"

// Screens
import SplashScreen from "../screens/splash-screen"
import OnboardingScreen from "../screens/onboarding-screen"
import HomeScreen from "../screens/home-screen"
import BibleScreen from "../screens/bible-screen"
import SearchScreen from "../screens/search-screen"
import MeditationTabScreen from "../screens/meditation-tab-screen"
import BibleReaderScreen from "../screens/bible-reader-screen"
import StrongDetailScreen from "../screens/strong-detail-screen"
import MeditationScreen from "../screens/meditation-screen"
import BibleBooksScreen from "../screens/bible-books-screen"
import BibleChaptersListScreen from "../screens/bible-chapters-list-screen"
import BibleChapterReaderScreen from "../screens/bible-chapter-reader-screen"

const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator<TabParamList>()

// Bottom Tab Navigator
const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap

          if (route.name === "AccueilTab") {
            iconName = focused ? "home" : "home-outline"
          } else if (route.name === "BibleTab") {
            iconName = focused ? "book" : "book-outline"
          } else if (route.name === "StrongTab") {
            iconName = focused ? "language" : "language-outline"
          } else if (route.name === "MeditationTab") {
            iconName = focused ? "leaf" : "leaf-outline"
          } else {
            iconName = "help-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      })}
    >
      <Tab.Screen
        name="AccueilTab"
        component={HomeScreen}
        options={{ tabBarLabel: "Accueil" }}
      />
      <Tab.Screen
        name="BibleTab"
        component={BibleScreen}
        options={{ tabBarLabel: "Bible" }}
      />
      <Tab.Screen
        name="StrongTab"
        component={SearchScreen}
        options={{ tabBarLabel: "Strong's" }}
      />
      <Tab.Screen
        name="MeditationTab"
        component={MeditationTabScreen}
        options={{ tabBarLabel: "Méditer" }}
      />
    </Tab.Navigator>
  )
}

// Root Stack Navigator
const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        <Stack.Screen name="BibleReader" component={BibleReaderScreen} />
        <Stack.Screen name="StrongDetail" component={StrongDetailScreen} />
        <Stack.Screen name="Meditation" component={MeditationScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="BibleBooks" component={BibleBooksScreen} />
        <Stack.Screen
          name="BibleChaptersList"
          component={BibleChaptersListScreen}
        />
        <Stack.Screen
          name="BibleChapterReader"
          component={BibleChapterReaderScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator
