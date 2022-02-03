import { serialize } from 'cookie';
import { supabase } from '../../transport/supabase';

export async function post({ request }) {
	const { walletAddress } = await request.json();

	await supabase.from('wallets_ids').upsert({ id: walletAddress });

	console.log('getting called')

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
