"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";

// Inline SVG social icons (lucide-react doesn't include socials in this version)
const SocialIcons = {
  Instagram: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  Twitter: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  Facebook: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  YouTube: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
};

const footerLinks = {
  Company: ["About Us", "Our Story", "Careers", "Press & Media", "Blog"],
  Customers: [
    "How It Works",
    "Browse Meals",
    "Find a Chef",
    "Download App",
    "Help Center",
  ],
  Chefs: [
    "Become a Chef",
    "Chef Resources",
    "Earnings Calculator",
    "Chef Stories",
    "Training",
  ],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Food Safety"],
};

const socialLinks = [
  { icon: <SocialIcons.Instagram />, label: "Instagram", href: "#" },
  { icon: <SocialIcons.Twitter />, label: "Twitter", href: "#" },
  { icon: <SocialIcons.Facebook />, label: "Facebook", href: "#" },
  { icon: <SocialIcons.YouTube />, label: "YouTube", href: "#" },
];

const cities = [
  "Lagos",
  "Abuja",
  "Port Harcourt",
  "Ibadan",
  "Kaduna",
  "London",
  "New York",
  "Toronto",
];

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <footer className="bg-[#1A0F08] text-white relative overflow-hidden">
      {/* Newsletter Banner */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between gap-8 bg-linear-to-br from-burnt-orange/20 to-forest-green/10 rounded-3xl p-8 border border-burnt-orange/20"
          >
            <div>
              <h3 className="text-2xl font-extrabold text-white mb-1">
                Get ₦500 off your first order 🎉
              </h3>
              <p className="text-white/60">
                Subscribe for exclusive deals, new chef announcements, and
                delicious inspiration.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 md:w-64 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 outline-none focus:border-burnt-orange transition-colors text-sm"
              />
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-5 py-3 bg-burnt-orange text-white font-bold rounded-xl hover:bg-burnt-orange-light transition-colors flex items-center gap-1.5 shrink-0 text-sm"
              >
                Subscribe <ArrowRight size={15} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2">
            <Logo textColor="white" className="mb-4" />
            <p className="text-white/55 text-sm leading-relaxed mb-6 max-w-xs">
              Connecting communities through the authentic flavors of home
              cooking. Real chefs, real food, real love.
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-6">
              {[
                { icon: <Mail size={14} />, text: "hello@homebowl.ng" },
                { icon: <Phone size={14} />, text: "+234 800 HOME BOWL" },
                { icon: <MapPin size={14} />, text: "Lagos, Nigeria" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-2.5 text-white/55 text-sm"
                >
                  <span className="text-burnt-orange">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex gap-2.5">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "var(--color-burnt-orange)",
                  }}
                  className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="col-span-1">
              <h4 className="text-white font-bold text-sm mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/50 text-sm hover:text-burnt-orange transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Cities row */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-white/40 text-xs mb-3 uppercase tracking-widest font-medium">
            Available in
          </p>
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <span
                key={city}
                className="px-3 py-1.5 rounded-full bg-white/8 text-white/50 text-xs hover:text-burnt-orange hover:bg-burnt-orange/10 transition-colors cursor-pointer border border-white/10"
              >
                {city}
              </span>
            ))}
            <span className="px-3 py-1.5 rounded-full bg-forest-green/20 text-forest-green-light text-xs border border-forest-green/30">
              + More coming soon
            </span>
          </div>
        </div>

        {/* App store buttons compact */}
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#"
            className="flex items-center gap-2 bg-white/8 hover:bg-white/15 border border-white/15 rounded-xl px-4 py-2 transition-all"
          >
            <span className="text-lg">🍎</span>
            <div>
              <p className="text-white/50 text-xs">Download on the</p>
              <p className="text-white font-semibold text-sm">App Store</p>
            </div>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 bg-white/8 hover:bg-white/15 border border-white/15 rounded-xl px-4 py-2 transition-all"
          >
            <span className="text-lg">▶️</span>
            <div>
              <p className="text-white/50 text-xs">Get it on</p>
              <p className="text-white font-semibold text-sm">Google Play</p>
            </div>
          </a>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © 2026 HomeBowl Technologies Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-white/30 text-xs">
              Made with ❤️ in Lagos, Nigeria
            </span>
            <div className="flex gap-3 text-white/30 text-xs">
              <a href="#" className="hover:text-white/60 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white/60 transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white/60 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
