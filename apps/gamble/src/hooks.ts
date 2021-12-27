import { parse } from 'cookie';
import { supabase } from './transport/supabase';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ request, resolve }) {
	const cookies = parse(request.headers.cookie || '');

	if (cookies.walletAddress) {
		request.locals.walletAddress = cookies.walletAddress;
		return resolve(request);
	}

	request.locals.address = null;
	return resolve(request);
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
