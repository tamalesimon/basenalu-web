export type OrderStatus = "pending" | "accepted" | "in-transit" | "delivered" | "cancelled"

export interface OrderEvent {
  id: string
  timestamp: Date
  status: OrderStatus
  location?: { lat: number; lng: number; address: string }
  notes?: string
}

export interface TrackedOrder {
  id: string
  packageName: string
  from: string
  to: string
  status: OrderStatus
  courierName: string
  courierDistance: number
  eta: string
  createdAt: Date
  updatedAt: Date
  deliveredAt?: Date
  events: OrderEvent[]
  progress: number // 0-100
}

// Status progression logic
export function getNextStatus(currentStatus: OrderStatus): OrderStatus {
  const statusProgression: Record<OrderStatus, OrderStatus> = {
    pending: "accepted",
    accepted: "in-transit",
    "in-transit": "delivered",
    delivered: "delivered",
    cancelled: "cancelled",
  }
  return statusProgression[currentStatus]
}

// Calculate progress percentage based on status
export function calculateProgress(status: OrderStatus): number {
  const progressMap: Record<OrderStatus, number> = {
    pending: 10,
    accepted: 30,
    "in-transit": 65,
    delivered: 100,
    cancelled: 0,
  }
  return progressMap[status]
}

// Get human-readable status label
export function getStatusLabel(status: OrderStatus): string {
  const labels: Record<OrderStatus, string> = {
    pending: "Pending",
    accepted: "Accepted",
    "in-transit": "In Transit",
    delivered: "Delivered",
    cancelled: "Cancelled",
  }
  return labels[status]
}

// Get status badge color
export function getStatusColor(status: OrderStatus): string {
  const colors: Record<OrderStatus, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    accepted: "bg-blue-100 text-blue-800",
    "in-transit": "bg-blue-100 text-blue-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  }
  return colors[status]
}

// Create initial order event
export function createOrderEvent(orderId: string, status: OrderStatus, notes?: string): OrderEvent {
  return {
    id: `event-${Date.now()}`,
    timestamp: new Date(),
    status,
    notes,
  }
}

// Add event to order
export function addEventToOrder(order: TrackedOrder, event: OrderEvent): TrackedOrder {
  return {
    ...order,
    events: [...order.events, event],
    updatedAt: new Date(),
  }
}

// Update order status with automatic event creation
export function updateOrderStatus(
  order: TrackedOrder,
  newStatus: OrderStatus,
  courierName?: string,
  courierDistance?: number,
  eta?: string,
): TrackedOrder {
  const event = createOrderEvent(order.id, newStatus)

  const updated: TrackedOrder = {
    ...order,
    status: newStatus,
    progress: calculateProgress(newStatus),
    events: [...order.events, event],
    updatedAt: new Date(),
    ...(courierName && { courierName }),
    ...(courierDistance !== undefined && { courierDistance }),
    ...(eta && { eta }),
    ...(newStatus === "delivered" && { deliveredAt: new Date() }),
  }

  return updated
}

// Simulate courier location updates
export function updateCourierLocation(
  order: TrackedOrder,
  newDistance: number,
  newEta: string,
  progress: number,
): TrackedOrder {
  return {
    ...order,
    courierDistance: newDistance,
    eta: newEta,
    progress: Math.min(progress, 99), // Cap at 99% until delivered
    updatedAt: new Date(),
  }
}
