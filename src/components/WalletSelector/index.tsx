import React from "react";
import { useConnect, useAccount } from "wagmi";

export const WalletSelector = () => {
  const [{ data: accountData }, disconnect] = useAccount({ fetchEns: true });
  const [{ data, error }, connect] = useConnect();

  return (
    <div>
      {!accountData ? (
        <div>
          {data.connectors.map((x) => (
            <button
              className="border border-black rounded-lg px-2 py-1"
              key={x.name}
              onClick={() => connect(x)}
            >
              Connect to MetaMask
            </button>
          ))}
          {error && <div>{error?.message ?? "Failed to connect"}</div>}
        </div>
      ) : (
        <div className="flex items-center">
          {" "}
          <button
            className="border border-black rounded-lg px-2 py-1"
            onClick={() => [disconnect()]}
          >
            Disconnect
          </button>
          <div> {accountData?.ens?.name ?? accountData?.address} </div>
        </div>
      )}
    </div>
  );
};

export default WalletSelector;
