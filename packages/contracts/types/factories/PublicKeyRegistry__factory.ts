/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  PublicKeyRegistry,
  PublicKeyRegistryInterface,
} from "../PublicKeyRegistry";

const _abi = [
  {
    inputs: [],
    name: "AlreadyRegistered",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "publicKey",
        type: "bytes32",
      },
    ],
    name: "PublicKeyRegistered",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "key",
        type: "bytes32",
      },
    ],
    name: "addPublicKey",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getPublicKey",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "publicKeys",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610181806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063857cdbb8146100465780639e2fe0e914610081578063a3d6f9a914610096575b600080fd5b61006f61005436600461012b565b6001600160a01b031660009081526020819052604090205490565b60405190815260200160405180910390f35b61009461008f36600461015b565b6100b6565b005b61006f6100a436600461012b565b60006020819052908152604090205481565b33600090815260208190526040902054156100e457604051630ea075bf60e21b815260040160405180910390fd5b336000818152602081815260409182902084905590518381527f7a4bc391d21f6e1266001f2c5792e6d1eaf34a68d5540916835e975c17e27e90910160405180910390a250565b60006020828403121561013d57600080fd5b81356001600160a01b038116811461015457600080fd5b9392505050565b60006020828403121561016d57600080fd5b503591905056fea164736f6c6343000811000a";

type PublicKeyRegistryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PublicKeyRegistryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PublicKeyRegistry__factory extends ContractFactory {
  constructor(...args: PublicKeyRegistryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<PublicKeyRegistry> {
    return super.deploy(overrides || {}) as Promise<PublicKeyRegistry>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): PublicKeyRegistry {
    return super.attach(address) as PublicKeyRegistry;
  }
  override connect(signer: Signer): PublicKeyRegistry__factory {
    return super.connect(signer) as PublicKeyRegistry__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PublicKeyRegistryInterface {
    return new utils.Interface(_abi) as PublicKeyRegistryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PublicKeyRegistry {
    return new Contract(address, _abi, signerOrProvider) as PublicKeyRegistry;
  }
}
