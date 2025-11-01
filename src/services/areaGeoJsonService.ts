"use client"

import type { FeatureCollection, Point } from "geojson"
import { AreaEntity } from "@/lib/types"

export function getAreaGeoJson(
    area: AreaEntity,
): FeatureCollection<Point, { id: string; name: string }> {
    const geoJson: FeatureCollection<Point, { id: string; name: string }> = {
        type: "FeatureCollection",
        features:
            area?.walls.map((wall) => ({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [wall.waypoint.longitude, wall.waypoint.latitude],
                },
                properties: {
                    id: String(wall.id),
                    name: wall.details.name,
                },
            })) ?? [],
    }
    return geoJson
}
