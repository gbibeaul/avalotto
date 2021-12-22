import { serialize } from 'cookie';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post(req) {
	const { walletAddress } = JSON.parse(req.body);
	return {
		status: 201,
		headers: {
			'Set-Cookie': serialize('walletAddress', walletAddress, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 7 // one week
			})
		},
		body: {
			message: 'Successfully signed up'
		}
	};
}
