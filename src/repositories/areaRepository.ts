"use server"

import { prisma } from "@/lib/prisma";

export async function getAllAreas() {
  return prisma.area.findMany({
    select: {
      id: true,
      waypoint: true,
      details: true,
    },
  });
}

export async function getAllAreasWithRouteCount() {
  const areas = await getAllAreas();
  return await Promise.all(
    areas.map(async area => {
      const routeCount = await prisma.route.count({ where: { wall: { areaID: area.id } } })
      return { ...area, routeCount }
    })
  )
}