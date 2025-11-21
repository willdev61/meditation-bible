import { StyleSheet } from "react-native"
import { COLORS, SIZES } from "../config/constants"

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },

  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: SIZES.title,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 10,
  },

  subtitle: {
    fontSize: SIZES.large,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 8,
  },

  text: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    lineHeight: 24,
  },

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

  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: "600",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  spaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
})
