import { Signer, ethers } from "ethers";
import { addresses, provider } from "utils/config.utils";
import { GamebitAuthorizations__factory } from "@gamble/blockchain";

export const authorizationProvider = (signer?: Signer) => {
  return GamebitAuthorizations__factory.connect(
    addresses.Authorization,
    signer ?? provider
  );
};
