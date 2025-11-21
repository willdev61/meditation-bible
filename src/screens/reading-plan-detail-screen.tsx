import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../types/navigation'
import { ReadingPlan } from '../types'
import readingPlansService from '../services/reading-plans-service'
import { COLORS, SIZES } from '../config/constants'

type ReadingPlanDetailScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ReadingPlanDetail'>
  route: RouteProp<RootStackParamList, 'ReadingPlanDetail'>
}

const ReadingPlanDetailScreen: React.FC<ReadingPlanDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const { planId } = route.params
  const [plan, setPlan] = useState<ReadingPlan | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPlan()
  }, [])

  const loadPlan = async () => {
    setLoading(true)
    try {
      const data = await readingPlansService.getPlan(planId)
      setPlan(data)
    } catch (error) {
      console.error('Error loading plan:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStartPlan = async () => {
    if (!plan) return

    Alert.alert(
      'Commencer le plan',
      `Voulez-vous commencer le plan "${plan.name}" ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Commencer',
          onPress: async () => {
            await readingPlansService.startPlan(planId)
            loadPlan()
          },
        },
      ]
    )
  }

  const handleResetPlan = async () => {
    Alert.alert(
      'Réinitialiser le plan',
      'Voulez-vous vraiment recommencer ce plan depuis le début ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Réinitialiser',
          style: 'destructive',
          onPress: async () => {
            await readingPlansService.resetPlan(planId)
            loadPlan()
          },
        },
      ]
    )
  }

  const handleCompleteDay = async (day: number) => {
    await readingPlansService.completePlanDay(planId, day)
    loadPlan()
  }

  const handleReadingPress = (bookId: string, startChapter: number, endChapter: number) => {
    // Navigate to first chapter of the reading
    navigation.navigate('BibleChapterReader', {
      bookIndex: 0, // TODO: Get proper book index from bookId
      chapterNumber: startChapter,
    })
  }

  if (loading || !plan) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </SafeAreaView>
    )
  }

  const completedDays = plan.readings.filter((r) => r.completed).length
  const progress = Math.round((completedDays / plan.totalDays) * 100)
  const isStarted = plan.startDate !== null

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {plan.name}
          </Text>
          <TouchableOpacity onPress={handleResetPlan} style={styles.resetButton}>
            <Ionicons name="refresh" size={22} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Plan Info */}
          <View style={styles.infoCard}>
            <Text style={styles.planName}>{plan.name}</Text>
            <Text style={styles.planDescription}>{plan.description}</Text>

            {/* Progress */}
            {isStarted && (
              <View style={styles.progressSection}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressLabel}>Progression</Text>
                  <Text style={styles.progressPercent}>{progress}%</Text>
                </View>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${progress}%` }]} />
                </View>
                <Text style={styles.progressStats}>
                  {completedDays} / {plan.totalDays} jours complétés
                </Text>
              </View>
            )}

            {/* Action Button */}
            {!isStarted && (
              <TouchableOpacity style={styles.startButton} onPress={handleStartPlan}>
                <Ionicons name="play-circle" size={24} color={COLORS.white} />
                <Text style={styles.startButtonText}>Commencer le plan</Text>
              </TouchableOpacity>
            )}

            {plan.completed && (
              <View style={styles.completedCard}>
                <Ionicons name="trophy" size={40} color="#FFD700" />
                <Text style={styles.completedTitle}>Plan terminé !</Text>
                <Text style={styles.completedText}>
                  Félicitations pour avoir complété ce plan de lecture
                </Text>
              </View>
            )}
          </View>

          {/* Reading List */}
          <View style={styles.readingsSection}>
            <Text style={styles.sectionTitle}>Lectures quotidiennes</Text>

            {plan.readings.map((reading) => {
              const isCurrent = isStarted && reading.day === plan.currentDay
              const isAvailable = reading.day <= plan.currentDay || !isStarted

              return (
                <View
                  key={reading.day}
                  style={[
                    styles.readingCard,
                    reading.completed && styles.readingCardCompleted,
                    isCurrent && styles.readingCardCurrent,
                  ]}
                >
                  <View style={styles.readingHeader}>
                    <View style={styles.readingDayContainer}>
                      {reading.completed ? (
                        <Ionicons name="checkmark-circle" size={32} color="#50C878" />
                      ) : (
                        <View
                          style={[
                            styles.dayNumber,
                            isCurrent && styles.dayNumberCurrent,
                          ]}
                        >
                          <Text
                            style={[
                              styles.dayNumberText,
                              isCurrent && styles.dayNumberTextCurrent,
                            ]}
                          >
                            {reading.day}
                          </Text>
                        </View>
                      )}
                      <View style={styles.readingInfo}>
                        <Text style={styles.readingDay}>Jour {reading.day}</Text>
                        <Text style={styles.readingText}>
                          {reading.book} {reading.startChapter}
                          {reading.endChapter !== reading.startChapter &&
                            `-${reading.endChapter}`}
                        </Text>
                      </View>
                    </View>

                    {isAvailable && !reading.completed && (
                      <TouchableOpacity
                        style={styles.checkButton}
                        onPress={() => handleCompleteDay(reading.day)}
                      >
                        <Ionicons
                          name="checkmark-circle-outline"
                          size={28}
                          color={COLORS.primary}
                        />
                      </TouchableOpacity>
                    )}
                  </View>

                  {isAvailable && (
                    <TouchableOpacity
                      style={styles.readButton}
                      onPress={() =>
                        handleReadingPress(
                          reading.book,
                          reading.startChapter,
                          reading.endChapter
                        )
                      }
                    >
                      <Text style={styles.readButtonText}>Lire →</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )
            })}
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
    flex: 1,
    fontSize: SIZES.large,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  resetButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  infoCard: {
    backgroundColor: COLORS.paper,
    padding: SIZES.padding * 1.5,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  planName: {
    fontSize: SIZES.large + 4,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  planDescription: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
    lineHeight: 20,
    marginBottom: 20,
  },
  progressSection: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    fontWeight: '600',
  },
  progressPercent: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
    fontWeight: '700',
  },
  progressBar: {
    height: 10,
    backgroundColor: COLORS.background,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  progressStats: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 8,
    gap: 8,
  },
  startButtonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: '600',
  },
  completedCard: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF9E6',
    borderRadius: 8,
  },
  completedTitle: {
    fontSize: SIZES.large,
    fontWeight: '700',
    color: '#B8860B',
    marginTop: 12,
    marginBottom: 4,
  },
  completedText: {
    fontSize: SIZES.medium,
    color: '#B8860B',
    textAlign: 'center',
  },
  readingsSection: {
    padding: SIZES.padding,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 16,
  },
  readingCard: {
    backgroundColor: COLORS.paper,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  readingCardCompleted: {
    backgroundColor: '#F0FFF0',
    borderColor: '#50C878',
  },
  readingCardCurrent: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  readingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  readingDayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dayNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  dayNumberCurrent: {
    backgroundColor: COLORS.primary,
  },
  dayNumberText: {
    fontSize: SIZES.small,
    fontWeight: '700',
    color: COLORS.text,
  },
  dayNumberTextCurrent: {
    color: COLORS.white,
  },
  readingInfo: {
    flex: 1,
  },
  readingDay: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    marginBottom: 2,
  },
  readingText: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.text,
  },
  checkButton: {
    padding: 4,
  },
  readButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  readButtonText: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.primary,
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
})

export default ReadingPlanDetailScreen
