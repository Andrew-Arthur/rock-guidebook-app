"use client"

import React, { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Area from "@/components/Area"
import Map from "@/components/Map"
import Wall from "@/components/Wall"
import Login from "@/components/LoginButton"
import { AreaEntity, WallEntity } from "@/lib/types"
import { getAreaById } from "@/repositories/areaRepository"
import { getWallById } from "@/repositories/wallRepository"
import { Box, Flex, Grid, Heading } from "@radix-ui/themes/dist/cjs/components/index.js"
import { HEADER_HEIGHT } from "./layout"
import { Header } from "@radix-ui/themes/components/table"
import { IconButton } from "@radix-ui/themes"
import { PencilRuler } from "lucide-react"

export default function PageClient({
    initialArea,
    initialWall,
}: {
    initialArea: AreaEntity | null
    initialWall: WallEntity | null
}) {
    const searchParams = useSearchParams()
    const [area, setArea] = useState<AreaEntity | null>(initialArea)
    const [wall, setWall] = useState<WallEntity | null>(initialWall)

    const [hoveredWallID, setHoveredWallID] = useState<number | null>(null)
    const [editing, setEditing] = useState<boolean>(false)

    useEffect(() => {
        const wallID: number = parseInt(searchParams.get("wall") || "")
        if (wallID !== wall?.id) {
            // Only fetch if no wall loaded or wall ID has changed
            if (wallID) {
                getWallById(wallID)
                    .then(setWall)
                    .catch(() => setWall(null))
            } else {
                setWall(null)
            }
        }
        const areaID: number = wall?.areaID ?? parseInt(searchParams.get("area") || "")
        if (areaID !== area?.id) {
            // Only fetch if no area loaded or area ID has changed
            if (areaID) {
                getAreaById(areaID)
                    .then(setArea)
                    .catch(() => setArea(null))
            } else {
                setArea(null)
            }
        }
    }, [searchParams])

    return (
        <>
            <Grid
                width="100%"
                align="center"
                className="bg-[var(--color-panel-translucent)] backdrop-blur absolute z-10"
                style={{ gridTemplateColumns: "1fr auto 1fr" }}
            >
                <Box style={{ justifySelf: "start" }}></Box>
                <Heading style={{ justifySelf: "center" }}>Rock Guidebook</Heading>
                <Box style={{ justifySelf: "end" }}>
                    <IconButton
                        color="gray"
                        variant={editing ? "solid" : "surface"}
                        highContrast
                        onClick={() => setEditing(!editing)}
                    >
                        <PencilRuler />
                    </IconButton>
                    {/* <Login /> */}
                </Box>
            </Grid>
            <main className="relative overflow-auto h-full w-full pt-8">
                <Map
                    area={area}
                    hoveredWallId={hoveredWallID}
                    setHoveredWallId={setHoveredWallID}
                />
                <Area
                    area={area}
                    hoveredWallId={hoveredWallID}
                    setHoveredWallId={setHoveredWallID}
                    editing={editing}
                />
                <Wall wall={wall} editing={editing} />
            </main>
        </>
    )
}
