import { writable, derived } from "svelte/store";
import { stateStore } from "./state";

export enum Routes {
  noAccount = "no-account",
  hasBet = "has-bet",
  buying = "buying",
}

export const routing = derived(stateStore, ($stateStore) => {
  if ($stateStore.userAddress === null) {
    return Routes.noAccount;
  }

  if ($stateStore.bets.length === 0 || $stateStore.buying) {
    return Routes.buying;
  }

  return Routes.hasBet;
});
