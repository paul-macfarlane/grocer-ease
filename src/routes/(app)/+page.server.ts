import { getGroceryLists } from '$lib/services/groceryLists';
import { getUserFromSession } from '$lib/services/userSessions';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const user = await getUserFromSession(cookies);
	if (!user) {
		redirect(307, '/auth');
	}

	try {
		return {
			groceryLists: await getGroceryLists(user.id)
		};
	} catch (e: unknown) {
		if (e instanceof Error) {
			console.error(e.message);
		}

		error(500, {
			message: 'Internal Server Error'
		});
	}
};
