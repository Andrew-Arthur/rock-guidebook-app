// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      username: 'john_doe',
      password: 'securepassword',
    }
  });
  const areaDetails = await prisma.details.create({
    data: {
      name: 'Tonkawa Falls Park',
      description: 'Iconic climbing area in Waco, Texas',
      createdByID: user.id,
    }
  });
  const areaWaypoint = await prisma.waypoint.create({
    data: {
      latitude: 31.53701,
      longitude: -97.43095,
    }
  });
  await prisma.area.create({
    data: {
      detailsID:  areaDetails.id,
      waypointID: areaWaypoint.id,
    }
  });

  // Add more seed data here
}

main()
  .then(() => {
    console.log('🌱 Database seeded');
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect().finally(() => process.exit(1));
  });
