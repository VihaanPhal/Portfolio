"use client";

import React from "react";
import { motion, useScroll, useTransform } from "motion/react";

// UI Components
import { ColorBends } from "@/components/ui/color-bends";
import { HyperText } from "@/components/ui/hyper-text";
import { MorphingText } from "@/components/ui/morphing-text";
import { Profile3D } from "./hero/profile-3d";

// Your data
import { Bio } from "@/data/constants";

export default function HeroPage() {
  // Scroll-based parallax
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Animation variants for staggered entry with depth
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  // Text elements with varying depth
  const nameVariants = {
    hidden: { opacity: 0, y: 40, z: -100 },
    visible: {
      opacity: 1,
      y: 0,
      z: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const rolesVariants = {
    hidden: { opacity: 0, y: 30, z: -80 },
    visible: {
      opacity: 1,
      y: 0,
      z: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const,
        delay: 0.2,
      },
    },
  };

  const descVariants = {
    hidden: { opacity: 0, y: 20, z: -60 },
    visible: {
      opacity: 1,
      y: 0,
      z: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
        delay: 0.3,
      },
    },
  };

  const buttonsVariants = {
    hidden: { opacity: 0, y: 15, z: -40 },
    visible: {
      opacity: 1,
      y: 0,
      z: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
        delay: 0.4,
      },
    },
  };

  return (
    <section className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Animated Color Bends Background with Cursor Follow */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ y, opacity }}
      >
        <ColorBends cursorFollow={true} />
      </motion.div>

      {/* Main Content with Perspective */}
      <div
        className="container mx-auto min-h-screen flex items-center justify-center px-6 py-20"
        style={{ perspective: "2000px" }}
      >
        <motion.div
          className="grid max-w-6xl w-full grid-cols-1 lg:grid-cols-2 items-center gap-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* LEFT: Text content with 3D depth */}
          <div className="flex flex-col items-start space-y-8" style={{ transformStyle: "preserve-3d" }}>
            {/* Name - Deepest layer */}
            <motion.div variants={nameVariants}>
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
              variants={rolesVariants}
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
              variants={descVariants}
              className="text-xl sm:text-2xl text-muted-foreground max-w-2xl leading-relaxed"
            >
              I build end-to-end products across web, mobile, and backend
              platforms.
            </motion.p>

            {/* Links - Closest layer */}
            <motion.div
              variants={buttonsVariants}
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

          {/* RIGHT: 3D Tilt Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, z: -150 }}
            animate={{
              opacity: 1,
              scale: 1,
              z: 0,
              transition: {
                duration: 1,
                ease: [0.22, 1, 0.36, 1] as const,
                delay: 0.5,
              },
            }}
            className="flex justify-center lg:justify-end"
            style={{ transformStyle: "preserve-3d" }}
          >
            <Profile3D
              src="/profile.jpg"
              alt="Vihaan Phal - Full Stack Developer"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
