import { supabase } from '../../transport/supabase';
import webPush from 'web-push';

webPush.setVapidDetails(
	'https://gamebit.app',
	'BJcygaFAR7wseePq54m06Xqxt7XbSc3cZphJnG34bQTPt-ZLgels4rokGm_WXKP5VPoF3KwwNAftv9147crXZtk',
	'HHPubvZrYlX3wne-GvtI8JknfhyHc-yi6TcMPy2R7ho'
);

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
	try {
		const subscription = await request.json();
		console.log({subscription})
		await webPush.sendNotification(subscription, 'brand new push notification');
	} catch (error) {
		console.error(error);
		return {
			error: JSON.stringify(error)
		};
	}
}
