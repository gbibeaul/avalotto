import { supabase } from '../../transport/supabase';
import { lottoProvider } from '../../transport/lotto';
import { parseBearer as isBearerValid } from '../../helpers/parseBearer.helpers';
import { utils } from 'ethers';

export async function get(request) {
	try {
		const apiKey = await supabase.from('api_keys').select('value').eq('id', 1).limit(1);

		if (!isBearerValid(request.headers.authorization, apiKey.data[0])) {
			return {
				message: 'not authorized',
				status: 403
			};
		}

		const lotto = await lottoProvider();
		const jackpot = await lotto.getCurrentJackpot();

		return { status: 200, body: { jackpot: parseFloat(utils.formatEther(jackpot)) } };
	} catch (error) {
		console.error(error);
		return error;
	}
}
