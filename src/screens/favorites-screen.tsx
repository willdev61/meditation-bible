import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/navigation'
import { FavoriteVerse } from '../types'
import favoritesService from '../services/favorites-service'
import { COLORS, SIZES } from '../config/constants'
import { useFocusEffect } from '@react-navigation/native'

type FavoritesScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Favorites'>
}

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({ navigation }) => {
  const [favorites, setFavorites] = useState<FavoriteVerse[]>([])
  const [loading, setLoading] = useState(true)

  const loadFavorites = async () => {
    setLoading(true)
    try {
      const data = await favoritesService.getAllFavorites()
      setFavorites(data)
    } catch (error) {
      console.error('Error loading favorites:', error)
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadFavorites()
    }, [])
  )

  const handleRemoveFavorite = async (favorite: FavoriteVerse) => {
    Alert.alert(
      'Supprimer le favori',
      'Voulez-vous vraiment retirer ce verset de vos favoris ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            await favoritesService.removeFavorite(
              favorite.book,
              favorite.chapter,
              favorite.verse
            )
            loadFavorites()
          },
        },
      ]
    )
  }

  const handleVersePress = (favorite: FavoriteVerse) => {
    navigation.navigate('BibleReader', {
      book: favorite.book,
      chapter: favorite.chapter,
      verse: favorite.verse,
    })
  }

  const renderFavorite = ({ item }: { item: FavoriteVerse }) => (
    <TouchableOpacity
      style={styles.favoriteCard}
      onPress={() => handleVersePress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.favoriteHeader}>
        <Text style={styles.reference}>{item.reference}</Text>
        <TouchableOpacity
          onPress={() => handleRemoveFavorite(item)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="heart" size={24} color={COLORS.error} />
        </TouchableOpacity>
      </View>

      <Text style={styles.verseText} numberOfLines={3}>
        {item.verseText}
      </Text>

      {item.note && (
        <View style={styles.noteContainer}>
          <Ionicons name="document-text-outline" size={16} color={COLORS.textLight} />
          <Text style={styles.noteText} numberOfLines={2}>
            {item.note}
          </Text>
        </View>
      )}

      <Text style={styles.date}>
        Ajouté le {new Date(item.createdAt).toLocaleDateString('fr-FR')}
      </Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mes favoris</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Liste des favoris */}
        {loading ? (
          <View style={styles.centerContainer}>
            <Text style={styles.loadingText}>Chargement...</Text>
          </View>
        ) : favorites.length === 0 ? (
          <View style={styles.centerContainer}>
            <Ionicons name="heart-outline" size={80} color={COLORS.textLight} />
            <Text style={styles.emptyTitle}>Aucun favori</Text>
            <Text style={styles.emptyText}>
              Les versets que vous ajouterez à vos favoris apparaîtront ici
            </Text>
          </View>
        ) : (
          <FlatList
            data={favorites}
            renderItem={renderFavorite}
            keyExtractor={(item) => `${item.book}-${item.chapter}-${item.verse}`}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding,
    paddingVertical: 12,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontWeight: '600',
    color: COLORS.text,
  },
  placeholder: {
    width: 40,
  },
  listContent: {
    padding: SIZES.padding,
  },
  favoriteCard: {
    backgroundColor: COLORS.paper,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  favoriteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reference: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.primary,
  },
  verseText: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    lineHeight: 22,
    marginBottom: 8,
  },
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.background,
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
    gap: 6,
  },
  noteText: {
    flex: 1,
    fontSize: SIZES.small,
    color: COLORS.textLight,
    fontStyle: 'italic',
  },
  date: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.padding * 2,
  },
  loadingText: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
  },
  emptyTitle: {
    fontSize: SIZES.large,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
    textAlign: 'center',
  },
})

export default FavoritesScreen
