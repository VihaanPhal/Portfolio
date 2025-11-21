"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { experiences } from "@/data/constants";

export default function ExperiencePage() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section className="relative min-h-screen bg-background text-foreground py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-4">
            Experience
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            My professional journey and work experience
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative space-y-8"
        >
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent)]/0 via-[var(--accent)]/50 to-[var(--accent)]/0 hidden md:block" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              variants={cardVariants}
              whileHover={{
                x: 8,
                transition: { duration: 0.3 },
              }}
              className="group relative"
            >
              {/* Timeline Dot */}
              <div className="absolute left-8 top-8 w-4 h-4 rounded-full bg-[var(--accent)] border-4 border-[var(--background)] z-10 hidden md:block group-hover:scale-125 transition-transform duration-300" />

              {/* Card */}
              <div className="md:ml-20 relative rounded-3xl border border-[var(--border)]/70 bg-[var(--card)]/50 backdrop-blur-sm hover:border-[var(--accent)]/50 hover:bg-[var(--card)] hover:shadow-xl hover:shadow-[var(--accent)]/10 transition-all duration-300 overflow-hidden">
                {/* Card Content */}
                <div className="flex flex-col md:flex-row gap-6 p-8">
                  {/* Company Logo */}
                  <div className="flex-shrink-0">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-[var(--border)]/50 bg-[var(--background)] p-2">
                      <Image
                        src={exp.img}
                        alt={exp.company}
                        width={80}
                        height={80}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1 space-y-4">
                    {/* Role */}
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight group-hover:text-[var(--accent)] transition-colors duration-300">
                        {exp.role}
                      </h3>
                      <p className="text-base sm:text-lg font-medium text-muted-foreground mt-1">
                        {exp.company}
                      </p>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                      <span>{exp.date}</span>
                    </div>

                    {/* Description */}
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {exp.desc}
                    </p>

                    {/* Skills Tags */}
                    {exp.skills && exp.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {exp.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full border border-[var(--border)] bg-[var(--background)]/50 hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/10 transition-colors duration-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Document Link */}
                    {exp.doc && (
                      <a
                        href={exp.doc}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:text-[var(--accent)]/80 transition-colors duration-200 pt-2"
                      >
                        View Certificate
                        <span className="text-lg">↗</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Accent Border on Hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[var(--accent)]/20 rounded-3xl transition-all duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
