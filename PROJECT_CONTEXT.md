# SELAH - Contexte Projet

> Application mobile de méditation biblique avec concordance Strong's intégrée
> Stack: React Native + Expo + TypeScript + SQLite

---

## 🎯 Vue d'ensemble

**Nom :** Selah (du mot hébreu des Psaumes signifiant "pause, méditation")
**Tagline :** "Pause. Médite. Transforme."
**Cible :** Chrétiens francophones cherchant une étude biblique approfondie

### Valeur unique

- Bible complète en français avec Strong's intégré
- Chaque mot clé cliquable révèle son sens original (hébreu/grec)
- Méditation guidée avec timer et questions de réflexion
- Design "Quiet Nature" (minimaliste + naturel)

---

## 🏗️ Architecture

```
├── .codacy
│   └── cli.sh
├── assets
│   ├── data
│   │   └── bible-fr.json
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── icon.png
│   └── splash-icon.png
├── src
│   ├── components
│   │   ├── loading-spinner.tsx
│   │   ├── meditation-timer.tsx
│   │   ├── strong-word.tsx
│   │   └── verse-card.tsx
│   ├── config
│   │   └── constants.ts
│   ├── data
│   │   ├── bible-mock.ts
│   │   └── strong-mock.ts
│   ├── navigation
│   │   └── navigator.tsx
│   ├── screens
│   │   ├── bible-books-screen.tsx
│   │   ├── bible-chapter-reader-screen.tsx
│   │   ├── bible-chapters-list-screen.tsx
│   │   ├── bible-reader-screen.tsx
│   │   ├── bible-screen.tsx
│   │   ├── home-screen.tsx
│   │   ├── meditation-screen.tsx
│   │   ├── meditation-tab-screen.tsx
│   │   ├── onboarding-screen.tsx
│   │   ├── search-screen.tsx
│   │   ├── splash-screen.tsx
│   │   └── strong-detail-screen.tsx
│   ├── services
│   │   ├── bible-json-loader.ts
│   │   ├── bible-service.ts
│   │   ├── database.ts
│   │   └── seed-database.ts
│   ├── styles
│   │   └── themes.ts
│   └── types
│       ├── index.ts
│       ├── navigation.ts
│       ├── onboarding.ts
│       └── strong.ts
├── .gitignore
├── App.tsx
├── app.json
├── index.ts
├── package-lock.json
├── package.json
├── project-overview.md
└── tsconfig.json
```

---

## 🎨 Design System "Quiet Nature"

### Palette de couleurs

```typescript
export const COLORS = {
  // Quiet Light - Bases claires (70% de l'UI)
  background: "#FFFEF9", // Fond principal
  paper: "#FEFCF3", // Cards, conteneurs
  offWhite: "#FAF8F3", // Sections alternatives
  lightCream: "#F5F3ED", // Fond secondaire

  // Nature - Verts & Terre (20% de l'UI)
  sage: "#8B9D83", // CTA principal
  deepSage: "#6B7F63", // Hover, actif
  olive: "#9CAF88", // Accents doux
  earth: "#B8997A", // Éléments chauds
  clay: "#C4A588", // Tons terreux
  sand: "#E8DCC4", // Backgrounds doux

  // Accents - Or & Chaleur (10% de l'UI)
  gold: "#C9A961", // Strong's, highlights
  amber: "#D4B483", // Accents dorés
  warmGray: "#9B8F7E", // Séparateurs

  // Texte
  textDark: "#3E4035", // Titres, corps
  textMedium: "#6B6F5F", // Secondaire
  textLight: "#9B9F8F", // Placeholders

  // Fonctionnels
  white: "#FFFFFF",
  success: "#7A9B76",
  error: "#C17B6F",
  warning: "#D4A574",

  // Ombres
  shadowLight: "rgba(62, 64, 53, 0.06)",
  shadowMedium: "rgba(62, 64, 53, 0.12)",
  overlay: "rgba(139, 157, 131, 0.15)",
}
```

### Tailles

```typescript
export const SIZES = {
  // Padding
  padding: 16,

  // Radius
  radius: 16,
  radiusSmall: 8,
  radiusLarge: 20,

  // Fonts
  small: 12,
  medium: 16,
  large: 20,
  xlarge: 24,
  title: 32,
}
```

### Typographie

- **Titres :** System Font, 600-700, letter-spacing: 0.5-2px
- **Corps :** System Font, 400, line-height: 1.6
- **Versets bibliques :** Georgia (serif), 400, line-height: 1.8
- **Mots Strong's :** Gold (#C9A961), 600, underline dotted

### Composants visuels

- **Cards :** `backgroundColor: paper`, `borderRadius: 16`, `border: 1px rgba(139, 157, 131, 0.15)`, `shadow: light`
- **Boutons CTA :** `backgroundColor: sage`, `color: white`, `borderRadius: 12`, `padding: 14px 20px`
- **Boutons secondaires :** `backgroundColor: white`, `border: 2px sage`, `color: sage`

---

## 🛠️ Stack Technique

