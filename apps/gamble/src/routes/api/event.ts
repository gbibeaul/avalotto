import { networkParser } from '../..//helpers/configParser.helpers';
import { NetworkIds } from '../../constants';
import { supabase } from '../../transport/supabase';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post(request) {
	try {
        console.log('hello')
		const { event } = JSON.parse(request.body);

        console.log(event)

		const res = await supabase.from('events').insert( event );

        console.log(res)

		return res;
	} catch (error) {
		console.error(error);
		return {
			error: JSON.stringify(error)
		};
	}
}

export async function get() {
    return 'hello'
}