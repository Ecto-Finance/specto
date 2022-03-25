import { useSignMessage } from "wagmi";
import { useState } from "react";
import { Migrate } from "./Migrate";
import { setAuthenticationToken } from "lib/lens/state";
import { useAuthenticateMutation, useChallengeQuery } from "generated/graphql";

export const Login = ({ address }) => {
  const [, signMessage] = useSignMessage();
  const [accessToken, setAccessToken] = useState(false);
  const [authenticateMutation] = useAuthenticateMutation();
  const { data, loading, error } = useChallengeQuery({
    variables: {
      request: {
        address,
      },
    },
  });

  const pleaseLogin = async () => {
    const signature = await signMessage({
      message: data.challenge.text,
    });
    const accessTokens = await authenticateMutation({
      variables: {
        request: {
          address,
          signature: signature.data,
        },
      },
    });
    console.log(accessTokens);
    setAuthenticationToken(accessTokens.data.authenticate.accessToken);
    setAccessToken(true);
  };

  return (
    <div>
      {accessToken ? (
        <Migrate />
      ) : (
        <div className="space-x-2">
          <button
            className="rounded-lg bg-primary-green px-2 py-1 hover:bg-opacity-70"
            onClick={() => pleaseLogin()}
          >
            Sign In
          </button>
        </div>
      )}
    </div>
  );
};
