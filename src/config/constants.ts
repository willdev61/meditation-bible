// 🎨 Palette "YouVersion Inspired" pour Selah
// Mood : Images inspirantes + Chaleur spirituelle + Rouge signature

export const COLORS = {
  // 🤍 Bases claires
  background: "#FFFFFF", // Fond principal blanc pur
  paper: "#FAFAFA", // Cards, conteneurs
  offWhite: "#F5F5F5", // Sections alternatives
  lightCream: "#F8F8F8", // Fond secondaire, surfaces

  // ❤️ YouVersion Red - Couleur signature
  primary: "#C8342F", // Rouge YouVersion - Boutons CTA, accents principaux
  secondary: "#A82A26", // Rouge profond - Hover, éléments actifs
  primaryLight: "#E55B54", // Rouge clair pour backgrounds
  primaryDark: "#8B1F1C", // Rouge très foncé

  // 🌅 Tons chaleureux complémentaires
  warm: "#FF6B5B", // Corail chaleureux
  coral: "#FF8A7A", // Corail doux
  peach: "#FFAB9F", // Pêche
  cream: "#FFF4E6", // Crème chaude

  // 🌿 Nature & Terre (accents secondaires)
  olive: "#8B9D83", // Vert sage
  earth: "#B8997A", // Terre
  sand: "#E8DCC4", // Sable

  // ✨ Or & Lumière
  gold: "#D4A574", // Or doux pour highlights
  amber: "#F0C080", // Ambre lumineux
  warmGray: "#9B8F7E", // Gris chaud

  // 📝 Texte
  text: "#1A1A1A", // Texte principal très foncé
  textMedium: "#666666", // Texte secondaire
  textLight: "#999999", // Placeholders, légendes

  // 🎯 Fonctionnels
  white: "#FFFFFF", // Blanc pur
  success: "#4CAF50", // Succès
  error: "#C8342F", // Erreurs (utilise le rouge principal)
  warning: "#FF9800", // Avertissements

  // 🌫️ Overlays & Ombres
  shadowLight: "rgba(0, 0, 0, 0.08)", // Ombres douces
  shadowMedium: "rgba(0, 0, 0, 0.15)", // Ombres marquées
  overlay: "rgba(0, 0, 0, 0.4)", // Voiles sombres sur images
  overlayLight: "rgba(0, 0, 0, 0.2)", // Voile léger
  border: "rgba(0, 0, 0, 0.08)", // Bordures subtiles

  // 🎨 Gradients (pour usage dans styles inline)
  gradientRed: ["#E55B54", "#C8342F"], // Rouge principal
  gradientWarm: ["#FF8A7A", "#FF6B5B"], // Chaleur
  gradientLight: ["#FFFFFF", "#F5F5F5"], // Headers clairs
  gradientDark: ["rgba(0, 0, 0, 0.6)", "rgba(0, 0, 0, 0.3)"], // Overlay sur images
  gradientGold: ["#F0C080", "#D4A574"], // Or lumineux

  // Compatibilité
  cardBg: "#FAFAFA", // Paper
  accent: "#C8342F", // Primary red
  highlight: "#FFF4E6", // Cream
  shadow: "rgba(0, 0, 0, 0.08)", // Shadow Light
  darkBackground: "#1A1A1A", // Text Dark
} as const

export const FONTS = {
  regular: "System",
  bold: "System",
  light: "System",
} as const

export const SIZES = {
  small: 11,
  medium: 14,
  large: 17,
  xlarge: 20,
  title: 26,
  radius: 12,
  padding: 16,
} as const

export enum DataSource {
  MOCK = "mock",
  SQLITE = "sqlite",
  LUEUR = "lueur",
  OPENSOURCE = "opensource",
}

export const CURRENT_DATA_SOURCE: DataSource = DataSource.SQLITE

export const APP_CONFIG = {
  name: "Méditation Bible",
  version: "0.1.0",
  apiTimeout: 10000,
} as const
