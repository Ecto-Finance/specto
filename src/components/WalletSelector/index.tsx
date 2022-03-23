import { Login } from "./Login";
import React, { useEffect } from "react";
import { useConnect, useAccount } from "wagmi";
import { Migrate } from "./Migrate";

export const WalletSelector = () => {
  const [{ data: accountData }, disconnect] = useAccount({ fetchEns: true });
  const [{ data, error }, connect] = useConnect();

  function truncateHash(hash: string, length = 38) {
    return hash.replace(hash.substring(4, length), "..");
  }

  useEffect(() => {
    console.log(accountData);
  }, [accountData]);

  return (
    <div className="">
      {!accountData ? (
        <div>
          {data.connectors.map((x) => (
            <button
              className="rounded-lg bg-primary-green px-2 py-1 hover:bg-opacity-70"
              key={x.name}
              onClick={() => connect(x)}
            >
              Connect
            </button>
          ))}
          {error && <div>{error?.message ?? "Failed to connect"}</div>}
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <div>
            <Login address={accountData?.address} />
          </div>
          <button
            className="rounded-lg bg-primary-green px-2 py-1 hover:bg-opacity-70"
            onClick={() => [disconnect()]}
          >
            {accountData?.ens?.name ?? truncateHash(accountData?.address)}
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletSelector;
