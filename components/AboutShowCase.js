"use client";
import React from "react";
import { motion } from "framer-motion";
import { Heart, Shield, Award, Users } from "lucide-react";

export const AboutShowcase = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        {/* Top Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-[#0056D2] to-[#A0006D] text-white rounded-full mb-6"
          >
            <Heart size={18} />
            <span
              className="font-semibold text-sm"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              About Excursion Travel
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Your Trusted Travel
            <br />
            <span className="bg-gradient-to-r from-[#0056D2] via-[#4A8BDF] to-[#A0006D] bg-clip-text text-transparent">
              Companion
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Since our founding, Excursion Travel has been dedicated to providing
            exceptional transportation services that combine luxury,
            reliability, and personalized care.
          </motion.p>
        </motion.div>

        {/* Middle Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex justify-center items-center mb-16"
        >
          <div className="relative w-full max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">
            <img
              src="/asset/Home Page Image 1.webp"
              alt="About Excursion Travel"
              className="w-full h-auto object-cover"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=srgb&fm=jpg&q=85";
              }}
            />
          </div>
        </motion.div>

        {/* Bottom Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center"
        >
          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="max-w-3xl mx-auto"
          >
            <p
              className="text-lg text-gray-700 leading-relaxed mb-8"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              We understand that every journey is unique, and we're here to make
              yours unforgettable. Our commitment to excellence ensures that
              every ride with Excursion Travel is crafted for your comfort and
              convenience.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-100">
                <Shield className="text-[#0056D2] w-8 h-8 mb-3 mx-auto" />
                <h4
                  className="font-bold text-gray-900 mb-2"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Safety First
                </h4>
                <p
                  className="text-sm text-gray-600"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Your safety is our top priority
                </p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-100">
                <Award className="text-[#A0006D] w-8 h-8 mb-3 mx-auto" />
                <h4
                  className="font-bold text-gray-900 mb-2"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Premium Service
                </h4>
                <p
                  className="text-sm text-gray-600"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Luxury experience guaranteed
                </p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-100">
                <Heart className="text-red-500 w-8 h-8 mb-3 mx-auto" />
                <h4
                  className="font-bold text-gray-900 mb-2"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Customer Focused
                </h4>
                <p
                  className="text-sm text-gray-600"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Your satisfaction drives us
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
