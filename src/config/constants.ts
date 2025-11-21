// 🎨 Palette "Quiet Nature" pour Selah
// Mood : Papier ancien + Jardin tranquille + Lumière douce du matin

export const COLORS = {
  // 🤍 Quiet Light - Bases claires
  background: "#FFFEF9", // Fond principal de l'app
  paper: "#FEFCF3", // Cards, conteneurs
  offWhite: "#FAF8F3", // Sections alternatives
  lightCream: "#F5F3ED", // Fond secondaire, surfaces

  // 🌿 Nature - Verts & Terre
  primary: "#8B9D83", // Sage - Couleur principale, boutons CTA
  secondary: "#6B7F63", // Deep Sage - Hover, éléments actifs
  olive: "#9CAF88", // Accents doux, badges
  earth: "#B8997A", // Éléments chaleureux
  clay: "#C4A588", // Tons terreux complémentaires
  sand: "#E8DCC4", // Backgrounds très doux

  // ✨ Accents - Or & Chaleur
  gold: "#C9A961", // Highlights, Strong's, éléments premium
  amber: "#D4B483", // Accents dorés doux
  warmGray: "#9B8F7E", // Séparateurs, bordures subtiles

  // 📝 Texte
  text: "#3E4035", // Texte principal (titres, corps)
  textMedium: "#6B6F5F", // Texte secondaire
  textLight: "#9B9F8F", // Placeholders, légendes

  // 🎯 Fonctionnels
  white: "#FFFFFF", // Blanc pur (icônes, texte sur fond foncé)
  success: "#7A9B76", // Messages de succès, validations
  error: "#C17B6F", // Erreurs, alertes
  warning: "#D4A574", // Avertissements

  // 🌫️ Overlays & Ombres
  shadowLight: "rgba(62, 64, 53, 0.06)", // Ombres douces
  shadowMedium: "rgba(62, 64, 53, 0.12)", // Ombres marquées
  overlay: "rgba(139, 157, 131, 0.15)", // Voiles, modals
  border: "rgba(139, 157, 131, 0.15)", // Bordures subtiles

  // 🎨 Gradients (pour usage dans styles inline)
  gradientSage: ["#9CAF88", "#8B9D83"], // Boutons principaux
  gradientWarm: ["#FFFEF9", "#F5F3ED"], // Headers, sections
  gradientEarth: ["#E8DCC4", "#C4A588"], // Cards spéciales
  gradientGold: ["#D4B483", "#C9A961"], // Highlights premium

  // Compatibilité
  cardBg: "#FEFCF3", // Paper
  accent: "#C9A961", // Gold
  highlight: "#E8DCC4", // Sand
  shadow: "rgba(62, 64, 53, 0.06)", // Shadow Light
  darkBackground: "#3E4035", // Text Dark
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
