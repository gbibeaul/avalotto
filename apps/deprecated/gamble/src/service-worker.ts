/// <reference lib="webworker" />

self.addEventListener('install', (event) => {
	console.log('service worker installed', event);
});

self.addEventListener('push', (event: any) => {
	const { type, title, content } = JSON.parse(event.data.text());
	if (type === 'JACKPOT_PASSED_BY_10') {
		event.waitUntil(
			self.registration.showNotification(title, {
				body: content,
				icon: '/assets/metamask.png'
			})
		);
	}
});

export {};
