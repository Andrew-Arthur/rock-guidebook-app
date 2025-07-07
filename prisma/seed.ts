// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
            username: 'john_doe',
            password: 'securepassword',
        }
    })
    const areaDetails = await prisma.details.create({
        data: {
            name: 'Tonkawa Falls Park',
            description: 'A beautiful park with a waterfall and climbing routes.',
            createdByID: user.id,
        }
    })
    const areaWaypoint = await prisma.waypoint.create({
        data: {
            latitude: 31.53701,
            longitude: -97.43095,
        }
    })
    const area = await prisma.area.create({
        data: {
            detailsID:  areaDetails.id,
            waypointID: areaWaypoint.id,
        }
    })
    const wallsData = [
        {
            name: 'Craw Cave',
            location: [-97.43064880733091, 31.53628283766936],
            description: 'Descend the stairs behind the pavilion and follow the trail along the wall until you come to a large cave with a stone bench. This is Craw Cave, the classic cave of Tonk. The classic route is Cromagination v10, which has many shorter variations for all experience levels.',
        },
        {
            name: 'Hidden Cave',
            location: [-97.4311823879023, 31.537103334397983],
            description: 'A hidden gem with a unique climbing experience.',
        },
        {
            name: 'Wall 1',
            location: [-97.43126790631025, 31.536957126587524],
            description: 'A popular climbing wall with various routes.',
        },
    ]
    for (const wallData of wallsData) {
        const wallWaypoint = await prisma.waypoint.create({
            data: {
                latitude: wallData.location[1],
                longitude: wallData.location[0],
            }
        })
        const wallDetails = await prisma.details.create({
            data: {
                name: wallData.name,
                description: wallData.description,
                createdByID: user.id,
            }
        })
        await prisma.wall.create({
            data: {
                waypointID: wallWaypoint.id,
                detailsID: wallDetails.id,
                areaID: area.id,
            }
        })
    }
}

main()
    .then(() => {
        console.log('🌱 Database seeded')
        return prisma.$disconnect()
    })
    .catch((e) => {
        console.error(e)
        return prisma.$disconnect().finally(() => process.exit(1))
    })
