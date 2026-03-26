"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  X,
  Car,
  Users,
  Shield,
  Star,
  MapPin,
  Clock,
  Fuel,
  Settings,
  Briefcase,
} from "lucide-react";

export const Fleet = ({ onBookNow, vehicles = [], loading = false }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    category: "all",
    passengers: "all",
    features: [],
  });
  const [showFilters, setShowFilters] = useState(false);

  // Group vehicles by category for category selection
  const fleetCategories = useMemo(() => {
    const categories = Array.from(
      new Set(vehicles.map((v) => v.type || "other"))
    );
    return categories.map((cat) => ({
      name: cat.toUpperCase(),
      icon: cat === "suv" ? Shield : cat === "sedan" ? Briefcase : Users,
      value: cat,
    }));
  }, [vehicles]);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      // Search filter
      const matchesSearch =
        searchTerm === "" ||
        vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (vehicle.description &&
          vehicle.description.toLowerCase().includes(searchTerm.toLowerCase()));

      // Category filter
      const matchesCategory =
        selectedFilters.category === "all" ||
        vehicle.type === selectedFilters.category;

      // Passengers filter
      const vehiclePassengers = vehicle.seating || 4;
      const matchesPassengers =
        selectedFilters.passengers === "all" ||
        (selectedFilters.passengers === "1-4" && vehiclePassengers <= 4) ||
        (selectedFilters.passengers === "5-7" &&
          vehiclePassengers >= 5 &&
          vehiclePassengers <= 7) ||
        (selectedFilters.passengers === "8+" && vehiclePassengers >= 8);

      // Features filter - adjusting to handle possible API data structure
      const vehicleFeatures = vehicle.features || [];
      const matchesFeatures =
        selectedFilters.features.length === 0 ||
        selectedFilters.features.every((feature) =>
          vehicleFeatures.some((vFeature) =>
            vFeature.toLowerCase().includes(feature.toLowerCase())
          )
        );

      return (
        matchesSearch && matchesCategory && matchesPassengers && matchesFeatures
      );
    });
  }, [vehicles, searchTerm, selectedFilters]);

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      category: "all",
      passengers: "all",
      features: [],
    });
    setSearchTerm("");
  };

  const availableFeatures = [
    "AC",
    "Fuel Efficient",
    "Luxury",
    "Spacious",
    "Premium",
    "Advanced Safety",
    "Entertainment",
  ];

  return (
    <section
      id="fleet"
      className="py-24 bg-gradient-to-br from-gray-50 via-white to-paleBlue-50 relative overflow-hidden"
      data-testid="fleet-section"
    >
      {/* Background decorations removed for brevity, keeping same structure as user provided snippet */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-[#0056D2]/10 to-[#43E0F8]/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tl from-[#43E0F8]/10 to-[#5DFDCB]/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center mt-6 gap-3 px-8 py-4 bg-gradient-to-r from-[#0056D2]/10 via-[#43E0F8]/10 to-[#0056D2]/10 backdrop-blur-xl rounded-full border border-[#43E0F8]/30 mb-8 shadow-lg">
            <span
              className="text-[#0056D2] font-bold text-sm uppercase tracking-wider"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              EXPLORE OUR FLEET
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Find Your{" "}
            <span className="bg-gradient-to-r from-[#0056D2] via-[#4A8BDF] to-[#A0006D] bg-clip-text text-transparent">
              Perfect Vehicle
            </span>
          </h2>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search vehicles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl focus:outline-none transition-all text-gray-900"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-[#0056D2] to-[#4A8BDF] text-white font-semibold rounded-2xl shadow-lg"
          >
            <Filter className="w-5 h-5" /> Filters
          </motion.button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => handleFilterChange("category", "all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedFilters.category === "all"
                ? "bg-[#0056D2] text-white"
                : "bg-white text-gray-700"
            }`}
          >
            All
          </button>
          {fleetCategories.map((category) => (
            <button
              key={category.value}
              onClick={() => handleFilterChange("category", category.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedFilters.category === category.value
                  ? "bg-[#0056D2] text-white"
                  : "bg-white text-gray-700 border border-gray-200"
              }`}
            >
              <category.icon className="w-4 h-4" />
              {category.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl h-80 animate-pulse border border-gray-100"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredVehicles.map((vehicle, index) => (
              <motion.div
                key={vehicle.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100"
              >
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={vehicle.images?.[0] || "/asset/car-placeholder.png"}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-[#0056D2]">
                    {vehicle.seating} Seats
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 truncate title">
                      {vehicle.name}
                    </h3>
                    {vehicle.type && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs capitalize whitespace-nowrap ml-2 mt-1">
                        {vehicle.type}
                      </span>
                    )}
                  </div>
                  
                  {vehicle.description && (
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2" title={vehicle.description}>
                      {vehicle.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 mb-6 min-h-[40px]">
                    {(vehicle.features || [])
                      .slice(0, 3)
                      .map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-paleBlue-50 text-[#0056D2] text-xs rounded-full border border-paleBlue-100"
                        >
                          {feature}
                        </span>
                      ))}
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onBookNow?.({ vehicle })}
                    className="w-full py-3 bg-gradient-to-r from-[#0056D2] to-[#0056D2] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
                  >
                    Book for ₹{vehicle.pricePerDay || 1000} /day
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {filteredVehicles.length === 0 && !loading && (
          <div className="text-center py-16">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No vehicles found
            </h3>
            <button
              onClick={clearFilters}
              className="text-[#0056D2] font-semibold"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
