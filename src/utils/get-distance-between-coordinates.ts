import { getDistance } from 'geolib'

export interface Coordinate {
  latitude: number
  longitude: number
}

export function getDistanceBetweenCoordinates(
  from: Coordinate,
  to: Coordinate,
): number {
  // Se as coordenadas forem iguais, retorna 0 diretamente
  if (from.latitude === to.latitude && from.longitude === to.longitude) {
    return 0
  }

  // geolib retorna distância em metros, convertemos para km
  const distanceInMeters = getDistance(
    { latitude: from.latitude, longitude: from.longitude },
    { latitude: to.latitude, longitude: to.longitude },
  )

  return distanceInMeters / 1000 // distância em km
}
