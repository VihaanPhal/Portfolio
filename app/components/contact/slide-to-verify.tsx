"use client"

import React, { useState, useRef, useCallback } from "react"
import { motion, useMotionValue, useTransform } from "motion/react"
import { ChevronsRight, Check } from "lucide-react"

interface SlideToVerifyProps {
  onVerified: () => void
  isVerified: boolean
  className?: string
}

export const SlideToVerify: React.FC<SlideToVerifyProps> = ({
  onVerified,
  isVerified,
  className = "",
}) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const x = useMotionValue(0)

  const getTrackWidth = useCallback(() => {
    if (!trackRef.current) return 300
    // track width minus thumb size (48px) minus padding (4px each side)
    return trackRef.current.offsetWidth - 48 - 8
  }, [])

  // Map drag position to background opacity for the green fill
  const fillOpacity = useTransform(x, [0, 200], [0, 1])

  const handleDragEnd = () => {
    setIsDragging(false)
    const max = getTrackWidth()
    if (x.get() >= max * 0.85) {
      // Snap to end and verify
      x.set(max)
      onVerified()
    } else {
      // Snap back
      x.set(0)
    }
  }

  return (
    <div className={className}>
      <label className="block font-plex-mono text-xs uppercase tracking-wider text-[var(--foreground)]/50 mb-2">
        Human check
      </label>
      <div
        ref={trackRef}
        className="relative h-12 rounded-full border overflow-hidden select-none"
        style={{
          borderColor: isVerified
            ? "hsl(var(--primary))"
            : "var(--border)",
          backgroundColor: "var(--card)",
        }}
      >
        {/* Green fill background that grows with drag */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            backgroundColor: "hsl(var(--primary))",
            opacity: isVerified ? 1 : fillOpacity,
          }}
        />

        {/* Label text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-plex-mono text-sm tracking-wider text-[var(--foreground)]/60">
            {isVerified ? (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 text-[var(--background)] font-semibold"
              >
                <Check className="w-4 h-4" />
                Verified
              </motion.span>
            ) : (
              "Slide to verify"
            )}
          </span>
        </div>

        {/* Draggable thumb */}
        {!isVerified && (
          <motion.div
            className="absolute top-1 left-1 w-10 h-10 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing z-10"
            style={{
              x,
              backgroundColor: "hsl(var(--primary))",
            }}
            drag="x"
            dragConstraints={trackRef}
            dragElastic={0}
            dragMomentum={false}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
          >
            <ChevronsRight className="w-5 h-5 text-[var(--background)]" />
          </motion.div>
        )}

        {/* Verified thumb pinned to the right */}
        {isVerified && (
          <motion.div
            className="absolute top-1 right-1 w-10 h-10 rounded-full flex items-center justify-center z-10"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{
              backgroundColor: "hsl(var(--primary))",
            }}
          >
            <ChevronsRight className="w-5 h-5 text-[var(--background)]" />
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default SlideToVerify
