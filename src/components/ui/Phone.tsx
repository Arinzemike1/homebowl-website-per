"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Bell,
  Bike,
  Check,
  ChefHat,
  Clock,
  House,
  MapPin,
  MessageCircle,
  Rss,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Star,
  User,
} from "lucide-react";
import Image from "next/image";

// A phone frame plus recreations of the HomeBowl app screens seen in the campaign posts.
// Designed at a fixed 300×620 so the UI stays crisp; scale the wrapper for other sizes.

export function Phone({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative h-[620px] w-[300px] shrink-0 rounded-[3rem] bg-[#15100d] p-[9px] shadow-[0_40px_80px_-20px_rgba(10,4,1,0.65),0_0_0_1.5px_rgba(255,255,255,0.08)_inset] ${className}`}
    >
      <span className="absolute -left-[3px] top-28 h-12 w-[3px] rounded-l bg-[#2a211c]" />
      <span className="absolute -left-[3px] top-44 h-12 w-[3px] rounded-l bg-[#2a211c]" />
      <span className="absolute -right-[3px] top-36 h-16 w-[3px] rounded-r bg-[#2a211c]" />
      <div className="absolute left-1/2 top-[19px] z-30 h-[25px] w-[88px] -translate-x-1/2 rounded-full bg-black" />
      <div className="relative h-full w-full overflow-hidden rounded-[2.45rem] bg-[#f8f1e9] font-sans text-[#2b1a10]">
        {children}
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex h-11 items-end justify-between px-7 pb-1 text-[12px] font-semibold">
      <span>4:19</span>
      <span className="flex items-center gap-1">
        <svg width="16" height="10" viewBox="0 0 16 10" aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={i * 4}
              y={7 - i * 2}
              width="3"
              height={3 + i * 2}
              rx="0.8"
              fill="currentColor"
            />
          ))}
        </svg>
        <svg width="14" height="10" viewBox="0 0 14 10" aria-hidden>
          <path
            d="M7 9.5 4.8 7.3a3.1 3.1 0 0 1 4.4 0ZM2.6 5.1a6.2 6.2 0 0 1 8.8 0l-1.1 1.1a4.7 4.7 0 0 0-6.6 0ZM.4 2.9a9.3 9.3 0 0 1 13.2 0l-1.1 1.1a7.8 7.8 0 0 0-11 0Z"
            fill="currentColor"
          />
        </svg>
        <span className="relative h-[10px] w-[20px] rounded-[3px] border border-current p-[1px]">
          <span className="block h-full w-[80%] rounded-[1.5px] bg-current" />
        </span>
      </span>
    </div>
  );
}

function Initials({
  text,
  bg,
  size = 36,
}: {
  text: string;
  bg: string;
  size?: number;
}) {
  return (
    <span
      className="grid shrink-0 place-items-center rounded-full font-bold text-white"
      style={{
        width: size,
        height: size,
        background: bg,
        fontSize: size * 0.36,
      }}
    >
      {text}
    </span>
  );
}

