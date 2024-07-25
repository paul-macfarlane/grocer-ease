export class APIError extends Error {
	constructor(message: string, code?: number) {
		super(message);
		this.name = 'APIError';
		this.code = code ?? 500;
		Object.setPrototypeOf(this, APIError.prototype);
	}

	code: number;
}

export class ForbiddenError extends APIError {
	constructor(message?: string) {
		super(message ?? 'Forbidden', 403);
		this.name = 'ForbiddenError';
		Object.setPrototypeOf(this, ForbiddenError.prototype);
	}
}

export class NotFoundError extends APIError {
	constructor(resourceName: string, message?: string) {
		super(message ?? `${resourceName} not found`, 404);
		this.name = 'NotFoundError';
		Object.setPrototypeOf(this, NotFoundError.prototype);
	}
}
