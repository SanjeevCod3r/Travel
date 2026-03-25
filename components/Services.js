"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Car,
  Users,
  Calendar,
  Briefcase,
  Heart,
  MapPin,
  ArrowRight,
  Star,
} from "lucide-react";

export const Services = ({ onBookNow, packages = [], loading = false }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-block px-4 py-2 bg-[#0056D2]/10 rounded-full mb-4">
            <span
              className="text-[#0056D2] font-semibold text-xs sm:text-sm"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              OUR EXPERTISE
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 px-2"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Complete Transportation Solutions
          </h2>
          <p
            className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-2 leading-relaxed"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            From corporate travel to special events, we provide comprehensive
            mobility solutions tailored to your every need with premium service
            excellence.
          </p>
        </motion.div>

        {/* Services Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 rounded-3xl h-80 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id || index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
              >
                {/* Image */}
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img
                    src={
                      pkg.images?.[0] ||
                      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2017&auto=format&fit=crop"
                    }
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Icon Badge */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#0056D2] to-[#A0006D] rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg`}
                    >
                      <Star size={20} className="sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  <h3
                    className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    {pkg.title}
                  </h3>
                  <p
                    className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed line-clamp-2"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    {pkg.description}
                  </p>

                  {/* Features */}
                  <div className="mb-4 sm:mb-6">
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      <span className="text-sm bg-gray-100 text-gray-700 px-2 sm:px-3 py-1 rounded-full">
                        {pkg.duration}
                      </span>
                      <span className="text-sm bg-paleBlue-50 text-[#0056D2] px-2 sm:px-3 py-1 rounded-full font-bold">
                        ₹{pkg.price}
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onBookNow?.({ pkg })}
                    className="w-full bg-gradient-to-r from-[#4A8BDF] to-[#A0006D] text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group text-sm sm:text-base"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    <span>Book Now</span>
                    <ArrowRight
                      className="transition-transform duration-300 group-hover:translate-x-1 w-4 h-4 sm:w-5 sm:h-5"
                      size={16}
                    />
                  </motion.button>
                </div>

                {/* Hover Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-[#0056D2] to-[#43E0F8] opacity-0 group-hover:opacity-5 rounded-2xl sm:rounded-3xl transition-opacity duration-500 pointer-events-none`}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-20 md:mt-24 relative overflow-hidden rounded-2xl sm:rounded-3xl mx-4 sm:mx-0"
        >
          {/* CTA Background with Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('/asset/cars backround iamge for homepage.png')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>

          <div className="relative z-10 p-6 sm:p-8 text-white">
            <h3
              className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Ready to Experience Premium Service?
            </h3>
            <p
              className="text-base sm:text-lg mb-4 sm:mb-6 opacity-90 leading-relaxed"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Contact our experts today to customize the perfect transportation
              solution for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white/20 backdrop-blur-md text-white font-semibold rounded-full border-2 border-white/30 hover:bg-white/30 transition-all duration-300 text-sm sm:text-base"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Call Now: +91 9990-817-615
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
