"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, MapPin, ChefHat, ArrowRight } from "lucide-react";
import Image from "next/image";

const chefs = [
  {
    id: 1,
    name: "Mama Ngozi",
    specialty: "West African Cuisine",
    city: "Lagos, Nigeria",
    image:
      "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=400&h=400&fit=crop&crop=face",
    rating: 4.9,
    reviews: 342,
    meals: 12,
    bio: "25 years of cooking, 3 generations of recipes. Every dish tells a story from my grandmother's kitchen.",
    tags: ["Jollof Rice", "Egusi", "Banga Soup"],
    badge: "Top Chef",
    badgeColor: "var(--color-burnt-orange)",
    ordersThisWeek: 87,
  },
  {
    id: 2,
    name: "Chef Emeka",
    specialty: "Igbo Traditional Meals",
    city: "Enugu, Nigeria",
    image:
      "https://images.unsplash.com/photo-1622021142947-da7dedc7c39a?w=400&h=400&fit=crop&crop=face",
    rating: 4.8,
    reviews: 198,
    meals: 9,
    bio: "Trained in Enugu, perfected in Lagos. My ofe onugbu will change your life forever.",
    tags: ["Ofe Onugbu", "Oha Soup", "Ukwa"],
    badge: "Rising Star",
    badgeColor: "var(--color-forest-green)",
    ordersThisWeek: 63,
  },
  {
    id: 3,
    name: "Mallam Hassan",
    specialty: "Northern Nigerian Grills",
    city: "Kaduna, Nigeria",
    image:
      "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=400&h=400&fit=crop&crop=face",
    rating: 5.0,
    reviews: 421,
    meals: 7,
    bio: "The original suya master. My family recipe has been passed down for over 40 years.",
    tags: ["Suya", "Kilishi", "Masa"],
    badge: "5-Star Legend",
    badgeColor: "var(--color-burnt-orange)",
    ordersThisWeek: 124,
  },
  {
    id: 4,
    name: "Auntie Bisi",
    specialty: "Yoruba Home Cooking",
    city: "Ibadan, Nigeria",
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop&crop=face",
    rating: 4.7,
    reviews: 156,
    meals: 14,
    bio: "Every meal I make is an invitation to sit at my mother's table and feel truly at home.",
    tags: ["Efo Riro", "Gbegiri", "Ofada Stew"],
    badge: "Community Favorite",
    badgeColor: "var(--color-forest-green)",
    ordersThisWeek: 49,
  },
];

export default function FeaturedChefs() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="featured-chefs"
      className="py-24 bg-sand relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-burnt-orange/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-forest-green/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14"
        >
          <div>
            <div className="inline-flex items-center gap-2 bg-burnt-orange/10 text-burnt-orange px-4 py-2 rounded-full text-sm font-semibold mb-3">
              <ChefHat size={14} />
              Hand-Picked & Verified
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-brown leading-tight">
              Meet Our <br />
              <span className="text-burnt-orange">Home Chefs</span>
            </h2>
          </div>
          <p className="text-brown-mid/70 max-w-sm sm:text-right">
            Real people, real kitchens, real passion. Every chef is personally
            verified by our team.
          </p>
        </motion.div>

        {/* Chef Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {chefs.map((chef, index) => (
            <motion.div
              key={chef.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-burnt-orange/15 border border-sand-dark transition-all duration-300 cursor-pointer"
            >
              {/* Image area */}
              <div className="relative h-52 overflow-hidden bg-sand">
                <Image
                  src={chef.image}
                  alt={chef.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-brown/60 via-transparent to-transparent" />

                {/* Badge */}
                <div
                  className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white"
                  style={{ background: chef.badgeColor }}
                >
                  {chef.badge}
                </div>

                {/* Orders this week */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs font-bold text-brown">
                  🔥 {chef.ordersThisWeek} orders
                </div>

                {/* Name overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-extrabold text-xl leading-tight">
                    {chef.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-white/80 text-xs mt-0.5">
                    <MapPin size={11} />
                    {chef.city}
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div className="p-5">
                <p className="text-burnt-orange font-semibold text-sm mb-2">
                  {chef.specialty}
                </p>
                <p className="text-brown-mid/65 text-sm leading-relaxed line-clamp-2 mb-4">
                  {chef.bio}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {chef.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-sand text-brown-mid text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-sand">
                  <div className="flex items-center gap-1">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    <span className="font-bold text-brown text-sm">
                      {chef.rating}
                    </span>
                    <span className="text-brown-mid/50 text-xs">
                      ({chef.reviews})
                    </span>
                  </div>
                  <div className="text-brown-mid/60 text-xs">
                    {chef.meals} dishes
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-8 h-8 rounded-full bg-burnt-orange flex items-center justify-center text-white shadow-sm hover:bg-burnt-orange-dark transition-colors"
                  >
                    <ArrowRight size={14} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Become a chef CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 bg-linear-to-br from-brown to-[#3D2510] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative"
        >
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, var(--color-burnt-orange) 0%, transparent 50%), radial-gradient(circle at 80% 50%, var(--color-forest-green) 0%, transparent 50%)",
            }}
          />

          <div className="relative">
            <div className="text-4xl mb-3">👩‍🍳</div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
              Are You a Home Cook?
            </h3>
            <p className="text-white/70 max-w-md">
              Turn your passion for cooking into income. Join 12,000+ home chefs
              earning on HomeBowl. Set your own hours, your own menu, your own
              prices.
            </p>
          </div>

          <div className="relative flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-6 text-center mb-2">
              <div>
                <p className="text-3xl font-extrabold text-burnt-orange">
                  ₦85K
                </p>
                <p className="text-white/60 text-sm">Avg. monthly earnings</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-forest-green-light">
                  Free
                </p>
                <p className="text-white/60 text-sm">To join & list meals</p>
              </div>
            </div>
            <motion.button
              whileHover={{
                scale: 1.04,
                boxShadow: "0 12px 24px rgba(198,93,7,0.4)",
              }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 bg-burnt-orange text-white font-bold rounded-full hover:bg-burnt-orange-light transition-all whitespace-nowrap"
            >
              Start Cooking with Us →
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
