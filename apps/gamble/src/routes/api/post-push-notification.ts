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
		const { title, content } = await request.json();

		if(!(title && content)) {
			return {
				status: 400,
				message: "title or content missing"
			}
		}

		console.log(`Pushing to ${subscription}: titile - ${title} content: ${content}`);
		await webPush.sendNotification(subscription, JSON.stringify({ title, content }));

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