function VerifiedBadge({
  size = 14,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-label="Verified"
      role="img"
      className={className}
    >
      <path
        d="M12 1.5 14.6 3.4l3.2-.2 1 3 2.7 1.8-.9 3.1.9 3.1-2.7 1.8-1 3-3.2-.2L12 22.5l-2.6-1.9-3.2.2-1-3-2.7-1.8.9-3.1-.9-3.1 2.7-1.8 1-3 3.2.2Z"
        fill="#c65d07"
      />
      <path
        d="m8 12.2 2.6 2.6L16.2 9"
        stroke="#fff"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BottomNav({
  active,
}: {
  active: "Home" | "Feeds" | "Orders" | "Profile";
}) {
  const items = [
    { label: "Home", icon: House },
    { label: "Feeds", icon: Rss },
    { label: "Orders", icon: ShoppingBag },
    { label: "Profile", icon: User },
  ] as const;
  return (
    <div className="absolute inset-x-0 bottom-0 flex h-[62px] items-start justify-around border-t border-[#efe4d7] bg-white/95 pt-2.5 backdrop-blur">
      {items.map(({ label, icon: Icon }) => (
        <span
          key={label}
          className={`flex flex-col items-center gap-0.5 text-[9.5px] font-semibold ${label === active ? "text-[#c65d07]" : "text-[#9a8b7e]"}`}
        >
          <Icon size={17} strokeWidth={label === active ? 2.4 : 1.8} />
          {label}
        </span>
      ))}
    </div>
  );
}

export function HomeScreen() {
  const categories = [
    { label: "Soups & Stews", emoji: "🍲" },
    { label: "Rice Dishes", emoji: "🍛" },
    { label: "Grills & Suya", emoji: "🍢" },
    { label: "Small chops", emoji: "🥟" },
  ];
  return (
    <div className="relative h-full">
      <StatusBar />
      <div className="flex items-center justify-between px-4 pt-3">
        <div className="flex items-center gap-2">
          <Initials text="J" bg="#8a5a3b" size={34} />
          <div>
            <p className="text-[13px] font-bold leading-tight">Hey Jerry 👋</p>
            <p className="flex items-center gap-1 text-[10px] text-[#7d6a5c]">
              <MapPin size={10} className="text-[#c65d07]" /> 12B Admiralty Way,
              Lekki
            </p>
          </div>
        </div>
        <span className="grid size-8 place-items-center rounded-xl bg-white shadow-sm">
          <Bell size={14} />
        </span>
      </div>

      <div className="mx-4 mt-3 flex items-center gap-2 rounded-xl border border-[#eadccd] bg-white px-3 py-2">
        <Search size={13} className="text-[#9a8b7e]" />
        <span className="flex-1 text-[10.5px] text-[#a8998c]">
          Search meals or ingredient
        </span>
        <span className="grid size-6 place-items-center rounded-lg bg-[#c65d07] text-white">
          <SlidersHorizontal size={11} />
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between px-4">
        <p className="text-[11.5px] font-bold">Explore Categories</p>
        <span className="text-[11px] text-[#c65d07]">→</span>
      </div>
      <div className="mt-2 flex gap-2 overflow-hidden px-4">
        {categories.map((c) => (
          <span
            key={c.label}
            className="flex w-[72px] shrink-0 flex-col items-center gap-1 rounded-xl bg-white px-1 py-2 shadow-sm"
          >
            <span className="text-[18px]">{c.emoji}</span>
            <span className="text-[8.5px] font-medium">{c.label}</span>
          </span>
        ))}
      </div>

      <div className="relative mx-4 mt-3 flex h-[92px] items-center overflow-hidden rounded-2xl bg-[#f6d6b8] px-3">
        <div className="relative z-10 max-w-[55%]">
          <p className="text-[8.5px] font-bold uppercase tracking-wider text-[#c65d07]">
            Bowl of the Week
          </p>
          <p className="text-[12px] font-bold leading-tight">
            Egusi soup by Cynthia Morgana
          </p>
          <span className="mt-1.5 inline-block rounded-md bg-[#c65d07] px-2 py-1 text-[9px] font-semibold text-white">
            Order Now
          </span>
        </div>
        <Image
          src="/images/food/egusi.png"
          alt=""
          width={120}
          height={120}
          className="absolute -right-4 top-1/2 size-[112px] -translate-y-1/2"
        />
      </div>

      <p className="mt-3 px-4 text-[11.5px] font-bold">Chefs Near You</p>
      <div className="mt-2 flex gap-2 overflow-hidden px-4">
        {[
          {
            name: "Chef Bisi Kitchen",
            area: "Lekki phase 1",
            rating: "4.9",
            initials: "BK",
            bg: "#c65d07",
          },
          {
            name: "Mama T's Pot",
            area: "Yaba",
            rating: "4.8",
            initials: "MT",
            bg: "#386641",
          },
        ].map((c) => (
          <span
            key={c.name}
            className="flex w-[176px] shrink-0 items-center gap-2 rounded-xl bg-white p-2 shadow-sm"
          >
            <Initials text={c.initials} bg={c.bg} size={34} />
            <span>
              <span className="flex items-center gap-1 text-[10.5px] font-bold">
                {c.name} <VerifiedBadge size={11} />
              </span>
              <span className="flex items-center gap-1 text-[9px] text-[#7d6a5c]">
                <MapPin size={9} className="text-[#c65d07]" /> {c.area}
              </span>
              <span className="flex items-center gap-0.5 text-[9px] font-semibold">
                <Star size={9} className="fill-[#f5a524] text-[#f5a524]" />{" "}
                {c.rating}
              </span>
            </span>
          </span>
        ))}
      </div>

      <p className="mt-3 px-4 text-[11.5px] font-bold">Popular Orders</p>
      <div className="mt-2 flex gap-2 px-4">
        {["/images/food/spaghetti.png", "/images/food/egusi.png"].map((src) => (
          <span
            key={src}
            className="relative h-[64px] flex-1 overflow-hidden rounded-xl bg-[#3a2415]"
          >
            <Image
              src={src}
              alt=""
              width={160}
              height={160}
              className="absolute left-1/2 top-1/2 size-[130px] -translate-x-1/2 -translate-y-1/2"
            />
          </span>
        ))}
      </div>

      <BottomNav active="Home" />
    </div>
  );
}

export function ChefProfileScreen({
  following = false,
}: {
  following?: boolean;
}) {
  const reviews = [
    {
      name: "Tolani",
      stars: 5,
      text: "The jollof was super amazing, tastes so great",
      when: "2hr ago",
      bg: "#8a5a3b",
    },
    {
      name: "John",
      stars: 4,
      text: "Tasted just like home. Ordering again!",
      when: "16/07/2026",
      bg: "#c65d07",
    },
    {
      name: "Mary",
      stars: 5,
      text: "Generous bowl and the stew was perfect.",
      when: "16/07/2026",
      bg: "#386641",
    },
  ];
  return (
    <div className="relative h-full">
      <StatusBar />
      <div className="px-4 pt-2">
        <span className="grid size-8 place-items-center rounded-full bg-white shadow-sm">
          <ArrowLeft size={14} className="text-[#c65d07]" />
        </span>
      </div>

      <div className="mx-4 mt-3 rounded-2xl bg-white p-3 shadow-sm">
        <div className="flex items-start gap-2.5">
          <Initials text="BK" bg="#c65d07" size={42} />
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-bold leading-tight">
              Chef Bisi Kitchen{" "}
              <VerifiedBadge size={12} className="inline-block align-[-2px]" />
            </p>
            <p className="flex items-center gap-1 text-[9.5px] text-[#7d6a5c]">
              <MapPin size={9} className="text-[#c65d07]" /> Lekki phase 1
            </p>
          </div>
          <motion.span
            layout
            className={`rounded-lg px-2.5 py-1.5 text-[10px] font-semibold ${following ? "border border-[#c65d07] text-[#c65d07]" : "bg-[#c65d07] text-white"}`}
          >
            {following ? (
              <span className="flex items-center gap-1">
                <Check size={10} strokeWidth={3} /> Following
              </span>
            ) : (
              "Follow"
            )}
          </motion.span>
        </div>
        <p className="mt-2 text-[10px] leading-snug text-[#5c4a3d]">
          Home-cooked Yoruba classics — soups, stews and party jollof made fresh
          to order.
        </p>
      </div>

      <div className="mx-4 mt-2.5 grid grid-cols-3 divide-x divide-[#efe4d7] rounded-2xl bg-white py-2.5 shadow-sm">
        {[
          { icon: Clock, value: "24mins", label: "Prep time" },
          { icon: Star, value: "4.9", label: "Rating" },
          { icon: ShoppingBag, value: "125", label: "Orders" },
        ].map(({ icon: Icon, value, label }) => (
          <span
            key={label}
            className="flex items-center justify-center gap-1.5"
          >
            <Icon size={14} className="text-[#c65d07]" />
            <span>
              <span className="block text-[11px] font-bold leading-tight">
                {value}
              </span>
              <span className="block text-[8.5px] text-[#7d6a5c]">{label}</span>
            </span>
          </span>
        ))}
      </div>

      <div className="mt-3 flex gap-5 px-5 text-[11px]">
        <span className="text-[#9a8b7e]">Posts</span>
        <span className="text-[#9a8b7e]">Meals</span>
        <span className="border-b-2 border-[#c65d07] pb-1 font-semibold text-[#c65d07]">
          Reviews
        </span>
      </div>

      <div className="mx-4 mt-2 rounded-2xl bg-white p-3 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-[10.5px]">
            <b>124</b> reviews
          </p>
          <p className="text-[10px] font-semibold text-[#c65d07] underline underline-offset-2">
            Leave a review
          </p>
        </div>
        <div className="mt-1 divide-y divide-[#f1e8de]">
          {reviews.map((r) => (
            <div key={r.name} className="flex gap-2 py-2">
              <Initials text={r.name[0]} bg={r.bg} size={26} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-[10.5px] font-bold">
                    {r.name}
                    <span className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={8}
                          className={
                            i < r.stars
                              ? "fill-[#c65d07] text-[#c65d07]"
                              : "text-[#c65d07]"
                          }
                        />
                      ))}
                    </span>
                  </span>
                  <span className="text-[8px] text-[#9a8b7e]">{r.when}</span>
                </div>
                <p className="text-[9.5px] text-[#5c4a3d]">{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const orderSteps = [
  { label: "Order confirmed", time: "12:40", icon: Check },
  { label: "Chef is cooking", time: "12:42", icon: ChefHat },
  { label: "On the way", time: "", icon: Bike },
  { label: "Delivered", time: "", icon: House },
];

export function OrderScreen({ step = 1 }: { step?: number }) {
  return (
    <div className="relative h-full">
      <StatusBar />
      <div className="flex items-center gap-3 px-4 pt-2">
        <span className="grid size-8 place-items-center rounded-full bg-white shadow-sm">
          <ArrowLeft size={14} className="text-[#c65d07]" />
        </span>
        <p className="text-[13px] font-bold">Order status</p>
      </div>

      <div className="mx-4 mt-3 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm">
        <Image
          src="/images/food/egusi.png"
          alt=""
          width={112}
          height={112}
          className="size-14"
        />
        <div>
          <p className="text-[11.5px] font-bold leading-tight">
            Egusi soup &amp; assorted meat
          </p>
          <p className="text-[9.5px] text-[#7d6a5c]">
            Chef Bisi Kitchen · Order #4821
          </p>
          <p className="mt-0.5 text-[9.5px] font-semibold text-[#386641]">
            Arriving around 1:25 PM
          </p>
        </div>
      </div>

      <div className="mx-4 mt-3 rounded-2xl bg-white p-4 shadow-sm">
        {orderSteps.map(({ label, time, icon: Icon }, i) => {
          const done = i < step;
          const current = i === step;
          return (
            <div key={label} className="relative flex gap-3 pb-4 last:pb-0">
              {i < orderSteps.length - 1 && (
                <span
                  className={`absolute left-[13px] top-7 h-[calc(100%-22px)] w-[2px] ${done ? "bg-[#386641]" : "bg-[#eadccd]"}`}
                />
              )}
              <span
                className={`relative grid size-7 shrink-0 place-items-center rounded-full ${
                  done
                    ? "bg-[#386641] text-white"
                    : current
                      ? "bg-[#c65d07] text-white"
                      : "bg-[#f3eadf] text-[#b3a393]"
                }`}
              >
                {current && (
                  <span className="absolute inset-0 animate-ping rounded-full bg-[#c65d07]/40" />
                )}
                <Icon size={13} strokeWidth={2.4} />
              </span>
              <div className="flex flex-1 items-center justify-between">
                <span
                  className={`text-[11px] ${done || current ? "font-bold" : "text-[#9a8b7e]"}`}
                >
                  {label}
                </span>
                <span className="text-[9px] text-[#9a8b7e]">{time}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mx-4 mt-3 flex items-start gap-2 rounded-2xl bg-[#f6d6b8] p-3">
        <Initials text="BK" bg="#c65d07" size={26} />
        <p className="text-[10px] leading-snug text-[#4a3326]">
          <b>Bisi:</b> Your egusi is on the fire now 🔥 Extra pepper, as
          requested!
        </p>
      </div>

      <div className="absolute inset-x-4 bottom-5 flex items-center justify-center gap-2 rounded-xl bg-[#c65d07] py-3 text-[11px] font-semibold text-white">
        <MessageCircle size={13} /> Message chef
      </div>
    </div>
  );
}

/** Cross-fades between screens keyed by `screenKey`. */
export function ScreenSwap({
  screenKey,
  children,
}: {
  screenKey: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={screenKey}
        className="absolute inset-0"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -30, scale: 0.97 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
