"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { skills } from "@/data/constants";

export default function SkillsPage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Flatten all skills from categories into a single array
  const allSkills = useMemo(() => {
    return skills.flatMap((category) => category.skills);
  }, []);

  // Repeat skills to fill a larger grid (6 rows x 8 columns = 48 cells)
  const repeatedSkills = useMemo(() => {
    const totalCells = 48;
    const repeated = [];
    for (let i = 0; i < totalCells; i++) {
      repeated.push(allSkills[i % allSkills.length]);
    }
    return repeated;
  }, [allSkills]);

  return (
    <section className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Static Grid Background */}
      <div className="absolute inset-0 flex items-center justify-center px-6 py-20 pointer-events-none overflow-hidden">
        <div className="grid grid-cols-8 gap-4 max-w-[1400px] w-full">
          {repeatedSkills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.5,
                delay: (index % 8) * 0.05,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border border-[var(--border)]/30 bg-[var(--card)]/40 backdrop-blur-sm dark:opacity-40 dark:border-[var(--border)]/20 dark:bg-[var(--card)]/20"
            >
              <div className="relative w-10 h-10">
                <Image
                  src={
                    mounted
                      ? (resolvedTheme === "dark" ? skill.imageDark : skill.imageLight) || skill.imageLight
                      : skill.imageLight
                  }
                  alt={skill.name}
                  width={40}
                  height={40}
                  className="object-contain"
                  loading="lazy"
                />
              </div>
              <span className="text-xs font-medium text-center text-foreground/80 dark:text-foreground/60">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Circular Translucent Overlay Behind Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-5">
        <div
          className="w-[800px] h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(var(--background-rgb), 0.95) 0%, rgba(var(--background-rgb), 0.7) 30%, rgba(var(--background-rgb), 0.3) 60%, transparent 100%)",
          }}
        />
      </div>

      {/* Centered Dramatic Text Overlay */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-center max-w-5xl"
        >
          {/* Main dramatic text with bottom-to-top gradient (black to grey) */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
            className="hero-font text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none mb-6"
            style={{
              background: "linear-gradient(to top, var(--foreground) 0%, var(--muted-foreground) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Skills
          </motion.h2>

          {/* Subtitle with glass morphism */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
            className="hero-font text-2xl sm:text-3xl md:text-4xl font-medium text-muted-foreground leading-relaxed px-8 py-6 rounded-3xl backdrop-blur-md bg-[var(--background)]/80 border border-[var(--border)]/30"
          >
            I have attained over time
          </motion.p>
        </motion.div>
      </div>

      {/* Fade gradient at top and bottom for seamless effect */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[var(--background)] to-transparent pointer-events-none z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent pointer-events-none z-20" />
    </section>
  );
}
