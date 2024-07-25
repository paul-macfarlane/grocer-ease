import { db } from '$lib/db/client';
import { groceryLists } from '$lib/db/schema';
import { APIError, ForbiddenError, NotFoundError } from '$lib/types/errors';
import type { CreateGroceryList, GroceryList } from '$lib/types/groceryLists';
import { eq } from 'drizzle-orm';

export async function createGroceryList(
	userId: string,
	createGroceryList: CreateGroceryList
): Promise<GroceryList> {
	const grocerListRes = await db
		.insert(groceryLists)
		.values({ title: createGroceryList.title, createdByUserId: userId })
		.returning();
	if (!grocerListRes.length) {
		throw new APIError('insert grocery list returned 0 rows');
	}

	return grocerListRes[0];
}

export async function getGroceryListById(
	userId: string,
	groceryListId: string
): Promise<GroceryList> {
	const groceryListRes = await db
		.select()
		.from(groceryLists)
		.where(eq(groceryLists.id, groceryListId));
	if (!groceryListRes.length) {
		throw new NotFoundError('Grocery List');
	}

	if (groceryListRes[0].createdByUserId !== userId) {
		throw new ForbiddenError();
	}

	return groceryListRes[0];
}
