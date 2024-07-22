import { db } from '$lib/db/client';
import { users, userSessions } from '$lib/db/schema';
import type { User } from '$lib/types/users';
import type { UserSession } from '$lib/types/userSessions';
import type { Cookies } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { randomBytes } from 'crypto';
import { generateUniqueUsername } from './users';

export async function getUserSession(cookies: Cookies): Promise<UserSession | null> {
	const sessionId = cookies.get('sessionId');
	if (!sessionId) {
		return null;
	}

	const userSessionRes = await db.select().from(userSessions).where(eq(userSessions.id, sessionId));
	if (!userSessionRes.length) {
		return null;
	}

	if (userSessionRes[0].expiresAt < new Date()) {
		await deleteUserSession(sessionId, cookies);

		return null;
	}

	return userSessionRes[0];
}

export async function createUserSession(user: User): Promise<UserSession> {
	const sessionId = randomBytes(16).toString('hex');
	const csrfToken = randomBytes(16).toString('hex');
	const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

	return db.transaction(async (tx) => {
		await tx
			.insert(users)
			.values({
				id: user.id,
				authProvider: user.authProvider,
				email: user.email,
				username: await generateUniqueUsername(),
				firstName: user.firstName,
				lastName: user.lastName,
				profilePicUrl: user.profilePicUrl
			})
			.onConflictDoUpdate({
				target: users.id,
				set: {
					email: user.email,
					firstName: user.firstName,
					lastName: user.lastName,
					profilePicUrl: user.profilePicUrl
				}
			});

		const userSessionRes = await tx
			.insert(userSessions)
			.values({
				id: sessionId,
				userId: user.id,
				csrfToken,
				authProvider: user.authProvider,
				expiresAt
			})
			.returning({
				id: userSessions.id,
				userId: userSessions.id,
				csrfToken: userSessions.csrfToken,
				authProvider: userSessions.authProvider,
				expiresAt: userSessions.expiresAt,
				createdAt: userSessions.createdAt
			});

		return userSessionRes[0];
	});
}

export async function deleteUserSession(sessionId: string, cookies: Cookies): Promise<void> {
	cookies.delete('sessionId', { path: '/', httpOnly: true });

	await db.delete(userSessions).where(eq(userSessions.id, sessionId));
}
