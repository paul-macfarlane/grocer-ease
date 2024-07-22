import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getUserSession as getUserSession, deleteUserSession } from '$lib/services/userSessions';

export const GET: RequestHandler = async ({ cookies }) => {
	const userSession = await getUserSession(cookies);
	if (userSession) {
		await deleteUserSession(userSession.id.toString(), cookies);
	}

	redirect(302, '/auth');
};
