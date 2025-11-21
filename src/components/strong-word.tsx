import React from "react"
import { Text, StyleSheet, TouchableOpacity } from "react-native"
import { Word } from "../types"
import { COLORS, SIZES } from "../config/constants"

interface StrongWordProps {
  word: Word
  onPress?: (strongNumber: string) => void
  highlighted?: boolean
}

const StrongWord: React.FC<StrongWordProps> = ({
  word,
  onPress,
  highlighted = false,
}) => {
  const hasStrong = word.strong !== null

  const handlePress = () => {
    if (hasStrong && word.strong && onPress) {
      onPress(word.strong)
    }
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={!hasStrong}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.word,
          hasStrong && styles.strongWord,
          highlighted && styles.highlighted,
        ]}
      >
        {word.text}{" "}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  word: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    lineHeight: 28,
  },
  strongWord: {
    color: COLORS.gold, // Or pour les mots Strong's (highlights premium)
    fontWeight: "600",
    textDecorationLine: "underline",
    textDecorationStyle: "dotted",
    textDecorationColor: COLORS.gold,
  },
  highlighted: {
    backgroundColor: COLORS.sand, // Sand pour highlight doux
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
})

export default StrongWord
