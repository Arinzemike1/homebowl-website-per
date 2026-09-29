"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Patch from "@/components/ui/Patch";
import {
  ChefProfileScreen,
  HomeScreen,
  OrderScreen,
  Phone,
  ScreenSwap,
} from "@/components/ui/Phone";
import { FadeUp, LineReveal, ScriptWord, ease } from "@/components/ui/motion";

const steps = [
  {
    title: "Discover",
    lead: "Home chefs, right around the corner.",
    text: "Explore what’s cooking near you: soups and stews, rice dishes, grills and suya, small chops. Real food from real kitchens in your area.",
    tags: ["Soups & Stews", "Rice Dishes", "Grills & Suya", "Small chops"],
  },
  {
    title: "Follow",
    lead: "Get to know the chef behind the food.",
    text: "Every kitchen has a profile with posts, meals and honest reviews. Found your fave chef? Follow them, and their new bowls land straight on your feed.",
    tags: ["Posts", "Meals", "Reviews"],
  },
  {
    title: "Order",
    lead: "From their pot to your plate.",
    text: "Order straight from the chef, leave a note if you like it extra spicy, and track your bowl from the moment it hits the fire.",
    tags: ["Notes for the chef", "Live order status"],
  },
];

/** Chef profile that "taps" Follow a moment after it appears. */
function FollowDemo() {
  const [following, setFollowing] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setFollowing(true), 1300);
    return () => clearTimeout(t);
  }, []);
  return <ChefProfileScreen following={following} />;
}

function Screen({ index }: { index: number }) {
  if (index === 0) return <HomeScreen />;
  if (index === 1) return <FollowDemo />;
  return <OrderScreen step={1} />;
}

function PhoneStage({ active }: { active: number }) {
  return (
    <div className="relative grid place-items-center">
      <div
        aria-hidden
        className="absolute size-[440px] rounded-full bg-tangerine/20 blur-3xl"
      />
      <motion.div
        aria-hidden
        className="absolute size-[560px] rounded-full border-2 border-dashed border-ivory/12"
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />
      <div className="checker absolute -bottom-6 left-1/2 h-24 w-[380px] -translate-x-1/2 rounded-sm [--cell:24px]" />
      <Phone className="relative -rotate-3">
        <ScreenSwap screenKey={String(active)}>
          <Screen index={active} />
        </ScreenSwap>
      </Phone>
      <Patch kind="heart" className="absolute -right-2 top-16 w-16 rotate-12" />
      <Patch
        kind="tomato"
        className="absolute -left-4 bottom-24 w-14 -rotate-12"
      />
    </div>
  );
}

function StepBlock({
  index,
  active,
  onActive,
}: {
  index: number;
  active: boolean;
  onActive: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive();
  }, [inView, onActive]);
  const step = steps[index];

  return (
    <div ref={ref} className="flex min-h-[78vh] flex-col justify-center">
      <motion.div
        animate={{ opacity: active ? 1 : 0.28 }}
        transition={{ duration: 0.5 }}
      >
        <span className="display text-[5.5rem] text-transparent [-webkit-text-stroke:1.5px_var(--color-tangerine)]">
          0{index + 1}
        </span>
        <h3 className="display mt-2 text-6xl uppercase">{step.title}</h3>
        <p className="mt-4 font-display text-2xl italic text-tangerine">
          {step.lead}
        </p>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-ivory/70">
          {step.text}
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {step.tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-ivory/15 px-3.5 py-1.5 text-[13px] text-ivory/75"
            >
              {t}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

function MobileSteps() {
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });

  useEffect(() => {
    if (!inView || touched) return;
    const t = setInterval(() => setActive((a) => (a + 1) % steps.length), 4500);
    return () => clearInterval(t);
  }, [inView, touched]);

  const step = steps[active];
  return (
    <div ref={ref} className="lg:hidden">
      <div
        role="tablist"
        aria-label="How HomeBowl works"
        className="flex gap-2"
      >
        {steps.map((s, i) => (
          <button
            key={s.title}
            role="tab"
            aria-selected={active === i}
            onClick={() => {
              setTouched(true);
              setActive(i);
            }}
            className={`flex-1 rounded-full px-3 py-2.5 text-[14px] font-semibold transition-colors ${
              active === i
                ? "bg-tangerine text-espresso-950"
                : "bg-ivory/8 text-ivory/70"
            }`}
          >
            0{i + 1} {s.title}
          </button>
        ))}
      </div>
      <div className="relative mt-6 min-h-[170px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease }}
          >
            <p className="font-display text-2xl italic text-tangerine">
              {step.lead}
            </p>
            <p className="mt-3 leading-relaxed text-ivory/70">{step.text}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-6 flex h-[520px] justify-center">
        <div className="origin-top scale-[0.8]">
          <PhoneStage active={active} />
        </div>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="how-it-works"
      className="grain relative overflow-x-clip bg-espresso-900 text-ivory"
    >
      <div className="mx-auto max-w-7xl px-5 pt-28 sm:px-8 lg:pt-36">
        <FadeUp>
          <p className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.25em] text-tangerine">
            <span className="h-px w-10 bg-tangerine" /> For food lovers
          </p>
        </FadeUp>
        <h2 className="mt-6 text-[clamp(2.8rem,6.6vw,6.4rem)]">
          <LineReveal
            as="span"
            className="display block uppercase"
            lines={["Find your next"]}
          />
          <ScriptWord className="-mt-[0.2em] block text-[1.25em]" delay={0.3}>
            favourite bowl
          </ScriptWord>
        </h2>
        <FadeUp delay={0.2} className="mt-6 max-w-xl">
          <p className="text-lg leading-relaxed text-ivory/70">
            Discover great home food. Follow the chefs behind it. Order in a few
            taps.
          </p>
        </FadeUp>
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-24 pt-14 sm:px-8 lg:pb-12 lg:pt-0">
        <MobileSteps />

        <div className="hidden grid-cols-2 gap-16 lg:grid">
          <div className="sticky top-0 flex h-screen items-center justify-center">
            <PhoneStage active={active} />
          </div>
          <div className="pb-[12vh]">
            {steps.map((s, i) => (
              <StepBlock
                key={s.title}
                index={i}
                active={active === i}
                onActive={() => setActive(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
