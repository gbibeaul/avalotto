import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Provider as WagmiProvider, defaultChains } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { SWRConfig } from "swr";

const connectors = [new InjectedConnector({ chains: defaultChains })];

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
