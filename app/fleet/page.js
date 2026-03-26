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
  MapPin,
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
  const [customerAddress, setCustomerAddress] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
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
    if (!customerName || !customerPhone || !pickupLocation || !dropLocation || !startDate) {
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
        name: "VOYAGE TRAVEL",
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
                  customerAddress,
                  pickupLocation,
                  dropLocation,
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
              window.location.reload();
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
      <DialogContent className="sm:max-w-lg rounded-[2rem] border-none shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-0 overflow-hidden bg-white max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-br from-[#0056D2] to-[#A0006D] p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2
              className="text-2xl font-black mb-1"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Secure Your Ride
            </h2>
            <div className="flex items-center gap-3 opacity-90 text-sm font-semibold">
              <span className="flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5" /> {vehicle.name}
              </span>
              <span className="w-1 h-1 bg-white/30 rounded-full"></span>
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" /> {vehicle.seating} Seats
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Journey Starts</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0056D2]" />
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="pl-10 py-5 rounded-xl bg-gray-50 border-none font-bold text-gray-900 focus:ring-2 focus:ring-[#0056D2]/10 transition-all text-sm"
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Journey Ends</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0056D2]" />
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="pl-10 py-5 rounded-xl bg-gray-50 border-none font-bold text-gray-900 focus:ring-2 focus:ring-[#0056D2]/10 transition-all text-sm"
                  min={startDate || new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Location Details</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                <Input
                  placeholder="Pickup Location"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="pl-10 py-5 rounded-xl bg-gray-50 border-none font-bold text-gray-900 focus:ring-2 focus:ring-[#0056D2]/10 transition-all text-sm"
                  required
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
                <Input
                  placeholder="Drop Location"
                  value={dropLocation}
                  onChange={(e) => setDropLocation(e.target.value)}
                  className="pl-10 py-5 rounded-xl bg-gray-50 border-none font-bold text-gray-900 focus:ring-2 focus:ring-[#0056D2]/10 transition-all text-sm"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Contact Details</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0056D2]" />
                <Input
                  placeholder="Full Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="pl-10 py-5 rounded-xl bg-gray-50 border-none font-bold text-gray-900 focus:ring-2 focus:ring-[#0056D2]/10 transition-all text-sm"
                  required
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0056D2]" />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="pl-10 py-5 rounded-xl bg-gray-50 border-none font-bold text-gray-900 focus:ring-2 focus:ring-[#0056D2]/10 transition-all text-sm"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Daily Rate</span>
              <span className="font-bold text-gray-900 ml-auto">₹{vehicle.pricePerDay?.toLocaleString()} x {calculateDays()} {calculateDays() === 1 ? 'Day' : 'Days'}</span>
            </div>
            <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
              <span className="text-sm font-black text-gray-900 uppercase tracking-tight">Total Amount Due</span>
              <span className="text-xl font-black text-[#0056D2]">₹{totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-xl py-5 h-auto font-black border-gray-200 text-gray-500 hover:bg-gray-50 transition-all"
            >
              Back
            </Button>
            <Button
              onClick={handlePayment}
              disabled={loading}
              className="flex-[2] bg-[#0056D2] hover:bg-[#003A8C] text-white font-black rounded-xl py-5 h-auto shadow-lg shadow-[#0056D2]/10 transition-all gap-2 text-base"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  Confirm & Pay
                </>
              )}
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
