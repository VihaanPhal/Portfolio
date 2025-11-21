"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { skills } from "@/data/constants";

export default function SkillsPage() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const skillItemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section className="relative min-h-screen bg-background text-foreground py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-4">
            Skills
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I use to build exceptional products
          </p>
        </motion.div>

        {/* Skills Grid by Category */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-16"
        >
          {skills.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              variants={categoryVariants}
              className="space-y-8"
            >
              {/* Category Title */}
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {category.title}
              </h3>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    variants={skillItemVariants}
                    whileHover={{
                      scale: 1.05,
                      y: -5,
                      transition: { duration: 0.2 },
                    }}
                    className="group relative"
                  >
                    <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-[var(--border)]/70 bg-[var(--card)]/50 backdrop-blur-sm hover:border-[var(--accent)]/50 hover:bg-[var(--card)] hover:shadow-lg hover:shadow-[var(--accent)]/10 transition-all duration-300">
                      {/* Skill Icon */}
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
                        <Image
                          src={skill.image}
                          alt={skill.name}
                          width={56}
                          height={56}
                          className="object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>

                      {/* Skill Name */}
                      <p className="text-sm sm:text-base font-medium text-center leading-tight">
                        {skill.name}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
