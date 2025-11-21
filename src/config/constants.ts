export const COLORS = {
  primary: "#5B9BD5", // Bleu doux (accents et actions)
  secondary: "#F8F9FA", // Gris très clair
  accent: "#A8D5BA", // Vert menthe clair
  background: "#FFFFFF", // Blanc pur
  text: "#4A5568", // Gris moyen
  textLight: "#A0AEC0", // Gris clair
  white: "#FFFFFF",
  error: "#FC8181", // Rouge clair
  success: "#68D391", // Vert clair
  cardBg: "#FAFBFC", // Blanc cassé très subtil
  border: "#E2E8F0", // Bordure gris très clair
  shadow: "rgba(0, 0, 0, 0.03)", // Ombre très légère
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
