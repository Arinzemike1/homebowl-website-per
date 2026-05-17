"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Clock, Leaf, Heart, Award, Users } from "lucide-react";

const features = [
  {
    icon: <Heart size={24} />,
    title: "Made With Love",
    description:
      "Every meal is handcrafted by a real person who genuinely cares about what they cook. You taste the difference.",
    color: "var(--color-burnt-orange)",
    bg: "var(--color-orange-tint)",
    stat: "100%",
    statLabel: "Homemade",
  },
  {
    icon: <Shield size={24} />,
    title: "Verified & Safe",
    description:
      "All chefs go through food safety certification, kitchen inspections, and identity verification before joining.",
    color: "var(--color-forest-green)",
    bg: "var(--color-green-tint)",
    stat: "100%",
    statLabel: "Certified Kitchens",
  },
  {
    icon: <Clock size={24} />,
    title: "Fresh Every Time",
    description:
      "No pre-cooked batches. Your order is prepared fresh on-demand within your chosen delivery window.",
    color: "var(--color-burnt-orange)",
    bg: "var(--color-orange-tint)",
    stat: "0",
    statLabel: "Pre-made meals",
  },
  {
    icon: <Leaf size={24} />,
    title: "Natural Ingredients",
    description:
      "Home chefs use fresh, local market ingredients — no additives, no preservatives, just real food.",
    color: "var(--color-forest-green)",
    bg: "var(--color-green-tint)",
    stat: "Local",
    statLabel: "Sourced Ingredients",
  },
  {
    icon: <Award size={24} />,
    title: "Cultural Authenticity",
    description:
      "Recipes passed down through generations. Experience flavors that restaurants simply cannot replicate.",
    color: "var(--color-burnt-orange)",
    bg: "var(--color-orange-tint)",
    stat: "50+",
    statLabel: "Regional Cuisines",
  },
  {
    icon: <Users size={24} />,
    title: "Community Impact",
    description:
      "Every order supports a local family. We invest 5% of platform fees back into chef training and development.",
    color: "var(--color-forest-green)",
    bg: "var(--color-green-tint)",
    stat: "12K+",
    statLabel: "Families Supported",
  },
];

export default function WhyHomeBowl() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="why-homebowl"
      className="py-24 bg-cream relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -right-16 w-64 h-64 rounded-full bg-burnt-orange/6 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute bottom-1/4 -left-16 w-64 h-64 rounded-full bg-forest-green/6 blur-3xl"
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
          <div className="inline-flex items-center gap-2 bg-forest-green/10 text-forest-green px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Why We&apos;re Different
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-brown mb-4 leading-tight">
            More Than Just{" "}
            <span className="text-burnt-orange">Food Delivery</span>
          </h2>
          <p className="text-lg text-brown-mid/70 max-w-2xl mx-auto">
            HomeBowl is a movement to preserve culinary heritage, empower home
            cooks, and bring communities together through the universal language
            of food.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group bg-white rounded-3xl p-7 shadow-sm hover:shadow-xl hover:shadow-burnt-orange/10 border border-sand-dark transition-all duration-300"
            >
              {/* Icon */}
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.4 }}
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: feature.bg, color: feature.color }}
              >
                {feature.icon}
              </motion.div>

              {/* Title & description */}
              <h3 className="text-xl font-bold text-brown mb-2 group-hover:text-burnt-orange transition-colors">
                {feature.title}
              </h3>
              <p className="text-brown-mid/65 text-sm leading-relaxed mb-5">
                {feature.description}
              </p>

              {/* Stat */}
              <div className="flex items-center gap-3 pt-4 border-t border-sand">
                <div>
                  <span
                    className="text-2xl font-extrabold"
                    style={{ color: feature.color }}
                  >
                    {feature.stat}
                  </span>
                  <span className="text-brown-mid/50 text-xs ml-1.5 font-medium">
                    {feature.statLabel}
                  </span>
                </div>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="ml-auto w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                  style={{ background: feature.bg, color: feature.color }}
                >
                  →
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison table teaser */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 bg-linear-to-br from-sand to-sand-dark rounded-3xl p-8 md:p-10"
        >
          <h3 className="text-2xl font-extrabold text-brown text-center mb-8">
            HomeBowl vs. Regular Food Delivery
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div />
            <div className="bg-burnt-orange text-white rounded-2xl py-3 font-bold">
              HomeBowl ✓
            </div>
            <div className="bg-brown/10 text-brown-mid rounded-2xl py-3 font-medium">
              Others
            </div>

            {[
              ["Homemade & Fresh", "✓", "✗"],
              ["Cultural Authenticity", "✓", "✗"],
              ["Direct Chef Connection", "✓", "✗"],
              ["No Mass Production", "✓", "✗"],
              ["Community First", "✓", "✗"],
            ].map(([label, yes, no]) => (
              <React.Fragment key={label}>
                <div className="py-3 text-left text-brown-mid font-medium pl-2">
                  {label}
                </div>
                <div className="py-3 text-forest-green font-bold text-lg">
                  {yes}
                </div>
                <div className="py-3 text-red-400 font-bold text-lg">{no}</div>
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
