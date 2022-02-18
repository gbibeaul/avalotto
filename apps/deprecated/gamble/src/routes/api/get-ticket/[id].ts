import { supabase } from '../../../transport/supabase';

export async function get(req) {
	try {
		const { data, error } = await supabase
			.from('lotto_tickets')
			.select('numbers, wallet: wallet_id, createdAt: created_at')
			.eq('id', req.params.id);

		if (error) {
			throw error;
		}

		if (data) {
			if (data.length === 0) {
				return {
					status: 404,
					body: {
						error: 'Requested ticket not found'
					}
				};
			}
			return {
				body: data[0]
			};
		}
	} catch (error) {
		return error;
	}
}
