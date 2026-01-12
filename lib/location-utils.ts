export interface Location {
  lat: number
  lng: number
  address: string
}

export interface CourierLocation extends Location {
  courierId: string
  courierName: string
}

// Convert address string to mock coordinates (in real app, use geocoding API)
export function addressToCoordinates(address: string): { lat: number; lng: number } {
  // Simple hash-based pseudo-random coordinates for consistent results
  const hash = address.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const seed = hash % 1000

  // Generate coordinates within a 10km radius
  const baseLat = 40.7128
  const baseLng = -74.006
  const latOffset = (seed % 100) / 10000
  const lngOffset = ((seed * 7) % 100) / 10000

  return {
    lat: baseLat + (seed % 2 === 0 ? latOffset : -latOffset),
    lng: baseLng + (seed % 3 === 0 ? lngOffset : -lngOffset),
  }
}

// Haversine formula to calculate distance between two coordinates in km
export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// Calculate ETA (simplified: ~5 min per km)
export function calculateETA(distanceKm: number): number {
  return Math.ceil(distanceKm * 5)
}

// Parse address and get location coordinates
export function getLocationFromAddress(address: string): Location {
  const coordinates = addressToCoordinates(address)
  return {
    ...coordinates,
    address,
  }
}
