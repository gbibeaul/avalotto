import { ethers, Signer } from "ethers";
// @ts-ignore
import { abi } from "@gamble/lotto";
// @ts-ignore
import config from "@gamble/config";

export const lottoProvider = (signer?: Signer) =>
  new ethers.Contract(
    config.dev.contracts.Lotto.address,
    abi,
    signer ?? new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/")
  );
