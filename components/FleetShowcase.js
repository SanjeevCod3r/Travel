"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Car,
  Users,
  Shield,
  Star,
  MapPin,
  Clock,
  Fuel,
  Settings,
  Briefcase,
  ChevronRight,
  Sparkles,
  Zap,
  Award,
  Crown,
} from "lucide-react";

export const FleetShowcase = ({ onBookNow }) => {
  const router = useRouter();

  const handleBookNow = (vehicleName) => {
    router.push("/fleet");
  };

  const featuredVehicles = [
    {
      name: "Toyota Vellfire",
      category: "Premium Sedan",
      seats: "7 Passengers",
      features: ["Premium Interior", "Advanced Safety", "Executive Comfort"],
      image: "/asset/Fleet Showcase Toyota Vellfire.png",
      color: "from-[#0056D2] to-[#43E0F8]",
      bgGradient: "from-[#0056D2]/5 to-[#43E0F8]/5",
      icon: Crown,
    },
    {
      name: "Mercedes GLS",
      category: "Luxury SUV",
      seats: "7 Passengers",
      features: ["Spacious Interior", "Family Comfort", "Reliable Performance"],
      image: "/asset/Fleet Showcase Mercedes GLS.png",
      color: "from-[#0056D2] to-[#43E0F8]",
      bgGradient: "from-[#0056D2]/5 to-[#43E0F8]/5",
      icon: Users,
    },
    {
      name: "Toyota Innova Hycross",
      category: "Premium MUV",
      seats: "7 Passengers",
      features: ["Spacious Interior", "Family Comfort", "Reliable Performance"],
      image: "/asset/Fleet Showcase Toyota Innova Hycross.png",
      color: "from-[#0056D2] to-[#43E0F8]",
      bgGradient: "from-[#0056D2]/5 to-[#43E0F8]/5",
      icon: Users,
    },
    {
      name: "Mercedes S Class",
      category: "Luxury Sedan",
      seats: "4 Passengers",
      features: ["Premium Interior", "Advanced Safety", "Executive Comfort"],
      image: "/asset/Fleet Showcase Mercedes S Class.png",
      color: "from-[#0056D2] to-[#43E0F8]",
      bgGradient: "from-[#0056D2]/5 to-[#43E0F8]/5",
      icon: Crown,
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-r from-orange-400/10 to-red-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full blur-xl animate-pulse delay-500"></div>
        <div className="absolute top-20 right-1/4 w-16 h-16 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-xl animate-pulse delay-700"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-[#0056D2] to-[#43E0F8] rounded-full opacity-20"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
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
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Car size={20} />
            </motion.div>
            <span
              className="font-bold text-sm uppercase tracking-wider"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Our Fleet
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
            Premium Vehicles for
            <br />
            <span className="bg-gradient-to-r from-[#0056D2] via-[#4A8BDF] to-[#43E0F8] bg-clip-text text-transparent">
              Every Journey
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
            Experience luxury and comfort with our meticulously maintained fleet
            of premium vehicles, driven by professional chauffeurs who ensure
            your journey is unforgettable.
          </motion.p>
        </motion.div>

        {/* Fleet Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredVehicles.map((vehicle, index) => {
            const IconComponent = vehicle.icon;
            return (
              <motion.div
                key={vehicle.name}
                initial={{ opacity: 0, y: 80, rotateY: -25 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  y: -15,
                  scale: 1.05,
                  rotateY: 10,
                  transition: { duration: 0.3, type: "spring" },
                }}
                className="group relative"
              >
                {/* Main Card */}
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-3xl transition-all duration-500 border border-gray-100/50 backdrop-blur-sm">
                  {/* Vehicle Image */}
                  <div className="relative h-64 overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${vehicle.color} opacity-15 group-hover:opacity-25 transition-opacity duration-500`}
                    />
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?crop=entropy&cs=srgb&fm=jpg&q=85";
                      }}
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-500" />

                    {/* Vehicle Name Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.6,
                          delay: index * 0.15 + 0.3,
                        }}
                      >
                        <h3
                          className="text-2xl md:text-3xl font-black text-white mb-1 leading-tight"
                          style={{ fontFamily: "Montserrat, sans-serif" }}
                        >
                          {vehicle.name}
                        </h3>
                        <p
                          className="text-sm text-white/90 font-medium"
                          style={{ fontFamily: "Manrope, sans-serif" }}
                        >
                          {vehicle.category}
                        </p>
                      </motion.div>
                    </div>

                    {/* Seats Badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.15 + 0.5,
                        type: "spring",
                      }}
                      className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-2 rounded-2xl shadow-lg flex items-center gap-1.5"
                    >
                      <Users size={12} className="text-[#0056D2]" />
                      <span className="text-xs font-bold text-gray-900">
                        {vehicle.seats}
                      </span>
                    </motion.div>

                    {/* Category Icon */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.15 + 0.4,
                        type: "spring",
                      }}
                      className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white p-2 rounded-xl"
                    >
                      <IconComponent size={16} />
                    </motion.div>
                  </div>

                  {/* Content Section */}
                  <div
                    className={`p-5 bg-gradient-to-br ${vehicle.bgGradient}`}
                  >
                    {/* Features */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.15 + 0.6 }}
                      className="space-y-3 mb-5"
                    >
                      {vehicle.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -15 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.15 + 0.7 + idx * 0.1,
                          }}
                          className="flex items-center gap-3 text-sm text-gray-700"
                        >
                          <div
                            className={`w-2 h-2 bg-gradient-to-r ${vehicle.color} rounded-full animate-pulse`}
                          />
                          <span style={{ fontFamily: "Manrope, sans-serif" }}>
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Book Now Button */}
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.15 + 0.8 }}
                      whileHover={{
                        scale: 1.05,
                        y: -3,
                        boxShadow: "0 20px 40px rgba(0, 86, 210, 0.3)",
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleBookNow(vehicle.name)}
                      className={`w-full py-4 bg-gradient-to-r ${vehicle.color} text-white font-bold rounded-2xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 group/button relative overflow-hidden`}
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      {/* Button Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/button:translate-x-full transition-transform duration-700" />

                      <span>Book Now</span>
                      <ChevronRight
                        size={18}
                        className="group-hover/button:translate-x-1 transition-transform duration-300"
                      />

                      {/* Sparkle Effect */}
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover/button:opacity-100"
                      />
                    </motion.button>
                  </div>

                  {/* Hover Glow Effect */}
                  <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${vehicle.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}
                  />
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                  className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"
                >
                  <Zap size={14} className="text-white" />
                </motion.div>

                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                  className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-[#43E0F8] to-[#5DFDCB] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Enhanced Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          className="relative mt-20 overflow-hidden rounded-3xl"
        >
          {/* CTA Background with Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('/asset/Home Page Discover Your Perfect Ride Image.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>

          {/* Animated Background Shapes */}
          <div className="absolute inset-0">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-10 left-10 w-20 h-20 border-2 border-white/20 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-10 right-10 w-16 h-16 border-2 border-white/10 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/5 rounded-full"
            />
          </div>

          <div className="relative z-10 px-8 py-12 md:px-12 md:py-16 text-center text-white">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.2, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full mb-6"
            >
              <Award size={16} />
              <span
                className="text-sm font-semibold"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Premium Fleet Experience
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
              Discover Your Perfect Ride
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              From luxury sedans to spacious SUVs, choose the vehicle that
              matches your style and requirements. Every ride with Excursion
              Travel is crafted for your comfort and convenience.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/fleet")}
                className="px-8 py-4 bg-white text-[#0056D2] font-bold rounded-2xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#0056D2] to-[#43E0F8] opacity-0 hover:opacity-10 transition-opacity duration-300" />
                <Car size={18} />
                View All Vehicles
                <ChevronRight size={18} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/services")}
                className="px-8 py-4 bg-white/20 backdrop-blur-md text-white font-bold rounded-2xl border-2 border-white/30 hover:bg-white/30 transition-all duration-300"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Explore Services
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
