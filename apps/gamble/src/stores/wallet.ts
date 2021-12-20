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

	const updateWalletAddress = (wallets: string[]) => [
		update((s) => ({ ...s, walletAddress: wallets[0] }))
	];

	const init = () => {
		if (isClientEthInjected()) {
			window.ethereum.request({ method: 'eth_requestAccounts' }).then(updateWalletAddress);
		}

		window.ethereum.on('accountsChanged', updateWalletAddress);
	};

	return {
		subscribe,
		init
	};
};

export const walletStore = createWallet();
