import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";

export const ethereumProvider = async () => {
  const ethereum = await detectEthereumProvider();
  if (ethereum) {
    return new ethers.providers.Web3Provider(ethereum);
  }
  throw new Error("No Ethereum provider detected");
};
