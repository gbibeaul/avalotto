import { parse } from 'cookie';
import { supabase } from './transport/supabase';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve,  }) {
	const response = await resolve(event)
	const cookies = parse(response.headers.cookie || '');

	event.locals.walletAddress = cookies.walletAddress ? cookies.walletAddress : null;


	return response
}

/** @type {import('@sveltejs/kit').GetSession} */
export async function getSession(request) {
	if (request?.locals?.walletAddress) {
		const walletAddress = request?.locals?.walletAddress;
		const { data } = await supabase
			.from('notification_targets')
			.select()
			.eq('id', walletAddress.toLowerCase());
		return {
			walletAddress,
			notifications: data[0]
		};
	}

	return {};
}
