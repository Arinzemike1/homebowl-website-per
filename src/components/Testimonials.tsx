"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Funmilayo A.",
    city: "Lagos",
    avatar: "🧕",
    rating: 5,
    text: "I've been ordering from Mama Ngozi every Sunday for months. Her jollof rice tastes exactly like my mum's — I literally shed a tear the first time. HomeBowl is doing something truly special.",
    meal: "Jollof Rice",
    date: "2 weeks ago",
    verified: true,
  },
  {
    id: 2,
    name: "Chidi O.",
    city: "Abuja",
    avatar: "👨🏾",
    rating: 5,
    text: "As a Nigerian living in Abuja away from home in Enugu, HomeBowl has been a lifeline. The ofe onugbu from Chef Emeka is restaurant quality — actually, better. My wife is obsessed.",
    meal: "Ofe Onugbu",
    date: "1 month ago",
    verified: true,
  },
  {
    id: 3,
    name: "Tunde B.",
    city: "Port Harcourt",
    avatar: "👨🏿",
    rating: 5,
    text: "The suya from Mallam Hassan is unreal. Delivered fresh, still warm, perfectly spiced. I've tried suya all over Nigeria and this is absolutely the best I've ever had. Period.",
    meal: "Beef Suya",
    date: "3 weeks ago",
    verified: true,
  },
  {
    id: 4,
    name: "Adaeze M.",
    city: "Lagos",
    avatar: "👩🏾",
    rating: 5,
    text: "Finally a food app that celebrates our culture! The variety is amazing and you can tell each chef puts genuine love into their cooking. Also the packaging is so thoughtful and eco-friendly.",
    meal: "Pepper Soup",
    date: "1 week ago",
    verified: true,
  },
  {
    id: 5,
    name: "Emeka J.",
    city: "Enugu",
    avatar: "👨🏾",
    rating: 4,
    text: "Discovered HomeBowl through a friend and I'm completely hooked. The app is slick, delivery is reliable, and every meal feels personal. Supporting home chefs feels great too!",
    meal: "Ofada Rice",
    date: "5 days ago",
    verified: true,
  },
  {
    id: 6,
    name: "Ngozi P.",
    city: "Kaduna",
    avatar: "👩🏿",
    rating: 5,
    text: "I work late nights and HomeBowl has saved my dinners more times than I can count. Real food, fast delivery, and I love seeing the chef prepare it via the live tracker. Incredible experience.",
    meal: "Egusi Soup",
    date: "2 days ago",
    verified: true,
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 bg-sand relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, var(--color-burnt-orange) 0, var(--color-burnt-orange) 1px, transparent 0, transparent 50%)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-burnt-orange/10 text-burnt-orange px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Real Stories
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-brown mb-4 leading-tight">
            What Our <span className="text-burnt-orange">Community</span> Says
          </h2>
          <div className="flex items-center justify-center gap-2 text-brown-mid/70">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={18}
                  className="fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <span className="font-bold text-brown">4.9</span>
            <span>average from 12,400+ reviews</span>
          </div>
        </motion.div>

        {/* Reviews Masonry-style grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="break-inside-avoid bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg hover:shadow-burnt-orange/10 border border-sand-dark transition-all duration-300 mb-6 block"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
                {Array.from({ length: 5 - review.rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-sand-dark" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-brown text-sm leading-relaxed mb-5 font-medium">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Meal tag */}
              <div className="inline-flex items-center gap-1.5 bg-sand text-burnt-orange text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                🍲 {review.meal}
              </div>

              {/* Reviewer */}
              <div className="flex items-center justify-between pt-4 border-t border-sand">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sand flex items-center justify-center text-xl">
                    {review.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-bold text-brown">
                        {review.name}
                      </p>
                      {review.verified && (
                        <span className="text-forest-green text-xs font-semibold">
                          ✓
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-brown-mid/50">{review.city}</p>
                  </div>
                </div>
                <span className="text-xs text-brown-mid/40">{review.date}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-6 md:gap-12"
        >
          {[
            {
              emoji: "🏆",
              label: "Best Food App 2025",
              sub: "TechAfrica Awards",
            },
            {
              emoji: "⭐",
              label: "4.9 / 5 Stars",
              sub: "App Store & Play Store",
            },
            {
              emoji: "🛡️",
              label: "Food Safety Certified",
              sub: "NAFDAC Compliant",
            },
            {
              emoji: "🌍",
              label: "8 Cities & Growing",
              sub: "Nigeria + UK + US",
            },
          ].map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-3 bg-white rounded-2xl px-5 py-3 shadow-sm border border-sand-dark"
            >
              <span className="text-2xl">{badge.emoji}</span>
              <div>
                <p className="text-sm font-bold text-brown">{badge.label}</p>
                <p className="text-xs text-brown-mid/55">{badge.sub}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
