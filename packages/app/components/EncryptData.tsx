// mostly ripped from https://github.com/pbshgthm/theunstoppableshop/blob/main/app/components/ConnectMetamask.tsx

import { ethers } from "ethers";
import { useMetaMask } from "metamask-react";
import React, { useEffect, useState } from "react";
import PubKeyRegistryABI from "../../contracts/out/PublicKeyRegistry.sol/PublicKeyRegistry.abi.json";
import EncryptedSharableABI from "../../contracts/out/EncryptedSharable.sol/EncryptedSharable.abi.json";
import { EncryptedSharable__factory } from "../../contracts/types";
import { encrypt } from "@metamask/eth-sig-util";
import Deploys from "../../contracts/deploys/goerli.json";
import CryptoJS from "crypto-js";

const b64tohex = (str: string) => {
  return Buffer.from(str, "base64").toString("hex");
};

const EncryptData = () => {
  const { status, account, ethereum } = useMetaMask();
  const [message, setMessage] = useState<string>();

  const sendEncrypted = async () => {
    const signer = new ethers.providers.Web3Provider(ethereum).getSigner();
    const pubKeyRegistryContract = new ethers.Contract(
      Deploys.PublicKeyRegistry,
      PubKeyRegistryABI,
      signer
    );

    // get public key from contract
    const pubKeyHex = await pubKeyRegistryContract.getPublicKey(account);
    const pubKeyB64 = Buffer.from(pubKeyHex.slice(2), "hex").toString("base64");

    // generate a password to encrypt data with (32bits)
    const password = crypto.getRandomValues(new Uint8Array(32));
    const passwordHex = Buffer.from(password).toString("hex");

    // use cryptojs to encrypt the message
    const encryptedMessage = CryptoJS.AES.encrypt(message!, passwordHex);
    const encryptedMessageHex = b64tohex(encryptedMessage.toString());

    // TODO doing this in pure js definitely leaks information
    // encrypt the password with the public key
    const encryptedPassword = encrypt({
      publicKey: pubKeyB64,
      data: password.toString(),
      version: "x25519-xsalsa20-poly1305",
    });

    const encryptedSharableContract = EncryptedSharable__factory.connect(
      Deploys.EncryptedSharable,
      signer
    );

    console.log("password", encryptedPassword);

    const tx = await encryptedSharableContract.create(
      "0x" + encryptedMessageHex,
      [
        {
          person: account!, // TODO this should not be filled from the front end
          encryptedKey: "0x" + b64tohex(encryptedPassword.ciphertext),
          ephemeralPublicKey: "0x" + b64tohex(encryptedPassword.ephemPublicKey),
          nonce: "0x" + b64tohex(encryptedPassword.nonce),
        },
      ],
      "0x"
    );
    console.log(tx);
    tx.wait(2);
    console.log("success");

    // let key = await window.crypto.subtle.generateKey(
    //   {
    //     name: "AES-GCM",
    //     length: 128,
    //   },
    //   true,
    //   ["encrypt", "decrypt"]
    // );

    // let keyBytes = await window.crypto.subtle.exportKey("raw", key);

    // encrypt message data with key

    // @ts-ignore
    // const tx = await pubKeyRegistryContract.addPublicKey(pubKeyHex);
    // console.log(tx);
    // await tx.wait(2);
    // console.log("success");
  };

  return (
    <div style={{ display: "flex", gap: ".5rem" }}>
      <textarea
        onChange={(e) => setMessage(e.target.value)}
        disabled={message === ""}
      ></textarea>
      <button onClick={sendEncrypted}>Send Encrypted Message</button>
    </div>
  );
};

const test = (value: any) => {
  return ethers.utils.hexlify(Buffer.from(JSON.stringify(value)));
};

// TODO decrypt
// // try to decrypt before sending so we have sanity

// console.log("cipher text", encryptedPassword.ciphertext);

// const decryptedPassword = Buffer.from(
//   (
//     await ethereum.request({
//       method: "eth_decrypt",
//       params: [test(encryptedPassword), account],
//     })
//   ).split(",")
// ).toString("hex");

// console.log("decryptedPassword", decryptedPassword);

// const decryptedMessage = CryptoJS.AES.decrypt(
//   hextob64(encryptedMessageHex),
//   decryptedPassword
// );

// console.log(
//   "decrypted message",
//   decryptedMessage.toString(CryptoJS.enc.Utf8)
// );
export default EncryptData;
