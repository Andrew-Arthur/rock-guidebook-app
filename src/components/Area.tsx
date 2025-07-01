'use client'

import { IArea } from '@/lib/models/IArea'
import { SilentLink } from './SilentLink'

interface AreaProps {
  area: IArea | null
  hoveredWallId: string | null
  setHoveredWallId: (id: string | null) => void
}

export default function Area({
  area,
  hoveredWallId,
  setHoveredWallId,
}: AreaProps) {
  if (!area) return null
  return (
    <div className="absolute z-10 top-2.5 left-12 h-[calc(100%-42px)] w-[calc(25%-38px)]">
      <div className="h-full w-full bg-white text-black rounded-md">
        <div className="p-3 flex justify-between items-center border-black border-b-1">
          <h2 className="text-lg">{area.name}</h2>
          <SilentLink href="/" replace={false} aria-label="Close menu">✕</SilentLink>
        </div>
        <div className='flex flex-row w-full h-2/5 overflow-x-auto border-b-1'>
          {area.images.map((image, index) => (
            <img key={index} src={image}></img>
          ))}
        </div>
        {area.walls.map((wall) => (
          <div key={wall.id} onMouseEnter={() => setHoveredWallId(wall.id)} onMouseLeave={() => setHoveredWallId(null)}>
            <SilentLink href={`/?area=${area.id}&wall=${wall.id}`} replace={false} aria-label={`View wall ${wall.name}`}>
              <div className={`cursor-pointer p-3 border-b-1 border-gray-300 flex justify-between items-center ${(hoveredWallId == wall.id) ? 'bg-gray-300' : ''}`}>
                <span>{wall.name}</span>
                <span>{wall.location.map((i) => i.toFixed(5)).join(', ')}</span>
              </div>
            </SilentLink>
          </div>
        ))}
      </div>
    </div>
  )
}
