import configuration from '@gamble/config';
import { abi as lottoWinnerMockAbi } from '@gamble/lotto-mock-winner';
import { abi as lottoAbi } from '@gamble/lotto';


enum Network {
	Fuji = 'https://api.avax-test.network/ext/bc/C/rpc',
	Avalanche = 'https://api.avax.network/ext/bc/C/rpc',
	Local = 'http://127.0.0.1:8545/'
}

enum LottoContractMode {
	Lotto = 'Lotto',
	LottoWinnerMock = 'LottoWinnerMock'
}

const abiMap = {
	[LottoContractMode.LottoWinnerMock]: lottoWinnerMockAbi,
	[LottoContractMode.Lotto]: lottoAbi
};

export function isNetwork(value: string | boolean) : value is Network {
	return (value as Network) in Network;
}

export function isLottoContractMode(value: string | boolean): value is LottoContractMode {
	return (value as LottoContractMode) in LottoContractMode;
}

export const networkParser = () => {
	if(!isNetwork(import.meta.env.VITE_AVALANCHE_NETWORK)) {
		throw 'Network id not set'
	}

	return import.meta.env.VITE_AVALANCHE_NETWORK
}

export const lottoConfigParser = () => {
	if (!isNetwork(import.meta.env.VITE_AVALANCHE_NETWORK)) {
		throw new Error('Invalid network');
	}

	if (!isLottoContractMode(import.meta.env.VITE_LOTTO_CONTRACT_MODE)) {
		throw new Error('Invalid lotto contract mode');
	}

	const network: Network = import.meta.env.VITE_AVALANCHE_NETWORK;
	const lottoContractMode: LottoContractMode = import.meta.env.VITE_LOTTO_CONTRACT_MODE;

	return {
		address: configuration[network].contracts[lottoContractMode].address,
		abi: abiMap[lottoContractMode],
		networkAddress: Network[network]
	};
};


