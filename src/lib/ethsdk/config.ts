import { defineConfig } from "@dethcrypto/eth-sdk";

// ! module imports do not work out of the box with `eth-sdk`, so a relative import is used here
import contracts from "../config/contracts";

/**
 * `eth-sdk` configuration.
 */
const ethSdkConfig = defineConfig({
  contracts,
  // SDK output path (*not* ABI output path; `eth-sdk` outputs ABIs to the same directory this config resides in)
  outputPath: "src/generated/ethsdk",
});

export default ethSdkConfig;
