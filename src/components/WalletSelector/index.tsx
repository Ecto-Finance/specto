import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import {
  Connector,
  ConnectorData,
  useConnect,
  useAccount,
  useNetwork,
} from "wagmi";
import { useIsMounted } from "../../lib/wagmi/hooks/useIsMounted";
import { InjectedConnector } from "wagmi/connectors/injected";

type Props = {
  onError?(error: Error): void;
  onSuccess?(data: ConnectorData): void;
};

export const WalletSelector = ({ onError, onSuccess }: Props) => {
  let [isOpen, setIsOpen] = useState(false);
  const [{ data: accountData }, disconnect] = useAccount({ fetchEns: true });

  const isMounted = useIsMounted();
  const [{ data, error, loading }, connect] = useConnect();

  const handleConnect = React.useCallback(
    async (connector: Connector) => {
      const { data, error } = await connect(connector);
      if (error) onError?.(error);
      if (data) onSuccess?.(data);
    },
    [connect, onError, onSuccess]
  );

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
        </div>
      ) : (
        <button
          className="border border-black rounded-lg px-2 py-1"
          onClick={() => [disconnect(), setIsOpen(false)]}
        >
          Disconnect
        </button>
      )}
    </div>
  );
};

export default WalletSelector;
