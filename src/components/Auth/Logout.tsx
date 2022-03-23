import { removeAuthenticationToken } from "../../lib/lens/state";

export const Logout = () => {
  removeAuthenticationToken();
  return (
    <button
      className="rounded-lg bg-primary-green px-2 py-1 hover:bg-opacity-70"
      onClick={() => Logout()}
    >
      Logout
    </button>
  );
};
