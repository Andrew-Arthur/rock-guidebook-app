import { Prisma } from "@prisma/client"
import type { prisma } from "./prisma"

// Route
export const routeWithDetails = Prisma.validator<Prisma.RouteDefaultArgs>()({
    select: {
        id: true,
        grade: true,
        rating: true,
        details: {
            select: {
                name: true,
                description: true,
            },
        },
    },
})
export type RouteEntity = Awaited<
    ReturnType<typeof prisma.route.findFirst<typeof routeWithDetails>>
>

export const routeSVG = Prisma.validator<Prisma.RouteSVGDefaultArgs>()({
    select: {
        routeID: true,
        data: true,
    },
})
export type RouteSVGEntity = Awaited<ReturnType<typeof prisma.routeSVG.findFirst<typeof routeSVG>>>

// Wall:
export const wallWithRoutes = Prisma.validator<Prisma.WallDefaultArgs>()({
    select: {
        id: true,
        areaID: true,
        details: {
            select: {
                name: true,
                description: true,
            },
        },
        images: {
            select: {
                gcsImage: { select: { objectName: true } },
                routeSVGs: { ...routeSVG },
            },
        },
        routes: {
            ...routeWithDetails,
        },
        _count: { select: { routes: true } },
    },
})
export type WallEntity = Awaited<ReturnType<typeof prisma.wall.findFirst<typeof wallWithRoutes>>>
export type WallImageEntity = NonNullable<WallEntity>["images"][number]

// Area:
export const areaWithWallPreview = Prisma.validator<Prisma.AreaDefaultArgs>()({
    select: {
        id: true,
        details: {
            select: {
                name: true,
                description: true,
            },
        },
        waypoint: {
            select: {
                latitude: true,
                longitude: true,
            },
        },
        images: { select: { gcsImage: { select: { objectName: true } } } },
        walls: {
            select: {
                id: true,
                details: {
                    select: {
                        name: true,
                        description: true,
                    },
                },
                waypoint: {
                    select: {
                        latitude: true,
                        longitude: true,
                    },
                },
                _count: { select: { routes: true } },
            },
        },
    },
})
export type AreaEntity = Awaited<
    ReturnType<typeof prisma.area.findFirst<typeof areaWithWallPreview>>
>
