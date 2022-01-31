import { supabase } from '../../transport/supabase';
import { emailProvider } from '../../transport/email';
import { parseBearer as isBearerValid } from '../../helpers/parseBearer.helpers';

/** */
/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
	try {
		const originatingAffress = import.meta.env.VITE_GMAIL_ADDRESS;

		if (typeof originatingAffress !== 'string') {
			throw 'originating email address not set in env vars';
		}

		const apiKey = await supabase.from('api_keys').select('value').eq('id', 1).limit(1);

		if (!isBearerValid(request.headers.get('authorization'), apiKey.data[0])) {
			return {
				message: 'not authorized',
				status: 403
			};
		}

		const { email = '', subject, text } = await request.json();

		const mailOptions = {
			from: String(import.meta.env.VITE_GMAIL_ADDRESS),
			to: email,
			subject,
			text
		};

		await new Promise((resolve, reject) => {
			emailProvider.sendMail(mailOptions, (err, info) => {
				if (err) {
					console.error(err);
					reject(err);
				} else {
					resolve(info);
				}
			});
		});

		return {
			status: 200,
			success: true
		};
	} catch (error) {
		console.error(error);
		return {
			error: 'Sending email notification failed'
		};
	}
}
