export const isClientSide = () => typeof window !== 'undefined';

export const isClientEthInjected = () => isClientSide() && typeof window.ethereum !== 'undefined'