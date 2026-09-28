"use client";

import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import {
  BadgeCheck,
  Camera,
  Check,
  ChefHat,
  Heart,
  Sparkles,
  Star,
  Store,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Patch from "@/components/ui/Patch";
import { Bokeh } from "@/components/ui/decor";
import {
  FadeUp,
  LineReveal,
  MagneticLink,
  ScriptWord,
} from "@/components/ui/motion";

type Card = {
  icon: typeof Store;
  title: string;
  text: string;
  tone: "paper" | "tangerine" | "forest" | "ivory";
  demo: React.ReactNode;
};

const toneClass = {
  paper: "bg-paper text-espresso-900",
  tangerine: "bg-tangerine text-espresso-950",
  forest: "bg-forest-green text-ivory",
  ivory: "bg-ivory text-espresso-900",
};

function DemoChip({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl bg-white p-3 text-[13px] text-espresso-900 shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}

const cards: Card[] = [
  {
    icon: Store,
    title: "Your kitchen, your storefront",
    text: "Set up a profile with your story, your menu and your prices: a proper home for your cooking, beyond WhatsApp statuses and DMs.",
    tone: "paper",
    demo: (
      <DemoChip>
        <span className="grid size-10 place-items-center rounded-full bg-burnt-orange font-bold text-white">
          B
        </span>
        <span className="flex-1 leading-tight">
          <b>Bisi&apos;s Kitchen</b>
          <span className="block text-[11px] text-brown-mid/70">
            Accepting orders until 9 PM
          </span>
        </span>
        <span className="relative h-6 w-11 rounded-full bg-burnt-orange">
          <span className="absolute right-0.5 top-0.5 size-5 rounded-full bg-white" />
        </span>
      </DemoChip>
    ),
  },
  {
    icon: Camera,
    title: "Post what you cook",
    text: "Share the sizzle: behind-the-scenes, plates and specials. Every post gives foodies one more reason to crave your food.",
    tone: "tangerine",
    demo: (
      <div className="grid grid-cols-3 gap-2">
        {[
          "/images/food/egusi.png",
          "/images/food/spaghetti.png",
          "/images/food/egusi.png",
        ].map((src, i) => (
          <span
            key={i}
            className="relative aspect-square overflow-hidden rounded-xl bg-espresso-900 shadow-lg"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="96px"
              className={`object-cover ${i === 2 ? "scale-150" : "scale-125"}`}
            />
            {i === 0 && (
              <span className="absolute bottom-1 left-1 flex items-center gap-0.5 rounded-full bg-white/90 px-1.5 py-0.5 text-[9px] font-bold">
                <Heart size={8} className="fill-tomato text-tomato" /> 248
              </span>
            )}
          </span>
        ))}
      </div>
    ),
  },
  {
    icon: Users,
    title: "Build a loyal following",
    text: "Foodies follow your kitchen and see your new meals on their feed, so every post can bring in your next order.",
    tone: "forest",
    demo: (
      <DemoChip>
        <span className="flex -space-x-2">
          {["#c65d07", "#8a5a3b", "#386641", "#f78822"].map((c) => (
            <span
              key={c}
              className="size-8 rounded-full ring-2 ring-white"
              style={{ background: c }}
            />
          ))}
        </span>
        <span className="leading-tight">
          <b>Tolani and 3 others</b>
          <span className="block text-[11px] text-brown-mid/70">
            started following you
          </span>
        </span>
      </DemoChip>
    ),
  },
  {
    icon: ChefHat,
    title: "Take orders with ease",
    text: "Orders come straight to you. Accept, cook and keep customers updated, all from one place.",
    tone: "ivory",
    demo: (
      <DemoChip className="flex-wrap">
        <span className="flex-1 leading-tight">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-burnt-orange">
            New order
          </span>
          <b className="block">Egusi soup &amp; assorted meat</b>
          <span className="text-[11px] text-brown-mid/70">
            Note: extra pepper, please!
          </span>
        </span>
        <span className="flex items-center gap-1 rounded-lg bg-burnt-orange px-3 py-2 text-[12px] font-semibold text-white">
          <Check size={13} /> Accept
        </span>
      </DemoChip>
    ),
  },
  {
    icon: BadgeCheck,
    title: "Earn trust, collect reviews",
    text: "Verified badges and honest reviews help new customers choose you with confidence.",
    tone: "paper",
    demo: (
      <DemoChip>
        <span className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={18}
              className="fill-burnt-orange text-burnt-orange"
            />
          ))}
        </span>
        <span className="ml-auto flex items-center gap-1 rounded-full bg-forest-green px-2.5 py-1 text-[11px] font-semibold text-white">
          <BadgeCheck size={12} /> Verified
        </span>
      </DemoChip>
    ),
  },
  {
    icon: Sparkles,
    title: "Get in the spotlight",
    text: "Standout dishes get featured as HomeBowl’s Bowl of the Week, in front of the whole community.",
    tone: "tangerine",
    demo: (
      <div className="ticket mx-auto w-44 bg-paper px-4 pb-5 pt-5 text-center text-espresso-900 shadow-lg">
        <span className="display block text-3xl uppercase">Bowl</span>
        <span className="script -mt-1 block text-[1.9rem] text-ember">
          of the Week
        </span>
      </div>
    ),
  },
];

