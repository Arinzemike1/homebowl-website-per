"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, useSyncExternalStore } from "react";

export const ease = [0.22, 1, 0.36, 1] as const;
const inOut = [0.65, 0, 0.35, 1] as const;

/** Live media-query match; false during SSR and the first client render. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

type Trigger = "mount" | "inView";

function play(trigger: Trigger, to: Record<string, string | number>) {
  return trigger === "mount"
    ? { animate: to }
    : { whileInView: to, viewport: { once: true, amount: 0.5 } };
}

/** Headline lines that slide up out of a mask, one after another. */
export function LineReveal({
  lines,
  as: Tag = "div",
  className = "",
  lineClassName = "",
  delay = 0,
  stagger = 0.1,
  trigger = "inView",
}: {
  lines: React.ReactNode[];
  as?: "h1" | "h2" | "h3" | "p" | "div" | "span";
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  trigger?: Trigger;
}) {
  // The observer sits on the mask, not the line: a line that starts fully clipped
  // never registers as "in view", so the trigger has to live on the untransformed wrapper.
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <motion.span
          key={i}
          className="-mt-[0.06em] block overflow-hidden pt-[0.06em]"
          initial="hidden"
          {...(trigger === "mount"
            ? { animate: "show" }
            : { whileInView: "show", viewport: { once: true, amount: 0.5 } })}
        >
          <motion.span
            className={`block ${lineClassName}`}
            variants={{ hidden: { y: "115%" }, show: { y: "0%" } }}
            transition={{ duration: 1.1, ease, delay: delay + i * stagger }}
          >
            {line}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  );
}

/** Script accent word that is "written" left-to-right. */
export function ScriptWord({
  children,
  className = "",
  gradient = true,
  delay = 0,
  trigger = "inView",
}: {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
  delay?: number;
  trigger?: Trigger;
}) {
  // Chrome's IntersectionObserver honours the target's own clip-path, so a fully
  // clipped word would never count as visible — observe an unclipped wrapper instead.
  return (
    <motion.span
      className={`inline-block ${className}`}
      initial="hidden"
      {...(trigger === "mount"
        ? { animate: "show" }
        : { whileInView: "show", viewport: { once: true, amount: 0.5 } })}
    >
      <motion.span
        className={`script ${gradient ? "script-gradient" : ""} block`}
        variants={{
          hidden: { clipPath: "inset(-30% 100% -40% -10%)" },
          show: { clipPath: "inset(-30% -10% -40% -10%)" },
        }}
        transition={{ duration: 1.5, ease: inOut, delay }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

export function FadeUp({
  children,
  className = "",
  delay = 0,
  y = 32,
  trigger = "inView",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  trigger?: Trigger;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      {...play(trigger, { opacity: 1, y: 0 })}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Pill button that leans toward the cursor and floods with colour on hover. */
export function MagneticLink({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "dark" | "outline";
  className?: string;
  external?: boolean;
}) {
  const x = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 });

  const styles = {
    primary: "bg-tangerine text-espresso-950 [--fill:var(--color-ivory)]",
    ghost:
      "border border-ivory/35 text-ivory [--fill:var(--color-ivory)] hover:text-espresso-950",
    dark: "bg-espresso-900 text-ivory [--fill:var(--color-tangerine)] hover:text-espresso-950",
    outline:
      "border border-espresso-900/25 text-espresso-900 [--fill:var(--color-espresso-900)] hover:text-ivory",
  }[variant];

  return (
    <motion.a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      style={{ x, y }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.22);
        y.set((e.clientY - r.top - r.height / 2) * 0.35);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-4 text-[15px] font-semibold tracking-tight transition-colors duration-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tangerine ${styles} ${className}`}
    >
      <span
        aria-hidden
        className="absolute inset-0 translate-y-[101%] rounded-full bg-(--fill) transition-transform duration-500 ease-(--ease-premium) group-hover:translate-y-0"
      />
      <span className="relative">{children}</span>
      <span className="relative grid size-5 place-items-center overflow-hidden">
        <ArrowUpRight
          size={17}
          className="transition-transform duration-500 ease-(--ease-premium) group-hover:translate-x-5 group-hover:-translate-y-5"
        />
        <ArrowUpRight
          size={17}
          className="absolute -translate-x-5 translate-y-5 transition-transform duration-500 ease-(--ease-premium) group-hover:translate-x-0 group-hover:translate-y-0"
        />
      </span>
    </motion.a>
  );
}

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/** Infinite ticker that speeds up and flips direction with scroll velocity. */
export function Marquee({
  children,
  baseVelocity = -3,
  className = "",
}: {
  children: React.ReactNode;
  baseVelocity?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), {
    damping: 50,
    stiffness: 400,
  });
  const factor = useTransform(velocity, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    moveBy += direction.current * moveBy * f;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div className="flex w-max" style={{ x }}>
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden inert>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
