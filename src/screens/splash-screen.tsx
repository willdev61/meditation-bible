import React, { useEffect, useRef } from "react"
import { View, Text, StyleSheet, Animated, StatusBar } from "react-native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../types/navigation"
import { COLORS } from "../config/constants"

type SplashScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Splash">
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.3)).current
  const floatAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    // Animation d'entrée
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 10,
        friction: 2,
        useNativeDriver: true,
      }),
    ]).start()

    // Animation de flottement
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -20,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start()

    // Navigation après 3 secondes
    const timer = setTimeout(() => {
      navigation.replace("Onboarding")
    }, 3000)

    return () => clearTimeout(timer)
  }, [navigation, fadeAnim, scaleAnim, floatAnim])

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }, { translateY: floatAnim }],
          },
        ]}
      >
        <Text style={styles.logo}>🙏</Text>
        <Text style={styles.appName}>Selah</Text>
        <Text style={styles.slogan}>Pause. Médite. Transforme.</Text>
      </Animated.View>

      <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
        <View style={styles.loadingContainer}>
          <View style={styles.loadingDot} />
          <View style={[styles.loadingDot, styles.loadingDotDelay1]} />
          <View style={[styles.loadingDot, styles.loadingDotDelay2]} />
        </View>
        <Text style={styles.version}>Version 1.0.0</Text>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    // background: "linear-gradient(180deg, #1E3A5F 0%, #2C5282 100%)",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: 120,
    marginBottom: 24,
  },
  appName: {
    fontSize: 56,
    fontWeight: "700",
    color: COLORS.white,
    marginBottom: 12,
    letterSpacing: 2,
  },
  slogan: {
    fontSize: 20,
    color: "rgba(255,255,255,0.85)",
    fontWeight: "300",
    letterSpacing: 1,
  },
  footer: {
    alignItems: "center",
    paddingBottom: 50,
  },
  loadingContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  loadingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.secondary,
    opacity: 0.3,
  },
  loadingDotDelay1: {
    opacity: 0.6,
  },
  loadingDotDelay2: {
    opacity: 1,
  },
  version: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 14,
  },
})

export default SplashScreen
