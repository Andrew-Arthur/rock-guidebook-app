import type { FeatureCollection, Point } from 'geojson'

export const geoJson: FeatureCollection<Point, { id: string; name: string }> = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [-97.43095, 31.53701] },
            properties: { id: '1', name: 'Tonkawa Falls Park' },
        },
        {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [-97.495056, 31.160222] },
            properties: { id: '2', name: "Rogers State Park" },
        },
        {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [-98.12219, 30.33369] },
            properties: { id: '3', name: "Reimer's Ranch" },
        },
        {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [-104.860726, 31.891480] },
            properties: { id: '4', name: "Guadalupe Peak" },
        },
    ],
}
