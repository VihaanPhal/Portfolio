"use client"

import React from "react"
import { motion } from "motion/react"

interface SignalStrengthProps {
  strength: number // 0-100
  className?: string
}

export const SignalStrength: React.FC<SignalStrengthProps> = ({
  strength,
  className = "",
}) => {
  const bars = 5
  const activeBarCount = Math.ceil((strength / 100) * bars)

  const getStrengthLabel = () => {
    if (strength === 0) return "NO SIGNAL"
    if (strength <= 25) return "WEAK"
    if (strength <= 50) return "MODERATE"
    if (strength <= 75) return "STRONG"
    return "EXCELLENT"
  }

  const getStrengthColor = () => {
    if (strength === 0) return "hsl(var(--text-tertiary))"
    if (strength <= 25) return "hsl(var(--destructive))"
    if (strength <= 50) return "hsl(var(--warning))"
    if (strength <= 75) return "hsl(var(--primary))"
    return "hsl(var(--success))"
  }

  return (
    <div className={`${className}`}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <motion.div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: getStrengthColor() }}
          animate={strength === 100 ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 1, repeat: strength === 100 ? Infinity : 0 }}
        />
        <span className="font-plex-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          Signal Strength
        </span>
      </div>

      {/* Signal bars */}
      <div className="flex items-end gap-1 h-8 mb-2">
        {Array.from({ length: bars }).map((_, index) => {
          const isActive = index < activeBarCount
          const barHeight = 8 + index * 5 // Progressively taller bars

          return (
            <motion.div
              key={index}
              className="w-3 rounded-sm"
              style={{
                height: barHeight,
                backgroundColor: isActive ? getStrengthColor() : "hsl(var(--border))",
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{
                delay: index * 0.1,
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          )
        })}
      </div>

      {/* Strength label */}
      <div className="flex items-center justify-between">
        <span
          className="font-plex-mono text-[10px] uppercase tracking-wider"
          style={{ color: getStrengthColor() }}
        >
          {getStrengthLabel()}
        </span>
        <span className="font-plex-mono text-[10px] text-muted-foreground tabular-nums">
          {strength}%
        </span>
      </div>

      {/* ASCII meter */}
      <div className="mt-2 font-plex-mono text-[10px] text-text-tertiary">
        [
        <span style={{ color: getStrengthColor() }}>
          {"▓".repeat(Math.floor(strength / 10))}
        </span>
        <span className="text-border">
          {"░".repeat(10 - Math.floor(strength / 10))}
        </span>
        ]
      </div>
    </div>
  )
}

export default SignalStrength
