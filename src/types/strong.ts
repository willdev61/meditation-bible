export type Testament = "AT" | "NT"
export type Language = "Hébreu" | "Grec"
export type WordType =
  | "nom"
  | "verbe"
  | "adjectif"
  | "adverbe"
  | "pronom"
  | "préposition"
  | "conjonction"
  | "nom propre"

export interface StrongDefinition {
  number: string
  testament: Testament
  language: Language
  original: string
  transliteration: string
  pronunciation: string
  definition: string
  shortDef: string
  usages: string[]
  occurrences: number
  type: WordType
  etymology?: string
  relatedWords?: string[]
}

export interface StrongSearchResult {
  strong: StrongDefinition
  relevance: number
}
