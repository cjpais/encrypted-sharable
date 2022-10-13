// mostly ripped from https://github.com/pbshgthm/theunstoppableshop/blob/main/app/components/ConnectMetamask.tsx

import { ethers } from "ethers";
import { useMetaMask } from "metamask-react";
import React, { useEffect, useState } from "react";
import PubKeyRegistryABI from "../../contracts/out/PublicKeyRegistry.sol/PublicKeyRegistry.abi.json";
// import goerli from "@encrypted-sharable/contracts/deploys/goerli.json";
import { EncryptedSharable__factory } from "../../contracts/types";
import Deploys from "../../contracts/deploys/goerli.json";

const AddPublicKey = () => {
  const { status, account, ethereum } = useMetaMask();

  const add = async () => {
    // use the account now to generate the public key
    const pubKey = await ethereum.request({
      method: "eth_getEncryptionPublicKey",
      params: [account],
    });

    const pubKeyHex = "0x" + Buffer.from(pubKey, "base64").toString("hex");

    console.log(
      "public key",
      pubKey,
      "public key hex",
      Buffer.from(pubKey, "base64").toString("hex")
    );

    const addr = Deploys.PublicKeyRegistry;
    // send the public key to the chain
    const signer = new ethers.providers.Web3Provider(ethereum).getSigner();
    const pubKeyRegistryContract = new ethers.Contract(
      Deploys.PublicKeyRegistry,
      PubKeyRegistryABI,
      signer
    );

    const tx = await pubKeyRegistryContract.addPublicKey(pubKeyHex);
    console.log(tx);
    await tx.wait(2);
    console.log("success");
  };

  return <button onClick={add}>Add Public Key</button>;
};

export default AddPublicKey;
