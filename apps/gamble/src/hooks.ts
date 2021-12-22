import { parse } from 'cookie';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ request, resolve }) {
	const cookies = parse(request.headers.cookie || '');

	if (cookies.walletAddress) {
		request.locals.walletAddress = cookies.walletAddress
		return resolve(request);
	}

	request.locals.address = null;
	return resolve(request);
}

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(request) {
	return request?.locals?.walletAddress
		? {
			walletAddress: request.locals.walletAddress
		  }
		: {};
}
