import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Provider as WagmiProvider } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { SWRConfig } from "swr";
import { getChains } from "utils/config.utils";

const connectors = [
  new InjectedConnector({
    chains: getChains(),
    options: {
      shimDisconnect: true,
    },
  }),
  new WalletConnectConnector({
    chains: getChains(),
    options: {},
  }),
];

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SWRConfig>
      <WagmiProvider connectors={connectors} autoConnect>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </WagmiProvider>
    </SWRConfig>
  );
}

export default MyApp;
