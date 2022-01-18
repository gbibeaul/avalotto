import { supabase } from '../../transport/supabase';
import { lottoProvider } from '../../transport/lotto'
import { utils } from 'ethers';

export async function post(request) {
	try {
		const lotto = await lottoProvider();
		const jackpot = await lotto.getCurrentJackpot();

		const { data } = await supabase
			.from('fact_jackpot')
			.insert({ jackpot: parseFloat(utils.formatEther(jackpot)) });
		return data;
	} catch (error) {
		console.error(error);
		return error;
	}
}
