import { generateChallenge } from "./generate-challenge";
import { authenticate } from "./authenticate";
import { useSignMessage } from "wagmi";
import { useState } from "react";
import { Migrate } from "./Migrate";
import { setAuthenticationToken, getAuthenticationToken } from "lib/lens/state";

export const Login = ({ address }) => {
  const [{ data, error, loading }, signMessage] = useSignMessage();
  const [accessToken, setAccessToken] = useState(false);

  const pleaseLogin = async () => {
    const challengeResponse = await generateChallenge(address);
    const signature = await signMessage({
      message: challengeResponse.data.challenge.text,
    });
    const accessTokens = await authenticate(address, signature.data);
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
