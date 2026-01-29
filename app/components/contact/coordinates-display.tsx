"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "motion/react"

interface CoordinatesDisplayProps {
  latitude: string
  longitude: string
  city: string
  className?: string
}

const CHARS = "0123456789."

export const CoordinatesDisplay: React.FC<CoordinatesDisplayProps> = ({
  latitude,
  longitude,
  city,
  className = "",
}) => {
  const [displayLat, setDisplayLat] = useState("██.████")
  const [displayLng, setDisplayLng] = useState("███.████")
  const [displayCity, setDisplayCity] = useState("")
  const [isDecrypted, setIsDecrypted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  const decryptText = useCallback(
    (
      target: string,
      setDisplay: React.Dispatch<React.SetStateAction<string>>,
      delay: number
    ) => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          let iterations = 0
          const maxIterations = 15

          const interval = setInterval(() => {
            iterations++

            if (iterations >= maxIterations) {
              clearInterval(interval)
              setDisplay(target)
              resolve()
              return
            }

            // Generate scrambled version
            const progress = iterations / maxIterations
            const revealedChars = Math.floor(progress * target.length)

            const scrambled = target
              .split("")
              .map((char, i) => {
                if (i < revealedChars) return char
                if (char === "." || char === "°" || char === " ") return char
                return CHARS[Math.floor(Math.random() * CHARS.length)]
              })
              .join("")

            setDisplay(scrambled)
          }, 50)
        }, delay)
      })
    },
    []
  )

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true

            // Decrypt sequence
            Promise.all([
              decryptText(latitude, setDisplayLat, 200),
              decryptText(longitude, setDisplayLng, 400),
            ]).then(() => {
              // Type out city name
              setTimeout(() => {
                let charIndex = 0
                const typeInterval = setInterval(() => {
                  if (charIndex <= city.length) {
                    setDisplayCity(city.slice(0, charIndex))
                    charIndex++
                  } else {
                    clearInterval(typeInterval)
                    setIsDecrypted(true)
                  }
                }, 50)
              }, 200)
            })
          }
        })
      },
      { threshold: 0.5 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [latitude, longitude, city, decryptText])

  return (
    <div ref={containerRef} className={className}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <motion.div
          className="w-2 h-2 rounded-full bg-primary"
          animate={isDecrypted ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="font-plex-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          Coordinates
        </span>
      </div>

      {/* Coordinates */}
      <div className="space-y-1 mb-3">
        <div className="flex items-center gap-2">
          <span className="font-plex-mono text-[9px] text-text-tertiary w-4">
            LAT
          </span>
          <span className="font-plex-mono text-sm text-foreground tabular-nums">
            {displayLat}° N
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-plex-mono text-[9px] text-text-tertiary w-4">
            LNG
          </span>
          <span className="font-plex-mono text-sm text-foreground tabular-nums">
            {displayLng}° W
          </span>
        </div>
      </div>

      {/* City name */}
      <div className="border-t border-border pt-3">
        <div className="flex items-center gap-2">
          <span className="font-plex-mono text-[9px] text-text-tertiary">LOC</span>
          <span className="font-plex-mono text-xs uppercase tracking-wider text-primary">
            {displayCity}
            {!isDecrypted && displayCity.length < city.length && (
              <motion.span
                className="inline-block w-[2px] h-3 bg-primary ml-0.5"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            )}
          </span>
        </div>
      </div>

      {/* Decorative crosshair */}
      <div className="mt-4 relative w-12 h-12 mx-auto opacity-30">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-3 bg-primary" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-3 bg-primary" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-px bg-primary" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-px bg-primary" />
        <motion.div
          className="absolute inset-3 border border-primary rounded-full"
          animate={isDecrypted ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </div>
  )
}

export default CoordinatesDisplay
