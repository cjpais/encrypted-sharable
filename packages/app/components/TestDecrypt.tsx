import React, { useEffect, useState } from "react";
import { EncryptedSharable__factory } from "../../contracts/types";
import Deploys from "../../contracts/deploys/goerli.json";
import { useMetaMask } from "metamask-react";
import { ethers } from "ethers";
import { EthEncryptedData } from "@metamask/eth-sig-util";
import CryptoJS, { enc } from "crypto-js";

const TestDecrypt = () => {
  const { status, account, ethereum } = useMetaMask();
  const [decryptedMessage, setDecryptedMessage] = useState<string>();
  const [decryptedPassword, setDecryptedPassword] = useState<string>();
  const [encryptedMessage, setEncryptedMessage] = useState<string>();
  const [messageId, setMessageId] = useState<number>(0);

  // fetch the info from the chain
  useEffect(() => {
    console.log("ran");

    if (status === "connected") {
      const contract = EncryptedSharable__factory.connect(
        Deploys.EncryptedSharable,
        new ethers.providers.Web3Provider(ethereum)
      );
      contract.getData(messageId).then((d) => {
        console.log("d", d);
        setEncryptedMessage(d[1]);
        // reconstruct the encrypted password
        const encryptedPassword: EthEncryptedData = {
          version: "x25519-xsalsa20-poly1305",
          nonce: hextob64(d[2][0][1]),
          ephemPublicKey: hextob64(d[2][0][2]),
          ciphertext: hextob64(d[2][0][3]),
          //   nonce: hextob64d[2][0][1],
          //   ephemPublicKey: d[2][0][2],
          //   ciphertext: d[2][0][3],
        };
        console.log(encryptedPassword);
        const encryptedPasswordStr = ethers.utils.hexlify(
          Buffer.from(JSON.stringify(encryptedPassword))
        );

        // // decrypt the password
        ethereum
          .request({
            method: "eth_decrypt",
            params: [encryptedPasswordStr, account!],
          })
          .then((p: string) => {
            const pass = Buffer.from(p.split(",")).toString("hex");
            setDecryptedPassword(pass);

            // decrypt the message
            const encryptedMessage = d[1];
            console.log("encrypted message", encryptedMessage);
            const decryptedMessage = CryptoJS.AES.decrypt(
              hextob64(encryptedMessage),
              pass
            );
            console.log(decryptedMessage.toString(CryptoJS.enc.Utf8));
            setDecryptedMessage(decryptedMessage.toString(CryptoJS.enc.Utf8));
          });
      });
    }
  }, [status, messageId]);

  return (
    <div>
      {/* <div>Decrypted password: {decryptedPassword}</div> */}
      <input
        type="number"
        onChange={(e) => setMessageId(parseInt(e.target.value))}
      ></input>
      <div style={{ width: "600px", overflow: "auto" }}>
        Encrypted Message: {encryptedMessage}
      </div>
      <div>Decrypted message: {decryptedMessage}</div>
    </div>
  );
};

const hextob64 = (str: string) => {
  return Buffer.from(str.slice(2), "hex").toString("base64");
};

export default TestDecrypt;
