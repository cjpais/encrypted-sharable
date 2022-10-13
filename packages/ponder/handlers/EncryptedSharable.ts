import {
  DataCreatedHandler,
  KeyAddedHandler,
} from "../generated/EncryptedSharable";

const handleDataCreated: DataCreatedHandler = async (event, context) => {
  const { Data } = context.entities;

  await Data.insert({
    id: event.params.id.toString(),
    creator: event.params.creator.toString(),
    data: event.params.data,
    userData: event.params.userData,
    created: event.block.timestamp,
  });
};

const handleKeyAdded: KeyAddedHandler = async (event, context) => {
  const { Key } = context.entities;

  await Key.insert({
    id: `${event.params.id.toString()}-${event.params.person.toString()}`,
    address: event.params.person,
    nonce: event.params.nonce,
    ephemeralPublicKey: event.params.ephemeralPublicKey,
    encryptedKey: event.params.encryptedKey,
    data: event.params.id.toString(),
  });
};

export const EncryptedSharable = {
  DataCreated: handleDataCreated,
  KeyAdded: handleKeyAdded,
};
