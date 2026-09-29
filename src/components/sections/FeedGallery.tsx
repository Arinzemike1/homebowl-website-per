"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getLenis } from "@/components/providers/Providers";
import {
  FadeUp,
  LineReveal,
  MagneticLink,
  Marquee,
  ScriptWord,
  ease,
} from "@/components/ui/motion";
import { site } from "@/lib/site";

const posts = [
  {
    src: "/images/posts/meet-trusted-home-chefs.webp",
    alt: "Meet trusted home chefs: a hand raising a red bowl of jollof rice, chicken and salad",
  },
  {
    src: "/images/posts/bowl-of-the-week-egusi.webp",
    alt: "Bowl of the Week: egusi soup made by Cynthia Morgana",
  },
  {
    src: "/images/posts/create-cook-inspire.webp",
    alt: "Create, cook, inspire: your kitchen is your canvas",
  },
  {
    src: "/images/posts/follow-your-favourite-chefs.webp",
    alt: "Follow your favourite chefs: found your fave chef? Keep them on your feed",
  },
  {
    src: "/images/posts/meet-homebowl.webp",
    alt: "Meet HomeBowl: discover great home food and follow the chefs behind it",
  },
  {
    src: "/images/posts/bowl-of-the-week-spaghetti.webp",
    alt: "Bowl of the Week: spaghetti made by Cynthia Morgana",
  },
  {
    src: "/images/posts/meet-homebowl-wood.webp",
    alt: "Meet HomeBowl: the app beside a steak and roast potatoes",
  },
];

export default function FeedGallery() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    getLenis()?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight")
        setOpen((i) => (i === null ? i : (i + 1) % posts.length));
      if (e.key === "ArrowLeft")
        setOpen((i) =>
          i === null ? i : (i - 1 + posts.length) % posts.length,
        );
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      getLenis()?.start();
    };
  }, [open]);

  return (
    <section
      aria-labelledby="feed-heading"
      className="surface-wood relative overflow-hidden py-28 text-ivory lg:py-36"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <FadeUp>
            <p className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.25em] text-tangerine">
              <span className="h-px w-10 bg-tangerine" /> {site.handle}
            </p>
          </FadeUp>
          <h2
            id="feed-heading"
            className="mt-6 text-[clamp(2.8rem,6vw,5.6rem)]"
          >
            <LineReveal
              as="span"
              className="display block uppercase"
              lines={["Fresh from"]}
            />
            <ScriptWord className="-mt-[0.2em] block text-[1.35em]" delay={0.3}>
              the feed
            </ScriptWord>
          </h2>
        </div>
        <FadeUp delay={0.2} className="max-w-sm lg:pb-6">
          <p className="text-lg leading-relaxed text-ivory/75">
            Bowls of the week, chef spotlights and what&apos;s cooking in
            kitchens near you.
          </p>
          <div className="mt-6">
            <MagneticLink href={site.socials[0].href} external>
              Follow on Instagram
            </MagneticLink>
          </div>
        </FadeUp>
      </div>

      <div className="mt-16">
        <Marquee baseVelocity={-1.4} className="py-8">
          {posts.map((p, i) => (
            <button
              key={p.src}
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`View post: ${p.alt}`}
              className="group mx-3 shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tangerine sm:mx-4"
            >
              <span
                className="block w-[240px] overflow-hidden rounded-2xl shadow-[0_30px_50px_-20px_rgba(0,0,0,0.7)] ring-1 ring-ivory/10 transition-transform duration-700 ease-(--ease-premium) group-hover:rotate-0 group-hover:scale-[1.04] sm:w-[300px]"
                style={{ rotate: `${i % 2 ? 2.5 : -2.5}deg` }}
              >
                <Image
                  src={p.src}
                  alt=""
                  width={600}
                  height={750}
                  sizes="300px"
                  className="aspect-4/5 w-full object-cover"
                />
              </span>
            </button>
          ))}
        </Marquee>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-80 grid place-items-center bg-espresso-950/90 p-5 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Post preview"
          >
            <motion.div
              key={open}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="relative aspect-4/5 h-[min(86vh,125vw)] max-w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={posts[open].src}
                alt={posts[open].alt}
                fill
                sizes="(min-width: 768px) 70vh, 100vw"
                className="rounded-2xl object-contain"
              />
            </motion.div>
            <button
              type="button"
              autoFocus
              onClick={() => setOpen(null)}
              aria-label="Close preview"
              className="absolute right-5 top-5 grid size-12 place-items-center rounded-full bg-ivory/10 text-ivory ring-1 ring-ivory/20 hover:bg-ivory/20"
            >
              <X size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
