import { getUserFromSession } from '$lib/services/userSessions';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { parseUpdateUserForm } from '$lib/validators/users';
import { updateUser } from '$lib/services/users';

export const actions = {
	default: async ({ cookies, request }) => {
		const user = await getUserFromSession(cookies);
		if (!user) {
			redirect(307, '/auth');
		}

		const parseUpdateRes = parseUpdateUserForm(await request.formData());
		if (parseUpdateRes.errors) {
			return fail(400, {
				validationErrors: parseUpdateRes.errors,
				message: 'invalid data'
			});
		}

		try {
			await updateUser(user.id, parseUpdateRes.data!);
		} catch (e: unknown) {
			if (e instanceof Error) {
				// even if the error is a NotFoundError that is actually an internal error because the session should contian a valid user id
				console.error(`error updating user: ${e.message}`);
			}

			return fail(500, {
				validationErrors: undefined,
				message: 'Internal Server Error'
			});
		}
	}
} satisfies Actions;
