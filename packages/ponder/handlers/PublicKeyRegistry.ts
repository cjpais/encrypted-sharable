import { PublicKeyRegisteredHandler } from "../generated/PublicKeyRegistry";

const handlePublicKeyRegistered: PublicKeyRegisteredHandler = async (
  event,
  context
) => {
  const { Person } = context.entities;

  await Person.insert({
    id: event.params.account.toString(),
    address: event.params.account.toString(),
    publicKey: event.params.publicKey,
  });
};

export const PublicKeyRegistry = {
  PublicKeyRegistered: handlePublicKeyRegistered,
};
