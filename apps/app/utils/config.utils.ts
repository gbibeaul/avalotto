import { ethers } from "ethers";

import configuration from "@gamble/config";
import { Chain } from "wagmi";

export enum NetworkAddress {
  Fuji = "https://api.avax-test.network/ext/bc/C/rpc",
  Avalanche = "https://api.avax.network/ext/bc/C/rpc",
  Local = "http://127.0.0.1:8545/",
}

const chains: { [key in keyof typeof NetworkAddress]: Chain[] } = {
  Fuji: [
    {
      id: 43113,
      name: "Avalanche FUJI C-Chain",
      rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
      testnet: true,
      blockExplorers: [
        { name: "testnet", url: "https://testnet.snowtrace.io/" },
      ],
    },
  ],
  Avalanche: [
    {
      id: 43114,
      name: "Avalanche Network",
      rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
      blockExplorers: [{ name: "avalanche", url: "https://snowtrace.io/" }],
    },
  ],
  Local: [
    {
      id: 43112,
      name: "Hardhat test",
      rpcUrls: ["http://127.0.0.1:8545/"],
      testnet: true,
    },
  ],
};

export type Network = "Local" | "Fuji" | "Avalanche";

export type LottoContractMode = "Lotto" | "LottoWinnerMock";

export type ContractKey = keyof typeof configuration.Local.contracts;

export type GamebitContract = {
  name: string;
  description: string;
  address: string;
  contractType: string;
};

export type EnvVar = string | undefined;

export function isNetwork(value: EnvVar): value is Network {
  return value === "Fuji" || value === "Avalanche" || value === "Local";
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

export const getChains = () => {
  if (!isNetwork(process.env.NEXT_PUBLIC_AVALANCHE_NETWORK)) {
    throw "Network id not set";
  }

  return chains[process.env.NEXT_PUBLIC_AVALANCHE_NETWORK];
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

export const network = networkParser();

export const addresses = {
  GBIT: configuration[network].contracts.GBIT.address,
  Authorization: configuration[network].contracts.GamebitAuthorizations.address,
  Governance: configuration[network].contracts.Governance.address,
  Treasury: configuration[network].contracts.Treasury.address,
  Auditor: configuration[network].contracts.Auditor.address,
  GameInstance: configuration[network].contracts.TestGame.address,
};

export const networkAddress = NetworkAddress[network];

export const provider = new ethers.providers.JsonRpcProvider(networkAddress);
