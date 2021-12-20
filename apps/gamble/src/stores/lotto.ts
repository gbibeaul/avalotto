import { BigNumber, utils } from 'ethers';
import { getProviders, lottoProvider } from '../transport';
import { writable } from 'svelte/store';

export enum LottoSteps {
	SELECT_PLAYS = 'selectPlays',
	REVIEW_TICKET = 'reviewTicket'
}

type LottoState = {
	currentStep: LottoSteps;
	plays: number[][];
	transactionId: string;
	jackpot: BigNumber;
};

const initialState: LottoState = {
	jackpot: BigNumber.from(0),
	currentStep: LottoSteps.SELECT_PLAYS,
	plays: [],
	transactionId: ''
};

const createLotto = () => {
	const { update, subscribe } = writable(initialState);

	const setPlays = (plays: number[][]) => {
		update((s) => ({ ...s, plays }));
	};

	const setStep = (currentStep: LottoSteps) => {
		update((s) => ({ ...s, currentStep }));
	};

	const setTransactionId = (transactionId: string) => {
		update((s) => ({ ...s, transactionId }));
	};

	const updateJackpot = (jackpot: BigNumber) => update((s) => ({ ...s, jackpot }));

	const listenJackpot = async () => {
		const lotto = await lottoProvider();
		const jackpot = await lotto.getCurrentJackpot();
		updateJackpot(jackpot);
		lotto.on('jackpotUpdated', updateJackpot);
	};

	const placeBet = async (numbers: number[][]) => {
		console.log('hello')
		try {
			const { lotto } = await getProviders();
			const betsToBigNumbers = numbers.map((bet) => bet.map(BigNumber.from));
			await lotto.bet(betsToBigNumbers, {
				value: utils.parseEther(String(numbers.length))
			});
		} catch (e) {
			console.error(e);
		}

	};

	// lotto listeners
	listenJackpot();

	return {
		subscribe,
		setPlays,
		setStep,
		setTransactionId,
		placeBet
	};
};

export const lottoStore = createLotto();
