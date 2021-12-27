import { supabase } from '../../transport/supabase';

export async function post(request) {
	try {
		const { transaction_id, numbers, wallet_id } = JSON.parse(request.body);
		const res = await supabase
			.from('lotto_tickets')
			.upsert({ id: transaction_id, numbers, wallet_id });

		return res;
	} catch (error) {
		console.error(error);
		return error;
	}
}
