import { Signer } from "ethers";
import { addresses, provider } from "utils/config.utils";
import {
  GamebitAuthorizations__factory,
  GamebitTreasury__factory,
} from "@gamble/blockchain";

export const authorizationProvider = (signer?: Signer) => {
  return GamebitAuthorizations__factory.connect(
    addresses.Authorization,
    signer ?? provider
  );
};

export const treasuryProvider = (signer?: Signer) => {
  return GamebitTreasury__factory.connect(
    addresses.Treasury,
    signer ?? provider
  );
};
