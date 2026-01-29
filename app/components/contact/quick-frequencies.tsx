"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"

interface FrequencyLink {
  id: string
  label: string
  frequency: string
  url: string
  icon: React.ReactNode
  band: string
}

interface QuickFrequenciesProps {
  links: {
    github?: string
    linkedin?: string
    twitter?: string
    email?: string
  }
  className?: string
}

const defaultLinks: FrequencyLink[] = [
  {
    id: "github",
    label: "GitHub",
    frequency: "87.5",
    url: "",
    icon: <Github className="w-4 h-4" />,
    band: "FM",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    frequency: "91.3",
    url: "",
    icon: <Linkedin className="w-4 h-4" />,
    band: "FM",
  },
  {
    id: "twitter",
    label: "Twitter",
    frequency: "103.7",
    url: "",
    icon: <Twitter className="w-4 h-4" />,
    band: "FM",
  },
  {
    id: "email",
    label: "Direct",
    frequency: "108.0",
    url: "",
    icon: <Mail className="w-4 h-4" />,
    band: "AM",
  },
]

export const QuickFrequencies: React.FC<QuickFrequenciesProps> = ({
  links,
  className = "",
}) => {
  const [activeFrequency, setActiveFrequency] = useState<string | null>(null)
  const [tuningPosition, setTuningPosition] = useState(0)

  // Build frequency list from provided links
  const frequencies = defaultLinks
    .map((link) => ({
      ...link,
      url:
        link.id === "github"
          ? links.github || ""
          : link.id === "linkedin"
            ? links.linkedin || ""
            : link.id === "twitter"
              ? links.twitter || ""
              : link.id === "email"
                ? links.email ? `mailto:${links.email}` : ""
                : "",
    }))
    .filter((link) => link.url)

  const handleFrequencyHover = (id: string, index: number) => {
    setActiveFrequency(id)
    setTuningPosition((index / (frequencies.length - 1)) * 100)
  }

  const handleFrequencyLeave = () => {
    setActiveFrequency(null)
  }

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <motion.div
          className="w-2 h-2 rounded-full bg-primary"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="font-plex-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          Connect With Me
        </span>
      </div>

      {/* Frequency dial visualization */}
      <div className="relative mb-4 px-2">
        {/* Dial background */}
        <div className="h-1 bg-background-elevated rounded-full relative overflow-hidden">
          {/* Tuning indicator */}
          <motion.div
            className="absolute top-0 w-3 h-1 bg-primary rounded-full"
            animate={{ left: `${tuningPosition}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ transform: "translateX(-50%)" }}
          />

          {/* Frequency markers */}
          {frequencies.map((_, index) => (
            <div
              key={index}
              className="absolute top-0 w-px h-1 bg-border"
              style={{ left: `${(index / (frequencies.length - 1)) * 100}%` }}
            />
          ))}
        </div>

        {/* Frequency labels */}
        <div className="flex justify-between mt-1">
          <span className="font-plex-mono text-[8px] text-text-tertiary">
            88
          </span>
          <span className="font-plex-mono text-[8px] text-text-tertiary">
            108
          </span>
        </div>
      </div>

      {/* Frequency links */}
      <div className="space-y-2">
        {frequencies.map((freq, index) => (
          <motion.a
            key={freq.id}
            href={freq.url}
            target={freq.id !== "email" ? "_blank" : undefined}
            rel={freq.id !== "email" ? "noopener noreferrer" : undefined}
            className="group block"
            onMouseEnter={() => handleFrequencyHover(freq.id, index)}
            onMouseLeave={handleFrequencyLeave}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className={`
              flex items-center gap-3 p-2 border transition-all duration-300
              ${
                activeFrequency === freq.id
                  ? "bg-primary/5 border-primary/40"
                  : "bg-transparent border-border hover:border-border-hover"
              }
            `}
            >
              {/* Icon */}
              <div
                className={`
                transition-colors duration-300
                ${activeFrequency === freq.id ? "text-primary" : "text-text-tertiary"}
              `}
              >
                {freq.icon}
              </div>

              {/* Frequency display */}
              <div className="flex-1 flex items-center gap-2">
                <span
                  className={`
                  font-plex-mono text-sm tabular-nums transition-colors duration-300
                  ${activeFrequency === freq.id ? "text-foreground" : "text-muted-foreground"}
                `}
                >
                  {freq.frequency}
                </span>
                <span className="font-plex-mono text-[9px] text-text-tertiary">
                  {freq.band}
                </span>
              </div>

              {/* Label */}
              <span
                className={`
                font-plex-mono text-[10px] uppercase tracking-wider transition-colors duration-300
                ${activeFrequency === freq.id ? "text-primary" : "text-text-tertiary"}
              `}
              >
                {freq.label}
              </span>

              {/* Signal indicator */}
              <AnimatePresence>
                {activeFrequency === freq.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="flex gap-0.5"
                  >
                    {[1, 2, 3].map((bar) => (
                      <motion.div
                        key={bar}
                        className="w-1 bg-primary"
                        style={{ height: 4 + bar * 3 }}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: bar * 0.05 }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Active channel indicator */}
      <AnimatePresence>
        {activeFrequency && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-3 font-plex-mono text-[10px] text-primary"
          >
            <span className="text-text-tertiary">CHANNEL:</span>{" "}
            {frequencies.find((f) => f.id === activeFrequency)?.label}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.3, repeat: Infinity }}
            >
              _
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative waveform */}
      <div className="mt-4 flex items-center gap-0.5 opacity-30">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-1 bg-primary"
            animate={
              activeFrequency
                ? {
                    height: [2, 4 + Math.random() * 8, 2],
                  }
                : { height: 2 }
            }
            transition={{
              duration: 0.3,
              repeat: activeFrequency ? Infinity : 0,
              delay: i * 0.02,
            }}
            style={{ height: 2 }}
          />
        ))}
      </div>
    </div>
  )
}

export default QuickFrequencies
