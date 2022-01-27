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
		await webPush.sendNotification(
			{
				endpoint:
					'https://fcm.googleapis.com/fcm/send/cNhf8keE9tQ:APA91bH1oJ6pZ2ss60QVNHTj_HFeE2hpZzjZ8vb9Zry7TraFxoOV2XMjv3rqvbaRqCKf5AawOgb7FCGwWlpH18i7Va5Uxc1XV9ECcYtMbfJXA3cU5HbAL3AUWPUDL0AJmsz2AR0zKGVQ',
				keys: {
					p256dh:
						'BD4zIv5ql7d8LA0gwKBxl2GN9A71zhfBHcBE-mbXk4Y2GmvtIQmohyt1V7aeGt1Jigen6_wBo_n7HmHN3YFlO8w',
					auth: 'DK-ZSJLgfR2G0Zl_2eG1OQ'
				}
			},
			'brand new push notification'
		);
	} catch (error) {
		console.error(error);
		return {
			error: JSON.stringify(error)
		};
	}
}
