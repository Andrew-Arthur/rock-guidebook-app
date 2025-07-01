import { IRoute } from "@/lib/models/IRoute";
import { useEffect, useState } from "react";

export default function RouteListing({
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
    const hovered = hoveredRouteId === route.id
    const selected = selectedRouteId === route.id
    const [showVideo, setShowVideo] = useState<boolean>(false)

    useEffect(() => {
        if (!selected) setShowVideo(false)
    }, [selected])
    
    return (
        <div className="w-full border-b-1 border-gray-300">
            <div
                className={`p-3 flex justify-between ${hovered ? 'bg-gray-200' : ''}`}
                onMouseEnter={() => setHoveredRouteId(route.id)}
                onMouseLeave={() => setHoveredRouteId(null)}
                onClick={() => setSelectedRouteId(selected ? null : route.id)}
            >
                <div className="space-x-3">
                    <span className="border-r-1 border-gray-300 pr-3">{route.grade}</span>
                    <span>{route.name}</span>
                </div>
                <div className="space-x-3">
                    <span>{'★'.repeat(route.rating) + '☆'.repeat(5 - route.rating)}</span>
                    <a className="cursor-pointer">{selected ? '▲' : '▼'}</a>
                </div>
            </div>
            {selected && (
                <div className="p-3">
                    {showVideo && (
                        <iframe
                            className="w-full h-64"
                            src={`https://www.youtube.com/embed/${route.video}`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    )}
                    <div className="flex justify-between">
                        <span className="font-bold">Description:</span>
                        {route.video && (
                            <img
                                className="w-4 h-4 cursor-pointer"
                                src="/youtube.png"
                                alt="Video"
                                onClick={() => { setShowVideo(!showVideo) }}
                            />
                        )}
                    </div>
                    {route.description}
                </div>
            )}
        </div>
    )
}