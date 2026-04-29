"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  MapPin,
  Star,
  Calendar,
  ChevronRight,
  Sparkles,
  Trophy,
  Landmark,
  Utensils,
  Camera,
  ShoppingBag,
  Cpu,
  Waves,
  Zap,
  Clock,
  Heart,
  Search,
  Filter,
  X,
  ArrowRight,
  Users,
  Globe,
} from "lucide-react";

export const DestinationShowcase = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredCard, setHoveredCard] = useState(null);

  const getHighlightIcon = (highlight) => {
    const text = highlight.toLowerCase();
    if (
      text.includes("charminar") ||
      text.includes("red fort") ||
      text.includes("india gate") ||
      text.includes("temples") ||
      text.includes("palace") ||
      text.includes("gateway")
    ) {
      return Landmark;
    }
    if (
      text.includes("biryani") ||
      text.includes("cuisine") ||
      text.includes("food")
    ) {
      return Utensils;
    }
    if (text.includes("it hubs") || text.includes("tech")) {
      return Cpu;
    }
    if (
      text.includes("gardens") ||
      text.includes("beach") ||
      text.includes("marine")
    ) {
      return Camera;
    }
    if (text.includes("bollywood") || text.includes("stars")) {
      return Star;
    }
    if (text.includes("markets") || text.includes("shopping")) {
      return ShoppingBag;
    }
    if (text.includes("nightlife") || text.includes("water sports")) {
      return Sparkles;
    }
    return MapPin;
  };

  const categories = [
    { id: "all", name: "All Destinations", icon: Globe },
    { id: "heritage", name: "Heritage", icon: Landmark },
    { id: "modern", name: "Modern Cities", icon: Cpu },
    { id: "beach", name: "Beach", icon: Waves },
    { id: "cultural", name: "Cultural", icon: Camera },
  ];

  const destinations = [
    {
      id: 1,
      name: "Hyderabad",
      subtitle: "City of Pearls",
      image: "/asset/Hydrabad Image HomePage.jpg",
      rating: 4.8,
      bestTime: "Oct - Mar",
      highlights: ["Charminar", "Biryani", "IT Hubs"],
      category: "heritage",
      color: "from-orange-500 to-red-600",
      description: "Experience the perfect blend of ancient heritage and modern technology.",
      visitors: "50K+ monthly",
      duration: "3-4 days",
    },
    {
      id: 2,
      name: "Bangalore",
      subtitle: "Silicon Valley",
      image: "/asset/Bangalore Image HomePage.webp",
      rating: 4.7,
      bestTime: "Oct - May",
      highlights: ["Gardens", "Palace", "Tech Scene"],
      category: "modern",
      color: "from-green-500 to-emerald-600",
      description: "India's tech capital with beautiful gardens and pleasant weather.",
      visitors: "75K+ monthly",
      duration: "2-3 days",
    },
    {
      id: 3,
      name: "Mumbai",
      subtitle: "City That Never Sleeps",
      image: "/asset/Mumbai Image HomePage.jpg",
      rating: 4.6,
      bestTime: "Nov - May",
      highlights: ["Gateway", "Bollywood", "Beaches"],
      category: "modern",
      color: "from-blue-500 to-cyan-600",
      description: "The financial capital with Bollywood glamour and coastal beauty.",
      visitors: "100K+ monthly",
      duration: "3-4 days",
    },
    {
      id: 4,
      name: "Delhi",
      subtitle: "Heart of India",
      image: "/asset/Delhi Image HomePage.jpg",
      rating: 4.5,
      bestTime: "Oct - Mar",
      highlights: ["Red Fort", "India Gate", "Markets"],
      category: "heritage",
      color: "from-purple-500 to-pink-600",
      description: "Where history meets modernity in India's capital city.",
      visitors: "80K+ monthly",
      duration: "3-5 days",
    },
    {
      id: 5,
      name: "Chennai",
      subtitle: "Cultural Capital",
      image: "/asset/Chennai Image HomePage.jpg",
      rating: 4.4,
      bestTime: "Dec - Mar",
      highlights: ["Temples", "Marina Beach", "Cuisine"],
      category: "cultural",
      color: "from-teal-500 to-blue-600",
      description: "South India's cultural hub with temples and coastal charm.",
      visitors: "45K+ monthly",
      duration: "2-3 days",
    },
    {
      id: 6,
      name: "Goa",
      subtitle: "Beach Paradise",
      image: "/asset/Goa Image HomePage.jpg",
      rating: 4.9,
      bestTime: "Nov - May",
      highlights: ["Beaches", "Nightlife", "Water Sports"],
      category: "beach",
      color: "from-yellow-500 to-orange-600",
      description: "India's beach destination with Portuguese heritage and vibrant nightlife.",
      visitors: "120K+ monthly",
      duration: "4-5 days",
    },
  ];

  const filteredDestinations = selectedCategory === "all" 
    ? destinations 
    : destinations.filter(dest => dest.category === selectedCategory);

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,theme(colors.blue.50),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,theme(colors.emerald.50),transparent_50%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6"
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-blue-700">Explore Destinations</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight"
          >
            Discover
            <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              {" "}Amazing Places
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            From historic landmarks to modern cities, explore India's most captivating destinations with our premium transportation services.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
                }`}
              >
                <IconComponent size={16} />
                <span>{category.name}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                onHoverStart={() => setHoveredCard(destination.id)}
                onHoverEnd={() => setHoveredCard(null)}
                className="group relative"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100">
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Floating Badge */}
                    <motion.div
                      animate={{ scale: hoveredCard === destination.id ? [1, 1.1, 1] : 1 }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-lg"
                    >
                      <Star className="text-yellow-500 fill-current" size={14} />
                      <span className="text-sm font-bold text-slate-900">{destination.rating}</span>
                    </motion.div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                      <span className="text-xs font-semibold">{destination.category}</span>
                    </div>

                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-2xl font-bold text-white mb-1">{destination.name}</h3>
                      <p className="text-white/90 text-sm">{destination.subtitle}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                      {destination.description}
                    </p>

                    {/* Quick Info */}
                    <div className="flex items-center justify-between mb-4 text-sm">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Calendar size={14} />
                        <span>{destination.bestTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500">
                        <Clock size={14} />
                        <span>{destination.duration}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2">
                      {destination.highlights.slice(0, 2).map((highlight, idx) => {
                        const IconComponent = getHighlightIcon(highlight);
                        return (
                          <div
                            key={idx}
                            className="flex items-center gap-1 px-2 py-1 bg-slate-50 rounded-lg"
                          >
                            <IconComponent size={12} className="text-blue-500" />
                            <span className="text-xs font-medium text-slate-700">{highlight}</span>
                          </div>
                        );
                      })}
                      {destination.highlights.length > 2 && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-slate-50 rounded-lg">
                          <span className="text-xs font-medium text-slate-700">
                            +{destination.highlights.length - 2} more
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <motion.div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${destination.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4 w-20 h-20 bg-white rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-32 h-32 bg-white rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white rounded-full"></div>
            </div>

            <div className="relative z-10">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
                className="text-3xl sm:text-4xl font-bold mb-4"
              >
                Your Perfect Journey Awaits
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
                className="text-xl mb-8 opacity-90 max-w-2xl mx-auto"
              >
                Choose your destination and let us transport you there in style and comfort.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.1 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/fleet")}
                  className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Sparkles size={18} />
                  Book Your Trip
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/destinations")}
                  className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-bold rounded-xl border-2 border-white/30 hover:bg-white/30 transition-all duration-300"
                >
                  View All Destinations
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
