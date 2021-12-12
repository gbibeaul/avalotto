import configuration from '@gamble/config';
import { config } from 'dotenv';
import { abi as lottoWinnerMockAbi } from '@gamble/lotto-winner-mock';
import { abi as lottoAbi } from '@gamble/lotto';

config();

enum Network {
	Fuji = 'https://api.avax-test.network/ext/bc/C/rpc',
	Avalanche = 'https://api.avax.network/ext/bc/C/rpc',
	Local = 'http://127.0.0.1:8545/'
}

enum LottoContractMode {
	lotto = 'Lotto',
	lottoWinnerMock = 'LottoWinnerMock'
}

const abiMap = {
	[LottoContractMode.lottoWinnerMock]: lottoWinnerMockAbi,
	[LottoContractMode.lotto]: lottoAbi
};

function isNetwork(value: string): value is Network {
	return (value as Network) in Network;
}

function isLottoContractMode(value: string): value is LottoContractMode {
	return (value as LottoContractMode) in LottoContractMode;
}

export const lottoConfigParser = () => {
	if (!isNetwork(process.env.VITE_AVALANCHE_NETWORK)) {
		throw new Error('Invalid network');
	}

	if (!isLottoContractMode(process.env.VITE_LOTTO_CONTRACT_MODE)) {
		throw new Error('Invalid lotto contract mode');
	}

	const network: Network = process.env.VITE_AVALANCHE_NETWORK;
	const lottoContractMode: LottoContractMode = process.env.VITE_LOTTO_CONTRACT_MODE;

	return {
		address: config[network].contracts[lottoContractMode].address,
		abi: abiMap[lottoContractMode],
		networkAddress: Network[network]
	};
};
