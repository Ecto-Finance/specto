# Specto

Specto is an NFT collection project created for the LFGrow hackathon, centering around Lens Protocol.

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
