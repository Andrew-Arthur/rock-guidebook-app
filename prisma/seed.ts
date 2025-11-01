// prisma/seed.ts
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
    const userData = {
        username: "john_doe",
        password: "securepassword",
    }
    const user = await prisma.user.upsert({
        where: { username: userData.username },
        update: {
            password: userData.password,
        },
        create: {
            username: userData.username,
            password: userData.password,
        },
    })
    const areaData = {
        name: "Tonkawa Falls Park‎‎‎",
        description: "A beautiful park with a waterfall and climbing routes.",
    }
    const oldArea = await prisma.area.findFirst({
        where: { details: { name: areaData.name } },
        select: { id: true },
    })
    if (oldArea) {
        await prisma.area.delete({ where: { id: oldArea.id } })
    }
    const areaDetails = await prisma.details.create({
        data: {
            name: areaData.name,
            description: areaData.description,
            createdByID: user.id,
        },
    })
    const areaWaypoint = await prisma.waypoint.create({
        data: {
            latitude: 31.53701,
            longitude: -97.43095,
        },
    })
    const area = await prisma.area.create({
        data: {
            detailsID: areaDetails.id,
            waypointID: areaWaypoint.id,
        },
    })
    const gcsImages = await Promise.all(
        ["uploads/tonk-1.jpg", "uploads/tonk-2.jpg"].map((objectName) =>
            prisma.gCSImage.create({
                data: { objectName },
            }),
        ),
    )
    const areaImages = await Promise.all(
        gcsImages.map((gcsImage) =>
            prisma.areaImage.create({
                data: {
                    areaID: area.id,
                    gcsID: gcsImage.id,
                },
            }),
        ),
    )
    const wallsData = [
        {
            name: "Craw Cave‎‎‎",
            location: [-97.43064880733091, 31.53628283766936],
            description:
                "Descend the stairs behind the pavilion and follow the trail along the wall until you come to a large cave with a stone bench. This is Craw Cave, the classic cave of Tonk. The classic route is Cromagination v10, which has many shorter variations for all experience levels.",
        },
        {
            name: "Hidden Cave",
            location: [-97.4311823879023, 31.537103334397983],
            description: "A hidden gem with a unique climbing experience.",
        },
        {
            name: "Wall 1",
            location: [-97.43126790631025, 31.536957126587524],
            description: "A popular climbing wall with various routes.",
        },
    ]
    let wallCrawCave
    for (const wallData of wallsData) {
        const wallWaypoint = await prisma.waypoint.create({
            data: {
                latitude: wallData.location[1],
                longitude: wallData.location[0],
            },
        })
        const wallDetails = await prisma.details.create({
            data: {
                name: wallData.name,
                description: wallData.description,
                createdByID: user.id,
            },
        })
        const wall = await prisma.wall.create({
            data: {
                waypointID: wallWaypoint.id,
                detailsID: wallDetails.id,
                areaID: area.id,
            },
        })
        if (wallData.name === "Craw Cave‎‎‎") {
            wallCrawCave = wall
        }
    }
    if (!wallCrawCave) throw new Error("Craw Cave wall not created")

    const wallGcsImage = await prisma.gCSImage.create({
        data: { objectName: "uploads/craw-cave.png" },
    })
    await prisma.wallImage.create({
        data: {
            wallID: wallCrawCave.id,
            gcsID: wallGcsImage.id,
            userID: user.id,
        },
    })

    const routesData = [
        {
            name: "La Salida",
            description: "A challenging route in Craw Cave.",
            grade: "V2",
            rating: 1,
            svg: [
                [100, 550],
                [150, 450],
                [250, 400],
            ],
        },
    ]
    for (const routeData of routesData) {
        const routeDetails = await prisma.details.create({
            data: {
                name: routeData.name,
                description: routeData.description,
                createdByID: user.id,
            },
        })
        const route = await prisma.route.create({
            data: {
                grade: routeData.grade,
                rating: routeData.rating,
                wallID: wallCrawCave!.id,
                detailsID: routeDetails.id,
            },
        })
        await prisma.routeSVG.create({
            data: {
                routeID: route.id,
                wallImageID: wallCrawCave!.id,
                data: routeData.svg,
            },
        })
    }
}

main()
    .then(() => {
        console.log("🌱 Database seeded")
        return prisma.$disconnect()
    })
    .catch((e) => {
        console.error(e)
        return prisma.$disconnect().finally(() => process.exit(1))
    })
