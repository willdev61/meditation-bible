export const COLORS = {
  primary: "#1E3A5F", // Bleu royal profond (foi et divinité)
  secondary: "#8B4513", // Brun selle (terre et humilité)
  accent: "#9B5842", // Terre de Sienne brûlée (chaleur spirituelle)
  background: "#F5F1E8", // Parchemin ancien
  text: "#2C2416", // Brun très foncé (lisibilité optimale)
  textLight: "#6B5D4F", // Brun moyen (texte secondaire)
  white: "#FFFFFF",
  error: "#8B2635", // Bordeaux profond
  success: "#4A6741", // Vert olive (paix biblique)
  cardBg: "#FDFBF7", // Crème parchemin
  border: "#D4C5B0", // Bordure beige doré
  shadow: "rgba(44, 36, 22, 0.15)", // Ombre marquée mais élégante
  gold: "#B8860B", // Or sombre (royauté divine)
  purple: "#6B3E7D", // Pourpre royal (sacerdoce)
  darkBackground: "#2C2416", // Fond sombre alternatif
  highlight: "#E8DCC8", // Surbrillance parchemin clair
} as const

export const FONTS = {
  regular: "System",
  bold: "System",
  light: "System",
} as const

export const SIZES = {
  small: 12,
  medium: 16,
  large: 20,
  xlarge: 24,
  title: 32,
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
