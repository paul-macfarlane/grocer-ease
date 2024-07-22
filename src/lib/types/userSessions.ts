export const GOOGLE_CSRF_STATE_NAME = 'csrf_state';
export const GOOGLE_COOKIE_PATH = '/auth/google';

export type UserSession = {
	id: string;
	userId: string;
	csrfToken: string;
	authProvider: string;
	createdAt: Date;
	expiresAt: Date;
};
