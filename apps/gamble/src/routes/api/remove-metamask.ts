import { parse, serialize } from 'cookie';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ headers: { cookie } }) {
	const cookies = parse(cookie || '');

	return {
		status: 200,
		headers: {
			'Set-Cookie': serialize('address', '', {
				path: '/',
				expires: new Date(0)
			})
		}
	};
}
