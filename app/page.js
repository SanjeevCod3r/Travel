"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  MapPin,
  Calendar,
  Clock,
  Car,
  Users,
  Phone,
  Mail,
  User,
  Plane,
  Building2,
  Route,
  ChevronRight,
  Star,
  Shield,
  Headphones,
  CreditCard,
  CheckCircle2,
  X,
  Menu,
  ArrowRight,
  Package,
  Truck,
  Navigation,
} from "lucide-react";
import Contact from "./contact/page";
import About from "./about/page";
import Footer from "./footer/page";
import Header from "@/components/Header";
import { FeaturedDestinations } from "@/components/FeaturedDestinations";
import { Services } from "@/components/Services";
import { FleetShowcase } from "@/components/FleetShowcase";
import { FleetIntro } from "@/components/FleetIntro";
import { AboutShowcase } from "@/components/AboutShowCase";
import { WhyChoose } from "@/components/WhyChooseUs";
import { DestinationShowcase } from "@/components/DestinationShowCase";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Old Header Component
function OldHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    const token = localStorage.getItem("userToken");
    const userData = localStorage.getItem("userData");
    if (token && userData) {
      setUser(JSON.parse(userData));
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    setUser(null);
    toast.success("Logged out successfully");
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Packages", href: "#packages" },
    { name: "Fleet", href: "#fleet" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-4 left-4 right-4 z-50 transition-all duration-500 ${
          isScrolled ? "top-2 left-2 right-2" : ""
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-6 py-4 flex items-center justify-between rounded-3xl border transition-all duration-500 ${
            isScrolled
              ? "bg-white/95 backdrop-blur-xl shadow-2xl"
              : "bg-white/80 backdrop-blur-lg"
          }`}
        >
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Navigation className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-paleBlue">Voyage</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-gray-700 hover:text-primary transition"
              >
                {link.name}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary hover:w-full transition-all"></span>
              </a>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <>
                <a
                  href="/my-bookings"
                  className="text-gray-600 hover:text-paleBlue"
                >
                  {user.name || "My Bookings"}
                </a>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <a href="/auth" className="text-gray-600 hover:text-paleBlue">
                  Login
                </a>
                <Button size="sm">Sign Up</Button>
              </>
            )}

            {/* CTA */}
            <a href="#contact">
              <button className="px-5 py-2.5 bg-gradient-to-r from-[#FE805A] to-[#FE6B47] text-white rounded-full shadow-lg hover:shadow-xl transition">
                Book Now
              </button>
            </a>
          </div>

          {/* Mobile */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed top-0 right-0 w-80 h-full bg-white shadow-2xl z-50 p-6"
          >
            <button onClick={() => setMobileMenuOpen(false)} className="mb-6">
              <X />
            </button>

            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg text-gray-700 hover:text-primary"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Hero Section with Cab Booking
function HeroSection({ onBookingSuccess }) {
  const [tripType, setTripType] = useState("local");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [vehicleType, setVehicleType] = useState("sedan");
  const [priceEstimate, setPriceEstimate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      setSettings(data);
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    }
  };

  const getEstimate = async () => {
    if (!pickup || !drop) {
      toast.error("Please enter pickup and drop locations");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/pricing/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pickup, drop, tripType, vehicleType }),
      });
      const data = await res.json();

      if (data.error) {
        toast.error(data.error);
        return;
      }

      setPriceEstimate(data);
    } catch (error) {
      toast.error("Failed to get estimate");
    } finally {
      setLoading(false);
    }
  };

  const tripTypes = [
    { value: "local", label: "Local", icon: Building2 },
    { value: "outstation", label: "Outstation", icon: Route },
    { value: "airport", label: "Airport", icon: Plane },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-16">
      <div className="absolute inset-0">
        <img
          src="/asset/Home Page Hero Image.png"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Experience
              <br />
              <span className="text-white">Excellence</span>
            </h1>
            <p className="text-lg text-gray-200 mb-8 max-w-lg">
              Book cabs, explore travel packages, and rent fleet vehicles.
              Experience premium travel service at the best prices.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
              data-testid="hero-cta-container"
            >
              <motion.a
                href="/destinations"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0, 86, 210, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#0056D2] to-[#A0006D] text-white font-semibold rounded-full shadow-2xl transition-all duration-300 text-sm sm:text-base"
                style={{ fontFamily: "Manrope, sans-serif" }}
                data-testid="explore-services-button"
              >
                Explore Destinations
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-lg text-white font-semibold rounded-full border-2 border-white/30 hover:bg-white/20 transition-all duration-300 text-sm sm:text-base"
                style={{ fontFamily: "Manrope, sans-serif" }}
                data-testid="contact-us-button"
              >
                Contact Us
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="shadow-2xl bg-[#FFFFFFCC] ">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl">Book Your Ride</CardTitle>
                <CardDescription>Get instant price estimate</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Trip Type Tabs */}
                <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
                  {tripTypes.map((type) => {
                    const isDisabled =
                      settings?.tripTypes &&
                      !settings.tripTypes[type.value]?.enabled;
                    return (
                      <button
                        key={type.value}
                        onClick={() => !isDisabled && setTripType(type.value)}
                        disabled={isDisabled}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md transition-all text-sm ${
                          tripType === type.value
                            ? "bg-paleBlue text-white"
                            : isDisabled
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        <type.icon className="w-4 h-4" />
                        {type.label}
                      </button>
                    );
                  })}
                </div>

                {/* Pickup & Drop */}
                <div className="space-y-3">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-green-500" />
                    <Input
                      placeholder="Pickup Location"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-red-500" />
                    <Input
                      placeholder="Drop Location"
                      value={drop}
                      onChange={(e) => setDrop(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="pl-10"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Vehicle Type */}
                <Select value={vehicleType} onValueChange={setVehicleType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedan">
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4" /> Sedan (4 Seats)
                      </div>
                    </SelectItem>
                    <SelectItem value="suv">
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4" /> SUV (7 Seats)
                      </div>
                    </SelectItem>
                    <SelectItem value="luxury">
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4" /> Luxury (4 Seats)
                      </div>
                    </SelectItem>
                    <SelectItem value="tempo">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4" /> Tempo (12 Seats)
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>

                {/* Price Estimate Display */}
                <AnimatePresence>
                  {priceEstimate && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-gradient-to-r from-paleBlue-50 to-indigo-50 rounded-lg p-4 border border-paleBlue-100"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Estimated Fare</span>
                        <span className="text-3xl font-bold text-primary">
                          ₹{priceEstimate.estimatedFare}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 space-y-1">
                        <div className="flex justify-between">
                          <span>Distance:</span>
                          <span>{priceEstimate.distance} km</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Base Fare:</span>
                          <span>₹{priceEstimate.baseFare}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Per KM Rate:</span>
                          <span>₹{priceEstimate.perKmRate}/km</span>
                        </div>
                        {priceEstimate.surgePricing > 1 && (
                          <div className="flex justify-between text-orange-600">
                            <span>Surge:</span>
                            <span>{priceEstimate.surgePricing}x</span>
                          </div>
                        )}
                      </div>
                      {!priceEstimate.routeFound && (
                        <p className="text-xs text-amber-600 mt-2">
                          * Price based on default rates. Actual fare may vary.
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
              <CardFooter className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={getEstimate}
                  disabled={loading}
                >
                  {loading ? "Calculating..." : "Get Estimate"}
                </Button>
                <Button
                  className="flex-1 bg-paleBlue hover:bg-paleBlue"
                  onClick={() => {
                    if (!priceEstimate) {
                      toast.error("Please get an estimate first");
                      return;
                    }
                    setShowBookingModal(true);
                  }}
                >
                  Book Now
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        open={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        type="cab"
        bookingData={{
          pickup,
          drop,
          tripType,
          vehicleType,
          date,
          time,
          ...priceEstimate,
        }}
        onSuccess={onBookingSuccess}
      />
    </section>
  );
}

// Booking Modal Component with Razorpay Payment
function BookingModal({ open, onClose, type, bookingData, onSuccess }) {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const userData = localStorage.getItem("userData");
    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setCustomerName(parsedUser.name || "");
      setCustomerPhone(parsedUser.phone || "");
      setCustomerEmail(parsedUser.email || "");
    }
  }, [open]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!customerName || !customerPhone) {
      toast.error("Please fill in all required fields");
      return;
    }

    const token = localStorage.getItem("userToken");
    if (!token) {
      toast.error("Please login to book");
      window.location.href = "/auth";
      return;
    }

    setLoading(true);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error("Failed to load payment gateway");
        setLoading(false);
        return;
      }

      const amount =
        (bookingData?.totalPrice ||
          bookingData?.pricePerDay ||
          bookingData?.estimatedFare ||
          1500) * 100;

      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount,
          bookingType: type,
        }),
      });

      const orderData = await orderRes.json();

      if (orderData.error) {
        if (orderData.requireLogin) {
          toast.error("Please login to continue");
          window.location.href = "/auth";
          return;
        }
        toast.error(orderData.error);
        setLoading(false);
        return;
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Voyage Travel",
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} Booking`,
        order_id: orderData.orderId,
        handler: async function (response) {
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
                  type,
                  customerName,
                  customerPhone,
                  customerEmail,
                  ...bookingData,
                },
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              toast.success("Payment successful! Booking confirmed.");
              onClose();
              setCustomerName("");
              setCustomerPhone("");
              setCustomerEmail("");
              if (onSuccess) onSuccess();
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error) {
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone,
        },
        theme: {
          color: "#0056D2",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Check if user is logged in
  if (open && !localStorage.getItem("userToken")) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md rounded-3xl border-none shadow-2xl">
          <DialogHeader className="space-y-4 text-center items-center">
            <DialogTitle
              className="text-2xl font-black text-gray-900"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Login Required
            </DialogTitle>
            <DialogDescription
              className="text-gray-500 font-medium"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Sign in to secure your booking and unlock premium features.
            </DialogDescription>
          </DialogHeader>
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-paleBlue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-10 h-10 text-[#0056D2]" />
            </div>
            <p
              className="text-gray-600 mb-8 font-semibold"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              You need to be logged in to make a booking
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                variant="outline"
                onClick={onClose}
                className="rounded-xl px-10 py-5 h-auto font-black border-gray-200"
              >
                Cancel
              </Button>
              <a href="/auth">
                <Button className="bg-[#0056D2] hover:bg-paleBlue-700 text-white font-black rounded-xl px-10 py-5 h-auto shadow-lg shadow-paleBlue-100 transition-all">
                  Sign In Now
                </Button>
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const totalAmount =
    bookingData?.totalPrice ||
    bookingData?.pricePerDay ||
    bookingData?.estimatedFare ||
    0;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden bg-white">
        {/* Modal Header with vibrant gradient */}
        <div className="bg-gradient-to-r from-[#0056D2] to-[#A0006D] p-8 text-white relative">
          <div className="relative z-10">
            <h2
              className="text-2xl font-black mb-2"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Book Your Success
            </h2>
            <p
              className="opacity-90 font-medium"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              {type === "fleet" ? "Fleet Vehicle" : "Travel Package"} •{" "}
              {bookingData?.vehicleName ||
                bookingData?.packageTitle ||
                "Service"}
            </p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
        </div>

        <div className="p-8 space-y-8">
          {/* User Details Section */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-paleBlue-50 rounded-full mb-2">
              <Label
                className="text-[10px] font-black uppercase tracking-widest text-[#0056D2]"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Personal Information
              </Label>
            </div>

            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0056D2] to-[#A0006D] rounded-2xl blur opacity-0 group-focus-within:opacity-10 transition-opacity"></div>
                <div className="relative flex items-center bg-gray-50 rounded-2xl border-none h-full">
                  <div className="pl-5 flex items-center pointer-events-none text-gray-400">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full pl-4 pr-4 py-5 bg-transparent text-gray-900 focus:outline-none font-bold placeholder:text-gray-400"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0056D2] to-[#A0006D] rounded-2xl blur opacity-0 group-focus-within:opacity-10 transition-opacity"></div>
                  <div className="relative flex items-center bg-gray-50 rounded-2xl border-none h-full">
                    <div className="pl-5 flex items-center pointer-events-none text-gray-400">
                      <Phone className="w-5 h-5" />
                    </div>
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full pl-4 pr-4 py-5 bg-transparent text-gray-900 focus:outline-none font-bold placeholder:text-gray-400"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                      required
                    />
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0056D2] to-[#A0006D] rounded-2xl blur opacity-0 group-focus-within:opacity-10 transition-opacity"></div>
                  <div className="relative flex items-center bg-gray-50 rounded-2xl border-none h-full">
                    <div className="pl-5 flex items-center pointer-events-none text-gray-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <input
                      type="email"
                      placeholder="Email (Optional)"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full pl-4 pr-4 py-5 bg-transparent text-gray-900 focus:outline-none font-bold placeholder:text-gray-400"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Summary Card */}
          <div className="bg-gradient-to-br from-[#FE805A] to-[#FE6B47] rounded-3xl p-8 text-white shadow-xl shadow-orange-100 flex items-center justify-between">
            <div>
              <span
                className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Secure your quote
              </span>
              <h3
                className="text-2xl font-black"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                ₹{(totalAmount || 1500).toLocaleString()}
              </h3>
            </div>
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-2xl py-6 h-auto font-black border-gray-100 text-gray-500 hover:bg-gray-50 transition-all"
            >
              Later
            </Button>
            <Button
              onClick={handlePayment}
              disabled={loading}
              className="flex-[2] bg-gray-900 hover:bg-black text-white font-black rounded-2xl py-6 h-auto shadow-xl transition-all hover:scale-[1.02] active:scale-95 gap-3 text-lg"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              <CreditCard className="w-5 h-5" />
              {loading ? "Processing..." : "Confirm Now"}
            </Button>
          </div>

          <p
            className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            256-bit secure encrypted payment
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Removed old PackagesSection and FleetSection functions as they are replaced by new components

// Main App Component
export default function App() {
  const [vehicles, setVehicles] = useState([]);
  const [loadingVehicles, setLoadingVehicles] = useState(true);
  const [selectedFleetVehicle, setSelectedFleetVehicle] = useState(null);
  const [showFleetModal, setShowFleetModal] = useState(false);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await fetch("/api/vehicles?enabled=true");
      const data = await res.json();
      setVehicles(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch vehicles:", error);
    } finally {
      setLoadingVehicles(false);
    }
  };

  const handleBookingSuccess = () => {
    console.log("Booking successful!");
    toast.success("Your booking request has been received!");
  };

  const handleFleetBooking = ({ vehicle }) => {
    setSelectedFleetVehicle(vehicle);
    setShowFleetModal(true);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection onBookingSuccess={handleBookingSuccess} />
        <AboutShowcase />
        <Services />
        <FeaturedDestinations />
        <DestinationShowcase />
        <WhyChoose />
        <FleetIntro />
        <FleetShowcase
          vehicles={vehicles}
          loading={loadingVehicles}
          onBookNow={handleFleetBooking}
        />
      </main>

      <Footer />

      {/* Booking Modals for Fleet */}
      {selectedFleetVehicle && (
        <BookingModal
          open={showFleetModal}
          onClose={() => {
            setShowFleetModal(false);
            setSelectedFleetVehicle(null);
          }}
          type="fleet"
          bookingData={{
            vehicleId: selectedFleetVehicle.id,
            vehicleName: selectedFleetVehicle.name,
            vehicleType: selectedFleetVehicle.type,
            pricePerDay: selectedFleetVehicle.pricePerDay,
            pricePerKm: selectedFleetVehicle.pricePerKm,
          }}
          onSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
}
