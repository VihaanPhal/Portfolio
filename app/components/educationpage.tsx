"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { education } from "@/data/constants";

export default function EducationPage() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
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
            Education
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            My academic journey and qualifications
          </p>
        </motion.div>

        {/* Education Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8"
        >
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              className="group"
            >
              <div className="relative rounded-3xl border border-[var(--border)]/70 bg-[var(--card)]/50 backdrop-blur-sm hover:border-[var(--accent)]/50 hover:bg-[var(--card)] hover:shadow-xl hover:shadow-[var(--accent)]/10 transition-all duration-300 overflow-hidden">
                {/* Card Content */}
                <div className="flex flex-col md:flex-row gap-6 p-8">
                  {/* School Logo */}
                  <div className="flex-shrink-0">
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-[var(--border)]/50 bg-[var(--background)] p-3">
                      <Image
                        src={edu.img}
                        alt={edu.school}
                        width={96}
                        height={96}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1 space-y-3">
                    {/* School Name */}
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight group-hover:text-[var(--accent)] transition-colors duration-300">
                      {edu.school}
                    </h3>

                    {/* Degree */}
                    <p className="text-lg sm:text-xl font-medium text-muted-foreground">
                      {edu.degree}
                    </p>

                    {/* Date and Grade */}
                    <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                        <span>{edu.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                        <span className="font-semibold">{edu.grade}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed pt-2">
                      {edu.desc}
                    </p>
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
