"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Navigation,
  Car,
  Users,
  Route,
  Phone,
  Mail,
  User,
  ArrowLeft,
  Calendar,
  Search,
  CreditCard,
  Truck,
  Bus,
} from "lucide-react";

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

import Header from "@/components/Header";
import { Fleet } from "@/components/Fleet";
import Footer from "@/app/footer/page";

// Fleet Booking Modal with Payment
function FleetBookingModal({ open, onClose, vehicle, onSuccess }) {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const userData = localStorage.getItem("userData");
    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      setCustomerName(parsedUser.name || "");
      setCustomerPhone(parsedUser.phone || "");
      setCustomerEmail(parsedUser.email || "");
    }
  }, [open]);

  const calculateDays = () => {
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const totalAmount = (vehicle?.pricePerDay || 0) * calculateDays();

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
    if (!customerName || !customerPhone || !startDate) {
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

      const amount = totalAmount * 100; // Convert to paise

      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount,
          bookingType: "fleet",
        }),
      });

      const orderData = await orderRes.json();

      if (orderData.error) {
        if (orderData.requireLogin) {
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
        name: "ANTIGRAVITY TRAVEL",
        description: `Fleet Booking - ${vehicle?.name}`,
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
                  type: "fleet",
                  customerName,
                  customerPhone,
                  customerEmail,
                  vehicleId: vehicle?.id,
                  vehicleName: vehicle?.name,
                  vehicleType: vehicle?.type,
                  pricePerDay: vehicle?.pricePerDay,
                  startDate,
                  endDate,
                  days: calculateDays(),
                  totalPrice: totalAmount,
                },
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              toast.success("Payment successful! Vehicle booked.");
              onClose();
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
      toast.error("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  // Check if user is logged in
  if (open && !localStorage.getItem("userToken")) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md rounded-3xl border-none shadow-2xl">
          <DialogHeader className="space-y-4">
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
              Sign in to secure your vehicle and unlock premium features.
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
              You need to be logged in to book a vehicle
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                variant="outline"
                onClick={onClose}
                className="rounded-xl px-6 py-5 h-auto font-bold border-gray-200"
              >
                Cancel
              </Button>
              <a href="/auth">
                <Button className="bg-[#0056D2] hover:bg-paleBlue-700 text-white font-bold rounded-xl px-8 py-5 h-auto shadow-lg shadow-paleBlue-100 transition-all">
                  Sign In Now
                </Button>
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!vehicle) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden bg-white">
        <div className="bg-gradient-to-r from-[#FE805A] to-[#FE6B47] p-8 text-white relative">
          <div className="relative z-10">
            <h2
              className="text-2xl font-black mb-2"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Book Your Ride
            </h2>
            <p
              className="opacity-90 font-medium"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              {vehicle.name} • {vehicle.seating} Seats
            </p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                className="text-xs font-black uppercase tracking-widest text-gray-400"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Start Date
              </Label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="pl-12 py-6 rounded-2xl bg-gray-50 border-none font-bold focus:ring-2 focus:ring-[#FE805A]/20 transition-all"
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                className="text-xs font-black uppercase tracking-widest text-gray-400"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                End Date
              </Label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="pl-12 py-6 rounded-2xl bg-gray-50 border-none font-bold focus:ring-2 focus:ring-[#FE805A]/20 transition-all"
                  min={startDate || new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              className="text-xs font-black uppercase tracking-widest text-gray-400"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Contact Info
            </Label>
            <div className="space-y-3">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Full Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="pl-12 py-6 rounded-2xl bg-gray-50 border-none font-bold focus:ring-2 focus:ring-[#FE805A]/20 transition-all"
                  required
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="pl-12 py-6 rounded-2xl bg-gray-50 border-none font-bold focus:ring-2 focus:ring-[#FE805A]/20 transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-2">
              <span
                className="text-sm font-bold text-gray-500 uppercase tracking-widest"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Price/Day
              </span>
              <span className="font-black text-gray-900">
                ₹{vehicle.pricePerDay?.toLocaleString()}{" "}
                <span className="text-xs text-gray-400">
                  x {calculateDays()} days
                </span>
              </span>
            </div>
            <div className="border-t border-gray-200/50 my-4"></div>
            <div className="flex justify-between items-center">
              <span
                className="text-lg font-black text-gray-900"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Total Booking Cost
              </span>
              <span className="text-2xl font-black text-[#FE6B47]">
                ₹{totalAmount.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-2xl py-6 h-auto font-black border-gray-200 text-gray-500 hover:bg-gray-50 transition-all"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePayment}
              disabled={loading}
              className="flex-[2] bg-gradient-to-r from-[#FE805A] to-[#FE6B47] hover:scale-[1.02] active:scale-95 text-white font-black rounded-2xl py-6 h-auto shadow-xl shadow-orange-100 transition-all gap-3 text-lg"
            >
              <CreditCard className="w-5 h-5" />
              {loading ? "Processing..." : "Secure Booking"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function FleetPage() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

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
      setLoading(false);
    }
  };

  const handleBook = ({ vehicle }) => {
    setSelectedVehicle(vehicle);
    setShowBookingModal(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Fleet vehicles={vehicles} loading={loading} onBookNow={handleBook} />

      {/* Booking Modal */}
      <FleetBookingModal
        open={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        vehicle={selectedVehicle}
        onSuccess={() => {
          setShowBookingModal(false);
          setSelectedVehicle(null);
        }}
      />
      <Footer />
    </div>
  );
}
