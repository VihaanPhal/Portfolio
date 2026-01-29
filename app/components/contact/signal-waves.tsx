"use client"

import React, { useEffect, useRef } from "react"

interface SignalWavesProps {
  className?: string
  intensity?: number
}

export const SignalWaves: React.FC<SignalWavesProps> = ({
  className = "",
  intensity = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const waves = [
      { amplitude: 20 * intensity, frequency: 0.02, speed: 0.02, opacity: 0.4, offset: 0 },
      { amplitude: 15 * intensity, frequency: 0.03, speed: 0.015, opacity: 0.3, offset: Math.PI / 3 },
      { amplitude: 25 * intensity, frequency: 0.015, speed: 0.025, opacity: 0.2, offset: Math.PI / 2 },
    ]

    const animate = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      const centerY = rect.height / 2

      waves.forEach((wave) => {
        ctx.beginPath()
        ctx.moveTo(0, centerY)

        for (let x = 0; x <= rect.width; x += 2) {
          const y =
            centerY +
            wave.amplitude *
              Math.sin(x * wave.frequency + timeRef.current * wave.speed + wave.offset)
          ctx.lineTo(x, y)
        }

        // Create gradient stroke - using CSS variable for primary color
        const primaryColor = getComputedStyle(document.documentElement)
          .getPropertyValue('--primary')
          .trim()
        const [h, s, l] = primaryColor.split(' ')
        const gradient = ctx.createLinearGradient(0, 0, rect.width, 0)
        gradient.addColorStop(0, `hsla(${h}, ${s}, ${l}, 0)`)
        gradient.addColorStop(0.2, `hsla(${h}, ${s}, ${l}, ${wave.opacity})`)
        gradient.addColorStop(0.8, `hsla(${h}, ${s}, ${l}, ${wave.opacity})`)
        gradient.addColorStop(1, `hsla(${h}, ${s}, ${l}, 0)`)

        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.stroke()
      })

      timeRef.current += 1
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [intensity])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity: 0.6 }}
    />
  )
}

export default SignalWaves
