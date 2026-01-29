"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion } from "motion/react"

interface TransmissionInputProps {
  label: string
  name: string
  type?: "text" | "email" | "textarea"
  value: string
  onChange: (value: string) => void
  error?: string
  required?: boolean
  placeholder?: string
  rows?: number
  maxLength?: number
  showProgress?: boolean
}

export const TransmissionInput: React.FC<TransmissionInputProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  required = false,
  placeholder = "",
  rows = 4,
  maxLength,
  showProgress = false,
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [displayLabel, setDisplayLabel] = useState("")
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  // Typing effect for label on focus
  useEffect(() => {
    if (isFocused && displayLabel !== label) {
      let index = 0
      const interval = setInterval(() => {
        if (index <= label.length) {
          setDisplayLabel(label.slice(0, index))
          index++
        } else {
          clearInterval(interval)
        }
      }, 30)
      return () => clearInterval(interval)
    } else if (!isFocused) {
      setDisplayLabel(label)
    }
  }, [isFocused, label, displayLabel])

  const isValid = value.trim().length > 0 && !error
  const progressPercent = maxLength ? (value.length / maxLength) * 100 : 0

  const inputClasses = `
    w-full bg-background border px-4 py-3
    font-plex-mono text-sm text-foreground
    placeholder:text-text-tertiary
    focus:outline-none transition-all duration-300
    ${error
      ? "border-destructive focus:border-destructive"
      : isFocused
        ? "border-primary"
        : "border-border hover:border-border-hover"
    }
  `

  return (
    <div className="relative">
      {/* Label with terminal prompt */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-primary font-plex-mono text-sm">{">"}</span>
        <span className="font-plex-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
          {displayLabel}
          {isFocused && (
            <motion.span
              className="inline-block w-[2px] h-3 bg-primary ml-0.5"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          )}
        </span>

        {/* Status indicator */}
        {value && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`ml-auto font-plex-mono text-[10px] ${
              isValid ? "text-success" : "text-destructive"
            }`}
          >
            {isValid ? "✓" : "✗"}
          </motion.span>
        )}
      </div>

      {/* Input container */}
      <div className="relative">
        {type === "textarea" ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            rows={rows}
            maxLength={maxLength}
            required={required}
            className={`${inputClasses} resize-none`}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type={type}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            required={required}
            className={inputClasses}
          />
        )}

        {/* Blinking cursor overlay when empty and focused */}
        {isFocused && !value && (
          <motion.div
            className="absolute left-4 top-1/2 -translate-y-1/2 w-[2px] h-4 bg-primary"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            style={{ pointerEvents: "none" }}
          />
        )}
      </div>

      {/* Progress bar for textarea */}
      {showProgress && maxLength && (
        <div className="mt-2">
          <div className="flex items-center gap-2">
            <span className="font-plex-mono text-[9px] uppercase tracking-wider text-text-tertiary">
              Characters:
            </span>
            <div className="flex-1 h-1 bg-background-elevated overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progressPercent, 100)}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <span className={`font-plex-mono text-[10px] tabular-nums ${
              value.length >= (maxLength || 0) ? "text-destructive" : "text-muted-foreground"
            }`}>
              {value.length}/{maxLength}
            </span>
          </div>
        </div>
      )}

      {/* Error/Status message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 flex items-center gap-2"
        >
          <span className="text-destructive font-plex-mono text-[10px]">[ERROR]</span>
          <span className="font-plex-mono text-[10px] text-destructive">
            {error}
          </span>
        </motion.div>
      )}

      {/* Required indicator */}
      {required && !error && !value && (
        <div className="mt-2 flex items-center gap-2">
          <span className="text-text-tertiary font-plex-mono text-[10px]">[REQUIRED]</span>
          <span className="font-plex-mono text-[10px] text-text-tertiary">
            {placeholder || "Field required"}
          </span>
        </div>
      )}

      {/* Valid indicator */}
      {isValid && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 flex items-center gap-2"
        >
          <span className="text-success font-plex-mono text-[10px]">[VALID]</span>
          <span className="font-plex-mono text-[10px] text-success">
            Data accepted
          </span>
        </motion.div>
      )}
    </div>
  )
}

export default TransmissionInput
