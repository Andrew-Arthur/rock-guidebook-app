'use client'

import { geoJson } from "../data/geoJson";

export function getGeoJson() {
    return geoJson;
}

export function getGeoJsonWaypointById(id: string) {
    return geoJson.features.find((feature) => feature.properties.id === id);
}

export function getGeoJsonWaypointCoordsById(id: string) {
    const waypoint = getGeoJsonWaypointById(id)
    return waypoint?.geometry.coordinates as [number, number] | undefined
}

export function getGeoJsonAvgCoord() {
    return geoJson.features
      .reduce(([lngSum, latSum]: [number, number], { geometry: { coordinates: [lng, lat] } }) => ([lngSum + lng, latSum + lat] as [number, number]), [0, 0] as [number, number])
      .map(coord => coord / geoJson.features.length) as [number, number]
}