self.addEventListener('install', (event) => {
	console.log('service worker installed', event);
});


self.addEventListener('push', event => {
	if(event.data.text() === "brand new push notification"){
		event.waitUntil(
			self.registration.showNotification("Jackpot updated", {
			  body: "One or more tracked repositories have new issues or pull requests.",
			})
		  );
	}
})

export {};