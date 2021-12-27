import { BigNumber, utils } from 'ethers';
import { getProviders, lottoProvider } from '../transport';
import { writable } from 'svelte/store';
import { walletStore } from './wallet';
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
};

const initialState: LottoState = {
	jackpot: BigNumber.from(0),
	currentStep: LottoSteps.SELECT_PLAYS,
	plays: [[getRandom(), getRandom(), getRandom()]],
	transactionId: '',
	txHash: '',
	nextDrawOn: undefined
};

const createLotto = () => {
	const { update, subscribe } = writable(initialState);

	const setPlays = (plays: number[][]) => {
		update((s) => ({ ...s, plays }));
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
		update((s) => ({ ...s, jackpot}));
	}
		
	const updateNextDrawOn = (nextDrawOn: BigNumber) => {
		update((s) => ({ ...s, nextDrawOn: nextDrawOn.toNumber()}))
	}

	const getInitialInfo = async () => {
		const lotto = await lottoProvider();
		const jackpot = await lotto.getCurrentJackpot();
		updateJackpot(jackpot);

		const nextDrawTime = await lotto.getNextDrawTime();
		updateNextDrawOn(nextDrawTime);

		const betPrice = await lotto.getTicketPrice();
		lotto.on('jackpotUpdated', updateJackpot);
	};

	const placeBet = async (numbers: number[][]) => {
		try {
			requestAccount();
			const { lotto } = await getProviders();
			const betsToBigNumbers = numbers.map((bet) => bet.map(BigNumber.from));
			const transaction = await lotto.bet(betsToBigNumbers, {
				value: utils.parseEther(String(numbers.length))
			});
			setStep(LottoSteps.CONFIRMING);
			const tx = await transaction.wait(1);
			setTxHash(tx.transactionHash);
			setStep(LottoSteps.CONFIRMED);
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
		updateNextDrawOn
	};
};

export const lottoStore = createLotto();
