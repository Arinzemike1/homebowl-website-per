"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import Patch from "@/components/ui/Patch";
import { HomeScreen, Phone } from "@/components/ui/Phone";
import { Bokeh, StoreBadges } from "@/components/ui/decor";
import {
  FadeUp,
  LineReveal,
  MagneticLink,
  ScriptWord,
} from "@/components/ui/motion";

export default function Download() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const phoneY = useTransform(scrollYProgress, [0, 1], [220, 0]);
  const phoneRotate = useTransform(scrollYProgress, [0, 1], [-14, -5]);
  const bowlRotate = useTransform(scrollYProgress, [0, 1], [-120, 0]);
  const bowlY = useTransform(scrollYProgress, [0, 1], [120, 0]);

  return (
    <section
      id="download"
      ref={ref}
      className="grain surface-bokeh relative overflow-hidden px-5 pt-28 text-ivory sm:px-8 lg:pt-36"
    >
      <Bokeh />
      <div className="relative mx-auto grid max-w-7xl items-end gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="pb-16 lg:pb-36">
          <h2 className="text-[clamp(3.6rem,8vw,7.6rem)]">
            <LineReveal
              as="span"
              className="display block uppercase"
              lines={["Meet"]}
            />
            <ScriptWord
              className="mt-[-0.35em] block text-[1.35em]"
              delay={0.3}
            >
              HomeBowl
            </ScriptWord>
          </h2>
          <FadeUp delay={0.2} className="mt-4">
            <p className="max-w-md text-xl leading-relaxed text-ivory/75">
              Discover great home food. Follow the chefs behind it. Find your
              next favourite bowl.
            </p>
          </FadeUp>
          <FadeUp delay={0.3} className="mt-9">
            <StoreBadges />
          </FadeUp>
          <FadeUp
            delay={0.4}
            className="mt-10 flex flex-col items-start gap-4 border-t border-ivory/10 pt-8 sm:flex-row sm:items-center"
          >
            <p className="max-w-xs text-ivory/70">
              <b className="text-ivory">Cook at home?</b> Set up your kitchen,
              share what you make and start selling.
            </p>
            <MagneticLink href="#for-chefs" variant="ghost">
              For home chefs
            </MagneticLink>
          </FadeUp>
        </div>

        <div className="relative mx-auto flex h-140 w-full max-w-130 items-end justify-center lg:h-170">
          <div className="checker absolute bottom-0 left-1/2 h-[46%] w-[74%] -translate-x-1/2 [--cell:34px]" />
          <motion.div
            style={{ rotate: bowlRotate, y: bowlY }}
            className="absolute bottom-[18%] -right-6 w-[46%] sm:-right-10"
          >
            <Image
              src="/images/food/egusi.png"
              alt=""
              width={657}
              height={657}
              sizes="260px"
              className="drop-shadow-[0_30px_30px_rgba(0,0,0,0.5)]"
            />
          </motion.div>
          <motion.div
            style={{ y: phoneY, rotate: phoneRotate }}
            className="relative -mb-27.5 origin-bottom scale-[0.86] sm:scale-100"
          >
            <Phone>
              <HomeScreen />
            </Phone>
          </motion.div>
          <Patch
            kind="heart"
            className="absolute left-0 top-[18%] w-16 -rotate-12"
          />
          <Patch
            kind="fish"
            className="absolute bottom-[40%] -left-8 w-24 rotate-6"
          />
        </div>
      </div>
    </section>
  );
}
