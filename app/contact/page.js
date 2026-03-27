"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Clock,
  Users,
  Shield,
  Star,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/app/footer/page";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "Corporate Car Rental",
    message: "",
  });
  const [showThankYou, setShowThankYou] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Store in database
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error("Failed to store contact submission:", error);
    }

    // Show thank you popup
    setShowThankYou(true);

    // Create mailto link with form data (will open after popup)
    setTimeout(() => {
      const subject = `Booking Inquiry from ${formData.name} - ${formData.company}`;
      const body = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Company: ${formData.company}
Service Interested: ${formData.service}

Message:
${formData.message}
    `.trim();

      window.location.href = `mailto:booking.excursiontravel@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
    }, 2000); // Show popup for 2 seconds before opening mailto
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "24/7 Support",
      value: "+91 9990-817-615",
      link: "tel:+919990817615",
      description: "Round the clock assistance",
    },
    {
      icon: Mail,
      title: "General Inquiries",
      value: "Contact@excursiontravel.in",
      link: "mailto:Contact@excursiontravel.in",
      description: "For all business inquiries",
    },
    {
      icon: Mail,
      title: "Reservations",
      value: "booking.excursiontravel@gmail.com",
      link: "mailto:booking.excursiontravel@gmail.com",
      description: "Direct booking requests",
    },
  ];

  const features = [
    { icon: Clock, text: "24/7 Availability" },
    { icon: Users, text: "Expert Team" },
    { icon: Shield, text: "Verified Drivers" },
    { icon: Star, text: "Premium Service" },
  ];

  return (
    <>
      <Header />
      <section
        id="contact"
        className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-paleBlue-50 relative overflow-hidden"
        data-testid="contact-section"
      >
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-[#0056D2]/20 to-[#A0006D]/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tl from-[#A0006D]/20 to-[#5DFDCB]/20 rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[#0056D2]/10 to-[#A0006D]/10 rounded-full filter blur-2xl"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-br from-[#0056D2] to-[#A0006D] rounded-2xl opacity-20"
          />
          <motion.div
            animate={{
              y: [0, 20, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-br from-[#A0006D] to-[#5DFDCB] rounded-full opacity-20"
          />
        </div>

        <div className="mt-6 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-16 sm:py-20 md:py-24 relative z-10">
          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
            data-testid="contact-header"
          >
            {/* Modern Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#0056D2]/10 via-[#A0006D]/10 to-[#0056D2]/10 backdrop-blur-xl rounded-full border border-[#A0006D]/30 mb-8 shadow-lg"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-3 h-3 bg-gradient-to-r from-[#0056D2] via-[#4F46E5] to-[#A0006D] rounded-full shadow-md"
              />
              <span
                className="text-[#4A8BDF] font-bold text-sm uppercase tracking-wider"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                GET IN TOUCH
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
              data-testid="contact-title"
            >
              Ready to{" "}
              <span className="bg-gradient-to-r from-[#0056D2] via-[#4A8BDF] to-[#A0006D] bg-clip-text text-transparent">
                Elevate
              </span>{" "}
              Your Business Travel?
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
              style={{ fontFamily: "Manrope, sans-serif" }}
              data-testid="contact-subtitle"
            >
              Connect with our expert team for personalized corporate
              transportation solutions that drive your business forward.
            </motion.p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group text-center p-6 bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 bg-gradient-to-br from-[#0056D2] to-[#A0006D] rounded-xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg"
                >
                  <feature.icon size={20} />
                </motion.div>
                <p
                  className="text-gray-900 font-semibold text-sm"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  {feature.text}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 lg:space-y-8"
              data-testid="contact-info-section"
            >
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                  data-testid="contact-info-title"
                >
                  Let's Build Something{" "}
                  <span className="text-[#4A8BDF]">Amazing</span> Together
                </motion.h2>
                <p
                  className="text-gray-600 text-lg leading-relaxed mb-8"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                  data-testid="contact-info-description"
                >
                  Whether you need daily corporate transportation, special event
                  services, or airport transfers, our team is ready to provide
                  seamless, professional mobility solutions tailored to your
                  business needs.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4" data-testid="contact-info-cards">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.link}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 8, scale: 1.02 }}
                    className="group flex items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/60 hover:border-[#4A8BDF]/50 shadow-lg hover:shadow-xl transition-all duration-500"
                    data-testid={`contact-info-card-${index}`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#0056D2] to-[#A0006D] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-[#0056D2]/30 transition-all duration-300"
                    >
                      <info.icon className="text-white" size={20} />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-gray-900 font-bold text-base sm:text-lg mb-1"
                        style={{ fontFamily: "Manrope, sans-serif" }}
                      >
                        {info.title}
                      </p>
                      <p
                        className="text-[#0056D2] font-semibold hover:text-[#4A8BDF] transition-colors duration-300 text-sm sm:text-base truncate"
                        style={{ fontFamily: "Manrope, sans-serif" }}
                      >
                        {info.value}
                      </p>
                      <p
                        className="text-gray-500 text-xs sm:text-sm mt-1"
                        style={{ fontFamily: "Manrope, sans-serif" }}
                      >
                        {info.description}
                      </p>
                    </div>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="text-gray-400 group-hover:text-[#0056D2] transition-colors duration-300"
                    >
                      <Send size={20} />
                    </motion.div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Right - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className=""
            >
              <div
                className="bg-white/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/60 shadow-2xl"
                data-testid="contact-form-section"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-8"
                >
                  <h3
                    className="text-2xl font-bold text-gray-900 mb-2"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    Send Us a Message
                  </h3>
                  <p
                    className="text-gray-600"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    Fill out the form below and we'll get back to you within 24
                    hours
                  </p>
                </motion.div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  data-testid="contact-form"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                    >
                      <label
                        className="block text-gray-900 text-sm font-semibold mb-2"
                        style={{ fontFamily: "Manrope, sans-serif" }}
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#0056D2] focus:ring-2 focus:ring-[#0056D2]/20 transition-all duration-300 shadow-sm"
                        placeholder="John Doe"
                        style={{ fontFamily: "Manrope, sans-serif" }}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      <label
                        className="block text-gray-900 text-sm font-semibold mb-2"
                        style={{ fontFamily: "Manrope, sans-serif" }}
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#0056D2] focus:ring-2 focus:ring-[#0056D2]/20 transition-all duration-300 shadow-sm"
                        placeholder="john@company.com"
                        style={{ fontFamily: "Manrope, sans-serif" }}
                      />
                    </motion.div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      <label
                        className="block text-gray-900 text-sm font-semibold mb-2"
                        style={{ fontFamily: "Manrope, sans-serif" }}
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#0056D2] focus:ring-2 focus:ring-[#0056D2]/20 transition-all duration-300 shadow-sm"
                        placeholder="+91 9999999999"
                        style={{ fontFamily: "Manrope, sans-serif" }}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                    >
                      <label
                        className="block text-gray-900 text-sm font-semibold mb-2"
                        style={{ fontFamily: "Manrope, sans-serif" }}
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#0056D2] focus:ring-2 focus:ring-[#0056D2]/20 transition-all duration-300 shadow-sm"
                        placeholder="Your Company"
                        style={{ fontFamily: "Manrope, sans-serif" }}
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    <label
                      className="block text-gray-900 text-sm font-semibold mb-2"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                      Service Interested In
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:border-[#0056D2] focus:ring-2 focus:ring-[#0056D2]/20 transition-all duration-300 shadow-sm"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                      <option value="Corporate Car Rental">
                        Corporate Car Rental
                      </option>
                      <option value="Airport Transfer">Airport Transfer</option>
                      <option value="Event Transportation">
                        Event Transportation
                      </option>
                      <option value="Luxury Vehicle Rental">
                        Luxury Vehicle Rental
                      </option>
                      <option value="Tour Packages">Tour Packages</option>
                    </select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                  >
                    <label
                      className="block text-gray-900 text-sm font-semibold mb-2"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#0056D2] focus:ring-2 focus:ring-[#0056D2]/20 transition-all duration-300 shadow-sm resize-none"
                      placeholder="Tell us about your transportation needs..."
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    />
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full px-8 py-5 bg-gradient-to-r from-[#0056D2] via-[#4A8BDF] to-[#A0006D] text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-lg relative overflow-hidden group"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Send size={20} />
                      Send Message
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#4A8BDF] via-[#4A8BDF] to-[#A0006D] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Thank You Popup */}
        <AnimatePresence>
          {showThankYou && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setShowThankYou(false)}
              >
                {/* Popup */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Success Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 bg-gradient-to-br from-[#0056D2] to-[#A0006D] rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-bold text-gray-900 mb-4"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    Thank You!
                  </motion.h3>

                  {/* Message */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-600 mb-6 leading-relaxed"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    We have received your message and will contact you soon.
                  </motion.p>

                  {/* Auto close indicator */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-sm text-gray-500"
                  >
                    Opening email client...
                  </motion.div>

                  {/* Close button */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    onClick={() => setShowThankYou(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </motion.button>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </section>
      <Footer />
    </>
  );
}
