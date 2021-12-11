import { supabase } from '../../transport/supabase';

export async function post(request) {
	const { email } = JSON.parse(request.body);

	//check if exists
	const { count } = await supabase
		.from('email_list')
		.select('email', { count: 'exact' })
		.eq('email', email);

	if (count === 0) {
		await supabase.from('email_list').insert({ email });
	}

	return {
		success: true
	};
}
