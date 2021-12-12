import { derived } from "svelte/store";
import { stateStore } from "./state";


export enum LottoState {
  noAccount = "no-account",
  hasBet = "has-bet",
  buying = "buying",
}

export const lottoActions = derived(stateStore, ($stateStore) => {
  if (
    $stateStore.userAddress === null ||
    $stateStore.userAddress.length === 0
  ) {
    return LottoState.noAccount;
  }

  if ($stateStore.bets.length === 0 || $stateStore.buying) {
    return LottoState.buying;
  }

  return LottoState.hasBet;
});
