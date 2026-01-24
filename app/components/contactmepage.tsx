"use client";

import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import emailjs from "@emailjs/browser";

export default function ContactMePage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus("loading");

    // Note: You'll need to replace these with your actual EmailJS credentials
    // Get them from: https://www.emailjs.com/
    const SERVICE_ID = "YOUR_SERVICE_ID"; // Replace with your EmailJS service ID
    const TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // Replace with your EmailJS template ID
    const PUBLIC_KEY = "YOUR_PUBLIC_KEY"; // Replace with your EmailJS public key

    try {
      if (formRef.current) {
        await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
        setStatus("success");
        setStatusMessage("Message sent successfully! I'll get back to you soon.");
        // Reset form
        setFormData({ name: "", email: "", subject: "", message: "" });
        // Clear success message after 5 seconds
        setTimeout(() => {
          setStatus("idle");
          setStatusMessage("");
        }, 5000);
      }
    } catch (error) {
      setStatus("error");
      setStatusMessage("Failed to send message. Please try again or email me directly.");
      console.error("EmailJS Error:", error);
      // Clear error message after 5 seconds
      setTimeout(() => {
        setStatus("idle");
        setStatusMessage("");
      }, 5000);
    }
  };

  return (
    <section className="relative min-h-screen bg-background text-foreground py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="hero-font text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-4">
            Get in Touch
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a question or want to work together? Send me a message!
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="rounded-3xl border border-[var(--border)]/70 bg-[var(--card)]/50 backdrop-blur-sm p-8 sm:p-10 md:p-12">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-2xl border ${
                    errors.name ? "border-red-500" : "border-[var(--border)]"
                  } bg-[var(--background)]/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all duration-200`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-2xl border ${
                    errors.email ? "border-red-500" : "border-[var(--border)]"
                  } bg-[var(--background)]/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all duration-200`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              {/* Subject Field */}
              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-2xl border ${
                    errors.subject ? "border-red-500" : "border-[var(--border)]"
                  } bg-[var(--background)]/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all duration-200`}
                  placeholder="Project Inquiry"
                />
                {errors.subject && <p className="text-sm text-red-500">{errors.subject}</p>}
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-4 py-3 rounded-2xl border ${
                    errors.message ? "border-red-500" : "border-[var(--border)]"
                  } bg-[var(--background)]/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all duration-200 resize-none`}
                  placeholder="Tell me about your project or just say hi!"
                />
                {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
              </div>

              {/* Status Message */}
              {statusMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-2xl ${
                    status === "success"
                      ? "bg-green-500/10 border border-green-500/30 text-green-600"
                      : "bg-red-500/10 border border-red-500/30 text-red-600"
                  }`}
                >
                  {statusMessage}
                </motion.div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full px-8 py-4 bg-[var(--accent)] text-[var(--accent-foreground)] rounded-2xl font-medium text-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-[var(--accent)]/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{
                  background: "color-mix(in oklch, var(--accent) 100%, transparent)",
                }}
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>
            </form>

            {/* Alternative Contact Info */}
            <div className="mt-10 pt-8 border-t border-[var(--border)]/50">
              <p className="text-center text-sm text-muted-foreground">
                Or reach out directly at{" "}
                <a
                  href="mailto:vihaanphal@gmail.com"
                  className="text-[var(--accent)] hover:text-[var(--accent)]/80 font-medium transition-colors"
                >
                  vihaanphal@gmail.com
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
