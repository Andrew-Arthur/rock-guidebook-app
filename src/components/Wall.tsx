'use client'

import { IWall } from "@/lib/models/IWall"
import { usePathname, useSearchParams } from "next/navigation"
import RouteSVG from "./RouteSVG"
import RouteListing from "./RouteListing"
import { useState } from "react"

interface WallProps {
    wall: IWall | null
}

export default function Wall({
    wall,
}: WallProps) {
    const searchParams = useSearchParams()
    const pathname = usePathname()

    const [hoveredRouteID, setHoveredRouteID] = useState<string | null>(null)
    const selectedRouteID = searchParams.get('route')

    const setSelectedRouteID = (routeID: string | null) => {
        const params = new URLSearchParams(searchParams.toString())
        if (routeID) {
            params.set('route', routeID)
        } else {
            params.delete('route')
        }
        window.history.pushState(null, '', pathname + '?' + params.toString())
    }
    
    const backClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        const params = new URLSearchParams(searchParams.toString())
        params.delete('wall')
        params.delete('route')
        window.history.pushState(null, '', pathname + '?' + params.toString())
    }

    if (!wall) return null
    return (
        <div className="absolute z-10 top-2.5 left-[calc(25%+20px)] h-[calc(100%-42px)] w-[calc(75%-30px)]">
            <div className="h-full w-full bg-white text-black rounded-md">
                <div className="p-3 flex border-black border-b-1 space-x-3">
                    <a className="cursor-pointer" onClick={backClick} aria-label="Close menu">←</a>
                    <h2 className="text-lg">{wall.name}</h2>
                </div>
                <div className="flex">
                    <div className="w-[calc(2/3*100%-20px)] h-full border-r-1">
                        <div className="relative w-full h-full">
                            <img
                                className="w-full h-full"
                                src={wall.image}
                                onClick={() => setSelectedRouteID(null)}
                            />
                            {wall.routes.sort((a, b) => (Number.parseInt(b.id) - Number.parseInt(a.id))).map((route, index) => 
                                <RouteSVG
                                    key={index} 
                                    route={route}
                                    hoveredRouteId={hoveredRouteID}
                                    setHoveredRouteId={setHoveredRouteID}
                                    selectedRouteId={selectedRouteID}
                                    setSelectedRouteId={setSelectedRouteID}
                                />
                            )}
                        </div>
                        <div className="p-3 border-t-1">
                            <h1 className="font-bold">Description:</h1>
                            {wall.description}
                        </div>
                    </div>
                    <div className="inline-block h-full w-[calc(1/3*100%+20px)]">
                        {wall.routes.sort((a, b) => (Number.parseInt(a.id) - Number.parseInt(b.id))).map((route, index) => (
                            <RouteListing
                                key={index}
                                route={route}
                                hoveredRouteId={hoveredRouteID} 
                                setHoveredRouteId={setHoveredRouteID}
                                selectedRouteId={selectedRouteID}
                                setSelectedRouteId={setSelectedRouteID}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}