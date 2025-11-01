import "server-only"
import { PrismaClient } from "@prisma/client"

function makePrisma() {
    const base = new PrismaClient()
    return base.$extends({
        result: {
            waypoint: {
                latitude: {
                    needs: { latitude: true },
                    compute(w) {
                        return w.latitude.toNumber()
                    },
                },
                longitude: {
                    needs: { longitude: true },
                    compute(w) {
                        return w.longitude.toNumber()
                    },
                },
            },
            routeSVG: {
                data: {
                    needs: { data: true },
                    compute(w) {
                        return w.data as [number, number][]
                    },
                },
            },
        },
    })
}

declare global {
    var prisma: ReturnType<typeof makePrisma> | undefined
}

export const prisma = globalThis.prisma ?? makePrisma()

if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = prisma
}
