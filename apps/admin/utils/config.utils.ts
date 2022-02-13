import configuration from "@gamble/config";
import { abi as lottoWinnerMockAbi } from "@gamble/lotto-mock-winner";
import { abi as lottoAbi } from "@gamble/lotto";
import { abi as gamebitAuthorizationAbi } from "@gamble/gamebit-authorizations";
import { abi as infraAbi } from "@gamble/infra";

export enum NetworkAddress {
  Fuji = "https://api.avax-test.network/ext/bc/C/rpc",
  Avalanche = "https://api.avax.network/ext/bc/C/rpc",
  Local = "http://127.0.0.1:8545/",
}

export type Network = "Local" | "Fuji" | "Avalanche";

export type LottoContractMode = "Lotto" | "LottoWinnerMock";

export type ContractKey = keyof typeof configuration.Local.contracts;

export type GamebitContract = {
  name: string;
  description: string;
  owner: string;
  address: string;
  contractType: string;
};

export type EnvVar = string | undefined;

export function isNetwork(value: EnvVar): value is Network {
  return value === "Fuji" || value === "Avalanche" || value === "Local";
}

export function isLottoContractMode(value: EnvVar): value is LottoContractMode {
  return value === "Lotto" || value === "LottoWinnerMock";
}

export function isContractInConfig(
  contractName: string
): contractName is ContractKey {
  return contractName in configuration.Local.contracts;
}

export const networkParser = () => {
  if (!isNetwork(process.env.NEXT_PUBLIC_AVALANCHE_NETWORK)) {
    throw "Network id not set";
  }

  return process.env.NEXT_PUBLIC_AVALANCHE_NETWORK;
};

/**
 *
 * @returns a configuration that can by used in ethersjs to interact with the lottery contract
 */
export const lottoConfigParser = () => {
  if (!isNetwork(process.env.NEXT_PUBLIC_AVALANCHE_NETWORK)) {
    throw new Error("Invalid network");
  }

  if (!isLottoContractMode(process.env.NEXT_PUBLIC_LOTTO_CONTRACT_MODE)) {
    throw new Error("Invalid lotto contract mode");
  }

  const network: Network = process.env.NEXT_PUBLIC_AVALANCHE_NETWORK;
  const lottoContractMode: LottoContractMode =
    process.env.NEXT_PUBLIC_LOTTO_CONTRACT_MODE;

  const abiMap = {
    LottoWinnerMock: lottoWinnerMockAbi,
    Lotto: lottoAbi,
  };

  return {
    //@ts-ignore
    address: configuration[network].contracts[lottoContractMode].address,
    abi: abiMap[lottoContractMode],
    networkAddress: NetworkAddress[network],
  };
};

/**
 *
 * @returns a configuration that can by used in ethersjs to interact with the authorization contract
 */
export const authorizationConfigParser = () => {
  if (!isNetwork(process.env.NEXT_PUBLIC_AVALANCHE_NETWORK)) {
    throw new Error("Invalid network");
  }

  const network: Network = process.env.NEXT_PUBLIC_AVALANCHE_NETWORK;

  return {
    address: configuration[network].contracts.GamebitAuthorizations.address,
    abi: gamebitAuthorizationAbi,
    networkAddress: NetworkAddress[network],
  };
};

/**
 *
 * @returns a configuration that can by used in ethersjs to interact with the treasury contract
 */
export const treasuryConfigParser = () => {
  if (!isNetwork(process.env.NEXT_PUBLIC_AVALANCHE_NETWORK)) {
    throw new Error("Invalid network");
  }

  const network: Network = process.env.NEXT_PUBLIC_AVALANCHE_NETWORK;

  return {
    address: configuration[network].contracts.Infra.address,
    abi: infraAbi,
    networkAddress: NetworkAddress[network],
  };
};

export const getGameByName = (name: string) => {
  if (!isNetwork(process.env.NEXT_PUBLIC_AVALANCHE_NETWORK)) {
    throw new Error("Invalid network");
  }

  if (!isContractInConfig(name)) {
    throw new Error("Invalid contract name");
  }

  const network: Network = process.env.NEXT_PUBLIC_AVALANCHE_NETWORK;

  const game = configuration[network].contracts[name];

  return {
    ...game,
  };
};
