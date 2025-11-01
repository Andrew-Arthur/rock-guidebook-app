"use client"

import { WallImageEntity } from "@/lib/types"
import { useState } from "react"
import Image from "next/image"
import RouteSVG from "./RouteSVG"

interface WallImageDeckProps {
    images: WallImageEntity[]
}

export default function WallImageDeck({ images }: WallImageDeckProps) {
    const [ndx, setNdx] = useState(0)

    const next = () => {
        setNdx((prev) => (prev + 1) % images.length)
    }
    const prev = () => {
        setNdx((prev) => (prev - 1 + images.length) % images.length)
    }

    const currentImage = images.at(ndx)
    const currentImageSVGs = [...(currentImage?.routeSVGs ?? [])].sort(
        (a, b) => b.routeID - a.routeID,
    )

    return (
        <div className="relative w-full aspect-[16/9]">
            {currentImage && (
                    <Image
                        src={`/api/images/${currentImage.gcsImage.objectName}`}
                        alt={`Wall Image ${ndx + 1}`}
                        fill={true}
                        onClick={() => setSelectedRouteID(null)}
                    />
                ) &&
                currentImageSVGs.map((routeSVG, index) => (
                    <RouteSVG
                        key={index}
                        routeSVG={routeSVG}
                        hoveredRouteId={hoveredRouteID}
                        setHoveredRouteId={setHoveredRouteID}
                        selectedRouteId={selectedRouteID}
                        setSelectedRouteId={setSelectedRouteID}
                    />
                ))}
        </div>
    )
}
