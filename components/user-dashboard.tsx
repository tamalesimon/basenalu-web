"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import RequestForm from "./request-form"
import ActiveOrders from "./active-orders"
import MapView from "./map-view"
import { MapPin, Clock, CheckCircle } from "lucide-react"
import { createDeliveryRequest } from "@/lib/courier-matching"
import { createOrderEvent, updateOrderStatus, updateCourierLocation, type TrackedOrder } from "@/lib/order-tracking"

export default function UserDashboard() {
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [viewMode, setViewMode] = useState<"list" | "map">("list")
  const [selectedOrderForMap, setSelectedOrderForMap] = useState<TrackedOrder | null>(null)

  const [orders, setOrders] = useState<TrackedOrder[]>([
    {
      id: "1",
      packageName: "Document Bundle",
      from: "123 Main St, Downtown",
      to: "456 Oak Ave, Midtown",
      status: "in-transit",
      courierName: "Alex Johnson",
      courierDistance: 2.3,
      eta: "15 mins",
      createdAt: new Date(Date.now() - 5 * 60000),
      updatedAt: new Date(Date.now() - 2 * 60000),
      progress: 65,
      events: [
        {
          id: "evt-1",
          timestamp: new Date(Date.now() - 5 * 60000),
          status: "pending",
          notes: "Order created",
        },
        {
          id: "evt-2",
          timestamp: new Date(Date.now() - 3 * 60000),
          status: "accepted",
          notes: "Courier Alex Johnson accepted the delivery",
        },
        {
          id: "evt-3",
          timestamp: new Date(Date.now() - 2 * 60000),
          status: "in-transit",
          notes: "Courier picked up package and heading to destination",
        },
      ],
    },
    {
      id: "2",
      packageName: "Electronic Device",
      from: "789 Pine Rd, Uptown",
      to: "321 Elm St, Downtown",
      status: "delivered",
      courierName: "Maria Garcia",
      courierDistance: 0,
      eta: "Delivered",
      createdAt: new Date(Date.now() - 2 * 3600000),
      updatedAt: new Date(Date.now() - 1800000),
      deliveredAt: new Date(Date.now() - 1800000),
      progress: 100,
      events: [
        {
          id: "evt-4",
          timestamp: new Date(Date.now() - 2 * 3600000),
          status: "pending",
          notes: "Order created",
        },
        {
          id: "evt-5",
          timestamp: new Date(Date.now() - 1.5 * 3600000),
          status: "accepted",
          notes: "Courier Maria Garcia accepted",
        },
        {
          id: "evt-6",
          timestamp: new Date(Date.now() - 1 * 3600000),
          status: "in-transit",
          notes: "Package in transit",
        },
        {
          id: "evt-7",
          timestamp: new Date(Date.now() - 1800000),
          status: "delivered",
          notes: "Package delivered successfully",
        },
      ],
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prevOrders) =>
        prevOrders.map((order) => {
          if (order.status === "in-transit" && order.courierDistance > 0.2) {
            const newDistance = Math.max(0, order.courierDistance - 0.3)
            const newProgress = Math.min(99, order.progress + Math.random() * 5)
            const newEta = newDistance === 0 ? "Almost there!" : `${Math.ceil(newDistance * 5)} mins`

            return updateCourierLocation(order, newDistance, newEta, newProgress)
          }

          // Auto-complete orders when distance reaches 0
          if (order.status === "in-transit" && order.courierDistance <= 0.2) {
            return updateOrderStatus(order, "delivered", order.courierName, 0, "Delivered")
          }

          return order
        }),
      )
    }, 3000) // Update every 3 seconds

    return () => clearInterval(interval)
  }, [])

  const handleCreateRequest = (data: any) => {
    const deliveryDetails = createDeliveryRequest(String(Date.now()), "Finding courier...", data.from, data.to, 8.99)

    const newOrder: TrackedOrder = {
      id: deliveryDetails.id,
      packageName: data.packageName,
      from: data.from,
      to: data.to,
      status: "pending",
      courierName: "Finding courier...",
      courierDistance: 0,
      eta: "Finding...",
      createdAt: new Date(),
      updatedAt: new Date(),
      progress: 10,
      events: [createOrderEvent(deliveryDetails.id, "pending", "Order created successfully")],
    }

    setOrders([newOrder, ...orders])
    setShowRequestForm(false)
  }

  const stats = [
    {
      label: "Active Orders",
      value: orders.filter((o) => o.status === "in-transit" || o.status === "accepted").length,
      icon: Clock,
      color: "text-secondary",
    },
    {
      label: "Delivered",
      value: orders.filter((o) => o.status === "delivered").length,
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      label: "Total Spent",
      value: "$" + (orders.length * 8.99).toFixed(2),
      icon: MapPin,
      color: "text-primary",
    },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Stats */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="mt-2 text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </Card>
          )
        })}
      </div>

      <div className="mb-6 flex gap-3">
        <Button
          onClick={() => setViewMode("list")}
          variant={viewMode === "list" ? "default" : "outline"}
          className={viewMode === "list" ? "bg-primary hover:bg-primary/90" : ""}
        >
          List View
        </Button>
        <Button
          onClick={() => setViewMode("map")}
          variant={viewMode === "map" ? "default" : "outline"}
          className={viewMode === "map" ? "bg-primary hover:bg-primary/90" : ""}
        >
          Map View
        </Button>
      </div>

      {/* Map View */}
      {viewMode === "map" && (
        <div className="mb-8">
          <MapView
            orders={orders}
            selectedOrder={selectedOrderForMap}
            onSelectOrder={(order) => {
              setSelectedOrderForMap(order)
            }}
          />
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Request Section */}
          <div className="lg:col-span-1">
            {!showRequestForm ? (
              <Card className="p-6">
                <h2 className="mb-4 text-xl font-bold text-foreground">Request a Courier</h2>
                <p className="mb-6 text-sm text-muted-foreground">
                  Find a courier near you and get your package delivered quickly and safely.
                </p>
                <Button onClick={() => setShowRequestForm(true)} className="w-full bg-secondary hover:bg-secondary/90">
                  Create Request
                </Button>
              </Card>
            ) : (
              <Card className="p-6">
                <h2 className="mb-4 text-xl font-bold text-foreground">New Delivery Request</h2>
                <RequestForm onSubmit={handleCreateRequest} />
                <Button variant="outline" onClick={() => setShowRequestForm(false)} className="mt-4 w-full">
                  Cancel
                </Button>
              </Card>
            )}
          </div>

          {/* Orders List */}
          <div className="lg:col-span-2">
            <ActiveOrders orders={orders} />
          </div>
        </div>
      )}
    </div>
  )
}
