"use client"

import React, { useState, useEffect } from "react"
import { motion } from "motion/react"

type AvailabilityLevel = "available" | "limited" | "busy" | "unavailable"

interface AvailabilityStatusProps {
  status?: AvailabilityLevel
  customMessage?: string
  timezone?: string
  className?: string
}

const statusConfig: Record<
  AvailabilityLevel,
  { label: string; color: string; description: string; pulseSpeed: number }
> = {
  available: {
    label: "ONLINE",
    color: "hsl(var(--success))",
    description: "Open for opportunities",
    pulseSpeed: 1.5,
  },
  limited: {
    label: "LIMITED",
    color: "hsl(var(--warning))",
    description: "Selective availability",
    pulseSpeed: 2,
  },
  busy: {
    label: "BUSY",
    color: "hsl(var(--primary))",
    description: "Currently engaged",
    pulseSpeed: 2.5,
  },
  unavailable: {
    label: "OFFLINE",
    color: "hsl(var(--text-tertiary))",
    description: "Not accepting inquiries",
    pulseSpeed: 0,
  },
}

export const AvailabilityStatus: React.FC<AvailabilityStatusProps> = ({
  status = "available",
  customMessage,
  timezone = "PST",
  className = "",
}) => {
  const [currentTime, setCurrentTime] = useState<string>("")
  const [displayStatus, setDisplayStatus] = useState("")

  const config = statusConfig[status]

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      )
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Type out status on mount
  useEffect(() => {
    let index = 0
    const typeInterval = setInterval(() => {
      if (index <= config.label.length) {
        setDisplayStatus(config.label.slice(0, index))
        index++
      } else {
        clearInterval(typeInterval)
      }
    }, 100)
    return () => clearInterval(typeInterval)
  }, [config.label])

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <motion.div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: config.color }}
          animate={
            config.pulseSpeed > 0
              ? {
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.6, 1],
                }
              : {}
          }
          transition={{
            duration: config.pulseSpeed,
            repeat: config.pulseSpeed > 0 ? Infinity : 0,
          }}
        />
        <span className="font-plex-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          Availability Status
        </span>
      </div>

      {/* Main status display */}
      <div className="bg-background border border-border p-4">
        {/* Status row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {/* Animated status indicator */}
            <div className="relative">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: config.color }}
              />
              {config.pulseSpeed > 0 && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: config.color }}
                  animate={{
                    scale: [1, 2],
                    opacity: [0.5, 0],
                  }}
                  transition={{
                    duration: config.pulseSpeed,
                    repeat: Infinity,
                  }}
                />
              )}
            </div>

            {/* Status text */}
            <span
              className="font-plex-mono text-sm uppercase tracking-wider"
              style={{ color: config.color }}
            >
              {displayStatus}
              <motion.span
                className="inline-block w-[2px] h-3 ml-0.5"
                style={{ backgroundColor: config.color }}
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            </span>
          </div>

          {/* Signal bars */}
          <div className="flex gap-0.5">
            {[1, 2, 3, 4].map((bar) => {
              const isActive =
                status === "available"
                  ? bar <= 4
                  : status === "limited"
                    ? bar <= 3
                    : status === "busy"
                      ? bar <= 2
                      : bar <= 0

              return (
                <motion.div
                  key={bar}
                  className="w-1"
                  style={{
                    height: 4 + bar * 3,
                    backgroundColor: isActive ? config.color : "hsl(var(--border))",
                  }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: bar * 0.1 }}
                />
              )
            })}
          </div>
        </div>

        {/* Description */}
        <p className="font-plex-mono text-[11px] text-muted-foreground mb-3">
          {customMessage || config.description}
        </p>

        {/* Divider */}
        <div className="h-px bg-border mb-3" />

        {/* Time and timezone */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-plex-mono text-[9px] uppercase tracking-wider text-text-tertiary">
              Local Time
            </span>
            <span className="font-plex-mono text-xs tabular-nums text-muted-foreground">
              {currentTime}
            </span>
          </div>
          <span className="font-plex-mono text-[9px] uppercase tracking-wider text-text-tertiary">
            {timezone}
          </span>
        </div>

        {/* Response time indicator */}
        <div className="mt-3 pt-3 border-t border-background-elevated">
          <div className="flex items-center justify-between">
            <span className="font-plex-mono text-[9px] uppercase tracking-wider text-text-tertiary">
              Avg. Response
            </span>
            <span
              className="font-plex-mono text-[10px]"
              style={{ color: config.color }}
            >
              {status === "available"
                ? "< 24 hrs"
                : status === "limited"
                  ? "< 48 hrs"
                  : status === "busy"
                    ? "< 72 hrs"
                    : "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* ASCII art decoration */}
      <div className="mt-3 font-plex-mono text-[9px] text-border leading-tight">
        <div>╔═══════════════════╗</div>
        <div>
          ║{" "}
          <span style={{ color: config.color }}>
            {status === "available"
              ? "● ● ● ● ●"
              : status === "limited"
                ? "● ● ● ○ ○"
                : status === "busy"
                  ? "● ● ○ ○ ○"
                  : "○ ○ ○ ○ ○"}
          </span>{" "}
          ║
        </div>
        <div>╚═══════════════════╝</div>
      </div>
    </div>
  )
}

export default AvailabilityStatus
