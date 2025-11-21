export const COLORS = {
  primary: "#1E3A5F", // Bleu marine
  secondary: "#D4AF37", // Or
  accent: "#6B8E23", // Vert olive
  background: "#F5F5F0", // Beige clair
  text: "#2C3E50", // Gris foncé
  textLight: "#7F8C8D", // Gris clair
  white: "#FFFFFF",
  error: "#E74C3C",
  success: "#27AE60",
  cardBg: "#FFFFFF",
  border: "#E0E0E0",
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
