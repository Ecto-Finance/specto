import { providers } from "ethers";
import { chain, defaultChains as chains } from "wagmi";
import type { Connector } from "wagmi";

import { ETHERSCAN_API_KEY, INFURA_ID } from "lib/config/env";

type WagmiProviderConfig = { chainId?: number; connector?: Connector };

/**
 * Base `wagmi` provider for HTTP-based RPC.
 */
const baseWagmiProvider = ({ chainId }: WagmiProviderConfig) =>
  providers.getDefaultProvider(
    chains.some((chain) => chain.id === chainId) ? chainId : chain.mainnet.id,
    {
      etherscan: ETHERSCAN_API_KEY,
      infura: INFURA_ID,
    }
  );

export default baseWagmiProvider;
