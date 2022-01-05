import { BigNumber, utils } from 'ethers';
import { get } from 'svelte/store';
import { getProviders, lottoProvider } from '../transport';
import { writable } from 'svelte/store';
import { walletStore } from './wallet';
import type { Events } from '../types';
import { networkParser } from '../helpers/configParser.helpers';
import { NetworkIds } from '../constants';

export enum LottoSteps {
	SELECT_PLAYS = 'selectPlays',
	REVIEW_TICKET = 'reviewTicket',
	CONFIRMING = 'confirming',
	CONFIRMED = 'confirmed'
}

const getRandom = () => Math.floor(Math.random() * 100);

type LottoState = {
	currentStep: LottoSteps;
	plays: number[][];
	transactionId: string;
	jackpot: BigNumber;
	txHash: string;
	nextDrawOn: number;
	gameId: number;
	currency: number;
};

const initialState: LottoState = {
	jackpot: BigNumber.from(0),
	currentStep: LottoSteps.SELECT_PLAYS,
	plays: [[getRandom(), getRandom(), getRandom()]],
	transactionId: '',
	txHash: '',
	nextDrawOn: undefined,
	gameId: 1,
	currency: 1
};

const createLotto = () => {
	const { update, subscribe } = writable(initialState);

	const setPlays = (plays: number[][]) => {
		update((s) => ({ ...s, plays }));
	};

	const resetState = () => {
		const plays = [[getRandom(), getRandom(), getRandom()]];
		const currentStep = LottoSteps.SELECT_PLAYS;
		const transactionId = '';
		const txHash = '';

		update((s) => ({ ...s, plays, currentStep, transactionId, txHash }));
	};

	const requestAccount = () => {
		window.ethereum
			.request({ method: 'eth_requestAccounts' })
			.then(walletStore.updateWalletAddress);
	};

	const setStep = (currentStep: LottoSteps) => {
		if (currentStep === LottoSteps.REVIEW_TICKET) {
			requestAccount();
		}

		update((s) => ({ ...s, currentStep }));
	};

	const setTransactionId = (transactionId: string) => {
		update((s) => ({ ...s, transactionId }));
	};

	const setTxHash = (txHash: string) => {
		update((s) => ({ ...s, txHash }));
	};

	const updateJackpot = (jackpot: BigNumber) => {
		update((s) => ({ ...s, jackpot }));
	};

	const updateNextDrawOn = (nextDrawOn: BigNumber) => {
		update((s) => ({ ...s, nextDrawOn: nextDrawOn.toNumber() }));
	};

	const getInitialInfo = async () => {
		const lotto = await lottoProvider();
		const jackpot = await lotto.getCurrentJackpot();
		const nextDrawTime = await lotto.getNextDrawTime();

		updateJackpot(jackpot);
		updateNextDrawOn(nextDrawTime);

		lotto.on('jackpotUpdated', updateJackpot)

	};

	const placeBet = async (numbers: number[][]) => {
		try {
			requestAccount();
			const value = numbers.length;
			const { lotto } = await getProviders();
			const betsToBigNumbers = numbers.map((bet) => bet.map(BigNumber.from));

			const { walletAddress } = get(walletStore.wallet);

			const transaction = await lotto.bet(betsToBigNumbers, {
				value: utils.parseEther(String(value))
			});

			const tx = await transaction.wait(1);
			setTxHash(tx.transactionHash);

			const event: Events = {
				game_id: initialState.gameId,
				event_type: 1,
				event_value: value,
				incentive_value: 0,
				network: NetworkIds[networkParser()],
				currency: initialState.currency
			};

			await fetch('/api/save-ticket', {
				method: 'POST',
				body: JSON.stringify({
					transaction_id: tx.transactionHash,
					numbers: betsToBigNumbers,
					wallet_id: walletAddress
				})
			});

			await fetch('/api/event', {
				method: 'POST',
				body: JSON.stringify({ event })
			});

			setTimeout(() => {
				setStep(LottoSteps.CONFIRMED);
			});
		} catch (e) {
			console.error(e);
		}
	};

	// lotto listeners
	getInitialInfo();

	return {
		subscribe,
		setPlays,
		setStep,
		setTransactionId,
		placeBet,
		updateJackpot,
		updateNextDrawOn,
		resetState
	};
};

export const lottoStore = createLotto();
