"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import OrderDetailsModal from "./order-details-modal"
import { getStatusColor, getStatusLabel } from "@/lib/order-tracking"
import type { TrackedOrder } from "@/lib/order-tracking"

interface ActiveOrdersProps {
  orders: TrackedOrder[]
}

export default function ActiveOrders({ orders }: ActiveOrdersProps) {
  const [selectedOrder, setSelectedOrder] = useState<TrackedOrder | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handleViewDetails = (order: TrackedOrder) => {
    setSelectedOrder(order)
    setModalOpen(true)
  }

  return (
    <>
      <div>
        <h2 className="mb-4 text-2xl font-bold text-foreground">Your Orders</h2>
        <div className="space-y-4">
          {orders.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No orders yet. Create one to get started!</p>
            </Card>
          ) : (
            orders.map((order) => (
              <Card key={order.id} className="overflow-hidden border border-border p-0">
                <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-foreground">{order.packageName}</h3>
                      <Badge className={getStatusColor(order.status)}>{getStatusLabel(order.status)}</Badge>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-secondary" />
                        <span>From: {order.from}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>To: {order.to}</span>
                      </div>
                    </div>

                    {order.status !== "pending" && (
                      <>
                        <div className="mt-4 rounded-lg bg-muted/50 p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-foreground" />
                              <span className="font-medium text-foreground">{order.courierName}</span>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-muted-foreground">ETA</p>
                              <p className="font-semibold text-foreground">{order.eta}</p>
                            </div>
                          </div>
                          {order.courierDistance > 0 && (
                            <p className="mt-2 text-xs text-muted-foreground">
                              {order.courierDistance.toFixed(1)} km away
                            </p>
                          )}
                        </div>

                        <div className="mt-3">
                          <div className="h-1.5 w-full rounded-full bg-muted">
                            <div
                              className="h-full rounded-full bg-primary transition-all duration-300"
                              style={{ width: `${order.progress}%` }}
                            />
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">{order.progress}% complete</p>
                        </div>
                      </>
                    )}
                  </div>

                  <Button variant="outline" onClick={() => handleViewDetails(order)} className="mt-4 md:mt-0">
                    View Details
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      <OrderDetailsModal order={selectedOrder} open={modalOpen} onOpenChange={setModalOpen} />
    </>
  )
}
