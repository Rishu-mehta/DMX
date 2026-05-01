import { defineConfig } from 'prisma/config';
import * as dotenv from 'dotenv';
import path from 'path';

// Load .env and .env.local
dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config({ path: path.resolve(__dirname, '.env.local'), override: true });

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set in .env or .env.local');
}

export default defineConfig({
  earlyAccess: true,
  schema: './prisma/schema.prisma',
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});

