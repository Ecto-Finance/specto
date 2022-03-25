import React from "react";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { WagmiProvider, chain } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { baseWagmiProvider } from "lib/wagmi";
import { useApollo } from "lib/apollo/client";

import "../styles/globals.css";

// Set up connectors
const connectors = () => {
  return [
    new InjectedConnector({
      chains: [chain.arbitrumOne, chain.mainnet, chain.polygonTestnetMumbai],
      options: { shimDisconnect: true },
    }),
  ];
};

/**
 * Custom app entry point.
 */
const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <WagmiProvider provider={baseWagmiProvider} connectors={connectors}>
        <ThemeProvider attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>
      </WagmiProvider>
    </ApolloProvider>
  );
};

export default App;
