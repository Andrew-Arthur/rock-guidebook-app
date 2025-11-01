import { RouteSVGEntity } from "@/lib/types"

export default function RouteSVG({
    routeSVG,
    hoveredRouteId,
    setHoveredRouteId,
    selectedRouteId,
    setSelectedRouteId,
}: {
    routeSVG: RouteSVGEntity
    hoveredRouteId: number
    setHoveredRouteId: (id: number) => void
    selectedRouteId: number
    setSelectedRouteId: (id: number) => void
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

    if (!routeSVG) return null
    return (
        <svg
            className={`absolute top-0 left-0 w-full h-full cursor-pointer`}
            viewBox="0 0 1951 1087"
            pointerEvents="none"
            onMouseEnter={() => setHoveredRouteId(routeSVG.routeID)}
            onMouseLeave={() => setHoveredRouteId(NaN)}
            onClick={() => setSelectedRouteId(routeSVG.routeID)}
        >
            <g
                className={`
                mix-blend-difference
                transition-opacity
                duration-350
                ${hoveredRouteId === routeSVG.routeID || selectedRouteId === routeSVG.routeID ? "opacity-100" : "opacity-0"}
            `}
            >
                {wallPointsToLines(routeSVG.data as [number, number][]).map((line, index) => (
                    <line // Highlight Line
                        key={index}
                        x1={line.x1}
                        y1={line.y1}
                        x2={line.x2}
                        y2={line.y2}
                        stroke={selectedRouteId === routeSVG.routeID ? "white" : "gray"}
                        strokeWidth="25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        pointerEvents="stroke"
                    />
                ))}
            </g>
            {wallPointsToLines(routeSVG.data as [number, number][]).map((line, index) => (
                <line // Actual Line On Top
                    key={index}
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
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
