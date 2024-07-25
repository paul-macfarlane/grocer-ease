import { getUserFromSession } from '$lib/services/userSessions';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { parseCreateGroceryListForm } from '$lib/validators/groceryLists';
import { createGroceryList } from '$lib/services/groceryLists';

export const actions = {
	default: async ({ cookies, request }) => {
		const user = await getUserFromSession(cookies);
		if (!user) {
			redirect(307, '/auth');
		}

		const parseCreateRes = parseCreateGroceryListForm(await request.formData());
		if (parseCreateRes.errors) {
			return fail(400, {
				validationErrors: parseCreateRes.errors,
				message: 'Validation error(s)'
			});
		}

		let groceryListId: string | null = null;
		try {
			const groceryList = await createGroceryList(user.id, parseCreateRes.data!);

			groceryListId = groceryList.id;
		} catch (e: unknown) {
			if (e instanceof Error) {
				// right now  the only errors from creation would be internal
				console.error(e.message);
			}

			return fail(500, {
				validationErrors: undefined,
				message: 'Internal Server Error'
			});
		}

		redirect(302, `/grocery-lists/${groceryListId}`);
	}
} satisfies Actions;
