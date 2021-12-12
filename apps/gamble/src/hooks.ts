import { parse } from 'cookie';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ request, resolve }) {
	const cookies = parse(request.headers.cookie || '');

	if (cookies.address) {
		request.locals.address = cookies.address
		return resolve(request);
	}

	request.locals.address = null;
	return resolve(request);
}

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(request) {
	return request?.locals?.address
		? {
				address: request.locals.address
		  }
		: {};
}
