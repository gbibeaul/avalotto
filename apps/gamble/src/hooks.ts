import { parse } from 'cookie';
import { supabase } from './transport/supabase';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const rawCookie = await event.request.headers.get('cookie');
	const cookies =
		typeof rawCookie === 'string' ? {} : parse(await event.request.headers.get('cookie'));

	event.locals.walletAddress = cookies.walletAddress ? cookies.walletAddress : null;
	const response = await resolve(event);

	return response;
}

/** @type {import('@sveltejs/kit').GetSession} */
export async function getSession(event) {
	if (event?.locals?.walletAddress) {
		const walletAddress = event?.locals?.walletAddress;
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
