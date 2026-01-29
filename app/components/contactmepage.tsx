"use client"

import React, { useState, useRef, useCallback } from "react"
import { motion } from "motion/react"
import Link from "next/link"
import emailjs from "@emailjs/browser"
import { Send, Github, Linkedin, Twitter, Mail, ArrowUpRight, CheckCircle, AlertCircle } from "lucide-react"
import { SlideToVerify } from "./contact/slide-to-verify"
import { GlowInput } from "./contact/glow-input"
import { Bio } from "@/data/constants"

const SOCIAL_LINKS = [
  { icon: Github, href: Bio.github, label: "GitHub" },
  { icon: Linkedin, href: Bio.linkedin, label: "LinkedIn" },
  { icon: Twitter, href: Bio.twitter, label: "Twitter" },
]

export default function ContactMePage() {
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [isHumanVerified, setIsHumanVerified] = useState(false)

  // Form validation
  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Minimum 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setStatus("sending")

    // EmailJS configuration
    const SERVICE_ID = "YOUR_SERVICE_ID"
    const TEMPLATE_ID = "YOUR_TEMPLATE_ID"
    const PUBLIC_KEY = "YOUR_PUBLIC_KEY"

    try {
      if (formRef.current) {
        await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
        setStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
        setIsHumanVerified(false)
      }
    } catch (error) {
      setStatus("error")
      console.error("Error sending message:", error)
    }
  }

  const isFormValid = formData.name && formData.email && formData.subject && formData.message.length >= 10 && isHumanVerified

  return (
    <section
      id="contact"
      className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] py-20 md:py-28"
    >
      <div className="mx-auto max-w-3xl px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <h2 className="font-bebas text-6xl md:text-8xl tracking-tight">
            Get in Touch
          </h2>
          <p className="mt-4 text-[var(--foreground)]/60 max-w-md mx-auto">
            Have a project in mind or want to collaborate? I&apos;d love to hear from you.
          </p>
        </motion.div>

        {/* Success State */}
        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            >
              <CheckCircle className="w-16 h-16 mx-auto text-success" />
            </motion.div>
            <h3 className="font-bebas text-3xl mt-6">Message Sent!</h3>
            <p className="mt-2 text-[var(--foreground)]/60">
              Thanks for reaching out. I&apos;ll get back to you within 24 hours.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 font-plex-mono text-sm text-[var(--accent)] hover:underline"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <>
            {/* Form */}
            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block font-plex-mono text-xs uppercase tracking-wider text-[var(--foreground)]/50 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={`
                      w-full px-4 py-3 rounded-lg
                      bg-[var(--card)] border text-[var(--foreground)]
                      placeholder:text-[var(--foreground)]/30
                      focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50
                      transition-all duration-200
                      ${errors.name ? "border-red-500" : "border-[var(--border)]"}
                    `}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block font-plex-mono text-xs uppercase tracking-wider text-[var(--foreground)]/50 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={`
                      w-full px-4 py-3 rounded-lg
                      bg-[var(--card)] border text-[var(--foreground)]
                      placeholder:text-[var(--foreground)]/30
                      focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50
                      transition-all duration-200
                      ${errors.email ? "border-red-500" : "border-[var(--border)]"}
                    `}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block font-plex-mono text-xs uppercase tracking-wider text-[var(--foreground)]/50 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className={`
                    w-full px-4 py-3 rounded-lg
                    bg-[var(--card)] border text-[var(--foreground)]
                    placeholder:text-[var(--foreground)]/30
                    focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50
                    transition-all duration-200
                    ${errors.subject ? "border-red-500" : "border-[var(--border)]"}
                  `}
                />
                {errors.subject && (
                  <p className="mt-1 text-xs text-red-500">{errors.subject}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block font-plex-mono text-xs uppercase tracking-wider text-[var(--foreground)]/50 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={6}
                  className={`
                    w-full px-4 py-3 rounded-lg resize-none
                    bg-[var(--card)] border text-[var(--foreground)]
                    placeholder:text-[var(--foreground)]/30
                    focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50
                    transition-all duration-200
                    ${errors.message ? "border-red-500" : "border-[var(--border)]"}
                  `}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-500">{errors.message}</p>
                )}
              </div>

              {/* Error Message */}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-4 rounded-lg bg-red-500/10 border border-red-500/30"
                >
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="text-sm text-red-500">
                    Failed to send. Please try again or email directly.
                  </span>
                </motion.div>
              )}

              {/* Slide to Verify */}
              <SlideToVerify
                onVerified={() => setIsHumanVerified(true)}
                isVerified={isHumanVerified}
              />

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={!isFormValid || status === "sending"}
                className={`
                  w-full flex items-center justify-center gap-2 py-4 rounded-lg
                  font-plex-mono text-sm uppercase tracking-wider
                  transition-all duration-300
                  ${isFormValid && status !== "sending"
                    ? "bg-[var(--accent)] text-[var(--accent-foreground)] hover:opacity-90"
                    : "bg-[var(--border)] text-[var(--foreground)]/30 cursor-not-allowed"
                  }
                `}
                whileHover={isFormValid ? { scale: 1.01 } : {}}
                whileTap={isFormValid ? { scale: 0.99 } : {}}
              >
                {status === "sending" ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </motion.button>
            </motion.form>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-4 my-10"
            >
              <div className="flex-1 h-px bg-[var(--border)]" />
              <span className="font-plex-mono text-xs text-[var(--foreground)]/40 uppercase tracking-wider">
                or reach out directly
              </span>
              <div className="flex-1 h-px bg-[var(--border)]" />
            </motion.div>

            {/* Direct Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              {/* Email Button */}
              <Link
                href="mailto:phal.vihaan@gmail.com"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg
                  border border-[var(--border)] text-[var(--foreground)]
                  hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/5
                  transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
                <span className="font-plex-mono text-sm">phal.vihaan@gmail.com</span>
                <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
              </Link>

              {/* Social Links */}
              <div className="flex items-center justify-center gap-3 mt-6">
                {SOCIAL_LINKS.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="p-3 rounded-lg border border-[var(--border)]
                      text-[var(--foreground)]/50 hover:text-[var(--foreground)]
                      hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/5
                      transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </Link>
                ))}
              </div>

              {/* Response time */}
              <p className="mt-8 font-plex-mono text-xs text-[var(--foreground)]/40">
                Usually responds within 24 hours
              </p>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}
