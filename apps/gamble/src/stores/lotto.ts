import { BigNumber, utils } from 'ethers';
import { getProviders, lottoProvider } from '../transport';
import { writable } from 'svelte/store';

export enum LottoSteps {
	SELECT_PLAYS = 'selectPlays',
	REVIEW_TICKET = 'reviewTicket',
	CONFIRMING = 'confirming',
	CONFIRMED = 'confirmed'
}

type LottoState = {
	currentStep: LottoSteps;
	plays: number[][];
	transactionId: string;
	jackpot: BigNumber;
	txHash: string;
};

const initialState: LottoState = {
	jackpot: BigNumber.from(0),
	currentStep: LottoSteps.SELECT_PLAYS,
	plays: [],
	transactionId: '',
	txHash: ''
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

	const setTxHash = (txHash: string) => {
		update((s) => ({ ...s, txHash }));
	};

	const updateJackpot = (jackpot: BigNumber) => update((s) => ({ ...s, jackpot }));

	const listenJackpot = async () => {
		const lotto = await lottoProvider();
		const jackpot = await lotto.getCurrentJackpot();
		updateJackpot(jackpot);
		lotto.on('jackpotUpdated', updateJackpot);
	};

	const placeBet = async (numbers: number[][]) => {
		try {
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
