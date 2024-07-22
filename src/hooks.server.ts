import { type Handle, redirect } from '@sveltejs/kit';
import { getUserSession } from '$lib/services/userSessions';

export const handle: Handle = async ({ event, resolve }) => {
	const userSession = await getUserSession(event.cookies);

	const routeIsProtected =
		!event.url.pathname.startsWith('/auth') || event.url.pathname === '/auth/logout';

	if (routeIsProtected && !userSession) {
		redirect(302, '/auth');
	}

	if (!routeIsProtected && userSession) {
		redirect(302, '/');
	}

	return resolve(event);
};
