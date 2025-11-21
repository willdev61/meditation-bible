import React, { useState, useRef } from "react"
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Animated,
  StatusBar,
} from "react-native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../types/navigation"
import { OnboardingSlide } from "../types/onboarding"
import { COLORS, SIZES } from "../config/constants"

const { width } = Dimensions.get("window")

type OnboardingScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Onboarding">
}

const slides: OnboardingSlide[] = [
  {
    id: "1",
    title: "La Bible en profondeur",
    description:
      "Explorez chaque verset avec sa signification originale en hébreu et grec grâce à la concordance Strong's.",
    icon: "📖",
    backgroundColor: "#FFFAF0",
  },
  {
    id: "2",
    title: "Méditez en profondeur",
    description:
      "Des outils de méditation guidée, un journal spirituel et des questions de réflexion pour transformer votre lecture.",
    icon: "🙏",
    backgroundColor: "#F0F8FF",
  },
  {
    id: "3",
    title: "Grandissez spirituellement",
    description:
      "Suivez votre progression, créez des plans de lecture et construisez une habitude spirituelle durable.",
    icon: "🌱",
    backgroundColor: "#F0FFF4",
  },
]

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollX = useRef(new Animated.Value(0)).current
  const slidesRef = useRef<FlatList>(null)

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems[0]) {
      setCurrentIndex(viewableItems[0].index)
    }
  }).current

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 })
    } else {
      navigation.replace("MainTabs")
    }
  }

  const skip = () => {
    navigation.replace("MainTabs")
  }

  const renderSlide = ({ item }: { item: OnboardingSlide }) => (
    <View
      style={[styles.slide, { width, backgroundColor: item.backgroundColor }]}
    >
      <View style={styles.slideContent}>
        <Text style={styles.icon}>{item.icon}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  )

  const Paginator = () => {
    return (
      <View style={styles.paginatorContainer}>
        {slides.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ]

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 30, 10],
            extrapolate: "clamp",
          })

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          })

          return (
            <Animated.View
              key={index.toString()}
              style={[
                styles.dot,
                {
                  width: dotWidth,
                  opacity,
                },
              ]}
            />
          )
        })}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Skip button */}
      <TouchableOpacity style={styles.skipButton} onPress={skip}>
        <Text style={styles.skipText}>Passer</Text>
      </TouchableOpacity>

      {/* Slides */}
      <FlatList
        data={slides}
        renderItem={renderSlide}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Paginator />

        <TouchableOpacity style={styles.nextButton} onPress={scrollTo}>
          <Text style={styles.nextButtonText}>
            {currentIndex === slides.length - 1 ? "Commencer" : "Suivant"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  skipButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  skipText: {
    color: COLORS.textLight,
    fontSize: 16,
    fontWeight: "600",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  slideContent: {
    alignItems: "center",
    maxWidth: 400,
  },
  icon: {
    fontSize: 120,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 17,
    color: COLORS.textLight,
    textAlign: "center",
    lineHeight: 26,
  },
  footer: {
    paddingHorizontal: 40,
    paddingBottom: 50,
    paddingTop: 20,
  },
  paginatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    gap: 8,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.secondary,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  nextButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "600",
  },
})

export default OnboardingScreen
