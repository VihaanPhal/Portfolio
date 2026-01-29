"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"

interface TransmitButtonProps {
  onClick: () => void
  disabled?: boolean
  isTransmitting?: boolean
  className?: string
}

export const TransmitButton: React.FC<TransmitButtonProps> = ({
  onClick,
  disabled = false,
  isTransmitting = false,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [transmitProgress, setTransmitProgress] = useState(0)

  // Simulate transmission progress
  useEffect(() => {
    if (isTransmitting) {
      setTransmitProgress(0)
      const interval = setInterval(() => {
        setTransmitProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + Math.random() * 15 + 5
        })
      }, 150)
      return () => clearInterval(interval)
    } else {
      setTransmitProgress(0)
    }
  }, [isTransmitting])

  const getButtonText = () => {
    if (isTransmitting) {
      if (transmitProgress < 30) return "PREPARING..."
      if (transmitProgress < 60) return "SENDING..."
      if (transmitProgress < 90) return "VERIFYING..."
      return "SENT!"
    }
    return "SEND MESSAGE"
  }

  return (
    <div className={`relative ${className}`}>
      {/* Main Button */}
      <motion.button
        onClick={onClick}
        disabled={disabled || isTransmitting}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative w-full py-4 px-8 font-plex-mono text-sm uppercase tracking-[0.2em]
          border overflow-hidden transition-colors duration-300
          ${
            disabled
              ? "bg-card border-border text-text-tertiary cursor-not-allowed"
              : isTransmitting
                ? "bg-primary/10 border-primary text-primary cursor-wait"
                : "bg-card border-primary text-primary hover:bg-primary/10"
          }
        `}
        whileHover={!disabled && !isTransmitting ? { scale: 1.02 } : {}}
        whileTap={!disabled && !isTransmitting ? { scale: 0.98 } : {}}
      >
        {/* Background pulse on hover */}
        <AnimatePresence>
          {isHovered && !disabled && !isTransmitting && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 2, opacity: 0.1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute inset-0 bg-primary rounded-full"
              style={{ transformOrigin: "center" }}
            />
          )}
        </AnimatePresence>

        {/* Progress bar during transmission */}
        {isTransmitting && (
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(transmitProgress, 100)}%` }}
            transition={{ duration: 0.1 }}
          />
        )}

        {/* Button content */}
        <div className="relative z-10 flex items-center justify-center gap-3">
          {/* Transmission icon */}
          <div className="relative">
            {isTransmitting ? (
              <motion.div
                className="w-4 h-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
              </motion.div>
            ) : (
              <motion.div
                animate={isHovered ? { x: [0, 2, 0] } : {}}
                transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </motion.div>
            )}
          </div>

          {/* Text */}
          <span>{getButtonText()}</span>

          {/* Signal bars when ready */}
          {!isTransmitting && !disabled && (
            <div className="flex gap-0.5">
              {[1, 2, 3].map((bar) => (
                <motion.div
                  key={bar}
                  className="w-1 bg-current"
                  style={{ height: 4 + bar * 2 }}
                  animate={isHovered ? { scaleY: [1, 1.3, 1] } : {}}
                  transition={{
                    duration: 0.4,
                    repeat: isHovered ? Infinity : 0,
                    delay: bar * 0.1,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-current opacity-50" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-current opacity-50" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-current opacity-50" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-current opacity-50" />
      </motion.button>

      {/* Status line below button */}
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div
            className={`w-1.5 h-1.5 rounded-full ${
              disabled
                ? "bg-text-tertiary"
                : isTransmitting
                  ? "bg-warning"
                  : "bg-success"
            }`}
            animate={isTransmitting ? { opacity: [1, 0.5, 1] } : {}}
            transition={{ duration: 0.5, repeat: isTransmitting ? Infinity : 0 }}
          />
          <span className="font-plex-mono text-[9px] uppercase tracking-wider text-text-tertiary">
            {disabled
              ? "Fill out all fields to send"
              : isTransmitting
                ? `Sending ${Math.floor(Math.min(transmitProgress, 100))}%`
                : "Ready to send"}
          </span>
        </div>

        {/* Keyboard shortcut hint */}
        {!disabled && !isTransmitting && (
          <span className="font-plex-mono text-[9px] text-text-tertiary">
            ⌘ + Enter
          </span>
        )}
      </div>

      {/* Beam effect on transmission */}
      <AnimatePresence>
        {isTransmitting && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-8 origin-bottom"
          >
            <motion.div
              className="w-full h-full bg-gradient-to-t from-primary to-transparent"
              animate={{
                opacity: [0.5, 1, 0.5],
                height: ["100%", "150%", "100%"],
              }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TransmitButton
