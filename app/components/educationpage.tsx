"use client";

import React from "react";
import { motion } from "motion/react";
import { education } from "@/data/constants";
import { Timeline, TimelineItem } from "@/components/ui/timeline-professional";

export default function EducationPage() {
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
          <h2 className="hero-font text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-4">
            Education
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            My academic journey and qualifications
          </p>
        </motion.div>

        {/* Education Timeline */}
        <Timeline className="max-w-6xl mx-auto">
          {education.map((edu) => (
            <TimelineItem
              key={edu.id}
              title={edu.school}
              subtitle={edu.degree}
              date={edu.date}
              logo={edu.img}
              badge={edu.grade}
              description={edu.desc}
            />
          ))}
        </Timeline>
      </div>
    </section>
  );
}
