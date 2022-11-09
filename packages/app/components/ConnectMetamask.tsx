// mostly ripped from https://github.com/pbshgthm/theunstoppableshop/blob/main/app/components/ConnectMetamask.tsx

import { useMetaMask } from "metamask-react";
import React, { useEffect, useState } from "react";
import { useENS } from "../features/useENS";

const statusMessage = {
  initializing: "SYNCING",
  unavailable: "INSTALL METAMASK",
  notConnected: "CONNECT",
  connecting: "CONNECTING",
};

const ConnectMetamask = () => {
  const { status, connect, account, switchChain } = useMetaMask();
  const [message, setMessage] = useState<string>();
  const accName = useENS(account || "");

  useEffect(() => {
    if (status === "connected") {
      setMessage(`Connected as ${accName.displayName}`);
      switchChain("0x5");
    } else {
      setMessage(statusMessage[status]);
    }
  }, [status, account]);

  return (
    <button className="my-4 p-2 border-2 rounded-xl" onClick={connect}>
      {message}
    </button>
  );
};

export default ConnectMetamask;
