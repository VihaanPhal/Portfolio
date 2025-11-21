"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

// UI Components
import { ColorBends } from "@/components/ui/color-bends";
import { HyperText } from "@/components/ui/hyper-text";
import { MorphingText } from "@/components/ui/morphing-text";

// Your data
import { Bio } from "@/data/constants";

export default function HeroPage() {
  // Animation variants for staggered entry
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Animated Color Bends Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <ColorBends />
      </div>

      {/* Main Content */}
      <div className="container mx-auto min-h-screen flex items-center justify-center px-6 py-20">
        <motion.div
          className="grid max-w-6xl w-full grid-cols-1 lg:grid-cols-2 items-center gap-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* LEFT: Text content */}
          <div className="flex flex-col items-start space-y-8">
            {/* Name */}
            <motion.div variants={itemVariants}>
              <HyperText
                className="text-6xl sm:text-7xl md:text-8xl font-black leading-none tracking-tight"
                animateOnHover={false}
                startOnView
              >
                {Bio?.name ?? "VIHAAN PHAL"}
              </HyperText>
            </motion.div>

            {/* Morphing roles */}
            <motion.div
              variants={itemVariants}
              className="text-2xl sm:text-3xl font-medium text-muted-foreground"
            >
              <MorphingText
                texts={
                  Bio?.roles ?? [
                    "Full Stack Developer",
                    "iOS Developer",
                    ".NET Developer",
                    "Professional Cricketer",
                  ]
                }
                className="font-medium"
              />
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-xl sm:text-2xl text-muted-foreground max-w-2xl leading-relaxed"
            >
              I build end-to-end products across web, mobile, and backend
              platforms.
            </motion.p>

            {/* Links */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              {Bio?.github && (
                <a
                  href={Bio.github}
                  target="_blank"
                  rel="noreferrer"
                  className="group px-8 py-3 bg-[var(--accent)] text-[var(--accent-foreground)] rounded-2xl font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-[var(--accent)]/20"
                  style={{
                    background: "color-mix(in oklch, var(--accent) 100%, transparent)",
                  }}
                >
                  GitHub
                </a>
              )}

              {Bio?.linkedin && (
                <a
                  href={Bio.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="group px-8 py-3 border border-[var(--border)] rounded-2xl font-medium backdrop-blur-sm bg-[var(--background)]/50 hover:bg-[var(--accent)]/10 hover:border-[var(--accent)]/50 transition-all duration-200 hover:scale-105"
                >
                  LinkedIn
                </a>
              )}

              {Bio?.resume && (
                <a
                  href={Bio.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="group px-8 py-3 border border-[var(--border)] rounded-2xl font-medium backdrop-blur-sm bg-[var(--background)]/50 hover:bg-[var(--accent)]/10 hover:border-[var(--accent)]/50 transition-all duration-200 hover:scale-105"
                >
                  Resume ↗
                </a>
              )}
            </motion.div>
          </div>

          {/* RIGHT: Profile image */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-2 border-[var(--border)]/30 backdrop-blur-sm shadow-2xl hover:scale-105 transition-transform duration-500 ease-out">
              <Image
                src="https://placehold.co/512x512/png"
                alt="Vihaan Phal - Full Stack Developer"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
