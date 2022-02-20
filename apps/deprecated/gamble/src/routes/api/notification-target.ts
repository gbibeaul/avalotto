import { session } from '$app/stores';
import { networkParser } from '../..//helpers/configParser.helpers';
import { NetworkIds } from '../../constants';
import { supabase } from '../../transport/supabase';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
	try {
		const { email = '', discord = '', pushSubscription, signature, address, browser } = await request.json();

		const network_id = NetworkIds[networkParser()];

		if (!signature) {
			return {
				error: 'signature needed'
			};
		}

		const res = await supabase
			.from('notification_targets')
			.upsert({
				id: address.toLowerCase(),
				enabled: true,
				browser,
				push_subscription: pushSubscription,
				email,
				discord,
				signature,
				network_id
			});

		return res;
	} catch (error) {
		console.error(error);
		return {
			error: JSON.stringify(error)
		};
	}
}
