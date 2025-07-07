import PageClient from "./pageClient"
import Login from '@/components/LoginButton'
import SessionWrapper from '@/components/SessionWrapper'

import { IArea } from "@/lib/models/IArea"
import { IWall } from "@/lib/models/IWall"
import { fetchAreaById, fetchWallById } from "@/lib/repositories/areaRepository"

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ searchParams }: PageProps) {
    const session = await getServerSession(authOptions)

    const params = await searchParams
    const areaID = typeof params.area === "string" ? params.area : null
    const area: IArea | null = (areaID) ? await fetchAreaById(areaID) : null
    const wallID = typeof params.wall === "string" ? params.wall : null
    const wall: IWall | null = (area && wallID) ? await fetchWallById(areaID!, wallID) : null

    return (
        <SessionWrapper session={session}>
            <header className="flex relative top-0 left-0 w-full h-12 bg-gray-800 text-white items-center justify-between px-1 z-10">
                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <h1 className="text-2xl font-header">Rock Guidebook</h1>
                </div>
                <div className="ml-auto">
                    <button className="bg-white hover:bg-gray-400 text-black font-bold py-2 px-3 rounded-full mr-1">✎</button>
                    <Login/>
                </div>
            </header>
            <main className="absolute top-12 bottom-0 left-0 right-0 overflow-auto">
                <PageClient initialArea={area} initialWall={wall}/>
            </main>
        </SessionWrapper>
    )
}