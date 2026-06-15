"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const PLATFORM_LINKS = [
  "Material Scanner",
  "AI Recommendations",
  "Supply Chain",
  "Impact Dashboard",
  "Waste Analytics",
];

const TECH_LINKS = [
  "Machine Learning",
  "Computer Vision",
  "IoT Sensors",
  "Blockchain Ledger",
  "Edge Computing",
];

const SOCIAL_LINKS = [
  {
    label: "Twitter",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Discord",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561 19.9312 19.9312 0 005.9932 3.0294.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286 19.8975 19.8975 0 006.0023-3.0294.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Gradient top border */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #00FF88 20%, #00E5FF 50%, #00A8FF 80%, transparent 100%)",
        }}
      />

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          width: "60%",
          height: "200px",
          background:
            "radial-gradient(ellipse at center, rgba(0,255,136,0.06) 0%, transparent 70%)",
        }}
      />

      <motion.div
        className="relative mx-auto max-w-7xl px-6 pb-8 pt-20 md:px-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Top section: Logo + Newsletter */}
        <motion.div
          variants={itemVariants}
          className="mb-16 grid gap-12 md:grid-cols-2 md:items-start"
        >
          {/* Logo + Tagline */}
          <div className="max-w-md">
            <div className="mb-4 flex items-center gap-3">
              {/* Logo icon */}
              <div className="relative h-10 w-10">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#00FF88] to-[#00E5FF] opacity-20" />
                <svg
                  viewBox="0 0 32 32"
                  className="relative h-10 w-10"
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
                className="text-2xl font-bold tracking-tight"
                style={{
                  background:
                    "linear-gradient(135deg, #00FF88 0%, #00E5FF 50%, #00A8FF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                CircularAI
              </span>
            </div>
            <p className="text-base leading-relaxed" style={{ color: "#7A9E9F" }}>
              Transforming waste into opportunity through the power of artificial
              intelligence
            </p>
          </div>

          {/* Newsletter */}
          <div className="md:ml-auto md:max-w-sm">
            <h4 className="mb-2 text-sm font-semibold uppercase tracking-widest text-white">
              Stay Updated
            </h4>
            <p className="mb-4 text-sm" style={{ color: "#7A9E9F" }}>
              Get the latest on circular economy breakthroughs.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 rounded-xl border border-[rgba(0,255,136,0.12)] bg-[rgba(11,29,38,0.6)] px-4 py-3 text-sm text-white placeholder-[#7A9E9F] outline-none backdrop-blur-sm transition-all duration-300 focus:border-[rgba(0,255,136,0.4)] focus:ring-1 focus:ring-[rgba(0,255,136,0.2)]"
              />
              <button
                type="submit"
                className="shrink-0 rounded-xl px-6 py-3 text-sm font-semibold text-[#06141B] transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, #00FF88 0%, #00E5FF 100%)",
                  boxShadow: "0 0 20px rgba(0,255,136,0.2)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 0 30px rgba(0,255,136,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 0 20px rgba(0,255,136,0.2)";
                }}
              >
                {subscribed ? "✓ Sent!" : "Subscribe"}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Links grid */}
        <motion.div
          variants={itemVariants}
          className="mb-16 grid gap-12 sm:grid-cols-2 md:grid-cols-3"
        >
          {/* Platform */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white">
              Platform
            </h4>
            <ul className="flex flex-col gap-3">
              {PLATFORM_LINKS.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="group flex items-center gap-2 text-sm transition-colors duration-300"
                    style={{ color: "#7A9E9F" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "#00FF88";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "#7A9E9F";
                    }}
                  >
                    <span
                      className="inline-block h-1 w-1 rounded-full transition-all duration-300 group-hover:w-3"
                      style={{ background: "#00FF88", opacity: 0.5 }}
                    />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white">
              Technology
            </h4>
            <ul className="flex flex-col gap-3">
              {TECH_LINKS.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="group flex items-center gap-2 text-sm transition-colors duration-300"
                    style={{ color: "#7A9E9F" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "#00E5FF";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "#7A9E9F";
                    }}
                  >
                    <span
                      className="inline-block h-1 w-1 rounded-full transition-all duration-300 group-hover:w-3"
                      style={{ background: "#00E5FF", opacity: 0.5 }}
                    />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white">
              Connect
            </h4>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(0,255,136,0.1)] bg-[rgba(11,29,38,0.4)] text-[#7A9E9F] transition-all duration-300 hover:border-[rgba(0,255,136,0.3)] hover:text-[#00FF88]"
                  style={{
                    backdropFilter: "blur(10px)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      "0 0 20px rgba(0,255,136,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-2 text-sm" style={{ color: "#7A9E9F" }}>
              <a
                href="mailto:hello@circularai.com"
                className="transition-colors duration-300 hover:text-white"
              >
                hello@circularai.com
              </a>
              <span>San Francisco, CA</span>
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-between gap-4 border-t border-[rgba(0,255,136,0.08)] pt-8 md:flex-row"
        >
          <p className="text-sm" style={{ color: "#7A9E9F" }}>
            © 2025 CircularAI. Building a sustainable future.
          </p>
          <div className="flex gap-6 text-sm" style={{ color: "#7A9E9F" }}>
            <a href="#" className="transition-colors duration-300 hover:text-white">
              Privacy
            </a>
            <a href="#" className="transition-colors duration-300 hover:text-white">
              Terms
            </a>
            <a href="#" className="transition-colors duration-300 hover:text-white">
              Cookies
            </a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
