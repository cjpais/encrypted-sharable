import { EthEncryptedData } from "@metamask/eth-sig-util";
import CryptoJS, { enc } from "crypto-js";
import { hexlify } from "ethers/lib/utils";

export const decrypt = async (
  data: any,
  ethereum: any,
  account: string
): Promise<string> => {
  const decryptedPasswordBuffer = await decryptPassword(
    data,
    ethereum,
    account
  );

  const decryptedData = CryptoJS.AES.decrypt(
    hextob64(data.data!.data),
    decryptedPasswordBuffer
  );

  return decryptedData.toString(enc.Utf8);
};

export const decryptPassword = async (
  data: any,
  ethereum: any,
  account: any
) => {
  console.log("data", data);
  console.log("data.nonce", data.nonce);
  const encryptedPasswordPayload: EthEncryptedData = {
    version: "x25519-xsalsa20-poly1305",
    nonce: hextob64(data.nonce),
    ephemPublicKey: hextob64(data.ephemeralPublicKey),
    ciphertext: hextob64(data.encryptedKey),
  };

  const encryptedPassWordString = hexlify(
    Buffer.from(JSON.stringify(encryptedPasswordPayload))
  );

  const decryptedPassword = await ethereum.request({
    method: "eth_decrypt",
    params: [encryptedPassWordString, account],
  });

  const decryptedPasswordBuffer = Buffer.from(
    decryptedPassword.split(",")
  ).toString("hex");

  console.log("decrypted", decryptedPasswordBuffer);
  return decryptedPasswordBuffer;
};

const hextob64 = (str: string) => {
  return Buffer.from(str.slice(2), "hex").toString("base64");
};
