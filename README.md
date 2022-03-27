# Specto

Specto is an NFT migration and swap system for the Lens Protocol. It bridges current NFT collections to Lens by creating a new Lens Profile with the profileImageURI set to an IPFS hosed json file containing the Opensea collection information. The migrator mints follow NFTs with the supply equaling the original set and sends them to a third-party swap contract called [SpectoSwap](https://github.com/Ecto-Finance/specto-contracts). Holders of the collection NFT can then swap their NFTs with SpectoSwap and receive a Lens Follow NFT of the same token id. If they wish to travel back to the original NFT they can swap their Follow NFT back into the collection NFT.

This process allows NFT collections to own their main collection information and provide a source of truth for their collection. With the built in Lens governance, voting can take place naturally amount collection holders. Publications can be a source of offical announcements and provide a members only forum to discuss topics.



## Features:

1. Opensea Collection page migration to a Lens Profile NFT
2. Automatic Minting of FollowNFTs
3. 2 way swaps for Collection NFTs <> FollowNFTs
4. An `SpectoFollowModule` was created in the repo to only allow the Migrator to Mint but was not tested / used because of time constraints.

## Project Overview

- `public`: static assets
- `src`: source code
  - `components`: React components
  - `lib`: common library files
    - `apollo`: Apollo Client configuration
    - `config`: general configuration files
    - `ethsdk`: `eth-sdk` configuration
    - `graphql`: GraphQL operations
    - `wagmi`: `wagmi` configuration
  - `pages`: Next.js routes

## Local Development

First, install dependencies:

```
yarn
```

Then, stand up the local development server:

```
yarn dev
```

This will run the application on http://localhost:3000, and will simultaneously spin up GraphQL Code Generator in watch mode.

```
Deploy SpectoSwap, CollectionNFT and mint script See: https://github.com/Ecto-Finance/specto-contracts

```

Set the env variables:

```
NEXT_PUBLIC_PINATA_API_SECRET=
NEXT_PUBLIC_LENS_PROXY_ADDRESS=
NEXT_PUBLIC_SPECTO_SWAP_ADDRESS=
NEXT_PUBLIC_COLLECTION_NFT_ADDRESS=<COLLECTION NFT ADDRESS FROM SPECTO REPO>
```

Frontend

1. Hit Connect and link Metamask or Frame
2. Hit Sign in to get approval to use Lens Protocol GraphQL API
3. Hit Migrate and enter the contract of the address (current checks ETH mainnet)
4. Cycle thru prompts on your web3 provider
5. View your Collection NFTs and hit follow/unfollow to swap to/from Lens
6. Enjoy your actually free, free speech


## DEMO (polygon testnet)

1. [Deployed SpectoSwap Contract: 0x5396A099893058a9B47ba77F317e2be358123d8F](https://mumbai.polygonscan.com/address/0x5396A099893058a9B47ba77F317e2be358123d8F)
1. A working swap: 




## SpectoSwap

Repo: [SpectoSwap](https://github.com/Ecto-Finance/specto-contracts)

Description: Swap smart contract to facilitate Collection NFTs <> FollowNFTs


## Future Work

1. Most of migration functionality needs to live in the SpectoSwap contract.



## License

The code in this repository is licensed under MIT, &copy; Specto. See <a href="LICENSE.md">LICENSE.md</a> for more information.
