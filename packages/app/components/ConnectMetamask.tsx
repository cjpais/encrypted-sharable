// mostly ripped from https://github.com/pbshgthm/theunstoppableshop/blob/main/app/components/ConnectMetamask.tsx

import { useMetaMask } from "metamask-react";
import React, { useEffect, useState } from "react";

const statusMessage = {
  initializing: "SYNCING",
  unavailable: "INSTALL METAMASK",
  notConnected: "CONNECT",
  connecting: "CONNECTING",
};

const ConnectMetamask = () => {
  const { status, connect, account } = useMetaMask();
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    if (status === "connected") {
      setMessage(account as string);
    } else {
      setMessage(statusMessage[status]);
    }
  }, [status, account]);

  return <button onClick={connect}>{message}</button>;
};

export default ConnectMetamask;
