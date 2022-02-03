import { isClientEthInjected } from './ssr.helpers';
import { session } from '$app/stores';

export const updateWalletAddress = (wallets: string[]) => {
	if (wallets.length === 0) {
		fetch('/api/remove-metamask');
		session.update((s) => ({ ...s, walletAddress: '' }));
		return;
	}
	const walletAddress = wallets[0];
	if (walletAddress.length && isClientEthInjected()) {
		fetch('/api/set-metamask', {
			method: 'POST',
			body: JSON.stringify({ walletAddress })
		});
	}

	session.update((s) => ({ ...s, walletAddress }));
};

export const init = () => {
	if (isClientEthInjected()) {
		window.ethereum.on('accountsChanged', updateWalletAddress);
	} else {
		fetch('/api/remove-metamask');
	}
};

export const requestAccount = () => {
	window.ethereum.request({ method: 'eth_requestAccounts' }).then(updateWalletAddress);
};
