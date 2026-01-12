import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"
import { getStatusLabel, getStatusColor } from "@/lib/order-tracking"
import OrderTimeline from "./order-timeline"
import type { TrackedOrder } from "@/lib/order-tracking"

interface OrderDetailsModalProps {
  order: TrackedOrder | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function OrderDetailsModal({ order, open, onOpenChange }: OrderDetailsModalProps) {
  if (!order) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription>Track your delivery in real-time</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Header */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">{order.packageName}</h3>
              <Badge className={getStatusColor(order.status)}>{getStatusLabel(order.status)}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">Order #{order.id}</p>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Delivery Progress</span>
              <span className="text-sm text-muted-foreground">{order.progress}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: `${order.progress}%` }}
              />
            </div>
          </div>

          {/* Courier Info */}
          {order.status !== "pending" && (
            <Card className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Assigned Courier</p>
                  <p className="font-semibold text-foreground">{order.courierName}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">ETA</p>
                  <p className="font-semibold text-foreground">{order.eta}</p>
                </div>
              </div>
              {order.courierDistance > 0 && (
                <p className="mt-3 text-xs text-muted-foreground">{order.courierDistance.toFixed(1)} km away</p>
              )}
            </Card>
          )}

          {/* Location Info */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-secondary" />
              <div>
                <p className="text-xs text-muted-foreground">Pickup Location</p>
                <p className="text-sm font-medium text-foreground">{order.from}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Delivery Location</p>
                <p className="text-sm font-medium text-foreground">{order.to}</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <Card className="p-4">
            <h4 className="mb-4 font-semibold text-foreground">Tracking Timeline</h4>
            <OrderTimeline events={order.events} />
          </Card>

          {/* Timeline Info */}
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Created</span>
              <span>{order.createdAt.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Last Updated</span>
              <span>{order.updatedAt.toLocaleString()}</span>
            </div>
            {order.deliveredAt && (
              <div className="flex items-center justify-between">
                <span>Delivered</span>
                <span>{order.deliveredAt.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
