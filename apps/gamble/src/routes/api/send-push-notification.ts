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
		const { subscription, type, title, content } = await request.json();

		if(!type) {
			return {
				status: 400,
				message: "No notification type is in the request"
			}
		}

		console.log(`Pushing to ${subscription.endpoint} => type - ${type}  titile - ${title} content: ${content}`);
		await webPush.sendNotification(subscription, JSON.stringify({ type, title, content }));

		return {
			status: 200
		}
	} catch (error) {
		console.error(error);
		return {
			status: 500,
			error: JSON.stringify(error)
		};
	}
}
