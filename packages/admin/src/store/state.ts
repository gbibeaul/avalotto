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
  bets: BigNumber[][];
  loading: boolean;
  buying: boolean;
};

const initialState: State = {
  jackpot: BigNumber.from(0),
  userBalance: BigNumber.from(0),
  userAddress: "",
  bets: [],
  ethereumDetected: false,
  loading: true,
  errors: null,
  buying: false,
};

const createState = () => {
  const { update, subscribe } = writable(initialState);

  const updateJackpot = (jackpot: BigNumber) =>
    update((s) => ({ ...s, jackpot }));

  const updateUserAddress = async (userAddress: string[]) => {
    const { ethereum } = await getProviders();
    const userBalance = await ethereum.getBalance(userAddress[0]);

    update((s) => ({ ...s, userAddress: userAddress[0], userBalance }));
  };

  const updateEthereumDetected = (ethereumDetected: boolean) =>
    update((s) => ({ ...s, ethereumDetected }));

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

  const getCurrentJackpot = async () => {
    const { lotto } = await getProviders();
    const jackpot = await lotto.getJackpot();
    return jackpot;
  };

  const listenJackpot = async () => {
    try {
      const lotto = await lottoProvider();
      const jackpot = await lotto.getCurrentJackpot();
      updateJackpot(jackpot);
      lotto.on("jackpotUpdated", updateJackpot);
    } catch (e) {
      console.log(e);
      updateErrors(e);
    }
  };

  const setSeed = async (seed: string) => {
    try {
      console.log(seed);
      const { lotto } = await getProviders();
      await lotto.setSealedSeed(ethers.utils.id(seed));
    } catch (e) {
      console.log(e);
      updateErrors(e);
    }
  };

  const reveal = async (seed: string) => {
    try {
      const { lotto } = await getProviders();
      await lotto.reveal(ethers.utils.id(seed));
    } catch (e) {
      console.log(e);
      updateErrors(e);
    }
  };

  const initialLoadMetamask = async () => {
    const { ethereum, lotto } = await getProviders();

    // @ts-ignore
    window.ethereum.on("accountsChanged", updateUserAddress);

    const bets = await lotto.getBets();
    try {
      const userAddress = await ethereum.getSigner().getAddress();
      const userBalance = await ethereum.getBalance(userAddress);
      update((state) => ({
        ...state,
        userAddress,
        userBalance,
        bets,
        ethereumDetected: true,
      }));
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
    downloadMetamask,
    connectMetamask,
    setSeed,
    getCurrentJackpot,
    reveal,
  };
};

export const stateStore = createState();
