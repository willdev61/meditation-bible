import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { COLORS, SIZES } from "../config/constants"

interface MeditationTimerProps {
  initialMinutes?: number
  onComplete?: () => void
}

const MeditationTimer: React.FC<MeditationTimerProps> = ({
  initialMinutes = 5,
  onComplete,
}) => {
  const [seconds, setSeconds] = useState(initialMinutes * 60)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1)
      }, 1000)
    } else if (seconds === 0) {
      setIsActive(false)
      onComplete?.()
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, seconds, onComplete])

  const toggle = () => {
    setIsActive(!isActive)
  }

  const reset = () => {
    setSeconds(initialMinutes * 60)
    setIsActive(false)
  }

  const formatTime = (totalSeconds: number): string => {
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`
  }

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{formatTime(seconds)}</Text>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={toggle}>
          <Ionicons
            name={isActive ? "pause" : "play"}
            size={32}
            color={COLORS.white}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={reset}
        >
          <Ionicons name="reload" size={32} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: SIZES.padding * 2,
  },
  timer: {
    fontSize: 64,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 32,
  },
  controls: {
    flexDirection: "row",
    gap: 16,
  },
  button: {
    backgroundColor: COLORS.primary,
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  resetButton: {
    backgroundColor: COLORS.accent,
  },
})

export default MeditationTimer
