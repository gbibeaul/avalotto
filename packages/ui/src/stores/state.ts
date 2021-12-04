import { writable } from "svelte/store";
import { BigNumber, ethers } from "ethers";
import MetaMaskOnboarding from "@metamask/onboarding";

import { getProviders, lottoProvider } from "../transport";

const onboarding = new MetaMaskOnboarding();

type State = {
  jackpot: BigNumber;
  userBalance: BigNumber;
  userAddress: string;
  ethereumDetected: boolean;
  errors: null | null;
  loading: boolean;
};

const initialState: State = {
  jackpot: BigNumber.from(0),
  userBalance: BigNumber.from(0),
  userAddress: "",
  ethereumDetected: false,
  loading: true,
  errors: null,
};

const createState = () => {
  const { update, subscribe } = writable(initialState);

  const updateJackpot = (jackpot: BigNumber) =>
    update((s) => ({ ...s, jackpot }));

  const updateUserBalance = (userBalance: BigNumber) =>
    update((s) => ({ ...s, userBalance }));

  const updateUserAddress = async (userAddress: string[]) => {
    const { ethereum } = await getProviders();
    const userBalance = await ethereum.getBalance(userAddress[0]);

    update((s) => ({ ...s, userAddress: userAddress[0], userBalance }));
  };

  const updateEthereumDetected = (ethereumDetected: boolean) =>
    update((s) => ({ ...s, ethereumDetected }));

  const updateLoading = (loading: boolean) =>
    update((s) => ({ ...s, loading }));

  const updateErrors = (errors: null | null) =>
    update((s) => ({ ...s, errors }));

  const downloadMetamask = async () => {
    onboarding.startOnboarding();
  };

  const connectMetamask = async () => {
    const { metamask } = await getProviders();
    // @ts-ignore
    metamask.request({ method: "eth_requestAccounts" });
  };

  const listenJackpot = async () => {
    try {
      const lotto = await lottoProvider();
      const jackpot = await lotto.getCurrentJackpot();
      updateJackpot(jackpot);
      lotto.on("jackpotUpdated", updateJackpot);
    } catch (e) {
      updateErrors(e);
    }
  };

  const initialLoadMetamask = async () => {
    const { ethereum, lotto } = await getProviders();

    // @ts-ignore
    window.ethereum.on("accountsChanged", updateUserAddress);

    try {
      const userAddress = await ethereum.getSigner().getAddress();
      const userBalance = await ethereum.getBalance(userAddress);
      update((state) => ({
        ...state,
        userAddress,
        userBalance,
        ethereumDetected: true,
      }));
    } catch (e) {
      updateErrors(e);
    }
  };

  const placeBet = async (numbers: BigNumber[]) => {
    try {
      const { lotto } = await getProviders();
      await lotto.bet(numbers, { value: ethers.utils.parseEther("1") });
    } catch (e) {
      updateErrors(e);
    }
  };

  if (window.ethereum) {
    updateEthereumDetected(true);
    initialLoadMetamask();
  }

  listenJackpot();

  return {
    subscribe,
    placeBet,
    downloadMetamask,
    connectMetamask,
  };
};

export const stateStore = createState();
