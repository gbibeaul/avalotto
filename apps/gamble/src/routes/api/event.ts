import { networkParser } from '../..//helpers/configParser.helpers';
import { NetworkIds } from '../../constants';
import { supabase } from '../../transport/supabase';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
	try {
		const { event } = await request.json();

		const res = await supabase.from('events').insert(event);

		return res;
	} catch (error) {
		console.error(error);
		return {
			error: JSON.stringify(error)
		};
	}
}

export async function get() {
	return 'hello';
}
