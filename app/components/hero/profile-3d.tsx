"use client";

import React from "react";
import Image from "next/image";
import Tilt from "react-parallax-tilt";

interface Profile3DProps {
  src: string;
  alt: string;
  className?: string;
}

export function Profile3D({ src, alt, className = "" }: Profile3DProps) {
  return (
    <Tilt
      tiltMaxAngleX={15}
      tiltMaxAngleY={15}
      perspective={1000}
      scale={1.05}
      transitionSpeed={2000}
      gyroscope={true}
      glareEnable={true}
      glareMaxOpacity={0.2}
      glareColor="oklch(0.6723 0.1606 244.9955)"
      glarePosition="all"
      glareBorderRadius="100%"
      className={`relative rounded-full ${className}`}
    >
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-2 border-[var(--accent)]/30 backdrop-blur-sm shadow-2xl transition-all duration-500">
        {/* Inner glow ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--accent)]/20 via-transparent to-[var(--accent)]/10 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Profile image */}
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority
        />

        {/* Animated border ring */}
        <div className="absolute inset-0 rounded-full">
          <div className="absolute inset-0 rounded-full border-2 border-[var(--accent)]/50 animate-pulse" />
        </div>
      </div>
    </Tilt>
  );
}
