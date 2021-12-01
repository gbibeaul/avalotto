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

// write a function that takes in a number and returns the digits at the specific index using modulo and rounds down

// implement a rounding algorithm to the nearest integer
const roundDown = (number) => {






        const getDigit = (number, index) => {
            // do not include the decimal point
            return number % Math.pow(10, index + 1) / Math.pow(10, index)
        }