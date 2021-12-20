import { writable } from 'svelte/store';
import MetaMaskOnboarding from '@metamask/onboarding';

import { getProviders } from '../transport';
import { moralisProvider } from '../transport/moralis';
import { isClientEthInjected } from '../helpers/ssr.helpers';

// deprecating this to instead only store wallet information in this store
type State = {
	userAddress: string;
	ethereumDetected: boolean;
	errors: null | null;
	loading: boolean;
	buying: boolean;
};

const initialState: State = {
	userAddress: '',
	ethereumDetected: false,
	loading: true,
	errors: null,
	buying: false
};

const createState = () => {
	const { update, subscribe } = writable(initialState);

	const updateUserAddress = async (userAddress: string[]) =>
		update((s) => ({ ...s, userAddress: userAddress[0] }));

	const updateEthereumDetected = (ethereumDetected: boolean) =>
		update((s) => ({ ...s, ethereumDetected }));

	const updateErrors = (errors: null | null) => update((s) => ({ ...s, errors }));

	const updateBuying = (buying: boolean) => update((s) => ({ ...s, buying }));

	const downloadMetamask = async () => {
		const onboarding = new MetaMaskOnboarding();
		onboarding.startOnboarding();
	};

	const connectMetamask = async () => {
		const { metamask } = await getProviders();
		// @ts-ignore
		metamask.request({ method: 'eth_requestAccounts' });
	};

	const initialLoadMetamask = async () => {
		if (isClientEthInjected()) {
			const { ethereum, lotto } = await getProviders();

			// @ts-ignore
			window.ethereum.on('accountsChanged', updateUserAddress);

			try {
				const userAddress = await ethereum.getSigner().getAddress();
				fetch('/api/set-metamask', {
					method: 'POST',
					body: JSON.stringify({
						address: userAddress
					})
				});

				update((state) => ({
					...state,
					userAddress,
					ethereumDetected: true
				}));
			} catch (e) {
				updateErrors(e);
			}
		}
	};
	const initialMoralis = async () => {
		const Moralis = await moralisProvider();
		let user = Moralis.User.current();
		console.log(user);
	};

	if (isClientEthInjected()) {
		updateEthereumDetected(true);
		initialLoadMetamask();
		initialMoralis();
	}

	return {
		subscribe,
		downloadMetamask,
		connectMetamask,
		updateBuying,
		initialLoadMetamask
	};
};

export const stateStore = createState();
