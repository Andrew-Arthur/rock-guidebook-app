"use client"

import { usePathname, useSearchParams } from "next/navigation"
import RouteSVG from "./RouteSVG"
import RouteListing from "./RouteListing"
import { Fragment, useEffect, useMemo, useState } from "react"
import { WallEntity, RouteEntity } from "@/lib/types"
import Image from "next/image"
import {
    AspectRatio,
    Box,
    Card,
    Container,
    Flex,
    Heading,
    Inset,
    ScrollArea,
    Section,
    Separator,
    Text,
} from "@radix-ui/themes"

interface WallProps {
    wall: WallEntity | null
    editing: boolean
}

export default function Wall({ wall, editing }: WallProps) {
    const searchParams = useSearchParams()
    const pathname = usePathname()

    const [routes, setRoutes] = useState(wall?.routes || [])
    useEffect(() => {
        setRoutes(wall?.routes || [])
    }, [wall])

    const [hoveredRouteID, setHoveredRouteID] = useState<number>(NaN)
    const selectedRouteID = parseInt(searchParams.get("route") || "")

    const setSelectedRouteID = (routeID: number | null) => {
        const params = new URLSearchParams(searchParams.toString())
        if (routeID) {
            params.set("route", routeID.toString())
        } else {
            params.delete("route")
        }
        window.history.pushState(null, "", pathname + "?" + params.toString())
    }

    const backClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        const params = new URLSearchParams(searchParams.toString())
        params.delete("wall")
        params.delete("route")
        window.history.pushState(null, "", pathname + "?" + params.toString())
    }

    const addRoute = () => {
        const nextId = (routes.length ? Math.max(...routes.map((r) => r.id)) : 0) + 1
        const newRoute: RouteEntity = {
            id: nextId,
            details: { name: "New Route", description: "route just freshly created" },
            grade: "V5",
            rating: 0,
        }
        setRoutes((prev) => [...prev, newRoute])
    }

    const sortedRoutes = useMemo(() => [...routes].sort((a, b) => a?.id - b.id), [routes])

    const routeSVGs = useMemo(
        () => [...(wall?.images[0]?.routeSVGs ?? [])].sort((a, b) => b.routeID - a.routeID),
        [wall],
    )

    if (!wall) return null
    return (
        <div className="absolute z-10 top-10.5 left-[calc(25%+20px)] h-[calc(100%-60px)] w-[calc(75%-30px)]">
            <Box width="100%" height="100%" asChild>
                <Card>
                    <Flex direction="column" gap="3">
                        <Flex gap="2">
                            <Text onClick={backClick}>←</Text>
                            <Heading size="4">{wall.details.name}</Heading>
                        </Flex>
                        <Flex height="100%">
                            <Flex
                                className="w-[calc(2/3*100%-20px)]"
                                height="100%"
                                direction="column"
                                gap="3"
                                pr="3"
                            >
                                <Inset side="x">
                                    <AspectRatio ratio={16 / 9} className="isolate">
                                        <Image
                                            src={`/api/images/${wall.images[0]?.gcsImage.objectName}`}
                                            alt={wall.details.name}
                                            fill={true}
                                            onClick={() => setSelectedRouteID(null)}
                                        />
                                        {routeSVGs.map((routeSVG, index) => (
                                            <RouteSVG
                                                key={index}
                                                routeSVG={routeSVG}
                                                hoveredRouteId={hoveredRouteID}
                                                setHoveredRouteId={setHoveredRouteID}
                                                selectedRouteId={selectedRouteID}
                                                setSelectedRouteId={setSelectedRouteID}
                                            />
                                        ))}
                                    </AspectRatio>
                                </Inset>
                                <Box>
                                    <Heading size="3">Description:</Heading>
                                    <Text>{wall.details.description}</Text>
                                </Box>
                            </Flex>
                            <Flex className="w-[calc(1/3*100%+20px)]" direction="column" pl="3">
                                <Heading size="4">Routes:</Heading>
                                <Inset side="x">
                                    <ScrollArea scrollbars="vertical">
                                        {sortedRoutes.map((route, index) => (
                                            <Fragment key={index}>
                                                {index !== 0 && (
                                                    <Separator size="4" orientation="horizontal" />
                                                )}
                                                <RouteListing
                                                    route={route}
                                                    hoveredRouteId={hoveredRouteID}
                                                    setHoveredRouteId={setHoveredRouteID}
                                                    selectedRouteId={selectedRouteID}
                                                    setSelectedRouteId={setSelectedRouteID}
                                                    editing={editing}
                                                />
                                            </Fragment>
                                        ))}
                                        {editing && (
                                            <>
                                                {sortedRoutes.length > 0 && (
                                                    <Separator size="4" orientation="horizontal" />
                                                )}
                                                <Box px="3" py="2" onClick={() => addRoute()}>
                                                    + Add Route
                                                </Box>
                                            </>
                                        )}
                                    </ScrollArea>
                                </Inset>
                            </Flex>
                        </Flex>
                    </Flex>
                </Card>
            </Box>
        </div>
    )
}
