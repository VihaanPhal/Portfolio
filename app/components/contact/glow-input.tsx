"use client"

import React, { useState } from "react"
import { motion } from "motion/react"

interface GlowInputProps {
  label: string
  name: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  placeholder?: string
  error?: string
  required?: boolean
  rows?: number
}

export const GlowInput: React.FC<GlowInputProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required,
  rows,
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const isActive = isFocused || isHovered
  const isTextarea = rows !== undefined

  return (
    <div>
      <label
        htmlFor={name}
        className="block font-plex-mono text-xs uppercase tracking-wider text-[var(--foreground)]/50 mb-2"
      >
        {label}
      </label>

      {/* Outer wrapper with glow border */}
      <div
        className="relative rounded-lg p-[1px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated glow border */}
        <motion.div
          className="absolute inset-0 rounded-lg"
          initial={false}
          animate={{
            opacity: isActive ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{
            background: error
              ? "linear-gradient(135deg, var(--destructive), var(--destructive))"
              : "conic-gradient(from var(--glow-angle, 0deg), transparent 0%, var(--primary) 10%, transparent 20%, transparent 80%, var(--primary) 90%, transparent 100%)",
            animation: isActive && !error ? "glowSpin 3s linear infinite" : "none",
          }}
        />

        {/* Subtle static border visible when not active */}
        <div
          className="absolute inset-0 rounded-lg transition-colors duration-300"
          style={{
            border: `1px solid ${error ? "var(--destructive)" : isActive ? "transparent" : "var(--border)"}`,
          }}
        />

        {/* Input field */}
        {isTextarea ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            required={required}
            rows={rows}
            className="relative z-[1] w-full px-4 py-3 rounded-lg resize-none
              bg-[var(--card)] text-[var(--foreground)]
              placeholder:text-[var(--foreground)]/25
              focus:outline-none
              transition-colors duration-200"
          />
        ) : (
          <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            required={required}
            className="relative z-[1] w-full px-4 py-3 rounded-lg
              bg-[var(--card)] text-[var(--foreground)]
              placeholder:text-[var(--foreground)]/25
              focus:outline-none
              transition-colors duration-200"
          />
        )}
      </div>

      {error && (
        <p className="mt-1.5 font-plex-mono text-xs text-[var(--destructive)]">{error}</p>
      )}
    </div>
  )
}

export default GlowInput
