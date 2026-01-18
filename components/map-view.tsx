"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Truck, CheckCircle, Clock } from "lucide-react"
import type { TrackedOrder } from "@/lib/order-tracking"
import { getStatusColor, getStatusLabel } from "@/lib/order-tracking"

interface MapViewProps {
  orders: TrackedOrder[]
  onSelectOrder?: (order: TrackedOrder) => void
  selectedOrder?: TrackedOrder | null
}

declare global {
  interface Window {
    L: any
  }
}

export default function MapView({ orders, onSelectOrder, selectedOrder }: MapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const [routesLoaded, setRoutesLoaded] = useState(false)

  useEffect(() => {
    // Load Leaflet library dynamically
    if (!(window as any).L) {
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
      document.head.appendChild(link)

      const script = document.createElement("script")
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"
      script.onload = () => {
        initializeMap()
      }
      document.body.appendChild(script)
    } else {
      initializeMap()
    }

    function initializeMap() {
      if (!mapContainerRef.current) return

      // Initialize map centered on New York
      const map = window.L.map(mapContainerRef.current).setView([40.7128, -74.006], 12)

      // Add tile layer
      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map)

      mapRef.current = map

      // Add markers and routes
      addOrderMarkers(map)
    }
  }, [])

  useEffect(() => {
    if (mapRef.current) {
      addOrderMarkers(mapRef.current)
    }
  }, [orders, selectedOrder])

  async function fetchRoute(fromLat: number, fromLng: number, toLat: number, toLng: number) {
    try {
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${fromLng},${fromLat};${toLng},${toLat}?overview=full&geometries=geojson`,
      )
      const data = await response.json()

      if (data.routes && data.routes.length > 0) {
        return data.routes[0].geometry.coordinates.map((coord: number[]) => [coord[1], coord[0]])
      }
    } catch (error) {
      console.log("[v0] Route fetch error, falling back to straight line")
    }
    return null
  }

  async function addOrderMarkers(map: any) {
    // Clear existing markers and polylines
    map.eachLayer((layer: any) => {
      if (layer instanceof window.L.Marker || layer instanceof window.L.Polyline) {
        map.removeLayer(layer)
      }
    })

    for (const order of orders) {
      const { fromLat, fromLng, toLat, toLng } = getOrderCoordinates(order)

      // Pickup marker
      const pickupIcon = window.L.divIcon({
        html: `
          <div class="flex items-center justify-center w-8 h-8 rounded-full ${
            selectedOrder?.id === order.id ? "bg-secondary border-2 border-white shadow-lg" : "bg-secondary/70"
          } text-white">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            </svg>
          </div>
        `,
        className: "pickup-marker",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      })

      const pickupMarker = window.L.marker([fromLat, fromLng], { icon: pickupIcon })
      pickupMarker.bindPopup(`
        <div class="p-2">
          <p class="font-semibold">${order.packageName}</p>
          <p class="text-xs text-gray-600">Pickup: ${order.from}</p>
          <p class="text-xs mt-1 font-medium">${order.status}</p>
        </div>
      `)
      pickupMarker.on("click", () => onSelectOrder?.(order))
      pickupMarker.addTo(map)

      // Delivery marker
      const deliveryIcon = window.L.divIcon({
        html: `
          <div class="flex items-center justify-center w-8 h-8 rounded-full ${
            selectedOrder?.id === order.id ? "bg-primary border-2 border-white shadow-lg" : "bg-primary/70"
          } text-white">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        `,
        className: "delivery-marker",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      })

      const deliveryMarker = window.L.marker([toLat, toLng], { icon: deliveryIcon })
      deliveryMarker.bindPopup(`
        <div class="p-2">
          <p class="font-semibold">${order.packageName}</p>
          <p class="text-xs text-gray-600">Delivery: ${order.to}</p>
          <p class="text-xs mt-1 font-medium">${order.status}</p>
        </div>
      `)
      deliveryMarker.on("click", () => onSelectOrder?.(order))
      deliveryMarker.addTo(map)

      if (order.status === "delivered") {
        const routeCoordinates = await fetchRoute(fromLat, fromLng, toLat, toLng)

        if (routeCoordinates) {
          // Road-based route
          const line = window.L.polyline(routeCoordinates, {
            color: "#10b981",
            weight: 3,
            opacity: 0.8,
            lineCap: "round",
            lineJoin: "round",
          })
          line.addTo(map)
        } else {
          // Fallback to straight line if route fetch fails
          const line = window.L.polyline(
            [
              [fromLat, fromLng],
              [toLat, toLng],
            ],
            {
              color: "#10b981",
              weight: 2,
              opacity: 0.7,
            },
          )
          line.addTo(map)
        }
      } else {
        // Ongoing orders - dashed straight line
        const line = window.L.polyline(
          [
            [fromLat, fromLng],
            [toLat, toLng],
          ],
          {
            color: "#2563eb",
            weight: 2,
            opacity: 0.7,
            dashArray: "5, 5",
          },
        )
        line.addTo(map)
      }
    }

    setRoutesLoaded(true)
  }

  function getOrderCoordinates(order: TrackedOrder) {
    // Hash-based pseudo-random coordinates for consistent results
    const fromHash = order.from.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const toHash = order.to.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)

    const fromSeed = fromHash % 1000
    const toSeed = toHash % 1000

    const baseLat = 40.7128
    const baseLng = -74.006

    const fromLatOffset = (fromSeed % 100) / 10000
    const fromLngOffset = ((fromSeed * 7) % 100) / 10000
    const toLatOffset = (toSeed % 100) / 10000
    const toLngOffset = ((toSeed * 7) % 100) / 10000

    return {
      fromLat: baseLat + (fromSeed % 2 === 0 ? fromLatOffset : -fromLatOffset),
      fromLng: baseLng + (fromSeed % 3 === 0 ? fromLngOffset : -fromLngOffset),
      toLat: baseLat + (toSeed % 2 === 0 ? toLatOffset : -toLatOffset),
      toLng: baseLng + (toSeed % 3 === 0 ? toLngOffset : -toLngOffset),
    }
  }

  const ongoingOrders = orders.filter((o) => o.status === "in-transit" || o.status === "accepted")
  const deliveredOrders = orders.filter((o) => o.status === "delivered")

  return (
    <div className="space-y-6">
      {/* Map Container */}
      <Card className="overflow-hidden">
        <div ref={mapContainerRef} className="h-[600px] w-full bg-muted" />
      </Card>

      {/* Orders Legend and Filter */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Legend */}
        <Card className="p-4">
          <h3 className="mb-4 font-semibold text-foreground">Legend</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-secondary" />
              <span className="text-muted-foreground">Pickup Location</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">Delivery Location</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1 flex-1 border-t-2 border-dashed border-blue-500" />
              <span className="text-muted-foreground">Ongoing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1 flex-1 border-t-2 border-green-500" />
              <span className="text-muted-foreground">Delivered</span>
            </div>
          </div>
        </Card>

        {/* Orders Summary */}
        <Card className="p-4">
          <h3 className="mb-4 font-semibold text-foreground">Summary</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="h-4 w-4" />
                <span>Ongoing</span>
              </div>
              <Badge className="bg-blue-100 text-blue-800">{ongoingOrders.length}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4" />
                <span>Delivered</span>
              </div>
              <Badge className="bg-green-100 text-green-800">{deliveredOrders.length}</Badge>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-3">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <MapPin className="h-4 w-4" />
                <span>Total Orders</span>
              </div>
              <span className="font-semibold">{orders.length}</span>
            </div>
          </div>
        </Card>

        {/* Selected Order Details */}
        {selectedOrder && (
          <Card className="p-4">
            <h3 className="mb-4 font-semibold text-foreground">Order Details</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Package</p>
                <p className="font-semibold text-foreground">{selectedOrder.packageName}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <Badge className={getStatusColor(selectedOrder.status)}>{getStatusLabel(selectedOrder.status)}</Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">From</p>
                  <p className="text-foreground">{selectedOrder.from}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">To</p>
                  <p className="text-foreground">{selectedOrder.to}</p>
                </div>
              </div>
              {selectedOrder.status !== "pending" && (
                <div className="border-t border-border pt-3">
                  <p className="text-xs text-muted-foreground">Courier</p>
                  <p className="font-semibold text-foreground">{selectedOrder.courierName}</p>
                  <p className="text-xs text-muted-foreground">ETA: {selectedOrder.eta}</p>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {/* Ongoing Orders */}
        {ongoingOrders.length > 0 && (
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
              <Truck className="h-5 w-5 text-blue-500" />
              Ongoing Deliveries ({ongoingOrders.length})
            </h3>
            <div className="grid gap-3">
              {ongoingOrders.map((order) => (
                <Card
                  key={order.id}
                  className={`cursor-pointer border p-4 transition-all ${
                    selectedOrder?.id === order.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
                  }`}
                  onClick={() => onSelectOrder?.(order)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{order.packageName}</p>
                      <p className="text-xs text-muted-foreground mt-1">{order.from}</p>
                      <p className="text-xs text-muted-foreground">{order.to}</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">{getStatusLabel(order.status)}</Badge>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{order.courierName}</span>
                    <span className="font-medium text-foreground">{order.eta}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Delivered Orders */}
        {deliveredOrders.length > 0 && (
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Delivered ({deliveredOrders.length})
            </h3>
            <div className="grid gap-3">
              {deliveredOrders.map((order) => (
                <Card
                  key={order.id}
                  className={`cursor-pointer border p-4 transition-all ${
                    selectedOrder?.id === order.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
                  }`}
                  onClick={() => onSelectOrder?.(order)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{order.packageName}</p>
                      <p className="text-xs text-muted-foreground mt-1">{order.from}</p>
                      <p className="text-xs text-muted-foreground">{order.to}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">{getStatusLabel(order.status)}</Badge>
                  </div>
                  <div className="mt-3">
                    <span className="text-xs text-muted-foreground">
                      Delivered {order.deliveredAt?.toLocaleDateString()}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {orders.length === 0 && (
          <Card className="p-8 text-center">
            <Clock className="mx-auto h-12 w-12 text-muted-foreground/40" />
            <p className="mt-4 text-muted-foreground">No orders to display on map yet.</p>
          </Card>
        )}
      </div>
    </div>
  )
}
