"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Navigation,
} from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
    { name: "Vendor Registration", href: "/vendor-registration" },
  ];

  const services = [
    { name: "Corporate Car Rental", href: "/service/corporate-car-rental" },
    {
      name: "Employee Transport Services",
      href: "/service/employee-transport",
    },
    { name: "Event Transportation", href: "/service/event-transportation" },
    {
      name: "Conferences & Delegation",
      href: "/service/conferences-delegation",
    },
    { name: "Wedding Car Rental", href: "/service/wedding-car-rental" },
    { name: "Hotel Travel Desk Service", href: "/service/hotel-travel-desk" },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/profile.php?id=61571593164736&mibextid=rS40aB7S9Ucbxw6v",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/excursiontravel.in?igsh=OWl2N2tzc3Frdjl4",
      label: "Instagram",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/excursiontravel?trk=blended-typeahead",
      label: "LinkedIn",
    },
  ];

  return (
    <footer
      className="bg-[#0F172A] text-white pt-16 pb-8"
      data-testid="footer-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            data-testid="footer-company-info"
          >
            <div>
            <div className="flex items-center mb-4">
              <img 
                src="/asset/logo website.png" 
                alt="Excursion Travel" 
                className="h-12 w-auto"
              />
            </div>
            </div>

            <p
              className="text-gray-400 mb-6 leading-relaxed"
              style={{ fontFamily: "Manrope, sans-serif" }}
              data-testid="footer-company-description"
            >
              Your trusted partner for cabs, packages, and fleet rentals
            </p>
            <div className="flex gap-4" data-testid="footer-social-links">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-white/10 backdrop-blur-lg rounded-lg flex items-center justify-center hover:bg-[#4A8BDF] transition-all duration-300 group"
                  aria-label={social.label}
                  data-testid={`footer-social-${social.label.toLowerCase()}`}
                >
                  <social.icon size={18} className="text-white" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            data-testid="footer-quick-links"
          >
            <h4
              className="text-lg font-bold mb-6"
              style={{ fontFamily: "Montserrat, sans-serif" }}
              data-testid="footer-quick-links-title"
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#4A8BDF] transition-colors duration-300 inline-block hover:translate-x-2 transform"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                    data-testid={`footer-quick-link-${link.name.toLowerCase()}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            data-testid="footer-services"
          >
            <h4
              className="text-lg font-bold mb-6"
              style={{ fontFamily: "Montserrat, sans-serif" }}
              data-testid="footer-services-title"
            >
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.href}
                    className="text-gray-400 hover:text-[#4A8BDF] transition-colors duration-300 inline-block hover:translate-x-2 transform text-sm"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                    data-testid={`footer-service-${service.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            data-testid="footer-contact-info"
          >
            <h4
              className="text-lg font-bold mb-6"
              style={{ fontFamily: "Montserrat, sans-serif" }}
              data-testid="footer-contact-title"
            >
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone
                  size={18}
                  className="text-[#4A8BDF] mt-1 flex-shrink-0"
                />
                <a
                  href="tel:+919990817615"
                  className="text-gray-400 hover:text-[#4A8BDF] transition-colors"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                  data-testid="footer-phone"
                >
                 +91 9990-817-615
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-[#4A8BDF] mt-1 flex-shrink-0" />
                <div>
                  <a
                    href="mailto:contact@excursiontravel.in"
                    className="text-gray-400 hover:text-[#4A8BDF] transition-colors block"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                    data-testid="footer-email-contact"
                  >
                   contact@excursiontravel.in
                  </a>
                </div>
              </li>

              {/* Business Registration Details */}
              <li className="pt-4 mt-4 border-t border-gray-700">
                <div className="space-y-2">
                  <div
                    className="text-xs bg-gradient-to-r from-blue-600/20 to-cyan-600/20 px-3 py-2 rounded-lg border border-blue-500/30 text-gray-300"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    <span className="font-semibold text-blue-400">
                      UDYAM REGISTRATION:
                    </span>{" "}
                    UDYAM-UP-33-0019624
                  </div>
                  <div
                    className="text-xs bg-gradient-to-r from-blue-600/20 to-cyan-600/20 px-3 py-2 rounded-lg border border-blue-500/30 text-gray-300"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    <span className="font-semibold text-blue-400">
                      GSTIN:
                    </span>{" "}
                    09DLIPR0084K1ZL
                  </div>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/10"
          data-testid="footer-bottom-bar"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex gap-6 w-full md:w-1/3 justify-center md:justify-start">
              <Link
                href="/privacy-policy"
                className="text-gray-400 hover:text-[#4A8BDF] transition-colors text-sm"
                style={{ fontFamily: "Manrope, sans-serif" }}
                data-testid="footer-privacy-policy"
              >
                Privacy Policy
              </Link>
            </div>

            <div className="w-full md:w-1/3 text-center">
              <p
                className="text-gray-400 text-sm inline-block"
                style={{ fontFamily: "Manrope, sans-serif" }}
                data-testid="footer-copyright"
              >
                © {new Date().getFullYear()}  Excursion Travel. All rights reserved
              </p>
            </div>

            <div className="w-full md:w-1/3 flex justify-center md:justify-end">
              <Link
                href="/terms-conditions"
                className="text-gray-400 hover:text-[#4A8BDF] transition-colors text-sm"
                style={{ fontFamily: "Manrope, sans-serif" }}
                data-testid="footer-terms-conditions"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