function FeatureCard({ card, index }: { card: Card; index: number }) {
  const Icon = card.icon;
  return (
    <motion.article
      whileHover={{ y: -10, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className={`relative flex h-[470px] w-[300px] shrink-0 snap-center flex-col justify-between rounded-[2rem] p-7 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)] sm:w-[340px] ${toneClass[card.tone]}`}
      style={{ rotate: index % 2 ? 1.5 : -1.5 }}
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="grid size-12 place-items-center rounded-2xl bg-espresso-950/10">
            <Icon size={22} />
          </span>
          <span className="display text-4xl opacity-25">0{index + 1}</span>
        </div>
        <h3 className="display mt-6 text-[1.9rem] leading-[0.95]">
          {card.title}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed opacity-80">
          {card.text}
        </p>
      </div>
      <div>{card.demo}</div>
    </motion.article>
  );
}

export default function ForChefs() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [desktop, setDesktop] = useState(false);
  const distance = useMotionValue(0);
  const [height, setHeight] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(
    [scrollYProgress, distance],
    ([p, d]: number[]) => -p * d,
  );
  const bar = useTransform(scrollYProgress, [0, 1], [0.04, 1]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const measure = () => {
      setDesktop(mq.matches);
      const track = trackRef.current;
      if (!track) return;
      const d = Math.max(0, track.scrollWidth - window.innerWidth);
      distance.set(d);
      setHeight(window.innerHeight + d);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    mq.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
    };
  }, [distance]);

  return (
    <section id="for-chefs" className="grain surface-bokeh relative text-ivory">
      <Bokeh />
      <div
        ref={pinRef}
        style={desktop && height ? { height } : undefined}
        className="relative"
      >
        <div className="flex flex-col justify-center py-24 lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden lg:py-0">
          <motion.div
            ref={trackRef}
            style={desktop ? { x } : undefined}
            className="flex snap-x snap-mandatory scroll-px-5 items-center gap-6 overflow-x-auto px-5 pb-8 pt-4 sm:scroll-px-8 [scrollbar-width:none] sm:px-8 lg:w-max lg:snap-none lg:overflow-visible lg:px-[max(2rem,calc((100vw_-_80rem)/2_+_2rem))] lg:pb-0"
          >
            {/* Intro panel */}
            <div className="relative w-[86vw] max-w-[560px] shrink-0 snap-start pr-6 lg:w-[560px]">
              <FadeUp>
                <p className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.25em] text-tangerine">
                  <span className="h-px w-10 bg-tangerine" /> For home chefs
                </p>
              </FadeUp>
              <h2 className="mt-6 text-[clamp(3.4rem,7vw,6.6rem)]">
                <LineReveal
                  as="span"
                  className="display block uppercase"
                  lines={["Create", "Cook"]}
                />
                <ScriptWord
                  className="-mt-[0.42em] block text-[1.55em]"
                  delay={0.3}
                >
                  Inspire
                </ScriptWord>
              </h2>
              <FadeUp delay={0.2} className="mt-5">
                <p className="max-w-md text-lg leading-relaxed text-ivory/75">
                  Your kitchen is your canvas. Create your content. Cook what
                  you love. Inspire your community, and turn the food people
                  love into orders.
                </p>
              </FadeUp>
              <FadeUp delay={0.3} className="mt-8">
                <MagneticLink href="#download">
                  Start cooking on HomeBowl
                </MagneticLink>
              </FadeUp>
              <p className="mt-8 hidden items-center gap-2 text-[12px] uppercase tracking-[0.25em] text-ivory/45 lg:flex">
                Keep scrolling <span aria-hidden>→</span>
              </p>
              <Patch
                kind="heart"
                className="absolute -top-6 right-10 w-14 rotate-12"
              />
            </div>

            {cards.map((card, i) => (
              <FeatureCard key={card.title} card={card} index={i} />
            ))}

            {/* Closing card */}
            <div className="relative flex h-[470px] w-[300px] shrink-0 snap-center flex-col items-start justify-end overflow-hidden rounded-[2rem] bg-espresso-950 p-7 ring-1 ring-ivory/10 sm:w-[340px]">
              <div className="checker absolute inset-x-0 top-0 h-40 opacity-90 [--cell:28px]" />
              <Patch
                kind="tomato"
                className="absolute right-6 top-28 w-16 rotate-6"
              />
              <p className="script script-gradient text-6xl">Your kitchen</p>
              <p className="display -mt-2 text-4xl uppercase">is ready.</p>
              <p className="mt-3 text-[15px] leading-relaxed text-ivory/70">
                Get the app, set up your kitchen in a few steps and share your
                first bowl.
              </p>
              <a
                href="#download"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-tangerine px-5 py-3 text-[14px] font-semibold text-espresso-950 transition-colors hover:bg-ivory"
              >
                Get the app →
              </a>
            </div>
          </motion.div>

          <div className="mx-auto mt-10 hidden h-[3px] w-[min(420px,60vw)] overflow-hidden rounded-full bg-ivory/10 lg:block">
            <motion.span
              className="block h-full origin-left rounded-full bg-tangerine"
              style={{ scaleX: bar }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
