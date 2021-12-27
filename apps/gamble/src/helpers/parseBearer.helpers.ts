export const parseBearer = (authorization: string, apiKey) => {
	if (!authorization.startsWith('Bearer ')) {
		throw 'no Bearer token';
	}

	return authorization.slice(7) === apiKey.value;
};
