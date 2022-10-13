module.exports = {
  database: { kind: "sqlite" },
  graphql: { port: 42069 },
  sources: [
    {
      kind: "evm",
      name: "EncryptedSharable",
      chainId: 5,
      rpcUrl: process.env.PONDER_RPC_URL_5,
      address: "0x155D3e39aFE591C750fD5a70f50494208D101C0d",
      abi: "./abis/EncryptedSharable.abi.json",
      startBlock: 7759391	,
    },
    {
      kind: "evm",
      name: "PublicKeyRegistry",
      chainId: 5,
      rpcUrl: process.env.PONDER_RPC_URL_5,
      address: "0x33ACbCF1baC10F3a4aE61Ae312Da212fC9D6286F",
      abi: "./abis/PublicKeyRegistry.abi.json",
      startBlock: 7752302,
    },
  ],
};