"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: "🏠",
    title: "Browse Local Chefs",
    description:
      "Discover passionate home cooks in your neighborhood. Browse their menus, read reviews, and find your next favorite meal.",
    color: "var(--color-burnt-orange)",
    bg: "var(--color-orange-tint)",
    detail: "Filter by cuisine, diet, price & distance",
  },
  {
    number: "02",
    icon: "🛒",
    title: "Place Your Order",
    description:
      "Customize your meal, choose your delivery time, and order with just a few taps. It's that easy.",
    color: "var(--color-forest-green)",
    bg: "var(--color-green-tint)",
    detail: "Secure payment, instant confirmation",
  },
  {
    number: "03",
    icon: "🍲",
    title: "Enjoy Homemade Goodness",
    description:
      "Your meal is freshly prepared and delivered warm to your door. Pure, authentic flavors made with love.",
    color: "var(--color-burnt-orange)",
    bg: "var(--color-orange-tint)",
    detail: "Real-time tracking, fresh & hot delivery",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="how-it-works"
      className="relative py-24 bg-sand overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-24 bg-linear-to-b from-sand to-transparent" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-80 h-80 border-2 border-dashed border-burnt-orange/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -left-20 w-96 h-96 border-2 border-dashed border-forest-green/10 rounded-full"
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
            Simple as 1, 2, 3
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-brown mb-4 leading-tight">
            How <span className="text-burnt-orange">HomeBowl</span> Works
          </h2>
          <p className="text-lg text-brown-mid/70 max-w-xl mx-auto">
            From your neighbor&apos;s kitchen to your table in three simple
            steps.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-6 lg:gap-8 relative"
        >
          {/* Connector line on desktop */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-linear-to-r from-burnt-orange/20 via-burnt-orange/60 to-burnt-orange/20" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={cardVariants}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 40px rgba(198,93,7,0.15)",
              }}
              className="relative bg-white rounded-3xl p-8 shadow-sm border border-sand-dark group cursor-default"
            >
              {/* Step number */}
              <div
                className="absolute -top-4 left-8 w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-black shadow-md"
                style={{ background: step.color }}
              >
                {step.number}
              </div>

              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.15, rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 mt-2"
                style={{ background: step.bg }}
              >
                {step.icon}
              </motion.div>

              {/* Content */}
              <h3 className="text-xl font-bold text-brown mb-3 group-hover:text-burnt-orange transition-colors">
                {step.title}
              </h3>
              <p className="text-brown-mid/70 leading-relaxed mb-4">
                {step.description}
              </p>

              {/* Detail tag */}
              <div
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ color: step.color, background: step.bg }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: step.color }}
                />
                {step.detail}
              </div>

              {/* Arrow connector for mobile */}
              {index < steps.length - 1 && (
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="md:hidden flex justify-center mt-6"
                >
                  <ArrowRight className="text-burnt-orange/40" size={24} />
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-14"
        >
          <motion.a
            href="#popular-meals"
            whileHover={{
              scale: 1.04,
              boxShadow: "0 12px 28px rgba(198,93,7,0.30)",
            }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-burnt-orange text-white font-bold rounded-full shadow-lg shadow-burnt-orange/25 hover:bg-burnt-orange-dark transition-all text-base"
          >
            Start Exploring
            <ArrowRight size={18} />
          </motion.a>
          <p className="text-sm text-brown-mid/50 mt-3">
            No registration required to browse
          </p>
        </motion.div>
      </div>
    </section>
  );
}
