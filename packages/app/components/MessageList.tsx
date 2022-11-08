import { useMetaMask } from "metamask-react";
import React, { useEffect, useState } from "react";
import TimeAgo from "timeago-react";
import { gql } from "urql";
import {
  MyMessagesQuery,
  useMyMessagesQuery,
  usePublicKeysQuery,
} from "../codegen/subgraph";
import { decrypt, decryptPassword } from "../features/decrypt";
import { useDecrypted } from "../features/useDecrypted";
import Select from "react-select";
import { Contract, ethers } from "ethers";
import Deploys from "../../contracts/deploys/goerli.json";
import EncryptedSharableABI from "../../contracts/out/EncryptedSharable.sol/EncryptedSharable.abi.json";
import { encrypt } from "@metamask/eth-sig-util";
import { b64tohex } from "./EncryptData";
import { encryptPassword } from "../features/encrypt";

gql`
  query PublicKeys {
    persons {
      id
      address
      publicKey
    }
  }
`;

gql`
  query MyMessages($addr: String!) {
    persons(where: { address: $addr }) {
      address
      keys {
        id
        nonce
        ephemeralPublicKey
        encryptedKey
        data {
          id
          data
          creator {
            address
          }
          created
        }
      }
    }
  }
`;

interface SelectOptions {
  value: string;
  label: string;
  address: string;
  publicKey: string;
  //   ens?: string;
}

const MessageList = () => {
  const { ethereum, account } = useMetaMask();
  const state = useDecrypted();
  const [publicKeysOption, setPublicKeysOption] = useState<SelectOptions[]>([]);

  const [publicKeysQuery] = usePublicKeysQuery();

  const [query] = useMyMessagesQuery({
    pause: !account,
    variables: {
      addr: account!,
    },
  });

  const addPerson = async (select: SelectOptions, id: string) => {
    const signer = new ethers.providers.Web3Provider(ethereum).getSigner();
    const contract = new Contract(
      Deploys.EncryptedSharable,
      EncryptedSharableABI,
      signer
    );

    // find the id
    const key = query.data?.persons[0].keys.find((k) => k.data?.id === id);
    if (key) {
    } else {
      console.log("didnt find id", id);
    }
    console.log("key", key);

    // decrypt the key
    const password = await decryptPassword(key, ethereum, account);
    const encryptedPassword = encryptPassword(password, select.publicKey);

    console.log("encryptedPassword", encryptedPassword);

    // send to contract
    const tx = await contract.addKey(id, {
      person: select.address,
      encryptedKey: "0x" + b64tohex(encryptedPassword.ciphertext),
      ephemeralPublicKey: "0x" + b64tohex(encryptedPassword.ephemPublicKey),
      nonce: "0x" + b64tohex(encryptedPassword.nonce),
    });
    console.log(tx);
  };

  const processData = async (data: MyMessagesQuery) => {
    console.log(data);
    const keys = data.persons[0].keys;

    // figure out which things to decrypt
    const toDecrypt = keys.map((k) => {
      if (!state.decryptedData.find((el) => el.id === k.data!.id)) return k;
    });

    console.log("to decrypt", toDecrypt);

    // decrypt each
    toDecrypt.map(async (k) => {
      if (k) {
        const d = k!.data!;
        const decryptedData = await decrypt(k, ethereum, account!); // TODO this should probably accept the params instead of the object
        state.addDecryptedData(d.id, {
          id: d.id,
          data: decryptedData,
          timestamp: d.created,
          creator: d.creator!.address,
        });
      }
    });
  };

  useEffect(() => {
    if (publicKeysQuery.data) {
      const options = publicKeysQuery.data.persons.map((p) => {
        const opts: SelectOptions = {
          value: p.address,
          label: p.address,
          address: p.address,
          publicKey: p.publicKey,
        };
        return opts;
      });
      console.log("publickeys");

      // TODO this should filter out people who are added. also should get ens
      setPublicKeysOption(options);
    }
  }, [publicKeysQuery]);

  useEffect(() => {
    if (query.data && query.data.persons[0]?.keys.length > 0) {
      processData(query.data);
    }
  }, [query]);

  return (
    <div>
      <h1>Message List</h1>

      <div className="flex flex-col gap-5 font-mono">
        {state.decryptedData.map((d) => (
          <div
            key={d.id}
            className="border-2 rounded border-green-600 p-3 flex flex-col gap-1"
          >
            <div className="flex gap-5 text-xs">
              <p>{d.creator}</p>
              {/* <TimeAgo datetime={d.timestamp * 1000} />
              <Select
                options={publicKeysOption}
                onChange={(e) => addPerson(e as SelectOptions, d.id)}
              /> */}
            </div>
            <p className="text-sm">{d.data}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageList;
