"use server"

import PageClient from "./pageClient"
import SessionWrapper from "@/components/SessionWrapper"

import { getAreaById } from "@/repositories/areaRepository"
import { getWallById } from "@/repositories/wallRepository"

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { AreaEntity, WallEntity } from "@/lib/types"

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ searchParams }: PageProps) {
    const session = await getServerSession(authOptions)

    const params = await searchParams

    const areaID = typeof params.area === "string" ? parseInt(params.area) : null
    const area: AreaEntity | null = areaID ? await getAreaById(areaID) : null

    const wallID = typeof params.wall === "string" ? parseInt(params.wall) : null
    const wall: WallEntity | null = area && wallID ? await getWallById(wallID) : null

    return (
        <SessionWrapper session={session}>
            <PageClient initialArea={area} initialWall={wall} />
        </SessionWrapper>
    )
}
