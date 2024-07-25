import type { CreateGroceryList } from '$lib/types/groceryLists';
import { z } from 'zod';

export type ParseCreateGroceryListFormErrors = {
	title?: string;
};

type ParseCreateGroceryListFormRes = {
	data?: CreateGroceryList;
	errors?: ParseCreateGroceryListFormErrors;
};

export function parseCreateGroceryListForm(formData: FormData): ParseCreateGroceryListFormRes {
	const response: ParseCreateGroceryListFormRes = {};

	const titleRes = z
		.string({ message: 'must be a string' })
		.min(1, 'must be at least 1 character')
		.max(256, 'cannot be more than 256 characters')
		.safeParse(formData.get('title')?.toString().trim());
	if (titleRes.data) {
		response.data = {
			title: titleRes.data
		};
	} else {
		response.errors = {
			title: titleRes.error?.errors.map((error) => error.message).join(',')
		};
	}

	return response;
}
