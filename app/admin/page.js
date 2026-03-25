"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Package,
  Car,
  Route,
  BookOpen,
  Settings,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Eye,
  ChevronRight,
  DollarSign,
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
  XCircle,
  Navigation,
  Menu,
  X,
  Save,
  RefreshCw,
  FileText,
} from "lucide-react";

// Auth check hook
function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/verify", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setIsAuthenticated(data.valid);
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
    router.push("/admin");
  };

  return { isAuthenticated, loading, logout, setIsAuthenticated };
}

// Login Component
function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (data.error) {
        toast.error(data.error);
        return;
      }

      localStorage.setItem("adminToken", data.token);
      toast.success("Login successful!");
      onLogin();
    } catch (error) {
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-paleBlue-700 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Navigation className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>
              Sign in to manage your travel business
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-4">
              Default: admin / admin123
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

// Sidebar Component
function Sidebar({ activeTab, setActiveTab, logout }) {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "bookings", label: "Bookings", icon: BookOpen },
    { id: "packages", label: "Packages", icon: Package },
    { id: "vehicles", label: "Fleet", icon: Car },
    { id: "routes", label: "Routes", icon: Route },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "blog", label: "Blog", icon: FileText },
  ];

  return (
    <aside
      className={`bg-gray-900 text-white transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      } min-h-screen flex flex-col`}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-800">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Navigation className="w-6 h-6 text-primary" />
            <span className="font-bold">Voyage Admin</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 hover:bg-gray-800 rounded"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 p-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
              activeTab === item.id
                ? "bg-primary text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="p-2 border-t border-gray-800">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-red-600/20 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

// Dashboard Tab
function DashboardTab() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch("/api/dashboard/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-200 h-32 rounded-lg" />
        ))}
      </div>
    );
  }

  const statCards = [
    {
      label: "Total Bookings",
      value: stats?.bookings?.total || 0,
      icon: BookOpen,
      color: "bg-paleBlue-500",
      subtext: `${stats?.bookings?.pending || 0} pending`,
    },
    {
      label: "Revenue",
      value: `₹${(stats?.revenue || 0).toLocaleString()}`,
      icon: DollarSign,
      color: "bg-green-500",
      subtext: "From confirmed bookings",
    },
    {
      label: "Active Routes",
      value: `${stats?.routes?.active || 0}/${stats?.routes?.total || 0}`,
      icon: Route,
      color: "bg-purple-500",
      subtext: "Routes enabled",
    },
    {
      label: "Fleet Status",
      value: `${stats?.vehicles?.active || 0}/${stats?.vehicles?.total || 0}`,
      icon: Car,
      color: "bg-orange-500",
      subtext: "Vehicles active",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button variant="outline" size="sm" onClick={fetchStats}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <p className="text-xs text-gray-400 mt-1">{stat.subtext}</p>
                  </div>
                  <div
                    className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Booking Stats */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Bookings by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-yellow-500" />
                  <span>Pending</span>
                </div>
                <Badge variant="outline">{stats?.bookings?.pending || 0}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Confirmed</span>
                </div>
                <Badge variant="outline">
                  {stats?.bookings?.confirmed || 0}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span>Cancelled</span>
                </div>
                <Badge variant="outline">
                  {stats?.bookings?.cancelled || 0}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Bookings by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-paleBlue-500" />
                  <span>Cab Bookings</span>
                </div>
                <Badge variant="outline">{stats?.bookings?.byCab || 0}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-purple-500" />
                  <span>Package Bookings</span>
                </div>
                <Badge variant="outline">
                  {stats?.bookings?.byPackage || 0}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-orange-500" />
                  <span>Fleet Bookings</span>
                </div>
                <Badge variant="outline">{stats?.bookings?.byFleet || 0}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Bookings Tab
function BookingsTab() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch("/api/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        toast.success(`Booking ${status}`);
        fetchBookings();
      }
    } catch (error) {
      toast.error("Failed to update booking");
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filterType !== "all" && booking.type !== filterType) return false;
    if (filterStatus !== "all" && booking.status !== filterStatus) return false;
    return true;
  });

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Bookings</h1>
        <div className="flex gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="cab">Cab</SelectItem>
              <SelectItem value="package">Package</SelectItem>
              <SelectItem value="fleet">Fleet</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : filteredBookings.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-gray-500"
                  >
                    No bookings found
                  </TableCell>
                </TableRow>
              ) : (
                filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{booking.customerName}</p>
                        <p className="text-sm text-gray-500">
                          {booking.customerPhone}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {booking.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {booking.type === "cab" && (
                        <div className="text-sm">
                          <p>
                            {booking.pickup} → {booking.drop}
                          </p>
                          <p className="text-gray-500">
                            ₹{booking.estimatedFare}
                          </p>
                        </div>
                      )}
                      {booking.type === "package" && (
                        <div className="text-sm">
                          <p>{booking.packageTitle}</p>
                          <p className="text-gray-500">₹{booking.totalPrice}</p>
                        </div>
                      )}
                      {booking.type === "fleet" && (
                        <div className="text-sm">
                          <p>{booking.vehicleName}</p>
                          <p className="text-gray-500">
                            ₹{booking.pricePerDay}/day
                          </p>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[booking.status]}>
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {booking.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600"
                              onClick={() =>
                                updateBookingStatus(booking.id, "confirmed")
                              }
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600"
                              onClick={() =>
                                updateBookingStatus(booking.id, "cancelled")
                              }
                            >
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// Packages Tab
function PackagesTab() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    images: "",
    itinerary: "",
    inclusions: "",
    exclusions: "",
    enabled: true,
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await fetch("/api/packages");
      const data = await res.json();
      setPackages(data);
    } catch (error) {
      console.error("Failed to fetch packages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    const packageData = {
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price) || 0,
      duration: formData.duration,
      images: formData.images.split("\n").filter(Boolean),
      itinerary: formData.itinerary.split("\n").filter(Boolean),
      inclusions: formData.inclusions.split("\n").filter(Boolean),
      exclusions: formData.exclusions.split("\n").filter(Boolean),
      enabled: formData.enabled,
    };

    try {
      const url = editingPackage
        ? `/api/packages/${editingPackage.id}`
        : "/api/packages";
      const method = editingPackage ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(packageData),
      });

      if (res.ok) {
        toast.success(editingPackage ? "Package updated!" : "Package created!");
        setShowModal(false);
        resetForm();
        fetchPackages();
      }
    } catch (error) {
      toast.error("Failed to save package");
    }
  };

  const handleDelete = async (packageId) => {
    if (!confirm("Are you sure you want to delete this package?")) return;
    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch(`/api/packages/${packageId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        toast.success("Package deleted!");
        fetchPackages();
      }
    } catch (error) {
      toast.error("Failed to delete package");
    }
  };

  const toggleEnabled = async (pkg) => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`/api/packages/${pkg.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ enabled: !pkg.enabled }),
      });

      if (res.ok) {
        toast.success(`Package ${!pkg.enabled ? "enabled" : "disabled"}`);
        fetchPackages();
      }
    } catch (error) {
      toast.error("Failed to update package");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      duration: "",
      images: "",
      itinerary: "",
      inclusions: "",
      exclusions: "",
      enabled: true,
    });
    setEditingPackage(null);
  };

  const openEditModal = (pkg) => {
    setEditingPackage(pkg);
    setFormData({
      title: pkg.title,
      description: pkg.description,
      price: pkg.price.toString(),
      duration: pkg.duration,
      images: pkg.images?.join("\n") || "",
      itinerary: pkg.itinerary?.join("\n") || "",
      inclusions: pkg.inclusions?.join("\n") || "",
      exclusions: pkg.exclusions?.join("\n") || "",
      enabled: pkg.enabled,
    });
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Travel Packages</h1>
        <Button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Package
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {packages.map((pkg) => (
          <Card key={pkg.id} className={!pkg.enabled ? "opacity-60" : ""}>
            <div className="h-40 overflow-hidden">
              <img
                src={pkg.images?.[0] || "https://via.placeholder.com/300"}
                alt={pkg.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold">{pkg.title}</h3>
                <Switch
                  checked={pkg.enabled}
                  onCheckedChange={() => toggleEnabled(pkg)}
                />
              </div>
              <p className="text-sm text-gray-500 mb-2">{pkg.duration}</p>
              <p className="text-lg font-bold text-primary mb-4">
                ₹{pkg.price?.toLocaleString()}
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openEditModal(pkg)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-600"
                  onClick={() => handleDelete(pkg.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPackage ? "Edit Package" : "Add Package"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>Duration</Label>
                <Input
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  placeholder="5 Days / 4 Nights"
                  required
                />
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={2}
              />
            </div>
            <div>
              <Label>Price (₹)</Label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label>Image URLs (one per line)</Label>
              <Textarea
                value={formData.images}
                onChange={(e) =>
                  setFormData({ ...formData, images: e.target.value })
                }
                rows={2}
                placeholder="https://example.com/image1.jpg"
              />
            </div>
            <div>
              <Label>Itinerary (one per line)</Label>
              <Textarea
                value={formData.itinerary}
                onChange={(e) =>
                  setFormData({ ...formData, itinerary: e.target.value })
                }
                rows={3}
                placeholder="Day 1: Arrival"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Inclusions (one per line)</Label>
                <Textarea
                  value={formData.inclusions}
                  onChange={(e) =>
                    setFormData({ ...formData, inclusions: e.target.value })
                  }
                  rows={3}
                />
              </div>
              <div>
                <Label>Exclusions (one per line)</Label>
                <Textarea
                  value={formData.exclusions}
                  onChange={(e) =>
                    setFormData({ ...formData, exclusions: e.target.value })
                  }
                  rows={3}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.enabled}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, enabled: checked })
                }
              />
              <Label>Enabled</Label>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Vehicles Tab
function VehiclesTab() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "sedan",
    seating: "",
    pricePerKm: "",
    pricePerDay: "",
    description: "",
    images: "",
    enabled: true,
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await fetch("/api/vehicles");
      const data = await res.json();
      setVehicles(data);
    } catch (error) {
      console.error("Failed to fetch vehicles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    const vehicleData = {
      name: formData.name,
      type: formData.type,
      seating: parseInt(formData.seating) || 4,
      pricePerKm: parseFloat(formData.pricePerKm) || 12,
      pricePerDay: parseFloat(formData.pricePerDay) || 2500,
      description: formData.description,
      images: formData.images.split("\n").filter(Boolean),
      enabled: formData.enabled,
    };

    try {
      const url = editingVehicle
        ? `/api/vehicles/${editingVehicle.id}`
        : "/api/vehicles";
      const method = editingVehicle ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(vehicleData),
      });

      if (res.ok) {
        toast.success(editingVehicle ? "Vehicle updated!" : "Vehicle added!");
        setShowModal(false);
        resetForm();
        fetchVehicles();
      }
    } catch (error) {
      toast.error("Failed to save vehicle");
    }
  };

  const handleDelete = async (vehicleId) => {
    if (!confirm("Are you sure you want to delete this vehicle?")) return;
    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch(`/api/vehicles/${vehicleId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        toast.success("Vehicle deleted!");
        fetchVehicles();
      }
    } catch (error) {
      toast.error("Failed to delete vehicle");
    }
  };

  const toggleEnabled = async (vehicle) => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`/api/vehicles/${vehicle.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ enabled: !vehicle.enabled }),
      });

      if (res.ok) {
        toast.success(`Vehicle ${!vehicle.enabled ? "enabled" : "disabled"}`);
        fetchVehicles();
      }
    } catch (error) {
      toast.error("Failed to update vehicle");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      type: "sedan",
      seating: "",
      pricePerKm: "",
      pricePerDay: "",
      description: "",
      images: "",
      enabled: true,
    });
    setEditingVehicle(null);
  };

  const openEditModal = (vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      name: vehicle.name,
      type: vehicle.type,
      seating: vehicle.seating.toString(),
      pricePerKm: vehicle.pricePerKm.toString(),
      pricePerDay: vehicle.pricePerDay.toString(),
      description: vehicle.description,
      images: vehicle.images?.join("\n") || "",
      enabled: vehicle.enabled,
    });
    setShowModal(true);
  };

  const vehicleTypeLabels = {
    sedan: "Sedan",
    suv: "SUV",
    tempo: "Tempo Traveller",
    bus: "Bus",
    luxury: "Luxury",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Fleet Vehicles</h1>
        <Button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Vehicle
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vehicle</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Seating</TableHead>
                <TableHead>Price/km</TableHead>
                <TableHead>Price/day</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles.map((vehicle) => (
                <TableRow
                  key={vehicle.id}
                  className={!vehicle.enabled ? "opacity-60" : ""}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          vehicle.images?.[0] ||
                          "https://via.placeholder.com/50"
                        }
                        alt={vehicle.name}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div>
                        <p className="font-medium">{vehicle.name}</p>
                        <p className="text-xs text-gray-500 line-clamp-1">
                          {vehicle.description}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {vehicleTypeLabels[vehicle.type] || vehicle.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{vehicle.seating} seats</TableCell>
                  <TableCell>₹{vehicle.pricePerKm}</TableCell>
                  <TableCell>
                    ₹{vehicle.pricePerDay?.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={vehicle.enabled}
                      onCheckedChange={() => toggleEnabled(vehicle)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditModal(vehicle)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600"
                        onClick={() => handleDelete(vehicle.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingVehicle ? "Edit Vehicle" : "Add Vehicle"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Vehicle Name</Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(v) => setFormData({ ...formData, type: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedan">Sedan</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="tempo">Tempo Traveller</SelectItem>
                    <SelectItem value="bus">Bus</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Seating Capacity</Label>
                <Input
                  type="number"
                  value={formData.seating}
                  onChange={(e) =>
                    setFormData({ ...formData, seating: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Price per km (₹)</Label>
                <Input
                  type="number"
                  value={formData.pricePerKm}
                  onChange={(e) =>
                    setFormData({ ...formData, pricePerKm: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>Price per day (₹)</Label>
                <Input
                  type="number"
                  value={formData.pricePerDay}
                  onChange={(e) =>
                    setFormData({ ...formData, pricePerDay: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={2}
              />
            </div>
            <div>
              <Label>Image URLs (one per line)</Label>
              <Textarea
                value={formData.images}
                onChange={(e) =>
                  setFormData({ ...formData, images: e.target.value })
                }
                rows={2}
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.enabled}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, enabled: checked })
                }
              />
              <Label>Enabled</Label>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Routes Tab
function RoutesTab() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingRoute, setEditingRoute] = useState(null);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    distance: "",
    baseFare: "",
    perKmRate: "",
    enabled: true,
  });

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const res = await fetch("/api/routes");
      const data = await res.json();
      setRoutes(data);
    } catch (error) {
      console.error("Failed to fetch routes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    const routeData = {
      from: formData.from,
      to: formData.to,
      distance: parseFloat(formData.distance) || 0,
      baseFare: parseFloat(formData.baseFare) || 100,
      perKmRate: parseFloat(formData.perKmRate) || 12,
      enabled: formData.enabled,
    };

    try {
      const url = editingRoute
        ? `/api/routes/${editingRoute.id}`
        : "/api/routes";
      const method = editingRoute ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(routeData),
      });

      if (res.ok) {
        toast.success(editingRoute ? "Route updated!" : "Route added!");
        setShowModal(false);
        resetForm();
        fetchRoutes();
      }
    } catch (error) {
      toast.error("Failed to save route");
    }
  };

  const handleDelete = async (routeId) => {
    if (!confirm("Are you sure you want to delete this route?")) return;
    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch(`/api/routes/${routeId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        toast.success("Route deleted!");
        fetchRoutes();
      }
    } catch (error) {
      toast.error("Failed to delete route");
    }
  };

  const toggleEnabled = async (route) => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`/api/routes/${route.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ enabled: !route.enabled }),
      });

      if (res.ok) {
        toast.success(`Route ${!route.enabled ? "enabled" : "disabled"}`);
        fetchRoutes();
      }
    } catch (error) {
      toast.error("Failed to update route");
    }
  };

  const resetForm = () => {
    setFormData({
      from: "",
      to: "",
      distance: "",
      baseFare: "",
      perKmRate: "",
      enabled: true,
    });
    setEditingRoute(null);
  };

  const openEditModal = (route) => {
    setEditingRoute(route);
    setFormData({
      from: route.from,
      to: route.to,
      distance: route.distance.toString(),
      baseFare: route.baseFare.toString(),
      perKmRate: route.perKmRate.toString(),
      enabled: route.enabled,
    });
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Route Management</h1>
        <Button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Route
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Route</TableHead>
                <TableHead>Distance</TableHead>
                <TableHead>Base Fare</TableHead>
                <TableHead>Per KM Rate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {routes.map((route) => (
                <TableRow
                  key={route.id}
                  className={!route.enabled ? "opacity-60" : ""}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{route.from}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{route.to}</span>
                    </div>
                  </TableCell>
                  <TableCell>{route.distance} km</TableCell>
                  <TableCell>₹{route.baseFare}</TableCell>
                  <TableCell>₹{route.perKmRate}/km</TableCell>
                  <TableCell>
                    <Switch
                      checked={route.enabled}
                      onCheckedChange={() => toggleEnabled(route)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditModal(route)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600"
                        onClick={() => handleDelete(route.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingRoute ? "Edit Route" : "Add Route"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>From (City)</Label>
                <Input
                  value={formData.from}
                  onChange={(e) =>
                    setFormData({ ...formData, from: e.target.value })
                  }
                  placeholder="Mumbai"
                  required
                />
              </div>
              <div>
                <Label>To (City)</Label>
                <Input
                  value={formData.to}
                  onChange={(e) =>
                    setFormData({ ...formData, to: e.target.value })
                  }
                  placeholder="Pune"
                  required
                />
              </div>
            </div>
            <div>
              <Label>Distance (km)</Label>
              <Input
                type="number"
                value={formData.distance}
                onChange={(e) =>
                  setFormData({ ...formData, distance: e.target.value })
                }
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Base Fare (₹)</Label>
                <Input
                  type="number"
                  value={formData.baseFare}
                  onChange={(e) =>
                    setFormData({ ...formData, baseFare: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>Per KM Rate (₹)</Label>
                <Input
                  type="number"
                  value={formData.perKmRate}
                  onChange={(e) =>
                    setFormData({ ...formData, perKmRate: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.enabled}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, enabled: checked })
                }
              />
              <Label>Enabled</Label>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Settings Tab
function SettingsTab() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    const token = localStorage.getItem("adminToken");
    setSaving(true);

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        toast.success("Settings saved!");
        fetchSettings();
      }
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const updateTripType = (type, enabled) => {
    setSettings({
      ...settings,
      tripTypes: {
        ...settings.tripTypes,
        [type]: { ...settings.tripTypes[type], enabled },
      },
    });
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/4" />
        <div className="h-32 bg-gray-200 rounded" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Settings</h1>
        <Button onClick={saveSettings} disabled={saving}>
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Pricing Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Default Pricing</CardTitle>
            <CardDescription>
              Set default rates for cab bookings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Base Fare (₹)</Label>
              <Input
                type="number"
                value={settings?.baseFare || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    baseFare: parseFloat(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <Label>Per KM Rate (₹)</Label>
              <Input
                type="number"
                value={settings?.perKmRate || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    perKmRate: parseFloat(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <Label>Surge Pricing Multiplier</Label>
              <Input
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={settings?.surgePricing || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    surgePricing: parseFloat(e.target.value),
                  })
                }
              />
              <p className="text-xs text-gray-500 mt-1">
                1.0 = Normal, 1.5 = 50% surge, 2.0 = 100% surge
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Trip Types */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Trip Types</CardTitle>
            <CardDescription>Enable or disable trip types</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Local</p>
                <p className="text-sm text-gray-500">Within city trips</p>
              </div>
              <Switch
                checked={settings?.tripTypes?.local?.enabled}
                onCheckedChange={(checked) => updateTripType("local", checked)}
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Outstation</p>
                <p className="text-sm text-gray-500">City to city trips</p>
              </div>
              <Switch
                checked={settings?.tripTypes?.outstation?.enabled}
                onCheckedChange={(checked) =>
                  updateTripType("outstation", checked)
                }
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Airport</p>
                <p className="text-sm text-gray-500">Airport transfers</p>
              </div>
              <Switch
                checked={settings?.tripTypes?.airport?.enabled}
                onCheckedChange={(checked) =>
                  updateTripType("airport", checked)
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Blog Tab
function BlogTab() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    category: "",
    image: "",
    tags: "",
    readTime: "",
    featured: false,
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    const blogData = {
      ...formData,
      tags: formData.tags.split(",").map((t) => t.trim()),
    };

    try {
      const url = editingBlog ? `/api/blogs/${editingBlog.id}` : "/api/blogs";
      const method = editingBlog ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blogData),
      });

      if (res.ok) {
        toast.success(editingBlog ? "Blog updated!" : "Blog created!");
        setShowModal(false);
        resetForm();
        fetchBlogs();
      } else {
        toast.error("Failed to save blog");
      }
    } catch (error) {
      toast.error("Failed to save blog");
    }
  };

  const handleDelete = async (blogId) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch(`/api/blogs/${blogId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        toast.success("Blog deleted!");
        fetchBlogs();
      }
    } catch (error) {
      toast.error("Failed to delete blog");
    }
  };

  const toggleFeatured = async (blog) => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`/api/blogs/${blog.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ featured: !blog.featured }),
      });

      if (res.ok) {
        toast.success(`Blog ${!blog.featured ? "featured" : "unfeatured"}`);
        fetchBlogs();
      }
    } catch (error) {
      toast.error("Failed to update blog");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      author: "",
      category: "",
      image: "",
      tags: "",
      readTime: "",
      featured: false,
    });
    setEditingBlog(null);
  };

  const openEditModal = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      category: blog.category,
      image: blog.image,
      tags: blog.tags?.join(", ") || "",
      readTime: blog.readTime,
      featured: blog.featured,
    });
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <Button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Post
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <Card key={blog.id}>
            <div className="h-40 overflow-hidden relative">
              <img
                src={blog.image || "https://via.placeholder.com/300"}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              {blog.featured && (
                <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded">
                  Featured
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold line-clamp-1">{blog.title}</h3>
              </div>
              <p className="text-xs text-gray-500 mb-2">
                {blog.category} • {blog.readTime}
              </p>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {blog.excerpt}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={blog.featured}
                    onCheckedChange={() => toggleFeatured(blog)}
                  />
                  <span className="text-xs text-gray-500">Feature</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEditModal(blog)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600"
                    onClick={() => handleDelete(blog.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingBlog ? "Edit Post" : "Add Post"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Category</Label>
                <Input
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  placeholder="E.g., Travel Tips"
                  required
                />
              </div>
              <div>
                <Label>Author</Label>
                <Input
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div>
              <Label>Excerpt</Label>
              <Textarea
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                rows={2}
                required
              />
            </div>
            <div>
              <Label>Content</Label>
              <Textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                rows={6}
                required
              />
            </div>
            <div>
              <Label>Image URL</Label>
              <Input
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                required
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Tags (comma separated)</Label>
                <Input
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  placeholder="luxury, travel, guide"
                />
              </div>
              <div>
                <Label>Read Time</Label>
                <Input
                  value={formData.readTime}
                  onChange={(e) =>
                    setFormData({ ...formData, readTime: e.target.value })
                  }
                  placeholder="5 min read"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.featured}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, featured: checked })
                }
              />
              <Label>Featured Post</Label>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Main Admin Component
export default function AdminPage() {
  const { isAuthenticated, loading, logout, setIsAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={() => setIsAuthenticated(true)} />;
  }

  const renderTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab />;
      case "bookings":
        return <BookingsTab />;
      case "packages":
        return <PackagesTab />;
      case "vehicles":
        return <VehiclesTab />;
      case "routes":
        return <RoutesTab />;
      case "settings":
        return <SettingsTab />;
      case "blog":
        return <BlogTab />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        logout={logout}
      />
      <main className="flex-1 p-6 overflow-auto">{renderTab()}</main>
    </div>
  );
}
