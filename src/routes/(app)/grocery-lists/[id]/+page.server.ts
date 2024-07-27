import { getUserFromSession } from '$lib/services/userSessions';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { APIError } from '$lib/types/errors';
import { deleteGroceryList, getGroceryListById } from '$lib/services/groceryLists';
import { z } from 'zod';

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

export const actions = {
	delete: async ({ cookies, params }) => {
		const user = await getUserFromSession(cookies);
		if (!user) {
			redirect(307, '/auth');
		}

		const idRes = z.string().uuid().safeParse(params.id);
		if (idRes.error) {
			return fail(400, {
				message: idRes.error.errors.map((err) => err.message).join(',')
			});
		}

		try {
			// will validate that the grocery list exists and that user has access
			await getGroceryListById(user.id, idRes.data);

			await deleteGroceryList(user.id, idRes.data);
		} catch (e: unknown) {
			if (e instanceof APIError) {
				return fail(e.code, {
					message: e.message
				});
			}

			if (e instanceof Error) {
				console.error(`error deleting grocery lsit: ${e.message}`);
			}

			return fail(500, {
				message: 'Internal Server Error'
			});
		}

		redirect(302, '/');
	}
} satisfies Actions;
