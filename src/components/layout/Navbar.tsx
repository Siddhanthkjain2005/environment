"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "System", href: "system" },
  { label: "AI Brain", href: "ai-brain" },
  { label: "Pipeline", href: "pipeline" },
  { label: "Impact", href: "impact" },
  { label: "Sustainability", href: "sustainability" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Show navbar after scrolling 100px
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          className="fixed top-0 left-0 right-0 z-50"
        >
          <nav className="mx-auto mt-4 max-w-7xl px-4">
            <div
              className="flex items-center justify-between rounded-2xl px-6 py-3 bg-[rgba(6,20,27,0.7)] backdrop-blur-xl border-b border-[rgba(0,255,136,0.1)]"
              style={{
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              {/* Logo */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-2 select-none"
              >
                {/* Decorative icon */}
                <div className="relative h-8 w-8">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#00FF88] to-[#00E5FF] opacity-20" />
                  <svg
                    viewBox="0 0 32 32"
                    className="relative h-8 w-8"
                    fill="none"
                  >
                    <circle
                      cx="16"
                      cy="16"
                      r="10"
                      stroke="#00FF88"
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                    />
                    <path
                      d="M16 6a10 10 0 0 1 8.66 5l-3.46 2A5 5 0 0 0 16 11V6z"
                      fill="#00FF88"
                      opacity="0.6"
                    />
                    <path
                      d="M24.66 11A10 10 0 0 1 21.2 24l-1.73-3.46A5 5 0 0 0 21 16h5.66z"
                      fill="#00E5FF"
                      opacity="0.6"
                    />
                    <path
                      d="M21.2 24A10 10 0 0 1 7.34 21l3.46-2A5 5 0 0 0 16 21v5z"
                      fill="#00A8FF"
                      opacity="0.6"
                    />
                  </svg>
                </div>
                <span
                  className="text-xl font-bold tracking-tight"
                  style={{
                    background:
                      "linear-gradient(135deg, #00FF88 0%, #00E5FF 50%, #00A8FF 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  CircularAI
                </span>
              </button>

              {/* Desktop nav */}
              <div className="hidden items-center gap-1 md:flex">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="group relative px-4 py-2 text-sm font-medium transition-colors duration-300"
                    style={{
                      color:
                        activeSection === link.href ? "#00FF88" : "#7A9E9F",
                    }}
                  >
                    {link.label}
                    {/* Active underline indicator */}
                    <span
                      className="absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 rounded-full transition-all duration-300"
                      style={{
                        width: activeSection === link.href ? "60%" : "0%",
                        background:
                          "linear-gradient(90deg, #00FF88, #00E5FF)",
                      }}
                    />
                    {/* Hover glow */}
                    <span className="absolute inset-0 rounded-lg bg-[rgba(0,255,136,0.05)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </button>
                ))}
              </div>

              {/* CTA + Mobile toggle */}
              <div className="flex items-center gap-3">
                {/* Desktop CTA */}
                <button
                  onClick={() => scrollTo("system")}
                  className="hidden rounded-full px-6 py-2 text-sm font-semibold text-[#06141B] transition-all duration-300 md:block"
                  style={{
                    background:
                      "linear-gradient(135deg, #00FF88 0%, #00E5FF 100%)",
                    boxShadow: "0 0 20px rgba(0,255,136,0.3)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      "0 0 40px rgba(0,255,136,0.5), 0 0 80px rgba(0,255,136,0.2)";
                    (e.currentTarget as HTMLButtonElement).style.transform =
                      "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      "0 0 20px rgba(0,255,136,0.3)";
                    (e.currentTarget as HTMLButtonElement).style.transform =
                      "scale(1)";
                  }}
                >
                  Explore System
                </button>

                {/* Mobile hamburger */}
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="relative flex h-10 w-10 items-center justify-center rounded-lg md:hidden"
                  aria-label="Toggle menu"
                >
                  <div className="flex w-5 flex-col items-end gap-[5px]">
                    <motion.span
                      animate={{
                        rotate: mobileOpen ? 45 : 0,
                        y: mobileOpen ? 7 : 0,
                        width: mobileOpen ? 20 : 20,
                      }}
                      className="block h-[2px] rounded-full bg-[#00FF88]"
                      style={{ width: 20 }}
                    />
                    <motion.span
                      animate={{
                        opacity: mobileOpen ? 0 : 1,
                        x: mobileOpen ? 10 : 0,
                      }}
                      className="block h-[2px] w-3.5 rounded-full bg-[#00E5FF]"
                    />
                    <motion.span
                      animate={{
                        rotate: mobileOpen ? -45 : 0,
                        y: mobileOpen ? -7 : 0,
                        width: mobileOpen ? 20 : 12,
                      }}
                      className="block h-[2px] rounded-full bg-[#00A8FF]"
                      style={{ width: 12 }}
                    />
                  </div>
                </button>
              </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
              {mobileOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                  className="mt-2 overflow-hidden rounded-2xl bg-[rgba(6,20,27,0.9)] backdrop-blur-xl border border-[rgba(0,255,136,0.1)] md:hidden"
                >
                  <div className="flex flex-col gap-1 p-4">
                    {NAV_LINKS.map((link, i) => (
                      <motion.button
                        key={link.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => scrollTo(link.href)}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors duration-200 hover:bg-[rgba(0,255,136,0.05)]"
                        style={{
                          color:
                            activeSection === link.href
                              ? "#00FF88"
                              : "#7A9E9F",
                        }}
                      >
                        <span
                          className="h-1 w-1 rounded-full"
                          style={{
                            background:
                              activeSection === link.href
                                ? "#00FF88"
                                : "rgba(122,158,159,0.4)",
                          }}
                        />
                        {link.label}
                      </motion.button>
                    ))}
                    <div className="mt-2 border-t border-[rgba(0,255,136,0.1)] pt-3">
                      <button
                        onClick={() => scrollTo("system")}
                        className="w-full rounded-xl py-3 text-sm font-semibold text-[#06141B]"
                        style={{
                          background:
                            "linear-gradient(135deg, #00FF88 0%, #00E5FF 100%)",
                        }}
                      >
                        Explore System
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
