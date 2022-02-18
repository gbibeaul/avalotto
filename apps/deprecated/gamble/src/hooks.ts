import { supabase } from './transport/supabase';

function getCookie(cname, cookieString) {
	let name = cname + '=';
	let decodedCookie = decodeURIComponent(cookieString);
	let ca = decodedCookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return '';
}

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const rawCookie = await event.request.headers.get('cookie');
	const walletAddress = getCookie('walletAddress', rawCookie);

	console.log(walletAddress, 'in handle')

	event.locals.walletAddress = walletAddress.length > 0 ? walletAddress : null;
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
