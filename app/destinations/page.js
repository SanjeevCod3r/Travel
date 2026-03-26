"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  MapPin,
  Search,
  Star,
  Clock,
  Users,
  Mountain,
  Camera,
  Waves,
  TreePine,
  Tent,
  Calendar,
  ArrowRight,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/app/footer/page";

export default function DestinationsPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await fetch("/api/packages?enabled=true");
      const data = await res.json();
      setPackages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch packages:", error);
    } finally {
      setLoading(false);
    }
  };

  const regions = [
    { id: "all", name: "All Regions", icon: MapPin },
    { id: "north", name: "North India", icon: Mountain },
    { id: "south", name: "South India", icon: Waves },
    { id: "east", name: "East India", icon: TreePine },
    { id: "west", name: "West India", icon: Camera },
    { id: "central", name: "Central India", icon: Tent },
  ];

  const packageTypes = [
    { id: "all", name: "All Packages", icon: Star },
    { id: "holidays", name: "Holiday Packages", icon: Calendar },
    { id: "hill-station", name: "Hill Stations", icon: Mountain },
    { id: "trekking", name: "Trekking", icon: Tent },
  ];

  // Filter packages based on search and filters
  // Backend packages use 'title', 'description', etc.
  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      const title = pkg.title || pkg.name || "";
      const description = pkg.description || "";
      const region = pkg.region || "";
      const type = pkg.type || "";

      const matchesSearch =
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRegion =
        selectedRegion === "all" || region === selectedRegion;
      const matchesType = selectedType === "all" || type === selectedType;

      return matchesSearch && matchesRegion && matchesType;
    });
  }, [packages, searchTerm, selectedRegion, selectedType]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section
        id="destinations"
        className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden pt-24"
      >
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-[#0056D2]/20 to-[#A0006D]/20 rounded-full filter blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tl from-[#A0006D]/20 to-[#5DFDCB]/20 rounded-full filter blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[#0056D2]/10 to-[#A0006D]/10 rounded-full filter blur-2xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-16 sm:py-20 md:py-24 relative z-10">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 sm:mb-20"
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
                className="w-3 h-3 bg-gradient-to-r from-[#0056D2] to-[#A0006D] rounded-full"
              />
              <span
                className="text-[#0056D2] font-bold text-sm uppercase tracking-wider"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                EXPLORE INDIA'S DIVERSITY
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
            >
              Travel{" "}
              <span className="bg-gradient-to-r from-[#0056D2] via-[#4A8BDF] to-[#A0006D] bg-clip-text text-transparent">
                Destinations
              </span>{" "}
              Across India
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Discover India's breathtaking landscapes, rich culture, and
              adventure opportunities with our curated travel packages across
              all regions.
            </motion.p>
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/50 shadow-xl">
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search destinations, activities, or places..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0056D2] focus:border-transparent text-gray-900 placeholder-gray-500"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                />
              </div>

              {/* Filter Buttons */}
              <div className="space-y-6">
                {/* Region Filter */}
                <div>
                  <h3
                    className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    <MapPin size={16} />
                    Filter by Region
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {regions.map((region) => {
                      const IconComponent = region.icon;
                      return (
                        <motion.button
                          key={region.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedRegion(region.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 ${
                            selectedRegion === region.id
                              ? "bg-[#0056D2] text-white border-[#0056D2] shadow-lg"
                              : "bg-white text-gray-700 border-gray-200 hover:border-[#0056D2] hover:text-[#0056D2]"
                          }`}
                          style={{ fontFamily: "Manrope, sans-serif" }}
                        >
                          <IconComponent size={16} />
                          {region.name}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Package Type Filter */}
                <div>
                  <h3
                    className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    <Star size={16} />
                    Filter by Package Type
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {packageTypes.map((type) => {
                      const IconComponent = type.icon;
                      return (
                        <motion.button
                          key={type.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedType(type.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 ${
                            selectedType === type.id
                              ? "bg-[#0056D2] text-white border-[#0056D2] shadow-lg"
                              : "bg-white text-gray-700 border-gray-200 hover:border-[#0056D2] hover:text-[#0056D2]"
                          }`}
                          style={{ fontFamily: "Manrope, sans-serif" }}
                        >
                          <IconComponent size={16} />
                          {type.name}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Results Count */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p
                  className="text-sm text-gray-600"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  {loading
                    ? "Loading packages..."
                    : `Showing ${filteredPackages.length} of ${packages.length} packages`}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Travel Packages Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mb-16">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-white rounded-3xl overflow-hidden shadow-xl border border-white/60"
                >
                  <div className="bg-gray-200 h-72 w-full" />
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
                    <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-5/6 mb-6" />
                    <div className="h-12 bg-gray-200 rounded-2xl w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedRegion}-${selectedType}-${searchTerm}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mb-16"
              >
                {filteredPackages.map((pkg) => {
                  const title = pkg.title || pkg.name || "Package";
                  const image =
                    pkg.images?.[0] ||
                    pkg.image ||
                    "https://images.unsplash.com/photo-1534695215921-52f8a19e7909";
                  const price = pkg.price || 0;
                  const duration = pkg.duration || "";
                  const rating = pkg.rating || 4.5;
                  const reviews = pkg.reviews || 0;
                  const region = pkg.region || "";
                  const type = pkg.type || "";
                  const description = pkg.description || "";
                  const highlights = pkg.highlights || pkg.inclusions || [];
                  const bestTime = pkg.bestTime || "";
                  const difficulty = pkg.difficulty || "";

                  return (
                    <motion.div
                      key={pkg.id || pkg._id}
                      variants={itemVariants}
                      whileHover={{ y: -8, scale: 1.02 }}
                      onHoverStart={() => setHoveredCard(pkg.id)}
                      onHoverEnd={() => setHoveredCard(null)}
                      className="group relative bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/60"
                    >
                      {/* Image Container */}
                      <div className="relative h-64 sm:h-72 overflow-hidden">
                        <img
                          src={image}
                          alt={title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Dynamic Overlay */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-t transition-all duration-500 ${
                            hoveredCard === pkg.id
                              ? "from-[#0056D2]/95 via-[#A0006D]/80 to-transparent"
                              : "from-black/70 via-black/40 to-transparent"
                          }`}
                        />

                        {/* Package Type Badge */}
                        {type && (
                          <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md rounded-full px-3 py-1 border border-white/30">
                            <div className="flex items-center gap-1">
                              {type === "holidays" && (
                                <Calendar className="text-white" size={12} />
                              )}
                              {type === "hill-station" && (
                                <Mountain className="text-white" size={12} />
                              )}
                              {type === "trekking" && (
                                <Tent className="text-white" size={12} />
                              )}
                              <span
                                className="text-white text-xs font-medium capitalize"
                                style={{ fontFamily: "Manrope, sans-serif" }}
                              >
                                {type.replace("-", " ")}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Region Badge */}
                        {region && (
                          <div className="absolute top-4 right-4 bg-[#0056D2]/80 backdrop-blur-md rounded-full px-3 py-1">
                            <span
                              className="text-white text-xs font-medium capitalize"
                              style={{ fontFamily: "Manrope, sans-serif" }}
                            >
                              {region} India
                            </span>
                          </div>
                        )}

                        {/* Rating */}
                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1">
                          <Star
                            className="text-yellow-400 fill-current"
                            size={12}
                          />
                          <span
                            className="text-gray-900 text-xs font-semibold"
                            style={{ fontFamily: "Manrope, sans-serif" }}
                          >
                            {rating}
                          </span>
                          {reviews > 0 && (
                            <span
                              className="text-gray-600 text-xs"
                              style={{ fontFamily: "Manrope, sans-serif" }}
                            >
                              ({reviews})
                            </span>
                          )}
                        </div>

                        {/* Price Badge */}
                        <div
                          className="absolute bottom-4 right-4 bg-[#0056D1] text-white rounded-full px-4 py-2 font-bold shadow-lg"
                          style={{ fontFamily: "Manrope, sans-serif" }}
                        >
                          ₹{price.toLocaleString()}
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6">
                        <div className="mb-4">
                          <h3
                            className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#0056D2] transition-colors"
                            style={{ fontFamily: "Montserrat, sans-serif" }}
                          >
                            {title}
                          </h3>
                          <p
                            className="text-gray-600 text-sm leading-relaxed mb-3"
                            style={{ fontFamily: "Manrope, sans-serif" }}
                          >
                            {description}
                          </p>

                          {/* Package Details */}
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                            {duration && (
                              <div className="flex items-center gap-1">
                                <Clock size={14} />
                                <span>{duration}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <Users size={14} />
                              <span>2-12 people</span>
                            </div>
                          </div>

                          {/* Highlights */}
                          {highlights.length > 0 && (
                            <div className="mb-4">
                              <p
                                className="text-xs text-gray-500 mb-2 font-medium"
                                style={{ fontFamily: "Manrope, sans-serif" }}
                              >
                                Key Highlights:
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {highlights.slice(0, 3).map((highlight, i) => (
                                  <span
                                    key={i}
                                    className="px-2 py-1 bg-[#0056D2]/10 text-[#0056D2] rounded-full text-xs font-medium"
                                    style={{
                                      fontFamily: "Manrope, sans-serif",
                                    }}
                                  >
                                    {highlight}
                                  </span>
                                ))}
                                {highlights.length > 3 && (
                                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                                    +{highlights.length - 3} more
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Package Info */}
                          {(bestTime || difficulty) && (
                            <div className="grid grid-cols-2 gap-3 text-xs text-gray-600 mb-4">
                              {bestTime && (
                                <div>
                                  <span className="font-medium">
                                    Best Time:
                                  </span>
                                  <p>{bestTime}</p>
                                </div>
                              )}
                              {difficulty && (
                                <div>
                                  <span className="font-medium">
                                    Difficulty:
                                  </span>
                                  <p>{difficulty}</p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Action Button */}
                        <Link href={`/package/${pkg.id}`}>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-gradient-to-r from-[#0056D2] to-[#A0006D] text-white font-bold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                            style={{ fontFamily: "Manrope, sans-serif" }}
                          >
                            <span>View Details</span>
                            <ArrowRight
                              className="transition-transform duration-300 group-hover:translate-x-1"
                              size={16}
                            />
                          </motion.button>
                        </Link>
                      </div>

                      {/* Glow Effect */}
                      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#A0006D]/60 rounded-3xl transition-all duration-500 pointer-events-none" />
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          )}

          {/* No Results */}
          {!loading && filteredPackages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 border border-white/50 shadow-xl max-w-md mx-auto">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 bg-gradient-to-r from-[#0056D2] to-[#A0006D] rounded-2xl flex items-center justify-center mx-auto mb-4"
                >
                  <Search className="text-white" size={24} />
                </motion.div>
                <h3
                  className="text-xl font-bold text-gray-900 mb-2"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  No packages found
                </h3>
                <p
                  className="text-gray-600"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Try adjusting your search terms or filters
                </p>
              </div>
            </motion.div>
          )}

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="text-center mt-16 sm:mt-20"
          >
            <div className="bg-gradient-to-r from-[#0056D2]/5 via-[#A0006D]/5 to-[#0056D2]/5 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-[#A0006D]/20">
              <h3
                className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Ready to Start Your Indian Adventure?
              </h3>
              <p
                className="text-gray-600 mb-8 max-w-2xl mx-auto"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Choose from our curated collection of travel packages and create
                unforgettable memories across India's diverse landscapes.
              </p>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-[#0056D2] to-[#A0006D] text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-lg"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Contact Us to Book
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
