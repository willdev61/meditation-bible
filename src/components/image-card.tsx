import React from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ViewStyle,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { COLORS, SIZES } from "../config/constants"
import { Ionicons } from "@expo/vector-icons"

type ImageCardProps = {
  title?: string
  subtitle?: string
  description?: string
  imageUrl?: string
  gradientColors?: string[]
  onPress?: () => void
  height?: number
  icon?: keyof typeof Ionicons.glyphMap
  style?: ViewStyle
  backgroundColor?: string
}

const ImageCard: React.FC<ImageCardProps> = ({
  title,
  subtitle,
  description,
  imageUrl,
  gradientColors = COLORS.gradientDark,
  onPress,
  height = 200,
  icon,
  style,
  backgroundColor = COLORS.primary,
}) => {
  const content = (
    <View style={[styles.card, { height }, style]}>
      {imageUrl ? (
        <ImageBackground
          source={{ uri: imageUrl }}
          style={styles.imageBackground}
          imageStyle={styles.image}
          resizeMode="cover"
        >
          <LinearGradient
            colors={gradientColors as any}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            <View style={styles.content}>
              {icon && (
                <View style={styles.iconContainer}>
                  <Ionicons name={icon} size={24} color={COLORS.white} />
                </View>
              )}
              {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
              {title && <Text style={styles.title}>{title}</Text>}
              {description && (
                <Text style={styles.description}>{description}</Text>
              )}
            </View>
          </LinearGradient>
        </ImageBackground>
      ) : (
        <LinearGradient
          colors={[backgroundColor, backgroundColor]}
          style={[styles.gradient, { backgroundColor }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.content}>
            {icon && (
              <View style={styles.iconContainer}>
                <Ionicons name={icon} size={24} color={COLORS.white} />
              </View>
            )}
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
            {title && <Text style={styles.title}>{title}</Text>}
            {description && (
              <Text style={styles.description}>{description}</Text>
            )}
          </View>
        </LinearGradient>
      )}
    </View>
  )

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        {content}
      </TouchableOpacity>
    )
  }

  return content
}

const styles = StyleSheet.create({
  card: {
    borderRadius: SIZES.radius + 4,
    overflow: "hidden",
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
  },
  image: {
    borderRadius: SIZES.radius + 4,
  },
  gradient: {
    flex: 1,
    justifyContent: "flex-end",
    padding: SIZES.padding * 1.5,
  },
  content: {
    gap: 8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  subtitle: {
    fontSize: SIZES.small,
    color: COLORS.white,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    opacity: 0.9,
  },
  title: {
    fontSize: SIZES.title,
    fontWeight: "700",
    color: COLORS.white,
    letterSpacing: 0.5,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  description: {
    fontSize: SIZES.medium,
    color: COLORS.white,
    lineHeight: 22,
    opacity: 0.95,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
})

export default ImageCard
