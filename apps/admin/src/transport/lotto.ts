import { ethers, Signer } from "ethers";
// @ts-ignore
import { abi as lottoAbi } from "@gamble/lotto";
// @ts-ignore
import { abi as lottoWinnerMockAbi } from "@gamble/lotto-mock-winner";
// @ts-ignore
import config from "@gamble/config";

const useMock = true;

const abi = useMock ? lottoWinnerMockAbi : lottoAbi;
const address = useMock
  ? config.dev.contracts.LottoWinnerMock.address
  : config.dev.contracts.Lotto.address;

export const lottoProvider = (signer?: Signer) =>
  new ethers.Contract(
    address,
    abi,
    signer ?? new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/")
  );
