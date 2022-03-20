import React from "react";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { WagmiProvider, chain, defaultChains } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { baseWagmiProvider } from "lib/wagmi";
import { useApollo } from "lib/apollo/client";

import "../styles/globals.css";

// Chains for connectors to support
const chains = defaultChains;
const defaultChain = chain.mainnet;

// Set up connectors
const connectors = ({ chainId }) => {
  const rpcUrl =
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    chain.mainnet.rpcUrls[0];
  return [
    new InjectedConnector({
      chains: [chain.arbitrumOne, defaultChain, chain.polygonTestnetMumbai],
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
        <Component {...pageProps} />
      </WagmiProvider>
    </ApolloProvider>
  );
};

export default App;
