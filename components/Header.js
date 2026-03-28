"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Navigation, Menu, X } from "lucide-react";
import Link from "next/link";
export default function Header() {
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
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Fleet", href: "/fleet" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Destinations", href: "/destinations" },
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

          <div>
            <div className="flex items-center mb-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="flex items-center"
                data-testid="logo-container"
              >
                <Link href="/" className="mt-3 flex items-center">
                  <img
                    src="/asset/logo website.png"
                    alt="Excursion Travel"
                    className="h-8 w-auto md:h-10 transition-all duration-300"
                  />
                </Link>
              </motion.div>
            </div>
          </div>

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
                <Link
                  href="/auth"
                  className="text-gray-600 hover:text-paleBlue transition-colors font-medium"
                >
                  Login
                </Link>
                <Link href="/auth">
                  <Button className="bg-paleBlue" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
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

            <div className="flex flex-col gap-6 mt-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-semibold text-gray-800 hover:text-[#0056D2] transition-colors"
                  style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-6 border-t border-gray-100 flex flex-col gap-4">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-2xl">
                      <div className="w-10 h-10 bg-[#0056D2]/10 rounded-full flex items-center justify-center text-[#0056D2] font-bold">
                        {user.name?.[0] || "U"}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">
                          {user.name || "User"}
                        </p>
                        <a
                          href="/my-bookings"
                          className="text-xs text-[#0056D2] font-semibold"
                        >
                          View Bookings
                        </a>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full py-6 rounded-2xl border-red-100 text-red-500 hover:bg-red-50"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth"
                      className="w-full py-4 text-center font-bold text-gray-700 hover:text-[#0056D2]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link href="/auth" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full py-6 bg-gradient-to-r from-[#0056D2] to-[#43E0F8] text-white font-bold rounded-2xl shadow-lg">
                        Sign Up Free
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
