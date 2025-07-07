"use server"

import { prisma } from "@/lib/prisma"

export async function getAreaWalls(areaID: number) {
    return prisma.wall.findMany({
        where: {
            areaID: areaID
        },
        select: {
            id: true,
            waypoint: true,
            details: true,
        },
    })
}