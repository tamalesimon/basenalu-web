import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Truck } from "lucide-react"
import { getStatusLabel, getStatusColor } from "@/lib/order-tracking"
import type { OrderEvent } from "@/lib/order-tracking"

interface OrderTimelineProps {
  events: OrderEvent[]
}

export default function OrderTimeline({ events }: OrderTimelineProps) {
  const statusIcons: Record<string, typeof CheckCircle> = {
    pending: Clock,
    accepted: CheckCircle,
    "in-transit": Truck,
    delivered: CheckCircle,
    cancelled: Clock,
  }

  return (
    <div className="space-y-4">
      {events.length === 0 ? (
        <p className="text-sm text-muted-foreground">No tracking events yet</p>
      ) : (
        events.map((event, index) => {
          const Icon = statusIcons[event.status] || Clock
          const isLast = index === events.length - 1

          return (
            <div key={event.id} className="flex gap-4">
              {/* Timeline connector */}
              <div className="flex flex-col items-center">
                <Icon className="h-5 w-5 text-primary" />
                {!isLast && <div className="mt-2 h-8 w-0.5 bg-border" />}
              </div>

              {/* Event content */}
              <div className="pb-4 pt-1">
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(event.status)}>{getStatusLabel(event.status)}</Badge>
                  <span className="text-sm text-muted-foreground">{event.timestamp.toLocaleTimeString()}</span>
                </div>
                {event.notes && <p className="mt-1 text-sm text-foreground">{event.notes}</p>}
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}
