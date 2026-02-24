import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { seedFamilies } from './seed/families.seed';
import { seedGenera } from './seed/genera.seed';
import { seedHabitats } from './seed/habitats.seed';
import { seedPlants } from './seed/plants.seed';
import * as schema from './schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

export type DB = typeof db;

async function main() {
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