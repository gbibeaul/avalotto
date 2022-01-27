self.addEventListener('install', (event) => {
	console.log('service worker installed', event);
});


self.addEventListener('push', event => {
	console.log('push eveent', event)
})