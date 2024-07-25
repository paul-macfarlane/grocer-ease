import { text, integer, sqliteTable, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const userSessions = sqliteTable('user_sessions', {
	id: text('id', { length: 256 }).primaryKey().notNull(),
	userId: text('user_id', { length: 256 })
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	csrfToken: text('csrf_token', { length: 256 }).notNull(),
	authProvider: text('auth_provider', { length: 64 }).notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`(unixepoch())`),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export const users = sqliteTable('users', {
	id: text('id', { length: 256 }).primaryKey().notNull(),
	authProvider: text('auth_provider', { length: 64 }).notNull(),
	username: text('username', { length: 20 }).notNull().unique(),
	email: text('email', { length: 256 }).notNull(),
	firstName: text('first_name', { length: 256 }).notNull(),
	lastName: text('last_name', { length: 256 }).notNull(),
	profilePicUrl: text('profile_pic_url', { length: 256 }).notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`(unixepoch())`),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`(unixepoch())`)
		.$onUpdate(() => new Date())
});

export const groceryLists = sqliteTable('grocery_lists', {
	id: text('id', { length: 36 })
		.primaryKey()
		.$default(() => crypto.randomUUID()),
	createdByUserId: text('created_by_user_id', { length: 256 })
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	title: text('title', { length: 256 }).notNull(),
	budget: real('budget'),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`(unixepoch())`),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`(unixepoch())`)
		.$onUpdate(() => new Date())
});
