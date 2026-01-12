"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, DollarSign, Truck, CheckCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  createDeliveryRequest,
  generateMockCouriers,
  type CourierProfile,
  type DeliveryRequest,
} from "@/lib/courier-matching"
import CourierProfileCard from "./courier-profile-card"
import CourierStatsOverview from "./courier-stats-overview"
import DeliveryHistory from "./delivery-history"
import { calculatePerformanceScore, type CourierStats, type CourierDelivery } from "@/lib/courier-management"

interface CourierRequest extends DeliveryRequest {}

export default function CourierDashboard() {
  const [courierLocation] = useState<CourierProfile>(() => {
    const couriers = generateMockCouriers()
    return couriers[0] // Default to first courier
  })

  const courierProfile = {
    id: courierLocation.id,
    name: courierLocation.name,
    email: "alex.johnson@courier.app",
    phone: "+1 (555) 123-4567",
    rating: 4.8,
    completedDeliveries: courierLocation.completedDeliveries,
    joinedDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
    isActive: true,
    vehicleType: "bike" as const,
    documentVerified: true,
    backgroundCheckPassed: true,
    bankAccountVerified: true,
  }

  const courierStats: CourierStats = {
    totalDeliveries: courierLocation.completedDeliveries + 5,
    completedDeliveries: courierLocation.completedDeliveries,
    cancelledDeliveries: 5,
    averageRating: 4.8,
    totalEarnings: courierLocation.completedDeliveries * 12.5,
    acceptanceRate: 0.95,
    responseTime: 2,
  }

  const deliveryHistory: CourierDelivery[] = [
    {
      id: "del-1",
      orderId: "1",
      customerName: "Sarah Smith",
      from: "123 Main St",
      to: "456 Oak Ave",
      distance: 2.5,
      earnings: 9.99,
      rating: 5,
      completedAt: new Date(Date.now() - 2 * 3600000),
      status: "completed",
      feedback: "Fast delivery, very professional!",
    },
    {
      id: "del-2",
      orderId: "2",
      customerName: "Mike Johnson",
      from: "789 Pine Rd",
      to: "321 Elm St",
      distance: 3.2,
      earnings: 12.99,
      rating: 4,
      completedAt: new Date(Date.now() - 5 * 3600000),
      status: "completed",
      feedback: "Good service",
    },
    {
      id: "del-3",
      orderId: "3",
      customerName: "Emma Davis",
      from: "555 River Lane",
      to: "888 Mountain Dr",
      distance: 1.8,
      earnings: 7.99,
      rating: 5,
      completedAt: new Date(Date.now() - 24 * 3600000),
      status: "completed",
      feedback: "Excellent!",
    },
  ]

  const [availableRequests] = useState<CourierRequest[]>(() => {
    const mockAddressPairs = [
      { from: "123 Main St, Downtown", to: "456 Oak Ave, Midtown" },
      { from: "789 Pine Rd, Uptown", to: "321 Elm St, Downtown" },
      { from: "555 River Lane, Westside", to: "888 Mountain Dr, Eastside" },
    ]

    return mockAddressPairs.map((pair, index) =>
      createDeliveryRequest(
        String(index + 1),
        ["Sarah Smith", "Mike Johnson", "Emma Davis"][index],
        pair.from,
        pair.to,
        [9.99, 12.99, 7.99][index],
      ),
    )
  })

  const nearbyRequests = availableRequests.filter((request) => {
    const distance =
      Math.sqrt(
        Math.pow(request.fromLat - courierLocation.lat, 2) + Math.pow(request.fromLng - courierLocation.lng, 2),
      ) * 111 // Rough conversion to km
    return distance <= 5
  })

  const [acceptedDeliveries, setAcceptedDeliveries] = useState([
    {
      id: "101",
      packageName: "Electronics",
      from: "100 Tech St",
      to: "200 Future Ave",
      status: "in-transit" as const,
      progress: 65,
      customerName: "John Doe",
      earnings: 12.5,
    },
  ])

  const handleAcceptDelivery = (request: CourierRequest) => {
    const newDelivery = {
      id: request.id,
      packageName: "Package",
      from: request.fromAddress,
      to: request.toAddress,
      status: "accepted" as const,
      progress: 0,
      customerName: request.customerName,
      earnings: request.reward,
    }
    setAcceptedDeliveries([...acceptedDeliveries, newDelivery])
  }

  const performanceScore = calculatePerformanceScore(courierStats)

  const stats = [
    {
      label: "Active Deliveries",
      value: acceptedDeliveries.filter((d) => d.status === "in-transit" || d.status === "accepted").length,
      icon: Truck,
      color: "text-primary",
    },
    {
      label: "Completed Today",
      value: acceptedDeliveries.filter((d) => d.status === "completed").length,
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      label: "Total Earnings",
      value: "$" + acceptedDeliveries.reduce((sum, d) => sum + d.earnings, 0).toFixed(2),
      icon: DollarSign,
      color: "text-secondary",
    },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Deliveries</TabsTrigger>
          <TabsTrigger value="available">Available Nearby</TabsTrigger>
          <TabsTrigger value="profile">My Profile</TabsTrigger>
        </TabsList>

        {/* Active Deliveries Tab */}
        <TabsContent value="active" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
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

          <div>
            <h2 className="mb-4 text-xl font-bold text-foreground">Active Deliveries</h2>
            <div className="space-y-3">
              {acceptedDeliveries.length === 0 ? (
                <Card className="p-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    No active deliveries. Accept a request to get started!
                  </p>
                </Card>
              ) : (
                acceptedDeliveries.map((delivery) => (
                  <Card key={delivery.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{delivery.customerName}</p>
                        <p className="text-xs text-muted-foreground">{delivery.packageName}</p>
                        <div className="mt-2">
                          <div className="h-1.5 w-full rounded-full bg-muted">
                            <div
                              className="h-full rounded-full bg-primary transition-all duration-300"
                              style={{ width: `${delivery.progress}%` }}
                            />
                          </div>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">{delivery.progress}% complete</p>
                      </div>
                      <Badge className="bg-secondary text-secondary-foreground">${delivery.earnings.toFixed(2)}</Badge>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </TabsContent>

        {/* Available Nearby Tab */}
        <TabsContent value="available" className="space-y-6">
          <h2 className="text-xl font-bold text-foreground">Available Nearby</h2>
          <div className="space-y-3">
            {nearbyRequests.length === 0 ? (
              <Card className="p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  No deliveries nearby. Try moving to a different location or check back soon.
                </p>
              </Card>
            ) : (
              nearbyRequests.map((request) => (
                <Card key={request.id} className="overflow-hidden border border-border p-0">
                  <div className="p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{request.customerName}</h3>
                        <p className="text-sm text-muted-foreground">New delivery request</p>
                      </div>
                      <Badge className="bg-secondary text-secondary-foreground">${request.reward}</Badge>
                    </div>

                    <div className="mb-4 space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 text-secondary" />
                        <span>{request.fromAddress}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{request.toAddress}</span>
                      </div>
                    </div>

                    <div className="mb-4 flex gap-4 border-t border-border pt-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Distance</p>
                        <p className="font-semibold text-foreground">{request.distance} km</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Est. Time</p>
                        <p className="font-semibold text-foreground">{request.estimatedTime} min</p>
                      </div>
                    </div>

                    <Button
                      onClick={() => handleAcceptDelivery(request)}
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      Accept Delivery
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <CourierProfileCard profile={courierProfile} stats={courierStats} />
            </div>

            {/* Stats and History */}
            <div className="space-y-6 lg:col-span-2">
              <CourierStatsOverview stats={courierStats} />
              <DeliveryHistory deliveries={deliveryHistory} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
