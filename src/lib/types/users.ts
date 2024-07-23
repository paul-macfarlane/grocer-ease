export type User = {
	id: string;
	authProvider: string;
	email: string;
	username: string;
	firstName: string;
	lastName: string;
	profilePicUrl: string;
};

export type GoogleUser = {
	id: string;
	email: string;
	verified_email: boolean;
	name: string;
	given_name: string;
	family_name: string;
	picture: string;
};

export type UpdateUser = {
	username: string;
};
