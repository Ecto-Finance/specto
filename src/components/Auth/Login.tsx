/* eslint-disable react-hooks/exhaustive-deps */
import { generateChallenge } from "./generate-challenge";
import { authenticate } from "./authenticate";
import { chain, useSignMessage } from "wagmi";
import { refreshAuth } from "./refresh";
import {
  getAuthenticationToken,
  setAuthenticationToken,
} from "../../lib/lens/state";
import { Logout } from "./Logout";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useAccount, useConnect, defaultChains, defaultL2Chains } from "wagmi";
import React from "react";

export const Login = ({ address }) => {
  const [{ data: accountData }, disconnect] = useAccount({ fetchEns: true });
  const [{}, connect] = useConnect();
  const [state, setState] = React.useState<{
    address?: string;
    error?: Error;
    loading?: boolean;
  }>({});
  const connector = new InjectedConnector({
    chains: [chain.arbitrumOne, chain.mainnet, chain.polygonTestnetMumbai],
  });
  const [{ data, error, loading }, signMessage] = useSignMessage();

  const signIn = React.useCallback(async () => {
    try {
      const challengeResponse = await generateChallenge(address);
      console.log(challengeResponse);
      const signature = await signMessage({
        message: challengeResponse.data.challenge.text,
      });
      console.log(signature);
      const accessTokens = await authenticate(address, signature.data);
      console.log(accessTokens);
      //console.log(profData);
      console.log(accessTokens.data.authenticate.refreshToken);
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
          <div className="ml-2 flex rounded-lg bg-primary-green px-2 py-1 hover:bg-opacity-70">
            {accountData?.ens?.name ??
              accountData?.address.slice(0, 6) +
                "..." +
                accountData?.address.slice(38, 42)}
          </div>
          <button
            className="rounded-lg bg-primary-green px-2 py-1 hover:bg-opacity-70"
            onClick={() => signIn()}
          >
            Sign In
          </button>
        </div>
      ) : (
        ""
      )}
    </div>

    /*  {profileData != [] ? (
        <div className="flex flex-col">
          {profileData.map((profile: any) => {
            <div>key={profile.id}>{profile.handle}</div>
          })}
          </div>
      )} */
  );
};
