'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Area from "@/components/Area"
import Map from "@/components/Map"
import { IArea } from "@/lib/models/IArea"
import { fetchAreaById, fetchWallById } from "@/lib/repositories/areaRepository"
import Wall from '@/components/Wall'
import { IWall } from '@/lib/models/IWall'

export default function PageClient({
  initialArea,
  initialWall,
}: {
  initialArea: IArea | null
  initialWall: IWall | null
}) {
  const searchParams = useSearchParams()
  const [area, setArea] = useState<IArea | null>(initialArea)
  const [wall, setWall] = useState<IWall | null>(initialWall)

  const [hoveredWallID, setHoveredWallID] = useState<string | null>(null)

  useEffect(() => {
    const areaID: string | null = searchParams.get('area')
    if (areaID !== area?.id) { // Only fetch if no area loaded or area ID has changed
      if (areaID) {
        fetchAreaById(areaID)
          .then(setArea)
          .catch(() => setArea(null))
      } else {
        setArea(null)
      }
    }
    const wallID: string | null = searchParams.get('wall')
    if (areaID !== area?.id || wallID !== wall?.id) { // Only fetch if no wall loaded or area/wall ID has changed
      if (areaID && wallID) {
        fetchWallById(areaID, wallID)
          .then(setWall)
          .catch(() => setWall(null))
      } else {
        setWall(null)
      }
    }
  }, [searchParams])

  return (
    <div className={'h-full w-full relative'}>
      <Map  area={area} hoveredWallId={hoveredWallID} setHoveredWallId={setHoveredWallID}/>
      <Area area={area} hoveredWallId={hoveredWallID} setHoveredWallId={setHoveredWallID}/>
      <Wall wall={wall}/>
    </div>
  )
}
