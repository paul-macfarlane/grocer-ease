export type GroceryList = {
	id: string;
	title: string;
	budget: number | null;
	createdByUserId: string;
	createdAt: Date;
	updatedAt: Date;
};

export type CreateGroceryList = {
	title: string;
};
