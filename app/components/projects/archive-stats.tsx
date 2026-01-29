"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "motion/react"

interface StatItem {
  value: number
  label: string
  suffix?: string
  accent?: boolean
}

interface ArchiveStatsProps {
  stats: StatItem[]
  className?: string
}

const AnimatedCounter: React.FC<{
  value: number
  suffix?: string
  accent?: boolean
  delay?: number
}> = ({ value, suffix = "", accent = false, delay = 0 }) => {
  const [displayValue, setDisplayValue] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const containerRef = useRef<HTMLSpanElement>(null)
  const animationRef = useRef<number | null>(null)

  const animateCounter = useCallback(() => {
    const duration = 1200
    const startTime = performance.now()

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentValue = Math.round(easeOut * value)

      setDisplayValue(currentValue)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(updateCounter)
      }
    }

    animationRef.current = requestAnimationFrame(updateCounter)
  }, [value])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            setTimeout(animateCounter, delay)
          }
        })
      },
      { threshold: 0.5 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      observer.disconnect()
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animateCounter, delay, hasAnimated])

  return (
    <span
      ref={containerRef}
      className={`font-bebas text-3xl md:text-4xl tabular-nums ${
        accent ? "text-primary" : "text-foreground"
      }`}
    >
      {displayValue}
      {suffix}
    </span>
  )
}

export const ArchiveStats: React.FC<ArchiveStatsProps> = ({
  stats,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className={`flex flex-wrap justify-center md:justify-start gap-8 md:gap-16 pt-8 border-t border-border ${className}`}
    >
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="flex flex-col items-center md:items-start gap-1"
        >
          <AnimatedCounter
            value={stat.value}
            suffix={stat.suffix}
            accent={stat.accent}
            delay={index * 150}
          />
          <span className="font-plex-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {stat.label}
          </span>
        </div>
      ))}
    </motion.div>
  )
}

// Utility to calculate archive stats from projects
export const calculateArchiveStats = (
  projects: Array<{ tags?: string[]; date?: string }>
): StatItem[] => {
  // Count unique technologies
  const allTechs = new Set<string>()
  projects.forEach((project) => {
    project.tags?.forEach((tag) => allTechs.add(tag))
  })

  // Calculate year range
  const years = projects
    .map((p) => {
      const match = p.date?.match(/\d{4}/)
      return match ? parseInt(match[0]) : null
    })
    .filter((y): y is number => y !== null)

  const minYear = Math.min(...years)
  const maxYear = Math.max(...years)
  const yearSpan = maxYear - minYear + 1

  return [
    { value: projects.length, label: "Projects", suffix: "" },
    { value: allTechs.size, label: "Technologies", suffix: "+" },
    { value: yearSpan, label: "Years", suffix: "", accent: true },
  ]
}

export default ArchiveStats
