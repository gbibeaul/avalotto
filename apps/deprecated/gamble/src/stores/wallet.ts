import { writable } from 'svelte/store';
import { isClientEthInjected } from '../helpers/ssr.helpers';

type WalletState = {
	walletAddress: string;
};

const initialState: WalletState = {
	walletAddress: ''
};

const createWallet = () => {
	const wallet = writable(initialState);

	const updateWalletAddress = (wallets: string[]) => {
		if (wallets.length === 0) {
			fetch('/api/remove-metamask');
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
			window.ethereum.on('accountsChanged', updateWalletAddress);
		} else {
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

export const disconnectAccount = () => {
	window.ethereum.request({
		method: 'wallet_requestPermissions',
		params: [
			{
				eth_accounts: {}
			}
		]
	});
};
