"use client"

import React, { useRef, useEffect } from "react"

interface NoiseCanvasProps {
  opacity?: number
  className?: string
}

export const NoiseCanvas: React.FC<NoiseCanvasProps> = ({
  opacity = 0.03,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let frameCount = 0

    const resize = () => {
      // Use half resolution for performance
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = (rect.width * dpr) / 2
      canvas.height = (rect.height * dpr) / 2
    }

    const generateNoise = () => {
      frameCount++
      // Only update every 2 frames for performance
      if (frameCount % 2 !== 0) {
        animationId = requestAnimationFrame(generateNoise)
        return
      }

      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.floor(Math.random() * 255)
        data[i] = value     // R
        data[i + 1] = value // G
        data[i + 2] = value // B
        data[i + 3] = 255   // A
      }

      ctx.putImageData(imageData, 0, 0)
      animationId = requestAnimationFrame(generateNoise)
    }

    resize()
    generateNoise()

    window.addEventListener("resize", resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{
        opacity,
        mixBlendMode: "overlay",
        imageRendering: "pixelated",
      }}
    />
  )
}

export default NoiseCanvas
