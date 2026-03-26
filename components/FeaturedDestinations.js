"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Clock, Star, ArrowRight, IndianRupee } from 'lucide-react';

export const FeaturedDestinations = () => {
  const featuredPackages = [
    {
      id: 1,
      name: 'Golden Triangle Tour',
      region: 'north',
      image: '/asset/Golden Triangle Tour.png',
      price: 25000,
      duration: '6 Days',
      rating: 4.8,
      highlights: ['Delhi', 'Agra Taj Mahal', 'Jaipur Palace', 'Cultural Heritage', 'Historical Sites'],
      description: "Experience India's most iconic destinations with the Golden Triangle Tour featuring Delhi, Agra and Jaipur."
    },
    {
      id: 2,
      name: 'Himachal Hill Stations',
      region: 'north',
      image: '/asset/Himachal Hill Stations.png',
      price: 28000,
      duration: '7 Days',
      rating: 4.9,
      highlights: ['Shimla', 'Manali', 'Dharamshala', 'Hill Stations', 'Mountain Views', 'Adventure Activities'],
      description: 'Discover the pristine beauty of Himachal Pradesh with its charming hill stations and breathtaking landscapes.'
    },
    {
      id: 3,
      name: 'Rajasthan Desert Safari',
      region: 'west',
      image: '/asset/Rajasthan Desert Safari.png',
      price: 32000,
      duration: '8 Days',
      rating: 4.7,
      highlights: ['Jaisalmer Fort', 'Thar Desert', 'Camel Safari', 'Cultural Villages', 'Desert Camping', 'Royal Heritage'],
      description: "Embark on an unforgettable desert safari through Rajasthan's golden sands and ancient forts."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-6 py-2 bg-[#0056D2]/10 rounded-full mb-4">
            <span className="text-[#0056D2] font-semibold text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Featured Experiences
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Featured Travel Destinations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Discover our handpicked selection of extraordinary travel experiences across India's most captivating destinations.
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full">
                  <div className="flex items-center gap-1 text-[#0056D2] font-bold">
                    <IndianRupee size={14} />
                    <span style={{ fontFamily: 'Manrope, sans-serif' }}>{pkg.price.toLocaleString()}</span>
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute top-4 left-4 bg-[#0056D2]/90 backdrop-blur-md px-4 py-2 rounded-full">
                  <div className="flex items-center gap-1 text-white text-sm font-medium">
                    <Clock size={14} />
                    <span style={{ fontFamily: 'Manrope, sans-serif' }}>{pkg.duration}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-[#0056D2] bg-[#0056D2]/10 px-3 py-1 rounded-full">
                    {pkg.region.charAt(0).toUpperCase() + pkg.region.slice(1)} India
                  </span>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700">{pkg.rating}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {pkg.name}
                </h3>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {pkg.description}
                </p>

                {/* Highlights */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {pkg.highlights.slice(0, 3).map((highlight, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        {highlight}
                      </span>
                    ))}
                    {pkg.highlights.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                        +{pkg.highlights.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* CTA Button */}
                <Link href="/destinations">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-[#0056D2] to-[#A0006D] text-white font-bold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    <span>View Details</span>
                    <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={16} />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link href="/destinations">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white border-2 border-[#0056D2] text-[#0056D2] font-semibold rounded-full hover:bg-[#0056D2] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              View All Destinations
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
