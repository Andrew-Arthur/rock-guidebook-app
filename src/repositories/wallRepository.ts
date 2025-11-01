"use server"

import { prisma } from "@/lib/prisma"
import { WallEntity, wallWithRoutes } from "@/lib/types"
import { toJson } from "@/lib/utils/toJson"

export async function getAreaWalls(areaID: number) {
    return toJson(
        prisma.wall.findMany({
            where: {
                areaID: areaID,
            },
            select: {
                id: true,
                waypoint: true,
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

export async function getWallById(wallID: number): Promise<WallEntity | null> {
    return toJson(
        prisma.wall.findUnique({
            where: { id: wallID },
            ...wallWithRoutes,
        }),
    )
}
