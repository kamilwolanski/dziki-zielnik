/// <reference types="node" />
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

export default defineConfig({
  out: './drizzle',
  schema: './libs/database/src/**/*.{ts,js}',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
