"use client";

import { Marquee } from "@/components/ui/motion";

const dishes = [
  "Jollof rice",
  "Egusi soup",
  "Ofada stew",
  "Pepper soup",
  "Efo riro",
  "Suya",
  "Moi moi",
  "Small chops",
  "Banga soup",
  "Fried rice",
  "Asun",
  "Afang",
];

function Spark() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="mx-6 size-5 shrink-0 sm:mx-8 sm:size-6"
      aria-hidden
    >
      <path
        d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12C7 11 11 7 12 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Two crossing bands that straddle the seam between the hero and the next section.
export default function Ticker() {
  return (
    <div aria-hidden className="relative z-30 h-0 overflow-x-clip">
      <div className="absolute -inset-x-8 top-0 -translate-y-1/2">
        <div className="rotate-[2.2deg] bg-espresso-900 py-2.5 text-ivory shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)]">
          <Marquee baseVelocity={1.6}>
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="flex items-center">
                <span className="script script-gradient px-2 text-4xl sm:text-5xl">
                  Good food. Home made.
                </span>
                <Spark />
              </span>
            ))}
          </Marquee>
        </div>
        <div className="-mt-9 rotate-[-1.6deg] bg-tangerine py-3 text-espresso-950 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.55)] sm:-mt-11 sm:py-4">
          <Marquee baseVelocity={-2.4}>
            {dishes.map((dish) => (
              <span key={dish} className="flex items-center">
                <span className="display text-2xl uppercase sm:text-4xl">
                  {dish}
                </span>
                <Spark />
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
}
