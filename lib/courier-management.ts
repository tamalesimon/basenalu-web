export interface CourierStats {
  totalDeliveries: number
  completedDeliveries: number
  cancelledDeliveries: number
  averageRating: number
  totalEarnings: number
  acceptanceRate: number
  responseTime: number // in minutes
}

export interface CourierProfile {
  id: string
  name: string
  email: string
  phone: string
  rating: number
  completedDeliveries: number
  joinedDate: Date
  isActive: boolean
  vehicleType: "bike" | "car" | "scooter" | "walk"
  documentVerified: boolean
  backgroundCheckPassed: boolean
  bankAccountVerified: boolean
}

export interface CourierDelivery {
  id: string
  orderId: string
  customerName: string
  from: string
  to: string
  distance: number
  earnings: number
  rating: number
  completedAt: Date
  status: "completed" | "cancelled"
  feedback?: string
}

// Calculate courier performance score (0-100)
export function calculatePerformanceScore(stats: CourierStats): number {
  if (stats.completedDeliveries === 0) return 0

  const completionRate = (stats.completedDeliveries / (stats.completedDeliveries + stats.cancelledDeliveries)) * 100
  const ratingScore = (stats.averageRating / 5) * 100
  const acceptanceBonus = Math.min(stats.acceptanceRate * 10, 20)

  return Math.round((completionRate * 0.4 + ratingScore * 0.4 + acceptanceBonus) / 0.8)
}

// Get performance level badge
export function getPerformanceLevel(score: number): {
  level: string
  color: string
  description: string
} {
  if (score >= 90) return { level: "Elite", color: "bg-purple-100 text-purple-800", description: "Top performer" }
  if (score >= 75) return { level: "Excellent", color: "bg-green-100 text-green-800", description: "Highly reliable" }
  if (score >= 60) return { level: "Good", color: "bg-blue-100 text-blue-800", description: "Reliable" }
  if (score >= 40) return { level: "Fair", color: "bg-yellow-100 text-yellow-800", description: "Needs improvement" }
  return { level: "Poor", color: "bg-red-100 text-red-800", description: "At risk" }
}

// Format earnings amount
export function formatEarnings(amount: number): string {
  return `$${amount.toFixed(2)}`
}

// Calculate earnings for date range
export function calculateEarningsForRange(deliveries: CourierDelivery[], startDate: Date, endDate: Date): number {
  return deliveries
    .filter((d) => d.completedAt >= startDate && d.completedAt <= endDate && d.status === "completed")
    .reduce((sum, d) => sum + d.earnings, 0)
}
