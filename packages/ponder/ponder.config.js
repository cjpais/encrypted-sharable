const { graphqlPlugin } = require("@ponder/graphql");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  database: 
    isProduction
    ? {
        kind: "postgres",
        connectionString: process.env.POSTGRES_URL,
      }
    : {
        kind: "sqlite",
      }
  ,
  plugins: [graphqlPlugin()],
  networks: [
    {
      name: "goerli",
      rpcUrl: process.env.PONDER_RPC_URL_5,
      chainId: 5
    }
  ],
  sources: [
    {
      kind: "evm",
      name: "EncryptedSharable",
      network: "goerli",
      chainId: 5,
      rpcUrl: process.env.PONDER_RPC_URL_5,
      address: "0x155D3e39aFE591C750fD5a70f50494208D101C0d",
      abi: "./abis/EncryptedSharable.abi.json",
      startBlock: 7759391	,
    },
    {
      kind: "evm",
      name: "PublicKeyRegistry",
      network: "goerli",
      chainId: 5,
      rpcUrl: process.env.PONDER_RPC_URL_5,
      address: "0x33ACbCF1baC10F3a4aE61Ae312Da212fC9D6286F",
      abi: "./abis/PublicKeyRegistry.abi.json",
      startBlock: 7752302,
    },
  ],
};
