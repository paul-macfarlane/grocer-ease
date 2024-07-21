import { migrate } from 'drizzle-orm/libsql/migrator';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import 'dotenv/config';

async function runMigration() {
	const client = createClient({
		url: process.env.TURSO_CONNECTION_URL!,
		authToken: process.env.TURSO_AUTH_TOKEN!
	});

	const db = drizzle(client);
	await migrate(db, { migrationsFolder: './drizzle' });

	client.close();
}

void runMigration();
