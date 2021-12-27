import { parse, serialize } from 'cookie';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {

	// expires the wallet cookie when removed
	return {
		status: 200,
		headers: {
			'Set-Cookie': serialize('walletAddress', '', {
				path: '/',
				expires: new Date(0)
			})
		}
	};
}
