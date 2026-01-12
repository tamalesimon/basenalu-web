"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Users,
  Package,
  TrendingUp,
  MapPin,
  Plus,
  Search,
  Filter,
  Download,
  Clock,
  CheckCircle2,
  HelpCircle as MapCircle,
} from "lucide-react"

interface Courier {
  id: string
  name: string
  phone: string
  vehicleType: string
  status: "online" | "offline" | "busy"
  completedDeliveries: number
  rating: number
  currentLoad: number
  earnings: number
}

interface Shipment {
  id: string
  trackingNumber: string
  courier: string
  status: "pending" | "in_transit" | "delivered" | "failed"
  pickupLocation: string
  deliveryLocation: string
  createdAt: string
  eta: string
  items: number
}

export default function CompanyDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "couriers" | "shipments" | "analytics">("overview")
  const [couriers, setCouriers] = useState<Courier[]>([
    {
      id: "1",
      name: "Rajesh Kumar",
      phone: "98765 43210",
      vehicleType: "Motorcycle",
      status: "online",
      completedDeliveries: 127,
      rating: 4.8,
      currentLoad: 3,
      earnings: 24500,
    },
    {
      id: "2",
      name: "Priya Sharma",
      phone: "98765 43211",
      vehicleType: "Car",
      status: "busy",
      completedDeliveries: 89,
      rating: 4.6,
      currentLoad: 5,
      earnings: 18200,
    },
    {
      id: "3",
      name: "Amit Patel",
      phone: "98765 43212",
      vehicleType: "Van",
      status: "offline",
      completedDeliveries: 156,
      rating: 4.9,
      currentLoad: 0,
      earnings: 31500,
    },
  ])

  const [shipments, setShipments] = useState<Shipment[]>([
    {
      id: "SHP001",
      trackingNumber: "TRK-2024-001",
      courier: "Rajesh Kumar",
      status: "delivered",
      pickupLocation: "New York, NY 10001",
      deliveryLocation: "Newark, NJ 07101",
      createdAt: "2024-11-20",
      eta: "Delivered",
      items: 3,
    },
    {
      id: "SHP002",
      trackingNumber: "TRK-2024-002",
      courier: "Priya Sharma",
      status: "in_transit",
      pickupLocation: "Brooklyn, NY 11201",
      deliveryLocation: "Queens, NY 11375",
      createdAt: "2024-11-23",
      eta: "15 mins",
      items: 2,
    },
    {
      id: "SHP003",
      trackingNumber: "TRK-2024-003",
      courier: "Amit Patel",
      status: "pending",
      pickupLocation: "Manhattan, NY 10007",
      deliveryLocation: "Bronx, NY 10451",
      createdAt: "2024-11-23",
      eta: "2 hours",
      items: 5,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")

  const totalCouriers = couriers.length
  const activeCouriers = couriers.filter((c) => c.status === "online").length
  const totalShipments = shipments.length
  const deliveredShipments = shipments.filter((s) => s.status === "delivered").length
  const totalEarnings = couriers.reduce((sum, c) => sum + c.earnings, 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
      case "delivered":
        return "bg-green-100 text-green-800"
      case "busy":
      case "in_transit":
        return "bg-blue-100 text-blue-800"
      case "offline":
      case "pending":
        return "bg-gray-100 text-gray-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle2 className="h-4 w-4" />
      case "in_transit":
        return <MapCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Company Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your delivery operations</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active Couriers</p>
                <p className="text-3xl font-bold text-foreground">{activeCouriers}</p>
                <p className="text-xs text-green-600 mt-2">of {totalCouriers} total</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Today's Shipments</p>
                <p className="text-3xl font-bold text-foreground">{totalShipments}</p>
                <p className="text-xs text-green-600 mt-2">{deliveredShipments} delivered</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Package className="h-5 w-5 text-secondary" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Earnings</p>
                <p className="text-3xl font-bold text-foreground">₹{(totalEarnings / 1000).toFixed(1)}K</p>
                <p className="text-xs text-green-600 mt-2">this month</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-amber-500" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg Rating</p>
                <p className="text-3xl font-bold text-foreground">
                  {(couriers.reduce((sum, c) => sum + c.rating, 0) / couriers.length).toFixed(1)}
                </p>
                <p className="text-xs text-green-600 mt-2">from customers</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-yellow-500" />
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-border">
          {[
            { id: "overview", label: "Overview" },
            { id: "couriers", label: "Manage Couriers" },
            { id: "shipments", label: "Shipments" },
            { id: "analytics", label: "Analytics" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button className="w-full bg-primary hover:bg-primary/90 flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Assign New Delivery
                  </Button>
                  <Button className="w-full bg-secondary hover:bg-secondary/90 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Add Courier
                  </Button>
                  <Button variant="outline" className="w-full flex items-center gap-2 bg-transparent">
                    <Download className="h-4 w-4" />
                    Export Report
                  </Button>
                </div>
              </Card>

              {/* Recent Activity */}
              <Card className="p-6 mt-6">
                <h3 className="font-semibold text-foreground mb-4">Recent Activity</h3>
                <div className="space-y-3 text-sm">
                  <div className="pb-3 border-b border-border">
                    <p className="text-foreground font-medium">Delivery Completed</p>
                    <p className="text-muted-foreground text-xs">TRK-2024-001 • 2 hours ago</p>
                  </div>
                  <div className="pb-3 border-b border-border">
                    <p className="text-foreground font-medium">Courier Online</p>
                    <p className="text-muted-foreground text-xs">Rajesh Kumar • 1 hour ago</p>
                  </div>
                  <div>
                    <p className="text-foreground font-medium">New Shipment Created</p>
                    <p className="text-muted-foreground text-xs">TRK-2024-003 • 30 mins ago</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Active Couriers */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-foreground">Active Couriers</h3>
                  <button className="text-primary text-sm font-medium hover:underline">View All</button>
                </div>

                <div className="space-y-4">
                  {couriers.map((courier) => (
                    <div
                      key={courier.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
                            {courier.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{courier.name}</p>
                            <p className="text-xs text-muted-foreground">{courier.vehicleType}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-right">
                          <p className="font-medium text-foreground">{courier.completedDeliveries}</p>
                          <p className="text-xs text-muted-foreground">completed</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-foreground">{courier.rating}</p>
                          <p className="text-xs text-muted-foreground">rating</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(courier.status)}`}
                        >
                          {courier.status === "online" ? "Online" : courier.status === "busy" ? "Busy" : "Offline"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Couriers Tab */}
        {activeTab === "couriers" && (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search courier..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Courier
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Name</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Vehicle</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Completed</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Rating</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Load</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Earnings</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {couriers.map((courier) => (
                      <tr key={courier.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-foreground">{courier.name}</p>
                            <p className="text-xs text-muted-foreground">{courier.phone}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-foreground">{courier.vehicleType}</td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(courier.status)}`}
                          >
                            {courier.status.charAt(0).toUpperCase() + courier.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-foreground">{courier.completedDeliveries}</td>
                        <td className="py-4 px-4 text-foreground">{courier.rating}</td>
                        <td className="py-4 px-4 text-foreground">{courier.currentLoad} items</td>
                        <td className="py-4 px-4 text-foreground">₹{courier.earnings}</td>
                        <td className="py-4 px-4">
                          <button className="text-primary hover:text-primary/80 text-sm font-medium">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Shipments Tab */}
        {activeTab === "shipments" && (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search by tracking number..." className="pl-10" />
                </div>
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </div>

              <div className="space-y-3">
                {shipments.map((shipment) => (
                  <div
                    key={shipment.id}
                    className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono text-sm font-semibold text-foreground">
                            {shipment.trackingNumber}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${getStatusColor(shipment.status)}`}
                          >
                            {getStatusIcon(shipment.status)}
                            {shipment.status === "delivered"
                              ? "Delivered"
                              : shipment.status === "in_transit"
                                ? "In Transit"
                                : shipment.status === "pending"
                                  ? "Pending"
                                  : "Failed"}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground text-xs mb-1">From</p>
                            <div className="flex items-center gap-2 text-foreground">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              {shipment.pickupLocation}
                            </div>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-xs mb-1">To</p>
                            <div className="flex items-center gap-2 text-foreground">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              {shipment.deliveryLocation}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-sm text-foreground font-medium">{shipment.courier}</p>
                        <p className="text-xs text-muted-foreground">{shipment.items} items</p>
                        <p className="text-xs text-green-600 font-medium mt-2">{shipment.eta}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Delivery Performance</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">On-Time Deliveries</span>
                    <span className="text-sm font-semibold text-foreground">94%</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "94%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Successful Deliveries</span>
                    <span className="text-sm font-semibold text-foreground">98%</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "98%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Customer Satisfaction</span>
                    <span className="text-sm font-semibold text-foreground">92%</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: "92%" }} />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Monthly Overview</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-foreground">Total Deliveries</span>
                  <span className="text-lg font-semibold text-primary">342</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-foreground">Avg Delivery Time</span>
                  <span className="text-lg font-semibold text-secondary">28 mins</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-foreground">Revenue Generated</span>
                  <span className="text-lg font-semibold text-amber-500">₹45,200</span>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
