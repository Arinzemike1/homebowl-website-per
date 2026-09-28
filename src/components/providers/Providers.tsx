"use client";

import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import { useEffect } from "react";

let lenis: Lenis | null = null;

/** The active smooth-scroll instance (null when reduced motion is on). */
export const getLenis = () => lenis;

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    lenis = new Lenis({
      autoRaf: true,
      lerp: 0.09,
      anchors: { offset: -24 },
    });
    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
