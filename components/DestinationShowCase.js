"use client";

import React from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";

export const DestinationShowcase = () => {
  const router = useRouter();

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

  const featuredDestinations = [
    {
      id: 1,
      name: "Hyderabad",
      subtitle: "City of Pearls",
      image: "/asset/Hydrabad Image HomePage.jpg",
      rating: 4.8,
      bestTime: "Oct - Mar",
      highlights: ["Charminar", "Biryani", "IT Hubs"],
      color: "from-orange-500 to-red-600",
      bgGradient: "from-orange-50 to-red-50",
    },
    {
      id: 2,
      name: "Bangalore",
      subtitle: "Silicon Valley",
      image: "/asset/Bangalore Image HomePage.webp",
      rating: 4.7,
      bestTime: "Oct - May",
      highlights: ["Gardens", "Palace", "Tech Scene"],
      color: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
    },
    {
      id: 3,
      name: "Mumbai",
      subtitle: "City That Never Sleeps",
      image: "/asset/Mumbai Image HomePage.jpg",
      rating: 4.6,
      bestTime: "Nov - May",
      highlights: ["Gateway", "Bollywood", "Beaches"],
      color: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-50 to-cyan-50",
    },
    {
      id: 4,
      name: "Delhi",
      subtitle: "Heart of India",
      image: "/asset/Delhi Image HomePage.jpg",
      rating: 4.5,
      bestTime: "Oct - Mar",
      highlights: ["Red Fort", "India Gate", "Markets"],
      color: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-50 to-pink-50",
    },
    {
      id: 5,
      name: "Chennai",
      subtitle: "Cultural Capital",
      image: "/asset/Chennai Image HomePage.jpg",
      rating: 4.4,
      bestTime: "Dec - Mar",
      highlights: ["Temples", "Marina Beach", "Cuisine"],
      color: "from-teal-500 to-blue-600",
      bgGradient: "from-teal-50 to-blue-50",
    },
    {
      id: 6,
      name: "Goa",
      subtitle: "Beach Paradise",
      image: "/asset/Goa Image HomePage.jpg",
      rating: 4.9,
      bestTime: "Nov - May",
      highlights: ["Beaches", "Nightlife", "Water Sports"],
      color: "from-yellow-500 to-orange-600",
      bgGradient: "from-yellow-50 to-orange-50",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-orange-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-cyan-400/10 to-emerald-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#0056D2] via-[#4A8BDF] to-[#43E0F8] text-white rounded-full mb-6 shadow-xl"
          >
            <Sparkles size={20} className="animate-pulse" />
            <span
              className="font-bold text-sm uppercase tracking-wider"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Explore Destinations
            </span>
            <Sparkles size={20} className="animate-pulse" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Incredible Cities
            <br />
            <span className="bg-gradient-to-r from-[#0056D2] via-[#4A8BDF] to-[#43E0F8] bg-clip-text text-transparent">
              Waiting for You
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Discover India's most captivating destinations with our premium
            transportation services. From historic landmarks to vibrant
            cultures, your perfect journey awaits.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDestinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 60, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              whileHover={{
                y: -12,
                scale: 1.03,
                rotateY: 5,
                transition: { duration: 0.3 },
              }}
              className="group relative"
            >
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100/50 backdrop-blur-sm">
                <div className="relative h-80 overflow-hidden cursor-pointer group/image">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${destination.color} opacity-20 group-hover:opacity-10 transition-opacity duration-500 z-10`}
                  />
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-500 z-20" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
                    >
                      <h3
                        className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        {destination.name}
                      </h3>
                      <p
                        className="text-lg text-white/90 font-medium"
                        style={{ fontFamily: "Manrope, sans-serif" }}
                      >
                        {destination.subtitle}
                      </p>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.15 + 0.5,
                      type: "spring",
                    }}
                    className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-2 rounded-2xl shadow-lg flex items-center gap-1.5 z-30"
                  >
                    <Star className="text-yellow-500 fill-current" size={14} />
                    <span className="text-sm font-bold text-gray-900">
                      {destination.rating}
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 + 0.4 }}
                    className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-white px-3 py-2 rounded-2xl flex items-center gap-1.5 z-30"
                  >
                    <Calendar size={14} />
                    <span className="text-xs font-semibold">
                      {destination.bestTime}
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 p-4 z-40"
                  >
                    <motion.div
                      initial={{ y: 30, scale: 0.9 }}
                      whileHover={{ y: 0, scale: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl w-full max-w-md mx-auto border border-white/20"
                    >
                      <h4
                        className="text-lg font-bold text-white mb-4 text-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-xl"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        Top Highlights
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {destination.highlights.map((highlight, idx) => {
                          const IconComponent = getHighlightIcon(highlight);
                          return (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: idx * 0.1 }}
                              className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-300"
                            >
                              <div
                                className={`w-8 h-8 bg-gradient-to-r ${destination.color} rounded-xl flex items-center justify-center shadow-sm`}
                              >
                                <IconComponent
                                  size={16}
                                  className="text-white"
                                />
                              </div>
                              <span
                                className="text-sm font-semibold text-gray-700 flex-1"
                                style={{ fontFamily: "Manrope, sans-serif" }}
                              >
                                {highlight}
                              </span>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${destination.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
                />
              </div>

              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              >
                <Sparkles
                  size={12}
                  className="text-white absolute inset-0 m-auto"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
          className="relative mt-20 overflow-hidden rounded-3xl"
        >
          <div className="absolute inset-0">
            <Image
              src="/asset/Ready for Adventure Home Page Background.png"
              alt="Adventure background"
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>

          <div className="absolute inset-0">
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-8 left-8 w-4 h-4 bg-white/30 rounded-full"
            ></motion.div>
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute top-16 right-16 w-3 h-3 bg-white/40 rounded-full"
            ></motion.div>
            <motion.div
              animate={{ y: [0, -25, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 2 }}
              className="absolute bottom-12 left-12 w-5 h-5 bg-white/20 rounded-full"
            ></motion.div>
          </div>

          <div className="relative z-10 px-8 py-12 md:px-12 md:py-16 text-center text-white">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.2, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full mb-6"
            >
              <Clock size={16} />
              <span
                className="text-sm font-semibold"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Ready for Adventure?
              </span>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="text-3xl md:text-4xl font-black mb-4"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Your Perfect City Awaits
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Choose your destination and let us transport you there in style.
              Every journey with Excursion Travel is an experience to remember.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/fleet")}
                className="px-8 py-4 bg-white text-[#0056D2] font-bold rounded-2xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                <Sparkles size={18} />
                Start Your Journey
                <ChevronRight size={18} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/services")}
                className="px-8 py-4 bg-white/20 backdrop-blur-md text-white font-bold rounded-2xl border-2 border-white/30 hover:bg-white/30 transition-all duration-300"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Discover All Services
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
