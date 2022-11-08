import { encrypt } from "@metamask/eth-sig-util";

export const encryptPassword = (password: string, publicKey: string) => {
  const pubKeyB64 = Buffer.from(publicKey.replace("0x", ""), "hex").toString(
    "base64"
  );
  const passwordString = Uint8Array.from(
    Buffer.from(password.replace("0x", ""), "hex")
  ).toString();

  const encryptedPassword = encrypt({
    publicKey: pubKeyB64,
    data: passwordString,
    version: "x25519-xsalsa20-poly1305",
  });

  return encryptedPassword;
};
