import { getUserFromSession } from '$lib/services/userSessions';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const user = await getUserFromSession(cookies);
	if (!user) {
		redirect(307, '/auth');
	}

	return { user };
};
