import { generateChallenge } from "./generate-challenge";
import { authenticate } from "./authenticate";
import { useSignMessage } from "wagmi";
import { useState } from "react";
import { Migrate } from "./Migrate";
import Link from "next/link";

export const Login = ({ address }) => {
  const [{ data, error, loading }, signMessage] = useSignMessage();
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  const pleaseLogin = async () => {
    const challengeResponse = await generateChallenge(address);
    const signature = await signMessage({
      message: challengeResponse.data.challenge.text,
    });
    const accessTokens = await authenticate(address, signature.data);
    setAccessToken(accessTokens.data.authenticate.accessToken);
    setRefreshToken(accessTokens.data.authenticate.refreshToken);
  };

  return (
    <div>
      {accessToken != "" ? (
        <Migrate />
      ) : (
        <div className="space-x-2">
          <button
            className="rounded-lg bg-primary-green px-2 py-1 hover:bg-opacity-70"
            onClick={() => pleaseLogin()}
          >
            Sign In
          </button>
          <button className="rounded-lg bg-primary-green px-2 py-1 hover:bg-opacity-70">
            <Link href="/profiles">Profiles</Link>
          </button>
        </div>
      )}
    </div>
  );
};
