import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, DollarSign } from "lucide-react"
import type { CourierDelivery } from "@/lib/courier-management"

interface DeliveryHistoryProps {
  deliveries: CourierDelivery[]
  limit?: number
}

export default function DeliveryHistory({ deliveries, limit = 10 }: DeliveryHistoryProps) {
  const displayedDeliveries = deliveries.slice(0, limit)

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-foreground">Delivery History</h3>
      {displayedDeliveries.length === 0 ? (
        <Card className="p-6 text-center">
          <p className="text-sm text-muted-foreground">No deliveries yet</p>
        </Card>
      ) : (
        displayedDeliveries.map((delivery) => (
          <Card key={delivery.id} className="p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="font-semibold text-foreground">{delivery.customerName}</h4>
                  <Badge
                    className={
                      delivery.status === "completed" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }
                  >
                    {delivery.status === "completed" ? "Completed" : "Cancelled"}
                  </Badge>
                </div>

                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{delivery.distance.toFixed(1)} km</span>
                  </div>
                </div>

                {delivery.feedback && (
                  <p className="mt-2 text-sm italic text-muted-foreground">"{delivery.feedback}"</p>
                )}
              </div>

              <div className="flex gap-4 text-right sm:flex-col">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-foreground">{delivery.rating}</span>
                </div>
                <div className="flex items-center gap-1 font-semibold text-green-600">
                  <DollarSign className="h-4 w-4" />
                  <span>{delivery.earnings.toFixed(2)}</span>
                </div>
                <span className="text-xs text-muted-foreground">{delivery.completedAt.toLocaleDateString()}</span>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  )
}
