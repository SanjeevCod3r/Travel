"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Target,
  Eye,
  Award,
  Lightbulb,
  CheckCircle,
  Star,
  ArrowRight,
  Shield,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/app/footer/page";

export default function About() {
  const visionPoints = [
    "Technology is at the core of our innovation.",
    "We aim to exceed customer expectations.",
    "Reliable and premium services set us apart.",
  ];

  const missionPoints = [
    "Customers come first, always.",
    "Quality drives every aspect of our service.",
    "Vehicles are impeccably maintained and road-ready.",
  ];

  const approachPoints = [
    "Innovation drives our service enhancements.",
    "Safety and sustainability are non-negotiable.",
    "Every vehicle reflects our dedication to perfection.",
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: "Flexible Travel Options",
      description: "One-way and round-trip rentals for any journey type",
    },
    {
      icon: Star,
      title: "Diverse Fleet",
      description: "From compact cars to luxury SUVs for every need",
    },
    {
      icon: Target,
      title: "24/7 Airport Transfers",
      description: "Stress-free connectivity at any schedule",
    },
  ];

  return (
    <>
      <Header />
      <section
        id="about"
        className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-paleBlue-50 relative overflow-hidden"
        data-testid="about-section"
      >
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-[#0056D2]/20 to-[#43E0F8]/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tl from-[#43E0F8]/20 to-[#5DFDCB]/20 rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[#0056D2]/10 to-[#43E0F8]/10 rounded-full filter blur-2xl"></div>
        </div>

        {/* Cool Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Geometric Shapes */}
          <motion.div
            animate={{
              y: [0, -30, 0],
              rotate: [0, 8, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-28 right-20 w-20 h-20 bg-gradient-to-br from-[#0056D2] to-[#43E0F8] rounded-2xl opacity-15 shadow-2xl"
            style={{
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            }}
          />
          <motion.div
            animate={{
              y: [0, 35, 0],
              rotate: [0, -10, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
            className="absolute bottom-36 left-16 w-16 h-16 bg-gradient-to-br from-[#43E0F8] to-[#5DFDCB] rounded-full opacity-20 shadow-xl"
            style={{
              clipPath:
                "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
            }}
          />
          <motion.div
            animate={{
              y: [0, -25, 0],
              x: [0, 15, 0],
              rotate: [0, 15, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
            className="absolute top-1/3 right-1/4 w-12 h-12 bg-gradient-to-br from-[#5DFDCB] to-[#0056D2] rounded-lg opacity-25 shadow-lg"
            style={{
              clipPath:
                "polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)",
            }}
          />

          {/* Floating Particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -100 - i * 20, 0],
                x: [0, Math.sin(i) * 50, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
              className={`absolute w-2 h-2 rounded-full ${
                i % 4 === 0
                  ? "bg-[#0056D2]/40"
                  : i % 4 === 1
                  ? "bg-[#43E0F8]/40"
                  : i % 4 === 2
                  ? "bg-[#5DFDCB]/40"
                  : "bg-[#FE805A]/40"
              }`}
              style={{
                top: `${20 + i * 8}%`,
                left: `${15 + i * 10}%`,
              }}
            />
          ))}

          {/* Glowing Orbs */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-16 left-16 w-32 h-32 bg-[#0056D2]/10 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              scale: [1.3, 1, 1.3],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-32 right-32 w-40 h-40 bg-[#43E0F8]/8 rounded-full blur-2xl"
          />
        </div>

        <div className="mt-6 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-16 sm:py-20 md:py-24 relative z-10">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 sm:mb-20"
            data-testid="about-header"
          >
            {/* Modern Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#0056D2]/10 via-[#43E0F8]/10 to-[#0056D2]/10 backdrop-blur-xl rounded-full border border-[#43E0F8]/30 mb-8 shadow-lg"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-3 h-3 bg-gradient-to-r from-[#0056D2] to-[#43E0F8] rounded-full"
              />
              <span
                className="text-[#0056D2] font-bold text-sm uppercase tracking-wider"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                ABOUT EXCURSION TRAVEL
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight"
              style={{
                fontFamily: "Montserrat, sans-serif",
                letterSpacing: "-0.02em",
              }}
              data-testid="about-title"
            >
              Your Trusted Partner in{" "}
              <span className="bg-gradient-to-r from-[#0056D2] via-[#4A8BDF] to-[#A0006D] bg-clip-text text-transparent">
                Corporate Car Rentals
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0"
              style={{ fontFamily: "Manrope, sans-serif" }}
              data-testid="about-subtitle"
            >
              Excellence, innovation, and reliability in every journey. We
              redefine corporate transportation with cutting-edge technology and
              unparalleled service quality.
            </motion.p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-20"
          >
            {/* Vehicles Stat - Circular Design */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="group relative"
            >
              <div className="bg-gradient-to-br from-[#0056D2]/10 via-[#43E0F8]/5 to-[#0056D2]/10 backdrop-blur-xl rounded-3xl p-8 border border-[#43E0F8]/20 shadow-xl overflow-hidden">
                {/* Animated Background */}
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-[#0056D2]/5 to-[#43E0F8]/5 rounded-3xl"
                />

                <div className="relative z-10 text-center">
                  {/* Circular Progress Indicator */}
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <svg
                      className="w-full h-full transform -rotate-90"
                      viewBox="0 0 120 120"
                    >
                      {/* Background Circle */}
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-gray-200"
                      />
                      {/* Progress Circle */}
                      <motion.circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="url(#vehiclesGradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 0.85 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 2,
                          delay: 0.8,
                          ease: "easeOut",
                        }}
                        className="drop-shadow-lg"
                      />
                      {/* Gradient Definition */}
                      <defs>
                        <linearGradient
                          id="vehiclesGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#0056D2" />
                          <stop offset="100%" stopColor="#A0006D" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Center Content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 1,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        <div
                          className="text-3xl font-bold text-gray-900 mb-1"
                          style={{ fontFamily: "Montserrat, sans-serif" }}
                        >
                          900+
                        </div>
                        <div
                          className="text-sm text-gray-600 font-medium"
                          style={{ fontFamily: "Manrope, sans-serif" }}
                        >
                          Vehicles
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.2 }}
                    className="text-gray-600 text-sm leading-relaxed"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    Our extensive fleet ensures you always have the perfect
                    vehicle for your corporate needs.
                  </motion.p>

                  {/* Floating Icon */}
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-[#0056D2] to-[#43E0F8] rounded-lg flex items-center justify-center shadow-lg"
                  >
                    <Award className="text-white" size={16} />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Support Stat - Modern Card Design */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="group relative"
            >
              <div className="bg-gradient-to-br from-[#43E0F8]/10 via-[#5DFDCB]/5 to-[#43E0F8]/10 backdrop-blur-xl rounded-3xl p-8 border border-[#43E0F8]/20 shadow-xl overflow-hidden">
                {/* Animated Border */}
                <motion.div
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-[#0056D2] via-[#43E0F8] to-[#5DFDCB] opacity-20 rounded-3xl blur-sm"
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                />

                <div className="relative z-10">
                  {/* Icon and Title */}
                  <div className="flex items-center justify-between mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      className="w-16 h-16 bg-gradient-to-br from-[#43E0F8] to-[#5DFDCB] rounded-2xl flex items-center justify-center shadow-lg"
                    >
                      <Shield className="text-white" size={28} />
                    </motion.div>

                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.9 }}
                      className="text-right"
                    >
                      <div
                        className="text-3xl font-bold text-gray-900"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        24/7
                      </div>
                      <div
                        className="text-lg text-[#0056D2] font-semibold"
                        style={{ fontFamily: "Manrope, sans-serif" }}
                      >
                        Support
                      </div>
                    </motion.div>
                  </div>

                  {/* Progress Bars */}
                  <div className="space-y-3 mb-6">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span
                          className="text-gray-600"
                          style={{ fontFamily: "Manrope, sans-serif" }}
                        >
                          Response Time
                        </span>
                        <span
                          className="text-gray-900 font-medium"
                          style={{ fontFamily: "Manrope, sans-serif" }}
                        >
                          Under 5 min
                        </span>
                      </div>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "95%" }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 1,
                          duration: 1.5,
                          ease: "easeOut",
                        }}
                        className="h-2 bg-gray-200 rounded-full overflow-hidden"
                      >
                        <div className="h-full bg-gradient-to-r from-[#0056D2] to-[#4A8BDF] rounded-full"></div>
                      </motion.div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span
                          className="text-gray-600"
                          style={{ fontFamily: "Manrope, sans-serif" }}
                        >
                          Uptime
                        </span>
                        <span
                          className="text-gray-900 font-medium"
                          style={{ fontFamily: "Manrope, sans-serif" }}
                        >
                          99.9%
                        </span>
                      </div>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "99%" }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 1.2,
                          duration: 1.5,
                          ease: "easeOut",
                        }}
                        className="h-2 bg-gray-200 rounded-full overflow-hidden"
                      >
                        <div className="h-full bg-gradient-to-r from-[#4A8BDF] to-[#A0006D] rounded-full"></div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.4 }}
                    className="text-gray-600 text-sm leading-relaxed"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    Round-the-clock support ensures your business never stops
                    moving. Our dedicated team is always ready to assist.
                  </motion.p>

                  {/* Pulsing Indicator */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute top-4 left-4 w-3 h-3 bg-green-400 rounded-full shadow-lg"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Exploring The Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mb-20"
          >
            <div className="bg-gradient-to-r from-gray-50 to-white rounded-3xl p-8 sm:p-12 shadow-lg border border-gray-100">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-8"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#0056D2] to-[#A0006D] rounded-2xl flex items-center justify-center">
                  <CheckCircle className="text-white" size={24} />
                </div>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-gray-900"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Exploring The Benefits
                </h2>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-600 text-lg leading-relaxed mb-8"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Excursion travel play a vital role in creating seamless and
                enjoyable travel experiences. Excursions are perfect for
                exploring local attractions, cultural landmarks, and natural
                wonders. To complement this, car rental services provide
                travelers with the flexibility to explore at their own pace,
                offering options such as one-way rentals, ideal for journeys
                that don't loop back to the starting point, and round-trip
                rentals for local or day travel. With a wide range of vehicles
                available, including compact cars, SUVs, and luxury options,
                travelers can choose what best suits their needs. For air
                travelers, transfer services ensure stress-free connectivity to
                and from airports with options for private transportation, often
                available round-the-clock to accommodate any schedule. Whether
                planning a one-way trip to a new destination or a round-trip
                adventure, these services work together to simplify logistics,
                giving travelers more time to focus on enjoying their journey.
              </motion.p>

              <div className="grid md:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-12 h-12 bg-gradient-to-br from-[#0056D2] to-[#A0006D] rounded-xl flex items-center justify-center mb-4"
                    >
                      <benefit.icon className="text-white" size={20} />
                    </motion.div>
                    <h3
                      className="text-lg font-bold text-gray-900 mb-2"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      {benefit.title}
                    </h3>
                    <p
                      className="text-gray-600 text-sm"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                      {benefit.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Vision, Mission, Approach Grid */}
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Our Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="group"
            >
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/60 hover:shadow-2xl transition-all duration-500 h-full">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 bg-gradient-to-br from-[#0056D2] to-[#A0006D] rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-[#0056D2]/30 transition-all duration-300"
                >
                  <Eye className="text-white" size={28} />
                </motion.div>

                <h3
                  className="text-2xl font-bold text-gray-900 mb-4"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Our Vision
                </h3>
                <h4
                  className="text-lg font-semibold text-[#0056D2] mb-6"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Setting New Standards in Car Rentals
                </h4>

                <p
                  className="text-gray-600 mb-6 leading-relaxed"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  We envision redefining corporate car rentals with innovation
                  and precision. By integrating the latest technology, we
                  simplify the rental process and ensure reliable service every
                  time. Our commitment to excellence is reflected in our diverse
                  fleet and our focus on providing tailored solutions for
                  business professionals and travelers.
                </p>

                <ul className="space-y-3">
                  {visionPoints.map((point, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-start gap-3 text-gray-700"
                    >
                      <ArrowRight
                        className="text-[#0056D2] mt-1 flex-shrink-0"
                        size={16}
                      />
                      <span style={{ fontFamily: "Manrope, sans-serif" }}>
                        {point}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Our Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="group"
            >
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/60 hover:shadow-2xl transition-all duration-500 h-full">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 bg-gradient-to-br from-[#A0006D] to-[#4A8BDF] rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-[#43E0F8]/30 transition-all duration-300"
                >
                  <Target className="text-white" size={28} />
                </motion.div>

                <h3
                  className="text-2xl font-bold text-gray-900 mb-4"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Our Mission
                </h3>
                <h4
                  className="text-lg font-semibold text-[#0056D2] mb-6"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Excellence in Every Ride
                </h4>

                <p
                  className="text-gray-600 mb-6 leading-relaxed"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Our mission is to deliver unparalleled car rental experiences
                  by combining innovative technology with exceptional service.
                  From streamlined booking processes to real-time vehicle
                  tracking, we aim to make every journey seamless and
                  stress-free. With a fleet of meticulously maintained vehicles,
                  we ensure safety, comfort, and reliability in every ride.
                </p>

                <ul className="space-y-3">
                  {missionPoints.map((point, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      className="flex items-start gap-3 text-gray-700"
                    >
                      <ArrowRight
                        className="text-[#0056D2] mt-1 flex-shrink-0"
                        size={16}
                      />
                      <span style={{ fontFamily: "Manrope, sans-serif" }}>
                        {point}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Our Approach */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="group"
            >
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/60 hover:shadow-2xl transition-all duration-500 h-full">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 bg-gradient-to-br from-[#4A8BDF] to-[#A0006D] rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-[#5DFDCB]/30 transition-all duration-300"
                >
                  <Lightbulb className="text-white" size={28} />
                </motion.div>

                <h3
                  className="text-2xl font-bold text-gray-900 mb-4"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Our Approach
                </h3>
                <h4
                  className="text-lg font-semibold text-[#0056D2] mb-6"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Innovation Meets Dedication
                </h4>

                <p
                  className="text-gray-600 mb-6 leading-relaxed"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Our approach is centered on combining innovation with a
                  dedication to excellence. We continuously evolve our services
                  to meet changing customer needs. From high-tech features to a
                  focus on sustainability, we're committed to setting new
                  benchmarks in the car rental industry.
                </p>

                <ul className="space-y-3">
                  {approachPoints.map((point, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.0 + index * 0.1 }}
                      className="flex items-start gap-3 text-gray-700"
                    >
                      <ArrowRight
                        className="text-[#0056D2] mt-1 flex-shrink-0"
                        size={16}
                      />
                      <span style={{ fontFamily: "Manrope, sans-serif" }}>
                        {point}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
            className="text-center mt-16 sm:mt-20"
          >
            <div className="bg-gradient-to-r from-[#0056D2]/5 via-[#43E0F8]/5 to-[#0056D2]/5 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-[#43E0F8]/20 max-w-4xl mx-auto">
              <h3
                className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Ready to Experience Excellence?
              </h3>
              <p
                className="text-gray-600 mb-8 max-w-2xl mx-auto"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Join thousands of satisfied clients who trust Excursion Travel
                for their corporate transportation needs.
              </p>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-[#0056D2] to-[#A0006D] text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-lg"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Get Started Today
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
}
