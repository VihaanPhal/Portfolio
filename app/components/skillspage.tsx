"use client";

import React from "react";
import { motion } from "motion/react";
import { skills } from "@/data/constants";
import { SkillsCarousel } from "./skills/skills-carousel";

export default function SkillsPage() {
  return (
    <section className="relative min-h-screen bg-background text-foreground py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-4">
            Skills
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I use to build exceptional products
          </p>
        </motion.div>

        {/* Auto-Rotating Skills Carousel */}
        <SkillsCarousel categories={skills} />
      </div>
    </section>
  );
}