### Core

- **React Native** : 0.76.5
- **Expo** : ~52.0.0
- **TypeScript** : ^5.3.3

### Navigation

- **@react-navigation/native** : ^7.0.13
- **@react-navigation/native-stack** : ^7.2.0

### Base de données

- **expo-sqlite** : Stockage local (Bible + Strong's)
- **@react-native-async-storage/async-storage** : Préférences utilisateur

### UI

- **@expo/vector-icons** : Ionicons
- **react-native-screens** : Performance
- **react-native-safe-area-context** : Gestion safe areas

---

## 📐 Conventions de code

### Naming

```typescript
// Composants : PascalCase
HomeScreen.tsx
VerseCard.tsx

// Fichiers utilitaires : camelCase
databaseService.ts
bibleImportService.ts

// Constantes : UPPER_SNAKE_CASE
export const MAX_VERSES = 100

// Types/Interfaces : PascalCase avec suffixe
interface Verse {}
type RootStackParamList = {}
```

### Structure de fichier

```typescript
// 1. Imports React
import React, { useState, useEffect } from "react"

// 2. Imports React Native
import { View, Text, StyleSheet } from "react-native"

// 3. Imports externes
import { Ionicons } from "@expo/vector-icons"

// 4. Imports internes (types, services, etc.)
import { Verse } from "../types/bible.types"
import databaseService from "../services/databaseService"
import { COLORS, SIZES } from "../config/constants"

// 5. Types du composant
type MyScreenProps = {}

// 6. Composant
const MyScreen: React.FC<MyScreenProps> = ({}) => {
  // États
  // Effets
  // Handlers
  // Render
}

// 7. Styles
const styles = StyleSheet.create({})

// 8. Export
export default MyScreen
```

### Styles

```typescript
// ✅ BON : StyleSheet.create
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
})

// ❌ MAUVAIS : Inline styles
;<View style={{ flex: 1, backgroundColor: "#FFFEF9" }} />

// ✅ BON : Utiliser les constantes
backgroundColor: COLORS.sage

// ❌ MAUVAIS : Hardcoder les couleurs
backgroundColor: "#8B9D83"
```

### Async/Await

```typescript
// ✅ BON : Toujours avec try/catch
const loadData = async () => {
  try {
    const data = await databaseService.getData()
    setData(data)
  } catch (error) {
    console.error("Error:", error)
  }
}

// ❌ MAUVAIS : Sans error handling
const loadData = async () => {
  const data = await databaseService.getData()
  setData(data)
}
```

---

## 📊 Base de données SQLite

### Schéma

```sql
-- books (66 livres)
CREATE TABLE books (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  testament TEXT,           -- 'OT' ou 'NT'
  category TEXT,            -- 'Torah', 'Gospels', etc.
  chapters_count INTEGER,
  verses_count INTEGER
);

-- verses (31,102 versets)
CREATE TABLE verses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  book_id INTEGER,
  chapter_number INTEGER,
  verse_number INTEGER,
  text TEXT NOT NULL,
  FOREIGN KEY (book_id) REFERENCES books(id)
);

-- words (mots avec Strong's)
CREATE TABLE words (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  verse_id INTEGER,
  text TEXT NOT NULL,
  strong_number TEXT,       -- 'G2316' ou NULL
  position INTEGER,
  FOREIGN KEY (verse_id) REFERENCES verses(id)
);

-- strongs (13,000+ définitions)
CREATE TABLE strongs (
  number TEXT PRIMARY KEY,
  language TEXT,            -- 'Greek' ou 'Hebrew'
  original TEXT,            -- 'θεός'
  transliteration TEXT,     -- 'theos'
  pronunciation TEXT,       -- 'theh'-os'
  short_definition TEXT,
  full_definition TEXT,
  type TEXT,                -- 'noun', 'verb', etc.
  occurrences INTEGER
);
```

### Usage

```typescript
// Récupérer un chapitre
const verses = await databaseService.getChapter(bookId, chapterNumber)

// Rechercher dans la Bible
const results = await databaseService.searchVerses("amour")

// Obtenir définition Strong's
const strong = await databaseService.getStrongDefinition("G2316")
```

---

## 🚀 État actuel

### ✅ Terminé (MVP)

- [x] Splash Screen avec animation
- [x] Onboarding (3 slides)
- [x] Home Screen avec menu
- [x] Lecture de versets individuels
- [x] Concordance Strong's (détail)
- [x] Méditation guidée avec timer
- [x] Recherche Strong's
- [x] Navigation entre écrans
- [x] Design system "Quiet Nature"
- [x] Service SQLite
- [x] Service d'import Bible

### 🔄 En cours

- [ ] Import de la Bible complète (JSON → SQLite)
- [ ] Sélecteur de livres (66 livres)
- [ ] Lecteur de chapitres complets
- [ ] Navigation chapitre par chapitre

### 📋 Prochaines étapes (Phase 1)

1. **Bible complète** (4 semaines)

   - Sélecteur de livres avec catégories
   - Lecteur de chapitres
   - Navigation avancée
   - Options de lecture (taille police, mode nuit)

2. **Section Étude** (4 semaines)

   - Introductions aux livres
   - Commentaires bibliques
   - Chronologie
   - Personnages

3. **Dictionnaire** (4 semaines)
   - Dictionnaire des termes
   - Strong's complet (13,000+)
   - Noms propres
   - Symboles

### 🎯 Backlog

- Plans de lecture
- Favoris & Collections
- Surlignage & Annotations
- Audio Bible
- Synchronisation cloud (Supabase)
- Mode hors-ligne complet

---

## 🤝 Collaboration avec Lueur.org

### Statut : En attente de réponse

**Contact :**

- Email envoyé via formulaire lueur.org
- Demande : Accès à leur traduction française de Strong's
- Proposition : Partenariat / Attribution

**Si accepté :**

- Remplacer les données mock par leurs données
- Intégrer leur API (si disponible)
- Ajouter mention "En partenariat avec Lueur.org"

**Si refusé :**

- Utiliser données open-source (OpenBible.info)
- Créer notre propre traduction Strong's

---

## 🎯 Règles strictes pour le développement

### 1. Design "Quiet Nature" OBLIGATOIRE

- Utiliser UNIQUEMENT les couleurs de la palette
- Respecter les ratios : 70% Quiet Light, 20% Nature, 10% Accents
- Pas de couleurs vives ou saturées
- Espacement généreux (breathing room)

### 2. Performance

- Images optimisées (WebP si possible)
- Lazy loading pour listes longues
- Utiliser `React.memo` pour composants lourds
- SQLite pour performances (pas d'API calls pour chaque verset)

### 3. UX

- Animations douces (300ms, ease-out)
- Feedback visuel à chaque action
- Loading states clairs
- Messages d'erreur explicites en français
- Navigation intuitive (max 3 taps pour atteindre une fonctionnalité)

### 4. Accessibilité

- Contraste minimum 4.5:1
- Taille de texte minimum 16px
- Touch targets minimum 44x44px
- Support taille de police système

### 5. Code Quality

- TypeScript strict (pas de `any`)
- Commenter les fonctions complexes
- Nommer explicitement les variables
- Éviter la duplication (DRY)

---

## 🐛 Debugging

### Logs utiles

```typescript
// Dans services
console.log("📖 Loading chapter:", bookId, chapterNumber)
console.log("✅ Loaded verses:", verses.length)
console.error("❌ Error loading:", error)

// Dans screens
console.log("🏠 Home Screen mounted")
console.log("📚 Navigation to:", screenName)
```

### Commandes

```bash
# Lancer l'app
npx expo start

# Lancer sur Android (si configuré)
npx expo start --android

# Lancer sur iOS (si configuré)
npx expo start --ios

# Clear cache
npx expo start --clear

# Reset Metro bundler
rm -rf node_modules/.cache

# Rebuild
rm -rf node_modules && npm install
```

---

## 📱 Tester l'app

### Scénarios de test

1. **Flow complet**

   - Splash → Onboarding → Home
   - Cliquer sur "Bible"
   - Lire un verset
   - Cliquer sur un mot Strong's
   - Méditer sur le verset

2. **Performance**

   - Charger un chapitre de 50+ versets
   - Rechercher dans la Bible
   - Scroller rapidement

3. **Edge cases**
   - Pas de connexion internet
   - Base de données vide
   - Verset non trouvé
   - Strong's non disponible

---

## 🎨 Ressources design

### Inspirations visuelles

- Papier ancien / parchemin
- Jardin zen japonais
- Lumière naturelle tamisée
- Poterie artisanale
- Calligraphie minimaliste

### Émojis autorisés

- 🙏 (prière)
- 🌿 🍃 (nature)
- 📖 📚 (lecture)
- ✨ ✿ ❀ (ornements)
- ⏱️ (timer)

### Émojis interdits

- ❌ Pas d'émojis animés/modernes
- ❌ Pas de smileys
- ❌ Pas d'émojis colorés agressifs

---

## 💡 Principes de développement

1. **Simple avant complexe**

   - Implémenter la version la plus simple d'abord
   - Optimiser ensuite

2. **Mobile-first**

   - Tout doit être pensé pour mobile
   - Gestes tactiles naturels

3. **Offline-first**

   - L'app doit fonctionner sans internet
   - Sync en arrière-plan si connecté

4. **Privacy-first**

   - Données utilisateur sur le device
   - Pas de tracking
   - Sync optionnelle

5. **Performance-first**
   - < 1s pour charger un chapitre
   - < 50ms pour une recherche
   - Animations à 60fps

---

## 📞 Contact & Questions

Pour toute question sur le projet :

1. Référer ce document en premier
2. Vérifier les conventions de code
3. Respecter le design system
4. Garder la cohérence avec l'existant

**Objectif final :** Une app de méditation biblique belle, rapide, et profonde. 🙏✨

---

_Dernière mise à jour : [Date]_
_Version : 0.1.0 (MVP en cours)_
