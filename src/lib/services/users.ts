import { db } from '$lib/db/client';
import { users } from '$lib/db/schema';
import { NotFoundError } from '$lib/types/errors';
import type { UpdateUser, User } from '$lib/types/users';
import { eq } from 'drizzle-orm';

const adjectives = [
	'Brave',
	'Sunny',
	'Happy',
	'Eager',
	'Calm',
	'Bright',
	'Jolly',
	'Wise',
	'Clever',
	'Gentle',
	'Noble',
	'Swift',
	'Bold',
	'Shy',
	'Mighty',
	'Quick',
	'Fierce',
	'Vivid',
	'Proud',
	'Gentle'
];
const nouns = [
	'Tiger',
	'Sky',
	'River',
	'Mountain',
	'Lion',
	'Falcon',
	'Wolf',
	'Eagle',
	'Bear',
	'Hawk',
	'Panther',
	'Dolphin',
	'Fox',
	'Otter',
	'Deer',
	'Rabbit',
	'Turtle',
	'Cheetah',
	'Buffalo',
	'Leopard'
];

function getRandomElement<T>(arr: T[]): T {
	return arr[Math.floor(Math.random() * arr.length)];
}

function generateUsername(): string {
	const adjective = getRandomElement(adjectives);
	const noun = getRandomElement(nouns);
	const suffix = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');

	return `${adjective}${noun}${suffix}`;
}

async function isUsernameTaken(username: string): Promise<boolean> {
	return !!(await db.select({ id: users.id }).from(users).where(eq(users.username, username)))
		.length;
}

export async function generateUniqueUsername(): Promise<string> {
	let username = '';
	let isUnique = false;
	let attempts = 0;
	const maxAttempts = 30;

	while (!isUnique && attempts < maxAttempts) {
		username = generateUsername();
		isUnique = !(await isUsernameTaken(username));
		attempts++;
	}

	if (username === '') {
		throw new Error('reached max attempts at generating username');
	}

	return username;
}

export async function updateUser(userId: string, update: UpdateUser): Promise<User> {
	const userRes = await db
		.update(users)
		.set({
			username: update.username
		})
		.where(eq(users.id, userId))
		.returning();
	if (!userRes.length) {
		throw new NotFoundError('user');
	}

	return userRes[0];
}
