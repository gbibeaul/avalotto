import { BigNumber, providers, utils } from 'ethers';
import MetaMaskOnboarding from '@metamask/onboarding';
import { getProviders, lottoProvider } from '../transport';
import { writable } from 'svelte/store';
import { isClientEthInjected } from '../helpers/ssr.helpers';

type WalletState = {
	walletAddress: string;
};

const initialState: WalletState = {
	walletAddress: ''
};

const createWallet = () => {
	const { update, subscribe } = writable(initialState);

	const updateWalletAddress = (wallets: string[]) => {
		if(wallets.length === 0) {
			fetch('/api/remove-metamask');
			update((s) => ({ ...s, walletAddress: '' }));
			return
		}
		const walletAddress = wallets[0];
		if(walletAddress.length && isClientEthInjected()) {
		fetch('/api/set-metamask', {
			method: 'POST',
			body: JSON.stringify({ walletAddress })
		});
		}

		update((s) => ({ ...s, walletAddress }));
	};



	const init = () => {
		if (isClientEthInjected()) {
			window.ethereum.on('accountsChanged', updateWalletAddress);
		}
	};

	return {
		subscribe,
		init,
		updateWalletAddress
	};
};

export const walletStore = createWallet();
