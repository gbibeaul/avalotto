import { ethers, Signer } from 'ethers';
import { lottoConfigParser } from '../helpers/configParser.helpers';

export const lottoProvider = (signer?: Signer) => {
	const { abi, networkAddress, address } = lottoConfigParser();
	return new ethers.Contract(address, abi, signer ?? new ethers.providers.JsonRpcProvider(networkAddress));
};
