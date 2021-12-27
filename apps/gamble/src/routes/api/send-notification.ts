import { supabase } from '../../transport/supabase';
import { emailProvider } from '../../transport/email';
import { parseBearer as isBearerValid } from '../../helpers/parseBearer.helpers'


/** */
/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post(request) {
	try {
		const originatingAffress = import.meta.env.VITE_GMAIL_ADDRESS;

		if (typeof originatingAffress !== 'string') {
			throw 'originating email address not set in env vars';
		}

		const apiKey = await supabase.from('api_keys').select('value').eq('id', 1).limit(1)
		
		if(!isBearerValid(request.headers.authorization, apiKey.data[0])) {
			return {
				message: 'not authorized',
				status: 403
			}
		}

		const { email = '', subject, text } = request.body;

		const mailOptions = {
			from: String(import.meta.env.VITE_GMAIL_ADDRESS),
			to: email,
			subject,
			text
		};

		emailProvider.sendMail(mailOptions);

		return {
			success: true
		};
	} catch (error) {
		console.error(error);
		return {
			error: 'Sending notification failed'
		};
	}
}
