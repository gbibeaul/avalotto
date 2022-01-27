import { session } from '$app/stores';
import { networkParser } from '../..//helpers/configParser.helpers';
import { NetworkIds } from '../../constants';
import { supabase } from '../../transport/supabase';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
	try {
		const { email = '', discord = '', signature, address, browser } = await request.json();

		const network_id = NetworkIds[networkParser()];

		if (!signature) {
			return {
				error: 'signature needed'
			};
		}

		// {
		// 	"endpoint": "https://fcm.googleapis.com/fcm/send/cNhf8keE9tQ:APA91bH1oJ6pZ2ss60QVNHTj_HFeE2hpZzjZ8vb9Zry7TraFxoOV2XMjv3rqvbaRqCKf5AawOgb7FCGwWlpH18i7Va5Uxc1XV9ECcYtMbfJXA3cU5HbAL3AUWPUDL0AJmsz2AR0zKGVQ",
		// 	"expirationTime": null,
		// 	"keys": {
		// 	  "p256dh": "BD4zIv5ql7d8LA0gwKBxl2GN9A71zhfBHcBE-mbXk4Y2GmvtIQmohyt1V7aeGt1Jigen6_wBo_n7HmHN3YFlO8w",
		// 	  "auth": "DK-ZSJLgfR2G0Zl_2eG1OQ"
		// 	}
		//   }

		const res = await supabase
			.from('notification_targets')
			.upsert({
				id: address.toLowerCase(),
				enabled: true,
				browser,
				email,
				discord,
				signature,
				network_id
			});

		return res;
	} catch (error) {
		console.error(error);
		return {
			error: JSON.stringify(error)
		};
	}
}
