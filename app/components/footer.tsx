"use client";

import React from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Globe } from "@/components/ui/globe";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="
        w-full overflow-hidden
        bg-[var(--background)] text-[var(--foreground)]
        border-t border-[var(--border)]
      "
    >
      <div className="mx-auto max-w-7xl pb-4 px-4 sm:px-6 lg:px-8 font-serif">
        {/* Main row (slightly tighter) */}
        <div
          className="
            grid grid-cols-1 gap-10 md:grid-cols-12
            pb-10 sm:pb-14 items-center
          "
        >
          {/* Left content */}
          <div className="md:col-span-7 lg:col-span-6">
            <h1 className="font-display text-3xl tracking-tight sm:text-4xl">
              Vihaan Phal
            </h1>

            <p className="mt-3 max-w-prose text-balance text-[15px] leading-7 opacity-90 ">
              Full-stack engineer crafting fast, elegant products. Available for
              innovative teams and ambitious ideas.
            </p>

            {/* CTAs */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href="mailto:phal.vihaan@gmail.com"
                className="  
                  inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm
                  bg-[var(--accent)] text-[var(--accent-foreground)]
                  border border-[color-mix(in_oklab,var(--accent)_70%,var(--border)_30%)]
                  transition-colors
                  hover:bg-[color-mix(in_oklab,var(--accent)_86%,black_14%)]
                  focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/35
                "
              >
                <Mail className="size-4" />
                phal.vihaan@gmail.com
              </Link>
            </div>

            {/* Meta tiles */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[var(--border)]/70 p-4">
                <div className="text-xs uppercase tracking-wide opacity-70">
                  Currently
                </div>
                <div className="mt-1 text-sm">
                  Building AI products & compliance-tech
                </div>
              </div>
              <div className="rounded-2xl border border-[var(--border)]/70 p-4">
                <div className="text-xs uppercase tracking-wide opacity-70">
                  Location
                </div>
                <div className="mt-1 text-sm">
                  Open to remote & hybrid roles
                </div>
              </div>
            </div>
          </div>

          {/* Right: interactive globe, right-centered; size clamps to content/viewport */}
          <div className="md:col-span-5 lg:col-span-6 flex items-center justify-end">
            <div
              className="
                relative
                h-[clamp(280px,38vh,540px)] w-[clamp(280px,38vh,540px)]
                [filter:drop-shadow(0_18px_90px_rgba(0,0,0,0.10))]
                dark:[filter:drop-shadow(0_18px_90px_rgba(0,0,0,0.38))]
                cursor-grab active:cursor-grabbing
              "
              style={{ pointerEvents: "auto" }}
            >
              <Globe />
            </div>
          </div>
        </div>

        {/* Bottom bar (slightly tighter) */}
        <div className="border-t border-[var(--border)] pt-5 pb-8 sm:pb-10">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-sm opacity-80">
              © {year} Vihaan Phal. All rights reserved.
            </div>
            <nav className="flex flex-wrap items-center gap-5 text-sm opacity-90">
              <Link
                href="#projects"
                className="hover:underline underline-offset-4"
              >
                Projects
              </Link>
              <Link
                href="#about"
                className="hover:underline underline-offset-4"
              >
                About
              </Link>
              <Link
                href="#contact"
                className="hover:underline underline-offset-4"
              >
                Contact
              </Link>
              <Link
                href="/resume.pdf"
                target="_blank"
                className="hover:underline underline-offset-4"
              >
                Resume
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
