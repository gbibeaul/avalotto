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
					'https://fcm.googleapis.com/fcm/send/c_18yHbUyRI:APA91bEBUedyvUj8rHPluYArN1ZyUdqlAnFDqn_lwA9a31ToO1sikndd_whgIp6CQawo8ahm9xnz5fBpuxlGwvK9rnRW5mEXR6rhhMQIKQBaA6mxzjGGGD5S6HUf_rvhbVXegPEoCvHn',
				keys: {
					p256dh:
						'BJiyDIreMFGmsU5iJaplYfhipI6ZinuHb66zmA5Vqurf_l4MbTojpNhP5sFBDOfnjABQnWuAtC9iSbMuAUeYNks',
					auth: 'DR1bFwgJcxcuVeG34svGew'
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