import React from "react"
import { Text, StyleSheet, TouchableOpacity } from "react-native"
import { Verse } from "../types"
import { COLORS, SIZES } from "../config/constants"

interface VerseCardProps {
  verse: Verse
  onPress?: () => void
  showReference?: boolean
}

const VerseCard: React.FC<VerseCardProps> = ({
  verse,
  onPress,
  showReference = true,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      {showReference && <Text style={styles.reference}>{verse.reference}</Text>}
      <Text style={styles.text}>{verse.text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginVertical: 8,
    marginHorizontal: SIZES.padding,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reference: {
    fontSize: SIZES.small,
    fontWeight: "600",
    color: COLORS.secondary,
    marginBottom: 8,
  },
  text: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    lineHeight: 24,
  },
})

export default VerseCard
