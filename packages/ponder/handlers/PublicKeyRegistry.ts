import { PublicKeyRegisteredHandler } from "../generated/PublicKeyRegistry";
import fetch from "node-fetch";

const handlePublicKeyRegistered: PublicKeyRegisteredHandler = async (
  event,
  context
) => {
  const { Person } = context.entities;

  const address = event.params.account.toString().toLowerCase();

  const ensInfo = await (
    await fetch(`https://api.ensideas.com/ens/resolve/${address}`)
  ).json();

  await Person.insert({
    id: address,
    address: address,
    displayAddress: ensInfo.displayName,
    publicKey: event.params.publicKey,
  });
};

export const PublicKeyRegistry = {
  PublicKeyRegistered: handlePublicKeyRegistered,
};
