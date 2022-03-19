import React from "react";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { WagmiProvider } from "wagmi";

import { baseWagmiProvider } from "lib/wagmi";
import { useApollo } from "lib/apollo/client";

/**
 * Custom app entry point.
 */
const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <WagmiProvider provider={baseWagmiProvider}>
        <Component {...pageProps} />
      </WagmiProvider>
    </ApolloProvider>
  );
};

export default App;
