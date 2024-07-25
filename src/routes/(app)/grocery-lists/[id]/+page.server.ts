import { getUserFromSession } from '$lib/services/userSessions';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { APIError } from '$lib/types/errors';
import { getGroceryListById } from '$lib/services/groceryLists';

export const load: PageServerLoad = async ({ cookies, params }) => {
	const user = await getUserFromSession(cookies);
	if (!user) {
		redirect(307, '/auth');
	}

	try {
		return {
			groceryList: await getGroceryListById(user.id, params.id)
		};
	} catch (e: unknown) {
		if (e instanceof APIError) {
			error(e.code, {
				message: e.message
			});
		}

		if (e instanceof Error) {
			console.error(e.message);
		}

		error(500, {
			message: 'Internal Server Error'
		});
	}
};
