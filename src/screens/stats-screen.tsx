import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/navigation'
import { ReadingStats } from '../types'
import statsService from '../services/stats-service'
import { COLORS, SIZES } from '../config/constants'

type StatsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Stats'>
}

const StatsScreen: React.FC<StatsScreenProps> = ({ navigation }) => {
  const [stats, setStats] = useState<ReadingStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    setLoading(true)
    try {
      const data = await statsService.getStats()
      setStats(data)
    } catch (error) {
      console.error('Error loading stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatReadingTime = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes} min`
    }
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}min`
  }

  const StatCard = ({
    icon,
    title,
    value,
    subtitle,
    color,
  }: {
    icon: keyof typeof Ionicons.glyphMap
    title: string
    value: string | number
    subtitle?: string
    color?: string
  }) => (
    <View style={styles.statCard}>
      <View style={[styles.iconContainer, { backgroundColor: color || COLORS.primary }]}>
        <Ionicons name={icon} size={28} color={COLORS.white} />
      </View>
      <View style={styles.statContent}>
        <Text style={styles.statTitle}>{title}</Text>
        <Text style={styles.statValue}>{value}</Text>
        {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
      </View>
    </View>
  )

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </SafeAreaView>
    )
  }

  if (!stats) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Erreur de chargement</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Statistiques</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Streak Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Progression</Text>

            <View style={styles.streakContainer}>
              <View style={styles.streakMain}>
                <Ionicons name="flame" size={60} color="#FF6B35" />
                <Text style={styles.streakNumber}>{stats.currentStreak}</Text>
                <Text style={styles.streakLabel}>
                  jour{stats.currentStreak > 1 ? 's' : ''} de suite
                </Text>
              </View>

              <View style={styles.streakInfo}>
                <View style={styles.streakInfoRow}>
                  <Ionicons name="trophy" size={20} color="#FFD700" />
                  <Text style={styles.streakInfoText}>
                    Record: {stats.longestStreak} jour{stats.longestStreak > 1 ? 's' : ''}
                  </Text>
                </View>
                <View style={styles.streakInfoRow}>
                  <Ionicons name="calendar" size={20} color={COLORS.primary} />
                  <Text style={styles.streakInfoText}>
                    Aujourd'hui: {stats.chaptersReadToday} chapitre
                    {stats.chaptersReadToday > 1 ? 's' : ''}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Reading Stats */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Statistiques de lecture</Text>

            <StatCard
              icon="book"
              title="Chapitres lus"
              value={stats.totalChaptersRead}
              color="#4A90E2"
            />

            <StatCard
              icon="list"
              title="Versets lus"
              value={stats.totalVersesRead}
              color="#50C878"
            />

            <StatCard
              icon="time"
              title="Temps de lecture total"
              value={formatReadingTime(stats.totalReadingTimeMinutes)}
              color="#9B59B6"
            />

            {stats.lastReadDate && (
              <StatCard
                icon="checkmark-circle"
                title="Dernière lecture"
                value={new Date(stats.lastReadDate).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })}
                color="#E67E22"
              />
            )}
          </View>

          {/* Motivational Message */}
          <View style={styles.motivationCard}>
            <Ionicons name="star" size={32} color={COLORS.primary} />
            <Text style={styles.motivationText}>
              {stats.currentStreak === 0
                ? 'Commencez votre lecture aujourd\'hui !'
                : stats.currentStreak < 7
                ? 'Continuez ainsi ! Visez une semaine complète.'
                : stats.currentStreak < 30
                ? 'Excellente progression ! Un mois en vue !'
                : 'Félicitations pour votre fidélité !'}
            </Text>
          </View>
        </ScrollView>
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
  content: {
    flex: 1,
  },
  section: {
    padding: SIZES.padding,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 16,
  },
  streakContainer: {
    backgroundColor: COLORS.paper,
    borderRadius: SIZES.radius + 4,
    padding: SIZES.padding * 1.5,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  streakMain: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: 16,
  },
  streakNumber: {
    fontSize: 48,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 8,
  },
  streakLabel: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
    marginTop: 4,
  },
  streakInfo: {
    gap: 12,
  },
  streakInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  streakInfoText: {
    fontSize: SIZES.medium,
    color: COLORS.text,
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.paper,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  statContent: {
    flex: 1,
  },
  statTitle: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  statValue: {
    fontSize: SIZES.large + 2,
    fontWeight: '700',
    color: COLORS.text,
  },
  statSubtitle: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    marginTop: 2,
  },
  motivationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.paper,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
    margin: SIZES.padding,
    marginTop: 0,
    borderWidth: 1,
    borderColor: COLORS.primary,
    gap: 16,
  },
  motivationText: {
    flex: 1,
    fontSize: SIZES.medium,
    color: COLORS.text,
    lineHeight: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
  },
  errorText: {
    fontSize: SIZES.medium,
    color: COLORS.error,
  },
})

export default StatsScreen
