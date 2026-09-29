"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import { getLenis } from "@/components/providers/Providers";
import Patch from "@/components/ui/Patch";
import { ease } from "@/components/ui/motion";
import { site } from "@/lib/site";

export default function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    setHidden(y > prev && y > 400 && !open);
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) getLenis()?.stop();
    else getLenis()?.start();
  }, [open]);

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-60 h-[3px] origin-left bg-tangerine"
        style={{ scaleX: progress }}
      />

      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
        initial={false}
        animate={{ y: hidden ? "-120%" : "0%" }}
        transition={{ duration: 0.5, ease }}
      >
        <nav
          aria-label="Main"
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full py-2 pl-4 pr-2 transition-all duration-500 ${
            solid
              ? "bg-espresso-950/70 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] ring-1 ring-ivory/10 backdrop-blur-xl"
              : "bg-transparent"
          }`}
        >
          <a href="#top" aria-label="HomeBowl home" className="shrink-0">
            <Logo tone="light" height={50} />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {site.nav.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative block rounded-full px-4 py-2 text-[14px] font-medium text-ivory/80 transition-colors hover:text-ivory"
                >
                  {l.label}
                  <span className="absolute inset-x-4 bottom-1.5 h-px origin-right scale-x-0 bg-tangerine transition-transform duration-500 ease-(--ease-premium) group-hover:origin-left group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#download"
              className="hidden rounded-full bg-tangerine px-5 py-2.5 text-[14px] font-semibold text-espresso-950 transition-colors hover:bg-ivory sm:inline-block"
            >
              Get the app
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="grid size-11 place-items-center rounded-full bg-ivory/10 text-ivory ring-1 ring-ivory/15 lg:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-70 flex flex-col overflow-hidden bg-espresso-950 px-6 pb-8 pt-5 lg:hidden"
            initial={{ clipPath: "circle(0% at 92% 5%)" }}
            animate={{ clipPath: "circle(150% at 92% 5%)" }}
            exit={{ clipPath: "circle(0% at 92% 5%)" }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex items-center justify-between">
              <Logo tone="light" height={40} />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid size-11 place-items-center rounded-full bg-ivory/10 text-ivory ring-1 ring-ivory/15"
              >
                <X size={20} />
              </button>
            </div>

            <ul className="mt-14 space-y-2">
              {[...site.nav, { label: "Get the app", href: "#download" }].map(
                (l, i) => (
                  <li key={l.href} className="overflow-hidden">
                    <motion.a
                      href={l.href}
                      onClick={(e) => {
                        e.preventDefault();
                        setOpen(false);
                        document.documentElement.style.overflow = "";
                        const lenis = getLenis();
                        if (lenis) {
                          lenis.start();
                          lenis.scrollTo(l.href, { offset: -24 });
                        } else {
                          document
                            .querySelector(l.href)
                            ?.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="display block text-[2.6rem] uppercase text-ivory"
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      transition={{
                        duration: 0.8,
                        ease,
                        delay: 0.25 + i * 0.06,
                      }}
                    >
                      {l.label}
                    </motion.a>
                  </li>
                ),
              )}
            </ul>

            <p className="script script-gradient mt-8 text-5xl">
              Good food. Home made.
            </p>

            <Patch
              kind="heart"
              className="absolute right-8 top-[42%] w-16 rotate-12"
            />
            <Patch
              kind="tomato"
              className="absolute bottom-28 right-24 w-14 -rotate-6"
            />
            <div className="checker absolute -bottom-2 left-0 right-0 h-16 [--cell:32px]" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
