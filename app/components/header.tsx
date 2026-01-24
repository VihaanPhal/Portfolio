"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
  { label: "Resume", href: "/resume.pdf", external: true },
];

const BRAND_COLORS = [
  "#00C853", // green
  "#06B6D4", // cyan
  "#6366F1", // indigo
  "#14B8A6", // teal
  "#3B82F6", // blue
  "#8B5CF6", // violet
  "#A3E635", // lime
  "#F59E0B", // amber
  "#F43F5E", // rose
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [brandIndex, setBrandIndex] = useState<number | null>(null);

  const nextBrandIndex = (prev: number | null) => {
    const n = BRAND_COLORS.length;
    const r = Math.floor(Math.random() * n);
    if (prev == null) return r;
    return r === prev ? (r + 1) % n : r;
  };

  const brandColor = useMemo(
    () => (brandIndex == null ? "var(--foreground)" : BRAND_COLORS[brandIndex]),
    [brandIndex]
  );

  const linkBase =
    "px-3 py-1.5 rounded-lg text-[15px] font-medium text-[var(--foreground)]/80 transition-colors";
  const linkHover =
    "hover:text-[var(--foreground)] hover:bg-black/10 dark:hover:bg-white/12 hover:ring-1 hover:ring-[var(--border)]/80 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur supports-[backdrop-filter]:bg-[color-mix(in_oklab,var(--background)_92%,transparent_8%)] hero-font">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand — Newsreader; random color each hover; shadow cast to right (light source left) */}
        <Link
          href="#home"
          aria-label="Go to home"
          onMouseEnter={() => setBrandIndex((i) => nextBrandIndex(i))}
          onFocus={() => setBrandIndex((i) => nextBrandIndex(i))}
          onMouseLeave={() => setBrandIndex(null)}
          onBlur={() => setBrandIndex(null)}
          onClick={() => setOpen(false)}
          className="select-none"
        >
          <h1
            className="text-2xl font-medium tracking-tight
              [text-shadow:2px_1px_0_rgba(0,0,0,0.10)]
              dark:[text-shadow:2px_1px_0_rgba(255,255,255,0.18)]
              transition-colors"
            style={{ color: brandColor }}
          >
            vihaanphal
          </h1>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-2 md:flex">
          {NAV_ITEMS.map(({ label, href, external }) =>
            external ? (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className={`${linkBase} ${linkHover}`}
              >
                {label} <span aria-hidden>↗</span>
              </Link>
            ) : (
              <Link
                key={label}
                href={href}
                className={`${linkBase} ${linkHover}`}
              >
                {label}
              </Link>
            )
          )}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <AnimatedThemeToggler className="size-9 rounded-full" />
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--border)] md:hidden"
            onClick={() => setOpen((s) => !s)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        className={`md:hidden overflow-hidden border-t border-[var(--border)] transition-[max-height,opacity] duration-300 ease-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map(({ label, href, external }) => (
              <li key={label}>
                {external ? (
                  <Link
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-[15px] text-[var(--foreground)]/80 transition-colors hover:text-[var(--foreground)] hover:bg-black/5 dark:hover:bg-white/10"
                  >
                    {label} <span aria-hidden>↗</span>
                  </Link>
                ) : (
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-[15px] text-[var(--foreground)]/80 transition-colors hover:text-[var(--foreground)] hover:bg-black/5 dark:hover:bg-white/10"
                  >
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
