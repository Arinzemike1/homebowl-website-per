"use client";

import { motion } from "framer-motion";
import { useId } from "react";
import { site } from "@/lib/site";

/** Black binder clip that pins the "Bowl of the Week" ticket. */
export function BinderClip({ className = "" }: { className?: string }) {
  const id = `clip${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox="0 0 120 150" className={className} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#3a3431" />
          <stop offset=".18" stopColor="#141110" />
          <stop offset="1" stopColor="#0b0908" />
        </linearGradient>
      </defs>
      <path
        d="M36 92C31 58 34 12 60 12s29 46 24 80"
        fill="none"
        stroke="#161312"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <path
        d="M36 92C31 58 34 12 60 12s29 46 24 80"
        fill="none"
        stroke="#5a524d"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity=".7"
      />
      <path
        d="M46 92c-2-22 0-52 14-52s16 30 14 52"
        fill="none"
        stroke="#161312"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d="M12 84h96l-7 58H19Z" fill={`url(#${id})`} />
      <path d="M14 86h92" stroke="#6e6560" strokeWidth="1.5" opacity=".6" />
      <rect x="28" y="84" width="10" height="6" rx="2" fill="#0b0908" />
      <rect x="82" y="84" width="10" height="6" rx="2" fill="#0b0908" />
    </svg>
  );
}

/** Drifting warm lamp-light orbs for the espresso sections. */
export function Bokeh({ className = "" }: { className?: string }) {
  const orbs = [
    {
      size: 280,
      x: "78%",
      y: "12%",
      color: "rgba(255, 226, 170, 0.55)",
      d: 16,
    },
    { size: 520, x: "8%", y: "22%", color: "rgba(196, 150, 110, 0.22)", d: 22 },
    { size: 440, x: "62%", y: "70%", color: "rgba(214, 110, 40, 0.20)", d: 19 },
    {
      size: 160,
      x: "28%",
      y: "76%",
      color: "rgba(255, 200, 150, 0.18)",
      d: 13,
    },
  ];
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {orbs.map((o, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            width: o.size,
            height: o.size,
            left: o.x,
            top: o.y,
            translateX: "-50%",
            translateY: "-50%",
            background: `radial-gradient(circle, ${o.color} 0%, transparent 68%)`,
          }}
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.08, 0.96, 1],
          }}
          transition={{ duration: o.d, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function AppleIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M16.37 12.62c-.02-2.17 1.78-3.22 1.86-3.27-1.02-1.49-2.6-1.69-3.15-1.71-1.34-.14-2.62.79-3.3.79-.68 0-1.73-.77-2.84-.75-1.46.02-2.81.85-3.56 2.16-1.52 2.63-.39 6.53 1.09 8.67.72 1.05 1.58 2.22 2.71 2.18 1.09-.04 1.5-.7 2.82-.7 1.31 0 1.69.7 2.84.68 1.17-.02 1.91-1.07 2.63-2.12.83-1.21 1.17-2.39 1.19-2.45-.03-.01-2.28-.88-2.3-3.48ZM14.2 6.25c.6-.73 1.01-1.74.9-2.75-.87.04-1.92.58-2.54 1.3-.56.64-1.05 1.67-.92 2.66.97.08 1.96-.49 2.56-1.21Z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="20" height="22" viewBox="0 0 20 22" aria-hidden>
      <path
        d="M1 1.2 11.4 11 1 20.8c-.4-.2-.6-.6-.6-1.1V2.3c0-.5.2-.9.6-1.1Z"
        fill="#00d7fe"
      />
      <path d="m14.8 7.6-3.4 3.4L1 1.2c.3-.2.8-.2 1.2 0Z" fill="#00f076" />
      <path d="M14.8 14.4 2.2 21c-.4.2-.9.2-1.2-.2L11.4 11Z" fill="#ff3a44" />
      <path
        d="m18.6 9.6-3.8-2L11.4 11l3.4 3.4 3.8-2.1c1-.6 1-2.1 0-2.7Z"
        fill="#ffc800"
      />
    </svg>
  );
}

/** App Store / Google Play badges. Without a URL they render as "Coming soon". */
export function StoreBadges({ tone = "light" }: { tone?: "light" | "dark" }) {
  const stores = [
    {
      name: "App Store",
      pre: "Download on the",
      href: site.appStoreUrl,
      icon: <AppleIcon />,
    },
    {
      name: "Google Play",
      pre: "Get it on",
      href: site.playStoreUrl,
      icon: <PlayIcon />,
    },
  ];
  const base =
    tone === "light"
      ? "border-ivory/20 bg-ivory/5 text-ivory hover:bg-ivory/12"
      : "border-espresso-900/15 bg-espresso-900 text-ivory hover:bg-espresso-800";

  return (
    <div className="flex flex-wrap gap-3">
      {stores.map((s) => {
        const inner = (
          <>
            {s.icon}
            <span className="text-left leading-tight">
              <span className="block text-[10px] opacity-70">
                {s.href ? s.pre : "Coming soon to"}
              </span>
              <span className="block text-[15px] font-semibold">{s.name}</span>
            </span>
          </>
        );
        const cls = `flex items-center gap-3 rounded-2xl border px-4 py-2.5 transition-colors ${base}`;
        return s.href ? (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cls}
          >
            {inner}
          </a>
        ) : (
          <span
            key={s.name}
            className={`${cls} cursor-default`}
            aria-label={`${s.name} — coming soon`}
          >
            {inner}
          </span>
        );
      })}
    </div>
  );
}

/** Loose marker circle, drawn on when scrolled into view. */
export function ScribbleCircle({
  className = "",
  color = "#c65d07",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 300 140"
      preserveAspectRatio="none"
      className={className}
      fill="none"
      aria-hidden
    >
      <motion.path
        d="M160 18C92 10 22 34 14 72c-8 40 70 60 150 54 74-6 128-34 118-68-9-30-80-44-150-38-22 2-42 6-58 12"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
      />
    </svg>
  );
}

/** Hand-drawn arrow, drawn on when scrolled into view. */
export function ScribbleArrow({
  className = "",
  color = "#386641",
  delay = 0.4,
}: {
  className?: string;
  color?: string;
  delay?: number;
}) {
  return (
    <svg viewBox="0 0 340 120" className={className} fill="none" aria-hidden>
      <motion.path
        d="M6 14c50 20 110 44 170 60 46 12 94 20 150 26"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1], delay }}
      />
      <motion.path
        d="M290 74l38 26-44 14"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: delay + 1 }}
      />
    </svg>
  );
}
