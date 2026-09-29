"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Clock, Star } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import Patch from "@/components/ui/Patch";
import { Bokeh } from "@/components/ui/decor";
import {
  FadeUp,
  MagneticLink,
  ScriptWord,
  ease,
  useMediaQuery,
} from "@/components/ui/motion";

/** Seconds to hold hero animations while the intro curtain plays. */
function useIntroDelay() {
  const [delay] = useState(() => {
    if (typeof document === "undefined") return 1.7;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return 0;
    return document.documentElement.hasAttribute("data-intro-seen")
      ? 0.15
      : 1.7;
  });
  return delay;
}

function useParallax(v: MotionValue<number>, depth: number) {
  return useTransform(v, (n) => n * depth);
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const d = useIntroDelay();
  const desktop = useMediaQuery("(min-width: 1024px)");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const visualY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const chipsY = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 18 });
  const sy = useSpring(my, { stiffness: 50, damping: 18 });
  const handX = useParallax(sx, -10);
  const handY = useParallax(sy, -8);
  const nearX = useParallax(sx, 36);
  const nearY = useParallax(sy, 28);
  const farX = useParallax(sx, 18);
  const farY = useParallax(sy, 14);

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
      className="grain surface-bokeh relative flex min-h-svh flex-col overflow-hidden text-ivory"
    >
      <Bokeh />

      {/* Copy */}
      <motion.div
        style={desktop ? { y: textY, opacity: textOpacity } : undefined}
        className="relative z-20 mx-auto w-full max-w-7xl px-5 pt-32 sm:px-8 lg:pb-28 lg:pt-32"
      >
        <FadeUp trigger="mount" delay={d} y={16}>
          <span className="inline-flex items-center gap-2 rounded-full border border-ivory/15 bg-ivory/5 px-4 py-1.5 text-[13px] font-medium tracking-wide text-ivory/80 backdrop-blur">
            <span className="size-1.5 animate-pulse rounded-full bg-tangerine" />
            Good food. Home made.
          </span>
        </FadeUp>

        <h1 className="display mt-6 text-[clamp(3.2rem,min(7.4vw,11vh),7.8rem)] uppercase">
          {["Meet", "Trusted", "Home"].map((word, i) => (
            <span key={word} className="block overflow-hidden pt-[0.05em]">
              <motion.span
                className="block"
                initial={{ y: "115%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.15, ease, delay: d + 0.05 + i * 0.1 }}
              >
                {word}
              </motion.span>
            </span>
          ))}
          <ScriptWord
            trigger="mount"
            delay={d + 0.55}
            className="relative -mt-[0.5em] ml-[0.02em] block text-[1.5em]"
          >
            Chefs
          </ScriptWord>
        </h1>

        <FadeUp trigger="mount" delay={d + 0.9} className="mt-3 max-w-lg">
          <p className="text-[17px] leading-relaxed text-ivory/75 sm:text-lg">
            HomeBowl is where home chefs create, connect and sell. Discover
            great home food, follow the chefs behind it, and find your next
            favourite bowl.
          </p>
        </FadeUp>

        <FadeUp
          trigger="mount"
          delay={d + 1.05}
          className="mt-8 flex flex-wrap gap-3"
        >
          <MagneticLink href="#download">Get the app</MagneticLink>
          <MagneticLink href="#for-chefs" variant="ghost">
            Cook with HomeBowl
          </MagneticLink>
        </FadeUp>
      </motion.div>

      {/* Hand-held bowl over the checker cloth (post 2) */}
      <motion.div
        style={desktop ? { y: visualY, scale: visualScale } : undefined}
        className="pointer-events-none relative z-10 mt-6 ml-auto aspect-[964/1040] w-[108vw] max-w-[860px] origin-bottom translate-x-[6%] sm:w-[82vw] lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:w-[45vw] lg:translate-x-[3%]"
      >
        <motion.div
          className="checker absolute bottom-0 left-[23%] h-[30%] w-[56%] origin-bottom [--cell:clamp(18px,2.4vw,34px)]"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, ease, delay: d + 0.35 }}
        />

        <motion.div className="absolute inset-0" style={{ x: handX, y: handY }}>
          <motion.div
            className="absolute inset-0"
            initial={{ y: "18%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 1.4, ease, delay: d + 0.2 }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{ y: [0, -12, 0], rotate: [0, -0.8, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: d + 1.6,
              }}
            >
              <Image
                src="/images/food/hand-jollof.png"
                alt="A hand holding a wooden bowl of jollof rice topped with grilled chicken"
                fill
                preload
                sizes="(min-width: 1024px) 47vw, 100vw"
                className="object-contain object-bottom drop-shadow-[0_30px_40px_rgba(10,4,1,0.45)]"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Sewn-on patches */}
        <motion.div
          style={{ x: nearX, y: nearY }}
          className="absolute right-[5%] top-[24%] w-[12%]"
        >
          <motion.div
            initial={{ scale: 0, rotate: -40 }}
            animate={{ scale: 1, rotate: 12 }}
            transition={{
              type: "spring",
              stiffness: 160,
              damping: 12,
              delay: d + 1.1,
            }}
          >
            <Patch kind="heart" className="w-full" />
          </motion.div>
        </motion.div>
        <motion.div
          style={{ x: farX, y: farY }}
          className="absolute left-[2%] top-[64%] w-[16%]"
        >
          <motion.div
            initial={{ scale: 0, rotate: 30 }}
            animate={{ scale: 1, rotate: -8 }}
            transition={{
              type: "spring",
              stiffness: 160,
              damping: 12,
              delay: d + 1.25,
            }}
          >
            <Patch kind="fish" className="w-full" />
          </motion.div>
        </motion.div>
        <motion.div
          style={{ x: nearX, y: nearY }}
          className="absolute bottom-[6%] left-[13%] w-[12%]"
        >
          <motion.div
            initial={{ scale: 0, rotate: 20 }}
            animate={{ scale: 1, rotate: -6 }}
            transition={{
              type: "spring",
              stiffness: 160,
              damping: 12,
              delay: d + 1.4,
            }}
          >
            <Patch kind="tomato" className="w-full" />
          </motion.div>
        </motion.div>

        {/* Floating app chips */}
        <motion.div
          style={{ y: chipsY }}
          className="absolute inset-0 hidden sm:block"
        >
          <motion.div
            style={{ x: farX, y: farY }}
            className="absolute -left-[16%] top-[15%]"
          >
            <motion.div
              initial={{ opacity: 0, x: -30, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.9, ease, delay: d + 1.3 }}
              className="flex items-center gap-3 rounded-2xl border border-ivory/15 bg-espresso-950/45 p-2.5 pr-3 shadow-2xl backdrop-blur-md"
            >
              <span className="grid size-10 place-items-center rounded-full bg-burnt-orange text-[13px] font-bold">
                BK
              </span>
              <span className="leading-tight">
                <span className="flex items-center gap-1.5 text-[13px] font-semibold">
                  Chef Bisi Kitchen
                  <span className="grid size-3.5 place-items-center rounded-full bg-forest-green-light text-[8px]">
                    ✓
                  </span>
                </span>
                <span className="flex items-center gap-1 text-[11px] text-ivory/65">
                  Lekki phase 1 ·{" "}
                  <Star size={10} className="fill-tangerine text-tangerine" />{" "}
                  4.9
                </span>
              </span>
              <span className="ml-1 rounded-lg bg-tangerine px-2.5 py-1.5 text-[11px] font-bold text-espresso-950">
                Follow
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ x: nearX, y: nearY }}
            className="absolute right-[6%] top-[4%]"
          >
            <motion.span
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease, delay: d + 1.5 }}
              className="flex items-center gap-2 rounded-full bg-ivory px-3.5 py-2 text-[12px] font-semibold text-espresso-900 shadow-2xl"
            >
              <Clock size={13} className="text-burnt-orange" /> Cooked fresh to
              order
            </motion.span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
