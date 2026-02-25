import { createDb } from '@dziki-zielnik/data-access';
import { seedFamilies } from './families.seed.js';
import { seedPlants } from './plants.seed.js';
import { seedGenera } from './genera.seed.js';
import { seedHabitats } from './habitats.seed.js';

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
  }
  const db = createDb(process.env.DATABASE_URL);
  console.log('🌱 Starting database seed...');

  const familyMap = await seedFamilies(db);
  console.log(`✅ Families seeded (${familyMap.size})`);

  const genusMap = await seedGenera(db, familyMap);
  console.log(`✅ Genera seeded (${genusMap.size})`);

  const habitatMap = await seedHabitats(db);
  console.log(`✅ Habitats seeded (${habitatMap.size})`);

  await seedPlants(db, genusMap, habitatMap);
  console.log(`✅ Plants seeded`);

  console.log('🌿 Database seeded successfully');
}

main().catch((e) => {
  console.error('❌ Seeding failed:');
  console.error(e);
  process.exit(1);
});
