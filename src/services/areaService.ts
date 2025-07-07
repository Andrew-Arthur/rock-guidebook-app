"use server"

import type { FeatureCollection, Point } from 'geojson'
import { getAreaWalls } from '@/repositories/wallRepository'

export async function getMapGeoJson(areaID: number): Promise<FeatureCollection<Point, { id: string; name: string }>> {
    const walls = await getAreaWalls(areaID)
    const geoJson: FeatureCollection<Point, { id: string; name: string }> = {
        type: 'FeatureCollection',
        features: walls.map((wall) => ({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [ wall.waypoint.longitude.toNumber(), wall.waypoint.latitude.toNumber() ],
            },
            properties: {
                id: String(wall.id),
                name: wall.details.name,
            },
        })),
    }
    return geoJson
}