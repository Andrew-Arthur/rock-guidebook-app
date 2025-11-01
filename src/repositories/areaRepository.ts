"use server"

import { prisma } from "@/lib/prisma"
import { AreaEntity, areaWithWallPreview } from "@/lib/types"
import { toJson } from "@/lib/utils/toJson"

export async function getAllAreas() {
    return toJson(
        prisma.area.findMany({
            select: {
                id: true,
                waypoint: {
                    select: {
                        latitude: true,
                        longitude: true,
                    },
                },
                details: {
                    select: {
                        name: true,
                        description: true,
                    },
                },
            },
        }),
    )
}

export async function getAllAreasWithRouteCount() {
    const areas = await getAllAreas()
    return await Promise.all(
        areas.map(async (area) => {
            const routeCount = await prisma.route.count({ where: { wall: { areaID: area.id } } })
            return { ...area, routeCount }
        }),
    )
}

export async function getAreaById(areaID: number): Promise<AreaEntity | null> {
    const area = prisma.area.findUnique({
        where: { id: areaID },
        ...areaWithWallPreview,
    })
    return area != null ? toJson(area) : null
}
