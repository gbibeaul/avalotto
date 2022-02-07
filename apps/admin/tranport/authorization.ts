import { ethers, Signer } from "ethers";
import { authorizationConfigParser } from "utils/config.utils";

export const authorizationProvider = (signer?: Signer) => {
  const { abi, networkAddress, address } = authorizationConfigParser();
  return new ethers.Contract(
    address,
    abi,
    signer ?? new ethers.providers.JsonRpcProvider(networkAddress)
  );
};
