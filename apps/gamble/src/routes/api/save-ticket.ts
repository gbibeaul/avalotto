import { supabase } from '../../transport/supabase';

export async function post(request) {
	const { transaction_id, numbers, wallet_id } = JSON.parse(request.body);

	//check if exists
	const { count } = await supabase
		.from('tickets')
		.select('transaction_id', { count: 'exact' })
		.eq('transaction_id', transaction_id);

	if (count === 0) {
		await supabase.from('tickets').insert({ transaction_id, numbers, wallet_id });
	}

	return {
		success: true
	};
}
