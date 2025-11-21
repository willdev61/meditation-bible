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
    backgroundColor: COLORS.paper, // Paper au lieu de blanc pur
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.2,
    marginVertical: 8,
    marginHorizontal: SIZES.padding,
    borderWidth: 1,
    borderColor: COLORS.border, // Bordure subtile
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, // Ombre douce
    shadowRadius: 3,
    elevation: 2,
  },
  reference: {
    fontSize: SIZES.small,
    fontWeight: "600",
    color: COLORS.primary, // Sage pour les références
    marginBottom: 8,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  text: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    lineHeight: 26,
  },
})

export default VerseCard
