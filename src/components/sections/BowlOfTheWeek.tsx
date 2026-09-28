"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import Patch from "@/components/ui/Patch";
import { BinderClip } from "@/components/ui/decor";
import {
  FadeUp,
  LineReveal,
  MagneticLink,
  ScriptWord,
  ease,
} from "@/components/ui/motion";
import { site } from "@/lib/site";

const bowls = [
  {
    key: "this",
    label: "This week",
    dish: "Egusi soup & assorted meat",
    image: "/images/food/egusi.png",
    chef: "Cynthia Morgana",
    story:
      "Rich, hearty and slow-cooked the way it should be: ground melon seeds, leafy greens and assorted meat in a deep, peppery stew.",
    notes: ["Ground melon seed", "Assorted meat", "Leafy greens", "Palm oil"],
  },
  {
    key: "last",
    label: "Last week",
    dish: "Stir-fried spaghetti",
    image: "/images/food/spaghetti.png",
    chef: "Cynthia Morgana",
    story:
      "Smoky, saucy spaghetti tossed with sweet peppers and spring onions. The kind of weeknight bowl you finish before it cools.",
    notes: ["Sweet peppers", "Spring onions", "Spicy tomato base"],
  },
];

export default function BowlOfTheWeek() {
  const ref = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const bowl = bowls[index];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const spin = useTransform(scrollYProgress, [0, 1], [-70, 70]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.5, 1.25]);

  return (
    <section
      id="bowl-of-the-week"
      ref={ref}
      className="relative overflow-hidden bg-espresso-950 px-5 py-28 text-ivory sm:px-8 lg:py-36"
    >
      {/* Blurred close-up of the dish as the backdrop (post 3) */}
      <motion.div
        aria-hidden
        style={{ scale: bgScale }}
        className="absolute inset-0"
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={bowl.key}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={bowl.image}
              alt=""
              fill
              sizes="100vw"
              className="object-cover blur-2xl brightness-[0.62] saturate-[1.2]"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(80%_70%_at_30%_50%,transparent,rgba(26,13,7,0.75))]"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[0.95fr_1.05fr]">
        {/* Ticket */}
        <div className="relative mx-auto w-full max-w-[440px] pt-14">
          <BinderClip className="absolute left-1/2 top-0 z-20 w-24 -translate-x-1/2 sm:w-28" />
          <motion.div
            initial={{ rotate: -14, y: -60, opacity: 0 }}
            whileInView={{ rotate: 0, y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              type: "spring",
              stiffness: 70,
              damping: 7,
              mass: 1.1,
            }}
            style={{ transformOrigin: "50% 0%" }}
            className="drop-shadow-[0_40px_50px_rgba(8,3,1,0.55)]"
          >
            <div className="ticket bg-paper px-7 pb-12 pt-24 text-center sm:px-10">
              {/* "BOWL" / "of the" / "Week" lock-up from the posts; --s is the BOWL size */}
              <p
                className="relative mx-auto w-fit text-left [--s:4.2rem] sm:[--s:5.6rem]"
                style={{ paddingBottom: "calc(var(--s) * 0.62)" }}
              >
                <span
                  className="display block uppercase text-[#4b3427]"
                  style={{ fontSize: "var(--s)" }}
                >
                  Bowl
                </span>
                <span
                  className="absolute font-display text-[0.9rem] font-semibold uppercase tracking-wide text-[#4b3427]"
                  style={{ top: "calc(var(--s) * 0.95)", left: "0.2rem" }}
                >
                  of the
                </span>
                <span
                  className="script absolute text-ember"
                  style={{
                    fontSize: "var(--s)",
                    top: "calc(var(--s) * 0.45)",
                    left: "calc(var(--s) * 0.7)",
                  }}
                >
                  Week
                </span>
              </p>

              <div className="relative mx-auto mt-4 aspect-square w-[82%]">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={bowl.key}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.6, rotate: 90 }}
                    transition={{ duration: 0.8, ease }}
                  >
                    <motion.div
                      style={{ rotate: spin }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={bowl.image}
                        alt={bowl.dish}
                        fill
                        sizes="(min-width: 1024px) 360px, 70vw"
                        className="object-contain drop-shadow-[0_18px_22px_rgba(60,30,10,0.35)]"
                      />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Chef credit */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 14,
              delay: 0.6,
            }}
            className="absolute -bottom-10 -right-2 flex flex-col items-center sm:-right-10"
          >
            <span className="relative block size-24 overflow-hidden rounded-full ring-[5px] ring-[#d64200] sm:size-28">
              <Image
                src="/images/chefs/cynthia-morgana.png"
                alt="Chef Cynthia Morgana"
                fill
                sizes="112px"
                className="object-cover"
              />
            </span>
            <span className="mt-2 text-center text-[11px] font-medium uppercase tracking-wider text-ivory/80">
              Made by
            </span>
            <span className="text-center text-sm font-bold uppercase tracking-wide">
              {bowl.chef}
            </span>
          </motion.div>
          <Patch
            kind="fish"
            className="absolute -left-10 top-[38%] w-24 -rotate-6"
          />
          <Patch
            kind="tomato"
            className="absolute -left-4 bottom-8 w-14 rotate-6"
          />
        </div>

        {/* Copy */}
        <div>
          <FadeUp>
            <p className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.25em] text-tangerine">
              <span className="h-px w-10 bg-tangerine" /> Weekly spotlight
            </p>
          </FadeUp>
          <h2 className="mt-6 text-[clamp(2.6rem,5.6vw,5.2rem)]">
            <LineReveal
              as="span"
              className="display block uppercase"
              lines={["Every week,", "one bowl"]}
            />
            <ScriptWord
              className="-mt-[0.15em] block text-[1.3em]"
              delay={0.35}
            >
              steals the show
            </ScriptWord>
          </h2>

          <div
            role="tablist"
            aria-label="Bowl of the Week"
            className="mt-8 inline-flex rounded-full bg-ivory/10 p-1 ring-1 ring-ivory/15 backdrop-blur"
          >
            {bowls.map((b, i) => (
              <button
                key={b.key}
                role="tab"
                aria-selected={index === i}
                onClick={() => setIndex(i)}
                className="relative rounded-full px-5 py-2 text-[14px] font-semibold"
              >
                {index === i && (
                  <motion.span
                    layoutId="botw-pill"
                    className="absolute inset-0 rounded-full bg-tangerine"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span
                  className={`relative ${index === i ? "text-espresso-950" : "text-ivory/75"}`}
                >
                  {b.label}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-8 min-h-[210px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={bowl.key}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease }}
              >
                <h3
                  className="font-display text-3xl font-bold"
                  style={{ fontVariationSettings: '"SOFT" 100' }}
                >
                  {bowl.dish}
                </h3>
                <p className="mt-3 max-w-lg text-lg leading-relaxed text-ivory/75">
                  {bowl.story}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {bowl.notes.map((n) => (
                    <li
                      key={n}
                      className="rounded-full bg-ivory/10 px-3.5 py-1.5 text-[13px] text-ivory/85 ring-1 ring-ivory/10"
                    >
                      {n}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          <FadeUp delay={0.2} className="mt-8">
            <MagneticLink href={site.socials[0].href} external>
              Catch next week&apos;s pick on Instagram
            </MagneticLink>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
