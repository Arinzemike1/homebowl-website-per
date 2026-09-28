"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Patch from "@/components/ui/Patch";
import { ChefProfileScreen, Phone } from "@/components/ui/Phone";
import { ScribbleArrow, ScribbleCircle } from "@/components/ui/decor";
import { FadeUp } from "@/components/ui/motion";

const beats = [
  { word: "Follow.", text: "Tap follow on any chef’s profile." },
  { word: "Watch.", text: "Their posts and new meals show up on your feed." },
  { word: "Crave.", text: "Specials, new recipes, the Bowl of the Week." },
  { word: "Repeat.", text: "Reorder your favourites in a couple of taps." },
];

export default function FollowChefs() {
  const ref = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const inView = useInView(phoneRef, { amount: 0.5 });
  const [following, setFollowing] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const phoneY = useTransform(scrollYProgress, [0, 1], [90, -90]);
  const phoneRotate = useTransform(scrollYProgress, [0, 1], [-16, -6]);
  const envelopeRotate = useTransform(scrollYProgress, [0, 1], [-4, -10]);

  // Loop: land on the profile, tap Follow, hold, reset.
  useEffect(() => {
    if (!inView) return;
    let tap: ReturnType<typeof setTimeout>;
    const cycle = () => {
      setFollowing(false);
      tap = setTimeout(() => setFollowing(true), 1400);
    };
    cycle();
    const loop = setInterval(cycle, 4600);
    return () => {
      clearInterval(loop);
      clearTimeout(tap);
    };
  }, [inView]);

  return (
    <section
      ref={ref}
      aria-labelledby="follow-heading"
      className="relative overflow-hidden bg-[#ead3b3] px-5 py-28 text-espresso-900 sm:px-8 lg:py-36"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-60 [background-image:var(--noise)] [background-size:220px] mix-blend-multiply"
      />

      {/* Mobile order: heading → phone → notes. Desktop: heading + notes left, phone right. */}
      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-12">
        <FadeUp className="order-1 lg:col-start-1 lg:row-start-1">
          <h2
            id="follow-heading"
            className="display -rotate-3 text-[clamp(3rem,6.4vw,5.8rem)] leading-[0.92] text-[#4a2a17]"
            style={{
              fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1',
            }}
          >
            Follow Your
            <br />
            Favourite Chefs
          </h2>
        </FadeUp>

        {/* Notebook page with hand-written notes */}
        <div className="relative order-3 lg:col-start-1 lg:row-start-2">
          <motion.div
            initial={{ opacity: 0, y: 60, rotate: 6 }}
            whileInView={{ opacity: 1, y: 0, rotate: 2 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="surface-notebook relative rounded-sm p-7 shadow-[0_30px_60px_-30px_rgba(60,30,10,0.6)] sm:p-10"
          >
            <div className="relative grid gap-y-10 sm:grid-cols-[1fr_1.1fr] sm:gap-x-4">
              <div className="relative w-fit self-start">
                <ScribbleCircle className="absolute -left-8 -top-6 h-[calc(100%+3rem)] w-[calc(100%+4rem)] -rotate-6" />
                <p className="hand relative -rotate-6 text-[2.6rem] font-bold leading-[0.9] text-espresso-900">
                  Found your
                  <br />
                  fave chef?
                </p>
              </div>
              <div className="relative sm:pt-2">
                <p className="hand -rotate-3 text-[2.2rem] leading-[0.95] text-[#4a2a17]">
                  Keep them
                  <br />
                  on your feed.
                </p>
                <ScribbleArrow className="mt-1 w-56" />
              </div>
            </div>

            <ul className="mt-8 grid gap-4 border-t border-dashed border-brown/25 pt-7 sm:grid-cols-2">
              {beats.map((b, i) => (
                <motion.li
                  key={b.word}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
                >
                  <span className="hand block text-[2rem] font-bold leading-none text-burnt-orange">
                    {b.word}
                  </span>
                  <span className="text-[15px] text-brown-mid">{b.text}</span>
                </motion.li>
              ))}
            </ul>

            <Patch
              kind="chili"
              className="absolute -bottom-10 right-8 w-11 rotate-[25deg]"
            />
            <Patch
              kind="star"
              className="absolute -right-6 -top-8 w-16 rotate-12"
            />
          </motion.div>
        </div>

        {/* Kraft envelope + phone */}
        <div className="relative order-2 grid min-h-[560px] place-items-center sm:min-h-[640px] lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <motion.div
            aria-hidden
            style={{ rotate: envelopeRotate }}
            className="surface-kraft absolute h-[70%] w-[92%] rounded-md shadow-[0_30px_60px_-30px_rgba(60,30,10,0.7)]"
          >
            <span className="absolute inset-x-0 top-0 h-1/2 bg-[#b88c57]/40 [clip-path:polygon(0_0,100%_0,50%_100%)]" />
          </motion.div>
          <Patch
            kind="tomato"
            className="absolute left-2 top-4 w-20 -rotate-12"
          />

          <div className="scale-[0.84] sm:scale-100">
            <motion.div
              ref={phoneRef}
              style={{ y: phoneY, rotate: phoneRotate }}
              className="relative"
            >
              <Phone>
                <ChefProfileScreen following={following} />
              </Phone>
              {/* Tap ripple over the Follow button */}
              <AnimatePresence>
                {!following && inView && (
                  <motion.span
                    key="tap"
                    aria-hidden
                    className="absolute left-[218px] top-[108px] size-10 rounded-full border-2 border-burnt-orange bg-burnt-orange/25"
                    initial={{ scale: 0.2, opacity: 0 }}
                    animate={{ scale: [0.2, 1, 0.8], opacity: [0, 1, 1] }}
                    exit={{ scale: 1.8, opacity: 0 }}
                    transition={{ duration: 0.9, delay: 0.4 }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
