"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { BadgeCheck, Flame, House, Star } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import Patch from "@/components/ui/Patch";
import { FadeUp } from "@/components/ui/motion";

type Token = { w: string; em?: boolean } | { img: string };

const copy: Token[] = [
  ..."The best food in your city isn't on a restaurant menu. It's simmering"
    .split(" ")
    .map((w) => ({ w })),
  { img: "/images/food/egusi.png" },
  { w: "in" },
  { w: "a" },
  { w: "home", em: true },
  { w: "kitchen", em: true },
  ..."down the road, made by someone who cooks like"
    .split(" ")
    .map((w) => ({ w })),
  { w: "family.", em: true },
  ..."HomeBowl brings those kitchens".split(" ").map((w) => ({ w })),
  { img: "/images/food/spaghetti.png" },
  ..."and the chefs behind them straight to you."
    .split(" ")
    .map((w) => ({ w })),
];

const pillars = [
  {
    icon: House,
    title: "Real home kitchens",
    text: "Every bowl is cooked by a home chef in their own kitchen, not on a factory line.",
  },
  {
    icon: BadgeCheck,
    title: "Chefs you can trust",
    text: "Look for the verified badge, read their reviews and see what they cook before you order.",
  },
  {
    icon: Flame,
    title: "Cooked to order",
    text: "Your meal is made fresh when you order it, not reheated from yesterday's batch.",
  },
  {
    icon: Star,
    title: "Honest reviews",
    text: "Ratings from real orders help you find your next favourite, and help great cooks get found.",
  },
];

function Word({
  progress,
  range,
  token,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  token: Token;
}) {
  const opacity = useTransform(progress, range, [0.13, 1]);
  const scale = useTransform(progress, range, [0.4, 1]);
  const rotate = useTransform(progress, [range[0], 1], [-40, 120]);

  if ("img" in token) {
    return (
      <motion.span
        style={{ scale }}
        className="relative mx-[0.12em] inline-block h-[0.86em] w-[1.7em] translate-y-[0.1em] overflow-hidden rounded-full bg-espresso-900 align-baseline"
      >
        <motion.span style={{ rotate }} className="absolute inset-[-40%] block">
          <Image
            src={token.img}
            alt=""
            fill
            sizes="160px"
            className="object-contain"
          />
        </motion.span>
      </motion.span>
    );
  }

  return (
    <motion.span
      style={{ opacity }}
      className={`mr-[0.24em] inline-block ${token.em ? "italic text-burnt-orange" : ""}`}
    >
      {token.w}
    </motion.span>
  );
}

export default function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
  });
  const starY = useTransform(sectionProgress, [0, 1], [80, -120]);
  const chiliY = useTransform(sectionProgress, [0, 1], [-40, 140]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="surface-paper relative overflow-hidden px-5 pb-28 pt-44 text-brown sm:px-8 lg:pb-36 lg:pt-52"
    >
      <motion.div
        style={{ y: starY }}
        className="absolute right-[6%] top-40 hidden w-20 rotate-12 md:block"
      >
        <Patch kind="star" />
      </motion.div>
      <motion.div
        style={{ y: chiliY }}
        className="absolute bottom-[38%] left-[3%] hidden w-12 -rotate-12 md:block"
      >
        <Patch kind="chili" />
      </motion.div>

      <div className="mx-auto max-w-6xl">
        <FadeUp>
          <p className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.25em] text-burnt-orange">
            <span className="h-px w-10 bg-burnt-orange" /> Why HomeBowl
          </p>
        </FadeUp>

        <p
          ref={ref}
          className="mt-8 font-display text-[clamp(2rem,4.6vw,4.3rem)] font-semibold leading-[1.08] tracking-[-0.015em]"
          style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}
        >
          {copy.map((token, i) => (
            <Word
              key={i}
              token={token}
              progress={scrollYProgress}
              range={[i / copy.length, (i + 1) / copy.length]}
            />
          ))}
        </p>

        <div className="mt-20 grid gap-x-8 gap-y-10 border-t border-brown/15 pt-12 sm:grid-cols-2 lg:mt-28 lg:grid-cols-4">
          {pillars.map(({ icon: Icon, title, text }, i) => (
            <FadeUp key={title} delay={i * 0.1}>
              <div className="group">
                <span className="grid size-12 place-items-center rounded-2xl bg-espresso-900 text-tangerine transition-transform duration-500 ease-(--ease-premium) group-hover:-rotate-6 group-hover:scale-110">
                  <Icon size={22} />
                </span>
                <h3
                  className="mt-5 font-display text-2xl font-bold"
                  style={{ fontVariationSettings: '"SOFT" 100' }}
                >
                  {title}
                </h3>
                <p className="mt-2 leading-relaxed text-brown-mid/85">{text}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
