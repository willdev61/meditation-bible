import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/navigation'
import { UserSettings } from '../types'
import settingsService from '../services/settings-service'
import { COLORS, SIZES } from '../config/constants'

type OptionsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Options'>
}

const OptionsScreen: React.FC<OptionsScreenProps> = ({ navigation }) => {
  const [settings, setSettings] = useState<UserSettings | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    setLoading(true)
    try {
      const data = await settingsService.getSettings()
      setSettings(data)
    } catch (error) {
      console.error('Error loading settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateSetting = async (key: keyof UserSettings, value: any) => {
    if (!settings) return

    const updated = { ...settings, [key]: value }
    setSettings(updated)

    try {
      await settingsService.updateSettings({ [key]: value })
    } catch (error) {
      console.error('Error updating setting:', error)
    }
  }

  if (loading || !settings) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </SafeAreaView>
    )
  }

  const SettingRow = ({
    icon,
    title,
    description,
    children,
  }: {
    icon: keyof typeof Ionicons.glyphMap
    title: string
    description?: string
    children: React.ReactNode
  }) => (
    <View style={styles.settingRow}>
      <View style={styles.settingLeft}>
        <Ionicons name={icon} size={24} color={COLORS.primary} />
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {description && <Text style={styles.settingDescription}>{description}</Text>}
        </View>
      </View>
      {children}
    </View>
  )

  const SizeButton = ({
    label,
    selected,
    onPress,
  }: {
    label: string
    selected: boolean
    onPress: () => void
  }) => (
    <TouchableOpacity
      style={[styles.sizeButton, selected && styles.sizeButtonSelected]}
      onPress={onPress}
    >
      <Text style={[styles.sizeButtonText, selected && styles.sizeButtonTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Paramètres</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Reading Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Lecture</Text>

            <SettingRow
              icon="text"
              title="Taille du texte"
              description={`Taille actuelle: ${settings.fontSize}px`}
            >
              <View style={styles.sizeButtons}>
                <SizeButton
                  label="A"
                  selected={settings.fontSize === 14}
                  onPress={() => updateSetting('fontSize', 14)}
                />
                <SizeButton
                  label="A"
                  selected={settings.fontSize === 16}
                  onPress={() => updateSetting('fontSize', 16)}
                />
                <SizeButton
                  label="A"
                  selected={settings.fontSize === 18}
                  onPress={() => updateSetting('fontSize', 18)}
                />
                <SizeButton
                  label="A"
                  selected={settings.fontSize === 20}
                  onPress={() => updateSetting('fontSize', 20)}
                />
              </View>
            </SettingRow>

            <SettingRow
              icon="resize"
              title="Espacement des lignes"
              description={`Actuel: ${settings.lineHeight}`}
            >
              <View style={styles.sizeButtons}>
                <SizeButton
                  label="1.5"
                  selected={settings.lineHeight === 1.5}
                  onPress={() => updateSetting('lineHeight', 1.5)}
                />
                <SizeButton
                  label="1.8"
                  selected={settings.lineHeight === 1.8}
                  onPress={() => updateSetting('lineHeight', 1.8)}
                />
                <SizeButton
                  label="2.0"
                  selected={settings.lineHeight === 2.0}
                  onPress={() => updateSetting('lineHeight', 2.0)}
                />
                <SizeButton
                  label="2.5"
                  selected={settings.lineHeight === 2.5}
                  onPress={() => updateSetting('lineHeight', 2.5)}
                />
              </View>
            </SettingRow>

            <SettingRow
              icon="eye"
              title="Numéros de versets"
              description="Afficher les numéros des versets"
            >
              <Switch
                value={settings.showVerseNumbers}
                onValueChange={(value) => updateSetting('showVerseNumbers', value)}
                trackColor={{ false: COLORS.border, true: COLORS.primary }}
                thumbColor={COLORS.white}
              />
            </SettingRow>

            <SettingRow
              icon="language"
              title="Numéros Strong's"
              description="Afficher les numéros Strong's"
            >
              <Switch
                value={settings.showStrongNumbers}
                onValueChange={(value) => updateSetting('showStrongNumbers', value)}
                trackColor={{ false: COLORS.border, true: COLORS.primary }}
                thumbColor={COLORS.white}
              />
            </SettingRow>
          </View>

          {/* Appearance Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Apparence</Text>

            <TouchableOpacity
              style={styles.themeRow}
              onPress={() => updateSetting('theme', 'light')}
            >
              <View style={styles.themeOption}>
                <View style={[styles.themePreview, styles.themeLight]} />
                <Text style={styles.themeLabel}>Clair</Text>
              </View>
              {settings.theme === 'light' && (
                <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.themeRow}
              onPress={() => updateSetting('theme', 'dark')}
            >
              <View style={styles.themeOption}>
                <View style={[styles.themePreview, styles.themeDark]} />
                <Text style={styles.themeLabel}>Sombre</Text>
              </View>
              {settings.theme === 'dark' && (
                <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.themeRow}
              onPress={() => updateSetting('theme', 'sepia')}
            >
              <View style={styles.themeOption}>
                <View style={[styles.themePreview, styles.themeSepia]} />
                <Text style={styles.themeLabel}>Sépia</Text>
              </View>
              {settings.theme === 'sepia' && (
                <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />
              )}
            </TouchableOpacity>
          </View>

          {/* Notifications Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notifications</Text>

            <SettingRow
              icon="notifications"
              title="Activer les notifications"
              description="Recevoir des rappels de lecture"
            >
              <Switch
                value={settings.notificationsEnabled}
                onValueChange={(value) => updateSetting('notificationsEnabled', value)}
                trackColor={{ false: COLORS.border, true: COLORS.primary }}
                thumbColor={COLORS.white}
              />
            </SettingRow>
          </View>

          {/* About Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>À propos</Text>

            <View style={styles.aboutCard}>
              <Text style={styles.appName}>Selah</Text>
              <Text style={styles.appVersion}>Version 1.0.0</Text>
              <Text style={styles.appDescription}>
                Application de lecture de la Bible avec numéros Strong's
              </Text>
            </View>
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
    paddingVertical: SIZES.padding,
  },
  sectionTitle: {
    fontSize: SIZES.medium,
    fontWeight: '700',
    color: COLORS.textLight,
    paddingHorizontal: SIZES.padding,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: SIZES.padding,
    backgroundColor: COLORS.paper,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  settingText: {
    flex: 1,
    marginLeft: 12,
  },
  settingTitle: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
  sizeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  sizeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeButtonSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  sizeButtonText: {
    fontSize: SIZES.small,
    fontWeight: '600',
    color: COLORS.text,
  },
  sizeButtonTextSelected: {
    color: COLORS.white,
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: SIZES.padding,
    backgroundColor: COLORS.paper,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themePreview: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  themeLight: {
    backgroundColor: '#FFFFFF',
  },
  themeDark: {
    backgroundColor: '#1A1A1A',
  },
  themeSepia: {
    backgroundColor: '#F4ECD8',
  },
  themeLabel: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.text,
  },
  aboutCard: {
    alignItems: 'center',
    padding: SIZES.padding * 2,
    backgroundColor: COLORS.paper,
  },
  appName: {
    fontSize: SIZES.large + 4,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  appVersion: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    marginBottom: 12,
  },
  appDescription: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
    textAlign: 'center',
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
})

export default OptionsScreen
