import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Provider as WagmiProvider, defaultChains } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const connectors = [new InjectedConnector({ chains: defaultChains })];

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <WagmiProvider connectors={connectors} autoConnect>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </WagmiProvider>
  );
}

export default MyApp;
