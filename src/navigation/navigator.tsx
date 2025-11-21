import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { RootStackParamList } from "../types/navigation"

// Screens
import HomeScreen from "../screens/home-screen"
import BibleReaderScreen from "../screens/bible-reader-screen"
import StrongDetailScreen from "../screens/strong-detail-screen"
import MeditationScreen from "../screens/meditation-screen"
import SearchScreen from "../screens/search-screen"

const Stack = createNativeStackNavigator<RootStackParamList>()

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BibleReader" component={BibleReaderScreen} />
        <Stack.Screen name="StrongDetail" component={StrongDetailScreen} />
        <Stack.Screen name="Meditation" component={MeditationScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator
