"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  ArrowRight,
  CheckCircle,
  Users,
  ChefHat,
  Utensils,
  Loader2,
} from "lucide-react";
import Logo from "./Logo";

const stats = [
  { value: "2,400+", label: "Already signed up", icon: <Users size={18} /> },
  {
    value: "Home Chefs",
    label: "Joining the kitchen",
    icon: <ChefHat size={18} />,
  },
];

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"foodie" | "chef" | "">("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !role) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data.message || "Something went wrong. Please try again.",
        );
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-(--color-sand) flex flex-col">
      {/* Minimal Nav */}
      <header className="flex items-center justify-center px-6 py-5 border-b border-(--color-sand-dark)">
        <Logo />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-(--color-forest-green) text-white text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-(--color-burnt-orange-light) animate-pulse" />
              Coming soon — be first in line
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-center text-4xl sm:text-5xl font-fraunces font-bold text-(--color-brown) leading-tight mb-4"
          >
            Home-cooked <span className="text-forest-green italic">meals,</span>{" "}
            delivered to <span className="text-burnt-orange">you!</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-center text-(--color-brown-mid) text-lg mb-10"
          >
            HomeBowl connects you to passionate home chefs in your
            neighbourhood. Join the waitlist and get early access.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="flex justify-center gap-8 mb-10"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-2 text-(--color-brown-mid)"
              >
                <span className="text-(--color-burnt-orange)">{s.icon}</span>
                <div>
                  <p className="font-semibold text-(--color-brown) text-sm leading-tight">
                    {s.value}
                  </p>
                  <p className="text-xs">{s.label}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="bg-(--color-cream) rounded-2xl shadow-lg shadow-(--color-burnt-orange)/10 border border-(--color-sand-dark) p-8"
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center text-center gap-4 py-4"
                >
                  <div className="w-14 h-14 rounded-full bg-(--color-green-tint) flex items-center justify-center">
                    <CheckCircle
                      size={28}
                      className="text-(--color-forest-green)"
                    />
                  </div>
                  <h2
                    className="text-xl font-bold text-(--color-brown)"
                    style={{ fontFamily: "var(--font-fraunces, serif)" }}
                  >
                    You&apos;re on the list!
                  </h2>
                  <p className="text-(--color-brown-mid)">
                    We&apos;ll email you at <strong>{email}</strong> when
                    HomeBowl launches in your area. Spread the word!
                  </p>
                  <div className="flex gap-3 mt-2">
                    <a
                      href={`https://twitter.com/intent/tweet?text=Just joined the @homebowl_app waitlist! Home-cooked meals delivered to your door. Get early access 👇&url=${encodeURIComponent("https://homebowl.app")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-(--color-forest-green) text-white text-sm font-medium hover:bg-(--color-forest-green-dark) transition-colors"
                    >
                      Share on X
                    </a>
                    <a
                      href={`https://wa.me/?text=I just joined the HomeBowl waitlist! Home-cooked meals delivered to your door. Join here: https://homebowl.app`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-(--color-orange-tint) text-(--color-burnt-orange) border border-burnt-orange/30 text-sm font-medium hover:bg-(--color-sand-dark) transition-colors"
                    >
                      Share on WhatsApp
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  {/* Role toggle */}
                  <div>
                    <p className="text-sm font-medium text-(--color-brown) mb-2">
                      I am joining as a…
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {(["foodie", "chef"] as const).map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setRole(r)}
                          className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-semibold transition-all duration-200 cursor-pointer ${
                            role === r
                              ? "bg-(--color-burnt-orange) text-white border-(--color-burnt-orange) shadow-md"
                              : "bg-white text-(--color-brown-mid) border-(--color-sand-dark) hover:border-(--color-burnt-orange) hover:text-(--color-burnt-orange)"
                          }`}
                        >
                          {r === "foodie" ? (
                            <>
                              <Utensils size={15} strokeWidth={2.2} /> Foodie
                            </>
                          ) : (
                            <>
                              <ChefHat size={15} strokeWidth={2.2} /> Home Chef
                            </>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-(--color-brown-mid)/60"
                    />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-(--color-sand-dark) bg-white text-(--color-brown) placeholder:text-(--color-brown-mid)/50 focus:outline-none focus:ring-2 focus:ring-burnt-orange/40 focus:border-(--color-burnt-orange) transition-all"
                    />
                  </div>

                  {/* Error */}
                  {status === "error" && (
                    <p className="text-sm text-red-600 text-center">
                      {errorMsg}
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "loading" || !email || !role}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-(--color-burnt-orange) hover:bg-(--color-burnt-orange-dark) disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-base transition-all duration-200 shadow-md shadow-(--color-burnt-orange)/30"
                  >
                    {status === "loading" ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <>
                        Join the Waitlist <ArrowRight size={18} />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-(--color-brown-mid)/70">
                    No spam, ever. Unsubscribe anytime.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-(--color-brown-mid)/60 border-t border-(--color-sand-dark)">
        © {new Date().getFullYear()} HomeBowl. All rights reserved.
      </footer>
    </div>
  );
}
