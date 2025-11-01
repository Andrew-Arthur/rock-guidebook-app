import { FeatureCollection, Point } from "geojson"
import { IArea } from "../models/IArea"

export function getWallsGeoJson(area: IArea): FeatureCollection<Point, { id: string, name: string }> {
    return {
        type: 'FeatureCollection',
        features: area.walls.map((wall) => ({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: wall.location,
            },
            properties: {
                id: wall.id, name: wall.name,
            },
        })),
    }
}
