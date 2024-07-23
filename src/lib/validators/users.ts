import type { UpdateUser } from '$lib/types/users';
import { z } from 'zod';

export type UpdateUserValidationErrors = {
	username: string;
};

type ParseUpdateUserFormRes = {
	data?: UpdateUser;
	errors?: UpdateUserValidationErrors;
};

export function parseUpdateUserForm(form: FormData): ParseUpdateUserFormRes {
	const response: ParseUpdateUserFormRes = {};

	const usernameRes = z
		.string({ message: 'must be a string' })
		.min(8, 'must be at least 8 characters')
		.max(20, 'cannot be more than 20 characters')
		.safeParse(form.get('username'));
	if (usernameRes.data) {
		response.data = {
			username: usernameRes.data
		};
	} else {
		response.errors = {
			username: usernameRes.error!.errors.map((error) => error.message).join(',')
		};
	}

	return response;
}
