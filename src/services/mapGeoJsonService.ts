"use server"

import type { FeatureCollection, Point } from "geojson"
import { getAllAreasWithRouteCount } from "@/repositories/areaRepository"

export async function getMapGeoJson(): Promise<
    FeatureCollection<Point, { id: string; name: string }>
> {
    const areas = await getAllAreasWithRouteCount()
    const geoJson: FeatureCollection<Point, { id: string; name: string }> = {
        type: "FeatureCollection",
        features: areas.map((area) => ({
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [area.waypoint.longitude, area.waypoint.latitude],
            },
            properties: {
                id: String(area.id),
                name: area.details.name,
                routeCount: area.routeCount,
            },
        })),
    }
    return geoJson
}
