"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, MapPin, Search } from "lucide-react";
import Logo from "./Logo";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Explore Meals", href: "#popular-meals" },
  { label: "Meet Chefs", href: "#featured-chefs" },
  { label: "About", href: "#why-homebowl" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [location, setLocation] = useState("Lagos, NG");

  const locations = [
    "Lagos, NG",
    "Abuja, NG",
    "Port Harcourt, NG",
    "London, UK",
    "New York, US",
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-cream/95 backdrop-blur-lg shadow-lg shadow-burnt-orange/10 border-b border-sand-dark"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-3">
            {/* Logo */}
            <Logo />

            {/* Location picker */}
            <div className="hidden md:flex items-center">
              <button
                onClick={() => setLocationOpen(!locationOpen)}
                className="flex items-center gap-1.5 text-sm font-medium text-brown-mid hover:text-burnt-orange transition-colors px-3 py-2 rounded-xl hover:bg-sand-dark/60 relative"
              >
                <MapPin size={15} className="text-burnt-orange" />
                <span>{location}</span>
                <ChevronDown
                  size={13}
                  className={`transition-transform ${locationOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {locationOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full mt-2 left-0 bg-cream rounded-2xl shadow-xl border border-sand-dark py-2 min-w-45 overflow-hidden"
                    style={{ top: "100%", left: "50%" }}
                  >
                    {locations.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => {
                          setLocation(loc);
                          setLocationOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-sand transition-colors ${
                          loc === location
                            ? "text-burnt-orange font-semibold"
                            : "text-brown"
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-brown-mid hover:text-burnt-orange rounded-xl hover:bg-sand-dark/60 transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-brown-mid hover:text-burnt-orange transition-colors">
                <Search size={15} />
                Search
              </button>
              <a
                href="#"
                className="px-4 py-2 text-sm font-medium text-burnt-orange hover:text-burnt-orange-dark transition-colors"
              >
                Sign In
              </a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-5 py-2.5 bg-burnt-orange text-white text-sm font-semibold rounded-full hover:bg-burnt-orange-dark transition-all shadow-md shadow-burnt-orange/30"
              >
                Order Now
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl text-brown hover:bg-sand-dark transition-colors"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-cream border-t border-sand-dark overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center px-4 py-3 text-brown font-medium rounded-xl hover:bg-sand hover:text-burnt-orange transition-all"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-2 flex gap-3">
                  <a
                    href="#"
                    className="flex-1 py-3 text-center text-burnt-orange font-semibold border border-burnt-orange rounded-full hover:bg-burnt-orange/10 transition-all"
                  >
                    Sign In
                  </a>
                  <a
                    href="#"
                    className="flex-1 py-3 text-center text-white font-semibold bg-burnt-orange rounded-full hover:bg-burnt-orange-dark transition-all"
                  >
                    Order Now
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
