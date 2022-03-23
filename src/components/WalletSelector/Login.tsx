import { generateChallenge } from "./generate-challenge";
import { authenticate } from "./authenticate";
import { useSignMessage } from "wagmi";
import { useProfilesQuery } from "generated/graphql";

export const Login = ({ address }) => {
  const [{ data, error, loading }, signMessage] = useSignMessage();
  const {
    data: profData,
    loading: profLoading,
    error: profError,
  } = useProfilesQuery({
    variables: {
      request: {
        limit: 50,
      },
    },
  });

  const pleaseLogin = async () => {
    const challengeResponse = await generateChallenge(address);
    const signature = await signMessage({
      message: challengeResponse.data.challenge.text,
    });
    const accessTokens = await authenticate(address, signature.data);
    console.log(accessTokens);
    console.log(profData);
  };

  return (
    <div>
      <button
        className="rounded-lg bg-primary-green px-2 py-1 hover:bg-opacity-70"
        onClick={() => pleaseLogin()}
      >
        Login
      </button>
    </div>
  );
};
