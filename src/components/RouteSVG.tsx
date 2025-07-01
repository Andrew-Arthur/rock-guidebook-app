import { IRoute } from "@/lib/models/IRoute"

export default function RouteSVG({
    route,
    hoveredRouteId,
    setHoveredRouteId,
    selectedRouteId,
    setSelectedRouteId,
}: {
    route: IRoute
    hoveredRouteId: string | null
    setHoveredRouteId: (id: string | null) => void
    selectedRouteId: string | null
    setSelectedRouteId: (id: string | null) => void
}) {

    function wallPointsToLines(points: [number, number][]) {
        const lines = points.slice(1).map((point, index) => {
            const prev = points[index]
            return {
                x1: prev[0],
                y1: prev[1],
                x2: point[0],
                y2: point[1],
            }
        })
        return lines
    }

    if (!route) return null
    return (
        <svg
            className={`absolute top-0 left-0 w-full h-full cursor-pointer`}
            viewBox="0 0 1951 1087"
            pointerEvents="none"
            onMouseEnter={() => setHoveredRouteId(route.id)}
            onMouseLeave={() => setHoveredRouteId(null)}
            onClick={() => setSelectedRouteId(route.id)}
        >
            <g className={`
                mix-blend-difference
                transition-opacity
                duration-350
                ${(hoveredRouteId === route.id || selectedRouteId === route.id) ? 'opacity-100' : 'opacity-0'}
            `}>
                {wallPointsToLines(route.svg).map((line, index) => (
                    <line // Highlight Line
                        key={index}
                        x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                        stroke={(selectedRouteId === route.id) ? 'white' : 'gray'}
                        strokeWidth="25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        pointerEvents="stroke"
                    />
                ))}
            </g>
            {wallPointsToLines(route.svg).map((line, index) => (
                <line // Actual Line On Top
                    key={index}
                    x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                    stroke="red"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pointerEvents="stroke"
                />
            ))}
        </svg>
    )
}