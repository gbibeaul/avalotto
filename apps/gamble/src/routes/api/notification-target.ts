import { networkParser } from '../..//helpers/configParser.helpers';
import { NetworkIds } from '../../constants';
import { supabase } from '../../transport/supabase';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post(request) {
	try {
		if (typeof request.body !== 'string') {
			throw 'Body is not a stringified json';
		}

		const { email = '', discord = '', signature, address, browser } = JSON.parse(request.body);

		const network_id = NetworkIds[networkParser()];

		if (!signature) {
			return {
				error: 'signature needed'
			};
		}

		const res = await supabase
			.from('notification_targets')
			.upsert({ id: address, enabled: true, browser, email, discord, signature, network_id });

		return res;
	} catch (error) {
		console.error(error);
		return {
			error: JSON.stringify(error)
		};
	}
}
