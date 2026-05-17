"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const appFeatures = [
  "Real-time order tracking",
  "Chef live prep notifications",
  "Save favorite chefs & meals",
  "Schedule future orders",
  "Rate & review experiences",
  "Dietary filter & allergen info",
];

export default function AppDownload() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 bg-brown relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-burnt-orange/15 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-forest-green/15 blur-3xl"
        />
        {/* Pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, var(--color-sand) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 bg-burnt-orange/20 text-burnt-orange-light px-4 py-2 rounded-full text-sm font-semibold mb-4">
                📱 Get the App
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
                Order On the Go with the{" "}
                <span className="text-burnt-orange">HomeBowl App</span>
              </h2>
              <p className="text-white/65 text-lg leading-relaxed">
                Download our app for the best experience. Track your meal in real-time, chat with your
                chef, and discover new dishes every day.
              </p>
            </div>

            {/* Feature list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {appFeatures.map((feat, i) => (
                <motion.div
                  key={feat}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="flex items-center gap-2.5 text-white/80 text-sm"
                >
                  <div className="w-5 h-5 rounded-full bg-forest-green flex items-center justify-center shrink-0">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  {feat}
                </motion.div>
              ))}
            </div>

            {/* Store Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {/* App Store */}
              <motion.a
                href="#"
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-4 bg-white text-brown rounded-2xl px-6 py-4 shadow-lg hover:shadow-xl transition-all group"
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.5 2C20.5 2 21 6 18 8.5C15 11 11 10 11 10C11 10 10.5 6 13.5 3.5C16.5 1 20.5 2 20.5 2Z" fill="var(--color-brown)"/>
                  <path d="M8 13C5.5 13 3 15 3 19C3 24 6.5 29 10 29C12 29 13 28 16 28C19 28 20 29 22 29C25.5 29 29 24 29 19C29 15 26.5 13 24 13C22 13 20.5 14.5 16 14.5C11.5 14.5 10 13 8 13Z" fill="var(--color-brown)"/>
                </svg>
                <div>
                  <p className="text-xs text-brown-mid font-medium group-hover:text-burnt-orange transition-colors">
                    Download on the
                  </p>
                  <p className="text-base font-extrabold text-brown">App Store</p>
                </div>
              </motion.a>

              {/* Play Store */}
              <motion.a
                href="#"
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-4 bg-white text-brown rounded-2xl px-6 py-4 shadow-lg hover:shadow-xl transition-all group"
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 5.5L18 16L4 26.5V5.5Z" fill="#00C853"/>
                  <path d="M4 5.5L18 16L23 11L9 4L4 5.5Z" fill="#448AFF"/>
                  <path d="M4 26.5L18 16L23 21L9 28L4 26.5Z" fill="#FF6D00"/>
                  <path d="M18 16L28 10.5V21.5L18 16Z" fill="#FF1744"/>
                </svg>
                <div>
                  <p className="text-xs text-brown-mid font-medium group-hover:text-burnt-orange transition-colors">
                    Get it on
                  </p>
                  <p className="text-base font-extrabold text-brown">Google Play</p>
                </div>
              </motion.a>
            </motion.div>

            {/* Social proof */}
            <div className="flex items-center gap-4 text-white/50 text-sm">
              <div className="flex -space-x-2">
                {["👩🏾", "👨🏿", "👩🏽", "👨🏾"].map((em, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-[#3D2510] border-2 border-brown flex items-center justify-center text-sm">
                    {em}
                  </div>
                ))}
              </div>
              <span>Trusted by <strong className="text-white/80">45,000+</strong> food lovers</span>
            </div>
          </motion.div>

          {/* Right: Phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.85 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative flex justify-center"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-burnt-orange/20 rounded-full blur-3xl scale-75" />

            {/* Phone frame */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-72 h-140 bg-[#1A0F08] rounded-[3rem] border-4 border-[#3D2510] shadow-2xl overflow-hidden"
            >
              {/* Phone notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#1A0F08] rounded-full z-20" />

              {/* Screen content */}
              <div className="absolute inset-1 rounded-[2.7rem] overflow-hidden bg-cream">
                {/* App Header */}
                <div className="bg-burnt-orange pt-12 pb-6 px-5">
                  <p className="text-white/70 text-xs">Good morning 👋</p>
                  <p className="text-white font-extrabold text-lg">What&apos;s for dinner?</p>
                  <div className="mt-3 bg-white/20 rounded-xl px-3 py-2 flex items-center gap-2">
                    <span className="text-white/60 text-xs">🔍</span>
                    <span className="text-white/60 text-xs">Search meals or chefs...</span>
                  </div>
                </div>

                {/* Featured chef */}
                <div className="px-4 mt-4">
                  <p className="text-xs font-bold text-brown mb-2">⭐ Featured Today</p>
                  <div className="relative h-28 rounded-2xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=300&h=200&fit=crop"
                      alt="Featured meal"
                      fill
                      className="object-cover"
                      sizes="280px"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-brown/70 to-transparent" />
                    <div className="absolute inset-0 p-3 flex flex-col justify-end">
                      <p className="text-white font-bold text-sm">Classic Jollof Rice</p>
                      <p className="text-white/80 text-xs">by Mama Ngozi • ₦2,800</p>
                    </div>
                  </div>
                </div>

                {/* Mini meal cards */}
                <div className="px-4 mt-3">
                  <p className="text-xs font-bold text-brown mb-2">🔥 Near You</p>
                  <div className="space-y-2">
                    {[
                      { name: "Egusi Soup", price: "₦3,500", time: "35 min", emoji: "🥘" },
                      { name: "Beef Suya", price: "₦1,800", time: "20 min", emoji: "🍖" },
                    ].map((item) => (
                      <div key={item.name} className="flex items-center gap-3 bg-white rounded-xl p-2.5 shadow-sm border border-sand">
                        <div className="w-10 h-10 rounded-lg bg-sand flex items-center justify-center text-xl">
                          {item.emoji}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold text-brown">{item.name}</p>
                          <p className="text-xs text-brown-mid/60">{item.time}</p>
                        </div>
                        <span className="text-xs font-extrabold text-burnt-orange">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom nav */}
                <div className="absolute bottom-0 left-0 right-0 h-14 bg-white border-t border-sand flex items-center justify-around px-4">
                  {["🏠", "🔍", "🛒", "👤"].map((icon, i) => (
                    <button
                      key={i}
                      className={`text-xl p-1 ${i === 0 ? "text-burnt-orange" : "opacity-40"}`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating notification */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1.2 }}
              className="absolute top-16 -right-4 lg:-right-8 bg-white rounded-2xl px-4 py-3 shadow-xl border border-sand-dark max-w-40"
            >
              <p className="text-xs font-bold text-brown">🍲 Order Ready!</p>
              <p className="text-xs text-brown-mid/70 mt-0.5">Mama Ngozi just finished your jollof</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1.5 }}
              className="absolute bottom-24 -left-4 lg:-left-8 bg-white rounded-2xl px-4 py-3 shadow-xl border border-sand-dark max-w-40"
            >
              <p className="text-xs font-bold text-forest-green">⭐ 5-Star Review</p>
              <p className="text-xs text-brown-mid/70 mt-0.5">&quot;Absolutely delicious! Will order again&quot;</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
