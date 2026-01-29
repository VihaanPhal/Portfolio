"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"

interface TransmissionSuccessProps {
  isVisible: boolean
  onClose: () => void
  recipientName?: string
}

interface Particle {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
}

export const TransmissionSuccess: React.FC<TransmissionSuccessProps> = ({
  isVisible,
  onClose,
  recipientName = "Vihaan",
}) => {
  const [particles, setParticles] = useState<Particle[]>([])
  const [showContent, setShowContent] = useState(false)
  const [displayMessage, setDisplayMessage] = useState("")

  const successMessage = "MESSAGE SENT!"

  // Generate particles on mount
  useEffect(() => {
    if (isVisible) {
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 0.5,
        duration: Math.random() * 2 + 1,
      }))
      setParticles(newParticles)

      // Show content after initial animation
      setTimeout(() => setShowContent(true), 500)

      // Type out success message
      let charIndex = 0
      const typeInterval = setInterval(() => {
        if (charIndex <= successMessage.length) {
          setDisplayMessage(successMessage.slice(0, charIndex))
          charIndex++
        } else {
          clearInterval(typeInterval)
        }
      }, 50)

      return () => clearInterval(typeInterval)
    } else {
      setShowContent(false)
      setDisplayMessage("")
    }
  }, [isVisible])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Particles */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-primary"
              style={{
                width: particle.size,
                height: particle.size,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0],
                y: [0, -50, -100],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Central content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-md w-full mx-4 p-8 bg-card border border-primary/40"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary" />

            {/* Animated checkmark */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-16 h-16 mx-auto mb-6 relative"
            >
              {/* Circle */}
              <motion.svg
                viewBox="0 0 64 64"
                className="absolute inset-0"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <motion.circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                />
              </motion.svg>

              {/* Checkmark */}
              <motion.svg
                viewBox="0 0 64 64"
                className="absolute inset-0"
              >
                <motion.path
                  d="M20 32 L28 40 L44 24"
                  fill="none"
                  stroke="hsl(var(--success))"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                />
              </motion.svg>

              {/* Pulse rings */}
              <motion.div
                className="absolute inset-0 border-2 border-primary rounded-full"
                animate={{
                  scale: [1, 1.5, 2],
                  opacity: [0.5, 0.2, 0],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>

            {/* Success message */}
            <AnimatePresence>
              {showContent && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  {/* Status header */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-success"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <span className="font-plex-mono text-[10px] uppercase tracking-[0.2em] text-success">
                      [DELIVERED]
                    </span>
                  </div>

                  {/* Main message */}
                  <h3 className="font-bebas text-3xl text-foreground mb-2">
                    {displayMessage}
                    <motion.span
                      className="inline-block w-[3px] h-6 bg-primary ml-1"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                  </h3>

                  {/* Subtext */}
                  <p className="font-plex-mono text-sm text-muted-foreground mb-6">
                    Your message has been sent to{" "}
                    <span className="text-primary">{recipientName}</span>
                  </p>

                  {/* Transmission details */}
                  <div className="bg-background border border-border p-4 mb-6">
                    <div className="grid grid-cols-2 gap-4 text-left">
                      <div>
                        <span className="font-plex-mono text-[9px] uppercase tracking-wider text-text-tertiary">
                          Timestamp
                        </span>
                        <p className="font-plex-mono text-xs text-muted-foreground tabular-nums">
                          {new Date().toLocaleTimeString("en-US", {
                            hour12: false,
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}{" "}
                          UTC
                        </p>
                      </div>
                      <div>
                        <span className="font-plex-mono text-[9px] uppercase tracking-wider text-text-tertiary">
                          Signal Strength
                        </span>
                        <p className="font-plex-mono text-xs text-success">
                          EXCELLENT (100%)
                        </p>
                      </div>
                      <div>
                        <span className="font-plex-mono text-[9px] uppercase tracking-wider text-text-tertiary">
                          Encryption
                        </span>
                        <p className="font-plex-mono text-xs text-muted-foreground">
                          AES-256
                        </p>
                      </div>
                      <div>
                        <span className="font-plex-mono text-[9px] uppercase tracking-wider text-text-tertiary">
                          Response ETA
                        </span>
                        <p className="font-plex-mono text-xs text-primary">
                          {"<"} 24 hours
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Close button */}
                  <motion.button
                    onClick={onClose}
                    className="w-full py-3 border border-border font-plex-mono text-xs uppercase tracking-wider text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    [Close Terminal]
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Scanline effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--foreground) / 0.05) 2px, hsl(var(--foreground) / 0.05) 4px)",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default TransmissionSuccess
