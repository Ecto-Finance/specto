/**
 * Environment variables.
 * Exporting destructured `process.env` does not work in Next.js without hacking:
 * @see https://nextjs.org/docs/api-reference/next.config.js/environment-variables
 * @see https://github.com/vercel/next.js/issues/15574
 */

export const NODE_ENV = process.env.NODE_ENV;

// base GraphQL API URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// web3
export const ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
export const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_ID;
export const OPENSEA_API_KEY = process.env.NEXT_PUBLIC_OPENSEA_API_KEY;
