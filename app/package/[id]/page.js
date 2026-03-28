"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/app/footer/page";
import {
  MapPin,
  Clock,
  Users,
  Star,
  IndianRupee,
  CheckCircle,
  X,
  Phone,
  Mail,
  ArrowLeft,
  Mountain,
  Waves,
  TreePine,
  Camera,
  Tent,
  MessageCircle,
} from "lucide-react";

export default function PackageDetail() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    travelers: 1,
    travelDate: "",
    specialRequests: "",
  });

  const [user, setUser] = useState(null);

  const handleBackClick = () => router.back();

  useEffect(() => {
    if (id) fetchPackageDetails();
    checkAuth();

    // Load Razorpay Script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [id]);

  const checkAuth = () => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setBookingForm((prev) => ({
        ...prev,
        name: parsedUser.name || "",
        email: parsedUser.email || "",
        phone: parsedUser.phone || "",
      }));
    }
  };

  const fetchPackageDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/packages/${id}`);
      if (!res.ok) throw new Error("Package not found");
      const data = await res.json();

      data.highlights = data.highlights || [];
      data.itinerary = data.itinerary || [];
      data.inclusions = data.inclusions || [];
      data.exclusions = data.exclusions || [];
      data.images = data.images || [];

      setPackageData(data);
    } catch (error) {
      console.error("Failed to fetch package:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("userToken");
    if (!token) {
      alert("Please login to book this package");
      router.push("/auth");
      return;
    }

    const totalPrice = (packageData.price || 0) * bookingForm.travelers;

    try {
      // 1. Create Order
      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: totalPrice * 100, // Amount in paise
          bookingType: "package",
          bookingId: id,
        }),
      });

      const orderData = await orderRes.json();
      if (orderData.error) throw new Error(orderData.error);

      // 2. Open Razorpay Checkout
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Excursion Travel",
        description: `Booking for ${packageData.title}`,
        image: "/logo.png",
        order_id: orderData.orderId,
        handler: async function (response) {
          // 3. Verify Payment
          try {
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingData: {
                  type: "package",
                  packageTitle: packageData.title,
                  packageId: id,
                  duration: packageData.duration,
                  totalPrice: totalPrice,
                  customerName: bookingForm.name,
                  customerPhone: bookingForm.phone,
                  customerEmail: bookingForm.email,
                  travelers: bookingForm.travelers,
                  travelDate: bookingForm.travelDate,
                  specialRequests: bookingForm.specialRequests,
                },
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              alert("Booking Confirmed! Thank you for choosing Excursion Travel.");
              // Refresh or stay on page
              window.location.reload();
            } else {
              throw new Error(
                verifyData.error || "Payment verification failed"
              );
            }
          } catch (error) {
            console.error("Verification Error:", error);
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: bookingForm.name,
          email: bookingForm.email,
          contact: bookingForm.phone,
        },
        theme: {
          color: "#0056D2",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Booking Error:", error);
      alert(error.message || "Failed to initiate booking. Please try again.");
    }
  };

  const getRegionIcon = (region) => {
    switch (region?.toLowerCase()) {
      case "north":
        return <Mountain size={20} />;
      case "south":
        return <Waves size={20} />;
      case "east":
        return <TreePine size={20} />;
      case "west":
        return <Camera size={20} />;
      case "central":
        return <Tent size={20} />;
      default:
        return <MapPin size={20} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-[#0056D2] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading package details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Package Not Found
            </h2>
            <p className="text-gray-600 mb-4">
              The package you are looking for does not exist.
            </p>
            <button
              onClick={() => router.push("/destinations")}
              className="bg-[#0056D2] text-white px-6 py-2 rounded-xl border-none cursor-pointer"
            >
              Browse Destinations
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const price = packageData.price || 0;
  const title = packageData.title || "Beautiful Destination";
  const type = packageData.type || "holidays";

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />

      {/* Hero Section */}
      <div className="relative h-96 lg:h-[500px] overflow-hidden pt-20">
        <img
          src={
            packageData.images?.[0] ||
            "https://images.unsplash.com/photo-1534695215921-52f8a19e7909?w=1600"
          }
          alt={title}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        {/* Back Button */}
        <button
          onClick={handleBackClick}
          className="hidden md:flex absolute top-28 left-6 z-50 bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/40 transition-all duration-200 cursor-pointer border border-white/30 items-center justify-center"
          aria-label="Go back"
          style={{ minWidth: "48px", minHeight: "48px" }}
        >
          <ArrowLeft size={24} />
        </button>

        {/* Package Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              {packageData.region && (
                <span className="bg-[#0056D2]/80 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                  {getRegionIcon(packageData.region)}
                  {packageData.region.charAt(0).toUpperCase() +
                    packageData.region.slice(1)}{" "}
                  India
                </span>
              )}
              {type && (
                <span className="bg-[#A0006D]/80 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium">
                  {type.replace("-", " ").toUpperCase()}
                </span>
              )}
            </div>

            <h1
              className="text-4xl lg:text-6xl font-bold mb-4"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-lg">
              <div className="flex items-center gap-2">
                <Clock size={20} />
                <span>{packageData.duration || "Flexible"}</span>
              </div>
              <div className="flex items-center gap-2">
                <IndianRupee size={20} />
                <span className="text-2xl font-bold">
                  {price.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex flex-wrap gap-2 mb-6">
                {["overview", "itinerary", "includes", "policies"].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-3 rounded-xl font-medium transition-all capitalize border-none cursor-pointer ${
                        activeTab === tab
                          ? "bg-[#0056D2] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                      {tab}
                    </button>
                  )
                )}
              </div>

              {/* Tab Content */}
              <div className="min-h-[300px]">
                {activeTab === "overview" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3
                      className="text-2xl font-bold text-gray-900 mb-4"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      Package Overview
                    </h3>
                    <p
                      className="text-gray-700 mb-6 leading-relaxed"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                      {packageData.description ||
                        "No description available for this package."}
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Key Highlights
                        </h4>
                        <div className="space-y-2">
                          {packageData.highlights.length > 0 ? (
                            packageData.highlights.map((highlight, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-3"
                              >
                                <CheckCircle
                                  size={18}
                                  className="text-green-500 mt-0.5 flex-shrink-0"
                                />
                                <span className="text-gray-700">
                                  {highlight}
                                </span>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-500 italic">
                              No specific highlights listed.
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Trip Details
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600">Duration:</span>
                            <span className="font-medium text-gray-900">
                              {packageData.duration || "N/A"}
                            </span>
                          </div>
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600">Difficulty:</span>
                            <span className="font-medium text-gray-900">
                              {packageData.difficulty || "N/A"}
                            </span>
                          </div>
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600">Best Time:</span>
                            <span className="font-medium text-gray-900">
                              {packageData.bestTime || "N/A"}
                            </span>
                          </div>
                          <div className="flex justify-between pb-2">
                            <span className="text-gray-600">Max Altitude:</span>
                            <span className="font-medium text-gray-900">
                              {packageData.maxAltitude || "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "itinerary" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3
                      className="text-2xl font-bold text-gray-900 mb-6"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      Detailed Itinerary
                    </h3>
                    <div className="space-y-4">
                      {packageData.itinerary.length > 0 ? (
                        packageData.itinerary.map((day, index) => {
                          const parts = day.split(":");
                          const hasDayPrefix =
                            parts.length > 1 &&
                            parts[0].toLowerCase().includes("day");
                          const title = hasDayPrefix
                            ? parts[0]
                            : `Day ${index + 1}`;
                          const description = hasDayPrefix
                            ? parts.slice(1).join(":").trim()
                            : day;

                          return (
                            <div
                              key={index}
                              className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100"
                            >
                              <div className="flex-shrink-0 w-12 h-12 bg-[#0056D2] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                                {index + 1}
                              </div>
                              <div className="pt-1">
                                <h4 className="font-bold text-gray-900 mb-1">
                                  {title}
                                </h4>
                                <p className="text-gray-700 leading-relaxed">
                                  {description}
                                </p>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-gray-500 italic">
                          No specific itinerary listed.
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {activeTab === "includes" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3
                      className="text-2xl font-bold text-gray-900 mb-6"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      Inclusions & Exclusions
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="bg-green-50/50 p-5 rounded-xl border border-green-100">
                        <h4 className="font-bold mb-4 text-green-800 flex items-center gap-2">
                          <CheckCircle size={20} /> Included
                        </h4>
                        <div className="space-y-3">
                          {packageData.inclusions.length > 0 ? (
                            packageData.inclusions.map((item, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-3"
                              >
                                <CheckCircle
                                  size={16}
                                  className="text-green-500 mt-1 flex-shrink-0"
                                />
                                <span className="text-gray-800">{item}</span>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-500 italic text-sm">
                              No specific inclusions listed.
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="bg-red-50/50 p-5 rounded-xl border border-red-100">
                        <h4 className="font-bold mb-4 text-red-800 flex items-center gap-2">
                          <X size={20} /> Not Included
                        </h4>
                        <div className="space-y-3">
                          {packageData.exclusions.length > 0 ? (
                            packageData.exclusions.map((item, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-3"
                              >
                                <X
                                  size={16}
                                  className="text-red-400 mt-1 flex-shrink-0"
                                />
                                <span className="text-gray-800">{item}</span>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-500 italic text-sm">
                              No specific exclusions listed.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "policies" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3
                      className="text-2xl font-bold text-gray-900 mb-6"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      Booking Policies
                    </h3>
                    <div className="space-y-6 text-gray-700">
                      <div className="bg-blue-50/50 p-5 rounded-xl">
                        <h4 className="font-bold mb-3 text-blue-900">
                          Cancellation Policy
                        </h4>
                        <ul className="list-disc pl-5">
                          <li>25% charge for 30+ days before travel</li>
                          <li>50% charge for 15-30 days before travel</li>
                          <li>75% charge for 7-14 days before travel</li>
                          <li className="text-red-600 font-bold">
                            100% charge for less than 7 days
                          </li>
                        </ul>
                      </div>
                      <div className="bg-gray-50 p-5 rounded-xl">
                        <h4 className="font-bold mb-3 text-gray-900">
                          Important Notes
                        </h4>
                        <ul className="list-disc pl-5">
                          <li>Valid ID proof required for all travelers</li>
                          <li>
                            Itinerary may change due to weather conditions
                          </li>
                          <li>
                            All permits and entry fees included as mentioned
                          </li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                <h3
                  className="text-xl font-bold mb-4 text-gray-900"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Book This Package
                </h3>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100 mb-6 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <span className="text-3xl font-bold text-[#0056D2]">
                      ₹{price.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    per person
                  </span>
                  <div className="mt-3 pt-3 border-t border-blue-200 text-sm text-gray-700 font-medium">
                    Duration: {packageData.duration || "Flexible"} | Group: 2-12
                  </div>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <input
                    type="text"
                    required
                    value={bookingForm.name}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                    placeholder="Full Name"
                  />
                  <input
                    type="email"
                    required
                    value={bookingForm.email}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                    placeholder="Email Address"
                  />
                  <input
                    type="tel"
                    required
                    value={bookingForm.phone}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                    placeholder="Phone Number"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <select
                      value={bookingForm.travelers}
                      onChange={(e) =>
                        setBookingForm({
                          ...bookingForm,
                          travelers: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                        <option key={num} value={num}>
                          {num} Person{num > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                    <input
                      type="date"
                      required
                      value={bookingForm.travelDate}
                      onChange={(e) =>
                        setBookingForm({
                          ...bookingForm,
                          travelDate: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                    />
                  </div>
                  <textarea
                    rows={3}
                    value={bookingForm.specialRequests}
                    onChange={(e) =>
                      setBookingForm({
                        ...bookingForm,
                        specialRequests: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl resize-none"
                    placeholder="Special Requests..."
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full mt-2 bg-gradient-to-r from-[#0056D2] to-[#A0006D] text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg border-none cursor-pointer"
                  >
                    Book for ₹{(price * bookingForm.travelers).toLocaleString()}
                  </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-3">
                  <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                    <div className="flex items-center gap-3 text-sm font-medium text-gray-800">
                      <Phone size={14} className="text-[#0056D2]" /> +91
                      9990-817-615
                    </div>
                    <div className="flex items-center gap-3 text-sm font-medium text-gray-800">
                      <Mail size={14} className="text-[#0056D2]" />{" "}
                      bookings@travel.com
                    </div>
                    <div className="flex items-center gap-3 text-sm font-medium text-gray-800">
                      <MessageCircle size={14} className="text-green-600" />{" "}
                      WhatsApp support
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
