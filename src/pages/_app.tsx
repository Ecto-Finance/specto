import React from "react";
import type { AppProps } from "next/app";
import { WagmiProvider } from "wagmi";

import { baseWagmiProvider } from "lib/web3";

/**
 * Custom app entry point.
 */
const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <WagmiProvider provider={baseWagmiProvider}>
      <Component {...pageProps} />
    </WagmiProvider>
  );
};

export default App;
