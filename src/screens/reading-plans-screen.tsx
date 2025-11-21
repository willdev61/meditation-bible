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
import { ReadingPlan } from '../types'
import readingPlansService from '../services/reading-plans-service'
import { COLORS, SIZES } from '../config/constants'

type ReadingPlansScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ReadingPlans'>
}

const ReadingPlansScreen: React.FC<ReadingPlansScreenProps> = ({ navigation }) => {
  const [plans, setPlans] = useState<ReadingPlan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPlans()
  }, [])

  const loadPlans = async () => {
    setLoading(true)
    try {
      const data = await readingPlansService.getAllPlans()
      setPlans(data)
    } catch (error) {
      console.error('Error loading plans:', error)
    } finally {
      setLoading(false)
    }
  }

  const getProgress = (plan: ReadingPlan): number => {
    const completedDays = plan.readings.filter((r) => r.completed).length
    return Math.round((completedDays / plan.totalDays) * 100)
  }

  const PlanCard = ({ plan }: { plan: ReadingPlan }) => {
    const progress = getProgress(plan)
    const isStarted = plan.startDate !== null
    const isCompleted = plan.completed

    return (
      <TouchableOpacity
        style={styles.planCard}
        onPress={() => navigation.navigate('ReadingPlanDetail', { planId: plan.id })}
        activeOpacity={0.7}
      >
        <View style={styles.planHeader}>
          <View style={styles.planIcon}>
            <Ionicons
              name={isCompleted ? 'checkmark-circle' : 'book'}
              size={32}
              color={isCompleted ? '#50C878' : COLORS.primary}
            />
          </View>

          <View style={styles.planInfo}>
            <Text style={styles.planName}>{plan.name}</Text>
            <Text style={styles.planDescription}>{plan.description}</Text>
          </View>
        </View>

        <View style={styles.planStats}>
          <View style={styles.statItem}>
            <Ionicons name="calendar-outline" size={18} color={COLORS.textLight} />
            <Text style={styles.statText}>{plan.totalDays} jours</Text>
          </View>

          {isStarted && (
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={18} color={COLORS.textLight} />
              <Text style={styles.statText}>
                Jour {Math.min(plan.currentDay, plan.totalDays)} / {plan.totalDays}
              </Text>
            </View>
          )}
        </View>

        {isStarted && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{progress}%</Text>
          </View>
        )}

        <View style={styles.planActions}>
          {isCompleted ? (
            <View style={styles.completedBadge}>
              <Ionicons name="trophy" size={18} color="#FFD700" />
              <Text style={styles.completedText}>Terminé !</Text>
            </View>
          ) : isStarted ? (
            <Text style={styles.continueText}>Continuer →</Text>
          ) : (
            <Text style={styles.startText}>Commencer →</Text>
          )}
        </View>
      </TouchableOpacity>
    )
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Text style={styles.loadingText}>Chargement...</Text>
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
          <Text style={styles.headerTitle}>Plans de lecture</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.introContainer}>
            <Ionicons name="map-outline" size={48} color={COLORS.primary} />
            <Text style={styles.introTitle}>Suivez un plan de lecture</Text>
            <Text style={styles.introText}>
              Découvrez la Bible de manière structurée avec nos plans de lecture guidés
            </Text>
          </View>

          <View style={styles.plansContainer}>
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
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
  introContainer: {
    alignItems: 'center',
    padding: SIZES.padding * 2,
    paddingBottom: SIZES.padding,
  },
  introTitle: {
    fontSize: SIZES.large + 2,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 12,
    marginBottom: 8,
  },
  introText: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 20,
  },
  plansContainer: {
    padding: SIZES.padding,
    paddingTop: 0,
  },
  planCard: {
    backgroundColor: COLORS.paper,
    borderRadius: SIZES.radius + 4,
    padding: SIZES.padding * 1.5,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  planHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  planIcon: {
    marginRight: 12,
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    fontSize: SIZES.large,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  planDescription: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    lineHeight: 18,
  },
  planStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.background,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: SIZES.small,
    fontWeight: '600',
    color: COLORS.text,
    minWidth: 40,
    textAlign: 'right',
  },
  planActions: {
    alignItems: 'flex-end',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  completedText: {
    fontSize: SIZES.small,
    fontWeight: '600',
    color: '#B8860B',
  },
  continueText: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.primary,
  },
  startText: {
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

export default ReadingPlansScreen
