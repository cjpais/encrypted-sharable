import { PublicKeyRegisteredHandler } from "../generated/PublicKeyRegistry";

const handlePublicKeyRegistered: PublicKeyRegisteredHandler = async (
  event,
  context
) => {
  const { Person } = context.entities;

  await Person.insert({
    id: event.params.account.toString().toLowerCase(),
    address: event.params.account.toString().toLowerCase(),
    publicKey: event.params.publicKey,
  });
};

export const PublicKeyRegistry = {
  PublicKeyRegistered: handlePublicKeyRegistered,
};
