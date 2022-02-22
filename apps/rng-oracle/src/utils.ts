import configuration from "@gamble/config";

export enum NetworkAddress {
  Fuji = "https://api.avax-test.network/ext/bc/C/rpc",
  Avalanche = "https://api.avax.network/ext/bc/C/rpc",
  Local = "http://127.0.0.1:8545/",
}

export type Network = "Local" | "Fuji" | "Avalanche";

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
