import { Signer } from "ethers";
import { addresses, provider } from "utils/config.utils";
import { GameInstance__factory } from "@gamble/blockchain";

export const gameInstanceProvider = (signer?: Signer) => {
  return GameInstance__factory.connect(
    addresses.GameInstance,
    signer ?? provider
  );
};
