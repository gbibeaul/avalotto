import { serialize } from 'cookie';
import { supabase } from '../../transport/supabase';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
	try {
		const body = await request.json();
		const { walletAddress } = body;

		await supabase.from('wallets_ids').upsert({ id: walletAddress });

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
	} catch (error) {
		console.error(error);
		return {
			error: JSON.stringify(error)
		};
	}
}
