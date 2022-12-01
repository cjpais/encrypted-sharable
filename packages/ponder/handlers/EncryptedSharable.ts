import { DataCreatedHandler, KeyAddedHandler } from "../generated/handlers";

const handleDataCreated: DataCreatedHandler = async (event, context) => {
  const { Data } = context.entities;

  await Data.insert(event.params.id.toString(), {
    creator: event.params.creator.toString().toLowerCase(),
    data: event.params.data.toString(),
    userData: event.params.userData.toString(),
    created: event.block.timestamp,
  });
};

const handleKeyAdded: KeyAddedHandler = async (event, context) => {
  const { Key } = context.entities;

  await Key.insert(
    `${event.params.id.toString()}-${event.params.person
      .toString()
      .toLowerCase()}`,
    {
      address: event.params.person.toString().toLowerCase(),
      nonce: event.params.nonce.toString(),
      ephemeralPublicKey: event.params.ephemeralPublicKey.toString(),
      encryptedKey: event.params.encryptedKey.toString(),
      data: event.params.id.toString(),
    }
  );
};

export const EncryptedSharable = {
  DataCreated: handleDataCreated,
  KeyAdded: handleKeyAdded,
};
