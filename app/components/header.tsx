"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X } from "lucide-react"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"

const NAV_ITEMS = [
  { label: "Skills", href: "#skills", number: "01" },
  { label: "Education", href: "#education", number: "02" },
  { label: "Experience", href: "#experience", number: "03" },
  { label: "Projects", href: "#projects", number: "04" },
  { label: "Contact", href: "#contact", number: "05" },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  // Handle scroll for header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "-80px 0px -50% 0px" }
    )

    NAV_ITEMS.forEach(({ href }) => {
      const section = document.querySelector(href)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
        }
      `}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-12 lg:px-20">
        {/* Logo */}
        <Link
          href="#home"
          aria-label="Go to home"
          onClick={() => setOpen(false)}
          className="group flex items-center gap-1"
        >
          <span className="font-bebas text-2xl tracking-wide text-foreground transition-colors group-hover:text-primary">
            VIHAAN
          </span>
          <motion.span
            className="w-2 h-2 bg-primary rounded-[var(--radius)]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </Link>

        {/* Decorative line - desktop only */}
        <div className="hidden md:block flex-1 mx-8">
          <div className="h-px bg-gradient-to-r from-border via-muted-foreground/30 to-border" />
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map(({ label, href, number }) => {
            const isActive = activeSection === href.slice(1)
            return (
              <Link
                key={label}
                href={href}
                className={`
                  group relative px-3 py-2 font-plex-mono text-[11px] uppercase tracking-[0.1em]
                  transition-colors duration-200
                  ${isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                  }
                `}
              >
                <span className="text-text-tertiary mr-1">{number}.</span>
                {label}
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-3 right-3 h-px bg-primary"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}

          {/* Resume link */}
          <Link
            href="https://drive.google.com/file/d/1vPtMYtODx6FQC0M7AcMPR2UDPvaubnIv/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="ml-2 px-3 py-1.5 border border-primary font-plex-mono text-[10px] uppercase tracking-[0.15em] text-primary hover:bg-primary/10 transition-colors rounded-[var(--radius)]"
          >
            Resume
          </Link>
        </nav>

        {/* Right section */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <AnimatedThemeToggler className="size-8" />

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            className="inline-flex h-9 w-9 items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:border-primary transition-colors md:hidden rounded-[var(--radius)]"
            onClick={() => setOpen((s) => !s)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-border bg-background"
          >
            <nav className="px-6 py-4">
              {/* Terminal header */}
              <div className="font-plex-mono text-[9px] text-text-quaternary mb-4">
                <div>----------------------------</div>
                <div>NAVIGATION // MENU ACTIVE</div>
                <div>----------------------------</div>
              </div>

              <ul className="space-y-1">
                {NAV_ITEMS.map(({ label, href, number }, index) => (
                  <motion.li
                    key={label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-3 py-3 border-b border-border-subtle hover:border-primary/30 transition-colors"
                    >
                      <span className="font-plex-mono text-[10px] text-text-tertiary">
                        {number}
                      </span>
                      <span className="font-plex-mono text-sm uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
                        {label}
                      </span>
                      <motion.span
                        className="ml-auto font-plex-mono text-[10px] text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {"->"}
                      </motion.span>
                    </Link>
                  </motion.li>
                ))}

                {/* Resume link */}
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: NAV_ITEMS.length * 0.05 }}
                >
                  <Link
                    href="https://drive.google.com/file/d/1vPtMYtODx6FQC0M7AcMPR2UDPvaubnIv/view?usp=sharing"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setOpen(false)}
                    className="group flex items-center gap-3 py-3 border-b border-border-subtle"
                  >
                    <span className="font-plex-mono text-[10px] text-primary">
                      {">>"}
                    </span>
                    <span className="font-plex-mono text-sm uppercase tracking-wider text-primary">
                      Resume
                    </span>
                    <span className="ml-auto font-plex-mono text-[10px] text-muted-foreground">
                      {"^"}
                    </span>
                  </Link>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
