import { writable } from 'svelte/store';
import { isClientEthInjected } from '../helpers/ssr.helpers';

type WalletState = {
	walletAddress: string;
	metamaskDetected: boolean;
};

const initialState: WalletState = {
	walletAddress: '',
	metamaskDetected: false
};

const createWallet = () => {
	const wallet = writable(initialState);

	const updateWalletAddress = (wallets: string[]) => {
		if (wallets.length === 0) {
			fetch('/api/remove-metamask');
			wallet.update((s) => ({ ...s, walletAddress: '' }));
			return;
		}
		const walletAddress = wallets[0];
		if (walletAddress.length && isClientEthInjected()) {
			fetch('/api/set-metamask', {
				method: 'POST',
				body: JSON.stringify({ walletAddress })
			});
		}

		wallet.update((s) => ({ ...s, walletAddress }));
	};

	const init = () => {
		if (isClientEthInjected()) {
			wallet.update((s) => ({ ...s, metamaskDetected: true }));
			window.ethereum.on('accountsChanged', updateWalletAddress);
		} else {
			wallet.update((s) => ({ ...s, metamaskDetected: false }));
			fetch('/api/remove-metamask');
		}
	};

	return {
		subscribe: wallet.subscribe,
		init,
		updateWalletAddress,
		wallet
	};
};

export const walletStore = createWallet();

export const requestAccount = () => {
	window.ethereum.request({ method: 'eth_requestAccounts' }).then(walletStore.updateWalletAddress);
};
