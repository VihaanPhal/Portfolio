"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { Bio } from "@/data/constants"

export const TypewriterRoles = () => {
  const roles = Bio.roles
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const currentRole = roles[currentRoleIndex]

    // Pause when text is complete
    if (!isDeleting && displayedText === currentRole) {
      setIsPaused(true)
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, 2000) // Hold for 2 seconds
      return () => clearTimeout(pauseTimeout)
    }

    // Move to next role after deleting
    if (isDeleting && displayedText === "") {
      setIsDeleting(false)
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
      return
    }

    // Don't type/delete while paused
    if (isPaused) return

    // Type or delete one character
    const typingSpeed = isDeleting ? 30 : 70
    const timeout = setTimeout(() => {
      if (isDeleting) {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1))
      } else {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1))
      }
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [currentRoleIndex, displayedText, isDeleting, isPaused, roles])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-2 text-2xl"
    >
      <span className="text-muted-foreground font-normal">I am a</span>
      <span className="font-medium bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
        {displayedText}
        <motion.span
          animate={{ opacity: [1, 1, 0.2, 0.2] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          className="inline-block w-[3px] h-[1.2em] bg-primary ml-1 align-text-bottom translate-y-[-0.1em]"
        />
      </span>
    </motion.div>
  )
}
