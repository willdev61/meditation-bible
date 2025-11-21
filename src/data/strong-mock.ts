import { StrongDefinition } from "../types/strong"

export const mockStrongs: Record<string, StrongDefinition> = {
  // Grec
  G2316: {
    number: "G2316",
    testament: "NT",
    language: "Grec",
    original: "θεός",
    transliteration: "theos",
    pronunciation: "theh'-os",
    definition:
      "Divinité, spécialement (avec l'article) le Dieu suprême; de façon figurée, un magistrat. Dérivé probablement d'un mot signifiant 'placer' ou 'fixer'.",
    shortDef: "Dieu, divinité",
    usages: ["Dieu", "divinité", "dieux"],
    occurrences: 1317,
    type: "nom",
  },

  G25: {
    number: "G25",
    testament: "NT",
    language: "Grec",
    original: "ἀγαπάω",
    transliteration: "agapaō",
    pronunciation: "ag-ap-ah'-o",
    definition:
      "Aimer (dans un sens social ou moral), utilisé dans le Nouveau Testament de l'amour divin et chrétien. C'est un amour qui implique un choix délibéré et une action, pas seulement un sentiment.",
    shortDef: "Aimer d'un amour divin",
    usages: ["aimer", "avoir de l'affection pour"],
    occurrences: 143,
    type: "verbe",
  },

  G2889: {
    number: "G2889",
    testament: "NT",
    language: "Grec",
    original: "κόσμος",
    transliteration: "kosmos",
    pronunciation: "kos'-mos",
    definition:
      "Ordre, arrangement; par extension, la décoration; spécialement, le monde (dans un sens large ou étroit, incluant ses habitants). Peut désigner l'univers, la terre, ou l'humanité.",
    shortDef: "Monde, univers, humanité",
    usages: ["monde", "univers", "humanité", "ornement"],
    occurrences: 186,
    type: "nom",
  },

  G1325: {
    number: "G1325",
    testament: "NT",
    language: "Grec",
    original: "δίδωμι",
    transliteration: "didōmi",
    pronunciation: "did'-o-mee",
    definition:
      "Donner, offrir, accorder, permettre. Utilisé dans un sens très large d'applications.",
    shortDef: "Donner, accorder",
    usages: ["donner", "accorder", "remettre", "permettre"],
    occurrences: 413,
    type: "verbe",
  },

  G3056: {
    number: "G3056",
    testament: "NT",
    language: "Grec",
    original: "λόγος",
    transliteration: "logos",
    pronunciation: "log'-os",
    definition:
      "Parole, discours, doctrine, chose dite; par implication, le sujet (de conversation ou de raisonnement), la raison. Dans Jean 1, désigne le Christ comme la Parole divine incarnée.",
    shortDef: "Parole, discours, raison",
    usages: ["parole", "discours", "doctrine", "raison", "compte"],
    occurrences: 330,
    type: "nom",
  },

  // Hébreu
  H3068: {
    number: "H3068",
    testament: "AT",
    language: "Hébreu",
    original: "יְהוָה",
    transliteration: "Yəhōwāh",
    pronunciation: "yeh-ho-vaw'",
    definition:
      "Le nom propre du seul vrai Dieu; YHWH (Yahvé, Jéhovah). Le nom sacré de Dieu, souvent traduit par 'l'Éternel' en français. Signifie 'celui qui est' ou 'je suis'.",
    shortDef: "L'Éternel, YHWH, Yahvé",
    usages: ["Éternel", "YHWH", "Yahvé", "Seigneur"],
    occurrences: 6519,
    type: "nom propre",
  },

  H430: {
    number: "H430",
    testament: "AT",
    language: "Hébreu",
    original: "אֱלֹהִים",
    transliteration: "ʾĕlōhîm",
    pronunciation: "el-o-heem'",
    definition:
      "Dieu(x), déité; le Dieu suprême, magistrats. Forme plurielle d'Eloah, utilisée comme pluriel de majesté pour désigner le seul vrai Dieu, mais peut aussi désigner des dieux païens.",
    shortDef: "Dieu, dieux",
    usages: ["Dieu", "dieux", "juges", "anges"],
    occurrences: 2606,
    type: "nom",
  },

  H7462: {
    number: "H7462",
    testament: "AT",
    language: "Hébreu",
    original: "רָעָה",
    transliteration: "rāʿāh",
    pronunciation: "raw-aw'",
    definition:
      "Paître, nourrir; être berger (littéralement ou figurativement); généralement prendre soin de. Implique une relation de soin et de protection.",
    shortDef: "Paître, être berger, prendre soin",
    usages: ["berger", "paître", "nourrir", "gouverner"],
    occurrences: 173,
    type: "verbe",
  },
}

export const getStrongDefinition = (
  number: string,
): StrongDefinition | null => {
  return mockStrongs[number] || null
}

export const searchStrongs = (query: string): StrongDefinition[] => {
  const results: StrongDefinition[] = []
  const lowerQuery = query.toLowerCase()

  Object.values(mockStrongs).forEach((strong) => {
    if (
      strong.original.includes(query) ||
      strong.transliteration.toLowerCase().includes(lowerQuery) ||
      strong.definition.toLowerCase().includes(lowerQuery) ||
      strong.shortDef.toLowerCase().includes(lowerQuery)
    ) {
      results.push(strong)
    }
  })

  return results
}

export const getAllStrongs = (): StrongDefinition[] => {
  return Object.values(mockStrongs)
}

export const getStrongsByLanguage = (
  language: "Hébreu" | "Grec",
): StrongDefinition[] => {
  return Object.values(mockStrongs).filter((s) => s.language === language)
}
