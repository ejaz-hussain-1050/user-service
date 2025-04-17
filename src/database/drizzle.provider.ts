// src/database/drizzle.provider.ts
import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema'; // Import as type

export type DrizzleClient = NodePgDatabase<typeof schema>;

export const DrizzleAsyncProvider = 'DrizzleAsyncProvider';

export const drizzleProvider = [
  {
    provide: DrizzleAsyncProvider,
    useFactory: async (): Promise<DrizzleClient> => {
      console.log(process.env.DATABASE_URL);
      const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: false,
      });
      await pool.connect();
      return drizzle(pool, { schema });
    },
    exports: [DrizzleAsyncProvider],
  },
];
