"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Globe,
  Zap,
  Award,
  TrendingUp,
  Heart,
  ArrowRight,
  CheckCircle,
  Star,
  Shield,
  Clock,
  MapPin,
  Car,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/app/footer/page";

export default function About() {
  const stats = [
    { number: "10K+", label: "Happy Customers", icon: Users, color: "from-blue-500 to-cyan-500" },
    { number: "50+", label: "Cities Covered", icon: MapPin, color: "from-emerald-500 to-teal-500" },
    { number: "1000+", label: "Vehicle Fleet", icon: Car, color: "from-amber-500 to-orange-500" },
    { number: "24/7", label: "Support Available", icon: Clock, color: "from-rose-500 to-pink-500" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description: "Your satisfaction is our top priority. We go above and beyond to ensure every journey exceeds expectations.",
      color: "from-rose-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Safety Always",
      description: "Every vehicle is thoroughly inspected and maintained to the highest safety standards.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: "Speed & Efficiency",
      description: "Quick bookings, instant confirmations, and on-time service every single time.",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: Globe,
      title: "Global Standards",
      description: "We bring world-class service quality and international best practices to every ride.",
      color: "from-emerald-500 to-teal-500"
    },
  ];

  const timeline = [
    {
      year: "2019",
      title: "Our Journey Begins",
      description: "Started with a small fleet and a big dream to revolutionize car rentals.",
    },
    {
      year: "2021",
      title: "Expansion Phase",
      description: "Expanded to 20+ cities and introduced corporate travel solutions.",
    },
    {
      year: "2023",
      title: "Digital Transformation",
      description: "Launched our advanced booking platform and mobile app.",
    },
    {
      year: "2024",
      title: "Market Leader",
      description: "Became the preferred choice for corporate and leisure travel.",
    },
  ];

  return (
    <>
      <Header />
      <section className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,theme(colors.blue.50),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,theme(colors.emerald.50),transparent_50%)]"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight mt-8"
              >
                Your Journey,
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                  Our Mission
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
              >
                We're not just a car rental service. We're your travel partner, 
                committed to making every journey memorable, comfortable, and hassle-free.
              </motion.p>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full mt-8"
              >
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-slate-700">About Excursion Travel</span>
              </motion.div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                      <stat.icon className="text-white" size={20} />
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                      className="w-2 h-2 bg-emerald-500 rounded-full"
                    ></motion.div>
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">{stat.number}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Values Section */}
        <div className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Core Values</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                The principles that guide everything we do, every single day.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl p-8 h-full hover:shadow-lg transition-all duration-300">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-shadow`}
                    >
                      <value.icon className="text-white" size={24} />
                    </motion.div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Story</h2>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    Founded in 2019, Voyage Travel started with a simple mission: 
                    to make car rental services more accessible, reliable, and customer-friendly.
                  </p>
                  <p>
                    What began as a small fleet of 50 vehicles has grown into a comprehensive 
                    transportation network serving thousands of customers across multiple cities.
                  </p>
                  <p>
                    Our success is built on trust, innovation, and an unwavering commitment to 
                    customer satisfaction. We've continuously evolved our services, embracing 
                    technology to make bookings easier, vehicles safer, and experiences better.
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 flex flex-wrap gap-4"
                >
                  {["Award Winning Service", "ISO Certified", "24/7 Support", "Best Prices"].map((badge, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg font-medium text-sm"
                    >
                      {badge}
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-3xl p-8">
                  <div className="space-y-6">
                    {timeline.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-4"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                            <span className="text-sm font-bold text-slate-700">{item.year}</span>
                          </div>
                          {index < timeline.length - 1 && (
                            <div className="w-0.5 h-16 bg-slate-200 mx-auto mt-2"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                          <p className="text-sm text-slate-600">{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose Voyage Travel?</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                We're different, and we're proud of it. Here's what sets us apart.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Car,
                  title: "Premium Fleet",
                  description: "Well-maintained vehicles equipped with modern amenities for your comfort.",
                  features: ["Regular Sanitization", "GPS Tracking", "Insurance Coverage"]
                },
                {
                  icon: Users,
                  title: "Expert Drivers",
                  description: "Professional, trained drivers who prioritize your safety and comfort.",
                  features: ["Background Verified", "Well Trained", "Professional Behavior"]
                },
                {
                  icon: TrendingUp,
                  title: "Best Prices",
                  description: "Transparent pricing with no hidden charges. Quality service at affordable rates.",
                  features: ["No Hidden Fees", "Best Rate Guarantee", "Flexible Payment"]
                },
                {
                  icon: Clock,
                  title: "On-Time Service",
                  description: "Punctual pickups and drop-offs. We respect your time.",
                  features: ["Real-time Tracking", "24/7 Availability", "Quick Response"]
                },
                {
                  icon: Shield,
                  title: "Safety First",
                  description: "Your safety is our priority with comprehensive safety measures.",
                  features: ["Safety Kits", "Emergency Support", "Regular Maintenance"]
                },
                {
                  icon: Star,
                  title: "5-Star Experience",
                  description: "Consistently rated excellent by our customers for service quality.",
                  features: ["Customer Support", "Quality Assurance", "Feedback System"]
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
                    <feature.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle className="text-emerald-500" size={14} />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-24 bg-gradient-to-r from-blue-600 to-emerald-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Start Your Journey with Us?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers who trust Voyage Travel for their transportation needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors"
                >
                  Book Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition-colors"
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
