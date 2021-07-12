const rad = (x) => (x * Math.PI) / 180

const getDistance = (p1, p2) => {
  const R = 6378137 // Earth’s mean radius in meter
  const dLat = rad(p2.lat - p1.lat)
  const dLong = rad(p2.lng - p1.lng)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) *
      Math.cos(rad(p2.lat)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c
  return d / 1000 // returns the distance in kilometer
}

export default function distanceMarker(positionOne, positionTwo, radius) {
  const km = getDistance(positionOne, positionTwo)

  if (km <= radius) {
    return true
  }

  return false
}
