import { writable } from "svelte/store";

function createWallet() {
    const { subscribe, set } = writable("");

    function handleAccountChange(accounts) {
        if (accounts && accounts.length > 0) {
            set(accounts[0]);
            return;
        }
        if (accounts && accounts.length === 0) {
            set("");
            return;
        }
        if (window.ethereum.selectedAddress) {
            set(window.ethereum.selectedAddress);
            return window.ethereum.selectedAddress;
        }
    }

    return {
        subscribe,
        handleAccountChange,
    };
}

export const wallet = createWallet();