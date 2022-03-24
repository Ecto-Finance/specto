/* eslint-disable react-hooks/exhaustive-deps */
import { generateChallenge } from "./generate-challenge";
import { authenticate } from "./authenticate";
import { chain, useSignMessage } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useAccount, useConnect } from "wagmi";
import React from "react";
import { prettyJSON } from "lib/lens/helpers";

export const Login = ({ address }) => {
  const [{ data: accountData }] = useAccount();
  const [{}, connect] = useConnect();
  const [{ data, error, loading }, signMessage] = useSignMessage();
  const connector = new InjectedConnector({
    chains: [chain.arbitrumOne, chain.mainnet, chain.polygonTestnetMumbai],
  });

  const [state, setState] = React.useState<{
    address?: string;
    error?: Error;
    loading?: boolean;
  }>({});

  const signIn = React.useCallback(async () => {
    try {
      //generate-challenge
      const challengeResponse = await generateChallenge(address);
      prettyJSON("AuthChallengeResult: ...", challengeResponse.data.challenge);

      //signMessage
      const signature = await signMessage({
        message: challengeResponse.data.challenge.text,
      });
      prettyJSON("Signature: ...", signature.data);

      //authenticate
      const accessTokens = await authenticate(address, signature.data);
      prettyJSON("login: ...", accessTokens.data);
    } catch (error) {
      setState((x) => ({ ...x, error: error as Error, loading: false }));
    }
  }, [address, connect, connector, signMessage]);

  React.useEffect(() => {
    const handler = async () => {
      try {
        const res = await connect(connector); // connect from useConnect
      } finally {
        setState((x) => ({ ...x, loading: false }));
      }
    };

    // 1. page loads
    (async () => await handler())();

    // 2. window is focused (in case user logs out of another window)
    window.addEventListener("focus", handler);
    return () => window.removeEventListener("focus", handler);
  }, []);

  return (
    <div className="flex">
      {" "}
      {accountData ? (
        <div className="flex">
          {" "}
          <div className=" flex rounded-lg bg-primary-green px-2 py-1 hover:bg-opacity-70">
            {accountData?.ens?.name ??
              accountData?.address.slice(0, 6) +
                "..." +
                accountData?.address.slice(38, 42)}
          </div>
          <button
            className="ml-2 rounded-lg bg-primary-green px-2 py-1 hover:bg-opacity-70"
            onClick={() => signIn()}
          >
            Sign In
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
