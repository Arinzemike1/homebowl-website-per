"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Star, ChevronDown, Users, Flame, Search } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

const floatingCards = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=200&h=200&fit=crop",
    name: "Jollof Rice",
    chef: "Mama Ngozi",
    rating: 4.9,
    time: "25 min",
    price: "₦2,800",
    delay: 0,
    position: "top-24 right-12 lg:right-24",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop",
    name: "Egusi Soup",
    chef: "Chef Adaeze",
    rating: 4.8,
    time: "35 min",
    price: "₦3,500",
    delay: 1.5,
    position: "bottom-40 right-4 lg:right-16",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop",
    name: "Suya Platter",
    chef: "Mallam Hassan",
    rating: 5.0,
    time: "20 min",
    price: "₦1,800",
    delay: 0.8,
    position: "top-48 right-56 lg:right-80",
  },
];

const stats = [
  { value: "12K+", label: "Home Chefs", icon: <Users size={16} /> },
  {
    value: "98%",
    label: "Satisfaction",
    icon: <Star size={16} className="fill-current" />,
  },
  { value: "45K+", label: "Meals Served", icon: <Flame size={16} /> },
];

const popularTags = [
  "Jollof Rice",
  "Pepper Soup",
  "Suya",
  "Egusi",
  "Pounded Yam",
  "Shawarma",
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-linear-to-br from-cream via-sand to-[#EAD5B8] flex items-center"
    >
      {/* Decorative background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 w-150 h-150 rounded-full bg-burnt-orange/10 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-0 -right-40 w-125 h-125 rounded-full bg-forest-green/10 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute top-1/2 left-1/3 w-100 h-100 rounded-full bg-burnt-orange/8 blur-3xl"
        />

        {/* Floating food emoji decorations */}
        {["🍲", "🥘", "🌶️", "🫙", "🌿", "✨"].map((emoji, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
            transition={{
              duration: 4 + i * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
            className="absolute text-2xl opacity-20 select-none"
            style={{
              left: `${10 + i * 15}%`,
              top: `${15 + (i % 3) * 25}%`,
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      <motion.div
        style={{ y: yParallax, opacity: opacityHero }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-16 w-full"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-8">
            {/* Badge */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-forest-green/10 text-forest-green px-4 py-2 rounded-full text-sm font-semibold border border-forest-green/20"
            >
              <span className="w-2 h-2 rounded-full bg-forest-green animate-pulse" />
              Now delivering in 8 cities
            </motion.div> */}

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-2"
            >
              <h1 className="font-fraunces text-5xl sm:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-tight text-brown">
                Cooked at home.{" "}
                <span className="relative inline-block">
                  <span className="text-burnt-orange italic">Served</span>
                  {/* Underline accent */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                    // className="absolute -bottom-1 left-0 right-0 h-1 bg-linear-to-r from-burnt-orange to-burnt-orange-light rounded-full origin-left"
                  />
                </span>
                {/* <br /> */} with{" "}
                <span className="text-forest-green italic">Love.</span>
              </h1>
              <p className="text-lg sm:text-xl text-brown-mid/80 max-w-lg leading-relaxed font-normal mt-4">
                Order authentic, handcrafted meals from independent home chefs
                in your community. Real recipes, real stories, real flavors.
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <div className="flex-1 flex items-center gap-3 bg-white rounded-[40px] px-4 py-2 shadow-lg shadow-brown/8 border border-sand-dark">
                <Search size={16} className="text-burnt-orange" />
                <input
                  type="text"
                  placeholder="Search meals, chefs, cuisines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-brown placeholder-brown-mid/40 font-medium text-sm"
                />
                <motion.button
                  whileHover={{
                    scale: 1.04,
                    boxShadow: "0 8px 20px rgba(198,93,7,0.35)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="px-5 py-2.5 cursor-pointer bg-burnt-orange text-white font-bold rounded-[40px] shadow-md shadow-burnt-orange/30 hover:bg-burnt-orange-dark transition-all text-sm whitespace-nowrap"
                >
                  Find Food
                </motion.button>
              </div>
            </motion.div>

            {/* Quick tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-2"
            >
              <span className="text-sm text-brown-mid/60 self-center mr-1">
                Popular:
              </span>
              {popularTags.map((tag, i) => (
                <motion.button
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.05 }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "var(--color-burnt-orange)",
                    color: "#fff",
                  }}
                  className="px-3 py-1.5 bg-sand-dark text-brown-mid text-xs font-medium rounded-full transition-all cursor-pointer"
                >
                  {tag}
                </motion.button>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex gap-6 pt-2"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <div className="flex items-center gap-1.5 text-burnt-orange">
                    {stat.icon}
                    <span className="text-2xl font-extrabold text-brown">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-xs text-brown-mid/60 font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Floating Meal Cards */}
          <div className="relative hidden lg:block h-140">
            {/* Central large chef image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="absolute inset-8 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-brown/20"
            >
              <Image
                src="https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=600&h=700&fit=crop"
                alt="Home chef cooking"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 0vw, 50vw"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-brown/40 via-transparent to-transparent" />

              {/* Live indicator */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute top-6 left-6 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-semibold text-brown">
                  Live Orders Open
                </span>
              </motion.div>

              {/* Chef info at bottom */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="absolute bottom-6 left-6 right-6"
              >
                <div className="glass rounded-2xl p-4">
                  <p className="text-white font-bold text-lg">Chef Amara</p>
                  <p className="text-white/80 text-sm">
                    Lagos, Nigeria • West African Cuisine
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={12}
                        className="fill-amber-400 text-amber-400"
                      />
                    ))}
                    <span className="text-white/80 text-xs ml-1">
                      5.0 (342 reviews)
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating meal cards */}
            {floatingCards.map((card) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, scale: 0.7, y: 20 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -10, 0],
                }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.8 + card.delay * 0.3 },
                  scale: { duration: 0.5, delay: 0.8 + card.delay * 0.3 },
                  y: {
                    duration: 3 + card.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: card.delay,
                  },
                }}
                className={`absolute ${card.position} bg-white rounded-2xl p-3 shadow-xl shadow-brown/15 border border-sand-dark flex items-center gap-3 w-52 cursor-pointer hover:shadow-2xl hover:scale-105 transition-shadow`}
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={card.image}
                    alt={card.name}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-brown text-sm truncate">
                    {card.name}
                  </p>
                  <p className="text-brown-mid/60 text-xs">{card.chef}</p>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-0.5">
                      <Star
                        size={10}
                        className="fill-amber-400 text-amber-400"
                      />
                      <span className="text-xs font-medium text-brown">
                        {card.rating}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-burnt-orange">
                      {card.price}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Order notification pop-up */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2, duration: 0.5 }}
              className="absolute bottom-8 left-0 bg-white rounded-2xl px-4 py-3 shadow-xl border border-sand-dark flex items-center gap-3 w-56"
            >
              <div className="w-10 h-10 rounded-full bg-forest-green/15 flex items-center justify-center shrink-0">
                <span className="text-xl">🎉</span>
              </div>
              <div>
                <p className="text-xs font-bold text-brown">New Order!</p>
                <p className="text-xs text-brown-mid/70">
                  Tunde ordered Pepper Soup
                </p>
                <p className="text-xs text-forest-green font-semibold">
                  Just now
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brown-mid/50"
      >
        <span className="text-xs font-medium tracking-widest uppercase">
          Explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          className="w-full fill-sand"
          preserveAspectRatio="none"
        >
          <path d="M0,80 C360,20 720,60 1080,20 C1260,0 1380,40 1440,30 L1440,80 Z" />
        </svg>
      </div>
    </section>
  );
}
