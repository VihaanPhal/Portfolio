"use client"

import React from "react"
import { motion } from "motion/react"
import { SplitFlapDisplay } from "./hero/split-flap-display"
import { NoiseCanvas } from "./hero/noise-canvas"
import { ScrambleButton } from "./hero/scramble-button"
import { TypewriterRoles } from "./typewriter-roles"
import { Bio } from "@/data/constants"

const HeroPage = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[oklch(0.08_0_0)]">
      {/* Animated Noise Overlay */}
      <NoiseCanvas opacity={0.03} />

      {/* Vertical Side Label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:block z-20"
      >
        <span
          className="font-plex-mono text-[10px] uppercase tracking-[0.3em] text-[oklch(0.55_0_0)] block"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          Signal
        </span>
      </motion.div>

      {/* Main Content - Left Aligned */}
      <div className="relative z-10 w-full pl-6 md:pl-28 pr-6 md:pr-12 py-20">
        {/* DRAMATIC NAME DISPLAY - Maximum size that fits viewport */}
        <div className="w-full overflow-hidden">
          <SplitFlapDisplay
            text={Bio.name}
            className="text-[clamp(2.5rem,9.5vw,9rem)] leading-[0.9] tracking-tight whitespace-nowrap"
          />
        </div>

        {/* Content below the name - Left Aligned */}
        <div className="max-w-2xl mt-6">
          {/* TypewriterRoles - cycling through roles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <TypewriterRoles />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2, ease: [0.22, 1, 0.36, 1] }}
            className="font-plex-mono text-sm text-[oklch(0.50_0_0)] leading-relaxed max-w-lg mt-8"
          >
            {Bio.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-8 mt-12"
          >
            <ScrambleButton href="#projects" variant="primary">
              View Projects
            </ScrambleButton>
            <ScrambleButton href={Bio.resume} variant="secondary" external>
              Resume
            </ScrambleButton>
          </motion.div>
        </div>
      </div>

      {/* Available for Work Tag - Bottom Right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.5 }}
        className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-20"
      >
        <div className="border border-[oklch(0.25_0_0)] px-4 py-2">
          <span className="font-plex-mono text-[10px] uppercase tracking-[0.2em] text-[oklch(0.55_0_0)]">
            Available for Work
          </span>
        </div>
      </motion.div>

      {/* Subtle gradient at bottom for section transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[oklch(0.08_0_0)] to-transparent pointer-events-none z-10" />
    </section>
  )
}

export default HeroPage
