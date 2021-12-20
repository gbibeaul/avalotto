import Moralis from 'moralis';

export const moralisProvider = async () => {
	const serverUrl = import.meta.env.VITE_MORALIS_SERVER_URL;
	const appId = import.meta.env.VITE_MORALIS_APP_ID;

	if (typeof serverUrl !== 'string' || typeof appId !== 'string') {
		throw new Error('Missing Moralis server url or app id');
	}

	await Moralis.start({ serverUrl, appId });
};
