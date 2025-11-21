"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { projects } from "@/data/constants";

export default function ProjectsPage() {
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

  const cardVariants = {
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
            Projects
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of my work and personal projects
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={cardVariants} whileHover={{ y: -8 }} className="group">
              <div className="relative h-full rounded-3xl border border-[var(--border)]/70 bg-[var(--card)]/50 backdrop-blur-sm hover:border-[var(--accent)]/50 hover:bg-[var(--card)] hover:shadow-xl hover:shadow-[var(--accent)]/10 transition-all duration-300 overflow-hidden flex flex-col">
                {/* Project Image */}
                {project.image && (
                  <div className="relative w-full h-48 bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/5 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                )}

                {/* If no image, show gradient placeholder */}
                {!project.image && (
                  <div className="relative w-full h-48 bg-gradient-to-br from-[var(--accent)]/20 via-[var(--accent)]/10 to-transparent flex items-center justify-center">
                    <div className="text-6xl font-black text-[var(--accent)]/30">
                      {project.title.charAt(0)}
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 flex flex-col p-6 space-y-4">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                    <span>{project.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight group-hover:text-[var(--accent)] transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                    {project.description}
                  </p>

                  {/* Tech Stack Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 4).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2.5 py-1 text-xs font-medium rounded-full border border-[var(--border)] bg-[var(--background)]/50 hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/10 transition-colors duration-200"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="px-2.5 py-1 text-xs font-medium rounded-full border border-[var(--border)] bg-[var(--background)]/50">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex items-center gap-3 pt-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:text-[var(--accent)]/80 transition-colors duration-200"
                      >
                        GitHub
                        <span className="text-base">↗</span>
                      </a>
                    )}
                    {project.webapp && project.webapp !== project.github && (
                      <a
                        href={project.webapp}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:text-[var(--accent)]/80 transition-colors duration-200"
                      >
                        Live Demo
                        <span className="text-base">↗</span>
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
