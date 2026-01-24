"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import { motion } from "motion/react"

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

interface SplitFlapCharacterProps {
  targetChar: string
  delay: number
  isFlipping: boolean
}

const SplitFlapCharacter: React.FC<SplitFlapCharacterProps> = ({
  targetChar,
  delay,
  isFlipping,
}) => {
  const [currentChar, setCurrentChar] = useState(" ")
  const [isAnimating, setIsAnimating] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const cleanup = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const startFlipping = useCallback(() => {
    cleanup()
    setIsAnimating(true)
    setCurrentChar(CHARSET[Math.floor(Math.random() * CHARSET.length)])

    let iterations = 0
    const maxIterations = 10 + Math.floor(Math.random() * 8)

    intervalRef.current = setInterval(() => {
      iterations++
      if (iterations < maxIterations) {
        setCurrentChar(CHARSET[Math.floor(Math.random() * CHARSET.length)])
      } else {
        cleanup()
        setCurrentChar(targetChar)
        setIsAnimating(false)
      }
    }, 40)
  }, [targetChar, cleanup])

  useEffect(() => {
    if (isFlipping && targetChar !== " ") {
      timeoutRef.current = setTimeout(startFlipping, delay)
    }

    return cleanup
  }, [isFlipping, delay, startFlipping, targetChar, cleanup])

  // Space character - just render a gap
  if (targetChar === " ") {
    return (
      <motion.div
        className="inline-block w-[0.3em]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    )
  }

  return (
    <motion.div
      className="relative inline-flex items-center justify-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`
          relative flex items-center justify-center
          min-w-[0.65em] h-[1.15em]
          bg-[oklch(0.10_0_0)]
          ${isAnimating ? "text-[oklch(0.7_0.2_45)]" : "text-[oklch(0.95_0_0)]"}
          transition-colors duration-100
        `}
      >
        {/* Horizontal split line */}
        <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-[oklch(0.06_0_0)] z-10" />

        {/* Character */}
        <span className="relative z-0 font-bebas leading-none">
          {currentChar}
        </span>

        {/* Subtle border */}
        <div className="absolute inset-0 border border-[oklch(0.20_0_0)]" />
      </div>
    </motion.div>
  )
}

interface SplitFlapDisplayProps {
  text: string
  className?: string
  onHoverReplay?: boolean
}

export const SplitFlapDisplay: React.FC<SplitFlapDisplayProps> = ({
  text,
  className = "",
  onHoverReplay = true,
}) => {
  const [isFlipping, setIsFlipping] = useState(false)
  const [key, setKey] = useState(0)
  const isAnimatingRef = useRef(false)
  const cooldownRef = useRef<NodeJS.Timeout | null>(null)

  // Start animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFlipping(true)
      isAnimatingRef.current = true

      // Set cooldown to prevent immediate re-trigger
      const totalDuration = text.length * 120 + 600
      cooldownRef.current = setTimeout(() => {
        isAnimatingRef.current = false
      }, totalDuration)
    }, 100)

    return () => {
      clearTimeout(timer)
      if (cooldownRef.current) clearTimeout(cooldownRef.current)
    }
  }, [key, text.length])

  const handleMouseEnter = () => {
    if (onHoverReplay && !isAnimatingRef.current) {
      isAnimatingRef.current = true
      setIsFlipping(false)

      // Small delay before restarting to ensure clean reset
      setTimeout(() => {
        setKey((prev) => prev + 1)
      }, 50)
    }
  }

  const characters = text.toUpperCase().split("")

  return (
    <div
      key={key}
      className={`inline-flex flex-wrap cursor-pointer ${className}`}
      onMouseEnter={handleMouseEnter}
    >
      {characters.map((char, index) => (
        <SplitFlapCharacter
          key={`${key}-${index}`}
          targetChar={char}
          delay={index * 100}
          isFlipping={isFlipping}
        />
      ))}
    </div>
  )
}

export default SplitFlapDisplay
