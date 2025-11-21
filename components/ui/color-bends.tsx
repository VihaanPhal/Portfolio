"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ColorBendsProps {
  className?: string;
  cursorFollow?: boolean;
}

export function ColorBends({ className = "", cursorFollow = false }: ColorBendsProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Mouse position for cursor-following gradient
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  // Smooth spring animation for cursor following
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    setMounted(true);

    if (!cursorFollow) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorFollow, mouseX, mouseY]);

  // Prevent flash during hydration
  if (!mounted) {
    return null;
  }

  const isDark = theme === "dark";

  // Color palette - subtle colors that work with black/white theme
  const colors = {
    light: {
      primary: "oklch(0.9 0.05 280)", // Very light purple
      secondary: "oklch(0.95 0.03 240)", // Very light blue
      tertiary: "oklch(0.92 0.04 260)", // Very light indigo
      background: "oklch(1 0 0)", // Pure white
    },
    dark: {
      primary: "oklch(0.3 0.08 280)", // Dark purple
      secondary: "oklch(0.25 0.06 240)", // Dark blue
      tertiary: "oklch(0.28 0.07 260)", // Dark indigo
      background: "oklch(0.15 0 0)", // Near black
    },
  };

  const activeColors = isDark ? colors.dark : colors.light;

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* First gradient bend */}
          <motion.linearGradient
            id="colorBend1"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
            animate={{
              x1: ["0%", "100%", "0%"],
              y1: ["0%", "100%", "0%"],
              x2: ["100%", "0%", "100%"],
              y2: ["100%", "0%", "100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <stop offset="0%" stopColor={activeColors.primary} stopOpacity="0.6" />
            <stop offset="50%" stopColor={activeColors.secondary} stopOpacity="0.4" />
            <stop offset="100%" stopColor={activeColors.tertiary} stopOpacity="0.5" />
          </motion.linearGradient>

          {/* Second gradient bend */}
          <motion.linearGradient
            id="colorBend2"
            x1="100%"
            y1="100%"
            x2="0%"
            y2="0%"
            animate={{
              x1: ["100%", "0%", "100%"],
              y1: ["100%", "0%", "100%"],
              x2: ["0%", "100%", "0%"],
              y2: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            <stop offset="0%" stopColor={activeColors.secondary} stopOpacity="0.5" />
            <stop offset="50%" stopColor={activeColors.tertiary} stopOpacity="0.3" />
            <stop offset="100%" stopColor={activeColors.primary} stopOpacity="0.6" />
          </motion.linearGradient>

          {/* Third gradient bend for more complexity */}
          <motion.radialGradient
            id="colorBend3"
            cx="50%"
            cy="50%"
            r="50%"
            animate={{
              cx: ["50%", "30%", "70%", "50%"],
              cy: ["50%", "70%", "30%", "50%"],
              r: ["50%", "70%", "40%", "50%"],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <stop offset="0%" stopColor={activeColors.tertiary} stopOpacity="0.4" />
            <stop offset="100%" stopColor={activeColors.primary} stopOpacity="0.2" />
          </motion.radialGradient>

          {/* Blur filter for smoother effect */}
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="80" />
          </filter>
        </defs>

        {/* Background */}
        <rect
          width="100%"
          height="100%"
          fill={activeColors.background}
        />

        {/* Animated shapes with gradients */}
        <motion.ellipse
          cx="20%"
          cy="30%"
          rx="40%"
          ry="35%"
          fill="url(#colorBend1)"
          filter="url(#blur)"
          animate={{
            cx: ["20%", "80%", "20%"],
            cy: ["30%", "70%", "30%"],
            rx: ["40%", "50%", "40%"],
            ry: ["35%", "45%", "35%"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.ellipse
          cx="80%"
          cy="70%"
          rx="45%"
          ry="40%"
          fill="url(#colorBend2)"
          filter="url(#blur)"
          animate={{
            cx: ["80%", "20%", "80%"],
            cy: ["70%", "30%", "70%"],
            rx: ["45%", "35%", "45%"],
            ry: ["40%", "30%", "40%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <motion.ellipse
          cx={cursorFollow ? smoothX : "50%"}
          cy={cursorFollow ? smoothY : "50%"}
          rx="50%"
          ry="45%"
          fill="url(#colorBend3)"
          filter="url(#blur)"
          animate={
            cursorFollow
              ? {
                  rx: ["50%", "60%", "50%"],
                  ry: ["45%", "55%", "45%"],
                }
              : {
                  cx: ["50%", "40%", "60%", "50%"],
                  cy: ["50%", "60%", "40%", "50%"],
                  rx: ["50%", "60%", "40%", "50%"],
                  ry: ["45%", "55%", "35%", "45%"],
                }
          }
          transition={{
            duration: cursorFollow ? 10 : 35,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </svg>

      {/* Overlay gradient for fade to background color at edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(ellipse at center, transparent 0%, oklch(0.15 0 0) 100%)"
            : "radial-gradient(ellipse at center, transparent 0%, oklch(1 0 0) 100%)",
        }}
      />
    </div>
  );
}
