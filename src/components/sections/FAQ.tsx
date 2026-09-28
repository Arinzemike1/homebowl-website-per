"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import Patch from "@/components/ui/Patch";
import { FadeUp, LineReveal, ScriptWord, ease } from "@/components/ui/motion";
import { site } from "@/lib/site";

const appLive = Boolean(site.appStoreUrl || site.playStoreUrl);

const faqs = [
  {
    q: "What is HomeBowl?",
    a: "HomeBowl is a home-food app. Home chefs set up a kitchen profile, post what they cook and sell their meals. Food lovers discover chefs nearby, follow the ones they love and order fresh, home-cooked bowls.",
  },
  {
    q: "Who cooks the food?",
    a: "Independent home chefs, cooking in their own kitchens. Every chef has a public profile with their menu, posts, ratings and reviews, so you always know who is cooking for you.",
  },
  {
    q: "How do I know I can trust a chef?",
    a: "Look for the verified badge on a chef’s profile, and check their rating and reviews from real customers before you order. You can also follow a chef for a while and see what they cook day to day.",
  },
  {
    q: "I cook at home. Can I sell on HomeBowl?",
    a: "Yes, that’s what HomeBowl is built for. Choose “Home chef” in the app, set up your kitchen with your logo, story and menu, then start posting. Foodies can follow you and order straight from your profile.",
  },
  {
    q: "What is the Bowl of the Week?",
    a: "Every week we spotlight one standout dish and the home chef who made it, across the HomeBowl app and our socials. Keep cooking great food and it could be yours.",
  },
  {
    q: "How do I get the app?",
    a: appLive
      ? "Download HomeBowl from the App Store or Google Play, pick whether you’re a foodie or a home chef, and you’re in."
      : `HomeBowl is coming soon to the App Store and Google Play. Follow ${site.handle} on Instagram to be the first to know when it drops.`,
  },
];

function Item({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  const id = useId();
  return (
    <div className="border-b border-brown/15">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={id}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left"
        >
          <span
            className="font-display text-xl font-semibold transition-colors group-hover:text-burnt-orange sm:text-2xl"
            style={{ fontVariationSettings: '"SOFT" 100' }}
          >
            {q}
          </span>
          <motion.span
            animate={{ rotate: open ? 135 : 0 }}
            transition={{ duration: 0.4, ease }}
            className={`grid size-10 shrink-0 place-items-center rounded-full transition-colors ${open ? "bg-burnt-orange text-white" : "bg-espresso-900/8 text-espresso-900"}`}
          >
            <Plus size={18} />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 text-[17px] leading-relaxed text-brown-mid">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      className="surface-paper relative overflow-hidden px-5 py-28 text-brown sm:px-8 lg:py-36"
    >
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="relative">
          <FadeUp>
            <p className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.25em] text-burnt-orange">
              <span className="h-px w-10 bg-burnt-orange" /> FAQ
            </p>
          </FadeUp>
          <h2 className="mt-6 text-[clamp(2.8rem,5.4vw,5rem)]">
            <LineReveal
              as="span"
              className="display block uppercase"
              lines={["Got", "questions?"]}
            />
            <ScriptWord
              gradient={false}
              className="-mt-[0.25em] block text-[1.2em] text-burnt-orange"
              delay={0.3}
            >
              we&apos;ve got you
            </ScriptWord>
          </h2>
          <FadeUp delay={0.2}>
            <p className="mt-5 max-w-sm text-lg leading-relaxed text-brown-mid">
              Still curious? Send us a message on Instagram at{" "}
              <a
                href={site.socials[0].href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-burnt-orange underline underline-offset-4"
              >
                {site.handle}
              </a>
              .
            </p>
          </FadeUp>
          <Patch
            kind="heart"
            className="mt-10 hidden w-20 -rotate-12 lg:block"
          />
        </div>

        <FadeUp delay={0.1}>
          <div className="border-t border-brown/15">
            {faqs.map((f, i) => (
              <Item
                key={f.q}
                q={f.q}
                a={f.a}
                open={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
