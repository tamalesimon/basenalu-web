import { calculateDistance, calculateETA, getLocationFromAddress } from "./location-utils"

export interface CourierProfile {
  id: string
  name: string
  lat: number
  lng: number
  rating: number
  completedDeliveries: number
}

export interface DeliveryRequest {
  id: string
  customerName: string
  fromAddress: string
  toAddress: string
  distance: number
  estimatedTime: number
  reward: number
  fromLat: number
  fromLng: number
  toLat: number
  toLng: number
}

// Find nearby couriers within a radius (in km)
export function findNearbyCouriers(
  pickupLat: number,
  pickupLng: number,
  couriers: CourierProfile[],
  radiusKm = 5,
): CourierProfile[] {
  return couriers
    .map((courier) => ({
      courier,
      distance: calculateDistance(pickupLat, pickupLng, courier.lat, courier.lng),
    }))
    .filter(({ distance }) => distance <= radiusKm)
    .sort((a, b) => a.distance - b.distance)
    .map(({ courier }) => courier)
}

// Calculate delivery details
export function calculateDeliveryDetails(
  fromAddress: string,
  toAddress: string,
): {
  distance: number
  estimatedTime: number
} {
  const from = getLocationFromAddress(fromAddress)
  const to = getLocationFromAddress(toAddress)

  const distance = calculateDistance(from.lat, from.lng, to.lat, to.lng)
  const estimatedTime = calculateETA(distance)

  return { distance, estimatedTime }
}

// Create delivery request with calculated values
export function createDeliveryRequest(
  id: string,
  customerName: string,
  fromAddress: string,
  toAddress: string,
  reward: number,
): DeliveryRequest {
  const from = getLocationFromAddress(fromAddress)
  const to = getLocationFromAddress(toAddress)

  const distance = calculateDistance(from.lat, from.lng, to.lat, to.lng)
  const estimatedTime = calculateETA(distance)

  return {
    id,
    customerName,
    fromAddress,
    toAddress,
    distance: Math.round(distance * 10) / 10, // Round to 1 decimal
    estimatedTime,
    reward,
    fromLat: from.lat,
    fromLng: from.lng,
    toLat: to.lat,
    toLng: to.lng,
  }
}

// Generate mock courier profiles at different locations
export function generateMockCouriers(): CourierProfile[] {
  const addressSeeds = [
    "123 Main St, Downtown",
    "456 Oak Ave, Midtown",
    "789 Pine Rd, Uptown",
    "321 Elm St, Downtown",
    "555 River Lane, Westside",
    "888 Mountain Dr, Eastside",
    "222 Park Ave, Southside",
    "777 Beach Rd, Northside",
  ]

  return addressSeeds.map((address, index) => {
    const coords = getLocationFromAddress(address)
    return {
      id: `courier-${index + 1}`,
      name: [
        "Alex Johnson",
        "Maria Garcia",
        "John Smith",
        "Emma Davis",
        "Mike Wilson",
        "Sarah Brown",
        "James Lee",
        "Lisa Anderson",
      ][index],
      lat: coords.lat,
      lng: coords.lng,
      rating: 4.5 + Math.random() * 0.5,
      completedDeliveries: 50 + index * 10,
    }
  })
}
