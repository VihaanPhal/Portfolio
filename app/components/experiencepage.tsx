"use client";

import React from "react";
import { motion } from "motion/react";
import { experiences } from "@/data/constants";
import { Timeline, TimelineItem } from "@/components/ui/timeline-professional";
import { ExternalLink } from "lucide-react";

export default function ExperiencePage() {
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
            Experience
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            My professional journey and work experience
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <Timeline className="max-w-6xl mx-auto">
          {experiences.map((exp) => (
            <TimelineItem
              key={exp.id}
              title={exp.role}
              subtitle={exp.company}
              date={exp.date}
              logo={exp.img}
              description={exp.desc}
            >
              {/* Additional Content: Skills and Certificate */}
              <div className="space-y-3">
                {/* Skills Tags */}
                {exp.skills && exp.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {exp.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2.5 py-1 text-xs font-medium rounded-md bg-muted/50 text-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Certificate Link */}
                {exp.doc && (
                  <a
                    href={exp.doc}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                  >
                    View Certificate
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </section>
  );
}
