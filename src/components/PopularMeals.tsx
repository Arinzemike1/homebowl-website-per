"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, Clock, Heart, ShoppingCart, Flame } from "lucide-react";
import Image from "next/image";

const categories = [
  "All",
  "Rice Dishes",
  "Soups & Stews",
  "Grilled",
  "Snacks",
  "Drinks",
];

const meals = [
  {
    id: 1,
    name: "Classic Jollof Rice",
    chef: "Mama Ngozi",
    chefCity: "Lagos",
    image:
      "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&h=300&fit=crop",
    rating: 4.9,
    reviews: 234,
    time: "25–35 min",
    price: 2800,
    category: "Rice Dishes",
    hot: true,
    tags: ["Spicy", "Nigerian"],
    description:
      "Smoky, perfectly seasoned Nigerian jollof rice cooked over firewood.",
  },
  {
    id: 2,
    name: "Egusi Soup & Fufu",
    chef: "Chef Adaeze",
    chefCity: "Enugu",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 189,
    time: "35–45 min",
    price: 3500,
    category: "Soups & Stews",
    hot: false,
    tags: ["Traditional", "Hearty"],
    description:
      "Rich egusi soup with assorted meats, served with soft pounded fufu.",
  },
  {
    id: 3,
    name: "Beef Suya Platter",
    chef: "Mallam Hassan",
    chefCity: "Kaduna",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
    rating: 5.0,
    reviews: 312,
    time: "20–30 min",
    price: 1800,
    category: "Grilled",
    hot: true,
    tags: ["Grilled", "Northern"],
    description:
      "Spiced skewered beef suya grilled over open charcoal. A street-food legend.",
  },
  {
    id: 4,
    name: "Pepper Soup",
    chef: "Mama Chioma",
    chefCity: "Port Harcourt",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 156,
    time: "30–40 min",
    price: 2200,
    category: "Soups & Stews",
    hot: true,
    tags: ["Spicy", "Hot"],
    description:
      "Aromatic catfish pepper soup with native spices and utazi leaves.",
  },
  {
    id: 5,
    name: "Fried Plantain & Eggs",
    chef: "Auntie Bisi",
    chefCity: "Ibadan",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 98,
    time: "15–20 min",
    price: 1200,
    category: "Snacks",
    hot: false,
    tags: ["Breakfast", "Quick"],
    description:
      "Crispy golden plantain (dodo) paired with soft scrambled eggs.",
  },
  {
    id: 6,
    name: "Ofada Rice & Stew",
    chef: "Iya Gbemisola",
    chefCity: "Ogun",
    image:
      "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400&h=300&fit=crop",
    rating: 4.9,
    reviews: 201,
    time: "30–45 min",
    price: 3200,
    category: "Rice Dishes",
    hot: false,
    tags: ["Premium", "Local"],
    description: "Heritage Ofada rice paired with smoky ayamase designer stew.",
  },
];

export default function PopularMeals() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [likedMeals, setLikedMeals] = useState<number[]>([]);

  const filtered =
    activeCategory === "All"
      ? meals
      : meals.filter((m) => m.category === activeCategory);

  const toggleLike = (id: number) =>
    setLikedMeals((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );

  return (
    <section
      id="popular-meals"
      className="py-24 bg-cream relative overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-burnt-orange) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <div className="inline-flex items-center gap-2 bg-burnt-orange/10 text-burnt-orange px-4 py-2 rounded-full text-sm font-semibold mb-3">
              <Flame size={14} className="fill-current" />
              Trending Today
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-brown leading-tight">
              Popular <span className="text-burnt-orange">Meals</span>
            </h2>
          </div>
          <a
            href="#"
            className="text-burnt-orange font-semibold text-sm hover:underline flex items-center gap-1 shrink-0"
          >
            View all meals →
          </a>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex gap-2.5 overflow-x-auto pb-2 mb-8 scrollbar-hide"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-burnt-orange text-white shadow-md shadow-burnt-orange/30"
                  : "bg-sand-dark text-brown-mid hover:bg-[#DCC9AC]"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Meal Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((meal, index) => (
            <motion.div
              key={meal.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-burnt-orange/12 border border-sand-dark transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={meal.image}
                  alt={meal.name}
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-brown/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {meal.hot && (
                    <span className="flex items-center gap-1 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      <Flame size={10} className="fill-white" /> Hot
                    </span>
                  )}
                  {meal.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-brown/60 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Like button */}
                <button
                  onClick={() => toggleLike(meal.id)}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                >
                  <Heart
                    size={16}
                    className={
                      likedMeals.includes(meal.id)
                        ? "fill-red-500 text-red-500"
                        : "text-brown-mid"
                    }
                  />
                </button>

                {/* Quick order overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <button className="w-full bg-burnt-orange text-white font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-burnt-orange-dark transition-colors">
                    <ShoppingCart size={15} />
                    Quick Order
                  </button>
                </motion.div>
              </div>

              {/* Card Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-brown text-lg leading-tight">
                    {meal.name}
                  </h3>
                  <span className="text-burnt-orange font-extrabold text-lg shrink-0">
                    ₦{meal.price.toLocaleString()}
                  </span>
                </div>

                <p className="text-brown-mid/60 text-sm mb-3 line-clamp-2">
                  {meal.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-sand flex items-center justify-center text-sm">
                      👩‍🍳
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-brown">
                        {meal.chef}
                      </p>
                      <p className="text-xs text-brown-mid/50">
                        {meal.chefCity}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1">
                      <Star
                        size={12}
                        className="fill-amber-400 text-amber-400"
                      />
                      <span className="text-xs font-bold text-brown">
                        {meal.rating}
                      </span>
                      <span className="text-xs text-brown-mid/50">
                        ({meal.reviews})
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-brown-mid/60">
                      <Clock size={11} />
                      <span className="text-xs">{meal.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load more */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 border-2 border-burnt-orange text-burnt-orange font-bold rounded-full hover:bg-burnt-orange hover:text-white transition-all"
          >
            Load More Meals
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
