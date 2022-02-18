import { ethereumProvider } from "./ethereum";
import { lottoProvider } from "./lotto";
import detectEthereumProvider from "@metamask/detect-provider";

export const getProviders = async () => {
  const provider = await ethereumProvider();
  const metamask = await detectEthereumProvider();
  const signer = provider.getSigner();
  const lotto = lottoProvider(signer);

  return {
    ethereum: provider,
    lotto,
    metamask,
  };
};

export * from "./ethereum";
export * from "./lotto";
